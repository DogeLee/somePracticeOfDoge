var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getProfile',function(req,res){
	if(req.body.user == "2015220303006"){
		response = {
	        status:200,
	        errMsg:"获取成功",
	        jsonData:{
	            userName:'李心雨',
				sex:'男',
				belongTo:'择栖'
	        }
	    }

	    res.end(JSON.stringify(response));
	}
	else if(req.body.user == "2015220204029"){
		response = {
	        status:200,
	        errMsg:"获取成功",
	        jsonData:{
	            userName:'李娇',
				sex:'女',
				belongTo:'择栖'
	        }
	    }

	    res.end(JSON.stringify(response));
	}
	else{		
		response = {
	        status:400,
	        errMsg:"获取失败，没有这个用户",
	        jsonData:{
	            userName:'无',
				sex:'无',
				belongTo:'无'
	        }
	    }

	    res.end(JSON.stringify(response));
	}
});

router.post('/getList',function(req,res){
	if(req.body.user == "2015220303006" || req.body.user == "2015220204029"){
		response = {
	        status:200,
	        errMsg:"获取成功",
	        jsonArr:[
	        {
	        	name:'曹亦康',
	        	sex:'男'
	        },
	        {
	        	name:'李双',
	        	sex:'女'
	        },
	        {
	        	name:'曾豪',
	        	sex:'男'
	        },
	        {
	        	name:'敖悦源',
	        	sex:'男'
	        },
	        {
	        	name:'伯金',
	        	sex:'女'
	        }
	        ]
	    }

	    res.end(JSON.stringify(response));
	}
	else{		
		response = {
	        status:400,
	        errMsg:"获取失败，没有这个用户",
	        jsonArr:[]
	    }

	    res.end(JSON.stringify(response));
	}
});

module.exports = router;
