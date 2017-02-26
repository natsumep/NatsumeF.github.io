"use strict";
(function(window, undefined) {
	var main = $("#main"),
		textarea = $("textarea")[0];

	function text(text) {
		textarea.value += text + "\n";
		textarea.scrollTop = textarea.scrollHeight;
	}
	var flycar = {
		//仓库里面的车;
		id: [1, 2, 3, 4],
		main: [],
		status: [false, false, false, false],
		sortId: function() {
			this.id.sort(function(a, b) {
				return a - b;
			})
		},
		toTen: function(a) {
			var ten = 0;
			a=a.toString()
			for (let i = 0; i < a.length; i++) {
				ten += a.charAt(i) * Math.pow(2, a.length-1-i);
			}
			return ten;
		},
		random: function(data) {
			var me = this;
			var no=this.toTen(data.slice(0,4)),
				commond=Number(data.slice(-4));
			function randomSay() {
				setTimeout(function(data) {
					if ((Math.random() * 100) > 30) {
						console.log(no+" " + commond+"chenggong")
						me.say(no,commond)
						if (commond === 11) {
							me.id.push(no);
							me.status[no-1] = false;
							me.sortId();
							$($(".move")[no-1]).hide();
						}
					} else {
						setTimeout(function(){
							randomSay();
						},500)
						console.log(no+" " + commond+"shibai ")
					}
				}, 300)
			}
			randomSay();
		},
		say: function(no,commond) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i]) {
					this.main[i].listen(no,commond);
				}
			}
		}
	};
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
	}


	$(".new-car-but").on("click", function() {
		if (flycar.id.length > 0) {
			flycar.sortId();
			var i = flycar.id.shift(),
				data = {};
			data.speed=$(".speedCar:checked").attr("data-speed");
			data.revert=$(".degCar:checked").attr("data-revert");
			flycar.status[i - 1] = true;
			flycar.main[i - 1] = new FlyCar($("#main"),i);
			console.log("data"+data.revert)
			setTimeout(function() {
				console.log(data)
				flycar.main[i - 1].init(data);
				consoles.createDiv();
				$($(".move")[i - 1]).show();
			}, 300)
		}
	})
	function toTwo(a) {
		var a = Number(a).toString(2);

		function four(a) {
			if (a.length < 4) {
				return four("0" + a)
			} else {
				return a;
			}
		}
		return four(a)
	}
	$("#footer").on("click",function(e){
		if($(e.target).attr("data-dothing")){
			var thing = $(e.target).closest(".move").attr("data-index"),
				no = $(e.target).attr("data-dothing"),
				data;
			if(no==="go"){
				data=toTwo(thing)+"0001";
				flycar.random(data)
			}else if(no==="stop"){
				data=toTwo(thing)+"0010";
				flycar.random(data)
			}else if(no==="clear"){
				data=toTwo(thing)+"0011";
				flycar.random(data)
			}	
		}
	})

})(window)
/*var CAR1 = new FlyCar($("#main"), 1);
$(".aa").on("click", function() {
	CAR1.init()
})
$(".b").on("click", function() {
	CAR1.move()
})

$(".c").on("click", function() {
	CAR1.hide()
})*/
/*	function init() {
		var a = $(".aa"),
			b = $(".b"),
			c = $(".c");
		a.each(function(index, item) {
			$(item).on("click", function() {
				var com = {
					id: index + 1,
					commond: "go",
					show: "出发"
				};
				flycar.random(com);
			})
		})
		b.each(function(index, item) {
			$(item).on("click", function() {
				var com = {
					id: index + 1,
					commond: "stop",
					show: "停止"
				};
				flycar.random(com);
			})
		})
		c.each(function(index, item) {
			$(item).on("click", function() {
				var com = {
					id: index + 1,
					commond: "clear",
					show: "销毁"
				};
				flycar.random(com);
			})
		})
	}
	init()*/