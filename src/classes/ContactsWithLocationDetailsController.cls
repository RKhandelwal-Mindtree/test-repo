public with sharing class  ContactsWithLocationDetailsController {
    @AuraEnabled
    public static Contact saveContactRec(String ctid, String lat, String lon) {
        
        System.debug('lat'+lat);
        System.debug('ctid'+ctid);
        System.debug('lon'+lon);
        
        Decimal lt = Decimal.valueOf(lat);
        Decimal ln = Decimal.valueOf(lon);
        
        Contact cct = [SELECT id, name, title, phone, mobilephone, Account.Name , MailingLongitude, MailingLatitude from Contact where id = : ctid];
        cct.MailingLatitude = lt;
        cct.MailingLongitude = ln;
        update cct;
        
        //update cnct;
        return cct;
    }
    
    @AuraEnabled
    public static Contact findById(String contactId) {
        return [SELECT id, name, title, phone, mobilephone, Account.Name , MailingLongitude, MailingLatitude
                    FROM Contact WHERE Id = :contactId];
    }
}