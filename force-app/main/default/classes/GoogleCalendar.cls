public without sharing class GoogleCalendar {
    public class JWTHeader{
        String alg;
        String typ;
        
        JWTHeader(String alg, String typ){
            this.alg= alg;
            this.typ=typ;
        }
    }

    public class JWTClaimSet{
        String iss;
        String scope;
        String aud;
        Long exp;
        Long iat;
        JWTClaimSet(String iss, String scope, String aud, Long exp, Long iat){
            this.iss= iss;
            this.scope=scope;
            this.aud=aud;
            this.exp=exp;
            this.iat=iat;
        }
    }

    public class AccessTokenResponse {
        String access_token;
        String scope;
    }

    public static String createGoogleJWT(String privateKeyString, String serviceAccount) {
        
        Long currentTimestamp = (DateTime.now().getTime()) / 1000;
        Long expiresTimestamp = currentTimestamp + 3600;
        
        
        String jwtHeader = JSON.serialize(new JWTHeader('RS256', 'JWT'));
        String jwtClaimset = JSON.serialize(
            new JWTClaimSet(serviceAccount,      
                            'https://www.googleapis.com/auth/calendar',                                  //scope (permissions)
                            'https://oauth2.googleapis.com/token',                                      //url for access token request
                            expiresTimestamp,
                            currentTimestamp ));
        
        String jwtHeaderEncoded = EncodingUtil.base64Encode(blob.valueof(jwtHeader));
        String jwtClaimsetEncoded = EncodingUtil.base64Encode(blob.valueOf(jwtClaimset));
        String signatureEncoded = jwtHeaderEncoded + '.' + jwtClaimsetEncoded;
        signatureEncoded = signatureEncoded.replaceAll('=','');
        String signatureEncodedUrl = EncodingUtil.urlEncode(signatureEncoded,'UTF-8');
        Blob signatureBlob = blob.valueof(signatureEncodedUrl);
        Blob privateKey = EncodingUtil.base64Decode(privateKeyString);
        String signatureBlobString = EncodingUtil.base64Encode(Crypto.sign('RSA-SHA256', signatureBlob, privateKey));
        String JWT = signatureEncoded + '.' + signatureBlobString;
        JWT = JWT.replaceAll('=','');       
        System.debug('JWT is: ' + JWT); 
        return JWT;
    } 
    
    public static String getGoogleAccessToken(String JWT) {
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://oauth2.googleapis.com/token');     //url for access token request
        request.setMethod('POST');
        request.setHeader('Content-Type','application/x-www-form-urlencoded');     
        String content = 'grant_type=urn%3A' + EncodingUtil.urlEncode('ietf:params:oauth:grant-type:jwt-bearer', 'UTF-8') + '&assertion=' + EncodingUtil.urlEncode(JWT,'UTF-8');
        System.debug('token request body: ' + content);
        request.setBody(content); 
        String accessToken = null;
        String responseBody;
        HttpResponse response;
        
        //Makes the call
        try {
            Http http = new Http();

            if (!Test.isRunningTest()) {
                response = http.send(request);
                responseBody = response.getBody();
            }
            else {
                responseBody = '{"access_token": "1234567", "scope": "abcdefg"}';
            }

            AccessTokenResponse accessTokenResponse = (AccessTokenResponse)JSON.deserialize(responseBody, AccessTokenResponse.class);
            accessToken = accessTokenResponse.access_token;
            String scope = accessTokenResponse.scope;
            System.debug('Get token success: ' + responseBody);
            System.debug('Access token: ' + accessToken);
            System.debug('scope: ' + scope);
        } catch (Exception ex) {
            System.debug('Get token fail: ex: ' + ex + '; Code=' + response?.getStatusCode() + '; Body=' + responseBody);
        }
        
        return accessToken;
    }

    //Create Event into Google Calendar
    public static void createCalendarEvent(String accessToken, String googleAccount, String eventName, String strStartTime, String strEndTime){     
        String createEventEndPoint = 'https://www.googleapis.com/calendar/v3/calendars/'+ googleAccount +'/events?sendNotifications=true';
        
        String createEventBody =  '{' +
            '"attendees": ['+
            //'{'+
            //'"email": "randyzyu@gmail.com"'+ 
            //'},'+
            //'{'+
            //'"email": "randyyu1@yahoo.com"'+
            //'}'+
            '],'+
            '"attachments": ['+
            '{'+
            '"fileUrl": ""'+
            '}'+
            '],'+
            '"end": {'+
            '"dateTime": "' + strEndTime + '"' +
            '},'+
            '"reminders": {'+
            '"useDefault": true'+
            '},'+
            '"start": {'+
            '"dateTime": "' + strStartTime + '"' +
            '},'+
            '"summary": "' + eventName + '",'+
            '"location": "100 Main St"'+
            '}';
        System.debug('#### createEventBody  '+createEventBody );
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        HttpResponse HttpRes = new HttpResponse();
        
        httpReq.setEndpoint(createEventEndPoint);
        httpReq.setMethod('POST');
        httpReq.setBody(createEventBody );
        httpReq.setHeader('Content-Type', 'application/json');
        httpReq.setHeader('Authorization','Bearer '+accessToken);

        Integer statusCode;
        String respBody;
        try{
            if (!Test.isRunningTest()) {
                HttpRes = http.send(httpReq);
                statusCode = HttpRes.getStatusCode();
                respBody = HttpRes.getBody();
            }
            else {
                statusCode = 200;
                respBody = 'mock http response body';
            }

            if(statusCode == 200){
                System.debug('Create Calendar Event Successful: ' + respBody);
            }else{
                System.debug('Create Calendar Event Faile: StatusCode=' + statusCode + '; Resp body=' + respBody);
            }
        }catch(System.Exception e){
            System.debug('#### Exception Executed : '+e.getMessage() + '  '+e.getStackTraceString() + ' '+e.getLineNumber());
        }
    }
    
    @future(callout=true)
    public static void bookPhysicianCalendar(String appointmentId){
        String privateKey;
        String serviceAccount;
        GoogleServiceAccount__mdt mdtRecord = [SELECT PrivateKey__c, Account__c FROM GoogleServiceAccount__mdt WHERE DeveloperName = 'ServiceAccount' LIMIT 1];
        privateKey = mdtRecord.PrivateKey__c;
        serviceAccount = mdtRecord.Account__c;

        Appointment__c appt = [SELECT Name, Start_Time__c, End_Time__c, Physician__r.GMail__c FROM Appointment__c WHERE Id =: appointmentId LIMIT 1];

        String googleAccount = appt.Physician__r.Gmail__c;  //'toptalphysician2@gmail.com';
        String eventName = 'Event Created By Toptal: ' + appt.Name;                       //'Toptal Event';
        String strStartTime = appt.Start_Time__c.format('yyyy-MM-dd HH:mm:ssZ');           //'2021-09-06T05:00:00-0400'
        strStartTime = strStartTime.replace(' ', 'T');
        System.debug('bookPhysicianCalendar(): strStartTime: ' + strStartTime);
        String strEndTime = appt.End_Time__c.format('yyyy-MM-dd HH:mm:ssZ');               //'2021-09-06T05:30:00-0400'
        strEndTime = strEndTime.replace(' ', 'T');
        System.debug('bookPhysicianCalendar(): strEndTime: ' + strEndTime);

        String JWT = createGoogleJWT(privateKey, serviceAccount);
        String accessToken = getGoogleAccessToken(JWT);

        createCalendarEvent(accessToken, googleAccount, eventName, strStartTime, strEndTime);
    }

    //@future(callout=true)
    public static void sendPhysicianEmail(String appointmentId) {
        //Make sure Setup > Email Deliverability is on.

        Appointment__c appt = [SELECT Name, Start_Time__c, Physician__r.Name, Physician__r.GMail__c, Patient__r.Name FROM Appointment__c WHERE Id =: appointmentId];
        System.debug('sendPhysicianEmail(): appt: ' + appt);
        String toAddress = appt.Physician__r.Gmail__c;
        System.debug('sendPhysicianEmail(): toAddress: ' + toAddress);
        String toName = appt.Physician__r.Name;
        System.debug('sendPhysicianEmail(): toName: ' + toName);
        String apptName = appt.Name;
        System.debug('sendPhysicianEmail(): apptName: ' + apptName);
        DateTime startTime = appt.Start_Time__c;
        String strStartTime = startTime.format('yyyy-MM-dd HH:mm');

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        List<String> addresses = new List<String>();
        addresses.add(toAddress);
        mail.setToAddresses(addresses);
        
        ToptalEmailAddress__mdt mdt_record = [SELECT EmailAddress__c FROM ToptalEmailAddress__mdt WHERE DeveloperName = 'FromEmailAddress' LIMIT 1];
        String fromAddress = mdt_record.EmailAddress__c;
        System.debug('sendPhysicianEmail(): fromAddress: ' + fromAddress);

        //The From address needs to be set up in Setup > Organization-Wide Addresses.
        OrgWideEmailAddress[] owea = [select Id from OrgWideEmailAddress where Address =: fromAddress];
        if (!owea.isEmpty()) {
            mail.setOrgWideEmailAddressId(owea[0].Id);
            System.debug('sendPhysicianEmail(): OrgWideEmailAddress[0].Id: ' + owea[0].Id);
        }
        else {
            mail.setSenderDisplayName ('Toptal Physician Scheduling');
        }
        
        mail.setSubject('A patient appointment has been added to your Google Calendar');
        mail.setPlainTextBody(
            'Dear ' + toName + ',\n' +
            'A 30-minute appointment "' + apptName + '" has been created for you at ' + strStartTime + '.\n\n' + 
            'Thank you.\n\n' +
            'Toptal Physician Scheduling Service'
            );
        
        List<Messaging.SendEmailResult> rs = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        for (Messaging.SendEmailResult r : rs) {
            if (r.isSuccess()) {
                System.debug('sendPhysicianEmail(): email sent successfully');
            } else {
                for(Messaging.SendEmailError err : r.getErrors()) { 
                    System.debug('sendPhysicianEmail(): Failed to send email: ' + err.getMessage()); 
                }
            }
        }   
    }
}