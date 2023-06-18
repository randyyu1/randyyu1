import { LightningElement, wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class MySiblingLwc1 extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    handleClick(event) {
        fireEvent(this.pageRef, 'myevent', {detail: 'Hello from sibling'});
    }
}