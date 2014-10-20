var dao = require("../dao/appmgtdao");
var appTest = {
    getApps: function(apiCtx, callback) {
        dao.getApps(apiCtx, callback);
    },
    getAppsApp: function(appId, apiCtx, callback) {
        dao.getAppsApp(appId, apiCtx, callback);
    },
    getAppsAppWorkspaces: function(appId, apiCtx, callback) {
        dao.getAppsAppWorkspaces(appId, apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspace: function(appId, wpId, apiCtx, callback) {
        dao.getAppsAppWorkspacesWorkspace(appId, wpId, apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasks: function(appId, wpId, apiCtx, callback) {
        dao.getAppsAppWorkspacesWorkspaceTasks(appId, wpId, apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasksTask: function(appId, wpId, taskId, apiCtx, callback) {
        dao.getAppsAppWorkspacesWorkspaceTasksTask(appId, wpId, taskId, apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasksTaskCtasks: function(appId, wpId, taskId, apiCtx, callback) {
        dao.getAppsAppWorkspacesWorkspaceTasksTaskCtasks(appId, wpId, taskId, apiCtx, callback);
    },
    getAppsAppWorkspacesWorkspaceTasksTaskCtasksCtask: function(appId, wpId, taskId, ctaskId, apiCtx, callback) {
        dao.getAppsAppWorkspacesWorkspaceTasksTaskCtasksCtask(appId, wpId, taskId, ctaskId, apiCtx, callback);
    }
};

module.exports = appTest;