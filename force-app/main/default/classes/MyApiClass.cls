@RestResource(urlMapping='/api/Account')
global with sharing class MyApiClass {
	@HttpGet
    global static Account doGet() {
        RestRequest req = RestContext.request;
        RestResponse resp = RestContext.response;
        Account result = [SELECT Id, Name FROM Account LIMIT 1];
        return result;
    }
}