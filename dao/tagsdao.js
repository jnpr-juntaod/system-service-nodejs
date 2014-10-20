module.exports = {
    getTags: function(apiCtx, callback) {
        var em = apiCtx.persistenceApi();
        var sql = "select t.id as id, concat(t.name, '(',count(mmt.taggedObjects_id),')') as text, concat('_02_',CAST(t.visibility AS CHAR(1))) as pid from TAG t left join MO_METADATA_TAG mmt on t.id = mmt.tags_id "
                +" group by t.id order by t.name";
        em.query(sql, function(err, result){
            if(err){
                callback(err, null);
            }
            else{
                callback(null, result);
            }
        });
    },

    getCustomTags: function(apiCtx, callback) {
        var em = apiCtx.persistenceApi();
        var sql = "select t1.id, t1.name as text, count(t2.id) as count from CustomGroup t1 left join CustomGroupDevices t2 on t1.id=t2.customGroupId "
            +" group by t1.id, t1.name";
        em.query(sql, function(err, result){
            if(err){
                callback(err, null);
            }
            else{
                callback(null, result);
            }
        });
    },

    newCustomTag: function(apiCtx, newTag, callback){
        var em = apiCtx.persistenceApi();
        var sql = "insert into CustomGroup set ?";
        em.insertBySql(sql, newTag, function(err, result){
            if(err){
                callback(err, null);
            }
            else{
                callback(null, result);
            }
        });
    },

    newCustomTagDevice: function(apiCtx, newTagDevice, callback){
        var em = apiCtx.persistenceApi();
        var sql = "insert into CustomGroupDevices (customGroupId, deviceId) values ?";
        em.insertBySql(sql, [newTagDevice], function(err, result){
            if(err){
                callback(err, null);
            }
            else{
                callback(null, result);
            }
        });
    }
};