var http = require("http");
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

http.createServer(function(req,res,err){
    var filePath = "./" + url.parse(req.url).pathname;

    fs.exists(filePath,function(err){
        if(!err){   //文件不存在
            res.writeHead(404,{'content-type':"text/plain"});
            res.end();
        }else{  //文件存在
            var ext = path.extname(filePath);       //获取文件后缀
            ext = ext?ext.slice(1) : 'unknown';
            var contentType = MIME_TYPE[ext] || "text/plain";   //如果没有对应的文件后缀则返回text

            fs.readFile(filePath,function(err,data){    //读取文件
                if(err){
                    res.writeHead(500,{'content-type':"text/plain"});
                    res.end();
                }else{
                    res.writeHead(200,{'content-type':contentType});
                    res.end(data);
                    console.log("返回文件"+filePath);
                }
            });//fs.readfile
        }
    })
}).listen(3000);

console.log("服务器启动localhost:3000");