"use strict";
(function(window, undefined) {
	var main = $("#main"),
		textarea = $("textarea")[0];

	function text(text) {
		textarea.value += text + "\n";
		textarea.scrollTop = textarea.scrollHeight;
	}

	//控制面板单例；未单独开设一个模块；
	var flycar = {
		//仓库里面的车;
		id: [1, 2, 3, 4],
		//空中存在的飞船
		main: [],
		//每架飞船的状态
		status: [false, false, false, false],
		//对数组进行排序
		sortId: function() {
			this.id.sort(function(a, b) {
				return a - b;
			})
		},
		//信号发射
		random: function(data) {
			var me = this;
			var _data=dataDeal.deal(data),
				no=_data.id,
				commond=_data.commond;
			function randomSay() {
				setTimeout(function() {
					if ((Math.random() * 100) > 30) {
						me.say(data)
						if (commond === 3) {
							me.id.push(no);
							me.status[no-1] = false;
							adapter.deleteArr(no-1);
							adapter.showArr();
							me.showCar();
							me.sortId();
						}
					} else {
						setTimeout(function(){
							randomSay();
						},500)
					}
				}, 300)
			}
			randomSay();
		},
		say: function(data) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i]) {
					this.main[i].listen(data);
				}
			}
		},
		time:null,
		//用于接收飞船信号 并将其转化为可视信息防止到显示板;因为信息传播需要时间 所以显示信息和飞机状态会延时1s;
		showCar:function(){
			var me = this;
			clearInterval(this.time);
			this.time=setInterval(function(){
				if(me.id.length<4){
					me.status.forEach(function(item,index){
						if(item){
							adapter.arr[index]=[index+1,me.main[index].speed,me.main[index].revert]
							me.main[index].speak();
						}
					})
				}else{
					clearInterval(me.time)
				}
			},1000)
		}
	};
	//创建控制面板;控制面板可以重复使用 不移除dom;只控制display;
	var consoles= {
		index: 1,
		createDiv: function() {
			if (this.index < 5) {
				var div = $("<div class=\"move\" data-index=" +this.index + ">" +
					"<span>" + this.index + "号飞船</span>" +
					"<button data-dothing=\"go\">开始飞行</button>" +
					"<button data-dothing=\"stop\">停止飞行</button>" +
					"<button data-dothing=\"clear\">摧毁飞船</button>" +
					"</div>");
				div.appendTo($("#footer"))
				this.index++;
			}
		}
	};
	//对按钮进行初始化；
	$(".new-car-but").on("click", function() {
		if (flycar.id.length > 0) {
			flycar.sortId();
			var i = flycar.id.shift(),
				data = {};
			data.speed=$(".speedCar:checked").attr("data-speed");
			data.revert=$(".degCar:checked").attr("data-revert");
			flycar.status[i - 1] = true;
			flycar.showCar()
			flycar.main[i - 1] = new FlyCar($("#main"),i);
			//console.log("data"+data.revert)
			setTimeout(function() {
				//console.log(data)
				flycar.main[i - 1].init(data);
				consoles.createDiv();
				$($(".move")[i - 1]).show();
			}, 300)
		}
	})
	//按键效果
	$(".new-car-but").on("mousedown",function(){
		$(".new-car-but").css("transform","scale(0.9)")
	})
	$(".new-car-but").on("mouseup",function(){
		$(".new-car-but").css("transform","scale(1)")
	})
	//事件委托到footer上,通过点击的元素身上的标识对飞船发送命令;
	$("#footer").on("click",function(e){
		if($(e.target).attr("data-dothing")){
				//编号获取当前点击的控制器的编号即飞船编号;
			var no = $(e.target).closest(".move").attr("data-index"),
				//寻找当前点击的元素上自定义标识data-dothing
				thing = $(e.target).attr("data-dothing"),
				data;
			if(thing==="go"){
				data=dataDeal.toTwo(no)+"0001";
				flycar.random(data)
			}else if(thing==="stop"){
				data=dataDeal.toTwo(no)+"0010";
				flycar.random(data)
			}else if(thing==="clear"){
				data=dataDeal.toTwo(no)+"0011";
				flycar.random(data)
				adapter.arr[no-1][3]=3;
				adapter.showArr();
				$(e.target).closest(".move").hide();
			}	
		}
	})
	
})(window)