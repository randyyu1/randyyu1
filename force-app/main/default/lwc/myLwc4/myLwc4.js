import { LightningElement } from 'lwc';

export default class MyLwc4 extends LightningElement {
    handleClick(event) {
        var inputFn = this.template.querySelector(".fn");
        if (inputFn.value == "John") {
            inputFn.setCustomValidity("John is not allowed")
        } else {
            inputFn.setCustomValidity("");
        }
        inputFn.reportValidity();

        var inputLn = this.template.querySelector(".ln");
        if (inputLn.value == "Doe") {
            inputLn.setCustomValidity("Doe is not allowed");
        } else {
            inputLn.setCustomValidity("");
        }
        inputLn.reportValidity();

    }
}