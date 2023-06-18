import { LightningElement, track, wire } from 'lwc';
import myMethod from '@salesforce/apex/MyApex6.myMethod';

export default class MyLwc6 extends LightningElement {
    @wire(myMethod, {numRec: 'a'})
    accounts;
}