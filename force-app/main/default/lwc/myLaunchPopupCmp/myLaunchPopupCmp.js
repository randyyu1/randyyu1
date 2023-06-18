import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class MyLaunchPopupCmp extends NavigationMixin(LightningElement) {
    handleClick(event) {
        let temp = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'                
            },
            state : {
                nooverride: '1',
                defaultFieldValues:"Name=Salesforce,AccountNumber=A1,AnnualRevenue=37000,Phone=7055617159"
            }
        };
        this[NavigationMixin.Navigate](temp);
    }
}