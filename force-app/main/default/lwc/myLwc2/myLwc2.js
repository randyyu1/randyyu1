import { LightningElement, track } from 'lwc';

export default class MyLwc2 extends LightningElement {
    @track theName = "";

    handleChange(event) {
        var baseCmp = this.template.querySelector('.nonExisting');
        this.theName = baseCmp.value;
        if (this.theName == "John Doe") {
            baseCmp.setCustomValidity("John Doe is not allowed");
        } else {
            baseCmp.setCustomValidity("");  //reset it
        }
        baseCmp.reportValidity();   
    }
}