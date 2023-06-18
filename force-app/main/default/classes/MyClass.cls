public with sharing class MyClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer numRec){
        return [SELECT Id, Name, Phone FROM Account LIMIT : numRec];
    }
}