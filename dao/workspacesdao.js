module.exports = {
	getAvailableWorkspaces: function(apiCtx, domainId, appId, callback) {
		//,{id:"docbookdemos", title: "DocBook&Demos"}, {id:"pmc", title: "Performance Monitor"}
		var results = [{id: 'dashboard', title: "Dashboard", url: "default/dashboard"}, {id: 'monitor', title: "Monitor"}, {id:'configure', title: "Configure"}, {id:'rbac', title: "RBAC"}, {id:'administration', title: "Administration"}];
		callback(null, results);
	}
};