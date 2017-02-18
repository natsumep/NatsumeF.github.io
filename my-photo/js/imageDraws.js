~ function(window, undefined) {
	"use strict"
	var ImageDraws = function(doms) {
		var arr = [];
		if (doms.length) {
			arr = [].slice.call(doms) || doms;
		} else {
			arr.push(doms)
		}
		this.dom = arr;
		this.init();
		this.index=0;
	}
	ImageDraws.prototype.init = function() {
			this.removeDown=false;
			this.createElements();
			this.addEvent();
		}
		//创建基础界面
	ImageDraws.prototype.createElements = function() {
			this.shade = document.createElement("div");
			this.shade.classList.add("shade");
			this.close = document.createElement("button");
			this.close.innerHTML = "×";
			this.share = document.createElement("div");
			this.share.classList.add("share");
			this.max = document.createElement("button");
			this.max.innerHTML = "放大";
			this.min = document.createElement("button");
			this.min.innerHTML = "缩小";
			this.downLoad = document.createElement("button");
			this.goPrev=document.createElement("button");
			this.goPrev.innerHTML="<"
			this.goNext=document.createElement("button");
			this.goNext.innerHTML=">"
			this.downLoad.innerHTML = "下载";
			var shadeStyle = {
					height: "100%",
					width: "100%",
					position: "fixed",
					left: 0,
					top: 0,
					zIndex: 998,
					background: "rgba(212, 203, 212, .8)"
				},
				closeStyle = {
					color: "#fff",
					position: "absolute",
					top: 0,
					display:"block",
					right: "2px",
					height: " 50px",
					width: "50px",
					border: 0,
					outline: 0,
					fontSize: "55px",
					lineHeight: "50px",
					overflow:"hide",
					borderRadius: "50%",
					cursor: "pointer",
					zIndex: 1000,
					background: "rgba(200, 203, 102, .8)"
				},
				shareStyle = {
					height: "50px",
					width:"auto",
					position: "absolute",
					bottom: "10px",
					left: "50%",
					zIndex: 1000,
					transform: "translateX(-50%)"
				},
				shareButtonStyle = {
					height: "30px",
					width: "50px",
					cursor: "pointer",
					borderRadius: "5px",
					margin: " 9px 20px",
					fontSize: "14px",
					lineHeight: 1,
					marginRight: 0,
					background: "rgba(200, 203, 102, .8)"
				},
				gobuttonStyle={
					height:"60px",
					width:"60px",
					position:"absolute",
					zIndex:1000,
					top:"50%",
					fontSize: "30px",
					background: "rgba(153,153,153,0.8)",
					outline:" none",
					color: "#fff",
					borderRadius: "10px",
					transform: "translateY(-50%)",
					border: "0",
					cursor: "pointer"
				};
			for (var i in shadeStyle) {
				this.shade.style[i] = shadeStyle[i];
			};
			for (var i in closeStyle) {
				this.close.style[i] = closeStyle[i];
			};
			for (var i in shareStyle) {
				this.share.style[i] = shareStyle[i];
			};
			for (var i in shareButtonStyle) {
				this.max.style[i] = shareButtonStyle[i];
				this.min.style[i] = shareButtonStyle[i];
				this.downLoad.style[i] = shareButtonStyle[i];
			};
			for(var i in gobuttonStyle){
				this.goNext.style[i]=gobuttonStyle[i];
				this.goPrev.style[i]=gobuttonStyle[i];
			};
			this.goNext.style.right=0;
			this.goPrev.style.left=0;
			this.shade.appendChild(this.share);
			this.shade.appendChild(this.close);
			this.shade.appendChild(this.goNext);
			this.shade.appendChild(this.goPrev);
			this.share.appendChild(this.max);
			this.share.appendChild(this.min);
			this.share.appendChild(this.downLoad);
		}
		//获取body的宽
	ImageDraws.prototype.getBodyWidth = function() {
			return this.getWidth(document.body);
		}
		//让图片可以移动
	ImageDraws.prototype.move = function() {
		var me = this;
		this.image.addEventListener("mousedown", function(e) {
			var e = e ||window.event;
			e.stopPropagation();
			e.preventDefault();
			var x = e.clientX,
				y = e.clientY,
				//这里通过加上一个margin来补偿多减去的offsetLeft
				clickX = x - me.image.offsetLeft + parseInt(me.getStyle(me.image,"marginLeft")),
				clickY = y - me.image.offsetTop + parseInt(me.getStyle(me.image,"marginTop")),
				_move = function(e) {
					var e  = e||window.event;
					me.image.style.left = e.clientX - clickX + "px";
					me.image.style.top = e.clientY - clickY + "px";
					e.preventDefault()
				};
			document.addEventListener("mousemove", _move);
			document.addEventListener("mouseup", function() {
				document.removeEventListener("mousemove", _move);
			})
		})
	};
	//获取当前图片src;
	ImageDraws.prototype.getSrc=function(dom){
		return dom.getAttribute("data-down-src")||dom.getAttribute("src");
	}
	//创建放大的图片
	ImageDraws.prototype.createImg = function(dom) {
		this.image = document.createElement("img");
		this.image.src = dom.src;
		var height,
			me = this,
			width;
		var height = me.image.height,
			width = me.image.width;
		var imageStyle = {
			height: (me.getBodyWidth() * 0.2 * (height / width)) + "px",
			width: me.getBodyWidth() * 0.2 + "px",
			position: "absolute",
			left: "50%",
			top: "50%",
			zIndex: 999,
			cursor: "move",
			transform: "translate(-50%,-50%)"
		}
		for (var i in imageStyle) {
			me.image.style[i] = imageStyle[i];
		}
		me.shade.appendChild(me.image);
		me.move(me.image)
		me.image.addEventListener("mousewheel", function(e) {
			var e = e || window.event;
			e.preventDefault();
			if (e.wheelDelta > 0) {
				me.addSize(0.1)
			} else if (e.wheelDelta < 0) {
				me.reduceSize(0.1)
			}
		})
		me.image.addEventListener("DOMMouseScroll", function(e) {
			var e = e || window.event;
			e.preventDefault();
			if (e.detail > 0) {
				me.addSize(0.1)
			} else if (e.detail < 0) {
				me.reduceSize(0.1)
			}
		})
		var _img = document.createElement("img");
		_img.onload = function() {
			me.image.src = _img.src;
			me.image.style.height=(me.getBodyWidth() * 0.5 * (height / width)) + "px";
			me.image.style.width= me.getBodyWidth() * 0.5 + "px";
		}
		_img.onerror = function() {
			me.imgErrorFn && me.imgErrorFn();
		}
		_img.src = this.getSrc(dom);
	}

		//显示图片
	ImageDraws.prototype.show = function() {
			document.body.appendChild(this.shade);
		}
		//移除图片层
	ImageDraws.prototype.hide = function() {
			document.body.removeChild(this.shade);
			this.hideImg();
		}
		//移除当前图层中的图片
	ImageDraws.prototype.hideImg=function(){
		this.shade.removeChild(this.image);
	}
	//获取style
	ImageDraws.prototype.getStyle=function(dom,style){
		if(getComputedStyle){
			//console.log(window.getComputedStyle(dom,null)[style])
			return window.getComputedStyle(dom,null)[style];
		}else if( dom.currentStyle){
			console.log(dom.currentStyle)
			return dom.currentStyle[style];
		}
	}
		//获取元素的高
	ImageDraws.prototype.getHeight = function(dom) {
			return parseInt(this.getStyle(dom,"height"));
		}
		//获取元素的宽
	ImageDraws.prototype.getWidth = function(dom) {
			return parseInt(this.getStyle(dom,"width"));
		}
		//图片放大
	ImageDraws.prototype.addSize = function(size) {
			this.image.style.height = this.getHeight(this.image) + this.getHeight(this.image) * size + "px";
			this.image.style.width = this.getWidth(this.image) + this.getWidth(this.image) * size + "px";
		}
		//图片缩小
	ImageDraws.prototype.reduceSize = function(size) {
			this.image.style.height = this.getHeight(this.image) - this.getHeight(this.image) * size + "px";
			this.image.style.width = this.getWidth(this.image) - this.getWidth(this.image) * size + "px";
		}
		//添加事件
	ImageDraws.prototype.getAlt=function(dom){
		this.alt = dom.getAttribute("alt")||null;
	}
	ImageDraws.prototype.addEvent = function() {
			var me = this;
			/*for (var i = 0; i < this.dom.length; i++) {
				this.dom[i].addEventListener("click", function(e) {
					me.createImg(this);
					me.alt=me.dom[i].alt||null;
					me.index=i;
					me.goButtonChangeColor();
					if(me.removeDown){
						me.share.removeChild(me.downLoad);
					}
					me.show();
				})
			};*/
			//事件委托到window上;
			window.addEventListener("click",function(e){
				var e  = e||window.event;
				var target = e.target||e.srcElement;
				if(target.tagName==="IMG"){
					for(var i = 0 ; i<me.dom.length;i++){
						if(target===me.dom[i]){
							me.createImg(target);
					me.getAlt(target);
					me.index=i;
					me.goButtonChangeColor();
					if(me.removeDown){
						me.share.removeChild(me.downLoad);
					}
					me.show();
						}
					}
				}
			})
			this.shade.addEventListener("click", function(e) {
				var e  = e||window.event,
					target=e.target||e.srcElement;
				e.preventDefault()
				if (e.target === me.close) {
					me.hide();
					me.closeCallBackFn&&me.closeCallBackFn();
				} else if (target === me.shade) {
					me.hide();
				} else if (target === me.downLoad) {
					me.downImage(me.getSrc(me.dom[me.index]));
				} else if (target === me.max) {
					me.addSize(0.2);
				} else if (target === me.min) {
					me.reduceSize(0.2);
				}
			});
			this.goPrev.addEventListener("mousedown",function(){
				me.goPrevFn();
			})
			this.goNext.addEventListener("mousedown",function(){
				me.goNextFn();
			})
			this.goPrev.addEventListener("mouseup",function(){
				me.goButtonChangeColor();
			})
			this.goNext.addEventListener("mouseupn",function(){
				me.goButtonChangeColor();

			})
		}
		//下载图片
	ImageDraws.prototype.downImage = function(src) {
			var a = document.createElement("a");
			a.href = src;
		a.setAttribute("download", this.alt + src.slice(src.lastIndexOf("."))||a.herf);	
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
		//下载给定的元素数组所有的图片
	ImageDraws.prototype.downImageAll = function() {
		for (var i = 0; i < this.dom.length; i++) {
			this.downImage(this.getSrc(this.dom[i]))
		}
	}
	ImageDraws.prototype.goButtonChangeColor=function(){
		if(this.index===0){
			this.goPrev.style.background="#ccc";
		}else if(this.index===this.dom.length-1){
			this.goNext.style.background="#ccc";
		}else{
			this.goNext.style.background="rgba(153,153,153,0.8)";
			this.goPrev.style.background="rgba(153,153,153,0.8)";
		}
	}
	ImageDraws.prototype.goNextFn=function(){
		if(this.index==this.dom.length-1){
			return;
		}else{
			this.goPrev.style.background="rgb(153,153,153)";
			this.index++;
			this.goButtonChangeColor();
			this.hideImg();
			this.createImg(this.dom[this.index]);
			this.getAlt(this.dom[this.index]);
		}
	}
	ImageDraws.prototype.goPrevFn=function(){
		if(this.index==0){
			return;
		}else{
			this.goPrev.style.background="rgb(153,153,153)";
			this.index--;
			this.goButtonChangeColor();
			this.hideImg();
			this.createImg(this.dom[this.index]);
			this.getAlt(this.dom[this.index]);
		}
	}
	//添加关闭回调
	ImageDraws.prototype.closeCallBack = function(callback) {
		this.closeCallBackFn=callback;
	}
	//移除下载按钮
	ImageDraws.prototype.removeDown=function(){
		this.removeDown= true;
	}
	ImageDraws.prototype.imgAddError=function(fn){
		this.imgErrorFn=fn;
	}
	window.ImageDraws = window.ImageDraws || ImageDraws;
}(window)