<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script src="http://lib.sinaapp.com/js/jquery/2.0.2/jquery-2.0.2.min.js"></script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    <h1>Servlet小示例</h1>
    <hr>
    <a href="servlet">get请求</a>
    <a id="post" href="#">post请求</a>
    <p id="out"></p>
  </body>
  <script type="text/javascript">
  	$("#post").click(function(){
  		$.ajax({
			type: "POST",
			url: "servlet",
			data: {
				msg:"2333"
			},
			success: function success(data) {
				$("#out").html(data);
			},
			error: function error(jqXHR) {
				alert("发生错误" + jqXHR.status);
			}
		});
  	}) 	
  </script>
</html>
