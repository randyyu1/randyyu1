import { LightningElement, track } from 'lwc';
import myMethod from '@salesforce/apex/MyClassCalledFromLwc.myMethod';

export default class MyLwcCallApex extends LightningElement {
    @track message;
    @track error;
    
    handleClick(event) {
        myMethod().then(data => {
            this.message = data;
            this.error = undefined;
        })
        .catch(error => {
            this.message = undefined;
            this.error = error;
        });
    }
}