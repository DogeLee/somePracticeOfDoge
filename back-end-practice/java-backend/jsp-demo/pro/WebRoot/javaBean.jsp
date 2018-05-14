<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%--需要引入lee.Person --%>
<%@ page import="lee.Person"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'javaBean.jsp' starting page</title>
    
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
    一个javaBean的例子 <br>
    <%--下面是一个JavaBean的例子 --%>
    <jsp:useBean id="p1" class="lee.Person" scope="page"/>
    <jsp:setProperty name="p1" property="age" value="21"/>
    <jsp:getProperty name="p1" property="age"/>
    <br>
    <%--等同于下面这段脚本 --%>
    <%
    Person p2 = new Person();
    pageContext.setAttribute("p2",p2);
    p2.setAge(20);
     %>
    <%=p2.getAge() %>
  </body>
</html>
