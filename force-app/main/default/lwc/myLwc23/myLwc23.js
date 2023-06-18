import { LightningElement, track } from 'lwc';

export default class MyLwc23 extends LightningElement {
    @track vall;

    handleClick(event) {
        //id1 becomes id1-05
        let elem = document.getElementById('id1');
        console.log('elem is ' + elem);
        let elem1 = this.template.querySelector('#id1');
        console.log('elem1 is ' + elem1);
        let elem2 = this.template.querySelector('.nonExist');
        console.log('elem2 is ' + elem2);
        console.log('innerText is ' + elem2.innerText);
        console.log('innerHTML is ' + elem2.innerHTML);
        let elem3 = this.template.querySelector('[data-id="dataid1"]');
        console.log('elem3 is ' + elem3);
        console.log('elem3.innerHTML is ' + elem3.innerHTML);
        //this.vall = elem.innerText;
        //this.vall = elem1.innerText;
        //this.vall = elem2.innerHtml;
        this.vall = elem2.innerHTML;
    }
}