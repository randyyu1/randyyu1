global class MyEmailHandler implements Messaging.InboundEmailHandler {
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope){
        Messaging.InboundEmailResult res = new Messaging.InboundEmailResult();
        String emailBody = email.plainTextBody;
        System.debug(emailBody);
        //You can create an Account record based on the emailBody
      	return res;
    }
}