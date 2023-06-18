public with sharing class MyApex6 {
    @AuraEnabled(cacheable=true)
    public static List<Account> myMethod(Integer numRec){
        List<Account> lst = [SELECT Id, Name, Phone FROM Account LIMIT :numRec];
        return lst;
    }
}