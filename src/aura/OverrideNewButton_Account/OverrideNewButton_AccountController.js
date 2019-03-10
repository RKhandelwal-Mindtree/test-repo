({
    doInit: function(component, event, helper) {
        helper.checkIfUserHasCreateAccess(component, event, helper);
        helper.fetcCurrentObjectFields(component, event, helper);
    },
    handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been successfully created.",
            "type": "success"
        });
        toastEvent.fire();
    },
    handleError: function(component, event, helper) {
        console.log("error");
    },
   createRecord: function(component, event, helper) {
       var objectName = component.get("v.sObjectName");
       if(objectName){
          var createRecordEvent = $A.get("e.force:createRecord");
          createRecordEvent.setParams({
             "entityApiName": objectName
          });
          createRecordEvent.fire();
       }
   },
   hideModalPopup: function(component, event, helper) {
        // Close the action panel
        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({"scope": component.get("v.sObjectName")});
        homeEvt.fire();
   }
})