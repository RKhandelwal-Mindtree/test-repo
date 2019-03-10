public class PC_SelectInputController {

    @auraEnabled
    public static List<Account> searchContactsAction(String accountname){

        String fnd = accountname + '%';

        return [ select name FROM Account where name like:fnd];
    }
}