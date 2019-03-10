public class paginationController {

    @AuraEnabled
    public static List<Account> getAllRecords(String pageNumber,String currentPagesCount){
        String accountQuery = 'SELECT Id,Name,Type,Industry,Rating,BillingCity,Phone FROM Account ORDER BY Name LIMIT '+currentPagesCount+' OFFSET ';
        if(String.isBlank(pageNumber) || Integer.valueOf(pageNumber) == 1){
            accountQuery = accountQuery + ' 0';
        }else{
            accountQuery = accountQuery + String.valueOf((Integer.valueOf(pageNumber)-1)*Integer.valueOf(currentPagesCount));
        }
        system.debug('@@@ Query :: ' + accountQuery);
     	return Database.query(accountQuery);
    }
    
    
    @AuraEnabled
    public static PageInfo getPageCountInfo(String pageCountInfo){
        
        Integer currentListCount = pageCountInfo != null && pageCountInfo != '' ? Integer.valueOf(pageCountInfo) : 5;
        
        PageInfo pgn = new PageInfo();        
        pgn.totalPages = ([SELECT COUNT() FROM Account]/(currentListCount))+1;
        pgn.currentPageNumber = 1;
        List<Integer> cnt = new List<Integer>();
        for(Integer var = 0; var < pgn.totalPages; var++){
            cnt.add(var+1);
            if((var+1) == 4)
                break;
        }
        if(pgn.totalPages > 4)
            cnt.add(pgn.totalPages);
        pgn.pageCounter = cnt;
        
		return pgn;        
    }
    
    
    @AuraEnabled
    public static PageInfo getPageCountChange(String pageNumber,String currentPagesCount,String totalPages){
        PageInfo pgn = new PageInfo();
        pgn.currentPageNumber = Integer.valueOf(pageNumber);
        pgn.totalPages = Integer.valueOf(totalPages);

        List<Integer> cnt = new List<Integer>();

        if((Integer.valueOf(pageNumber)+2) < Integer.valueOf(totalPages) && Integer.valueOf(pageNumber) != 1){
            for(Integer var = (Integer.valueOf(pageNumber)-1);var < (Integer.valueOf(pageNumber)+3);var++){
                cnt.add(var);
            }
            cnt.add(pgn.totalPages);

        }else if(Integer.valueOf(pageNumber) == 1){
            for(Integer var = 1;var < 5;var++){
                cnt.add(var);
            }
            cnt.add(pgn.totalPages);
        }else{
            if(Integer.valueOf(currentPagesCount) >= pgn.totalPages){
                for(Integer var = 1;var < (pgn.totalPages+1);var++){
                    cnt.add(var);
                }
            }else{
                for(Integer var = (pgn.totalPages-4);var < (pgn.totalPages+1);var++){
                    cnt.add(var);
                }
            }
        }
        pgn.pageCounter = cnt;

        return pgn;
    }
    
    
}