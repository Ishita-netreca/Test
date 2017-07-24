var _pagescript = {
	_selectedCouponSid: 0,
	_selectedUploadFile: -1,
	_qpay: 0,
    init: function() {
    	var elem;

    	try {
			WRPComponents('div[pagename="consolidation"] > .page-submenu-container > .submenu[panelname="upload"]').addShadowedImage('img/icon/upload.png');
			WRPComponents('div[pagename="consolidation"] > .page-submenu-container > .submenu[panelname="consolidation"]').addShadowedImage('img/icon/reconciliation.png');
		} catch (e) {
			
		}
		
		//$('#jqx-consolidation-bottom-panel').jqxTabs({ height: '100%', width: '100%' });
		
		try {
            elem = $(".jqx-datetime-input");
            
            if (elem && elem.length > 0) {                            
            	elem.jqxDateTimeInput({
                	width: "8%",
                	formatString: "MM/dd/yyyy"
                });
            }
		} catch (e) {
			
		}
		
		elem = $("#jqx-consolidation-list");
		if (elem) {
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "transaction_date", type: "date"  },
						{ name: "esn", type: "string"  },
						{ name: "transaction_type", type: "string"  },
						{ name: "rate_plan_amount", type: "number"  },
						{ name: "bolt_on_amount", type: "number"  },
						{ name: "transaction_amount", type: "number"  },
						{ name: "posted_date", type: "date"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: "8%"},
					{ text: "Transaction Date", datafield: "transaction_date", width: "14%", cellsformat: "MM/dd/yyyy"},
					{ text: "ESN", datafield: "esn", width: "16%"},
					{ text: "Transaction Type", datafield: "transaction_type", width: "12%"},
					{ text: "Rate Plan Amount", datafield: "rate_plan_amount", cellsformat: "c2", width: "12%"},
					{ text: "Bolt On Amount", datafield: "bolt_on_amount", cellsformat: "c2", width: "12%"},
					{ text: "Transaction Amount", datafield: "transaction_amount", cellsformat: "c2", width: "12%"},
					{ text: "Posted Date", datafield: "posted_date", width: "14%", cellsformat: "MM/dd/yyyy"}
				]
			});	
		}
		elem = $("#jqx-upload-file-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
    			filterable: true,
    			sortable: true,
    	        groupable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "type", type: "number" },
						{ name: "update_date", type: "date" },
						{ name: "user_id", type: "string"  },
						{ name: "file", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					{ datafield: "type", hidden: true },
					{ text: "update_date", datafield: "update_date", width: "30%", cellsformat: "MM/dd/yyyy"},
					{ text: "user_id", datafield: "user_id", width: "30%"},
					{ text: "File", datafield: "file", width: "40%"}
				]
			});	
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedUploadFile = event.args.row.sid;
				WRPAdminApp.pagescript.getExcelDetail(event.args.row.sid, "consolidation", event.args.row.type);
			});
		}

		elem = $("#consolidation-upload-progress-window");
		if (elem) {
			elem.jqxWindow({
				width: 200,
				height: 80
			});
		}
		elem = $("#consolidation-upload-progress-bar");
		if (elem) {
			elem.jqxProgressBar({
				animationDuration: 0
			});
		}
		
    	
    	$('#consolidation-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#consolidation-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#consolidation-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#consolidation-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#consolidation-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#consolidation-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#consolidation-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#consolidation-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#consolidation-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	/*
       	$('#consolidation-search-start-date').on('valueChanged', function (event) {
       			$("#consolidation-search-start-date").jqxDateTimeInput('setDate', event.args.date);
               	WRPAdminApp.pagescript.getConsolidationList(WRPAdminApp.pagescript._selectedUploadFile);
    	}); 
        
    	$('#consolidation-search-end-date').on('valueChanged', function (event) {
    		$("#consolidation-search-end-date").jqxDateTimeInput('setDate', event.args.date);
               	WRPAdminApp.pagescript.getConsolidationList(WRPAdminApp.pagescript._selectedUploadFile);
    	}); 
    	*/
    	elem = $("#jqx-reconciliation-list");
		if (elem) {
			var cellsrenderer = function(row, column, value, data){
				
				if (data.total < 0) {
	                return "redClass";
	            } else if (data.total == 0) {
	                return "greenClass";
	            } else if (data.total > 0) {
	                return "blueClass";
	            }
			};
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: true,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "transaction_date", type: "date"  },
						{ name: "esn", type: "string"  },
						{ name: "transaction_type", type: "string"  },
						//{ name: "qualification_status", type: "string"  },
						{ name: "rate_plan_amount", type: "number"  },
						{ name: "bolt_on_amount", type: "number"  },
						{ name: "transaction_amount", type: "number"  },
						{ name: "total_primary_rate_plan_amount", type: "number"  },
						{ name: "total_features_data_plan_amount", type: "number"  },
						{ name: "rebate", type: "number"  },
						{ name: "total", type: "number"  },
						{ name: "name", type: "string"  },
						{ name: "posted_date", type: "date"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: 80, cellclassname: cellsrenderer, hidden: true },
					{ text: "Transaction Date", datafield: "transaction_date", width: 120, cellclassname: cellsrenderer, cellsformat: "MM/dd/yyyy"  },
					{ text: "ESN", datafield: "esn", cellclassname: cellsrenderer, width: 100  },
					{ text: "Transaction Type", datafield: "transaction_type", width: 100, cellclassname: cellsrenderer  },
					//{ text: "Qualification Status", datafield: "qualification_status", width: 200, cellclassname: cellsrenderer  },
					{ text: "Rate Plan Amount", datafield: "rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Total Primary Rate Plan Amount", datafield: "total_primary_rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Bolt On Amount", datafield: "bolt_on_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					{ text: "Total Features Data Plan Amount", datafield: "total_features_data_plan_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					{ text: "Transaction Amount", datafield: "transaction_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Rebate", datafield: "rebate", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Description", datafield: "name", width: 150, cellclassname: cellsrenderer},
					{ text: "Posted Date", datafield: "posted_date", width: 100, cellclassname: cellsrenderer, cellsformat: "MM/dd/yyyy"  },
					{ text: "Difference", datafield: "total", cellsformat: "c2", width: 100, cellclassname: cellsrenderer }
				]
			});	
		}
    	
		$('#reconciliation-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-search-end-date").jqxDateTimeInput('setDate', end);
       	});
    	//dis
		$('#reconciliation-disqualify-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-disqualify-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-disqualify-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-disqualify-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-disqualify-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-disqualify-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-disqualify-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-disqualify-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-disqualify-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	//rebate
		$('#reconciliation-rebate-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-rebate-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-rebate-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-rebate-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-rebate-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-rebate-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-rebate-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-rebate-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-rebate-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	//spiff
		$('#reconciliation-spiff-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-spiff-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-spiff-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-spiff-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-spiff-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-spiff-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-spiff-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-spiff-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-spiff-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	//bill
    	
		$('#reconciliation-bill-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-bill-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-bill-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-bill-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-bill-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-bill-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-bill-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-bill-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-bill-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	//qpay
		$('#reconciliation-qpay-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-qpay-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-qpay-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-qpay-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-qpay-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-qpay-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#reconciliation-qpay-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#reconciliation-qpay-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#reconciliation-qpay-search-end-date").jqxDateTimeInput('setDate', end);
       	});
    	// dis
    	elem = $("#jqx-disqualify-list");
		if (elem) {
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "door_name", type: "string"  },
						{ name: "address", type: "string"  },
						{ name: "asap_login", type: "string"  },
						{ name: "account_number", type: "string"  },
						{ name: "subscriber_id", type: "string"  },
						{ name: "mdn", type: "string"  },
						{ name: "esn", type: "string"  },
						{ name: "sim", type: "string"  },
						{ name: "esn_history", type: "string"  },
						{ name: "sim_history", type: "string"  },
						{ name: "subscriber____status", type: "string"  },
						{ name: "account_balance", type: "string"  },
						{ name: "handset_model", type: "string"  },
						{ name: "transaction_date", type: "string"  },
						{ name: "transaction_type", type: "string"  },
						{ name: "rate_plan", type: "string"  },
						{ name: "bolt_on", type: "string"  },
						{ name: "business_rule_reason_code", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: 80},
					{ text: "Door Name", datafield: "door_name", width: 120},
					{ text: "Address", datafield: "address"},
					{ text: "Asap Login", datafield: "asap_login", width: 250},
					{ text: "Account Number", datafield: "account_number", width: 200},
					{ text: "Subscriber ID", datafield: "subscriber_id", cellsformat: "c2", width: 150},
					{ text: "MDN", datafield: "mdn", cellsformat: "c2", width: 150},
					{ text: "ESN", datafield: "esn", cellsformat: "c2", width: 120},
					{ text: "SIM", datafield: "sim", cellsformat: "c2", width: 120,},
					{ text: "ESN History", datafield: "esn_history", cellsformat: "c2", width: 150},
					{ text: "SIM History", datafield: "sim_history", cellsformat: "c2", width: 150},
					{ text: "Subscriber Status", datafield: "subscriber____status", width: 100},
					{ text: "Account Balance", datafield: "account_balance", cellsformat: "c2"},
					{ text: "Handset Model", datafield: "handset_model", cellsformat: "c2", width: 120},
					{ text: "Transaction Date", datafield: "transaction_date", cellsformat: "c2", width: 120, cellsformat: "MM/dd/yyyy"},
					{ text: "Transaction Type", datafield: "transaction_type", cellsformat: "c2", width: 150},
					{ text: "Rate Plan", datafield: "rate_plan", cellsformat: "c2", width: 150},
					{ text: "Bolt On", datafield: "bolt_on", width: 100},
					{ text: "Business Rule Reason Code", datafield: "business_rule_reason_code", cellsformat: "c2"}
				]
			});	
		}
		elem = $("#jqx-upload-disqualify-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
    			filterable: true,
    			sortable: true,
    	        groupable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "type", type: "number" },
						{ name: "update_date", type: "date" },
						{ name: "user_id", type: "string"  },
						{ name: "file", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						{ datafield: "type", hidden: true },
						{ text: "update_date", datafield: "update_date", width: "30%", cellsformat: "MM/dd/yyyy"},
						{ text: "user_id", datafield: "user_id", width: "30%"},
						{ text: "File", datafield: "file", width: "40%"}
				]
			});	
			
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedUploadFile = event.args.row.sid;
				WRPAdminApp.pagescript.getExcelDetail(event.args.row.sid, "disqualify", event.args.row.type);
			});
		}

		elem = $("#consolidation-upload-progress-window");
		if (elem) {
			elem.jqxWindow({
				width: 200,
				height: 80
			});
		}
		elem = $("#consolidation-upload-progress-bar");
		if (elem) {
			elem.jqxProgressBar({
				animationDuration: 0
			});
		}
    	
    	elem = $("#jqx-reconciliation-disqualify-list");
		if (elem) {
			var cellsrenderer = function(row, column, value, data){
				/*
				if (data.total < 0) {
	                return "redClass";
	            } else if (data.total == 0) {
	                return "greenClass";
	            } else if (data.total > 0) {
	                return "blueClass";
	            }
*/
			};
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: true,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "transaction_date", type: "date"  },
						{ name: "esn", type: "string"  },
						{ name: "transaction_type", type: "string"  },
						{ name: "transaction_amount", type: "number"  },
						{ name: "total_primary_rate_plan_amount", type: "number"  },
						{ name: "total_features_data_plan_amount", type: "number"  },
						{ name: "rebate", type: "number"  },
						{ name: "total", type: "number"  },
						{ name: "name", type: "string"  },
						{ name: "account_balance", type: "number"  },
						{ name: "subscriber____status", type: "String"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: 80, cellclassname: cellsrenderer, hidden: true   },
					{ text: "Transaction Date", datafield: "transaction_date", width: 120, cellclassname: cellsrenderer, cellsformat: "MM/dd/yyyy"  },
					{ text: "ESN", datafield: "esn", cellclassname: cellsrenderer  },
					{ text: "Transaction Type", datafield: "transaction_type", width: 250, cellclassname: cellsrenderer  },
					//{ text: "Qualification Status", datafield: "qualification_status", width: 200, cellclassname: cellsrenderer  },
					{ text: "Total Primary Rate Plan Amount", datafield: "total_primary_rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Total Features Data Plan Amount", datafield: "total_features_data_plan_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					//{ text: "Transaction Amount", datafield: "transaction_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Rebate", datafield: "rebate", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Description", datafield: "name", width: 150, cellclassname: cellsrenderer},
					//{ text: "Dealer Fee", datafield: "dealerfee", cellsformat: "c2", width: 150, cellclassname: cellsrenderer},
					{ text: "Account Balance", datafield: "account_balance", cellsformat: "c2", width: 150, cellclassname: cellsrenderer},
					{ text: "Subscriber Status", datafield: "subscriber____status", width: 100, cellclassname: cellsrenderer  }/*,
					{ text: "Difference", datafield: "total", cellsformat: "c2", width: 100, cellclassname: cellsrenderer }*/
				]
			});	
		}
    	// rebate
		elem = $("#jqx-rebate-list");
		if (elem) {
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						//hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "door_name", type: "string"  },
						{ name: "address", type: "string"  },
						{ name: "asap_login", type: "string"  },
						{ name: "account_number", type: "string"  },
						{ name: "subscriber_id", type: "string"  },
						{ name: "mdn", type: "string"  },
						{ name: "esn", type: "string"  },
						{ name: "sim", type: "string"  },
						{ name: "handset_model", type: "string"  },
						{ name: "transaction_date", type: "string"  },
						{ name: "program_name", type: "string"  },
						{ name: "rebate_type", type: "string"  },
						{ name: "qualification_status", type: "string"  },
						{ name: "rebate_amount", type: "string"  },
						{ name: "posted_date", type: "string"  }
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						// hidden end
						{ text: "Door Code", datafield: "door_code", width: 80},
						{ text: "Door Name", datafield: "door_name", width: 120},
						{ text: "Address", datafield: "address"},
						{ text: "Asap Login", datafield: "asap_login", width: 250},
						{ text: "Account Number", datafield: "account_number", width: 200},
						{ text: "Subscriber ID", datafield: "subscriber_id", cellsformat: "c2", width: 150},
						{ text: "MDN", datafield: "mdn", cellsformat: "c2", width: 150},
						{ text: "ESN", datafield: "esn", cellsformat: "c2", width: 120},
						{ text: "SIM", datafield: "sim", cellsformat: "c2", width: 120,},
						{ text: "Handset Model", datafield: "handset_model", cellsformat: "c2", width: 120},
						{ text: "Transaction Date", datafield: "transaction_date", cellsformat: "c2", width: 120, cellsformat: "MM/dd/yyyy"},
						{ text: "Program Name", datafield: "program_name", cellsformat: "c2", width: 150},
						{ text: "Rebate Type", datafield: "rebate_type", cellsformat: "c2", width: 150},
						{ text: "Qualification Status", datafield: "qualification_status", cellsformat: "c2", width: 150},
						{ text: "Rebate Amount", datafield: "rebate_amount", width: 100},
						{ text: "Posted Date", datafield: "posted_date", cellsformat: "c2", cellsformat: "MM/dd/yyyy"}
				]
			});	
		}
		elem = $("#jqx-upload-rebate-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
    			filterable: true,
    			sortable: true,
    	        groupable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "type", type: "number" },
						{ name: "update_date", type: "date" },
						{ name: "user_id", type: "string"  },
						{ name: "file", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						{ datafield: "type", hidden: true },
						{ text: "update_date", datafield: "update_date", width: "30%", cellsformat: "MM/dd/yyyy"},
						{ text: "user_id", datafield: "user_id", width: "30%"},
						{ text: "File", datafield: "file", width: "40%"}
				]
			});	
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedUploadFile = event.args.row.sid;
				WRPAdminApp.pagescript.getExcelDetail(event.args.row.sid, "rebate", event.args.row.type);
			});
		}
		
		

		elem = $("#consolidation-upload-progress-window");
		if (elem) {
			elem.jqxWindow({
				width: 200,
				height: 80
			});
		}
		elem = $("#consolidation-upload-progress-bar");
		if (elem) {
			elem.jqxProgressBar({
				animationDuration: 0
			});
		}
    	
    	elem = $("#jqx-reconciliation-rebate-list");
		if (elem) {
			var cellsrenderer = function(row, column, value, data){
				/*
				if (data.total < 0) {
	                return "redClass";
	            } else if (data.total == 0) {
	                return "greenClass";
	            } else if (data.total > 0) {
	                return "blueClass";
	            }*/
			};
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: true,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "transaction_date", type: "date"  },
						{ name: "esn", type: "string"  },
						{ name: "transaction_type", type: "string"  },
						{ name: "qualification_status", type: "string"  },
						//{ name: "rate_plan_amount", type: "number"  },
						//{ name: "bolt_on_amount", type: "number"  },
						//{ name: "transaction_amount", type: "number"  },
						{ name: "total_primary_rate_plan_amount", type: "number"  },
						{ name: "total_features_data_plan_amount", type: "number"  },
						{ name: "rebate", type: "number"  },
						{ name: "total", type: "number"  },
						{ name: "name", type: "string"  },
						{ name: "rebate_amount", type: "number"  },/*
						{ name: "spiff_amount", type: "number"  },*/
						{ name: "posted_date", type: "number"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: 80, cellclassname: cellsrenderer  },
					{ text: "Transaction Date", datafield: "transaction_date", width: 120, cellclassname: cellsrenderer, cellsformat: "MM/dd/yyyy"  },
					{ text: "ESN", datafield: "esn", cellclassname: cellsrenderer  },
					{ text: "Transaction Type", datafield: "transaction_type", width: 250, cellclassname: cellsrenderer  },
					{ text: "Qualification Status", datafield: "qualification_status", width: 200, cellclassname: cellsrenderer  },
					//{ text: "Rate Plan Amount", datafield: "rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Total Primary Rate Plan Amount", datafield: "total_primary_rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					//{ text: "Bolt On Amount", datafield: "bolt_on_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					{ text: "Total Features Data Plan Amount", datafield: "total_features_data_plan_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					//{ text: "Transaction Amount", datafield: "transaction_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Rebate", datafield: "rebate", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Description", datafield: "name", width: 150, cellclassname: cellsrenderer},
					//{ text: "Dealer Fee", datafield: "dealerfee", cellsformat: "c2", width: 150, cellclassname: cellsrenderer},
					{ text: "Rebate Amount", datafield: "rebate_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer}//,
					/*{ text: "Posted Date", datafield: "posted_date", width: 100, cellclassname: cellsrenderer  },
					{ text: "Difference", datafield: "total", cellsformat: "c2", width: 100, cellclassname: cellsrenderer }*/
				]
			});	
		}
    	// spiff
		elem = $("#jqx-spiff-list");
		if (elem) {
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						//hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "door_name", type: "string"  },
						{ name: "address", type: "string"  },
						{ name: "account_number", type: "string"  },
						{ name: "subscriber_id", type: "string"  },
						{ name: "mdn", type: "string"  },
						{ name: "esn", type: "string"  },
						{ name: "sim", type: "string"  },
						{ name: "handset_model", type: "string"  },
						{ name: "transaction_date", type: "string"  },
						{ name: "program_name", type: "string"  },
						{ name: "spiff_type", type: "string"  },
						{ name: "rate_plan", type: "string"  },
						{ name: "spiff_amount", type: "string"  },
						{ name: "posted_date", type: "string"  }
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						// hidden end
						{ text: "Door Code", datafield: "door_code", width: 80},
						{ text: "Door Name", datafield: "door_name", width: 120},
						{ text: "Address", datafield: "address"},
						{ text: "Asap Login", datafield: "asap_login", width: 250},
						{ text: "Account Number", datafield: "account_number", width: 200},
						{ text: "Subscriber ID", datafield: "subscriber_id", cellsformat: "c2", width: 150},
						{ text: "MDN", datafield: "mdn", cellsformat: "c2", width: 150},
						{ text: "ESN", datafield: "esn", cellsformat: "c2", width: 120},
						{ text: "SIM", datafield: "sim", cellsformat: "c2", width: 120,},
						{ text: "Handset Model", datafield: "handset_model", cellsformat: "c2", width: 120},
						{ text: "Transaction Date", datafield: "transaction_date", cellsformat: "c2", width: 120, cellsformat: "MM/dd/yyyy"},
						{ text: "Program Name", datafield: "program_name", cellsformat: "c2", width: 150},
						{ text: "SPIFF Type", datafield: "spiff_type", cellsformat: "c2", width: 150},
						{ text: "Rate Plan", datafield: "rate_plan", cellsformat: "c2", width: 150},
						{ text: "Spiff Amount", datafield: "spiff_amount", width: 100},
						{ text: "Posted Date", datafield: "posted_date", cellsformat: "c2", cellsformat: "MM/dd/yyyy"}
				]
			});	
		}
		elem = $("#jqx-upload-spiff-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
    			filterable: true,
    			sortable: true,
    	        groupable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "type", type: "number" },
						{ name: "update_date", type: "date" },
						{ name: "user_id", type: "string"  },
						{ name: "file", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						{ datafield: "type", hidden: true },
						{ text: "update_date", datafield: "update_date", width: "30%", cellsformat: "MM/dd/yyyy"},
						{ text: "user_id", datafield: "user_id", width: "30%"},
						{ text: "File", datafield: "file", width: "40%"}
				]
			});	
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedUploadFile = event.args.row.sid;
				WRPAdminApp.pagescript.getExcelDetail(event.args.row.sid, "spiff", event.args.row.type);
			});
		}
		
		

		elem = $("#consolidation-upload-progress-window");
		if (elem) {
			elem.jqxWindow({
				width: 200,
				height: 80
			});
		}
		elem = $("#consolidation-upload-progress-bar");
		if (elem) {
			elem.jqxProgressBar({
				animationDuration: 0
			});
		}
    	
    	elem = $("#jqx-reconciliation-spiff-list");
		if (elem) {
			var cellsrenderer = function(row, column, value, data){
				/*
				if (data.total < 0) {
	                return "redClass";
	            } else if (data.total == 0) {
	                return "greenClass";
	            } else if (data.total > 0) {
	                return "blueClass";
	            }*/
			};
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: true,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "transaction_date", type: "date"  },
						{ name: "esn", type: "string"  },
						//{ name: "transaction_type", type: "string"  },
						//{ name: "qualification_status", type: "string"  },
						//{ name: "rate_plan_amount", type: "number"  },
						//{ name: "bolt_on_amount", type: "number"  },
						//{ name: "transaction_amount", type: "number"  },
						{ name: "total_primary_rate_plan_amount", type: "number"  },
						{ name: "total_features_data_plan_amount", type: "number"  },
						{ name: "rebate", type: "number"  },
						{ name: "name", type: "string"  },
						//{ name: "dealerfee", type: "number"  },
						{ name: "spiff_amount", type: "number"  },
						{ name: "posted_date", type: "number"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: 80, cellclassname: cellsrenderer, hidden: true   },
					{ text: "Transaction Date", datafield: "transaction_date", width: 120, cellclassname: cellsrenderer  },
					{ text: "ESN", datafield: "esn", cellclassname: cellsrenderer  },
					//{ text: "Transaction Type", datafield: "transaction_type", width: 250, cellclassname: cellsrenderer  },
					//{ text: "Qualification Status", datafield: "qualification_status", width: 200, cellclassname: cellsrenderer  },
					//{ text: "Rate Plan Amount", datafield: "rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Total Primary Rate Plan Amount", datafield: "total_primary_rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					//{ text: "Bolt On Amount", datafield: "bolt_on_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					{ text: "Total Features Data Plan Amount", datafield: "total_features_data_plan_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					//{ text: "Transaction Amount", datafield: "transaction_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Rebate", datafield: "rebate", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Description", datafield: "name", width: 150, cellclassname: cellsrenderer},
					//{ text: "Dealer Fee", datafield: "dealerfee", cellsformat: "c2", width: 150, cellclassname: cellsrenderer},
					{ text: "Spiff Amount", datafield: "spiff_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer},
					{ text: "Posted Date", datafield: "posted_date", width: 100, cellclassname: cellsrenderer, cellsformat: "MM/dd/yyyy"  },
				]
			});	
		}
    	// bill
		elem = $("#jqx-bill-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						//hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "transaction_date", type: "string"  },
						{ name: "store_name", type: "string"  },
						{ name: "store_address", type: "string"  },
						{ name: "first_name", type: "string"  },
						{ name: "last_name", type: "string"  },
						{ name: "customer_phone_number", type: "string"  },
						{ name: "customer_email", type: "string"  },
						{ name: "application_number", type: "string"  },
						{ name: "transaction_type", type: "string"  },
						{ name: "shopping_cart_amount", type: "string"  },
						{ name: "cart_items", type: "string"  },
						{ name: "disbursement_status", type: "string"  },
						{ name: "month", type: "string"  },
						{ name: "typ", type: "string"  }
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						// hidden end
						{ text: "Transaction Date", datafield: "transaction_date", width: 80, cellsformat: "MM/dd/yyyy"},
						{ text: "Store Name", datafield: "store_name", width: 120},
						{ text: "Store Address", datafield: "store_address"},
						{ text: "First Name", datafield: "first_name", width: 250},
						{ text: "Last Name", datafield: "last_name", width: 200},
						{ text: "Customer Phone Number", datafield: "customer_phone_number", cellsformat: "c2", width: 150},
						{ text: "Customer Email", datafield: "customer_email", cellsformat: "c2", width: 150},
						{ text: "Application Number", datafield: "application_number", cellsformat: "c2", width: 120},
						{ text: "Transaction Type", datafield: "transaction_type", cellsformat: "c2", width: 120,},
						{ text: "Shopping Cart Amount", datafield: "shopping_cart_amount", cellsformat: "c2", width: 120},
						{ text: "Cart Items", datafield: "cart_items", cellsformat: "c2", width: 120,},
						{ text: "Disbursement Status", datafield: "disbursement_status", cellsformat: "c2", width: 150},
						{ text: "Month", datafield: "month", cellsformat: "c2", width: 150},
						{ text: "TYP", datafield: "typ", cellsformat: "c2", width: 150}
				]
			});	
		}
		elem = $("#jqx-upload-bill-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
    			filterable: true,
    			sortable: true,
    	        groupable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "type", type: "number" },
						{ name: "update_date", type: "date" },
						{ name: "user_id", type: "string"  },
						{ name: "file", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						{ datafield: "type", hidden: true },
						{ text: "update_date", datafield: "update_date", width: "30%", cellsformat: "MM/dd/yyyy"},
						{ text: "user_id", datafield: "user_id", width: "30%"},
						{ text: "File", datafield: "file", width: "40%"}
				]
			});	
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedUploadFile = event.args.row.sid;
				WRPAdminApp.pagescript.getExcelDetail(event.args.row.sid, "bill", event.args.row.type);
			});
		}
		

		elem = $("#consolidation-upload-progress-window");
		if (elem) {
			elem.jqxWindow({
				width: 200,
				height: 80
			});
		}
		elem = $("#consolidation-upload-progress-bar");
		if (elem) {
			elem.jqxProgressBar({
				animationDuration: 0
			});
		}
    	
    	elem = $("#jqx-reconciliation-bill-list");
		if (elem) {
			var cellsrenderer = function(row, column, value, data){
				
				if (data.total < 0) {
	                return "redClass";
	            } else if (data.total == 0) {
	                return "greenClass";
	            } else if (data.total > 0) {
	                return "blueClass";
	            }
			};
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: true,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "transaction_date", type: "date"  },
						{ name: "esn", type: "string"  },
						{ name: "transaction_type", type: "string"  },
						{ name: "qualification_status", type: "string"  },
						{ name: "rate_plan_amount", type: "number"  },
						{ name: "bolt_on_amount", type: "number"  },
						{ name: "transaction_amount", type: "number"  },
						{ name: "total_primary_rate_plan_amount", type: "number"  },
						{ name: "total_features_data_plan_amount", type: "number"  },
						{ name: "rebate", type: "number"  },
						{ name: "total", type: "number"  },
						{ name: "name", type: "string"  },
						{ name: "dealerfee", type: "number"  },
						{ name: "spiff_amount", type: "number"  },
						{ name: "posted_date", type: "number"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: 80, hidden: true   },
					{ text: "Transaction Date", datafield: "transaction_date", width: 120, cellsformat: "MM/dd/yyyy"  },
					{ text: "ESN", datafield: "esn"},
					{ text: "Transaction Type", datafield: "transaction_type", width: 250},
					{ text: "Qualification Status", datafield: "qualification_status", width: 200},
					{ text: "Rate Plan Amount", datafield: "rate_plan_amount", cellsformat: "c2", width: 150},
					{ text: "Total Primary Rate Plan Amount", datafield: "total_primary_rate_plan_amount", cellsformat: "c2", width: 150},
					{ text: "Bolt On Amount", datafield: "bolt_on_amount", cellsformat: "c2", width: 120},
					{ text: "Total Features Data Plan Amount", datafield: "total_features_data_plan_amount", cellsformat: "c2", width: 120},
					{ text: "Transaction Amount", datafield: "transaction_amount", cellsformat: "c2", width: 150},
					{ text: "Rebate", datafield: "rebate", cellsformat: "c2", width: 150},
					{ text: "Description", datafield: "name", width: 150},
					{ text: "Dealer Fee", datafield: "dealerfee", cellsformat: "c2", width: 150},
					{ text: "Spiff Amount", datafield: "spiff_amount", cellsformat: "c2", width: 150},
					{ text: "Posted Date", datafield: "posted_date", width: 100, cellsformat: "MM/dd/yyyy"  },
					{ text: "Difference", datafield: "total", cellsformat: "c2", width: 100}
				]
			});	
		}
    	// qpay
		elem = $("#jqx-qpay-list");
		if (elem) {
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						//hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "branch_id", type: "string" },
						{ name: "provider", type: "string"  },
						{ name: "product", type: "string"  },
						{ name: "type", type: "string"  },
						{ name: "date/time", type: "string"  },
						{ name: "account#", type: "string"  },
						{ name: "confirmation_id", type: "string"  },
						{ name: "paymnet", type: "string"  },
						{ name: "ld", type: "string"  },
						{ name: "dealer_fee", type: "string"  },
						{ name: "total", type: "string"  },
						{ name: "user", type: "string"  },
						{ name: "cancellation_reason", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						// hidden end
						{ text: "Branch ID", datafield: "branch_id", width: 80},
						{ text: "Provider", datafield: "provider", width: 120},
						{ text: "Product", datafield: "product"},
						{ text: "Type", datafield: "type", width: 250},
						{ text: "Date / Time", datafield: "date/time", width: 200, cellsformat: "MM/dd/yyyy"},
						{ text: "Account#", datafield: "account#", cellsformat: "c2", width: 150},
						{ text: "Confirmation ID", datafield: "confirmation_id", cellsformat: "c2", width: 150},
						{ text: "Payment", datafield: "paymnet", cellsformat: "c2", width: 120},
						{ text: "LD", datafield: "ld", cellsformat: "c2", width: 120,},
						{ text: "Dealer Fee", datafield: "dealer_fee", cellsformat: "c2", width: 150},
						{ text: "Total", datafield: "total", cellsformat: "c2", width: 150},
						{ text: "User", datafield: "user", width: 100},
						{ text: "Cancellation Reason", datafield: "cancellation_reason", cellsformat: "c2"}
										]
			});	
		}
		elem = $("#jqx-upload-qpay-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
    			filterable: true,
    			sortable: true,
    	        groupable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "type", type: "number" },
						{ name: "update_date", type: "date" },
						{ name: "user_id", type: "string"  },
						{ name: "file", type: "string"  } // Pending 표기 문제로 date 대신 string 처리
						]
						}),
						columns: [		
						{ datafield: "sid", hidden: true },
						{ datafield: "type", hidden: true },
						{ text: "update_date", datafield: "update_date", width: "30%", cellsformat: "MM/dd/yyyy"},
						{ text: "user_id", datafield: "user_id", width: "30%"},
						{ text: "File", datafield: "file", width: "40%"}
				]
			});	
			
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedUploadFile = event.args.row.sid;
				WRPAdminApp.pagescript.getExcelDetail(event.args.row.sid, "qpay", event.args.row.type);
			});
		}

		elem = $("#consolidation-upload-progress-window");
		if (elem) {
			elem.jqxWindow({
				width: 200,
				height: 80
			});
		}
		elem = $("#consolidation-upload-progress-bar");
		if (elem) {
			elem.jqxProgressBar({
				animationDuration: 0
			});
		}
    	
    	elem = $("#jqx-reconciliation-qpay-list");
		if (elem) {
			var cellsrenderer = function(row, column, value, data){
				/*
				if (data.total < 0) {
	                return "redClass";
	            } else if (data.total == 0) {
	                return "greenClass";
	            } else if (data.total > 0) {
	                return "blueClass";
	            }
*/
			};
			
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
    			columnsresize:true,
				filterable: true,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "door_code", type: "string" },
						{ name: "date/time", type: "date"  },
						{ name: "esn", type: "string"  },
						//{ name: "transaction_type", type: "string"  },
						//{ name: "qualification_status", type: "string"  },
						//{ name: "rate_plan_amount", type: "number"  },
						//{ name: "bolt_on_amount", type: "number"  },
						//{ name: "transaction_amount", type: "number"  },
						{ name: "total_primary_rate_plan_amount", type: "number"  },
						{ name: "total_features_data_plan_amount", type: "number"  },
						{ name: "rebate", type: "number"  },
						//{ name: "total", type: "number"  },
						{ name: "name", type: "string"  },
						{ name: "dealerfee", type: "number"  }//,
						//{ name: "spiff_amount", type: "number"  },
						//{ name: "posted_date", type: "number"  } // Pending 표기 문제로 date 대신 string 처리
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					// hidden end
					{ text: "Door Code", datafield: "door_code", width: 80, cellclassname: cellsrenderer, hidden: true   },
					{ text: "Date / Time", datafield: "date/time", width: 120, cellclassname: cellsrenderer, cellsformat: "MM/dd/yyyy"  },
					{ text: "ESN", datafield: "esn", cellclassname: cellsrenderer  },
					//{ text: "Transaction Type", datafield: "transaction_type", width: 250, cellclassname: cellsrenderer  },
					//{ text: "Qualification Status", datafield: "qualification_status", width: 200, cellclassname: cellsrenderer  },
					//{ text: "Rate Plan Amount", datafield: "rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Total Primary Rate Plan Amount", datafield: "total_primary_rate_plan_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					//{ text: "Bolt On Amount", datafield: "bolt_on_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					{ text: "Total Features Data Plan Amount", datafield: "total_features_data_plan_amount", cellsformat: "c2", width: 120, cellclassname: cellsrenderer  },
					//{ text: "Transaction Amount", datafield: "transaction_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Rebate", datafield: "rebate", cellsformat: "c2", width: 150, cellclassname: cellsrenderer  },
					{ text: "Description", datafield: "name", width: 150, cellclassname: cellsrenderer},
					{ text: "Dealer Fee", datafield: "dealerfee", cellsformat: "c2", width: 150, cellclassname: cellsrenderer},
					//{ text: "Spiff Amount", datafield: "spiff_amount", cellsformat: "c2", width: 150, cellclassname: cellsrenderer},
					/*{ text: "Posted Date", datafield: "posted_date", width: 100, cellclassname: cellsrenderer  },
					{ text: "Difference", datafield: "total", cellsformat: "c2", width: 100, cellclassname: cellsrenderer }*/
				]
			});	
		}
    	
    	WRPAdminApp.pagescript.getUploadFileList();
    },
    uploadConsolidationExcelFile: function() {
        jqueryConsolidationUploadFileForm = $("#consolidation-upload-file-form");
        if (!jqueryConsolidationUploadFileForm[0]) return;
        if (jqueryConsolidationUploadFileForm[0].uploadExcelFile.files.length > 0) {
        	jqueryConsolidationUploadFileForm.attr("action", "ajax/consolidation/uploadConsolidationExcelFile.jsp");
        	jqueryConsolidationUploadFileForm.ajaxForm(WRPAdminApp.pagescript.callbackUploadConsolidationExcelFile);
        	jqueryConsolidationUploadFileForm.submit();
        }
        try {
    		$("#consolidation-upload-progress-window").jqxWindow("open");
    		$("#consolidation-upload-progress-bar").jqxProgressBar({ value: 0 });
			setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    	} catch (e) {
    		console.warn(e);    		
    	}
    },
    //dis upload
    uploadDisqualifyExcelFile: function() {
        jqueryConsolidationUploadFileForm = $("#disqualify-upload-file-form");
        if (!jqueryConsolidationUploadFileForm[0]) return;
        if (jqueryConsolidationUploadFileForm[0].uploadExcelFile.files.length > 0) {
        	jqueryConsolidationUploadFileForm.attr("action", "ajax/consolidation/uploadDisqualifyExcelFile.jsp");
        	jqueryConsolidationUploadFileForm.ajaxForm(WRPAdminApp.pagescript.callbackUploadConsolidationExcelFile);
        	jqueryConsolidationUploadFileForm.submit();
        }
        try {
    		$("#consolidation-upload-progress-window").jqxWindow("open");
    		$("#consolidation-upload-progress-bar").jqxProgressBar({ value: 0 });
			setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    	} catch (e) {
    		console.warn(e);    		
    	}
    },
    //rebate upload
    uploadRebateExcelFile: function() {
        jqueryConsolidationUploadFileForm = $("#rebate-upload-file-form");
        if (!jqueryConsolidationUploadFileForm[0]) return;
        if (jqueryConsolidationUploadFileForm[0].uploadExcelFile.files.length > 0) {
        	jqueryConsolidationUploadFileForm.attr("action", "ajax/consolidation/uploadRebateExcelFile.jsp");
        	jqueryConsolidationUploadFileForm.ajaxForm(WRPAdminApp.pagescript.callbackUploadConsolidationExcelFile);
        	jqueryConsolidationUploadFileForm.submit();
        }
        try {
    		$("#consolidation-upload-progress-window").jqxWindow("open");
    		$("#consolidation-upload-progress-bar").jqxProgressBar({ value: 0 });
			setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    	} catch (e) {
    		console.warn(e);    		
    	}
    },
    //spiff upload
    uploadSpiffExcelFile: function() {
        jqueryConsolidationUploadFileForm = $("#spiff-upload-file-form");
        if (!jqueryConsolidationUploadFileForm[0]) return;
        if (jqueryConsolidationUploadFileForm[0].uploadExcelFile.files.length > 0) {
        	jqueryConsolidationUploadFileForm.attr("action", "ajax/consolidation/uploadSpiffExcelFile.jsp");
        	jqueryConsolidationUploadFileForm.ajaxForm(WRPAdminApp.pagescript.callbackUploadConsolidationExcelFile);
        	jqueryConsolidationUploadFileForm.submit();
        }
        try {
    		$("#consolidation-upload-progress-window").jqxWindow("open");
    		$("#consolidation-upload-progress-bar").jqxProgressBar({ value: 0 });
			setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    	} catch (e) {
    		console.warn(e);    		
    	}
    },
    //bill upload
    uploadBillExcelFile: function() {
        jqueryConsolidationUploadFileForm = $("#bill-upload-file-form");
        if (!jqueryConsolidationUploadFileForm[0]) return;
        if (jqueryConsolidationUploadFileForm[0].uploadExcelFile.files.length > 0) {
        	jqueryConsolidationUploadFileForm.attr("action", "ajax/consolidation/uploadBillExcelFile.jsp");
        	jqueryConsolidationUploadFileForm.ajaxForm(WRPAdminApp.pagescript.callbackUploadConsolidationExcelFile);
        	jqueryConsolidationUploadFileForm.submit();
        }
        try {
    		$("#consolidation-upload-progress-window").jqxWindow("open");
    		$("#consolidation-upload-progress-bar").jqxProgressBar({ value: 0 });
			setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    	} catch (e) {
    		console.warn(e);    		
    	}
    },
    //qpay upload
    uploadQpayExcelFile: function() {
        jqueryConsolidationUploadFileForm = $("#qpay-upload-file-form");
        if (!jqueryConsolidationUploadFileForm[0]) return;
        if (jqueryConsolidationUploadFileForm[0].uploadExcelFile.files.length > 0) {
        	jqueryConsolidationUploadFileForm.attr("action", "ajax/consolidation/uploadQpayExcelFile.jsp");
        	jqueryConsolidationUploadFileForm.ajaxForm(WRPAdminApp.pagescript.callbackUploadConsolidationExcelFile);
        	jqueryConsolidationUploadFileForm.submit();
        }
        try {
    		$("#consolidation-upload-progress-window").jqxWindow("open");
    		$("#consolidation-upload-progress-bar").jqxProgressBar({ value: 0 });
			setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    	} catch (e) {
    		console.warn(e);    		
    	}
    },
    
    callbackUploadConsolidationExcelFile: function(data, state) {
    	
    },
    pollingConsolidationUploadingProgress: function() {
    	$.ajax({
    		url: "ajax/consolidation/pollingUploadingProcess.jsp",
    		method: "GET",
    		dataType: "json",
    		success: function(result) {
    			if (result.last !== undefined && result.curr !== undefined) {
    				if (result.last > result.curr) {
    					try {
    						$("#consolidation-upload-progress-bar").jqxProgressBar({ value: Math.ceil((result.curr / result.last) * 100) });
    					} catch (e) {
    						console.warn(e);
    					}
    					setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    				} else {
    					alert("Complete");
    		    		$("#consolidation-upload-progress-window").jqxWindow("close");
    		    		WRPAdminApp.pagescript.getUploadFileList();
    				}
    			} else {
					setTimeout(WRPAdminApp.pagescript.pollingConsolidationUploadingProgress, 500);
    			}
    		}
    	});
    },
    getConsolidationList: function(target, table) {
    	var el = target;
    	var search_start_date = null, search_end_date = null, store_id, elem;
    	
    	if($("#reconciliation-"+el+"year").val() == 0) {alert("Year Blank"); return;}
    	else if($("#reconciliation-"+el+"month").val() == 0) {alert("Month Blank"); return;}
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	
    	
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
	    search_start_date = new Date($("#reconciliation-"+el+"search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
	    search_start_date = (search_start_date.getMonth()+1)+"/"+search_start_date.getDate()+"/"+search_start_date.getFullYear();
	    search_end_date = new Date($("#reconciliation-"+el+"search-end-date").jqxDateTimeInput('getDate'));
	    search_end_date = (search_end_date.getMonth()+1)+"/"+search_end_date.getDate()+"/"+search_end_date.getFullYear();//"11/30/2016";
        
    	$.ajax({
    		url: "ajax/consolidation/getRebateDataInInvoice.jsp",
    		data: {
    			store_id: store_id,
    			search_start_date: search_start_date,
    			search_end_date: search_end_date,
    			table: table
    		},
    		method: "GET",
    		dataType: "json",
    		success: function(result) {
				$("#jqx-reconciliation-"+el+"list").jqxGrid("clear");
    			var data, elem;
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			/*170220 jh : total*/
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				obj.total = 0;
    				if(obj.total_features_data_plan_amount)	obj.total = parseFloat(obj.total)+parseFloat(obj.total_features_data_plan_amount);
    				if(obj.total_primary_rate_plan_amount)	obj.total = parseFloat(obj.total)+parseFloat(obj.total_primary_rate_plan_amount);
    				if(obj.transaction_amount)	obj.total = parseFloat(obj.total)+parseFloat(obj.transaction_amount);
    				if(obj.name && obj.name.indexOf("QPAY") > -1)	{	WRPAdminApp.pagescript._qpay = 1;	}
    				switch (obj.transaction_type) {
    				case 0:
    					obj.rebate = obj.new_act_rebate;
    					obj.total = parseFloat(obj.total)+parseFloat(obj.new_act_rebate);
    					break;
    				case 2:
    					obj.rebate = obj.upg_rebate;
    					obj.total = parseFloat(obj.total)+parseFloat(obj.upg_rebate);
    					break;
    				default:
    					break;
    				}
    				
    				switch (obj.transaction_type) {
    				case 0:
    					obj.transaction_type = "New Act";
    					break;
    				case 1:
    					obj.transaction_type = "React";
    					break;
    				case 2:
    					obj.transaction_type = "Upgrade";
    					break;
    				case 3:
    					obj.transaction_type = "Port In";
    					break;
    				case 4:
    					obj.transaction_type = "Byod New Act";
    					break;
    				case 5:
    					obj.transaction_type = "Byod React";
    					break;
    				case 6:
    					obj.transaction_type = "Byod Upgrade";
    					break;
    				case 7:
    					obj.transaction_type = "Byod Port In";
    					break;
    				case 8:
    					obj.transaction_type = "ESN Change";
    					break;
    				case 9:
    					obj.transaction_type = "MDN Change";
    					break;
    				case 10:
    					obj.transaction_type = "MPR/DOA";
    					break;
    				case 11:
    					obj.transaction_type = "XBM";
    					break;
    				case 12:
    					obj.transaction_type = "Add a Line";
    					break;
    				case 13:
    					obj.transaction_type = "Byod Add a Line";
    					break;
    				case 14:
    					obj.transaction_type = "SOR";
    					break;
    				}
    			}
    			/*total end*/
    			elem = $("#jqx-reconciliation-"+el+"list");
    			
    			if (elem) {
    				elem.jqxGrid("addrow", null, data);
    			}
    	    	
    	    	try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	}
    	    	/*
    	    	if(target == "")	WRPAdminApp.pagescript.getRebateDataInInvoice();
    	    	else if(target == "spiff-")	WRPAdminApp.pagescript.getSpiff();
    	    	else if(target == "qpay-")	WRPAdminApp.pagescript.getQpay();
    	    	else if(target == "disqualify-")	WRPAdminApp.pagescript.getDisqualify();
    	    	else if(target == "rebate-")	WRPAdminApp.pagescript.getRebate();
    	    	else if(target == "bill-")	WRPAdminApp.pagescript.getBill();
    	    	*/
    	    	//if(sid == -1){	WRPAdminApp.pagescript.getRebateDataInInvoice();	WRPAdminApp.pagescript.getSpiff();	}
    		}
    	});
    },/*
    getRebateDataInInvoice: function() {
    	var search_start_date, search_end_date, store_id;
    	
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        search_start_date = new Date($("#reconciliation-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
    	search_start_date = (search_start_date.getMonth()+1)+"/"+search_start_date.getDate()+"/"+search_start_date.getFullYear();
    	search_end_date = new Date($("#reconciliation-search-end-date").jqxDateTimeInput('getDate'));
    	search_end_date = (search_end_date.getMonth()+1)+"/"+search_end_date.getDate()+"/"+search_end_date.getFullYear();//"11/30/2016";
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	
    	
    	$.ajax({
    		url: "ajax/consolidation/getConsolidationList.jsp",
    		data: {
    			store_id: store_id,
    			search_start_date: search_start_date,
    			search_end_date: search_end_date
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			
    			var data, i, len, obj, jqxgrid, rowindex, rowindex2, row, total;
    			
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			
    			jqxgrid = $("#jqx-reconciliation-list");
    			if (!jqxgrid) {
    				return;
    			}
    			
    			data.length = 10;
    			for (i = 0, len = data.length; i < 10; i++) {
    				obj = data[i];
    				rowindex = 0;	total = 0;
    				while(rowindex > -1) {
    					rowindex = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, obj.esn, rowindex);
    					console.log(rowindex);
        				if (rowindex === -1) break;
        				switch (obj.transaction_type) {
        				case "New Activations":;
        					rowindex2 = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, "New Act", rowindex); // New Activation
        					break;
        				case "Handset Upgrade":;
        					rowindex2 = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, "Upgrade", rowindex); // Handset Upgrade
        					break;
        				default:;
        					rowindex = -1;
        					break;
        				}
        				if (rowindex === rowindex2) {
        					break;
        				}
    				}    	
    				
    				if (rowindex === -1) {
    					continue;
    				}

    				total = jqxgrid.jqxGrid('getcellvalue', rowindex, "total");
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "rate_plan_amount", obj.rate_plan_amount);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "bolt_on_amount", obj.bolt_on_amount);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "transaction_amount", obj.transaction_amount);
    				if(obj.rate_plan_amount)	total = parseFloat(total)-parseFloat(obj.rate_plan_amount);
    				if(obj.bolt_on_amount)		total = parseFloat(total)-parseFloat(obj.bolt_on_amount);
    				if(obj.transaction_amount)	total = parseFloat(total)-parseFloat(obj.transaction_amount);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "total", total);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "transaction_date", obj.transaction_date);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "qualification_status", obj.qualification_status);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "posted_date", obj.posted_date);
    			}
    	    	try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	}
    	    	//if(WRPAdminApp.pagescript._qpay > 0){	WRPAdminApp.pagescript.getQpay();	}
    		}
    	});
    },
    */
    getDisqualify: function() {
    	var search_start_date, search_end_date, store_id;
    	
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        search_start_date = new Date($("#reconciliation-disqualify-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
    	search_start_date = (search_start_date.getMonth()+1)+"/"+search_start_date.getDate()+"/"+search_start_date.getFullYear();
    	search_end_date = new Date($("#reconciliation-disqualify-search-end-date").jqxDateTimeInput('getDate'));
    	search_end_date = (search_end_date.getMonth()+1)+"/"+search_end_date.getDate()+"/"+search_end_date.getFullYear();//"11/30/2016";
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	
    	
    	$.ajax({
    		url: "ajax/consolidation/getDisqualifyList.jsp",
    		data: {
    			store_id: store_id,
    			search_start_date: search_start_date,
    			search_end_date: search_end_date
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			
    			var data, i, len, obj, jqxgrid, rowindex, rowindex2, row, total;
    			
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			
    			jqxgrid = $("#jqx-reconciliation-disqualify-list");
    			if (!jqxgrid) {
    				return;
    			}
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				rowindex = 0;	total = 0;
    				//rowindex = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, obj.esn, rowindex);
    				//rowindex2 = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, "Upgrade", rowindex); // Handset Upgrade
    				//console.log(obj.esn+" "+rowindex+" "+rowindex2);
    				
    				while(rowindex > -1) {
    					console.log(obj.transaction_type);
    					rowindex = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, obj.esn, rowindex);
        				if (rowindex === -1) break;
        				switch (obj.transaction_type) {
        				case "New Activation":;
        					rowindex2 = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, "New Act", rowindex); // New Activation
        					break;
        				case "Handset Upgrade":;
        					rowindex2 = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, "Upgrade", rowindex); // Handset Upgrade
        					break;
        				default:;
        					rowindex = -1;
        					break;
        				}
        				
        				if (rowindex === rowindex2) {
        					break;
        				}
        				else {	
        					rowindex = -1;
        					break;
        				}
    				}   

    				if (rowindex === -1) {
    					continue;
    				}
    				
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "subscriber____status", obj.subscriber____status);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "transaction_date", obj.transaction_date);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "account_balance", obj.account_balance);
   				
    			}
    	    	try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	}
    		}
    	});
    },
    getQpay: function() {
    	var search_start_date, search_end_date, store_id;
    	
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        search_start_date = new Date($("#reconciliation-qpay-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
    	search_start_date = (search_start_date.getMonth()+1)+"/"+search_start_date.getDate()+"/"+search_start_date.getFullYear();
    	search_end_date = new Date($("#reconciliation-qpay-search-end-date").jqxDateTimeInput('getDate'));
    	search_end_date = (search_end_date.getMonth()+1)+"/"+search_end_date.getDate()+"/"+search_end_date.getFullYear();//"11/30/2016";
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	
    	
    	$.ajax({
    		url: "ajax/consolidation/getQpay.jsp",
    		data: {
    			store_id: store_id,
    			search_start_date: search_start_date,
    			search_end_date: search_end_date
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, i, len, obj, jqxgrid, rowindex, rowindex2, row, total;
    			
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			
    			jqxgrid = $("#jqx-reconciliation-qpay-list");
    			if (!jqxgrid) {
    				return;
    			}
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				rowindex = 0;	total = 0;
    				rowindex = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, obj.confirmation_id, rowindex);  	

    				jqxgrid.jqxGrid("setcellvalue", rowindex, "dealerfee", obj.dealer_fee);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "date/time", obj.date_time);
    			}
    	    	try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	}
    		}
    	});
    },
    getSpiff: function(event) {
    	var search_start_date, search_end_date, store_id;
    	
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        search_start_date = new Date($("#reconciliation-spiff-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
    	search_start_date = (search_start_date.getMonth()+1)+"/"+search_start_date.getDate()+"/"+search_start_date.getFullYear();
    	search_end_date = new Date($("#reconciliation-spiff-search-end-date").jqxDateTimeInput('getDate'));
    	search_end_date = (search_end_date.getMonth()+1)+"/"+search_end_date.getDate()+"/"+search_end_date.getFullYear();//"11/30/2016";
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	
    	
    	$.ajax({
    		url: "ajax/consolidation/getSpiff.jsp",
    		data: {
    			store_id: store_id,
    			search_start_date: search_start_date,
    			search_end_date: search_end_date
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, i, len, obj, jqxgrid, rowindex, rowindex2, row, total;
    			
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			
    			jqxgrid = $("#jqx-reconciliation-spiff-list");
    			if (!jqxgrid) {
    				return;
    			}
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				rowindex = 0;	total = 0;
    				rowindex = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, obj.esn, rowindex);  	

    				jqxgrid.jqxGrid("setcellvalue", rowindex, "spiff_amount", obj.spiff_amount);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "transaction_date", obj.transaction_date);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "posted_date", obj.posted_date);
    			}
    	    	try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	}
    		}
    	});
    },
    getRebate: function(event) {
    	var search_start_date, search_end_date, store_id;
    	
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        search_start_date = new Date($("#reconciliation-rebate-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
    	search_start_date = (search_start_date.getMonth()+1)+"/"+search_start_date.getDate()+"/"+search_start_date.getFullYear();
    	search_end_date = new Date($("#reconciliation-rebate-search-end-date").jqxDateTimeInput('getDate'));
    	search_end_date = (search_end_date.getMonth()+1)+"/"+search_end_date.getDate()+"/"+search_end_date.getFullYear();//"11/30/2016";
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	
    	
    	$.ajax({
    		url: "ajax/consolidation/getRebate.jsp",
    		data: {
    			store_id: store_id,
    			search_start_date: search_start_date,
    			search_end_date: search_end_date
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, i, len, obj, jqxgrid, rowindex, rowindex2, row, total;
    			
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			
    			jqxgrid = $("#jqx-reconciliation-rebate-list");
    			if (!jqxgrid) {
    				return;
    			}
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				rowindex = 0;	total = 0;
    				rowindex = WRPAdminApp.getRowIndexByKeywordInJQXGrid(jqxgrid, obj.esn, rowindex);  	

    				jqxgrid.jqxGrid("setcellvalue", rowindex, "rebate_amount", obj.rebate_amount);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "qualification_status", obj.qualification_status);
    				jqxgrid.jqxGrid("setcellvalue", rowindex, "transaction_date", obj.transaction_date);
    			}
    	    	try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	}
    		}
    	});
    },
    getUploadFileList: function() {
    	var search_start_date = null, search_end_date = null, store_id, elem, target, i;
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	

    	$.ajax({
    		url: "ajax/consolidation/getUploadFileList.jsp",
    		data: {
    			search_start_date: search_start_date,
    			search_end_date: search_end_date
    		},
    		method: "GET",
    		dataType: "json",
    		success: function(result) {
    			
    			$("#jqx-upload-file-list").jqxGrid("clear");
    			$("#jqx-upload-disqualify-list").jqxGrid("clear");
    			$("#jqx-upload-rebate-list").jqxGrid("clear");
    			$("#jqx-upload-spiff-list").jqxGrid("clear");
    			$("#jqx-upload-bill-list").jqxGrid("clear");
    			$("#jqx-upload-qpay-list").jqxGrid("clear");
    			
    			var data, elem;
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			/*170220 jh : total*/

    			for(i = 0; i < data.length; i++){
    				if(data[i].type == 1)	target = "file";
    				else if(data[i].type == 2)	target = "disqualify";
    				else if(data[i].type == 3)	target = "rebate";
    				else if(data[i].type == 4)	target = "spiff";
    				else if(data[i].type == 5)	target = "bill";
    				else if(data[i].type == 6)	target = "qpay";
    				
	    			elem = $("#jqx-upload-"+target+"-list");
	    			if (elem) {
	    				elem.jqxGrid("addrow", null, data[i]);
	    			}
    			}
    		}
    	});
    	try {
    		document.getElementById("loading-container").style.display = "none";
    	} catch (e) {
    		console.warn(e);
    	}
    },
    getExcelDetail: function(sid, target, type) {
    	var search_start_date, search_end_date, store_id;
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	} 	
    	
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        console.log(type);
    	$.ajax({
    		url: "ajax/consolidation/getExcelDetail.jsp",
    		data: {
    			store_id: store_id,
    			type: type,
    			sid: sid
    		},
    		method: "GET",
    		dataType: "json",
    		success: function(result) {
    			$("#jqx-"+target+"-list").jqxGrid("clear");
    			var data, elem;
    			data = result.data;
    			if (!data || data.length == 0){ 
    				try {
        	    		document.getElementById("loading-container").style.display = "none";
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
    				return;
    			}
    			
	    			elem = $("#jqx-"+target+"-list");
	    			
	    			console.log(elem)
	    			if (elem) {
	    				elem.jqxGrid("addrow", null, data);
	    			}
    			
    	    	try {
    	    		document.getElementById("loading-container").style.display = "none";
    	    	} catch (e) {
    	    		console.warn(e);
    	    	} 	
    		}
    	});
    },
    getLastDate: function(target) {

    	var date = new Date($("#reconciliation-"+target+"year").val(), $("#reconciliation-"+target+"month").val()-1, 1);
    	//date = date.setFullYear($("#reconciliation-year").val(), $("#reconciliation-month").val(), date.getDate());
    	$('#reconciliation-'+target+'search-start-date').jqxDateTimeInput('setDate',date);
    	
    	var last   = new Date( $("#reconciliation-"+target+"year").val(), $("#reconciliation-"+target+"month").val(), 0); 
        $('#reconciliation-'+target+'search-end-date').jqxDateTimeInput('setDate', last);
    }
};