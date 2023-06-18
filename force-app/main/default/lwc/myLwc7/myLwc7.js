import { LightningElement, track } from 'lwc';

export default class MyLwc7 extends LightningElement {

    handleChange(event) {
        var input = this.template.querySelector('.nonExisting');
        var span = this.template.querySelector('.marker');
        span.innerText = input.value;
    }
}