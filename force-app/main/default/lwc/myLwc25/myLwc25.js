import { LightningElement, track, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MyLwc25 extends LightningElement {
    @track showModal = false;
    @track name = "Jane Doe";
    @track isLoading = false;

    popModal(event) {
        this.showModal = true;
    }

    handleName(event) {
        this.name = event.target.value;
    }

    handleSubmit(event) {
        //Validate form
        if (this.template.querySelector('.nonExist').value == '') {
            this.dispatchEvent(new ShowToastEvent(
                {title: 'Name empty', message: 'Please enter name', variant: 'error'}));
            return;
        }

        this.showModal = false;
        this.isLoading = true;
        //Call Apex
        //async, await sleep(2000); never wake up
        this.isLoading = false;
        this.dispatchEvent(new ShowToastEvent({title: 'Success', message: 'Name submitted', variant: 'success'}));
    }

    handleCancel(event) {
        this.showModal = false;
    }
}