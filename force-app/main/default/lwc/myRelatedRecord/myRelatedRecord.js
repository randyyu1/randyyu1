import { LightningElement, track, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_TITLE from '@salesforce/schema/Contact.Title';
import CONTACT_ACCOUNTID from '@salesforce/schema/Contact.AccountId';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import CONTACT_NAME from '@salesforce/schema/Contact.Name';
import CASE_CONTACT_ID from '@salesforce/schema/Case.Contact.Id';   //Or Case.ContactId
import CASE_CONTACT_NAME from '@salesforce/schema/Case.Contact.Name';

export default class MyRelatedRecord extends NavigationMixin(LightningElement) {
    @api recordId;      //Case.Id

    contactFields = [CONTACT_TITLE, CONTACT_ACCOUNTID, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_NAME];
    @track caseHasContact = false;
    @track contactId;
    kase;

    @wire (getRecord, {recordId: '$recordId', fields: [CASE_CONTACT_ID, CASE_CONTACT_NAME]})
    receiveCase({data, error}) {
        if (data) {
            this.kase = data;

            console.log('MyRelatedRecord.receiveCase(): this.recordId: ' + this.recordId);

            if (data.fields.Contact.value) {
                this.contactId = data.fields.Contact.value.id;
                this.caseHasContact = true;
                console.log('MyRelatedRecord.receiveCase(): this.contactId:' + this.contactId);
                console.log('MyRelatedRecord.receiveCase(): data.fields.Contact.value.fields.Name.value:' + data.fields.Contact.value.fields.Name.value);
                console.log('MyRelatedRecord.receiveCase(): data.fields.Contact.value:' + JSON.stringify(data.fields.Contact.value));
            } else {
                this.contactId = null;
                this.caseHasContact = false;
                console.log('MyRelatedRecord.receiveCase(): Case has NO contact');
            }
        } else if (error) {
            console.log('MyRelatedRecord.receiveCase(): error: ' + JSON.stringify(error));
        }
    }

    onButtMenu(event) {
        console.log('MyRelatedRecord.receiveCase(): this.kase.fields.Contact.value.id: ' + this.kase.fields.Contact.value.id);

        switch (event.target.value) {
            case 'remove':
                this.updateCase(null);
                break;
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.kase.fields.Contact.value.id,
                        objectApiName: 'Contact',
                        actionName: 'view'
                    }
                });
                break;
        }
    }

    onContactChange(event) {
        this.updateCase(event.target.value);
    }

    updateCase(contactId) {
        updateRecord({fields: {Id: this.recordId, ContactId: contactId}})
            .then(() => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated Case',
                    variant: 'success'
                }));
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Failed to update Case',
                    message: error.body.output.errors.length ? error.body.output.errors[0].message : error.body.output.fieldErrors !== undefined ? Object.values(error.body.output.fieldErrors)[0][0].message : error.body.message,
                    variant: 'error'
                }));
            });
    }
}