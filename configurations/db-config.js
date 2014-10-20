/** 
 * @module db-config
 * @copyright (C) Copyright 2014, Juniper Networks. Inc
 * @classdesc 
 * The global configurations of DataSources. If a connection is marked as readonly, persistence manager will try to get connections from
 * the 'readGroup'. If 'readGroup' is not configured, persistence manager will get them from the defaultGroup instead. Other operations without readonly mark will get
 * connections from defaultGroup.
 * Be care to use readGroup only when you are sure that the data needn't be real-time updated.
 * @version 1.0
 */

module.exports = [
	{
		/**
		 * DataSource Name
		 */
		"name": "MySqlDS",
        /**
         * The orders of dataSources in the group means: The server will only get connections from the first dataSource in this group until it is down.The others
         * are for 'failover' only. If the first dataSource is down(vip switching or other reasons), platform will use failover dataSources as a temporary
         * db service and try to recover the first dataSource.
         */
		"defaultGroup": [
		               {"insecureAuth":true, "user":"_DB_USER_", "password":"_DB_PSWD_", "host":"_DB_HOST_", "database":"_DB_NAME_", "port": "_DB_PORT_", "multipleStatements": true} //master db (vip)
		],
		/**
		 * DataSources in this group are just for "readonly" operations. And the connections will use load balance strategy (random access)
		 */
		"readGroup": [
		]
	}
];




