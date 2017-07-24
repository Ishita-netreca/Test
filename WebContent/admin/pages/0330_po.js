/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
	init: function() {
    	var components, editrow;
    	WRPComponents('div[pagename="purchase_order"] > .page-submenu-container > .submenu[panelname="purchase_order"]').addShadowedImage('img/icon/order_01.png');
    	
    	components = $("#jqx-po-Tabs");
    	
    	if (components) {
    		components.on("selected", WRPAdminApp.pagescript.onPOTabsSelected);
    	}

    	components = $('#jqx-po-list');
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
    					{ name: "total_ordered_qty", type: "string" },
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
				   { text: "Qty", datafield: "total_ordered_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});

    		components.on("rowselect", WRPAdminApp.pagescript.onPOListRowClick);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.onDblClickInPOList);    		
    	}    	

    	components = $('#jqx-po-detail');
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
    	
    	components = $('#jqx-po-detail-costs-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "type", type: "number" },
    					// hidden
    					{ name: "type_str", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "type", datafield: "type", hidden: true },
    				{ text: "Type", datafield: "type_str", width: "40%"},
    				{ text: "Description", datafield: "description", width: "40%"},
    				{ text: "Cost", datafield: "cost", width: "20%", cellsformat:"c2"}
				]
    		});
    	}

    	components = $('#jqx-order-po-list');
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
    					{ name: "total_ordered_qty", type: "string" },
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
				   { text: "Qty", datafield: "total_ordered_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});
    		/* 170208 jh*/
    		components.on("rowselect", WRPAdminApp.pagescript.onOrderPOListRowClick);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.onDblClickInPOList);   
    		/**/
    	}
    	    	
    	components = $('#jqx-order-po-detail');
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

    	
    	components = $('#jqx-order-po-detail-costs-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "type", type: "number" },
    					// hidden
    					{ name: "type_str", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "type", datafield: "type", hidden: true },
    				{ text: "Type", datafield: "type_str", width: "40%"},
    				{ text: "Description", datafield: "description", width: "40%"},
    				{ text: "Cost", datafield: "cost", width: "20%", cellsformat:"c2"}
				]
    		});
    	}
	

    	components = $('#jqx-fulfill-po-list');
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
    					{ name: "total_ordered_qty", type: "string" },
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
				   { text: "Qty", datafield: "total_ordered_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});
    		/* 170208 jh*/
    		components.on("rowselect", WRPAdminApp.pagescript.onFulfillPOListRowClick);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.onDblClickInPOList);   
    		/**/
    	}
    	
    	components = $('#jqx-fulfill-po-detail');
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
    	
    	components = $('#jqx-fulfill-po-detail-costs-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "type", type: "number" },
    					// hidden
    					{ name: "type_str", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "type", datafield: "type", hidden: true },
    				{ text: "Type", datafield: "type_str", width: "40%"},
    				{ text: "Description", datafield: "description", width: "40%"},
    				{ text: "Cost", datafield: "cost", width: "20%", cellsformat:"c2"}
				]
    		});
    	}


    	components = $('#jqx-recv-po-list');
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
    					{ name: "total_ordered_qty", type: "string" },
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
				   { text: "Qty", datafield: "total_ordered_qty", width: "10%" },
				   { text: "Status", datafield: "status_str", width: "10%" },
					{ text: "Item", datafield: "item_info", width: "25%" }
				]
    		});
    		/* 170208 jh*/
    		components.on("rowselect", WRPAdminApp.pagescript.onReceivePOListRowClick);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.onDblClickInPOList);   
    		/**/
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
    	
    	components = $('#jqx-receive-po-detail-costs-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "type", type: "number" },
    					// hidden
    					{ name: "type_str", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "cost", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "type", datafield: "type", hidden: true },
    				{ text: "Type", datafield: "type_str", width: "40%"},
    				{ text: "Description", datafield: "description", width: "40%"},
    				{ text: "Cost", datafield: "cost", width: "20%", cellsformat:"c2"}
				]
    		});
    	}


    	components = $('#po-express-po-window');
    	if (components) {
    		components.jqxWindow("width", 1000);
    		components.jqxWindow("height", 800);
    		components.jqxWindow("resizable", false);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 400) });
    	}
    	
    	components = $("#po-express-vendor-list");
    	if (components) {
    		//components.jqxComboBox("placeHolder", "SELECT VENDOR");
    	//	components.on("change", WRPAdminApp.pagescript.onExpressPOVendorChange);
    	}
    	
    	components = $("#po-express-store-items-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "140",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					// hidden
    					{ name: "item_code", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "item_cost", type: "number" },
    					{ name: "in_stock", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,    	        
    			columns: [
				   { datafield: "sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: "Item Code", datafield: "item_code", width: "120px" },
				   { text: "Model", datafield: "model", width: "210px" },
				   { text: "Description", datafield: "description", width: "34%"},
				   { text: "SKU", datafield: "sku", width: "100px" },
				   { text: "Cost", datafield: "item_cost", width: "80px", cellsformat: "c2" },
				   { text: "In Stock", datafield: "in_stock", width: "8%" },
				   { text: "", columntype: 'button', width: "5%", cellsrenderer: function(){ return "Select"; }, buttonclick: WRPAdminApp.pagescript.onExpressPOStoreItemsListAddButtonClick }
				   //,{ text: "Add", datafield: "", width: "5%", cellsRenderer: function (row, column, value, rowData) { return '<div class="add-item-btn"></div>'; } }
				]
    		});
    		
    		//components.on("rowclick", WRPAdminApp.pagescript.onExpressPOStoreItemsListRowClick);
    	}
    	
    	components = $("#po-express-added-items-list");
    	if (components) {
    		
    		var cellsrenderer = function(row, column, value, data){
				console.log(data);
				if (data.item_type > 0) {
	                return '<div class="remove-invoice-item-btn"></div>'
	            }
			};    		
    		
    		components.jqxGrid({
    			width: "99.8%",
    			height: "166",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "item_sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					// hidden
    					{ name: "item_code", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "item_cost", type: "number" },
    					{ name: "pre_qty", type: "number" },
    					{ name: "qty", type: "number" },
    					{ name: "sub_total", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,    	  
    	        editable: true,
    			columns: [
				   { datafield: "item_sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: "Item Code", datafield: "item_code", width: "120px", editable: false },
				   { text: "SKU", datafield: "sku", width: "100px", editable: false },
				   { text: "Description", datafield: "description", width: "33.5%", editable: false},
				   { text: "Cost", datafield: "item_cost", width: "70px", cellsformat: "c2", editable: false },
				   { text: "Qty", datafield: "pre_qty", width: "9%", editable: true },
				   { text: "Added IMEI", datafield: "qty", width: "9%", editable: false },
				   { text: "SubTotal", datafield: "sub_total", width: "70px", cellsformat: "c2", editable: false},
				   { text: "", columntype: 'button', width: "7%", editable: false, cellsrenderer: function(){ if(arguments[5] && arguments[5].item_type < 3) { return "Add-IMEI"; } else { return ""; }  }, buttonclick: WRPAdminApp.pagescript.onExpressPOAddedItemsListConfirmButtonClick },
				   { text: "", columntype: 'button', width: "5%", editable: false, cellsrenderer: function(){ return "Delete"; }, buttonclick: WRPAdminApp.pagescript.onExpressPOAddedItemsListDeleteButtonClick }
				   //,{ text: "", datafield: "", width: "10%", cellsRenderer: function (row, column, value, rowData) { return '<div class="confirm-item-recv-btn" title="Confirm"></div><div class="delete-added-item-btn" title="Delete"></div>'; } }
				]
    		});
    		components.on("cellendedit", function(event) { if(event.args.datafield==="pre_qty") { setTimeout(function() { WRPAdminApp.POModule.printExpressPOItemsList('po-express-added-items-list'); document.getElementById("po-express-total-cost").innerHTML = "$"+WRPAdminApp.POModule.getExpressPOTotalCost().toFixed(2); }, 500); } });
    		//components.on("rowclick", WRPAdminApp.pagescript.onExpressPOAddedItemsListRowClick);
    	}
    	
    	/*
    	var type;
    	components.on('rowclick', function (event) {
    		console.log(event.args.row);
    		type = event.args.row.bounddata.item_type;
    	});
    	
    	components.on('cellvaluechanged', function (event) {
    		console.log(event.args);
    		//rowindex, newvalue
            $("#po-express-added-items-list").jqxGrid('setcellvalue', event.args.rowindex, "qty", event.args.newvalue);
            
    	});
    	*/
    	components = $("#po-express-costs-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "88",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "type", type: "number" },
    					// hidden
    					{ name: "type_str", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "cost", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: false,
    	        groupable: false,
    	        columnsresize:true,    	        
    			columns: [
				   { datafield: "type", hidden:true },
				   { text: "Type", datafield: "type_str", width: "30%"},
				   { text: "Description", datafield: "description", width: "49.5%"},
				   { text: "Cost", datafield: "cost", width: "10%", cellsformat: "c2" },
				   { text: "", columntype: 'button', width: "10%", cellsrenderer: function(){ return "Delete"; }, buttonclick: function() { try{$("#po-express-costs-list").jqxGrid("deleterow",arguments[0]);}catch(e){} } }
				]
    		});
    		
    		components.on("rowclick", WRPAdminApp.pagescript.onExpressPOAddedItemsListRowClick);
    	}

    	components = $('#po-express-confirm-serialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 650);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 210) , y: ((window.innerHeight * 0.5) - 300) });
    	}

    	components = $('#po-express-confirm-nonserialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 300);
    		components.jqxWindow("height", 320);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 150) , y: ((window.innerHeight * 0.5) - 160) });
    	}

    	components = $('#po-new-po-window');
    	if (components) {
    		components.jqxWindow("width", 400);
    		components.jqxWindow("height", 100);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 200) , y: ((window.innerHeight * 0.5) - 50) });
    	}

    	components = $('#new-po-vendor-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "450",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "vendor_id", type: "string" },
    					{ name: "vendor_name", type: "string" }
    				]
    			}),
    			sortable: true,
    	        groupable: false,    	        
    			columns: [
				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "Vendor ID", datafield: "vendor_id", width: "50%"},
				   { text: "Vendor Name", datafield: "vendor_name", width: "50%"}
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.onVendorSelectedInNewPO);
    	} 

    	
    	components = $("#new-po-store-items-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "248",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					// hidden
    					{ name: "item_code", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "item_cost", type: "number" },
    					{ name: "in_stock", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,        
    			columns: [
				   { datafield: "sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: "Item Code", datafield: "item_code", width: "20%" },
				   { text: "Model", datafield: "model", width: "20%" },
				   { text: "Description", datafield: "description", width: "20%"},
				   { text: "SKU", datafield: "sku", width: "15%" },
				   { text: "Cost", datafield: "item_cost", width: "10%", cellsformat: "c2" },
				   { text: "In Stock", datafield: "in_stock", width: "10%" },
				   { text: "", columntype: 'button', width: "5%", cellsrenderer: function(){ return "Add"; }, buttonclick: WRPAdminApp.pagescript.onNewPOStoreItemsListAddButtonClick }
				   //{ text: "Add", datafield: "", width: "5%", cellsRenderer: function (row, column, value, rowData) { return '<div class="add-item-btn"></div>'; } }
				]
    		});
    		
    		components.on("rowclick", WRPAdminApp.pagescript.onNewPOStoreItemsListRowClick);
    	}
    	
    	components = $("#new-po-added-items-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "160",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "item_sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					// hidden
    					{ name: "item_code", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "item_cost", type: "number" },
    					{ name: "qty", type: "number" },
    					{ name: "sub_total", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true, 
				editable: true, 	      	        
    			columns: [
				   { datafield: "item_sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: "Item Code", datafield: "item_code", width: "20%", editable: false },
				   { text: "SKU", datafield: "sku", width: "20%", editable: false },
				   { text: "Description", datafield: "description", width: "25%", editable: false},
				   { text: "Cost", datafield: "item_cost", width: "10%", cellsformat: "c2", editable: false },
				   { text: "Qty", datafield: "qty", width: "5%" },
				   { text: "Sub Total", datafield: "sub_total", width: "10%", cellsformat: "c2", editable: false },
				   { text: "", columntype: 'button', width: "10%", cellsrenderer: function(){ return "Delete"; }, buttonclick: WRPAdminApp.pagescript.onNewPOAddedItemsListDeleteButtonClick }
				   //{ text: "", datafield: "", width: "5%", editable: false, cellsRenderer: function (row, column, value, rowData) { return '<div class="delete-added-item-btn" title="Delete"></div>'; } }
				]
    		});
    		
    		components.on("rowclick", WRPAdminApp.pagescript.onNewPOAddedItemsListRowClick);
    		components.on("cellendedit", WRPAdminApp.pagescript.onNewPOAddedItemsListCellEndEdit);
    	}
    	
    	components = $("#new-po-costs-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "88",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "type", type: "number" },
    					// hidden
    					{ name: "type_str", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "cost", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: false,
    	        groupable: false,
    	        columnsresize:true,    	        
    			columns: [
				   { datafield: "type", hidden:true },
				   { text: "Type", datafield: "type_str", width: "30%"},
				   { text: "Description", datafield: "description", width: "49.5%"},
				   { text: "Cost", datafield: "cost", width: "10%", cellsformat: "c2" },
				   { text: "", columntype: 'button', width: "10%", cellsrenderer: function(){ return "Delete"; }, buttonclick: function() { try{$("#new-po-costs-list").jqxGrid("deleterow",arguments[0]);}catch(e){} } }
				]
    		});
    		
    		components.on("rowclick", WRPAdminApp.pagescript.onExpressPOAddedItemsListRowClick);
    	}

    	components = $('#po-fulfillment-window');
    	if (components) {
    		components.jqxWindow("width", 700);
    		components.jqxWindow("height", 500);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 350) , y: ((window.innerHeight * 0.5) - 250) });
    	}
    	
    	components = $("#po-fulfill-po-items-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.5%",
    			height: "380px",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "item_sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					// hidden
    					{ name: "item_code", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "order_qty", type: "number" },
    					{ name: "fulfill_qty", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true, 
				editable: false, 	      	        
    			columns: [
				   { datafield: "item_sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: "Item Code", datafield: "item_code", width: "20%", editable: false },
				   { text: "SKU", datafield: "sku", width: "20%", editable: false },
				   { text: "Description", datafield: "description", width: "35%", editable: false},
				   { text: "Odr Qty", datafield: "order_qty", width: "10%" },
				   { text: "Ffl Qty", datafield: "fulfill_qty", width: "10%" },
				   { text: "", datafield: "", width: "5%", editable: false, cellsRenderer: function (row, column, value, rowData) { return '<div class="confirm-item-btn" title="Confirm"></div>'; } }
				]
    		});
    		
    		components.on("rowclick", WRPAdminApp.pagescript.onPOItemsListInFulfillRowClick);
    	}

    	components = $('#po-fulfill-serialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 420);
    		components.jqxWindow("height", 420);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 210) , y: ((window.innerHeight * 0.5) - 210) });
    	}

    	components = $('#po-fulfill-nonserialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 300);
    		components.jqxWindow("height", 350);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 150) , y: ((window.innerHeight * 0.5) - 175) });
    	}

    	components = $('#po-receivement-window');
    	if (components) {
    		components.jqxWindow("width", 700);
    		components.jqxWindow("height", 500);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 350) , y: ((window.innerHeight * 0.5) - 250) });
    	}
    	
    	components = $("#po-receive-po-items-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.5%",
    			height: "380px",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "item_sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					// hidden
    					{ name: "item_code", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "fulfill_qty", type: "number" },
    					{ name: "receive_qty", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true, 
				editable: false, 	      	        
    			columns: [
				   { datafield: "item_sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: "Item Code", datafield: "item_code", width: "20%", editable: false },
				   { text: "SKU", datafield: "sku", width: "20%", editable: false },
				   { text: "Description", datafield: "description", width: "35%", editable: false},
				   { text: "Ffl Qty", datafield: "fulfill_qty", width: "10%" },
				   { text: "Recv Qty", datafield: "receive_qty", width: "10%" },
				   { text: "", datafield: "", width: "5%", editable: false, cellsRenderer: function (row, column, value, rowData) { return '<div class="confirm-item-btn" title="Confirm"></div>'; } }
				]
    		});
    		
    		components.on("rowclick", WRPAdminApp.pagescript.onPOItemsListInReceiveRowClick);
    	}

    	components = $('#po-receive-serialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 420);
    		components.jqxWindow("height", 420);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 210) , y: ((window.innerHeight * 0.5) - 210) });
    	}

    	components = $('#po-receive-nonserialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 300);
    		components.jqxWindow("height", 350);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 150) , y: ((window.innerHeight * 0.5) - 175) });
    	}
    	
    	WRPAdminApp.POModule.getPOList("jqx-po-list");
    },
    onPOTabsSelected: function() {
    	var tab_idx;
    	
    	try {
    		tab_idx = $("#jqx-po-Tabs").jqxTabs("selectedItem");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	switch (tab_idx) {
    	case 0:
    		try {
    			$("#jqx-po-detail").jqxGrid("clear");
    		} catch (e) {
    			
    		}
        	WRPAdminApp.POModule.getPOList("jqx-po-list");
    		break;
    	case 1:
    		try {
    			$("#jqx-order-po-detail").jqxGrid("clear");
    		} catch (e) {
    			
    		}
        	WRPAdminApp.POModule.getPOList("jqx-order-po-list",0);
    		break;
    	case 2:
    		try {
    			$("#jqx-fulfill-po-detail").jqxGrid("clear");
    		} catch (e) {
    			
    		}
        	WRPAdminApp.POModule.getPOList("jqx-fulfill-po-list",2);
    		break;
    	case 3:
    		try {
    			$("#jqx-receive-po-detail").jqxGrid("clear");
    		} catch (e) {
    			
    		}
        	WRPAdminApp.POModule.getPOList("jqx-recv-po-list",4);
    		break;
    	}
    },
    printPOCount: function(status) {
    	try {
    		if (status !== undefined) {
    			switch (status) {
    			case 0:
        			document.getElementById("inventory-total-order-count").innerHTML = WRPAdminApp.POModule._totalOrderedPOCount;
    				break;
    			case 2:
    				document.getElementById("inventory-total-fulfill-count").innerHTML = WRPAdminApp.POModule._totalFulfilledPOCount;
    				break;
    			case 4:
    				break;
    			}
    		} else {
    			document.getElementById("inventory-total-order-count").innerHTML = WRPAdminApp.POModule._totalOrderedPOCount;
    			document.getElementById("inventory-total-fulfill-count").innerHTML = WRPAdminApp.POModule._totalFulfilledPOCount;
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    onPOListRowClick: function(event) {
    	WRPAdminApp.POModule.getPODetail("jqx-po-detail", "jqx-po-detail-costs-list",event.args.row.sid);
    },
    onOrderPOListRowClick: function(event) {
    	WRPAdminApp.POModule.getPODetail("jqx-order-po-detail", "jqx-order-po-detail-costs-list", event.args.row.sid);
    },
    onFulfillPOListRowClick: function(event) {
    	WRPAdminApp.POModule.getPODetail("jqx-fulfill-po-detail", "jqx-fulfill-po-detail-costs-list", event.args.row.sid);
    },
    onReceivePOListRowClick: function(event) {
    	WRPAdminApp.POModule.getPODetail("jqx-receive-po-detail", "jqx-receive-po-detail-costs-list", event.args.row.sid);
    },    
    openExpressPOWindow: function() { 
    	
    	$("#po-express-store-items-list").jqxGrid("clear");
    	$("#po-express-added-items-list").jqxGrid("clear");
    	$("#po-express-search-item-keyword").val("");
    	$("#po-express-cost-description").val("");
    	$("#po-express-cost-cost").val("");
    	
    	try {
    		document.getElementById("po-express-new-po-id").value = WRPAdminApp.POModule.generateNewPOID();
    	} catch (e) {
    		console.warn(e);
    	}
    	
    	WRPAdminApp.POModule.getVendorList("po-express-vendor-list", "c");
    	//WRPAdminApp.POModule.getStoreItemsList("po-express-store-items-list");
    	
    	WRPAdminApp.POModule.resetPOExpressData("po-express-added-items-list");
    	$("#po-express-po-window").jqxWindow("open");
    	
    },
    onExpressPOVendorChange: function(event) {
    	var item = event.args.item;

    	WRPAdminApp.POModule.resetPOExpressData("po-express-added-items-list");
    	WRPAdminApp.POModule.getStoreItemsList("po-express-store-items-list", item.value);
    },
    onExpressPOStoreItemsListRowClick: function(event) {
    	var item, target;
    	
    	target = event.args.originalEvent.target;
    	
    	try {
    		if (target.className === "add-item-btn") { // Add item
    	    	item = event.args.row.bounddata;
    	    	WRPAdminApp.POModule.addPOExpressItem("po-express-added-items-list", item);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    onExpressPOStoreItemsListAddButtonClick: function(index) {
    	var item;
    	
    	item = $("#po-express-store-items-list").jqxGrid("getrowdata", index);
    	
    	if (item !== undefined) {
        	WRPAdminApp.POModule.addPOExpressItem("po-express-added-items-list", item);    
    	}		
    },
    onExpressPOAddedItemsListRowClick: function(event) {
    	var item, target;
    	
    	target = event.args.originalEvent.target;
    	
    	try {
    		if (target.className === "confirm-item-recv-btn") { // Confirm Item Recv
    	    	item = event.args.row.bounddata;
    	    	
    	    	console.log(item);
    	    	
    	    	WRPAdminApp.POModule.confirmAddedItemInExpress(item.item_sid,"po-express-confirm-serialized-item-window","po-express-confirm-nonserialized-item-window");
    		} else if (target.className === "delete-added-item-btn") { // Delete Added Item
    	    	item = event.args.row.bounddata;
    	    	WRPAdminApp.POModule.deletePOExpressItem("po-express-added-items-list", item);
    	    	document.getElementById("po-express-total-cost").innerHTML = "$"+WRPAdminApp.POModule.getExpressPOTotalCost().toFixed(2);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    onExpressPOAddedItemsListConfirmButtonClick: function(index) {
    	var item;
    	
    	item = $("#po-express-added-items-list").jqxGrid("getrowdata", index);
   		if (item.pre_qty == 0 && $("#textboxeditorpo-express-added-items-listpre_qty").length) item.pre_qty = $("#textboxeditorpo-express-added-items-listpre_qty").val();

    	if(item.item_type != 0) return;
    	if(item.pre_qty === undefined || item.pre_qty < 1) {	alert("Input Qty. \nQty must be greater than 0.");	return;	}
    	if(item.pre_qty == item.qty || item.pre_qty < item.qty) {	alert("Quantity exceeded..");	return;	}
    	console.log(item);
    	if (item !== undefined) {
    		WRPAdminApp.POModule.confirmAddedItemInExpress(item.item_sid,"po-express-confirm-serialized-item-window","po-express-confirm-nonserialized-item-window");
    		document.getElementById("input_qty").innerHTML = item.pre_qty;
    	}
    },
    onExpressPOAddedItemsListDeleteButtonClick: function(index) {
    	var item;
    	
    	item = $("#po-express-added-items-list").jqxGrid("getrowdata", index);
    	
    	if (item !== undefined) {
    		WRPAdminApp.POModule.deletePOExpressItem("po-express-added-items-list", item);
	    	document.getElementById("po-express-total-cost").innerHTML = "$"+WRPAdminApp.POModule.getExpressPOTotalCost().toFixed(2);
    	}
    },
    inputSerialNoInExpresss: function(serial_no) {
    	
		if (serial_no === undefined || serial_no.length < 1) {
			alert("Input Serial no.");
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
                if(parseInt(document.getElementById("scan_qty").innerHTML) == parseInt(document.getElementById("input_qty").innerHTML)) { alert("Quantity exceeded."); return; }
                if($("#sn"+serial_no).val() != undefined) { alert("exist."); return; }
        		WRPAdminApp.POModule.inputSerialNo(serial_no, 'po-express-confirm-serial-no-list','<div class=\'item\'><div class=\'serial\' id=\'sn'+serial_no+'\'>{serial}</div><div class=\'remove-item-btn\' onclick=\'this.parentNode.parentNode.removeChild(this.parentNode);document.getElementById("scan_qty").innerHTML = parseInt(document.getElementById("scan_qty").innerHTML)-1;\'></div></div>');
        		document.getElementById("scan_qty").innerHTML = parseInt(document.getElementById("scan_qty").innerHTML)+1;

            }
        });
    },
    addCostInExpress: function() {
    	var elem, data, selected;
    	    	
    	data = {};
    	
    	elem = $("#po-express-cost-type");
    	
    	if (!elem) {
    		data = undefined;
    		return;
    	}
    	
    	selected = elem.jqxComboBox("getSelectedItem");
    	
    	data.type = parseInt(selected.value);
    	if (isNaN(data.type)) {
    		data = undefined;
    		return;
    	}
    	
    	data.type_str = selected.label;
    	
    	elem = $("#po-express-cost-description");
    	
    	if (!elem) {
    		data = undefined;
    		return;
    	}
    	
    	data.description = elem.jqxInput("val");
    	if (data.description === undefined || data.description.length == 0) {
    		alert("Input Description");
    		elem.jqxInput("focus");
    		data = undefined;
    		return;
    	}
    	
    	elem = $("#po-express-cost-cost");
    	
    	if (!elem) {
    		data = undefined;
    		return;
    	}
    	
    	data.cost = elem.jqxInput("val");
    	if (data.cost === undefined || data.cost.length == 0) {
    		alert("Input Cost");
    		elem.jqxInput("focus");
    		data = undefined;
    		return;
    	}
    	
    	data.cost = parseFloat(data.cost.replace("$",""));
    	
    	if (isNaN(data.cost)) {
    		alert("Cost contains non-numeric characters");
    		elem.jqxInput("focus");
    		data = undefined;
    		return;
    	}
    	
    	elem = $("#po-express-costs-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    		elem.jqxGrid("refresh");
    	}
    },    
    onExpressSerialNoExcelFileSelected: function(event) {
    	WRPAdminApp.POModule.getSerialNoListFromExcelFile(event.target, "po-express-confirm-serial-no-list", '<div class="item"><div class="serial">{serial}</div><div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div></div>');
    },
    submitExpressPOSerialItem: function() {
    	if (WRPAdminApp.POModule.submitSerialItemDataInExpress("po-express-confirm-serial-no-list","po-express-added-items-list")) {
    		alert("Complete");
    		$('#po-express-confirm-serialized-item-window').jqxWindow('close');
	    	document.getElementById("po-express-total-cost").innerHTML = "$"+WRPAdminApp.POModule.getExpressPOTotalCost().toFixed(2);
    	}
    },
    submitExpressPONonSerialItem: function() {
    	if (WRPAdminApp.POModule.submitNonSerialItemDataInExpress(document.getElementById("po-express-confirm-nonserialized-item-qty").value,"po-express-added-items-list")) {
    		alert("Complete");
    		$('#po-express-confirm-nonserialized-item-window').jqxWindow('close');
    		document.getElementById("po-express-total-cost").innerHTML = "$"+WRPAdminApp.POModule.getExpressPOTotalCost().toFixed(2);
    	}
    },
    openNewPOWindow: function() {		
		WRPAdminApp.pagescript.showPageInNewPOWindow(1);
		WRPAdminApp.POModule.setSelectedVendorSidInNewPO(0);
		$("#new-po-vendor-list").jqxGrid("clear");
    	$("#po-new-po-window").jqxWindow("open");
    },
    showPageInNewPOWindow: function(target_page_no, current_page_no) { // target_page_no, (Optional)current_page_no
    	var newPOWindow, newPOWindowContent, i, len, obj;
    	
    	if (target_page_no === undefined) {
    		return;
    	}
    	
    	newPOWindow = $("#po-new-po-window");
    	if (!newPOWindow) {
    		return;
    	}
    	
    	newPOWindowContent = document.getElementById("po-new-po-contents");
    	if (!newPOWindowContent) {
    		return;
    	}
    	
    	switch (target_page_no) {
    	case 1:
        	try {
        		document.getElementById("new-po-new-po-id").value = WRPAdminApp.POModule.generateNewPOID();
        	} catch (e) {
        		console.warn(e);
        	}
    		newPOWindow.jqxWindow({width:400,height:100,position: {x: ( (window.innerWidth * 0.5) - 200 ), y: ( (window.innerHeight * 0.5) - 50 ) }});    		
    		break;
    	case 2:
    		WRPAdminApp.POModule.setSelectedVendorSidInNewPO(0);
        	WRPAdminApp.POModule.getVendorList("new-po-vendor-list", "g");
    		newPOWindow.jqxWindow({width:800,height:600,position: {x: ( (window.innerWidth * 0.5) - 400 ), y: ( (window.innerHeight * 0.5) - 300 ) }});    		
    		break;
    	case 3:
    		if (!WRPAdminApp.POModule.getSelectedVendorSidInNewPO()) {
    			alert("Select Vendor");
    			return;
    		}
        	//WRPAdminApp.POModule.getStoreItemsList("new-po-store-items-list", WRPAdminApp.POModule.getSelectedVendorSidInNewPO());
    		newPOWindow.jqxWindow({width:800,height:820,position: {x: ( (window.innerWidth * 0.5) - 400 ), y: ( (window.innerHeight * 0.5) - 410 ) }});
    		break;
    	}
    	
    	for (i = 1, len = newPOWindowContent.children.length + 1; i < len; i++) {
    		obj = newPOWindowContent.children[i-1];
    		if (i === target_page_no) {
    			obj.style.display = "block";
    		} else {
    			obj.style.display = "none";
    		}
    	}
    },
    onVendorSelectedInNewPO: function(event) {
    	var row = event.args.row;
    	
    	if (row.sid !== undefined) {
    		if (row.sid !== WRPAdminApp.POModule.getSelectedVendorSidInNewPO()) {
        		WRPAdminApp.POModule.resetNewPOData("new-po-added-items-list");
    		}
    		WRPAdminApp.POModule.setSelectedVendorSidInNewPO(row.sid);
    	}
    },
    onNewPOStoreItemsListRowClick: function(event) {
    	var item, target;
    	
    	target = event.args.originalEvent.target;
    	
    	try {
    		if (target.className === "add-item-btn") { // Add item
    	    	item = event.args.row.bounddata;
    	    	WRPAdminApp.POModule.addnewPOItem("new-po-added-items-list", item);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    onNewPOStoreItemsListAddButtonClick: function(index) {
    	var item;
    	
    	item = $("#new-po-store-items-list").jqxGrid("getrowdata", index);
    	
    	if (item !== undefined) {
        	WRPAdminApp.POModule.addnewPOItem("new-po-added-items-list", item);    
	    	document.getElementById("new-po-total-cost").innerHTML = "$"+WRPAdminApp.POModule.getNewPOTotalCost().toFixed(2);
    	}		
    },
    onNewPOAddedItemsListRowClick: function(event) {
    	var item, target;
    	
    	target = event.args.originalEvent.target;
    	
    	try {
    		if (target.className === "delete-added-item-btn") { // Delete Added Item
    	    	item = event.args.row.bounddata;
    	    	WRPAdminApp.POModule.deleteNewPOItem("new-po-added-items-list", item);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    onNewPOAddedItemsListDeleteButtonClick: function(index) {
    	var item;
    	
    	item = $("#new-po-added-items-list").jqxGrid("getrowdata", index);
    	
    	if (item !== undefined) {
    		WRPAdminApp.POModule.deleteNewPOItem("new-po-added-items-list", item);
	    	document.getElementById("new-po-total-cost").innerHTML = "$"+WRPAdminApp.POModule.getNewPOTotalCost().toFixed(2);
    	}
    },
    onNewPOAddedItemsListCellEndEdit: function(event) {
    	var value;
    	try {
    		if (event.args.datafield === "qty") {
        		value = parseInt(event.args.value);
        		if (isNaN(value)) {
        			alert("Qty contains non-numeric characters");
        			return;
        		}
        		
        		WRPAdminApp.POModule.setQtyInNewPOAddedItem("new-po-added-items-list", event.args.row.item_sid, value);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    addCostInNewPO: function() {
    	var elem, data, selected;
    	    	
    	data = {};
    	
    	elem = $("#new-po-cost-type");
    	
    	if (!elem) {
    		data = undefined;
    		return;
    	}
    	
    	selected = elem.jqxComboBox("getSelectedItem");
    	
    	data.type = parseInt(selected.value);
    	if (isNaN(data.type)) {
    		data = undefined;
    		return;
    	}
    	
    	data.type_str = selected.label;
    	
    	elem = $("#new-po-cost-description");
    	
    	if (!elem) {
    		data = undefined;
    		return;
    	}
    	
    	data.description = elem.jqxInput("val");
    	if (data.description === undefined || data.description.length == 0) {
    		alert("Input Description");
    		elem.jqxInput("focus");
    		data = undefined;
    		return;
    	}
    	
    	elem = $("#new-po-cost-cost");
    	
    	if (!elem) {
    		data = undefined;
    		return;
    	}
    	
    	data.cost = elem.jqxInput("val");
    	if (data.cost === undefined || data.cost.length == 0) {
    		alert("Input Cost");
    		elem.jqxInput("focus");
    		data = undefined;
    		return;
    	}
    	
    	data.cost = parseFloat(data.cost.replace("$",""));
    	
    	if (isNaN(data.cost)) {
    		alert("Cost contains non-numeric characters");
    		elem.jqxInput("focus");
    		data = undefined;
    		return;
    	}
    	
    	elem = $("#new-po-costs-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    		elem.jqxGrid("refresh");
    	}
    },
    onDblClickInPOList: function(event) {
    	WRPAdminApp.POModule.selectPO(event.args.row.bounddata.sid, WRPAdminApp.pagescript.callbackSelectPOInFulfill, WRPAdminApp.pagescript.callbackSelectPOInReceive);
    },
    callbackSelectPOInFulfill: function(po) {
    	if (po === undefined) {
    		return;
    	}
    	if (po.po_id !== undefined) {
        	try {
        		document.getElementById("po-fulfill-po-id").innerHTML = po.po_id;
        	} catch (e) {
        		console.warn(e);
        		return;
        	}
    	}
    	if (po.vendor_id !== undefined) {
        	try {
        		document.getElementById("po-fulfill-vendor-id").innerHTML = po.vendor_id;
        	} catch (e) {
        		console.warn(e);
        		return;
        	}
    	}    	
    	
    	$("#po-fulfillment-window").jqxWindow("open");
    	
    	WRPAdminApp.POModule.getPOItems(po.sid, "po-fulfill-po-items-list");
    },
    callbackSelectPOInReceive: function(po) {
    	if (po === undefined) {
    		return;
    	}
    	if (po.po_id !== undefined) {
        	try {
        		document.getElementById("po-receive-po-id").innerHTML = po.po_id;
        	} catch (e) {
        		console.warn(e);
        		return;
        	}
    	}
    	if (po.vendor_id !== undefined) {
        	try {
        		document.getElementById("po-receive-vendor-id").innerHTML = po.vendor_id;
        	} catch (e) {
        		console.warn(e);
        		return;
        	}
    	}    	
    	
    	$("#po-receivement-window").jqxWindow("open");
    	
    	WRPAdminApp.POModule.getPOItems(po.sid, "po-receive-po-items-list");
    },
    onPOItemsListInFulfillRowClick: function(event) { 	
    	var item, target, po_item, i, len, obj, innerHTML;
    	
    	target = event.args.originalEvent.target;
    	
    	try {
    		if (target.className === "confirm-item-btn") {
    	    	item = event.args.row.bounddata;
    	    	switch (item.item_type) {
    	    	case 0:
    	    	case 1:
    	    	case 2:

    				try {
    					document.getElementById("po-fulfill-serialized-item-po-id").innerHTML = document.getElementById("po-fulfill-po-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {    					
    					document.getElementById("po-fulfill-serialized-item-vendor-name").innerHTML = document.getElementById("po-fulfill-vendor-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-fulfill-serialized-item-code").innerHTML = (item.item_code !== undefined && item.item_code.length > 0)? item.item_code : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-fulfill-serialized-item-sku").innerHTML = (item.sku !== undefined && item.sku.length > 0)? item.sku : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-fulfill-serialized-item-description").innerHTML = (item.description !== undefined && item.description.length > 0)? item.description : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    	    		if (item.status < 0) {
    	    			po_item = WRPAdminApp.POModule.getPOItemByItemSid(item.item_sid);
    	    			innerHTML = [];
    	    			for (i = 0, len = po_item.length; i < len; i++) {
    	    				obj = po_item[i];
    	    				if (obj.input_serial_no !== undefined) {
    	    					innerHTML.push('<div class="item">');
    	    					
    	    					innerHTML.push('<div class="serial">');
    	    					innerHTML.push(obj.input_serial_no);  
    	    					innerHTML.push('</div>');
    	    					
    	    					innerHTML.push('<div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div>');
    	    					
    	    					innerHTML.push('</div>');
    	    				}
    	    			}
    	    			
    	    			try {
    	    				document.getElementById("po-fulfill-serial-no-list").innerHTML = innerHTML.join("");
    	    			} catch (e) {
    	    				console.warn(e);
    	    			}
    	    			
    	    			innerHTML = undefined;
    	    			
    	            	$("#po-fulfill-serialized-item-window").jqxWindow("open");
    	    		} else {
    	    			
    	    		}
    	    		break;
    	    	case 3:    	    		

    				try {
    					document.getElementById("po-fulfill-nonserialized-item-po-id").innerHTML = document.getElementById("po-fulfill-po-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {    					
    					document.getElementById("po-fulfill-nonserialized-item-vendor-name").innerHTML = document.getElementById("po-fulfill-vendor-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-fulfill-nonserialized-item-code").innerHTML = (item.item_code !== undefined && item.item_code.length > 0)? item.item_code : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-fulfill-nonserialized-item-sku").innerHTML = (item.sku !== undefined && item.sku.length > 0)? item.sku : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-fulfill-nonserialized-item-description").innerHTML = (item.description !== undefined && item.description.length > 0)? item.description : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    	    		
    	    		if (item.status < 0) {
    	    			po_item = WRPAdminApp.POModule.getPOItemByItemSid(item.item_sid);

        				try {
        					document.getElementById("po-fulfill-nonserialized-item-fulfill-qty").setAttribute("sid",po_item[0].sid);
        					document.getElementById("po-fulfill-nonserialized-item-order-qty").innerHTML = (po_item[0].order_qty !== undefined)? po_item[0].order_qty : 0;			
        					document.getElementById("po-fulfill-nonserialized-item-fulfill-qty").value = (po_item[0].fulfill_qty !== undefined)? po_item[0].fulfill_qty : 0;					
        				} catch (e) {
        					console.warn(e);
        					return;
        				}
    	    			
    	            	$("#po-fulfill-nonserialized-item-window").jqxWindow("open");
    	    		} else {
    	    			
    	    		}
    	    		break;
    	    	}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    inputSerialNoInFulfill: function(serial_no) {
		if (serial_no === undefined || serial_no.length < 1) {
			alert("Input Serial no.");
			return;
		}
		WRPAdminApp.POModule.inputSerialNo(serial_no, 'po-fulfill-serial-no-list','<div class=\'item\'><div class=\'serial\'>{serial}</div><div class=\'remove-item-btn\' onclick=\'this.parentNode.parentNode.removeChild(this.parentNode);\'></div></div>'); 
    },    
    onFulfillSerialNoExcelFileSelected: function(event) {
    	WRPAdminApp.POModule.getSerialNoListFromExcelFile(event.target, "po-fulfill-serial-no-list", '<div class="item"><div class="serial">{serial}</div><div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div></div>');
    },
    submitFulfillSerailizedItem: function() {
    	var elem, list, i, len, obj, ffl_info;
    	
    	elem = document.getElementById("po-fulfill-serial-no-list");
    	if (!elem) {
    		return;
    	}
    	
    	list = [];
    	
    	for (i = 0, len = elem.children.length; i < len; i++) {
    		obj = elem.children[i];
    		if (obj.children.length == 2) {
    			if (obj.children[0].innerText.trim().length > 0) {
    				list.push(obj.children[0].innerText.trim());
    			}
    		}
    	}
    	
    	ffl_info = WRPAdminApp.POModule.submitFulfillSerializedItem(list);
    	if (typeof(ffl_info) === "object") {
    		alert("Complete!");
        	elem = $("#po-fulfill-po-items-list");
        	if (elem) {
        		list = elem.jqxGrid("getrows");
        		for (i = 0, len = list.length; i < len; i++) {
        			obj = list[i];
        			
        			if (obj.item_sid === ffl_info.item_sid) {
        				elem.jqxGrid("setcellvalue", obj.boundindex, "fulfill_qty", ffl_info.ffl_qty);
        				break;
        			}
        		}
        	}
        	$("#po-fulfill-serialized-item-window").jqxWindow("close");
    	}
    },
    submitFulfillNonSerializedItem: function() {
    	var ffl_qty, ffl_info, list, i, len, obj;
    	
    	try {
    		ffl_qty = parseInt(document.getElementById("po-fulfill-nonserialized-item-fulfill-qty").value);
    		if (isNaN(ffl_qty)) {
    			alert("Fulfill Qty contains non-numeric characters");
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	ffl_info = WRPAdminApp.POModule.submitFulfillNonSerializedItem(ffl_qty);
    	if (typeof(ffl_info) === "object") {
    		alert("Complete!");
        	elem = $("#po-fulfill-po-items-list");
        	if (elem) {
        		list = elem.jqxGrid("getrows");
        		for (i = 0, len = list.length; i < len; i++) {
        			obj = list[i];
        			
        			if (obj.item_sid === ffl_info.item_sid) {
        				elem.jqxGrid("setcellvalue", obj.boundindex, "fulfill_qty", ffl_info.ffl_qty);
        				break;
        			}
        		}
        	}
        	$("#po-fulfill-nonserialized-item-window").jqxWindow("close");
    	}
    	
    },
    onPOItemsListInReceiveRowClick: function(event) { 	
    	var item, target, po_item, i, len, obj, innerHTML;
    	
    	target = event.args.originalEvent.target;
    	
    	try {
    		if (target.className === "confirm-item-btn") {
    	    	item = event.args.row.bounddata;
    	    	switch (item.item_type) {
    	    	case 0:
    	    	case 1:
    	    	case 2:

    				try {
    					document.getElementById("po-receive-serialized-item-po-id").innerHTML = document.getElementById("po-receive-po-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {    					
    					document.getElementById("po-receive-serialized-item-vendor-name").innerHTML = document.getElementById("po-receive-vendor-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-receive-serialized-item-code").innerHTML = (item.item_code !== undefined && item.item_code.length > 0)? item.item_code : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-receive-serialized-item-sku").innerHTML = (item.sku !== undefined && item.sku.length > 0)? item.sku : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-receive-serialized-item-description").innerHTML = (item.description !== undefined && item.description.length > 0)? item.description : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    	    		if (item.status > -1) {
    	    			po_item = WRPAdminApp.POModule.getPOItemByItemSid(item.item_sid);
    	    			innerHTML = [];
    	    			for (i = 0, len = po_item.length; i < len; i++) {
    	    				obj = po_item[i];
    	    				if (obj.serial_no !== undefined) {
    	    					innerHTML.push('<div class="item" sid="');
    	    					innerHTML.push(obj.sid);		
    	    					innerHTML.push('">');
    	    					
    	    					innerHTML.push('<div class="ffl-serial">');
    	    					innerHTML.push(obj.serial_no);    	 
    	    					innerHTML.push('</div>');
    	    					
    	    					if (obj.input_serial_no !== undefined) {
        	    					innerHTML.push('<div class="recv-serial">');
        	    					innerHTML.push(obj.input_serial_no);    	 
        	    					innerHTML.push('</div>');
    	    					} else {
        	    					innerHTML.push('<div class="recv-serial">&nbsp;</div>');
    	    					}
    	    					
    	    					innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.removeSerialNoInReceive(event);"></div>');
    	    					
    	    					innerHTML.push('</div>');
    	    				} else if (obj.input_serial_no !== undefined) {
    	    					innerHTML.push('<div class="item" sid="');
    	    					innerHTML.push(obj.sid);		
    	    					innerHTML.push('">');
    	    					
    	    					innerHTML.push('<div class="ffl-serial">&nbsp;</div>');
    	    					innerHTML.push('<div class="recv-serial">');
    	    					innerHTML.push(obj.input_serial_no);    	 
    	    					innerHTML.push('</div>');    	    					
    	    					
    	    					innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.removeSerialNoInReceive(event);"></div>');
    	    					
    	    					innerHTML.push('</div>');
    	    				}
    	    			}
    	    			
    	    			try {
    	    				document.getElementById("po-receive-serial-no-list").innerHTML = innerHTML.join("");
    	    			} catch (e) {
    	    				console.warn(e);
    	    			}
    	    			
    	    			innerHTML = undefined;
    	    			
    	            	$("#po-receive-serialized-item-window").jqxWindow("open");
    	    		} else {
    	    			
    	    		}
    	    		break;
    	    	case 3:    	    		

    				try {
    					document.getElementById("po-receive-nonserialized-item-po-id").innerHTML = document.getElementById("po-receive-po-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {    					
    					document.getElementById("po-receive-nonserialized-item-vendor-name").innerHTML = document.getElementById("po-receive-vendor-id").innerText;    					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-receive-nonserialized-item-code").innerHTML = (item.item_code !== undefined && item.item_code.length > 0)? item.item_code : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-receive-nonserialized-item-sku").innerHTML = (item.sku !== undefined && item.sku.length > 0)? item.sku : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    				try {
    					document.getElementById("po-receive-nonserialized-item-description").innerHTML = (item.description !== undefined && item.description.length > 0)? item.description : "&nbsp;";					
    				} catch (e) {
    					console.warn(e);
    					return;
    				}
    	    		
    	    		if (item.status > -1) {
    	    			po_item = WRPAdminApp.POModule.getPOItemByItemSid(item.item_sid);
    	    			
        				try {				
        					document.getElementById("po-receive-nonserialized-item-fulfill-qty").innerHTML = (po_item[0].fulfill_qty !== undefined)? po_item[0].fulfill_qty : 0;			
        					document.getElementById("po-receive-nonserialized-item-receive-qty").value = (po_item[0].receive_qty !== undefined)? po_item[0].receive_qty : 0;					
        				} catch (e) {
        					console.warn(e);
        					return;
        				}
    	    			
    	            	$("#po-receive-nonserialized-item-window").jqxWindow("open");
    	    		} else {
    	    			
    	    		}
    	    		break;
    	    	}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    inputSerialNoInReceive: function(serial_no) {
    	var elem, i, len, obj;
		if (serial_no === undefined || serial_no.length < 1) {
			alert("Input Serial no.");
			return;
		}
		
		elem = document.getElementById("po-receive-serial-no-list");
		
		if (!elem) {
			return;
		}
		
		for (i = 0, len = elem.children.length; i < len; i++) {
			obj = elem.children[i];
			if (obj.children.length == 3) {
				if (obj.children[0].innerText.trim() === serial_no.trim()) {
					obj.children[1].innerHTML = serial_no.trim();
					break;
				}
			}
			
			obj = undefined;
		}
			
		if (obj === undefined) {
			obj = document.createElement("div");
			obj.className = "item";
			obj.setAttribute("sid", 0);
			obj.innerHTML = '<div class="ffl-serial">&nbsp;</div><div class="recv-serial">'+serial_no+'</div><div class="remove-item-btn" onclick="WRPAdminApp.pagescript.removeSerialNoInReceive(event);"></div>';
			elem.appendChild(obj);
		} 
    },
    removeSerialNoInReceive: function(event) {
    	var elem;
    	
    	elem = event.target;
    	
    	while(elem) {
    		try {
    			if (elem.className === "item") {
    				break;
    			}
    			
    			elem = elem.parentNode;
    		} catch (e) {
    			
    		}
    	}
    	
    	if (!elem) {
    		return;
    	}
    	
    	if (elem.children[0].innerText.length > 0) {
    		elem.children[1].innerHTML = "";
    	} else {
    		elem.parentNode.removeChild(elem);
    	}
    },
    submitReceiveSerailizedItem: function() {
    	var elem, list, i, len, obj, recv_info;
    	
    	elem = document.getElementById("po-receive-serial-no-list");
    	if (!elem) {
    		return;
    	}
    	
    	list = [];
    	
    	for (i = 0, len = elem.children.length; i < len; i++) {
    		obj = elem.children[i];
    		if (obj.children.length == 3) {
    			if (!isNaN(parseInt(obj.getAttribute("sid")))) {
    				list.push({ sid: parseInt(obj.getAttribute("sid")), serial_no: obj.children[0].innerText.trim(), input_serial_no: obj.children[1].innerText.trim() });
    			} 			
    		}
    	}
    	
    	recv_info = WRPAdminApp.POModule.submitReceiveSerializedItem(list);
    	if (typeof(recv_info) === "object") {
    		alert("Complete!");
        	elem = $("#po-receive-po-items-list");
        	if (elem) {
        		list = elem.jqxGrid("getrows");
        		for (i = 0, len = list.length; i < len; i++) {
        			obj = list[i];
        			
        			if (obj.item_sid === recv_info.item_sid) {
        				elem.jqxGrid("setcellvalue", obj.boundindex, "receive_qty", recv_info.recv_qty);
        				break;
        			}
        		}
        	}
        	$("#po-receive-serialized-item-window").jqxWindow("close");
    	}
    },
    submitReceiveNonSerializedItem: function() {
    	var recv_qty, recv_info, list, i, len, obj;
    	
    	try {
    		recv_qty = parseInt(document.getElementById("po-receive-nonserialized-item-receive-qty").value);
    		if (isNaN(recv_qty)) {
    			alert("Receive Qty contains non-numeric characters");
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	recv_info = WRPAdminApp.POModule.submitReceiveNonSerializedItem(recv_qty);
    	if (typeof(recv_info) === "object") {
    		alert("Complete!");
        	elem = $("#po-receive-po-items-list");
        	if (elem) {
        		list = elem.jqxGrid("getrows");
        		for (i = 0, len = list.length; i < len; i++) {
        			obj = list[i];
        			
        			if (obj.item_sid === recv_info.item_sid) {
        				elem.jqxGrid("setcellvalue", obj.boundindex, "receive_qty", recv_info.recv_qty);
        				break;
        			}
        		}
        	}
        	$("#po-receive-nonserialized-item-window").jqxWindow("close");
    	}    	
    }
};