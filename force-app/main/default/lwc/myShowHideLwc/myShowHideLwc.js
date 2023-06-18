import { LightningElement } from 'lwc';

export default class MyShowHideLwc extends LightningElement {
    varClass = 'hideClass';

    handleShowHide(event) {
        const elem = this.template.querySelector('.nonExist');
        elem.classList.toggle('slds-hide');
    }

    handleShowHide2(event) {
        const elem = this.template.querySelector('[data-id="myDataId"]');
        if (this.varClass == 'showClass') this.varClass = 'hideClass';
        else this.varClass = 'showClass';
    }
}