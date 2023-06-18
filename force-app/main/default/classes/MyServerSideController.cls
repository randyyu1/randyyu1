public with sharing class MyServerSideController {
    @AuraEnabled
    public static List<Opportunity> getOpportunities() {
        List<Opportunity> opportunities = [SELECT Id, Name FROM Opportunity];
        return opportunities;
    }
}