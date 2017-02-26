"use strict"
function FlyCar(ele,no) {
	this.ele = ele;
	this.NO = no;
	this.div=null;
};
FlyCar.prototype.init = function(data) {
	this.energy = 100; //能量
	this.speed = Number(data.speed); //速度
	this.work = Number(data.speed); //工作消耗
	this.revert = Number(data.revert);//回复
	this.deg = 0; 
	this.moveTime;
	this.addTime;
	this.show();
};
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
FlyCar.prototype.show = function() {
	clearInterval(this.addTime);
	clearInterval(this.moveTime);
	this.createCar()
	this.div.show();
	this.lookMove();
};
FlyCar.prototype.hide = function() {
	clearInterval(this.addTime);
	clearInterval(this.moveTime);
	this.div.remove();
};
FlyCar.prototype.lookMove = function() {
	this.div.find(".number").html(this.energy.toFixed()) ;
	this.div.find(".oback").css({
		left:-this.energy * 0.4 + "px"
	})
	this.div.css({
		transform : "rotate(" + this.deg + "deg)"
	});
};
FlyCar.prototype.move = function() {
	var than = this;
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
FlyCar.prototype.addWork = function() {
	var than = this;
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
//接受命令;
FlyCar.prototype.listen = function(no,commond) {
	if (this.NO === no) {
		if (commond === 1) {
			this.move();
		} else if (commond === 10) {
			this.addWork()
		} else if (commond === 11) {
			this.hide();
		}
	}
};