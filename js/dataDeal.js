"use strict";
//数据处理中心;2~10进制互换 二进制前添0;
var dataDeal = {
	//转换为二进制;
	toTwo: function(a, nombre) {
		var a = Number(a).toString(2),
			nombre = nombre ? nombre : 4;

		function four(a) {
			if (a.length < nombre) {
				return four("0" + a)
			} else {
				return a.toString();
			}
		}
		return four(a)
	},
	//转换为10进制;
	toTen: function(a) {
		var ten = 0;
		a = a.toString()
		for (let i = 0; i < a.length; i++) {
			ten += a.charAt(i) * Math.pow(2, a.length - 1 - i);
		}
		return ten;
	},
	//处理传入数据;如果超过2个表示需要转换为10进制;
	deal: function(data) {
		var data = [].slice.call(arguments);
		if (data.length === 1 && data[0].length === 8) {
			var id = this.toTen(data[0].slice(0, 4)),
				commond = this.toTen(data[0].slice(-4));
			return {
				id: id,
				commond: commond
			}
		} else if (data[0].length === 16) {
			var id = this.toTen(data[0].slice(0, 4)),
				energy = this.toTen(data[0].slice(-8)),
				cond = this.toTen(data[0].slice(4, 8));

			return {
				id: id,
				energy: energy,
				cond: cond
			}
		};
		if (data.length > 1) {
			var str = "",
				me = this;
			data.forEach(function(item, index) {
				if (index < 2) {
					str += me.toTwo(item.toString());
				} else {
					str += me.toTwo(item,8);
				}
			})
			return str;
		}
	}
}