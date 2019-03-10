public   with sharing class DataTableWithPagenation {

   @AuraEnabled
 public static AccountPagerWrapper fetchAccount(Decimal pageNumber ,Integer recordToDisply, String fieldName, String sortDirection) {
      Integer pageSize = recordToDisply;
      Integer offset = ((Integer)pageNumber - 1) * pageSize;
    
    // create a instance of wrapper class.
    AccountPagerWrapper obj =  new AccountPagerWrapper();
    // set the pageSize,Page(Number), total records and accounts List(using OFFSET)   
        obj.pageSize = pageSize;
        obj.page = (Integer) pageNumber;
        obj.total = [SELECT count() FROM account];
        String sQuery = 'SELECT Id, Name,Phone, Email__c FROM Account ORDER BY '+fieldName+' '+sortDirection+' NULLS LAST LIMIT '+recordToDisply+' OFFSET '+offset; 
        System.debug(':::'+sQuery);
        obj.accounts = Database.query(sQuery);
        return obj;
     }
    
 // create a wrapper class with @AuraEnabled Properties    
 public class AccountPagerWrapper {
    @AuraEnabled public Integer pageSize {get;set;}
    @AuraEnabled public Integer page {get;set;}
    @AuraEnabled public Integer total {get;set;}
    @AuraEnabled public List<Account> accounts {get;set;}
   }
}