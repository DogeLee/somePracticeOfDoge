var https = require("https");	//引入https模块，用于爬虫访问https网站

function steam_crawler_controller(Steam_data){
	var steam_data_obj = {};
	steam_data_crawler(steam_data_obj);

	function try_save(){		//尝试save函数定义
		setTimeout(function(){
			if(steam_data_obj.array){	//如果array存在则执行save（即当数据准备完成时）
				steam_data_savedb(steam_data_obj.array,Steam_data);		//传入数据和模型
			}
			else{	//数据未准备完成时则try_save
				try_save();
			}
		},1000)
	}
	try_save();		//尝试save
}

function steam_data_savedb(array,Steam_data){
	var data_obj = {			//定义一个对象
		date:'Oct 10 2017 20: +0',
		price:0.66,
		num:'2333'
	};
	var steam_data = new Steam_data(data_obj);

	for(var i=0;i<array.length;i++){
		data_obj.date = array[i][0];	//替换对象中的数据
		data_obj.price = array[i][1];
		data_obj.num = array[i][2];
		steam_data = new Steam_data(data_obj);		//用model生成新的数据
		steam_data.save(function (err, res) {	//存入数据
		    if (err) {
		        console.log("[mongoose]Error:" + err);
		    }
		    else {
		        console.log("[mongoose]Res:" + res);
		    }
		});
	}
}

function steam_data_crawler(steam_data_obj){
	var steam_url = "https://steamcommunity.com/market/listings/578080/SURVIVOR%20CRATE";

	https.get(steam_url,function(res){
		var html = "";

		res.on("data",function(data){
			html += data;
		})

		res.on("end",function(){		//数据处理，最终获取到数组
			var pattern = /line1.*;/i;
			var steamData = html.match(pattern);
			var newData = steamData[0].substr(6,steamData[0].length-7);
			var newDataArray = eval(newData);
			console.log(newDataArray.length);
			steam_data_obj.array = newDataArray;
		})
	}).on("error",function(){
		console.log("[crawler]出错！");
	})
}

module.exports = steam_crawler_controller;