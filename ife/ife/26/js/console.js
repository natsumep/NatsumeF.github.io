function Console(ele){
	this.ele=ele;
	
};
Console.prototype.show=function(){

};
Console.prototype.hide=function(){

};
/*
	{
		id:1 2 3 4 ,
		commond:
	}

*/
Console.prototype.random = function(id, con) {
	setTimeout(function() {
		if ((Dath.random() * 100)< 30) {
			$("textarea").html($("textarea").html()+"你对" + id + "号飞船发送的" + con + "指令丢包了!\n")+;
			return false;
		} else {
			$("textarea").html($("textarea").html()+"你对" + id + "号飞船发送的" + con + "指令成功发送");
			return true;
		}
	},1000)
};
Console.prototype.say=function(data){
	switch(data.commond){
		case go:
			this.random(data.id,data,commond)
	}
};