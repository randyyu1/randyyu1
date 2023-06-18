import { LightningElement } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class MyActionLwc extends LightningElement {
    name = 'hello';

    handleName(event) {
        this.name = event.target.value;
    }

    handleSubmit(event) {
        this.dispatchEvent(new CloseActionScreenEvent());
        //Call Apex
    }

    handleCancel(event) {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}