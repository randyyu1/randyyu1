import { LightningElement, track, wire } from 'lwc';
import myMethod from '@salesforce/apex/MyApex6.myMethod';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MyLwc10 extends LightningElement {
    @track accts = undefined;
    @wire (myMethod, {numRec: 'a'})
    receive({data, error}) {        //javascript short for {data:data, error:error}
        if (error) {
            console.log('xxxxxxcomehere');
            let errMsg = 'Unknown error';
            if (Array.isArray(error.body)) {
                errMsg = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                errMsg = error.body.message;
            }

            this.dispatchEvent( 
                new ShowToastEvent({title: 'Error', message: errMsg, variant: 'error'})
            );
        }
        else if (data) {
            this.accts = data;
        }
    }
}