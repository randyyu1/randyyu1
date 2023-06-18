public with sharing class MyApex7 {
    @AuraEnabled (cacheable=true)
    public static List<Contact> getContactList(){
        return [SELECT Id, Name, Title, Phone, Email, Birthdate, Department FROM Contact];
    }
}