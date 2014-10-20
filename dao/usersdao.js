module.exports = {
	checkUserByNameAndPassword: function(name, password, callback) {
		var em = Jx.JmpPersistence.instance({dataSource: "MySqlDS"});
		var sql = "select id, name from USER where name='" + name + "'";
		em.query(sql, function(err, result){
			em.release();
			if(err)
				callback(err, null);
			else{
				if(result.length == 0)
					callback(null, null);
				else
					callback(null, result[0]);
			}
		});
	}
};