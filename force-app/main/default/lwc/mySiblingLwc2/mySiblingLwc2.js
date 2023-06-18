import { LightningElement, track, wire } from 'lwc';
import {registerListener, unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class MySiblingLwc2 extends LightningElement {
    @track receivedEvent;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('myevent', this.handleEvent, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleEvent(event) {
        this.receivedEvent = event.detail;
    }
}