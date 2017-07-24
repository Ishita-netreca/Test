/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedPoId: 0,
    _selectedVendorSid: 0,
    _inputNewPOId: undefined,
    _selectedStoreId: undefined,
    _hideRecvSerialNoFlag: false,
    _express: false,
    _shippingCost: 1,
    init: function() {
    	WRPComponents('div[pagename="purchase_order"] > .page-submenu-container > .submenu[panelname="purchase_order"]').addShadowedImage('img/icon/order_01.png');
        /*170208 jh*/
    	var components, editrow;
    	/**/
    	components = $('#jqx-purchase-order-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_id", type: "string" },
    					{ name: "order_date", type: "date" },
    					{ name: "vendor_id", type: "string" },
    					{ name: "total_order_qty", type: "string" },
    					{ name: "status_str", type: "string" },
    					{ name: "item_info", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "P.O ID", datafield: "po_id", width: "20%" },
				   { text: "Date", datafield: "order_date", width: "20%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss' },
				   { text: "Vendor ID", datafield: "vendor_id", width: "15%"},
				   { text: "Qty", datafield: "total_order_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});
    		/* 170208 jh*/
    		components.on("rowselect", function(event){
    			WRPAdminApp.pagescript.getPurchasePODetail("purchase", event.args.row.sid);
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    		/**/
    	}

    	components = $('#jqx-approval-po-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_id", type: "string" },
    					{ name: "order_date", type: "date" },
    					{ name: "vendor_id", type: "string" },
    					{ name: "total_order_qty", type: "string" },
    					{ name: "status_str", type: "string" },
    					{ name: "item_info", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "P.O ID", datafield: "po_id", width: "20%" },
				   { text: "Date", datafield: "order_date", width: "20%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss' },
				   { text: "Vendor ID", datafield: "vendor_id", width: "15%"},
				   { text: "Qty", datafield: "total_order_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});
    		/* 170208 jh*/
    		components.on("rowselect", function(event){
    			WRPAdminApp.pagescript.getPurchasePODetail("vendor", event.args.row.sid);
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    		/**/
    	}

    	components = $('#jqx-receive-po-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_id", type: "string" },
    					{ name: "order_date", type: "date" },
    					{ name: "vendor_id", type: "string" },
    					{ name: "total_order_qty", type: "string" },
    					{ name: "status_str", type: "string" },
    					{ name: "item_info", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "P.O ID", datafield: "po_id", width: "20%" },
				   { text: "Date", datafield: "order_date", width: "20%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss' },
				   { text: "Vendor ID", datafield: "vendor_id", width: "15%"},
				   { text: "Qty", datafield: "total_order_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});
    		/* 170208 jh*/
    		components.on("rowselect", function(event){
    			WRPAdminApp.pagescript.getPurchasePODetail("receive", event.args.row.sid);
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    		/**/
    	}

    	components = $('#jqx-complete-po-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_id", type: "string" },
    					{ name: "order_date", type: "date" },
    					{ name: "vendor_id", type: "string" },
    					{ name: "total_order_qty", type: "string" },
    					{ name: "status_str", type: "string" },
    					{ name: "item_info", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        
    			columns: [
				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "P.O ID", datafield: "po_id", width: "20%" },
				   { text: "Date", datafield: "order_date", width: "20%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss' },
				   { text: "Vendor ID", datafield: "vendor_id", width: "15%"},
				   { text: "Qty", datafield: "total_order_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});
    		/* 170208 jh*/
    		components.on("rowselect", function(event){
    			WRPAdminApp.pagescript.getPurchasePODetail("complete", event.args.row.sid);
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    		/**/
    	}
    	/*170213 jh : tab/popup jqx*/
    	//po detail
    	components = $('#jqx-purchase-po-detail');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_sid", type: "string" },
    					{ name: "item_sid", type: "string" },
    					{ name: "serial_no", type: "string" },
    					{ name: "imei_no", type: "string" },
    					{ name: "order_qty", type: "number" },
    					{ name: "fulfill_qty", type: "string" },
    					{ name: "status", type: "string" },
    					{ name: "order_date", type: "string" },
    					{ name: "receive_date", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "item_cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "po_sid", datafield: "po_sid", width: "25%", hidden: true  },
    				{ text: "item_sid", datafield: "item_sid", width: "25%", hidden: true },
    				{ text: "serial_no", datafield: "serial_no", width: "20%", hidden: true  },
    				{ text: "imei_no", datafield: "imei_no", width: "16%", hidden: true  },
    				{ text: "description", datafield: "description", width: "25%"},
    				{ text: "order_qty", datafield: "order_qty", width: "25%"},
    				{ text: "fulfill_qty", datafield: "fulfill_qty", width: "25%"},
    				{ text: "item_cost", datafield: "item_cost", width: "25%", cellsformat:"c2"},
    				{ text: "status", datafield: "status", width: "20%", hidden: true  },
    				{ text: "order_date", datafield: "order_date", width: "25%", hidden: true},
    				{ text: "receive_date", datafield: "received_date", width: "25%", hidden: true  }
				]
    		});
    	}
    	
    	components = $('#jqx-vendor-po-detail');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_sid", type: "string" },
    					{ name: "item_sid", type: "string" },
    					{ name: "serial_no", type: "string" },
    					{ name: "imei_no", type: "string" },
    					{ name: "order_qty", type: "number" },
    					{ name: "fulfill_qty", type: "string" },
    					{ name: "status", type: "string" },
    					{ name: "order_date", type: "string" },
    					{ name: "received_date", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "item_cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "po_sid", datafield: "po_sid", width: "25%", hidden: true  },
    				{ text: "item_sid", datafield: "item_sid", width: "25%", hidden: true },
    				{ text: "serial_no", datafield: "serial_no", width: "20%", hidden: true  },
    				{ text: "imei_no", datafield: "imei_no", width: "16%", hidden: true  },
    				{ text: "description", datafield: "description", width: "25%"},
    				{ text: "order_qty", datafield: "order_qty", width: "25%"},
    				{ text: "fulfill_qty", datafield: "fulfill_qty", width: "25%"},
    				{ text: "item_cost", datafield: "item_cost", width: "25%", cellsformat:"c2"},
    				{ text: "status", datafield: "status", width: "20%", hidden: true  },
    				{ text: "order_date", datafield: "order_date", width: "20%", hidden: true  },
    				{ text: "receive_date", datafield: "received_date", width: "25%", hidden: true  }
				]
    		});
    	}
    	
    	components = $('#jqx-receive-po-detail');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_sid", type: "string" },
    					{ name: "item_sid", type: "string" },
    					{ name: "serial_no", type: "string" },
    					{ name: "imei_no", type: "string" },
    					{ name: "receive_qty", type: "number" },
    					{ name: "fulfill_qty", type: "string" },
    					{ name: "status", type: "string" },
    					{ name: "order_date", type: "string" },
    					{ name: "received_date", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "item_cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "po_sid", datafield: "po_sid", width: "25%", hidden: true  },
    				{ text: "item_sid", datafield: "item_sid", width: "25%", hidden: true },
    				{ text: "serial_no", datafield: "serial_no", width: "20%", hidden: true  },
    				{ text: "imei_no", datafield: "imei_no", width: "16%", hidden: true  },
    				{ text: "description", datafield: "description", width: "25%"},
    				{ text: "fulfill_qty", datafield: "fulfill_qty", width: "25%"},
    				{ text: "receive_qty", datafield: "receive_qty", width: "25%"},
    				{ text: "item_cost", datafield: "item_cost", width: "25%", cellsformat:"c2"},
    				{ text: "status", datafield: "status", width: "20%", hidden: true  },
    				{ text: "order_date", datafield: "order_date", width: "20%", hidden: true  },
    				{ text: "receive_date", datafield: "received_date", width: "25%", hidden: true  }
				]
    		});
    	}
    	
    	components = $('#jqx-complete-po-detail');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "po_sid", type: "string" },
    					{ name: "item_sid", type: "string" },
    					{ name: "serial_no", type: "string" },
    					{ name: "imei_no", type: "string" },
    					{ name: "order_qty", type: "number" },
    					{ name: "receive_qty", type: "string" },
    					{ name: "status", type: "string" },
    					{ name: "order_date", type: "string" },
    					{ name: "received_date", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "item_cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "po_sid", datafield: "po_sid", width: "25%", hidden: true  },
    				{ text: "item_sid", datafield: "item_sid", width: "25%", hidden: true },
    				{ text: "serial_no", datafield: "serial_no", width: "20%", hidden: true  },
    				{ text: "imei_no", datafield: "imei_no", width: "16%", hidden: true  },
    				{ text: "description", datafield: "description", width: "25%"},
    				{ text: "order_qty", datafield: "order_qty", width: "25%"},
    				{ text: "receive_qty", datafield: "receive_qty", width: "25%"},
    				{ text: "item_cost", datafield: "item_cost", width: "25%", cellsformat:"c2"},
    				{ text: "status", datafield: "status", width: "20%", hidden: true  },
    				{ text: "order_date", datafield: "order_date", width: "20%", hidden: true  },
    				{ text: "receive_date", datafield: "received_date", width: "25%", hidden: true  }
				]
    		});
    	}
    	
    	components = $('#added-items');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "description", type: "string" },
    					{ name: "itemCode", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "itemCost", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
				editable: true,
				
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },

    				{ text: "model", datafield: "model", width: "20%", editable: false},
    				{ text: "description", datafield: "description", editable: false},
    				{ text: "itemCode", datafield: "itemCode", width: "20%", editable: false},
    				{ text: "itemCost", datafield: "itemCost", width: 80},
    				{ text: "qty", datafield: "qty", width: 40 },
    				{ text: "delete", columntype: 'button', width: 50, cellsrenderer:function(){
    					return "Delete";
    				}, buttonclick: function(row){
    					editrow = row;
    					
    					var rows = $("#added-items").jqxGrid('getboundrows');
    					var rowIDs = new Array();
    					rowIDs.push(rows[row].uid);
    					/*170213 jh : shipping cost*/
    					if(rows[row].model == "Shipping")	WRPAdminApp.pagescript._shippingCost = 1;
    					/*shipping cost end*/
    					var dataRecord = $("#added-items").jqxGrid('deleterow', rowIDs);
    					/*
    					rows = $("#added-items").jqxGrid('getboundrows');
    					var rowscount = $("#added-items").jqxGrid('getdatainformation').rowscount;
    					
    					var cost = 0;
    					
    					for(var i=0; i<rowscount; i++){
    						cost = parseInt(cost) + parseInt(rows[i].qty)*parseInt(rows[i].itemCost);
    					}
    					document.getElementById("total").value = cost;
    					*/
    					WRPAdminApp.pagescript.finalAmount();
    				}
    				
    				}
    				
				]
    		});
    		/*170210 jh : PO - Qty x cost*/
			$('#added-items').on('cellvaluechanged', function (event) {
				//$("#jqxgrid").jqxGrid('setcellvalue', event.args.rowindex, "qty", event.args.value);
				/*
    			var rows = $("#added-items").jqxGrid('getboundrows');
				var rowscount = $("#added-items").jqxGrid('getdatainformation').rowscount;
				
				var cost = 0;
				
				for(var i=0; i<rowscount; i++){
					cost = parseInt(cost) + parseInt(rows[i].qty)*parseInt(rows[i].itemCost);
				}
				document.getElementById("total").value = cost;
				*/
				WRPAdminApp.pagescript.finalAmount();
    		 });
			/*PO - Qty x cost end*/
    	}
    	
    	components = $('#select-items');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "description", type: "string" },
    					{ name: "itemCode", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "itemCost", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        showfilterrow: true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "itemCost", datafield: "itemCost", columntype: 'button', width: "25%", hidden: true },
    				
    				{ text: "model", datafield: "model", width: "25%"},
    				{ text: "description", datafield: "description"},
    	 			{ text: "itemCode", datafield: "itemCode", width: "25%"},
    				{ text: "add", columntype: 'button', width: 40, cellsrenderer:function(){
    					return "Add";
    				},buttonclick: function(row){
    					//editrow = row;
    					var dataRecord = $("#select-items").jqxGrid('getrowdata', row);
    					var sid = dataRecord.sid;
    					var rowscount = $("#added-items").jqxGrid('getdatainformation').rowscount;
    					
    					if(rowscount > 0){
    						for (var i = 0; i < rowscount ; i++) {
    							var commit = $("#added-items").jqxGrid('getcellvalue', i, "sid");
    							if(commit == sid){	alert("exist.");	return	}
    						}
    						if ($("#added-items")) {
        						dataRecord.qty=1;
        						$("#added-items").jqxGrid("addRow", null, dataRecord, "last");
        						var cost = document.getElementById("new-purchase-order-total-amount").value.replace("$","");
        						var cost = parseFloat(cost)+parseFloat(dataRecord.itemCost);
        						document.getElementById("new-purchase-order-total-amount").value = "$"+cost.toFixed(2);
        	    			}
    					}else{
    						if ($("#added-items")) {
        						dataRecord.qty=1;
        						$("#added-items").jqxGrid("addRow", null, dataRecord, "last");
        						var cost = document.getElementById("new-purchase-order-total-amount").value.replace("$","");
        						var cost = parseInt(cost)+parseInt(dataRecord.itemCost);
        						document.getElementById("new-purchase-order-total-amount").value = "$"+cost.toFixed(2);
        	    			}
    					}
    					
    				}
    				}
				]
    		});
    	}
    	
    	
    	/*tab jqx end*/

    	

		
		$("#jqx-purchase-order-date").on('change', function (event) {
			var selection = $("#jqx-purchase-order-date").jqxDateTimeInput('getRange');
            if (selection.from != null) {
            	var elem = $("#jqx-purchase-order-list");
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
            	
            	elem.jqxGrid('addfilter', 'order_date', filtergroup);
            	elem.jqxGrid('applyfilters');
            }
        });
		
		$("#excel-purchase-order").click(function () {
			elem.jqxGrid('exportdata', 'xls', 'jqx-purchase-order-list');
        });    	

		/**/
		$("#jqx-appr-purchase-order-date").on('change', function (event) {
			var selection = $("#jqx-appr-purchase-order-date").jqxDateTimeInput('getRange');
            if (selection.from != null) {
            	var elem = $("#jqx-approval-po-list");
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
            	
            	elem.jqxGrid('addfilter', 'order_date', filtergroup);
            	elem.jqxGrid('applyfilters');
            }
        });
		
		$("#excel-appr-purchase-order").click(function () {
			elem.jqxGrid('exportdata', 'xls', 'jqx-appr-purchase-order-list');
        });

		$("#jqx-recv-purchase-order-date").on('change', function (event) {
			var selection = $("#jqx-recv-purchase-order-date").jqxDateTimeInput('getRange');
            if (selection.from != null) {
            	var elem = $("#jqx-receive-po-list");
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
            	
            	elem.jqxGrid('addfilter', 'order_date', filtergroup);
            	elem.jqxGrid('applyfilters');
            }
        });
		
		$("#excel-recv-purchase-order").click(function () {
			elem.jqxGrid('exportdata', 'xls', 'jqx-recv-purchase-order-list');
        });

		$("#jqx-complete-purchase-order-date").on('change', function (event) {
			var selection = $("#jqx-complete-purchase-order-date").jqxDateTimeInput('getRange');
            if (selection.from != null) {
            	var elem = $("#jqx-complete-po-list");
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
            	
            	elem.jqxGrid('addfilter', 'order_date', filtergroup);
            	elem.jqxGrid('applyfilters');
            }
        });
		
		$("#excel-complete-purchase-order").click(function () {
			elem.jqxGrid('exportdata', 'xls', 'jqx-complete-purchase-order-list');
        });
    	
    	
    	
    	
    	
    	WRPAdminApp.pagescript.getPurchaseOrderList();
    	WRPAdminApp.pagescript.getApprovalPurchaseOrderList();
        WRPAdminApp.pagescript.getReceivePurchaseOrderList();
        WRPAdminApp.pagescript.getCompletePurchaseOrderList();
    },
    getPurchaseOrderList: function() {
        var storeId, keyword;

        WRPAdminApp.pagescript._selectedPoId = 0;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	keyword = document.getElementById("purchase-order-list-input-keyword").value;
        } catch (e) {
        	
        }       
        WRPAdminApp.pagescript._selectedStoreId = storeId;

        $.ajax({
            url: "ajax/purchase_order/getPOrderList.jsp",
            data: {
            	store_id: storeId,
            	keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-purchase-order-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					/*170214 jh : status Str*/
    					obj = data[i];
    					switch (obj.status) {
    	                case 0:
    	                	obj.status_str="Order";
    	                    break;
    	                case 2:
    	                	obj.status_str="Approval";
    	                    break;
    	                case 4:
    	                	obj.status_str="Complete";
    	                    break;
    	                }
    					/*status Str end*/
    					if(obj.status > 3){
    						//elem.on("rowdoubleclick",'');
    					}else{
    						//elem.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    					}
    				}
					elem.jqxGrid("addRow", null, data, "last");
    			}
            }
        });
    },
    getApprovalPurchaseOrderList: function() {
        var storeId, keyword;

        WRPAdminApp.pagescript._selectedPoId = 0;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	keyword = document.getElementById("purchase-order-appr-list-input-keyword").value;
        } catch (e) {
        	
        }    

        $.ajax({
            url: "ajax/purchase_order/getPOrderList.jsp",
            data: {
            	store_id: storeId,
            	keyword: keyword,
                status: 0,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-approval-po-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					/*170214 jh : status Str*/
    					obj = data[i];
    					switch (obj.status) {
    	                case 0:
    	                	obj.status_str="Order";
    	                    break;
    	                case 2:
    	                	obj.status_str="Approval";
    	                    break;
    	                case 4:
    	                	obj.status_str="Complete";
    	                    break;
    	                }
    					/*status Str end*/
    					if(obj.status > 3){
    						//elem.on("rowdoubleclick",'');
    					}else{
    						//elem.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    					}
    				}
					elem.jqxGrid("addRow", null, data, "last");
					try {
						document.getElementById("inventory-total-order-count").innerHTML = data.length;
					} catch (e) {
						
					}
    			}		
            }
        });
    },
    getReceivePurchaseOrderList: function() {

        var storeId, keyword;

        WRPAdminApp.pagescript._selectedPoId = 0;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	keyword = document.getElementById("purchase-order-recv-list-input-keyword").value;
        } catch (e) {
        	
        }    

        $.ajax({
            url: "ajax/purchase_order/getPOrderList.jsp",
            data: {
            	store_id: storeId,
            	keyword: keyword,
                status: 2,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-receive-po-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					/*170214 jh : status Str*/
    					obj = data[i];
    					switch (obj.status) {
    	                case 0:
    	                	obj.status_str="Order";
    	                    break;
    	                case 2:
    	                	obj.status_str="Approval";
    	                    break;
    	                case 4:
    	                	obj.status_str="Complete";
    	                    break;
    	                }
    					/*status Str end*/
    					if(obj.status > 3){
    						//elem.on("rowdoubleclick",'');
    					}else{
    						//elem.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    					}
    				}
					elem.jqxGrid("addRow", null, data, "last");
					try {
						document.getElementById("inventory-total-approval-count").innerHTML = data.length;
					} catch (e) {
						
					}
    			}
            }
        });
    },
    getCompletePurchaseOrderList: function() {

        var storeId, keyword;

        WRPAdminApp.pagescript._selectedPoId = 0;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	keyword = document.getElementById("purchase-order-complete-list-input-keyword").value;
        } catch (e) {
        	
        }    

        $.ajax({
            url: "ajax/purchase_order/getPOrderList.jsp",
            data: {
                store_id: storeId,
            	keyword: keyword,
                status: 4,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-complete-po-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					/*170214 jh : status Str*/
    					obj = data[i];
    					switch (obj.status) {
    	                case 0:
    	                	obj.status_str="Order";
    	                    break;
    	                case 2:
    	                	obj.status_str="Approval";
    	                    break;
    	                case 4:
    	                	obj.status_str="Complete";
    	                    break;
    	                }
    					/*status Str end*/
    					if(obj.status > 3){
    						//elem.on("rowdoubleclick",'');
    					}else{
    						//elem.on("rowdoubleclick", WRPAdminApp.pagescript.openPOrderInfoPopup);
    					}
    				}
					elem.jqxGrid("addRow", null, data, "last");
    			}
            }
        });
    },
    getVendorList: function() {
    	var keyword;
    	//
    	try {
        	keyword = document.getElementById("new-purchase-order-vendor-keyword").value;
        } catch (e) {
        	
        }       
    	//
        try {
            if (document.getElementById("select-store").value.length == 0) {
                alert("Select store");
                return;
            }
        } catch (e) {
            return;
        }

        WRPAdminApp.pagescript._selectedVendorSid = 0;
        WRPAdminApp.openPopupInPage('newPurchaseOrderContainer');

        $.ajax({
            url: "ajax/vendor/getVendorList.jsp",
            data: {
            	keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, vendorList, innerHTML;
                data = result.data;

                if (!data) return;

                vendorList = document.getElementById("new-purchase-order-vendor-list");
                if (!vendorList) return;

                innerHTML = [];
                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr vendor_sid="');
                        innerHTML.push(obj.sid);
                        innerHTML.push('" onclick="WRPAdminApp.pagescript.selectVendor(this);">');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.vendorId);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.vendorName);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.contactName);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.tel);
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                if (len < 11) {
                    for (i = len; i < 11; i++) {
                        innerHTML.push('<tr class="blank"><td></td><td></td><td></td><td></td></tr>');
                    }
                }

                vendorList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    selectVendor: function() {
        var elem, parent;

        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }

        elem = arguments[0];

        if (elem.nodeName === "TR") {
            parent = elem;
            while(parent) {
                try {
                    if (parent.id === "new-purchase-order-vendor-list") break;
                } catch (e) {

                }
                parent = parent.parentNode;
            }
            if (parent) {
                WRPAdminApp.pagescript._selectedVendorSid = parseInt(elem.getAttribute("vendor_sid"));
                if (isNaN(WRPAdminApp.pagescript._selectedVendorSid)) {
                    console.warn("selectVendor : vendor sid error");
                    return;
                }
            }

            WRPAdminApp.setViewInPopup("newPurchaseOrderContainer", "selectItems");

            WRPAdminApp.pagescript.getItemListInStore();
        }
    },
    getItemListInStore: function() {
        var storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        $.ajax({
            url: "ajax/purchase_order/getItemListInStore.jsp",
            data: {
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, itemsList, innerHTML;
                data = result.data;

                if (!data) return;

                innerHTML = [];

                elem = $("#select-items");
                if (elem) {
                	elem.jqxGrid("clear");
                    elem.jqxGrid("addRow", null, data, "last");	
                }
            }
        });
    },
    addItemToAddedItemsList: function() {
        var addItems, selected, itemSid, i, len, elem, newElem, innerHTML, tmp;

        if (arguments.length < 1) {
            console.warn("no input item");
            return;
        }

        selected = arguments[0];

        while(selected) {
            try {
                if (selected.nodeName === "TR") break;
            } catch (e) {

            }
            selected = selected.parentNode;
        }

        if (!selected || !selected.getAttribute) {
            console.warn("1st argument must be element");
            return;
        }

        itemSid = parseInt(selected.getAttribute("item_sid"));

        if (isNaN(itemSid)) {
            console.warn("this element doesn't contain item_sid attribute");
            return;
        }

        addItems = document.getElementById("new-purchase-order-added-items");

        if (!addItems) {
            return;
        }

        for (i = 0, len = addItems.children.length; i < len; i++) {
            try {
                elem = addItems.children[i];

                if (parseInt(elem.getAttribute("item_sid")) === itemSid) {
                    /*
                     tmp = parseInt(elem.children[3].children[0].value);
                     if (!isNaN(tmp)) {
                     elem.children[3].children[0].value = tmp + 1;
                     return;
                     }
                     */
                    alert("This item is already added");
                    return;
                }
            } catch (e) {
                console.warn(e);
            }
        }

        newElem = document.createElement("tr");
        newElem.setAttribute("item_sid", itemSid);
        try {
            innerHTML = [];
            innerHTML.push('<td>');
            innerHTML.push(selected.children[0].innerText);
            innerHTML.push('</td>');
            innerHTML.push('<td>');
            innerHTML.push(selected.children[1].innerText);
            innerHTML.push('</td>');
            innerHTML.push('<td>');
            innerHTML.push(selected.children[2].innerText);
            innerHTML.push('</td>');
            innerHTML.push('<td><input type="text" value="1"/></td>');
            innerHTML.push('<td><div class="remove-item-btn" onclick="WRPAdminApp.pagescript.removeAddedItem(this);"></div></td>');

            newElem.innerHTML = innerHTML.join("");
            innerHTML = undefined;
        } catch (e) {
            console.warn(e);
            return;
        }

        for (i = 0, len = addItems.children.length; i < len; i++) {
            try {
                elem = addItems.children[i];

                if (elem.className.indexOf("blank") > -1) {
                    addItems.replaceChild(newElem, elem);
                    break;
                }

                if (i == len -1) {
                    addItems.appendChild(newElem);
                }
            } catch (e) {
                console.warn(e);
            }
        }
    },
    removeAddedItem: function() {
        var tr, parent, i, len, innerHTML;
        if (arguments.length < 1) {
            console.warn("no input item");
            return;
        }

        tr = arguments[0];

        while(tr) {
            try {
                if (tr.className === "tr") break;
            } catch (e) {

            }
            tr = tr.parentNode;
        }

        if (!tr) {
            return;
        }

        parent = tr.parentNode;

        if (parent.id === "new-purchase-order-added-items") {
            parent.removeChild(tr);
        }

        if (parent.children.length < 2) {
            innerHTML = [];
            for (i = parent.children.length; i < 2; i++) {
                innerHTML.push('<tr class="blank"><td></td><td></td><td></td><td></td><td></td></tr>');
            }
            parent.innerHTML = parent.innerHTML + innerHTML.join("");
            innerHTML = undefined;
        }
    },
    searchItemInNewPOrder: function() {
        var keyword, list, i, len, elem;

        try {
            keyword = document.getElementById("new-po-search-item-keyword").value;
        } catch (e) {
            console.warn(e);
            keyword = "";
        }

        list = document.getElementById("inventory-enter-order-items-list");
        if (!list) return;

        for (i = 0, len = list.children.length; i < len; i++) {
            try {
                elem = list.children[i];
                if (elem.children.length != 4) continue;

                if (keyword.length == 0) {
                    elem.style.display = "";
                } else {
                    if (elem.innerText.indexOf(keyword) > -1) {
                        elem.style.display = "";
                    } else {
                        elem.style.display = "none";
                    }
                }
            } catch(e) {
                console.warn(e);
                return;
            }
        }
    },
    savePurchaseOrder: function() {
        var pOrderData, i, len, elem, elemContainer, item, storeId;
        if (!confirm("Are you sure?")) return;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        pOrderData = {};

        elemContainer = document.getElementById("new-purchase-order-vendor-list");
        if (!elemContainer) {
            console.warn("vendor list is not exists");
            return;
        }

        for (i = 0, len = elemContainer.children.length; i < len; i++) {
            try {
                elem = elemContainer.children[i];
                if (elem.getAttribute("selected") === "1") {
                    if (elem.getAttribute("vendor_sid").length > 0) {
                        pOrderData.vendorSid = parseInt(elem.getAttribute("vendor_sid"));
                        if (isNaN(pOrderData.vendorSid)) {
                            pOrderData.vendorSid = undefined;
                        } else {
                            break;
                        }
                    }
                }
            } catch (e) {

            }
        }

        pOrderData.vendorSid = parseInt(WRPAdminApp.pagescript._selectedVendorSid);

        if (pOrderData.vendorSid === undefined || !pOrderData.vendorSid) {
            console.warn("no selected vendor");
            return;
        }

        pOrderData.items = [];

		var rows = $("#added-items").jqxGrid('getboundrows');
        var rowIDs = new Array();
        var rowscount = $("#added-items").jqxGrid('getdatainformation').rowscount;
        for(var i=0; i<rowscount; i++){
			item = {};
			item.sid = rows[i].sid;
			item.qty = rows[i].qty;
			item.cost = rows[i].itemCost;
			/*170214 jh : description*/
			item.description = rows[i].description;
			/*description end*/
			pOrderData.items.push(item);
		}

        $.ajax({
            url: "ajax/purchase_order/savePOrder.jsp",
            data: {
                pOrderData: JSON.stringify(pOrderData),
                storeId: storeId,
                express: WRPAdminApp.pagescript._express,
                poId: WRPAdminApp.pagescript._inputNewPOId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
					alert("Complete");
                    WRPAdminApp.closePopup("newPurchaseOrderContainer");
                    WRPAdminApp.pagescript.getPurchaseOrderList();
                    WRPAdminApp.pagescript.getApprovalPurchaseOrderList();
                    WRPAdminApp.pagescript.getReceivePurchaseOrderList();
                    WRPAdminApp.pagescript.getCompletePurchaseOrderList();

                    if(WRPAdminApp.pagescript._express) {
                    	$.ajax({
                            url: "ajax/purchase_order/getPOrderInfoByPOId.jsp",
                            data: {
                                storeId: storeId,
                                poId: WRPAdminApp.pagescript._inputNewPOId
                            },
                            method: "POST",
                            dataType: "json",
                            success: function(result) {
                            	var data;
                    			data = result.data;
                    			if (!data) return;
                    			
                    			WRPAdminApp.pagescript.openPOrderInfoPopup(data.sid);
                            }
                        });
                    }
                    WRPAdminApp.pagescript._inputNewPOId = undefined;
                    
                } else {
                    alert("Error : " + result);
                }
            }
        });
        
        //
        
        //
    },
    openPOrderInfoPopup: function(event) {
        var storeId, rowdata; // rowdata == po_sid
        if(!WRPAdminApp.pagescript._express)	rowdata = event.args.row.bounddata.sid;
        else									rowdata = event;
        /*if (arguments.length < 1) {
            console.warn("no input po ID");
            return;
        }
*/
        storeId = WRPAdminApp.pagescript._selectedStoreId;

        $("#porder-fulfill-keyword").val("");
        $("#porder-receive-keyword").val("");
        
        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }
        $.ajax({
            url: "ajax/purchase_order/getPOrderInfo.jsp",
            data: {
                poSid: rowdata,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data;
                data = result.data[0];
                if (!data) return;
                console.log(data);
                WRPAdminApp.pagescript._selectedPoId = data.sid;
                switch (data.status) {
                    case 0:
                        try {
                            document.getElementById("porder-fulfill-vendor-id").innerHTML = data.vendorId;
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("porder-fulfill-po-id").innerHTML = data.poId;
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("porder-fulfill-po-sid").innerHTML = data.sid;
                            //data.sid = document.getElementById("porder-fulfill-po-sid").innerHTML;
                        } catch (e) {
                            console.warn(e);
                        }
                        
                        WRPAdminApp.pagescript.getOrderedItemListByPoId(data.sid);
                        break;
                    case 2:
                        try {
                            document.getElementById("porder-receive-vendor-id").innerHTML = data.vendorId;
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("porder-receive-po-id").innerHTML = data.poId;
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("porder-receive-po-sid").innerHTML = data.sid;
                            //data.sid = document.getElementById("porder-receive-po-sid").innerHTML;
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.pagescript.getFulfilledItemListByPoId(data.sid);

                        break;
                    case 4:
                        try {
                            document.getElementById("porder-complete-vendor-id").innerHTML = data.vendorId;
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("porder-complete-po-id").innerHTML = data.poId;
                        } catch (e) {
                            console.warn(e);
                        }


                        WRPAdminApp.pagescript.getCompletedItemListByPoId(data.sid);
                        break;
                }
            }
        });
    },
    getOrderedItemListByPoId: function() {
        var storeId, keyword;

        if (arguments.length < 1) {
        	arguments[0] = WRPAdminApp.pagescript._selectedPoId;
        }

        try {
        	keyword = document.getElementById("porder-fulfill-keyword").value;
        } catch (e) {
        	
        }
        
        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        WRPAdminApp.openPopupInPage('POFulfillmentContainer');

        $.ajax({
            url: "ajax/purchase_order/getPOrderItemsByPoId.jsp",
            data: {
                poSid: arguments[0],
                storeId: storeId,
                keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data2, i, len, obj, itemList, innerHTML;
                data2 = result.data;
                if (!data2) return;

                itemList = document.getElementById("fulfill-purchase-order-item-list");
                if (!itemList) return;

                WRPAdminApp.pagescript._selectedItemSid = 0;

                innerHTML = [];

                for (i = 0, len = data2.length; i < len; i++) {
                    try {
                        obj = data2[i];
                        innerHTML.push('<tr>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.itemCode);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.name);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.description);
                        innerHTML.push('</td>');
                        innerHTML.push('<td id="order'+obj.sid+'">');
                        innerHTML.push(obj.orderQty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td id='+obj.sid+'>');
                        innerHTML.push(obj.fulfillQty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitFulfillmentContainer(');
                        innerHTML.push(obj.itemSid);
                        innerHTML.push(')"></div></td>');
                        innerHTML.push('<td><div class="btn sky" style="widh:50px;" onclick="WRPAdminApp.pagescript.skipFulfill(');
                        innerHTML.push(obj.sid);
                        innerHTML.push(')">Skip</div></td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                if (len < 10) {
                    for (; len < 10; len++) {
                        innerHTML.push('<tr class="blank"><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
                    }
                }

                itemList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    openSubmitFulfillmentContainer: function() {
		$("submit-receive-nonserial-item-recv-qty").val("0");
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item no");
            return;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemSid.jsp",
            data: {
                itemSid: arguments[0],
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedItemSid = data.sid;

                if (data.serialized === 1) {
                    try {
                        document.getElementById("submit-fulfill-serial-po-id").value = document.getElementById("porder-fulfill-po-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-serial-vendor-id").value = document.getElementById("porder-fulfill-vendor-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-serial-item-id").value = data.itemCode;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-serial-item-sku").value = data.sku;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-serial-item-description").value = data.description;
                    } catch (e) {
                        console.warn(e);
                    }

                    WRPAdminApp.openPopupInPage("SubmitFulfillSerialContainer");
                    WRPAdminApp.pagescript.getOrderedSerializabePoItemsListBySid(data.sid);
                } else {
                    try {
                        document.getElementById("submit-fulfill-nonserial-po-id").value = document.getElementById("porder-fulfill-po-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-nonserial-vendor-id").value = document.getElementById("porder-fulfill-vendor-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-nonserial-item-id").value = data.itemCode;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-nonserial-item-sku").value = data.sku;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-fulfill-nonserial-item-description").value = data.description;
                    } catch (e) {
                        console.warn(e);
                    }

                    WRPAdminApp.openPopupInPage("SubmitFulfillNonSerialContainer");
                    WRPAdminApp.pagescript.getOrderedNonSerializabePoItemBySid(data.sid);
                }
            }
        });
    },
    getOrderedSerializabePoItemsListBySid: function() {
        var poSid, itemSid, storeId;
        if (arguments.length < 1) {
            console.warn("no input item sid");
            return;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        itemSid = parseInt(arguments[0]);
        if (isNaN(itemSid)) {
            console.warn("item sid contains non-numeric character");
            return;
        }

        try {
            poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
            if (isNaN(poSid)) {
                throw "";
            }
        } catch (e) {
            console.log("PO ID Error");
            console.log(e);
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getSerializablePoItemsListByItemSidAndPoId.jsp",
            data: {
                itemSid: itemSid,
                poSid: poSid,
                status: -1,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, serialItemList, i, len, obj, innerHTML;
                data = result.data;
                if (!data) return;

                serialItemList = document.getElementById("submit-fulfill-serial-item-list");
                if (!serialItemList) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<input type="text" id="fulfill-serial-item-');
                        innerHTML.push(obj.sid);
                        innerHTML.push('" ');
                        if (obj.serialNo) {
                            innerHTML.push('value="');
                            innerHTML.push(obj.serialNo);
                            innerHTML.push('" ');
                        }
                        innerHTML.push('placeholder="" readonly/>');
                        // onchange="WRPAdminApp.pagescript.checkedSerialNoExists(this);"
                    }catch (e) {
                        console.warn(e);
                    }
                }

                serialItemList.innerHTML= innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    checkedSerialNoExists: function() {
        var elem, elemContainer, i, len, obj;
        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }
        elem = arguments[0];

        elemContainer = elem.parentNode;
        if (!elemContainer.id || elemContainer.id !== 'submit-fulfill-serial-item-list') {
            return;
        }

        for (i = 0, len = elemContainer.children.length; i < len; i++) {
            try {
                obj = elemContainer.children[i];
                if (obj === elem) continue;
                if (obj.value === elem.value) {
                    alert("There is item with serial no");
                    elem.value = "";
                    return;
                }
            } catch (e) {

            }
        }
    },
    inputSerialNo: function() {
        var serialNo ,serialItemList, i, len, elem, insertTarget;

        if (arguments.length < 1) {
            console.warn("no input serial no");
            return;
        }

        if (typeof(arguments[0]) === "string") {
            serialNo = arguments[0];
        } else {
            try {
                serialNo = arguments[0].value;
                arguments[0].value = "";
            } catch (e) {
                console.warn(e);
                return;
            }
        }

        if (serialNo.length == 0) {
            alert("Input serial no");
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getSerialNo.jsp",
            data: {
                storeId: storeId,
                serialNo: serialNo
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, serialItemList, i, len, obj, innerHTML;

                if(result == -5){
                	alert("This serial no exists in inventory");
                	return;
                }
                
                serialItemList = document.getElementById("submit-fulfill-serial-item-list");
                if (!serialItemList) return;

                insertTarget = -1;
                for (i = 0, len = serialItemList.children.length; i < len; i++) {
                    try {
                        elem = serialItemList.children[i];
                        if (elem.value.length === 0 && insertTarget === -1) {
                            insertTarget = i;
                        } else {
                            if (elem.value === serialNo) {
                                alert("There is item with serial no");
                                try{ document.getElementById('manual-input-serial').focus(); } catch (e){ console.warn(e); }
                                return;
                            }
                        }
                    } catch (e) {
                        console.warn(e);
                    }
                }

                if (insertTarget > -1) {
                    serialItemList.children[insertTarget].value = serialNo;
                }
                
                if (insertTarget == serialItemList.children.length -1) {
                    try{ document.getElementById('manual-input-serial-container').style.display = 'none'; } catch (e){ console.warn(e); }
                }

            }
        });
    },
    onSelectExcelFile: function(event) {
        var fileElem = event.target, file, ext, reader;

        if (fileElem.files.length > 0) {
            file = fileElem.files[0];
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
                        var serialItemList = document.getElementById("submit-fulfill-serial-item-list");
                        var count = 0;
                        if (!serialItemList) return;

                        // Loop Over Each Sheet
                        wb.SheetNames.forEach(function(sheetName) {
                            // Obtain The Current Row As CSV
                            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                            var data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {header:1});
                          
                            $.each(data, function( indexR, valueR ) {
                                $.each(data[indexR], function( indexC, valueC ) {                                	
                                    if (count < serialItemList.children.length) {
                                        serialItemList.children[count].value = valueC;
                                        count++;
                                    }
                                });
                            });
                        });
                    };

                    console.log(reader);

                    reader.readAsBinaryString(file);
                } else if (reader.readAsArrayBuffer) {
                    reader.onload = function(e) {
                        var data = "";
                        var cfb, wb;
                        var serialItemList = document.getElementById("submit-fulfill-serial-item-list");
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
                                    if (count < serialItemList.children.length) {
                                        serialItemList.children[count].value = valueC;
                                        count++;
                                    }
                                });
                            });
                        });
                    };
                    reader.readAsArrayBuffer(file);
                }

            } catch (e) {
                console.warn(e);
            }

            fileElem.value = "";
        }
    },
    submitFulfillSerializeItems: function() {
        var serialItemList, i, len, param, elem, tmp, storeId;

        if (!confirm("Save data, Are you sure?")) return;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        serialItemList = document.getElementById("submit-fulfill-serial-item-list");

        if (!serialItemList) return;

        param = {};
        param.poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
        if (isNaN(param.poSid)) {
            console.warn("submitFulfillSerializeItems : PO ID Error");
            return;
        }

        param.itemSid = parseInt(WRPAdminApp.pagescript._selectedItemSid);
        if (isNaN(param.itemSid)) {
            console.warn("submitFulfillSerializeItems : Item SID Error");
            return;
        }

        param.serialIDs = [];
        for (i = 0, len = serialItemList.children.length; i < len; i++) {
            try {
                elem = serialItemList.children[i];
                tmp = parseInt(elem.id.substring(elem.id.lastIndexOf("-") + 1));
                if (isNaN(tmp)) {
                    throw "submitFulfillSerializeItems : po-item sid is not existing";
                }
                if (elem.value.length > 0) {
                    param.serialIDs.push({ sid: tmp, serialNo: elem.value });
                } else {
                    param.serialIDs.push({ sid: tmp, serialNo: null });
                }
            } catch (e) {
                console.warn(e);
            }
        }

        param.serialIDs = JSON.stringify(param.serialIDs);

        param.storeId = storeId;

        $.ajax({
            url: "ajax/purchase_order/saveFulfillDataSerializable.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup('SubmitFulfillSerialContainer');
                    WRPAdminApp.pagescript.getOrderedItemListByPoId(WRPAdminApp.pagescript._selectedPoId);
                } else {
                    if(result == -5) alert("ERROR : Serial exist.");
                    else	alert("ERROR : "+result);
                    }
                }
        });
    },
    getOrderedNonSerializabePoItemBySid: function() {
        var poSid, itemSid, storeId;
        if (arguments.length < 1) {
            console.warn("no input item sid");
            return;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        itemSid = parseInt(arguments[0]);
        if (isNaN(itemSid)) {
            console.warn("item sid contains non-numeric character");
            return;
        }

        try {
            poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
            if (isNaN(poSid)) {
                throw "";
            }
        } catch (e) {
            console.log("PO ID Error");
            console.log(e);
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getNonSerializablePoItemByItemSidAndPoId.jsp",
            data: {
                itemSid: itemSid,
                poSid: poSid,
                status: -1,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elem;
                /*170217 jh : non serial*/
                data = result.data[0];
                /*non serial end*/
                if (!data) return;

                try {
                    elem = document.getElementById("submit-fulfill-nonserial-item-odr-qty");
                    elem.innerHTML = data.orderQty;
                } catch (e) {

                }

                try {
                    elem = document.getElementById("submit-fulfill-nonserial-item-ffl-qty");
                    elem.value = data.fulfillQty;
                    elem.setAttribute("sid", data.sid);
                } catch (e) {

                }
            },
        })
    },
    submitFulfillNonSerializeItem: function() {
        var param, storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        if (!confirm("Save data, Are you sure?")) return;

        param = {};
        param.poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
        if (isNaN(param.poSid)) {
            console.warn("submitFulfillSerializeItems : PO ID Error");
            return;
        }

        param.itemSid = parseInt(WRPAdminApp.pagescript._selectedItemSid);
        if (isNaN(param.itemSid)) {
            console.warn("submitFulfillSerializeItems : Item SID Error");
            return;
        }

        try {
            param.sid = parseInt(document.getElementById("submit-fulfill-nonserial-item-ffl-qty").getAttribute("sid"));
            if (isNaN(param.sid)) {
                alert("PO Items SID Error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.fulfillQty = parseInt(document.getElementById("submit-fulfill-nonserial-item-ffl-qty").value);
            /*170210 jh : partially*/
            if(param.fulfillQty != parseInt(document.getElementById("submit-fulfill-nonserial-item-odr-qty").innerHTML)){
            	alert("Partially !");
            	return;
            }
            /*partially end*/
            if (isNaN(param.fulfillQty)) {
                alert("Ffl Qty contains non-numeric characters");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        param.storeId = storeId;

        $.ajax({
            url: "ajax/purchase_order/saveFulfillDataNonSerializable.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup('SubmitFulfillNonSerialContainer');
                    WRPAdminApp.pagescript.getOrderedItemListByPoId(WRPAdminApp.pagescript._selectedPoId);
                } else {
                    alert("Error : " + result);
                }
            }
        });
        //////////
    },
    setPOrderFulfillment: function() {
        var poSid, storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        if (!confirm("Are you sure?")) return;

        poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
        if (isNaN(poSid)) {
            console.warn("setPOrderFulfillment : PO ID Error");
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/setPOrderFulfillment.jsp",
            data: {
                poSid: poSid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete");
                	WRPAdminApp.pagescript.getPurchaseOrderList();
                	WRPAdminApp.pagescript.getApprovalPurchaseOrderList();
                    WRPAdminApp.pagescript.getReceivePurchaseOrderList();
                    WRPAdminApp.pagescript.getCompletePurchaseOrderList();
                    WRPAdminApp.closePopup('POFulfillmentContainer');
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    getFulfilledItemListByPoId: function() {
        var storeId, keyword;

        if (arguments.length < 1) {
        	arguments[0] = WRPAdminApp.pagescript._selectedPoId;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        try {
        	keyword = document.getElementById("porder-receive-keyword").value;
        } catch (e) {
        	
        }
        
        
        WRPAdminApp.openPopupInPage('POReceivementContainer');


        $.ajax({
            url: "ajax/purchase_order/getPOrderItemsByPoId.jsp",
            data: {
                poSid: arguments[0],
                storeId: storeId,
                keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data2, i, len, obj, itemList, innerHTML;
                data2 = result.data;
                if (!data2) return;

                itemList = document.getElementById("receivement-purchase-order-ltem-list");
                if (!itemList) return;

                WRPAdminApp.pagescript._selectedItemSid = 0;

                innerHTML = [];

                for (i = 0, len = data2.length; i < len; i++) {
                    try {
                        obj = data2[i];
                        innerHTML.push('<div class="tr">');
                        innerHTML.push('<div class="td">');
                        innerHTML.push(obj.itemCode);
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push(obj.name);
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push(obj.description);
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td" id="ffq'+obj.itemSid+'">');
                        innerHTML.push(obj.fulfillQty);
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push(obj.receiveQty);
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td"><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitReceivementContainer(');
                        innerHTML.push(obj.itemSid);
                        innerHTML.push(')"></div></div>');
                        innerHTML.push('</div>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                if (len < 10) {
                    for (; len < 10; len++) {
                        innerHTML.push('<div class="tr"><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div></div>');
                    }
                }

                itemList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    openSubmitReceivementContainer: function() {
		$("submit-receive-nonserial-item-recv-qty").val("0");
    	$("manual-input-serial").val("");
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item no");
            return;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemSid.jsp",
            data: {
                itemSid: arguments[0],
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedItemSid = data.sid;

                if (data.serialized === 1) {
                    try {
                        document.getElementById("submit-receive-serial-po-id").value = document.getElementById("porder-receive-po-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-serial-vendor-id").value = document.getElementById("porder-receive-vendor-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-serial-item-id").value = data.itemCode;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-serial-item-sku").value = data.sku;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-serial-item-description").value = data.description;
                    } catch (e) {
                        console.warn(e);
                    }
                    WRPAdminApp.openPopupInPage("SubmitReceiveSerialContainer");
                    WRPAdminApp.pagescript.getFulfilledSerializabePoItemsListBySid(data.sid);
   //                
                } else {
                    try {
                        document.getElementById("submit-receive-nonserial-po-id").value = document.getElementById("porder-receive-po-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-nonserial-vendor-id").value = document.getElementById("porder-receive-vendor-id").innerText;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-nonserial-item-id").value = data.itemCode;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-nonserial-item-sku").value = data.sku;
                    } catch (e) {
                        console.warn(e);
                    }

                    try {
                        document.getElementById("submit-receive-nonserial-item-description").value = data.description;
                    } catch (e) {
                        console.warn(e);
                    }

                    WRPAdminApp.openPopupInPage("SubmitReceiveNonSerialContainer");
                    WRPAdminApp.pagescript.getFulfilledNonSerializabePoItemBySid(data.sid);
                }
            }
        });
    },
    getFulfilledPhonePoItemsListBySid: function() {
        var poSid, itemSid, storeId;
        if (arguments.length < 1) {
            console.warn("no input item sid");
            return;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        itemSid = parseInt(arguments[0]);
        if (isNaN(itemSid)) {
            console.warn("item sid contains non-numeric character");
            return;
        }

        try {
            poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
            if (isNaN(poSid)) {
                throw "";
            }
        } catch (e) {
            console.log("PO ID Error");
            console.log(e);
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getSerializablePoItemsListByItemSidAndPoId.jsp",
            data: {
                itemSid: itemSid,
                poSid: poSid,
                status: 0,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, serialItemList, i, len, obj, innerHTML;
                data = result.data;
                if (!data) return;

                serialItemList = document.getElementById("submit-receive-phone-item-list");
                if (!serialItemList) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        switch (obj.status) {
                            case 0:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<div>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "");
                                innerHTML.push('</div>');
                                innerHTML.push('<div></div>');
                                innerHTML.push('<div></div>');
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 1:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<div orig="">');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "");
                                innerHTML.push('</div>');
                                innerHTML.push('<div orig="">');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "");
                                innerHTML.push('</div>');
                                innerHTML.push('<div orig="">');
                                innerHTML.push((obj.imeiNo !== undefined && obj.imeiNo)? obj.imeiNo : "");
                                innerHTML.push('</div>');
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 2:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<div>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "");
                                innerHTML.push('</div>');
                                innerHTML.push('<div></div>');
                                innerHTML.push('<div></div>');
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 3:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<div>&nbsp;</div>');
                                innerHTML.push('<div orig="');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "");
                                innerHTML.push('">');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "");
                                innerHTML.push('</div>');
                                innerHTML.push('<div>');
                                innerHTML.push((obj.imeiNo !== undefined && obj.imeiNo)? obj.imeiNo : "");
                                innerHTML.push('</div>');
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckPhone(this);"></div>');
                                innerHTML.push('</div>');
                                break;

                        }
                    }catch (e) {
                        console.warn(e);
                    }
                }

                serialItemList.innerHTML= innerHTML.join("");
                innerHTML = undefined;
            },
        })
    },
    checkPhoneInReceiveItemList: function() {
        var elem, elemContainer, i, len, newElem, imeiNo, serialNo;

        try {
            elem = document.getElementById("submit-receive-phone-serial-no");
            serialNo = elem.value;
            if (serialNo.length === 0) {
                alert("Input serial number first");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("submit-receive-phone-imei-no");
            imeiNo = elem.value;
            if (imeiNo.length === 0) {
                alert("Input imei number");
                return;
            }
            document.getElementById("submit-receive-phone-serial-no").value = "";
            elem.value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        elemContainer = document.getElementById("submit-receive-phone-item-list");

        if (!elemContainer) return;

        for (i = 0, len = elemContainer.children.length; i < len; i++) {
            try {
                elem = elemContainer.children[i];
                if (elem.className === "item" && elem.children.length === 4) {
                    if (elem.children[0].innerText === serialNo) {
                        elem.children[1].innerHTML = serialNo;
                        elem.children[2].innerHTML = imeiNo;
                        break;
                    }
                }
            } catch (e) {
                console.warn(e);
            }

            if (i == len - 1) {
                newElem = document.createElement("div");
                newElem.innerHTML = '<div>&nbsp;</div><div>'+ serialNo +'</div><div>'+ imeiNo +'</div><div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>';
                newElem.className = "item";
                elemContainer.appendChild(newElem);
            }
        }
    },
    cancelCheckPhone: function() {
        var elem, elemContainer;
        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }

        elem = arguments[0];

        elemContainer = elem.parentNode;
        try {
            if (elemContainer.className === "item") {
                elemContainer.children[1].innerHTML = '';
                elemContainer.children[2].innerHTML = '';
            }
            if (isNaN(parseInt(elemContainer.getAttribute("sid")))) {
                elemContainer.parentNode.removeChild(elemContainer);
            }
        } catch (e) {
            console.warn(e);
        }
    },
    getFulfilledSerializabePoItemsListBySid: function() {
        var poSid, itemSid, storeId;
        if (arguments.length < 1) {
            console.warn("no input item sid");
            return;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        itemSid = parseInt(arguments[0]);
        if (isNaN(itemSid)) {
            console.warn("item sid contains non-numeric character");
            return;
        }

        try {
            poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
            if (isNaN(poSid)) {
                throw "";
            }
        } catch (e) {
            console.log("PO ID Error");
            console.log(e);
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getSerializablePoItemsListByItemSidAndPoId.jsp",
            data: {
                itemSid: itemSid,
                poSid: poSid,
                status: 0,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, serialItemList, i, len, obj, innerHTML, flag;
                data = result.data;
                if (!data) return;

                serialItemList = document.getElementById("submit-receive-serial-item-list");
                if (!serialItemList) return;

                innerHTML = [];
                
                flag = WRPAdminApp.pagescript._hideRecvSerialNoFlag;

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        switch (obj.status) {
                            case 0:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                            	if (flag === true) {
                                    innerHTML.push('<div style="display:block;width:50%;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div style="width:50%;"></div>');
                            	} else {
                                    innerHTML.push('<div style="display:none;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div style="width:100%;"></div>');
                            	}
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 1:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                            	if (flag === true) {
                                    innerHTML.push('<div orig="" style="display:block;width:50%;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div orig="" style="width:50%;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                            	} else {
                                    innerHTML.push('<div orig="" style="display:none;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div orig="" style="width:100%;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                            	}
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 2:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                            	if (flag === true) {
                                    innerHTML.push('<div style="display:block;width:50%;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div style="width:50%;">');
                                    innerHTML.push('</div>');
                            	} else {
                                    innerHTML.push('<div style="display:none;">');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div style="width:100%;">');
                                    innerHTML.push('</div>');
                            	}
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 3:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                            	if (flag === true) {
                                    innerHTML.push('<div style="display:block;width:50%;">');
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div style="width:50%;" orig="');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('>');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                            	} else {
                                    innerHTML.push('<div style="display:none;">');
                                    innerHTML.push('</div>');
                                    innerHTML.push('<div style="width:100%;" orig="');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('>');
                                    innerHTML.push(obj.serialNo);
                                    innerHTML.push('</div>');
                            	}
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;

                        }
                    }catch (e) {
                        console.warn(e);
                    }
                }

                serialItemList.innerHTML= innerHTML.join("");
                innerHTML = undefined;
            },
        })
    },
    checkSerialNoInReceiveItemList: function() {
    	var serial = arguments[0];
        var elem, elemContainer, i, len, newElem;

        if (arguments.length < 1) {
            console.warn("toggleSerialNoCheck : no input serialNo");
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getSerialNo.jsp",
            data: {
                storeId: document.getElementById("select-store").value,
                serialNo: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, serialItemList, i, len, obj, innerHTML;

                if(result == -5){
                	alert("Serial exist");
                	return;
                }
                elemContainer = document.getElementById("submit-receive-serial-item-list");

                if (!elemContainer) return;

                if(elemContainer.children.length != 0){
        	        for (i = 0, len = elemContainer.children.length; i < len; i++) {
        	            try {
        	                elem = elemContainer.children[i];
        	                
        	                if (elem.className === "item" && elem.children.length === 3) {
        	                    if (elem.children[0].innerText === serial) {
        	                        elem.children[1].innerHTML = serial;
        	                        break;
        	                    }
        	                }
        	            } catch (e) {
        	                console.warn(e);
        	            }
        	            
        	
        	            if (i == len - 1) {
        	                newElem = document.createElement("div");
        	                newElem.innerHTML = '<div></div><div>'+ serial +'</div><div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>';
        	                newElem.className = "item";
        	                elemContainer.appendChild(newElem);
        	            }
        	        }
                }
                else {
                	newElem = document.createElement("div");
                    newElem.innerHTML = '<div></div><div>'+ serial +'</div><div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>';
                    newElem.className = "item";
                    elemContainer.appendChild(newElem);
                }
                console.log(arguments[1]);
            }
        });	
    },cancelCheckSerialNo: function() {
        var elem, elemContainer;
        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }

        elem = arguments[0];

        elemContainer = elem.parentNode;
        try {
            if (elemContainer.className === "item") {
                elemContainer.children[1].innerHTML = '';
            }
            if (isNaN(parseInt(elemContainer.getAttribute("sid")))) {
                elemContainer.parentNode.removeChild(elemContainer);
            }
        } catch (e) {
            console.warn(e);
        }
    },
    getFulfilledNonSerializabePoItemBySid: function() {
        var poSid, itemSid, storeId;
        if (arguments.length < 1) {
            console.warn("no input item sid");
            return;
        }

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        itemSid = parseInt(arguments[0]);
        if (isNaN(itemSid)) {
            console.warn("item sid contains non-numeric character");
            return;
        }

        try {
            poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);//parseInt(document.getElementById("porder-receive-po-id").innerText);
            if (isNaN(poSid)) {
                throw "";
            }
        } catch (e) {
            console.log("PO ID Error");
            console.log(e);
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getNonSerializablePoItemByItemSidAndPoId.jsp",
            data: {
                itemSid: itemSid,
                poSid: poSid,
                status: 0,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elem;
                data = result.data[0];
                if (!data) return;

                try {
                    elem = document.getElementById("submit-receive-nonserial-item-ffl-qty");
                    elem.innerHTML = data.fulfillQty;
                    elem.value = data.fulfillQty;
                } catch (e) {

                }

                try {
                    elem = document.getElementById("submit-receive-nonserial-item-recv-qty");
                    elem.value = data.receiveQty;
                    elem.setAttribute("sid", data.sid);
                } catch (e) {

                }
            },
        })
    },
    submitReceiveSerializeItems: function() {
        var serialItemList, i, len, param, elem, tmp, storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        if (!confirm("Save data, Are you sure?")) return;

        serialItemList = document.getElementById("submit-receive-serial-item-list");

        if (!serialItemList) return;

        param = {};
        param.poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
        if (isNaN(param.poSid)) {
            console.warn("submitReceiveSerializeItems : PO ID Error");
            return;
        }

        param.itemSid = parseInt(WRPAdminApp.pagescript._selectedItemSid);
        if (isNaN(param.itemSid)) {
            console.warn("submitReceiveSerializeItems : Item SID Error");
            return;
        }

        if(serialItemList.children.length != document.getElementById("ffq"+param.itemSid).innerHTML){ 
        	alert("partially");
        	return;
        }

        param.serialIDs = [];
        for (i = 0, len = serialItemList.children.length; i < len; i++) {
            try {
                elem = serialItemList.children[i];
                tmp = parseInt(elem.getAttribute("sid"));
                if (elem.children.length == 3) {
                    if (elem.children[0].innerText.length > 0 && elem.children[1].innerText.length === 0) {
                        if (isNaN(tmp)) {
                            throw "submitReceiveSerializeItems : po-item sid is not existing";
                        }
                        param.serialIDs.push({ sid: tmp, serialNo: elem.children[0].innerText, status: 2 });
                    } else if (elem.children[0].innerText.length === 0 && elem.children[1].innerText.length > 0) {
                        param.serialIDs.push({ sid: 0, serialNo: elem.children[1].innerText, status: 3 });
                    } else if (elem.children[0].innerText.length > 0 && elem.children[1].innerText.length > 0 && elem.children[0].innerText === elem.children[1].innerText) {
                        if (isNaN(tmp)) {
                            throw "submitReceiveSerializeItems : po-item sid is not existing";
                        }
                        param.serialIDs.push({ sid: tmp, serialNo: elem.children[0].innerText, status: 1 });
                    } else if (elem.children[0].innerText.length === 0 && elem.children[1].innerText.length === 0) {
                        param.serialIDs.push({ sid: tmp, serialNo: elem.children[1].getAttribute("orig"), status: -44 });
                    }
                }
            } catch (e) {
                console.warn(e);
            }
        }

        param.serialIDs = JSON.stringify(param.serialIDs);

        param.storeId = storeId;

        $.ajax({
            url: "ajax/purchase_order/saveReceiveDataSerializable.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup('SubmitReceiveSerialContainer');
                    WRPAdminApp.pagescript.getFulfilledItemListByPoId(WRPAdminApp.pagescript._selectedPoId);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    submitReceiveNonSerializeItem: function() {
        var param, storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        if (!confirm("Save data, Are you sure?")) return;

        param = {};
        param.poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
        if (isNaN(param.poSid)) {
            console.warn("submitReceiveNonSerializeItem : PO ID Error");
            return;
        }

        param.itemSid = parseInt(WRPAdminApp.pagescript._selectedItemSid);
        if (isNaN(param.itemSid)) {
            console.warn("submitReceiveNonSerializeItem : Item SID Error");
            return;
        }

        try {
            param.sid = parseInt(document.getElementById("submit-receive-nonserial-item-recv-qty").getAttribute("sid"));
            if (isNaN(param.sid)) {
                alert("PO Items SID Error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.receiveQty = parseInt(document.getElementById("submit-receive-nonserial-item-recv-qty").value);
            /*170210 jh : partially*/
            if(param.receiveQty != parseInt(document.getElementById("submit-receive-nonserial-item-ffl-qty").value)){
            	alert("Partially !!");
            	return;
            }
            /*partially end*/
            if (isNaN(param.receiveQty)) {
                alert("Recv Qty contains non-numeric characters");
                return;
            }
            
            
        } catch (e) {
            console.warn(e);
            return;
        }

        param.storeId = storeId;

        $.ajax({
            url: "ajax/purchase_order/saveReceiveDataNonSerializable.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup("SubmitReceiveNonSerialContainer");
                    WRPAdminApp.pagescript.getFulfilledItemListByPoId(WRPAdminApp.pagescript._selectedPoId);
                } else {
                    alert("Error : " + result);
                }
            }
        });
        //////////
    },
    setPOrderReceivement: function() {
        var poSid, storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }
        if (!confirm("Are you sure?")) return;

        poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
        if (isNaN(poSid)) {
            console.warn("setPOrderReceivement : PO ID Error");
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/setPOrderReceivement.jsp",
            data: {
                poSid: poSid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete");
                	WRPAdminApp.pagescript.getPurchaseOrderList();
                	WRPAdminApp.pagescript.getApprovalPurchaseOrderList();
                    WRPAdminApp.pagescript.getReceivePurchaseOrderList();
                    WRPAdminApp.pagescript.getCompletePurchaseOrderList();
                    WRPAdminApp.closePopup('POReceivementContainer');
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    informPOrderInfoByPOID: function() {
        var poId, storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        try {
            poId = document.getElementById("inventory-new-po-id").value;
            if (poId.length == 0) {
                alert("Input PO ID");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._inputNewPOId = poId;

        $.ajax({
            url: "ajax/purchase_order/getPOrderInfoByPOId.jsp",
            data: {
                storeId: storeId,
                poId: poId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) {
                    return;
                }
                if (data.sid !== undefined && data.sid !== null) {
                    alert("This Purchase Order already exists");
                    WRPAdminApp.pagescript._inputNewPOId = undefined;
                    return;
                }

                WRPAdminApp.openPopupInPage('newPurchaseOrderContainer');
                WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='newPOInputPOIDContainer']"));
                WRPAdminApp.pagescript.getVendorList();
            }
        });
    },
    nextStepInNewPO: function() {

        if (WRPAdminApp.pagescript._selectedVendorSid < 1) {
            alert("Select Vendor");
            return;
        }

        WRPAdminApp.setViewInPopup("newPurchaseOrderContainer", "selectItems");

        WRPAdminApp.pagescript.getItemListInStore();
    },
    /*170208 jh : get po detail*/
    getPurchasePODetail: function(menu, po_sid) {

    	var elem, list, exel;
    	try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	$.ajax({
            url: "ajax/purchase_order/getPOrderDetailByPoSid.jsp",
            data: {
            	store_id: storeId,
                po_sid: po_sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) {
                    return;
                }
                list = "#jqx-"+menu+"-po-detail";
                console.log(list);
                exel = "#excel-"+menu+"-po-detail"
                //elem = $("#jqx-purchase-po-detail");
                elem = $(list);
    			if (elem) {
    				elem.jqxGrid("clear");
					elem.jqxGrid("addRow", null, data, "last");
    				/*
            		$(exel).click(function () {
            			elem.jqxGrid('exportdata', 'xls', 'excel-po-detail');
                    });
                    */
    			}
                
            },
            error: function(x, o, e) {
            	console.log(x.status + " : "+ o +" : "+e);
            }
        });
    },
    setShipping: function() {
    	/*170213 jh : shipping cost*/
    	if(WRPAdminApp.pagescript._shippingCost < 1){ alert("Can not add.");	return;	}
    	if(document.getElementById("shipping_cost").value == ""){ alert("Fill in the blanks.");	return;	}
    	if(document.getElementById("shipping_des").value == ""){ alert("Fill in the blanks.");	return;	}
    	WRPAdminApp.pagescript._shippingCost = -1;
    	var data ={};
    	data.sid = -1;
    	/*shipping cost end*/
    	data.description = document.getElementById("shipping_des").value;
    	data.itemCost = document.getElementById("shipping_cost").value;
    	data.model = "Shipping";
    	data.qty = "1";
    	
    	$("#added-items").jqxGrid("addRow", null, data, "last");
    	WRPAdminApp.pagescript.finalAmount();
    },
    /*170213 jh : other*/
    setOther: function() {
    	if(document.getElementById("shipping_cost").value == ""){ alert("Fill in the blanks.");	return;	}
    	if(document.getElementById("shipping_des").value == ""){ alert("Fill in the blanks.");	return;	}
    	var date = new Date();
    	var data ={};
    	data.sid = -2;
    	data.description = document.getElementById("shipping_des").value;
    	data.itemCost = document.getElementById("shipping_cost").value;
    	data.model = "Other";
    	data.qty = "1";
    	
    	$("#added-items").jqxGrid("addRow", null, data, "last");
    	WRPAdminApp.pagescript.finalAmount();
    },
    /*other end*/
    newExpress: function() {
    	var date, poid, tmp;
    	date = new Date();
    	
    	poid = [];
    	tmp = date.getHours();
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	poid.push("_");
    	tmp = date.getMinutes();
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	poid.push("_");
    	tmp = date.getDate();
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	tmp = date.getMonth() + 1;
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	poid.push(date.getFullYear());
    	WRPAdminApp.openPopupInPage('newPOInputPOIDContainer');
    	WRPAdminApp.pagescript._shippingCost = 1;
    	WRPAdminApp.pagescript._express = true;
    	$("#inventory-new-po-id").val(poid.join(""));
    	poid = undefined;
    	date = undefined;
    	$("#added-items").jqxGrid("clear");
    	$("#new-purchase-order-total-amount").val("$0.00");
    	$("#shipping_cost").val("");
    	$("#shipping_des").val("");
    },
    newPurchaseOrder: function() {
    	var date, poid, tmp;
    	date = new Date();
    	
    	poid = [];
    	tmp = date.getHours();
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	poid.push("_");
    	tmp = date.getMinutes();
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	poid.push("_");
    	tmp = date.getDate();
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	tmp = date.getMonth() + 1;
    	if (tmp < 10) {
    		poid.push("0");    		
    	}
    	poid.push(tmp);
    	poid.push(date.getFullYear());
    	WRPAdminApp.pagescript._express = false;
    	WRPAdminApp.openPopupInPage('newPOInputPOIDContainer');
    	WRPAdminApp.pagescript._shippingCost = 1;
    	$("#inventory-new-po-id").val(poid.join(""));
    	poid = undefined;
    	date = undefined;
    	$("#added-items").jqxGrid("clear");
    	$("#new-purchase-order-total-amount").val("$0.00");
    	$("#shipping_cost").val("");
    	$("#shipping_des").val("");
    	
    },
    finalAmount: function() {
	    rows = $("#added-items").jqxGrid('getboundrows');
		var rowscount = $("#added-items").jqxGrid('getdatainformation').rowscount;
		
		var cost = 0;
		
		for(var i=0; i<rowscount; i++){
			cost = parseFloat(cost) + parseFloat(rows[i].qty)*parseFloat(rows[i].itemCost);
		}
		document.getElementById("new-purchase-order-total-amount").value = "$"+cost.toFixed(2);
    },
    skipFulfill: function(po_item_sid) {
		
		var storeId;
	
	    storeId = WRPAdminApp.pagescript._selectedStoreId;
	
	    if (storeId === undefined || storeId.length === 0) {
	        try {
	            storeId = document.getElementById("select-store").value;
	            if (storeId.length == 0) {
	                return;
	            }
	        } catch (e) {
	            return;
	        }
	    }
	
	    $.ajax({
	        url: "ajax/purchase_order/setPOrderFulfillSkip.jsp",
	        data: {
	            storeId: storeId,
	            poItemSid: po_item_sid,
	            odrQty: document.getElementById("order"+po_item_sid).innerHTML
	        },
	        method: "POST",
	        dataType: "json",
	        success: function(result) {
	        	console.log(po_item_sid+""+result);
	            document.getElementById(po_item_sid).innerHTML = result;
	            alert("Complete");
	        }
	    });	
    }
};