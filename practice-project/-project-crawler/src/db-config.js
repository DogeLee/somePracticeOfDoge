var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function Db_config(){
	this.db_url = 'mongodb://localhost:27017/steamdb';
	this.db_options = {  
	  	server: {
	    	auto_reconnect: true,
	    	poolSize: 10
	  	}
	};

	this.Db_steam_schema = new Schema({		//定义一个Schema，可以用来生成model
		date:{type:String,index:true},
		price:Number,
		num:String
	});
	this.Db_steam_model = mongoose.model('Steam_data',this.Db_steam_schema);	//定义一个模型
}

module.exports = Db_config;