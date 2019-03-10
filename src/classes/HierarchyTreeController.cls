public class HierarchyTreeController {
	@AuraEnabled
    public static List<Account> getAccounts(String parentAccountId) {
        List<Account> accounts; 
        if(parentAccountId == null || parentAccountId == '') {
           accounts = [SELECT Id, Name FROM Account where Parentid = null];
        } else {
           accounts = [SELECT Id, Name FROM Account WHERE ParentId = :parentAccountId];
        }
        //Add isAccessible() check
        return accounts;
    }
    
    @AuraEnabled
    public static String dummyCall(String parentAccountId) {
        return '';
    }
}