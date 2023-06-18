import { LightningElement, track } from 'lwc';

export default class MyLwc29 extends LightningElement {
    @track lastname;
    @track firstname;
    @track age = 37;

    handleSave(event) {   
    }
}