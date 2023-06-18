import { LightningElement, track } from 'lwc';

export default class MyLwc21 extends LightningElement {
    @track formattedPhone;

    handleKey(event) {
        let phone = event.target.value;
        this.formattedPhone = this.formatPhoneNumber(event,phone);
    }

    formatPhoneNumber(event, phone) {
        let keyCode = event.which;
        if ((keyCode < 48 || keyCode > 57)) {
            event.preventDefault();
            return phone;
        }

        return this.autoFormatNumber(phone);
    }

    autoFormatNumber(phone) {
        phone = phone.replace(/[^\d]/g, '');
        if (phone.length === 1) {
            phone = phone.replace(/(\d{1})/, "($1)");
        } else if (phone.length === 2) {
            phone = phone.replace(/(\d{2})/, "($1)");
        } else if (phone.length === 3) {
            phone = phone.replace(/(\d{3})/, "($1)");
        } else if (phone.length === 4) {
            phone = phone.replace(/(\d{3})(\d{1})/, "($1) $2");
        } else if (phone.length === 5) {
            phone = phone.replace(/(\d{3})(\d{2})/, "($1) $2");
        } else if (phone.length === 6) {
            phone = phone.replace(/(\d{3})(\d{3})/, "($1) $2");
        } else if (phone.length === 7) {
            phone = phone.replace(/(\d{3})(\d{3})(\d{1})/, "($1) $2-$3");
        } else if (phone.length === 8) {
            phone = phone.replace(/(\d{3})(\d{3})(\d{2})/, "($1) $2-$3");
        } else if (phone.length === 9) {
            phone = phone.replace(/(\d{3})(\d{3})(\d{3})/, "($1) $2-$3");
        } else if (phone.length === 10) {
            phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }
        return phone;
    }
}