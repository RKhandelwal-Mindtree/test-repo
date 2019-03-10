({
	doInit : function(component, event, helper) {
	    var rCount = '';
		helper.getPageCountAndTotal(component,rCount);
	},

    // Go to previous page
	goPreviousPage : function (component, event, helper) {
        var totalPages = component.get("v.pageCounterInfo.totalPages");
        var pageNumber = component.get("v.pageCounterInfo.currentPageNumber");
        var currentPagesCount = component.get("v.currentPagesCount");

        var myEvent = $A.get("e.c:PageChangeEvt");
        myEvent.setParams({
            "pageNumber": (parseInt(pageNumber)-1).toString(),
            "currentPagesCount": currentPagesCount.toString()
        });
        myEvent.fire();
    },

    // go to next page
    goNextPage : function (component, event, helper) {
        var totalPages = component.get("v.pageCounterInfo.totalPages");
        var pageNumber = component.get("v.pageCounterInfo.currentPageNumber");
        var currentPagesCount = component.get("v.currentPagesCount");

        var myEvent = $A.get("e.c:PageChangeEvt");
        myEvent.setParams({
            "pageNumber": (parseInt(pageNumber)+1).toString(),
            "currentPagesCount": currentPagesCount.toString()
        });
        myEvent.fire();
    },

    // Page count button click and page change
    pageChange: function (component, event, helper) {
        var pageNumber = event.getParam("pageNumber");
        var currentPagesCount = event.getParam("currentPagesCount");
        var totalPages = component.get("v.pageCounterInfo.totalPages");
        helper.resetCounters(component, pageNumber, currentPagesCount,totalPages);
    },

    // Handle current record count change
    recordCounterChange : function (component, event, helper) {
        var currentPageCount = event.getParam("currentPagesCount");
        component.set("v.currentPagesCount", currentPageCount);
	    helper.getPageCountAndTotal(component, currentPageCount);
    },
    
})