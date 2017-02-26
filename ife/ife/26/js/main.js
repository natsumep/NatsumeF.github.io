"use strict";
(function(window, undefined) {
	var main = $("#main"),
		textarea = $("textarea")[0];
		function text(text){
			textarea.value += text+"\n";
			textarea.scrollTop = textarea.scrollHeight;
		}
	var flycar = {
		//仓库里面的车;
		id: [1, 2, 3, 4],
		main: [new FlyCar(main, 1), new FlyCar(main, 2), new FlyCar(main, 3), new FlyCar(main, 4)],
		status: [false, false, false, false],
		sortId: function() {
			this.id.sort(function(a, b) {
				return a - b;
			})
		},
		random: function(data) {
			var me = this;
			me
			setTimeout(function() {
				if ((Math.random() * 100) < 30) {
					text("你对" + data.id + "号公车发送的" + data.show + "指令丢包了!");
				} else {
					text( "你对" + data.id + "号公车发送的" + data.show + "指令成功发送!");
					if (data.commond === "clear") {
						me.id.push(data.id);
						me.status[data.id] = false;
						me.sortId();
						$($(".move")[data.id - 1]).hide();
						console.log(me.id)
					}
					me.say(data)
				}
			}, 1000)
		},
		say: function(data) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i]) {
					this.main[i].listen(data);
				}
			}
		}
	};
	$(".new-car").on("click", function() {
		if (flycar.id.length > 0) {
			flycar.sortId();
			var i = flycar.id.shift();
			flycar.status[i - 1] = true;
			setTimeout(function() {
				flycar.main[i - 1].init();
				text("秋名山车神第" + i + "号已经就位")
				
				$($(".move")[i - 1]).show()
					//do something;
			}, 1000)
		} else {
			setTimeout(function() {
				text("司机不够了!没法开车了!")
			}, 1000)
		}
	})

	function init() {
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
	init()
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