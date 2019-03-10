({
	doInit : function(component, event, helper) {
        // Retrieve contacts during component initialization
        var expand = component.get("v.expand");
        var parentId = component.get("v.parentId");
        //var level = component.get("v.level");
        console.log(parentId + '>>>>' +expand);
        if(expand == true) {
        	$A.createComponent(
            "c:HierarchyTree",
            {
                "parentAccountId": parentId,
                "level": component.get('v.level') + 1,
            },
            function(newComponent){
                if (component.isValid()) {
                    var body = component.get("v.body");
                    body.push(newComponent);
                    component.set("v.body", body);
                }
            });
        }
    }
})