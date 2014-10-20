var taskDao = {
    getApps: function(apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuery("apps/queryAllApps", apiCtx, callback);
    },
    getAppsApp: function(appId, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuerySingleResult("apps/queryAppById", [appId], apiCtx, callback);
    },
    getAppsAppWorkspaces: function(appId, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuery("apps/queryWorkspacesByApp", [appId], apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspace: function(appId, wpId, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuerySingleResult("apps/queryWorkspaceById", [wpId], apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasks: function(appId, wpId, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuery("apps/queryTasksByWorkspace", [wpId], apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasksTask: function(appId, wpId, taskId, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuerySingleResult("apps/queryTaskById", [taskId], apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasksTaskCtasks: function(appId, wpId, taskId, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuery("apps/queryCtasksByTask", [taskId], apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasksTaskCtasksCtask: function(appId, wpId, taskId, cTaskId, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuerySingleResult("apps/queryCtasksById", [cTaskId], apiCtx, callback);
    }
};

module.exports = taskDao;