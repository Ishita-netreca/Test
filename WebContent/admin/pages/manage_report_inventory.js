
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
	_innerHTML: [],
    init: function() {
		try {
			WRPComponents('div[pagename="manage_report_inventory"] > .page-submenu-container > .submenu[panelname="csr"]').addShadowedImage('img/icon/csr.png');
			WRPComponents('div[pagename="manage_report_inventory"] > .page-submenu-container > .submenu[panelname="on_hand_report"]').addShadowedImage('img/icon/on_hand_report.png');
			WRPComponents('div[pagename="manage_report_inventory"] > .page-submenu-container > .submenu[panelname="valuation_report"]').addShadowedImage('img/icon/valuation_report.png');
			WRPComponents('div[pagename="manage_report_inventory"] > .page-submenu-container > .submenu[panelname="rma_report"]').addShadowedImage('img/icon/rma_report.png');
			WRPComponents('div[pagename="manage_report_inventory"] > .page-submenu-container > .submenu[panelname="audit_report"]').addShadowedImage('img/icon/audit_report.png');
			WRPComponents('div[pagename="manage_report_inventory"] > .page-submenu-container > .submenu[panelname="inventory_qty_sum_report"]').addShadowedImage('img/icon/inventory_qty_summary_report.png');
			WRPComponents('div[pagename="manage_report_inventory"] > .page-submenu-container > .submenu[panelname="inventory_sales_qty_sum_report"]').addShadowedImage('img/icon/inventory_sales_qty_summary_report.png');
		} catch (e) {

		}
		
		WRPAdminApp.pagescript.csrReportLoad();
		WRPAdminApp.pagescript.assignedStoreList();
    	
    },
    csrReportLoad: function(){
    	var iframe, user_id;
    	
    	iframe = document.getElementById("inventory-csr-iframe");
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
    			iframe.src = "https://reports.posmasterus.com/Report/InventoryReport/WarehouseReport?user=" + user_id;
        		try {
        			document.getElementById("loading-container").style.display = "block";
        		} catch (e) {
        			
        		}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    	
    },
    onHandReportLoad: function(){
    	var iframe, user_id;
    	
    	iframe = document.getElementById("inventory-on-hand-report-iframe");
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
    			iframe.src = "https://reports.posmasterus.com/Report/InventoryReport?user=" + user_id;
        		try {
        			document.getElementById("loading-container").style.display = "block";
        		} catch (e) {
        			
        		}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    	
    },
    invenQtySumReportLoad: function(){
    	var iframe, db_name, checkedStore, date;

		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}

    	try{
    		checkedStore = $("#inventory-qty-sum-report-store").jqxDropDownList('getSelectedItem').label;
    	}catch(e){
    		
    	}
    	
    	date = WRPCommon.TimeModule.getTime();
    	
    	document.getElementById("inventory-qty-sum-date").innerHTML = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "-" + date.getFullYear() ;
    	
    	$.ajax({
            url: "ajax/management_report/getInventoryQtySummary.jsp",
            data: {
            	store_id : checkedStore,
            	item_type: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
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
						innerHTML.push('<td width=100>');
						innerHTML.push((obj.item_code !== undefined && obj.item_code)? obj.item_code : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.qty !== undefined && obj.qty)? obj.qty : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("inventory-qty-sum-report-phone-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
            }
        });

    	$.ajax({
            url: "ajax/management_report/getInventoryQtySummary.jsp",
            data: {
            	store_id : checkedStore,
            	item_type: 1
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
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
						innerHTML.push('<td width=100>');
						innerHTML.push((obj.item_code !== undefined && obj.item_code)? obj.item_code : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.qty !== undefined && obj.qty)? obj.qty : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("inventory-qty-sum-report-sim-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
            }
        });
    	

    	$.ajax({
            url: "ajax/management_report/getInventoryQtySummary.jsp",
            data: {
            	store_id : checkedStore,
            	item_type: 2
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
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
						innerHTML.push('<td width=100>');
						innerHTML.push((obj.item_code !== undefined && obj.item_code)? obj.item_code : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.qty !== undefined && obj.qty)? obj.qty : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("inventory-qty-sum-report-serialized-acc-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				innerHTML = undefined;
            }
        });
    	

    	$.ajax({
            url: "ajax/management_report/getInventoryQtySummary.jsp",
            data: {
            	store_id : checkedStore,
            	item_type: 3
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
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
						innerHTML.push('<td width=100>');
						innerHTML.push((obj.item_code !== undefined && obj.item_code)? obj.item_code : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.qty !== undefined && obj.qty)? obj.qty : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("inventory-qty-sum-report-non-serialized-acc-list").innerHTML = innerHTML.join("");
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
    invenSalesQtySumReportLoad: function(){
    	var iframe, from, to, checkedStore;

    	try{
    		checkedStore = $("#inventory-sales-qty-sum-report-store").jqxDropDownList('getSelectedItem').label;
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#inventory-sales-qty-sum-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#inventory-sales-qty-sum-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;

    	} catch (e) {
    		console.warn(e);
    	}

		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}

    	WRPAdminApp.pagescript.invenSalesQtySumReportLoadPhone(checkedStore,from,to);
    	WRPAdminApp.pagescript.invenSalesQtySumReportLoadAcc(checkedStore,from,to);
    	WRPAdminApp.pagescript.invenSalesQtySumReportLoadService(checkedStore,from,to);
    	WRPAdminApp.pagescript.invenSalesQtySumReportLoadQpay(checkedStore,from,to);
    	WRPAdminApp.pagescript.invenSalesQtySumReportLoadSummary(checkedStore,from,to);

    	document.getElementById("inventory-sales-store").innerHTML = checkedStore;
    	document.getElementById("inventory-sales-qty-sum-report-from-date").innerHTML = from;
    	document.getElementById("inventory-sales-qty-sum-report-to-date").innerHTML = to;
    	
    	$.ajax({
            url: "ajax/management_report/getInventorySalesSummary.jsp",
            data: {
            	store_id : checkedStore,
            	from: from,
            	to: to,
            	query_type: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.sold !== undefined && obj.sold)? obj.sold : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.return !== undefined && obj.return)? obj.return : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.net_sales !== undefined && obj.net_sales)? obj.net_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						innerHTML.push('<tr>');
						innerHTML.push('<td colspan=2>');
						innerHTML.push('TOTAL');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.sold !== undefined && obj.sold)? obj.sold : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.return !== undefined && obj.return)? obj.return : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.net_sales !== undefined && obj.net_sales)? obj.net_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}
    			
				try {
					document.getElementById("inventory-sales-qty-sum-report-byod-list").innerHTML = innerHTML.join("");
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
    invenSalesQtySumReportLoadPhone: function(checkedStore,from,to){
    	$.ajax({
            url: "ajax/management_report/getInventorySalesSummary.jsp",
            data: {
            	store_id : checkedStore,
            	from: from,
            	to: to,
            	query_type: 1
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, total_sold, total_return, total_sales;
    			data = result.data;
    			
    			innerHTML = [];
    			total_sold = 0;
    			total_return = 0;
    			total_sales = 0;
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						total_sold = total_sold + obj.sold;
						total_return = total_return + obj.return;
						total_sales = total_sales + obj.net_sales;
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.sold !== undefined && obj.sold)? obj.sold : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.return !== undefined && obj.return)? obj.return : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.net_sales !== undefined && obj.net_sales)? obj.net_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}
    			
    			innerHTML.push('<tr>');
				innerHTML.push('<td colspan=2>');
				innerHTML.push('TOTAL');
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sold !== undefined && total_sold)? total_sold : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_return !== undefined && total_return)? total_return : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sales !== undefined && total_sales)? total_sales.toFixed(2) : 0);
				innerHTML.push('</td>');
				innerHTML.push('</tr>');

    			try {
    				document.getElementById("inventory-sales-qty-sum-report-phonesim-list").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}

    			innerHTML = undefined;
            }
        });
    },
    invenSalesQtySumReportLoadAcc: function(checkedStore,from,to){
    	$.ajax({
            url: "ajax/management_report/getInventorySalesSummary.jsp",
            data: {
            	store_id : checkedStore,
            	from: from,
            	to: to,
            	query_type: 3
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, total_sold, total_return, total_sales;
    			data = result.data;

    			innerHTML = [];
    			total_sold = 0;
    			total_return = 0;
    			total_sales = 0;
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						total_sold = total_sold + obj.sold;
						total_return = total_return + obj.return;
						total_sales = total_sales + obj.net_sales;
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.sold !== undefined && obj.sold)? obj.sold : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.return !== undefined && obj.return)? obj.return : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.net_sales !== undefined && obj.net_sales)? obj.net_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}
    			
    			innerHTML.push('<tr>');
				innerHTML.push('<td colspan=2>');
				innerHTML.push('TOTAL');
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sold !== undefined && total_sold)? total_sold : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_return !== undefined && total_return)? total_return : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sales !== undefined && total_sales)? total_sales.toFixed(2) : 0);
				innerHTML.push('</td>');
				innerHTML.push('</tr>');

    			try {
    				document.getElementById("inventory-sales-qty-sum-report-acc-list").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}

    			innerHTML = undefined;
            }
        });
    },
    invenSalesQtySumReportLoadService: function(checkedStore,from,to){
    	$.ajax({
            url: "ajax/management_report/getInventorySalesSummary.jsp",
            data: {
            	store_id : checkedStore,
            	from: from,
            	to: to,
            	query_type: 5
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, total_sold, total_return, total_sales;
    			data = result.data;

    			innerHTML = [];
    			total_sold = 0;
    			total_return = 0;
    			total_sales = 0;
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						total_sold = total_sold + obj.sold;
						total_return = total_return + obj.return;
						total_sales = total_sales + obj.net_sales;
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.sold !== undefined && obj.sold)? obj.sold : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.return !== undefined && obj.return)? obj.return : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.net_sales !== undefined && obj.net_sales)? obj.net_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}
    			
    			innerHTML.push('<tr>');
				innerHTML.push('<td colspan=2>');
				innerHTML.push('TOTAL');
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sold !== undefined && total_sold)? total_sold : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_return !== undefined && total_return)? total_return : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sales !== undefined && total_sales)? total_sales.toFixed(2) : 0);
				innerHTML.push('</td>');
				innerHTML.push('</tr>');

    			try {
    				document.getElementById("inventory-sales-qty-sum-report-service-list").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}

    			innerHTML = undefined;
            }
        });
    },
    invenSalesQtySumReportLoadQpay: function(checkedStore,from,to){
    	$.ajax({
            url: "ajax/management_report/getInventorySalesSummary.jsp",
            data: {
            	store_id : checkedStore,
            	from: from,
            	to: to,
            	query_type: 7
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, total_sold, total_return, total_sales;
    			data = result.data;

    			innerHTML = [];
    			total_sold = 0;
    			total_return = 0;
    			total_sales = 0;
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						total_sold = total_sold + obj.sold;
						total_return = total_return + obj.return;
						total_sales = total_sales + obj.net_sales;
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=400>');
						innerHTML.push((obj.description !== undefined && obj.description)? obj.description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.sold !== undefined && obj.sold)? obj.sold : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.return !== undefined && obj.return)? obj.return : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.net_sales !== undefined && obj.net_sales)? obj.net_sales : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}
    			
    			innerHTML.push('<tr>');
				innerHTML.push('<td colspan=2>');
				innerHTML.push('TOTAL');
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sold !== undefined && total_sold)? total_sold : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_return !== undefined && total_return)? total_return : 0);
				innerHTML.push('</td>');
				innerHTML.push('<td width=70>');
				innerHTML.push((total_sales !== undefined && total_sales)? total_sales.toFixed(2) : 0);
				innerHTML.push('</td>');
				innerHTML.push('</tr>');

    			try {
    				document.getElementById("inventory-sales-qty-sum-report-qpay-list").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}

    			innerHTML = undefined;
            }
        });
    },
    invenSalesQtySumReportLoadSummary: function(checkedStore,from,to){
    	$.ajax({
            url: "ajax/management_report/getInventorySalesSummary.jsp",
            data: {
            	store_id : checkedStore,
            	from: from,
            	to: to,
            	query_type: 9
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, total_sold, total_return, total_sales;
    			data = result.data[0];

    			innerHTML = [];
    			
				try {
					innerHTML.push('<td colspan=2>');
					innerHTML.push('REPORT SUBTOTAL');
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push((data.sold !== undefined && data.sold)? data.sold :0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push((data.return !== undefined && data.return)? data.return :0);
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push((data.subtotal !== undefined && data.subtotal)? data.subtotal :0);
					innerHTML.push('</td>');
					innerHTML.push('<tr>');
					innerHTML.push('<td colspan=2>');
					innerHTML.push('SALES TAX');
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push('.');
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push('.');
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push((data.tax !== undefined && data.tax)? data.tax :0);
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
					innerHTML.push('<tr>');
					innerHTML.push('<td colspan=2>');
					innerHTML.push('REPORT GRAND TOTAL');
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push('.');
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push('.');
					innerHTML.push('</td>');
					innerHTML.push('<td width=70>');
					innerHTML.push((data.grand_total !== undefined && data.grand_total)? data.grand_total : 0);
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
				} catch (e) {
					console.warn(e);
				}

    			try {
    				document.getElementById("inventory-sales-qty-sum-report-summary-list").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}

    			innerHTML = undefined;
            }
        });
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
				});
				
            }
        })
    }
};