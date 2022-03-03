public with sharing class ContactTrigger_Helper {
    public ContactTrigger_Helper() {
    }

    public static void createEvent(list<Contact> contacts){
        Contact_Updated__e contactEvent = new Contact_Updated__e(
            Updated_Contact__c = 'The Contact ' + contacts[0].FirstName + ' ' + contacts[0].LastName + ' was Successfully Updated'
        );
        Database.SaveResult sr = Eventbus.publish(contactEvent);
        if (sr.isSuccess()) {
            System.debug('Successfully published event.');
            
        } else {
            for(Database.Error err : sr.getErrors()) {
                System.debug('Error returned: ' +
                            err.getStatusCode() +
                            ' - ' +
                            err.getMessage());
            }
        }
    }
}
