import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class MyLwc8 extends LightningElement {
    acctId = '0011U00000B8MfKQAV';
    @wire(getRecord, {recordId: '$acctId', fields: [NAME_FIELD, PHONE_FIELD, WEBSITE_FIELD]})
    acct;

    get name() {
        return getFieldValue(this.acct.data, NAME_FIELD);
    }

    get phone() {
        return getFieldValue(this.acct.data, PHONE_FIELD);
    }

    get website() {
        return getFieldValue(this.acct.data, WEBSITE_FIELD);
    }
}