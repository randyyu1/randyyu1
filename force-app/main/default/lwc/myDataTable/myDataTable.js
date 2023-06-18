import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/MyDataTable.getAccounts';
import {updateRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

const COLUMNS = [
    {label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text', editable: true},
    {label: 'Annual Revenue', fieldName: ANNUAL_REVENUE_FIELD.fieldApiName, type: 'currency', editable: true},
    {label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'text', editable: true}
];

export default class MyDataTable extends LightningElement {
    columns = COLUMNS;
    draftRecords = [];
    wireResult;             //Used only for refreshApex()
    accounts;
    error;

    @wire (getAccounts, {numRecords: 10})
    receive (result) {
        this.wireResult = result;

        if (result.data) {
            this.accounts = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.accounts = undefined;
            this.error = result.error;
        }
    }

    async handleSave(event) {
        //records is like: [{Id: "xxx", Name: "xxx"}, {Id: "yyy", Name: "yyy"}]
        const records = event.detail.draftValues;
        console.log('xxx', JSON.stringify(records));
        //record is like: {Id: "xxx", Name: "xxx"}
        //updateRecord(recordInput) needs arg to be: {fields: {Id: "xxx", Name: "xxx"}}
        const promises = records.map(record => {
            const recordInput = {fields: record};
            console.log('yyy', JSON.stringify(recordInput));
            updateRecord(recordInput);
        });

        try {
            await Promise.all(promises);
            console.log("Update records successfully");
            await refreshApex(this.wireResult);
            //this.draftRecords = [];
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Accounts updated',
                variant: 'success'
            }));
        } catch (ex) {
            console.log('Error: ' + ex);
            this.dispatchEvent(new ShowToastEvent({
                title: "Error",
                message: "At least one record update failed",
                variant: 'error'
        }));
        }
    }
}