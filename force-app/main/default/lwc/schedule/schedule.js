import { LightningElement, track, wire } from 'lwc';
import getPatients from '@salesforce/apex/ScheduleApptController.getPatients';
import getSubspecialties from '@salesforce/apex/ScheduleApptController.getSubspecialties';
import getPhysicians from '@salesforce/apex/ScheduleApptController.getPhysicians';
import getAppointments from '@salesforce/apex/ScheduleApptController.getAppointments';
import saveAppointment from '@salesforce/apex/ScheduleApptController.saveAppointment';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const timeSlotArr = [
    {startTime:'08:00', disabled: false},
    {startTime:'08:30', disabled: false},
    {startTime:'09:00', disabled: false},
    {startTime:'09:30', disabled: false},
    {startTime:'10:00', disabled: false},
    {startTime:'10:30', disabled: false},
    {startTime:'11:00', disabled: false},
    {startTime:'11:30', disabled: false},
    {startTime:'Lunch', disabled: true},
    {startTime:'13:00', disabled: false},
    {startTime:'13:30', disabled: false},
    {startTime:'14:00', disabled: false},
    {startTime:'14:30', disabled: false},
    {startTime:'15:00', disabled: false},
    {startTime:'15:30', disabled: false},
    {startTime:'16:00', disabled: false},
    {startTime:'16:30', disabled: false}
];

const today = new Date();
const todayStr = today.getFullYear() 
                    + "-" 
                    + ("0" + (today.getMonth() + 1)).slice(-2)
                    + "-"
                    + ("0" + today.getDate()).slice(-2);
console.log(`todayStr: ${todayStr}`);

export default class Schedule extends LightningElement {
    @track selectedPatientId;       // = 'none';
    @track lstPatient;
    @track selectedDate = todayStr;     //String '2021-09-01'
    @track minDate = todayStr;
    @track selectedSubspecialtyId = 'none';
    @track lstSubspecialty;         //for Combobox options
    @track apptPrice;
    lstPhysician = [];
    lstAppts = [];
    @track lstPhysicianAppts;   //[{PhysicianId: '..', Name: '..', TimeSlots: []}, ...]
    @track errMsg;
    @track timeSlots = timeSlotArr;

    @wire (getPatients) 
    receivePatients({data, error}) {
        if (data) {
            console.log('receivePatients(): data: ', JSON.stringify(data));
            let patients = [];          //[{label: '-- Select a Patient --', value: 'none'}];
            data.forEach(item => {
                let patient = {};
                patient.label = item.Name;
                patient.value = item.Id;
                patients.push(patient);
            });
            this.lstPatient = patients;
            if (patients.length > 0) {
                this.selectedPatientId = patients[0].value;
            }
            console.log('lstPatient: ', JSON.stringify(this.lstPatient));
        }
        else if (error) {
            this.errMsg = 'Unknown error';
            if (Array.isArray(error.body)) {
                this.errMsg = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                this.errMsg = error.body.message;
            }

            this.dispatchEvent( 
                new ShowToastEvent({title: 'Error', message: this.errMsg, variant: 'error'})
            );
        }
    }

    @wire (getSubspecialties)
    receiveSubspecialties({data, error}) {
        if (data) {
            this.subspecialties = data;
            console.debug('receiveSubspecialties(): this.subspecialties: ' + JSON.stringify(this.subspecialties));

            let subspecialties = [{label: '-- Select a Subspecialty to show Physicians --', value: 'none'}];
            data.forEach(item => {
                let subspecialty = {};
                subspecialty.label = item.Name + ' - Appt Price: $' + item.Appointment_Price__c;
                subspecialty.value = item.Id;
                subspecialties.push(subspecialty);
            });
            this.lstSubspecialty = subspecialties;
        } 
        else if (error) {
        }
    }

    handlePatientChange(event) {
        this.selectedPatientId = event.target.value;
        console.log('handlePatientChange(): this.selectedPatientId: ', this.selectedPatientId);
    }

    handleDateChange(event) {
        this.selectedDate = event.target.value;
        console.log('handleDateChange(): this.selectedDate: ', this.selectedDate);

        if (this.selectedSubspecialtyId && this.selectedSubspecialtyId != 'none') {
            this.reloadTimeSlots();
        }
    }

    handleSubspecialtyChange(event) {
        this.selectedSubspecialtyId = event.target.value;
        console.log('handlePatientChange(): this.selectedSubspecialtyId: ', this.selectedSubspecialtyId);

        this.reloadTimeSlots();
    }

    async reloadTimeSlots() {
        try {
            //Retrieve physicians in the selected subspeciality
            this.lstPhysician = await getPhysicians({subspecialtyId: this.selectedSubspecialtyId});
            console.log('handleSubspecialtyChange(): this.lstPhysician: ', JSON.stringify(this.lstPhysician));

            //Retrieve appointments for the physicians
            this.lstAppts = await getAppointments({subspecialtyId: this.selectedSubspecialtyId, strDate: this.selectedDate});
            console.log('handleSubspecialtyChange(): this.lstAppts: ' + JSON.stringify(this.lstAppts));
        } catch (ex) {
            console.log('handleSubspecialtyChange() exception: ', ex.message);
            return;
        }

        //Build this.lstPhysicianAppts: [{PhysicianId: '..', Name: '..', TimeSlots: []}, ...]
        const arrPhysicianAppts = [];
        for (let physician of this.lstPhysician) {
            const physicianAppts = {};
            physicianAppts.PhysicianId = physician.Id;
            physicianAppts.Name = physician.Name;
            const arrTimeSlot = this.deepCopyTimeSlotArr();

            //Disable the occupied timeslots 
            for (let appt of this.lstAppts) {
                if (physician.Id == appt.Physician__c) {
                    for (let timeSlot of arrTimeSlot) {
                        //Start_Time__c contains: 2021-09-04T13:00:00.000Z which is UTC time. Need to convert to local time
                        const ticks = Date.parse(appt.Start_Time__c);
                        let dt = new Date();
                        dt.setTime(ticks);
                        const strLocalTime = dt.toString();
                        if (strLocalTime.includes(timeSlot.startTime)) {
                            timeSlot.disabled = true;
                        }
                    }
                }
            }

            physicianAppts.TimeSlots = arrTimeSlot;
            console.log('handleSubspecialtyChange(): physicianAppts: ' + JSON.stringify(physicianAppts));

            arrPhysicianAppts.push(physicianAppts);
        }

        this.lstPhysicianAppts = arrPhysicianAppts;
        console.log('handleSubspecialtyChange(): this.lstPhysicianAppts: ' + JSON.stringify(this.lstPhysicianAppts));
    }

    async handleButtonClick(event) {
        let strTimeSlot = event.target.label;     //8:30
        console.log('handleButtonClick(): strTimeSlot label: ' + strTimeSlot);
        strTimeSlot = strTimeSlot.trim();
        strTimeSlot = ('0' + strTimeSlot).slice(-5);        //08:30
        let strTime = strTimeSlot + ':00';                  //08:30:00
        console.log('handleButtonClick(): strTime: ' + strTime);

        //put together an Apex DateTime string: '2021-09-02 08:30:00'
        strTime = this.selectedDate + ' ' + strTime;
        console.log('handleButtonClick(): strTime: ' + strTime);

        //Get the current key which contains PhysicianId
        const physicianId = event.target.getAttribute('data-item');
        console.log('handleButtonClick(): data-item PhysicianId: ' + physicianId);
        console.log('handleButtonClick(): selectedPatientId: ' + this.selectedPatientId);

        try {
            await saveAppointment({startTime: strTime, physicianId: physicianId, patientId: this.selectedPatientId});

            this.disableClickedTimeSlot(physicianId, strTimeSlot);

            event.target.disabled = true;
            this.showToast('Success', 'Successfully saved the appointment', 'success');
        } catch (ex) {
            console.log('handleButtonClick(): Exception: ' + ex.name + ' - ' + ex.message);
            this.showToast('Error', 'Failed to save the appointment', 'error');
        }
    }

    disableClickedTimeSlot(physicianId, timeSlotStart) {
        console.log('disableClickedTimeSlot(): this.lstPhysicianAppts: ' + JSON.stringify(this.lstPhysicianAppts));
        console.log('disableClickedTimeSlot(): physicianId: ' + JSON.stringify(physicianId));
        console.log('disableClickedTimeSlot(): timeSlotStart: ' + JSON.stringify(timeSlotStart));
        for (let physicianAppts of this.lstPhysicianAppts) {
            if (physicianAppts.PhysicianId == physicianId) {
                for (let timeSlot of physicianAppts.TimeSlots) {
                    if (timeSlot.startTime == timeSlotStart) {
                        timeSlot.disabled = true;
                        console.log('xxxxxxx' + timeSlotStart);
                    }
                }
            }
        }
    }

    deepCopyTimeSlotArr() {
        let copiedArr = [];
        for (let timeSlot of timeSlotArr) {
            let timeSlotNew = {};
            timeSlotNew.startTime = timeSlot.startTime;
            timeSlotNew.disabled = timeSlot.disabled;
            copiedArr.push(timeSlotNew);
        }

        console.log('deepCopySlotArr(): copiedArr: ' + JSON.stringify(copiedArr));
        return copiedArr;
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({title, message, variant});
        this.dispatchEvent(evt);
    }
}