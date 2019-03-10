({ 
    /*
    Helper Method to call server side action fetchAccount to fetch accounts to be displayed on the current page
    */
    getAccounts: function(component, page, recordToDisply, sortTapped, fieldName, sortDirection) {
    
        // create a server side action. 
        var action = component.get("c.fetchAccount");
        // set the parameters to method 
        action.setParams({
            "pageNumber": page,
            "recordToDisply": recordToDisply,
            "sortDirection": sortDirection,
            "fieldName": fieldName
        });
        // set a call back   
        action.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         var result = a.getReturnValue();
         console.log('result ---->' + JSON.stringify(result));
         // set the component attributes value with wrapper class properties.   
        if(result){
             if(result.accounts && result.accounts.length > 0){
                component.set("v.Accounts", result.accounts);
             }
             if(result.page){
                component.set("v.page", result.page);
             }
             if(result.total){
                component.set("v.total", result.total);
                component.set("v.pages", Math.ceil(result.total / recordToDisply));
             }
             
             if(sortTapped){
                component.set("v.Accounts", result.accounts);
             }
        }    
        });
        // enqueue the action 
        $A.enqueueAction(action);
    }
})