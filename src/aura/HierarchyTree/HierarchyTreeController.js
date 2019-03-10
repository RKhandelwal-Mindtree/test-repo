({
	doInit : function(component, event, helper) {
        // Retrieve contacts during component initialization
        helper.getRootAccounts(component);
    },//Delimiter for future code
    
    getChilds : function(component, event, helper) {
        
        var el = event.srcElement;
	    var id = el.dataset.id;
        component.set('v.lastExpanded' , id);

        //helper.getChildAccounts(component,id);
    },
    waiting: function(component, event, helper) {
        var ele = component.get('v.lastExpanded');
        if(ele != 'undefined' && ele != '' && ele != null) {
            var eleName = ele + '_img'; 
            console.log(eleName);
            var element =  document.getElementById(eleName);
            if (typeof(element) != 'undefined' && element != null)
            {
                element.className = 'small-spinner uploading';
            }
            //$('#'+eleName).addClass('uploading');            
            //$('#'+eleName).removeClass('notUploading');
            //$A.util.addClass(component.find(eleName).getElement(), "uploading");
            //$A.util.removeClass(component.find(eleName).getElement(), "notUploading");
        }
    },
    
    doneWaiting: function(component, event, helper) {
        var ele = component.get('v.lastExpanded');
        if(ele != 'undefined' && ele != '' && ele != null) {
             var eleName = ele + '_img'; 
            console.log(eleName);
            var element =  document.getElementById(eleName);
            if (typeof(element) != 'undefined' && element != null)
            {
                element.className = 'small-spinner notUploading';
            }
            //$('#'+eleName).addClass('notUploading');            
            //$('#'+eleName).removeClass('uploading');
            //$A.util.removeClass(component.find("uploading").getElement(), "uploading");
            //$A.util.addClass(component.find("uploading").getElement(), "notUploading");
        }
    },
})