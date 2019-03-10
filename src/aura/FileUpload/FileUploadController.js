({
    doSave: function(component, event, helper) {
        if (component.find("fileId").get("v.files").length > 0) {
            helper.uploadHelper(component, event);
        } else {
            alert('Please Select a Valid File');
        }
    },
 
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
    },
    saveRecord: function(component, event, helper) {
        console.log(component.get('v.finalMappingOfFields'));
        helper.saveRecordsInOrg(component, event, helper);
    },
    onChange: function(component, event, helper) {
        var xmlField = event.getSource().get('v.label');
        var objectField = event.getSource().get('v.value');
        // var finalMappingAttr = {};
        if(!component.get("v.finalMappingOfFields")[objectField]){
            component.get("v.finalMappingOfFields")[objectField] = xmlField;
        }
    }
})