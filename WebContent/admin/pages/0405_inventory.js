/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedSerializedItemSid: 0,
    _inputNewPOId: undefined,
    _inputReqTransferId: undefined,
    _selectedStoreId: undefined,
    _selectedAccessoryItemSid: 0,
    _selectedPoId: 0,
    _selectedTransSid: 0,
    _selectedTransItemSid: 0,
    _selectedBinSid: 0,
    _selectedRuleSid: 0,
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
    		                { name: 'sku', type: 'string' }
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
    		                      { text: 'SRP', datafield: 'retail_price', width: '5%', cellsalign: 'right', editable: false, cellsformat:"c2" }
				]
    		});
    		
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editSerializedItemDictPop);
    		components.on("rowselect", function (event) {
    			//console.log(event.args.row);
    			WRPAdminApp.pagescript.informSerializedItemDictInfo(event.args.row.sid);
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
		 
		$('#serialized-item-history-radio-1').jqxRadioButton('check');
		$('#accessory-sales-history-radio-1').jqxRadioButton('check');
		$('#service-sales-history-radio-1').jqxRadioButton('check');
		$('#inventory-return-radio-1').jqxRadioButton('check');
		
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
                }
        })
    },
    informSerializedItemDictInfo: function(data) {
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
                        document.getElementById("serialized-item-category").value = data.category;
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
            }
        })
    },
    informAccessoryItemDictInfo: function(event) {
        var storeId, i, len, elem, list, rowdata;

        rowdata = event.args.row;
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
                document.getElementById("accessory-item-item-type").value = (rowdata.itemType !== undefined && rowdata.itemType !== null)? rowdata.itemType : 0;
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-qty").value = (rowdata.qty !== undefined && rowdata.qty !== null)? rowdata.qty : "";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-wholesale-price").value = (rowdata.retailPrice !== undefined && rowdata.retailPrice !== null)? "$"+rowdata.retailPrice.toFixed(2) : "$0.00";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-retail-price").value = (rowdata.wholesalePrice !== undefined && rowdata.wholesalePrice !== null)? "$"+rowdata.wholesalePrice.toFixed(2) : "$0.00";
            } catch (e) {
                console.log(e);
            }

            try {
                document.getElementById("accessory-item-item-cost").value = (rowdata.itemCost !== undefined && rowdata.itemCost !== null)? "$"+rowdata.itemCost.toFixed(2) : "$0.00";
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

        try {
            document.getElementById("inventory-enter-order-added-items").innerHTML = '<tr class="blank"><td colspan="5"></td></tr><tr class="blank"><td colspan="5"></td></tr>';
        } catch (e) {

        }

        $.ajax({
            url: "ajax/purchase_order/getItemListInStore.jsp",
            data: {
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;
                data = result.data;

                if (!data) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr item_sid="');
                        innerHTML.push(obj.sid);
                        innerHTML.push('">');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.itemCode);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.model);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.description);
                        innerHTML.push('</td>');
                        innerHTML.push('<td><div class="invoice-btn" onclick="WRPAdminApp.pagescript.addItemToAddedItemsList(this);"></div></td>');
                        innerHTML.push('</tr>');
                    } catch(e) {

                    }
                }
                try {
                    document.getElementById("inventory-enter-order-items-list").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.log(e);
                }

                innerHTML = undefined;
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

        addItems = document.getElementById("inventory-enter-order-added-items");

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
                if (tr.nodeName === "TR") break;
            } catch (e) {

            }
            tr = tr.parentNode;
        }

        if (!tr) {
            return;
        }

        parent = tr.parentNode;

        if (parent.id === "inventory-enter-order-added-items") {
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

        elemContainer = document.getElementById("inventory-vendor-list");
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

        elemContainer = document.getElementById("inventory-enter-order-added-items");
        if (!elemContainer) {
            console.warn("added items list is not exists");
            return;
        }

        for (i = 0, len = elemContainer.children.length ; i < len; i++) {
            try {
                elem = elemContainer.children[i];
                if (elem.className.indexOf("blank") > -1) continue;
                if (elem.children.length != 5) {
                    console.warn("added items error");
                    return;
                }
                item = {};
                item.sid = parseInt(elem.getAttribute("item_sid"));
                if (isNaN(item.sid)) {
                    console.warn("added item sid error");
                }

                item.qty = parseInt(elem.children[3].children[0].value);
                if (isNaN(item.qty)) {
                    alert("qty value contains non-numeric number");
                    return;
                }

                pOrderData.items.push(item);
            } catch (e) {
                console.warn(e);
                item = undefined;
                return;
            }
        }

        $.ajax({
            url: "ajax/purchase_order/savePOrder.jsp",
            data: {
                pOrderData: JSON.stringify(pOrderData),
                storeId: storeId,
                poId: WRPAdminApp.pagescript._inputNewPOId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup("newPurchaseOrderContainer");
                    WRPAdminApp.pagescript._inputNewPOId = undefined;
                    WRPAdminApp.pagescript.getPurchaseOrderList();
                    WRPAdminApp.pagescript.getApprovalPurchaseOrderList();
                    WRPAdminApp.pagescript.getReceivePurchaseOrderList();
                    WRPAdminApp.pagescript.getCompletePurchaseOrderList();
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    openPOrderInfoPopup: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input po ID");
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
            url: "ajax/purchase_order/getPOrderInfo.jsp",
            data: {
                poSid: arguments[0],
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

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
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input po id");
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

        WRPAdminApp.openPopupInPage('POFulfillmentContainer');

        $.ajax({
            url: "ajax/purchase_order/getPOrderItemsByPoId.jsp",
            data: {
                poSid: arguments[0],
                storeId: storeId
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
                        innerHTML.push('<td>');
                        innerHTML.push(obj.orderQty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.fulfillQty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitFulfillmentContainer(');
                        innerHTML.push(obj.itemSid);
                        innerHTML.push(')"></div></td>');
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
            },
        })
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

        if (insertTarget == (len - 1)) {
            try{ document.getElementById('manual-input-serial-container').style.display = 'none'; } catch (e){ console.warn(e); }
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
                    alert("Error : " + result);
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
                data = result.data;
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
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input po id");
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

        WRPAdminApp.openPopupInPage('POReceivementContainer');


        $.ajax({
            url: "ajax/purchase_order/getPOrderItemsByPoId.jsp",
            data: {
                poSid: arguments[0],
                storeId: storeId
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
                        innerHTML.push('<td>');
                        innerHTML.push(obj.fulfillQty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.receiveQty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitReceivementContainer(');
                        innerHTML.push(obj.itemSid);
                        innerHTML.push(')"></div></td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                itemList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    openSubmitReceivementContainer: function() {
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

                    //               if (data.serialized === 0) {
                    /*
                     try {
                     document.getElementById("submit-receive-phone-po-id").value = document.getElementById("porder-receive-po-id").innerText;
                     } catch (e) {
                     console.warn(e);
                     }

                     try {
                     document.getElementById("submit-receive-phone-vendor-id").value = document.getElementById("porder-receive-vendor-id").innerText;
                     } catch (e) {
                     console.warn(e);
                     }

                     try {
                     document.getElementById("submit-receive-phone-item-id").value = data.itemCode;
                     } catch (e) {
                     console.warn(e);
                     }

                     try {
                     document.getElementById("submit-receive-phone-item-sku").value = data.sku;
                     } catch (e) {
                     console.warn(e);
                     }

                     try {
                     document.getElementById("submit-receive-phone-item-description").value = data.description;
                     } catch (e) {
                     console.warn(e);
                     }
                     WRPAdminApp.openPopupInPage("SubmitReceivePhonesContainer");
                     WRPAdminApp.pagescript.getFulfilledPhonePoItemsListBySid(data.sid);
                     } else {
                     */
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
                    WRPAdminApp.openPopupInPage("SubmitReceiveSerialContainer");
                    WRPAdminApp.pagescript.getFulfilledSerializabePoItemsListBySid(data.sid);
                    //                 }
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
    onSelectExcelFile: function(event) {
        var fileElem = event.target, file, ext, reader;

        if (fileElem.files.length > 0) {
            file = fileElem.files[0];
            console.log(file);
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
                var data, serialItemList, i, len, obj, innerHTML;
                data = result.data;
                if (!data) return;

                serialItemList = document.getElementById("submit-receive-serial-item-list");
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
                                innerHTML.push(obj.serialNo);
                                innerHTML.push('</div>');
                                innerHTML.push('<div></div>');
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 1:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<div orig="">');
                                innerHTML.push(obj.serialNo);
                                innerHTML.push('</div>');
                                innerHTML.push('<div orig="">');
                                innerHTML.push(obj.serialNo);
                                innerHTML.push('</div>');
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 2:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<div>');
                                innerHTML.push(obj.serialNo);
                                innerHTML.push('</div>');
                                innerHTML.push('<div></div>');
                                innerHTML.push('<div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>');
                                innerHTML.push('</div>');
                                break;
                            case 3:
                                innerHTML.push('<div class="item" sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<div></div>');
                                innerHTML.push('<div orig="');
                                innerHTML.push(obj.serialNo);
                                innerHTML.push('">');
                                innerHTML.push(obj.serialNo);
                                innerHTML.push('</div>');
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
        var elem, elemContainer, i, len, newElem;

        if (arguments.length < 1) {
            console.warn("toggleSerialNoCheck : no input serialNo");
            return;
        }

        elemContainer = document.getElementById("submit-receive-serial-item-list");

        if (!elemContainer) return;

        for (i = 0, len = elemContainer.children.length; i < len; i++) {
            try {
                elem = elemContainer.children[i];
                if (elem.className === "item" && elem.children.length === 3) {
                    if (elem.children[0].innerText === arguments[0]) {
                        elem.children[1].innerHTML = arguments[0];
                        break;
                    }
                }
            } catch (e) {
                console.warn(e);
            }

            if (i == len - 1) {
                newElem = document.createElement("div");
                newElem.innerHTML = '<div></div><div>'+ arguments[0] +'</div><div class="cancel" onclick="WRPAdminApp.pagescript.cancelCheckSerialNo(this);"></div>';
                newElem.className = "item";
                elemContainer.appendChild(newElem);
            }
        }
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
                status: 0,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elem;
                data = result.data;
                if (!data) return;

                try {
                    elem = document.getElementById("submit-receive-nonserial-item-ffl-qty");
                    elem.innerHTML = data.fulfillQty;
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
    submitReceivePhones: function() {
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

        serialItemList = document.getElementById("submit-receive-phone-item-list");

        if (!serialItemList) return;

        param = {};
        param.poSid = parseInt(WRPAdminApp.pagescript._selectedPoId);
        if (isNaN(param.poSid)) {
            console.warn("submitReceivePhones : PO ID Error");
            return;
        }

        param.itemSid = parseInt(WRPAdminApp.pagescript._selectedItemSid);
        if (isNaN(param.itemSid)) {
            console.warn("submitReceivePhones : Item SID Error");
            return;
        }

        param.serialIDs = [];
        for (i = 0, len = serialItemList.children.length; i < len; i++) {
            try {
                elem = serialItemList.children[i];
                tmp = parseInt(elem.getAttribute("sid"));
                if (elem.children.length == 4) {
                    if (elem.children[0].innerText.trim().length > 0 && elem.children[1].innerText.trim().length === 0) {
                        if (isNaN(tmp)) {
                            throw "submitReceiveSerializeItems : po-item sid is not existing";
                        }
                        param.serialIDs.push({ sid: tmp, serialNo: elem.children[0].innerText, status: 2 });
                    } else if (elem.children[0].innerText.trim().length === 0 && elem.children[1].innerText.trim().length > 0) {
                        param.serialIDs.push({ sid: 0, serialNo: elem.children[1].innerText, imeiNo: elem.children[2].innerText, status: 3 });
                    } else if (elem.children[0].innerText.trim().length > 0 && elem.children[1].innerText.length > 0 && elem.children[0].innerText === elem.children[1].innerText) {
                        if (isNaN(tmp)) {
                            throw "submitReceiveSerializeItems : po-item sid is not existing";
                        }
                        param.serialIDs.push({ sid: tmp, serialNo: elem.children[0].innerText, imeiNo: elem.children[2].innerText, status: 1 });
                    } else if (elem.children[0].innerText.trim().length === 0 && elem.children[1].innerText.trim().length === 0) {
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
            url: "ajax/purchase_order/saveReceiveDataPhone.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup('SubmitReceivePhonesContainer');
                    WRPAdminApp.pagescript.getFulfilledItemListByPoId(WRPAdminApp.pagescript._selectedPoId);
                } else {
                    alert("Error : " + result);
                }
            }
        });
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

                    $.ajax({
                        url: "ajax/notification/noticePOReceivementToReceiver.jsp",
                        data: {
                            poSid: poSid,
                            storeId: storeId
                        },
                        method: "POST",
                        dataType: "json",
                        success: function(result) {
                            console.log("notice po receive result : " + result);
                        }
                    });

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
    getCompletedItemListByPoId: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input po id");
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

        WRPAdminApp.openPopupInPage('POCompleteContainer');


        $.ajax({
            url: "ajax/purchase_order/getPOrderItemsByPoId.jsp",
            data: {
                poSid: arguments[0],
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data2, i, len, obj, itemList, innerHTML;
                data2 = result.data;
                if (!data2) return;

                itemList = document.getElementById("complete-purchase-order-ltem-list");
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
                        innerHTML.push('<td>');
                        innerHTML.push(obj.receiveQty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                itemList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
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
        start_date= $.jqx.dataFormat.formatdate(start_date, 'yyyy-MM-dd');
        end_date = $('#inventory-return-end-date').jqxDateTimeInput('getDate');
        end_date= $.jqx.dataFormat.formatdate(end_date, 'yyyy-MM-dd');

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
    informTransferInfoByTransferId: function() {
        var transferId;

        try {
            transferId = document.getElementById("inventory-req-transfer-id").value;
            if (transferId.length == 0) {
                alert("Input Transfer ID");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._inputReqTransferId = transferId;

        $.ajax({
            url: "ajax/transfer/informTransferInfoByTransferId.jsp",
            data: {
                transferId: transferId
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
                    alert("This Transfer already exists");
                    WRPAdminApp.pagescript._inputReqTransferId = undefined;
                    return;
                }

                WRPAdminApp.openPopupInPage('reqTransferContainer');
                WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='reqTransferInputIDContainer']"));
                WRPAdminApp.pagescript.getStoreListByOwnerSid();
            }
        });
    },
    getStoreListByOwnerSid: function() {

        WRPAdminApp.pagescript._selectedStoreId = undefined;

        $.ajax({
            url: "ajax/store/getStoreListByOwnerSid.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML, currentStoreId;
                data = result.data;
                if (!data) return;

                try {
                    currentStoreId = document.getElementById("select-store").value;
                    if (currentStoreId.length == 0) {
                        alert("Select Store");
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        if (obj.storeId.toUpperCase() === currentStoreId.toUpperCase()) continue;
                        innerHTML.push('<tr store_id="');
                        innerHTML.push(obj.storeId);
                        innerHTML.push('" onclick="WRPAdminApp.pagescript.selectStore(this);">');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.storeId);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.address);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.tel);
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                try {
                    document.getElementById("inventory-req-transfer-store-list").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                innerHTML = undefined;
            }
        });
    },
    selectStore: function() {
        var elem, parent, i, len, selected;

        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }
        selected = arguments[0];

        parent = selected;
        while(parent) {
            try {
                if (parent.id === "inventory-req-transfer-store-list") break;
            } catch (e) {

            }
            parent = parent.parentNode;
        }

        if (!parent) return;

        WRPAdminApp.pagescript._selectedStoreId = undefined;

        for (i = 0, len = parent.children.length; i < len; i++) {
            try {
                elem = parent.children[i];
                if (elem === selected) {
                    elem.setAttribute("class", "selected");
                    WRPAdminApp.pagescript._selectedStoreId = elem.getAttribute("store_id");
                    if (!WRPAdminApp.pagescript._selectedStoreId) {
                        console.warn("selectStore : store id error");
                        WRPAdminApp.pagescript._selectedStoreId = undefined;
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
    nextStepInReqTransfer: function() {

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
            alert("Select Store");
            return;
        }

        WRPAdminApp.setViewInPopup("reqTransferContainer", "selectItems");

        WRPAdminApp.pagescript.getOverlappedItemListBetweenStores();
    },
    getOverlappedItemListBetweenStores: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
            alert("Select Store");
            return;
        }

        $.ajax({
            url: "ajax/item/getOverlappedItemListBetweenStores.jsp",
            data: {
                store1Id: storeId,
                store2Id: WRPAdminApp.pagescript._selectedStoreId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;

                data = result.data;

                if (!data) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr sku="');
                        innerHTML.push(obj.sku);
                        innerHTML.push('">');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.sku);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.model);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.description);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.qty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td><div class="invoice-btn" onclick="WRPAdminApp.pagescript.transferAddItemToAddedItemsList(this);"></div></td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }

                try {
                    document.getElementById("inventory-req-transfer-items-list").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                innerHTML = undefined;
            }
        });
    },
    transferAddItemToAddedItemsList: function() {
        var addItems, selected, sku, i, len, elem, newElem, innerHTML, tmp;

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

        sku = selected.getAttribute("sku");

        if (!sku) {
            console.warn("this element doesn't contain sku attribute");
            return;
        }

        addItems = document.getElementById("inventory-req-transfer-added-items");

        if (!addItems) {
            return;
        }

        for (i = 0, len = addItems.children.length; i < len; i++) {
            try {
                elem = addItems.children[i];

                if (elem.getAttribute("sku") === sku) {
                    alert("This item is already added");
                    return;
                }
            } catch (e) {
                console.warn(e);
            }
        }

        newElem = document.createElement("tr");
        newElem.setAttribute("sku", sku);
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
            innerHTML.push('<td><div class="remove-item-btn" onclick="WRPAdminApp.pagescript.transferRemoveAddedItem(this);"></div></td>');

            newElem.innerHTML = innerHTML.join("");
            innerHTML = undefined;
        } catch (e) {
            console.warn(e);
            return;
        }

        addItems.appendChild(newElem);
    },
    transferRemoveAddedItem: function() {
        var tr, parent, i, len, innerHTML;
        if (arguments.length < 1) {
            console.warn("no input item");
            return;
        }

        tr = arguments[0];

        while(tr) {
            try {
                if (tr.nodeName === "TR") break;
            } catch (e) {

            }
            tr = tr.parentNode;
        }

        if (!tr) {
            return;
        }

        parent = tr.parentNode;

        if (parent.id === "inventory-req-transfer-added-items") {
            parent.removeChild(tr);
        }
    },
    saveTransfer: function() {
        var transferData, i, len, elem, elemContainer, item, fromStoreId, toStoreId;

        try {
            fromStoreId = document.getElementById("select-store").value;
            if (fromStoreId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
            alert("Select Store");
            return;
        }

        toStoreId = WRPAdminApp.pagescript._selectedStoreId;

        if (!confirm("Are you sure?")) return;

        transferData = {};

        transferData.items = [];

        elemContainer = document.getElementById("inventory-req-transfer-added-items");
        if (!elemContainer) {
            console.warn("added items list is not exists");
            return;
        }

        for (i = 0, len = elemContainer.children.length ; i < len; i++) {
            try {
                elem = elemContainer.children[i];
                if (elem.className.indexOf("blank") > -1) continue;
                if (elem.children.length != 5) {
                    console.warn("added items error");
                    return;
                }
                item = {};
                item.sku = elem.getAttribute("sku");
                if (!item.sku) {
                    console.warn("added item sku error");
                }

                item.qty = parseInt(elem.children[3].children[0].value);
                if (isNaN(item.qty)) {
                    alert("qty value contains non-numeric number");
                    return;
                }

                transferData.items.push(item);
            } catch (e) {
                console.warn(e);
                item = undefined;
                return;
            }
        }

        $.ajax({
            url: "ajax/transfer/saveTransfer.jsp",
            data: {
                transferData: JSON.stringify(transferData),
                fromStoreId: fromStoreId,
                toStoreId: toStoreId,
                transferId: WRPAdminApp.pagescript._inputReqTransferId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup("reqTransferContainer");
                    WRPAdminApp.pagescript._inputReqTransferId = undefined;
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    getTransferHistoryList: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
        	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		row["transId"] = result.data[i].transId;
            		row["fromStoreId"] = result.data[i].fromStoreId;
            		row["toStoreId"] = result.data[i].toStoreId;
            		row["reqDate"] = result.data[i].reqDate;
            		row["reqUserId"] = result.data[i].reqUserId;
            		row["apprDate"] = result.data[i].apprDate;
            		row["apprUserId"] = result.data[i].apprUserId;
            		row["shipDate"] = result.data[i].shipDate;
            		row["shipUserId"] = result.data[i].shipUserId;
            		row["recvDate"] = result.data[i].recvDate;
            		row["recvUserId"] = result.data[i].recvUserId;
            		switch(result.data[i].status){
            			case 0:
            				row["status"] = 'Request';
            			case 1:
            				row["status"] = 'Reject';
            			case 2:
            				row["status"] = 'Approval';
            			case 3:
            				row["status"] = 'Ship';
            			case 4:
            				row["status"] = 'Received';
            		}
            		datarow[i] = row;
            	}
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "transId", type: "string" },
						{ name: "fromStoreId", type: "string" },
						{ name: "toStoreId", type: "string" },
						{ name: "reqDate", type: "string" },
						{ name: "reqUserId", type: "string" },
						{ name: "apprDate", type: "date" },
						{ name: "apprUserId", type: "string" },
						{ name: "shipDate", type: "date" },
						{ name: "shipUserId", type: "string" },
						{ name: "recvDate", type: "date" },
						{ name: "recvUserId", type: "string" },
						{ name: "status", type: "string" }
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-inventory-transfer-history-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-inventory-transfer-history-list"></div>';
            	}
    		
            	elem = $("#jqx-inventory-transfer-history-list");
    		
            	if(elem){
            		elem.jqxGrid(
            			{
	                	   width: '100%',
	                	   height: '100%',
	                	   source: dataAdapter,
	                	   showfilterrow: false,
	                	   filterable: true,
	                	   sortable: true,
	                	   columnsresize:true,
	                	   theme: 'arctic',
	                	   columns: [
	                		   { text: 'Transfer ID', datafield: 'transId', width: '7%' },
	                		   { text: 'From', datafield: 'fromStoreId', width: '7%' },
	                		   { text: 'To', datafield: 'toStoreId', width: '7%' },
	                		   { text: 'Request Date', datafield: 'reqDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy'},
	                		   { text: 'Request User', datafield: 'reqUserId', width: '9%'},
	                		   { text: 'Approval Date', datafield: 'apprDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy' },
	                		   { text: 'Approval User', datafield: 'apprUserId', width: '9%'},
	                		   { text: 'Ship Date', datafield: 'shipDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy'},
	                		   { text: 'Ship User', datafield: 'shipUserId', width: '9%'},
	                		   { text: 'Receive Date', datafield: 'recvDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy'},
	                		   { text: 'Receive User', datafield: 'recvUserId', width: '9%'},
	                		   { text: 'Status', datafield: 'status', width: '7%'},
		                     ]
            			});
            		elem.on('rowdoubleclick', WRPAdminApp.pagescript.informTransferInfo);
            		
            		$("#inventory-transfer-history-date").on('change', function (event) {
    					var selection = $("#inventory-transfer-history-date").jqxDateTimeInput('getRange');
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
    	                	
    	                	elem.jqxGrid('addfilter', 'reqDate', filtergroup);
    	                	elem.jqxGrid('applyfilters');
    	                }
    	            });

            	}
            }
        });
    },
    getTransferRequestHistoryList: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId,
                status: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-inventory-transfer-req-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");
    				}
    				
    				$("#inventory-transfer-req-date").on('change', function (event) {
    					var selection = $("#inventory-transfer-req-date").jqxDateTimeInput('getRange');
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
    	                	
    	                	elem.jqxGrid('addfilter', 'reqDate', filtergroup);
    	                	elem.jqxGrid('applyfilters');
    	                }
    	            });
        			
    			}

                try {
                    document.getElementById("inventory-total-transfer-req-count").innerHTML = data.length;
                } catch (e) {
                    console.warn(e);
                }
            }
        });
    },
    getTransferApprovalHistoryList: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId,
                status: 2
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-inventory-transfer-appr-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");
    				}
    				
    				$("#inventory-transfer-appr-date").on('change', function (event) {
    					var selection = $("#inventory-transfer-appr-date").jqxDateTimeInput('getRange');
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
    	                	
    	                	elem.jqxGrid('addfilter', 'apprDate', filtergroup);
    	                	elem.jqxGrid('applyfilters');
    	                }
    	            });

    			}

                try {
                    document.getElementById("inventory-total-transfer-appr-count").innerHTML = data.length;
                } catch (e) {
                    console.warn(e);
                }
            }
        });
    },
    getTransferShipHistoryList: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId,
                status: 3
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-inventory-transfer-ship-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");
    				}
    				
    				$("#inventory-transfer-ship-date").on('change', function (event) {
    					var selection = $("#inventory-transfer-ship-date").jqxDateTimeInput('getRange');
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
    	                	
    	                	elem.jqxGrid('addfilter', 'shipDate', filtergroup);
    	                	elem.jqxGrid('applyfilters');
    	                }
    	            });

    			}

                try {
                    document.getElementById("inventory-total-transfer-ship-count").innerHTML = data.length;
                } catch (e) {
                    console.warn(e);
                }

            }
        });
    },
    informTransferInfo: function(event) {
    	var rowdata;
    	rowdata = event.args.row.bounddata;
        /*if (arguments.length < 1) {
            console.warn("no input transfer id");
            return;
        }*/

        $.ajax({
            url: "ajax/transfer/getTransferInfo.jsp",
            data: {
                transferId: rowdata.transId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elementId;
                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedTransSid = data.sid;

                switch (data.status) {
                    case 0:
                        try { document.getElementById("transfer-appr-transfer-id").innerHTML = data.transId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-appr-transfer-from").innerHTML = data.fromStoreId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-appr-transfer-to").innerHTML = data.toStoreId; } catch (e) { console.warn(e); return; }

                        WRPAdminApp.openPopupInPage('transferApprovalContainer');

                        elementId = "transfer-appr-item-list";
                        break;
                    case 1:
                        break;
                    case 2:
                        try { document.getElementById("transfer-ship-transfer-id").innerHTML = data.transId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-ship-transfer-from").innerHTML = data.fromStoreId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-ship-transfer-to").innerHTML = data.toStoreId; } catch (e) { console.warn(e); return; }

                        WRPAdminApp.openPopupInPage('transferShipContainer');

                        elementId = "transfer-ship-item-list";
                        break;
                    case 3:
                        try { document.getElementById("transfer-recv-transfer-id").innerHTML = data.transId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-recv-ship-no").innerHTML = data.shipNo; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-recv-transfer-from").innerHTML = data.fromStoreId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-recv-transfer-to").innerHTML = data.toStoreId; } catch (e) { console.warn(e); return; }

                        WRPAdminApp.openPopupInPage('transferRecvContainer');

                        elementId = "transfer-recv-item-list";
                        break;
                    case 4:
                        break;
                }

                WRPAdminApp.pagescript.getTransferItemsList(data.sid, elementId, data.status);
            }
        });
    },
    getTransferItemsList: function() { // parameters { transSid, output element id, status }
        var storeId, outputElementId, status;
        if (arguments.length < 3) {
            console.warn("input parameters (transSid, output element id)");
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        outputElementId = arguments[1];
        status = arguments[2];

        WRPAdminApp.pagescript._selectedTransItemSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferItemsList.jsp",
            data: {
                storeId: storeId,
                transSid: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;

                data = result.data;
                if (!data) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.sku !== undefined && obj.sku !== null)? obj.sku : '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.model !== undefined && obj.model !== null)? obj.model : '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.description !== undefined && obj.description !== null)? obj.description : '');
                        innerHTML.push('</td>');
                        switch (status) {
                            case 0:
                                innerHTML.push('<td>');
                                innerHTML.push((obj.reqQty !== undefined && obj.reqQty !== null)? obj.reqQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.apprQty !== undefined && obj.apprQty !== null)? obj.apprQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitTransferApproval(\'');
                                innerHTML.push(obj.sku);
                                innerHTML.push('\');"></div></td>');
                                innerHTML.push('</tr>');
                                break;
                            case 2:
                                innerHTML.push('<td>');
                                innerHTML.push((obj.apprQty !== undefined && obj.apprQty !== null)? obj.apprQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.shipQty !== undefined && obj.shipQty !== null)? obj.shipQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitTransferShipment(\'');
                                innerHTML.push(obj.sku);
                                innerHTML.push('\');"></div></td>');
                                innerHTML.push('</tr>');
                                break;
                            case 3:
                                innerHTML.push('<td>');
                                innerHTML.push((obj.shipQty !== undefined && obj.shipQty !== null)? obj.shipQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.recvQty !== undefined && obj.recvQty !== null)? obj.recvQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitTransferReceive(\'');
                                innerHTML.push(obj.sku);
                                innerHTML.push('\');"></div></td>');
                                innerHTML.push('</tr>');
                                break;
                        }
                    } catch (e) {
                        console.warn(e);
                    }
                }

                try {
                    document.getElementById(outputElementId).innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                innerHTML = undefined;
            }
        });
    },
    openSubmitTransferApproval: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item sku");
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
            url: "ajax/item/getItemDictByItemSKU.jsp",
            data: {
                storeId: storeId,
                sku: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                switch (data.itemType) {
                    case 0:
                    case 1:
                    case 2:
                        try {
                            document.getElementById("transfer-appr-serialized-item-sku").value = (data.sku !== undefined && data.sku !== null) ? data.sku : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferApprovalContainer", "appr_serialized_items");
                        WRPAdminApp.pagescript.getTransferSerializedItemsByItemSKU(0, data.sku);
                        break;
                    case 3:
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-sku").value = (data.sku !== undefined && data.sku !== null) ? data.sku : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferApprovalContainer", "appr_non_serialized_items");
                        WRPAdminApp.pagescript.getTransferNonSerializedItemsByItemSKU(0, data.sku);
                        break;
                }
            }
        });
    },
    openSubmitTransferShipment: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item sku");
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
            url: "ajax/item/getItemDictByItemSKU.jsp",
            data: {
                storeId: storeId,
                sku: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                switch (data.itemType) {
                    case 0:
                    case 1:
                    case 2:
                        try {
                            document.getElementById("transfer-ship-serialized-item-sku").value = (data.sku !== undefined && data.sku !== null) ? data.sku : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferShipContainer", "ship_serialized_items");
                        WRPAdminApp.pagescript.getTransferSerializedItemsByItemSKU(2, data.sku);
                        break;
                    case 3:
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-sku").value = (data.sku !== undefined && data.sku !== null) ? data.sku : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferShipContainer", "ship_non_serialized_items");
                        WRPAdminApp.pagescript.getTransferNonSerializedItemsByItemSKU(2, data.sku);
                        break;
                }
            }
        });
    },
    openSubmitTransferReceive: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item sku");
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
            url: "ajax/item/getItemDictByItemSKU.jsp",
            data: {
                storeId: storeId,
                sku: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                switch (data.itemType) {
                    case 0:
                    case 1:
                    case 2:
                        try {
                            document.getElementById("transfer-recv-serialized-item-sku").value = (data.sku !== undefined && data.sku !== null) ? data.sku : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferRecvContainer", "recv_serialized_items");
                        WRPAdminApp.pagescript.getTransferSerializedItemsByItemSKU(3, data.sku);
                        break;
                    case 3:
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-sku").value = (data.sku !== undefined && data.sku !== null) ? data.sku : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferRecvContainer", "recv_non_serialized_items");
                        WRPAdminApp.pagescript.getTransferNonSerializedItemsByItemSKU(3, data.sku);
                        break;
                }
            }
        });
    },
    getTransferSerializedItemsByItemSKU: function() { // arguments [ transfer_status, item_sku ]
        var status;

        if (arguments.length < 2) {
            console.warn("Input parameters [ transfer_status, item_sku ]");
            return;
        }

        status = parseInt(arguments[0]);

        $.ajax({
            url: "ajax/transfer/getTransferSerializedItemsByItemSKU.jsp",
            data: {
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                currentStatus: status,
                sku: arguments[1]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;

                data = result.data;

                if (!data) return;

                innerHTML = [];

                switch (status) {
                    case 0: // Open Approval Container [transfer status = Request]

                        for (i = 0, len = data.length; i < len; i++) {
                            try {
                                obj = data[i];
                                innerHTML.push('<tr trans_items_sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.sku !== undefined && obj.sku !== null)? obj.sku : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push(1);
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.cancelTransferApproval(this);"></div>');
                                innerHTML.push('</td>');
                                innerHTML.push('</tr>');
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                        }

                        try {
                            document.getElementById("transfer-appr-item-serial-no-list").innerHTML = innerHTML.join("");
                        } catch (e) {
                            console.warn(e);
                        }
                        break;
                    case 2: // Open Ship Container [transfer status = Approval]

                        for (i = 0, len = data.length; i < len; i++) {
                            try {
                                obj = data[i];
                                innerHTML.push('<tr trans_items_sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.sku !== undefined && obj.sku !== null)? obj.sku : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push(1);
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                //innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.cancelTransferApproval(this);"></div>');
                                innerHTML.push('</td>');
                                innerHTML.push('</tr>');
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                        }

                        try {
                            document.getElementById("transfer-ship-item-serial-no-list").innerHTML = innerHTML.join("");
                        } catch (e) {
                            console.warn(e);
                        }

                        break;
                    case 3: // Open Receive Container [transfer status = Ship]

                        for (i = 0, len = data.length; i < len; i++) {
                            try {
                                obj = data[i];
                                innerHTML.push('<tr trans_items_sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.sku !== undefined && obj.sku !== null)? obj.sku : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push(1);
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                //innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.cancelTransferApproval(this);"></div>');
                                innerHTML.push('</td>');
                                innerHTML.push('</tr>');
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                        }

                        try {
                            document.getElementById("transfer-recv-item-serial-no-list").innerHTML = innerHTML.join("");
                        } catch (e) {
                            console.warn(e);
                        }

                        break;
                }

                innerHTML = undefined;
            }
        });
    },
    getTransferNonSerializedItemsByItemSKU: function() {
        var status, storeId;

        if (arguments.length < 2) {
            console.warn("Input parameters [ transfer_status, item_sku ]");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        status = parseInt(arguments[0]);

        $.ajax({
            url: "ajax/transfer/getTransferNonSerializedItemsByItemSKU.jsp",
            data: {
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                currentStatus: status,
                storeId: storeId,
                sku: arguments[1]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;

                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedTransItemSid = data.sid;

                switch (status) {
                    case 0: // Open Approval Container [transfer status = Request]
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-req-qty").value = data.reqQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        if(data.inStock !== undefined && data.inStock < 1) {
                            alert("This item is out of stock");
                            try {
                                document.getElementById("transfer-appr-non-serialized-item-appr-qty").setAttribute("readonly","");
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            try {
                                obj = document.getElementById("inventory-transfer-appr-save-btn");
                                obj.style.display = "none";
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            return;
                        }
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-appr-qty").value = data.apprQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        break;
                    case 2: // Open Ship Container [transfer status = Approval]
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-appr-qty").value = data.apprQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        if(data.inStock !== undefined && data.inStock < 1) {
                            alert("This item is out of stock");
                            try {
                                document.getElementById("transfer-ship-non-serialized-item-ship-qty").setAttribute("readonly","");
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            try {
                                obj = document.getElementById("inventory-transfer-ship-save-btn");
                                obj.style.display = "none";
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            return;
                        }
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-ship-qty").value = data.shipQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        break;
                    case 3: // Open Receive Container [transfer status = Ship]
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-ship-qty").value = data.shipQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-recv-qty").value = data.recvQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        break;
                }

                innerHTML = undefined;
            }
        });
    },
    transferApprGetItemInInvenBySerialNo: function() {
        var storeId, keyword, sku;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            sku = document.getElementById("transfer-appr-serialized-item-sku").value;
            if (sku.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            keyword = document.getElementById("transfer-appr-serial-no").value;
            document.getElementById("transfer-appr-serial-no").value = "";
            if (keyword.length == 0) {
                alert("Input Serial No");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/inventory/getSerializedItemInInvenBySerialNoAndSKU.jsp",
            data: {
                storeId: storeId,
                serialNo: keyword,
                sku: sku
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elem, list, i, len;

                data = result.data;

                if (data) {
                    if (typeof(data) === "number") {
                        switch (data) {
                            case -1:
                                alert("There is no item with serial no.");
                                break;
                            case -2:
                                alert("Sold out");
                                return;
                        }
                    } else {

                        list = document.getElementById("transfer-appr-item-serial-no-list");
                        if (!list) return;

                        for (i = 0, len = list.children.length; i < len; i++) {
                            elem = list.children[i];
                            if (elem.children.length != 4) continue;
                            if (elem.children[1].innerText.trim().length == 0) break;
                            if (elem.children[1].innerText.trim() === data.serialNo.trim()) {
                                alert("This item is already added");
                                return;
                            }
                        }

                        elem.children[1].innerHTML = data.serialNo;
                    }
                }
            }
        });
    },
    cancelTransferApproval: function() {
        var tr;
        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }

        tr = arguments[0];

        while(tr) {
            try {
                if (tr.nodeName === "TR") break;
            } catch (e) {
                console.warn(e);
                return;
            }
            tr = tr.parentNode;
        }

        if (tr) {
            if (tr.children.length == 4) {
                tr.children[1].innerHTML = '';
            }
        }
    },
    saveTransferApprSerializedItems: function() {
        var serialNoList, i, len, tr, data, sid, obj, serialNo;

        serialNoList = document.getElementById("transfer-appr-item-serial-no-list");
        if (!serialNoList) {
            return;
        }

        if (!confirm("Are you sure?")) return;

        data = {};
        data.transSid = WRPAdminApp.pagescript._selectedTransSid;
        try {
            data.sku = document.getElementById("transfer-appr-serialized-item-sku").value;
            if (data.sku.length == 0) {
                console.warn("saveTransferApprSerializedItems : sku error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        data.serialIDs = [];

        for (i = 0, len = serialNoList.children.length; i < len ; i++) {
            try {
                tr = serialNoList.children[i];
                if (tr.children.length != 4) continue;
                sid = parseInt(tr.getAttribute("trans_items_sid"));
                if (isNaN(sid)) {
                    continue;
                }
                obj = {};
                obj.sid = sid;
                serialNo = tr.children[1].innerText.trim();
                if (serialNo.length > 0) {
                    obj.serialNo = serialNo;
                } else {
                    obj.serialNo = null;
                }

                data.serialIDs.push(obj);

            } catch (e) {
                console.warn(e);
                return;
            }
        }

        data.serialIDs = JSON.stringify(data.serialIDs);

        data.currentStatus = 0;

        $.ajax({
            url: "ajax/transfer/saveTransferSerializedItems.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.setViewInPopup("transferApprovalContainer", "item_list");

                    WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-appr-item-list", 0);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    saveTransferShipSerializedItems: function() {
        var serialNoList, i, len, tr, data, sid, obj, serialNo;

        serialNoList = document.getElementById("transfer-ship-item-serial-no-list");
        if (!serialNoList) {
            return;
        }

        if (!confirm("Are you sure?")) return;

        data = {};
        data.transSid = WRPAdminApp.pagescript._selectedTransSid;
        try {
            data.sku = document.getElementById("transfer-ship-serialized-item-sku").value;
            if (data.sku.length == 0) {
                console.warn("saveTransferShipSerializedItems : sku error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        data.serialIDs = [];

        for (i = 0, len = serialNoList.children.length; i < len ; i++) {
            try {
                tr = serialNoList.children[i];
                if (tr.children.length != 4) continue;
                sid = parseInt(tr.getAttribute("trans_items_sid"));
                if (isNaN(sid)) {
                    continue;
                }
                obj = {};
                obj.sid = sid;
                serialNo = tr.children[1].innerText.trim();
                if (serialNo.length > 0) {
                    obj.serialNo = serialNo;
                } else {
                    obj.serialNo = null;
                }

                data.serialIDs.push(obj);

            } catch (e) {
                console.warn(e);
                return;
            }
        }

        data.serialIDs = JSON.stringify(data.serialIDs);

        data.currentStatus = 2;

        $.ajax({
            url: "ajax/transfer/saveTransferSerializedItems.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.setViewInPopup("transferShipContainer", "item_list");

                    WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-ship-item-list", 2);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    saveTransferRecvSerializedItems: function() {
        var serialNoList, i, len, tr, data, sid, obj, serialNo;

        serialNoList = document.getElementById("transfer-recv-item-serial-no-list");
        if (!serialNoList) {
            return;
        }

        if (!confirm("Are you sure?")) return;

        data = {};
        data.transSid = WRPAdminApp.pagescript._selectedTransSid;
        try {
            data.sku = document.getElementById("transfer-recv-serialized-item-sku").value;
            if (data.sku.length == 0) {
                console.warn("saveTransferRecvSerializedItems : sku error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        data.serialIDs = [];

        for (i = 0, len = serialNoList.children.length; i < len ; i++) {
            try {
                tr = serialNoList.children[i];
                if (tr.children.length != 4) continue;
                sid = parseInt(tr.getAttribute("trans_items_sid"));
                if (isNaN(sid)) {
                    continue;
                }
                obj = {};
                obj.sid = sid;
                serialNo = tr.children[1].innerText.trim();
                if (serialNo.length > 0) {
                    obj.serialNo = serialNo;
                } else {
                    obj.serialNo = null;
                }

                data.serialIDs.push(obj);

            } catch (e) {
                console.warn(e);
                return;
            }
        }

        data.serialIDs = JSON.stringify(data.serialIDs);

        data.currentStatus = 3;

        $.ajax({
            url: "ajax/transfer/saveTransferSerializedItems.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.setViewInPopup("transferRecvContainer", "item_list");

                    WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-recv-item-list", 3);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    saveTransferApprNonSerializedItems: function() {
        var inputQty, sku;

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
            alert("No selected transfer info");
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransItemSid < 1) {
            alert("No selected Item");
            return;
        }

        if (!confirm("Are you sure?")) return;

        try {
            inputQty = parseInt(document.getElementById("transfer-appr-non-serialized-item-appr-qty").value);
            if (isNaN(inputQty)) {
                alert("Approval Qty value contains non-numeric characters");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            sku = document.getElementById("transfer-appr-non-serialized-item-sku").value;
            if (sku.length == 0) {
                console.warn("saveTransferApprSerializedItems : sku error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/transfer/saveTransferNonSerializedItems.jsp",
            data: {
                currentStatus: 0,
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                transItemSid: WRPAdminApp.pagescript._selectedTransItemSid,
                sku: sku,
                inputQty: inputQty
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.setViewInPopup("transferApprovalContainer", "item_list");

                    WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-appr-item-list", 0);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    saveTransferShipNonSerializedItems: function() {
        var inputQty, sku;

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
            alert("No selected transfer info");
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransItemSid < 1) {
            alert("No selected Item");
            return;
        }

        if (!confirm("Are you sure?")) return;

        try {
            inputQty = parseInt(document.getElementById("transfer-ship-non-serialized-item-ship-qty").value);
            if (isNaN(inputQty)) {
                alert("Ship Qty value contains non-numeric characters");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            sku = document.getElementById("transfer-ship-non-serialized-item-sku").value;
            if (sku.length == 0) {
                console.warn("saveTransferShipNonSerializedItems : sku error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/transfer/saveTransferNonSerializedItems.jsp",
            data: {
                currentStatus: 2,
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                transItemSid: WRPAdminApp.pagescript._selectedTransItemSid,
                sku: sku,
                inputQty: inputQty
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.setViewInPopup("transferShipContainer", "item_list");

                    WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-ship-item-list", 2);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    saveTransferRecvNonSerializedItems: function() {
        var inputQty, sku;

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
            alert("No selected transfer info");
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransItemSid < 1) {
            alert("No selected Item");
            return;
        }

        if (!confirm("Are you sure?")) return;

        try {
            inputQty = parseInt(document.getElementById("transfer-recv-non-serialized-item-recv-qty").value);
            if (isNaN(inputQty)) {
                alert("Recv Qty value contains non-numeric characters");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            sku = document.getElementById("transfer-recv-non-serialized-item-sku").value;
            if (sku.length == 0) {
                console.warn("saveTransferRecvNonSerializedItems : sku error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/transfer/saveTransferNonSerializedItems.jsp",
            data: {
                currentStatus: 3,
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                transItemSid: WRPAdminApp.pagescript._selectedTransItemSid,
                sku: sku,
                inputQty: inputQty
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.setViewInPopup("transferRecvContainer", "item_list");

                    WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-recv-item-list", 3);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    setTransferStatus: function() { // element, transfer_status
        var popupContainer, popupName, status, storeId, shipNo;

        if (arguments.length < 2) {
            console.warn("Input parameters (Element, trnsfer_status)");
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
            alert("No selected transfer info");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (!confirm("Are you sure?")) return;

        popupContainer = arguments[0];

        while(popupContainer) {
            try {
                if (popupContainer.getAttribute("class") === "popup-container") {
                    popupName = popupContainer.getAttribute("popupname");
                    if (popupName && popupName.length > 0) {
                        break;
                    }
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            popupContainer = popupContainer.parentNode;
        }

        if (popupName === undefined || popupName.length == 0) {
            return;
        }

        status = arguments[1];

        switch (status) {
            case 1:
                if (popupName !== "transferApprovalContainer") {
                    console.warn("Status 'Reject' is only applied at transferApprovalContainer popup");
                    return;
                }
                break;
            case 2:
                if (popupName !== "transferApprovalContainer") {
                    console.warn("Status 'Reject' is only applied at transferApprovalContainer popup");
                    return;
                }
                break;
            case 3:
                if (popupName !== "transferShipContainer") {
                    console.warn("Status 'Save' is only applied at transferShipContainer popup");
                    return;
                }
                try {
                    shipNo = document.getElementById("transfer-ship-no").value;
                } catch (e) {

                }
                break;
            case 4:
                if (popupName !== "transferRecvContainer") {
                    console.warn("Status 'Save' is only applied at transferRecvContainer popup");
                    return;
                }
                break;
            default:
                break;
        }

        $.ajax({
            url: "ajax/transfer/setTransferStatus.jsp",
            data: {
                transferStatus: status,
                storeId: storeId,
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                shipNo: shipNo
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    switch (status) {
                        case 1:
                        case 2:
                            WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='transferApprovalContainer']"));
                            break;
                        case 3:
                            WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='transferShipContainer']"));
                            break;
                        case 4:
                            WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='transferRecvContainer']"));
                            break;
                    }
                    WRPAdminApp.pagescript.getTransferHistoryList();
                    WRPAdminApp.pagescript.getTransferRequestHistoryList();
                    WRPAdminApp.pagescript.getTransferApprovalHistoryList();
                    WRPAdminApp.pagescript.getTransferShipHistoryList();
                } else {

                }
            }
        });
    },

    auditGetItemListInInven: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/inventory/getItemListInInven.jsp" ,
            data: {
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;

                data = result.data;
                if (!data) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.itemCode !== undefined && obj.itemCode !== null)? obj.itemCode: '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.description !== undefined && obj.description !== null)? obj.description: '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.sku !== undefined && obj.sku !== null)? obj.sku: '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.category !== undefined && obj.category !== null)? obj.category: '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.subCategory !== undefined && obj.subCategory !== null)? obj.subCategory: '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo: '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.qty !== undefined && obj.qty !== null)? obj.qty: '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');

                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push('0');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');

                        innerHTML.push('</td>');
                        innerHTML.push('<td class="non-accord">');

                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }

                try {
                    document.getElementById("inventory-audit-item-list").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                innerHTML = undefined;
            }
        });
    },
    auditSearchItemInList: function() {
        var keyword, list, i, len, elem, _qty, qty;

        list = document.getElementById("inventory-audit-item-list");
        if (!list) return;

        try {
            keyword = document.getElementById("inventory-audit-search-keyword").value;
            if (keyword.length == 0) {
                list.parentNode.parentNode.scrollTop = 0;
                WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='auditInputKeywordContainer']"));
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        for (i = 0, len = list.children.length; i < len; i++) {
            try {
                elem = list.children[i];
                if (elem.innerText.indexOf(keyword) > -1) {
                    list.parentNode.parentNode.scrollTop = elem.offsetTop;
                    if (elem.children.length == 11) {
                        _qty = parseInt(elem.children[6].innerText);
                        if (isNaN(_qty)) {
                            return;
                        }

                        qty = parseInt(elem.children[8].innerText);
                        if (isNaN(qty)) {
                            return;
                        }

                        qty = qty + 1;

                        elem.children[8].innerHTML = qty;

                        if (qty == _qty) {
                            elem.children[10].className = "accord";
                        } else {
                            elem.children[10].className = "non-accord";
                        }
                    }
                    WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='auditInputKeywordContainer']"));
                    break;
                }
            } catch (e) {
                console.warn(e);
                return;
            }
        }
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
    getBinList: function() {
        var storeId, keyword, bin_type;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            keyword = document.getElementById("inventory-bin-search-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }


        WRPAdminApp.pagescript._selectedBinSid = 0;

        $.ajax({
            url: "ajax/bin/getBinList.jsp",
            data: {
                storeId: storeId,
                keyword: keyword,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			
    			data = result.data;
    			
    			if (!data) return;
    			
    			elem = $("#jqx-inventory-bin-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");		

    			}
            }
        })
    },
    informSelectedBinData: function(event) {
        var i, len, elem, list, storeId, sid, rowdata;

        rowdata = event.args.row;

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

        sid = rowdata.sid;
        $.ajax({
            url: "ajax/bin/getBinInfo.jsp",
            data: {
                sid: sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;
                data = result.data;
                if (!data) return;
                
                for (i = 0, len = data.length; i < len; i++) {
                    obj = data[i];
                    
                WRPAdminApp.pagescript._selectedBinSid = obj.sid;
                try {
                    document.getElementById("bin-info-type").value = (obj.bin_type !== undefined && obj.bin_type)? obj.bin_type : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("bin-info-description").value = (obj.description !== undefined && obj.description)? obj.description : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("bin-info-date").value = (obj.update_date !== undefined && obj.update_date)? obj.update_date : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("bin-info-updater").value = (obj.user_name !== undefined && obj.user_name)? obj.user_name : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }
                WRPAdminApp.pagescript.getItemByBin();
                }
            }
        });
        
    },
    
    informSelectedBinPop: function(event) {
        var i, len, elem, list, storeId, sid, rowdata;

        rowdata = event.args.row.bounddata;

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

        sid = rowdata.sid;
        
        if(sid < 6 && sid > 0) {
        	alert("Can not be edited !");
        	return;
        }
        
        $.ajax({
            url: "ajax/bin/getBinInfo.jsp",
            data: {
                sid: sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;
                data = result.data;
                if (!data) return;
                
                for (i = 0, len = data.length; i < len; i++) {
                    obj = data[i];
                    
                    WRPAdminApp.pagescript._selectedBinSid = obj.sid;
	                try {
	                    document.getElementById("bin-info-type-pop").value = (obj.bin_type !== undefined && obj.bin_type)? obj.bin_type : '';
	                } catch (e) {
	                    console.warn(e);
	                    return;
	                }

	                try {
	                    document.getElementById("bin-info-description-pop").value = (obj.description !== undefined && obj.description)? obj.description : '';
	                } catch (e) {
	                    console.warn(e);
	                    return;
	                }

                }
                $('#bin-edit-window').jqxWindow('open'); 
            }
        });
        
    },
    initBinInfo: function() {
    	WRPAdminApp.pagescript._selectedBinSid = 0;
        
        try {
            document.getElementById("bin-info-type-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("bin-info-description-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        
        $('#bin-edit-window').jqxWindow('open'); 
    },
    
    setBinData: function() {
        var data, storeId;

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

        data = {};
        data.storeId = storeId;
        data.sid = WRPAdminApp.pagescript._selectedBinSid;
        
        try {
            data.type = document.getElementById("bin-info-type-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.description = document.getElementById("bin-info-description-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }


        $.ajax({
            url: "ajax/bin/setBinData.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("complete!");
                    $('#bin-edit-window').jqxWindow('close');
                    WRPAdminApp.pagescript.getBinList();
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    
    getItemByBin: function() {
    	var storeId;
    	
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

        $.ajax({
            url: "ajax/bin/getItemListByBin.jsp",
            data: {
                sid: WRPAdminApp.pagescript._selectedBinSid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			
    			data = result.data;
    			
    			if (!data) return;
    			
    			elem = $("#jqx-inventory-bin-items-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    					elem.jqxGrid("addRow", null, data, "last");		
    				}
    			
    			try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	}
            }
        });
    },
    
    binTransferPop: function(event){
    	var rowdata;
    	
    	rowdata = event.args.row.bounddata;
    	
    	document.getElementById("inven-bin-transfer-inven-sid").innerHTML = rowdata.sid;
    	document.getElementById("inven-bin-transfer-itemcode").innerHTML = rowdata.itemCode;
    	document.getElementById("inven-bin-transfer-serialno").innerHTML = rowdata.serial_no;
    	document.getElementById("inven-bin-transfer-description").innerHTML = rowdata.description;
    	document.getElementById("inven-bin-transfer-category").innerHTML = rowdata.category_name;
    	document.getElementById("inven-bin-type-pop").value = rowdata.bin;
    	if(rowdata.item_type==3) document.getElementById("bin-transfer-qty-line").style.display="block"
    	else document.getElementById("bin-transfer-qty-line").style.display="none";
    	
    	$("#bin-transfer-edit-window").jqxWindow('open'); 
    },
	setBinTransfer: function(){
    	var param, qty;
    	param = {};
    	try {
            param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        param.inventory_sid = document.getElementById("inven-bin-transfer-inven-sid").innerHTML;
        param.bin_sid = document.getElementById("inven-bin-type-pop").value;
        param.qty = document.getElementById("inven-bin-trnasfer-qty").value;
        
        
        $.ajax({
        	url: "ajax/bin/transferInvenItemIntoBin.jsp",
        	data: param,
        	method: "POST",
            dataType: "json",
            success: function(result) {
            	alert("Complete");
            	document.getElementById("inven-bin-trnasfer-qty").value == null;
            	$("#bin-transfer-edit-window").jqxWindow('close'); 
            	WRPAdminApp.pagescript.getItemByBin();
            	WRPAdminApp.pagescript.getBinSelectList();
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
    /*BIN END (BANGWOORI) */
    
    /*170207 jh*/
    getPoHistoryBySerialItem: function(itemSid) {
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

                elem = $("#jqx-po-history");
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
    }
    /*///*/
    /*///*/
};