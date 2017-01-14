"use strict";
//定义一个控制面板单例;
var adapter = {
	//获取显示面板
	main: document.getElementsByTagName("tbody")[0],
	//当前纯在的飞船状态信息;
	arr: ["", "", "", ""],
	//在屏幕上显示当前存在的飞船状态; 销毁飞船时调用一下该函数;否则最后一架飞船的信息会清空失败;
	showArr: function() {
		var html = "";
		var me = this;
		this.arr.forEach(function(item, index) {
			if (item) {
				html += "<tr><td>" + item[0] + "号</td><td>" +
					me.showSpeed(item[1]) + "</td><td>" +
					me.showRevert(item[2]) + "</td><td>"+
					me.showCond(item[3])+"</td><td>"+
					item[4]+"%</td></tr>";
			}
		});
		this.main.innerHTML = html;
	},
	//修改添加当前飞船信息状态;data为一个16位数2进制编码;由飞船模块进行调用;
	pushArr: function(data) {
		//var data1=
		var data = dataDeal.deal(data);
			var id = data.id,
			cond = data.cond,
			energy = data.energy;
		this.arr[id - 1].push(cond, energy);
		//console.log(this.arr)
		this.showArr();
	},
	//删除飞船时调用,移除飞船信息;
	deleteArr: function(i) {
		this.arr[i] = "";
	},
	//显示飞船发动机
	showSpeed: function(i) {
		if (i === 5) {
			return "普通飞船";
		} else if (i === 7) {
			return "双发动机";
		} else {
			return "推进装置";
		}
	},
	//显示飞船能源系统
	showRevert: function(i) {
		if (i === 2) {
			return "机械能";
		} else if (i === 4) {
			return "光能";
		} else {
			return "组合能"
		}
	},
	//显示飞船飞行状态
	showCond:function(i){
		if(i===1){
			return "运行中";
		}else if(i===2){
			return "停止";
		}else{
			return "准备摧毁"
		}
	}
}