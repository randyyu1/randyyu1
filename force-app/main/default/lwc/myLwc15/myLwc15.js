import { LightningElement, wire, track } from 'lwc';
import {getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MyLwc15 extends LightningElement {
    @track picklistValues;
    @track selectedValue;

    @wire (getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    objInfo;

    @wire (getPicklistValues, {recordTypeId: '$objInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD})
    recieve({data, error}) {
        if (data) {
            this.picklistValues = data;
        } else if (error) {
            const evt = new ShowToastEvent({title: "Error", message: "Failed to get Picklistvalues", variant:"error"});
            this.dispatchEvent(evt);
        }
    }

    handleChange(event) {
        this.selectedValue = event.target.value;
    }
}