import { LightningElement, track, wire } from 'lwc';
import { getListUi} from 'lightning/uiListApi';
import OPPORTUNITY_SOBJECT from '@salesforce/schema/Opportunity';

export default class MyModal extends LightningElement {
    columns = [
        {label: 'Name', fieldName: 'Name', type: 'text'},
        {label: 'Stage', fieldName: 'Stage', type: 'text'},
        {label: 'Amount', fieldName: 'Amount', type: 'text'}
    ];
    @track recordId;
    @track stage;
    @track records;
    @track error;

    @wire (getListUi, {objectApiName: OPPORTUNITY_SOBJECT, listViewApiName: 'AllOpportunities'})
    receiveData( {error, data} ) {
        if (data) {
            const stage = data.records.records.find(r => r.Id == this.recordId).fields.stageName.value;
            this.stage = stage;
            let records = [];
            for (let r of data.records.records) {
                if (r.fields.stageName.value == stage) {
                    let row = {
                        name: r.fields.name.value,
                        stage: r.fields.stageName.value,
                        amount: r.fields.Amount.value
                    };
                    records.push(row);
                }
            }
            this.records = records;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }

    close() {
        const event = new CustomEvent('close');
        this.dispatchEvent(event);
    }
}