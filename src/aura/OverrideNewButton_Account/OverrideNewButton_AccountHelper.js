({
    showHide : function(component) {
        var editForm = component.find("editForm");
        $A.util.toggleClass(editForm, "slds-hide");
    },
    checkIfUserHasCreateAccess: function(component, event, helper) {
        // create a server side action. 
        var action = component.get("c.checkIfUserHasAccess");
        // set the parameters to method 
        action.setParams({
            "objectName": component.get('v.sObjectName')
        });
        // set a call back   
        action.setCallback(this, function(a) {
         var result = a.getReturnValue();
         var state = a.getState();
            if (state === "SUCCESS") {
                console.log('result ---->',result );
                if(result){
                    component.set("v.hasAccess", true);
                }else{
                    component.set("v.hasAccess", false);
                    component.set("v.type", 'warning');
                    component.set("v.message", 'You do not have access to create records for this Object!');
                }   
            }else if (state === "INCOMPLETE") {
                component.set("v.hasAccess", false);
                component.set("v.type", 'error');
                component.set("v.message", a.getReturnValue());
            } else if (state === "ERROR") {
                var errors = a.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                        component.set("v.hasAccess", false);
                        component.set("v.type", 'error');
                        component.set("v.message", errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action 
        $A.enqueueAction(action);
    },
    fetcCurrentObjectFields: function(component, event, helper) {
        // create a server side action. 
        var action = component.get("c.fetchObjectFields");
        // set the parameters to method 
        action.setParams({
            "objectName": component.get('v.sObjectName')
        });
        // set a call back   
        action.setCallback(this, function(a) {
         var result = a.getReturnValue();
         var state = a.getState();
            if (state === "SUCCESS") {
                console.log('result ---->',result );
                if(result){
                    component.set("v.objectFields", result);
                    console.log('result:: object fields --> ',result);
                }
            }else if (state === "INCOMPLETE") {
                console.log("Error message: " + errors[0].message);
            } else if (state === "ERROR") {
                var errors = a.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action 
        $A.enqueueAction(action);
    }
})