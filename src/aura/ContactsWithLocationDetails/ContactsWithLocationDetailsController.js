({
	contactSelected : function(component, event, helper) {
		var contact = event.getParam("contact");
        component.set('v.contact', contact);
        component.set('v.contactName', contact.Name);
        component.set('v.contactId', contact.Id);
        component.find("latitude").set('v.value', contact.MailingLatitude);
        component.find("longitude").set('v.value', contact.MailingLongitude);
	},
    openModalPopup : function(component, event, helper) {
        document.getElementById("modal_div").style.display = "block"; 
        var contact = component.get('v.contact');
        component.find("latitude").set('v.value', contact.MailingLatitude);
        component.find("longitude").set('v.value', contact.MailingLongitude);
        /*
        var action = component.get("c.findById");
    	action.setParams({
          	"contactId": contact.Id,
        });
        action.setCallback(this, function(response) {
            var status = response.getState();
            if(status === "SUCCESS"){
                component.set("v.contact", response.getReturnValue());
                var updatedContact = component.get("v.contact");
                component.find("latitude").set('v.value', updatedContact.MailingLatitude);
        		component.find("longitude").set('v.value', updatedContact.MailingLongitude);
            }
        });
        $A.enqueueAction(action);  */  
    },
    hideModal : function(){
       document.getElementById("modal_div").style.display = "none";
    },
    saveContact : function(component, event, helper){
    	var lat =  component.find("latitude").get("v.value");
    	var lon =  component.find("longitude").get("v.value");
    	var action = component.get("c.saveContactRec");
    	action.setParams({
          	"ctid": component.get('v.contactId'),
			"lat": lat,
			"lon" :lon,
        });
        action.setCallback(this, function(response) {
            var status = response.getState();
            if(status === "SUCCESS"){
                component.set("v.contact", response.getReturnValue());
                var ev = $A.get("e.c:ContactSelected");
        		ev.setParams({"contact": component.get("v.contact")});
                ev.fire();
            }
        });
        $A.enqueueAction(action);
	}
    
})