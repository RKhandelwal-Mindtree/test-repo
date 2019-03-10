/*
 * Author: Enrico Murru (http://enree.co, @enreeco)
 */
public class InputLookupAuraController {
    
    /*
     * Loads the initial value of the given SObject type with ID "value"
	 */
    /*
	@AuraEnabled
    public static String getCurrentValue(String type, String value){
        System.debug('type'+type);
        System.debug('value'+value);
        System.debug('Inside getCurrentValue1');
        if(String.isBlank(type)){
            return null;
        }
        System.debug('Inside getCurrentValue2');
        ID lookupId = null;
        try{ 
            System.debug('Inside getCurrentValue3');
        	lookupId = (ID)value;
        }catch(Exception e){
            return null;
        }
        System.debug('Inside getCurrentValue4');
        if(String.isBlank(lookupId)){
            return null;
        }
        System.debug('Inside getCurrentValue5');
        SObjectType objType = Schema.getGlobalDescribe().get(type);
        if(objType == null){
            return null;
        }

        String nameField = getSobjectNameField(objType);
        String query = 'Select Id, '+nameField+' From '+type+' Where Id = \''+lookupId+'\'';
        System.debug('### Query: '+query);
        List<SObject> oList = Database.query(query);
        if(oList.size()==0) {
            return null;
        }
		return (String) oList[0].get(nameField);
    }
    */
    
    /*
     * Utility class for search results
	*/
    public class SearchResult{
        public String value{get;Set;}
        public String id{get;set;}
    }
    
    /*
     * Returns the "Name" field for a given SObject (e.g. Case has CaseNumber, Account has Name)
	*/
    private static String getSobjectNameField(SobjectType sobjType){
        
        //describes lookup obj and gets its name field
        String nameField = 'Name';
        Schema.DescribeSObjectResult dfrLkp = sobjType.getDescribe();
        for(schema.SObjectField sotype : dfrLkp.fields.getMap().values()){
            Schema.DescribeFieldResult fieldDescObj = sotype.getDescribe();
            if(fieldDescObj.isNameField() ){
            	nameField = fieldDescObj.getName();
                break;
            }
        }
        return nameField;
    }
	
    /*
     * Searchs (using SOSL) for a given Sobject type
     */
    @AuraEnabled
    public static String searchSObject(String searchString){
        /*
        if(String.isBlank(type) || String.isBlank(searchString)){
            return null;
        }
        
        SObjectType objType = Schema.getGlobalDescribe().get(type);
        if(objType == null){
            return null;
        }
        
        String nameField = getSobjectNameField(objType);
        searchString = '\'*'+searchString+'*\'';
        String soslQuery = 'FIND :searchString IN NAME FIELDS RETURNING '
                          + type +'(Id, '+nameField+' ORDER BY '+nameField+') LIMIT 20';
		System.debug('SOSL QUERY: '+soslQuery);
		*/
        /*
        List<List<SObject>> results =  Search.query(soslQuery);
        
        List<SearchResult> output = new List<SearchResult>();
        if(results.size()>0){
            for(SObject sobj : results[0]){
                SearchResult sr = new SearchResult();
                sr.id = (String)sobj.get('Id');
                sr.value = (String)sobj.get(nameField);
                output.add(sr)   ;
            }
        }
        */
        List<SearchResult> output = new List<SearchResult>();

        List<String> results =  new List<String>{'Test','Riya','Saikat','Abhinav','Gorisha'};
        for(Integer i=0;i<results.size();i++){
                SearchResult sr = new SearchResult();
                sr.id = 'id'+i;
                sr.value = results[i];
                output.add(sr)   ;
            }
        
        return JSON.serialize(output);
    }
    
      
}