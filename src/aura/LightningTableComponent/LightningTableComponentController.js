{
    doInit: function (component, event, helper) {
        helper.getAllSobjectRecords(component, component.get("v.pageNumber"), component.get("v.currentPagesCount"));
    },
    pageChange: function(component, event, helper) {
        var pageNumber = event.getParam("pageNumber");
        var currentPageCount = event.getParam("currentPagesCount");

        component.set("v.pageNumber", pageNumber);
        component.set("v.currentPagesCount", currentPageCount);

        helper.getAllSobjectRecords(component, pageNumber, currentPageCount);
    },

    recordCounterChange : function(component, event, helper){
        var currentPageCount = event.getParam("currentPagesCount");
        component.set("v.pageNumber", '1');
        component.set("v.currentPagesCount", currentPageCount);
        helper.getAllSobjectRecords(component,'1', currentPageCount);
    },
}