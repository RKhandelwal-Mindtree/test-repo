({
	getPageCountAndTotal : function(component,rCount) {
		var action = component.get("c.getPageCountInfo");
        action.setParams({
            "pageCountInfo" : rCount
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.pageCounterInfo", response.getReturnValue());                
            }
        });
        $A.enqueueAction(action);
	},
    
    resetCounters : function (component,pNum,rCunt,totalPage) {
        var action = component.get("c.getPageCountChange");
	    action.setParams({
            "pageNumber" : pNum.toString(),
            "currentPagesCount" : rCunt.toString(),
            "totalPages" : totalPage.toString()
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.pageCounterInfo", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
})