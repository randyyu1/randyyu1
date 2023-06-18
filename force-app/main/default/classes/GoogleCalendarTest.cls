@isTest
public class GoogleCalendarTest {
    @TestSetup
    public static void makeData(){
        Subspecialty__c ss = new Subspecialty__c();
        ss.Name = 'General Practice';
        ss.Appointment_Price__c = 100;
        insert ss;

        Physician__c ph = new Physician__c();
        ph.Name = 'Dr. Hyde';
        ph.Subspecialty__c = ss.Id;
        ph.Gmail__c = 'test@test.com';
        insert ph;

        Patient__c p = new Patient__c();
        p.Name = 'Peter Pan';
        insert p;

        Appointment__c appt = new Appointment__c();
        appt.Name = 'Peter Pan Appointment';
        appt.Physician__c = ph.Id;
        appt.Patient__c = p.Id;
        appt.Start_Time__c = DateTime.valueOf('2021-09-30 08:00:00');
        appt.End_Time__c = appt.Start_Time__c.addMinutes(30);
        insert appt;
    }

    @isTest
    public static void testSendPhysicianEmail() {
        Appointment__c appt = [SELECT Id FROM Appointment__c LIMIT 1];
        Test.startTest();
        GoogleCalendar.sendPhysicianEmail(appt.Id);
        Test.stopTest();
    }

    @isTest
    public static void testBookPhysicianCalendar() {
        Appointment__c appt = [SELECT Id FROM Appointment__c LIMIT 1];
        Test.startTest();
        GoogleCalendar.bookPhysicianCalendar(appt.Id);
        Test.stopTest();
    }
}