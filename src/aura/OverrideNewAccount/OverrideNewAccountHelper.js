({
    validateAccountForm: function(component) {
        var validAccount = true;
         // Show error messages if required fields are blank
        var allValid = component.find('accountField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
        if (allValid) {
        	return(validAccount);
            
        }  
	}
       
})