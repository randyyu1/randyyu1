import { LightningElement, wire, track } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class MyLwc16 extends LightningElement {
    @track objInfo;
    @wire (getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    receive({data, error}) {
        if (data) {
            this.objInfo = JSON.stringify(data);
        }
    }
}