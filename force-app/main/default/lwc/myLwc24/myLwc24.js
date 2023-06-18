import { LightningElement, track } from 'lwc';

export default class MyLwc24 extends LightningElement {
    @track emailVariant = 'brand-outline';
    @track textVariant = 'brand-outline';
    @track numOfChildren = 0;

    handleButton(event) {
        if (event.target.name === 'Mobile') {
            this.template.querySelector('.MobileMarker').variant = 'brand';
            this.template.querySelector('.LandlineMarker').variant = 'brand-outline';
        } else if (event.target.name === 'Landline') {
            this.template.querySelector('.LandlineMarker').variant = 'brand';
            this.template.querySelector('.MobileMarker').variant = 'brand-outline';
        } else if (event.target.name === 'Email') {
            this.emailVariant = 'brand';
            this.textVariant = 'brand-outline';
        } else if (event.target.name === 'Text') {
            this.textVariant = 'brand';
            this.emailVariant = 'brand-outline';
        } else if (event.target.name == 'Minus') {
            this.numOfChildren --;
        } else if (event.target.name == 'Plus') {
            this.numOfChildren ++;
        }
    }
}