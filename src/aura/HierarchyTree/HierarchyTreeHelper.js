({
    getRootAccounts : function(cmp) {
        console.log(cmp.get("v.parentAccountId"));
        // Load all contact data
        var action = cmp.get("c.getAccounts");
        // Set save configuration parameters.
        action.setParams({
            parentAccountId : cmp.get("v.parentAccountId")            
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (cmp.isValid() && state === "SUCCESS") {
                cmp.set("v.accounts", response.getReturnValue());
            }
        });
         $A.enqueueAction(action);
    },
    
    getChildAccounts : function(component,id) {
        console.log(id + '>>>>>>' +component.get('v.level'));
        $A.createComponent(
        "c:HierarchyTree",
        {
            "parentAccountId": id,
            "level": component.get('v.level') + 1,
        },
        function(newComponent){
            if (component.isValid()) {
                console.log($('#'+id+'_childs'));
                var li2 = document.getElementById (id+'test');
                var li = component.get(id);
                console.log(li);
                console.log(newComponent);
                var body = component.get("v.body");
                body.push(newComponent);
                component.set("v.body", body);
                console.log($( "div.slds-tree-container:first" ).find('li:last-child'));
            }
        });
        //$A.enqueueAction(action);
    }
})