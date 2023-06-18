public without sharing class AccountTriggerHandler {
    public static void handle(List<Account> newList, Map<Id, Account> oldMap) {
        List<MyObject__c> records = new List<MyObject__c>();
        for (Account acct : newList) {
            Account oldAcct = null;
            if (oldMap != null) {
                oldAcct = oldMap.get(acct.Id);
            }
            MyObject__c trackingRec = new MyObject__c();
            trackingRec.Name = 'Account';
            trackingRec.TrackedObject__c = 'Account';
            trackingRec.TrackedField__c = 'Source';
            trackingRec.OldValue__c = oldAcct?.Source__c;
            trackingRec.NewValue__c = acct.Source__c;
            trackingRec.OwnerId = UserInfo.getUserId();
            records.add(trackingRec);
            
            trackingRec = new MyObject__c();
            trackingRec.Name = 'Account';
            trackingRec.TrackedObject__c = 'Account';
            trackingRec.TrackedField__c = 'Source Date';
            trackingRec.OldValue__c = oldAcct?.Source_Date__c?.format();
            trackingRec.NewValue__c = acct.Source_Date__c?.format();
            trackingRec.OwnerId = UserInfo.getUserId();
            records.add(trackingRec);
        }
        
        if (!records.isEmpty()) {
            try {
                insert records;
            } catch(Exception ex) {
                System.debug('AccountTriggerHandler.handle(): ' + ex.getMessage());
            }
        }
    }
}