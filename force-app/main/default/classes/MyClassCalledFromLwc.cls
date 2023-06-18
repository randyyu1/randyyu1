public with sharing class MyClassCalledFromLwc {
    public MyClassCalledFromLwc() {}

    @AuraEnabled
    public static string myMethod(){
        String str = 'Hello';
        str = str + ', ';
        str = str + 'World';
        return str;
    }
}