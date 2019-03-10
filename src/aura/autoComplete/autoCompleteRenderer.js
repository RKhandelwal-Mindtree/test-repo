({
    afterRender : function(cmp,helper){
        var acctlistInput = cmp.find("atcmplbox");
        console.log(acctlistInput);
        if(acctlistInput.length > 0) {
            acctlistInput.setAttribute("list","acctlist"); 
        }
        return this.superAfterRender();
    }
})