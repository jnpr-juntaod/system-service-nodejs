module.exports = {
	getRibbons: function(apiCtx, appId, wpids, callback) {
		//var appId = "203";
//		var em = JmpPersistence.getInstance();
		var wpSql = "select * from PARADIGM_WORKSPACE w where w.id in (select wm.workspaces_id from PARADIGM_WORKSPACE_PARADIGM_MODULE wm where wm.modules_id='" + appId + "') order by w.seq desc";
		var ribbons = {};
		
		//hard code, values are ["dashboard", "monitor", "configure", "rbac", "administration"]
		for(var i = 0; i < wpids.length; i ++){
			ribbons[wpids[i]] = {items: []};
		}
		
	
		//Dashboard Part
		//ribbons["dashboard"].items.push({id: "DashBoard", title: "Dashboard", icon:"", url:"/mainui/CMPServlet?action=net.juniper.jmp.cmp.mainui.DashBoardBuilder", uitype: "ext3"});
		//ribbons["monitor"].items.push({id: "dashboard", title: "Dashboard", icon:"", url:"default/dashboard", uitype: "scu"});
		
		//Monitor Part
		ribbons["monitor"].items.push({id: "topologymap", title:"Topology Map", url:"/inventoryManagerWeb/CMPServlet?action=net.juniper.jmp.cems.inventoryManager.inventory.action.DeviceAlarmViewBuilder", uitype: "ext3"});		
		ribbons["monitor"].items.push({id: "viewAlarms", title:"Alarms", url:"/inventoryManagerWeb/CMPServlet?action=net.juniper.jmp.cems.inventoryManager.inventory.action.DeviceAlarmViewBuilder", uitype: "ext3"});	
		ribbons["monitor"].items.push({id: "events", title:"Events", url:"/operationWorkflowManagerWeb/CMPServlet?action=net.juniper.jmp.cems.operationWorkflowManager.client.action.ImageScriptOperationLandingPage", uitype: "ext3"});		
		//ribbons["monitor"].items.push({id: "ReportDefMgt", title:"Reports", url:"reportManagerWeb/CMPServlet?action=net.juniper.jmp.cmp.ReportManagerWeb.definition.action.RDLandingPage", uitype: "ext3"});		
	    ribbons["monitor"].items.push({id: "ReportMgt",  title:"Reports", url:"/reportManagerWeb/CMPServlet?action=net.juniper.jmp.cmp.ReportManagerWeb.generation.action.GRLandingPage", uitype: "ext3"});
	    
		//Configure part
		ribbons["configure"].items.push({id: "manageDevices", title:"Devices", url:"js-ems-ui/devicemgmt", uitype: "scu"});
		ribbons["configure"].items.push({id: "manageTemplates", title:"Templates", url:"/configManagerWeb/CMPServlet?action=net.juniper.jmp.cems.configManager.configTemplates.action.TemplateLandingPage", uitype: "ext3"});
		ribbons["configure"].items.push({id: "manageCliTemplates", title:"Configlets", url:"/configManagerWeb/CMPServlet?action=net.juniper.jmp.cems.configManager.clitemplates.action.CLITemplateLandingPage", uitype: "ext3"});
		ribbons["configure"].items.push({id: "backupConfigFiles", title:"Configuration Backup/Restore", url:"/resourceDistributionManagerWeb/CMPServlet?action=net.juniper.jmp.cmp.resourceDistributionManager.databaseManager.action.DatabaseLandingPage", uitype: "ext3"});		
				
		//RBAC part
		ribbons["rbac"].items.push({id: "UserMgt", title:"Users", url:"/sm/CMPServlet?action=net.juniper.jmp.cmp.systemService.extjsUI.action.UsersLandingPage", uitype: "ext3"});
		ribbons["rbac"].items.push({id: "RoleMgt", title:"Roles", url:"/sm/CMPServlet?action=net.juniper.jmp.cmp.systemService.extjsUI.action.RolesLandingPage ", uitype: "ext3"});
		ribbons["rbac"].items.push({id: "DomainMgt", title:"Domains", url:"/sm/CMPServlet?action=net.juniper.jmp.cmp.systemService.extjsUI.action.UsersLandingPage", uitype: "ext3"});
		ribbons["rbac"].items.push({id: "viewAuditLogs", title:"Audit Logs", url:"/sm/CMPServlet?action=net.juniper.jmp.cmp.systemService.extjsUI.action.AuditLogsLandingPage", uitype: "ext3"});
		
		
		//Administration part
		ribbons["administration"].items.push({id: "manageFabric", title:"Fabric Node Cluster", url:"/resourceDistributionManagerWeb/CMPServlet?action=net.juniper.jmp.cmp.resourceDistributionManager.fabric.node.action.FabricLandingPage", uitype: "ext3"});		
		ribbons["administration"].items.push({id: "ProfileMgt", title: "Server Profiles", url: "/sm/CMPservlet?action=net.juniper.jmp.cmp.systemService.extjsUI.action.ProfilesLandingPage", uitype: "ext3"});
		ribbons["administration"].items.push({id: "ApplicationMgt", title: "Application Settings", url: "/sm/CMPServlet?action=net.juniper.jmp.cmp.systemService.extjsUI.action.ApplicationslandingPage", uitype: "ext3"});
		ribbons["administration"].items.push({id: "manageLicenses", title: "System Administration", url: "/resourceDistributionManagerWeb/CMPServlet?action=net.juniper.jmp.cmp.resourceDistributionManager.licenseManager.action.LicenseLandingPage", uitype: "ext3"});
					
				
		callback(null, ribbons);
	}       
};
