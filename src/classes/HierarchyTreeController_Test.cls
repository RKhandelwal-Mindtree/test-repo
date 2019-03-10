@isTest
public class HierarchyTreeController_Test {
	@isTest
    public static void testUpoadFile() {
        
        Account a = new Account();
        a.name = 'test';
        insert a;
        HierarchyTreeController.getAccounts(null);
        HierarchyTreeController.getAccounts(a.Id);
        HierarchyTreeController.dummyCall(a.Id);
        
        
    }  
}