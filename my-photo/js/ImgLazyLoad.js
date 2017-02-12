"use strict"
~ function(window, undefined) {
	var ImgLazyLoad = function(doms,time,height) {
		var arr = [];
		if (doms.length) {
			arr = [].slice.call(doms) || doms || document.body;
		} else {
			arr.push(doms)
		}
		this.dom = arr;
		this.time=time||1000;
		this.height=height||200;
		this.init();
	}
	ImgLazyLoad.prototype.init=function(){
		this.addEvent();
		this.show(this.index);
	}
	//实现图片加载
	ImgLazyLoad.prototype.show = function() {
		for (let i = 0; i < this.dom.length; i++) {
			if (!this.dom[i]["flag"]) {
				if (this.getDomTop(this.dom[i]) < (document.body.scrollTop + this.height) && this.getDomBotton(this.dom[i]) > (document.body.scrollTop)) {
					this.dom[i]["flag"]=true;
					setInterval(function() {
						if (this.dom[i].getAttribute("data-src")) {
							this.dom[i].src = this.dom[i].getAttribute("data-src");
						}
					}.bind(this), this.time)
				}
			}
		}
	}
	//获取图片距离最外层元素的高;
	ImgLazyLoad.prototype.getDomClientHeight = function(dom) {
		var str = dom.offsetTop;
		if (dom.offsetParent) {
			return str + this.getDomClientHeight(dom.offsetParent);
		} else {
			return str;
		}
	}
	ImgLazyLoad.prototype.getDomTop=function(dom){
		return (this.getDomClientHeight(dom) - window.innerHeight);
	}
	ImgLazyLoad.prototype.getDomBotton=function(dom){
		return (this.getDomClientHeight(dom) + parseInt(window.getComputedStyle(dom).height));
	}
	//给document添加鼠标滚动事件
	ImgLazyLoad.prototype.addEvent = function() {
		var me = this;
		var show = function() {
			console.log(1)
			me.show(me.index);
		};
		window.addEventListener("scroll", me.throttlev(show, null, me))
	}
	//节流函数
	ImgLazyLoad.prototype.throttlev=function(fn, time, context) {
		var old = new Date().getTime();
		return function() {
			var now = new Date().getTime();
			if (typeof time !== "number") {
				time = 50;
				context = time;
			}
			if (now - old > time) {
				fn.apply(context);
				old = now;
			}
		}
	},
	window.ImgLazyLoad = window.ImgLazyLoad || ImgLazyLoad;
}(window)