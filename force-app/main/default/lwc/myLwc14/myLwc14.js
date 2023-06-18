import { LightningElement, track } from 'lwc';
import myMethod from '@salesforce/apex/MyApex6.myMethod';

export default class MyLwc14 extends LightningElement {
    @track accts;
    @track error;

    connectedCallback() {
        myMethod({numRec: 3}).then(data =>{
            this.accts = data;
            this.error = undefined;
        }).catch(error => {
            this.accts = null;
            this.error = undefined;
        }); 
    }
}