import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/InterviewClass.getAccounts';
import getAccts from '@salesforce/apex/InterviewClass.getAcctsImperative';
import {createRecord, getRecord} from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';

export default class InterviewLwc extends LightningElement {
    @wire (getAccounts, {numRec: 3})
    accts;

    @wire (getAccounts, {numRec: 3})
    receive({data, error}) {
        if (data) {
            this.dataAccts = data;
            this.errorAccts = undefined;
        } else {
            this.dataAccts = undefined;
            this.errorAccts = error;
        }
    }

    dataAccts;
    errorAccts;

    handleImperative(event) {
        getAccts({numRec: 3}).then(data => {
            this.dataAccts = data;
            this.errorAccts = undefined;
        }).catch(error => {
            this.dataAccts = undefined;
            this.errorAccts = error;
        }); 
    }

    handleCreateRecord(event) {
        const record = {};
        record['apiName'] = 'Account';
        record[ACCOUNT_NAME_FIELD] = 'dummy account';
        createRecord(record).then(resp => {
            console.log('Account has been created: ' + resp.id);
            //this.acctId = resp.id;
        }).catch(error => {
            console.log(error);
        });
    }

    acctId = '0011U00000B8MfLQAV';
    acctName;
    @wire (getRecord, {recordId: '$acctId', fields: [ACCOUNT_ID_FIELD, ACCOUNT_NAME_FIELD]})
    receive ({data, error}) {
        if (data) {
            this.acctName = getFieldValue(data, ACCOUNT_NAME_FIELD);
        } else if (error) {
            console.log(error);
        }
    }
}