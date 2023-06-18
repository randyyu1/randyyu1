import { LightningElement, track, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ModalCmp extends LightningElement {
    @api header;
    @track showModal = false;

    @api show() {
        this.showModal = true;
    }

    @api hide() {
        this.showModal = false;
    }

    handleX(event) {
        //Fire custom event to parent when user click the X button
        const closeDialog = new CustomEvent('xbutton');
        this.dispatchEvent(closeDialog);

        this.showModal = false;
    }
}