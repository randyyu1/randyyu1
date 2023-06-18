public class MyDataTable {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer numRecords) {
        return [select Name, AnnualRevenue, Industry from Account limit :numRecords];
    }
}