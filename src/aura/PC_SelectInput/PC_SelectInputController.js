({
	afterScriptsLoaded : function(component, event, helper) {
		helper.select2(component, event, helper);
	},
	handleDestroy : function(component, event, helper){
		helper.handleDestroy(component, event, helper);
	},
	itemsChanged : function(component, event, helper){
		helper.itemsSelect(component, event, helper);
	}
})