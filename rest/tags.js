var taskRest = {
	getTagsForUser: function(apiCtx, callback) {
		var tagsdao = require("../dao/tagsdao");
		tagsdao.getTags(apiCtx, function(err, result){
			if(err){
				callback(err);
			}
			else{
				var groupTree = [
				                 {id:'_00', text: 'All Devices', value: '', iconCss:'icon-tasks'},
				                 {id:'_01', text: 'By Device Type', iconCss:'icon-tasks', expanded: true},
				                 {id:'_01_0', text: 'MX960', pid:'_01', value: '{"type":"tag", "field":"platform", "value":"MX960", "condition": "eq"}', iconCss:'icon-map-marker'},
				                 {id:'_01_1', text: 'SRX3400', pid:'_01', value: '{"type":"tag", "field":"platform", "value":"SRX3400", "condition": "eq"}', iconCss:'icon-map-marker'},
				                 {id:'_01_2', text: 'M10I', pid:'_01', value: '{"type":"tag", "field":"platform", "value":"M10I", "condition": "eq"}', iconCss:'icon-map-marker'},
				                 {id:'_01_3', text: 'J4350', pid:'_01', value: '{"type":"tag", "field":"platform", "value":"J4350", "condition": "eq"}', iconCss:'icon-map-marker'},
				                 {id:'_02_2', text: 'By Public Tag', expanded: false},
				                 {id:'_02_0', text: 'By Private Tag', expanded: false},
				                 {id:'_03', text: 'By Location', expanded: true, iconCss:'icon-map-marker'},
				                 {id:'_03_0', text: 'Sunnyvale', pid:'_03', value: '', iconCss:'icon-map-marker'},
				                 {id:'_03_1', text: 'Bangalore', pid:'_03', value: '', iconCss:'icon-map-marker'},
				                 {id:'_03_2', text: 'Beijing', pid:'_03', value: '', iconCss:'icon-map-marker'}
				                 ];
				for(var i=0; i<result.length; i++){
					groupTree.push(result[i]);
				}
				callback(null, groupTree);
			}
		});
	},
	getCustomGroups: function(apiCtx, callback) {
	    var tagsdao = require("../dao/tagsdao");
	    tagsdao.getCustomTags(apiCtx, function(err, result){
	        if(err){
	            callback(err);
	        }
	        else{
                for(var i=0; result[i]; i++){
                    result[i].value = '{"type":"tag", "field":"customGroupId", "value":"'+result[i].id+'", "condition": "eq"}';
                }
	            callback(null, result);
	        }
	    });
	},
	postCustomGroup: function(apiCtx, callback) {
	    var tagsdao = require("../dao/tagsdao");
	    tagsdao.newCustomTag(apiCtx, {name: apiCtx.req.params.newGroupName}, function(err, result){
	        if(err){
	            callback(err);
	        }
	        else{
	        	var deviceIdsStr = apiCtx.req.params.deviceIds;
	            var deviceIds = deviceIdsStr == null ? [] : deviceIdsStr.split(',');
	            var tagDevice = [];
	            for(var i=0; deviceIds[i]; i++){
	                tagDevice.push([result.insertId, deviceIds[i]]);
	            }
	            tagsdao.newCustomTagDevice(apiCtx, tagDevice, function(err, result){
	                if(err){
	                    callback(err);
	                }
	                else{
	                    callback(null, result);
	                }
	            });
	        }
	    });
	}
};

module.exports = taskRest;