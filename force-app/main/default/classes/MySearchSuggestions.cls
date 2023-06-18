public without sharing class MySearchSuggestions {
    @AuraEnabled(cacheable=true)
    public static List<Account> getSuggestions(String searching){
        //if (String.isBlank(searching)) {
        //    return null;
        //}

        String searchingPattern = '%' + searching + '%';
        return [SELECT Id, Name, Description FROM Account WHERE Name LIKE: searchingPattern];
    }
}