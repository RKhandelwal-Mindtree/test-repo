({
    
	openthePage : function(component, event, helper) {

	    var myEvent = $A.get("e.c:PageChangeEvt");
        var pageNumber = component.get("v.pageNumber");

        myEvent.setParams({
            "pageNumber": pageNumber,
            "currentPagesCount": component.get("v.currentPagesCount")
        });

        myEvent.fire();
	}
})