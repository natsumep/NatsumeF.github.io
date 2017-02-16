"use strict"
function FlyCar(ele,no) {
	this.ele = ele;
	this.NO = no;
	this.div=null;
};
//初始化
FlyCar.prototype.init = function(data) {
	this.energy = 100; //能量
	this.speed = Number(data.speed); //速度
	this.work = Number(data.speed); //工作消耗
	this.revert = Number(data.revert);//回复
	this.deg = 0; 
	this.moveTime;
	this.addTime;
	this.cond=2;
	this.show();
};
//添加飞船
FlyCar.prototype.createCar = function() {
	if (this.div === null) {
		this.div = $("<div class='ball" + this.NO + "'>" +
			"<div class=\"car\">" +
			"<span class=\"number\">100</span>" +
			"<div class=\"oback\"></div>" +
			"</div>" +
			"</div>")
		this.div.appendTo(this.ele)
	}
};
//显示飞船；
FlyCar.prototype.show = function() {
	clearInterval(this.addTime);
	clearInterval(this.moveTime);
	this.createCar()
	this.div.show();
	this.lookMove();
};
//移除飞船
FlyCar.prototype.hide = function() {
	clearInterval(this.addTime);
	clearInterval(this.moveTime);
	this.cond=3;
	this.div.remove();
};
//对飞船的UI进行动态改变
FlyCar.prototype.lookMove = function() {
	this.div.find(".number").html(this.energy.toFixed()) ;
	this.div.find(".oback").css({
		left:-this.energy * 0.4 + "px"
	})
	this.div.css({
		transform : "rotate(" + this.deg + "deg)"
	});
};
//飞船开始移动
FlyCar.prototype.move = function() {
	var than = this;
		this.cond=1;
	clearInterval(this.addTime);
	clearInterval(this.moveTime);
	this.moveTime = setInterval(function() {
		than.energy -= than.work / 20;
		than.deg += than.speed / 20;
		if (than.energy <= 0) {
			than.energy = 0;
			clearInterval(than.moveTime);
			than.addWork()
		}
		than.lookMove()
	}, 50)
};
//停止工作 添加能源；
FlyCar.prototype.addWork = function() {
	var than = this;
		this.cond=2;
	clearInterval(this.addTime)
	clearInterval(this.moveTime);
	this.addTime = setInterval(function() {
		than.energy += than.revert;
		if (than.energy >= 100) {
			than.energy = 100;
			clearInterval(than.addTime)
		}
		than.lookMove()
	}, 1000)
};
//接受命令;data为8位数2进制字符串或数字
FlyCar.prototype.listen = function(data) {
	var data=dataDeal.deal(data),
		no=data.id,
		commond=data.commond;
		//console.log(no+" "+commond)
	if (this.NO === no) {
		if (commond === 1) {
			this.move();
		} else if (commond === 2) {
			this.addWork()
		} else if (commond === 3) {
			this.hide();
		}
	}
};
//发送飞船当前状态; 由main模块每秒调用一次；
FlyCar.prototype.speak=function(){
	var data=dataDeal.deal(this.NO.toFixed(),this.cond.toFixed(),this.energy.toFixed());
	//console.log(data+"dly")
	adapter.pushArr(data);
}