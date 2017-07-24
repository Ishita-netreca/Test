var WRPAdminApp = WRPAdminApp || {};

WRPAdminApp.PermissionModule = function() {
	
	return {
		getPermissionGroupList: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/permission/getPermissionGroupList.jsp",
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
		getUserListOwnedByOwner: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/permission/getUserListOwnedByOwner.jsp",
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
		getPermissionStructSales: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			$.ajax({
				url: "ajax/permission/getPermissionStructSales.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result.data);
						}
					}
				}
			});
		},
		getPermissionStructBackend: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			$.ajax({
				url: "ajax/permission/getPermissionStructBackend.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result.data);
						}
					}
				}
			});
		},
		getUserInfoBySid: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.user_sid === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			$.ajax({
				url: "ajax/permission/getUserInfoBySid.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result.data);
						}
					}
				}
			});
		},
		setPermissionUserInfo: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.user_sid === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/permission/setPermissionUserInfo.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result !== undefined) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result);
						}
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		},
		getPermissionGroupInfo: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.permission_group_sid === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/permission/getPermissionGroupInfo.jsp",
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
		setPermissionGroupInfo: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.permission_group_sid === undefined) {
				return;
			}
						
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/permission/setPermissionGroupInfo.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result !== undefined) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result);
						}
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		},
		setPermissionGroupUsersInfo: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.permission_group_sid === undefined) {
				return;
			}
			
			if (params.users_list_str === undefined) {
				return;
			}
			
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/permission/setPermissionGroupUsersInfo.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result !== undefined) {
						if (wrp_callback !== undefined) {
							wrp_callback.call(window, result);
						}
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		}		
	}
}();