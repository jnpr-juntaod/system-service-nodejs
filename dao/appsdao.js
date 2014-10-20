module.exports = {
	getAvailableApps: function(apiCtx, domainId, callback) {
		var em = Jx.JmpPersistence.instance({dataSource: "MySqlDS"});
		em.findAllBySql("select * from PARADIGM_MODULE where isdeployed=1", function(err, result){
			if(err){
				em.release();
				return callback(err, null);
			}
			else{
				em.release();
				var datas = [];
				for(var i = 0; i < result.length; i ++){
		   			var app = result[i];
		   			datas.push({id: app.id, name: app.name});
		   		}	
				//var datas = [{id: "app1", name: "CMP"}, {id: "app2", name: "CEMS"}];
				callback(null, datas);
			}
		});
//		JmpPersistence.getInstance().query("table", "where", function(err, result){
//			if(err)
//				throw err;
//			callback(null, result);
//		});
	}
};