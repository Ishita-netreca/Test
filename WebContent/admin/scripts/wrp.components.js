try {
	WRPApp;
} catch (e) {
	WRPApp = {};
}

var WRPComponents = function(keyword) {
	var returnVal, key;
	
	if (!(this instanceof WRPComponents)) {
		return new WRPComponents(keyword);
	}

	returnVal = document.querySelectorAll(keyword);
	
	for (key in WRPComponents) {
		if (key.indexOf("_") == 0) continue;
		if (!returnVal[key]) {
			
			returnVal[key] = WRPComponents[key];
		}
	}
	
	returnVal.selector = keyword;
	
	return returnVal;
};

WRPComponents._Utils = function(){
	return {
		toDecimalFormat: function(value, format) { // number, string
			var i, len;
			if (typeof(format) !== "string") return value;
			value = ""+value;
			for (i = value.length, len = format.length; i < len; i++) {
				value = "0"+value;
			}
			return value;
		}
	}
}();

WRPComponents.timepicker = function() {
	var self = this;
	
	setTimeout(function() {
		var elem, l, len, select, line, innerHTML;

		for (i = 0, len = self.length; i < len; i++) {
			elem = self[i];
			if (elem.nodeName !== "INPUT") continue;
			if (elem.getAttribute("class")) {
				if (elem.getAttribute("class").indexOf("handled") > 0) continue;
				elem.setAttribute("class", "wrp-timepicker handled" + elem.getAttribute("class").replace(/wrp-timepicker/gi, ""));
			}
			elem.setAttribute("readonly", "");
			elem.setAttribute("hours","24");
			if (!elem.onclick) {
				if (elem.addEventListener) {
					elem.addEventListener("click", WRPComponents._TimePicker.openTimePicker);
				} else {
					elem.onclick = WRPComponents._TimePicker.openTimePicker;
				}
			}
		}
		
		elem = document.getElementById("wrp-plain-timepicker-01");
		if (!elem) {
			elem = document.createElement("div");
			elem.setAttribute("id", "wrp-plain-timepicker-01");
			elem.setAttribute("class", "wrp-plain-mini-popup-01");
			
			line = document.createElement("div");
			line.setAttribute("class","line");
			line.innerHTML = "<div>AM / PM</div>";
			
			select = document.createElement("select");
			select.setAttribute("id","meridiem");
			select.setAttribute("name","meridiem");
			select.innerHTML = '<option value="A">AM</option><option value="P">PM</option>';
			
			line.appendChild(select);
			elem.appendChild(line);
			
			line = undefined;
			select = undefined;
			
			line = document.createElement("div");
			line.setAttribute("class","line");
			line.innerHTML = "<div>Hour</div>";
			
			select = document.createElement("select");
			select.setAttribute("id","hour");
			select.setAttribute("name","hour");
			innerHTML = [];
			for (i = 1; i < 13; i++) {
				innerHTML.push('<option value="');
				innerHTML.push(i);
				innerHTML.push('">');
				innerHTML.push(WRPComponents._Utils.toDecimalFormat(i, "00"));
				innerHTML.push('</option>');
			}
			select.innerHTML = innerHTML.join("");
			
			line.appendChild(select);
			elem.appendChild(line);
			
			innerHTML = undefined;
			line = undefined;
			select = undefined;
			
			line = document.createElement("div");
			line.setAttribute("class","line");
			line.innerHTML = "<div>Minute</div>";
			
			select = document.createElement("select");
			select.setAttribute("id","minute");
			select.setAttribute("name","minute");
			innerHTML = [];
			for (i = 0; i < 60; i++) {
				innerHTML.push('<option value="');
				innerHTML.push(i);
				innerHTML.push('">');
				innerHTML.push(WRPComponents._Utils.toDecimalFormat(i, "00"));
				innerHTML.push('</option>');
			}
			select.innerHTML = innerHTML.join("");
			
			line.appendChild(select);
			elem.appendChild(line);
			
			innerHTML = undefined;
			line = undefined;
			select = undefined;
			
			
			line = document.createElement("div");
			line.setAttribute("class","line");
			line.setAttribute("style","margin-left: 15px;");
			line.innerHTML = '<div id="remove-btn" onclick="WRPComponents.removeSelect();">CLEAR</div>';
			
			elem.appendChild(line);
			
			line = undefined;
			select = undefined;
			
			elem.style.display = "none";
			document.body.appendChild(elem);	
			
			elem = undefined;
		}
	}, 50);
		
	
	return this;
};
WRPComponents.removeSelect = function() {
	document.getElementById("meridiem").value="";
	document.getElementById("minute").value="";
	document.getElementById("hour").value="";
}
WRPComponents.addShadowedImage = function() { // {[image URL](Required), x, y , blur}
	var self, img, arg;
	if (arguments.length < 1) {
		console.warn("no input image url");
		return;
	}
	
	arg = arguments;
	
	self = this;
	
	img = document.createElement("img");
	
	img.onload = function() {
		var canvas, context, i, len, x, y, b;
		
		x = (arg.length > 1 && arg[1] !== undefined)? parseFloat(arg[1]) : 5;
		if (isNaN(x)) x = 5;		
		y = (arg.length > 2 && arg[2] !== undefined)? parseFloat(arg[2]) : 5;
		if (isNaN(y)) y = 5;		
		b = (arg.length > 3 && arg[3] !== undefined)? parseFloat(arg[3]) : 10;
		if (isNaN(b)) b = 10;
		
		canvas = document.createElement("canvas");
		canvas.width = img.naturalWidth + x; 
		canvas.height = img.naturalHeight + y;
		
		context = canvas.getContext("2d");
		if (!context) {
			console.warn("This browser cannot support canvas");
			return;
		}
		
		context.shadowBlur = b;
		context.shadowOffsetX = x;
		context.shadowOffsetY = y;
		context.shadowColor = "rgba(0,0,0,0.7)";
		context.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight);
		
		for (i = 0, len = self.length; i < len; i++) {
			self[i].style.backgroundImage = 'url("' + canvas.toDataURL() + '")';
		}
		
		i = undefined;
		len = undefined;
		x = undefined;
		y = undefined;
		b = undefined;
		context = undefined;
		canvas = undefined;
		img = undefined;
	};
	
	img.src = arg[0];
}

WRPComponents._TimePicker = function() {
	var _selected = undefined;	
	
	return {
		openTimePicker: function(event) {
			var target, elem, arr, value;
			
			target = event.target;
			
			while(target) {
				try {
					if (target.nodeName === "INPUT") {
						if (target.getAttribute("class").indexOf("wrp-timepicker") === 0) {
							break;
						}
					}
					target = target.parentNode;
				} catch (e) {
					
				}
			}
			
			if (!target) return;
			
			try {
				elem = document.getElementById("wrp-plain-timepicker-01");
				if (elem) {
					if (elem.style.display === "block") return;
					elem.style.left = (event.clientX + 10) + "px";
					elem.style.top = (event.clientY + 10) + "px";
					elem.style.display = "block";
				}
				
			} catch (e) {
				console.warn(e);
			}
			
			_selected = target;
			
			target = target.value;
			
			value = target.indexOf(" ");
			if (value > 0) {
				arr = target.substring(value).split(":");
			} else {
				arr = target.split(":");				
			}
			
			if (arr.length > 1) {
				value = parseInt(arr[0]);
				if (!isNaN(value)) {
					elem = document.querySelector("#wrp-plain-timepicker-01 select[name='meridiem']");
					if (elem) {
						if (value > 12) {
							elem.value = "P";
						} else {
							elem.value = "A";
						}
					}
					
					elem = document.querySelector("#wrp-plain-timepicker-01 select[name='hour']");
					if (elem) {
						if (value > 12) {
							elem.value = value - 12;
						} else {
							elem.value = value;
						}
					}
					
					elem = document.querySelector("#wrp-plain-timepicker-01 select[name='minute']");
					if (elem) {
						value = parseInt(arr[1]);
						if (!isNaN(value)) {
							elem.value = value;
						}
					}
				}
			}

			setTimeout(function() {
				document.body.addEventListener("click", WRPComponents._TimePicker.closeTimePicker);
			}, 100);
		},
		closeTimePicker: function(event) {
			var target, hours, meridiem, hour, minute;
			
			target = event.target;
			
			while(target) {
				try {
					if (target.getAttribute && target.getAttribute("id") === "wrp-plain-timepicker-01") {
						return;
					}
				} catch (e) {
					console.warn(e);
				}
				target = target.parentNode;
			}
			
			target = document.getElementById("wrp-plain-timepicker-01");
			
			if (target && _selected) {
				hours = _selected.getAttribute("hours");
				
				meridiem = document.querySelector("#wrp-plain-timepicker-01 select[name='meridiem']");
				if (!meridiem) return;
				meridiem = meridiem.value;
				if (meridiem == "") _selected.value="";

				hour = document.querySelector("#wrp-plain-timepicker-01 select[name='hour']");
				if (!hour) return;
				hour = hour.value;
				if (hour == "") _selected.value="";
				
				minute = document.querySelector("#wrp-plain-timepicker-01 select[name='minute']");
				if (!minute) return;
				minute = minute.value;
				if (minute == "") _selected.value="";
				
				if (hours === "24") {
					hour = parseInt(hour);
					if (!isNaN(hour)) {
						if (meridiem === "A") {							
							_selected.value = WRPComponents._Utils.toDecimalFormat(hour, "00") + ":" + WRPComponents._Utils.toDecimalFormat(minute, "00");
						} else if (meridiem === "P") {							
							_selected.value = WRPComponents._Utils.toDecimalFormat((12 + hour), "00") + ":" + WRPComponents._Utils.toDecimalFormat(minute, "00");
						}
					}
				} else {
					_selected.value = meridiem + " " + WRPComponents._Utils.toDecimalFormat(hour, "00") + ":" + WRPComponents._Utils.toDecimalFormat(minute, "00");
				}
			}
			
			try {
				document.getElementById("wrp-plain-timepicker-01").style.display = "none";
			} catch (e) {
				console.warn(e);
			}
			
			if (_selected.onchange) {
				_selected.onchange.call(_selected, event);
			}
			
			document.body.removeEventListener("click", arguments.callee);
		}
	};
}();