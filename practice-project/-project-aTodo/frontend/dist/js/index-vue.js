var toolbar = {		//底部功能切换
	template:`
		<div>
		<i 	v-on:click="checkout(0)" 
			v-bind:class="{toolbarActive:status[0].isActive}" 
			class="fa fa-calendar" aria-hidden="true"></i>
		<i 	v-on:click="checkout(1)" 
			v-bind:class="{toolbarActive:status[1].isActive}" 
			class="fa fa-pencil-square-o" aria-hidden="true"></i>
		<i 	v-on:click="checkout(2)" 
			v-bind:class="{toolbarActive:status[2].isActive}" 
			class="fa fa-bar-chart" aria-hidden="true"></i>
		</div>
	`,
	data: function(){
		return {
			status:[					//控制页面显示
				{id:0,isActive:true},
				{id:1,isActive:false},
				{id:2,isActive:false}
			]
		}
	},
	methods:{
		checkout:function(num){			//切换页面
			for(var i=0;i<3;i++){
				this.status[i].isActive = false;
			}
			this.status[num].isActive = true;
			this.$root.Bus.$emit('change_page',num);		//发射切换页面事件
		}
	}
};

var todolist = {		//待办事项列表
	template:`
		<div>
			<p class="todo-datemsg">{{datemsg}}</p>
			<div class="todo-input-con"
				v-if='isfuture'>
				<input id="todo-input" v-model="todomsg" placeholder="添加一条todo">
				<i class="fa fa-plus-square-o i-addtodo" aria-hidden="true" 
					v-on:click='addtodo()'></i>
			</div>
			<div class="todolist-con" 
				v-for="todo in todos" 
				v-bind:key="todo.index" 
				v-if='todo.status==0 || todo.status==1'>
				<div 
					v-bind:class="{todoChecked:!(todo.status==0)}">{{todo.msg}}</div>
				<i class="fa fa-minus-square-o i-delete" aria-hidden="true" 
					v-if='todo.status==0 && isfuture'
					v-on:click='changestatus(todo,2)'></i>
				<i class="fa fa-check-square-o i-check" aria-hidden="true" 
					v-if='todo.status==0 && isfuture'
					v-on:click='changestatus(todo,1)'></i>
			</div>
		</div>
	`,
	data:function(){
		var today = new Date();
		return{
			todos:[],			//待办事项列表
			todomsg:'',			//与input双向绑定的msg
			date:today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate()		//今天日期（初始）
		}
	},
	methods:{
		addtodo:function(){			//添加一个todo
			if(this.todomsg.length>0){		//不为空时
				var obj = {
					msg:this.todomsg,
					status:0,
					index:this.todos.length
				};
				this.todos.unshift(obj);
				this.todomsg = "";
				this.savelist();
			}
		},
		changestatus:function(todo,num){
			todo.status = num;
			this.savelist();
		},
		savelist:function(){
			var todos = this.todos;
			var date = this.date;
			$.ajax({
				type: "POST",
				url: "/json/fun4-savelist.json",
				dataType: "json",
				data: {
					uid: uid,
					date: date,
					todos: todos
				},
				success: function success(data) {
					if (data.code == 101) {
						//提示同步成功
					} else {
						alert(data.msg);
					}
				},
				error: function error(jqXHR) {
					alert("发生错误" + jqXHR.status);
				}
			});
		},
		getlist:function(){
			this.todos = [];		//清空数据
			//从服务器获取数据
			var todaystr = this.date
			var todos = this.todos;

			$.ajax({
				type: "POST",
				url: "/json/fun2-getlist.json",
				dataType: "json",
				data: {
					uid: uid,
					date: todaystr
				},
				success: function success(data) {
					if (data.code == 101) {
						for(var i=0;i<data.todomsg.length;i++){
							var obj = {
								msg:data.todomsg[i],
								status:data.status[i],
								index:i
							};
							todos.push(obj);
						}
					} else {
						alert(data.msg);
					}
				},
				error: function error(jqXHR) {
					alert("发生错误" + jqXHR.status);
				}
			});
		}
	},
	computed:{
		datemsg:function(){			//显示在页面顶部的时间
			var date = new Date();
			var datearr = this.date.split('-');
			date.setFullYear(datearr[0],datearr[1],datearr[2]);
			var day = date.getDay();
			switch(day){			//显示星期几
				case 1:{
					day = "一";
					break;
				}
				case 2:{
					day = "二";
					break;
				}
				case 3:{
					day = "三";
					break;
				}
				case 4:{
					day = "四";
					break;
				}
				case 5:{
					day = "五";
					break;
				}
				case 6:{
					day = "六";
					break;
				}
				default:{
					day = "日";
					break;
				}
			}
			datearr[1] = parseInt(datearr[1])+1;
			return datearr[1]+"月"+datearr[2]+"日"+" 星期"+day;
		},
		isfuture:function(){		//判断某一天是否是未来的一天
			var today = new Date();			//今天日期
			var date = new Date();
			var datearr = this.date.split('-');
			date.setFullYear(datearr[0],datearr[1],datearr[2]);		//目标日期
			return (date>=today);			//如果目标日期大于今天，则返回true
		}
	},
	created(){
	 	this.$root.Bus.$on('change_date',newdate=>{
	 		this.date = newdate;
	 		//从服务器获取数据
			this.getlist();
	 	});
	},
	mounted(){
		//从服务器获取数据
		this.getlist();
	}
};

var canlender = {
	template:`
		<div>
			<div class="canlender-con">
				<div class="canlender-main"
					v-if="status">
					<div class="canlender-main-head">
						<p>
							<i class="fa fa-caret-left" aria-hidden="true"
								v-on:click="preMonth()"></i>
							<span>{{datemsg}}</span>
							<i class="fa fa-caret-right" aria-hidden="true"
								v-on:click="nextMonth()"></i>
						</p>
					</div>
					<div class="canlender-main-con">
						<div class="canlender-main-item">一</div>
						<div class="canlender-main-item">二</div>
						<div class="canlender-main-item">三</div>
						<div class="canlender-main-item">四</div>
						<div class="canlender-main-item">五</div>
						<div class="canlender-main-item">六</div>
						<div class="canlender-main-item">日</div>
						<div v-for="color in colors"
							v-bind:class="{canlenderMainItemGreen0:(color[0]==0),canlenderMainItemGreen1:(color[0]==1),canlenderMainItemGreen2:(color[0]==2),canlenderMainItemGreen3:(color[0]==3),canlenderMainItemGreen4:(color[0]==4)}"
							v-on:click="changeDate(color[1])"
							class="canlender-main-item"><span>{{color[1]}}</span></div>
					</div>
				</div>
				<div class="canlender-footer-empty"></div>
				<div class="canlender-footer"
					v-on:click='status=!status'>
					<i class="fa fa-caret-down" aria-hidden="true"
						v-if="status==false"></i>
					<i class="fa fa-caret-up" aria-hidden="true"
						v-if="status"></i>
				</div>
			</div>
		</div>
	`,
	data:function(){
		var today = new Date();
		return{
			ratios:[],
			status:false,
			date:today.getFullYear()+"-"+today.getMonth()		//日历上显示月份切换
		}
	},
	computed:{
		datemsg:function(){			//显示在日历顶部的日期信息
			var date = new Date();
			var datearr = this.date.split('-');
			datearr[1] = parseInt(datearr[1])+1;
			return datearr[0]+"年"+datearr[1]+"月";
		},
		colors:function(){			//这个数组用来显示颜色日历
			var colors = [];		//声明数组
			var ratios = this.ratios;
			var date = new Date();		//声明date
			var datearr = this.date.split('-');		//日期分解
			date.setFullYear(datearr[0],datearr[1],1);		//生成本月1日日期
			var day = date.getDay();		//得到本月1日的星期几
			if(day==0){
				day = 7;
			}
			for(var i=0;i<day-1;i++){		//根据本月1日的星期几在数组中新增占位元素
				colors.push([-1,'']);
			}
			for(var i=0;i<ratios.length;i++){		//根据ratios决定colors
				if(ratios[i]<=0){
					colors.push([0,i+1]);
				}
				else if(ratios[i]>0 && ratios[i]<=0.5){
					colors.push([1,i+1]);
				}
				else if(ratios[i]>0.5 && ratios[i]<=0.8){
					colors.push([2,i+1]);
				}
				else if(ratios[i]>0.8 && ratios[i]<1){
					colors.push([3,i+1]);
				}
				else{
					colors.push([4,i+1]);
				}
			}
			return colors;
		}
	},
	methods:{
		nextMonth:function(){
			var datearr = this.date.split('-');		//日期分解
			datearr[1] = parseInt(datearr[1]) + 1;	//加一月
			if(datearr[1]==12){
				datearr[1] = 0;
				datearr[0] = parseInt(datearr[0]) + 1;	//加一年
			} 
			this.date = datearr[0] + '-' + datearr[1];
			this.getRatios();
		},
		preMonth:function(){
			var datearr = this.date.split('-');		//日期分解
			datearr[1] = parseInt(datearr[1]) - 1;	//减一月
			if(datearr[1]==-1){
				datearr[1] = 11;
				datearr[0] = parseInt(datearr[0]) - 1;	//减一年
			} 
			this.date = datearr[0] + '-' + datearr[1];
			this.getRatios();
		},
		getRatios:function(){
			this.ratios = [];	//清空之前的数据
			//从服务器获取数据
			var monthstr = this.date
			var ratios = this.ratios;

			$.ajax({
				type: "POST",
				url: "/json/fun3-canlender.json",
				dataType: "json",
				data: {
					uid: uid,
					date: monthstr
				},
				success: function success(data) {
					if (data.code == 101) {
						for(var i=0;i<data.ratio.length;i++){
							ratios.push(data.ratio[i]);
						}
					} else {
						alert(data.msg);
					}
				},
				error: function error(jqXHR) {
					alert("发生错误" + jqXHR.status);
				}
			});
		},
		changeDate:function(num){
			if(num){
				var newdate = this.date + "-" +num;
				this.$root.Bus.$emit('change_date',newdate);		//发射切换日期事件
				this.status = false;
			}
		}
	},
	mounted(){
		this.getRatios();
	}
}

var maincontent = {		//主页面切换
	template:`
		<div>
			<div id="main-1" v-if="activeIndex==0">
				<div is="canlender" class="canlender"></div>
				<div is="todolist" class="todolist"></div>
			</div>
			<div id="main-2" v-if="activeIndex==1"></div>
			<div id="main-3" v-if="activeIndex==2"></div>
		</div>
	`,
	data: function(){
		return{
			activeIndex:0
		}
	},
	method:{
	},
	components:{
		todolist,
		canlender
	},
	created(){
	 	this.$root.Bus.$on('change_page',num=>{
	 		this.activeIndex = num;
	 	});
	}
};

var container = new Vue({		//根vue
	el:'#container',
	data:{
		Bus:new Vue()
	},
	components:{
		maincontent,
		toolbar
	}
});
