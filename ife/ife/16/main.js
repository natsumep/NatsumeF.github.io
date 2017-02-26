/**
 * Created by fp on 2017.1.3;
 *
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
/*
 *通用函数
 */
$ = {
	getId: function(ele) {
		return document.getElementById(ele);
	},
	getClass: function(ele) {
		return document.getElementsByClassName(ele);
	},
	getTag: function(ele) {
		return document.getElementsByTagName(ele);
	},
	on: function(ele, type, fn) {
		if (ele.addEventListener) {
			$.on = function(ele, type, fn) {
				ele.addEventListener(type, fn, false);
			}
		} else if (ele.attachEvent) {
			$.on = function(ele, type, fn) {
				ele.attachEvent("on" + type, fn);
			}
		} else {
			$.on = function(ele, type, fn) {
				ele["on" + type] = fn;
			}
		}
		$.on(ele, type, fn);
	},
	//判断一个对象是否为空 
	isEmpty: function(obj) {
		for (var i in obj) {
			return false;
		}
		return true;
	}
};
(function() {
	var aqiData = {},
		cityError = $.getClass("aqi-city-error")[0],
		valueError = $.getClass("aqi-value-error")[0],
		inputCity = $.getId("aqi-city-input"),
		inputValue = $.getId("aqi-value-input");
	//判断城市输入框传出的数据是否符合要求
	function changeInputCity(input, span) {
		var aqiCity = input.value;
		console.log(aqiCity)
		if (aqiCity.length === 0) {
			span.innerHTML = "请输入城市名!"
		} else
		if (!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(aqiCity)) {
			span.innerHTML = "城市名只能填写中英文字符!";
		} else {
			span.innerHTML = "";
			return 1;
		}
	}
	//判断空气数据框传出的数据是否符合要求
	function changeInputValue(input, span) {
		var aqiValue = input.value;
		if (aqiValue.length === 0) {
			span.innerHTML = "请输入空气指数!";
		} else
		if ((aqiValue % 1) !== 0) {
			span.innerHTML = "空气指数只能是整数!";
		} else {
			span.innerHTML = "";
			return 1;
		}
	}

	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		if (changeInputCity(inputCity, cityError) + changeInputValue(inputValue, valueError) == 2) {
			aqiData[inputCity.value] = inputValue.value;
		}
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		var _html = "<th>城市</th><th>空气质量</th><th>操作</th></tr>",
			table = $.getId("aqi-table");
		for (var i in aqiData) {
			_html += "<tr><td>" + i + "</td><td>" + aqiData[i] +
				"</td><td><button class='del_but' data_key=\'" + i + "\'>删除</button></td></tr>";
		}
		table.innerHTML = _html;
		//判断aqiData中的数据是否为空;
		if ($.isEmpty(aqiData)) {
			table.innerHTML = "暂时没有数据"
		}
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {

		addAqiData();
		renderAqiList();
	};

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(key) {
		// do sth.
		delete aqiData[key];
		renderAqiList();
	};

	function init() {
		// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
		$.on($.getId("add-btn"), "click", function(e) {
			//console.log(e.target)
			addBtnHandle();
			if ($.isEmpty(aqiData)) {
				del_but = $.getClass("del_but");
			}
		})
		$.on($.getTag("input")[0], "input", function() {
			changeInputCity(inputCity, cityError);
		})
		$.on($.getTag("input")[1], "input", function() {
				changeInputValue(inputValue, valueError);
			})
			// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
		$.on($.getId("aqi-table"), "click", function(e) {
			//console.log(e.target.className==="del_but")
			if (e.target.className === "del_but") {
				var key = e.target.getAttribute("data_key");
				delBtnHandle(key);
			}
		})
	}
	init();
})()