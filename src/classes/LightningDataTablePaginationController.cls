/*
Created By: Riya Khandelwal
Class Name: LightningDataTablePaginationController
Description: Controller for LightningDataTablePagination component
Created Date: Oct 27th, 2018
*/
public with sharing class LightningDataTablePaginationController {
    
    /*
    Method to fetch accounts to be displayed on selected page number
    @param pageNumber: Page number of the records to be displayed
    @param recordToDisply: records to be displayed per page
    @param fieldName: field Name by which table is sorted
    @param sortDirection: sorting direction - asc or desc
    Returns AccountPagerWrapper object that contains info of account records to be displayed
    */
    @AuraEnabled
    public static AccountPagerWrapper fetchAccount(Decimal pageNumber, Integer recordToDisply, String fieldName, String sortDirection) {
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
    
    // Wrapper class with @AuraEnabled Properties    
    public class AccountPagerWrapper {
        @AuraEnabled public Integer pageSize {get;set;}
        @AuraEnabled public Integer page {get;set;}
        @AuraEnabled public Integer total {get;set;}
        @AuraEnabled public List<Account> accounts {get;set;}
    }
}