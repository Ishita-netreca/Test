
var _pagescript = {
    _selectedStoreSid: 0,
    _selectedStoreId: null,
    _selectedNotificationRuleSid: 0,
    _selectedRegisterSid: 0,
    /*170210 jh : monthly goal selected store*/
    _selectedMonthlyStoreId: null,
    _selectedMonthlyGoal: null,
    _selectedExpenseSid: 0,
    _license: 0,
    _store: 0,
    _currPageNo: 1,
    _maxPageNo: 1,
    _countPerPage: 10,
    /*monthly goal selected store end*/
    init: function() {
        var date, elem;
        WRPAdminApp.pagescript._selectedMonthlyStoreId = null;
        
    	try {
			WRPComponents('div[pagename="store"] > .page-submenu-container > .submenu[panelname="stores"]').addShadowedImage('img/icon/store_01.png');
			WRPComponents('div[pagename="store"] > .page-submenu-container > .submenu[panelname="notification"]').addShadowedImage('img/icon/notice_01.png');
			WRPComponents('div[pagename="store"] > .page-submenu-container > .submenu[panelname="expenses"]').addShadowedImage('img/icon/calc_02.png');
			WRPComponents('div[pagename="store"] > .page-submenu-container > .submenu[panelname="cashRegister"]').addShadowedImage('img/icon/cash_register.png');
			WRPComponents('div[pagename="store"] > .page-submenu-container > .submenu[panelname="qpay_favorite_providers"]').addShadowedImage('img/icon/qpay_favorite.png');
		} catch (e) {
			
		}
		
		try {
			elem = $(".jqx-date-input");

			if (elem && elem.length > 0) {                            
				elem.jqxDateTimeInput({
					width: "98%",
	            	formatString: "HH:mm:ss", 
	            	showTimeButton: true, 
	            	showCalendarButton: false
				});
			}
		} catch (e) {

		}
		
		try {
			elem = $("#store-info-store-open-date-pop");

			if (elem && elem.length > 0) {                            
				elem.jqxDateTimeInput({
					disabled: true
				});
			}
		} catch (e) {

		}
		
		$(".tax-rate").focus(function(){
            $(this).val($(this).val().replace("%", ""));
        }).blur(function() {
        	var value = $(this).val();
        	if(value=="") {
        		$(this).val("%");
        	}else{
        		$(this).val(value+"%");
        	}
        });
		
		$('#check-external-clockio').on('change', function (event) {
			if($('#check-external-clockio').val() == true){
				$('#check-sales-clockio').val(false);
				$('#check-sales-clockio').jqxCheckBox('disable');
			    $("#store-external-clockio-url").prop("disabled", false);
			}else{
				$('#check-sales-clockio').jqxCheckBox('enable');
			    $("#store-external-clockio-url").prop("disabled", true);
			}
		});
		
		$('#check-external-clockio-add').on('change', function (event) {
			if($('#check-external-clockio-add').val() == true){
				$('#check-sales-clockio-add').val(false);
				$('#check-sales-clockio-add').jqxCheckBox('disable');
			    $("#store-external-clockio-url-add").prop("disabled", false);
			}else{
				$('#check-sales-clockio-add').jqxCheckBox('enable');
			    $("#store-external-clockio-url-add").prop("disabled", true);
			}
		});
		
       	$('#store-invoice-radio-0').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#store-invoice-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#store-invoice-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
       	
       	$('#store-invoice-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#store-invoice-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#store-invoice-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#store-invoice-radio-2').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#store-invoice-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#store-invoice-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#store-invoice-radio-3').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#store-invoice-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#store-invoice-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	
       	$('#stores-po-search-start-date').on('valueChanged', function (event) {  
			var filtergroup = new $.jqx.filter();
       		var filtervalue = event.args.date;
       		var filtercondition = 'GREATER_THAN_OR_EQUAL';
       		var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		filtervalue = $("#stores-po-search-end-date").jqxDateTimeInput('getDate');
       		filtercondition= 'LESS_THAN_OR_EQUAL';
       		var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		var operator = 0;
       		filtergroup.addfilter(operator, filter1);
       		filtergroup.addfilter(operator, filter2);
                       
       		$('#jqx-store-po-list').jqxGrid('addfilter', 'orderDate', filtergroup);
       		$('#jqx-store-po-list').jqxGrid('applyfilters');
       	}); 

       	$('#stores-po-search-end-date').on('valueChanged', function (event) {  
       		var filtergroup = new $.jqx.filter();
       		var filtervalue = event.args.date;
       		var filtercondition = 'GREATER_THAN_OR_EQUAL';
       		var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		filtervalue = $("#stores-po-search-start-date").jqxDateTimeInput('getDate');
       		filtercondition= 'LESS_THAN_OR_EQUAL';
       		var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		var operator = 0;
       		filtergroup.addfilter(operator, filter1);
       		filtergroup.addfilter(operator, filter2);
                       
       		$('#jqx-store-po-list').jqxGrid('addfilter', 'orderDate', filtergroup);
       		$('#jqx-store-po-list').jqxGrid('applyfilters');
       	}); 
       	
       	$('#store-porder-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#stores-po-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#stores-po-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#store-porder-radio-2').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#stores-po-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#stores-po-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#store-porder-radio-3').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#stores-po-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#stores-po-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	
       	$('#notification-history-search-start-date').on('valueChanged', function (event) {  
			var filtergroup = new $.jqx.filter();
       		var filtervalue = event.args.date;
       		var filtercondition = 'GREATER_THAN_OR_EQUAL';
       		var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		filtervalue = $("#notification-history-search-end-date").jqxDateTimeInput('getDate');
       		filtercondition= 'LESS_THAN_OR_EQUAL';
       		var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		var operator = 0;
       		filtergroup.addfilter(operator, filter1);
       		filtergroup.addfilter(operator, filter2);
                       
       		$('#jqx-notification-list').jqxGrid('addfilter', 'ReservationDate', filtergroup);
       		$('#jqx-notification-list').jqxGrid('applyfilters');
       	}); 

       	$('#notification-history-search-end-date').on('valueChanged', function (event) {  
       		var filtergroup = new $.jqx.filter();
       		var filtervalue = event.args.date;
       		var filtercondition = 'GREATER_THAN_OR_EQUAL';
       		var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		filtervalue = $("#notification-history-search-start-date").jqxDateTimeInput('getDate');
       		filtercondition= 'LESS_THAN_OR_EQUAL';
       		var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
       		var operator = 0;
       		filtergroup.addfilter(operator, filter1);
       		filtergroup.addfilter(operator, filter2);
                       
       		$('#jqx-notification-list').jqxGrid('addfilter', 'ReservationDate', filtergroup);
       		$('#jqx-notification-list').jqxGrid('applyfilters');
       	}); 
       	
       	$('#history-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#notification-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#notification-history-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#history-radio-2').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 14);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#notification-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#notification-history-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#history-radio-3').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#notification-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#notification-history-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	
       	$("#excel_store_list").click(function () {
            $("#jqx-stores-list").jqxGrid('exportdata', 'xls', 'jqx-stores-list');
        });
       	
       	$("#excel_store_po").click(function () {
            $("#jqx-store-po-list").jqxGrid('exportdata', 'xls', 'jqx-store-po-list');
        });
       	
       	$("#excel-notification-history").click(function(){
			 $("#jqx-notification-list").jqxGrid('exportdata', 'xls', 'jqx-notification-history');
		});

		$("#excel-notification-configuration").click(function(){
			$("#jqx-notification-rule-list").jqxGrid('exportdata', 'xls', 'jqx-notification-configuration');
		});
	
		
    	var components = $('#store-edit-window');
    	if (components) {
    		components.jqxWindow("width", 800);
    		components.jqxWindow("height", 730);
    		components.css("top", "calc(50% - 365px)");
    		components.css("left", "calc(50% - 400px)");
    	}
    	
    	components = $('#store-add-window');
    	if (components) {
    		components.jqxWindow("width", 780);
    		components.jqxWindow("height", 630);
    		components.css("top", "calc(50% - 315px)");
    		components.css("left", "calc(50% - 390px)");
    	}
    	
    	components = $('#notification-edit-window');
    	if (components) {
    		components.jqxWindow("width", 680);
    		components.jqxWindow("height", 350);
    		components.css("top", "calc(50% - 175px)");
    		components.css("left", "calc(50% - 320px)");
    	}
  
    	/*1702010 jh monthly goal date, popup*/
    	
    	components = $('#mothly-add-window');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 200);
    		components.css("top", "calc(50% - 100px)");
    		components.css("left", "calc(50% - 300px)");
    	}
    	
    	components = $('#mothly-edit-window');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 200);
    		components.css("top", "calc(50% - 100px)");
    		components.css("left", "calc(50% - 300px)");
    	}
    	
   
    	$("#add-date-goal").jqxDateTimeInput({ width: '180px', height: '25px', formatString: "MM/yyyy" });
		$("#edit-date-goal").jqxDateTimeInput({ width: '180px', height: '25px', formatString: "MM/yyyy" });
		
		WRPAdminApp.pagescript._selectedMonthlyStoreId = null;
		
    	/*monthly goal date end*/
		
		components = $('#jqx-store-bottom-panel');
		if (components) {
			components.jqxTabs({ height: '100%', width: '100%' });
			components.on("selected", WRPAdminApp.pagescript.onDetailTabSelected);
		}
    	
    	components = $('#jqx-store-invoice-list');
    	if(components){
    		components.jqxGrid({
            	   width: '100%',
            	   height: '100%',
            	   source: new $.jqx.dataAdapter({
            		   datatype: "json",
            		   datafields: [
            			   { name: 'invoice_no', type: 'number'},
            			   { name: 'date', type: 'date'},
            			   { name: 'customer_id', type: 'string'},
            			   { name: 'cash', type: 'number' },
            			   { name: 'credit', type: 'number' },
            			   { name: 'loan', type: 'number' },
            			   { name: 'check', type: 'number' },
            			   { name: 'creditmemo', type: 'number' },
            			   { name: 'amount', type: 'number'},
            			   { name: 'tax', type: 'number'}
					]
            	   }),
            	   showfilterrow: false,
            	   filterable: true,
            	   sortable: true,
            	   columnsresize:true,
            	   theme: 'arctic',
            	   columns: [
            		   	{ text: 'InvoiceNo', datafield: 'invoice_no', hidden:true },
           		   		{ text: 'Date', datafield: 'date', width: '15%', filtertype: 'date', cellsformat: 'd', align: 'center' },
	        			  { text: 'Customer', datafield: 'customer_id', width: '15%', align: 'center'},
	        			  { text: 'Cash', datafield: 'cash', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
	        			  { text: 'Credit Card', datafield: 'credit', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
	        			  { text: 'Loan', datafield: 'loan', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
	        			  { text: 'Credit Memo', datafield: 'creditmemo', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
	        			  { text: 'check', datafield: 'check', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
	        			  { text: 'Amount', datafield: 'amount', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
	        			  { text: 'Tax', datafield: 'tax', width: '10%', cellsalign: 'right', cellsformat: 'c2', align: 'center' }
                     ]
    			});
	    		$("#excel_store_invoice").click(function () {
	    			components.jqxGrid('exportdata', 'xls', 'jqx-store-invoice-list');
	            });
    		}
    	
    	components = $('#jqx-store-po-list');
    	if(components){
    		components.jqxGrid({
            	   width: '100%',
            	   height: '100%',
            	   source: new $.jqx.dataAdapter({
            		   datatype: "json",
            		   datafields: [
            			   	{ name: 'po_id', type: 'string'},
       						{ name: 'order_date', type: 'date'},
       						{ name: 'vendor_id', type: 'string'},
       						{ name: 'total_order_qty', type: 'number'},
       						{ name: 'amount', type: 'number'},
       						{ name: 'status_str', type: 'string'},
					]
            	   }),
            	   showfilterrow: false,
            	   filterable: true,
            	   sortable: true,
            	   columnsresize:true,
            	   theme: 'arctic',
            	   columns: [
            		   { text: 'P.O ID', datafield: 'po_id', width: '20%', align: 'center'},
            		   { text: 'Date', datafield: 'order_date', filtertype: 'date', width: '20%', cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center'},
            		   { text: 'Vendor ID', datafield: 'vendor_id', width: '20%', align: 'center'},
            		   { text: 'Status', datafield: 'status_str', width: '15%', align: 'center' },
            		   { text: 'Qty', datafield: 'total_order_qty', width: '10%', align: 'center' },
            		   { text: 'Amount', datafield: 'amount', width: '15%', cellsformat: 'c2', cellsalign: 'right', align: 'center' }
                     ]
    			});
    		}
        
        /*170210 jh : monthly goal jqx*/
        elem = $("#jqx-monthly-goal-list");        
        if (elem) {
        	elem.jqxGrid({
        		width: "99.8%",
				height: "99%",
				theme: "arctic",
				filterable: false,
				editable: true,
				selectionMode: "custom",
				sortable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "year", type: "string" },
						{ name: "month", type: "string" },
						{ name: "box_sales_goal", type: "bool" },
						{ name: "accessory_goal", type: "string" },
						{ name: "more_than_50_mrc_new_goal", type: "bool" }
					]
				}),
				columns: [
					{ text: "Year", datafield: "year", editable: false, autoCellHeight: false, align: 'center' }, 
					{ text: "Month", datafield: "month", editable: false, autoCellHeight: false, align: 'center' },
					{ text: "Box Goal", datafield: "box_sales_goal", editable: false, autoCellHeight: false, align: 'center' },
					{ text: "Accessory Goal", datafield: "accessory_goal", editable: false, autoCellHeight: false, align: 'center' },
					{ text: "50+MRC Goal", datafield: "more_than_50_mrc_new_goal", editable: false, autoCellHeight: false, align: 'center' },
				]
        	});
        	
        	elem.on("rowdoubleclick", function(event){
        		WRPAdminApp.pagescript._selectedMonthlyGoal = event.args.row.bounddata.sid;
        		$("#edit-box-goal").val(event.args.row.bounddata.box_sales_goal);
        		$("#edit-mrc-goal").val(event.args.row.bounddata.more_than_50_mrc_new_goal);
        		$("#edit-accessory-goal").val(event.args.row.bounddata.accessory_goal);
        		$("#edit-date-goal").jqxDateTimeInput('setDate', event.args.row.bounddata.year+"-"+event.args.row.bounddata.month);
        		
        		$('#mothly-edit-window').jqxWindow('open');
        	});
        	
        	$("#excel_store_monthly-goal").click(function () {
        		elem.jqxGrid('exportdata', 'xls', 'jqx-store-monthly-goal');
            });
        }
        /*monthly goal jqx end*/
    	
    	$('#store-porder-radio-1').jqxRadioButton('check'); 
    	$('#store-invoice-radio-0').jqxRadioButton('check'); 
    	
    	WRPAdminApp.pagescript.getLicense();
        WRPAdminApp.pagescript.getAllStatesOfUSA();
        WRPAdminApp.pagescript.getMarketList();
        WRPAdminApp.pagescript.getStoreList();
        //WRPAdminApp.pagescript.getNotificationHistory();
        //WRPAdminApp.pagescript.getNotificationRuleList();
    },
    onDetailTabSelected: function(event) {
		WRPAdminApp.pagescript.getDetailDataAtIndex(event.args.item);
	},
	getDetailDataAtIndex: function(tab_index) {
		switch (tab_index) {
		case 0:
			break;
		case 1:
			WRPAdminApp.pagescript.getStoreInvoiceList(WRPAdminApp.pagescript._selectedStoreId);
			break;
		case 2:
			WRPAdminApp.pagescript.getStorePOList(WRPAdminApp.pagescript._selectedStoreId);
			break;
		case 3:
			break;
		case 4:
			WRPAdminApp.pagescript.getMonthlyGoal(WRPAdminApp.pagescript._selectedStoreId);
			break;
		}
	},
    getAllStatesOfUSA: function() {
        $.ajax({
            url: "ajax/etc/getAllStatesOfUSA.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, addState, selectStatePop, i, len, obj, innerHTML;
                data = result.data;
                if (!data) return;

                //selectState = document.getElementById("store-info-store-state");
                addState = document.getElementById("store-add-store-state");
                if (!addState) return;
                selectStatePop = document.getElementById("store-info-store-state-pop");
                if (!selectStatePop) return;

                innerHTML = [];
                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<option value="');
                        innerHTML.push(obj.code);
                        innerHTML.push('">');
                        innerHTML.push(obj.desc);
                        innerHTML.push('</option>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                //selectState.innerHTML = innerHTML.join("");
                selectStatePop.innerHTML = innerHTML.join("");
                addState.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    getMarketList: function() {
        var market, storeId;


        $.ajax({
            url: "ajax/market/getMarketList.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data,selectMarketPop,selectMarket, addMarket, addMarketPop, i, len, obj, innerHTML;
                data = result.data;

                if (!data) return;

                addMarket = document.getElementById("store-add-store-market-code");
                if (!addMarket) return;
                selectMarketPop = document.getElementById("store-info-store-market-code-pop");
                if (!selectMarketPop) return;
                
                innerHTML = [];	
                innerHTML.push('<option value="">SELECT MARKET</option>');
                for(i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<option value="');
                        innerHTML.push(obj.marketCode);
                        innerHTML.push('"');
                        if (market !== undefined && obj.marketCode === market) {
                            innerHTML.push(' selected');
                        }
                        innerHTML.push('>');
                        innerHTML.push(obj.name);
                        innerHTML.push('</option>');
                    } catch (e) {

                    }
                }

                //selectMarket.innerHTML = innerHTML.join("");
                selectMarketPop.innerHTML = innerHTML.join("");
                addMarket.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    getDistrictList: function() {
        var market, district, storeId;
        if (arguments.length > 0) {
            market = arguments[0];
        } else {
            console.warn("no input market code");
            return;
        }
        if (arguments.length > 1) {
            district = arguments[1];
        }

        try {
            storeId = document.getElementById("select-store").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/district/getDistrictList.jsp",
            data: {
                marketCode: market,
                storeId : storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, selectDistrict, selectDistrictPop, innerHTML;

                data = result.data;
                if (!data) return;

                //selectDistrict = document.getElementById("store-info-store-district-code");
                addDistrict = document.getElementById("store-add-store-district-code");
                if (!addDistrict) return;
                selectDistrictPop = document.getElementById("store-info-store-district-code-pop");
                if (!selectDistrictPop) return;
                
                innerHTML = [];
                innerHTML.push('<option value="">SELECT DISTRICT</option>');
                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<option value="');
                        innerHTML.push(obj.districtCode);
                        innerHTML.push('"');
                        if (district !== undefined && district === obj.districtCode) {
                            innerHTML.push(' selected');
                        }
                        innerHTML.push('>');
                        innerHTML.push(obj.name);
                        innerHTML.push('</option>');
                    } catch (e) {

                    }
                }

                //selectDistrict.innerHTML = innerHTML.join("");
                selectDistrictPop.innerHTML = innerHTML.join("");
                addDistrict.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    getStoreList: function() {
    	
    	if (arguments.length > 0 && arguments[0] === true) {
        	try {
        		WRPAdminApp.pagescript._currPageNo = 1;
        	} catch (e) {
        		
        	}
        }
    	
    	WRPAdminApp.pagescript.getLicense();
        WRPAdminApp.pagescript.getStorePOList();

        WRPAdminApp.pagescript._selectedStoreSid = 0;
        WRPAdminApp.closePopup('storeInfoContainer');
        $.ajax({
            url: "ajax/store/getStoreList.jsp",
            data: {
        		curr_page_no : WRPAdminApp.pagescript._currPageNo,
        		count_per_page : WRPAdminApp.pagescript._countPerPage
            },
            method: "POST",
            dataType: "json",
            success: function(result) {            	
            	var elem;
            	var datarow = new Array();
            	var li, so;
            	
            	if (result.data.length > 0 && result.data[0].max_page_no !== undefined) {
        			WRPAdminApp.pagescript._maxPageNo = result.data[0].max_page_no;
        		}
            	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		row["sid"] = result.data[i].sid;
            		row["Market"] = result.data[i].marketName;
            		row["District"] = result.data[i].districtName;
            		row["StoreId"] = result.data[i].storeId;
            		row["Owner"] = result.data[i].ownerId;
            		row["Manager"] = result.data[i].manager;
            		row["Description"] = result.data[i].name;
            		row["OpenDate"] = result.data[i].openDate;
            		row["Address"] = result.data[i].address1 + result.data[i].address2 + result.data[i].city + result.data[i].state + result.data[i].zipcode;
            		row["PhoneNo"] = result.data[i].tel;
            		row["Status"] = result.data[i].statusStr;
            		row["active"] = result.data[i].active;

            		switch (result.data[i].active) {
	                case 0:
	                	row["Active_str"] = "Inactive"
	                    break;
	                case 1:
	                	row["Active_str"] = "Active"
	                    break;
	                }
            		
            		datarow[i] = row;
            	}
            	
            	var source = 
        			{
            			localdata: datarow,
            			datafields:
            				[
            					{ name: 'sid', type: 'number'},
            					{ name: 'Market', type: 'string'},
            					{ name: 'District', type: 'string'},
            					{ name: 'StoreId', type: 'string'},
            					{ name: 'Owner', type: 'number'},
            					{ name: 'Manager', type: 'string'},
            					{ name: 'Description', type: 'string'},
            					{ name: 'OpenDate', type: 'date'},
        						{ name: 'Address', type: 'string'},
        						{ name: 'PhoneNo', type: 'string'},
        						{ name: 'Status', type: 'string'},
        						{ name: 'active', type: 'string'},
        						{ name: 'Active_str', type: 'string'}
        					],
        						datatype: "json"
        			};
        	
            	var dataAdapter = new $.jqx.dataAdapter(source);
            	elem = $("#jqx-stores-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-stores-list"></div>';
            	}
    		
            	elem = $("#jqx-stores-list");
    		
            	var pagerrenderer = function () {
           	     var element = $("<div style='float: right;position: relative;top: 8px;font-size: 14px;'><div style='display:inline-block;width:120px; text-align:center;'>Active Store </div><div style='display: inline-block; width:20px;' id='active'><b>"+WRPAdminApp.pagescript._store+"</b></div> / <div style='display:inline-block;width:80px; text-align:center;'>License </div><div style='display: inline-block; width:40px;' id='license'><b>"+WRPAdminApp.pagescript._license+"</b></div></div>");
           	     return element;
           	 	}
            	
            	if(elem){
            		elem.jqxGrid(
            			{
	                	   width: '100%',
	                	   height: '100%',
	                	   source: dataAdapter,
	                	   showfilterrow: false,
	                	   pageable: true,
		                   pagesize: 100,
		                   pagerrenderer: pagerrenderer,
	                	   filterable: true,
	                	   sortable: true,
	                	   columnsresize:true,
	                	   theme: 'arctic',
	                	   columns: [
	                	       { text: 'sid', datafield: 'sid', hidden: 'true', width: '10%' },
	                		   { text: 'Market', datafield: 'Market', width: '10%', align: 'center' },
	                		   { text: 'District', datafield: 'District', width: '10%', align: 'center' },
	                		   { text: 'Store ID', datafield: 'StoreId', width: '10%', align: 'center' },
	                		   { text: 'Owner', datafield: 'Owner', width: '10%', align: 'center'},
	                		   { text: 'Manager', datafield: 'Manager', width: '10%', align: 'center'},
	                		   { text: 'Description', datafield: 'Description', width: '10%', align: 'center' },
	                		   { text: 'Open Date', datafield: 'OpenDate', width: '8%',filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center'},
	                		   { text: 'Address', datafield: 'Address', width: '10%', align: 'center'},
	                		   { text: 'Phone no.', datafield: 'PhoneNo', width: '10%', align: 'center'},
	                		   { text: 'Status', datafield: 'Status', width: '6%', align: 'center'},
	                		   { text: 'Active_int', datafield: 'active', width: '10%', hidden: 'true', align: 'center'},
	                		   { text: 'Active', datafield: 'Active_str', width: '6%', align: 'center'}
		                     ]
            			});
            		$("#jqx-stores-list").on('rowselect', WRPAdminApp.pagescript.informStoreInfo);
            		$("#jqx-stores-list").on("rowselect", function (event) {
            			var i = $("#jqx-store-bottom-panel").jqxTabs('val');
            			WRPAdminApp.pagescript._selectedStoreId = event.args.row.StoreId;
    					WRPAdminApp.pagescript.getDetailDataAtIndex(i);
            		});
            		$("#jqx-stores-list").on('rowdoubleclick', WRPAdminApp.pagescript.getStoreInfoPop);
            		
            	}
            	WRPAdminApp.pagescript.initEditStore();
            }
        });
    },
    getStoreInvoiceList: function() {
        var start_date, end_date, date;
        
        if (arguments.length < 1) {
            return;
        }
        
        try {
      		document.getElementById("loading-container").style.display = "block";
      	} catch (e) {
    		console.warn(e);
    	}
      	
       	start_date= $("#store-invoice-search-start-date").val();
        end_date = $("#store-invoice-search-end-date").val();

        $.ajax({
            url: "ajax/invoice/getInvoiceListByStoreId.jsp",
            data: {
                storeId: arguments[0],
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-store-invoice-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for(i = 0; i < data.length; i++){
    					if(data[i].customer_id == undefined || data[i].customer_id.length == 0){
    						data[i].customer_id="GUEST";
    					}
    				}
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
    getStorePOList: function() {
        var start_date, end_date;
        
        if (arguments.length < 1) {
            return;
        }

        start_date = $('#stores-po-search-start-date').val();
        end_date = $('#stores-po-search-end-date').val();
        
        $.ajax({
            url: "ajax/purchase_order/getPOrderList.jsp",
            data: {
                store_id: arguments[0],
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-store-po-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
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
					}
    				elem.jqxGrid("addRow", null, data, "last");
    			}
            }
        });
    },
    informStoreInfo: function(event) {
    	var rowdata;
        if (arguments.length < 1) {
            console.warn("informStoreInfo : No input store sid");
            return;
        }

        try {
    		rowdata = event.args.row;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	if (!rowdata.sid) {
    		
    	}
    	WRPAdminApp.pagescript._selectedStoreSid = rowdata.sid;
    	
        if (isNaN(WRPAdminApp.pagescript._selectedStoreSid)) {
            console.warn("informStoreInfo : store sid error");
            return;
        }
        $.ajax({
            url: "ajax/store/getStoreInfo.jsp",
            data: {
                storeSid: WRPAdminApp.pagescript._selectedStoreSid,
                storeId: rowdata.StoreId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, strBuffer;
                data = result.data;

                if (!data) return;

                try {
                    document.getElementById("store-info-store-id").value = (data.storeId !== undefined && data.storeId)? data.storeId.toUpperCase() : "";
                    document.getElementById("store-info-store-id").setAttribute("readonly","");
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-owner").value = (data.ownerId !== undefined && data.ownerId)? data.ownerId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-manager").value = (data.manager !== undefined && data.manager)? data.manager : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-tel").value = (data.tel !== undefined && data.tel)? data.tel : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-open-date").value = (data.openDate !== undefined && data.openDate)? data.openDate : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-name").value = (data.name !== undefined && data.name)? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("store-info-store-door-code").value = (data.door_code !== undefined && data.door_code)? data.door_code : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                if (data.status !== undefined) {
                	//document.getElementById("store-info-store-door-code").value = (data.door_code !== undefined && data.door_code)? data.door_code : "";
                	
                    switch (data.status) {
                        case 1:
                            try {
                            	document.getElementById("store-info-status").value = "Open";
                                //document.getElementById("store-info-status-open").checked = true;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                            	document.getElementById("store-info-status").value = "Close";
                                //document.getElementById("store-info-status-close").checked = true;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }
                /*170220 jh : active*/
                if (data.active !== undefined) {
                    switch (data.active) {
                        case 1:
                            try {
                            	document.getElementById("store-info-active").value = "Active";
                            	//$("#store-info-active").prop("checked", true);
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                            	document.getElementById("store-info-active").value = "Inactive";
                            	//$("#store-info-inactive").prop("checked", true);
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }
                /*active end*/
                try {
                    document.getElementById("store-info-store-zipcode").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("store-info-store-poscnt").value = (data.poscnt !== undefined && data.poscnt)? data.poscnt : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-addr1").value = (data.address1 !== undefined && data.address1)? data.address1 : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-addr2").value = (data.address2 !== undefined && data.address2)? data.address2 : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-city").value = (data.city !== undefined && data.city)? data.city : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-state").value = (data.state !== undefined && data.state)? data.state : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-fax").value = (data.fax !== undefined && data.fax)? data.fax : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-tax-rate").value = (data.taxRate !== undefined && data.taxRate)? (100*data.taxRate.toFixed(4)).toFixed(2)+"(%)" : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-market-code").value = (data.marketCode !== undefined && data.marketCode)? data.marketCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                try {
                    document.getElementById("store-info-store-district-code").value = (data.districtCode !== undefined && data.districtCode)? data.districtCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                

                try {
            		if(data.transaction_protection == 1){
            			document.getElementById("store-info-onprotection").value = "ON";
            		}else if(data.transaction_protection == 0){
            			document.getElementById("store-info-onprotection").value = "OFF";
            		}
                		
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                //WRPAdminApp.pagescript.getDistrictList(data.marketCode, data.districtCode);

                try {
                    document.getElementById("store-info-store-asap-id").value = (data.asapId !== undefined && data.asapId)? data.asapId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-asap-password").value = (data.asapPassword !== undefined && data.asapPassword)? data.asapPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-qpay-id").value = (data.qpayId !== undefined && data.qpayId)? data.qpayId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-qpay-password").value = (data.qpayPassword !== undefined && data.qpayPassword)? data.qpayPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
/*
                try {
                    document.getElementById("store-info-store-qpay-inven-id").value = (data.qpayInvenId !== undefined && data.qpayInvenId)? data.qpayInvenId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-qpay-inven-password").value = (data.qpayInvenPassword !== undefined && data.qpayInvenPassword)? data.qpayInvenPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
*/                
                try {
                    document.getElementById("store-info-store-qpay-inven-branch-id").value = (data.qpayInvenBranchId !== undefined && data.qpayInvenBranchId)? data.qpayInvenBranchId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
/*               
                try {
                    document.getElementById("store-info-store-qpay-api-id").value = (data.qpayApiId !== undefined && data.qpayApiId)? data.qpayApiId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-qpay-api-password").value = (data.qpayApiPassword !== undefined && data.qpayApiPassword)? data.qpayApiPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
*/
                try {
                    document.getElementById("store-info-store-xbm-id").value = (data.xbmId !== undefined && data.xbmId)? data.xbmId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-xbm-password").value = (data.xbmPassword !== undefined && data.xbmPassword)? data.xbmPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                WRPAdminApp.pagescript._selectedStoreId = data.storeId;
                WRPAdminApp.pagescript._selectedMonthlyStoreId = data.storeId;
            }
        });
    },
    getStoreInfoPop: function(event){
    	var rowdata;
        if (arguments.length < 1) {
            console.warn("informStoreInfo : No input store sid");
            return;
        }

        try {
    		rowdata = event.args.row.bounddata;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	if (!rowdata.sid) {
    		
    	}
    	WRPAdminApp.pagescript._selectedStoreSid = rowdata.sid;
    	
        $.ajax({
            url: "ajax/store/getStoreInfo.jsp",
            data: {
                storeSid: WRPAdminApp.pagescript._selectedStoreSid,
                storeId: rowdata.StoreId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, strBuffer;
                data = result.data;

                if (!data) return;

                try {
                    document.getElementById("store-info-store-id-pop").value = (data.storeId !== undefined && data.storeId)? data.storeId.toUpperCase() : "";
                    document.getElementById("store-info-store-id-pop").setAttribute("readonly","");
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-owner-pop").value = (data.ownerId !== undefined && data.ownerId)? data.ownerId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-manager-pop").value = (data.manager !== undefined && data.manager)? data.manager : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-tel-pop").value = (data.tel !== undefined && data.tel)? data.tel : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    $("#store-info-store-open-date-pop").val((data.openDate !== undefined && data.openDate)? data.openDate : "");
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-name-pop").value = (data.name !== undefined && data.name)? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("store-info-store-door-code-pop").value = (data.door_code !== undefined && data.door_code)? data.door_code : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("store-info-key-code-pop").value = (data.keycode !== undefined && data.keycode)? data.keycode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                if (data.status !== undefined) {
                    switch (data.status) {
                        case 1:
                            try {
                                document.getElementById("store-info-status-open-pop").checked = true;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                                document.getElementById("store-info-status-close-pop").checked = true;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }

                /*170220 jh : active*/
                if (data.active !== undefined) {
                    switch (data.active) {
                        case 1:
                            try {
                                $("#store-info-active-pop").prop("checked", true);
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                                $("#store-info-inactive-pop").prop("checked", true);
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }
                /*active end*/

                if (data.transaction_protection !== undefined) {
                    switch (data.transaction_protection) {
                        case 1:
                            try {
                                $("#store-info-onprotection-pop").prop("checked", true);
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                                $("#store-info-offprotection-pop").prop("checked", true);
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }
                
                if (data.clock_in_sales_only !== undefined) {
                    switch (data.clock_in_sales_only) {
                        case 1:
                            try {
                            	$('#check-sales-clockio').jqxCheckBox({ checked:true });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                            	$('#check-sales-clockio').jqxCheckBox({ checked:false });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }
                
                if (data.all_permissions_allow !== undefined) {
                    switch (data.all_permissions_allow) {
                        case 1:
                            try {
                            	$('#check-all-permission').jqxCheckBox({ checked:true });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                            	$('#check-all-permission').jqxCheckBox({ checked:false });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }
                
                if (data.return_only_store_credit !== undefined) {
                    switch (data.return_only_store_credit) {
                        case 1:
                            try {
                            	$('#check-return-store-credit').jqxCheckBox({ checked:true });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                            	$('#check-return-store-credit').jqxCheckBox({ checked:false });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }

                if (data.external_clockio !== undefined) {
                    switch (data.external_clockio) {
                        case 1:
                            try {
                            	$('#check-external-clockio').jqxCheckBox({ checked:true });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                        case 0:
                            try {
                            	$('#check-external-clockio').jqxCheckBox({ checked:false });
                                break;
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                            break;
                    }
                }
                
                try {
                    document.getElementById("store-external-clockio-url").value = (data.external_clockio_url !== undefined && data.external_clockio_url)? data.external_clockio_url : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("store-info-store-zipcode-pop").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("store-info-store-poscnt-pop").value = (data.poscnt !== undefined && data.poscnt)? data.poscnt : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-addr1-pop").value = (data.address1 !== undefined && data.address1)? data.address1 : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-addr2-pop").value = (data.address2 !== undefined && data.address2)? data.address2 : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-city-pop").value = (data.city !== undefined && data.city)? data.city : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-state-pop").value = (data.state !== undefined && data.state)? data.state : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-fax-pop").value = (data.fax !== undefined && data.fax)? data.fax : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-tax-rate-pop").value = (data.taxRate !== undefined && data.taxRate)? (100*data.taxRate.toFixed(4)).toFixed(2)+"%" : "" ;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-market-code-pop").value = (data.marketCode !== undefined && data.marketCode)? data.marketCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.pagescript.getDistrictList(data.marketCode, data.districtCode);

                try {
                    document.getElementById("store-info-store-asap-id-pop").value = (data.asapId !== undefined && data.asapId)? data.asapId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-asap-password-pop").value = (data.asapPassword !== undefined && data.asapPassword)? data.asapPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-qpay-id-pop").value = (data.qpayId !== undefined && data.qpayId)? data.qpayId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-qpay-password-pop").value = (data.qpayPassword !== undefined && data.qpayPassword)? data.qpayPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                /*                
                try {
                    document.getElementById("store-info-store-qpay-inven-id-pop").value = (data.qpayInvenId !== undefined && data.qpayInvenId)? data.qpayInvenId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                try {
                    document.getElementById("store-info-store-qpay-inven-password-pop").value = (data.qpayInvenPassword !== undefined && data.qpayInvenPassword)? data.qpayInvenPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                */
                try {
                    document.getElementById("store-info-store-qpay-inven-branch-id-pop").value = (data.qpayInvenBranchId !== undefined && data.qpayInvenBranchId)? data.qpayInvenBranchId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                /*
                try {
                    document.getElementById("store-info-store-qpay-api-id-pop").value = (data.qpayApiId !== undefined && data.qpayApiId)? data.qpayApiId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-qpay-api-password-pop").value = (data.qpayApiPassword !== undefined && data.qpayApiPassword)? data.qpayApiPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                 */
                try {
                    document.getElementById("store-info-store-xbm-id-pop").value = (data.xbmId !== undefined && data.xbmId)? data.xbmId : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-info-store-xbm-password-pop").value = (data.xbmPassword !== undefined && data.xbmPassword)? data.xbmPassword : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                	$('#store-info-open-time-edit').jqxDateTimeInput('val', "2017-03-23 " + data.open_time);
                } catch (e) {
                  console.warn(e);
                  return;
                }
                
                try {
                	$('#store-info-close-time-edit').jqxDateTimeInput('val', "2017-03-23 " + data.close_time);
                } catch (e) {
                	console.warn(e);
                	return;
                }
                
                try {
                	$('#store-info-daily-work-hour-edit').jqxDateTimeInput('val', "2017-03-23 " + data.daily_work_hour);
                } catch (e) {
                   console.warn(e);
                   return;
                }
                
                try {
                	$('#store-info-weekly-work-hour-edit').val(data.weekly_work_hour);
                } catch (e) {
                   console.warn(e);
                   return;
                }
                
                $('#store-edit-window').jqxWindow('open');
            }
        });
    },
    initEditStore: function() {

        WRPAdminApp.pagescript._selectedStoreSid = 0;

        try {
            document.getElementById("store-info-store-id-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-open-date-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-owner-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-manager-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-addr1-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-city-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-addr2-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            document.getElementById("store-info-store-zipcode-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-state-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-market-code-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-district-code-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }


        try {
            document.getElementById("store-info-store-tel-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-fax-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-tax-rate-pop").value = "%";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-name-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-door-code-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-poscnt-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-asap-id-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-asap-password-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-qpay-id-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-qpay-password-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-qpay-inven-id-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-qpay-inven-password-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-qpay-inven-branch-id-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-qpay-api-id-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-qpay-api-password-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-xbm-id-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-info-store-xbm-password-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            $("#store-info-open-time-edit").val("");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	$("#store-info-close-time-edit").val("");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	$("#store-info-daily-work-hour-edit").val("");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	$("#store-info-weekly-work-hour-edit").val("");
        } catch (e) {
            console.warn(e);
            return;
        }
    },
    initStoreInfo: function() {

        WRPAdminApp.pagescript._selectedStoreSid = 0;

        try {
            document.getElementById("store-add-store-id").value = "";
            document.getElementById("store-add-store-id").removeAttribute("readonly");
        } catch (e) {
            console.warn(e);
            return;
        }
/*
        try {
            document.getElementById("store-add-store-owner").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
*/

        try {
            document.getElementById("store-add-store-tel").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            var date = WRPCommon.TimeModule.getTime();
        	date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
        	$("#store-add-store-open-date").val(date);
        	//$("#store-add-store-open-date").val("");
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-status-open").checked = true;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-zipcode").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            document.getElementById("store-add-store-addr2").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-addr1").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-city").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-state").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-fax").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }


        try {
            document.getElementById("store-add-store-tax-rate").value = "%";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-market-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-district-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-asap-id").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-asap-password").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-qpay-id").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-qpay-password").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-xbm-id").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-add-store-xbm-password").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-external-clockio-url-add").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            $('#check-sales-clockio-add').val(false);
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            $('#check-all-permission-add').val(false);
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            $('#check-return-store-credit-add').val(false);
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            $('#check-external-clockio-add').val(false);
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            $("#store-info-open-time").val("08:00:00");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	$("#store-info-close-time").val("20:00:00");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	$("#store-info-daily-work-hour").val("08:00:00");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	$("#store-info-weekly-work-hour").val("40:00:00");
        } catch (e) {
            console.warn(e);
            return;
        }
        
        WRPAdminApp.pagescript.getStorePOList();

    },
    updateStoreInfo: function() {
        var param, elem, i, len;

        param = {};

        param.storeSid = WRPAdminApp.pagescript._selectedStoreSid;

        try {
            elem = document.getElementById("store-info-store-id-pop");
            param.storeId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-name-pop");
            param.name = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-info-store-addr1-pop");
            param.address1 = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-addr2-pop");
            param.address2 = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-city-pop");
            param.city = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-state-pop");
            param.state = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-zipcode-pop");
            param.zipcode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-info-store-poscnt-pop");
            param.poscnt = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-tel-pop");
            param.tel = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-fax-pop");
            param.fax = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-status-open-pop");
            param.status = (elem.checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        /*170220 jh : active*/
        try {
            elem = document.getElementById("store-info-active-pop");
            param.active = (elem.checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        /*active end*/
        try {
            elem = $('#check-sales-clockio').val();
            param.clock_in_sales_only = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
        	elem = $('#check-all-permission').val();
            param.all_permissions_allow = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
        	elem = $('#check-return-store-credit').val();
            param.return_only_store_credit = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	elem = $('#check-external-clockio').val();
            param.external_clockio = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-external-clockio-url");
            console.log(elem.value);
            param.external_clockio_url = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-info-onprotection-pop");
            param.protection = (elem.checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-info-store-tax-rate-pop");
            /*170213 jh : tax rate*/
            if (elem.value.indexOf("(")){
            	var taxRate = elem.value.split("(");
            	elem.value = taxRate[0];
            }
            
            if (elem.value.indexOf("%")){
            	var taxRate = elem.value.split("%");
            	elem.value = taxRate[0];
            }
            
            if(elem.value < 1){
				WRPCommon.MsgBoxModule.alert({
					message: "please put a tax rate greater than 1"
				});
            	return;
            }
            /*tax rate end*/
            param.taxRate = parseFloat(elem.value);
            param.taxRate /= 100;
            
            if (isNaN(param.taxRate)) {
				WRPCommon.MsgBoxModule.alert({
					message: "Tax Rate value contains non-numeric characters"
				});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-market-code-pop");
            param.marketCode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-district-code-pop");
            param.districtCode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-info-store-door-code-pop");
            param.doorCode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-info-key-code-pop");
            if (isNaN(elem.value)){
				WRPCommon.MsgBoxModule.alert({
					message: "Input Code value contains non-numeric characters"
				});
                return;
            }else if(elem.value.length > 4){
				WRPCommon.MsgBoxModule.alert({
					message: "Please enter 4 digit Input Code"
				});
        		return;
        	}
            param.keyCode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-info-store-asap-id-pop");
            param.asapId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-asap-password-pop");
            param.asapPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-qpay-id-pop");
            param.qpayId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-qpay-password-pop");
            param.qpayPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        /*
        try {
            elem = document.getElementById("store-info-store-qpay-inven-id-pop");
            param.qpayInvenId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-qpay-inven-password-pop");
            param.qpayInvenPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        */
        try {
            elem = document.getElementById("store-info-store-qpay-inven-branch-id-pop");
            param.qpayInvenBranchId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
/*
        try {
            elem = document.getElementById("store-info-store-qpay-api-id-pop");
            param.qpayApiId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-qpay-api-password-pop");
            param.qpayApiPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
*/
        try {
            elem = document.getElementById("store-info-store-xbm-id-pop");
            param.xbmId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-info-store-xbm-password-pop");
            param.xbmPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-open-time-edit").val();
            param.open_time = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-close-time-edit").val();
            param.close_time = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-daily-work-hour-edit").val();
            param.daily_work_hour = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-weekly-work-hour-edit").val();
            param.weekly_work_hour = elem;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/store/setStoreInfo.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var storeId = document.getElementById("select-store").value;
            	
                if (result === 1) {
    				WRPCommon.MsgBoxModule.alert({
    					message: "This store id is already exists"
    				});
                }else if (result === 0) {
    				WRPCommon.MsgBoxModule.alert({
    					message: "Completed",
    					okBtnClick: function(){
    	                    $('#store-edit-window').jqxWindow('close');
    	                    WRPAdminApp.pagescript.getStoreList(storeId);
    					}
    				});
                } else {
    				WRPCommon.MsgBoxModule.alert({
    					message: "Error : " + result
    				});
                    return;
                }
            }
        });
    },
    addStoreInfo: function() {
        var param, elem, i, len, date;

        param = {};

        param.storeSid = WRPAdminApp.pagescript._selectedStoreSid;

        try {
            elem = document.getElementById("store-add-store-id");
            param.storeId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-name");
            param.name = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-addr1");
            param.address1 = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-addr2");
            param.address2 = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-city");
            param.city = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-state");
            param.state = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-zipcode");
            param.zipcode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-tel");
            param.tel = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-fax");
            param.fax = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-status-open");
            param.status = (elem.checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        /*170220 jh : active*/
        try {
            elem = document.getElementById("store-add-active");
            param.active = (elem.checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        /*active end*/
        try {
            elem = document.getElementById("store-add-onprotection-pop");
            param.protection = (elem.checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
            elem = document.getElementById("store-add-store-tax-rate");
            /*170213 jh : tax rate*/           
            if (elem.value.indexOf("(")){
            	var taxRate = elem.value.split("(");
            	elem.value = taxRate[0];
            }
            
            if (elem.value.indexOf("%")){
            	var taxRate = elem.value.split("%");
            	elem.value = taxRate[0];
            }
            
            if(elem.value < 1){
				WRPCommon.MsgBoxModule.alert({
					message: "please put a number greater than 1"
				});
            	return;
            }
            /*tax rate end*/
            
            param.taxRate = parseFloat(elem.value);
            
            param.taxRate /= 100;
            
            if (isNaN(param.taxRate)) {
				WRPCommon.MsgBoxModule.alert({
					message: "Tax Rate value contains non-numeric characters"
				});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-market-code");
            param.marketCode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-district-code");
            param.districtCode = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-asap-id");
            param.asapId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-asap-password");
            param.asapPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-qpay-id");
            param.qpayId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-qpay-password");
            param.qpayPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = document.getElementById("store-add-store-qpay-inven-id");
            param.qpayInvenId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-qpay-inven-password");
            param.qpayInvenPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-qpay-api-id");
            param.qpayApiId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-qpay-api-password");
            param.qpayApiPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-qpay-api-key");
            param.qpayApiKey = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-xbm-id");
            param.xbmId = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-add-store-xbm-password");
            param.xbmPassword = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-add-store-open-date").val();
            param.open_date = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-open-time").val();
            param.open_time = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-close-time").val();
            param.close_time = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-daily-work-hour").val();
            param.daily_work_hour = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $("#store-info-weekly-work-hour").val();
            param.weekly_work_hour = elem;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            elem = $('#check-sales-clockio-add').val();
            param.clock_in_sales_only = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
        	elem = $('#check-all-permission-add').val();
            param.all_permissions_allow = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
        	elem = $('#check-return-store-credit-add').val();
            param.return_only_store_credit = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	elem = $('#check-external-clockio-add').val();
            param.external_clockio = (elem === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("store-external-clockio-url-add");
            param.external_clockio_url = elem.value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
		try {
      		document.getElementById("loading-container").style.display = "block";
      	} catch (e) {
    		console.warn(e);
    	}

      	date = WRPCommon.TimeModule.getTime();
      	
      	param.year = date.getFullYear();
      	param.month = (date.getMonth()+1);
      	
        $.ajax({
            url: "ajax/store/addStoreInfo.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
					try {
                		document.getElementById("loading-container").style.display = "none";
                	} catch (e) {
                		console.warn(e);
                	}
                if (result === 1062) {
    				WRPCommon.MsgBoxModule.alert({
    					message: "This store id is already exists"
    				});
                }else if (result === 0) {
                	try {
                		document.getElementById("loading-container").style.display = "none";
                	} catch (e) {
                		console.warn(e);
                	}
                	
    				WRPCommon.MsgBoxModule.alert({
    					message: "Completed",
    					okBtnClick: function(){
    	                    $('#store-add-window').jqxWindow('close');
    	                    WRPAdminApp.pagescript.getStoreList();
    	                    WRPAdminApp.setAssignedStoreList();
    					}
    				});
                	
                } else if (result === 5) {
                	try {
                		document.getElementById("loading-container").style.display = "none";
                	} catch (e) {
                		console.warn(e);
                	}
    				WRPCommon.MsgBoxModule.alert({
    					message: "Error : There is not enough license."
    				});
                    return;
                } else {
                	try {
                		document.getElementById("loading-container").style.display = "none";
                	} catch (e) {
                		console.warn(e);
                	}
                	if(result === 62){
        				WRPCommon.MsgBoxModule.alert({
        					message: "Duplicated Store ID"
        				});
                		return;
                	}
    				WRPCommon.MsgBoxModule.alert({
    					message: "Error : "+result
    				});
                    return;
                } 
            }
        });
    },
    getNotificationHistory: function() {
    	
        $.ajax({
            url: "ajax/notification/getNotificationHistory.jsp",
            data: {
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
        	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		row["sid"] = result.data[i].sid;
            		row["MessageType"] = result.data[i].msgType;
            		row["Customer"] = result.data[i].customerName;
            		row["SendTo"] = result.data[i].receiver;
            		row["Content"] = result.data[i].content;
            		row["ReservationDate"] = result.data[i].reservedDate;
            		row["SendDate"] = result.data[i].sentDate;
            		row["Emp"] = result.data[i].empName;
            		row["Status"] = result.data[i].status;
            		
            		datarow[i] = row;
            	}
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "MessageType", type: "number" },
						{ name: "Customer", type: "string" },
						{ name: "SendTo", type: "string" },
						{ name: "Content", type: "string" },
						{ name: "ReservationDate", type: "date" },
						{ name: "SendDate", type: "date" },
						{ name: "Emp", type: "string" },
						{ name: "Status", type: "string" }
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-notification-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-notification-list"></div>';
            	}
    		
            	elem = $("#jqx-notification-list");
    		
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
	                		   { text: 'Message Type', datafield: 'MessageType', width: '10%', align: 'center' },
	                		   { text: 'Customer', datafield: 'Customer', width: '10%', align: 'center' },
	                		   { text: 'Send To', datafield: 'SendTo"', width: '10%', align: 'center' },
	                		   { text: 'Content', datafield: 'Content', width: '30%', align: 'center'},
	                		   { text: 'Reservvation Date', datafield: 'ReservationDate', width: '10%',filtertype: "range", cellsformat: 'MM/dd/yyyy', align: 'center'},
	                		   { text: 'Send Date', datafield: 'SendDate', width: '10%',filtertype: "range", cellsformat: 'MM/dd/yyyy', align: 'center' },
	                		   { text: 'Emp.', datafield: 'Emp', width: '10%', align: 'center'},
	                		   { text: 'Status', datafield: 'Status', width: '10%', align: 'center'},
		                     ]
            			});
            		 
            	}
            }
        });
    },
    getAllNotificationHistory: function() {
        $.ajax({
            url: "ajax/notification/getNotificationHistory.jsp",
            data: {

            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
        	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		row["sid"] = result.data[i].sid;
            		row["MessageType"] = result.data[i].msgType;
            		row["Customer"] = result.data[i].customerName;
            		row["SendTo"] = result.data[i].receiver;
            		row["Content"] = result.data[i].content;
            		row["ReservationDate"] = result.data[i].reservedDate;
            		row["SendDate"] = result.data[i].sentDate;
            		row["Emp"] = result.data[i].empName;
            		row["Status"] = result.data[i].status;
            		
            		datarow[i] = row;
            	}
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "MessageType", type: "number" },
						{ name: "Customer", type: "string" },
						{ name: "SendTo", type: "string" },
						{ name: "Content", type: "string" },
						{ name: "ReservationDate", type: "date" },
						{ name: "SendDate", type: "date" },
						{ name: "Emp", type: "string" },
						{ name: "Status", type: "string" }
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-notification-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-notification-list"></div>';
            	}
    		
            	elem = $("#jqx-notification-list");
    		
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
	                		   { text: 'Message Type', datafield: 'MessageType', width: '10%', align: 'center' },
	                		   { text: 'Customer', datafield: 'Customer', width: '10%', align: 'center' },
	                		   { text: 'Send To', datafield: 'SendTo"', width: '10%', align: 'center' },
	                		   { text: 'Content', datafield: 'Content', width: '30%', align: 'center'},
	                		   { text: 'Reservvation Date', datafield: 'ReservationDate', width: '10%',filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center'},
	                		   { text: 'Send Date', datafield: 'SendDate', width: '10%',filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center' },
	                		   { text: 'Emp.', datafield: 'Emp', width: '10%', align: 'center'},
	                		   { text: 'Status', datafield: 'Status', width: '10%', align: 'center'},
		                     ]
            			});
            	}
            }
        });
    },
    getNotificationRuleList: function() {
        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedNotificationRuleSid = 0;
        WRPAdminApp.pagescript.initNotificationRuleInfo();

        $.ajax({
            url: "ajax/notification/getNotificationRuleList.jsp",
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
            		row["sid"] = result.data[i].sid;
            		row["Description"] = result.data[i].description;
            		row["Condition"] = result.data[i].conditionStr;
            		row["SendType"] = result.data[i].sendTypeStr;
            		row["ReceiverSMS"] = result.data[i].receiverSms;
            		row["ReceiverEmail"] = result.data[i].receiverEmail;
            		
            		datarow[i] = row;
            	}
            	
            	var dataAdapter = new $.jqx.dataAdapter({
        					datatype: "json",
        					datafields: [
        						{ name: "sid", type: "number" },
        						{ name: "Description", type: "string" },
        						{ name: "Condition", type: "string" },
        						{ name: "SendType", type: "string" },
        						{ name: "ReceiverSMS", type: "string" },
        						{ name: "ReceiverEmail", type: "string" },
        					],
        					localdata: datarow
        				});
            	
            	elem = $("#jqx-notification-rule-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-notification-rule-list"></div>';
            	}
    		
            	elem = $("#jqx-notification-rule-list");
    		
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
	                		   { text: 'Description', datafield: 'Description', width: '35%', align: 'center' },
	                		   { text: 'Condition', datafield: 'Condition', width: '15%', align: 'center' },
	                		   { text: 'Send Type', datafield: 'SendType', width: '15%', align: 'center' },
	                		   { text: 'Receiver SMS', datafield: 'ReceiverSMS', width: '15%', align: 'center'},
	                		   { text: 'Receiver Email', datafield: 'ReceiverEmail', width: '20%', align: 'center'},
		                     ]
            			});
            		$("#jqx-notification-rule-list").on('rowselect', WRPAdminApp.pagescript.getNotificationRuleInfo);
            		$("#jqx-notification-rule-list").on('rowdoubleclick', WRPAdminApp.pagescript.getNotificationRulePop);
            		
    		}
            }
        });
    },
    getNotificationRuleInfo: function(event) {
        var storeId, rowdata;

        if (arguments.length < 1) {
            console.warn("no input notification rule sid");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
    		rowdata = event.args.row;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	if (!rowdata.sid) {
    		
    	}
        WRPAdminApp.pagescript._selectedNotificationRuleSid = rowdata.sid;

        $.ajax({
            url: "ajax/notification/getNotificationRuleInfo.jsp",
            data: {
                storeId: storeId,
                notificationRuleSid: WRPAdminApp.pagescript._selectedNotificationRuleSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedNotificationRuleSid = data.sid;

                try {
                    document.getElementById("store-notification-rule-desc").value = (data.description !== undefined && data.description !== null)? data.description : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-condition").value = (data.condition !== undefined && data.condition !== null)? data.condition : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    if (data.sendType !== undefined && data.sendType !== null) {
                        switch (data.sendType) {
                            case 0:
                                document.getElementById("store-notification-rule-sms-enable").checked = false;
                                document.getElementById("store-notification-rule-email-enable").checked = false;
                                break;
                            case 1:
                                document.getElementById("store-notification-rule-sms-enable").checked = true;
                                document.getElementById("store-notification-rule-email-enable").checked = false;
                                break;
                            case 2:
                                document.getElementById("store-notification-rule-sms-enable").checked = false;
                                document.getElementById("store-notification-rule-email-enable").checked = true;
                                break;
                            case 3:
                                document.getElementById("store-notification-rule-sms-enable").checked = true;
                                document.getElementById("store-notification-rule-email-enable").checked = true;
                                break;
                        }
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-recv-sms").value = (data.receiverSms !== undefined && data.receiverSms !== null)? data.receiverSms : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-recv-email").value = (data.receiverEmail !== undefined && data.receiverEmail !== null)? data.receiverEmail : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-subject-sms").value = (data.subjectSms !== undefined && data.subjectSms !== null)? data.subjectSms : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-subject-email").value = (data.subjectEmail !== undefined && data.subjectEmail !== null)? data.subjectEmail : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-content-sms").value = (data.contentSms !== undefined && data.contentSms !== null)? data.contentSms : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-content-email").value = (data.contentEmail !== undefined && data.contentEmail !== null)? data.contentEmail : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }
            }
        });
    },
    getNotificationRulePop: function(event) {
        var storeId, rowdata;

        if (arguments.length < 1) {
            console.warn("no input notification rule sid");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
    		rowdata = event.args.row.bounddata;
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	if (!rowdata.sid) {
    		
    	}
        WRPAdminApp.pagescript._selectedNotificationRuleSid = rowdata.sid;

        $.ajax({
            url: "ajax/notification/getNotificationRuleInfo.jsp",
            data: {
                storeId: storeId,
                notificationRuleSid: WRPAdminApp.pagescript._selectedNotificationRuleSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedNotificationRuleSid = data.sid;

                try {
                    document.getElementById("store-notification-rule-desc-pop").value = (data.description !== undefined && data.description !== null)? data.description : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-condition-pop").value = (data.condition !== undefined && data.condition !== null)? data.condition : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    if (data.sendType !== undefined && data.sendType !== null) {
                        switch (data.sendType) {
                            case 0:
                                document.getElementById("store-notification-rule-sms-enable-pop").checked = false;
                                document.getElementById("store-notification-rule-email-enable-pop").checked = false;
                                break;
                            case 1:
                                document.getElementById("store-notification-rule-sms-enable-pop").checked = true;
                                document.getElementById("store-notification-rule-email-enable-pop").checked = false;
                                break;
                            case 2:
                                document.getElementById("store-notification-rule-sms-enable-pop").checked = false;
                                document.getElementById("store-notification-rule-email-enable-pop").checked = true;
                                break;
                            case 3:
                                document.getElementById("store-notification-rule-sms-enable-pop").checked = true;
                                document.getElementById("store-notification-rule-email-enable-pop").checked = true;
                                break;
                        }
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-recv-sms-pop").value = (data.receiverSms !== undefined && data.receiverSms !== null)? data.receiverSms : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-recv-email-pop").value = (data.receiverEmail !== undefined && data.receiverEmail !== null)? data.receiverEmail : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-subject-sms-pop").value = (data.subjectSms !== undefined && data.subjectSms !== null)? data.subjectSms : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-subject-email-pop").value = (data.subjectEmail !== undefined && data.subjectEmail !== null)? data.subjectEmail : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-content-sms-pop").value = (data.contentSms !== undefined && data.contentSms !== null)? data.contentSms : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("store-notification-rule-content-email-pop").value = (data.contentEmail !== undefined && data.contentEmail !== null)? data.contentEmail : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }
                $('#notification-edit-window').jqxWindow('open');
            }
        });
    },
    initNotificationRuleInfo: function() {

        WRPAdminApp.pagescript._selectedNotificationRuleSid = 0;

        try {
            document.getElementById("store-notification-rule-desc").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-condition").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
             document.getElementById("store-notification-rule-sms-enable").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-email-enable").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-recv-sms").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-recv-email").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-subject-sms").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-subject-email").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-content-sms").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("store-notification-rule-content-email").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
    },
    setNotificationRuleInfo: function() {
        var data, storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        data = {};

        data.notificationRuleSid = parseInt(WRPAdminApp.pagescript._selectedNotificationRuleSid);

        if (isNaN(data.notificationRuleSid)) {
			WRPCommon.MsgBoxModule.alert({
				message: "Notification Rule Sid Error"
			});
            return;
        }

        data.storeId = storeId;

        try {
            data.description = document.getElementById("store-notification-rule-desc-pop").value;
            if (data.description.length == 0) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "Input description"
    			});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.condition = document.getElementById("store-notification-rule-condition-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }



        try {
            data.smsEnable = document.getElementById("store-notification-rule-sms-enable-pop").checked;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.emailEnable = document.getElementById("store-notification-rule-email-enable-pop").checked;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (data.smsEnable === true && data.emailEnable === true) {
            data.sendType = 3;
        } else if (data.smsEnable === true) {
            data.sendType = 1;
        } else if (data.emailEnable === true) {
            data.sendType = 2;
        } else {
            data.sendType = 0;
        }

        data.smsEnable = undefined;
        delete data.smsEnable;
        data.emailEnable = undefined;
        delete data.emailEnable;

        try {
            data.receiverSms = document.getElementById("store-notification-rule-recv-sms-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.receiverEmail = document.getElementById("store-notification-rule-recv-email-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.subjectSms = document.getElementById("store-notification-rule-subject-sms-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.subjectEmail = document.getElementById("store-notification-rule-subject-email-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.contentSms = document.getElementById("store-notification-rule-content-sms-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.contentEmail = document.getElementById("store-notification-rule-content-email-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/notification/setNotificationRuleInfo.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Completed",
        				okBtnClick: function(){
                            $('#notification-edit-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getNotificationRuleList();
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
   /*170210 jh : getMonthlyGoal*/
    getMonthlyGoal: function(store_id) {
    	
    	if (store_id.length < 1) {
            return;
        }
    	
        $.ajax({
        	url: "ajax/store/getMonthlyGoal.jsp",
        	data: {
        		storeId: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj;
        		data = result.data;
        		
        		if (!data) return;
        		
        		elem = $("#jqx-monthly-goal-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");		
    				}
    			}
        	}
        });
    },
    openAddMonthlyGoal: function(){
    	var store_id;
    	
    	store_id = WRPAdminApp.pagescript._selectedMonthlyStoreId;
    	
    	if(store_id == null) { 
			WRPCommon.MsgBoxModule.alert({
				message: "Select Store"
			});
			return; 
		}
    	
    	document.getElementById("add-box-goal").value = "";
    	document.getElementById("add-accessory-goal").value = "";
    	document.getElementById("add-mrc-goal").value = "";
    	
    	$('#mothly-add-window').jqxWindow('open');
    	
    },
    setMonthlyGoal: function() {
    	var data, storeId = WRPAdminApp.pagescript._selectedMonthlyStoreId;
    	
    	if(storeId == null) { 
			WRPCommon.MsgBoxModule.alert({
				message: "Select Store"
			});
			return; 
		}
    	
    	try {
            var box = document.getElementById("add-box-goal").value;
            if(box.length < 1){
				WRPCommon.MsgBoxModule.alert({
					message: "Input Box Goal"
				});
                return;
            }else if (isNaN(box)) {
				WRPCommon.MsgBoxModule.alert({
					message: "Box Goal value contains non-numeric characters"
				});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        try {
            var accessory = document.getElementById("add-accessory-goal").value;
            if(accessory.length < 1){
				WRPCommon.MsgBoxModule.alert({
					message: "Input Accessory Goal"
				});
                return;
            }else if (isNaN(accessory)) {
				WRPCommon.MsgBoxModule.alert({
					message: "Accessory Goal value contains non-numeric characters"
				});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            var mrc = document.getElementById("add-mrc-goal").value;
            if(mrc.length < 1){
				WRPCommon.MsgBoxModule.alert({
					message: "Input MRC Goal"
				});
                return;
            }else if (isNaN(mrc)) {
				WRPCommon.MsgBoxModule.alert({
					message: "MRC Goal value contains non-numeric characters"
				});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            var date = $('#add-date-goal').jqxDateTimeInput('getDate');
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/store/setMonthlyGoal.jsp",
        	data: {
        		storeId:  WRPAdminApp.pagescript._selectedMonthlyStoreId,
        		box: box,
        		accessory: accessory,
        		mrc: mrc,
        		date: date
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj;
        		data = result.data;
        		

    			WRPCommon.MsgBoxModule.alert({
    				message: "Completed",
    				okBtnClick: function(){
    	    			$('#mothly-add-window').jqxWindow('close');
    	    			WRPAdminApp.pagescript.getMonthlyGoal(storeId);
    				}
    			});
    			
        	}
        });
    },
    updateMonthlyGoal: function() {
    	var data, storeId = WRPAdminApp.pagescript._selectedMonthlyStoreId;
    	
    	if(storeId == null) { 
			WRPCommon.MsgBoxModule.alert({
				message: "Select Store!"
			});
			return; 
		}
    	
    	var sid = WRPAdminApp.pagescript._selectedMonthlyGoal;
    	
    	try {
            var box = document.getElementById("edit-box-goal").value;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        try {
            var accessory = document.getElementById("edit-accessory-goal").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            var mrc = document.getElementById("edit-mrc-goal").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            var date = $('#edit-date-goal').jqxDateTimeInput('getDate');
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/store/updateMonthlyGoal.jsp",
        	data: {
        		storeId:  WRPAdminApp.pagescript._selectedMonthlyStoreId,
        		box: box,
        		accessory: accessory,
        		mrc: mrc,
        		date: date,
        		sid: sid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj;
        		data = result.data;
        		
        		WRPCommon.MsgBoxModule.alert({
    				message: "Completed",
    				okBtnClick: function(){
    	    			$('#mothly-edit-window').jqxWindow('close');
    	    			WRPAdminApp.pagescript.getMonthlyGoal(storeId);
    				}
    			});
        	}
        });
    },
    getLicense: function(){
    	$.ajax({
            url: "ajax/store/getLicense.jsp",
            data: {
            	store_id : document.getElementById("select-store").value
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	if(!result.data) return;
            	
            	WRPAdminApp.pagescript._store = result.data.c_store;
            	WRPAdminApp.pagescript._license = result.data.license;
            	if($("#license"))	$("#license").html(WRPAdminApp.pagescript._license);
            	if($("#active"))	$("#active").html(WRPAdminApp.pagescript._store);
            }
        });
    }
};