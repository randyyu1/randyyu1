({
	myFunc : function(component) {
		var v = component.get("v.attr1") + component.get("v.attr2");
        component.set("v.attrSum", v);
	}
})