import { LightningElement, track } from 'lwc';

export default class MyParentLwc1 extends LightningElement {
    @track eventDataFromChild;

    handleClick(event) {
        let childCmp = this.template.querySelector('c-my-child-lwc1');
        childCmp.myApiMethod('Hey from parent'); 
    }

    handleChildEvent(event) {
        this.eventDataFromChild = event.detail;
    }
}