@isTest
private class MyApex6Test {
    @TestSetup
    static void makeData(){
        Account acct1 = new Account(Name='test account 1', Phone='123-456-7890');
        Account acct2 = new Account(Name='test account 2', Phone='098-765-4321');
        List<Account> lst = new List<Account>();
        lst.add(acct1);
        lst.add(acct2);
        insert lst;
        System.assertNotEquals(null, lst[0].Id);
        System.assertNotEquals(null, lst[1].Id);   
    }

    @isTest
    static void testMyMethod() {
        List<Account> lst = MyApex6.myMethod(10);
        System.assertNotEquals(null, lst[0].Id);
        System.assertNotEquals(null, lst[1].Id);
    }
}