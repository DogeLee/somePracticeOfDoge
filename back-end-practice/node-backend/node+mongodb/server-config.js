var fs=require('fs');
var url=require('url');
var path=require('path');

var MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

function Server_config(){
	this.port = 8080;
	this.cbFunStatic = function(req,res,err){
		var pathReg = /\/public\/\.*/;
		var filePath;

	    if(req.url==="/"){	//访问路径如果为空则返回index.html
	        filePath =  "./public/index.html";
	    } 
	    else if(pathReg.test(req.url)){		//只能访问public文件夹中的文件
	        filePath = "./" + url.parse(req.url).pathname;
	    }
	    else{
	    	res.end("<h1>403</h1><p>forbidden</p>");
	    	return;		//权限不足退出函数
	    }

	    fs.exists(filePath,function(err){
	        if(!err){	//文件不存在
	            res.end("<h1>404</h1><p>file not found</p>");
	        }else{	//文件存在
	            var ext = path.extname(filePath);		//获取文件后缀
	            ext = ext?ext.slice(1) : 'unknown';
	            var contentType = MIME_TYPE[ext] || "text/plain";	//如果没有对应的文件后缀则返回text

	            fs.readFile(filePath,function(err,data){	//读取文件
	                if(err){
	                    res.end("<h1>500</h1>服务器内部错误！");
	                }else{
	                    res.writeHead(200,{'content-type':contentType});
	                    res.end(data.toString());
	                }
	            });//fs.readfile
	        }
	    })
	};
}

module.exports = Server_config;