
var _pagescript = {
    _nonSerializedItemAuditData: undefined,
    _deleteAuditSidList: undefined,
    _selectedItemSid: 0,
    _stockCountFlag: true,
    init: function() {
    	var components = $('#audit-creation-window');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 400);
    	}
    	components = $('#audit-serialized-window');
    	if (components) {
    		components.jqxWindow("width", 520);
    		components.jqxWindow("height", 400);
    	}
    	components = $('#audit-nonserialized-window');
    	if (components) {
    		components.jqxWindow("width", 520);
    		components.jqxWindow("height", 200);
    	}
    	
    	try {
    		WRPComponents('div[pagename="inventory_audit"] > .page-submenu-container > .submenu[panelname="audit_history"]').addShadowedImage('img/icon/inventory_audit_history.png');
    		WRPComponents('div[pagename="inventory_audit"] > .page-submenu-container > .submenu[panelname="create_new_audit"]').addShadowedImage('img/icon/new_audit.png');
    		WRPComponents('div[pagename="inventory_audit"] > .page-submenu-container > .submenu[panelname="stock_count"]').addShadowedImage('img/icon/audit_stock_count.png');
    		WRPComponents('div[pagename="inventory_audit"] > .page-submenu-container > .submenu[panelname="reconciliation"]').addShadowedImage('img/icon/audit_01.png');
    	} catch (e) {
			
		}
    	//????
    	//jqx grid
    	components = $('#audit-jqx-grid-audit-history');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
        				{ name: "audit_id", type: "string" },
        				{ name: "open_date", type: "date" },
        				{ name: "counted_by", type: "string" },
        				{ name: "confirmed_by", type: "string" },
        				{ name: "note", type: "string" },
        				{ name: "status_str", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
				    { text: "sid", datafield: "sid", hidden: true },
    				{ text: "Audit ID", datafield: "audit_id", align: 'center' },
    				{ text: "Date", datafield: "open_date", width: "15%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
    				{ text: "Counted by", datafield: "counted_by", width: "10%", align: 'center' },
    				{ text: "Confirmed by", datafield: "confirmed_by", width: "10%", align: 'center' },
    				{ text: "Note", datafield: "note", width: "25%", align: 'center' },
    				{ text: "Status", datafield: "status_str", width: "10%", align: 'center' }
				]
    		});
    		components.on("rowselect", WRPAdminApp.pagescript.loadAuditInformation); 	
    	}
    	
    	components = $('#audit-jqx-grid-stock-count-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
        				{ name: "bin_name", type: "string" },
        				{ name: "item_code", type: "string" },
        				{ name: "description", type: "string" },
        				{ name: "sku", type: "string" },
        				{ name: "category", type: "string" },
        				{ name: "sub_category", type: "string" },
        				{ name: "system_qty", type: "number" },
        				{ name: "scanned_qty", type: "number" },
        				{ name: "variance", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
    			       { text: "sid", datafield: "sid", hidden: true },
    				   { text: "Bin", datafield: "bin_name", align: 'center' },
    				   { text: "Item Code", datafield: "item_code", align: 'center' },
    				   { text: "Description", datafield: "description", align: 'center' },
    				   { text: "SKU", datafield: "sku", align: 'center' },
    				   { text: "Category", datafield: "category", align: 'center' },
    				   { text: "Sub-Category", datafield: "sub_category", align: 'center' },
    				   { text: "System Qty", datafield: "system_qty", align: 'center' },
    				   { text: "Audit Qty", datafield: "scanned_qty", align: 'center' },
    				   { text: "Variance", datafield: "variance", align: 'center' },
    				   { text: "Edit", datafield: "edit", columntype: "button", align: 'center', cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.getItemDictInStockCount }
				]
    		}); 	
    	}
    	
    	components = $('#audit-jqx-grid-reconciliation-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
        				{ name: "bin_name", type: "string" },
        				{ name: "item_code", type: "string" },
        				{ name: "description", type: "string" },
        				{ name: "sku", type: "string" },
        				{ name: "category", type: "string" },
        				{ name: "sub_category", type: "string" },
        				{ name: "system_qty", type: "number" },
        				{ name: "scanned_qty", type: "number" },
        				{ name: "variance", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
    			       { text: "sid", datafield: "sid", hidden: true },
    				   { text: "Bin", datafield: "bin_name", align: 'center' },
    				   { text: "Item Code", datafield: "item_code", align: 'center' },
    				   { text: "Description", datafield: "description", align: 'center' },
    				   { text: "SKU", datafield: "sku", align: 'center' },
    				   { text: "Category", datafield: "category", align: 'center' },
    				   { text: "Sub-Category", datafield: "sub_category", align: 'center' },
    				   { text: "System Qty", datafield: "system_qty", align: 'center' },
    				   { text: "Audit Qty", datafield: "scanned_qty", align: 'center' },
    				   { text: "Variance", datafield: "variance", align: 'center' },
    				   { text: "Edit", datafield: "edit", columntype: "button", align: 'center', cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.getItemDictInReconciliation }
				]
    		}); 	
    	}
    	
    	components = $("#jqx-grid-audit-serialized-list");
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
        				{ name: "audit_sid", type: "number" },
        				{ name: "item_sid", type: "number" },
        				{ name: "inventory_sid", type: "number" },
        				{ name: "serial_no", type: "string" },
        				{ name: "scanned_serial_no", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
    			       { text: "sid", datafield: "sid", hidden: true },
    				   { text: "audit_sid", datafield: "audit_sid", hidden: true  },
    				   { text: "item_sid", datafield: "item_sid", hidden: true  },
    				   { text: "inventory_sid", datafield: "inventory_sid", hidden: true },
    				   { text: "System", datafield: "serial_no", align: 'center' },
    				   { text: "Scanned", datafield: "scanned_serial_no", align: 'center' },
    				   { text: "Delete", datafield: "delete", columntype: "button", align: 'center', width: "50px", cellsrenderer: function() { return "Delete"; }, buttonclick: WRPAdminApp.pagescript.deleteScannedSerialNo }
				]
    		}); 	
    	}
    	//jqx button
    	$("#excel_audit_history").click(function () {
			$("#audit-jqx-grid-audit-history").jqxGrid('exportdata', 'xls', 'jqx-audit-history-list');
        });
    	
    	$('#inven-audit-radio-1').on('checked', function (event) {
            var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#inventory-audit-history-start-date").jqxDateTimeInput('setDate', start);
				$("#inventory-audit-history-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#inven-audit-radio-2').on('checked', function (event) {
			 var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#inventory-audit-history-start-date").jqxDateTimeInput('setDate', start);
				$("#inventory-audit-history-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#inven-audit-radio-3').on('checked', function (event) {
			 var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#inventory-audit-history-start-date").jqxDateTimeInput('setDate', start);
				$("#inventory-audit-history-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
    	$('#inven-audit-radio-1').jqxRadioButton('check');
    	
		WRPAdminApp.pagescript.getBinList();		
		WRPAdminApp.pagescript.getCategoryList();
		WRPAdminApp.pagescript.getAuditHistoryList();
    },
    getBinList: function() {
    	var storeId;
    	try {
    		storeId = document.getElementById("select-store").value;
    		if (storeId.length == 0) return;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	$.ajax({
    		url: "ajax/bin/getBinList.jsp",
    		data: {
    			storeId: storeId
    		},
    		method: "POST",
    		dataType: "json",
    		async: false,
    		success: function(result) {
    			var data, i, len, obj, source, adapter, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			innerHTML.push('<option value="">Select Bin</option>');
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				obj.type = undefined;
    				delete obj.type;
    				obj.update_date = undefined;
    				delete obj.update_date;
    				obj.user_name = undefined;
    				delete obj.user_name;
    				
    				innerHTML.push('<option value="');
    				innerHTML.push(obj.sid);
    				innerHTML.push('">');
    				innerHTML.push(obj.description);
    				innerHTML.push('</option>');
    			}
    			
    			try {
    				document.getElementById("audit-stock-count-select-bin").innerHTML = innerHTML.join("");
    				document.getElementById("audit-reconciliation-select-bin").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}
    			
    			source = {
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "description", type: "string" }
    				],
    				localdata: data
    			};
    			
    			adapter = new $.jqx.dataAdapter(source);
    			obj = $("#audit-creation-bin-list");
    			if (obj) {
    				obj.jqxListBox({
    					source: adapter,
    					displayMember: "description",
    					valueMember: "sid",
    					checkboxes: true,
    					width: "100%",
    					height: 120,
            			theme: "arctic"
    				});
    			}
    		}
    	});
    },
    getCategoryList: function() {
    	var storeId;
    	try {
    		storeId = document.getElementById("select-store").value;
    		if (storeId.length == 0) return;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	$.ajax({
    		url: "ajax/category/getCategoriesByParentSid.jsp",
    		data: {
    			storeId: storeId
    		},
    		method: "POST",
    		dataType: "json",
    		async: false,
    		success: function(result) {
    			var data, i, len, obj, source, adapter, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];

    			innerHTML.push('<option value="">Select Category</option>');    			
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				obj.parentSid = undefined;
    				delete obj.parentSid;
    				
    				innerHTML.push('<option value="');
    				innerHTML.push(obj.sid);
    				innerHTML.push('">');
    				innerHTML.push(obj.categoryName);
    				innerHTML.push('</option>');
    			}
    			
    			try {
    				document.getElementById("audit-stock-count-select-category").innerHTML = innerHTML.join("");
    				document.getElementById("audit-reconciliation-select-category").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}
    			
    			source = {
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "categoryName", type: "string" }
    				],
    				localdata: data
    			};
    			
    			adapter = new $.jqx.dataAdapter(source);
    			obj = $("#audit-creation-category-list");
    			if (obj) {
    				obj.jqxListBox({
    					source: adapter,
    					displayMember: "categoryName",
    					valueMember: "sid",
    					checkboxes: true,
    					width: "100%",
    					height: 120,
            			theme: "arctic"
    				});
    			}
    		}
    	});
    },
    getAuditHistoryList: function() {
    	var param, elem;
    	
    	param = {};

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.keyword = $('#audit-histsory-input-keyword').val();
        } catch (e) {
            console.warn(e);
            return;
        }
		
        param.start_date = $('#inventory-audit-history-start-date').val();
        param.end_date = $('#inventory-audit-history-end-date').val();
        
		$("#audit-jqx-grid-audit-history").off("cellclick");
        
        $.ajax({
        	url: "ajax/audit/getAuditHistoryList.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, source, adapter, innerHTML, innerHTML2, i, len, obj;
        		
        		data = result.data;
        		$('#audit-jqx-grid-audit-history').jqxGrid("clear");
        		if (!data) return;
        		
        		$('#audit-jqx-grid-audit-history').jqxGrid("addrow", null, data, "last");
        		/* 170109 jh : timeZone
        		for (i = 0, len = data.length; i < len; i++) {
        			data[i].open_date = WRPAdminApp.timeZone(data[i].open_date);
        		}
        		*/
        		
        		innerHTML = [];
        		innerHTML2 = [];
        		
        		for (i = 0, len = data.length; i < len; i++) {
        			try {
        				obj = data[i];
        				switch (obj.status) {
        				case 0:
            				innerHTML.push('<option value="');
            				innerHTML.push(obj.sid);
            				innerHTML.push('">');
            				innerHTML.push(obj.audit_id);
            				innerHTML.push('</option>');
        					break;
        				case 1:
            				innerHTML2.push('<option value="');
            				innerHTML2.push(obj.sid);
            				innerHTML2.push('">');
            				innerHTML2.push(obj.audit_id);
            				innerHTML2.push('</option>');
        					break;
        				}
        				
        			} catch (e) {
        				console.warn(e);
        			}
        		}
        		
        		try {
        			document.getElementById("audit-stock-count-select-audit-id").innerHTML = innerHTML.join("");
        		} catch (e) {
        			
        		}
        		
        		try {
        			document.getElementById("audit-reconciliation-select-audit-id").innerHTML = innerHTML2.join("");
        		} catch (e) {
        			
        		}
        		
        		innerHTML = undefined;
        		innerHTML2 = undefined;
        		/*
        		source = {
        			datatype: "json",
        			datafields: [
        				{ name: "sid", type: "number" },
        				{ name: "audit_id", type: "string" },
        				{ name: "open_date", type: "date" },
        				{ name: "counted_by", type: "string" },
        				{ name: "confirmed_by", type: "string" },
        				{ name: "note", type: "string" },
        				{ name: "status_str", type: "string" }
        			],
        			localdata: data
        		};

        		adapter = new $.jqx.dataAdapter(source);
        		
        		$("#audit-jqx-grid-audit-history").jqxGrid({
        			width: "99.25%",
        			height: "97.5%",
        			theme: "arctic",
        			source: adapter,
        			filterable: true,
        			columnsresize: true,
        			sortable: true,
        	        groupable: true,
        			columns: [
     				   { text: "sid", datafield: "sid", hidden: true },
    				   { text: "Audit ID", datafield: "audit_id" },
    				   { text: "Date", datafield: "open_date", width: "15%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss' },
    				   { text: "Counted by", datafield: "counted_by", width: "10%" },
    				   { text: "Confirmed by", datafield: "confirmed_by", width: "10%" },
    				   { text: "Note", datafield: "note", width: "25%" },
    				   { text: "Status", datafield: "status_str", width: "10%" }
    				]
        		});
        		
        		$("#audit-jqx-grid-audit-history").on("rowselect", WRPAdminApp.pagescript.loadAuditInformation);        	
        		
        		$("#inventory-audit-history-date").on('change', function (event) {
    				var selection = $("#inventory-audit-history-date").jqxDateTimeInput('getRange');
                    if (selection.from != null) {
                    	var filtergroup = new $.jqx.filter();
                    	var filtervalue = selection.from;
                    	var filtercondition = 'GREATER_THAN_OR_EQUAL';
                    	var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
                    	filtervalue=selection.to;
                    	filtercondition= 'LESS_THAN_OR_EQUAL';
                    	var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
                    	var operator = 0;
                    	filtergroup.addfilter(operator, filter1);
                    	filtergroup.addfilter(operator, filter2);
                    	
                    	$("#audit-jqx-grid-audit-history").jqxGrid('addfilter', 'open_date', filtergroup);
                    	$("#audit-jqx-grid-audit-history").jqxGrid('applyfilters');
                    }
                });
        		
        		$("#excel_audit_history").click(function () {
        			$("#audit-jqx-grid-audit-history").jqxGrid('exportdata', 'xls', 'jqx-audit-history-list');
                });
        		
        		setTimeout(function() {
        			var elem = document.getElementById("audit-stock-count-select-audit-id");
        			if (elem) {
        				if (elem.children.length > 0) {
        					WRPAdminApp.pagescript.getAuditInformationInStockCount(elem.children[0].value);
        				}
        			}
        		}, 500);

        		setTimeout(function() {
        			var elem = document.getElementById("audit-reconciliation-select-audit-id");
        			if (elem) {
        				if (elem.children.length > 0) {
        					WRPAdminApp.pagescript.getAuditInformationInReconciliation(elem.children[0].value);
        				}
        			}
        		}, 500);
        	*/
        	}
        });
    },
    loadAuditInformation: function(event) {
    	var rowData, param;
    	
    	try {
    		rowData = event.args.row;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	if (rowData.sid === undefined || rowData.sid < 1) {
    		return;
    	}
    	
    	param = {};

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        param.audit_sid = rowData.sid;
        
        $.ajax({
        	url: "ajax/audit/getAuditHistoryInfo.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data;
        		
        		data = result.data;
        		if (!data) return;
        		
        		/* 170109 jh : timeZone 
        		for (i = 0, len = data.length; i < len; i++) {
        			data[i].open_date = WRPAdminApp.timeZone(data[i].open_date);
        			if(data[i].close_date)	data[i].close_date = WRPAdminApp.timeZone(data[i].close_date);
        		}
        		*/
        		
        		try {
        			document.getElementById("audit-history-audit-id").innerHTML = (data.audit_id !== undefined && data.audit_id)? data.audit_id : "&nbsp;";
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			document.getElementById("audit-history-counted-by").innerHTML = (data.counted_by !== undefined && data.counted_by)? data.counted_by : "&nbsp;";
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			/* 170109 jh : timeZone*/
        			document.getElementById("audit-history-open-time").innerHTML = (data.open_date !== undefined && data.open_date)? WRPAdminApp.timeZone(data.open_date) : "&nbsp;";
        			/**/
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			document.getElementById("audit-history-confirmed-by").innerHTML = (data.confirmed_by !== undefined && data.confirmed_by)? data.confirmed_by : "&nbsp;";
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			/* 170109 jh : timeZone*/
        			document.getElementById("audit-history-close-time").innerHTML = (data.close_date !== undefined && data.close_date)? WRPAdminApp.timeZone(data.close_date) : "&nbsp;";
        			/**/
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			document.getElementById("audit-history-status").innerHTML = (data.status_str !== undefined && data.status_str)? data.status_str : "&nbsp;";
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			document.getElementById("audit-history-note").innerHTML = (data.note !== undefined && data.note)? data.note : "&nbsp;";
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        	}
        });
    },
    getAuditInformationInStockCount: function() {
    	var store_id, audit_sid; 
    	if (arguments.length < 1) {
    		try {
    			audit_sid = document.getElementById("audit-stock-count-select-audit-id").value;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	} else {
    		audit_sid = arguments[0];    		
    	}

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/audit/getAuditHistoryInfo.jsp",
        	data: {
        		storeId: store_id,
        		audit_sid: audit_sid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, arr, val, i, len, i2, len2, elem, firstBin, firstCategory;
        		data = result.data;
        		
        		if (!data) return;

    			elem = document.getElementById("audit-stock-count-select-bin");
    			if (elem) {
            		if (data.bins && data.bins !== "0") {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "none";
            			}
            			arr = data.bins.split(",");
            			for (i = 0, len = arr.length; i < len; i++) {
            				val = parseInt(arr[i]);
            				if (!isNaN(val)) {
            					if (i == 0) firstBin = val;
            					for (i2 = 0, len2 = elem.children.length; i2 < len2; i2++) {
            						if (parseInt(elem.children[i2].value) === val) {
            							elem.children[i2].style.display = "block";
            							break;
            						}
            					}
            				}
            			}
            		} else {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "block";
            			}
            		} 
    			}

    			elem = document.getElementById("audit-stock-count-select-category");
    			if (elem) {
            		if (data.category && data.category !== "0") {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "none";
            			}
            			arr = data.category.split(",");
            			for (i = 0, len = arr.length; i < len; i++) {
            				val = parseInt(arr[i]);
            				if (!isNaN(val)) {
            					if (i == 0) firstCategory = val;
            					for (i2 = 0, len2 = elem.children.length; i2 < len2; i2++) {
            						if (parseInt(elem.children[i2].value) === val) {
            							elem.children[i2].style.display = "block";
            							break;
            						}
            					}
            				}
            			}
            		} else {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "block";
            			}
            		}  
    			}
    			
    			WRPAdminApp.pagescript.getAuditItemsListInStockCount(firstBin, firstCategory);
        	}
        });
    },
    getAuditInformationInReconciliation: function() {
    	var store_id, audit_sid; 
    	if (arguments.length < 1) {
    		try {
    			audit_sid = document.getElementById("audit-reconciliation-select-audit-id").value;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	} else {
    		audit_sid = arguments[0];    		
    	}

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/audit/getAuditHistoryInfo.jsp",
        	data: {
        		storeId: store_id,
        		audit_sid: audit_sid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, arr, val, i, len, i2, len2, elem, firstBin, firstCategory;
        		data = result.data;
        		
        		if (!data) return;

    			elem = document.getElementById("audit-reconciliation-select-bin");
    			if (elem) {
            		if (data.bins && data.bins !== "0") {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "none";
            			}
            			arr = data.bins.split(",");
            			for (i = 0, len = arr.length; i < len; i++) {
            				val = parseInt(arr[i]);
            				if (!isNaN(val)) {
            					if (i == 0) firstBin = val;
            					for (i2 = 0, len2 = elem.children.length; i2 < len2; i2++) {
            						if (parseInt(elem.children[i2].value) === val) {
            							elem.children[i2].style.display = "block";
            							break;
            						}
            					}
            				}
            			}
            		} else {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "block";
            			}
            		} 
    			}

    			elem = document.getElementById("audit-reconciliation-select-category");
    			if (elem) {
            		if (data.category && data.category !== "0") {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "none";
            			}
            			arr = data.category.split(",");
            			for (i = 0, len = arr.length; i < len; i++) {
            				val = parseInt(arr[i]);
            				if (!isNaN(val)) {
            					if (i == 0) firstCategory = val;
            					for (i2 = 0, len2 = elem.children.length; i2 < len2; i2++) {
            						if (parseInt(elem.children[i2].value) === val) {
            							elem.children[i2].style.display = "block";
            							break;
            						}
            					}
            				}
            			}
            		} else {
            			for (i = 0, len = elem.children.length; i < len; i++) {
            				elem.children[i].style.display = "block";
            			}
            		}  
    			}
    			
    			WRPAdminApp.pagescript.getAuditItemsListInReconciliation(firstBin, firstCategory);
        	}
        });
    },
    getLoginedUserInfoInNewAudit: function() {
    	$.ajax({
    		url: "ajax/session/getLoginedUserInfo.jsp",
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data;
    			data = result.data;
    			if (!data) return;
    			
    			try {
    				document.getElementById("audit-creation-emp-id").value = (data.user_id !== undefined && data.user_id)? data.user_id : "";
    			} catch (e) {
    				console.warn(e);
    			}
    			
    			try {
    				document.getElementById("audit-creation-store-id").value = document.getElementById("select-store").value.toUpperCase();
    			} catch (e) {
    				console.warn(e);
    			}
    			
    			try {
    				document.getElementById("audit-creation-emp-name").value = (data.user_name !== undefined && data.user_name)? data.user_name : "";
    			} catch (e) {
    				console.warn(e);
    			}
    			
    			try {
    				document.getElementById("audit-creation-date").value = (data.current_date !== undefined && data.current_date)? data.current_date : "";
    			} catch (e) {
    				console.warn(e);
    			}
    		}
    	})
    },
    createNewAuditInfo: function() {
    	var arr, bins, categories, i, len, obj, param;
    	
    	try {
    		arr = $("#audit-creation-bin-list").jqxListBox("getCheckedItems");
    		if (arr) {
    			bins = [];
    			for (i = 0, len = arr.length; i < len; i++) {
    				obj = arr[i];
    				bins.push(obj.value);
    			}
    		} else {
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		arr = $("#audit-creation-category-list").jqxListBox("getCheckedItems");
    		if (arr) {
    			categories = [];
    			for (i = 0, len = arr.length; i < len; i++) {
    				obj = arr[i];
    				categories.push(obj.value);
    			}
    		} else {
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	param = {};
    	
    	try {
    		param.store_id = document.getElementById("select-store").value;
	        if (param.store_id.length == 0) return;
	    } catch (e) {
	        console.warn(e);
	        return;
	    }
	    
	    try {
	    	param.audit_id = document.getElementById("audit-creation-audit-id").value;
	    } catch (e) {
	    	console.warn(e);
	    	return;
	    }
	    
	    try {
	    	param.note = document.getElementById("audit-creation-note").value;
	    } catch (e) {
	    	console.warn(e);
	    	return;
	    }
	    
	    param.bins_str = bins.join(",");
	    param.categories_str = categories.join(",");
	   
	    $.ajax({
	    	url: "ajax/audit/createNewAudit.jsp",
	    	data: param,
	    	method: "POST",
	    	dataType: "json",
	    	success: function(result) {
	    		if (result === 0) {
	    			WRPCommon.MsgBoxModule.alert({
	    				message: "Complete!",
	    				okBtnClick: function(){
	    					$('#audit-creation-window').jqxWindow('close');
	    					WRPAdminApp.pagescript.getAuditHistoryList();
	    				}
	    			});
	    		} else if (result === 1) {
	    			WRPCommon.MsgBoxModule.alert({
	    				message: "Audit ID is already exists"
	    			});
	    			return;
	    		} else {
	    			WRPCommon.MsgBoxModule.alert({
	    				message: "Error : " + result
	    			});
	    		}
	    	}
	    });
    },
    getAuditItemsListInStockCount: function() { // arguments {[bins], [categories]}
    	var param;
    	
    	param = {};
    	
    	if (arguments.length > 1) {
    		param.bins = arguments[0];
    		param.categories = arguments[1];
    	}

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        try {
        	param.audit_sid = document.getElementById("audit-stock-count-select-audit-id").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
    	
        try {
        	param.sku = document.getElementById("audit-stock-count-search-sku").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
    	
        try {
        	param.category_sid = document.getElementById("audit-stock-count-select-category").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
    	
        try {
        	param.sub_category_sid = document.getElementById("audit-stock-count-select-category-sub").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        $.ajax({
        	url: "ajax/audit/getAuditItemsList.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, source, adapter, elem;
        		$('#audit-jqx-grid-stock-count-list').jqxGrid("clear");
        		data = result.data;   
        		if (!data) return;
        		
        		$('#audit-jqx-grid-stock-count-list').jqxGrid("addrow", null, data);
        		/*
        		source = {
        			datatype: "json",
        			datafields: [
        				{ name: "sid", type: "number" },
        				{ name: "bin_name", type: "string" },
        				{ name: "item_code", type: "string" },
        				{ name: "description", type: "string" },
        				{ name: "sku", type: "string" },
        				{ name: "category", type: "string" },
        				{ name: "sub_category", type: "string" },
        				{ name: "system_qty", type: "number" },
        				{ name: "scanned_qty", type: "number" },
        				{ name: "variance", type: "number" }
        			],
        			localdata: data
        		};

        		adapter = new $.jqx.dataAdapter(source);
        		
        		elem = $("#audit-jqx-grid-stock-count-list");
        		
        		elem.jqxGrid({
        			width: "99.25%",
        			height: "97.5%",
        			theme: "arctic",
        			source: adapter,
        			columnsresize:true,
        			filterable: true,
        			sortable: true,
        			columns: [
     				   { text: "sid", datafield: "sid", hidden: true },
    				   { text: "Bin", datafield: "bin_name" },
    				   { text: "Item Code", datafield: "item_code" },
    				   { text: "Description", datafield: "description" },
    				   { text: "SKU", datafield: "sku" },
    				   { text: "Category", datafield: "category" },
    				   { text: "Sub-Category", datafield: "sub_category" },
    				   { text: "System Qty", datafield: "system_qty" },
    				   { text: "Audit Qty", datafield: "scanned_qty" },
    				   { text: "Variance", datafield: "variance" },
    				   { text: "Edit", datafield: "edit", columntype: "button", cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.getItemDictInStockCount }
    				]
        		});
        		*/
        	}
        });
    },
    getAuditItemsListInReconciliation: function() {
    	var param;
    	
    	param = {};
    	
    	if (arguments.length > 1) {
    		param.bins = arguments[0];
    		param.categories = arguments[1];
    	}

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        try {
        	param.audit_sid = document.getElementById("audit-reconciliation-select-audit-id").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
    	
        try {
        	param.sku = document.getElementById("audit-reconciliation-search-sku").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
    	
        try {
        	param.category_sid = document.getElementById("audit-reconciliation-select-category").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
    	
        try {
        	param.sub_category_sid = document.getElementById("audit-reconciliation-select-category-sub").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        $.ajax({
        	url: "ajax/audit/getAuditItemsList.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, source, adapter, elem;
        		$('#audit-jqx-grid-reconciliation-list').jqxGrid("clear");
        		data = result.data;   
        		if (!data) return;
        		$('#audit-jqx-grid-reconciliation-list').jqxGrid("addrow", null, data);
        		/*
        		source = {
        			datatype: "json",
        			datafields: [
        				{ name: "sid", type: "number" },
        				{ name: "bin_name", type: "string" },
        				{ name: "item_code", type: "string" },
        				{ name: "description", type: "string" },
        				{ name: "sku", type: "string" },
        				{ name: "category", type: "string" },
        				{ name: "sub_category", type: "string" },
        				{ name: "system_qty", type: "number" },
        				{ name: "scanned_qty", type: "number" },
        				{ name: "variance", type: "number" }
        			],
        			localdata: data
        		};

        		adapter = new $.jqx.dataAdapter(source);
        		
        		elem = $("#audit-jqx-grid-reconciliation-list");
        		
        		elem.jqxGrid({
        			width: "99.25%",
        			height: "97.5%",
        			theme: "arctic",
        			source: adapter,
        			columnsresize:true,
        			filterable: true,
        			sortable: true,
        			columns: [
     				   { text: "sid", datafield: "sid", hidden: true },
    				   { text: "Bin", datafield: "bin_name" },
    				   { text: "Item Code", datafield: "item_code" },
    				   { text: "Description", datafield: "description" },
    				   { text: "SKU", datafield: "sku" },
    				   { text: "Category", datafield: "category" },
    				   { text: "Sub-Category", datafield: "sub_category" },
    				   { text: "System Qty", datafield: "system_qty" },
    				   { text: "Audit Qty", datafield: "scanned_qty" },
    				   { text: "Variance", datafield: "variance" },
    				   { text: "Edit", datafield: "edit", columntype: "button", cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.getItemDictInReconciliation }
    				]
        		});
        		*/
        	}
        });
    },
    getItemDictInStockCount: function(event) { // param : rowBoundIndex
    	var param, row;
    	
    	row = $("#audit-jqx-grid-stock-count-list").jqxGrid('getrowdata', event);
    	
    	if (!row) return;
    	
    	param = {};

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
		
		try {
			param.itemSid = row.sid;
		} catch (e) {
			
		}
		
		if (param.itemSid === undefined || param.itemSid < 1) {
			return;
		}
		
		try {
			$("#jqx-grid-audit-serialized-list")[0].parentNode.innerHTML = '<div id="jqx-grid-audit-serialized-list"></div>';
		} catch (e) {
			console.warn(e);
		}
		
		WRPAdminApp.pagescript._nonSerializedItemAuditData = undefined;
		
		WRPAdminApp.pagescript._selectedItemSid = 0;
		
		WRPAdminApp.pagescript._stockCountFlag = true;
		
		$.ajax({
			url: "ajax/item/getItemDictByItemSid.jsp",
			data: param,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, audit_sid;
				data = result.data;
				
				if (!data) return;
				
				try {
					audit_sid = $("#audit-stock-count-select-audit-id").val();
				} catch (e) {
					console.warn(e);
					return;
				}
				
				WRPAdminApp.pagescript._selectedItemSid = data.sid;
				
				switch (data.itemType) {
				case 0:
				case 1:
				case 2:
					$("#audit-serialized-audit-id").val($("#audit-stock-count-select-audit-id")[0][$("#audit-stock-count-select-audit-id")[0].selectedIndex].innerText);
					$("#audit-serialized-sku").val((data.sku !== undefined && data.sku)? data.sku : '');
					$("#audit-serialized-description").val((data.description !== undefined && data.description)? data.description : '');					
					$('#audit-serialized-window').jqxWindow('open');					
					WRPAdminApp.pagescript.getAuditSerializedItemListBySKU(data.sku, audit_sid);
					break;
				case 3:					
					$("#audit-nonserialized-audit-id").val($("#audit-stock-count-select-audit-id")[0][$("#audit-stock-count-select-audit-id")[0].selectedIndex].innerText);
					$("#audit-nonserialized-sku").val((data.sku !== undefined && data.sku)? data.sku : '');
					$("#audit-nonserialized-description").val((data.description !== undefined && data.description)? data.description : '');					
					$('#audit-nonserialized-window').jqxWindow('open');				
					WRPAdminApp.pagescript.getAuditNonSerializedItemBySKU(data.sku, audit_sid);
					break;
				}
			}
		});
    },
    getItemDictInReconciliation: function(event) { // param : rowBoundIndex
    	var param, row;
    	
    	row = $("#audit-jqx-grid-reconciliation-list").jqxGrid('getrowdata', event);
    	
    	if (!row) return;
    	
    	param = {};

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
		
		try {
			param.itemSid = row.sid;
		} catch (e) {
			
		}
		
		if (param.itemSid === undefined || param.itemSid < 1) {
			return;
		}
		
		try {
			$("#jqx-grid-audit-serialized-list")[0].parentNode.innerHTML = '<div id="jqx-grid-audit-serialized-list"></div>';
		} catch (e) {
			console.warn(e);
		}
		
		WRPAdminApp.pagescript._nonSerializedItemAuditData = undefined;
		WRPAdminApp.pagescript._selectedItemSid = 0;
		
		WRPAdminApp.pagescript._stockCountFlag = false;
		
		$.ajax({
			url: "ajax/item/getItemDictByItemSid.jsp",
			data: param,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, audit_sid;
				data = result.data;
				
				if (!data) return;
				WRPAdminApp.pagescript._selectedItemSid = data.sid;
				
				try {
					audit_sid = $("#audit-reconciliation-select-audit-id").val();
				} catch (e) {
					console.warn(e);
					return;
				}
				
				switch (data.itemType) {
				case 0:
				case 1:
				case 2:
					
					$("#audit-serialized-audit-id").val($("#audit-reconciliation-select-audit-id")[0][$("#audit-reconciliation-select-audit-id")[0].selectedIndex].innerText);
					$("#audit-serialized-sku").val((data.sku !== undefined && data.sku)? data.sku : '');
					$("#audit-serialized-description").val((data.description !== undefined && data.description)? data.description : '');					
					$('#audit-serialized-window').jqxWindow('open');			
					
					WRPAdminApp.pagescript.getAuditSerializedItemListBySKU(data.sku, audit_sid);
					break;
				case 3:					
					$("#audit-nonserialized-audit-id").val($("#audit-reconciliation-select-audit-id")[0][$("#audit-reconciliation-select-audit-id")[0].selectedIndex].innerText);
					$("#audit-nonserialized-sku").val((data.sku !== undefined && data.sku)? data.sku : '');
					$("#audit-nonserialized-description").val((data.description !== undefined && data.description)? data.description : '');					
					$('#audit-nonserialized-window').jqxWindow('open');				
					WRPAdminApp.pagescript.getAuditNonSerializedItemBySKU(data.sku, audit_sid);
					break;
				}
			}
		});
    },
    filterGridInStockCount: function() {
    	var bin, category, sub_category, filtergroup, filter, grid;
    	
    	bin = document.getElementById("audit-stock-count-select-bin");
    	if (!bin) return;
    	
    	if (bin.value === "") {
    		bin = "";
    	} else {
    		bin = bin.children[bin.selectedIndex].innerText;
    	}
    	
    	category = document.getElementById("audit-stock-count-select-category");
    	if (!category) return;
    	
    	if (category.value === "") {
    		category = "";
    	} else {
    		category = category.children[category.selectedIndex].innerText;
    	}
    	
    	sub_category = document.getElementById("audit-stock-count-select-category-sub");
    	if (!sub_category) return;
    	
    	if (sub_category.value === "") {
    		sub_category = "";
    	} else {
    		sub_category = sub_category.children[sub_category.selectedIndex].innerText;
    	}
    	
    	grid = $("#audit-jqx-grid-stock-count-list");
    	
    	grid.jqxGrid("clearfilters");
    	
    	if (bin.length > 0) {
    		filtergroup = new $.jqx.filter();
    		filter = filtergroup.createfilter("stringfilter", bin, "EQUAL");
    		filtergroup.addfilter(0, filter);
    		grid.jqxGrid("addfilter", "bin_name", filtergroup);
    	}
    	
    	filter = undefined;
    	filtergroup = undefined;
    	
    	if (category.length > 0) {
    		filtergroup = new $.jqx.filter();
    		filter = filtergroup.createfilter("stringfilter", category, "EQUAL");
    		filtergroup.addfilter(0, filter);
    		grid.jqxGrid("addfilter", "category", filtergroup);
    	}
    	
    	filter = undefined;
    	filtergroup = undefined;
    	
    	if (sub_category.length > 0) {
    		filtergroup = new $.jqx.filter();
    		filter = filtergroup.createfilter("stringfilter", sub_category, "EQUAL");
    		filtergroup.addfilter(0, filter);
    		grid.jqxGrid("addfilter", "sub_category", filtergroup);
    	}
    	
    	filter = undefined;
    	filtergroup = undefined;
    	
    	grid.jqxGrid("applyfilters");
    },
    filterGridInReconciliation: function() {
    	var bin, category, sub_category, filtergroup, filter, grid;
    	
    	bin = document.getElementById("audit-reconciliation-select-bin");
    	if (!bin) return;
    	
    	if (bin.value === "") {
    		bin = "";
    	} else {
    		bin = bin.children[bin.selectedIndex].innerText;
    	}
    	
    	category = document.getElementById("audit-reconciliation-select-category");
    	if (!category) return;
    	
    	if (category.value === "") {
    		category = "";
    	} else {
    		category = category.children[category.selectedIndex].innerText;
    	}
    	
    	sub_category = document.getElementById("audit-reconciliation-select-category-sub");
    	if (!sub_category) return;
    	
    	if (sub_category.value === "") {
    		sub_category = "";
    	} else {
    		sub_category = sub_category.children[sub_category.selectedIndex].innerText;
    	}
    	
    	grid = $("#audit-jqx-grid-reconciliation-list");
    	
    	grid.jqxGrid("clearfilters");
    	
    	if (bin.length > 0) {
    		filtergroup = new $.jqx.filter();
    		filter = filtergroup.createfilter("stringfilter", bin, "EQUAL");
    		filtergroup.addfilter(0, filter);
    		grid.jqxGrid("addfilter", "bin_name", filtergroup);
    	}
    	
    	filter = undefined;
    	filtergroup = undefined;
    	
    	if (category.length > 0) {
    		filtergroup = new $.jqx.filter();
    		filter = filtergroup.createfilter("stringfilter", category, "EQUAL");
    		filtergroup.addfilter(0, filter);
    		grid.jqxGrid("addfilter", "category", filtergroup);
    	}
    	
    	filter = undefined;
    	filtergroup = undefined;
    	
    	if (sub_category.length > 0) {
    		filtergroup = new $.jqx.filter();
    		filter = filtergroup.createfilter("stringfilter", sub_category, "EQUAL");
    		filtergroup.addfilter(0, filter);
    		grid.jqxGrid("addfilter", "sub_category", filtergroup);
    	}
    	
    	filter = undefined;
    	filtergroup = undefined;
    	
    	grid.jqxGrid("applyfilters");
    },
    clearAuditDataInStockCount: function() {
    	var param;
    	
    	param = {};

        try {
        	param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        try {
        	param.audit_sid = document.getElementById("audit-stock-count-select-audit-id").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        $.ajax({
        	url: "ajax/audit/clearAuditItems.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
	    			WRPCommon.MsgBoxModule.alert({
	    				message: "Complete",
	    				okBtnClick: function(){
	            			WRPAdminApp.pagescript.getAuditInformationInStockCount();
	    				}
	    			});
        		} else {
	    			WRPCommon.MsgBoxModule.alert({
	    				message: "Error : " + result
	    			});
        		}
        	}
        });
    },
    clearAuditDataInReconciliation: function() {
    	var param;
    	
    	param = {};

        try {
        	param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        try {
        	param.audit_sid = document.getElementById("audit-reconciliation-select-audit-id").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        $.ajax({
        	url: "ajax/audit/clearAuditItems.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
	    			WRPCommon.MsgBoxModule.alert({
	    				message: "Complete",
	    				okBtnClick: function(){
	            			WRPAdminApp.pagescript.getAuditInformationInReconciliation();
	    				}
	    			});
        		} else {
	    			WRPCommon.MsgBoxModule.alert({
	    				message: "Error : " + result
	    			});
        		}
        	}
        });
    },
    getAuditSerializedItemListBySKU: function() {
    	var param;
    	if (arguments.length < 2) {
    		console.warn("no input sku, audit sid");
    		return;
    	}
    	
    	param = {};

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.audit_sid = arguments[1];
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        param.sku = arguments[0];
        
        $.ajax({
        	url: "ajax/audit/getAuditSerializedItemListBySKU.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, source, adapter, elem;
        		data = result.data;
        		$('#jqx-grid-audit-serialized-list').jqxGrid("clear");
        		if (!data) return;
        		$('#jqx-grid-audit-serialized-list').jqxGrid("addrow", null, data);
        		WRPAdminApp.pagescript._deleteAuditSidList = [];
        		/*
        		source = {
        			datatype: "json",
        			datafields: [
        				{ name: "sid", type: "number" },
        				{ name: "audit_sid", type: "number" },
        				{ name: "item_sid", type: "number" },
        				{ name: "inventory_sid", type: "number" },
        				{ name: "serial_no", type: "string" },
        				{ name: "scanned_serial_no", type: "string" }
        			],
        			localdata: data
        		};

        		adapter = new $.jqx.dataAdapter(source);
        		
        		elem = $("#jqx-grid-audit-serialized-list");
        		
        		elem.jqxGrid({
        			width: "99%",
        			height: "99%",
        			theme: "arctic",
        			source: adapter,
        			filterable: true,
        			sortable: true,
        			columns: [
     				   { text: "sid", datafield: "sid", hidden: true },
    				   { text: "audit_sid", datafield: "audit_sid", hidden: true  },
    				   { text: "item_sid", datafield: "item_sid", hidden: true  },
    				   { text: "inventory_sid", datafield: "inventory_sid", hidden: true },
    				   { text: "System", datafield: "serial_no" },
    				   { text: "Scanned", datafield: "scanned_serial_no" },
    				   { text: "Delete", datafield: "delete", columntype: "button", width: "50px", cellsrenderer: function() { return "Delete"; }, buttonclick: WRPAdminApp.pagescript.deleteScannedSerialNo }
    				]
        		});
        		*/
        	}
        });
    },
    scanSerialNo: function() {
    	var scanned, rows, i, len, row, elem;
    	
    	try {
    		scanned = document.getElementById("audit-serialized-input-scanned").value;
    		if (scanned.length == 0) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "Input serial no"
    			});
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	elem = $("#jqx-grid-audit-serialized-list");
    	if (!elem) return;
    	
    	try {
    		rows = elem.jqxGrid("getrows");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	if (!rows) {
    		return;
    	}
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		if (row.scanned_serial_no && row.scanned_serial_no === scanned) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "This serial no has been scanned"
    			});
    			return;
    		}
    		if (row.serial_no === scanned) {
    			elem.jqxGrid("setcellvalue", row.boundindex, "scanned_serial_no", scanned);
    			break;
    		}
    		
    		row = undefined;
    	}
    	
    	if (row === undefined) {
    		row = {};
    		row.scanned_serial_no = scanned;
    		row.sid = 0;
    		row.inventory_sid = 0;
    		row.item_sid = WRPAdminApp.pagescript._selectedItemSid;    		
    		if (WRPAdminApp.pagescript._stockCountFlag === true) {
        		row.audit_sid = document.getElementById("audit-stock-count-select-audit-id").value;
    		} else {
        		row.audit_sid = document.getElementById("audit-reconciliation-select-audit-id").value;
    		}
    		if (rows.length > 0) {
        		elem.jqxGrid("addrow", elem.jqxGrid("getrowid", rows[rows.length-1].boundindex), row, "last" );
    		} else {
        		elem.jqxGrid("addrow", 0, row, "last" );
    		}
    	}    	
    },
    deleteScannedSerialNo: function(event) {
    	var row, elem;
    	
    	elem = $("#jqx-grid-audit-serialized-list");
    	
    	if (!elem) return;
    	
    	row = elem.jqxGrid('getrowdata', event);
    	
    	if (!row) return;
    	
    	if (row.serial_no !== undefined && row.serial_no) {
        	elem.jqxGrid("setcellvalue", event, "scanned_serial_no", undefined);
    	} else {
    		if (row.sid > 0) {
        		WRPAdminApp.pagescript._deleteAuditSidList.push(row.sid);    	
    		}
        	elem.jqxGrid("deleterow",row.uid);
    	}  	
    },
    submitSerializedAuditData: function() {
    	var rows, i, len, row, store_id, arg;
    	
    	arg = arguments;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        

    	try {
    		rows =  $("#jqx-grid-audit-serialized-list").jqxGrid("getrows");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	if (!rows) {
    		return;
    	}
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		row.boundindex = undefined;
    		delete row.boundindex;
    		row.uid = undefined;
    		delete row.uid;
    		row.uniqueid = undefined;
    		delete row.uniqueid;
    		row.visibleindex = undefined;
    		delete row.visibleindex;
    	}
    	
    	$.ajax({
    		url: "ajax/audit/saveAuditSerializedItemsData.jsp",
    		data: {
    			store_id: store_id,
    			audit_data_str: JSON.stringify(rows),
    			delete_audit_sid_str: WRPAdminApp.pagescript._deleteAuditSidList.join(",")
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			if (result === 0) {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Complete",
        				okBtnClick: function(){
        					$('#audit-serialized-window').jqxWindow('close');
        					WRPAdminApp.pagescript.getAuditItemsListInStockCount();
        				}
        			});
    			} else {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Error : " + result
        			});
    			}
    		}
    	});
    },
    getAuditNonSerializedItemBySKU: function() {
    	var param;
    	if (arguments.length < 2) {
    		console.warn("no input sku, audit_sid");
    		return;
    	}
    	
    	param = {};

        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.audit_sid = arguments[1];
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        param.sku = arguments[0];
        
        $.ajax({
        	url: "ajax/audit/getAuditNonSerializedItemListBySKU.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data;
        		data = result.data;
        		
        		if (!data) return;
        		
        		WRPAdminApp.pagescript._nonSerializedItemAuditData = data;
        		
        		try {
        			document.getElementById("audit-nonserialized-system-qty").value = data.system_qty;
        		} catch (e) {
        			console.warn(e);
        		}
        		
        		try {
        			document.getElementById("audit-nonserialized-scanned-qty").value = data.scanned_qty;
        		} catch (e) {
        			console.warn(e);
        		}
        	}
        });
    },
    submitAuditNonSerializedItem: function() {
    	var param;
    	
    	param = WRPAdminApp.pagescript._nonSerializedItemAuditData;
    	
    	if (param === undefined || !param) return;

        try {
        	param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.scanned_qty = parseInt(document.getElementById("audit-nonserialized-scanned-qty").value);
        	if (isNaN(param.scanned_qty)) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "Scanned Qty contains non-numeric characters"
    			});
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        $.ajax({
        	url: "ajax/audit/saveAuditNonSerializedItemsData.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
    			if (result === 0) {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Complete",
        				okBtnClick: function(){
        					$('#audit-nonserialized-window').jqxWindow('close');
        					WRPAdminApp.pagescript.getAuditItemsListInStockCount();
        				}
        			});
    			} else {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Error : " + result
        			});
    			}
        	}
        });
    },
    requestInventoryAudit: function() {
    	var param;
    	
    	param = {};

        try {
        	param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.audit_sid = document.getElementById("audit-stock-count-select-audit-id").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        $.ajax({
        	url: "ajax/audit/submitAuditStatusRequest.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Complete",
        				okBtnClick: function(){
                			WRPAdminApp.pagescript.getAuditHistoryList();
        				}
        			});
        		} else {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Error : " + result
        			});
        		}
        	}
        });
    },
    completeInventoryAudit: function() {
    	var param;
    	
    	param = {};

        try {
        	param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.audit_sid = document.getElementById("audit-reconciliation-select-audit-id").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        $.ajax({
        	url: "ajax/audit/submitAuditStatusComplete.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Complete",
        				okBtnClick: function(){
        					WRPAdminApp.pagescript.getAuditHistoryList();
        				}
        			});
        		} else {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Error : " + result
        			});
        		}
        	}
        });
    }
};