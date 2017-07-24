var WRPAdminApp = WRPAdminApp || {};

WRPAdminApp.EventsModule = function() {
	
	var click_count = 0;
	var _initTimer = 250;
	
	function _initClickCount() {
		click_count = 0;
	}
	
	return {
		onclick: function(wrp_callback) { // callback(required), parameters(optional)
			var arg, second_arg, _this, i, len;
			
			if (wrp_callback === undefined) {
				click_count = 0;
				return;
			}
			
			if (arguments.length > 1) {
				second_arg = arguments[1];
			}
			
			if (second_arg !== undefined && second_arg.target && second_arg.clientX && second_arg.clientY) { // Event Object
				_this = second_arg.target;
			} else {
				_this = window || undefined;
			}
			
			click_count = click_count + 1;
			if (click_count == 1) {
				arg = [];
				for (i = 1, len = arguments.length; i < len; i++) {
					arg.push(arguments[i]);
				}
				
				wrp_callback.apply(_this, arg);
				
				setTimeout(_initClickCount, _initTimer);
			}				
		}
	};
}();