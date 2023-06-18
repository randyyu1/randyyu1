import { LightningElement, wire, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class MyLwc9 extends LightningElement {
    acctId = '0011U00000B8MfKQAV';
    @track name;
    @track phone;
    @track website;
    @track hasError = false;
    @wire (getRecord, {recordId: '$acctId', fields: [NAME_FIELD, PHONE_FIELD, WEBSITE_FIELD]})
    receive({data: data, error: error}) {
        if (error) {
            this.hasError = true;
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
            this.hasError = false;
            this.name = getFieldValue(data, NAME_FIELD);
            this.phone = getFieldValue(data, PHONE_FIELD);
            this.website = getFieldValue(data, WEBSITE_FIELD);
        }
    }
}