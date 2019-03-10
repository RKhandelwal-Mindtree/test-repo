({
	getAllSobjectRecords : function(component,pNum,rCunt) {
		var action = component.get("c.getAllRecords");

		action.setParams({
            "pageNumber" : pNum.toString(),
            "currentPagesCount" : rCunt.toString()
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.accounts", response.getReturnValue());                
            }
        });
        $A.enqueueAction(action);	
	},
})