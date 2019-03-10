({
	sendMail : function(component, event, helper) {
		
	},
    setEmailId : function(component, event, helper) {
		var message = event.getParam("emailId");
        component.set("v.user_email", message);
        console.log('email'+message );
    }
})