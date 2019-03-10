public with sharing class FileUploadController {
    
    @AuraEnabled
    public static Id saveChunk(String parentObject, String fileName, String base64Data, String contentType, String fileId) {
        // check if fileId id ''(Always blank in first chunk), then call the saveTheFile method,
        //  which is save the check data and return the attachemnt Id after insert, 
        //  next time (in else) we are call the appentTOFile() method
        //   for update the attachment with reamins chunks   
        if (fileId == '') {
            Document doc = new Document();
            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            doc.body = EncodingUtil.base64Decode(base64Data);
            doc.Name = fileName;
            doc.ContentType = contentType;
            doc.AuthorId = UserInfo.getUserId();
            doc.FolderId = UserInfo.getUserId(); // put it in running user's folder
            insert doc;
            fileId = doc.Id;
        } else {
            appendToFile(fileId, base64Data);
        }
        System.debug('doc :: '+fileId);
        return fileId;
    }

    private static void appendToFile(Id fileId, String base64Data) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        Document doc = [SELECT Id, FolderId, Folder.Name, Body FROM Document WHERE Id=:fileId LIMIT 1];
        String existingBody = EncodingUtil.base64Encode(doc.Body);
        doc.Body = EncodingUtil.base64Decode(existingBody + base64Data);
        update doc;
    }
    
    @AuraEnabled
    public static Map<String, String> parseXMLAndGenerateMapping(string objectName, string documentId) {
        Map<String, String> mapOfResult = new Map<String, String>();
        List<Map<String, String>> mapOfFields = new List<Map<String, String>>();
        try{
            DOM.Document doc = new DOM.Document(); 
            Document file = [SELECT Id, Body from Document where Id =:documentId ];
            doc.load(file.Body.toString());
            DOM.XMLNode node = doc.getRootElement();
            if (node.getNodeType() == DOM.XMLNodeType.ELEMENT && node.getName() == 'Records') {
                system.debug(node.getName());
                for (Dom.XMLNode objectRec: node.getChildElements()) {
                    Map<String, String> recordData = new Map<String, String>();
                    if(objectRec.getName() == objectName){
                        for (Dom.XMLNode child: objectRec.getChildElements()) {
                            recordData.put(child.getName(), child.getText());
                        }
                        mapOfFields.add(recordData);
                    }
                }
                mapOfResult.put('Success', JSON.serialize(mapOfFields));
            }else{
                mapOfResult.put('Error', 'Please import a valid XML');
            }
        }catch(System.XMLException e){
            mapOfResult.put('Error', e.getMessage());
        }
        return mapOfResult;
    }

    // [{"AccFax":"2314567890","AccPhone":"9875432120","AccName":"ABC Test RK"},{"AccFax":"2314567893","AccPhone":"9875432122","AccName":"ABC Test RK 1"},{"AccFax":"2314567896","AccPhone":"98754321205","AccName":"ABC Test RK 3"}]
    @AuraEnabled 
    public static String saveData(string objectName, Map<String,String> mappingCreated, List<Map<String, String>> data, String documentId) {
        try{
            List<sObject> recordsToImport = new List<sObject>(); 
            System.debug('data'+data);
            System.debug('objectName'+objectName);
            System.debug('mappingCreated'+mappingCreated);
            System.debug('documentId'+documentId);
            //{Fax=AccFax, Name=AccName, Phone=AccPhone}
            Map<String, List<String>> mapOfXMLFieldAndSobjectFields = new Map<String, List<String>>();
            for(String apiName : mappingCreated.keySet()){
                if(!mapOfXMLFieldAndSobjectFields.containskey(mappingCreated.get(apiName))){
                    mapOfXMLFieldAndSobjectFields.put(mappingCreated.get(apiName), new List<String>{apiName});
                }else{
                    mapOfXMLFieldAndSobjectFields.get(mappingCreated.get(apiName)).add(apiName);
                }
            }
            System.debug('mapOfXMLFieldAndSobjectFields'+mapOfXMLFieldAndSobjectFields);
            
            for(Map<String, String> record: data){
                sObject sObj = Schema.getGlobalDescribe().get(ObjectName).newSObject() ;
                for (String xmlField : record.keySet()) {
                    if(mapOfXMLFieldAndSobjectFields.containskey(xmlField)){
                        for(String apiName: mapOfXMLFieldAndSobjectFields.get(xmlField)){
                            sObj.put(apiName, record.get(xmlField));
                        }
                    }
                    System.debug('sObj:::'+sObj);
                }
                recordsToImport.add(sObj);
            }
            insert recordsToImport;
            
            Document doc = [SELECT Id from Document where Id =: documentId];
            delete doc;
            return 'Success';
        }catch(Exception e){
            return e.getMessage();
        }
    }
}