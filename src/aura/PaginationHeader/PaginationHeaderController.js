({
    
    changeRecordNumber : function(component, event, helper) {
        var currentPagesCount  = component.find("selectItem").get("v.value");
        var myEvent = $A.get("e.c:PageTotalChangeEvt");
        myEvent.setParams({ "currentPagesCount": currentPagesCount});
        myEvent.fire();

	},
    
})