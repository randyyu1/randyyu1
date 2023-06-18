import { LightningElement } from 'lwc';

export default class MyLwc26 extends LightningElement {
    handleAlert(event) {
        alert("from alert(): Hello, world");
    }

    handleConfirm(event) {
        if (confirm("from confirm(): Is world round?")) {
            alert("yes");
        } else {
            alert("no");
        }
    }
}