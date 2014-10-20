var BasicStrategy = require("passport-http").BasicStrategy;
var strategy = new BasicStrategy({passReqToCallback: true}, function(req, username, password, done){
	var usersdao = require("../../dao/usersdao");
	usersdao.checkUserByNameAndPassword(username, password, function(err, result){
		if(err){
			logger.error(err);
			done(null, false);
		}
		else{
			if(result == null)
				done(null, false);
			else{
				req.user = result;
				done(result);
			}
		}
	});
    done({});
});

/**
 * rename to "jmp-basic" as many implementations of this strategy.
 */
strategy.name = "jmp-basic";

module.exports = strategy;