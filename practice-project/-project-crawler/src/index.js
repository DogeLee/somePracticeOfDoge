var http = require("http");		//引入http模块，用于构建服务器和路由

var mongoose = require('mongoose');		//引入mongoose模块，用于连接查询mongodb
var Db_config = require('./db-config');		//引入数据库配置模块

var My_util = require('./my-util');		//引入自己的工具模块

var steam_crawler = require('./steam-crawler');		//引入爬虫模块(用于爬取steam数据)

var Server_config = require('./server-config');		//引入服务器配置模块

//连接数据库
var db_config = new Db_config();	//实例化数据库配置对象
mongoose.connect(db_config.db_url,db_config.db_options);	//数据库连接
var mongo_con = mongoose.connection;	//获取连接对象

mongo_con.on("connected",function(){	//连接状态监控
	console.log("[mongoose]Connected to mongodb " + db_config.db_url);
});
mongo_con.on("error",function(err){
	console.log("[mongoose]Connection error " + err);
});

db_config.Db_steam_model.findById("59e4648358ef35258c2c999f", function(err, res){
	console.log(res);
})

//构建服务器
//注意：连接数据库和构建服务器都是异步的
var server_config = new Server_config();	//服务器配置对象实例化 

http.createServer(function(req,res,err){
	server_config.cbFunStatic(req,res,err);
	if(err){
		console.error(err);
	}
}).listen(server_config.port);
console.log("server is on localhost:"+server_config.port);

//执行爬虫
//steam_crawler(db_config.Db_steam_model);
