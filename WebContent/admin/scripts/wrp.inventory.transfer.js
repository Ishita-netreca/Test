var WRPAdminApp = WRPAdminApp || {};

WRPAdminApp.Inventory = WRPAdminApp.Inventory || {};

WRPAdminApp.Inventory.Transfer = function() {
	
	var _store_id;
	
	function getCurrentSelectedStoreID() {
		_store_id = undefined;
		try {
			_store_id = document.getElementById("select-store").value;
			if (_store_id === undefined || _store_id.length < 1) {
				_store_id = undefined;
				return false;
			}
		} catch (e) {
			console.warn(e);
			_store_id = undefined;
			return false;
		}
		
		return true;
	}
	
	return {
		getCurrentTransferStatus: function(wrp_callback) {
			if (wrp_callback !== undefined && typeof(wrp_callback) !== "function") {
				console.warn("First parameter must be function or undefined");
				return;
			}
			
			if (_store_id === undefined) {				
				if (!getCurrentSelectedStoreID()) {
					alert("Select store");
					return;
				}
			}
	    	try {
	    		document.getElementById("loading-container").style.display = "block";
	    	} catch (e) {
	    		
	    	}
			
			$.ajax({
				url: "ajax/inven_transfer/getCurrentTransferStatus.jsp",
				data: {
					store_id: _store_id
				},
				method: "GET",
				dataType: "json",
				success: function(result) {
					var data;

			    	try {
			    		document.getElementById("loading-container").style.display = "none";
			    	} catch (e) {
			    		
			    	}
			    	
					data = result.data;
					if (!data) return;
					
					if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
						wrp_callback.call(window, data);
					}
				}
			});
		},
		getTransferList: function(wrp_callback, start_date, end_date, status) {			
			
			if (wrp_callback !== undefined && typeof(wrp_callback) !== "function") {
				console.warn("First parameter must be function or undefined");
				return;
			}
			
			if (start_date !== undefined && ( typeof(start_date) !== "string" && typeof(start_date) !== "object" ) ) {
				console.warn("Second parameter must be string or Date object");
				return;
			}
			
			if (end_date !== undefined && ( typeof(end_date) !== "string" && typeof(end_date) !== "object" ) ) {
				console.warn("Third parameter must be string or Date object");
				return;
			}
			
			if (status !== undefined && typeof(status) !== "number" ) {
				console.warn("Fourth parameter must be number");
				return;
			}
			
			if (_store_id === undefined) {				
				if (!getCurrentSelectedStoreID()) {
					alert("Select store");
					return;
				}
			}
	    	try {
	    		document.getElementById("loading-container").style.display = "block";
	    	} catch (e) {
	    		
	    	}
			
			$.ajax({
				url: "ajax/inven_transfer/getTransferList.jsp",
				data: {
					store_id: _store_id,
					status: (status !== undefined)? status : -1,
					start_date: (start_date !== undefined)? start_date: null,
					end_date: (end_date !== undefined)? end_date: null
				},
				method: "GET",
				dataType: "json",
				success: function(result) {
					var data;
					if (result.data) {
						data = result.data;
					} else {
						data = result;
					}

			    	try {
			    		document.getElementById("loading-container").style.display = "none";
			    	} catch (e) {
			    		
			    	}
					if (!data) {
						return;
					}
					
					if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
						wrp_callback.call(window, data);
					}
				}				
			});
		}
	};
}();