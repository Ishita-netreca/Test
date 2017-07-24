
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
		try {
			WRPComponents('div[pagename="manage_report_sales"] > .page-submenu-container > .submenu[panelname="box_sales_report"]').addShadowedImage('img/icon/box_sales_report.png');
			WRPComponents('div[pagename="manage_report_sales"] > .page-submenu-container > .submenu[panelname="box_sales_report_by_emp"]').addShadowedImage('img/icon/box_sales_report_by_employee.png');
			WRPComponents('div[pagename="manage_report_sales"] > .page-submenu-container > .submenu[panelname="box_sales_summary"]').addShadowedImage('img/icon/box_sales_summary.png');
			WRPComponents('div[pagename="manage_report_sales"] > .page-submenu-container > .submenu[panelname="sales_summary"]').addShadowedImage('img/icon/sales_summary.png');
			WRPComponents('div[pagename="manage_report_sales"] > .page-submenu-container > .submenu[panelname="sales_raw_data"]').addShadowedImage('img/icon/sales_raw_data.png');
			WRPComponents('div[pagename="manage_report_sales"] > .page-submenu-container > .submenu[panelname="for_commission_report"]').addShadowedImage('img/icon/box_sales_summary.png');
		} catch (e) {

		}
		
		
		WRPAdminApp.pagescript.boxSalesReportLoad();
		WRPAdminApp.pagescript.assignedStoreList();
    },
    boxSalesReportLoad: function(){
    	var iframe, user_id;
    	
    	iframe = document.getElementById("box-sales-report-iframe");
    	if (!iframe) {
    		return;
    	}
    	
    	iframe.onload = function() {
    		try {
    			document.getElementById("loading-container").style.display = "none";
    		} catch (e) {
    			
    		}
    	}
    	
    	try {
    		user_id = iframe.getAttribute("user_id");
    		if (user_id && user_id.length > 0) {
    			iframe.src = "https://reports.posmasterus.com/Report/BoxSalesReport?user=" + user_id;
        		try {
        			document.getElementById("loading-container").style.display = "block";
        		} catch (e) {
        			
        		}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    boxSalesSumReportLoad: function(){
    	var from, to, items, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#box-sales-summary-store").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#box-sales-summary-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#box-sales-summary-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;
    		
    	} catch (e) {
    		console.warn(e);
    	}
    	
		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}
    	
        $.ajax({
            url: "ajax/management_report/getBoxSalesSummary.jsp",
            data: {
            	store_id : checkedStores,
            	from: from,
            	to: to
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
    			document.getElementById("box-sales-summary-from-date").innerHTML = from;
    			document.getElementById("box-sales-summary-to-date").innerHTML = to;
    			
    			if(!data){
    				document.getElementById("loading-container").style.display = "none";
    				return;
    			}
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.StoreCode !== undefined && obj.StoreCode)? obj.StoreCode : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.phone_count !== undefined && obj.phone_count)? obj.phone_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.accessory_count !== undefined && obj.accessory_count)? obj.accessory_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.Ratio_Phone_Accessory !== undefined && obj.Ratio_Phone_Accessory)? obj.Ratio_Phone_Accessory : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.newact_count !== undefined && obj.newact_count)? obj.newact_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.upgrade_sor_count !== undefined && obj.upgrade_sor_count)? obj.upgrade_sor_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.total_act !== undefined && obj.total_act)? obj.total_act : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.payment_count !== undefined && obj.payment_count)? obj.payment_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.Ratio_Phone_Payment !== undefined && obj.Ratio_Phone_Payment)? obj.Ratio_Phone_Payment : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.Ratio_Accessory_Payment !== undefined && obj.Ratio_Accessory_Payment)? obj.Ratio_Accessory_Payment : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.byod_count !== undefined && obj.byod_count)? obj.byod_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.react_count !== undefined && obj.react_count)? obj.react_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.mrc_50 !== undefined && obj.mrc_50)? obj.mrc_50 : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push('...');
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("box-sales-summary-report-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("loading-container").style.display = "none";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        });
    },
    salesSumReportLoad: function(){
    	var db_name, from, to, items, checkedStores;

    	try{
    		checkedStores = "";
            items = $("#sales-summary-store").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#sales-summary-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#sales-summary-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;

    	} catch (e) {
    		console.warn(e);
    	}

		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}
    	
        $.ajax({
            url: "ajax/management_report/getSalesSummary.jsp",
            data: {
            	store_id : checkedStores,
            	from: from,
            	to: to
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
    			document.getElementById("sales-summary-from-date").innerHTML = from;
    			document.getElementById("sales-summary-to-date").innerHTML = to;
    			
    			if(!data){
    				document.getElementById("loading-container").style.display = "none";
    				return;
    			}
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.StoreCode !== undefined && obj.StoreCode)? obj.StoreCode : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.accessory_sales !== undefined && obj.accessory_sales)? obj.accessory_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.phone_sim_sales !== undefined && obj.phone_sim_sales)? obj.phone_sim_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.service_sales !== undefined && obj.service_sales)? obj.service_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.petty_cash !== undefined && obj.petty_cash)? obj.petty_cash : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.qpay_payment !== undefined && obj.qpay_payment)? obj.qpay_payment : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.total_revenue !== undefined && obj.total_revenue)? obj.total_revenue : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.salse_tax !== undefined && obj.salse_tax)? obj.salse_tax : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.pp_tax !== undefined && obj.pp_tax)? obj.pp_tax : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.cash !== undefined && obj.cash)? obj.cash : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.dabit !== undefined && obj.dabit)? obj.dabit : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.credit !== undefined && obj.credit)? obj.credit : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.finance !== undefined && obj.finance)? obj.finance : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.store_credit !== undefined && obj.store_credit)? obj.store_credit : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("sales-summary-report-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("loading-container").style.display = "none";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        });
    },
    salesRawDataLoad: function(){
    	var iframe, user_id, from, to, items, checkedStores;
    	
    	iframe = document.getElementById("sales-raw-data-iframe");
    	if (!iframe) {
    		return;
    	}
    	
    	iframe.onload = function() {
    		try {
    			document.getElementById("loading-container").style.display = "none";
    		} catch (e) {
    			
    		}
    	}
    	
    	try {
    		user_id = iframe.getAttribute("user_id");
    		
        	if (user_id && user_id.length > 0) {
    			iframe.src = "https://reports.posmasterus.com/Report/SalesRawData?user=" + user_id;
        		try {
        			document.getElementById("loading-container").style.display = "block";
        		} catch (e) {
        			
        		}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    assignedStoreList: function(){
    	$.ajax({
            url: "ajax/store/getManagerStoreAssignedList.jsp",
            method: "POST",
            async: false,
            dataType: "json",
            success: function(result) {
                var data, i, len;

                data = result.data;
                if (!data) return;
				
				var datarow = new Array();
				
				for(i = 0; i < data.length ; i++){
					var row = {};
					row["label"] = data[i].storeId;
					row["value"] = data[i].storeId;
					datarow[i] = row;
				}
				
				var source = {
	        			datatype: "json",
	        			localdata: datarow,
	        			datafield: [{ name: "label" }, { name: "value" }]
	        	};
				
				var dataAdapter = new $.jqx.dataAdapter(source);
				
				$(".store-dropdown-list").jqxDropDownList({
					source: dataAdapter,
					width: "100%",
					height: 24,
					displayMember: "label",
					valueMember: "value",
					checkboxes: true
				});
				
				$("#for-commission-report-store-list").jqxDropDownList({
					width: "80%"
				});
            }
        })
    },
    forCommissionReportLoad: function(){
    	var from, to, items, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#for-commission-report-store-list").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
            
            if(checkedStores.length < 1){
            	WRPCommon.MsgBoxModule.alert({
            		message:"Select Store"
            	});
            	return;
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#for-commission-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#for-commission-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;
    		
    	} catch (e) {
    		console.warn(e);
    	}
    	
		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}
		
		$.ajax({
            url: "ajax/management_report/getSalesRawDataAllEmp.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id : checkedStores,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, is_odd;
    			data = result.data;
    			document.getElementById("for-commission-report-stores").innerHTML = checkedStores;
    			document.getElementById("for-commission-report-from-date").innerHTML = from;
    			document.getElementById("for-commission-report-to-date").innerHTML = to;
    			
    			if(!data){
    				document.getElementById("loading-container").style.display = "none";
    				return;
    			}
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td width=20>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50><a href="#" onclick="WRPAdminApp.pagescript.getEmpPerformance(\''+obj.USER_ID+'\')">');
						innerHTML.push((obj.USER_ID !== undefined && obj.USER_ID)? obj.USER_ID : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50><a href="#" onclick="WRPAdminApp.pagescript.getEmpPerformance(\''+obj.USER_ID+'\')">');
						innerHTML.push((obj.USER_NAME !== undefined && obj.USER_NAME)? obj.USER_NAME : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.TOTAL_ACT_QTY !== undefined && obj.TOTAL_ACT_QTY)? obj.TOTAL_ACT_QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.TOTAL_BOX_QTY_NEW_PORT_AAL_REACT !== undefined && obj.TOTAL_BOX_QTY_NEW_PORT_AAL_REACT)? obj.TOTAL_BOX_QTY_NEW_PORT_AAL_REACT : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.TOTAL_BOX_QTY_UPGRADE !== undefined && obj.TOTAL_BOX_QTY_UPGRADE)? obj.TOTAL_BOX_QTY_UPGRADE : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.TOTAL_BOX_QTY !== undefined && obj.TOTAL_BOX_QTY)? obj.TOTAL_BOX_QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.TOTAL_BYOD_QTY !== undefined && obj.TOTAL_BYOD_QTY)? obj.TOTAL_BYOD_QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.RATIO_BOX_ACCESSORY !== undefined && obj.RATIO_BOX_ACCESSORY)? obj.RATIO_BOX_ACCESSORY + '%' : '0.00%');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.ACCESSORY_QTY !== undefined && obj.ACCESSORY_QTY)? obj.ACCESSORY_QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.ACCESSORY_SALES !== undefined && obj.ACCESSORY_SALES)? '$'+obj.ACCESSORY_SALES : '$0.00');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.PAYMENT_QTY !== undefined && obj.PAYMENT_QTY)? obj.PAYMENT_QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("for-commission-report-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("loading-container").style.display = "none";
        			document.getElementById("for-commission-report-content").style.display = "block";
        			document.getElementById("emp-performance-report-content").style.display = "none";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        });
    },
    getEmpPerformance: function(emp_id){
    	var from, to, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#for-commission-report-store-list").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#for-commission-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#for-commission-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;
    		
    	} catch (e) {
    		console.warn(e);
    	}
    	
		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}
    	
        $.ajax({
            url: "ajax/management_report/getSalesRawDataByItemTypeSummary.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id: checkedStores,
            	emp_id: emp_id
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
    			document.getElementById("emp-performance-report-stores").innerHTML = checkedStores;
    			document.getElementById("emp-performance-from-date").innerHTML = from;
    			document.getElementById("emp-performance-to-date").innerHTML = to;
    			document.getElementById("emp-performance-emp-id").innerHTML = emp_id;
    			
    			if(!data){
    				document.getElementById("loading-container").style.display = "none";
    				return;
    			}
    			
    			innerHTML = [];

				try {
					innerHTML.push('<tr>');
					innerHTML.push('<td width=100>');
					innerHTML.push('NEW PHONE');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.NEW_PHONE_QTY !== undefined && data.NEW_PHONE_QTY)? data.NEW_PHONE_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.NEW_PHONE_AMOUNT !== undefined && data.NEW_PHONE_AMOUNT)? '$'+data.NEW_PHONE_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.NEW_PHONE_MRC !== undefined && data.NEW_PHONE_MRC)? '$'+data.NEW_PHONE_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.NEW_PHONE_RETURNED_QTY !== undefined && data.NEW_PHONE_RETURNED_QTY)? data.NEW_PHONE_RETURNED_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.NEW_PHONE_REFUND_AMOUNT !== undefined && data.NEW_PHONE_REFUND_AMOUNT)? '$'+data.NEW_PHONE_REFUND_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('BYOD PHONE');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.BYOD_PHONE_QTY !== undefined && data.BYOD_PHONE_QTY)? data.BYOD_PHONE_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.BYOD_PHONE_AMOUNT !== undefined && data.BYOD_PHONE_AMOUNT)? '$'+data.BYOD_PHONE_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.BYOD_PHONE_MRC !== undefined && data.BYOD_PHONE_MRC)? '$'+data.BYOD_PHONE_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.BYOD_PHONE_RETURNED_QTY !== undefined && data.BYOD_PHONE_RETURNED_QTY)? data.BYOD_PHONE_RETURNED_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.BYOD_PHONE_REFUND_AMOUNT !== undefined && data.BYOD_PHONE_REFUND_AMOUNT)? '$'+data.BYOD_PHONE_REFUND_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('TOTAL');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TOTAL_PHONE_QTY !== undefined && data.TOTAL_PHONE_QTY)? data.TOTAL_PHONE_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TOTAL_PHONE_AMOUNT !== undefined && data.TOTAL_PHONE_AMOUNT)? '$'+data.TOTAL_PHONE_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TOTAL_PHONE_MRC !== undefined && data.TOTAL_PHONE_MRC)? '$'+data.TOTAL_PHONE_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TOTAL_PHONE_RETURNED_QTY !== undefined && data.TOTAL_PHONE_RETURNED_QTY)? data.TOTAL_PHONE_RETURNED_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TOTAL_PHONE_REFUND_AMOUNT !== undefined && data.TOTAL_PHONE_REFUND_AMOUNT)? '$'+data.TOTAL_PHONE_REFUND_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
				} catch (e) {
					console.warn(e);
				}

				try {
					document.getElementById("phone-sales-summary-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
				
				innerHTML = [];

				try {
					innerHTML.push('<tr>');
					innerHTML.push('<td width=100>');
					innerHTML.push('NEWACTIVATION');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TRANS_NEWACT_QTY !== undefined && data.TRANS_NEWACT_QTY)? data.TRANS_NEWACT_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TRANS_NEWACT_MRC !== undefined && data.TRANS_NEWACT_MRC)? '$'+data.TRANS_NEWACT_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('PORT IN');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TRANS_PORTIN_QTY !== undefined && data.TRANS_PORTIN_QTY)? data.TRANS_PORTIN_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TRANS_PORTIN_MRC !== undefined && data.TRANS_PORTIN_MRC)? '$'+data.TRANS_PORTIN_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('ADD A LINE');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TRANS_AAL_QTY !== undefined && data.TRANS_AAL_QTY)? data.TRANS_AAL_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TRANS_AAL_MRC !== undefined && data.TRANS_AAL_MRC)? '$'+data.TRANS_AAL_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('REACTIVATION');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TRANS_REACT_QTY !== undefined && data.TRANS_REACT_QTY)? data.TRANS_REACT_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TRANS_REACT_MRC !== undefined && data.TRANS_REACT_MRC)? '$'+data.TRANS_REACT_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('UPGRADE');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TRANS_UPGRADE_QTY !== undefined && data.TRANS_UPGRADE_QTY)? data.TRANS_UPGRADE_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TRANS_UPGRADE_MRC !== undefined && data.TRANS_UPGRADE_MRC)? '$'+data.TRANS_UPGRADE_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('SOR');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TRANS_SOR_QTY !== undefined && data.TRANS_SOR_QTY)? data.TRANS_SOR_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TRANS_SOR_MRC !== undefined && data.TRANS_SOR_MRC)? '$'+data.TRANS_SOR_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
					
					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('TOTAL');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TOTAL_TRANS_QTY !== undefined && data.TOTAL_TRANS_QTY)? data.TOTAL_TRANS_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TOTAL_TRANS_MRC !== undefined && data.TOTAL_TRANS_MRC)? '$'+data.TOTAL_TRANS_MRC.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
				} catch (e) {
					console.warn(e);
				}

				try {
					document.getElementById("activation-type-summary-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;

				innerHTML = [];

				try {
					innerHTML.push('<tr>');
					innerHTML.push('<td width=100>');
					innerHTML.push('ACCESSORY');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.ACCESSORY_QTY !== undefined && data.ACCESSORY_QTY)? data.ACCESSORY_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.ACCESSORY_AMOUNT !== undefined && data.ACCESSORY_AMOUNT)? '$'+data.ACCESSORY_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.ACCESSORY_RETURNED_QTY !== undefined && data.ACCESSORY_RETURNED_QTY)? data.ACCESSORY_RETURNED_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.ACCESSORY_REFUND_AMOUNT !== undefined && data.ACCESSORY_REFUND_AMOUNT)? '$'+data.ACCESSORY_REFUND_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');

				} catch (e) {
					console.warn(e);
				}

				try {
					document.getElementById("acc-sales-summary-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;

				innerHTML = [];

				try {
					innerHTML.push('<tr>');
					innerHTML.push('<td width=100>');
					innerHTML.push('CARRIER SERVICE FEE');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.CARRIER_SERVICE_QTY !== undefined && data.CARRIER_SERVICE_QTY)? data.CARRIER_SERVICE_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.CARRIER_SERVICE_AMOUNT !== undefined && data.CARRIER_SERVICE_AMOUNT)? '$'+data.CARRIER_SERVICE_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');

					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('QPAY SERVICE FEE');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.QPAY_SERVICE_QTY !== undefined && data.QPAY_SERVICE_QTY)? data.QPAY_SERVICE_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.QPAY_SERVICE_AMOUNT !== undefined && data.QPAY_SERVICE_AMOUNT)? '$'+data.QPAY_SERVICE_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');

					innerHTML.push('<tr>');
					innerHTML.push('<td width=70>');
					innerHTML.push('TOTAL');
					innerHTML.push('</td>');
					innerHTML.push('<td width=30>');
					innerHTML.push((data.TOTAL_SERVICE_QTY !== undefined && data.TOTAL_SERVICE_QTY)? data.TOTAL_SERVICE_QTY : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=40>');
					innerHTML.push((data.TOTAL_SERVICE_AMOUNT !== undefined && data.TOTAL_SERVICE_AMOUNT)? '$'+data.TOTAL_SERVICE_AMOUNT.toFixed(2) : '$0.00');
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
				} catch (e) {
					console.warn(e);
				}

				try {
					document.getElementById("carrier-service-sales-summary-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
				
        		try {
        			document.getElementById("loading-container").style.display = "none";
        			document.getElementById("for-commission-report-content").style.display = "none";
        			document.getElementById("emp-performance-report-content").style.display = "block";
        		} catch (e) {
        			
        		}

        		WRPAdminApp.pagescript.getSalesDataByPhone(emp_id);
        		WRPAdminApp.pagescript.getSalesDataByByodPhone(emp_id);
        		WRPAdminApp.pagescript.getSalesDataByAcc(emp_id);
        		WRPAdminApp.pagescript.getSalesDataByService(emp_id);
            }
        });
    },
    getSalesDataByPhone: function(emp_id){
    	var from, to, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#for-commission-report-store-list").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#for-commission-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#for-commission-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;
    		
    	} catch (e) {
    		console.warn(e);
    	}

        $.ajax({
            url: "ajax/management_report/getSalesRawDataByItemType.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id: checkedStores,
            	emp_id: emp_id,
            	item_type: "PHONE"
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;

    			innerHTML = [];
    			
    			if(!data) return;
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td width=20>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.STORE_CODE !== undefined && obj.STORE_CODE)? obj.STORE_CODE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.DATE !== undefined && obj.DATE)? obj.DATE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.INVOICE_NO !== undefined && obj.INVOICE_NO)? obj.INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=200>');
						innerHTML.push((obj.DESCRIPTION !== undefined && obj.DESCRIPTION)? obj.DESCRIPTION : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ITEM_CODE !== undefined && obj.ITEM_CODE)? obj.ITEM_CODE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=30>');
						innerHTML.push((obj.QTY !== undefined && obj.QTY)? obj.QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.SERIAL_NO !== undefined && obj.SERIAL_NO)? '_'+obj.SERIAL_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ITEM_TYPE !== undefined && obj.ITEM_TYPE)? obj.ITEM_TYPE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.TRANS_TYPE !== undefined && obj.TRANS_TYPE)? obj.TRANS_TYPE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURN_STATUS !== undefined && obj.RETURN_STATUS)? obj.RETURN_STATUS : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.SUB_TOTAL !== undefined && obj.SUB_TOTAL)? obj.SUB_TOTAL.toFixed(2) : '0.00');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.MRC !== undefined && obj.MRC && !isNaN(parseFloat(obj.MRC)))? parseFloat(obj.MRC).toFixed(2) : '-');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_ID !== undefined && obj.EMP_ID)? obj.EMP_ID : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_NAME !== undefined && obj.EMP_NAME)? obj.EMP_NAME : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURNED_INVOICE_NO !== undefined && obj.RETURNED_INVOICE_NO)? obj.RETURNED_INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.REFUND !== undefined && obj.REFUND)? obj.REFUND : '');
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("new-phone-sales-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
            }
        });
    },
    getSalesDataByByodPhone: function(emp_id){
    	var from, to, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#for-commission-report-store-list").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#for-commission-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#for-commission-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;
    		
    	} catch (e) {
    		console.warn(e);
    	}

        $.ajax({
            url: "ajax/management_report/getSalesRawDataByItemType.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id: checkedStores,
            	emp_id: emp_id,
            	item_type: "BYOD_PHONE"
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;

    			innerHTML = [];

    			if(!data) return;
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td width=20>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.STORE_CODE !== undefined && obj.STORE_CODE)? obj.STORE_CODE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.DATE !== undefined && obj.DATE)? obj.DATE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.INVOICE_NO !== undefined && obj.INVOICE_NO)? obj.INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=200>');
						innerHTML.push((obj.DESCRIPTION !== undefined && obj.DESCRIPTION)? obj.DESCRIPTION : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ITEM_CODE !== undefined && obj.ITEM_CODE)? obj.ITEM_CODE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=30>');
						innerHTML.push((obj.QTY !== undefined && obj.QTY)? obj.QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.SERIAL_NO !== undefined && obj.SERIAL_NO)? '_'+obj.SERIAL_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ITEM_TYPE !== undefined && obj.ITEM_TYPE)? obj.ITEM_TYPE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.TRANS_TYPE !== undefined && obj.TRANS_TYPE)? obj.TRANS_TYPE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURN_STATUS !== undefined && obj.RETURN_STATUS)? obj.RETURN_STATUS : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.SUB_TOTAL !== undefined && obj.SUB_TOTAL)? obj.SUB_TOTAL.toFixed(2) : '0.00');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.MRC !== undefined && obj.MRC && !isNaN(parseFloat(obj.MRC)))? parseFloat(obj.MRC).toFixed(2) : '-');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_ID !== undefined && obj.EMP_ID)? obj.EMP_ID : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_NAME !== undefined && obj.EMP_NAME)? obj.EMP_NAME : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURNED_INVOICE_NO !== undefined && obj.RETURNED_INVOICE_NO)? obj.RETURNED_INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.REFUND !== undefined && obj.REFUND)? obj.REFUND : '');
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("byod-phone-sales-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
            }
        });
    },
    getSalesDataByAcc: function(emp_id){
    	var from, to, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#for-commission-report-store-list").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#for-commission-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#for-commission-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;
    		
    	} catch (e) {
    		console.warn(e);
    	}

        $.ajax({
            url: "ajax/management_report/getSalesRawDataByItemType.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id: checkedStores,
            	emp_id: emp_id,
            	item_type: "ACCESSORY"
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;

    			if(!data) return;
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td width=20>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.STORE_CODE !== undefined && obj.STORE_CODE)? obj.STORE_CODE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.DATE !== undefined && obj.DATE)? obj.DATE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.INVOICE_NO !== undefined && obj.INVOICE_NO)? obj.INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=200>');
						innerHTML.push((obj.DESCRIPTION !== undefined && obj.DESCRIPTION)? obj.DESCRIPTION : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ITEM_CODE !== undefined && obj.ITEM_CODE)? obj.ITEM_CODE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=30>');
						innerHTML.push((obj.QTY !== undefined && obj.QTY)? obj.QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.SERIAL_NO !== undefined && obj.SERIAL_NO)? '_'+obj.SERIAL_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ITEM_TYPE !== undefined && obj.ITEM_TYPE)? obj.ITEM_TYPE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURN_STATUS !== undefined && obj.RETURN_STATUS)? obj.RETURN_STATUS : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.SUB_TOTAL !== undefined && obj.SUB_TOTAL)? obj.SUB_TOTAL.toFixed(2) : '0.00');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_ID !== undefined && obj.EMP_ID)? obj.EMP_ID : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_NAME !== undefined && obj.EMP_NAME)? obj.EMP_NAME : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURNED_INVOICE_NO !== undefined && obj.RETURNED_INVOICE_NO)? obj.RETURNED_INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.REFUND !== undefined && obj.REFUND)? obj.REFUND : '');
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("accessory-sales-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
            }
        });
    },
    getSalesDataByService: function(emp_id){
    	var from, to, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#for-commission-report-store-list").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#for-commission-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#for-commission-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;
    		
    	} catch (e) {
    		console.warn(e);
    	}
    	
        $.ajax({
            url: "ajax/management_report/getSalesRawDataByItemType.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id: checkedStores,
            	emp_id: emp_id,
            	item_type: "SERVICE_FEE",
            	detail: "CARRIER"
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;

    			if(!data) return;
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td width=20>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.STORE_CODE !== undefined && obj.STORE_CODE)? obj.STORE_CODE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.DATE !== undefined && obj.DATE)? obj.DATE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.INVOICE_NO !== undefined && obj.INVOICE_NO)? obj.INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=200>');
						innerHTML.push((obj.DESCRIPTION !== undefined && obj.DESCRIPTION)? obj.DESCRIPTION : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=30>');
						innerHTML.push((obj.QTY !== undefined && obj.QTY)? obj.QTY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ITEM_TYPE !== undefined && obj.ITEM_TYPE)? obj.ITEM_TYPE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURN_STATUS !== undefined && obj.RETURN_STATUS)? obj.RETURN_STATUS : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.SUB_TOTAL !== undefined && obj.SUB_TOTAL)? obj.SUB_TOTAL.toFixed(2) : '0.00');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_ID !== undefined && obj.EMP_ID)? obj.EMP_ID : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.EMP_NAME !== undefined && obj.EMP_NAME)? obj.EMP_NAME : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.RETURNED_INVOICE_NO !== undefined && obj.RETURNED_INVOICE_NO)? obj.RETURNED_INVOICE_NO : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=40>');
						innerHTML.push((obj.REFUND !== undefined && obj.REFUND)? obj.REFUND : '');
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("carrier-service-sales-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
            }
        });
    },
    selectStoreAll: function(){
    	var allcheck;
    	allcheck = document.getElementById("for-commission-report-store-all");

    	if(allcheck.checked == true){
    		 $("#for-commission-report-store-list").jqxDropDownList('checkAll');
    	}else if(allcheck.checked == false){
   		 	$("#for-commission-report-store-list").jqxDropDownList('uncheckAll');
    	}
    }
};