module.exports = {
	/**
	 * return [{id: "", name:{}}, {}]
	 */
	getAvailableDomains: function(apiCtx, callback) {
		var principal = apiCtx.principal();
		var userId = principal.id;
		var em = Jx.JmpPersistence.instance({dataSource: "MySqlDS"});
		em.findAllBySql("select * from DomainEntity d where d.id in (select ud.domains_id from USER_DomainEntity ud where ud.users_id = '" + userId + "')", function(err, result){
			if(err){
				em.release();
				return callback(err, null);
			}
			else{
				em.release();
				var domains = [];
				for(var i = 0; i < result.length; i ++){
		   			var domain = result[i];
		   			domains.push({id: domain.id, name: domain.name});
		   		}				
				//var datas = [{id: "domain1", name: "Global"}, {id: "domain2", name: "Domain1"}];
				callback(null, domains);
			}
		});
//		JmpPersistence.getInstance().query("table", "where", function(err, result){
//			if(err)
//				throw err;
//			callback(null, result);
//		});
	}
};