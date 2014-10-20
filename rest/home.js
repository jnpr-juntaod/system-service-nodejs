var homeinfoRest = {
	getHomeInfo: function(apiCtx, callback){
        var homeInfo = {
            userId: "super",
            userName: "Super",
            tasks: ["a", "b", "c"],
            domains: [{id: "global", name: "global"}, {id: "test1", name: "Test1", parentId: "global"}, {id: "test2", name: "Test2", parentId: "global"}, , {id: "test11", name: "Test11", parentId: "test1"}],
            workingDomain: {},
            loginDate: new Date().toString(),
            apps: [{id: "system management", name: "System Management"}, {id: "services now", name: "Services Now"}]
        };

//        apps: require("../dao/appsdao").getApps(apiCtx, callback);
        callback(null, homeInfo);
//		var req = apiCtx.request();
//		var homeinfo = {};
//		var principal = apiCtx.principal();
//		homeinfo.user = {id: principal.id, name:principal.name};
//		var date = new Date();
//		homeinfo.loginDate = date.toString();


//        apiCtx.restJsonClient().get(Jx.serverConfig.rest_prefix + "/system/domains/available", function(err, req, res, result) {
//            if(err)
//                callback(err);
//            else {
//                homeinfo.domains = result;
//                if (homeinfo.domains.length > 0) {
//                    homeinfo.currentDomain = (principal.domain == null ? domains[0].id : principal.domain.id);
//                    apiCtx.restJsonClient().get({path: Jx.serverConfig.rest_prefix + "/system/workspaces/available", queryParam:{domain: homeinfo.currentDomain}}, function (err, req, res, result) {
//                        if (err)
//                            callback(err);
//                        else {
//                            homeinfo.workspaces = result;
//                            callback(err, homeinfo);
//                        }
//                    });
//                }
//                else {
//                    homeinfo.apps = [];
//                    callback(null, apiCtx);
//                }
//            }
//        });
	}
};


module.exports = homeinfoRest;