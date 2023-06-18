import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MyLwc11 extends LightningElement {
    @track recordId = '0011U00000B8MfKQAV';
    successHandler(event) {
        this.recordId = event.detail.id;
        this.dispatchEvent(new ShowToastEvent({title: "Debug", message: "here", variant: "success"}));
    }
}