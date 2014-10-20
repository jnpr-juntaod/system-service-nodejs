var chainProviderExtension = {
    doPlugin: function(options, callback) {
        var chains = options.chains;
        chains["space_rbac"] = require("../chain/space-rbac-chain");
        chains["space_auditlog"] = require("../chain/space-audit-chain");
        callback();
    },
    toString: function() {
        return "space-chain-provider";
    }
};

module.exports = chainProviderExtension;