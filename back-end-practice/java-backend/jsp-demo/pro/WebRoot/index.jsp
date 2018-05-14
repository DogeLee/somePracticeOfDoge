<%@ page language="java" import="java.util.*" pageEncoding="utf-8" errorPage="error.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>JSP语法学习</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    JSP的四种语法学习 <br>
    <%out.println(new java.util.Date());%>
    <br>
    <%--这是JSP注释，JSP注释不会被发送到客户端--%>
    <%!
    	//这是JSP声明部分
    	public int count;		//声明一个整型
    	public String info(){	//声明一个方法
    		return "hello";
    	}
     %>
     <%
     out.println(count++);
     out.println(info());
      %>
      <%--下面是输出JSP表达式--%>
      <%=count++ %>
      <%--总结
      	普通的是JSP脚本
      	带--的是注释
      	带!的是JSP声明
      	带=的是输出表达式
       --%>
      <%
      	int a = 6;
      	int b = 0;
      	//int c = a/b; 如果执行了这一句会发生错误，跳转到错误处理页面
       %>
  </body>
</html>
