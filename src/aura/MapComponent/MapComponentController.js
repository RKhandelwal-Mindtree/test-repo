({
    contactSelected : function(component, event) {
        var contact = event.getParam("contact");
        component.set('v.contact', contact);
        var message = component.get('v.contact');
        var vfOrigin = "https://" + component.get("v.vfHost");
        var vfWindow = component.find("vfFrame").getElement().contentWindow;
        vfWindow.postMessage(message, vfOrigin);
    }

})