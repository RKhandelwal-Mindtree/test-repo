public with sharing class OverrideNewButton_AccountController {

    @AuraEnabled
    public static Boolean checkIfUserHasAccess(String objectName) {
        sObject sObj = Schema.getGlobalDescribe().get(ObjectName).newSObject() ;
        Schema.sObjectType objType = sObj.getSObjectType();
        Schema.DescribeSObjectResult objectRes = objType.getDescribe();
        return objectRes.isCreateable();
    }
    
    @AuraEnabled
    public static List<Map<String, String>> fetchObjectFields(String objectName){
        Map<String, Schema.SObjectField> fields = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        List<Map<String, String>> editableFields = new List<Map<String, String>>();
        editableFields.add(new Map<String, String>{'value' => '-- None --', 'label' => '-- None --'});
        for(Schema.SObjectField fieldRef : fields.values()) {
            Schema.DescribeFieldResult fieldResult = fieldRef.getDescribe();
            if(fieldResult.isUpdateable()) {
                Map<String, String> mapOfAPINameAndLabel = new Map<String, String>{'value' => fieldResult.getname(), 'label' => fieldResult.getLabel()};
                editableFields.add(mapOfAPINameAndLabel);
            }
        }
        return editableFields;
    }
}