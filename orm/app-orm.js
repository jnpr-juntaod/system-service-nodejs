var orm = {
    "apps" : {
        "queryAllApps": {
            "mapping": "apps/app",
            "select": {
                "m.id": 			 {mapping: "id"},
                "m.domainId":        {mapping: "domainId"},
                "m.version":         {mapping: "version"},
                "m.appChooserTitle": {mapping: "appChooserTitle"},
                "m.appEntityInfo":   {mapping: "appEntityInfo", "select": "optional"},
                "m.appIcon":         {mapping: "appIcon"},
                "m.appIconTitle":    {mapping: "appIconTitle"},
                "m.appLoginImgUrl":  {mapping: "appLoginImgUrl"},
                "m.appName":         {mapping: "appName"},
                "m.appSettingUrl":   {mapping: "appSettingUrl"},
                "m.deprecated":      {mapping: "deprecated"},
                "m.description":     {mapping: "description"},
                "m.descriptionIcon": {mapping: "descriptionIcon"},
                "m.homeIcon":        {mapping: "homeIcon"},
                "m.homeTask":        {mapping: "homeTask"},
                "m.homeWorkspace":   {mapping: "homeWorkspace"},
                "m.hoverImage":      {mapping: "hoverImage"},
                "m.icon":            {mapping: "icon"},
                "m.iconPath":        {mapping: "iconPath"},
                "m.isDeployed":      {mapping: "isDeployed"},
                "m.name":            {mapping: "name"},
                "m.seq":             {mapping: "seq"},
                "m.showInAppChooser":{mapping: "showInAppChooser"},
                "m.startAngle":      {mapping: "startAngle"},
                "m.title":           {mapping: "title"},
                "m.uploadTime":      {mapping: "uploadTime"},
                "workspaces":        {mapping: "workspaces/workspace", ormId: "apps/queryWorkspacesByApp", select: "default", jointField: "id", cJointField: "moduleId"}
            },
            "from": [
                {table: "PARADIGM_MODULE m", clause: ""}
            ],
            "where": "$FILTER$DOMAINFILTER",
            "order by" : "$SORTER",
            "postProcess": function(apiCtx, result, callback) {
                callback(null, result);
            }
        },
        "queryAppById": {
            "mapping": null,
            "extend": "apps/queryAllApps",
            "where": "m.id=$PARAM",
            "order by" : null
        },
        "queryWorkspacesByApp": {
            "mapping": "workspaces/workspace",
            "select": {
                "w.id":             {mapping: "id"},
                "w.domainId":       {mapping: "domainId"},
                "w.version":        {mapping: "version"},
                "w.deprecated":     {mapping: "deprecated"},
                "w.description":    {mapping: "description"},
                "w.fromEar":        {mapping: "fromEar"},
                "w.helpUrl":        {mapping: "helpUrl"},
                "w.hoverIcon":      {mapping: "hoverIcon"},
                "w.icon":           {mapping: "icon"},
                "w.landingpage":    {mapping: "landingpage"},
                "w.name":           {mapping: "name"},
                "w.selIcon":        {mapping: "selIcon"},
                "w.seq":            {mapping: "seq"},
                "w.smallIcon":      {mapping: "smallIcon"},
                "w.title":          {mapping: "title"},
                "w.useNameAsNavId": {mapping: "useNameAsNavId"},
                "w.wsUiConfig":     {mapping: "wsUiConfig", select: "optional"},
                "tasks":            {mapping: "tasks/task", ormId: "apps/queryTasksByWorkspace", select: "default", jointField: "id", cJointField: "workspace"},
                "mw.modules_id":    {mapping: "moduleId", from: [1]}
            },
            "from": [
                {table: "PARADIGM_WORKSPACE w", clause: ""},
                {table: "left join PARADIGM_WORKSPACE_PARADIGM_MODULE mw on mw.workspaces_id = w.id", clause: ""}
            ],
            "where": "mw.modules_id in ($PARAM)$FILTER$DOMAINFILTER",
            "order by" : "$SORTER"
        },
        "queryWorkspaceById": {
            "mapping": null,
            "extend": "apps/queryWorkspacesByApp",
            "where": "w.id=$PARAM",
            "order by" : null
        },
        "queryTasksByWorkspace": {
            "mapping": "tasks/task",
            "select": {
                "t.id" : 			           {mapping: "id"},
                "t.domainId":                  {mapping: "domainId"},
                "t.version":                   {mapping: "version"},
                "t.addToRibbon":               {mapping: "addToRibbon"},
                "t.deprecated":                {mapping: "deprecated"},
                "t.fromEar":                   {mapping: "fromEar"},
                "t.hideInRibbon":              {mapping: "hideInRibbon"},
                "t.hoverIcon":                 {mapping: "hoverIcon"},
                "t.icon":                      {mapping: "icon"},
                "t.isEnabled":                 {mapping: "isEnabled"},
                "t.isEnabledByDefault":        {mapping: "isEnabledByDefault"},
                "t.isGlobal":                  {mapping: "isGlobal"},
                "t.isReadOnly":                {mapping: "isReadOnly"},
                "t.longDocPath":               {mapping: "longDocPath"},
                "t.name":                      {mapping: "name"},
                "t.optional":                  {mapping: "optional"},
                "t.parentTaskName":            {mapping: "parentTaskName"},
                "t.pluginActionCheckPath":     {mapping: "pluginActionCheckPath"},
                "t.pluginActionSingleSelOnly": {mapping: "pluginActionSingleSelOnly"},
                "t.selIcon":                   {mapping: "selIcon"},
                "t.seq":                       {mapping: "seq"},
                "t.smallIcon":                 {mapping: "smallIcon"},
                "t.stepTask":                  {mapping: "stepTask"},
                "t.title":                     {mapping: "title"},
                "t.tooltip":                   {mapping: "tooltip"},
                "t.uiConfig":                  {mapping: "uiConfig", select: "optional"},
                "t.useNameAsNavId":            {mapping: "useNameAsNavId"},
                "t.capability_id":             {mapping: "capability"},
                "t.workspace_id":              {mapping: "workspace"},
                "t.module_id":                 {mapping: "module"},
                "ctasks":                      {mapping: "ctasks/ctask", ormId: "apps/queryCtasksByTask", select: "default", jointField: "name", cJointField: "parentTaskName"}
            },
            "from": [
                {table: "PARADIGM_TASK t", clause: ""}
            ],
            "where": "t.workspace_id in ($PARAM) and (t.parentTaskName is null or t.addToRibbon is true) and t.hideInRibbon is not true$FILTER$DOMAINFILTER",
            "order by" : "t.seq$SORTER"
        },
        "queryTaskById": {
            "mapping": null,
            "extend": "apps/queryTasksByWorkspace",
            "where": "t.id=?",
            "order by" : null
        },
        "queryCtasksByTask": {
            "mapping": "tasks/task",
            "select": {
                "t.id" : 			           {mapping: "id"},
                "t.domainId":                  {mapping: "domainId"},
                "t.version":                   {mapping: "version"},
                "t.addToRibbon":               {mapping: "addToRibbon"},
                "t.deprecated":                {mapping: "deprecated"},
                "t.fromEar":                   {mapping: "fromEar"},
                "t.hideInRibbon":              {mapping: "hideInRibbon"},
                "t.hoverIcon":                 {mapping: "hoverIcon"},
                "t.icon":                      {mapping: "icon"},
                "t.isEnabled":                 {mapping: "isEnabled"},
                "t.isEnabledByDefault":        {mapping: "isEnabledByDefault"},
                "t.isGlobal":                  {mapping: "isGlobal"},
                "t.isReadOnly":                {mapping: "isReadOnly"},
                "t.longDocPath":               {mapping: "longDocPath"},
                "t.name":                      {mapping: "name"},
                "t.optional":                  {mapping: "optional"},
                "t.parentTaskName":            {mapping: "parentTaskName"},
                "t.pluginActionCheckPath":     {mapping: "pluginActionCheckPath"},
                "t.pluginActionSingleSelOnly": {mapping: "pluginActionSingleSelOnly"},
                "t.selIcon":                   {mapping: "selIcon"},
                "t.seq":                       {mapping: "seq"},
                "t.smallIcon":                 {mapping: "smallIcon"},
                "t.stepTask":                  {mapping: "stepTask"},
                "t.title":                     {mapping: "title"},
                "t.tooltip":                   {mapping: "tooltip"},
                "t.uiConfig":                  {mapping: "uiConfig", select: "optional"},
                "t.useNameAsNavId":            {mapping: "useNameAsNavId"},
                "t.capability_id":             {mapping: "capability"},
                "t.workspace_id":              {mapping: "workspace"},
                "t.module_id":                 {mapping: "module"}
            },
            "from": [
                {table: "PARADIGM_TASK t", clause: ""}
            ],
            "where": "t.parentTaskName in ($PARAM)$FILTER$DOMAINFILTER",
            "order by" : "t.seq$SORTER"
        },
        "queryCtaskById": {
            "mapping": null,
            "extend": "apps/queryCtasksByTask",
            "where": "t.id=$PARAM",
            "order by" : null
        }
    }
};

module.exports = orm;