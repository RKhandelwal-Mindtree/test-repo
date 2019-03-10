({
	handleLocationDetailsEvt : function(component, event, helper) {
        console.log(':::::locationName:::::'+event.getParam('locationName'));
        var dropOffComp = component.find("dropOffLocDetail");
        debugger;
        dropOffComp.set('v.locationValue', event.getParam('locationName'));
        console.log(':::::component:::::'+dropOffComp.get('v.locationValue'));
	}
})