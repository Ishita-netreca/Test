/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
    	try {
			WRPComponents('div[pagename="eod"] > .page-submenu-container > .submenu[panelname="eod_list"]').addShadowedImage('img/icon/eod_01.png');
		} catch (e) {
			
		}
		try {
			WRPComponents('div[pagename="eod"] > .page-submenu-container > .submenu[panelname="store_open"]').addShadowedImage('img/icon/icon_storeopen.png');
		} catch (e) {
			
		}
		
		var components = $("#jqx-eod-grid");
		if(components){
			components.jqxGrid(
        		{
                	width: '100%',
                	height: '100%',
                	source: new $.jqx.dataAdapter({
       				datatype: "json",
    					datafields: [
    						{ name: "eodDate", type: "date" },
    						{ name: "posNo", type: "string" },
    						{ name: "updateTime", type: "date" },
    						{ name: "user_id", type: "string" },
    					],
                	   }),
                	showfilterrow: false,
                	filterable: true,
                	sortable: true,
                	columnsresize:true,
                	theme: 'arctic',
                	columns: [
                		{ text: 'EOD Date', datafield: 'eodDate', width: '25%',filtertype: "range", cellsformat: 'MM/dd/yyyy', align: 'center' },
                		{ text: 'Update Time', datafield: 'updateTime', width: '25%', filtertype: "range", cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
                		{ text: 'Updater', datafield: 'user_id', width: '25%', align: 'center' },
                		{ text: 'Station', datafield: 'posNo', width: '25%', align: 'center'}
	                 ]
        		});
			components.on('rowselect', WRPAdminApp.pagescript.getEODInfo);
		}
		
		components = $("#jqx-store-open-grid");
		if(components){
			components.jqxGrid(
	        		{
	                	width: '100%',
	                	height: '100%',
	                	source: new $.jqx.dataAdapter({
	       				datatype: "json",
	    					datafields: [
	    						{ sid: "updateDate", type: "number" },
	    						{ name: "updateDate", type: "date" },
	    						{ name: "pos_no", type: "string" },
	    						{ name: "updateTime", type: "date" },
	    						{ name: "user_id", type: "string" },
	    					],
	                	   }),
	                	showfilterrow: false,
	                	filterable: true,
	                	sortable: true,
	                	columnsresize:true,
	                	theme: 'arctic',
	                	columns: [
	                		{ text: 'sid', datafield: 'sid', hidden:true},
	                		{ text: 'Date', datafield: 'updateDate', width: '25%',filtertype: "range", cellsformat: 'MM/dd/yyyy', align: 'center' },
	                		{ text: 'Update Time', datafield: 'updateTime', width: '25%', filtertype: "range", cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
	                		{ text: 'Update User', datafield: 'user_id', width: '25%', align: 'center' },
	                		{ text: 'POS Number', datafield: 'pos_no', width: '25%', align: 'center'}
		                 ]
	        		});	
			components.on('rowselect', WRPAdminApp.pagescript.getStoreOpenInfo);
		}
		
		components = $("#jqx-store-open-details-grid");
		if(components){
			components.jqxGrid(
	        		{
	                	width: '100%',
	                	height: '100%',
	                	source: new $.jqx.dataAdapter({
	       				datatype: "json",
	    					datafields: [
	    						{ name: "cash_count_100", type: "number" },
	    						{ name: "cash_count_50", type: "number" },
	    						{ name: "cash_count_20", type: "number" },
	    						{ name: "cash_count_10", type: "number" },
	    						{ name: "cash_count_5", type: "number" },
	    						{ name: "cash_count_1", type: "number" },
	    						{ name: "cash_count_025", type: "number" },
	    						{ name: "cash_count_010", type: "number" },
	    						{ name: "cash_count_005", type: "number" },
	    						{ name: "cash_count_001", type: "number" },
	    						{ name: "total", type: "number" },
	    					],
	                	   }),
	                	showfilterrow: false,
	                	filterable: true,
	                	sortable: true,
	                	columnsresize:true,
	                	theme: 'arctic',
	                	columns: [
	                		{ text: '$100', datafield: 'cash_count_100', align: 'center'},
	                		{ text: '$50', datafield: 'cash_count_50', align: 'center'},
	                		{ text: '$20', datafield: 'cash_count_20', align: 'center'},
	                		{ text: '$10', datafield: 'cash_count_10', align: 'center'},
	                		{ text: '$5', datafield: 'cash_count_5', align: 'center'},
	                		{ text: '$1', datafield: 'cash_count_1', align: 'center'},
	                		{ text: '$0.25', datafield: 'cash_count_025', align: 'center'},
	                		{ text: '$0.10', datafield: 'cash_count_010', align: 'center'},
	                		{ text: '$0.05', datafield: 'cash_count_005', align: 'center'},
	                		{ text: '$0.01', datafield: 'cash_count_001', align: 'center'},
	                		{ text: 'Total', datafield: 'total', cellsformat:'c2', cellsalign:'right', align: 'center'},
		                 ]
	        		});			
		}
		//jqx button
		$("#excel-eod-grid").click(function () {
            $("#jqx-eod-grid").jqxGrid('exportdata', 'xls', 'jqx-EndOfDay-list');
        });
		
		$("#excel-store-open-grid").click(function () {
			$("#jqx-store-open-grid").jqxGrid('exportdata', 'xls', 'jqx-StoreOpen-list');
        });
		
		//jqx radio
		$('#eod-radio-1').on('checked', function (event) {
            var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#eod-start-date").jqxDateTimeInput('setDate', start);
				$("#eod-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#eod-radio-2').on('checked', function (event) {
			 var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#eod-start-date").jqxDateTimeInput('setDate', start);
				$("#eod-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#eod-radio-3').on('checked', function (event) {
			 var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#eod-start-date").jqxDateTimeInput('setDate', start);
				$("#eod-end-date").jqxDateTimeInput('setDate', end);
		 });
		
		 $('#store-open-radio-1').on('checked', function (event) {
            var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#store-open-start-date").jqxDateTimeInput('setDate', start);
				$("#store-open-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#store-open-radio-2').on('checked', function (event) {
			 var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#store-open-start-date").jqxDateTimeInput('setDate', start);
				$("#store-open-end-date").jqxDateTimeInput('setDate', end);
		 });
		 
		 $('#store-open-radio-3').on('checked', function (event) {
			 var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#store-open-start-date").jqxDateTimeInput('setDate', start);
				$("#store-open-end-date").jqxDateTimeInput('setDate', end);
		 });
			 
		 $('#eod-radio-1').jqxRadioButton('check');
		 $('#store-open-radio-1').jqxRadioButton('check');
		//int func
        WRPAdminApp.pagescript.getEODLogList();
        WRPAdminApp.pagescript.getStoreOpenList();
    },
    printEOD: function(){
    	var printContent = document.getElementById('eod-detail-view');
        var windowUrl = 'EOD report';
        var windowName = 'Print';
        var printWindow = window.open(windowUrl, windowName, 'left=300,width=900,height=800');
        printWindow.document.write('<html><head><title>EOD Print</title><link rel="stylesheet" type="text/css" href="main.pages.less.1200.css?timestamp='+WRPAdminApp.convertDateToString(new Date(), "yyyyMMddHHmmss"));
        printWindow.document.write('"/></head><body>');
        printWindow.document.write('<div id="eod-print-area">');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</div></body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(function() { printWindow.print();printWindow.close(); }, 600);
    },
    getEODLogList: function() {
        var storeId, start_date, end_date;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        start_date = new Date($("#eod-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
	    start_date = WRPAdminApp.toDecimalFormat((start_date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(start_date.getDate(), "00") + "/" + start_date.getFullYear();
	    end_date = new Date($("#eod-end-date").jqxDateTimeInput('getDate'));
	    end_date = WRPAdminApp.toDecimalFormat((end_date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(end_date.getDate(), "00") + "/" + end_date.getFullYear();//"11/30/2016";
        
        $.ajax({
            url: "ajax/eod/getEODLogList.jsp",
            data: {
                storeId: storeId,
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-eod-grid");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
            }
        });
    },
    initEODInfo: function() {
		
		try {
			document.getElementById("eod-report-eod-date").innerHTML = '';
		} catch (e) {
			console.warn(e);
		}
		
		try {
			document.getElementById("eod-report-cash-sales-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-cash-refund-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-cash-floating-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-cash-actual-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-cash-nettotal-amount").innerHTML = "$0.00";
			document.getElementById("eod-report-cash-total-variance").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}        		
		
		/*try {
			document.getElementById("eod-report-check-sales-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-check-refund-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-check-floating-amount").innerHTML = "$0.00";	
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-check-actual-amount").innerHTML = "$0.00";	
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {       				 
			document.getElementById("eod-report-check-nettotal-amount").innerHTML = "$0.00";   
			document.getElementById("eod-report-check-variance-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		} */
		
		
		try {
			document.getElementById("eod-report-cash-out-actual-amount").innerHTML = "$0.00"; 			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-expense-actual-amount").innerHTML = "$0.00";    			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-credit-sales-amount").innerHTML = "$0.00";      			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-credit-refund-amount").innerHTML = "$0.00"; 			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-credit-actual-amount").innerHTML = "$0.00";		
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-credit-nettotal-amount").innerHTML = "$0.00";   				 
    		document.getElementById("eod-report-credit-variance-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		} 
		
		try {
			document.getElementById("eod-report-debit-sales-amount").innerHTML = "$0.00";		
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-debit-refund-amount").innerHTML = "$0.00";			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-debit-actual-amount").innerHTML = "$0.00"; 			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-debit-nettotal-amount").innerHTML = "$0.00";
			document.getElementById("eod-report-debit-variance-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		} 
		
		try {
			document.getElementById("eod-report-finance-sales-amount").innerHTML = "$0.00";  			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-finance-refund-amount").innerHTML = "$0.00";		
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-finance-actual-amount").innerHTML = "$0.00";			
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-finance-nettotal-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		} 
		
		
		try {
			document.getElementById("eod-report-total-sales-amount").innerHTML = "$0.00";
			document.getElementById("eod-report-total-refund-amount").innerHTML = "$0.00";
			document.getElementById("eod-report-total-nettotal-amount").innerHTML = "$0.00";
			document.getElementById("eod-report-total-system-total").innerHTML = "$0.00";
			document.getElementById("eod-report-total-variance-amount").innerHTML = "$0.00";
			document.getElementById("eod-report-total-actual-amount").innerHTML = "$0.00";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		/*try {
			document.getElementById("eod-report-cash-count-100").innerHTML = "0";
			document.getElementById("eod-report-cash-count-50").innerHTML = "0";
			document.getElementById("eod-report-cash-count-20").innerHTML = "0";
			document.getElementById("eod-report-cash-count-10").innerHTML = "0";
			document.getElementById("eod-report-cash-count-5").innerHTML = "0";
			document.getElementById("eod-report-cash-count-1").innerHTML = "0";
			document.getElementById("eod-report-cash-count-025").innerHTML = "0";
			document.getElementById("eod-report-cash-count-010").innerHTML = "0";
			document.getElementById("eod-report-cash-count-005").innerHTML = "0";
			document.getElementById("eod-report-cash-count-001").innerHTML = "0";
			document.getElementById("eod-report-coin-count-1").innerHTML = "0";
			document.getElementById("eod-report-coin-count-050").innerHTML = "0";
			document.getElementById("eod-report-roll-count-025").innerHTML = "0";
			document.getElementById("eod-report-roll-count-010").innerHTML = "0";
			document.getElementById("eod-report-roll-count-005").innerHTML = "0";
			document.getElementById("eod-report-roll-count-001").innerHTML = "0";
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("eod-report-sales-new").innerHTML = "0";
			document.getElementById("eod-report-sales-upgrade").innerHTML = "0";
			document.getElementById("eod-report-sales-reactivation").innerHTML = "0";
			document.getElementById("eod-report-sales-total").innerHTML = "0";
		} catch (e) {
			console.warn(e);
			return;
		}*/
    },
    getEODInfo: function(event) {
    	var storeId, rowdata, eodDate;
    	
    	WRPAdminApp.pagescript.initEODInfo();

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        rowdata = event.args.row;
        eodDate = $.jqx.dataFormat.formatdate(rowdata.eodDate, 'MM/dd/yyyy');
    	$.ajax({
        	url: "ajax/eod/getEODInfo.jsp",
        	data: {
        		storeId: storeId,
        		eodDate: eodDate,
        		posNo: rowdata.posNo
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var elem, elem2, data, innerHTML, tmp, tmp2, total;
        		data = result.data;
        		if (!data) {
        			return;
        		}
        		
        		try {
        			document.getElementById("eod-report-eod-date").innerHTML = data.eod_date;
        		} catch (e) {
        			console.warn(e);
        		}
        		
        		try {
        			document.getElementById("eod-report-eod-note").innerHTML = data.eod_note;
        		} catch (e) {
        			console.warn(e);
        		}
        		
        		total = {
        			sales: 0,
        			refund: 0,
        			nettotal: 0,
        			floating: 0,
        			variance: 0,
        			actual: 0,
        			system: 0
        		};
        		
        		try {
        			elem = document.getElementById("eod-report-cash-sales-amount");
        			elem2 = document.getElementById("eod-report-cash-total-sales");
        			if (data.cash_sales_amount >= 0) {
        				elem.innerHTML = "$" + data.cash_sales_amount.toFixed(2);
        				elem2.innerHTML = "$" + data.cash_sales_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.cash_sales_amount).toFixed(2)+")";
        				elem2.innerHTML = "($" + (-data.cash_sales_amount).toFixed(2)+")";
        			}
        			
        			total.sales = total.sales + data.cash_sales_amount;
        			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-cash-refund-amount");
        			elem2 = document.getElementById("eod-report-cash-total-return");
        			
        			if (data.cash_refund_amount >= 0) {
        				elem.innerHTML = "$" + data.cash_refund_amount.toFixed(2);
        				elem2.innerHTML = "$" + data.cash_refund_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.cash_refund_amount).toFixed(2)+")";
        				elem2.innerHTML = "($" + (-data.cash_refund_amount).toFixed(2)+")";
        			}        
        			
        			total.refund = total.refund + data.cash_refund_amount;
        			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-cash-floating-amount");
        			elem2 = document.getElementById("eod-report-cash-total-floating");
        			if (data.cash_floating_amount >= 0) {
        				elem.innerHTML = "$" + data.cash_floating_amount.toFixed(2);
        				elem2.innerHTML = "$" + data.cash_floating_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.cash_floating_amount).toFixed(2)+")";
        				elem2.innerHTML = "($" + (-data.cash_floating_amount).toFixed(2)+")";
        			}        			
        			
        			total.floating = total.floating + data.cash_floating_amount;
        			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-cash-actual-amount");
        			if (data.cash_actual_amount >= 0) {
        				elem.innerHTML = "$" + data.cash_actual_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.cash_actual_amount).toFixed(2)+")";
        			}        			
        			
        			total.actual = total.actual + data.cash_actual_amount;
        			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			if (data.cash_sales_amount !== undefined && data.cash_refund_amount !== undefined) {        				 
        				elem = document.getElementById("eod-report-cash-nettotal-amount");   
        				elem2 = document.getElementById("eod-report-cash-total-net-total");   
        				tmp = data.cash_sales_amount + data.cash_refund_amount; // refund (-)   
        				
        				if (tmp >= 0) {
        					elem.innerHTML = "$"+tmp.toFixed(2);
        					elem2.innerHTML = "$"+tmp.toFixed(2);
        				} else {
        					elem.innerHTML = "($"+(-tmp).toFixed(2)+")";
        					elem2.innerHTML = "($"+(-tmp).toFixed(2)+")";
        				}   
        				
        				total.nettotal = total.nettotal + tmp;
        				
        			}
        		} catch (e) {
        			console.warn(e);
        			return;
        		}   
        		
        		try {
        			if (data.cash_floating_amount !== undefined) {        				 
        				elem = document.getElementById("eod-report-cash-system-total");   
        				elem2 = document.getElementById("eod-report-cash-total-system-total");   
        				tmp2 = data.cash_floating_amount + tmp;
        				
        				if (tmp2 >= 0) {
        					elem.innerHTML = "$"+tmp2.toFixed(2);
        					elem2.innerHTML = "$"+tmp2.toFixed(2);
        				} else {
        					elem.innerHTML = "($"+(-tmp2).toFixed(2)+")";
        					elem2.innerHTML = "($"+(-tmp2).toFixed(2)+")";
        				}
        				
        				total.system = total.system + tmp2;
        			}
        		} catch (e) {
        			console.warn(e);
        			return;
        		}  
        		
        		try {
        			elem = document.getElementById("eod-report-cash-out-actual-amount");
        			if (data.cash_out_actual_amount >= 0) {
        				elem.innerHTML = "$" + data.cash_out_actual_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.cash_out_actual_amount).toFixed(2)+")";
        			}    
        			total.actual = total.actual + data.cash_out_actual_amount;		     			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-expense-actual-amount");
        			if (data.expense_actual_amount >= 0) {
        				elem.innerHTML = "$" + data.expense_actual_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.expense_actual_amount).toFixed(2)+")";
        			}      
        			total.actual = total.actual + data.expense_actual_amount;		    			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-cash-total-physical-total");
        			tmp = data.cash_actual_amount + data.cash_out_actual_amount + data.expense_actual_amount;
        			if (tmp >= 0) {
        				elem.innerHTML = "$" + tmp.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-tmp).toFixed(2)+")";
        			}      
        		} catch (e) {
        			console.warn(e);
        			return;
        		}

        		try {
        			elem = document.getElementById("eod-report-cash-total-variance");
        			tmp = tmp - tmp2;
        			if (tmp < 0) {
        				elem.style.color = "rgba(255,0,0,1)";
        			} else {
        				elem.style.color = "rgba(0,0,0,1)";
        			}
        			elem.innerHTML = ((tmp >= 0)? "$"+tmp.toFixed(2) : "($"+(-tmp).toFixed(2)+")");
        			total.variance = total.variance + tmp;
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-credit-sales-amount");
        			if (data.credit_sales_amount >= 0) {
        				elem.innerHTML = "$" + data.credit_sales_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.credit_sales_amount).toFixed(2)+")";
        			}    
        			total.sales = total.sales + data.credit_sales_amount;		        			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-credit-refund-amount");
        			if (data.credit_refund_amount >= 0) {
        				elem.innerHTML = "$" + data.credit_refund_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.credit_refund_amount).toFixed(2)+")";
        			}      
        			total.refund = total.refund + data.credit_refund_amount;		  			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-credit-actual-amount");
        			if (data.credit_actual_amount >= 0) {
        				elem.innerHTML = "$" + data.credit_actual_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.credit_actual_amount).toFixed(2)+")";
        			}       
        			total.actual = total.actual + data.credit_actual_amount;	 			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			if (data.credit_sales_amount !== undefined && data.credit_refund_amount !== undefined) {        				 
        				elem = document.getElementById("eod-report-credit-nettotal-amount");
        				elem2 = document.getElementById("eod-report-credit-system-total");
        				tmp = data.credit_sales_amount + data.credit_refund_amount; // refund (-)    
        				if (tmp >= 0) {
        					elem.innerHTML = "$"+tmp.toFixed(2);
        					elem2.innerHTML = "$"+tmp.toFixed(2);
        				} else {
        					elem.innerHTML = "($"+(-tmp).toFixed(2)+")";
        					elem2.innerHTML = "($"+(-tmp).toFixed(2)+")";
        				}  
            			total.nettotal = total.nettotal + tmp;
            			total.system = total.system + tmp;
            			if (data.credit_actual_amount !== undefined) {        				 
            				elem = document.getElementById("eod-report-credit-variance-amount");   
            				tmp = data.credit_actual_amount - tmp; // refund (-)    
            				if (tmp < 0) {
            					elem.style.color = "rgba(255,0,0,1)";
            				} else {
            					elem.style.color = "rgba(0,0,0,1)";
            				}
            				elem.innerHTML = ((tmp >= 0)? "$"+tmp.toFixed(2) : "($"+(-tmp).toFixed(2)+")"); 
                			total.variance = total.variance + tmp;	 
            			}
        			}
        		} catch (e) {
        			console.warn(e);
        			return;
        		} 
        		
        		try {
        			elem = document.getElementById("eod-report-debit-sales-amount");
        			if (data.debit_sales_amount >= 0) {
        				elem.innerHTML = "$" + data.debit_sales_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.debit_sales_amount).toFixed(2)+")";
        			}        
        			total.sales = total.sales + data.debit_sales_amount;				
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-debit-refund-amount");
        			if (data.debit_refund_amount >= 0) {
        				elem.innerHTML = "$" + data.debit_refund_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.debit_refund_amount).toFixed(2)+")";
        			}     
        			total.refund = total.refund + data.debit_refund_amount;	  			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-debit-actual-amount");
        			if (data.debit_actual_amount >= 0) {
        				elem.innerHTML = "$" + data.debit_actual_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.debit_actual_amount).toFixed(2)+")";
        			}       
        			total.actual = total.actual + data.debit_actual_amount;	  	 			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			if (data.debit_sales_amount !== undefined && data.debit_refund_amount !== undefined) {        				 
        				elem = document.getElementById("eod-report-debit-nettotal-amount");   
        				elem2 = document.getElementById("eod-report-debit-system-total");   
        				tmp = data.debit_sales_amount + data.debit_refund_amount; // refund (-)    
        				if (tmp >= 0) {
        					elem.innerHTML = "$"+tmp.toFixed(2);
        					elem2.innerHTML = "$"+tmp.toFixed(2);
        				} else {
        					elem.innerHTML = "($"+(-tmp).toFixed(2)+")";
        					elem2.innerHTML = "($"+(-tmp).toFixed(2)+")";
        				}    
            			total.nettotal = total.nettotal + tmp;	
            			total.system = total.system + tmp;
            			if (data.debit_actual_amount !== undefined) {        				 
            				elem = document.getElementById("eod-report-debit-variance-amount");   
            				tmp = data.debit_actual_amount - tmp; // refund (-)    
            				if (tmp < 0) {
            					elem.style.color = "rgba(255,0,0,1)";
            				} else {
            					elem.style.color = "rgba(0,0,0,1)";
            				}
            				elem.innerHTML = ((tmp >= 0)? "$"+tmp.toFixed(2) : "($"+(-tmp).toFixed(2)+")"); 
                			total.variance = total.variance + tmp;	 
            			} 
        			}
        		} catch (e) {
        			console.warn(e);
        			return;
        		} 
        		
        		try {
        			elem = document.getElementById("eod-report-finance-sales-amount");
        			if (data.finance_sales_amount >= 0) {
        				elem.innerHTML = "$" + data.finance_sales_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.finance_sales_amount).toFixed(2)+")";
        			}     
        			total.sales = total.sales + data.finance_sales_amount;	    			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-finance-refund-amount");
        			if (data.finance_refund_amount >= 0) {
        				elem.innerHTML = "$" + data.finance_refund_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.finance_refund_amount).toFixed(2)+")";
        			}        
        			total.refund = total.refund + data.finance_refund_amount;				
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-finance-actual-amount");
        			if (data.finance_actual_amount >= 0) {
        				elem.innerHTML = "$" + data.finance_actual_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.finance_actual_amount).toFixed(2)+")";
        			}        	
        			total.actual = total.actual + data.finance_actual_amount;					
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			if (data.finance_sales_amount !== undefined && data.finance_refund_amount !== undefined) {        				 
        				elem = document.getElementById("eod-report-finance-nettotal-amount");   
        				elem2 = document.getElementById("eod-report-finance-system-total");   
        				tmp = data.finance_sales_amount + data.finance_refund_amount; // refund (-)    
        				if (tmp >= 0) {
        					elem.innerHTML = "$"+tmp.toFixed(2);
        					elem2.innerHTML = "$"+tmp.toFixed(2);
        				} else {
        					elem.innerHTML = "($"+(-tmp).toFixed(2)+")";
        					elem2.innerHTML = "($"+(-tmp).toFixed(2)+")";
        				}  
            			total.nettotal = total.nettotal + tmp;	
            			total.system = total.system + tmp;	
            			if (data.finance_actual_amount !== undefined) {        				 
            				elem = document.getElementById("eod-report-finance-variance");   
            				tmp = data.finance_actual_amount - tmp; // refund (-)    
            				if (tmp < 0) {
            					elem.style.color = "rgba(255,0,0,1)";
            				} else {
            					elem.style.color = "rgba(0,0,0,1)";
            				}
            				elem.innerHTML = ((tmp >= 0)? "$"+tmp.toFixed(2) : "($"+(-tmp).toFixed(2)+")"); 
                			total.variance = total.variance + tmp;	 
            			} 	  
        			}
        		} catch (e) {
        			console.warn(e);
        			return;
        		} 
        		
        	
        		try {
        			elem = document.getElementById("eod-report-total-sales-amount");
        			if (total.sales >= 0) {
        				elem.innerHTML = "$"+total.sales.toFixed(2);
        			} else {
        				elem.innerHTML = "($"+(-total.sales).toFixed(2)+")";
        			}
        			
        			elem = document.getElementById("eod-report-total-refund-amount");
        			if (total.refund >= 0) {
        				elem.innerHTML = "$"+total.refund.toFixed(2);
        			} else {
        				elem.innerHTML = "($"+(-total.refund).toFixed(2)+")";
        			}
        			
        			elem = document.getElementById("eod-report-total-nettotal-amount");
        			if (total.nettotal >= 0) {
        				elem.innerHTML = "$"+total.nettotal.toFixed(2);
        			} else {
        				elem.innerHTML = "($"+(-total.nettotal).toFixed(2)+")";
        			}
        			
        			elem = document.getElementById("eod-report-total-variance-amount");
        			if (total.variance >= 0) {
        				elem.innerHTML = "$"+total.variance.toFixed(2);
        			} else {
        				elem.innerHTML = "($"+(-total.variance).toFixed(2)+")";
        			}
        			
        			elem = document.getElementById("eod-report-total-actual-amount");
        			if (total.actual >= 0) {
        				elem.innerHTML = "$"+total.actual.toFixed(2);
        			} else {
        				elem.innerHTML = "($"+(-total.actual).toFixed(2)+")";
        			}
        			
        			elem = document.getElementById("eod-report-total-system-total");
        			if (total.system >= 0) {
        				elem.innerHTML = "$"+total.system.toFixed(2);
        			} else {
        				elem.innerHTML = "($"+(-total.system).toFixed(2)+")";
        			}
        			
        			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-qpay-sales");
        			if (data.qpay_sales_amount >= 0) {
        				elem.innerHTML = "$" + data.qpay_sales_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.qpay_sales_amount).toFixed(2)+")";
        			}     
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-qpay-return");
        			if (data.qpay_refund_amount >= 0) {
        				elem.innerHTML = "$" + data.qpay_refund_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.qpay_refund_amount).toFixed(2)+")";
        			}        
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-qpay-web-total");
        			if (data.qpay_actual_amount >= 0) {
        				elem.innerHTML = "$" + data.qpay_actual_amount.toFixed(2);
        			} else {
        				elem.innerHTML = "($" + (-data.qpay_actual_amount).toFixed(2)+")";
        			}        	
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			if (data.qpay_sales_amount !== undefined && data.qpay_refund_amount !== undefined) {        				 
        				elem = document.getElementById("eod-report-qpay-net-total");   
        				elem2 = document.getElementById("eod-report-qpay-total");   
        				tmp = data.qpay_sales_amount + data.qpay_refund_amount; // refund (-)    
        				if (tmp >= 0) {
        					elem.innerHTML = "$"+tmp.toFixed(2);
        					elem2.innerHTML = "$"+tmp.toFixed(2);
        				} else {
        					elem.innerHTML = "($"+(-tmp).toFixed(2)+")";
        					elem2.innerHTML = "($"+(-tmp).toFixed(2)+")";
        				}  

        				if (data.qpay_actual_amount !== undefined) {        				 
            				elem = document.getElementById("eod-report-qpay-variance");   
            				tmp = data.qpay_actual_amount - tmp; // refund (-)    
            				if (tmp < 0) {
            					elem.style.color = "rgba(255,0,0,1)";
            				} else {
            					elem.style.color = "rgba(0,0,0,1)";
            				}
            				elem.innerHTML = ((tmp >= 0)? "$"+tmp.toFixed(2) : "($"+(-tmp).toFixed(2)+")"); 
            			} 	  
        			}
        		} catch (e) {
        			console.warn(e);
        			return;
        		} 
        		
        		/*try {
        			elem = document.getElementById("eod-report-cash-count-100");
        			elem.innerHTML = "$"+(data.cash_count_100 !== undefined && data.cash_count_100)? data.cash_count_100: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-50");
        			elem.innerHTML = "$"+(data.cash_count_50 !== undefined && data.cash_count_50)? data.cash_count_50: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-20");
        			elem.innerHTML = "$"+(data.cash_count_20 !== undefined && data.cash_count_20)? data.cash_count_20: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-10");
        			elem.innerHTML = "$"+(data.cash_count_10 !== undefined && data.cash_count_10)? data.cash_count_10: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-5");
        			elem.innerHTML = "$"+(data.cash_count_5 !== undefined && data.cash_count_5)? data.cash_count_5: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-1");
        			elem.innerHTML = "$"+(data.cash_count_1 !== undefined && data.cash_count_1)? data.cash_count_1: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-025");
        			elem.innerHTML = "$"+(data.cash_count_0_25 !== undefined && data.cash_count_0_25)? data.cash_count_0_25: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-010");
        			elem.innerHTML = "$"+(data.cash_count_0_10 !== undefined && data.cash_count_0_10)? data.cash_count_0_10: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-005");
        			elem.innerHTML = "$"+(data.cash_count_0_05 !== undefined && data.cash_count_0_05)? data.cash_count_0_05: 0;
        			
        			elem = document.getElementById("eod-report-cash-count-001");
        			elem.innerHTML = "$"+(data.cash_count_0_01 !== undefined && data.cash_count_0_01)? data.cash_count_0_01: 0;

        			elem = document.getElementById("eod-report-coin-count-1");
        			elem.innerHTML = "$"+(data.coin_count_1 !== undefined && data.coin_count_1)? data.coin_count_1: 0;
        			
        			elem = document.getElementById("eod-report-coin-count-050");
        			elem.innerHTML = "$"+(data.coin_count_0_5 !== undefined && data.coin_count_0_5)? data.coin_count_0_5: 0;

        			elem = document.getElementById("eod-report-roll-count-025");
        			elem.innerHTML = "$"+(data.roll_count_0_25 !== undefined && data.roll_count_0_25)? data.roll_count_0_25: 0;
        			
        			elem = document.getElementById("eod-report-roll-count-010");
        			elem.innerHTML = "$"+(data.roll_count_0_10 !== undefined && data.roll_count_0_10)? data.roll_count_0_10: 0;
        			
        			elem = document.getElementById("eod-report-roll-count-005");
        			elem.innerHTML = "$"+(data.roll_count_0_05 !== undefined && data.roll_count_0_05)? data.roll_count_0_05: 0;
        			
        			elem = document.getElementById("eod-report-roll-count-001");
        			elem.innerHTML = "$"+(data.roll_count_0_01 !== undefined && data.roll_count_0_01)? data.roll_count_0_01: 0;
        			
        		} catch (e) {
        			console.warn(e);
        			return;
        		}
        		
        		try {
        			elem = document.getElementById("eod-report-sales-new");
        			if(data.new_activation_count>0)
        			elem.innerHTML = (data.new_activation_count !== undefined && data.new_activation_count)? data.new_activation_count: 0
        			
        			elem = document.getElementById("eod-report-sales-upgrade");
        			elem.innerHTML = (data.re_activation_count !== undefined && data.re_activation_count)? data.re_activation_count: 0
        			
        			elem = document.getElementById("eod-report-sales-reactivation");
        			elem.innerHTML = (data.upgrade_count !== undefined && data.upgrade_count)? data.upgrade_count: 0
        			
        			elem = document.getElementById("eod-report-sales-total");
        			//elem.innerHTML = "$"+(data.cash_count_10 !== undefined && data.cash_count_10)? data.cash_count_10: 0
        			if (data.new_activation_count !== undefined && data.re_activation_count !== undefined && data.upgrade_count !== undefined) {
        				elem.innerHTML = data.new_activation_count + data.re_activation_count + data.upgrade_count;
                	} else {
                		elem.innerHTML = 0;
                	}		

        		} catch (e) {
        			console.warn(e);
        			return;
        		}*/
        	}
        });
    },
    getStoreOpenList: function() {
        var storeId, start_date, end_date;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        start_date = $('#store-open-start-date').val();
        end_date = $('#store-open-end-date').val();

        $.ajax({
            url: "ajax/store_open/getStoreOpenHistory.jsp",
            data: {
                store_id: storeId,
                searchPeriodStart : start_date,
                searchPeriodEnd: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-store-open-grid");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    				
    			}
            }
        });
    },
    getStoreOpenInfo: function(event) {
        var storeId, rowdata;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        rowdata = event.args.row;
        $.ajax({
            url: "ajax/store_open/getStoreOpenInfo.jsp",
            data: {
                store_id: storeId,
                sid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, total;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-store-open-details-grid");
    			if (elem) {
    				elem.jqxGrid("clear");
    				
    				for(i = 0 ; i < data.length; i++){
    	    			total = 0;
    	    			
    	    			if (data[i].cash_count_100 !== undefined) {
    	    				total = total + (100 * data[i].cash_count_100);
    	    			}
    	    			
    	    			if (data[i].cash_count_50 !== undefined) {
    	    				total = total + (50 * data[i].cash_count_50);
    	    			}
    	    			
    	    			if (data[i].cash_count_20 !== undefined) {
    	    				total = total + (20 * data[i].cash_count_20);
    	    			}
    	    			
    	    			if (data[i].cash_count_10 !== undefined) {
    	    				total = total + (10 * data[i].cash_count_10);
    	    			}
    	    			
    	    			if (data[i].cash_count_5 !== undefined) {
    	    				total = total + (5 * data[i].cash_count_5);
    	    			}

    	    			if (data[i].cash_count_1 !== undefined) {
    	    				total = total + (1 * data[i].cash_count_1);
    	    			}
    	    			
    	    			if (data[i].cash_count_025 !== undefined) {
    	    				total = total + (0.25 * data[i].cash_count_025);
    	    			}
    	    			
    	    			if (data[i].cash_count_010 !== undefined) {
    	    				total = total + (0.1 * data[i].cash_count_010);
    	    			}
    	    			
    	    			if (data[i].cash_count_005 !== undefined) {
    	    				total = total + (0.05 * data[i].cash_count_005);
    	    			}
    	    			
    	    			if (data[i].cash_count_001 !== undefined) {
    	    				total = total + (0.01 * data[i].cash_count_001);
    	    			}
    	    			data[i].total = total;
    				}
    				elem.jqxGrid("addRow", null, data, "last");
    				
    			}
            }
        });
    },
};