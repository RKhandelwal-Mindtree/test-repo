({
	 onCheck: function(component , evt) {
         debugger;
		 var checkCmp = component.find("checkbox");
		 var resultCmp = component.find("checkResult");
		 resultCmp.set("v.value", ""+checkCmp.get("v.value"));

	 }
})