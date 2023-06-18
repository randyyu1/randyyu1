import { LightningElement, api, track } from 'lwc';

export default class MyChildLwc1 extends LightningElement {
    @api apiVar;
    @track apiMethod;

    @api
    myApiMethod(arg) {
        this.apiMethod = arg;
    }

    handleClick(event) {
        let evt = new CustomEvent('myevent', {detail: 'Hi from Child'});
        this.dispatchEvent(evt);
    }
}