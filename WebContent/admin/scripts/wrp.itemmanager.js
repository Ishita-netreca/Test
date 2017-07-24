var WRPAdminApp = WRPAdminApp || {};

WRPAdminApp.ItemManager = function() {
	
	var __wrp_managed_items_in_parent = undefined;
	var __wrp_managed_items_in_child = undefined;
	
	var __wrp_managed_items_in_parent_loaded_flag = false;
	var __wrp_managed_items_in_child_loaded_flag = false;
	
	var __callback_get_difference_between_parent_items_and_child_items = undefined;
	
	function getCurrentStoreId() {
		var store_id;
		try {
			store_id = document.getElementById("select-store").value;
			if (store_id.length == 0) {
				return undefined;
			}
		} catch (e) {
			console.warn(e);
		}
	
		return store_id;
	}
	
	function getParentTableItems(params) {
		var new_params;
		
		__wrp_managed_items_in_parent = undefined;
		__wrp_managed_items_in_parent_loaded_flag = false;
		
		
		if (params === undefined) {
			return;
		}
		
		if (params.item_type === undefined) {
			return;
		}
		
		new_params = {};
		
		new_params.item_type = params.item_type;
		if (params.search_keyword != null && params.search_keyword.length > 0) {
			new_params.search_keyword = params.search_keyword;
		}
		if (params.select_from_wrp_db_table_flag !== undefined && params.select_from_wrp_db_table_flag > 0) {
			new_params.select_from_wrp_db_table_flag = 1;
		} else if (params.select_from_master_table_flag !== undefined && params.select_from_master_table_flag > 0) {
			new_params.select_from_master_table_flag = 1;
		} else if (params.select_from_owner_table_flag !== undefined && params.select_from_owner_table_flag > 0) {
			new_params.select_from_owner_table_flag = 1;
		}
		
		new_params.wrp_managed_items_only_flag = 1;
		
		$.ajax({
			url: "ajax/item_management/getItemDictList.jsp",
			data: new_params,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj;
				
				data = result.data;
				if (!data) {
					return;					
				}
				
				__wrp_managed_items_in_parent = {};
				
				for (i = 0, len = data.length; i < len; i++) {
					obj = data[i];
					if (obj.item_code === undefined) {
						continue;
					}
					
					__wrp_managed_items_in_parent[obj.item_code] = obj;
				}
				
				__wrp_managed_items_in_parent_loaded_flag = true;
				
				if (__wrp_managed_items_in_parent_loaded_flag === true && __wrp_managed_items_in_child_loaded_flag === true) {
					getDifferenceBetweenWRPItemsAndChildItems();
				}
			}
		});
	}
	
	function getChildTableItems(params) {
		var new_params;		
		__wrp_managed_items_in_child = undefined;
		__wrp_managed_items_in_child_loaded_flag = false;
		
		
		if (params === undefined) {
			return;
		}
		
		if (params.item_type === undefined) {
			return;
		}
		
		new_params = {};
		
		new_params.item_type = params.item_type;
		if (params.search_keyword != null && params.search_keyword.length > 0) {
			new_params.search_keyword = params.search_keyword;
		}
		if (params.select_from_wrp_db_table_flag !== undefined && params.select_from_wrp_db_table_flag > 0) {
			if (params.select_to_master_table_flag !== undefined && params.select_to_master_table_flag > 0) {
				new_params.select_from_master_table_flag = 1;
			} else if (params.select_to_owner_table_flag !== undefined && params.select_to_owner_table_flag > 0) {
				new_params.select_from_owner_table_flag = 1;
			}
		} else if (params.select_from_master_table_flag !== undefined && params.select_from_master_table_flag > 0) {
			new_params.select_from_owner_table_flag = 1;
		}
		
		new_params.wrp_managed_items_only_flag = 1;
		
		$.ajax({
			url: "ajax/item_management/getItemDictList.jsp",
			data: new_params,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj;
				
				data = result.data;
				if (!data) {
					return;					
				}
				
				__wrp_managed_items_in_child = {};
				
				for (i = 0, len = data.length; i < len; i++) {
					obj = data[i];
					if (obj.item_code === undefined) {
						continue;
					}
					
					__wrp_managed_items_in_child[obj.item_code] = obj;
				}
				
				__wrp_managed_items_in_child_loaded_flag = true;
				
				if (__wrp_managed_items_in_parent_loaded_flag === true && __wrp_managed_items_in_child_loaded_flag === true) {
					getDifferenceBetweenWRPItemsAndChildItems();
				}
			}
		});
	}
	
	// difference_status
	// 0 : equals
	// -1 : exists in child only
	// 1 : non-exist item_code
	// 2 : different model column
	// 3 : different description column
	// 4 : different sku column
	// 5 : different item cost column
	// 6 : different retail price column
	// 7 : different manufacturer column
	// 8 : different disable column
	function getDifferenceBetweenWRPItemsAndChildItems() {
		var item_code, parent_item, child_item, returned_data, newObj;
		
		if(__wrp_managed_items_in_parent === undefined || __wrp_managed_items_in_child === undefined ) {
			return;
		}

/*		console.log("__wrp_managed_items_in_parent");
		console.log(__wrp_managed_items_in_parent);
		console.log("__wrp_managed_items_in_child");
		console.log(__wrp_managed_items_in_child);*/
		
		returned_data = [];
		
		for (item_code in __wrp_managed_items_in_parent) {
			parent_item = __wrp_managed_items_in_parent[item_code];
			child_item = __wrp_managed_items_in_child[item_code];
			
			newObj = {};

			newObj.sid = parent_item.sid;
			newObj.item_code = item_code;
			newObj.model = parent_item.model;
			newObj.description = parent_item.description;
			newObj.item_cost = parent_item.item_cost;
			newObj.sku = parent_item.sku;
			newObj.manufacturer = parent_item.manufacturer;
			
			if (child_item === undefined) {
				newObj.difference_status = 1;
			} else {
				if (newObj.difference_status === undefined && (parent_item.model !== child_item.model) ) {
					newObj.difference_status = 2;
				}
				if (newObj.difference_status === undefined && (parent_item.description !== child_item.description) ) {
					newObj.difference_status = 3;
				}
				if (newObj.difference_status === undefined && (parent_item.sku !== child_item.sku) ) {
					newObj.difference_status = 4;
				}
				if (newObj.difference_status === undefined && (parent_item.item_cost !== child_item.item_cost) ) {
					newObj.difference_status = 5;
				}
				if (newObj.difference_status === undefined && (parent_item.retail_price !== child_item.retail_price) ) {
					newObj.difference_status = 6;
				}
				if (newObj.difference_status === undefined && (parent_item.manufacturer !== child_item.manufacturer) ) {
					newObj.difference_status = 7;
				}
				if (newObj.difference_status === undefined && (parent_item.disable !== child_item.disable) ) {
					newObj.difference_status = 8;
				}
				if (newObj.difference_status === undefined) {
					newObj.difference_status = 0;
				}
			}
			
			if(newObj.difference_status > 0){
				returned_data.push(newObj);
			}
			
		}
		/*
		for (item_code in __wrp_managed_items_in_child) {
			parent_item = __wrp_managed_items_in_parent[item_code];
			child_item = __wrp_managed_items_in_child[item_code];
			
			if (parent_item === undefined) {				
				newObj = {};
				
				newObj.sid = parent_item.sid;
				newObj.item_code = item_code;
				newObj.model = parent_item.model;
				newObj.description = parent_item.description;
				newObj.item_cost = parent_item.item_cost;
				newObj.sku = parent_item.sku;
				newObj.manufacturer = parent_item.manufacturer;
				
				newObj.difference_status = -1;
				returned_data.push(newObj);
			}			
		}
		*/
		if (__callback_get_difference_between_parent_items_and_child_items !== undefined
			&& typeof(__callback_get_difference_between_parent_items_and_child_items) === "function") {
			__callback_get_difference_between_parent_items_and_child_items.call(window, returned_data);
		}
		
		try {
			document.getElementById("loading-container").style.display = "none";
		} catch (e) {
			
		}		
	}
	
	return {
		getItemDictList: function(params) {
			var wrp_callback, input_param;
			if (params === undefined) {
				return;
			}
			
			if (params.item_type === undefined) {
				return;
			}
			/*
			if (params.store_id === undefined) {
				params.store_id = getCurrentStoreId();
				if (params.store_id === undefined) {
					return;
				}
			}
			*/
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			$.ajax({
				url: "ajax/item_management/getItemDictList.jsp",
				data: params,
				method : "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
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
		getItemDictInfoBySid: function(params) {
			
			if (params === undefined) {
				return;
			}
			
			if (params.item_sid === undefined) {
				return;
			}
			/*
			if (params.store_id === undefined) {
				params.store_id = getCurrentStoreId();
				if (params.store_id === undefined) {
					return;
				}
			}
			*/
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}

			$.ajax({
				url: "ajax/item_management/getItemDictInfoBySid.jsp",
				data: params,
				method : "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
							wrp_callback.call(window, result.data);
						}
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				},
				error: function() {
					console.log(arguments);
				}
			});
		},
		getItemDictListNotInStore: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			/*
			if (params.store_id === undefined) {
				params.store_id = getCurrentStoreId();
				if (params.store_id === undefined) {
					return;
				}
			}
			*/
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/item_management/getItemDictListNotInStore.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
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
		downloadItemsDuplicateCheck: function(params) {
			var wrp_callback;
		
			if (params === undefined) {
				return;
			}
			
			if (params.item_sid_list_str === undefined) {
				return;
			}	
			/*
			if (params.store_id === undefined) {
				params.store_id = getCurrentStoreId();
				if (params.store_id === undefined) {
					return;
				}
			}
			*/
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/item_management/checkDuplicateItems.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
						wrp_callback.call(window, result.data);
					}
						
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		},
		downloadParentItemsToChild: function(params) {
			var wrp_callback;
		
			if (params === undefined) {
				return;
			}
			
			if (params.item_sid_list_str === undefined) {
				return;
			}	
			/*
			if (params.store_id === undefined) {
				params.store_id = getCurrentStoreId();
				if (params.store_id === undefined) {
					return;
				}
			}
			*/
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/item_management/downloadFromParentItems.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
						wrp_callback.call(window, result);
					}
						
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		},
		getStoreListThatHaveItem: function(params) {
			var wrp_callback;
		
			if (params === undefined) {
				return;
			}
			
			if (params.item_code === undefined) {
				return;
			}
			
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/item_management/getStoreListThatHaveItem.jsp",
				data: {
					item_code: params.item_code
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
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
		setStoreItemsByItemCode: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.item_code === undefined) {
				return;
			}
			
			if (params.store_list_str === undefined ) {
				return;
			}
			
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "ajax/item_management/setStoreItemsByItemCode.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
						wrp_callback.call(window, result);
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}		
				}
			});
		},
		requestCompareParentAndChildItems: function(params) {
			if (params === undefined) {
				return;
			}
			/*
			if (params.select_to_store_table_flag !== undefined && params.select_to_store_table_flag > 0) {				
				if (params.store_id === undefined) {
					params.store_id = getCurrentStoreId();
					if (params.store_id === undefined) {
						return;
					}
				}
			}
			*/
			if (params.callback !== undefined && typeof(params.callback) === "function") {
				__callback_get_difference_between_parent_items_and_child_items = params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}		
			
			getParentTableItems(params);
			getChildTableItems(params);
		},
		getCategoryListByParentSid: function(params) {
			var wrp_callback;
			if (params === undefined) {
				return;
			}
			/*
			if (params.store_id === undefined) {
				params.store_id = getCurrentStoreId();
				if (params.store_id === undefined) {
					return;
				}
			}
			*/
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}		
			
			$.ajax({
				url: "ajax/item_management/getCategoryListByParentSid.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
							wrp_callback.call(window, result.data);
						}
					}	
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				},
				error: function() {
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}
				}
			});
		},
		getItemCodeExistFlag: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.item_code === undefined) {
				return;
			}
			
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}		
			
			$.ajax({
				url: "ajax/item_management/getItemCodeExistFlag.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
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
		setItemDictInfo: function(params) {
			var wrp_callback;
			
			if (params === undefined) {
				return;
			}
			
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}		
			
			$.ajax({
				url: "ajax/item_management/setItemDictInfoBySid.jsp",
				data: params,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (wrp_callback !== undefined && typeof(wrp_callback) === "function") {
						wrp_callback.call(window, result);
					}
					
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						
					}		
				}
			});
		},
		setItemDictInfoWithItemImage: function(params) {
			var wrp_callback, jqForm;
			
			if (params === undefined) {
				return;
			}
			
			if (params.form === undefined) {
				return;
			}
			
			if (params.callback !== undefined) {
				wrp_callback = params.callback;
				delete params.callback;
			}
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				
			}		

			jqForm = $(params.form);			
	        
	        if (jqForm[0].itemImageFile.files.length > 0) {
	        	jqForm.attr("action", "ajax/item_management/setItemDictInfoWithUploadImageBySid.jsp");
	            jqForm.ajaxForm(function(data, state) {
	            	if (data !== undefined && data.length > 0) {
	            		if (wrp_callback !== undefined) {
	            			wrp_callback.call(window, data);
	            		}
						
						try {
							document.getElementById("loading-container").style.display = "none";
						} catch (e) {
							
						}	
	            	}
	            });
	            jqForm.submit();
	        } else {
	        	WRPCommon.MsgBoxModule.alert({
	        		message: "No selected item image"
	        	});
	        }
		}
	};
}();