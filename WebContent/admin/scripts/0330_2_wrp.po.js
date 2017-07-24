try {
	WRPAdminApp;
} catch (e) {
	WRPAdminApp = {};
}
// PO : Purchase Order
WRPAdminApp.POModule = function() {
	var _vendorList = undefined;
	var _storeItemsList = undefined;
	
	var _expressAddedItems = undefined;
	var _expressSerialNoList = undefined; // List, Element -> index : item_sid
	var _expressSelectedAddedItemSid = 0;
	var _expressSelectedVendorSid = 0;
	var _expressTotalCost = 0;
	
	var _newOrderPOId = undefined;
	var _newOrderSelectedVendorSid = 0;
	var _newOrderAddedItems = undefined;
	var _newOrderTotalCost = 0;

	var _orderedPOSid = 0;
	var _orderedPOSerialNoList = undefined;
	var _orderedPOItems = undefined;
	var _orderedSelectedItemSid = 0;
		
	// component_type : [(g: grid),(c: combobox)]
	function _printVendorList(output_element_id, component_type, search_keyword) {
		var elem, obj, i, len, count=0, metro_count;
		if (_vendorList !== undefined && _vendorList.length > 0) {
			if (typeof(output_element_id) === "string") {
				elem = $("#"+output_element_id);
			} else {
				elem = $(output_element_id);
			}
			
			if (elem) {
				if (component_type === "g") {
					elem.jqxGrid("clear");
					elem.jqxGrid("addrow",null,_vendorList,"last");
				} else if (component_type === "c") {
					elem.jqxComboBox("clear");
					if (search_keyword !== undefined && search_keyword.length > 0) {
						for (i = 0, len = _vendorList.length; i < len; i++) {
							obj = _vendorList[i];
							if (obj.sid === undefined || obj.vendor_id === undefined) continue;
							if (obj.vendor_id.toLowerCase().indexOf(search_keyword.toLowerCase()) > -1) {
								elem.jqxComboBox("addItem", {value: obj.sid, label: obj.vendor_id});
								if(obj.vendor_id == "metropcs"){	metro_count = count;}
								++count;
							}
						}
					} else {
						for (i = 0, len = _vendorList.length; i < len; i++) {
							obj = _vendorList[i];
							if (obj.sid === undefined || obj.vendor_id === undefined) continue;
							
							elem.jqxComboBox("addItem", {value: obj.sid, label: obj.vendor_id});
							if(obj.vendor_id.toLowerCase() == "metropcs"){	metro_count = count;}
							++count;
						}
					}
				}	
				elem.jqxComboBox('selectIndex', metro_count );
			}	
		}
        
        try {
        	document.getElementById("loading-container").style.display = "none";
        } catch (e) {
        	console.warn(e);
        }
	}
	
	function _printStoreItemsList(output_element_id) {
		var elem, obj, i, len;
		if (_storeItemsList !== undefined && _storeItemsList.length > 0) {
			if (typeof(output_element_id) === "string") {
				elem = $("#"+output_element_id);
			} else {
				elem = $(output_element_id);
			}
			
			if (elem) {				
				elem.jqxGrid("clear");				
				elem.jqxGrid("addrow",null,_storeItemsList,"last");
				/*
				for (i = 0, len = _storeItemsList.length; i < len; i++) {
					obj = _storeItemsList[i];
					elem.jqxGrid("addrow",null,obj,"last");
				}
				*/
			}
		}
        
        try {
        	document.getElementById("loading-container").style.display = "none";
        } catch (e) {
        	console.warn(e);
        }
	}
	
	function _printExpressPOItemsList(grid_id) {
		var elem, i, len, obj, serial;
		
		if (_expressAddedItems === undefined) {
			_expressAddedItems = [];
		}
		
		if (_expressSerialNoList === undefined) {
			_expressSerialNoList = {};
		}
		
		if (typeof(grid_id) === "string") {
			elem = $("#"+grid_id);
		} else {
			elem = $(grid_id);
		}
		
		_expressTotalCost = 0;
		
		if (elem) {
			elem.jqxGrid("clear");
			for (i =0, len = _expressAddedItems.length; i < len; i++) {
				console.log(_expressAddedItems[i]);
				obj = _expressAddedItems[i];
				if (obj.item_type < 3) {
					serial = _expressSerialNoList[obj.item_sid];
					if (serial !== undefined) {
						obj.qty = serial.length;
						if (obj.item_cost === undefined) obj.item_cost = 0;
						obj.sub_total = obj.item_cost * obj.qty;
						_expressTotalCost = _expressTotalCost + obj.sub_total;
					}
				} else {
					if (obj.qty != obj.pre_qty) {
						obj.qty = obj.pre_qty;
					}
					obj.sub_total = obj.item_cost * obj.qty;
					_expressTotalCost = _expressTotalCost + obj.sub_total;
					obj.qty = 0;
				}
			}
			elem.jqxGrid("addrow", null, _expressAddedItems, "last");
			
		}
	}
	
	function _getExpressAddedItemsByItemSid(item_sid) {
		var i, len, obj;
		if (item_sid === undefined || item_sid < 1) {
			return undefined;
		}
		
		if (_expressAddedItems === undefined) {
			_expressAddedItems = [];
		}
		
		for (i = 0, len = _expressAddedItems.length; i < len; i++) {
			obj = _expressAddedItems[i];
			if (obj.item_sid === item_sid) {
				return obj;
			}
		}
		
		return undefined;
	}
	
	function _printNewPOItemsList(grid_id) {
		var elem, i, len, obj, serial;
		
		if (_newOrderAddedItems === undefined) {
			_newOrderAddedItems = [];
		}
		
		if (typeof(grid_id) === "string") {
			elem = $("#"+grid_id);
		} else {
			elem = $(grid_id);
		}
		
		_newOrderTotalCost = 0;
		
		if (elem) {
			elem.jqxGrid("clear");
			for (i =0, len = _newOrderAddedItems.length; i < len; i++) {
				obj = _newOrderAddedItems[i];
				_newOrderTotalCost = _newOrderTotalCost + obj.sub_total;					
			}
			elem.jqxGrid("addrow", null, _newOrderAddedItems, "last");
		}
	}
	
	function _getNewPOAddedItemsByItemSid(item_sid) {
		var i, len, obj;
		if (item_sid === undefined || item_sid < 1) {
			return undefined;
		}
		
		if (_newOrderAddedItems === undefined) {
			_newOrderAddedItems = [];
		}
		
		for (i = 0, len = _newOrderAddedItems.length; i < len; i++) {
			obj = _newOrderAddedItems[i];
			if (obj.item_sid === item_sid) {
				return obj;
			}
		}
		
		return undefined;
	}
	
	return {
		_totalOrderedPOCount: 0,
		_totalFulfilledPOCount: 0,
		_totalReceivedPOCount: 0,
		// Name
		// - getPOList
		// Parameters
		// - string output_element_id
		// - string output_element_id, int po_status
		// - string output_element_id, string search_keyword
		// - string output_element_id, int poStatus, string search_keyword
		// - string output_element_id, int poStatus, string search_keyword, string search_start_date, string search_end_date
		// Return
		// - undefined
		getPOList: function() {
			var param, output_element_id;
			
			param = {};
			switch (arguments.length) {
			case 1:
				if (arguments[0] === undefined) {
					return;
				}
				break;
			case 2:
				if (arguments[0] === undefined || arguments[1] === undefined) {
					return;
				}
				if (typeof(arguments[1]) == "number") {
					param.po_status = arguments[1];
				} else if (typeof(arguments[1]) == "string") {
					param.search_keyword = arguments[1];
				}
				break;
			case 3:
				if (arguments[0] === undefined || arguments[1] === undefined || arguments[2] === undefined) {
					return;
				}
				param.po_status = arguments[1];
				param.search_keyword = arguments[2];
				break;
			case 5:
				if (arguments[0] === undefined || arguments[1] === undefined || arguments[2] === undefined || arguments[3] === undefined || arguments[4] === undefined) {
					return;
				}
				param.po_status = arguments[1];
				param.search_keyword = arguments[2];
				param.search_start_date = arguments[3];
				param.search_end_date = arguments[4];
				break;
			default:
				if (arguments.length < 5) {
					return;
				}
				if (arguments[0] === undefined || arguments[1] === undefined || arguments[2] === undefined || arguments[3] === undefined || arguments[4] === undefined) {
					return;
				}
				param.po_status = arguments[1];
				param.search_keyword = arguments[2];
				param.search_start_date = arguments[3];
				param.search_end_date = arguments[4];
				break;
			}		

	        try {
	            param.store_id = document.getElementById("select-store").value;
	            if (param.store_id.length == 0) return;
	        } catch (e) {
	            console.warn(e);
	            return;
	        }
			
	        output_element_id = arguments[0];
	        
	        try {
	        	if (typeof(output_element_id) === "string") {
	        		$("#"+output_element_id).jqxGrid("clear");
	        	} else {
	        		$(output_element_id).jqxGrid("clear");
	        	}
	        } catch (e) {
	        	
	        }
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
			
			$.ajax({
				url: "ajax/po/getPOList.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var elem, i, len, obj;
					if (result.data) {
						if (typeof(output_element_id) === "string") {
							elem = $("#"+output_element_id);
						} else {
							elem = $(output_element_id);
						}
						
						WRPAdminApp.POModule._totalOrderedPOCount = 0;
						WRPAdminApp.POModule._totalFulfilledPOCount = 0;
						WRPAdminApp.POModule._totalReceivedPOCount = 0;
												
						if (elem) {
							elem.jqxGrid("clear");
							for (i = 0, len = result.data.length; i < len; i++) {
								obj = result.data[i];
		    					switch (obj.status) {
		    	                case 0:
		    	                	obj.status_str="Order";
		    	                	WRPAdminApp.POModule._totalOrderedPOCount++;
		    	                    break;
		    	                case 2:
		    	                	obj.status_str="Approval";
		    	                	WRPAdminApp.POModule._totalFulfilledPOCount++;
		    	                    break;
		    	                case 4:
		    	                	obj.status_str="Complete";
		    	                	WRPAdminApp.POModule._totalReceivedPOCount++;
		    	                    break;
		    	                }
							}
							elem.jqxGrid("addrow", null, result.data, "last");
						}
				        
				        try {
				        	document.getElementById("loading-container").style.display = "none";
				        } catch (e) {
				        	console.warn(e);
				        }
				        
				        if (WRPAdminApp.pagescript.printPOCount) {
				        	WRPAdminApp.pagescript.printPOCount(param.po_status);
				        }
					}
				}
			});
		},
		
		// Name
		// - getPODetail
		// Parameters
		// string output_element_id, output_element_id(costs), int po_sid
		// Return
		// - undefined
		getPODetail: function() {
			var output_element_id, output_element_id_cost, po_sid, store_id;

			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length == 0) {
					return;
				}
			} catch (e) {
				console.warn(e);
			}
			
			switch (arguments.length) {
			case 3:
				if (arguments[0] === undefined || arguments[1] === undefined || arguments[2] === undefined) {
					return;
				}
				output_element_id = arguments[0];
				output_element_id_cost = arguments[1];
				po_sid = arguments[2];
				break;
			default:
				if (arguments.length < 3) {
					return;
				}
				if (arguments[0] === undefined || arguments[1] === undefined || arguments[2] === undefined) {
					return;
				}
				output_element_id = arguments[0];
				output_element_id_cost = arguments[1];
				po_sid = arguments[2];
				break;
			}
	        
	        try {
	        	if (typeof(output_element_id) === "string") {
	        		$("#"+output_element_id).jqxGrid("clear");
	        	} else {
	        		$(output_element_id).jqxGrid("clear");
	        	}
	        } catch (e) {
	        	
	        }
	        
	        try {
	        	if (typeof(output_element_id_cost) === "string") {
	        		$("#"+output_element_id_cost).jqxGrid("clear");
	        	} else {
	        		$(output_element_id_cost).jqxGrid("clear");
	        	}
	        } catch (e) {
	        	
	        }
	        /*
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
	        */
			
			$.ajax({
				url: "ajax/po/getPODetail.jsp",
				data: {
					store_id: store_id,
					po_sid: po_sid
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var elem;
					if (result.data) {
						if (typeof(output_element_id) === "string") {
							elem = $("#"+output_element_id);
						} else {
							elem = $(output_element_id);
						}
												
						if (elem) {
							elem.jqxGrid("addrow", null, result.data, "last");
						}
				        /*
				        try {
				        	document.getElementById("loading-container").style.display = "none";
				        } catch (e) {
				        	console.warn(e);
				        }
				        */
					}
				}
			});
			
			$.ajax({
				url: "ajax/po/getPODetailCostsList.jsp",
				data: {
					store_id: store_id,
					po_sid: po_sid
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var elem, i, len, obj;
					if (result.data) {
						if (typeof(output_element_id_cost) === "string") {
							elem = $("#"+output_element_id_cost);
						} else {
							elem = $(output_element_id_cost);
						}
						
						for (i = 0, len = result.data.length; i < len; i++) {
							obj = result.data[i];
							switch (obj.type) {
							case 0:
								obj.type_str = "Other";
								break;
							case 1:
								obj.type_str = "Shipping Cost";
								break;
							}
						}
												
						if (elem) {
							elem.jqxGrid("addrow", null, result.data, "last");
						}
				        /*
				        try {
				        	document.getElementById("loading-container").style.display = "none";
				        } catch (e) {
				        	console.warn(e);
				        }
				        */
					}
				}
			});
		},
		// Name
		// - getVendorList
		// Parameters
		// - string output_element_id, String Component Type [grid/combobox], String search_keyword
		// Return
		// - undefined
		getVendorList: function() {
			var output_element_id, component_type, search_keyword;
			
			switch (arguments.length) {
			case 2:
				if (arguments[0] === undefined || arguments[1] === undefined) {
					return;
				}
				
				output_element_id = arguments[0];
				component_type = arguments[1];
				break;
			case 3:
				if (arguments[0] === undefined || arguments[1] === undefined) {
					return;
				}				
				output_element_id = arguments[0];
				component_type = arguments[1];
				if (arguments[2] !== undefined) {
					search_keyword = arguments[2];
				}
				break;
			default:
				if (arguments.length < 2) {
					return;
				}
				if (arguments[0] === undefined || arguments[1] === undefined) {
					return;
				}
				
				output_element_id = arguments[0];
				component_type = arguments[1];
				
				if (arguments[2] !== undefined) {
					search_keyword = arguments[2];
				}
			}
			
			if (_vendorList !== undefined && _vendorList.length > 0) {
				_printVendorList(output_element_id, component_type, search_keyword);
			} else {				
				$.ajax({
					url: "ajax/po/getVendorList.jsp",
					method: "POST",
					dataType: "json",
					success: function(result) {
						if (result.data) {
							_vendorList = result.data;
							_printVendorList(output_element_id, component_type, search_keyword);
						}
					}
				});
			}
		},
		// Name
		// - getStoreItemsList
		// Parameters
		// - string output_element_id, int vendor_sid
		// - string output_element_id, String search_keyword
		// - string output_element_id, int vendor_sid, String search_keyword
		// Return
		// - undefined
		getStoreItemsList: function(){
			var output_element_id, search_keyword, store_id, vendor_sid;
			
			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length == 0) {
					return;
				}
			} catch (e) {
				console.warn(e);
			}
			
			switch(arguments.length) {
			case 2:
				if (arguments[0] === undefined) {
					return;
				}
				output_element_id = arguments[0];
				if (typeof(arguments[1]) === "string") {
					search_keyword = arguments[1];
				} else if (typeof(arguments[1]) === "number") {
					vendor_sid = arguments[1];
				}
				break;
			case 3:
				if (arguments[0] === undefined) {
					return;
				}
				output_element_id = arguments[0];
				vendor_sid = arguments[1];
				search_keyword = arguments[2];
				break;
			default:
				if (arguments.length < 2) {
					return;
				}
				if (arguments[0] === undefined) {
					return;
				}
				output_element_id = arguments[0];
				if (arguments[1] !== undefined) {
					vendor_sid = arguments[1];
				}
				if (arguments[2] !== undefined) {
					search_keyword = arguments[2];
				}
				break;
			}
			
			if (vendor_sid === undefined) {
				vendor_sid = _expressSelectedVendorSid;
			} else {
				_expressSelectedVendorSid = vendor_sid;		 
			}
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }       
	        
	        _storeItemsList = undefined;
			
			$.ajax({
				url: "ajax/po/getStoreItemsList.jsp",
				data: {
					store_id: store_id,
					vendor_sid: vendor_sid,
					search_keyword: search_keyword
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result.data) {
						_storeItemsList = result.data;
						_printStoreItemsList(output_element_id);
				        
				        try {
				        	document.getElementById("loading-container").style.display = "none";
				        } catch (e) {
				        	console.warn(e);
				        }
					}
				}
			});
		},
		generateNewPOID: function() {
			var date, new_po_id, tmp, store_id;
			date = new Date();
			
			try {
				store_id = document.getElementById("select-store").value;
			} catch (e) {
				console.warn(e);
			}
			
			new_po_id = [];
			if (store_id.length > 0) {
				new_po_id.push(store_id.toUpperCase());
				new_po_id.push("_");
			}
	    	tmp = date.getHours();
	    	if (tmp < 10) {
	    		new_po_id.push("0");
	    	}
	    	new_po_id.push(tmp);
	    	new_po_id.push("_");
	    	tmp = date.getMinutes();
	    	if (tmp < 10) {
	    		new_po_id.push("0");
	    	}
	    	new_po_id.push(tmp);
	    	new_po_id.push("_");
	    	tmp = date.getDate();
	    	if (tmp < 10) {
	    		new_po_id.push("0");
	    	}
	    	new_po_id.push(tmp);
	    	tmp = (date.getMonth() + 1);
	    	if (tmp < 10) {
	    		new_po_id.push("0");
	    	}
	    	new_po_id.push(tmp);
	    	new_po_id.push(date.getFullYear());
	    	
	    	return new_po_id.join("");
		},
		resetPOExpressData: function(grid_id) {
			_expressAddedItems = undefined;
			_expressAddedItems = [];
			_expressSerialNoList = undefined;
			_expressSerialNoList = {};
			_expressSelectedAddedItemSid = 0;
			if (grid_id !== undefined) {
				_printExpressPOItemsList(grid_id);
			}
		},
		addPOExpressItem: function(grid_id, item_obj) {
			var i, len, obj;
			
			if (_expressAddedItems === undefined) {
				_expressAddedItems = [];
			}
			
			for (i = 0, len = _expressAddedItems.length; i < len; i++) {
				obj = _expressAddedItems[i];
				if (obj.item_sid === item_obj.sid) {
					alert("This item has already been added");
					return;
				}				
				obj = undefined;
			}
			
			if (obj === undefined) {
				obj = {};
				obj.item_sid = item_obj.sid;
				obj.item_type = item_obj.item_type;
				obj.item_code = item_obj.item_code;
				obj.model = item_obj.model;
				obj.description = item_obj.description;
				obj.sku = item_obj.sku;
				obj.item_cost = item_obj.item_cost;
				obj.qty = 0;
				obj.pre_qty = 0;
				obj.sub_total = obj.item_cost * obj.qty;
				_expressAddedItems.push(obj);
			}		
			
			_printExpressPOItemsList(grid_id);
		},
		deletePOExpressItem: function(grid_id, item_obj) {
			var i, len, obj;
			
			if (_expressAddedItems === undefined) {
				_expressAddedItems = [];
			}
			
			for (i = 0, len = _expressAddedItems.length; i < len; i++) {
				obj = _expressAddedItems[i];
				if (obj.item_sid === item_obj.item_sid) {
					_expressAddedItems.splice(i, 1);
					if (_expressSerialNoList[obj.item_sid] !== undefined) {
						_expressSerialNoList[obj.item_sid] = undefined;
					}
					_printExpressPOItemsList(grid_id);
					break;
				}
			}			
		},
		printExpressPOItemsList: function(grid_id) {
			_printExpressPOItemsList(grid_id);
		},
		getExpressPOTotalCost: function() {
			return _expressTotalCost;
		},
		confirmAddedItemInExpress: function(item_sid, confirm_serialized_window_id, confirm_nonserialized_window_id) {
			var item, value, innerHTML, serial, i, len;
			
			_expressSelectedAddedItemSid = 0;
			
			item = _getExpressAddedItemsByItemSid(item_sid);	
						
			if (item === undefined) {
				return;
			}
			
			_expressSelectedAddedItemSid = item_sid;
			
			switch (item.item_type) {
			case 0:
			case 1:
			case 2:
				try {
					value = document.getElementById("po-express-new-po-id").value;
					if(value !== undefined && value.length > 0) {
						document.getElementById("po-express-confirm-serialized-item-po-id").innerHTML = value;
					} else {
						document.getElementById("po-express-confirm-serialized-item-po-id").innerHTML = "&nbsp";
					}
				} catch (e) {
					console.warn(e);
					return;
				}
				try {
					value = $("#po-express-vendor-list").jqxComboBox("getSelectedItem");
					if(value.label !== undefined && value.label.length > 0) {
						document.getElementById("po-express-confirm-serialized-item-vendor-name").innerHTML = value.label;
					} else {
						document.getElementById("po-express-confirm-serialized-item-vendor-name").innerHTML = "&nbsp";
					}
				} catch (e) {
					//console.warn(e);
					//return;
				}
				try {
					document.getElementById("po-express-confirm-serialized-item-code").innerHTML = (item.item_code !== undefined && item.item_code.length > 0)? item.item_code : "&nbsp;";					
				} catch (e) {
					console.warn(e);
					return;
				}
				try {
					document.getElementById("po-express-confirm-serialized-item-sku").innerHTML = (item.sku !== undefined && item.sku.length > 0)? item.sku : "&nbsp;";					
				} catch (e) {
					console.warn(e);
					return;
				}
				try {
					document.getElementById("po-express-confirm-serialized-item-description").innerHTML = (item.description !== undefined && item.description.length > 0)? item.description : "&nbsp;";					
				} catch (e) {
					console.warn(e);
					return;
				}

				
				if (_expressSerialNoList === undefined) {
					_expressSerialNoList = {};
				}
				
				serial = _expressSerialNoList[_expressSelectedAddedItemSid];
				
				if (serial !== undefined) {
					innerHTML = [];
					for (i = 0, len = serial.length; i < len; i++) {
						innerHTML.push('<div class="item">');
						innerHTML.push('<div class="serial">');
						innerHTML.push(serial[i]);
						innerHTML.push('</div>');
						innerHTML.push('<div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);');
						innerHTML.push("document.getElementById('scan_qty').innerHTML =  parseInt(document.getElementById('scan_qty').innerHTML)-1;");
						innerHTML.push('"></div>')
						innerHTML.push('</div>');					
					}
					try {
						document.getElementById("po-express-confirm-serial-no-list").innerHTML = innerHTML.join("");					
					} catch (e) {
						console.warn(e);
						return;
					}
					
					innerHTML = undefined;
				} else {
					try {
						document.getElementById("po-express-confirm-serial-no-list").innerHTML = "";					
					} catch (e) {
						console.warn(e);
						return;
					}
				}
				
				if (confirm_serialized_window_id !== undefined ) {
					$("#"+confirm_serialized_window_id).jqxWindow("open");
				}
				
				break;
			case 3:
				try {
					value = document.getElementById("po-express-new-po-id").value;
					if(value !== undefined && value.length > 0) {
						document.getElementById("po-express-confirm-nonserialized-item-po-id").innerHTML = value;
					} else {
						document.getElementById("po-express-confirm-nonserialized-item-po-id").innerHTML = "&nbsp";
					}
				} catch (e) {
					console.warn(e);
					return;
				}
				try {
					value = $("#po-express-vendor-list").jqxComboBox("getSelectedItem");
					if(value.label !== undefined && value.label.length > 0) {
						document.getElementById("po-express-confirm-nonserialized-item-vendor-name").innerHTML = value.label;
					} else {
						document.getElementById("po-express-confirm-nonserialized-item-vendor-name").innerHTML = "&nbsp";
					}
				} catch (e) {
					//console.warn(e);
					//return;
				}
				try {
					document.getElementById("po-express-confirm-nonserialized-item-code").innerHTML = (item.item_code !== undefined && item.item_code.length > 0)? item.item_code : "&nbsp;";					
				} catch (e) {
					console.warn(e);
					return;
				}
				try {
					document.getElementById("po-express-confirm-nonserialized-item-sku").innerHTML = (item.sku !== undefined && item.sku.length > 0)? item.sku : "&nbsp;";					
				} catch (e) {
					console.warn(e);
					return;
				}
				try {
					document.getElementById("po-express-confirm-nonserialized-item-description").innerHTML = (item.description !== undefined && item.description.length > 0)? item.description : "&nbsp;";					
				} catch (e) {
					console.warn(e);
					return;
				}
				try {
					document.getElementById("po-express-confirm-nonserialized-item-qty").value = (item.qty !== undefined)? item.qty : 0;					
				} catch (e) {
					console.warn(e);
					return;
				}
				
				if (confirm_nonserialized_window_id !== undefined ) {
					$("#"+confirm_nonserialized_window_id).jqxWindow("open");
				}
				break;
			}
		},
		inputSerialNo: function(serial_no, print_element_id, print_str_format) {
			var elem;
			if (serial_no === undefined || serial_no.length < 1) {
				alert("Input Serial no.");
				return;
			}
			elem = document.getElementById(print_element_id);
			if (elem) {
				elem.innerHTML = elem.innerHTML + print_str_format.replace(/{serial}/gi, serial_no);
			}
		},
		getSerialNoListFromExcelFile: function(file_elem, print_element_id, print_str_format) {
			var file, ext, reader;

	        if (file_elem.files.length > 0) {
	            file = file_elem.files[0];
	            ext = file.name.substring(file.name.lastIndexOf("."));
	            if (ext !== ".xls") {
	                alert('You must select file : *.xls');
	                return;
	            }

	            try {
	                reader = new FileReader();

	                if (reader.readAsBinaryString) {


	                    reader.onload = function(e) {
	                        var data = e.target.result;
	                        var cfb = XLS.CFB.read(data, {type: 'binary'});
	                        var wb = XLS.parse_xlscfb(cfb);
	                        var serialItemList = document.getElementById(print_element_id);
	                        var count = 0;
	                        if (!serialItemList) return;   

	                        // Loop Over Each Sheet
	                        wb.SheetNames.forEach(function(sheetName) {
	                            // Obtain The Current Row As CSV
	                            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
	                            var data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {header:1});
	                          
	                            $.each(data, function( indexR, valueR ) {
	                                $.each(data[indexR], function( indexC, valueC ) {       
	                                	serialItemList.innerHTML = serialItemList.innerHTML + print_str_format.replace(/{serial}/gi, valueC); // ?�쩔???�음
	                                });
	                            });
	                        });
	                    };

	                    reader.readAsBinaryString(file);
	                } else if (reader.readAsArrayBuffer) {
	                    reader.onload = function(e) {
	                        var data = "";
	                        var cfb, wb;
	                        var serialItemList = document.getElementById(print_element_id);
	                        var count = 0;
	                        var bytes = new Uint8Array(reader.result);
	                        var len = bytes.byteLength;

	                        if (!serialItemList) return;

	                        for (var i = 0; i < len; i++) {
	                            data += String.fromCharCode(bytes[i]);
	                        }

	                        cfb = XLS.CFB.read(data, {type: 'binary'});
	                        wb = XLS.parse_xlscfb(cfb);

	                        // Loop Over Each Sheet
	                        wb.SheetNames.forEach(function(sheetName) {
	                            // Obtain The Current Row As CSV
	                            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
	                            var data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {header:1});
	                            
	                            
	                            $.each(data, function( indexR, valueR ) {
	                                $.each(data[indexR], function( indexC, valueC ) { 
	                                	serialItemList.innerHTML = serialItemList.innerHTML + print_str_format.replace(/{serial}/gi, valueC); // ?�쩔???�음
	                                });
	                            });
	                        });
	                    };
	                    reader.readAsArrayBuffer(file);
	                }

	            } catch (e) {
	                console.warn(e);
	            }

	            file_elem.value = "";
	        }
		},
		submitSerialItemDataInExpress: function(serial_no_list_id, grid_id) {
			var list, i, len, elem, serial_no_list;
			
			if (_expressSelectedAddedItemSid < 1) {
				return false;
			}
			
			list = document.getElementById(serial_no_list_id);
			if (!list) {
				return false;
			}
			
			if (_expressSerialNoList === undefined) {
				_expressSerialNoList = {};
			}
			
			serial_no_list = _expressSerialNoList[_expressSelectedAddedItemSid];
			
			
			if (serial_no_list === undefined) {
				serial_no_list = [];
				_expressSerialNoList[_expressSelectedAddedItemSid] = serial_no_list;
			} else {
				serial_no_list = [];
			}
						
			for (i = 0, len = list.children.length; i < len; i++) {
				elem = list.children[i];
				if (elem.children.length == 2) {
					if (elem.children[0].innerText.length > 0) {
						serial_no_list.push(elem.children[0].innerText);
					}
				}
			}
			
			_printExpressPOItemsList(grid_id);
			
			return true;
		},
		submitNonSerialItemDataInExpress: function(qty, grid_id) {
			var item;
			
			if (_expressSelectedAddedItemSid < 1) {
				return false;
			}
			
			if (qty < 1) {
				alert("Input Qty");
				return false;
			}
			
			if (isNaN(parseInt(qty))) {
				alert("qty contains non-numeric characters");
				return;
			}

			item = _getExpressAddedItemsByItemSid(_expressSelectedAddedItemSid);
			
			if (item === undefined) {
				alert("There is no item you select");
			}
			
			item.qty = qty;
			if (item.item_cost === undefined) item.item_cost = 0;
			item.sub_total = item.item_cost * item.qty;
			
			_printExpressPOItemsList(grid_id);
			
			return true;
		},
		setExpressPO: function(callback) {
			var param, tmp, i, len, obj;
			
			if (_expressAddedItems === undefined || _expressAddedItems.length == 0) {
				alert("Add items");
				return;
			}
			
			param = {};
			
			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length < 1) {
					param = undefined;
					return;
				}
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}
			
			try {
				param.po_id = document.getElementById("po-express-new-po-id").value;
				if (param.po_id.length < 1) {
					alert("Input PO ID");
					param = undefined;
					return;
				}
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}	
			
			try {
				tmp = $("#po-express-vendor-list").jqxComboBox("getSelectedItem");
				
				console.log(tmp);
				
				if (tmp === undefined || !tmp || tmp.value === undefined) {
					alert("Select Vendor ID");
					param = undefined;
					return;
				}
								
				if (tmp.value.length < 1) {
					alert("Select Vendor ID");
					param = undefined;
					return;
				}
				
				param.vendor_id = tmp.value;
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}	
			
			try {
				param.po_items_list_str = JSON.stringify(_expressAddedItems);
				console.log(param.po_items_list_str);
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}		
			
			try {
				param.po_serialized_items = JSON.stringify(_expressSerialNoList);
				
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}		
			
			tmp = JSON.parse(JSON.stringify($("#po-express-costs-list").jqxGrid("getrows")));
			console.log(tmp);
			if (tmp) {
				for (i = 0, len = tmp.length; i < len; i++) {
					obj = tmp[i];
					obj.boundindex = undefined;
					delete obj.boundindex;
					obj.type_str = undefined;
					delete obj.type_str;
					obj.uid = undefined;
					delete obj.uid;
					obj.uniqueid = undefined;
					delete obj.uniqueid;
					obj.visibleindex = undefined;
					delete obj.visibleindex;
				}
				
				param.po_costs = JSON.stringify(tmp);
			}
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
			console.log(param);
			$.ajax({
				url: "ajax/po/setExpressPO.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						alert("Complete");
						try {
							$("#po-express-po-window").jqxWindow("close");							
						} catch (e) {
							console.warn(e);
						}
					} else {
						alert("Error : " + result);
					}	
			        
			        try {
			        	document.getElementById("loading-container").style.display = "none";
			        } catch (e) {
			        	console.warn(e);
			        }				
			        
			        if (result === 0) {
			        	if (callback !== undefined) {
							callback.call({});
						}
			        }
				}			
			});
		},
		setSelectedVendorSidInNewPO: function(sid) {
			_newOrderSelectedVendorSid = sid;
		},
		getSelectedVendorSidInNewPO: function() {
			return _newOrderSelectedVendorSid;
		},
		resetNewPOData: function(grid_id) {
			_newOrderAddedItems = undefined;
			_newOrderAddedItems = [];
			if (grid_id !== undefined) {
				_printNewPOItemsList(grid_id);
			}
		},
		addnewPOItem: function(grid_id, item_obj) {
			var i, len, obj;
			
			if (_newOrderAddedItems === undefined) {
				_newOrderAddedItems = [];
			}
			
			for (i = 0, len = _newOrderAddedItems.length; i < len; i++) {
				obj = _newOrderAddedItems[i];
				if (obj.item_sid === item_obj.sid) {
					alert("This item has already been added");
					return;
				}				
				obj = undefined;
			}
			
			if (obj === undefined) {
				obj = {};
				obj.item_sid = item_obj.sid;
				obj.item_type = item_obj.item_type;
				obj.item_code = item_obj.item_code;
				obj.model = item_obj.model;
				obj.description = item_obj.description;
				obj.sku = item_obj.sku;
				obj.item_cost = item_obj.item_cost;
				obj.qty = 1;
				obj.sub_total = obj.item_cost * obj.qty;
				_newOrderAddedItems.push(obj);
			}		
			
			_printNewPOItemsList(grid_id);
		},
		deleteNewPOItem: function(grid_id, item_obj) {
			var i, len, obj;
			
			if (_newOrderAddedItems === undefined) {
				_newOrderAddedItems = [];
			}
			
			for (i = 0, len = _newOrderAddedItems.length; i < len; i++) {
				obj = _newOrderAddedItems[i];
				if (obj.item_sid === item_obj.item_sid) {
					_newOrderAddedItems.splice(i, 1);
					_printNewPOItemsList(grid_id);
					break;
				}
			}			
		},
		getNewPOTotalCost: function() {
			return _newOrderTotalCost;
		},
		setQtyInNewPOAddedItem: function(grid_id, item_sid, qty) {
			var item;
			
			if (grid_id === undefined) {
				return;
			}
			
			if (item_sid === undefined || qty === undefined || item_sid < 1 || qty < 1) {
				return;
			}
			
			item = _getNewPOAddedItemsByItemSid(item_sid);
			if (item !== undefined) {
				item.qty = qty;
				if (item.item_cost === undefined) item.item_cost = 0;
				item.sub_total = item.item_cost * item.qty;

				_printNewPOItemsList(grid_id);
			}
		},
		setNewPO: function(callback) {
			var param, tmp, i, len, obj;
			
			if (_newOrderAddedItems === undefined || _newOrderAddedItems.length == 0) {
				alert("Add items");
				return;
			}
			
			param = {};
			
			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length < 1) {
					param = undefined;
					return;
				}
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}
			
			try {
				param.po_id = document.getElementById("new-po-new-po-id").value;
				if (param.po_id.length < 1) {
					alert("Input PO ID");
					param = undefined;
					return;
				}
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}	
			
			try {
				if (_newOrderSelectedVendorSid < 1) {
					alert("Select Vendor");
					return;
				}
				param.vendor_sid = _newOrderSelectedVendorSid;
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}		
			
			try {
				param.po_items_list_str = JSON.stringify(_newOrderAddedItems);
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}	
			
			tmp = JSON.parse(JSON.stringify($("#new-po-costs-list").jqxGrid("getrows")));
			if (tmp) {
				for (i = 0, len = tmp.length; i < len; i++) {
					obj = tmp[i];
					obj.boundindex = undefined;
					delete obj.boundindex;
					obj.type_str = undefined;
					delete obj.type_str;
					obj.uid = undefined;
					delete obj.uid;
					obj.uniqueid = undefined;
					delete obj.uniqueid;
					obj.visibleindex = undefined;
					delete obj.visibleindex;
				}
				
				param.po_costs = JSON.stringify(tmp);
			}
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }	
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
			
			$.ajax({
				url: "ajax/po/setNewPO.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						alert("Complete");
						try {
							$("#po-new-po-window").jqxWindow("close");
						} catch (e) {
							console.warn(e);
						}
					} else {
						alert("Error : " + result);
					}	
			        
			        try {
			        	document.getElementById("loading-container").style.display = "none";
			        } catch (e) {
			        	console.warn(e);
			        }			
			        
			        if (result === 0) {
			        	if (callback !== undefined) {
							callback.call({});
						}
			        }			
				}			
			});
		},
		// - Name
		// selectPO
		// - Parameter
		// int po_sid, function callback for fulfillment, function callback for receivement
		// - Return
		// undefined
		selectPO: function() {
			var po_sid, store_id, callback_fulfill, callback_receive;
			
			_orderedPOSid = 0;
			_orderedPOSerialNoList = undefined;
			_orderedPOItems = undefined;			
			if (arguments.length < 3) {
				return;
			}
			
			po_sid = arguments[0];
			callback_fulfill = arguments[1];
			callback_receive = arguments[2];
			
			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length < 1) {
					return;
				}
			} catch (e) {
				console.warn(e);
				return;
			}	
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
	        
	        $.ajax({
	        	url: "ajax/po/getPOInfoBySid.jsp",
	        	data: {
	        		po_sid: po_sid,
	        		store_id: store_id
	        	},
	        	method: "POST",
	        	dataType: "json",
	        	success: function(result) {
	        		var data;
	        		
	        		data = result.data;
	        		
	        		if (!data) return;
	    	        
	    	        try {
	    	        	document.getElementById("loading-container").style.display = "none";
	    	        } catch (e) {
	    	        	console.warn(e);
	    	        }
	    	        
	    	        _orderedPOSid = data.sid;
	    	        
	    	        switch (data.status) {
	    	        case 0:
	    	        	if (callback_fulfill) {
	    	        		callback_fulfill.call(window, data);
	    	        	}
	    	        	break;
	    	        case 2:
	    	        	if (callback_receive) {
	    	        		callback_receive.call(window, data);
	    	        	}
	    	        	break;
	    	        case 4:
	    	        	break;
	    	        }
	        	}
	        });
		},
		// - Name
		// getPOItems
		// - Parameter
		// int po_sid, string output_element_id
		getPOItems: function() {
			var po_sid, store_id, output_element_id;
			
			if (arguments.length < 2) {
				return;
			}
			
			if (arguments[0] === undefined || arguments[1] === undefined) {
				return;
			}
			
			po_sid = arguments[0];
			output_element_id = arguments[1];

			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length < 1) {
					return;
				}
			} catch (e) {
				console.warn(e);
				return;
			}
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
	        
	        try {
	        	if (typeof(output_element_id) === "string") {
	        		$("#"+output_element_id).jqxGrid("clear");
	        	} else {
	        		$(output_element_id).jqxGrid("clear");
	        	}
	        } catch (e) {
	        	
	        }	        
	        	        
	        $.ajax({
	        	url: "ajax/po/getPOItems.jsp",
	        	data: {
	        		po_sid: po_sid,
	        		store_id: store_id,
	        		group_by: 1
	        	},
	        	method: "POST",
	        	dataType: "json",
	        	success: function(result) {
	        		var elem, data;
	        		
	        		data = result.data;
	        		if (data) {   
	    	        	if (typeof(output_element_id) === "string") {
	    	        		elem = $("#"+output_element_id);
	    	        	} else {
	    	        		elem = $(output_element_id);
	    	        	}
	    	        	
	    	        	if (elem) {
	    	        		elem.jqxGrid("addrow", null, data, "last");
	    	        	}
	        		}   
    		        
    		        try {
    		        	document.getElementById("loading-container").style.display = "none";
    		        } catch (e) {
    		        	console.warn(e);
    		        }
    		        
	        	}
	        });	  
	        
	        $.ajax({
	        	url: "ajax/po/getPOItems.jsp",
	        	data: {
	        		po_sid: po_sid,
	        		store_id: store_id
	        	},
	        	method: "POST",
	        	dataType: "json",
	        	success: function(result) {
	        		var elem, data, i, len, obj;
	        		
	        		data = result.data;
	        		if (!data) return;	 
	        		
	        		for (i = 0, len = data.length; i < len; i++) {
	        			obj = data[i];
	        			obj.description = undefined;
	        			delete obj.description;
	        			obj.item_code = undefined;
	        			delete obj.item_code;
	        			obj.sku = undefined;
	        			delete obj.sku;
	        		}

	        		_orderedPOItems = data;
	        	}
	        });	        			
		},
		getPOItemByItemSid: function(item_sid) {
			var list, i, len, obj;
			
			_orderedSelectedItemSid = 0;
			
			if (_orderedPOItems === undefined) return undefined;
			
			list = [];		
			
			for (i = 0, len = _orderedPOItems.length; i < len; i++) {
				obj = _orderedPOItems[i];
				if (obj.item_sid === item_sid) {
					list.push(obj);
				}
			}
			
			_orderedSelectedItemSid = item_sid;

			return list;
		},
		// - Name
		// submitFulfillSeriallizedItem
		// - Parameter
		// Array serial_no_list
		// - Return
		// {item_sid:Number,ffl_qty:Number}
		submitFulfillSerializedItem: function(serial_no_list) {
			var po_items, i, len, len2, obj;
			
			if (_orderedPOItems === undefined || _orderedSelectedItemSid < 1) {
				return -1;
			}
			
			for (i = 0, len = _orderedPOItems.length; i < len; i++) {
				obj = _orderedPOItems[i];
				if (obj.item_sid === _orderedSelectedItemSid) {
					if (obj.sid === 0) {
						_orderedPOItems.splice(i, 1);
						i--;
						len = _orderedPOItems.length;
					} else {
						if (obj.input_serial_no !== undefined) {
							obj.fulfill_qty = 0;
							obj.input_serial_no = undefined;
							delete obj.input_serial_no;
						}
					}
				}
			}
			
			po_items = WRPAdminApp.POModule.getPOItemByItemSid(_orderedSelectedItemSid);
			
			if (po_items === undefined) return -2;
			
			for (i = 0, len = serial_no_list.length, len2 = po_items.length; i < len; i++) {			
				
				if (i > (len2 -1)) {
					_orderedPOItems.push({sid: 0, po_sid: po_items[0].po_sid, item_sid: po_items[0].item_sid, input_serial_no: serial_no_list[i], fulfill_qty: 1, item_type: po_items[0].item_type});
				} else {
					po_items[i].input_serial_no = serial_no_list[i];
					po_items[i].fulfill_qty = 1;
				}
			}
						
			return {ffl_qty: serial_no_list.length, item_sid: _orderedSelectedItemSid};
		},
		submitFulfillNonSerializedItem: function(ffl_qty) {			
			var po_items;
			
			if (_orderedPOItems === undefined || _orderedSelectedItemSid < 1) {
				return -1;
			}
			
			po_items = WRPAdminApp.POModule.getPOItemByItemSid(_orderedSelectedItemSid);
						
			if (po_items === undefined) return -2;
			
			po_items[0].fulfill_qty = ffl_qty;

			return {ffl_qty: ffl_qty, item_sid: _orderedSelectedItemSid};
		},
		submitOrderedPOFulfillment: function(callback) {
			var param;
			
			if (_orderedPOSid < 1 || _orderedPOItems === undefined) {
				return;
			}
			
			param = {};
			
			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length < 1) {
					param = undefined;
					return;
				}
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}
			
			param.po_sid = _orderedPOSid;
			param.ordered_po_items_list = JSON.stringify(_orderedPOItems);  
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
			
			$.ajax({
				url: "ajax/po/setPOFulfillment.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						alert("Complete!");
						$("#po-fulfillment-window").jqxWindow("close");
					} else {
						alert("Error : " + result);
					}
    		        
    		        try {
    		        	document.getElementById("loading-container").style.display = "none";
    		        } catch (e) {
    		        	console.warn(e);
    		        }		
			        
			        if (result === 0) {
			        	if (callback !== undefined) {
							callback.call({});
						}
			        }
				}
			});
		},
		// - Name
		// submitFulfillSeriallizedItem
		// - Parameter
		// Array serial_no_list {sid:Number,serial_no:String,input_serial_no:String}
		// - Return
		// {item_sid:Number,ffl_qty:Number}
		submitReceiveSerializedItem: function(serial_no_list) {
			var po_items, i, len, i2, len2, obj, obj2, total_count;
			
			if (_orderedPOItems === undefined || _orderedSelectedItemSid < 1) {
				return -1;
			}
			
			for (i = 0, len = _orderedPOItems.length; i < len; i++) {
				obj = _orderedPOItems[i];
				if (obj.item_sid === _orderedSelectedItemSid) {
					if (obj.sid === 0) {
						_orderedPOItems.splice(i, 1);
						i--;
						len = _orderedPOItems.length;
					} else {
						if (obj.input_serial_no !== undefined) {
							obj.receive_qty = 0;
							obj.input_serial_no = undefined;
							delete obj.input_serial_no;
						}
					}
				}
			}
			
			po_items = WRPAdminApp.POModule.getPOItemByItemSid(_orderedSelectedItemSid);
			
			if (po_items === undefined) return -2;
			
			total_count = 0;
			
			for (i = 0, len = serial_no_list.length; i < len; i++) {	
				obj = serial_no_list[i];				
				if (obj.input_serial_no !== undefined && obj.input_serial_no.length > 0) {
					if (obj.sid < 1) {
						_orderedPOItems.push({sid: 0, po_sid: po_items[0].po_sid, item_sid: po_items[0].item_sid, input_serial_no: obj.input_serial_no, receive_qty: 1, item_type: po_items[0].item_type});
						total_count++;
					} else {
						for (i2 = 0, len2 = po_items.length; i2 < len2; i2++) {
							obj2 = po_items[i2];
							if (obj2.sid === obj.sid) {
								obj2.input_serial_no = obj.input_serial_no;
								obj2.receive_qty = 1;
								total_count++;
								break;
							}
						}
					}
				}
			}
						
			return {recv_qty: total_count, item_sid: _orderedSelectedItemSid};
		},
		submitReceiveNonSerializedItem: function(recv_qty) {			
			var po_items;
			
			if (_orderedPOItems === undefined || _orderedSelectedItemSid < 1) {
				return -1;
			}
			
			po_items = WRPAdminApp.POModule.getPOItemByItemSid(_orderedSelectedItemSid);
						
			if (po_items === undefined) return -2;
			
			po_items[0].receive_qty = recv_qty;

			return {recv_qty: recv_qty, item_sid: _orderedSelectedItemSid};
		},
		submitOrderedPOReceivement: function(callback) {
			var param;
			
			if (_orderedPOSid < 1 || _orderedPOItems === undefined) {
				return;
			}
			
			param = {};
			
			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length < 1) {
					param = undefined;
					return;
				}
			} catch (e) {
				console.warn(e);
				param = undefined;
				return;
			}
			
			param.po_sid = _orderedPOSid;
			param.ordered_po_items_list = JSON.stringify(_orderedPOItems);  
	        
	        try {
	        	document.getElementById("loading-container").style.display = "block";
	        } catch (e) {
	        	console.warn(e);
	        }
			
			$.ajax({
				url: "ajax/po/setPOReceivement.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						alert("Complete!");
						$("#po-fulfillment-window").jqxWindow("close");
					} else {
						alert("Error : " + result);
					}
    		        
    		        try {
    		        	document.getElementById("loading-container").style.display = "none";
    		        } catch (e) {
    		        	console.warn(e);
    		        }		
			        
			        if (result === 0) {
			        	if (callback !== undefined) {
							callback.call({});
						}
			        }
				}
			});
		}	
	};
}();