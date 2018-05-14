# JSP-learn
JSP-learn demos.

### 四种语法

<%JSP脚本%>
<%--JSP注释--%>
<%!JSP声明%>
<%!JSP输出表达式%>

输出表达式中不能用分号。

### 两种编译指令

<%@page%>
<%@include%>

### 七种动作指令

jsp:forward
jsp:param
jsp:include
jsp:plugin
jsp:useBean
jsp:setProperty
jsp:getProperty

动态导入与静态导入的区别：静态导入合成一个servlet，动态导入中servlet用include来引入被导入页面的内容；静态导入包括页面编译指令，动态导入只包含body中的内容；动态导入还可以包含额外的参数。

### 九个内置对象

application
config
exception（错误处理页面才会初始化）
out
page
pageContxt
request
response
session

JSP内置对象都是_jspServise()方法的形参或者局部变量。

JSP中的application、session、request和pageContext4个内置对象分别用于操作application、session、request和page范围中的数据。