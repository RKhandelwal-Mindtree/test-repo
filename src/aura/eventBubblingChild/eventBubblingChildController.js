(/*eventBubblingChildController.js*/
{
    handleBubbling : function(component, event) {
        console.log("Child handler for " + event.getName());
        console.log("v.body"+component.get("v.body"));
    }
})