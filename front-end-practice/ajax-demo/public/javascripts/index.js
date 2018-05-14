function get_profile(){		//声明函数
	$.ajax(
	{
		type:"POST",		//请求类型
		url:"/getProfile",	//请求路径
		dataType:"json",	//返回数据类型
		data:{				//请求中的数据
			user:$("#user_input").val()
		},
		success:function(data){		//请求返回成功 回调函数
			//将数据填入页面
			$("#profile").html("姓名："+data.jsonData.userName+" 性别："+data.jsonData.sex+" 所属："+data.jsonData.belongTo);
		},
		error:function(jqXHR){		//请求发生错误 回调函数
			alert("发生错误"+jqXHR.status);
		}
	})
}

function get_list(){
	$.ajax(
	{
		type:"POST",		//请求类型
		url:"/getList",		//请求路径
		dataType:"json",	//返回数据类型
		data:{				//请求中的数据
			user:$("#user_input").val()
		},
		success:function(data){		//请求返回成功 回调函数
			var $item;
			var $demo2 = $("#demo2");
			for(var i=0;i<data.jsonArr.length;i++){
				//新建一个节点并放入数据
				$item = $("<div class='item'>姓名："+data.jsonArr[i].name+" 性别："+data.jsonArr[i].sex+"</div>");
				//将新建的节点插入页面中
				$demo2.append($item);
			}
		},
		error:function(jqXHR){		//请求发生错误 回调函数
			alert("发生错误"+jqXHR.status);
		}
	})
}
//如果重复地查询的话item会变得越来越多
//请求大多是做增删改查的工作，以上两个示例演示了查的操作，以及得到数据后将数据填入页面的操作
