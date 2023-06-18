import { LightningElement, track } from 'lwc';

export default class MyLwc3 extends LightningElement {
    @track toSearch = "";

    handleKeyUp(event) {
       if (event.keyCode === 13) {
           //Somehow, the onkeyup event has <lighting-input>'s value! Magic.
           //this.toSearch = event.target.value;  
           //Without magic, we will do our regular way
           var baseCmp = this.template.querySelector(".marker");
           this.toSearch = baseCmp.value;
       }
    }
}