var domainsRest = {
  getDomains: function(apiCtx, callback){
     callback();
  },

  getAvailableDomains: function(apiCtx, callback) {
      var userId = apiCtx.principal().id;
      var em = apiCtx.persistenceApi();
      em.query("select * from DomainEntity d where d.id in (select ud.domains_id from USER_DomainEntity ud where ud.users_id = '" + userId + "')", function(err, result){
          if(err){
              return callback(err, null);
          }
          else{
              var domains = [];
              for(var i = 0; i < result.length; i ++){
                  var domain = result[i];
                  domains.push({id: domain.id, name: domain.name});
              }
              //var datas = [{id: "domain1", name: "Global"}, {id: "domain2", name: "Domain1"}];
              callback(null, domains);
          }
      });
  }
};

module.exports = domainsRest;