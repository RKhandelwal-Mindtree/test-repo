({
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
                 var reverse = sortDirection !== 'asc';
                //sorts the rows based on the column header that's clicked
                //result.accounts.sort(this.sortBy(fieldName, reverse))
                component.set("v.Accounts", result.accounts);
             }
        }    
      });
      // enqueue the action 
      $A.enqueueAction(action);
   },
   sortData: function (cmp, fieldName, sortDirection) {
        var data = this.getAccounts(cmp, cmp.get('v.page'), cmp.find("recordSize").get("v.value"), true, fieldName, sortDirection);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = ( key(a) ? key(a).toLowerCase() : key(a) ), b = ( key(b) ? key(b).toLowerCase() : key(b)), reverse * ((a > b) - (b > a));
        }
    }
})