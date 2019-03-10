({
	contactSelected : function(component, event, helper) {
		var event = $A.get("e.c:ContactSelected");
        event.setParams({"contact": component.get("v.contact")});
        event.fire();   
	}
})