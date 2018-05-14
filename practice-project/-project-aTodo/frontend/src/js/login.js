$(function () {
	$("#login").click(function(){
		var uid = $("#login-input1").val();
		var upsw = $("#login-input2").val();
		var check = login_input_check(uid,upsw);
		if(check){
			$.ajax({
				type: "POST",
				url: "/json/fun1-login.json",
				dataType: "json",
				data: {
					uid:uid,
					upsw:upsw
				},
				success: function success(data) {
					if(data.code == 101){
						$.cookie("uid",uid,{path:"/"});
						alert(data.msg);
					}
					else{
						alert(data.msg);
					}
				},
				error: function error(jqXHR) {
					alert("发生错误" + jqXHR.status);
				}
			});
		}
		else{
			alert("请输入账号和密码");
		}	
	})
});

function login_input_check(uid,upsw){
	// var uidl = uid.length();
	// var upswl = upsw.length();
	if(uid && upsw){
		return true;
	}
	else{
		return false;
	}
}
