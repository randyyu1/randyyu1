import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalParent extends LightningElement {
    @track header = 'The modal header';
    @track name = "Jane Doe";
    @track isLoading = false;

    handleHeaderChange(event) {
        this.header = event.target.value;
    }

    handleContentChange(event) {
        this.content = event.target.value;
    }

    handleShowModal() {
        const modal = this.template.querySelector('c-modal-cmp');
        modal.show();
    }

    handleXButton(event) {
        //Clean up class variables
    }

    handleCancelModal() {
        const modal = this.template.querySelector('c-modal-cmp');
        modal.hide();
    }

    handleSubmitModal() {
        this.isLoading = true;
        //Update database
        const modal = this.template.querySelector('c-modal-cmp');
        modal.hide();
        this.dispatchEvent(new ShowToastEvent({title: 'Success', message: 'Name is ' + this.name, variant: 'success'}));
        this.isLoading = false;
    }

    handleName(event) {
        this.name = event.target.value;
    }
}