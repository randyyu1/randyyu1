import { LightningElement, track } from 'lwc';

export default class MyCard extends LightningElement {
    @track myvar = "hello";
    @track mydisplay;
    myHandler(event) {
        this.mydisplay = event.target.value;
    }
}