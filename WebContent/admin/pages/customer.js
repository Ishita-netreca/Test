
var _pagescript = {
    _selectedStoreId: undefined,
    _selectedCustomerSid: 0,
    _currPageNo: 1,
    _maxPageNo: 1,
    _countPerPage: 100,
    init: function() {
    	var components = $('#customer-edit-window');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 340);
    		components.css("top", "calc(50% - 170px)");
    		components.css("left", "calc(50% - 300px)");
    	}
    	
    	components = $('#credit-out-window');
    	if (components) {
    		components.jqxWindow("width", 470);
    		components.jqxWindow("height", 360);
    		components.css("top", "calc(50% - 180px)");
    		components.css("left", "calc(50% - 235px)");
    	}

    	try {
			WRPComponents('div[pagename="customer"] > .page-submenu-container > .submenu[panelname="customer_list"]').addShadowedImage('img/icon/people_03.png');
		} catch (e) {
			
		}

       	$('#customer-sales-history-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate() - 7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#customer-sales-history-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#customer-sales-history-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
       	});

       	$("#excel-customers-list").click(function () {
			elem.jqxGrid('exportdata', 'xls', 'jqx-customers-list');
        });
       	
       	$('#customer-store-credit-radio-1').on('checked', function (event) {
			var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#store-credit-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#store-credit-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#customer-store-credit-radio-2').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 2);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#store-credit-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#store-credit-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#customer-store-credit-radio-3').on('checked', function (event) {
       		var start, end;
			var date = new Date();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 3);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#store-credit-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#store-credit-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	
		components = $("#jqx-customers-sales-history");
		if(components){
			components.jqxGrid({
				width : '100%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'date', type: 'date'},
							{ name: 'empId', type: 'string'},
							{ name: 'amount', type: 'number'},
							{ name: 'tax', type: 'number'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : 
					[ 
						{ text : 'Date',datafield : 'date',width : '30%',filtertype : "date",cellsformat : 'MM/dd/yyyy HH:mm:ss'}, 
						{ text : 'Employee',datafield : 'empId', width : '30%'},
						{ text : 'Amount', datafield : 'amount',width : '20%',cellsalign : 'right',cellsformat : "c2"}, 
						{ text : 'Tax', datafield : 'tax', width : '20%', cellsalign : 'right', cellsformat : "c2"}, 
					]
			});
		}
		
		components = $("#jqx-customers-activations-list");
		if(components){
			components.jqxGrid({
				width : '100%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'date', type: 'date'},
							{ name: 'empId', type: 'string'},
							{ name: 'amount', type: 'number'},
							{ name: 'tax', type: 'number'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : 
					[ 
						{ text : 'Date',datafield : 'date',width : '30%',filtertype : "range",cellsformat : 'MM/dd/yyyy HH:mm:ss'}, 
						{ text : 'Employee',datafield : 'empId', width : '30%'},
						{ text : 'Amount', datafield : 'amount',width : '20%',cellsalign : 'right',cellsformat : "c2"}, 
						{ text : 'Tax', datafield : 'tax', width : '20%', cellsalign : 'right', cellsformat : "c2"}, 
					]
			});
		}
		
		components = $("#jqx-customers-store-credit-history");
		if(components){
			components.jqxGrid({
				width : '100%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'date', type: 'date'},
							{ name: 'reason', type: 'string'},
							{ name: 'amount', type: 'number'},
							{ name: 'total', type: 'number'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : 
					[ 
						{ text : 'Date',datafield : 'date',width : '30%',filtertype : "range",cellsformat : 'MM/dd/yyyy HH:mm:ss'}, 
						{ text : 'Reason',datafield : 'reason', width : '30%'},
						{ text : 'Amount', datafield : 'amount',width : '20%',cellsalign : 'right',cellsformat : "c2"}, 
						{ text : 'Total Credit', datafield : 'total', width : '20%', cellsalign : 'right', cellsformat : "c2"}, 
					]
			});
		}
		
		// 공사
		components = $("#jqx-customer-list");
		if(components){
			components.jqxGrid({
				width : '100%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'customer_id', type: 'string'},
            				{ name: 'sid', type: 'number'},
            				{ name: 'name', type: 'string'},
            				{ name: 'address', type: 'string'},
            				{ name: 'tel', type: 'string'},
            				{ name: 'company', type: 'string'},
            				{ name: 'join_date', type: 'date'}
						],
	            	datatype: "json"
	            }),
	            cellhover: function() {
	            	//console.log("cellhover");
	            	//console.log(arguments);
	            },
	            scrollmode: "deferred",
	            scrollfeedback: function() {
	            	//console.log("scrollfeedback");
	            	//console.log(arguments);
	            },		
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : 
					[ 
					 	{ text: 'sid', datafield: 'sid', width: '15%', hidden: true },
						{ text: 'ID', datafield: 'customer_id', width: '15%' },
						{ text: 'Name', datafield: 'name', width: '15%'},
		        		{ text: 'Address', datafield: 'address', width: '30%'},
		        		{ text: 'Phone', datafield: 'tel', width: '10%' },
		                { text: 'Company', datafield: 'company', width: '15%'},
		                { text: 'Join Date', datafield: 'join_date', width: '15%',filtertype: "date", cellsformat: 'MM/dd/yyyy'}
					]
			});
		}
		components.on('rowselect', WRPAdminApp.pagescript.getCustomerInfo);
		components.on('rowselect', WRPAdminApp.pagescript.getSalesHistoryList);
		components.on('rowselect', WRPAdminApp.pagescript.getCustomerActivationsList);
		components.on('rowselect', WRPAdminApp.pagescript.getStoreCreditList);
		
		components.on('rowdoubleclick', WRPAdminApp.pagescript.getCustomerInfoPop);
		
		
		//
		
		$('#customer-sales-history-radio-1').jqxRadioButton({ checked:true }); 
		$('#customer-store-credit-radio-1').jqxRadioButton({ checked:true }); 
		
		WRPAdminApp.pagescript.getCustomerList();
    },
    getCustomerList: function() {
        var storeId, keyword;
        
        if (arguments.length > 0 && arguments[0] === true) {
        	try {
        		WRPAdminApp.pagescript._currPageNo = 1;
        		$("#jqx-customer-list").jqxGrid("clear");
        	} catch (e) {
        		
        	}
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            keyword = document.getElementById("customers-search-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._selectedStoreid = storeId;

        WRPAdminApp.pagescript._selectedCustomerSid = 0;

        $.ajax({
            url: "ajax/customer/getCustomerList.jsp",
            data: {
                storeId: storeId,
                keyword: keyword,
                curr_page_no: WRPAdminApp.pagescript._currPageNo,
                count_per_page: WRPAdminApp.pagescript._countPerPage
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, adapter, elem, i, len;
        		
        		data = result.data;
        		
        		$("#jqx-customer-list").jqxGrid("clear"); 
        		if (!data) return;  
        		
        		if (data.length > 0 && data[0].max_page_no !== undefined) {
        			WRPAdminApp.pagescript._maxPageNo = data[0].max_page_no;
        		}
            	
        		$("#jqx-customer-list").jqxGrid("addrow", null, data);

            	/*
            	var datarow = new Array();
            	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		row["ID"] = result.data[i].customerId;
            		row["sid"] = result.data[i].sid;
            		row["Name"] = result.data[i].name;
            		row["Address"] = result.data[i].address;
            		row["Phone"] = result.data[i].tel;
            		row["Company"] = result.data[i].company;
            		row["Join Date"] = result.data[i].joinDate;
            		
            		datarow[i] = row;
            	}
            	
            	var source = 
            		{
            			localdata: datarow,
            			datafields:
            				[
            					{ name: 'ID', type: 'string'},
            					{ name: 'sid', type: 'number'},
            					{ name: 'Name', type: 'string'},
            					{ name: 'Address', type: 'string'},
            					{ name: 'Phone', type: 'string'},
            					{ name: 'Company', type: 'string'},
            					{ name: 'Join Date', type: 'date'}
            				],
            				datatype: "json"
            		};
            	
            	 var pagerrenderer = function () {
            	     var element = $("<div style='display:none;'></div>");

            	     return element;
            	 }
            	 
            	var dataAdapter = new $.jqx.dataAdapter(source);
        		elem = $("#jqx-customer-list");
        		if (elem) {
        			elem[0].parentNode.innerHTML = '<div id="jqx-customer-list"></div>';
        		}
        		
        		elem = $("#jqx-customer-list");
        		
        		if(elem){
        			elem.jqxGrid(
		                {
		                    width: '100%',
		                    height: '100%',
		                    source: dataAdapter,
		                    //pageable: true,
		                    //pagesize: 100,
		                    //pagerrenderer: pagerrenderer,
		                    showfilterrow: false,
		                    filterable: true,
		                    sortable: true,
		                    columnsresize:true,
		                    theme: 'arctic',
		                    columns: [
		                      { text: 'ID', datafield: 'ID', width: '15%' },
		        			  { text: 'Name', datafield: 'Name', width: '15%'},
		        			  { text: 'Address', datafield: 'Address', width: '30%'},
		        			  { text: 'Phone', datafield: 'Phone', width: '10%' },
		                      { text: 'Company', datafield: 'Company', width: '15%'},
		                      { text: 'Join Date', datafield: 'Join Date', width: '15%',filtertype: "date", cellsformat: 'MM/dd/yyyy'}
		                    ]
		                });
        			elem.on('rowselect', WRPAdminApp.pagescript.getCustomerInfo);
        			elem.on('rowselect', WRPAdminApp.pagescript.getSalesHistoryList);
        			elem.on('rowselect', WRPAdminApp.pagescript.getCustomerActivationsList);
        			elem.on('rowselect', WRPAdminApp.pagescript.getStoreCreditList);
        			
        			elem.on('rowdoubleclick', WRPAdminApp.pagescript.getCustomerInfoPop);
		        	
		        	$("#excel-customers-list").click(function () {
            			elem.jqxGrid('exportdata', 'xls', 'jqx-customers-list');
                    });
        		}
            */}
        });
    },
    getCustomerInfoPop: function(event){
    	var rowdata, store_id;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
    		if (store_id.length == 0) return;
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
    	WRPAdminApp.pagescript._selectedCustomerSid = rowdata.sid;
    	$.ajax({
    		url: "ajax/customer/getCustomerInfo.jsp",
    		data: {
    			storeId: store_id,
    			customerSid: WRPAdminApp.pagescript._selectedCustomerSid
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data;
    			data = result.data;
    			if (!data) return;
    			
    			 try {
                     document.getElementById("customer-profile-id-pop").value = (data.customerId !== undefined && data.customerId)? data.customerId : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }
                 
    			 try {
                     document.getElementById("customer-profile-pin-pop").value = (data.pin !== undefined && data.pin)? data.pin : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-first-name-pop").value = (data.firstName !== undefined && data.firstName)? data.firstName : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-middle-name-pop").value = (data.middleName !== undefined && data.middleName)? data.middleName : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-last-name-pop").value = (data.lastName !== undefined && data.lastName)? data.lastName : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-address1-pop").value = (data.address1 !== undefined && data.address1)? data.address1 : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-address2-pop").value = (data.address2 !== undefined && data.address2)? data.address2 : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-city-pop").value = (data.city !== undefined && data.city)? data.city : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-state-pop").value = (data.state !== undefined && data.state)? data.state : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-zipcode-pop").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-tel-pop").value = (data.tel !== undefined && data.tel)? data.tel : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-email-pop").value = (data.email !== undefined && data.email)? data.email : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-company-pop").value = (data.company !== undefined && data.company)? data.company : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                	 $("#customer-profile-join-date-pop").jqxDateTimeInput('setDate', data.joinDate);
                 } catch (e) {
                     console.warn(e);
                     return;
                 }
             	$('#customer-edit-window').jqxWindow('open');
    		}
    	});
    },
    getCustomerInfo: function(event) {
    	var rowdata, store_id;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
    		if (store_id.length == 0) return;
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
    	WRPAdminApp.pagescript._selectedCustomerSid = rowdata.sid;
    	$.ajax({
    		url: "ajax/customer/getCustomerInfo.jsp",
    		data: {
    			storeId: store_id,
    			customerSid: WRPAdminApp.pagescript._selectedCustomerSid
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data;
    			data = result.data;
    			if (!data) return;
    			
    			 try {
                     document.getElementById("customer-profile-id").value = (data.customerId !== undefined && data.customerId)? data.customerId : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }
                 
    			 try {
                     document.getElementById("customer-profile-pin").value = (data.pin !== undefined && data.pin)? data.pin : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-first-name").value = (data.firstName !== undefined && data.firstName)? data.firstName : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-middle-name").value = (data.middleName !== undefined && data.middleName)? data.middleName : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-last-name").value = (data.lastName !== undefined && data.lastName)? data.lastName : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-address1").value = (data.address1 !== undefined && data.address1)? data.address1 : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-address2").value = (data.address2 !== undefined && data.address2)? data.address2 : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-city").value = (data.city !== undefined && data.city)? data.city : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-state").value = (data.state !== undefined && data.state)? data.state : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-zipcode").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-tel").value = (data.tel !== undefined && data.tel)? data.tel : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-email").value = (data.email !== undefined && data.email)? data.email : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-company").value = (data.company !== undefined && data.company)? data.company : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }

                 try {
                     document.getElementById("customer-profile-join-date").value = (data.joinDate !== undefined && data.joinDate)? data.joinDate : '';
                 } catch (e) {
                     console.warn(e);
                     return;
                 }
    		}
    	});
    },

    

    PopCustomerAdd: function() {
    	WRPAdminApp.pagescript._selectedCustomerSid = 0;
        try {
            document.getElementById("customer-profile-id-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            document.getElementById("customer-profile-pin-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-first-name-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-middle-name-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-last-name-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-address1-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-address2-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-city-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-state-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-zipcode-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-tel-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-email-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("customer-profile-company-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	$("#customer-profile-join-date-pop").val(new Date());
        } catch (e) {
            console.warn(e);
            return;
        }
        $('#customer-edit-window').jqxWindow('open');
    },
    
    setCustomerData: function() {
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

        data.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;

        try {
            data.customerId = document.getElementById("customer-profile-id-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (data.customerId.length == 0) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "Input Customer ID"
        	});
            return;
        }
        
        try {
            data.pin = document.getElementById("customer-profile-pin-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.firstName = document.getElementById("customer-profile-first-name-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.middleName = document.getElementById("customer-profile-middle-name-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.lastName = document.getElementById("customer-profile-last-name-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.address1 = document.getElementById("customer-profile-address1-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.address2 = document.getElementById("customer-profile-address2-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.city = document.getElementById("customer-profile-city-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.state = document.getElementById("customer-profile-state-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.zipcode = document.getElementById("customer-profile-zipcode-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.tel = document.getElementById("customer-profile-tel-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.email = document.getElementById("customer-profile-email-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.company = document.getElementById("customer-profile-company-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.joinDate = document.getElementById("customer-profile-join-date-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        data.storeId = storeId;

        $.ajax({
            url: "ajax/customer/setCustomerData.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Completed",
                		okBtnClick: function(){
                            $('#customer-edit-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getCustomerList();
                		}
                	});
                } else {
                	if(result == 1062) {
                    	WRPCommon.MsgBoxModule.alert({
                    		message: "Error : Duplicated ID."
                    	});
                	}
                	else {
                    	WRPCommon.MsgBoxModule.alert({
                    		message: "Error : " + result
                    	});
                	}
                }
                
            }
        });
    },
    getSalesHistoryList: function(event) {
        var param, date;
        
        
        param = {};
        
        if (WRPAdminApp.pagescript._selectedUserSid < 1) return;
        if (WRPAdminApp.pagescript._selectedCustomerSid < 1) return;
        
        param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
        
        try {
            param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) {
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        date = $("#sales-history-search-start-date").jqxDateTimeInput('getDate');
       	param.start_date= $.jqx.dataFormat.formatdate(date, 'd');
        date = $("#sales-history-search-end-date").jqxDateTimeInput('getDate');
        param.end_date = $.jqx.dataFormat.formatdate(date, 'd');
  
        $.ajax({
            url: "ajax/invoice/getInvoiceListByCustomerSid.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var data = result.data;
            	elem = $("#jqx-customers-sales-history");
            	
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");		
    				
        			$("#excel-customer-sales-history").click(function () {
            			elem.jqxGrid('exportdata', 'xls', 'jqx-customer-sales-history');
                    });
    			}
            }
        });
    },
    getCustomerActivationsList: function(event) {
        var storeId, transactionType;
        if (WRPAdminApp.pagescript._selectedUserSid < 1) return;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) {
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            transactionType = document.getElementById("customers-activations-select-transaction-type").value;

        } catch (e) {
            console.warn(e);
            return;
        }

        
        $.ajax({
            url: "ajax/invoice/getActivationsListByCustomerSid.jsp",
            data: {
                customerSid: WRPAdminApp.pagescript._selectedCustomerSid,
                storeId: storeId,
                transactionType: transactionType
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var data = result.data;
            	elem = $("#jqx-customers-activations-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");		
    				
    				$("#excel-customer-activation-list").click(function () {
            			elem.jqxGrid('exportdata', 'xls', 'jqx-customer-activation-list');
                    });
    			}
        	}
        });
    },
    getStoreCreditList: function() {
    	var param, date;
    	
    	param = {};
    	
    	if(WRPAdminApp.pagescript._selectedCustomerSid < 1) return;
    	
    	param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
    	
    	try {
            param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) {
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }
        
        date = $("#store-credit-search-start-date").jqxDateTimeInput('getDate');
       	param.start_date= $.jqx.dataFormat.formatdate(date, 'd');
        date = $("#store-credit-search-end-date").jqxDateTimeInput('getDate');
        param.end_date = $.jqx.dataFormat.formatdate(date, 'd');

        
        $.ajax({
            url: "ajax/store_credit/getStoreCreditList.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var data = result.data;
            	elem = $("#jqx-customers-store-credit-history");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");		
    			}
        	}
        });
    },
    getCreditOutPop: function(){
    	var customerSid, store_id;
    	customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
    	if(customerSid < 1){
        	WRPCommon.MsgBoxModule.alert({
        		message: "Select Customer"
        	});
    		return;
    	}
    	
    	try {
            store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) {
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	$.ajax({
    		url: "ajax/store_credit/getStoreCreditByCustomer.jsp",
            data: {
            	customerSid: customerSid,
            	store_id: store_id
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data = result.data;
            	
            	var getselectedrowindexes = $('#jqx-customer-list').jqxGrid('getselectedrowindexes');
                var rowdata = $('#jqx-customer-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
                
                if(!data){
                	try {
                        document.getElementById("credit-out-customer-id").value = rowdata.customer_id;
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    
                    try {
                        document.getElementById("credit-out-credit-total").value = '0';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    
                    try {
                        document.getElementById("credit-out-credit-amount").value = '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    
                    try {
                        document.getElementById("credit-out-creidt-note").value = '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    
                	$('#credit-out-window').jqxWindow('open');
                }
                
            	try {
                    document.getElementById("credit-out-customer-id").value = rowdata.customer_id;
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("credit-out-credit-total").value = data.total;
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("credit-out-credit-amount").value = '0';
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                    document.getElementById("credit-out-creidt-note").value = '';
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
            	$('#credit-out-window').jqxWindow('open');
    			
        	}
    	});
    },
    setStoreCreditOut: function(){
    	var data;
    	data = {};
    	var total = parseInt(document.getElementById("credit-out-credit-total").value);
    	var outamount = parseInt(document.getElementById("credit-out-credit-amount").value);
    	
    	try {
            data.store_id = document.getElementById("select-store").value;
            if (data.store_id.length == 0) {
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	try {
    		data.customer_sid = WRPAdminApp.pagescript._selectedCustomerSid;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	if(total < outamount){
            	WRPCommon.MsgBoxModule.alert({
            		message: "Check Out Amount"
            	});
        		return;
        	}else{
        		data.amount = "-"+outamount;
        	}
        } catch (e) {
            console.warn(e);
            return;
        }
    	
        try {
            data.total = total - outamount;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            data.reason = document.getElementById("credit-out-reason-type").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            data.note = document.getElementById("credit-out-creidt-note").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/store_credit/setStoreCreditOut.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
            	if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Completed",
                		okBtnClick: function(){
                            $('#credit-out-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getStoreCreditList();
                		}
                	});
                } else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error : " + result
                	});
                }
        	}
        });
    }
};