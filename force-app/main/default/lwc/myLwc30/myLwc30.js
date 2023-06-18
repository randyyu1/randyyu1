import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MyLwc30 extends LightningElement {
    @track lastname;
    @track firstname;
    @track age = 37;

    handleLastnameChange(event) {
        //Custom validation at onchange
        this.lastname = event.target.value;
        if (this.lastname == 'Doe') {
            event.target.setCustomValidity('Doe is not allowed');
        } else {
            event.target.setCustomValidity('');
        }
    }

    handleFirstnameChange(event) {
        this.firstname = event.target.value;
    }

    handleAgeChange(event) {
        this.age = event.target.value;
    }

    handleSave(event) {
        console.log('in handleSave()');
        //Custom validation on submit
        const fname = this.template.querySelector('.fname');
        console.log('fname.value is ', fname.value);
        if (fname.value == 'John') {
            fname.setCustomValidity('John is not allowed');
        } else {
            fname.setCustomValidity('');
        }

        const age = this.template.querySelector('.age');
        console.log('age.value is ', age.value);
        if (age.value > 90) {
            age.setCustomValidity('Cannot be over 90');
        } else {
            age.setCustomValidity('');
        }

        //querySelectorAll() returns NodeList. Need to turn it to Array.
        const inputs = [...this.template.querySelectorAll('.nonExisting')];
        const allValid = inputs.reduce( (validSoFar, cmp) => {
               cmp.reportValidity();
               return validSoFar && cmp.checkValidity();
        }, true);
        console.log('allValid is ', allValid);

        if (allValid) {
            //Save to database
            this.dispatchEvent(new ShowToastEvent({title: 'Success', message: 'Saved to DB', variant: 'success'}));
        } else {
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'Invalid inputs', variant: 'error'}));
        }
    }
}