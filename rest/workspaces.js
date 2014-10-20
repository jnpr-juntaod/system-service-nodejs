var workspaceRest = {
  getAvailableWorkspaces: function(domain, apiCtx, callback){
      var results = [{id: 'dashboard', title: "Dashboard", url: "default/dashboard"}, {id: 'monitor', title: "Monitor"}, {id:'configure', title: "Configure"}, {id:'rbac', title: "RBAC"}, {id:'administration', title: "Administration"}];
      callback(null, results);
  }
};

module.exports = workspaceRest;