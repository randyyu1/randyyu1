({
	myClientMethod : function(component) {
		var action = component.get("c.getOpportunities");
        action.setCallback(this, function(response) {
            debugger;
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.opportunities", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})