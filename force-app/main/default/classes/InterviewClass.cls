public with sharing class InterviewClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer numRec){
        return [SELECT Id, Name, Phone FROM Account LIMIT : numRec];
    }

    @AuraEnabled
    public static List<Account> getAcctsImperative(Integer numRec){
        return [SELECT Id, Name, Phone FROM Account LIMIT : numRec];
    }
}