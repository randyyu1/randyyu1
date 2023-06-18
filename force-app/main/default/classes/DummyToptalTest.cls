@isTest
public class DummyToptalTest {
    @isTest
    public static void test1() {
        Test.startTest();

        Subspecialty__c Cardiology = new Subspecialty__c(Name='Cardiology', Appointment_Price__c=200);
        insert Cardiology;
        Subspecialty__c Endocrinology = new Subspecialty__c(Name='Endocrinology', Appointment_Price__c=150);
        insert Endocrinology;
        Subspecialty__c Rheumatology = new Subspecialty__c(Name='Rheumatology', Appointment_Price__c=100);
        insert Rheumatology;
        Subspecialty__c General_Practice = new Subspecialty__c(Name='General Practice', Appointment_Price__c=50);
        insert General_Practice;

        List<Subspecialty__c> lst1 = [select Id from Subspecialty__c];
        System.debug('Subspecialty__c records created: ' + lst1.size());

        List<Physician__c> phs = new List<Physician__c>();
        Physician__c ph1 = new Physician__c(Name='Dr. Carly Cann', Gmail__c='toptalphysician1@gmail.com', Subspecialty__c=Cardiology.Id);
        phs.add(ph1);
        Physician__c ph2 = new Physician__c(Name='Dr. Cat Catt', Gmail__c='toptalphysician2@gmail.com', Subspecialty__c=Cardiology.Id);
        phs.add(ph2);
        Physician__c ph3 = new Physician__c(Name='Dr. Chris Coon', Gmail__c='toptalphysician2@gmail.com', Subspecialty__c=Cardiology.Id);
        phs.add(ph3);
        Physician__c ph4 = new Physician__c(Name='Dr. Ella Edward', Gmail__c='toptalphysician1@gmail.com', Subspecialty__c=Endocrinology.Id);
        phs.add(ph4);
        Physician__c ph5 = new Physician__c(Name='Dr. Ethan Eaton', Gmail__c='toptalphysician2@gmail.com', Subspecialty__c=Endocrinology.Id);
        phs.add(ph5);
        Physician__c ph6 = new Physician__c(Name='Dr. Gigi Garland', Gmail__c='toptalphysician1@gmail.com', Subspecialty__c=General_Practice.Id);
        phs.add(ph6);
        Physician__c ph7 = new Physician__c(Name='Dr. Gina Groom', Gmail__c='toptalphysician1@gmail.com', Subspecialty__c=General_Practice.Id);
        phs.add(ph7);
        Physician__c ph8 = new Physician__c(Name='Dr. Guy Grant', Gmail__c='toptalphysician2@gmail.com', Subspecialty__c=General_Practice.Id);
        phs.add(ph8);
        Physician__c ph9 = new Physician__c(Name='Dr. Gary Goon', Gmail__c='toptalphysician2@gmail.com', Subspecialty__c=General_Practice.Id);
        phs.add(ph9);
        Physician__c ph10 = new Physician__c(Name='Dr. Rebecca Reeds', Gmail__c='toptalphysician1@gmail.com', Subspecialty__c=Rheumatology.Id);
        phs.add(ph10);
        Physician__c ph11 = new Physician__c(Name='Dr. Roy Rhodes', Gmail__c='toptalphysician2@gmail.com', Subspecialty__c=Rheumatology.Id);
        phs.add(ph11);
        insert phs;

        List<Physician__c> lst2 = [select Id from Physician__c];
        System.debug('Physician__c records created: ' + lst2.size());

        List<Patient__c> ps = new List<Patient__c>();
        ps.add(new Patient__c(Name='Patty Schick'));
        ps.add(new Patient__c(Name='Peggy Eelle'));
        ps.add(new Patient__c(Name='Peter Pan'));
        ps.add(new Patient__c(Name='Penny Poore'));
        insert ps;

        List<Patient__c> lst3 = [select Id from Patient__c];
        System.debug('Patient__c records created: ' + lst3.size());

        Test.stopTest();
    }
}