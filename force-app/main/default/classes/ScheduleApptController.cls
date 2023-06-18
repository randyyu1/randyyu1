public without sharing class ScheduleApptController {
    @AuraEnabled(cacheable=true)
    public static List<Patient__c> getPatients(){
        return [SELECT Id, Name FROM Patient__c ORDER BY Name];
    }

    @AuraEnabled(cacheable=true)
    public static List<Subspecialty__c> getSubspecialties(){
        return [SELECT Id, Name, Appointment_Price__c FROM Subspecialty__c];
    }

    @AuraEnabled(cacheable=true) 
    public static List<Physician__c> getPhysicians(String subspecialtyId) {
        return [SELECT Id, Name FROM Physician__c WHERE Subspecialty__c = :subspecialtyId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Appointment__c> getAppointments(String subspecialtyId, String strDate) {
        Date dt = Date.valueOf(strDate);    //strDate: '2021-09-01'
        return [SELECT Id, Start_Time__c, Physician__c FROM Appointment__c WHERE Appointment_Date__c =: dt AND Physician__r.Subspecialty__c =: subspecialtyId];
    }

    @AuraEnabled        //No (cacheable=true) to avoid in imperative call: LimitException: Too many DML statements: 1
    public static String saveAppointment(String startTime, String physicianId, String patientId) {
        String patientName = '';

        DateTime dt = DateTime.valueOf(startTime);      //startTime: '2021-09-01 08:30:00'
        Appointment__c appt = new Appointment__c();
        appt.Physician__c = physicianId;
        if (patientId != null && patientId != 'none') {
            appt.Patient__c = patientId;

            Patient__c p = [SELECT Name FROM Patient__c WHERE Id =: patientId LIMIT 1];
            patientName = p.Name + ' Appointment';
        }
        appt.Start_Time__c = dt;
        appt.End_Time__c = dt.addMinutes(30);
        appt.Name = patientName;

        insert appt;

        GoogleCalendar.bookPhysicianCalendar(appt.Id);

        //If single email limit per day exceeds, don't send email
        System.debug('saveAppointment(): getEmailInvocations(): ' + Limits.getEmailInvocations());
        System.debug('saveAppointment(): getLimitEmailInvocations(): ' + Limits.getLimitEmailInvocations());
        if (Limits.getEmailInvocations() < Limits.getLimitEmailInvocations()) {
            GoogleCalendar.sendPhysicianEmail(appt.Id);
        }
        else {
            System.debug('saveAppointment(): Single Emails Limit exceeds. Email not sent.');
        }

        return appt.Id;
    }
}