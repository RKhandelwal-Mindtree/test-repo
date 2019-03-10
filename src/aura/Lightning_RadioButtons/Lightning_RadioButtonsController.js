({
	toggleRadioButton: function(component, event, helper) {
    var selectedRadio = component.get("v.selectedRadio");
      if(selectedRadio == event.target){
        event.target.checked = false;
        selectedRadio = null;
        component.set("v.selectedRadio", null);
      } else {
        selectedRadio = event.target;
        component.set("v.selectedRadio", selectedRadio);
      }
	}
})