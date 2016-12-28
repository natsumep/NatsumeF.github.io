window.onload=function(){
	var shear=document.getElementsByClassName("share_1")[0],
		shear_qq=document.getElementsByClassName("qq")[0],
			shear_wx=document.getElementsByClassName("wx")[0],
				shear_wb=document.getElementsByClassName("wb")[0],
		input = document.getElementsByClassName("search")[0].getElementsByTagName("input")[0],
		times1,times2,times3,times4,times5,times6;
	
		input.addEventListener("focus",function(){
			var	x=window.body.scrollWidth;
			var	y=window.body.scrollHeight;
				var div = document.createElement("div");
				div.style.height=y+"px";
				div.style.width=x+"px";
				div.className="tanchu";
				document.body.appendChild(div);

		})
		input.addEventListener("blur",function(){
			var tanchu=document.getElementsByClassName("tanchu")[0];
			document.body.removeChild(tanchu);})
		window.addEventListener("resize",function(){
				if(document.getElementsByClassName("tanchu")[0]){
					var tanchu=document.getElementsByClassName("tanchu")[0];
					var	x=window.body.scrollWidth;
					var	y=window.body.scrollHeight;
					tanchu.style.height=y+"px";
					tanchu.style.width=x+"px";

				}else{
					return;
				}
			})
		function getStyle(element,style){
			 if(element.currentStyle){ 
			 return	element.currentStyle[style];
			 } else{
			return getComputedStyle(element, false)[style];}
		}	
	/*	function getStyle(obj,attr){    //获取非行间样式，obj是对象，attr是值
    if(obj.currentStyle){   //针对ie获取非行间样式
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];   //针对非ie
    };
};*/
		//var marL=parseFloat(getStyle(ele,"marginLeft"));

		function show(ele){
						var index = 0;
						var marL=parseInt(getStyle(ele,"marginLeft"));
					(function(){	
						ele.times1=setInterval(function(){
											if(index>3){
												clearInterval(ele.times1);
											}
											ele.style.marginLeft=marL-4+"px";
											console.log(marL)
											console.log(ele.times1)
											marL-=4
											index++
											},1000/60)})()
			}

		
		shear.addEventListener("mouseover",function(){
			setTimeout(function(){shear_qq.style.display="block"
			show(shear_qq),
			setTimeout(function(){
				shear_wb.style.display="block";
				show(shear_wb);
			setTimeout(function(){
				shear_wx.style.display="block"
			show(shear_wx)
		},100)
			},100)
		},100)
			
			
})
   function Animes(ele){
     	
   	this.times1=null;
   	this.times2=null;
   	this.index=1;
   	this.ele=ele;
   	this.marL=parseInt(getStyle(ele,"marginLeft"));

   }
 

Animes.prototype.show=function(){
	 var that=this,
	 ele=this.ele;
	 clearInterval(that.times2)
	that.times1=setInterval(function(){
				if(that.index>5){
				clearInterval(that.times1);
				};
				ele.style.display="block";
				ele.style.marginLeft=that.marL-4+"px";
				console.log(ele.style.marginLeft+' '+that.marL+' '+that.index+ ' '+that.times1);
				that.marL-=4;
				that.index++;},
				1000/100)
	}
Animes.prototype.out=function(){
	 var that=this,
	 ele=this.ele;
	 clearInterval(that.times1)
	 that.times2=setInterval(function(){
	 			if(that.index<1){
				clearInterval(that.times2);
				ele.style.display="none";
				};
				ele.style.marginLeft=that.marL+4+"px";
				console.log(ele.style.marginLeft+' '+that.marL+' '+that.index+ ' '+that.times1);
				that.marL+=4;
				that.index--;

	 },1000/100)
}
	var qq = new Animes(shear_qq);
	var wx = new Animes(shear_wx);
	var wb = new Animes(shear_wb);
//alert(qq.index)
		shear.addEventListener("mouseover",function(){
			setTimeout(function(){	
				qq.show();
			setTimeout(function(){
				wb.show();
			setTimeout(function(){
				wx.show();
		},50)
		},50)
		},50)
		})
		shear.addEventListener("mouseout",function(){
					setTimeout(function(){	
				wx.out();
			setTimeout(function(){
				wb.out();
			setTimeout(function(){
				qq.out();
		},50)
		},50)
		},50)
		})






}
		
			

