import { LightningElement, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class MyLwc12 extends LightningElement {
    @track recordId = '0011U00000B8MfKQAV';
    @track fieldsArray = [NAME_FIELD, PHONE_FIELD, WEBSITE_FIELD, INDUSTRY_FIELD];

    successHandler(event) {
        this.recordId = event.detail.id;
    }
}