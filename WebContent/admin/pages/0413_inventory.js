/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedSerializedItemSid: 0,
    _selectedStoreId: undefined,
    _selectedAccessoryItemSid: 0,
    _selectedRuleSid: 0,
    _selectedInvoiceItems : undefined,
	_selectedInvoiceRatePlans : undefined,
	_selectedInvoiceInfo : undefined,
    init: function() {
    	var elem;
    	try {
			WRPComponents('div[pagename="inventory"] > .page-submenu-container > .submenu[panelname="items"]').addShadowedImage('img/icon/boxes_01.png');
			WRPComponents('div[pagename="inventory"] > .page-submenu-container > .submenu[panelname="return"]').addShadowedImage('img/icon/return_box_01.png');
			WRPComponents('div[pagename="inventory"] > .page-submenu-container > .submenu[panelname="return_reasons"]').addShadowedImage('img/icon/reason.png');
		} catch (e) {
			
		}
		try {
            elem = $("#bin-split-panel");
            
            if (elem && elem.length > 0) {                            
            	elem.jqxSplitter({
                	width: "99.8%",
                	height: "99.6%",
                	orientation: 'horizontal',
                	panels: [
                		{ size: "40%", min: 100, collapsible: false }, 
                		{ min: 100, collapsible: false}
                	],
        			theme: "arctic"
                });
            }
		} catch (e) {
			console.warn(e);
		}
		
		var components = $('#serialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 800);
    		components.jqxWindow("height", 350);
    		components.css("top", "calc(50% - 175px)");
    		components.css("left", "calc(50% - 400px)");
    	}
    	
    	components = $('#accessory-edit-window');
    	if (components) {
    		components.jqxWindow("width", 800);
    		components.jqxWindow("height", 350);
    		components.css("top", "calc(50% - 175px)");
    		components.css("left", "calc(50% - 400px)");
    	}
    	
    	components = $('#service-items-edit-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 250);
    		components.css("top", "calc(50% - 125px)");
    		components.css("left", "calc(50% - 250px)");
    	}
    	
    	components = $('#rule-edit-window');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 300);
    		components.css("top", "calc(50% - 150px)");
    		components.css("left", "calc(50% - 250px)");
    	}
    	
    	components = $('#return-invoice-viewer');
    	if (components) {
    		components.jqxWindow("width", 900);
    		components.jqxWindow("height", 600);
    		components.css("top", "calc(50% - 300px)");
    		components.css("left", "calc(50% - 450px)");
    	}
        //jqx grid
    	components = $('#jqx-serial-no');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'serialNo', type: 'string'},
		             	{ name: 'poId', type: 'string'},
						{ name: 'Vendor', type: 'string'},
						{ name: 'updateDate', type: 'string' },
		                { name: 'user_id', type: 'string' }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    			          	  { text: 'Serial No.', datafield: 'serialNo', width: '20%',  cellsalign: 'right', editable: false},
		                      { text: 'P.O.ID', datafield: 'poId', width: '20%',  cellsalign: 'right', editable: false },
		        			  { text: 'Vendor', datafield: 'Vendor', width: '20%', cellsalign: 'right', editable: false},
		        			  { text: 'Update Date', datafield: 'updateDate', width: '20%',  cellsalign: 'right', editable: false },
		        			  { text: 'Update User', datafield: 'user_id', width: '20%', cellsalign: 'right', editable: false }
				]
    		});
    	}
    	
    	components = $('#jqx-serialized-items');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    				        { name: 'sid', type: 'string'},
    		             	{ name: 'item_code', type: 'string'},
    						{ name: 'description', type: 'string'},
    						{ name: 'distributor', type: 'string' },
    		                { name: 'category', type: 'string' },
    		                { name: 'sub_category', type: 'string' },
    		                { name: 'manufacturer', type: 'string' },
    		                { name: 'color', type: 'string' },
    		                { name: 'qty', type: 'number' },
    		                { name: 'item_cost', type: 'number' },
    		                { name: 'retail_price', type: 'number' },
    		                { name: 'sku', type: 'string' },
    		                { name: 'image', type: 'string' }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    			          		  { text: 'SID', datafield: 'sid', width: '10%',  cellsalign: 'right', editable: false, hidden:true },
    		                      { text: 'SKU', datafield: 'sku', width: '10%',  cellsalign: 'right', editable: false, hidden:true },
    		                      { text: 'Item Code', datafield: 'item_code', width: '10%',  cellsalign: 'right', editable: false },
    		        			  { text: 'Description', datafield: 'description', width: '23%', cellsalign: 'right', editable: false},
    		        			  { text: 'Company/Carrier', datafield: 'distributor', width: '10%',  cellsalign: 'right', editable: false },
    		        			  { text: 'Category', datafield: 'category', width: '10%', cellsalign: 'right', editable: false },
    		        			  { text: 'Sub-Category', datafield: 'sub_category', width: '10%', cellsalign: 'right', editable: false },
    		                      { text: 'Manufacturer', datafield: 'manufacturer', width: '13%', cellsalign: 'right', editable: false },
    		                      { text: 'Color', datafield: 'color', width: '10%', cellsalign: 'right', editable: false },
    		        			  { text: 'Qty', datafield: 'qty', width: '4%', cellsalign: 'right', editable: false },
    		                      { text: 'Item Cost', datafield: 'item_cost', width: '5%', cellsalign: 'right', editable: false, cellsformat:"c2" },
    		                      { text: 'SRP', datafield: 'retail_price', width: '5%', cellsalign: 'right', editable: false, cellsformat:"c2" },
    		                      { text: 'img', datafield: 'image', width: '5%', cellsalign: 'right'}
				]
    		});
    		
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editSerializedItemDictPop);
    		components.on("rowselect", function (event) {
    			WRPAdminApp.pagescript._selectedSerializedItemSid = event.args.row.sid;
    			//console.log(event.args.row);
    			//WRPAdminApp.pagescript.informSerializedItemDictInfo(event.args.row.sid);
    			WRPAdminApp.pagescript.informSerializedItemDictInfo(event.args.row);
    			WRPAdminApp.pagescript.getSerializedItemListInInvenByItemSid(event.args.row.sid);
    			/*170207 jh : po, sales, promotion ?�이???�기*/
    			WRPAdminApp.pagescript.getPoHistoryBySerialItem(event.args.row.sid);
    			WRPAdminApp.pagescript.getSalesHistoryBySerialItem(event.args.row.sid);
    			WRPAdminApp.pagescript.getPriceHistoryBySerialItem(event.args.row.sid, event.args.row.sku);
    	});
    	}
    	
    	/* 170207 jh : srp 추�?. 그외 ?�른 컬럼??�?보정?? */
    	components = $('#jqx-inventory-items-accessory-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "item_code", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "distributor", type: "string" },
    					{ name: "category", type: "string" },
    					{ name: "sub_category", type: "string" },
    					{ name: "manufacturer", type: "string" },
    					{ name: "color", type: "string" },
    					{ name: "qty", type: "number" },
    					{ name: "item_cost", type: "number" },
    					{ name: "retail_price", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "item_code", datafield: "item_code", width: "10%" },
    				{ text: "description", datafield: "description", width: "23%" },
    				{ text: "Company / Carrier", datafield: "distributor", width: "10%"},
    				{ text: "category", datafield: "category", width: "10%" },
    				{ text: "subCategory", datafield: "sub_category", width: "10%" },
    				{ text: "manufacturer", datafield: "manufacturer", width: "13%" },
    				{ text: "color", datafield: "color", width: "10%" },
    				{ text: "qty", datafield: "qty", width: "4%" },
    				{ text: "item Cost", datafield: "item_cost", width: "5%", cellsalign:"right", cellsformat:"c2"},
    				{ text: "SRP", datafield: "retail_price", width: "5%", cellsalign:"right", cellsformat:"c2"}
				]
    		});
    		/*///*/
    		components.on("rowselect", function(event){
    			WRPAdminApp.pagescript.getPoHistoryByAccessory(event.args.row.sid);
    			WRPAdminApp.pagescript.getSalesHistoryByAccessory(event.args.row.sid);
    		});
    		components.on("rowselect", WRPAdminApp.pagescript.informAccessoryItemDictInfo);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editAccessoryItemDictPop);
    	}
    	
    	components = $('#jqx-inventory-items-service-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "feeType", type: "string" },
    					{ name: "name", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "amount", type: "number" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "Type", datafield: "feeType", width: "25%" },
    				{ text: "Name", datafield: "name", width: "25%" },
    				{ text: "Description", datafield: "description", width: "25%"},
    				{ text: "Amount", datafield: "amount", width: "25%", cellsalign: "right", cellsformat: "c2" }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.informFeeInfo);
    		components.on("rowselect", function(event){
    			//console.log(event.args.row.sid);
    			/* 170208 jh */
    			WRPAdminApp.pagescript.getSalesHistoryByService(event.args.row.sid);
    			/*///*/
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editFeePop);
    	}
    	/*170207 jh : po, sales, promotion price jqx*/
    	//po
    	components = $('#jqx-po-history');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "poId", type: "string" },
    					{ name: "status", type: "string" },
    					{ name: "statusStr", type: "string" },
    					{ name: "ordererId", type: "string" },
    					{ name: "orderDate", type: "number" },
    					{ name: "vendorId", type: "string" },
    					{ name: "total_order_qty", type: "string" },
    					{ name: "amount", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "status_int", datafield: "status", width: "25%", hidden: true  },
    				{ text: "ordererId", datafield: "ordererId", width: "25%", hidden: true },
    				
    				{ text: "P.O Id", datafield: "poId", width: "16%" },
    				{ text: "Create Date", datafield: "orderDate", width: "20%"},
    				{ text: "vendorId", datafield: "vendorId", width: "16%"},
    				{ text: "status", datafield: "statusStr", width: "16%"},
    				{ text: "Qty", datafield: "total_order_qty", width: "16%"},
    				{ text: "Amount", datafield: "amount", width: "16%", cellsalign: "right", cellsformat: "c2" }
				]
    		});
    		$("#excel-po-history").click(function () {
    			$('#jqx-po-history').jqxGrid('exportdata', 'xls', 'inventory-accessory-list');
            });
    	}
    	
    	//sales
    	components = $('#jqx-sales-history');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "date", type: "string" },
    					{ name: "user_id", type: "string" },
    					{ name: "serial_no", type: "string" },
    					{ name: "qty", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "Date", datafield: "date",filtertype : "date",cellsformat : 'MM/dd/yyyy HH:mm:ss', width: "25%" },
    				{ text: "User", datafield: "user_id", width: "25%" },
    				{ text: "Serial", datafield: "serial_no", width: "25%" },
    				{ text: "qty", datafield: "qty", width: "25%"}
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.informFeeInfo);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editFeePop);
    	}
    	
    	//promotion
    	components = $('#jqx-price-history');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "feeType", type: "string" },
    					{ name: "name", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "amount", type: "number" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "Type", datafield: "feeType", width: "25%" },
    				{ text: "Name", datafield: "name", width: "25%" },
    				{ text: "Description", datafield: "description", width: "25%"},
    				{ text: "Amount", datafield: "amount", width: "25%", cellsalign: "right", cellsformat: "c2" }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.informFeeInfo);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editFeePop);
    	}
    	
    	//accessories - po
    	components = $('#jqx-accessory-po-history');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "poId", type: "string" },
    					{ name: "status", type: "string" },
    					{ name: "statusStr", type: "string" },
    					{ name: "ordererId", type: "string" },
    					{ name: "orderDate", type: "number" },
    					{ name: "vendorId", type: "string" },
    					{ name: "totalOrderQty", type: "string" },
    					{ name: "amount", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "status_int", datafield: "status", width: "25%", hidden: true  },
    				{ text: "ordererId", datafield: "ordererId", width: "25%", hidden: true },
    				
    				{ text: "P.O Id", datafield: "poId", width: "16%" },
    				{ text: "Create Date", datafield: "orderDate", width: "20%"},
    				{ text: "vendorId", datafield: "vendorId", width: "16%"},
    				{ text: "status", datafield: "statusStr", width: "16%"},
    				{ text: "Qty", datafield: "totalOrderQty", width: "16%"},
    				{ text: "Amount", datafield: "amount", width: "16%", cellsalign: "right", cellsformat: "c2" }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.informFeeInfo);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editFeePop);
    	}
    	
    	//accessories - sales
    	components = $('#jqx-accessory-sales-history');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "date", type: "string" },
    					{ name: "user_id", type: "string" },
    					{ name: "serial_no", type: "string" },
    					{ name: "qty", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "Date", datafield: "date", width: "25%",filtertype : "date",cellsformat : 'MM/dd/yyyy HH:mm:ss' },
    				{ text: "User", datafield: "user_id", width: "25%" },
    				{ text: "Serial", datafield: "serial_no", width: "25%" },
    				{ text: "qty", datafield: "qty", width: "25%"}
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.informFeeInfo);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editFeePop);
    	}
    	
    	//service items - sales
    	components = $('#jqx-service-sales-history');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "date", type: "string" },
    					{ name: "user_id", type: "string" },
    					{ name: "qty", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: "sid", datafield: "sid", hidden: true },
    				{ text: "Date", datafield: "date", width: "33%" },
    				{ text: "User", datafield: "user_id", width: "34%" },
    				{ text: "qty", datafield: "qty", width: "33%"}
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.informFeeInfo);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editFeePop);
    	}
    	
    	components = $("#jqx-inventory-returned-list");
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'invoiceNo', type: 'number'},
    					{ name: 'returnDate', type: 'date'},
    					{ name: 'itemCode', type: 'string'},
    					{ name: 'description', type: 'string'},
    					{ name: 'serialNo', type: 'string'},
    					{ name: 'qty', type: 'number'},
    					{ name: 'price', type: 'number'},
    					{ name: 'taxAmnt', type: 'number'},
    					{ name: 'subTotal', type: 'number'}
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: 'Invoice No.', datafield: 'invoiceNo', width: '10%' },
    				{ text: 'Return Date', datafield: 'returnDate', width: '15%',filtertype: "date", cellsformat: 'MM/dd/yyyy'},
    				{ text: 'Item Code', datafield: 'itemCode', width: '10%'},
    				{ text: 'Description', datafield: 'description', width: '15%' },
    				{ text: 'Serial No.', datafield: 'serialNo', width: '10%'},
    				{ text: 'qty', datafield: 'qty', width: '10%'},
    				{ text: 'Price', datafield: 'price', width: '10%', cellsformat:'c2', cellsalign:'right'},
    				{ text: 'Tax Amnt', datafield: 'taxAmnt', width: '10%', cellsformat:'c2', cellsalign:'right'},
    				{ text: 'Sub Total', datafield: 'subTotal', width: '10%', cellsformat:'c2', cellsalign:'right'}
				]
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.getReturnDatas);
    	}
    	
    	components = $('#jqx-return-reason-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "return_reason", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "date", type: "date" },
    					{ name: "user_name", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
				   { text: "Reason", datafield: "return_reason", width: "25%" },
				   { text: "Description", datafield: "description", width: "25%" },
				   { text: "Update Date", datafield: "date", width: "25%", filtertype: "date", cellsformat: 'MM/dd/yyyy'},
				   { text: "Updater", datafield: "user_name", width: "25%" },
				   { text: "sid", datafield: "sid", hidden: true }
				]
    		});
    		components.on("rowselect", WRPAdminApp.pagescript.getRuleInfo);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editRuleInfo);
    	}
    	
    	
    	//jqx button
    	$("#excel-serialized-items").click(function () {
			$("#jqx-serialized-items").jqxGrid('exportdata', 'xls', 'jqx-serialized-items-list');
        });
    	
    	$("#excel-serial-no-list").click(function () {
			$("#jqx-serial-no").jqxGrid('exportdata', 'xls', 'jqx-serial-no-list');
        });
    	
    	$("#excel-inventory-accessory-list").click(function () {
			$('#jqx-inventory-items-accessory-list').jqxGrid('exportdata', 'xls', 'inventory-accessory-list');
        });
    	
    	$("#excel-inventory-service-items").click(function () {
			$("#jqx-inventory-items-service-list").jqxGrid('exportdata', 'xls', 'inventory-service-item-list');
        });
    	
    	$("#excel-inventory-returned-list").click(function () {
			$("#jqx-inventory-returned-list").jqxGrid('exportdata', 'xls', 'inventory-returned-list');
        });
    	
    	$("#excel-inventory-transfer-history").click(function () {
			$("#jqx-inventory-transfer-history-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-history');
        });
    	
    	$("#excel-inventory-transfer-req-history").click(function () {
			$("#jqx-inventory-transfer-req-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-req-history');
        });
    	
    	$("#excel-inventory-transfer-appr-history").click(function () {
			$("#jqx-inventory-transfer-appr-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-appr-history');
        });
    	
    	$("#excel-inventory-transfer-ship-history").click(function () {
			$("#jqx-inventory-transfer-ship-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-ship-history');
        });
    	
    	$("#excel-sales-history").click(function () {
			$("#jqx-sales-history").jqxGrid('exportdata', 'xls', 'inventory-accessory-list');
        });
    	
    	$("#excel-price-history").click(function () {
			$("#jqx-price-history").jqxGrid('exportdata', 'xls', 'inventory-accessory-list');
        });
    	
    	$("#excel-accessory-po-history").click(function () {
			$("#jqx-accessory-po-history").jqxGrid('exportdata', 'xls', 'inventory-accessory-list');
        });

		$("#excel-accessory-sales-history").click(function () {
			$("#jqx-accessory-sales-history").jqxGrid('exportdata', 'xls', 'inventory-accessory-list');
        });
		
		$("#excel-service-sales-history").click(function () {
			$("#jqx-service-sales-history").jqxGrid('exportdata', 'xls', 'inventory-accessory-list');
        });
		
		$('#inventory-return-radio-1').on('checked', function (event) {
            var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#inventory-return-start-date").jqxDateTimeInput('setDate', start);
				$("#inventory-return-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#inventory-return-radio-2').on('checked', function (event) {
			 var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#inventory-return-start-date").jqxDateTimeInput('setDate', start);
				$("#inventory-return-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#inventory-return-radio-3').on('checked', function (event) {
			 var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-3);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#inventory-return-start-date").jqxDateTimeInput('setDate', start);
				$("#inventory-return-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#item-porder-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#item-po-search-start-date").jqxDateTimeInput('setDate', start);
        	$("item-po-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#item-porder-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#item-po-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#item-po-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#item-porder-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#item-po-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#item-po-search-end-date").jqxDateTimeInput('setDate', end);
       	});
		 
		$('#serialized-item-history-radio-1').jqxRadioButton('check');
		$('#accessory-sales-history-radio-1').jqxRadioButton('check');
		$('#service-sales-history-radio-1').jqxRadioButton('check');
		$('#inventory-return-radio-1').jqxRadioButton('check');
		$('#item-porder-radio-1').jqxRadioButton('check');
		/*///*/
    	WRPAdminApp.pagescript.getItemTypeList();
        //WRPAdminApp.pagescript.getSerializedItemDictList();
        //WRPAdminApp.pagescript.getAccessoryItemDictList();
        WRPAdminApp.pagescript.getFeeList();
        WRPAdminApp.pagescript.getReturnedItemsList();
        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0, undefined, "serialized-item-category");
        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0, undefined, "serialized-item-category-pop");
        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0, undefined, "accessory-item-category");
        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0, undefined, "accessory-item-category-pop");
        //WRPAdminApp.pagescript.getTransferHistoryList();
        //WRPAdminApp.pagescript.getTransferRequestHistoryList();
        //WRPAdminApp.pagescript.getTransferApprovalHistoryList();
        //WRPAdminApp.pagescript.getTransferShipHistoryList();
        //WRPAdminApp.pagescript.getBinList();
        //WRPAdminApp.pagescript.getBinSelectList();
        WRPAdminApp.pagescript.getRuleList();
        WRPAdminApp.pagescript.getVendorList();
    },
    getCategoriesDicListByParentSID: function() {
        var parentSid = 0, selectedSid, arg, outputId, storeId;

        arg = arguments;

        if (arg.length > 0) {
            parentSid = parseInt(arguments[0]);
        }

        if (isNaN(parentSid)) {
            parentSid = 0;
        }

        if (arg.length > 1) {
            selectedSid = parseInt(arg[1]);
            if (isNaN(selectedSid)) {
                selectedSid = undefined;
            }
        }

        if (arg.length > 2) {
            outputId = arguments[2];
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url:  "ajax/category/getCategoriesByParentSid.jsp",
            data: {
                storeId: storeId,
                parentSid: parentSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var selectBox, selectBoxPop, innerHTML, data, i, len, obj;

                data = result.data;
                if (!data) return;

                if (outputId !== undefined) {
                    selectBox = document.getElementById(outputId);
                } else {
                    if (parentSid == 0) {
                        selectBox = document.getElementById("item-edit-item-category");
                    } else {
                        selectBox = document.getElementById("item-edit-item-sub-category");
                    }
                }

                if (!selectBox) return;

                innerHTML = [];
                innerHTML.push('<option value="0">-- SELECT --</option>');
                for (i = 0, len = data.length ; i < len; i++) {
                    try {
                        obj = data[i];

                        innerHTML.push('<option value="');
                        innerHTML.push(obj.sid);
                        innerHTML.push('"');
                        if (selectedSid !== undefined && selectedSid === obj.sid) {
                            innerHTML.push(' selected');
                        }
                        innerHTML.push('>');
                        if (obj.parentSid > 0) {
                            innerHTML.push(obj.subCategoryName);
                        } else {
                            innerHTML.push(obj.categoryName);
                        }
                        innerHTML.push('</option>');
                    } catch (e) {

                    }
                }

                if (innerHTML.length > 0) {
                    selectBox.innerHTML = innerHTML.join("");
                } else {
                    selectBox.innerHTML = "";
                    selectBox.value = "";
                }
                innerHTML = undefined;

                if (parentSid === 0 && arg.length > 2) {
                    if (selectedSid !== undefined) {
                        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(selectedSid, arg[2]);
                    }
                } else {

                }
            }
        });
    },
    syncItemDictList: function() {
    	$.ajax({
            url:  "ajax/item/syncItemDictList.jsp",
            data: {
                storeId: document.getElementById("select-store").value
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                alert("Complete");
                WRPAdminApp.pagescript.init();
            }
        });
    },
    searchTypeChecked: function(){
    	if($("input:checkbox[name='searchCheck']").is(":checked") == true){
    		$('#inven-serialized-items-search-category').attr('disabled', 'true');
    		$('#inven-serialized-items-search-category-sub').attr('disabled', 'true');
    		$('#inven-serialized-items-search-category').val(0);
    		$('#inven-serialized-items-search-category-sub').val(0);
    	}
    	else {
    		$('#inven-serialized-items-search-category').removeAttr('disabled'); 
    		$('#inven-serialized-items-search-category-sub').removeAttr('disabled'); 
    	}
    	
    	if($("input:checkbox[name='searchCheck2']").is(":checked") == true){
    		$('#inventory-accessory-category').attr('disabled', 'true');
    		$('#inventory-accessory-category-sub').attr('disabled', 'true');
    		$('#inventory-accessory-category').val(0);
    		$('#inventory-accessory-category-sub').val(0);
    	}
    	else {
    		$('#inventory-accessory-category').removeAttr('disabled'); 
    		$('#inventory-accessory-category-sub').removeAttr('disabled'); 
    	}
    },
    getSerializedItemDictList: function() {
        var param;
        param={};
        
        try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	}
    	
        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
            param.keyword = document.getElementById("inven-serialized-items-search-keyword").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        try {
        	param.category = parseInt(document.getElementById("inven-serialized-items-search-category").value);
        	if (isNaN(param.category)) {
        		param.category = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        try {
        	param.subCategory = parseInt(document.getElementById("inven-serialized-items-search-category-sub").value);
        	if (isNaN(param.subCategory)) {
        		param.subCategory = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        try {
			if (document.getElementById("item-type-phone").checked == true) {
				param.searchPhone=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		try {
			if (document.getElementById("item-type-sim").checked == true) {
				param.searchSim=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			if (document.getElementById("instock").checked == true) {
				param.searchInstock=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		
		param.itemType = "0,1";
		
        WRPAdminApp.pagescript._selectedSerializedItemSid = 0;

        $.ajax({
            url: "ajax/item/getItemDictListForInven.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i;
                $("#jqx-serialized-items").jqxGrid("clear");
                data = result.data;
                if (!data) return;
                
                $("#jqx-serialized-items").jqxGrid("addrow", null, data);
                
                try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
            }
        })
    },
    informSerializedItemDictInfo: function(data) {
    	console.log(data);
    	try {
            document.getElementById("serialized-item-item-code").value = (data.item_code !== undefined && data.item_code !== null)? data.item_code : "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-model").value = (data.model !== undefined && data.model !== null)? data.model : "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-description").value = (data.description !== undefined && data.description !== null)? data.description : "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-distributor").value = (data.distributor !== undefined && data.distributor !== null)? data.distributor : "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-manufacturer").value = (data.manufacturer !== undefined && data.manufacturer !== null)? data.manufacturer : "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-category").value = (data.category !== undefined && data.category !== null)? data.category : "";//data.category;
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-sub-category").value = (data.sub_category !== undefined && data.sub_category !== null)? data.sub_category : "";//data.sub_category;
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-color").value = (data.color !== undefined && data.color !== null)? data.color : "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-condition").value = (data.condition !== undefined && data.condition !== null)? data.condition : "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-sku").value = (data.sku !== undefined && data.sku !== null)? data.sku : "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-item-type").value = (data.item_type !== undefined && data.item_type !== null && data.item_type == 0)? "PHONE" : "SIM CARD";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-item-cost").value = (data.item_cost !== undefined && data.item_cost !== null)? "$"+data.item_cost.toFixed(2) : "$0.00";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-retail-price").value = (data.retail_price !== undefined && data.retail_price !== null)? "$"+data.retail_price.toFixed(2) : "$0.00";
        } catch (e) {
            console.log(e);
        }
        
        try {
            document.getElementById("serialized-item-wholesale-price").value = (data.wholesale_price !== undefined && data.wholesale_price !== null)? "$"+data.wholesale_price.toFixed(2) : "$0.00";
        } catch (e) {
            console.log(e);
        }
        
        try {
            document.getElementById("serialized-item-profile-image-file").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-profile-image-view").style.backgroundImage = "url('../"+ data.image +"')";
        } catch (e) {
            console.log(e);
        }
    	/*
    	console.log(data);
        var storeId, i, len, elem, list;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        WRPAdminApp.pagescript._selectedSerializedItemSid = data;
        if (isNaN(WRPAdminApp.pagescript._selectedSerializedItemSid)) {
            console.warn("sid error");
            WRPAdminApp.pagescript._selectedSerializedItemSid = 0;
            return;
        }
        
        $.ajax({
            url: "ajax/item/getItemDictByItemSid.jsp",
            data: {
                storeId: storeId,
                itemSid: WRPAdminApp.pagescript._selectedSerializedItemSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                try {
                    try {
                        document.getElementById("serialized-item-item-code").value = (data.itemCode !== undefined && data.itemCode !== null)? data.itemCode : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-model").value = (data.model !== undefined && data.model !== null)? data.model : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-description").value = (data.description !== undefined && data.description !== null)? data.description : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-distributor").value = (data.distributor !== undefined && data.distributor !== null)? data.distributor : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-manufacturer").value = (data.manufacturer !== undefined && data.manufacturer !== null)? data.manufacturer : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-category").value = (data.category !== undefined && data.category !== null)? data.category : "";//data.category;
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-sub-category").value = (data.sub_category !== undefined && data.sub_category !== null)? data.sub_category : "";//data.sub_category;
                    } catch (e) {
                        console.log(e);
                    }
                    
                    if (data.category) {
                        if (data.subCategory) {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, data.subCategory, "serialized-item-sub-category");
                        } else {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, undefined, "serialized-item-sub-category");
                        }
                    } else {
                        try {
                            document.getElementById("serialized-item-sub-category").innerHTML = '';
                        } catch (e) {
                            console.log(e);
                        }
                    }

                    try {
                        document.getElementById("serialized-item-color").value = (data.color !== undefined && data.color !== null)? data.color : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-condition").value = (data.condition !== undefined && data.condition !== null)? data.condition : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-sku").value = (data.sku !== undefined && data.sku !== null)? data.sku : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-item-type").value = (data.itemType !== undefined && data.itemType !== null)? data.itemType : 0;
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-item-cost").value = (data.itemCost !== undefined && data.itemCost !== null)? "$"+data.itemCost.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-retail-price").value = (data.retailPrice !== undefined && data.retailPrice !== null)? "$"+data.retailPrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }
                    
                    try {
                        document.getElementById("serialized-item-wholesale-price").value = (data.wholesalePrice !== undefined && data.wholesalePrice !== null)? "$"+data.wholesalePrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }
                    
                    try {
                        document.getElementById("serialized-item-profile-image-file").value = "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-profile-image-view").style.backgroundImage = "url('../"+ data.image +"')";
                    } catch (e) {
                        console.log(e);
                    }

                    WRPAdminApp.pagescript.getSerializedItemListInInvenByItemSid();
                } catch (e) {

                }
            }
        });
        */
    },
    getItemTypeList: function(event){
    	 $.ajax({
             url: "ajax/item/getItemTypeList.jsp",
             method: "POST",
             dataType: "json",
             success: function(result) {
            	 var data, innerHTML;
            	 data=result.data;
            	 if(!data) return;
            	 
            	 innerHTML = [];
            	 
            	 for (i = 0, len = data.length; i < len; i++) {
         			try {
         				obj = data[i];

         				innerHTML.push('<option value="');
         				innerHTML.push(obj.type_sid);
         				innerHTML.push('"');
         				innerHTML.push('>');
         				innerHTML.push(obj.name);
         				innerHTML.push('</option>');
         			} catch (e) {
         				console.warn(e);
         				return;
         			}
         		}
            	 
            	try {
          			document.getElementById("serialized-item-item-type").innerHTML = innerHTML.join("");
          		} catch (e) {
          			console.warn(e);
          		}

            	 try {
         			document.getElementById("serialized-item-item-type-pop").innerHTML = innerHTML.join("");
         		} catch (e) {
         			console.warn(e);
         		}
         		
         		 try {
          			document.getElementById("accessory-item-item-type-pop").innerHTML = innerHTML.join("");
          		} catch (e) {
          			console.warn(e);
          		}
          		
          		 try {
           			document.getElementById("accessory-item-item-type").innerHTML = innerHTML.join("");
           		} catch (e) {
           			console.warn(e);
           		}
             }
    	 });
    },
    editSerializedItemDictPop: function(event) {
        var storeId, i, len, elem, list, rowdata;
        rowdata = event.args.row.bounddata;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        WRPAdminApp.pagescript._selectedSerializedItemSid = rowdata.sid;
        if (isNaN(WRPAdminApp.pagescript._selectedSerializedItemSid)) {
            console.warn("sid error");
            WRPAdminApp.pagescript._selectedSerializedItemSid = 0;
            return;
        }
        if (rowdata.sid < 100001 && rowdata.sid > 0) {
        	alert("Can not be edited !");
        	return;
        }
        
        WRPAdminApp.pagescript.getItemTypeList();
        $.ajax({
            url: "ajax/item/getItemDictByItemSid.jsp",
            data: {
                storeId: storeId,
                itemSid: WRPAdminApp.pagescript._selectedSerializedItemSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                try {
                    try {
                        document.getElementById("serialized-item-item-code-pop").value = (data.itemCode !== undefined && data.itemCode !== null)? data.itemCode : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-model-pop").value = (data.model !== undefined && data.model !== null)? data.model : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-description-pop").value = (data.description !== undefined && data.description !== null)? data.description : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-distributor-pop").value = (data.distributor !== undefined && data.distributor !== null)? data.distributor : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-manufacturer-pop").value = (data.manufacturer !== undefined && data.manufacturer !== null)? data.manufacturer : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-category-pop").value = data.category;
                    } catch (e) {
                        console.log(e);
                    }

                    if (data.category) {
                        if (data.subCategory) {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, data.subCategory, "serialized-item-sub-category-pop");
                        } else {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, undefined, "serialized-item-sub-category-pop");
                        }
                    } else {
                        try {
                            document.getElementById("serialized-item-sub-category-pop").innerHTML = '';
                        } catch (e) {
                            console.log(e);
                        }
                    }

                    try {
                        document.getElementById("serialized-item-color-pop").value = (data.color !== undefined && data.color !== null)? data.color : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-condition-pop").value = (data.condition !== undefined && data.condition !== null)? data.condition : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("serialized-item-sku-pop").value = (data.sku !== undefined && data.sku !== null)? data.sku : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-item-type-pop").value = (data.itemType !== undefined && data.itemType !== null)? data.itemType : 0;
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-item-cost-pop").value = (data.itemCost !== undefined && data.itemCost !== null)? "$"+data.itemCost.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }

                    /*try {
                        document.getElementById("serialized-item-bin-pop").value = (data.bin !== undefined && data.bin !== null)? data.bin : 0;
                    } catch (e) {
                        console.log(e);
                    }*/
                    
                    try {
                        document.getElementById("serialized-item-retail-price-pop").value = (data.retailPrice !== undefined && data.retailPrice !== null)? "$"+data.retailPrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }
                    
                    try {
                        document.getElementById("serialized-item-wholesale-price-pop").value = (data.wholesalePrice !== undefined && data.wholesalePrice !== null)? "$"+data.wholesalePrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }
                    
                    try {
                        document.getElementById("serialized-item-profile-image-file").value = "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("serialized-item-profile-image").style.backgroundImage = "url('../"+ data.image +"')";
                    } catch (e) {
                        console.log(e);
                    }
                    
                    try {
                        document.getElementById("serialized-item-vendor-pop").value = (data.vendor_sid !== undefined && data.vendor_sid !== null)? data.vendor_sid : "";
                    } catch (e) {
                        console.log(e);
                    }
                    $('#serialized-item-window').jqxWindow('open');
                } catch (e) {

                }
            }
        });
    },
    initSerializedItemDictInfo: function() {
        try {
            document.getElementById("serialized-item-item-code-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-model-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-description-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-distributor-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-manufacturer-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-category-pop").value = 0;
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-sub-category-pop").innerHTML = '';
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-color-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-condition-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("serialized-item-sku-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-item-type-pop").value = 0;
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-item-cost-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-profile-image-file").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("serialized-item-profile-image").style.backgroundImage = "";
        } catch (e) {
            console.log(e);
        }
        
        try {
            document.getElementById("serialized-item-retail-price-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        
        try {
            document.getElementById("serialized-item-wholesale-price-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        /*try {
            document.getElementById("serialized-item-bin-pop").value = 0;
        } catch (e) {
            console.log(e);
        }*/
        $('#serialized-item-window').jqxWindow('open');
    },
    getSerializedItemListInInvenByItemSid: function(data) {
    	
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/inventory/getSerializedItemListInInvenByItemSid.jsp",
            data: {
                itemSid: data,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, serialNoList, i, elem;
                data = result.data;
                if (!data){
                	return;
                }
                elem = $("#jqx-serial-no");
                if(elem){
                	elem.jqxGrid("clear"); 
                	elem.jqxGrid("addrow", null, data); 
                }
            }
        });
    },
    saveSerializedItem: function() {
        var jqueryUploadItemImage, elem;

        try {
            if (isNaN(parseInt(WRPAdminApp.pagescript._selectedSerializedItemSid))) {
                throw "";
            }
        } catch (e) {
            console.warn("SID Format ERR");
            console.warn(e);
            return;
        }
        
        if (parseInt(WRPAdminApp.pagescript._selectedSerializedItemSid) < 100001 && parseInt(WRPAdminApp.pagescript._selectedSerializedItemSid) > 0) {
        	alert("Can not be edited !");
        	return;
        }
        
        try {
            elem = document.getElementById("serialized-item-item-code-pop");
            if (elem.value.length == 0) {
                alert("Input item code");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-category-pop");
            if (elem.value == 0) {
                alert("Select category");
                return;
            }
        } catch (e) {
            console.warn(e);
        }
        try {
            elem = document.getElementById("serialized-item-item-cost-pop");
            if (isNaN(parseFloat(elem.value.replace("$", "")))) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }

        jqueryUploadItemImage = $("#serialized-item-profile-image-form");
        if (!jqueryUploadItemImage[0]) return;
        if (jqueryUploadItemImage[0].itemImageFile.files.length > 0) {
            jqueryUploadItemImage.attr("action", "ajax/item/uploadImageUpload.jsp");
            jqueryUploadItemImage.ajaxForm(WRPAdminApp.pagescript.callBackUploadSerializedItemImageFile);
            jqueryUploadItemImage.submit();
        } else {
            WRPAdminApp.pagescript.callBackUploadSerializedItemImageFile("", undefined);
        }
    },
    setSerializedItemImagePreview: function() {
        var itemImage = document.getElementById("serialized-item-profile-image-file"), reader;
        if (!itemImage) return;

        if (itemImage.files && itemImage.files[0]) {
            reader = new FileReader();
            reader.onload = function(e) {
                try { document.getElementById("serialized-item-profile-image").style.backgroundImage= 'url("'+e.target.result+'")'; } catch (e) {}
            };

            reader.readAsDataURL(itemImage.files[0]);
        } else {
            try { document.getElementById("serialized-item-profile-image").style.backgroundImage= ''; } catch (e) {}
        }
    },
    callBackUploadSerializedItemImageFile: function(imageUrl, state) { // img path
        var data = {}, elem;

        try {
            data.storeId = document.getElementById("select-store").value;
            if (data.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }


        try {
            data.sid = parseInt(WRPAdminApp.pagescript._selectedSerializedItemSid);
            if (isNaN(data.sid)) {
                throw "";
            }
        } catch (e) {
            console.warn("SID Format ERR");
            console.warn(e);
            return;
        }

        if (data.sid == 0) {

        }

        data.image = imageUrl.trim();

        try {
            document.getElementById("serialized-item-profile-image-file").value = "";
        } catch (e) {

        }

        try {
            document.getElementById("serialized-item-profile-image").style.backgroundImage = "";
        } catch (e) {

        }

        try {
            elem = document.getElementById("serialized-item-item-code-pop");
            data.itemCode = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-model-pop");
            data.model = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-description-pop");
            data.description = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-distributor-pop");
            data.distributor = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-manufacturer-pop");
            data.manufacturer = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-category-pop");
            data.category = elem.value;
            if (data.category == 0) {
                alert("Select category");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-sub-category-pop");
            data.subCategory = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-color-pop");
            data.color = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-condition-pop");
            data.condition = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-sku-pop");
            data.sku = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("serialized-item-item-type-pop");
            data.itemType = parseInt(elem.value);
            if (isNaN(data.itemType)) {
                throw "";
            }
        } catch (e) {
            console.warn("Item type is non-numeric character");
            console.warn(e);
            alert("Item Type ERR");
            return;
        }

        try {
            elem = document.getElementById("serialized-item-item-cost-pop");
            data.itemCost = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.itemCost)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }
        
        try {
            elem = document.getElementById("serialized-item-retail-price-pop");
            data.retailPrice = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.retailPrice)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Retail Price contains non-numeric character");
            return;
        }
        
        try {
            elem = document.getElementById("serialized-item-wholesale-price-pop");
            data.wholesalePrice = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.wholesalePrice)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("WholeSale Price contains non-numeric character");
            return;
        }
        
        try {
            elem = document.getElementById("serialized-item-vendor-pop");
            data.vendor_sid = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        /*try {
            elem = document.getElementById("serialized-item-bin-pop");
            data.binsid = parseInt(elem.value);
            if (isNaN(data.binsid)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
        }*/

        data.serialized = 1;

        $.ajax({
            url: "ajax/item/updateItemDict.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete!");
                    $('#serialized-item-window').jqxWindow('close');
                    WRPAdminApp.pagescript.getSerializedItemDictList();
                    WRPAdminApp.pagescript.getAccessoryItemDictList();
                } else {
                    alert("Error. ("+ result + ")");
                }
            }
        });
    },
    getAccessoryItemDictList: function() {
    	var param;
        param={};
        
        try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	}
    	
        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
            param.keyword = document.getElementById("inven-accessory-search-keyword").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }
        try {
        	param.category = parseInt(document.getElementById("inventory-accessory-category").value);
        	if (isNaN(param.category)) {
        		param.category = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        try {
        	param.subCategory = parseInt(document.getElementById("inventory-accessory-category-sub").value);
        	if (isNaN(param.subCategory)) {
        		param.subCategory = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        try {
			if (document.getElementById("item-type-acc").checked == true) {
				param.searchAcc=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		try {
			if (document.getElementById("acc-instock").checked == true) {
				param.searchInstock=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		
		param.itemType = "2,3";
		
        WRPAdminApp.pagescript._selectedAccessoryItemSid = 0;

        $.ajax({
            url: "ajax/item/getItemDictListForInven.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
            	elem = $("#jqx-inventory-items-accessory-list");
    			data = result.data;
    			elem.jqxGrid("clear");
    			if (!data) return;
    			
    			if (elem) {
    				elem.jqxGrid("addrow", null, data);
    			}
    			
    			 try {
             		document.getElementById("loading-container").style.display = "none";
             	} catch (e) {
             		console.warn(e);
             	}
            }
        })
    },
    informAccessoryItemDictInfo: function(event) {
        var storeId, i, len, elem, list, rowdata;

        rowdata = event.args.row;
        console.log(rowdata);
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedAccessoryItemSid = rowdata.sid;
        if (isNaN(WRPAdminApp.pagescript._selectedAccessoryItemSid)) {
            console.warn("accessory item sid error");
            WRPAdminApp.pagescript._selectedAccessoryItemSid = 0;
            return;
        }

        try {
            try {
                document.getElementById("accessory-item-item-code").value = (rowdata.item_code !== undefined && rowdata.item_code !== null)? rowdata.item_code : "";
            } catch (e) {
                console.log(e);
            }
            try {
                document.getElementById("accessory-item-model").value = (rowdata.model !== undefined && rowdata.model !== null)? rowdata.model : "";
            } catch (e) {
                console.log(e);
            }
            try {
                document.getElementById("accessory-item-description").value = (rowdata.description !== undefined && rowdata.description !== null)? rowdata.description : "";
            } catch (e) {
                console.log(e);
            }
            try {
                document.getElementById("accessory-item-distributor").value = (rowdata.distributor !== undefined && rowdata.distributor !== null)? rowdata.distributor : "";
            } catch (e) {
                console.log(e);
            }
            try {
                document.getElementById("accessory-item-manufacturer").value = (rowdata.manufacturer !== undefined && rowdata.manufacturer !== null)? rowdata.manufacturer : "";
            } catch (e) {
                console.log(e);
            }
            try { 
                document.getElementById("accessory-item-category").value = (rowdata.category !== undefined && rowdata.category !== null)? rowdata.category : "";
            } catch (e) {
                console.log(e);
            }

            
            try { 
                document.getElementById("accessory-item-sub-category").value = (rowdata.sub_category !== undefined && rowdata.sub_category !== null)? rowdata.sub_category : "";
            } catch (e) {
                console.log(e);
            }
            /*
            if (rowdata.category) {
                if (rowdata.subCategory) {
                    WRPAdminApp.pagescript.getCategoriesDicListByParentSID(rowdata.category, rowdata.subCategory, "accessory-item-sub-category");
                } else {
                    WRPAdminApp.pagescript.getCategoriesDicListByParentSID(rowdata.category, undefined, "accessory-item-sub-category");
                }
            } else {
                try {
                    document.getElementById("accessory-item-sub-category").innerHTML = '';
                } catch (e) {
                    console.log(e);
                }
            }
			*/
            try {
                document.getElementById("accessory-item-color").value = (rowdata.color !== undefined && rowdata.color !== null)? rowdata.color : "";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-condition").value = (rowdata.condition !== undefined && rowdata.condition !== null)? rowdata.condition : "";
            } catch (e) {
                console.log(e);
            }
            try {
                document.getElementById("accessory-item-sku").value = (rowdata.sku !== undefined && rowdata.sku !== null)? rowdata.sku : "";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-item-type").value = (rowdata.item_type !== undefined && rowdata.item_type !== null)? rowdata.item_type : 0;
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-qty").value = (rowdata.qty !== undefined && rowdata.qty !== null)? rowdata.qty : "";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-wholesale-price").value = (rowdata.retail_price !== undefined && rowdata.retail_price !== null)? "$"+rowdata.retail_price.toFixed(2) : "$0.00";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-retail-price").value = (rowdata.wholesale_price !== undefined && rowdata.wholesale_price !== null)? "$"+rowdata.wholesale_price.toFixed(2) : "$0.00";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-item-cost").value = (rowdata.item_cost !== undefined && rowdata.item_cost !== null)? "$"+rowdata.item_cost.toFixed(2) : "$0.00";
            } catch (e) {
                console.log(e);
            }
            
            try {
                document.getElementById("accessory-item-profile-image-file").value = "";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-profile-image-view").style.backgroundImage = "url('../"+ rowdata.image +"')";
            } catch (e) {
                console.log(e);
            }
        } catch (e) {

        }
        
        
        
        
        
        /*
        WRPAdminApp.pagescript.getItemTypeList();

        $.ajax({
            url: "ajax/item/getItemDictByItemSid.jsp",
            data: {
                storeId: storeId,
                itemSid: WRPAdminApp.pagescript._selectedAccessoryItemSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                try {
                    try {
                        document.getElementById("accessory-item-item-code").value = (data.itemCode !== undefined && data.itemCode !== null)? data.itemCode : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-model").value = (data.model !== undefined && data.model !== null)? data.model : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-description").value = (data.description !== undefined && data.description !== null)? data.description : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-distributor").value = (data.distributor !== undefined && data.distributor !== null)? data.distributor : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-manufacturer").value = (data.manufacturer !== undefined && data.manufacturer !== null)? data.manufacturer : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-category").value = data.category;
                    } catch (e) {
                        console.log(e);
                    }

                    if (data.category) {
                        if (data.subCategory) {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, data.subCategory, "accessory-item-sub-category");
                        } else {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, undefined, "accessory-item-sub-category");
                        }
                    } else {
                        try {
                            document.getElementById("accessory-item-sub-category").innerHTML = '';
                        } catch (e) {
                            console.log(e);
                        }
                    }

                    try {
                        document.getElementById("accessory-item-color").value = (data.color !== undefined && data.color !== null)? data.color : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-condition").value = (data.condition !== undefined && data.condition !== null)? data.condition : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-sku").value = (data.sku !== undefined && data.sku !== null)? data.sku : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-item-type").value = (data.itemType !== undefined && data.itemType !== null)? data.itemType : 0;
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-qty").value = (data.qty !== undefined && data.qty !== null)? data.qty : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-wholesale-price").value = (data.retailPrice !== undefined && data.retailPrice !== null)? "$"+data.retailPrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-retail-price").value = (data.wholesalePrice !== undefined && data.wholesalePrice !== null)? "$"+data.wholesalePrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-item-cost").value = (data.itemCost !== undefined && data.itemCost !== null)? "$"+data.itemCost.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }
                    
                    try {
                        document.getElementById("accessory-item-profile-image-file").value = "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-profile-image-view").style.backgroundImage = "url('../"+ data.image +"')";
                    } catch (e) {
                        console.log(e);
                    }
                } catch (e) {

                }
            }
        });
        */
    },
    editAccessoryItemDictPop: function(event) {
        var storeId, i, len, elem, list, rowdata;

        rowdata = event.args.row.bounddata;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedAccessoryItemSid = rowdata.sid;
        if (isNaN(WRPAdminApp.pagescript._selectedAccessoryItemSid)) {
            console.warn("accessory item sid error");
            WRPAdminApp.pagescript._selectedAccessoryItemSid = 0;
            return;
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemSid.jsp",
            data: {
                storeId: storeId,
                itemSid: WRPAdminApp.pagescript._selectedAccessoryItemSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                try {
                    try {
                        document.getElementById("accessory-item-item-code-pop").value = (data.itemCode !== undefined && data.itemCode !== null)? data.itemCode : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-model-pop").value = (data.model !== undefined && data.model !== null)? data.model : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-description-pop").value = (data.description !== undefined && data.description !== null)? data.description : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-distributor-pop").value = (data.distributor !== undefined && data.distributor !== null)? data.distributor : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-manufacturer-pop").value = (data.manufacturer !== undefined && data.manufacturer !== null)? data.manufacturer : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-category-pop").value = data.category;
                    } catch (e) {
                        console.log(e);
                    }

                    if (data.category) {
                        if (data.subCategory) {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, data.subCategory, "accessory-item-sub-category-pop");
                        } else {
                            WRPAdminApp.pagescript.getCategoriesDicListByParentSID(data.category, undefined, "accessory-item-sub-category-pop");
                        }
                    } else {
                        try {
                            document.getElementById("accessory-item-sub-category-pop").innerHTML = '';
                        } catch (e) {
                            console.log(e);
                        }
                    }

                    try {
                        document.getElementById("accessory-item-color-pop").value = (data.color !== undefined && data.color !== null)? data.color : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-condition-pop").value = (data.condition !== undefined && data.condition !== null)? data.condition : "";
                    } catch (e) {
                        console.log(e);
                    }
                    try {
                        document.getElementById("accessory-item-sku-pop").value = (data.sku !== undefined && data.sku !== null)? data.sku : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-item-type-pop").value = (data.itemType !== undefined && data.itemType !== null)? data.itemType : 0;
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-qty-pop").value = (data.qty !== undefined && data.qty !== null)? data.qty : "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-retail-price-pop").value = (data.retailPrice !== undefined && data.retailPrice !== null)? "$"+data.retailPrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-wholesale-price-pop").value = (data.wholesalePrice !== undefined && data.wholesalePrice !== null)? "$"+data.wholesalePrice.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-item-cost-pop").value = (data.itemCost !== undefined && data.itemCost !== null)? "$"+data.itemCost.toFixed(2) : "$0.00";
                    } catch (e) {
                        console.log(e);
                    }

                    /*try {
                        document.getElementById("accessory-item-bin-pop").value = data.bin;
                    } catch (e) {
                        console.log(e);
                    }*/
                    
                    try {
                        document.getElementById("accessory-item-profile-image-file").value = "";
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        document.getElementById("accessory-item-profile-image").style.backgroundImage = "url('../"+ data.image +"')";
                    } catch (e) {
                        console.log(e);
                    }
                    
                    try {
                        document.getElementById("accessory-item-vendor-pop").value = (data.vendor_sid !== undefined && data.vendor_sid !== null)? data.vendor_sid : "";
                    } catch (e) {
                        console.log(e);
                    }
                } catch (e) {

                }
                
                $("#accessory-edit-window").jqxWindow('open'); 
            }
        });
    },
    initAccessoryItemDictInfo: function() {
        try {
            document.getElementById("accessory-item-item-code-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("accessory-item-model-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("accessory-item-description-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("accessory-item-distributor-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("accessory-item-manufacturer-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("accessory-item-category-pop").value = 0;
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-sub-category-pop").innerHTML = '';
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-color-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-condition-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("accessory-item-sku-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-item-type-pop").value = 3;
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-qty-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-retail-price-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-retail-price-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-item-cost-pop").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-profile-image-file").value = "";
        } catch (e) {
            console.log(e);
        }

        try {
            document.getElementById("accessory-item-profile-image").style.backgroundImage = "";
        } catch (e) {
            console.log(e);
        }
        
        try {
            document.getElementById("accessory-item-wholesale-price-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        /*try {
            document.getElementById("accessory-item-bin-pop").value = 0;
        } catch (e) {
            console.log(e);
        }*/
        
        $('#accessory-edit-window').jqxWindow('open'); 
        
    },
    saveAccessoryItem: function() {
        var jqueryUploadItemImage, elem;

        try {
            if (isNaN(parseInt(WRPAdminApp.pagescript._selectedAccessoryItemSid))) {
                throw "";
            }
        } catch (e) {
            console.warn("SID Format ERR");
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("accessory-item-item-code-pop");
            if (elem.value.length == 0) {
                alert("Input item code");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-category-pop");
            if (elem.value == 0) {
                alert("Select category");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-item-cost-pop");
            if (isNaN(parseFloat(elem.value.replace("$", "")))) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }

        try {
            elem = document.getElementById("accessory-item-qty-pop");

            if (isNaN(parseInt(elem.value))) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Qty contains non-numeric character");
            return;
        }

        try {
            elem = document.getElementById("accessory-item-retail-price-pop");
            if (isNaN(parseFloat(elem.value.replace("$", "")))) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Retail Price contains non-numeric character");
            return;
        }

        try {
            elem = document.getElementById("accessory-item-wholesale-price-pop");
            if (isNaN(parseFloat(elem.value.replace("$", "")))) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Wholesale Price contains non-numeric character");
            return;
        }

        jqueryUploadItemImage = $("#accessory-item-profile-image-form");
        if (!jqueryUploadItemImage[0]) return;
        if (jqueryUploadItemImage[0].itemImageFile.files.length > 0) {
            jqueryUploadItemImage.attr("action", "ajax/item/uploadImageUpload.jsp");
            jqueryUploadItemImage.ajaxForm(WRPAdminApp.pagescript.callBackUploadAccessoryItemImageFile);
            jqueryUploadItemImage.submit();
        } else {
            WRPAdminApp.pagescript.callBackUploadAccessoryItemImageFile("", undefined);
        }
    },
    setAccessoryItemImagePreview: function() {
        var itemImage = document.getElementById("accessory-item-profile-image-file"), reader;
        if (!itemImage) return;

        if (itemImage.files && itemImage.files[0]) {
            reader = new FileReader();
            reader.onload = function(e) {
                try { document.getElementById("accessory-item-profile-image").style.backgroundImage= 'url("'+e.target.result+'")'; } catch (e) {}
            };

            reader.readAsDataURL(itemImage.files[0]);
        } else {
            try { document.getElementById("accessory-item-profile-image").style.backgroundImage= ''; } catch (e) {}
        }
    },
    callBackUploadAccessoryItemImageFile: function(imageUrl, state) { // img path
        var data = {}, elem;

        try {
            data.storeId = document.getElementById("select-store").value;
            if (data.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }


        try {
            data.sid = parseInt(WRPAdminApp.pagescript._selectedAccessoryItemSid);
            if (isNaN(data.sid)) {
                throw "";
            }
        } catch (e) {
            console.warn("SID Format ERR");
            console.warn(e);
            return;
        }

        if (data.sid == 0) {

        }

        data.image = imageUrl.trim();

        try {
            document.getElementById("accessory-item-profile-image-file").value = "";
        } catch (e) {

        }

        try {
            document.getElementById("accessory-item-profile-image").style.backgroundImage = "";
        } catch (e) {

        }

        try {
            elem = document.getElementById("accessory-item-item-code-pop");
            data.itemCode = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-model-pop");
            data.model = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-description-pop");
            data.description = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-distributor-pop");
            data.distributor = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-manufacturer-pop");
            data.manufacturer = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-category-pop");
            data.category = elem.value;
            if (data.category == 0) {
                alert("Select category");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-sub-category-pop");
            data.subCategory = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-color-pop");
            data.color = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-condition-pop");
            data.condition = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-sku-pop");
            data.sku = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("accessory-item-item-type-pop");
            data.itemType = parseInt(elem.value);
            if (isNaN(data.itemType)) {
                throw "";
            }
        } catch (e) {
            console.warn("Item type is non-numeric character");
            console.warn(e);
            alert("Item Type ERR");
            return;
        }

        try {
            elem = document.getElementById("accessory-item-item-cost-pop");
            data.itemCost = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.itemCost)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }

        try {
            elem = document.getElementById("accessory-item-qty-pop");
            data.qty = parseInt(elem.value);
            if (isNaN(data.qty)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Qty contains non-numeric character");
            return;
        }

        try {
            elem = document.getElementById("accessory-item-retail-price-pop");
            data.retailPrice = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.retailPrice)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }

        try {
            elem = document.getElementById("accessory-item-wholesale-price-pop");
            data.wholesalePrice = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.wholesalePrice)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }
        
        try {
            elem = document.getElementById("accessory-item-vendor-pop");
            data.vendor_sid = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        /*try {
            elem = document.getElementById("accessory-item-bin-pop");
            data.binsid = parseInt(elem.value);
            if (isNaN(data.binsid)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
        }*/
        
        data.serialized = 0;

        $.ajax({
            url: "ajax/item/updateItemDict.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete!");
                    $("#accessory-edit-window").jqxWindow('close');
                    WRPAdminApp.pagescript.getAccessoryItemDictList();
                    WRPAdminApp.pagescript.getSerializedItemDictList();
                    
                } else {
                    alert("Error. ("+ result + ")");
                }
            }
        });
    },
    getFeeList: function() {
        var storeId, keyword;
        
        try {
     		document.getElementById("loading-container").style.display = "block";
     	} catch (e) {
     		console.warn(e);
     	}
     	
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            keyword = document.getElementById("inven-service-items-search-keyword").value;
        } catch (e) {
        	console.warn(e);
        	return;
        }

        WRPAdminApp.pagescript._selectedServiceItemSid = 0;

        $.ajax({
            url: "ajax/fee/getFeeList.jsp",
            data: {
                storeId: storeId,
                keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
            	data = result.data;
    			if (!data) return;
    			
            	elem = $("#jqx-inventory-items-service-list");
            	elem.jqxGrid("clear");
    			
    			if (elem) {
    				elem.jqxGrid("addrow", null, data);	
    			}
    			
    			try {
             		document.getElementById("loading-container").style.display = "none";
             	} catch (e) {
             		console.warn(e);
             	}
            }
        })
    },
    informFeeInfo: function(event) {
        var storeId, rowdata;

        rowdata = event.args.row;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/fee/getFeeInfo.jsp",
            data: {
                storeId: storeId,
                feeSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data;
                if (!data) return;

                WRPAdminApp.pagescript._selectedServiceItemSid = data.sid;

                try {
                    document.getElementById("service-item-type").value = (data.feeType !== undefined && data.feeType !== null)? data.feeType: '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("service-item-name").value = (data.name !== undefined && data.name !== null)? data.name: "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("service-item-description").value = (data.description !== undefined && data.description !== null)? data.description: "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("service-item-amount").value = (data.amount !== undefined && data.amount !== null)? "$"+ data.amount.toFixed(2): "$0.00";
                } catch (e) {
                    console.warn(e);
                    return;
                }
            }
        })
    },
    editFeePop: function(event) {
        var storeId, rowdata;

        rowdata = event.args.row.bounddata;

        if(rowdata.sid < 100001 && rowdata.sid > 0){
        	alert("Can not be edited !");
        	return;
        }
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/fee/getFeeInfo.jsp",
            data: {
                storeId: storeId,
                feeSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data;
                if (!data) return;

                WRPAdminApp.pagescript._selectedServiceItemSid = data.sid;

                try {
                    document.getElementById("service-item-type-pop").value = (data.feeType !== undefined && data.feeType !== null)? data.feeType: '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("service-item-name-pop").value = (data.name !== undefined && data.name !== null)? data.name: "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("service-item-description-pop").value = (data.description !== undefined && data.description !== null)? data.description: "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("service-item-amount-pop").value = (data.amount !== undefined && data.amount !== null)? "$"+ data.amount.toFixed(2): "$0.00";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                $("#service-items-edit-window").jqxWindow('open');
            }
        })
    },
    initFeeInfo: function() {
        WRPAdminApp.pagescript._selectedServiceItemSid = 0;
       
        try {
            document.getElementById("service-item-type-pop").value = 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("service-item-name-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("service-item-description-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("service-item-amount-pop").value = "$0.00";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $("#service-items-edit-window").jqxWindow('open');
    },
    setFeeInfo: function() {
        var data, storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        data = {};

        data.feeSid = WRPAdminApp.pagescript._selectedServiceItemSid;

        if (data.feeSid < 100001 && data.feeSid > 0) {
        	alert("Can not be edited !");
        	return;
        }
        
        data.storeId = storeId;

        try {
            data.feeType = document.getElementById("service-item-type-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.name = document.getElementById("service-item-name-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.description = document.getElementById("service-item-description-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.amount = parseFloat(document.getElementById("service-item-amount-pop").value.replace("$",""));
            if (isNaN(data.amount)) {
                alert("Amount contains non-numeric characters");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/fee/setFeeInfo.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete");
                    $("#service-items-edit-window").jqxWindow('close');
                    WRPAdminApp.pagescript.getFeeList();
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },

    getVendorList: function() {
        WRPAdminApp.pagescript._selectedVendorSid = 0;

        $.ajax({
            url: "ajax/vendor/getVendorList.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, option_innerHTML;
                data = result.data;

                if (!data) return;

                innerHTML = [];
                option_innerHTML = [];
                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        
                        option_innerHTML.push('<option value="');
                        option_innerHTML.push(obj.sid);
                        option_innerHTML.push('">');
                        option_innerHTML.push(obj.vendorId);
                        option_innerHTML.push('</option>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                try {
                    document.getElementById("serialized-item-vendor-pop").innerHTML = option_innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                try {
                    document.getElementById("accessory-item-vendor-pop").innerHTML = option_innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                option_innerHTML = undefined;
                innerHTML = undefined;
            }
        });
    },
    selectVendor: function() {
        var elem, parent, i, len, selected;

        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }
        selected = arguments[0];

        parent = selected;
        while(parent) {
            try {
                if (parent.id === "inventory-vendor-list") break;
            } catch (e) {

            }
            parent = parent.parentNode;
        }

        if (!parent) return;

        WRPAdminApp.pagescript._selectedVendorSid = 0;

        for (i = 0, len = parent.children.length; i < len; i++) {
            try {
                elem = parent.children[i];
                if (elem === selected) {
                    elem.setAttribute("class", "selected");
                    WRPAdminApp.pagescript._selectedVendorSid = parseInt(elem.getAttribute("vendor_sid"));
                    if (isNaN(WRPAdminApp.pagescript._selectedVendorSid)) {
                        console.warn("selectVendor : vendor sid error");
                        return;
                    }
                } else {
                    elem.setAttribute("class", "");
                }
            } catch (e) {
                console.warn(e);
                return;
            }
        }
    },
    getReturnedItemsList: function() {
        var storeId, start_date, end_date;

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
        
        start_date = $('#inventory-return-start-date').jqxDateTimeInput('getDate');
        start_date= $.jqx.dataFormat.formatdate(start_date, 'MM/dd/yyyy');
        end_date = $('#inventory-return-end-date').jqxDateTimeInput('getDate');
        end_date= $.jqx.dataFormat.formatdate(end_date, 'MM/dd/yyyy');

        $.ajax({
            url: "ajax/inventory/getReturnedItemsList.jsp",
            data: {
                storeId: storeId,
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, i, elem;
            	data = result.data;
                if (!data) return;

                elem = $("#jqx-inventory-returned-list");
            	elem.jqxGrid("clear");
            	
            	if(elem){
            		for(i = 0; i < data.length; i++){
            			if(data[i].taxRate !== undefined && data[i].taxRate > 0){
                			data[i].taxAmnt = (data[i].qty * (data[i].price * data[i].taxRate));
                			data[i].subTotal = (data[i].qty * (data[i].price + (data[i].price * data[i].taxRate)));
                		}else{
                			data[i].taxAmnt = '';
                			data[i].subTotal = (data[i].qty * data[i].price);
                		}
            		}
                	elem.jqxGrid("addrow", null, data,"last");
            	}
            }
        });
    },
    /*BIN START (BANGWOORI) */
    getBinSelectList: function(){
    	var storeId;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	$.ajax({
            url: "ajax/bin/getBinCategory.jsp",
            data: {
                storeId: storeId,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            		var data, i, len, obj, innerHTML;

            		data = result.data;
            		if (!data) return;

            		innerHTML = [];
            		innerHTML.push('<option value="0">-- SELECT --</option>');
            		 
            		for (i = 0, len = data.length; i < len; i++) {
            			try {
            				obj = data[i];

            				innerHTML.push('<option value="');
            				innerHTML.push(obj.sid);
            				innerHTML.push('"');
            				innerHTML.push('>');
            				innerHTML.push(obj.bin_type);
            				innerHTML.push('</option>');
            			} catch (e) {
            				console.warn(e);
            				return;
            			}
            		}

            		try {
            			document.getElementById("inven-bin-type-pop").innerHTML = innerHTML.join("");
            		} catch (e) {
            			console.warn(e);
            		}
            		
            		try {
            			document.getElementById("rule-info-destination-pop").innerHTML = innerHTML.join("");
            		} catch (e) {
            			console.warn(e);
            		}
            		
            		try {
            			document.getElementById("rule-info-destination").innerHTML = innerHTML.join("");
            		} catch (e) {
            			console.warn(e);
            		}
            }
        });
    },
    getRuleList: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/return_rules/getRuleList.jsp",
            data: {
                storeId: storeId,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			
    			data = result.data;
    			
    			if (!data) return;
    			
    			elem = $("#jqx-return-reason-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");		
    				}
    			}
            }
        })
    },
    getRuleInfo: function(event) {
        var storeId, rowdata;
        rowdata = event.args.row;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/return_rules/getRuleInfo.jsp",
            data: {
                storeId: storeId,
                sid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			data = result.data;
    			if (!data) return;

    			try {
    	            document.getElementById("rule-info-name").value = data.return_reason;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-description").value = data.description;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-destination").value = data.destination;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-date").value = data.update_date;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-updater").value = data.user_name;
    	        } catch (e) {
    	            console.log(e);
    	        }
            }
        })
    },
    editRuleInfo: function(event) {
        var storeId, rowdata;
        rowdata = event.args.row.bounddata;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        WRPAdminApp.pagescript._selectedRuleSid = rowdata.sid;
        $.ajax({
            url: "ajax/return_rules/getRuleInfo.jsp",
            data: {
                storeId: storeId,
                sid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			data = result.data;
    			if (!data) return;
    			try {
    	            document.getElementById("rule-info-name-pop").value = data.return_reason;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-description-pop").value = data.description;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-destination-pop").value = data.destination;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-date-pop").value = data.update_date;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        try {
    	            document.getElementById("rule-info-updater-pop").value = data.user_name;
    	        } catch (e) {
    	            console.log(e);
    	        }
    	        
    	        $('#rule-edit-window').jqxWindow('open'); 
            }
        })
    },
    addRule: function() {
    	WRPAdminApp.pagescript._selectedRuleSid = 0;
        
        try {
            document.getElementById("rule-info-name-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("rule-info-description-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("rule-info-destination-pop").value = 0;
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("rule-info-date-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("rule-info-updater-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        $('#rule-edit-window').jqxWindow('open'); 
    },
    setRuleInfo: function() {
        var data, storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        data = {};
        data.storeId = storeId;
        data.sid = WRPAdminApp.pagescript._selectedRuleSid;
        
        try {
            data.return_reason = document.getElementById("rule-info-name-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.description = document.getElementById("rule-info-description-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            data.destination = document.getElementById("rule-info-destination-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }
       

        $.ajax({
            url: "ajax/return_rules/setRuleInfo.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete");
                    $("#rule-edit-window").jqxWindow('close');
                    WRPAdminApp.pagescript.getRuleList();
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    getPoHistoryBySerialItem: function(itemSid) {
        var storeId, i, len, elem, list, rowdata,search_start_date,search_end_date;
        //rowdata = event.args.row.bounddata;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        search_start_date = $('#item-po-search-start-date').val();
        search_end_date = $('#item-po-search-end-date').val();
        
        $.ajax({
            url: "ajax/purchase_order/getPOrderListBySerialItem.jsp",
            data: {
                itemSid: itemSid,
            	storeId: storeId,
            	search_start_date: search_start_date,
            	search_end_date: search_end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                elem = $("#jqx-po-history");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					switch (obj.status) {
    	                case 0:
    	                	obj.statusStr="Order";
    	                    break;
    	                case 2:
    	                	obj.statusStr="Approval";
    	                    break;
    	                case 4:
    	                	obj.statusStr="Complete";
    	                    break;
    	                }
    				}
    				elem.jqxGrid("addRow", null, data, "last");
    			}
            }
        });
    },
    /*BIN END (BANGWOORI) */
    getSalesHistoryBySerialItem: function(itemSid) {
        var storeId, i, len, elem, list, rowdata, start_date, end_date;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/invoice/getInvoiceListByItemSid.jsp",
            data: {
                itemSid: itemSid,
            	storeId: storeId,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                elem = $("#jqx-sales-history");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					obj.date = WRPAdminApp.timeZone(obj.date);
    				}
    				elem.jqxGrid("addRow", null, data, "last");
    				
    				$('#serialized-item-history-radio-1').on('checked', function (event) {
    					var start, end;
    					var date = new Date();
    					end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					date.setDate(date.getDate() - 7);
    					start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					$("#serialized-item-search-start-date").jqxDateTimeInput('setDate', start);
    		        	$("#serialized-item-search-end-date").jqxDateTimeInput('setDate', end);
    		        	if (start != null || end != null) {
    		        		var filtergroup = new $.jqx.filter();
    		        		var filtervalue = $("#serialized-item-search-start-date").jqxDateTimeInput('getDate');
    		        		var filtercondition = 'GREATER_THAN_OR_EQUAL';
    		        		var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		        		filtervalue = $("#serialized-item-search-end-date").jqxDateTimeInput('getDate');
    		        		filtercondition= 'LESS_THAN_OR_EQUAL';
    		        		var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		        		var operator = 0;
    		        		filtergroup.addfilter(operator, filter1);
    		        		filtergroup.addfilter(operator, filter2);
    		                   	
    		        		elem.jqxGrid('addfilter', 'date', filtergroup);
    		        		elem.jqxGrid('applyfilters');
    		            }
    		  		 });
    		  		 
    		       	$('#serialized-item-history-radio-2').on('checked', function (event) {
    		       		var start, end;
    					var date = new Date();
    					end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					date.setMonth(date.getMonth() - 1);
    					start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					$("#serialized-item-search-start-date").jqxDateTimeInput('setDate', start);
    		        	$("#serialized-item-search-end-date").jqxDateTimeInput('setDate', end);
    		        	if (start != null || end != null) {
    		        		var filtergroup = new $.jqx.filter();
    		        		var filtervalue = $("#serialized-item-search-start-date").jqxDateTimeInput('getDate');
    		                   	var filtercondition = 'GREATER_THAN_OR_EQUAL';
    		                   	var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	filtervalue = $("#serialized-item-search-end-date").jqxDateTimeInput('getDate');
    		                   	filtercondition= 'LESS_THAN_OR_EQUAL';
    		                   	var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	var operator = 0;
    		                   	filtergroup.addfilter(operator, filter1);
    		                   	filtergroup.addfilter(operator, filter2);
    		                   	
    		                   	elem.jqxGrid('addfilter', 'date', filtergroup);
    		                   	elem.jqxGrid('applyfilters');
    		            }
    		  		 });
    		  		 
    		       	$('#serialized-item-history-radio-3').on('checked', function (event) {
    		       		var start, end;
    					var date = new Date();
    					end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					date.setMonth(date.getMonth() - 3);
    					start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					$("#serialized-item-search-start-date").jqxDateTimeInput('setDate', start);
    		        	$("#serialized-item-search-end-date").jqxDateTimeInput('setDate', end);
    		        	if (start != null || end != null) {
    		        		var filtergroup = new $.jqx.filter();
    		        		var filtervalue = $("#serialized-item-search-start-date").jqxDateTimeInput('getDate');
    		                   	var filtercondition = 'GREATER_THAN_OR_EQUAL';
    		                   	var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	filtervalue = $("#serialized-item-search-end-date").jqxDateTimeInput('getDate');
    		                   	filtercondition= 'LESS_THAN_OR_EQUAL';
    		                   	var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	var operator = 0;
    		                   	filtergroup.addfilter(operator, filter1);
    		                   	filtergroup.addfilter(operator, filter2);
    		                   	
    		                   	elem.jqxGrid('addfilter', 'date', filtergroup);
    		                   	elem.jqxGrid('applyfilters');
    		            }
    		       	});
    		       	
    				$('#serialized-item-history-radio-1').jqxRadioButton('check');
    			}
            }
        });
    },
    getPriceHistoryBySerialItem: function(itemSid, sku) {
        var storeId, i, len, elem, list, rowdata;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/promotion/getPromotionListByItem.jsp",
            data: {
                itemSid: itemSid,
            	storeId: storeId,
            	sku: sku
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                elem = $("#jqx-price-history");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");		
    			}
            }
        });
    },
    getPoHistoryByAccessory: function(itemSid) {
        var storeId, i, len, elem, list, rowdata;
        //rowdata = event.args.row.bounddata;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/purchase_order/getPOrderListBySerialItem.jsp",
            data: {
                itemSid: itemSid,
            	storeId: storeId,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                elem = $("#jqx-accessory-po-history");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					obj.orderDate = WRPAdminApp.timeZone(obj.orderDate);
    					elem.jqxGrid("addRow", null, obj, "last");		
    				}
    			}
            }
        });
    },
    getSalesHistoryByAccessory: function(itemSid) {
        var storeId, i, len, elem, list, rowdata;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/invoice/getInvoiceListByItemSid.jsp",
            data: {
                itemSid: itemSid,
            	storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                elem = $("#jqx-accessory-sales-history");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					if(obj.date != null){
    						obj.date = WRPAdminApp.timeZone(obj.date);
    					}
    					elem.jqxGrid("addRow", null, obj, "last");		
    				}
    				
    				$('#accessory-sales-history-radio-1').on('checked', function (event) {
    					var start, end;
    					var date = new Date();
    					end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					date.setDate(date.getDate() - 7);
    					start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					$("#accessory-sales-search-start-date").jqxDateTimeInput('setDate', start);
    		        	$("#accessory-sales-search-end-date").jqxDateTimeInput('setDate', end);
    		        	if (start != null || end != null) {
    		        		var filtergroup = new $.jqx.filter();
    		        		var filtervalue = $("#accessory-sales-search-start-date").jqxDateTimeInput('getDate');
    		        		var filtercondition = 'GREATER_THAN_OR_EQUAL';
    		        		var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		        		filtervalue = $("#accessory-sales-search-end-date").jqxDateTimeInput('getDate');
    		        		filtercondition= 'LESS_THAN_OR_EQUAL';
    		        		var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		        		var operator = 0;
    		        		filtergroup.addfilter(operator, filter1);
    		        		filtergroup.addfilter(operator, filter2);
    		                   	
    		        		elem.jqxGrid('addfilter', 'date', filtergroup);
    		        		elem.jqxGrid('applyfilters');
    		            }
    		  		 });
    		  		 
    		       	$('#accessory-sales-history-radio-2').on('checked', function (event) {
    		       		var start, end;
    					var date = new Date();
    					end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					date.setMonth(date.getMonth() - 1);
    					start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					$("#accessory-sales-search-start-date").jqxDateTimeInput('setDate', start);
    		        	$("#accessory-sales-search-end-date").jqxDateTimeInput('setDate', end);
    		        	if (start != null || end != null) {
    		        		var filtergroup = new $.jqx.filter();
    		        		var filtervalue = $("#accessory-sales-search-start-date").jqxDateTimeInput('getDate');
    		                   	var filtercondition = 'GREATER_THAN_OR_EQUAL';
    		                   	var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	filtervalue = $("#accessory-sales-search-end-date").jqxDateTimeInput('getDate');
    		                   	filtercondition= 'LESS_THAN_OR_EQUAL';
    		                   	var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	var operator = 0;
    		                   	filtergroup.addfilter(operator, filter1);
    		                   	filtergroup.addfilter(operator, filter2);
    		                   	
    		                   	elem.jqxGrid('addfilter', 'date', filtergroup);
    		                   	elem.jqxGrid('applyfilters');
    		            }
    		  		 });
    		  		 
    		       	$('#accessory-sales-history-radio-3').on('checked', function (event) {
    		       		var start, end;
    					var date = new Date();
    					end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					date.setMonth(date.getMonth() - 3);
    					start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    					$("#accessory-sales-search-start-date").jqxDateTimeInput('setDate', start);
    		        	$("#accessory-sales-search-end-date").jqxDateTimeInput('setDate', end);
    		        	if (start != null || end != null) {
    		        		var filtergroup = new $.jqx.filter();
    		        		var filtervalue = $("#accessory-sales-search-start-date").jqxDateTimeInput('getDate');
    		                   	var filtercondition = 'GREATER_THAN_OR_EQUAL';
    		                   	var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	filtervalue = $("#accessory-sales-search-end-date").jqxDateTimeInput('getDate');
    		                   	filtercondition= 'LESS_THAN_OR_EQUAL';
    		                   	var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
    		                   	var operator = 0;
    		                   	filtergroup.addfilter(operator, filter1);
    		                   	filtergroup.addfilter(operator, filter2);
    		                   	
    		                   	elem.jqxGrid('addfilter', 'date', filtergroup);
    		                   	elem.jqxGrid('applyfilters');
    		            }
    		       	});
    		       	
    				$('#accessory-sales-history-radio-1').jqxRadioButton('check');
    			}
            }
        });
    },
    /*170209 jh*/
    getSalesHistoryByService: function(feeSid) {
        var storeId, i, len, elem, list, rowdata;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/invoice/getInvoiceListByFeeSid.jsp",
            data: {
            	feeSid: feeSid,
            	storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                elem = $("#jqx-service-sales-history");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					obj.date = WRPAdminApp.timeZone(obj.date);
    					elem.jqxGrid("addRow", null, obj, "last");		
    				}
    			}
            }
        });
    },
    getReturnDatas: function(event) {
    	var invoice_no, store_id;
    	invoice_no = event.args.row.bounddata.invoiceNo;

        try {
            store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

    	
    	WRPAdminApp.pagescript._selectedInvoiceItems = undefined;
    	WRPAdminApp.pagescript._selectedInvoiceRatePlans = undefined;
    	WRPAdminApp.pagescript._selectedInvoiceInfo = undefined;
    	
    	setTimeout(WRPAdminApp.pagescript.waitingInvoiceData, 250);
    	
    	$.ajax({
    		url: "ajax/invoice/getInvoiceInfo.jsp",
    		data: {
    			store_id: store_id,
    			invoice_no: invoice_no
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data;
    			data = result.data;
    			if (!data) {
    				WRPAdminApp.pagescript._selectedInvoiceInfo = {};
    				return;
    			}
    			
    			WRPAdminApp.pagescript._selectedInvoiceInfo = data;
    		}
    	});  
    	
    	$.ajax({
    		url: "ajax/invoice/getInvoiceItems.jsp",
    		data: {
    			store_id: store_id,
    			invoice_no: invoice_no
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, items, rateplans, newObj, i, len, obj, i2, len2, obj2;
    			data = result.data;
    			if (!data) {
    				WRPAdminApp.pagescript._selectedInvoiceItems = [];
    				WRPAdminApp.pagescript._selectedInvoiceRatePlans = [];
    				return;
    			}
    			
    			items = [];
    			rateplans = [];
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				if (obj.item_type === 2) {
    					
    					for (i2 = 0, len2 = rateplans.length; i2 < len2; i2++) {
    						obj2 = rateplans[i2];
    						if (obj2.payment === obj.payment_index) {
    							obj2.plans.push(obj);
    							break;
    						}
    						obj2 = undefined;
    					}
    					if (obj2 === undefined) {
    						obj2 = {};
    						obj2.payment = obj.payment_index;
    						obj2.plans = [obj];
    						rateplans.push(obj2);
    					}    					
    				} else {
    					items.push(obj);
    				}
    			}
    			
    			WRPAdminApp.pagescript._selectedInvoiceItems = items;
    			WRPAdminApp.pagescript._selectedInvoiceRatePlans = rateplans;
    		}
    	});
    },
    waitingInvoiceData: function() {
    	var pagescript;
    	
    	pagescript = WRPAdminApp.pagescript;
    	
    	if (pagescript._selectedInvoiceInfo === undefined
    	  || pagescript._selectedInvoiceRatePlans === undefined
    	  || pagescript._selectedInvoiceItems === undefined) {
    		setTimeout(pagescript.waitingInvoiceData, 250);
    	} else {
        	try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        		return;
        	}      	
        	$("#return-invoice-viewer").jqxWindow('open');
        	pagescript.priceInvoiceInfo();
        	pagescript.printInvoiceItems();
    	}
    },
    priceInvoiceInfo: function() {
    	var info;
    	
    	info = WRPAdminApp.pagescript._selectedInvoiceInfo;
    	
    	if (info === undefined) {
    		return;
    	}
    	
    	try {
    		document.getElementById("invoice-selected-customer-id").innerHTML = (info.cust_id !== undefined)? info.cust_id : "&nbsp";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("invoice-selected-customer-name").innerHTML = (info.cust_name !== undefined)? info.cust_name : "&nbsp";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("invoice-selected-customer-address").innerHTML = (info.cust_addr !== undefined)? info.cust_addr : "&nbsp";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    },
    printInvoiceItems: function() {
    	var total_discount, total_qty, total_tax_amnt, total_price, list, i, len, obj, tmp, width, height;;
    	
    	list = WRPAdminApp.pagescript._selectedInvoiceItems;
    	if (list === undefined) return;
    	
    	total_discount = 0;
    	total_tax_amnt = 0;
    	total_price = 0;
    	total_qty = 0;
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if (obj.qty) total_qty = total_qty + obj.qty;
    		if (obj.discount) {
    			total_discount = total_discount + obj.discount;
    		} else {
    			obj.discount = 0;
    		}
    		if (obj.name) {
    			obj.description = obj.name;
    			obj.name = undefined;
    			delete obj.name;
    		}
    		if (obj.item_type === 3 || obj.item_type === 5) {
    			if (obj.rateplan_code) {
        			obj.item_code = obj.rateplan_code;
        			obj.rateplan_code = undefined;
        			delete obj.rateplan_code;
    			}
    		}
    		if (obj.amount) {
    			obj.price = obj.amount;
    			obj.amount = undefined;
    			delete obj.amount;
    		} else {
    			obj.price = 0;
    		}
    		if (obj.tax_amnt === undefined) {
        		if (obj.tax_rate) {
        			obj.tax_amnt = (obj.price - obj.discount) * obj.tax_rate; 
        		} else {
        			obj.tax_amnt = 0;
        		}
    		}
    		
    		total_tax_amnt = total_tax_amnt + obj.tax_amnt;
    		if (obj.subtotal === undefined) {
        		tmp = ((obj.price - obj.discount + obj.tax_amnt) * obj.qty);
    			obj.subtotal = tmp;
    		}
    		total_price = total_price + obj.subtotal;    		
    	}
    	
    	obj = $("#jqx-return-invoice-item-list");
    	
    	if (obj) {
    		obj[0].parentNode.innerHTML = '<div id="jqx-return-invoice-item-list"></div>';
    	}
    	
    	obj = $("#jqx-return-invoice-item-list");
    	if (obj) {
    		obj.jqxDataTable({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
				filterable: false,
				editable: false,
				rowDetails: true,
				initRowDetails: WRPAdminApp.pagescript.getRowDetail,
				selectionMode: "custom",
				sortable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "row_type", type: "number" }, // 1: handset, 2: other items, 3: payment, 4: fee 
						{ name: "inventory_sid", type: "number" },
						{ name: "item_sid", type: "number" },
						{ name: "carrier_sid", type: "number" },
						{ name: "promotion_item_sid", type: "number" },
						{ name: "transaction_type", type: "number" },
						// hidden end
						{ name: "item_code", type: "string" },
						{ name: "description", type: "string" },
						{ name: "serial_no", type: "string" },
						{ name: "qty", type: "number" },
						{ name: "price", type: "number" },
						{ name: "tax_amnt", type: "number" },
						{ name: "discount", type: "number" },
						{ name: "subtotal", type: "number" },
						{ name: "mobile_no", type: "number" }
					],
					localdata: list
				}),
				columns: [
					{ datafield: "row_type", hidden: true, editable: false }, // 1: handset, 2: other items, 3: payment, 4: fee 
					{ datafield: "inventory_sid", hidden: true, editable: false },
					{ datafield: "item_sid", hidden: true, editable: false },
					{ datafield: "carrier_sid", hidden: true, editable: false },
					{ datafield: "promotion_item_sid", hidden: true, editable: false },
					{ datafield: "transaction_type", hidden: true, editable: false },
					{ text: "Item Code", datafield: "item_code", editable: false, autoCellHeight: false },
					{ text: "Description", datafield: "description", editable: false, autoCellHeight: false },
					{ text: "Serial No.", datafield: "serial_no", editable: false, autoCellHeight: false },
					{ text: "Qty.", datafield: "qty", autoCellHeight: false },
					{ text: "Price", width: 80, datafield: "price", cellsformat: "c2", autoCellHeight: false },
					{ text: "Tax Amnt.", width: 80, datafield: "tax_amnt", cellsformat: "c2", editable: false, autoCellHeight: false },
					{ text: "Disc.", width: 80, datafield: "discount", cellsformat: "c2", editable: false, autoCellHeight: false },
					{ text: "Sub Total", width: 80, datafield: "subtotal", cellsformat: "c2", editable: false, autoCellHeight: false },
					{ text: "Mobile No.", datafield: "mobile_no", autoCellHeight: false }
				]
			});
    		
    	}
   	
    	obj = document.getElementById("return-invoice-info-total-price");
    	if (obj) {
    		obj.innerHTML = "$" + total_price.toFixed(2);
    	}
    	
    	obj = document.getElementById("return-invoice-total-discount");
    	if (obj) {
    		obj.innerHTML = "$" + total_discount.toFixed(2);
    	}
    	
    	obj = document.getElementById("return-invoice-total-taxes");
    	if (obj) {
    		obj.innerHTML = "$" + total_tax_amnt.toFixed(2);
    	}
    	
    	obj = document.getElementById("return-invoice-info-total-qty");
    	if (obj) {
    		obj.innerHTML = total_qty;
    	}
    	
    },
	getRowDetail: function(id, row, element, rowinfo) {
		var table, table2, innerHTML, arr, newElem, obj;
		
		switch (parseInt(row.row_type)) {
		case 1:
			if (row.coupon_sid !== undefined && row.coupon_sid > 0) {
			    rowinfo.detailsHeight = 130;
				element.html('<div style="width: 100%;height: 25%;"></div><div style="margin-top:5px; width: 100%;height: 25%;"></div><div style="margin-top:5px; width: 100%;height: 25%;"></div><div style="margin-top:5px; width: 100%;height: 25%;"></div>');
				table = $(element.children()[3]);
				
				arr = {};
				arr.code = row.coupon_code;
				arr.name = row.coupon_name;
				arr.description = row.description;
				if (row.coupon_discount_str) {
					arr.discount_amnt = row.coupon_discount_str;
				} else {
					if (row.coupon_discount_amnt) {
						arr.discount_amnt = row.coupon_discount_amnt.toFixed(2);
					} else if (row.coupon_discount_rate) {
						if (row.coupon_discount_rate > 0 && row.coupon_discount_rate < 1) {
							arr.discount_amnt = (row.coupon_discount_rate * 100).toFixed(1) + "%";
						} else if (row.coupon_discount_rate > 1) {
							arr.discount_amnt = row.coupon_discount_rate.toFixed(1) + "%";
						}
					}
				}
				
				$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "code", type: "string" },
							{ name: "name", type: "string" },
							{ name: "description", type: "string" },
							{ name: "discount_amnt", type: "string" }
	    				],
	    				localdata: arr
	    			}),
    				width: "99%",
	    			columns: [
	    				{ text: "Coupon Code", datafield: "code", width: 250 },
	    				{ text: "Name", datafield: "name" },
	    				{ text: "Description", datafield: "description" },
	    				{ text: "Discount", datafield: "discount_amnt", width: 100 }
	    			]
				});
			} else {
			    rowinfo.detailsHeight = 65;
				element.html('<div style="width: 100%;height: 33%;"></div><div style="margin-top:5px; width: 100%;height: 33%;"></div><div style="margin-top:5px; width: 100%;height: 33%;"></div>');
			}	
			
			table = $(element.children()[0]);
			if (row.sim) {
				
				$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "sim", type: "string" }
	    				],
	    				localdata: [
	    					{sim: row.sim}
	    				]
	    			}),
    				width: "99%",
	    			columns: [
	    				{ text: "Sim Card", datafield: "sim" }
	    			]
				});
			}
		    
			table = $(element.children()[1]);
		    
		    arr = [];
		    
		    arr.push({});
		    
		    switch (parseInt(row.transaction_type)) {
		    case 0:    	
			    arr[0].transaction = "New Activation - New Handset";
		    	break;
		    case 1:	    	
			    arr[0].transaction = "Re Activation - New Handset";
		    	break;
		    case 2:	 
			    arr[0].transaction = "Upgrade - New Handset";   	
		    	break;
		    case 3:
			    arr[0].transaction = "Port-In - New Handset";	    	
		    	break;
		    case 4:	
			    arr[0].transaction = "New Activation - BYOD Handset";	    	
		    	break;
		    case 5:	  
			    arr[0].transaction = "Re Activation - BYOD Handset";	     	
		    	break;
		    case 6:	   
			    arr[0].transaction = "Upgrade - BYOD Handset";	    	
		    	break;
		    case 7:
			    arr[0].transaction = "Port-In - BYOD Handset";	   	    	
		    	break;
		    case 8:
			    arr[0].transaction = "ESN Change";	   	    	
		    	break;
		    case 9:
			    arr[0].transaction = "MDN Change";	 	    	
		    	break;
		    case 10:
			    arr[0].transaction = "MPR / DOA";		    	
		    	break;
		    case 11:	   
			    arr[0].transaction = "XBM";	 	
		    	break;
		    case 12: 
		    	if (row.is_bogo_flag === 1) {
				    arr[0].transaction = "Add-A-Line - New Handset (BOGO)";	
		    	} else if (row.is_pogo_flag === 1) {
				    arr[0].transaction = "Add-A-Line - New Handset (POGO)";	
		    	} else {
				    arr[0].transaction = "Add-A-Line - New Handset";	
		    	}     	
		    	break;
		    case 13:	
			    arr[0].transaction = "Add-A-Line - BYOD Handset";	   	    	
		    	break;
		    case 14:   
			    arr[0].transaction = "SOR"; 	
		    	break;
		    }
		    
		    if (row.promotion_item_sid > 0) {   
	    		arr[0].promotion_description = row.promotion_description;
	    		arr[0].start_date = row.promotion_start_date;
	    		arr[0].end_date = row.promotion_end_date;	
	    		arr[0].price = row.price - row.promotion_discount;
				
	    		table.css("height","100%");
				
				$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "transaction", type: "string" },
							{ name: "promotion_description", type: "string" },
							{ name: "start_date", type: "date" },
							{ name: "end_date", type: "date" },
							{ name: "promotion_price", type: "number" }
	    				],
	    				localdata: arr
	    			}),
    				width: "99%",
	    			columns: [
	    				{ text: "Transaction", datafield: "transaction", width: 250 },
	    				{ text: "Promotion Description", datafield: "promotion_description" },
	    				{ text: "Start Date", datafield: "start_date", width: 100, cellsformat: "MM/dd/yyyy" },
	    				{ text: "End Date", datafield: "end_date", width: 100, cellsformat: "MM/dd/yyyy" },
	    				{ text: "Promotion Price", datafield: "promotion_price", width: 120, cellsformat: "c2" }
	    			]
				});
		    } else {	
	    		table.css("height","100%");
				
				$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "transaction", type: "string" },
							{ name: "promotion_description", type: "string" },
							{ name: "start_date", type: "date" },
							{ name: "end_date", type: "date" },
							{ name: "promotion_price", type: "number" }
	    				],
	    				localdata: arr
	    			}),
    				width: "99%",
	    			columns: [
	    				{ text: "Transaction", datafield: "transaction", width: 250 },
	    				{ text: "Promotion Description", datafield: "promotion_description" },
	    				{ text: "Start Date", datafield: "start_date", width: 100, cellsformat: "MM/dd/yyyy" },
	    				{ text: "End Date", datafield: "end_date", width: 100, cellsformat: "MM/dd/yyyy" },
	    				{ text: "Promotion Price", datafield: "promotion_price", width: 120, cellsformat: "c2" }
	    			]
				});
		    }
		    
			table = $(element.children()[2]);	
			
			if (row.serial_no) {
				arr = WRPAdminApp.pagescript.getRateplansBySerialNo(row.serial_no);
				
				if (arr) {		
					rowinfo.detailsHeight = rowinfo.detailsHeight + arr.length * 30 + 35;
		    		table.css("height","100%");			
					$(table).jqxDataTable({
						source: new $.jqx.dataAdapter({
		    				datatype: "json",
		    				datafields: [
								{ name: "rateplan_code", type: "string" },
								{ name: "description", type: "string" },
								{ name: "price", type: "number" }
		    				],
		    				localdata: arr
		    			}),
	    				width: "99%",
		    			columns: [
		    				{ text: "Plan Code", datafield: "rateplan_code", width: 250 },
		    				{ text: "Description", datafield: "description" },
		    				{ text: "Price", datafield: "price", width: 120, cellsformat: "c2" }
		    			]
					});
				}
			}
		    		    
			break;
		case 2:
			if (row.coupon_sid !== undefined && row.coupon_sid > 0) {
			    rowinfo.detailsHeight = 65;
				element.html('<div style="width: 100%;height: 100%;"></div>');
				table = $(element.children()[0]);
				
				arr = {};
				arr.code = row.coupon_code;
				arr.name = row.coupon_name;
				arr.description = row.description;
				if (row.coupon_discount_str) {
					arr.discount_amnt = row.coupon_discount_str;
				} else {
					if (row.coupon_discount_amnt) {
						arr.discount_amnt = row.coupon_discount_amnt.toFixed(2);
					} else if (row.coupon_discount_rate) {
						if (row.coupon_discount_rate > 0 && row.coupon_discount_rate < 1) {
							arr.discount_amnt = (row.coupon_discount_rate * 100).toFixed(1) + "%";
						} else if (row.coupon_discount_rate > 1) {
							arr.discount_amnt = row.coupon_discount_rate.toFixed(1) + "%";
						}
					}
				}
				
				$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "code", type: "string" },
							{ name: "name", type: "string" },
							{ name: "description", type: "string" },
							{ name: "discount_amnt", type: "string" }
	    				],
	    				localdata: arr
	    			}),
    				width: "99%",
	    			columns: [
	    				{ text: "Coupon Code", datafield: "code", width: 250 },
	    				{ text: "Name", datafield: "name" },
	    				{ text: "Description", datafield: "description" },
	    				{ text: "Discount", datafield: "discount_amnt", width: 100 }
	    			]
				});
			} else {
			    rowinfo.detailsHeight = 0;
			}
			break;
		case 3:			
		    rowinfo.detailsHeight = 0;

		    if (row.fee_amnt === undefined) row.fee_amnt = 0;
		    if (row.price !== undefined && row.fee_amnt !== undefined) {
			    rowinfo.detailsHeight = 65;
				obj = {
					price: row.price - row.fee_amnt,
					fee: row.fee_amnt
				};
				element.html('<div style="width: 100%;height: 100%;"></div>');
				table = $(element.children()[0]);
				
				table.css("height","100%");
				
				$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "price", type: "number" },
							{ name: "fee", type: "number" }
	    				],
	    				localdata: obj
	    			}),
    				width: "99%",
	    			columns: [
	    				{ text: "Price", datafield: "price", cellsformat: "c2" },
	    				{ text: "Fee", datafield: "fee", cellsformat: "c2" }
	    			]
				});
			}
		   
			break;
		}		

	},
	getRateplansBySerialNo: function(serial_no) {
		var i, len, plans, returns, i2, len2, plan;
		if (serial_no === undefined) {
			return undefined;
		}
		
		if (WRPAdminApp.pagescript._selectedInvoiceRatePlans === undefined) {
			return undefined;
		}
		
		returns = [];
		
		for (i = 0, len = WRPAdminApp.pagescript._selectedInvoiceRatePlans.length; i < len; i++) {
			plans = WRPAdminApp.pagescript._selectedInvoiceRatePlans[i].plans;
			if (plans) {
				for (i2 = 0, len2 = plans.length; i2 < len2; i2++) {
					plan = plans[i2];
					if (plan.serial_no === serial_no) {
						returns.push(plan);
					}
				}
			}
		}
		
		return returns;
	},
};