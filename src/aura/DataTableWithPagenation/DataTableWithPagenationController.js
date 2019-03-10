({
   doInit: function(component, event, helper) {
      // this function call on the component load first time     
      // get the page Number if it's not define, take 1 as default
     
      var page = component.get("v.page") || 1;
      // get the select option (drop-down) values.   
      var recordToDisply = component.find("recordSize").get("v.value");
      var sortByFieldName = component.get("v.sortedBy");
      var sortDirection = component.get("v.sortedDirection");
       component.set('v.mycolumns', [
                   {label: 'Account Name', fieldName: 'Name', type: 'Name', sortable:'true'},                   
                {label: 'Phone', fieldName: 'Phone', type: 'Phone', sortable:'true'},
                {label: 'Email', fieldName: 'Email__c', type: 'Email', sortable:'true'}
            ]);
      component.set('v.mapOfApiNamesAndLabel',  {'Name' : 'Account Name', 'Phone': 'Phone', 'Email__c': 'Email'});
      var mapOfApiNames = component.get('v.mapOfApiNamesAndLabel');
      
      if(mapOfApiNames)
      component.set('v.sortedByFname', mapOfApiNames['Name']);
      // call the helper function   
      helper.getAccounts(component, page, recordToDisply, false, sortByFieldName, sortDirection);
 
   },
 
   navigate: function(component, event, helper) {
      // this function call on click on the previous page button  
      var page = component.get("v.page") || 1;
      // get the previous button label  
      var direction = event.getSource().get("v.label");
      // get the select option (drop-down) values.  
      var recordToDisply = component.find("recordSize").get("v.value");
      var sortByFieldName = component.get("v.sortedBy");
      var sortDirection = component.get("v.sortedDirection");
      // set the current page,(using ternary operator.)  
      if(direction == 'Last'){
        page = component.get('v.pages');  
      }else if(direction == 'First'){
        page = 1;  
      }else{
        page = direction === "Previous Page" ? (page - 1) : (page + 1);
      }
      // call the helper function
      helper.getAccounts(component, page, recordToDisply, false, sortByFieldName, sortDirection);
 
   },
    updateColumnSorting: function(component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        // assign the latest attribute with the sorted column fieldName and sorted direction
        component.set("v.sortedBy", fieldName);
        var mapOfApiNames = component.get('v.mapOfApiNamesAndLabel');
        if(mapOfApiNames)
        component.set('v.sortedByFname', mapOfApiNames[fieldName]);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },
   onSelectChange: function(component, event, helper) {
      // this function call on the select opetion change,     
      var page = 1
      var recordToDisply = component.find("recordSize").get("v.value");
      var sortByFieldName = component.get("v.sortedBy");
      var sortDirection = component.get("v.sortedDirection");
      helper.getAccounts(component, page, recordToDisply, false, sortByFieldName, sortDirection);
   },
 
})