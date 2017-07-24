var WRPAdminApp = WRPAdminApp || {};

WRPAdminApp.TimeModule = function() {
	var _store_timezone_offset = -8;
	return {
		getWorkAmountF: function(input_datetime) {
			var arr;
			
			if (typeof(input_datetime) === "object") {
				if (input_datetime instanceof Date) {
					return parseFloat(((input_datetime.getHours()) + (input_datetime.getMinutes() / 60) + (input_datetime.getSeconds() / 3600)).toFixed(2));
				}
			} else if (typeof(input_datetime) === "string") {
				if (input_datetime.indexOf(":") > -1) {
					if (input_datetime.length === 5) {
						arr = input_datetime.split(":");
						if (arr.length === 2) {
							return parseFloat( ( parseInt(arr[0]) + ( parseInt(arr[1]) / 60 ) ).toFixed(2) );						
						}
					} else if (input_datetime.length === 8) {
						arr = input_datetime.split(":");
						if (arr.length === 3) {
							return parseFloat( ( parseInt(arr[0]) + ( parseInt(arr[1]) / 60 ) + ( parseInt(arr[1]) / 3600 ) ).toFixed(2) );		
						}
					}
				}
			}
			
			console.warn("You did input invalid datetime");
			return undefined;
		},
		setTimezoneOffset: function(value) {
			if (value !== undefined) {
				_store_timezone_offset = parseInt(value);
			} else {
				_store_timezone_offset = -(new Date().getTimezoneOffset() / 60);
			}
			
			if (isNaN(_store_timezone_offset)) {
				_store_timezone_offset = 0;
			}
		},
		getServerTime: function() {
			var xmlHttp, url;
			url = window.location.href.toString();
			if(window.XMLHttpRequest){
				xmlHttp = new XMLHttpRequest();
			}else if(window.ActiveXObject){
				xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			}else{
				return null; 
			}
			xmlHttp.open('HEAD',url,false);
			xmlHttp.setRequestHeader("Content-Type", "text/html");
			xmlHttp.send('');
	
			return xmlHttp.getResponseHeader("Date");
		},
		getStoreCurrentTime: function() {
			var date = new Date(WRPAdminApp.TimeModule.getServerTime());
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + (date.getTimezoneOffset() / 60) + ( (_store_timezone_offset !== undefined)? _store_timezone_offset : 0 ), date.getMinutes(), date.getSeconds() );
			
			return date;
		}		
	};
}();