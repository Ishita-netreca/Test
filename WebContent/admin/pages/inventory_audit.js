
var _pagescript = {
    _selectedItemSid: 0,
    _selectedItemType:-1,
    _selectedAdjustType: 0,
    _selectedItemStore: undefined,
    _addSerialNoList: [],
    _printWindow: undefined,
    _currStep: 1,
	_phoneSerialNoList: [],
	_simSerialNoList: [],
	_accSerialNoList: [],
	_nonSerialAccList: [],
	_duplicatedIndex: -1,
	_selectedItemType: [],
    init: function() {
    	var elem, components;
    	
    	try {
    		WRPComponents('div[pagename="inventory_audit"] > .page-submenu-container > .submenu[panelname="simple_adjustment"]').addShadowedImage('img/icon/audit_stock_count.png');
    		WRPComponents('div[pagename="inventory_audit"] > .page-submenu-container > .submenu[panelname="blind_audit"]').addShadowedImage('img/icon/audit_blind.png');
    		WRPComponents('div[pagename="inventory_audit"] > .page-submenu-container > .submenu[panelname="missing_bin"]').addShadowedImage('img/icon/audit_missing.png');
    	} catch (e) {
			
		}

    	components = $('#simple-adjustment-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
    					{ name: 'adjust_type', type: 'number'},
		             	{ name: 'adjust_id', type: 'string'},
						{ name: 'store_id', type: 'string' },
						{ name: 'item_code', type: 'string'},
						{ name: 'item_type', type: 'number'},
		                { name: 'description', type: 'string' },
		                { name: 'serial_no', type: 'string' },
		                { name: 'date', type: 'string' },
		                { name: 'adjust_qty', type: 'string' },
		                { name: 'user_id', type: 'string' },
		                { name: 'sku', type: 'string' },
		                { name: 'upc', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true }, 
		          	  { text: 'CT.', width: "4%", cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'Adjust ID',width:"12%", datafield: 'adjust_id', cellsalign: 'center', align: 'center'},
                      { text: 'Store',width:"12%", datafield: 'store_id', cellsalign: 'center', align: 'center'},
                      { text: 'Item Code',width:"15%", datafield: 'item_code', cellsalign: 'center', align: 'center'},
                      { text: 'Description',width:"23%", datafield: 'description', cellsalign: 'center', align: 'center'},
                      { text: 'Date',width:"15%", datafield: 'date', cellsalign: 'center', align: 'center'},
                      { text: 'Adj Qty',width:"7%", datafield: 'adjust_qty', cellsalign: 'center', align: 'center' },
                      { text: 'Adj By',width:"12%", datafield: 'user_id', cellsalign: 'center', align: 'center'},
				]
    		});
    		
    		components.on("rowselect", function(event){
    			WRPAdminApp.pagescript.getSimpleAdjustListDetail(event);
    			if(event.args.row.item_type == 3){
    				$('#simple-adjust-bottom-tab').jqxTabs('select', 0);
    				$('#simple-adjust-bottom-tab').jqxTabs({ disabled:true });
    			}else{
    				$('#simple-adjust-bottom-tab').jqxTabs({ disabled:false });
        			WRPAdminApp.pagescript.getSimpleAdjustListSerialDetail(event);
    			}
    		});
    	}

    	components = $('#simple-adjust-search-item-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "90%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'store_id', type: 'string'},
						{ name: 'item_code', type: 'string'},
		                { name: 'description', type: 'string' },
		                { name: 'serial_no', type: 'string' },
		                { name: 'sku', type: 'string' },
		                { name: 'upc', type: 'string' },
		                { name: 'item_type', type: 'string' },
		                { name: 'qty', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
    				  { datafield: "sid", hidden: true }, 
		          	  { text: 'CT.', width: 35, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
                      { text: 'Store', width: 100, datafield: 'store_id', cellsalign: 'center', align: 'center'},
                      { text: 'Item Code', width: 130, datafield: 'item_code', cellsalign: 'center', align: 'center'},
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center'},
                      { text: 'SKU', width: 130,datafield: 'sku', cellsalign: 'center', align: 'center'},
                      { text: 'Qty', width: 70,datafield: 'qty', cellsalign: 'center', align: 'center' },
				]
    		});
    		
    		components.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedItemSid=event.args.row.sid;
				WRPAdminApp.pagescript._selectedItemType = event.args.row.item_type;
				WRPAdminApp.pagescript._selectedItemStore=event.args.row.store_id;
			});
    	}

    	components = $('#simple-adjustment-serial-no-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "90%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		                { name: 'description', type: 'string' },
		                { name: 'serial_no', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
    				  { datafield: "sid", hidden: true }, 
		          	  { text: 'CT.', width: 35, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
                      { text: 'Serial No', datafield: 'serial_no', cellsalign: 'center', align: 'center'},
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center'},
				]
    		});

    	}

    	components = $('#subtract-adjust-serial-no-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "selected", type: "bool" },
    	             	{ name: 'itemSid', type: 'string'},
    					{ name: 'serialNo', type: 'string'},
    					{ name: 'description', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
    				  { text: 'Select', datafield: "selected", columntype: "checkbox", cellsalign: 'center', align: 'center', width: 45},
    	          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
    	          	  { text: 'Serial No', editable: false, datafield: 'serialNo', cellsalign: 'center', align: 'center'},
                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center' },
    			]
    		});
    	}

    	components = $('#add-adjust-serial-no-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    	             	{ name: 'item_sid', type: 'string'},
    					{ name: 'serial_no', type: 'string'},
    					{ name: 'description', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
    	          	  { text: 'CT.', width: 40, editable: false, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
    	          	  { text: 'Serial No', editable: false, datafield: 'serial_no', cellsalign: 'center', align: 'center'},
                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center' },
                      { text: "Action", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Delete'; }
						,buttonclick: function(row){
							var id = $('#add-adjust-serial-no-list').jqxGrid('getrowid', row);
							$("#add-adjust-serial-no-list").jqxGrid('deleterow', id);
							WRPAdminApp.pagescript._addSerialNoList.splice(row.boundindex, 1);
						}
					}
    			]
    		});
    	}
    	
    	components = $('#confirm-adjust-serial-no-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    	             	{ name: 'item_sid', type: 'string'},
    					{ name: 'serial_no', type: 'string'},
    					{ name: 'description', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
    	          	  { text: 'CT.', width: 40, editable: false, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
    	          	  { text: 'Serial No', editable: false, datafield: 'serial_no', cellsalign: 'center', align: 'center'},
                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center' },
    			]
    		});
    	}
    	
    	components = $('#simple-adjust-select-item-type-window');
    	if (components) {
    		components.jqxWindow({
    			width: 600,
    			height: 450,
    			position: { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 225) }
    		});
    	}
    	
    	components = $('#simple-adjust-select-adjust-type-window');
    	if (components) {
    		components.jqxWindow({
    			width: 600,
    			height: 340,
    			position: { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 170) }
    		});
    	}
    	
    	components = $('#simple-adjust-select-item-window');
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 700,
    			position: { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 350) }
    		});
    	}

    	components = $('#simple-adjust-adjust-qty-window');
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 580,
    			position: { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 290) }
    		});
    	}
    	
    	components = $('#simple-adjust-serialized-add-window');
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 700,
    			position: { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 350) }
    		});
    	}
    	
    	components = $('#simple-adjust-serialized-subtract-window');
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 700,
    			position: { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 350) }
    		});
    	}
    	
    	components = $('#simple-adjust-confirm-window');
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 580,
    			position: { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 290) }
    		});
    	}
    	
    	components = $('#simple-adjust-serialized-confirm-window');
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 700,
    			position: { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 350) }
    		});
    	}
    	
		$('#simple-adjust-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#simple-adjust-history-start-date").jqxDateTimeInput('setDate', start);
			$("#simple-adjust-history-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#simple-adjust-radio-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#simple-adjust-history-start-date").jqxDateTimeInput('setDate', start);
			$("#simple-adjust-history-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#simple-adjust-radio-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#simple-adjust-history-start-date").jqxDateTimeInput('setDate', start);
			$("#simple-adjust-history-end-date").jqxDateTimeInput('setDate', end);
		});
		
		$('#blind-audit-search-period-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#blind-audit-history-start-date").jqxDateTimeInput('setDate', start);
			$("#blind-audit-history-end-date").jqxDateTimeInput('setDate', end);
		});
		
		$('#blind-audit-search-period-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#blind-audit-history-start-date").jqxDateTimeInput('setDate', start);
			$("#blind-audit-history-end-date").jqxDateTimeInput('setDate', end);
		});
		
		$('#blind-audit-search-period-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#blind-audit-history-start-date").jqxDateTimeInput('setDate', start);
			$("#blind-audit-history-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#simple-adjust-radio-1').jqxRadioButton('check');

    	components = $('#blind-audit-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
    					{ name: 'audit_id', type: 'string'},
		             	{ name: 'store', type: 'string'},
						{ name: 'audit_user_name', type: 'string' },
						{ name: 'audit_start_date', type: 'string'},
		                { name: 'audit_end_date', type: 'string' },
		                { name: 'total_system', type: 'number' },
		                { name: 'total_scanned', type: 'number' },
		                { name: 'total_matched', type: 'number' },
		                { name: 'total_missing', type: 'number' },
		                { name: 'total_orphan', type: 'number' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true }, 
		          	  { text: 'CT.', width: 40, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'Audit ID', datafield: 'audit_id', cellsalign: 'center', align: 'center'},
                      { text: 'Store', width: 120, datafield: 'store_id', cellsalign: 'center', align: 'center'},
                      { text: 'Audit by', width: 120, datafield: 'audit_user_name', cellsalign: 'center', align: 'center'},
                      { text: 'Start', width: 100, datafield: 'audit_start_date', cellsalign: 'center', align: 'center'},
                      { text: 'End', width:100, datafield: 'audit_end_date', cellsalign: 'center', align: 'center'},
                      { text: 'System', width: 60, datafield: 'total_system', cellsalign: 'center', align: 'center'},
                      { text: 'Scanned', width: 60, datafield: 'total_scanned', cellsalign: 'center', align: 'center'},
                      { text: 'Matched', width: 60, datafield: 'total_matched', cellsalign: 'center', align: 'center'},
                      { text: 'Orphan', width: 60, datafield: 'total_orphan', cellsalign: 'center', align: 'center'},
                      { text: 'Missing', width: 60, datafield: 'total_missing', cellsalign: 'center', align: 'center'}
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.onBlindAuditListRowSelect);
    	}
/*
    	components = $('.blind-audit-info-items-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99.5%",
    			height: "95%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'item_sid', type: 'number'},
    					{ name: 'item_code', type: 'string'},
		             	{ name: 'description', type: 'string'},
						{ name: 'sku', type: 'string' },
						{ name: 'system_qty', type: 'number'},
		                { name: 'scanned_qty', type: 'number' },
		                { name: 'diff_qty', type: 'number' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        columnsheight: 24,
    	        rowsheight: 20,
    			columns: [ 
    				  { datafield: "item_sid", hidden: true }, 
		          	  { text: 'CT.', width: 40, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'ITEM CODE', width: 120, datafield: 'item_code', cellsalign: 'center', align: 'center'},
                      { text: 'DESCRIPTION', datafield: 'description', cellsalign: 'center', align: 'center'},
                      { text: 'SKU', width: 120, datafield: 'sku', cellsalign: 'center', align: 'center'},
                      { text: 'SYS. QTY', width: 100, datafield: 'system_qty', cellsalign: 'center', align: 'center'},
                      { text: 'SCAN. QTY', width: 100, datafield: 'scanned_qty', cellsalign: 'center', align: 'center'},
                      { text: 'DIFF. QTY', width: 100, datafield: 'diff_qty', cellsalign: 'center', align: 'center'}
				]
    		});
    	}

    	components = $('.blind-audit-info-orphan-items-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99.5%",
    			height: "95%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
		             	{ name: 'description', type: 'string'},
						{ name: 'sku', type: 'string' },
						{ name: 'serial_no', type: 'string'}
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        columnsheight: 24,
    	        rowsheight: 20,
    			columns: [ 
		          	  { text: 'CT.', width: 40, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'DESCRIPTION', datafield: 'description', cellsalign: 'center', align: 'center'},
                      { text: 'SKU', width: 120, datafield: 'sku', cellsalign: 'center', align: 'center'},
                      { text: 'SERIAL NUMBER', width: 150, datafield: 'serial_no', cellsalign: 'center', align: 'center'}
				]
    		});
    	}

    	components = $('.blind-audit-info-missing-items-list');
    	if (components) {
    		components.jqxGrid({
    			width: "99.5%",
    			height: "95%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
		             	{ name: 'description', type: 'string'},
						{ name: 'sku', type: 'string' },
						{ name: 'serial_no', type: 'string'}
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        columnsheight: 24,
    	        rowsheight: 20,
    			columns: [ 
		          	  { text: 'CT.', width: 40, cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'DESCRIPTION', datafield: 'description', cellsalign: 'center', align: 'center'},
                      { text: 'SKU', width: 120, datafield: 'sku', cellsalign: 'center', align: 'center'},
                      { text: 'SERIAL NUMBER', width: 150, datafield: 'serial_no', cellsalign: 'center', align: 'center'}
				]
    		});
    	}
*/    	
    	components = $("#blind-audit-detail-view-window");
    	if (components) {
    		components.jqxWindow({
    			width: 1000,
    			height: 600,
    			position: { 
    				x:((window.innerWidth * 0.5) - 500), 
    				y: ((window.innerHeight * 0.5) - 300)
    			}
    		});
    	}
    	components = $("#blind-audit-print-detail-window");
    	if (components) {
    		components.jqxWindow({
    			width: 2000,
    			height: 600,
    			position: { 
    				x:((window.innerWidth * 0.5) - 500), 
    				y: ((window.innerHeight * 0.5) - 300)
    			}
    		});
    	}
    	
    	components = $('#missing-bin-item-phone-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    				        { name: 'item_sid', type: 'string'},
    		             	{ name: 'item_code', type: 'string'},
    		             	{ name: 'serial_no', type: 'string'},
    						{ name: 'description', type: 'string'},
    		                { name: 'qty', type: 'number' },
    		                { name: 'sku', type: 'string' },
    		                { name: 'upc', type: 'string' },
    		                { name: 'update_date', type: 'string' },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
		          		  { text: 'sid', datafield: 'item_sid', editable: false, hidden:true },
		          		  { text: 'CT.', width: '5%', cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
	                      { text: 'Item Code', datafield: 'item_code', width: '10%', align: 'center', cellsalign: "center" },
	        			  { text: 'Description', datafield: 'description', width: '25%', align: 'center'},
	                      { text: 'SKU', datafield: 'sku', width: '10%', editable: false, align: 'center', cellsalign: "center"},
	                      { text: 'UPC', datafield: 'upc', width: '10%', align: 'center', cellsalign: "center" },
	                      { text: 'Serial No', datafield: 'serial_no', width: '12%', align: 'center', cellsalign: "center" },
	        			  { text: 'Qty', datafield: 'qty', width: '9%', editable: false, align: 'center', cellsalign: "center" },
	        			  { text: 'Update Date', datafield: 'update_date', width: '12%', editable: false, align: 'center', cellsalign: "center" },
	        			  { text: "Detail", width: '7%', editable: false,columnType : 'button', align: 'center', autoCellHeight: false, 
								cellsRenderer: function () { 
									return "View"; 
								},buttonclick: function(row){
									var serial_no=$('#missing-bin-item-phone-list').jqxGrid('getcellvalue', row, "serial_no");
									WRPAdminApp.pagescript.getSerialMissingBinDetail(serial_no);
								}
	        			  },
				]
    		});
    	}
    	
    	components = $('#missing-bin-item-sim-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    				        { name: 'item_sid', type: 'string'},
    		             	{ name: 'item_code', type: 'string'},
    		             	{ name: 'serial_no', type: 'string'},
    						{ name: 'description', type: 'string'},
    		                { name: 'qty', type: 'number' },
    		                { name: 'sku', type: 'string' },
    		                { name: 'upc', type: 'string' },
        					{ name: 'update_date', type: 'string' },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
	          		  { text: 'sid', datafield: 'item_sid', width: '10%', editable: false, hidden:true },
	          		  { text: 'CT.', width: '5%', cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
                      { text: 'Item Code', datafield: 'item_code', width: '10%', align: 'center', cellsalign: "center" },
        			  { text: 'Description', datafield: 'description', width: '25%', align: 'center'},
                      { text: 'SKU', datafield: 'sku', width: '10%', editable: false, align: 'center', cellsalign: "center"},
                      { text: 'UPC', datafield: 'upc', width: '10%', align: 'center', cellsalign: "center" },
                      { text: 'Serial No', datafield: 'serial_no', width: '12%', align: 'center', cellsalign: "center" },
        			  { text: 'Qty', datafield: 'qty', width: '9%', editable: false, align: 'center', cellsalign: "center" },
        			  { text: 'Update Date', datafield: 'update_date', width: '12%', editable: false, align: 'center', cellsalign: "center" },
        			  { text: "Detail", width: '7%', editable: false,columnType : 'button', align: 'center', autoCellHeight: false, 
							cellsRenderer: function () { 
								return "View"; 
							},buttonclick: function(row){
								var serial_no=$('#missing-bin-item-sim-list').jqxGrid('getcellvalue', row, "serial_no");
								WRPAdminApp.pagescript.getSerialMissingBinDetail(serial_no);
							}
        			  },
				]
    		});
    	}
    	
    	components = $('#missing-bin-item-ser-acc-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    				        { name: 'item_sid', type: 'string'},
    		             	{ name: 'item_code', type: 'string'},
    		             	{ name: 'serial_no', type: 'string'},
    						{ name: 'description', type: 'string'},
    		                { name: 'qty', type: 'number' },
    		                { name: 'sku', type: 'string' },
    		                { name: 'upc', type: 'string' },
        					{ name: 'update_date', type: 'string' },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
	          		  { text: 'sid', datafield: 'item_sid', width: '10%', editable: false, hidden:true },
	          		  { text: 'CT.', width: '5%', cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
                      { text: 'Item Code', datafield: 'item_code', width: '10%', align: 'center', cellsalign: "center" },
        			  { text: 'Description', datafield: 'description', width: '25%', align: 'center'},
                      { text: 'SKU', datafield: 'sku', width: '10%', editable: false, align: 'center', cellsalign: "center"},
                      { text: 'UPC', datafield: 'upc', width: '10%', align: 'center', cellsalign: "center" },
                      { text: 'Serial No', datafield: 'serial_no', width: '12%', align: 'center', cellsalign: "center" },
        			  { text: 'Qty', datafield: 'qty', width: '9%', editable: false, align: 'center', cellsalign: "center" },
        			  { text: 'Update Date', datafield: 'update_date', width: '12%', editable: false, align: 'center', cellsalign: "center" },
        			  { text: "Detail", width: '7%', editable: false,columnType : 'button', align: 'center', autoCellHeight: false, 
							cellsRenderer: function () { 
								return "View"; 
							},buttonclick: function(row){
								var serial_no=$('#missing-bin-item-ser-acc-list').jqxGrid('getcellvalue', row, "serial_no");
								WRPAdminApp.pagescript.getSerialMissingBinDetail(serial_no);
							}
        			  },
				]
    		});
    	}
    	
    	components = $('#missing-bin-item-non-acc-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'item_sid', type: 'string'},
    					{ name: 'item_code', type: 'string'},
    					{ name: 'description', type: 'string'},
    					{ name: 'distributor', type: 'string' },
    					{ name: 'category_name', type: 'string' },
    					{ name: 'subcategory_name', type: 'string' },
    					{ name: 'manufacturer', type: 'string' },
    					{ name: 'qty', type: 'number' },
    					{ name: 'sku', type: 'string' },
    					{ name: 'upc', type: 'string' },
    					{ name: 'update_date', type: 'string' },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    			groupable: false,
    			columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
    				{ text: 'item_sid', datafield: 'item_sid', editable: false, hidden:true },
    				{ text: 'CT.', width: '5%', cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
    				{ text: 'Item Code', datafield: 'item_code', width: '10%', align: 'center', cellsalign: "center" },
    				{ text: 'Description', datafield: 'description', width: '20%', align: 'center'},
    				{ text: 'SKU', datafield: 'sku', width: '10%', editable: false, align: 'center', cellsalign: "center"},
    				{ text: 'UPC', datafield: 'upc', width: '10%', align: 'center', cellsalign: "center" },
    				{ text: 'Category', datafield: 'category_name', width: '9%', align: 'center', cellsalign: "center" },
    				{ text: 'Sub-Category', datafield: 'subcategory_name', width: '9%', align: 'center', cellsalign: "center" },
    				{ text: 'Qty', datafield: 'qty', width: '8%', editable: false, align: 'center', cellsalign: "center" },
    				{ text: 'Update Date', datafield: 'update_date', width: '12%', editable: false, align: 'center', cellsalign: "center" },
    				{ text: "Detail", width: '7%', editable: false,columnType : 'button', align: 'center', autoCellHeight: false, 
						cellsRenderer: function () { 
							return "View"; 
						},buttonclick: function(row){
							var item_sid=$('#missing-bin-item-non-acc-list').jqxGrid('getcellvalue', row, "item_sid");
							WRPAdminApp.pagescript.getNonSerialMissingBinDetail(item_sid);
						}
    				},
    			]
    		});
    	}

    	components = $('#missing-bin-detail-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "90%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'user_id', type: 'string'},
    					{ name: 'type', type: 'string'},
    					{ name: 'date', type: 'string'},
    					{ name: 'adjust_id', type: 'string' },
    					{ name: 'trans_id', type: 'string' },
    					{ name: 'item_code', type: 'string' },
    					{ name: 'qty', type: 'number' },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    			groupable: false,
    			columnsresize:true,
    	        enablebrowserselection: true,
    			columns: [
    				{ text: 'CT.', width: '10%', cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
    				{ text: 'Item Code', datafield: 'item_code', width: '20%', align: 'center', cellsalign: "center" },
    				{ text: 'Type', datafield: 'type', width: '10%', align: 'center', cellsalign: "center"},
    				{ text: 'ID', datafield: 'adjust_id', width: '20%', align: 'center', cellsalign: "center"},
    				{ text: 'Updater', datafield: 'user_id', width: '15%', align: 'center', cellsalign: "center" },
    				{ text: 'Date', datafield: 'date', width: '15%', align: 'center', cellsalign: "center" },
    				{ text: 'Qty', datafield: 'qty', width: '10%', align: 'center', cellsalign: "center" },
    			]
    		});
    	}
    	
    	components = $('#missing-bin-detail-window');
    	if (components) {
    		components.jqxWindow({
    			width: 700,
    			height: 500,
    			position: { x:((window.innerWidth * 0.5) - 350) , y: ((window.innerHeight * 0.5) - 250) }
    		});
    	}
    	
    	components = $('.jqx-check-box');
    	components.jqxCheckBox({ width:'100px', height:'40px', boxSize: '25px'});
    	
    	components = $("#enter-phone-serial-no-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "95%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
		                { name: 'item_sid', type: 'number' },
		                { name: 'serial_no', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
		          	  { text: 'CT.', width: "10%", cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
                      { text: 'Serial Number', width:"80%",datafield: 'serial_no', cellsalign: 'center', align: 'center'},
                      { text: "", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Delete'; }
						,buttonclick: function(row){
							var id = $('#enter-phone-serial-no-list').jqxGrid('getrowid', row);
							$("#enter-phone-serial-no-list").jqxGrid('deleterow', id);
							WRPAdminApp.pagescript._phoneSerialNoList.splice(row.boundindex, 1);
							
							document.getElementById("enter-phone-qty").innerHTML = WRPAdminApp.pagescript._phoneSerialNoList.length;
					    	document.getElementById("audit-total-phone-qty").innerHTML = WRPAdminApp.pagescript._phoneSerialNoList.length;
						}
                      }
				]
    		});
    	}
    	
    	components = $("#enter-sim-serial-no-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "95%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
		                { name: 'item_sid', type: 'number' },
		                { name: 'serial_no', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
		          	  { text: 'CT.', width: "10%", cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
                      { text: 'Serial Number', width:"80%",datafield: 'serial_no', cellsalign: 'center', align: 'center'},
                      { text: "", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Delete'; }
						,buttonclick: function(row){
							var id = $('#enter-sim-serial-no-list').jqxGrid('getrowid', row);
							$("#enter-sim-serial-no-list").jqxGrid('deleterow', id);
							WRPAdminApp.pagescript._simSerialNoList.splice(row.boundindex, 1);
							
							document.getElementById("enter-sim-qty").innerHTML = WRPAdminApp.pagescript._simSerialNoList.length;
					    	document.getElementById("audit-total-sim-qty").innerHTML = WRPAdminApp.pagescript._simSerialNoList.length;
						}
                      }
				]
    		});
    	}
    	
    	components = $("#enter-accessory-item-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "95%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
		                { name: 'item_sid', type: 'number' },
		                { name: 'item_code', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'sku', type: 'string' },
		                { name: 'scanned_qty', type: 'number' },
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
		          	  { text: 'CT.', width: "10%", cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'CODE', width:"20%",datafield: 'item_code', cellsalign: 'center', align: 'center'},
		          	  { text: 'Description', width:"30%",datafield: 'description', cellsalign: 'center', align: 'center'},
                      { text: 'SKU', width:"20%",datafield: 'sku', cellsalign: 'center', align: 'center'},
                      { text: 'Qty', width:"10%",datafield: 'scanned_qty', cellsalign: 'center', align: 'center'},
                      { text: "", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Delete'; }
						,buttonclick: function(row){
							var total=0;
							var id = $('#enter-accessory-item-list').jqxGrid('getrowid', row);
							$("#enter-accessory-item-list").jqxGrid('deleterow', id);
							WRPAdminApp.pagescript._nonSerialAccList.splice(row.boundindex, 1);
							
							for(i=0; i < WRPAdminApp.pagescript._nonSerialAccList.length; i++){
								total = total + WRPAdminApp.pagescript._nonSerialAccList[i].scanned_qty;
							}

							document.getElementById("enter-acc-qty").innerHTML = total;
							document.getElementById("audit-total-non-acc-qty").innerHTML = total;
						}
                      }
				]
    		});
    	}
    	
    	components = $("#enter-accessory-serial-no-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "95%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
		                { name: 'item_sid', type: 'number' },
		                { name: 'serial_no', type: 'string' },
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
		          	  { text: 'CT.', width: "10%", cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
                      { text: 'Serial Number', width:"80%",datafield: 'serial_no', cellsalign: 'center', align: 'center'},
                      { text: "", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Delete'; }
						,buttonclick: function(row){
							var id = $('#enter-accessory-serial-no-list').jqxGrid('getrowid', row);
							$("#enter-accessory-serial-no-list").jqxGrid('deleterow', id);
							WRPAdminApp.pagescript._accSerialNoList.splice(row.boundindex, 1);
							
							document.getElementById("enter-serialized-acc-qty").innerHTML = WRPAdminApp.pagescript._accSerialNoList.length;
					    	document.getElementById("audit-total-acc-qty").innerHTML = WRPAdminApp.pagescript._accSerialNoList.length;
						}
                      }
				]
    		});
    	}

    	components = $("#non-serialized-acc-select-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "90%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
		                { name: 'item_sid', type: 'number' },
		                { name: 'item_code', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'sku', type: 'string' },
		                { name: 'upc', type: 'number' },
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
		          	  { text: 'CT.', width: "10%", cellsalign: 'center', align: 'center',cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'Item Code', width:"20%",datafield: 'item_code', cellsalign: 'center', align: 'center'},
		          	  { text: 'Description', width:"30%",datafield: 'description', cellsalign: 'center', align: 'center'},
                      { text: 'SKU', width:"20%",datafield: 'sku', cellsalign: 'center', align: 'center'},
                      { text: 'UPC', width:"20%",datafield: 'upc', cellsalign: 'center', align: 'center'},
				]
    		});
    	}
    	
    	components = $('#run-blind-audit-window-1');
    	if (components) {
    		components.jqxWindow({
    			width: 900,
    			height: 650,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) }
    		});
    	}
    	components = $('#run-blind-audit-phone-window');
    	if (components) {
    		components.jqxWindow({
    			width: 900,
    			height: 650,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) }
    		});
    	}
    	components = $('#run-blind-audit-sim-window');
    	if (components) {
    		components.jqxWindow({
    			width: 900,
    			height: 650,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) }
    		});
    	}
    	components = $('#run-blind-audit-non-acc-window');
    	if (components) {
    		components.jqxWindow({
    			width: 900,
    			height: 650,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) }
    		});
    	}
    	components = $('#run-blind-audit-ser-acc-window');
    	if (components) {
    		components.jqxWindow({
    			width: 900,
    			height: 650,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) }
    		});
    	}
    	components = $('#run-blind-audit-total-window');
    	if (components) {
    		components.jqxWindow({
    			width: 900,
    			height: 650,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) }
    		});
    	}
    	components = $('#run-blind-audit-confirm-window');
    	if (components) {
    		components.jqxWindow({
    			width: 900,
    			height: 650,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) }
    		});
    	}
    	components = $('#popup-blind-audit-non-accessory-select');
    	if (components) {
    		components.jqxWindow({
    			width: 600,
    			height: 550,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 275) }
    		});
    	}
    	components = $('#popup-blind-audit-enter-accessory');
    	if (components) {
    		components.jqxWindow({
    			width: 500,
    			height: 300,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 250) , y: ((window.innerHeight * 0.5) - 150) }
    		});
    	}
    	components = $('#popup-blind-audit-duplicate-accessory');
    	if (components) {
    		components.jqxWindow({
    			width: 410,
    			height: 250,
    			showCloseButton: false,
    			position: { x:((window.innerWidth * 0.5) - 205) , y: ((window.innerHeight * 0.5) - 125) }
    		});
    	}
    	
    	$('#missing-bin-phone-cur').jqxRadioButton('check');
    	$('#missing-bin-sim-cur').jqxRadioButton('check');
    	$('#missing-bin-ser-acc-cur').jqxRadioButton('check');
    	$('#missing-bin-non-acc-cur').jqxRadioButton('check');
    	
		WRPAdminApp.pagescript.getSimpleAdjustList();
    },
    getSimpleAdjustList: function(){
    	var store_id, start_date, end_date;
    	
    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	start_date = $("#simple-adjust-history-start-date").val();
        	end_date = $("#simple-adjust-history-end-date").val();
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
            url: "ajax/inventory_adjust/getInvenAdjustList.jsp",
            data: {
            	store_id: store_id,
            	start_date: start_date,
            	end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#simple-adjustment-list");
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
    getSimpleAdjustListDetail: function(event){
    	var rowdata = event.args.row;

    	document.getElementById("simple-adjust-detail-store").value = (rowdata.store_id)?rowdata.store_id:"&nbsp;";
    	document.getElementById("simple-adjust-detail-date").value = (rowdata.date)?rowdata.date:"&nbsp;";
    	document.getElementById("simple-adjust-detail-id").value = (rowdata.adjust_id)?rowdata.adjust_id:"&nbsp;";
    	document.getElementById("simple-adjust-detail-user").value = (rowdata.user_id)?rowdata.user_id:"&nbsp;";
    	document.getElementById("simple-adjust-detail-item-code").value = (rowdata.item_code)?rowdata.item_code:"&nbsp;";
    	document.getElementById("simple-adjust-detail-item-sku").value = (rowdata.sku)?rowdata.sku:"&nbsp;" +" / "+ (rowdata.upc)?rowdata.upc:"&nbsp;";
    	document.getElementById("simple-adjust-detail-item-description").value = (rowdata.description)?rowdata.description:"&nbsp;";
    	document.getElementById("simple-adjust-detail-qty").value = (rowdata.adjust_qty)?rowdata.adjust_qty:"&nbsp;";
    	document.getElementById("simple-adjust-detail-memo").value = (rowdata.memo)?rowdata.memo:"&nbsp;";
    	
    },
    getSimpleAdjustListSerialDetail: function(event){
    	var rowdata, elem, store_id;
    	rowdata = event.args.row;
    	document.getElementById("simple-adjust-serial-detail-store").innerHTML = (rowdata.store_id)?rowdata.store_id:"&nbsp;";
    	document.getElementById("simple-adjust-serial-detail-date").innerHTML = (rowdata.date)?rowdata.date:"&nbsp;";
    	document.getElementById("simple-adjust-serial-detail-id").innerHTML = (rowdata.adjust_id)?rowdata.adjust_id:"&nbsp;";
    	document.getElementById("simple-adjust-serial-detail-user").innerHTML = (rowdata.user_id)?rowdata.user_id:"&nbsp;";
    	
    	switch(rowdata.adjust_type){
    	case 1:
    		document.getElementById("simple-adjust-serial-detail-type").innerHTML = "ADDED";
    		break;
    	case 2:
    		document.getElementById("simple-adjust-serial-detail-type").innerHTML = "SUBTRACTED";
    		break;
    	}
    	
    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/inventory_adjust/getSimpleAdjustItems.jsp",
            data: {
            	store_id: store_id,
            	adjust_sid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                data = result.data;
                if (!data) return;

                elem = $("#simple-adjustment-serial-no-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}

            }
        });
    },
    newSimpleAdjustOpen: function(){
    	document.getElementById("simple-adjust-item-search-keyword").value="";
    	document.getElementById("new-simple-adjust-onhand-qty").value = "";
    	document.getElementById("new-simple-adjust-qty").value = "";
    	document.getElementById("new-simple-adjust-memo").value = "";
    	document.getElementById("adjust-selected-reason").value = 0;
    	document.getElementById("add-new-simple-adjust-memo").value = "";
    	document.getElementById("add-adjust-selected-reason").value = 0;
    	document.getElementById("subtract-new-simple-adjust-memo").value = "";
    	document.getElementById("subtract-adjust-selected-reason").value = 0;
    	document.getElementById("serialized-new-simple-confirm-adjust-memo").value = "";
    	document.getElementById("serialized-adjust-confirm-reason").value = 0;
    	document.getElementById("new-simple-confirm-adjust-memo").value = "";
    	document.getElementById("new-simple-confirm-adjust-reason").value = 0;
    	
    	WRPAdminApp.pagescript._selectedItemSid = 0;
    	WRPAdminApp.pagescript._selectedItemType = -1;
    	WRPAdminApp.pagescript._selectedItemStore = undefined;
    	WRPAdminApp.pagescript._newAdjustId = undefined;
    	WRPAdminApp.pagescript._addSerialNoList = [];

    	$('#simple-adjust-search-item-list').jqxGrid("clearselection");
    	$('#simple-adjust-search-item-list').jqxGrid("clear");
    	$("#simple-adjust-select-item-type-window").jqxWindow("open");
    },
    selectSerialType: function(item_type){
    	WRPAdminApp.pagescript._selectedItemType = item_type;
    	
    	$("#simple-adjust-select-item-type-window").jqxWindow("close");
    	$("#simple-adjust-select-adjust-type-window").jqxWindow("open");
    },
    openSearchItemWindow: function(type){
    	
    	if(type < 3){
       		WRPAdminApp.pagescript._selectedAdjustType = type;
       		if(type == 1){
       			switch(WRPAdminApp.pagescript._selectedItemType){
           		case 0:
           			document.getElementById("simple-adjust-select-type-title").innerHTML = "Add Serialized Inventory (PHONE)";
           			break;
           		case 1:
               		document.getElementById("simple-adjust-select-type-title").innerHTML = "Add Serialized Inventory (SIM)";
               		break;
           		case 2:
               		document.getElementById("simple-adjust-select-type-title").innerHTML = "Add Serialized Inventory (Serialized Accessory)";
               		break;
           		}
       		}else if(type == 2){
           		switch(WRPAdminApp.pagescript._selectedItemType){
           		case 0:
           			document.getElementById("simple-adjust-select-type-title").innerHTML = "Inventory Subtract (PHONE)";
           			break;
           		case 1:
               		document.getElementById("simple-adjust-select-type-title").innerHTML = "Inventory Subtract (SIM)";
               		break;
           		case 2:
               		document.getElementById("simple-adjust-select-type-title").innerHTML = "Inventory Subtract (Serialized Accessory)";
               		break;
           		}
       		}
        	$("#simple-adjust-select-adjust-type-window").jqxWindow("close");
    	}else{
    		WRPAdminApp.pagescript._selectedItemType = type;
       		document.getElementById("simple-adjust-select-type-title").innerHTML = "Inventory Adjustment (Non-Serialized Accessory)";
        	$("#simple-adjust-select-item-type-window").jqxWindow("close");
    	}

    	$("#simple-adjust-select-item-window").jqxWindow("open");
    },
    simpleAdjustSearchItem: function(){
    	var keyword, store_id;
    	
    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	keyword = document.getElementById("simple-adjust-item-search-keyword").value;
        	if (keyword.length == 0) return;
        }catch(e){
        	
        }

       	try {
       		document.getElementById("loading-container").style.display = "block";
       	} catch (e) {
       		console.warn(e);
       	}
       	
        $.ajax({
            url: "ajax/inventory_adjust/getItemInfoStores.jsp",
            data: {
            	store_id: store_id,
            	keyword: keyword,
            	item_type: WRPAdminApp.pagescript._selectedItemType
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                data = result.data;
                if (!data) return;

                elem = $("#simple-adjust-search-item-list");
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
    nextSimpleAdjust: function(){
    	var item_sid,store_id;
    	
    	item_sid = WRPAdminApp.pagescript._selectedItemSid;
    	
    	if(item_sid < 1){
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select Item"
    		});
    		return;
    	}

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

    	$.ajax({
            url: "ajax/inventory_adjust/getItemInfoBySid.jsp",
            data: {
            	store_id: store_id,
            	item_sid: item_sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                data = result.data;
                if (!data) return;

                if(data.item_type == 3){
                	try{
                    	document.getElementById("adjust-selected-item-code").innerHTML = (data.item_code) ? data.item_code : "";
                    	document.getElementById("adjust-selected-item-sku").innerHTML = (data.sku) ? data.sku : "";
                    	document.getElementById("adjust-selected-item-upc").innerHTML = (data.upc) ? data.upc : "";
                    	document.getElementById("adjust-selected-item-description").innerHTML = (data.description) ? data.description : "";
                    	document.getElementById("adjust-selected-item-system-qty").innerHTML = (data.qty) ? data.qty : "0";
                    	
                    }catch(e){
                    	
                    }
    	 	       	$('#simple-adjust-select-item-window').jqxWindow('close');
    	 	       	$('#simple-adjust-adjust-qty-window').jqxWindow('open');
                	
                }else{
                	if(WRPAdminApp.pagescript._selectedAdjustType == 1){
                    	try{
                        	document.getElementById("add-adjust-selected-item-code").innerHTML = (data.item_code) ? data.item_code : "";
                        	document.getElementById("add-adjust-selected-item-sku").innerHTML = (data.sku) ? data.sku : "";
                        	document.getElementById("add-adjust-selected-item-upc").innerHTML = (data.upc) ? data.upc : "";
                        	document.getElementById("add-adjust-selected-item-description").innerHTML = (data.description) ? data.description : "";

                            $('#add-adjust-serial-no-list').jqxGrid("clear");
                        }catch(e){
                        	
                        }
                        
        	 	       	$('#simple-adjust-select-item-window').jqxWindow('close');
                		$('#simple-adjust-serialized-add-window').jqxWindow('open');
                	}else if(WRPAdminApp.pagescript._selectedAdjustType == 2){
                		try{
                        	document.getElementById("subtract-adjust-selected-item-code").innerHTML = (data.item_code) ? data.item_code : "";
                        	document.getElementById("subtract-adjust-selected-item-sku").innerHTML = (data.sku) ? data.sku : "";
                        	document.getElementById("subtract-adjust-selected-item-upc").innerHTML = (data.upc) ? data.upc : "";
                        	document.getElementById("subtract-adjust-selected-item-description").innerHTML = (data.description) ? data.description : "";
                        	document.getElementById("subtract-adjust-selected-item-system-qty").innerHTML = (data.qty) ? data.qty : "0";
                        }catch(e){
                        	
                        }
        	 	       	$('#simple-adjust-select-item-window').jqxWindow('close');
                		WRPAdminApp.pagescript.getSerialNoInInven();
                	}
                }
                
            }
        });
    	
    },
    getSerialNoInInven: function(){
    	var store_id, item_sid;

		try{
			store_id = document.getElementById("select-store").value;
			if(store_id.length < 1) return;
		}catch(e){

		}
		
		try{
			item_sid = WRPAdminApp.pagescript._selectedItemSid;
			if(item_sid.length < 1) return;
		}catch(e){

		}

    	$.ajax({
            url: "ajax/inventory/getSerializedItemListInInvenByItemSid.jsp",
            data: {
            	storeId: store_id,
            	itemSid: item_sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                data = result.data;
                if (!data) return;

        		$('#simple-adjust-serialized-subtract-window').jqxWindow('open');
        		
                elem = $("#subtract-adjust-serial-no-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}
            }
    	});
    },
    AddSerialNo: function(){
    	var elem, store_id, serialNo_list, i;
    	
    	serialNo_list = WRPAdminApp.pagescript._addSerialNoList;
    	elem = document.getElementById("add-serialno-keyword");
    	
    	
    	if (!elem || elem.value.length == 0) {
    		return;
    	}

    	if(serialNo_list.length > 0){
    		for(i=0; i < serialNo_list.length; i++){
    	    	if(serialNo_list[i].serial_no == elem.value){
    	    		WRPCommon.MsgBoxModule.alert({
    	    			message: "Serial number is duplicated"
    	    		});
            		elem.value = "";
        	    	return;
    	    	}
    		}
    	}
    	
		try{
			store_id = document.getElementById("select-store").value;
			if(store_id.length < 1) return;
		}catch(e){

		}
		
    	$.ajax({
    		url: "ajax/inventory_adjust/getSerialNoInMissing.jsp",
            data: {
            	store_id: store_id,
            	item_sid: WRPAdminApp.pagescript._selectedItemSid,
            	serial_no: elem.value
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data;
            	data = result.data;
            	
            	if(!data){
            		WRPCommon.MsgBoxModule.alert({
            			message:"The serial number is not found."
            		});
            		elem.value = "";
            		return;
            	}
            	
            	serialNo_list.push({
        			serial_no: elem.value,
        			description: document.getElementById("add-adjust-selected-item-description").innerHTML
        		});
            	
            	elem.value = "";
            	
            	elem = $("#add-adjust-serial-no-list");
            	if (elem) {
            		elem.jqxGrid("clear");
           			elem.jqxGrid("addRow", null, serialNo_list, "last");
            	}
            }
    	});
    },
    calcOnhandQty: function(){
    	var system_qty, adjust_qty, onhand_qty;

    
    	system_qty = document.getElementById("adjust-selected-item-system-qty").innerHTML;
    	adjust_qty = document.getElementById("new-simple-adjust-qty").value;
    	
    	if(adjust_qty == ""){
        	adjust_qty = 0;
        }
    	
    	onhand_qty = parseInt(system_qty) + parseInt(adjust_qty);
    	
    	if (isNaN(onhand_qty)) {
            return;
        }
    	
    	document.getElementById("new-simple-adjust-onhand-qty").value = onhand_qty;
    },
    submitSimpleAdjust : function(){
    	var adjust_qty = document.getElementById("new-simple-adjust-qty").value;
    	
    	if (isNaN(adjust_qty) || adjust_qty.length == 0) {
			WRPCommon.MsgBoxModule.alert({
				message: "Check Adjust Qty"
			});
			document.getElementById("new-simple-adjust-qty").value="";
            return;
        }
    	
    	document.getElementById("adjust-confirm-store-id").innerHTML = WRPAdminApp.pagescript._selectedItemStore;
    	document.getElementById("adjust-confirm-item-code").innerHTML = document.getElementById("adjust-selected-item-code").innerHTML;
    	document.getElementById("adjust-confirm-item-sku").innerHTML = document.getElementById("adjust-selected-item-sku").innerHTML;
    	document.getElementById("adjust-confirm-item-upc").innerHTML = document.getElementById("adjust-selected-item-upc").innerHTML;
    	document.getElementById("adjust-confirm-item-description").innerHTML = document.getElementById("adjust-selected-item-description").innerHTML;
    	document.getElementById("adjust-confirm-adjust-qty").innerHTML = adjust_qty;
    	document.getElementById("adjust-confirm-onhand-qty").innerHTML = document.getElementById("new-simple-adjust-onhand-qty").value;
    	document.getElementById("new-simple-confirm-adjust-reason").value = $("#adjust-selected-reason option:selected").text();
    	document.getElementById("new-simple-confirm-adjust-memo").value = document.getElementById("new-simple-adjust-memo").value;
    	
    	//$('#simple-adjust-adjust-qty-window').jqxWindow('close');
    	$('#simple-adjust-confirm-window').jqxWindow('open');
    },
    proceedSerializedSimpleAdjust : function(){
    	var serialNo_list, elem, rows;
    	if(WRPAdminApp.pagescript._selectedAdjustType == 1){

        	try {
        		elem = $("#add-adjust-serial-no-list");
        		rows = elem.jqxGrid("getrows");
        	} catch (e) {
        		console.warn(e);
        		return;
        	}
        	serialNo_list = [];
        	
        	for (i = 0, len = rows.length; i < len; i++) {
    			row = rows[i];
    			serialNo_list.push({
        			serial_no: row.serial_no,
        			description: row.description,
        		});
    		}

        	if(serialNo_list.length < 1){
        		WRPCommon.MsgBoxModule.alert({
        			message: "Select Items"
        		});
        		return;
        	}

        	$('#simple-adjust-serialized-confirm-window').jqxWindow('open');
        	
        	elem = $("#confirm-adjust-serial-no-list");
        	if (elem) {
	       			elem.jqxGrid("clear");
	       			elem.jqxGrid("addRow", null, serialNo_list, "last");
	       	}
        	
        	document.getElementById("serialized-adjust-confirm-store-id").innerHTML = WRPAdminApp.pagescript._selectedItemStore;
        	document.getElementById("serialized-adjust-confirm-item-code").innerHTML = document.getElementById("add-adjust-selected-item-code").innerHTML;
        	document.getElementById("serialized-adjust-confirm-item-sku").innerHTML = document.getElementById("add-adjust-selected-item-sku").innerHTML;
        	document.getElementById("serialized-adjust-confirm-item-upc").innerHTML = document.getElementById("add-adjust-selected-item-upc").innerHTML;
        	document.getElementById("serialized-adjust-confirm-item-description").innerHTML = document.getElementById("add-adjust-selected-item-description").innerHTML;
        	document.getElementById("serialized-adjust-confirm-adjust-qty").innerHTML = serialNo_list.length;
        	document.getElementById("serialized-adjust-confirm-reason").value = $("#add-adjust-selected-reason option:selected").text();
        	document.getElementById("serialized-new-simple-confirm-adjust-memo").value = document.getElementById("add-new-simple-adjust-memo").value;
        	
        	//$('#simple-adjust-serialized-add-window').jqxWindow('close');
    	}else if(WRPAdminApp.pagescript._selectedAdjustType == 2){

        	try {
        		elem = $("#subtract-adjust-serial-no-list");
        		rows = elem.jqxGrid("getrows");
        	} catch (e) {
        		console.warn(e);
        		return;
        	}
        	serialNo_list = [];
        	
        	for (i = 0, len = rows.length; i < len; i++) {
    			row = rows[i];

        		if (row.selected === true) {
        			serialNo_list.push({
        				serial_no: row.serialNo,
        				description: row.description,
        			});
        		}
    		}
        	
        	if(serialNo_list.length < 1){
        		WRPCommon.MsgBoxModule.alert({
        			message: "Select Items"
        		});
        		return;
        	}

        	$('#simple-adjust-serialized-confirm-window').jqxWindow('open');
        	
        	elem = $("#confirm-adjust-serial-no-list");
        	if (elem) {
	       			elem.jqxGrid("clear");
	       			elem.jqxGrid("addRow", null, serialNo_list, "last");
	       	}
        	
        	document.getElementById("serialized-adjust-confirm-store-id").innerHTML = WRPAdminApp.pagescript._selectedItemStore;
        	document.getElementById("serialized-adjust-confirm-item-code").innerHTML = document.getElementById("subtract-adjust-selected-item-code").innerHTML;
        	document.getElementById("serialized-adjust-confirm-item-sku").innerHTML = document.getElementById("subtract-adjust-selected-item-sku").innerHTML;
        	document.getElementById("serialized-adjust-confirm-item-upc").innerHTML = document.getElementById("subtract-adjust-selected-item-upc").innerHTML;
        	document.getElementById("serialized-adjust-confirm-item-description").innerHTML = document.getElementById("subtract-adjust-selected-item-description").innerHTML;
        	document.getElementById("serialized-adjust-confirm-adjust-qty").innerHTML = - serialNo_list.length;
        	document.getElementById("serialized-adjust-confirm-reason").value = $("#subtract-adjust-selected-reason option:selected").text();
        	document.getElementById("serialized-new-simple-confirm-adjust-memo").value = document.getElementById("subtract-new-simple-adjust-memo").value;
        	
        	//$('#simple-adjust-serialized-subtract-window').jqxWindow('close');
    	}
    },
	confirmSerializedSimpleAdjust: function(){
		WRPCommon.MsgBoxModule.confirm({
			width: 500,
			message: "Are you sure?",
			noBtnClick: function(){
				return;
			},
			yesBtnClick: WRPAdminApp.pagescript.setSerializedSimpleAdjust
		});
	},
	confirmSimpleAdjust: function(){
		WRPCommon.MsgBoxModule.confirm({
			width: 500,
			message: "Are you sure?",
			noBtnClick: function(){
				return;
			},
			yesBtnClick: WRPAdminApp.pagescript.setSimpleAdjust
		});
	},
	setSerializedSimpleAdjust: function(){
		var param, elem,rows,serialno_list;
		param = {};
		
		elem = $("#confirm-adjust-serial-no-list");
		rows = elem.jqxGrid("getrows");
    		
		serialno_list = [];
		
		for (i = 0, len = rows.length; i < len; i++) {
			row = rows[i];
			if (row.serial_no === undefined) {
				continue;
			}
			
			serialno_list.push({
				serial_no: row.serial_no,
			});
		}
		
		param.serialno_list_str = JSON.stringify(serialno_list);
		
		try{
			param.store_id = document.getElementById("select-store").value;
			if(param.store_id.length < 1) return;
		}catch(e){

		}
		
		try{
			param.item_sid = WRPAdminApp.pagescript._selectedItemSid;
			if(param.item_sid.length < 1) return;
		}catch(e){

		}
		
		
		try{
			param.adjust_qty = document.getElementById("serialized-adjust-confirm-adjust-qty").innerHTML;
			if(param.adjust_qty.length < 1) return;
		}catch(e){
			
		}
		
		try{
			param.item_type = WRPAdminApp.pagescript._selectedItemType;
		}catch(e){
			
		}

		try{
			param.reason = document.getElementById("serialized-adjust-confirm-reason").value;
		}catch(e){
			
		}

		try{
			param.memo = document.getElementById("serialized-new-simple-confirm-adjust-memo").value;
		}catch(e){
			
		}
		
		try{
			if(param.adjust_qty < 0){
				param.adjust_type = 2;
			}else{
				param.adjust_type = 1;
			}
		}catch(e){
			
		}
		
    	$.ajax({
            url: "ajax/inventory_adjust/setInventoryAdjust.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                
                if(result == 0){
                	WRPCommon.MsgBoxModule.alert({
            			width: 500,
                		message: "Completed",
                		okBtnClick: function(){
                			if(param.adjust_type==1){
                    			$('#simple-adjust-serialized-add-window').jqxWindow('close');
                			}else if(param.adjust_type==2){
                    			$('#simple-adjust-serialized-subtract-window').jqxWindow('close');
                			}
                        	$('#simple-adjust-serialized-confirm-window').jqxWindow('close');
                        	WRPAdminApp.pagescript.getSimpleAdjustList();
                		}
                	});
                }else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error"
                	});
                }
            }
        });
	},
	setSimpleAdjust: function(){
		var param;
		param = {};
		
		try{
			param.store_id = document.getElementById("select-store").value;
			if(param.store_id.length < 1) return;
		}catch(e){

		}
		
		try{
			param.item_sid = WRPAdminApp.pagescript._selectedItemSid;
			if(param.item_sid.length < 1) return;
		}catch(e){

		}
		
		
		try{
			param.adjust_qty = document.getElementById("adjust-confirm-adjust-qty").innerHTML;
			if(param.adjust_qty.length < 1) return;
		}catch(e){
			
		}
		
		try{
			param.item_type = WRPAdminApp.pagescript._selectedItemType;
		}catch(e){
			
		}

		try{
			param.reason = document.getElementById("new-simple-confirm-adjust-reason").value;
		}catch(e){
			
		}
		
		try{
			param.memo = document.getElementById("new-simple-confirm-adjust-memo").value;
		}catch(e){
			
		}
		
		try{
			if(param.adjust_qty < 0){
				param.adjust_type = 2;
			}else{
				param.adjust_type = 1;
			}
		}catch(e){
			
		}
		
    	$.ajax({
            url: "ajax/inventory_adjust/setInventoryAdjust.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                
                if(result == 0){
                	WRPCommon.MsgBoxModule.alert({
            			width: 500,
                		message: "Completed",
                		okBtnClick: function(){
                			$('#simple-adjust-adjust-qty-window').jqxWindow('close');
                        	$('#simple-adjust-confirm-window').jqxWindow('close');
                        	WRPAdminApp.pagescript.getSimpleAdjustList();
                		}
                	});

                }else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error"
                	});
                }
            }
        });
	},
    getBlindAuditList: function(){
    	var params;
    	
    	params = {};
        
        try {
        	params.start_date = $("#blind-audit-history-start-date").val();
        	params.end_date = $("#blind-audit-history-end-date").val();
        	params.audit_type = 0;
        	params.callback = WRPAdminApp.pagescript.callbackGetBlindAuditList;
        	$("#blind-audit-list").jqxGrid("clear");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        setTimeout(WRPAdminApp.pagescript.initBlindAuditInfo, 50);
        
        WRPAdminApp.Inventory.Audit.getAuditList(params);
    },
    callbackGetBlindAuditList: function(data) {
    	if (data === undefined) {
    		return;
    	}

    	$("#blind-audit-list").jqxGrid("addrow", null, data, "last");
    },
    initBlindAuditInfo: function() {
    	try {
    		document.getElementById("blind-audit-detail-tab-store-id").innerHTML = "";
    		document.getElementById("blind-audit-detail-tab-audit-user-name").innerHTML = "";
    		document.getElementById("blind-audit-detail-tab-audit-id").innerHTML = "";
    		document.getElementById("blind-audit-detail-tab-audit-start-date").innerHTML = "";
    		document.getElementById("blind-audit-detail-tab-audit-end-date").innerHTML = "";

    		document.getElementById("blind-audit-phone-tab-store-id").innerHTML = "";
    		document.getElementById("blind-audit-phone-tab-audit-user-name").innerHTML = "";
    		document.getElementById("blind-audit-phone-tab-audit-id").innerHTML = "";
    		document.getElementById("blind-audit-phone-tab-audit-start-date").innerHTML = "";
    		document.getElementById("blind-audit-phone-tab-audit-end-date").innerHTML = "";

    		document.getElementById("blind-audit-sim-tab-store-id").innerHTML = "";
    		document.getElementById("blind-audit-sim-tab-audit-user-name").innerHTML = "";
    		document.getElementById("blind-audit-sim-tab-audit-id").innerHTML = "";
    		document.getElementById("blind-audit-sim-tab-audit-start-date").innerHTML = "";
    		document.getElementById("blind-audit-sim-tab-audit-end-date").innerHTML = "";

    		document.getElementById("blind-audit-serialized-acc-tab-store-id").innerHTML = "";
    		document.getElementById("blind-audit-serialized-acc-tab-audit-user-name").innerHTML = "";
    		document.getElementById("blind-audit-serialized-acc-tab-audit-id").innerHTML = "";
    		document.getElementById("blind-audit-serialized-acc-tab-audit-start-date").innerHTML = "";
    		document.getElementById("blind-audit-serialized-acc-tab-audit-end-date").innerHTML = "";

    		document.getElementById("blind-audit-nonserialized-acc-tab-store-id").innerHTML = "";
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-user-name").innerHTML = "";
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-id").innerHTML = "";
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-start-date").innerHTML = "";
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-end-date").innerHTML = "";
    		
    		document.getElementById("blind-audit-detail-tab-phone-system").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-phone-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-phone-matched").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-phone-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-phone-missing").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-sim-system").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-sim-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-sim-matched").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-sim-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-sim-missing").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-system").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-matched").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-missing").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-system").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-matched").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-missing").innerHTML = 0;
    		
    		document.getElementById("blind-audit-phone-tab-phone-system").innerHTML = 0;
    		document.getElementById("blind-audit-phone-tab-phone-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-phone-tab-phone-matched").innerHTML = 0;
    		document.getElementById("blind-audit-phone-tab-phone-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-phone-tab-phone-missing").innerHTML = 0;

    		document.getElementById("blind-audit-sim-tab-sim-system").innerHTML = 0;
    		document.getElementById("blind-audit-sim-tab-sim-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-sim-tab-sim-matched").innerHTML = 0;
    		document.getElementById("blind-audit-sim-tab-sim-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-sim-tab-sim-missing").innerHTML = 0;

    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-system").innerHTML = 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-matched").innerHTML = 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-missing").innerHTML = 0;

    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-system").innerHTML = 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-scanned").innerHTML = 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-matched").innerHTML = 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-orphan").innerHTML = 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-missing").innerHTML = 0;
    		
    		document.getElementById("blind-audit-detail-tab-audit-memo").innerHTML = '';
    		
    		//$(".blind-audit-info-items-list, .blind-audit-info-orphan-items-list .blind-audit-info-missing-items-list").jqxGrid("clear");
    		

			document.getElementById("blind-audit-phone-tab-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-phone-items-list").innerHTML = '';
			document.getElementById("blind-audit-sim-tab-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-sim-items-list").innerHTML = '';
			document.getElementById("blind-audit-serialized-acc-tab-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-serialized-acc-items-list").innerHTML = '';
			document.getElementById("blind-audit-nonserialized-acc-tab-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-nonserialized-acc-items-list").innerHTML = '';
			document.getElementById("blind-audit-phone-tab-orphan-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-phone-orphan-items-list").innerHTML = '';
			document.getElementById("blind-audit-sim-tab-orphan-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-sim-orphan-items-list").innerHTML = '';
			document.getElementById("blind-audit-serialized-acc-tab-orphan-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-serialized-acc-orphan-items-list").innerHTML = '';

			document.getElementById("blind-audit-phone-tab-missing-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-phone-missing-items-list").innerHTML = '';
			document.getElementById("blind-audit-sim-tab-missing-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-sim-missing-items-list").innerHTML = '';
			document.getElementById("blind-audit-serialized-acc-tab-missing-items-list").innerHTML = '';
			document.getElementById("blind-audit-detail-window-serialized-acc-missing-items-list").innerHTML = '';
    		
    		$("#blind-audit-info-tab-panel").val(0);
    	} catch (e) {
    		console.warn(e);
    	}
    },
    onBlindAuditListRowSelect: function(event) {
    	var audit_sid;

		document.getElementById("blind-audit-phone-tab-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-phone-items-list").innerHTML = '';
		document.getElementById("blind-audit-sim-tab-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-sim-items-list").innerHTML = '';
		document.getElementById("blind-audit-serialized-acc-tab-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-serialized-acc-items-list").innerHTML = '';
		document.getElementById("blind-audit-nonserialized-acc-tab-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-nonserialized-acc-items-list").innerHTML = '';
		document.getElementById("blind-audit-phone-tab-orphan-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-phone-orphan-items-list").innerHTML = '';
		document.getElementById("blind-audit-sim-tab-orphan-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-sim-orphan-items-list").innerHTML = '';
		document.getElementById("blind-audit-serialized-acc-tab-orphan-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-serialized-acc-orphan-items-list").innerHTML = '';

		document.getElementById("blind-audit-phone-tab-missing-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-phone-missing-items-list").innerHTML = '';
		document.getElementById("blind-audit-sim-tab-missing-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-sim-missing-items-list").innerHTML = '';
		document.getElementById("blind-audit-serialized-acc-tab-missing-items-list").innerHTML = '';
		document.getElementById("blind-audit-detail-window-serialized-acc-missing-items-list").innerHTML = '';
    	try {
    		audit_sid = event.args.row.sid;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	if (audit_sid === undefined || audit_sid < 1) {
    		return;
    	}
    	
    	WRPAdminApp.Inventory.Audit.getAuditInfo({
    		audit_sid: audit_sid,
    		callback: WRPAdminApp.pagescript.callbackGetAuditInfo
    	});
    },
    callbackGetAuditInfo: function(data) {
    	var items, orphan, missing, audit_items, i, len, obj, headers, phone_audit_flag = true, sim_audit_flag = true, serialized_acc_audit_flag = true, nonserialized_acc_audit_flag = true;
    	
    	if (data === undefined) {
    		return;
    	}
    	
    	try {
			obj = $("#blind-audit-info-tab-panel");
    		if (data.audit_item_type !== undefined) {
    			
    			if (data.audit_item_type.indexOf("0") == -1) {
    				phone_audit_flag = false;
    				obj.jqxTabs("disableAt", 1);
    			} else {
    				obj.jqxTabs("enableAt", 1);
    			}
    			if (data.audit_item_type.indexOf("1") == -1) {
    				sim_audit_flag = false;
    				obj.jqxTabs("disableAt", 2);
    			} else {
    				obj.jqxTabs("enableAt", 2);
    			}
    			if (data.audit_item_type.indexOf("2") == -1) {
    				serialized_acc_audit_flag = false;
    				obj.jqxTabs("disableAt", 3);
    			} else {
    				obj.jqxTabs("enableAt", 3);
    			}
    			if (data.audit_item_type.indexOf("3") == -1) {
    				nonserialized_acc_audit_flag = false;
    				obj.jqxTabs("disableAt", 4);
    			} else {
    				obj.jqxTabs("enableAt", 4);
    			}
    		} else {
				obj.jqxTabs("enableAt", 1);
				obj.jqxTabs("enableAt", 2);
				obj.jqxTabs("enableAt", 3);
				obj.jqxTabs("enableAt", 4);
    		}
    		
    		
    		document.getElementById("blind-audit-detail-tab-store-id").innerHTML = (data.store_id !== undefined)? data.store_id.toUpperCase() : '&nbsp;';
    		document.getElementById("blind-audit-detail-tab-audit-user-name").innerHTML = (data.audit_user_name !== undefined)? data.audit_user_name : '&nbsp;';
    		document.getElementById("blind-audit-detail-tab-audit-id").innerHTML = (data.audit_id !== undefined)? data.audit_id : '&nbsp;';
    		document.getElementById("blind-audit-detail-tab-audit-start-date").innerHTML = (data.audit_start_date !== undefined)? data.audit_start_date : '&nbsp;';
    		document.getElementById("blind-audit-detail-tab-audit-end-date").innerHTML = (data.audit_end_date !== undefined)? data.audit_end_date : '&nbsp;';

    		document.getElementById("blind-audit-phone-tab-store-id").innerHTML = (data.store_id !== undefined)? data.store_id.toUpperCase() : '&nbsp;';
    		document.getElementById("blind-audit-phone-tab-audit-user-name").innerHTML = (data.audit_user_name !== undefined)? data.audit_user_name : '&nbsp;';
    		document.getElementById("blind-audit-phone-tab-audit-id").innerHTML = (data.audit_id !== undefined)? data.audit_id : '&nbsp;';
    		document.getElementById("blind-audit-phone-tab-audit-start-date").innerHTML = (data.audit_start_date !== undefined)? data.audit_start_date : '&nbsp;';
    		document.getElementById("blind-audit-phone-tab-audit-end-date").innerHTML = (data.audit_end_date !== undefined)? data.audit_end_date : '&nbsp;';

    		document.getElementById("blind-audit-sim-tab-store-id").innerHTML = (data.store_id !== undefined)? data.store_id.toUpperCase() : '&nbsp;';
    		document.getElementById("blind-audit-sim-tab-audit-user-name").innerHTML = (data.audit_user_name !== undefined)? data.audit_user_name : '&nbsp;';
    		document.getElementById("blind-audit-sim-tab-audit-id").innerHTML = (data.audit_id !== undefined)? data.audit_id : '&nbsp;';
    		document.getElementById("blind-audit-sim-tab-audit-start-date").innerHTML = (data.audit_start_date !== undefined)? data.audit_start_date : '&nbsp;';
    		document.getElementById("blind-audit-sim-tab-audit-end-date").innerHTML = (data.audit_end_date !== undefined)? data.audit_end_date : '&nbsp;';

    		document.getElementById("blind-audit-serialized-acc-tab-store-id").innerHTML = (data.store_id !== undefined)? data.store_id.toUpperCase() : '&nbsp;';
    		document.getElementById("blind-audit-serialized-acc-tab-audit-user-name").innerHTML = (data.audit_user_name !== undefined)? data.audit_user_name : '&nbsp;';
    		document.getElementById("blind-audit-serialized-acc-tab-audit-id").innerHTML = (data.audit_id !== undefined)? data.audit_id : '&nbsp;';
    		document.getElementById("blind-audit-serialized-acc-tab-audit-start-date").innerHTML = (data.audit_start_date !== undefined)? data.audit_start_date : '&nbsp;';
    		document.getElementById("blind-audit-serialized-acc-tab-audit-end-date").innerHTML = (data.audit_end_date !== undefined)? data.audit_end_date : '&nbsp;';

    		document.getElementById("blind-audit-nonserialized-acc-tab-store-id").innerHTML = (data.store_id !== undefined)? data.store_id.toUpperCase() : '&nbsp;';
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-user-name").innerHTML = (data.audit_user_name !== undefined)? data.audit_user_name : '&nbsp;';
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-id").innerHTML = (data.audit_id !== undefined)? data.audit_id : '&nbsp;';
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-start-date").innerHTML = (data.audit_start_date !== undefined)? data.audit_start_date : '&nbsp;';
    		document.getElementById("blind-audit-nonserialized-acc-tab-audit-end-date").innerHTML = (data.audit_end_date !== undefined)? data.audit_end_date : '&nbsp;';
    		
    		document.getElementById("blind-audit-detail-tab-phone-system").innerHTML = (data.total_phone_system !== undefined)? data.total_phone_system : 0;
    		document.getElementById("blind-audit-detail-tab-phone-scanned").innerHTML = (data.total_phone_scanned !== undefined)? data.total_phone_scanned : 0;
    		document.getElementById("blind-audit-detail-tab-phone-matched").innerHTML = (data.total_phone_matched !== undefined)? data.total_phone_matched : 0;
    		document.getElementById("blind-audit-detail-tab-phone-orphan").innerHTML = (data.total_phone_orphan !== undefined)? data.total_phone_orphan : 0;
    		document.getElementById("blind-audit-detail-tab-phone-missing").innerHTML = (data.total_phone_missing !== undefined)? data.total_phone_missing : 0;
    		document.getElementById("blind-audit-detail-tab-sim-system").innerHTML = (data.total_sim_system !== undefined)? data.total_sim_system : 0;
    		document.getElementById("blind-audit-detail-tab-sim-scanned").innerHTML = (data.total_sim_scanned !== undefined)? data.total_sim_scanned : 0;
    		document.getElementById("blind-audit-detail-tab-sim-matched").innerHTML = (data.total_sim_matched !== undefined)? data.total_sim_matched : 0;
    		document.getElementById("blind-audit-detail-tab-sim-orphan").innerHTML = (data.total_sim_system !== undefined)? data.total_sim_system : 0;
    		document.getElementById("blind-audit-detail-tab-sim-missing").innerHTML = (data.total_sim_missing !== undefined)? data.total_sim_missing : 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-system").innerHTML = (data.total_serialized_acc_system !== undefined)? data.total_serialized_acc_system : 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-scanned").innerHTML = (data.total_serialized_acc_scanned !== undefined)? data.total_serialized_acc_scanned : 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-matched").innerHTML = (data.total_serialized_acc_matched !== undefined)? data.total_serialized_acc_matched : 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-orphan").innerHTML = (data.total_serialized_acc_orphan !== undefined)? data.total_serialized_acc_orphan : 0;
    		document.getElementById("blind-audit-detail-tab-serialized-acc-missing").innerHTML = (data.total_serialized_acc_missing !== undefined)? data.total_serialized_acc_missing : 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-system").innerHTML = (data.total_nonserialized_acc_system !== undefined)? data.total_nonserialized_acc_system : 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-scanned").innerHTML = (data.total_nonserialized_acc_scanned !== undefined)? data.total_nonserialized_acc_scanned : 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-matched").innerHTML = (data.total_nonserialized_acc_matched !== undefined)? data.total_nonserialized_acc_matched : 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-orphan").innerHTML = (data.total_nonserialized_acc_orphan !== undefined)? data.total_nonserialized_acc_orphan : 0;
    		document.getElementById("blind-audit-detail-tab-nonserialized-acc-missing").innerHTML = (data.total_nonserialized_acc_missing !== undefined)? data.total_nonserialized_acc_missing : 0;
    		
    		document.getElementById("blind-audit-phone-tab-phone-system").innerHTML = (data.total_phone_system !== undefined)? data.total_phone_system : 0;
    		document.getElementById("blind-audit-phone-tab-phone-scanned").innerHTML = (data.total_phone_scanned !== undefined)? data.total_phone_scanned : 0;
    		document.getElementById("blind-audit-phone-tab-phone-matched").innerHTML = (data.total_phone_matched !== undefined)? data.total_phone_matched : 0;
    		document.getElementById("blind-audit-phone-tab-phone-orphan").innerHTML = (data.total_phone_orphan !== undefined)? data.total_phone_orphan : 0;
    		document.getElementById("blind-audit-phone-tab-phone-missing").innerHTML = (data.total_phone_missing !== undefined)? data.total_phone_missing : 0;
    		
    		document.getElementById("blind-audit-sim-tab-sim-system").innerHTML = (data.total_sim_system !== undefined)? data.total_sim_system : 0;
    		document.getElementById("blind-audit-sim-tab-sim-scanned").innerHTML = (data.total_sim_scanned !== undefined)? data.total_sim_scanned : 0;
    		document.getElementById("blind-audit-sim-tab-sim-matched").innerHTML = (data.total_sim_matched !== undefined)? data.total_sim_matched : 0;
    		document.getElementById("blind-audit-sim-tab-sim-orphan").innerHTML = (data.total_sim_system !== undefined)? data.total_sim_system : 0;
    		document.getElementById("blind-audit-sim-tab-sim-missing").innerHTML = (data.total_sim_missing !== undefined)? data.total_sim_missing : 0;
    		
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-system").innerHTML = (data.total_serialized_acc_system !== undefined)? data.total_serialized_acc_system : 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-scanned").innerHTML = (data.total_serialized_acc_scanned !== undefined)? data.total_serialized_acc_scanned : 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-matched").innerHTML = (data.total_serialized_acc_matched !== undefined)? data.total_serialized_acc_matched : 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-orphan").innerHTML = (data.total_serialized_acc_orphan !== undefined)? data.total_serialized_acc_orphan : 0;
    		document.getElementById("blind-audit-serialized-acc-tab-serialized-acc-missing").innerHTML = (data.total_serialized_acc_missing !== undefined)? data.total_serialized_acc_missing : 0;

    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-system").innerHTML = (data.total_nonserialized_acc_system !== undefined)? data.total_nonserialized_acc_system : 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-scanned").innerHTML = (data.total_nonserialized_acc_scanned !== undefined)? data.total_nonserialized_acc_scanned : 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-matched").innerHTML = (data.total_nonserialized_acc_matched !== undefined)? data.total_nonserialized_acc_matched : 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-orphan").innerHTML = (data.total_nonserialized_acc_orphan !== undefined)? data.total_nonserialized_acc_orphan : 0;
    		document.getElementById("blind-audit-nonserialized-acc-tab-nonserialized-acc-missing").innerHTML = (data.total_nonserialized_acc_missing !== undefined)? data.total_nonserialized_acc_missing : 0;
    		
    		document.getElementById("blind-audit-detail-tab-audit-memo").innerHTML = (data.memo !== undefined)? data.memo : "&nbsp;";
    		

    		document.getElementById("blind-audit-detail-window-store-id").innerHTML = (data.store_id !== undefined)? data.store_id.toUpperCase() : '&nbsp;';
    		document.getElementById("blind-audit-detail-window-audit-user-name").innerHTML = (data.audit_user_name !== undefined)? data.audit_user_name : '&nbsp;';
    		document.getElementById("blind-audit-detail-window-audit-id").innerHTML = (data.audit_id !== undefined)? data.audit_id : '&nbsp;';
    		document.getElementById("blind-audit-detail-window-audit-start-date").innerHTML = (data.audit_start_date !== undefined)? data.audit_start_date : '&nbsp;';
    		document.getElementById("blind-audit-detail-window-audit-end-date").innerHTML = (data.audit_end_date !== undefined)? data.audit_end_date : '&nbsp;';
    		
    		document.getElementById("blind-audit-detail-window-phone-system").innerHTML = (data.total_phone_system !== undefined)? data.total_phone_system : 0;
    		document.getElementById("blind-audit-detail-window-phone-scanned").innerHTML = (data.total_phone_scanned !== undefined)? data.total_phone_scanned : 0;
    		document.getElementById("blind-audit-detail-window-phone-matched").innerHTML = (data.total_phone_matched !== undefined)? data.total_phone_matched : 0;
    		document.getElementById("blind-audit-detail-window-phone-orphan").innerHTML = (data.total_phone_orphan !== undefined)? data.total_phone_orphan : 0;
    		document.getElementById("blind-audit-detail-window-phone-missing").innerHTML = (data.total_phone_missing !== undefined)? data.total_phone_missing : 0;
    		
    		document.getElementById("blind-audit-detail-window-sim-system").innerHTML = (data.total_sim_system !== undefined)? data.total_sim_system : 0;
    		document.getElementById("blind-audit-detail-window-sim-scanned").innerHTML = (data.total_sim_scanned !== undefined)? data.total_sim_scanned : 0;
    		document.getElementById("blind-audit-detail-window-sim-matched").innerHTML = (data.total_sim_matched !== undefined)? data.total_sim_matched : 0;
    		document.getElementById("blind-audit-detail-window-sim-orphan").innerHTML = (data.total_sim_system !== undefined)? data.total_sim_system : 0;
    		document.getElementById("blind-audit-detail-window-sim-missing").innerHTML = (data.total_sim_missing !== undefined)? data.total_sim_missing : 0;
    		
    		document.getElementById("blind-audit-detail-window-serialized-acc-system").innerHTML = (data.total_serialized_acc_system !== undefined)? data.total_serialized_acc_system : 0;
    		document.getElementById("blind-audit-detail-window-serialized-acc-scanned").innerHTML = (data.total_serialized_acc_scanned !== undefined)? data.total_serialized_acc_scanned : 0;
    		document.getElementById("blind-audit-detail-window-serialized-acc-matched").innerHTML = (data.total_serialized_acc_matched !== undefined)? data.total_serialized_acc_matched : 0;
    		document.getElementById("blind-audit-detail-window-serialized-acc-orphan").innerHTML = (data.total_serialized_acc_orphan !== undefined)? data.total_serialized_acc_orphan : 0;
    		document.getElementById("blind-audit-detail-window-serialized-acc-missing").innerHTML = (data.total_serialized_acc_missing !== undefined)? data.total_serialized_acc_missing : 0;

    		document.getElementById("blind-audit-detail-window-nonserialized-acc-system").innerHTML = (data.total_nonserialized_acc_system !== undefined)? data.total_nonserialized_acc_system : 0;
    		document.getElementById("blind-audit-detail-window-nonserialized-acc-scanned").innerHTML = (data.total_nonserialized_acc_scanned !== undefined)? data.total_nonserialized_acc_scanned : 0;
    		document.getElementById("blind-audit-detail-window-nonserialized-acc-matched").innerHTML = (data.total_nonserialized_acc_matched !== undefined)? data.total_nonserialized_acc_matched : 0;
    		document.getElementById("blind-audit-detail-window-nonserialized-acc-orphan").innerHTML = (data.total_nonserialized_acc_orphan !== undefined)? data.total_nonserialized_acc_orphan : 0;
    		document.getElementById("blind-audit-detail-window-nonserialized-acc-missing").innerHTML = (data.total_nonserialized_acc_missing !== undefined)? data.total_nonserialized_acc_missing : 0;
    		
    		document.getElementById("blind-audit-detail-window-audit-memo").innerHTML = (data.memo !== undefined)? data.memo : "&nbsp;";
    		
    		audit_items = data.items;
    		if (audit_items.length > 0) {
    			items = {
    				phone: {},
    				sim: {},
    				serialized_acc: {},
    				nonserialized_acc: {}
    			};
    			orphan = {
    				phone: [],
    				sim: [],
    				serialized_acc: [],
    				nonserialized_acc: []
    			};
    			missing = {
    				phone: [],
    				sim: [],
    				serialized_acc: [],
    				nonserialized_acc: []
    			};
    			
    			for (i = 0, len = audit_items.length; i < len; i++) {
    				obj = audit_items[i];
    				if (obj.inventory_sid === undefined || obj.inventory_sid < 1) {
    					if (obj.scanned_qty > 0) {
    						switch (obj.item_type) {
    						case 0:
    							orphan.phone.push(obj);
    							break;
    						case 1:
    							orphan.sim.push(obj);
    							break;
    						case 2:
    							orphan.serialized_acc.push(obj);
    							break;
    						case 3:
    							orphan.nonserialized_acc.push(obj);
    							break;
    						}
    					}
    				} else {
    					obj.diff_qty = obj.system_qty - obj.scanned_qty;
    					
    					switch (obj.item_type) {
						case 0:
							if (items.phone[obj.item_code] !== undefined) {
								items.phone[obj.item_code].system_qty = items.phone[obj.item_code].system_qty + obj.system_qty;
								items.phone[obj.item_code].scanned_qty = items.phone[obj.item_code].scanned_qty + obj.scanned_qty;
								items.phone[obj.item_code].diff_qty = items.phone[obj.item_code].diff_qty + obj.diff_qty;
							} else {
								items.phone[obj.item_code] = obj;
							}
							break;
						case 1:
							if (items.sim[obj.item_code] !== undefined) {
								items.sim[obj.item_code].system_qty = items.sim[obj.item_code].system_qty + obj.system_qty;
								items.sim[obj.item_code].scanned_qty = items.sim[obj.item_code].scanned_qty + obj.scanned_qty;
								items.sim[obj.item_code].diff_qty = items.sim[obj.item_code].diff_qty + obj.diff_qty;
							} else {
								items.sim[obj.item_code] = obj;
							}
							break;
						case 2:
							if (items.serialized_acc[obj.item_code] !== undefined) {
								items.serialized_acc[obj.item_code].system_qty = items.serialized_acc[obj.item_code].system_qty + obj.system_qty;
								items.serialized_acc[obj.item_code].scanned_qty = items.serialized_acc[obj.item_code].scanned_qty + obj.scanned_qty;
								items.serialized_acc[obj.item_code].diff_qty = items.serialized_acc[obj.item_code].diff_qty + obj.diff_qty;
							} else {
								items.serialized_acc[obj.item_code] = obj;
							}
							break;
						case 3:
							if (items.nonserialized_acc[obj.item_code] !== undefined) {
								items.nonserialized_acc[obj.item_code].system_qty = items.nonserialized_acc[obj.item_code].system_qty + obj.system_qty;
								items.nonserialized_acc[obj.item_code].scanned_qty = items.nonserialized_acc[obj.item_code].scanned_qty + obj.scanned_qty;
								items.nonserialized_acc[obj.item_code].diff_qty = items.nonserialized_acc[obj.item_code].diff_qty + obj.diff_qty;
							} else {
								items.nonserialized_acc[obj.item_code] = obj;
							}
							break;
						}
    					if (obj.diff_qty != 0) {
    						switch (obj.item_type) {
    						case 0:
    							missing.phone.push(obj);
    							break;
    						case 1:
    							missing.sim.push(obj);
    							break;
    						case 2:
    							missing.serialized_acc.push(obj);
    							break;
    						case 3:
    							missing.nonserialized_acc.push(obj);
    							break;
    						}
    					}
    				}
    			}
    			
    			headers = [
    				{title: "CT.", column: "ct", width: 50},
    				{title: "ITEM CODE", column: "item_code", width: 150},
    				{title: "DESCRIPTION", column: "description"},
    				{title: "SKU", column: "sku", width: 150},
    				{title: "SYS. QTY", column: "system_qty", width: 80},
    				{title: "SCAN. QTY", column: "scanned_qty", width: 80},
    				{title: "DIFF. QTY", column: "diff_qty", width: 80}
    			];
    			
    			//if (items.phone.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-phone-tab-items-list", headers, items.phone);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-phone-items-list", headers, items.phone);
    			//}
    			//if (items.sim.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-sim-tab-items-list", headers, items.sim);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-sim-items-list", headers, items.sim);
    			//}
    			//if (items.serialized_acc.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-serialized-acc-tab-items-list", headers, items.serialized_acc);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-serialized-acc-items-list", headers, items.serialized_acc);
    			//}
    			//if (items.nonserialized_acc.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-nonserialized-acc-tab-items-list", headers, items.nonserialized_acc);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-nonserialized-acc-items-list", headers, items.nonserialized_acc);
    			//}
    			
    			headers = [
    				{title: "CT.", column: "ct", width: 50},
    				{title: "DESCRIPTION", column: "description"},
    				{title: "SKU", column: "sku", width: 150},
    				{title: "SERIAL NUMBER", column: "serial_no", width: 150}
    			];

    			if (orphan.phone.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-phone-tab-orphan-items-list", headers, orphan.phone);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-phone-orphan-items-list", headers, orphan.phone);
    			}
    			if (orphan.sim.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-sim-tab-orphan-items-list", headers, orphan.sim);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-sim-orphan-items-list", headers, orphan.sim);
    			}
    			if (orphan.serialized_acc.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-serialized-acc-tab-orphan-items-list", headers, orphan.serialized_acc);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-serialized-acc-orphan-items-list", headers, orphan.serialized_acc);
    			}

    			if (missing.phone.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-phone-tab-missing-items-list", headers, missing.phone);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-phone-missing-items-list", headers, missing.phone);
    			}
    			if (missing.sim.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-sim-tab-missing-items-list", headers, missing.sim);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-sim-missing-items-list", headers, missing.sim);
    			}
    			if (missing.serialized_acc.length > 0) {
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-serialized-acc-tab-missing-items-list", headers, missing.serialized_acc);
        			WRPAdminApp.pagescript.printBlindAuditItemsTable("blind-audit-detail-window-serialized-acc-missing-items-list", headers, missing.serialized_acc);
    			}
    			/*
    			//$("#blind-audit-phone-tab-items-list, #blind-audit-detail-window-phone-items-list").jqxGrid("addrow", null, items.phone, "last");
    			$("#blind-audit-phone-tab-orphan-items-list, #blind-audit-detail-window-phone-orphan-items-list").jqxGrid("addrow", null, orphan.phone, "last");
    			$("#blind-audit-phone-tab-missing-items-list, #blind-audit-detail-window-phone-missing-items-list").jqxGrid("addrow", null, missing.phone, "last");
    			
    			$("#blind-audit-sim-tab-items-list, #blind-audit-detail-window-sim-items-list").jqxGrid("addrow", null, items.sim, "last");
    			$("#blind-audit-sim-tab-orphan-items-list, #blind-audit-detail-window-sim-orphan-items-list").jqxGrid("addrow", null, orphan.sim, "last");
    			$("#blind-audit-sim-tab-missing-items-list, #blind-audit-detail-window-sim-missing-items-list").jqxGrid("addrow", null, missing.sim, "last");
    			
    			$("#blind-audit-serialized-acc-tab-items-list, #blind-audit-detail-window-serialized-acc-items-list").jqxGrid("addrow", null, items.serialized_acc, "last");
    			$("#blind-audit-serialized-acc-tab-orphan-items-list, #blind-audit-detail-window-serialized-acc-orphan-items-list").jqxGrid("addrow", null, orphan.serialized_acc, "last");
    			$("#blind-audit-serialized-acc-tab-missing-items-list, #blind-audit-detail-window-serialized-acc-missing-items-list").jqxGrid("addrow", null, missing.serialized_acc, "last");
    			
    			$("#blind-audit-nonserialized-acc-tab-items-list, #blind-audit-detail-window-nonserialized-acc-items-list").jqxGrid("addrow", null, items.nonserialized_acc, "last");
    			*/
    			
    		}
    		
    		$("#blind-audit-info-tab-panel").val(0);
    	} catch (e) {
    		console.warn(e);
    	}
    },
    // element_id : string
    // headers : array [{title: string, column: string}, {title: string, column: string}, ....]
    // data: json object
    printBlindAuditItemsTable: function(element_id, headers, data) {
    	var i, len, i2, len2, header, obj, innerHTML, element, count;
    	
    	element = document.getElementById(element_id);
    	
    	if (!element) {
    		return;
    	}
    	
    	innerHTML = [];

		innerHTML.push('<table class="blind-audit-items-table">');

    	innerHTML.push('<thead><tr>');
    	
    	for (i = 0, len = headers.length; i < len; i++) {
    		header = headers[i];
    		if (header === undefined || header.column === undefined) {
    			continue;
    		}
    		if (header.width !== undefined) {
    			if (typeof(header.width) === "string" && header.width.indexOf("px") > -1) {
    				header.width = header.width.replace("px","");
    			}
        		innerHTML.push('<th style="'); 
        		innerHTML.push('width:');
        		innerHTML.push(header.width);
        		innerHTML.push('px;');
        		innerHTML.push('">');
    		} else {

        		innerHTML.push('<th>');
    		}
    		innerHTML.push((header.title !== undefined)? header.title : '');
    		innerHTML.push('</th>');
    	}
    	innerHTML.push('</tr></thead>');
    	
    	innerHTML.push('<tbody>');
    	count = 0;
    	for (i in data) {
    		obj = data[i];
    		innerHTML.push('<tr>');
    		for (i2 = 0, len2 = headers.length; i2 < len2; i2++) {
    			header = headers[i2];
    			if (header !== undefined && header.column !== undefined) {
    				innerHTML.push('<td>');
    				if (header.column === "ct"){
    					innerHTML.push(++count);
    				} else {
        				innerHTML.push((obj[header.column] !== undefined)? obj[header.column] : '');    					
    				}
    				innerHTML.push('</td>');
    			}
    		}
    		innerHTML.push('</tr>');
    	}

    	innerHTML.push('</tbody>');
    	innerHTML.push('</table>');
    	
    	element.innerHTML = innerHTML.join("");
    	
    	innerHTML = undefined;
    },
    openBlindAuditDetailWindow: function(type) {
    	var elem;
    	if (type === undefined) {
    		$(".blind-audit-detail-view-border").css("display", "block");
    		elem = document.querySelector("#blind-audit-detail-window-phone-items-list table.blind-audit-items-table > tbody");
    		if (elem && elem.innerHTML.trim().length > 0) {
        		document.getElementById("blind-audit-detail-view-phone-type-info").style.display = "block"; 
        		document.getElementById("blind-audit-detail-view-border-after-phone").style.display = "block"; 
    		} else {
        		document.getElementById("blind-audit-detail-view-phone-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-border-after-phone").style.display = "none"; 
    		}
    		elem = document.querySelector("#blind-audit-detail-window-sims-items-list table.blind-audit-items-table > tbody");
    		if (elem && elem.innerHTML.trim().length > 0) {
        		document.getElementById("blind-audit-detail-view-sim-type-info").style.display = "block"; 
        		document.getElementById("blind-audit-detail-view-border-after-sim").style.display = "block"; 
    		} else {
        		document.getElementById("blind-audit-detail-view-sim-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-border-after-sim").style.display = "none"; 
    		}
    		elem = document.querySelector("#blind-audit-detail-window-serialized-acc-items-list table.blind-audit-items-table > tbody");
    		if (elem && elem.innerHTML.trim().length > 0) {
        		document.getElementById("blind-audit-detail-view-serialized-acc-type-info").style.display = "block"; 
        		document.getElementById("blind-audit-detail-view-border-after-serialized-acc").style.display = "block"; 
    		} else {
        		document.getElementById("blind-audit-detail-view-serialized-acc-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-border-after-serialized-acc").style.display = "none"; 
    		}
    		elem = document.querySelector("#blind-audit-detail-window-nonserialized-acc-items-list table.blind-audit-items-table > tbody");
    		if (elem && elem.innerHTML.trim().length > 0) {
        		document.getElementById("blind-audit-detail-view-nonserialized-acc-type-info").style.display = "block"; 
        		document.getElementById("blind-audit-detail-view-border-after-nonserialized-acc").style.display = "block"; 
    		} else {
        		document.getElementById("blind-audit-detail-view-nonserialized-acc-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-border-after-nonserialized-acc").style.display = "none"; 
    		}
    		document.getElementById("blind-audit-detail-window-audit-memo").style.display = "block";
    		
            $('#blind-audit-detail-view-window').jqxWindow({ height: 600, position: {y : (window.innerHeight * 0.5) - 300 } }).jqxWindow('open');
    		
    	} else {
    		$(".blind-audit-detail-view-border").css("display", "none");    
    		switch (type) {
    		case 0:
        		elem = document.querySelector("#blind-audit-detail-window-phone-items-list table.blind-audit-items-table > tbody");
        		if (elem && elem.innerHTML.trim().length > 0) {
            		document.getElementById("blind-audit-detail-view-phone-type-info").style.display = "block"; 
        		} else {
            		WRPCommon.MsgBoxModule.alert({
            			message: "There are no items"
            		});
            		return;
        		}
        		document.getElementById("blind-audit-detail-view-sim-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-serialized-acc-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-nonserialized-acc-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-window-audit-memo").style.display = "none";
            	$('#blind-audit-detail-view-window').jqxWindow({ height: 550, position: {y : window.innerHeight * 0.5 - 275 } }).jqxWindow('open');
    			break;
    		case 1:
        		document.getElementById("blind-audit-detail-view-phone-type-info").style.display = "none"; 
        		elem = document.querySelector("#blind-audit-detail-window-sim-items-list table.blind-audit-items-table > tbody");
        		if (elem && elem.innerHTML.trim().length > 0) {
            		document.getElementById("blind-audit-detail-view-sim-type-info").style.display = "block"; 
        		} else {
            		WRPCommon.MsgBoxModule.alert({
            			message: "There are no items"
            		});
            		return;
        		}
        		document.getElementById("blind-audit-detail-view-serialized-acc-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-nonserialized-acc-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-window-audit-memo").style.display = "none";
            	$('#blind-audit-detail-view-window').jqxWindow({ height: 550, position: {y : window.innerHeight * 0.5 - 275 } }).jqxWindow('open');
    			break;
    		case 2:
        		document.getElementById("blind-audit-detail-view-phone-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-sim-type-info").style.display = "none"; 
        		elem = document.querySelector("#blind-audit-detail-window-serialized-acc-items-list table.blind-audit-items-table > tbody");
        		if (elem && elem.innerHTML.trim().length > 0) {
            		document.getElementById("blind-audit-detail-view-serialized-acc-type-info").style.display = "block"; 
        		} else {
            		WRPCommon.MsgBoxModule.alert({
            			message: "There are no items"
            		});
            		return;
        		}
        		document.getElementById("blind-audit-detail-view-nonserialized-acc-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-window-audit-memo").style.display = "none";
            	$('#blind-audit-detail-view-window').jqxWindow({ height: 550, position: {y : window.innerHeight * 0.5 - 275 } }).jqxWindow('open');
    			break;
    		case 3:
        		document.getElementById("blind-audit-detail-view-phone-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-sim-type-info").style.display = "none"; 
        		document.getElementById("blind-audit-detail-view-serialized-acc-type-info").style.display = "none"; 
        		elem = document.querySelector("#blind-audit-detail-window-nonserialized-acc-items-list table.blind-audit-items-table > tbody");
        		if (elem && elem.innerHTML.trim().length > 0) {
            		document.getElementById("blind-audit-detail-view-nonserialized-acc-type-info").style.display = "block"; 
        		} else {
            		WRPCommon.MsgBoxModule.alert({
            			message: "There are no items"
            		});
            		return;
        		}
        		document.getElementById("blind-audit-detail-window-audit-memo").style.display = "none";
            	$('#blind-audit-detail-view-window').jqxWindow({ height: 320, position: {y : window.innerHeight * 0.5 - 120 } }).jqxWindow('open');
    			break;
    		}
    	}
    	
    },
    printBlindAuditDetailWindow: function() {
    	var innerHTML, i, len, elem, iframe, popup_window;
    	/*
    	iframe = document.getElementById("blind-audit-print-detail-window-content");
    	if (!iframe) {
    		return;
    	}
    	
    	innerHTML = [];
    	
    	for (i = 0, len = document.head.children.length; i < len; i++) {
    		elem = document.head.children[i];
    		if (elem.nodeName === "LINK") {
    			if (elem.outerHTML.indexOf('href="main.') > -1) {
        			innerHTML.push(elem.outerHTML.replace('href="main.', 'href="'+location.origin+location.pathname.replace("main.jsp","/") +'main.'));
    			}
    		}
    	}
    	
    	iframe.contentWindow.document.head.innerHTML = iframe.contentWindow.document.head.innerHTML + innerHTML.join("") + '<style>*[class^="grid-"]{ height:auto !important; } #blind-audit-detail-btn-area{ display:none; }</style>';
    	innerHTML = undefined;
    	iframe.contentWindow.document.body.innerHTML = document.getElementById("blind-audit-detail-view-window-content").innerHTML;
    	    	
    	setTimeout(function() {
    		iframe.contentWindow.print();
    	}, 1000);
    	*/
    	
    	popup_window = window.open("","Print","width=900,height=600");
    	console.log(popup_window);
    	
    	innerHTML = [];
    	
    	for (i = 0, len = document.head.children.length; i < len; i++) {
    		elem = document.head.children[i];
    		if (elem.nodeName === "LINK") {
    			if (elem.outerHTML.indexOf('href="main.') > -1) {
        			innerHTML.push(elem.outerHTML.replace('href="main.', 'href="'+location.origin+location.pathname.replace("main.jsp","/") +'main.'));
    			}
    		}
    	}
    	
    	popup_window.document.head.innerHTML = popup_window.document.head.innerHTML + innerHTML.join("") + '<style>*[class^="grid-"]{ height:auto !important; } #blind-audit-detail-btn-area{ display:none; } table.blind-audit-items-table thead tr th{ font-size:7px; } table.blind-audit-items-table tbody tr td { font-size:7px; } table.blind-audit-items-table tbody tr { height:15px; }</style>';
    	innerHTML = undefined;
    	popup_window.document.body.innerHTML = document.getElementById("blind-audit-detail-view-window-content").innerHTML;
    	    	
    	setTimeout(function() {
    		popup_window.print();
    	}, 1000);
    },
    getMissingPhoneList: function(){
    	var store_id, log_flag, keyword;

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

    	try {
        	keyword = document.getElementById("missing-bin-phone-search").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        if($("#missing-bin-phone-log").val() == true){
        	log_flag = 1;
        }

        try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	}
    	$.ajax({
            url: "ajax/inventory_audit/getMissingBinList.jsp",
            data: {
            	store_id: store_id,
            	item_type: 0,
            	log_flag: log_flag,
            	keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem,i, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#missing-bin-item-phone-list");
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
    getMissingSimList: function(){
    	var store_id, log_flag, keyword;

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

    	try {
        	keyword = document.getElementById("missing-bin-sim-search").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        if($("#missing-bin-sim-log").val() == true){
        	log_flag = 1;
        }
        
        try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	}
    	$.ajax({
            url: "ajax/inventory_audit/getMissingBinList.jsp",
            data: {
            	store_id: store_id,
            	item_type: 1,
            	log_flag: log_flag,
            	keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem,i, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#missing-bin-item-sim-list");
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
    getMissingAccList: function(){
    	var store_id, log_flag, keyword;

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

    	try {
        	keyword = document.getElementById("missing-bin-ser-acc-search").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        if($("#missing-bin-ser-acc-log").val() == true){
        	log_flag = 1;
        }
        
        try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	}
    	$.ajax({
            url: "ajax/inventory_audit/getMissingBinList.jsp",
            data: {
            	store_id: store_id,
            	item_type: 2,
            	log_flag: log_flag,
            	keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem,i, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#missing-bin-item-ser-acc-list");
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
    getMissingNonAccList: function(){
    	var store_id, log_flag, keyword;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
    		if (store_id.length == 0) return;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}

    	try {
        	keyword = document.getElementById("missing-bin-non-acc-search").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        if($("#missing-bin-non-acc-log").val() == true){
        	log_flag = 1;
        }
        
        try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	}
    	$.ajax({
    		url: "ajax/inventory_audit/getMissingBinList.jsp",
    		data: {
    			store_id: store_id,
    			item_type: 3,
    			log_flag: log_flag,
    			keyword: keyword
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, elem,i, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#missing-bin-item-non-acc-list");
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
    getSerialMissingBinDetail: function(serial_no){
    	var store_id;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
    		if (store_id.length == 0) return;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}

    	$.ajax({
    		url: "ajax/inventory_audit/getMissingBinInfo.jsp",
    		data: {
    			store_id: store_id,
    			serial_no: serial_no
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, elem,i, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			for(i=0; i < data.length; i++){
    				obj = data[i];
    				if(obj.type == "Transfer"){
    					obj.adjust_id = obj.trans_id;
    				}
    			}
    			
    			$('#missing-bin-detail-window').jqxWindow('open');
    			
    			elem = $("#missing-bin-detail-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    		}
    	});
    },
    getNonSerialMissingBinDetail: function(item_sid){
    	var store_id;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
    		if (store_id.length == 0) return;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}

    	$.ajax({
    		url: "ajax/inventory_audit/getMissingBinInfo.jsp",
    		data: {
    			store_id: store_id,
    			item_sid: item_sid
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, elem,i, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			for(i=0; i < data.length; i++){
    				obj = data[i];
    				if(obj.type == "Transfer"){
    					obj.adjust_id = obj.trans_id;
    				}
    			}
    			
    			$('#missing-bin-detail-window').jqxWindow('open');
    			
    			elem = $("#missing-bin-detail-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    		}
    	});
    },
    runBlindAudit: function(){
    	$('#blind-audit-phone-check').val(false);
    	$('#blind-audit-sim-check').val(false);
    	$('#blind-audit-accessory-check').val(false);
    	$('#blind-audit-serialized-accessory-check').val(false);
    	WRPAdminApp.pagescript._currStep = 1;
    	
    	$("#enter-phone-serial-no-list").jqxGrid("clear");
		WRPAdminApp.pagescript._phoneSerialNoList = [];
		document.getElementById("enter-phone-serial-no").value = "";
    	document.getElementById("enter-phone-qty").innerHTML = 0;
    	document.getElementById("audit-total-phone-qty").innerHTML = 0;
		document.getElementById("phone-next-btn").style.display = "inline-block";
		document.getElementById("phone-update-btn").style.display = "none";
    	
    	$("#enter-sim-serial-no-list").jqxGrid("clear");
		WRPAdminApp.pagescript._simSerialNoList = [];
		document.getElementById("enter-sim-serial-no").value = "";
    	document.getElementById("enter-sim-qty").innerHTML = 0;
    	document.getElementById("audit-total-sim-qty").innerHTML = 0;
		document.getElementById("sim-next-btn").style.display = "inline-block";
		document.getElementById("sim-update-btn").style.display = "none";
    	
    	$("#enter-accessory-serial-no-list").jqxGrid("clear");
		WRPAdminApp.pagescript._accSerialNoList = [];
		document.getElementById("enter-accessory-keyword").value = "";
    	document.getElementById("enter-serialized-acc-qty").innerHTML = 0;
    	document.getElementById("audit-total-acc-qty").innerHTML = 0;
		document.getElementById("serialized-acc-next-btn").style.display = "inline-block";
		document.getElementById("serialized-acc-update-btn").style.display = "none";
    	
    	$("#enter-accessory-item-list").jqxGrid("clear");
		WRPAdminApp.pagescript._nonSerialAccList = [];
		document.getElementById("enter-accessory-serial-no").value = "";
    	document.getElementById("enter-acc-qty").innerHTML = 0;
    	document.getElementById("audit-total-non-acc-qty").innerHTML = 0;
		document.getElementById("acc-next-btn").style.display = "inline-block";
		document.getElementById("acc-update-btn").style.display = "none";
    	
		document.getElementById("blind-audit-memo").value = "";
		document.getElementById("blind-audit-acc-qty").value = "";
		
		$('#run-blind-audit-window-1').jqxWindow('open');
    },
    setStepBySelectType: function(){
    	var phone, sim, acc, serialAcc, step;
    	phone = $('#blind-audit-phone-check').val();
    	sim = $('#blind-audit-sim-check').val();
    	acc = $('#blind-audit-accessory-check').val();
    	serialAcc = $('#blind-audit-serialized-accessory-check').val();
    	
    	step = 2;
    	
    	if(!phone && !sim && !acc & !serialAcc){
    		WRPCommon.MsgBoxModule.alert({
    			width: 600,
    			message: "Select Item Type"
    		});
    		return;
    	}
    	
    	WRPAdminApp.pagescript._selectedItemType = [];
    	
    	if(phone == true){
    		document.getElementById("run-blind-audit-phone-window").setAttribute("step", step);
    		step = step + 1;
    		WRPAdminApp.pagescript._selectedItemType.push('0');
    	}
    	
    	if(sim == true){
    		document.getElementById("run-blind-audit-sim-window").setAttribute("step", step);
    		step = step + 1;
    		WRPAdminApp.pagescript._selectedItemType.push('1');
    	}

    	if(acc == true){
    		document.getElementById("run-blind-audit-non-acc-window").setAttribute("step", step);
    		step = step + 1;
    		WRPAdminApp.pagescript._selectedItemType.push('3');
    	}

    	if(serialAcc == true){
    		document.getElementById("run-blind-audit-ser-acc-window").setAttribute("step", step);
    		step = step + 1;
    		WRPAdminApp.pagescript._selectedItemType.push('2');
    	}
    	
    	document.getElementById("run-blind-audit-total-window").setAttribute("step", step);
		WRPAdminApp.pagescript.setInventoryLock(1);
    },
    nextStepActivate: function(){
    	var elem, currStep, plainView, id;
    	
    	currStep = WRPAdminApp.pagescript._currStep;
    	currStep = currStep + 1;
    	WRPAdminApp.pagescript._currStep = currStep;
    	
    	plainView = document.querySelectorAll(".jqx-custom-window");

    	for (i = 0, len = plainView.length; i < len; i++) {
			try {
				elem = plainView[i];
				
				if (parseInt(elem.getAttribute("step")) === currStep) {
					id = elem.id;
					$('#'+elem.id).jqxWindow('open');
				} else {
					$('#'+elem.id).jqxWindow('close');
				}
				
			} catch (e) {
				
			}
		}
    },
	newAuditID: function() {
		var date, audit_id, tmp;
		date = WRPCommon.TimeModule.getTime();
		
		audit_id = [];
		
		audit_id.push("BLIND_AUDIT_");
		
		try {
    		store_id = document.getElementById("select-store").value;
    		if (store_id.length > 0) {
    			audit_id.push(store_id.toUpperCase());
    			audit_id.push("_");
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}

		tmp = (date.getMonth() + 1);
    	if (tmp < 10) {
    		audit_id.push("0");
    	}
    	audit_id.push(tmp);

    	tmp = date.getDate();
    	if (tmp < 10) {
    		audit_id.push("0");
    	}
    	audit_id.push(tmp);
    	
    	tmp = date.getFullYear();
    	audit_id.push(tmp);
    	audit_id.push("_");

    	tmp = Math.floor(Math.random() * 10000) + 1000;

    	if(tmp > 10000){
    		tmp = tmp-1000;
    	}

    	audit_id.push(tmp);
    	
    	document.getElementById("blind-audit-id").value = audit_id.join("");
    	document.getElementById("blind-audit-confirm-start-time").innerHTML = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(date.getDate(), "00")+"-"+date.getFullYear() + " " + WRPAdminApp.toDecimalFormat(date.getHours(), "00") + ":"+ WRPAdminApp.toDecimalFormat(date.getMinutes(), "00") + ":"+ WRPAdminApp.toDecimalFormat(date.getSeconds(), "00");
	},
    cancelAudit: function(){
    	WRPCommon.MsgBoxModule.confirm({
			width: 700,
			title: "WARNNING",
			message : "Are you sure to cancel the entire audit process?",
			yesBtnClick: function(){
				WRPAdminApp.pagescript.setInventoryLock(0);
				$('#run-blind-audit-phone-window').jqxWindow('close');
				$('#run-blind-audit-sim-window').jqxWindow('close');
				$('#run-blind-audit-non-acc-window').jqxWindow('close');
				$('#run-blind-audit-ser-acc-window').jqxWindow('close');
				$('#run-blind-audit-total-window').jqxWindow('close');
			}
		});
    },
	resetAudit: function(item_type){
		WRPCommon.MsgBoxModule.confirm({
			title: "WARNNING",
			message : "By pressing RESET button will result removing all serial numbers you scanned.\nWould you like to proceed?",
			yesBtnClick: function(){
				switch(item_type){
				case 0:
					$("#enter-phone-serial-no-list").jqxGrid("clear");
					WRPAdminApp.pagescript._phoneSerialNoList = [];
	            	document.getElementById("enter-phone-qty").innerHTML = 0;
	            	document.getElementById("audit-total-phone-qty").innerHTML = 0;
					break;
				case 1:
					$("#enter-sim-serial-no-list").jqxGrid("clear");
					WRPAdminApp.pagescript._simSerialNoList = [];
	            	document.getElementById("enter-sim-qty").innerHTML = 0;
	            	document.getElementById("audit-total-sim-qty").innerHTML = 0;
					break;
				case 2:
					$("#enter-accessory-serial-no-list").jqxGrid("clear");
					WRPAdminApp.pagescript._accSerialNoList = [];
	            	document.getElementById("enter-serialized-acc-qty").innerHTML = 0;
	            	document.getElementById("audit-total-acc-qty").innerHTML = 0;
					break;
				case 3:
					$("#enter-accessory-item-list").jqxGrid("clear");
					WRPAdminApp.pagescript._nonSerialAccList = [];
	            	document.getElementById("enter-acc-qty").innerHTML = 0;
	            	document.getElementById("audit-total-non-acc-qty").innerHTML = 0;
					break;
				}
			}
		});
	},
    AddPhoneSerialNo: function(){
    	var elem, store_id, serialNo_list, i, store_id;
    	
    	serialNo_list = WRPAdminApp.pagescript._phoneSerialNoList;
    	elem = document.getElementById("enter-phone-serial-no");
    	
    	if (!elem || elem.value.length == 0) {
    		return;
    	}

    	if(serialNo_list.length > 0){
    		for(i=0; i < serialNo_list.length; i++){
    	    	if(serialNo_list[i].serial_no == elem.value){
    	    		document.getElementById("duplicate-check-phone").style.display="block";
            		elem.value = "";
        	    	return;
    	    	}else{
    	    		document.getElementById("duplicate-check-phone").style.display="none";
    	    	}
    		}
    	}

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	$.ajax({
    		url: "ajax/inventory_audit/getSerializedItem.jsp",
            data: {
            	store_id: store_id ,
            	serial_no: elem.value.trim(),
            	item_type: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data;
            	data = result.data;
            	
            	if(!data || data.length < 1){
                	serialNo_list.push({
            			serial_no: elem.value.trim(),
            		});
            	}else{
                	serialNo_list.push({
            			serial_no: elem.value.trim(),
            			inventory_sid: data.sid,
            			item_sid: data.item_sid,
            			system_qty: data.qty
            		});
            	}
            	elem.value = "";
            	
            	elem = $("#enter-phone-serial-no-list");
            	if (elem) {
            		elem.jqxGrid("clear");
           			elem.jqxGrid("addRow", null, serialNo_list, "last");
            	}
            	
            	document.getElementById("enter-phone-qty").innerHTML = serialNo_list.length;
            	document.getElementById("audit-total-phone-qty").innerHTML = serialNo_list.length;
            }
    	});
    },
    AddSimSerialNo: function(){
    	var elem, store_id, serialNo_list, i, store_id;
    	
    	serialNo_list = WRPAdminApp.pagescript._simSerialNoList;
    	elem = document.getElementById("enter-sim-serial-no");
    	
    	if (!elem || elem.value.length == 0) {
    		return;
    	}

    	if(serialNo_list.length > 0){
    		for(i=0; i < serialNo_list.length; i++){
    	    	if(serialNo_list[i].serial_no == elem.value){
    	    		document.getElementById("duplicate-check-sim").style.display="block";
            		elem.value = "";
        	    	return;
    	    	}else{
    	    		document.getElementById("duplicate-check-sim").style.display="none";
    	    	}
    		}
    	}

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	$.ajax({
    		url: "ajax/inventory_audit/getSerializedItem.jsp",
            data: {
            	serial_no: elem.value.trim(),
            	item_type: 1,
            	store_id: store_id
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data;
            	data = result.data;
            	
            	if(!data || data.length < 1){
                	serialNo_list.push({
            			serial_no: elem.value.trim(),
            		});
            	}else{
                	serialNo_list.push({
            			serial_no: elem.value.trim(),
            			inventory_sid: data.sid,
            			item_sid: data.item_sid,
            			system_qty: data.qty
            		});
            	}
            	elem.value = "";
            	
            	elem = $("#enter-sim-serial-no-list");
            	if (elem) {
            		elem.jqxGrid("clear");
           			elem.jqxGrid("addRow", null, serialNo_list, "last");
            	}
            	
            	document.getElementById("enter-sim-qty").innerHTML = serialNo_list.length;
            	document.getElementById("audit-total-sim-qty").innerHTML = serialNo_list.length;
            }
    	});
    },
	enterNonSerialized: function(){
		var keyword,accessory_list, store_id;

		accessory_list = WRPAdminApp.pagescript._nonSerialAccList;
		keyword = document.getElementById("enter-accessory-keyword").value;
		
		if(keyword.length < 1){
			return;
		}
		
    	if(accessory_list.length > 0){
    		for(i=0; i < accessory_list.length; i++){
    	    	if(accessory_list[i].item_code == keyword.toUpperCase() || accessory_list[i].sku == keyword.toUpperCase() || accessory_list[i].upc == keyword.toUpperCase()){
    	    		document.getElementById("message-itemCode").innerHTML = accessory_list[i].item_code;
    	    		document.getElementById("message-sku").innerHTML = accessory_list[i].sku;
    	    		document.getElementById("message-description").innerHTML = accessory_list[i].description;
    	    		document.getElementById("message-qty").innerHTML = accessory_list[i].scanned_qty;
    	    		WRPAdminApp.pagescript._duplicatedIndex = i;
    	    		$('#popup-blind-audit-duplicate-accessory').jqxWindow('open');
            		keyword = "";
        	    	return;
    	    	}
    		}
    	}

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	
    	$.ajax({
    		url: "ajax/inventory_audit/getNonSerializedItem.jsp",
            data: {
            	store_id: store_id,
            	keyword: keyword,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem;
            	data = result.data;
            	
            	if(!data || data.length < 1){
            		document.getElementById("enter-accessory-keyword").value = "";
                	return;
            	}
            	
            	if(data.length < 2){
            		data = data[0];
            		WRPAdminApp.pagescript._duplicatedIndex = -1;
            		document.getElementById("blind-audit-acc-qty").value = "";
            		document.getElementById("audit-acc-itemsid").value = data.item_sid;
                	document.getElementById("audit-acc-itemCode").innerHTML = data.item_code;
                	document.getElementById("audit-acc-sku").innerHTML = data.sku;
                	document.getElementById("audit-acc-description").innerHTML = data.description;

                	$('#popup-blind-audit-enter-accessory').jqxWindow('open');
            	}else{
                	$('#popup-blind-audit-non-accessory-select').jqxWindow('open');
                	
            		elem = $("#non-serialized-acc-select-list");
            		if (elem) {
                		elem.jqxGrid("clear");
            			elem.jqxGrid("clearselection");
               			elem.jqxGrid("addRow", null, data, "last");
                	}

            	}
            }
    	});
	},
	nextSelectNonAcc: function(){
		var getselectedrowindexes, data;
		
		getselectedrowindexes = $('#non-serialized-acc-select-list').jqxGrid('getselectedrowindexes');
		
		if(getselectedrowindexes.length == 0){
			WRPCommon.MsgBoxModule.alert({
				width: 500,
				message: "Select Item"
			});
			return;
		}
        
		data = $('#non-serialized-acc-select-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
        
		WRPAdminApp.pagescript._duplicatedIndex = -1;
		document.getElementById("blind-audit-acc-qty").value = "";
		document.getElementById("audit-acc-itemsid").value = data.item_sid;
    	document.getElementById("audit-acc-itemCode").innerHTML = data.item_code;
    	document.getElementById("audit-acc-sku").innerHTML = data.sku;
    	document.getElementById("audit-acc-description").innerHTML = data.description;
    	
    	$('#popup-blind-audit-non-accessory-select').jqxWindow('close');
    	$('#popup-blind-audit-enter-accessory').jqxWindow('open');
	},
	addNonSerializedItems: function(){
		var accessory_list, elem, scanned_qty, i, total;
		total = 0;
		
		scanned_qty = document.getElementById("blind-audit-acc-qty").value;
		
		if(scanned_qty.length < 1){
			WRPCommon.MsgBoxModule.alert({
				width: 500,
				message: "Enter Qty"
			});
			return;
		}
		
		if (isNaN(scanned_qty)) {
			WRPCommon.MsgBoxModule.alert({
				width: 700,
				message: "Qty value contains non-numeric characters"
			});
            return;
        }
		
		accessory_list = WRPAdminApp.pagescript._nonSerialAccList;
		
		if(WRPAdminApp.pagescript._duplicatedIndex > -1 ){
			i = WRPAdminApp.pagescript._duplicatedIndex;
			accessory_list[i].scanned_qty = parseInt(scanned_qty);
		}else{
			accessory_list.push({
				item_sid: document.getElementById("audit-acc-itemsid").value,
				item_code: document.getElementById("audit-acc-itemCode").innerHTML,
				sku: document.getElementById("audit-acc-sku").innerHTML,
				description: document.getElementById("audit-acc-description").innerHTML,
				scanned_qty: parseInt(scanned_qty)
			});
		}
    	
    	elem = $("#enter-accessory-item-list");
    	if (elem) {
    		elem.jqxGrid("clear");
   			elem.jqxGrid("addRow", null, accessory_list, "last");
    	}
    	
		document.getElementById("enter-accessory-keyword").value = "";
		$('#popup-blind-audit-enter-accessory').jqxWindow('close');
    	
		for(i=0; i < accessory_list.length; i++){
			total = total + accessory_list[i].scanned_qty;
		}

		document.getElementById("enter-acc-qty").innerHTML = total;
		document.getElementById("audit-total-non-acc-qty").innerHTML = total;
	},
    AddAccSerialNo: function(){
    	var elem, store_id, serialNo_list, i, store_id;
    	
    	serialNo_list = WRPAdminApp.pagescript._accSerialNoList;
    	elem = document.getElementById("enter-accessory-serial-no");
    	
    	if (!elem || elem.value.length == 0) {
    		return;
    	}

    	if(serialNo_list.length > 0){
    		for(i=0; i < serialNo_list.length; i++){
    	    	if(serialNo_list[i].serial_no == elem.value){
    	    		document.getElementById("duplicate-check-acc").style.display="block";
            		elem.value = "";
        	    	return;
    	    	}else{
    	    		document.getElementById("duplicate-check-acc").style.display="none";
    	    	}
    		}
    	}
    	
    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
		
    	$.ajax({
    		url: "ajax/inventory_audit/getSerializedItem.jsp",
            data: {
            	serial_no: elem.value.trim(),
            	item_type: 2,
            	store_id: store_id
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data;
            	data = result.data;
            	
            	if(!data || data.length < 1){
                	serialNo_list.push({
            			serial_no: elem.value.trim(),
            		});
            	}else{
                	serialNo_list.push({
            			serial_no: elem.value.trim(),
            			inventory_sid: data.sid,
            			item_sid: data.item_sid,
            			system_qty: data.qty
            		});
            	}
            	
            	elem.value = "";
            	
            	elem = $("#enter-accessory-serial-no-list");
            	if (elem) {
            		elem.jqxGrid("clear");
           			elem.jqxGrid("addRow", null, serialNo_list, "last");
            	}
            	
            	document.getElementById("enter-serialized-acc-qty").innerHTML = serialNo_list.length;
            	document.getElementById("audit-total-acc-qty").innerHTML = serialNo_list.length;
            }
    	});
    },
    getConfirmAudit: function(){
    	var date;
    	date = WRPCommon.TimeModule.getTime();
    	
    	document.getElementById("blind-audit-confirm-store-id").innerHTML = document.getElementById("select-store").value;
    	document.getElementById("blind-audit-confirm-id").innerHTML = document.getElementById("blind-audit-id").value;
    	document.getElementById("blind-audit-confirm-end-time").innerHTML = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(date.getDate(), "00")+"-"+date.getFullYear() + " " + WRPAdminApp.toDecimalFormat(date.getHours(), "00") + ":"+ WRPAdminApp.toDecimalFormat(date.getMinutes(), "00") + ":"+ WRPAdminApp.toDecimalFormat(date.getSeconds(), "00");
    	document.getElementById("blind-audit-confirm-phone-qty").innerHTML = document.getElementById("audit-total-phone-qty").innerHTML;
    	document.getElementById("blind-audit-confirm-sim-qty").innerHTML = document.getElementById("audit-total-sim-qty").innerHTML;
    	document.getElementById("blind-audit-confirm-acc-qty").innerHTML = document.getElementById("audit-total-non-acc-qty").innerHTML;
    	document.getElementById("blind-audit-confirm-ser-acc-qty").innerHTML = document.getElementById("audit-total-acc-qty").innerHTML;
    	document.getElementById("blind-audit-confirm-memo").value = document.getElementById("blind-audit-memo").value;
    	
    	$('#run-blind-audit-confirm-window').jqxWindow('open');
    },
	setPage: function(){
		if(arguments[0] == 0){
			if($('#blind-audit-phone-check').val() == false) return;
			$('#run-blind-audit-phone-window').jqxWindow('open');
			$('#run-blind-audit-total-window').jqxWindow('close');
			document.getElementById("phone-next-btn").style.display = "none";
			document.getElementById("phone-update-btn").style.display = "inline-block";
		}else if(arguments[0] == 1){
			if($('#blind-audit-sim-check').val() == false) return;
			$('#run-blind-audit-sim-window').jqxWindow('open');
			$('#run-blind-audit-total-window').jqxWindow('close');
			document.getElementById("sim-next-btn").style.display = "none";
			document.getElementById("sim-update-btn").style.display = "inline-block";
		}else if(arguments[0] == 2){
			if($('#blind-audit-accessory-check').val() == false) return;
			$('#run-blind-audit-non-acc-window').jqxWindow('open');
			$('#run-blind-audit-total-window').jqxWindow('close');
			document.getElementById("acc-next-btn").style.display = "none";
			document.getElementById("acc-update-btn").style.display = "inline-block";
		}else if(arguments[0] == 3){
			if($('#blind-audit-serialized-accessory-check').val() == false) return;
			$('#run-blind-audit-ser-acc-window').jqxWindow('open');
			$('#run-blind-audit-total-window').jqxWindow('close');
			document.getElementById("serialized-acc-next-btn").style.display = "none";
			document.getElementById("serialized-acc-update-btn").style.display = "inline-block";
		}else if(arguments[0] == 4){
			$('#run-blind-audit-phone-window').jqxWindow('close');
			$('#run-blind-audit-sim-window').jqxWindow('close');
			$('#run-blind-audit-non-acc-window').jqxWindow('close');
			$('#run-blind-audit-ser-acc-window').jqxWindow('close');
			$('#run-blind-audit-total-window').jqxWindow('open');
		}

	},
	updateNonSerializedItem: function(){

		document.getElementById("audit-acc-itemCode").innerHTML = document.getElementById("message-itemCode").innerHTML;
		document.getElementById("audit-acc-sku").innerHTML = document.getElementById("message-sku").innerHTML;
		document.getElementById("audit-acc-description").innerHTML = document.getElementById("message-description").innerHTML;
		document.getElementById("blind-audit-acc-qty").value = document.getElementById("message-qty").innerHTML;
		
		$('#popup-blind-audit-enter-accessory').jqxWindow('open');
		$('#popup-blind-audit-duplicate-accessory').jqxWindow('close');
	},
    confirmMessage:function(){
    	WRPCommon.MsgBoxModule.confirm({
			width: 500,
    		message: "Are you sure?",
    		yesBtnClick: function(){
    			WRPAdminApp.pagescript.saveBlindAudit();
    		}
    	});
    },
    saveBlindAudit: function(){
    	var param,serialno_list,nonserialno_list,row, item_type;
    	param = {};

    	try {
        	param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	try{
    		param.audit_id = document.getElementById("blind-audit-confirm-id").innerHTML;
    	}catch(e){
    		
    	}

    	try{
    		param.memo = document.getElementById("blind-audit-confirm-memo").value;
    	}catch(e){
    		
    	}

    	try{
    		param.start_time = document.getElementById("blind-audit-confirm-start-time").innerHTML;
    	}catch(e){
    		
    	}

    	try{
    		param.end_time = document.getElementById("blind-audit-confirm-end-time").innerHTML;
    	}catch(e){
    		
    	}
    	
    	try{
    		item_type = WRPAdminApp.pagescript._selectedItemType;
    		param.item_type = item_type.join(",");
    	}catch(e){
    		
    	}
    	
    	serialno_list = [];
    	nonserialno_list = [];
		
		for (i = 0, len = WRPAdminApp.pagescript._phoneSerialNoList.length; i < len; i++) {
			row = WRPAdminApp.pagescript._phoneSerialNoList[i];
			if (row.serial_no === undefined) {
				continue;
			}
			
			serialno_list.push({
				item_type: 0,
				serial_no: row.serial_no,
				item_sid: (row.item_sid) ? row.item_sid : 0,
				inventory_sid: (row.inventory_sid) ? row.inventory_sid : 0,
				system_qty: (row.system_qty)? row.system_qty: 0
			});
		}

		for (i = 0, len = WRPAdminApp.pagescript._simSerialNoList.length; i < len; i++) {
			row = WRPAdminApp.pagescript._simSerialNoList[i];
			if (row.serial_no === undefined) {
				continue;
			}
			
			serialno_list.push({
				item_type: 1,
				serial_no: row.serial_no,
				item_sid: (row.item_sid) ? row.item_sid : 0,
				inventory_sid: (row.inventory_sid) ? row.inventory_sid : 0,
				system_qty: (row.system_qty)? row.system_qty: 0
			});
		}
		
		for (i = 0, len = WRPAdminApp.pagescript._accSerialNoList.length; i < len; i++) {
			row = WRPAdminApp.pagescript._accSerialNoList[i];
			if (row.serial_no === undefined) {
				continue;
			}
			
			serialno_list.push({
				item_type: 2,
				serial_no: row.serial_no,
				item_sid: (row.item_sid) ? row.item_sid : 0,
				inventory_sid: (row.inventory_sid) ? row.inventory_sid : 0,
				system_qty: (row.system_qty)? row.system_qty: 0
			});
		}
		
		param.serialno_list_str = JSON.stringify(serialno_list);
    	

		for (i = 0, len = WRPAdminApp.pagescript._nonSerialAccList.length; i < len; i++) {
			row = WRPAdminApp.pagescript._nonSerialAccList[i];
			if (row.item_sid === undefined) {
				continue;
			}
			
			nonserialno_list.push({
				item_sid: row.item_sid,
				scanned_qty: row.scanned_qty
			});
		}
		
		param.nonserialno_list_str = JSON.stringify(nonserialno_list);
		
		$.ajax({
            url: "ajax/inventory_audit/saveBlindAudit.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                
                if(result == 0){
                	WRPCommon.MsgBoxModule.alert({
            			width: 500,
                		message: "Completed",
                		okBtnClick: function(){
                			$('#run-blind-audit-confirm-window').jqxWindow('close');
                			WRPAdminApp.pagescript.setInventoryLock(0);
                			$('#run-blind-audit-total-window').jqxWindow('close');
                		}
                	});
                }else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error"
                	});
                }
            }
        });
    },
    setInventoryLock: function(lock_flag){
    	var store_id;

    	try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
    	$.ajax({
    		url: "ajax/inventory_audit/setInventoryLock.jsp",
            data: {
            	store_id: store_id,
            	lock_flag: lock_flag
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	 if(result == 0){
            		 if(lock_flag==1){
                      	WRPAdminApp.pagescript.nextStepActivate();
            		 }
                 }
            }
    	});
    }
};