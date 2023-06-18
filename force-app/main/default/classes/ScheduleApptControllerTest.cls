@isTest
public class ScheduleApptControllerTest {
    @TestSetup
    public static void makeData(){
        Subspecialty__c ss = new Subspecialty__c();
        ss.Name = 'General Practice';
        ss.Appointment_Price__c = 100;
        insert ss;

        Physician__c ph = new Physician__c();
        ph.Name = 'Dr. Hyde';
        ph.Subspecialty__c = ss.Id;
        ph.Gmail__c = 'randyzyu@gmail.com';
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
    public static void testGetPatients() {
        Test.startTest();
        List<Patient__c> patients = ScheduleApptController.getPatients();
        System.assert(patients.size() > 0, 'Failed to get patients');
        Test.stopTest();
    }

    @isTest
    public static void testGetSubspecialties() {
        Test.startTest();
        List<Subspecialty__c> subspecialties = ScheduleApptController.getSubspecialties();
        System.assert(subspecialties.size() > 0, 'Failed to get subspecialties');
        Test.stopTest();
    }

    @isTest
    public static void testGetPhysicians() {
        Subspecialty__c ss = [SELECT Id FROM Subspecialty__c LIMIT 1];
        Test.startTest();
        List<Physician__c> physicians = ScheduleApptController.getPhysicians(ss.Id);
        System.assert(physicians.size() > 0, 'Failed to get physicians');
        Test.stopTest();
    }

    @isTest
    public static void testGetAppointments() {
        Subspecialty__c ss = [SELECT Id FROM Subspecialty__c LIMIT 1];
        Test.startTest();
        List<Appointment__c> appts = ScheduleApptController.getAppointments(ss.Id, '2021-09-30');
        System.assert(appts.size() > 0, 'Failed to get appointments');
        Test.stopTest();
    }

    @isTest
    public static void testSaveAppointment() {
        Physician__c ph = [SELECT Id FROM Physician__c LIMIT 1];
        Patient__c p = [SELECT Id FROM Patient__c LIMIT 1];
        Test.startTest();
        String startTime = '2021-09-30 10:00:00';
        String physicianId = ph.Id;
        String patientId = p.Id;
        String apptId = ScheduleApptController.saveAppointment(startTime, physicianId, patientId);
        System.assert(apptId != null, 'Failed to save appointment');
        Test.stopTest();
    }
}