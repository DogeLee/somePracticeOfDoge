var https = require("https");

var url = "https://steamcommunity.com/market/listings/578080/SURVIVOR%20CRATE";

https.get(url,function(res){
	var html = "";

	res.on("data",function(data){
		html += data;
	})

	res.on("end",function(){
		// var courseData = filterChapters(html);

		// printCourseInfo(courseData);

		var pattern = /line1.*;/i;

		var steamData = html.match(pattern);

		var newData = steamData[0].substr(6,steamData[0].length-7);

		var newDataArray = eval(newData);

		console.log(newData);
	})
}).on("error",function(){
	console.log("出错！");
})