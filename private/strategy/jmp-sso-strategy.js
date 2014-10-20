/**********************************************************************************
 * (C) Copyright 2014, Juniper
 * All rights reserved
 * 
 * @classdesc Jmp SSO Strategy, will use jboss idp as identify center. And for convenience,
 * it also provide basic authentication for testing without jboss idp support.
 * 
 * @version 2.0
 * @author juntao
 * 
 **********************************************************************************/

//This flag is for convenient test without SSO Support

var util = require("util");
var Strategy = require("passport-strategy");
var ssoconfig = require(global.configpath + "/" + Jx.getContainer(module) + "/sso-config.js");
var sessionManager = require("easy-rest").SessionManager;

function JmpSsoStrategy(){
	Strategy.call(this);
	this.name = "jmp-sso";
}

util.inherits(JmpSsoStrategy, Strategy);


JmpSsoStrategy.prototype.authenticate = function(req, options){
	if(req.isAuthenticated())
		return this.pass();
	var ssoId = req.getCookie("jsessionidsso");
	var sessionId = req.getCookie("jsessionid");
	if(sessionId == null || ssoId == null){
		var idpUrl = ssoconfig.idppath + "?returnUrl=" + ssoconfig.protocol + "://" + ssoconfig.hostname + ":" + ssoconfig.port + ssoconfig.returnpath;
		return this.redirect(idpUrl, 303);
	}

	var httpOptions = {};
	httpOptions.path = ssoconfig.idppath;
	httpOptions.hostname = ssoconfig.hostname;
	httpOptions.port = ssoconfig.port;
	httpOptions.headers = {};
	httpOptions.headers["Cookie"] = "JSESSIONID=" + sessionId + ";JSESSIONIDSSO=" + ssoId;
	
	var oThis = this;
	var http = require(ssoconfig.protocol);

	var backendReq = http.request(httpOptions, function(res){
        var chunkStr = '';
		res.on("data", function(chunk){
            chunkStr += chunk;
		});

        res.on("end", function(){
            try {
                var user = JSON.parse(chunkStr);
                req.session = sessionManager.createSession(sessionId);
                req.user = user;
                req.session.user = user;
                if (user.id == null) {
                    oThis.fail("sso returned wrong data");
                }
                else {
                    oThis.success(user);
                }
            }
            /**
             * cookie maybe out of date, or jboss end miss the session information(restart?).
             * So we should clear session of client and then redirect to sso page.
             */
            catch(err) {
                logger.error("Server returned the wrong information:" + err);
                var idpUrl = ssoconfig.protocol + "://" + ssoconfig.hostname + ":" + ssoconfig.port + ssoconfig.idppath + "?returnUrl=" + ssoconfig.protocol + "://" + ssoconfig.hostname + ":" + ssoconfig.port + ssoconfig.returnpath;
                //don't use 302. Use 303 to indicate that we also need clear client sessions. jmp-req-res will handle it.
                return oThis.redirect(idpUrl, 303);
            }
        });
	});
	
	backendReq.on("error", function(e){
		oThis.error(e);
	});

	backendReq.end();

};

module.exports = new JmpSsoStrategy();
