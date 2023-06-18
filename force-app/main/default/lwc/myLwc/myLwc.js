import { LightningElement, track } from 'lwc';

export default class MyLwc extends LightningElement {
    @track myText = "mytext";
    @track myDate = "2020-06-20";
    @track myColor = "#8DC141";
    @track myFile = "";
    @track myPassword = "";
    @track myPhone = "7708272599";
    @track myUrl = "http://www.cnn.com";
    @track myNumber = 7777.88;
    @track myCheckbox = true;
    @track bAddCheese = true;
    @track myToggle = true;

    handleTextChange(event) {
        this.mydisplay = event.target.value;
    }

    //For <lightning-input type="text">, change event is fired only when a date is selected from dropdown,
    //return key is hit or the input loses focus.
    handleDateChange(event) {
        console.log(event.target.value);
    }

    handleColorChange(event) {
        console.log(event.target.value);
    }

    handleFileChange(event) {
        console.log(event.target.value);
    }

    handlePasswordChange(event) {
        console.log(event.target.value);
    }

    handlePhoneChange(event) {
        console.log(event.target.value);
    }

    handleUrlChange(event) {
        console.log(event.target.value);
    }

    handleNumberChange(event) {
        console.log(event.target.value);
    }

    handleCheckboxChange(event) {
        console.log(event.target.checked);
    }

    handleChkButChange(event) {
        console.log(event.target.checked);
    }

    handleToggleChange(event) {
        console.log(event.target.checked);
    }
}