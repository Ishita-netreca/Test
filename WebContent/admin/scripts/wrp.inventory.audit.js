var WRPAdminApp = WRPAdminApp || {};

WRPAdminApp.Inventory = WRPAdminApp.Inventory || {};

WRPAdminApp.Inventory.Audit = function() {
	
	function getCurrentSelectedStoreID() {
		try {
			return document.getElementById("select-store").value;
		} catch (e) {
			console.warn(e);
			return undefined;
		}
	}
	
	
	return {
		getAuditList: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.audit_type === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			if (params.store_id === undefined) {
				params.store_id = getCurrentSelectedStoreID();
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/inventory_audit/getAuditList.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result.data);
						}
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		},
		getAuditInfo: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.audit_sid === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			if (params.store_id === undefined) {
				params.store_id = getCurrentSelectedStoreID();
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/inventory_audit/getAuditInfo.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result.data);
						}
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		}
	};
}();