var _pagescript = {
    _selectedInvoiceItems: undefined,
    _selectedInvoiceRatePlans: undefined,
    _selectedInvoiceInfo: undefined,
    _selectedInvoiceCheckout: undefined,
    _totalPrice:0,
    init: function() {
   		var start, end, startDate, endDate;
   		var date = WRPCommon.TimeModule.getTime();
   		
    	try {
			WRPComponents('div[pagename="jqx_invoice"] > .page-submenu-container > .submenu[panelname="invoice_list"]').addShadowedImage('img/icon/invoice.png');
		} catch (e) {
			
		}
		
		$("#excel_invoice_list").click(function(){
			$("#jqx-invoice-invoice-list").jqxGrid('exportdata', 'xls', 'jqx-invoice-list');
		});
		
		$("#excel_invoice_items").click(function () {
            $("#jqx-invoice-items-list").jqxDataTable('exportData', 'xls');
        });
		
		$("#excel_invoice_checkout").click(function () {
            $("#jqx-invoice-checkout-list").jqxDataTable('exportData', 'xls');
        });
		
		$('#invoice-list-radio-1').on('checked', function (event) {
        	date = WRPCommon.TimeModule.getTime();
        	end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
        	date.setDate(date.getDate() - 7);
        	start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
        	$("#invoice-list-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#invoice-list-search-end-date").jqxDateTimeInput('setDate', end);
        	
        	WRPAdminApp.pagescript.getInvoiceList(start, end);
  		 });
  		 
       	$('#invoice-list-radio-2').on('checked', function (event) {
       		date = WRPCommon.TimeModule.getTime();
       		end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
       		date.setMonth(date.getMonth() - 1);
       		start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
       		$("#invoice-list-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#invoice-list-search-end-date").jqxDateTimeInput('setDate', end);	
        	WRPAdminApp.pagescript.getInvoiceList(start, end);
  		 });
  		 
       	$('#invoice-list-radio-3').on('checked', function (event) {
       		date = WRPCommon.TimeModule.getTime();
       		end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
       		date.setMonth(date.getMonth() - 3);
       		start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
       		$("#invoice-list-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#invoice-list-search-end-date").jqxDateTimeInput('setDate', end);
        	
        	WRPAdminApp.pagescript.getInvoiceList(start, end);
       	});
       	
       	$('#invoice-list-radio-1').jqxRadioButton('check');
       	

		//WRPAdminApp.pagescript.getInvoiceList();
    },
    getInvoiceList: function() {
    	var param, date;
    	
    	param = {};

        try {
            param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        if(arguments.length > 1){
        	param.start_date = arguments[0];
            param.end_date = arguments[1];
        }else{
        	date = $("#invoice-list-search-start-date").jqxDateTimeInput('getDate');
           	param.start_date= $.jqx.dataFormat.formatdate(date, 'd');
            date = $("#invoice-list-search-end-date").jqxDateTimeInput('getDate');
            param.end_date = $.jqx.dataFormat.formatdate(date, 'd');
        }

    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}     
        
        $.ajax({
        	url: "ajax/invoice/getInvoiceList.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, elem, i, len, obj;
        		data = result.data;
        		
            	try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            		return;
            	}     
            	
        		if (!data) return;
        		
        		elem = $("#jqx-invoice-invoice-list");
        		if (elem) {
        			elem[0].parentNode.innerHTML = '<div id="jqx-invoice-invoice-list"></div>';
        		}
        		
        		for (i = 0, len = data.length; i < len; i++) {
        			obj = data[i];
        			if (obj.transaction_type !== undefined) {
        				switch (obj.transaction_type) {
        			    case 0:    	
        			    	obj.transaction_type = "New Activation - New Handset";
        			    	break;
        			    case 1:	    	
        			    	obj.transaction_type = "Re Activation - New Handset";
        			    	break;
        			    case 2:	 
        			    	obj.transaction_type = "Upgrade - New Handset";   	
        			    	break;
        			    case 3:
        			    	obj.transaction_type = "Port-In - New Handset";	    	
        			    	break;
        			    case 4:	
        			    	obj.transaction_type = "New Activation - BYOD Handset";	    	
        			    	break;
        			    case 5:	  
        			    	obj.transaction_type = "Re Activation - BYOD Handset";	     	
        			    	break;
        			    case 6:	   
        			    	obj.transaction_type = "Upgrade - BYOD Handset";	    	
        			    	break;
        			    case 7:
        			    	obj.transaction_type = "Port-In - BYOD Handset";	   	    	
        			    	break;
        			    case 8:
        			    	obj.transaction_type = "ESN Change";	   	    	
        			    	break;
        			    case 9:
        			    	obj.transaction_type = "MDN Change";	 	    	
        			    	break;
        			    case 10:
        			    	obj.transaction_type = "MPR / DOA";		    	
        			    	break;
        			    case 11:	   
        			    	obj.transaction_type = "XBM";	 	
        			    	break;
        			    case 12: 
        			    	obj.transaction_type = "Add-A-Line - New Handset";	     	
        			    	break;
        			    case 13:	
        			    	obj.transaction_type = "Add-A-Line - BYOD Handset";	   	    	
        			    	break;
        			    case 14:   
        			    	obj.transaction_type = "SOR"; 	
        			    	break;
    			    	default:
        			    	obj.transaction_type = ""; 	
    			    		break;
        				}
        			}
        		}
        		
        		elem = $("#jqx-invoice-invoice-list");
        		if (elem) {
        			elem.jqxGrid({
        				width: "99.8%",
        				height: "99%",
                	   showfilterrow: false,
                	   filterable: true,
                	   sortable: true,
                	   columnsresize:true,
                	   theme: 'arctic',
        				source: new $.jqx.dataAdapter({
        					datatype: "json",
        					datafields: [
        						{ name: "invoice_no", type: "number" },
        						{ name: "date", type: "date" },
        						{ name: "pos_no", type: "number" },
        						{ name: "user_id", type: "string" },
        						{ name: "customer_name", type: "string" },
        						{ name: "amount", type: "number" },
        						{ name: "tax", type: "number" },
        						{ name: "items", type: "string" },
        						{ name: "transaction_type", type: "string" }
        					],
        					localdata: data
        				}),
        				columns: [					
        					{ text: "No.", datafield: "invoice_no", width: 50 },
         				   	{ text: "Date", datafield: "date", filtertype: "range", width: 150, cellsformat: 'MM/dd/yyyy HH:mm:ss' },
        					{ text: "POS No.", datafield: "pos_no", width: 75 },
        					{ text: "Employee", datafield: "user_id" },
        					{ text: "Cust. Name", datafield: "customer_name" },
        					{ text: "Items", datafield: "items", hidden: true },
        					{ text: "Transaction Type", datafield: "transaction_type" },
        					{ text: "Amount", datafield: "amount", cellsformat: "c2", width: 80 },
        					{ text: "Tax Amnt.", width: 80, datafield: "tax", cellsformat: "c2" }
        				],
        				cellhover: function(cellhtmlElement, x, y) {
        				//	console.log(y);
        				}
        			});
        			elem.on("rowselect", WRPAdminApp.pagescript.getInvoiceDatas);
        			
        			/*$("#jqx-invoice-date").on('change', function (event) {
        				var startDate = $("#invoice-list-search-start-date").jqxDateTimeInput('getDate');
        				var endDate = $("#invoice-list-search-end-date").jqxDateTimeInput('getDate');
        				if (startDate != null || endDate != null) {
                        	var filtergroup = new $.jqx.filter();
                        	var filtervalue = startDate;
                        	var filtercondition = 'GREATER_THAN_OR_EQUAL';
                        	var filter1 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
                        	filtervalue=endDate;
                        	filtercondition= 'LESS_THAN_OR_EQUAL';
                        	var filter2 = filtergroup.createfilter('datefilter', filtervalue, filtercondition);
                        	var operator = 0;
                        	filtergroup.addfilter(operator, filter1);
                        	filtergroup.addfilter(operator, filter2);
                        	$("#jqx-invoice-invoice-list").jqxGrid('addfilter', 'date', filtergroup);
                        	$("#jqx-invoice-invoice-list").jqxGrid('applyfilters');
                        }
                    });*/
        			
        		}
        	}
        });
    },
    getInvoiceDatas: function(event) {
    	var invoice_no, store_id;
    	invoice_no = event.args.row.invoice_no;

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
    	WRPAdminApp.pagescript._selectedInvoiceCheckout = undefined;
    	
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
    							if (obj.amount !== undefined) {
        							obj.price = obj.amount;
        						}
    							obj2.plans.push(obj);
    							break;
    						}
    						obj2 = undefined;
    					}
    					if (obj2 === undefined) {
    						obj2 = {};
    						obj2.payment = obj.payment_index;
    						if (obj.amount !== undefined) {
    							obj.price = obj.amount;
    						}
    						obj2.plans = [obj];
    						rateplans.push(obj2);
    					}  					
    				} else {
    					if (obj.item_type === 3) {
    						if (obj.qpay_id !== undefined) {
    							obj.confirmation_id = obj.qpay_id;
    							obj.qpay_id = undefined;
    							delete obj.qpay_id;
    						}
    						if (obj.qpay_account !== undefined) {
    							obj.account_number = String(obj.qpay_account);
    							obj.qpay_account = undefined;
    							delete obj.qpay_account;
    						}
    						if (obj.qpay_due_date !== undefined) {
    							obj.due_date = String(obj.qpay_due_date);
    							obj.qpay_due_date = undefined;
    							delete obj.qpay_due_date;
    						}
    						if (obj.qpay_customer_name !== undefined) {
    							obj.customer_name = String(obj.qpay_customer_name);
    							obj.qpay_customer_name = undefined;
    							delete obj.qpay_customer_name;
    						}
    						if (obj.qpay_next_due_date !== undefined) {
    							obj.next_due_date = String(obj.qpay_next_due_date);
    							obj.qpay_next_due_date = undefined;
    							delete obj.qpay_next_due_date;
    						}
    					}
    					items.push(obj);
    				}
    			}
    			
    			WRPAdminApp.pagescript._selectedInvoiceItems = items;
    			WRPAdminApp.pagescript._selectedInvoiceRatePlans = rateplans;
    		}
    	});
    	
    	$.ajax({
    		url: "ajax/invoice/getInvoiceCheckout.jsp",
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
    				WRPAdminApp.pagescript._selectedInvoiceCheckout = [];
    				return;
    			}
    			
    			WRPAdminApp.pagescript._selectedInvoiceCheckout = data;
    		}
    	});    	  	
    },
    waitingInvoiceData: function() {
    	var pagescript;
    	
    	pagescript = WRPAdminApp.pagescript;
    	
    	if (pagescript._selectedInvoiceInfo === undefined
    	  || pagescript._selectedInvoiceRatePlans === undefined
    	  || pagescript._selectedInvoiceItems === undefined
    	  || pagescript._selectedInvoiceCheckout === undefined) {
    		setTimeout(pagescript.waitingInvoiceData, 250);
    	} else {
        	try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        		return;
        	}      	

        	pagescript.priceInvoiceInfo();
        	pagescript.printInvoiceItems();
        	pagescript.printInvoiceCheckout();
    	}
    },
    priceInvoiceInfo: function() {
    	var info;
    	
    	info = WRPAdminApp.pagescript._selectedInvoiceInfo;
    	
    	if (info === undefined) {
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-inv-no").value = (info.invoice_no !== undefined)? info.invoice_no : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-pos-no").value = (info.pos_no !== undefined)? info.pos_no : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-date").value = (info.date !== undefined)? info.date : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-emp-id").value = (info.emp_id !== undefined)? info.emp_id : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-emp-name").value = (info.emp_name !== undefined)? info.emp_name : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-cust-id").value = (info.cust_id !== undefined)? info.cust_id : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-cust-name").value = (info.cust_name !== undefined)? info.cust_name : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("jqx-invoice-info-cust-addr").value = (info.cust_addr !== undefined)? info.cust_addr : "";
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
    		if (obj.name !== undefined) {
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
    		if (obj.amount !== undefined) {
    			obj.price = obj.amount;
    			obj.amount = undefined;
    			delete obj.amount;
    		} else if(obj.price === undefined) {
    			obj.price = 0;
    		}
    		if (obj.tax_amnt === undefined) {
        		if (obj.tax_rate) {
        			obj.tax_amnt = obj.price * obj.tax_rate; 
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
    	
    	obj = $("#jqx-invoice-items-list");
    	
    	if (obj) {
    		obj[0].parentNode.innerHTML = '<div id="jqx-invoice-items-list"></div>';
    	}
    	
    	obj = $("#jqx-invoice-items-list");
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
    	
    	obj = document.getElementById("jqx-invoice-info-total-qty");
    	if (obj) {
    		obj.value = total_qty;
    	}
    	
    	obj = document.getElementById("jqx-invoice-info-total-discount");
    	if (obj) {
    		obj.value = "$" + total_discount.toFixed(2);
    	}
    	
    	obj = document.getElementById("jqx-invoice-info-total-tax-amnt");
    	if (obj) {
    		obj.value = "$" + total_tax_amnt.toFixed(2);
    	}
    	
    	obj = document.getElementById("jqx-invoice-info-total-price");
    	if (obj) {
    		obj.value = "$" + total_price.toFixed(2);
    	}
    	
    	WRPAdminApp.pagescript._totalPrice = total_price;
    },
	getRowDetail: function(id, row, element, rowinfo) {
		var table, table2, innerHTML, arr, newElem, obj;
		
		switch (parseInt(row.row_type)) {
		case 1:
			if (row.coupon_discount_str !== undefined || row.coupon_discount_amnt !== undefined || row.coupon_discount_rate !== undefined) {
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
			if (row.coupon_discount_str !== undefined || row.coupon_discount_amnt !== undefined || row.coupon_discount_rate !== undefined) {
			    rowinfo.detailsHeight = 65;
				element.html('<div style="width: 100%;height: 100%;"></div>');
				table = $(element.children()[0]);
				
				arr = {};
				arr.code = (row.coupon_code !== undefined && row.coupon_code)? row.coupon_code : "";
				arr.name = (row.coupon_name !== undefined && row.coupon_name)? row.coupon_name : "";
				arr.description = (row.coupon_description !== undefined && row.coupon_description)? row.coupon_description : "";
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
					price: row.price,
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
		case 4:			
		    rowinfo.detailsHeight = 1;
		    break;
		case 5:			
		    rowinfo.detailsHeight = 1;
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
	printInvoiceCheckout: function() {
		var list, obj, i, len, width, height;
		var total_amount = 0, change=0;
    	list = WRPAdminApp.pagescript._selectedInvoiceCheckout;
    	if (list === undefined) return;
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if (obj.type === undefined) continue;
    		switch (obj.type) {
    		case 0:
    			obj.type_str = "Cash";
    			break;
    		case 1:
    			obj.type_str = "Credit";
    			break;
    		case 2:
    			obj.type_str = "Debit";
    			break;
    		case 3:
    			obj.type_str = "Loan";
    			break;
    		case 4:
    			obj.type_str = "Check";
    			break;
    		case 5:
    			obj.type_str = "Credit Memo";
    			break;
    		}
    		total_amount = total_amount + obj.amount;
    		
    		if(obj.opt3 !== undefined){
    			document.getElementById("invoice-checkout-change").innerHTML = "$"+ obj.opt3;
    			obj.amount = obj.amount+parseFloat(obj.opt3);
    		}else{
    			document.getElementById("invoice-checkout-change").innerHTML = "$0.00";
    		}
    		
    	}
    	
    	obj = $("#jqx-invoice-checkout-list");
    	
    	if (obj) {
    		obj[0].parentNode.innerHTML = '<div id="jqx-invoice-checkout-list"></div>';
    	}
    	    	
    	obj = $("#jqx-invoice-checkout-list");
    	if (obj) {
    		obj.jqxDataTable({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
				filterable: false,
				editable: false,
				selectionMode: "custom",
				sortable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "type", type: "number" },
						// hidden end
						{ name: "type_str", type: "string" },
						{ name: "amount", type: "number" },
						{ name: "opt1", type: "string" },
						{ name: "opt2", type: "string" }
					],
					localdata: list
				}),
				columns: [
					{ datafield: "type", hidden: true, editable: false },
					{ text: "Type", datafield: "type_str", editable: false, autoCellHeight: false },
					{ text: "Amount", width: 80, datafield: "amount", cellsformat: "c2", editable: false, autoCellHeight: false },
					{ text: "Opt.1", datafield: "opt1", autoCellHeight: false },
					{ text: "Opt.2", datafield: "opt2", autoCellHeight: false }
				]
			});
    	}
    	
    	document.getElementById("invoice-checkout-total").innerHTML = "$"+total_amount.toFixed(2);
	}
};