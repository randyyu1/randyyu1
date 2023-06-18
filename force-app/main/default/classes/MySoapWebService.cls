global with sharing class MySoapWebService {
    webservice static String getHello(String str) {
        return 'Hello, ' + str;
    }
}