/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
		_selectedUserSid: 0,
		_selectedUserId: undefined,
		_searchType: 0,
		_searchKeyword: undefined,
		_selectedStoreId: undefined,
		_selectedInvoiceItems: undefined,
		_selectedInvoiceRatePlans: undefined,
		_selectedInvoiceCheckout: undefined,
		_dataCheck: 0,
		prevAssignedStoreIdList: {},
		_currPageNo: 1,
	    _maxPageNo: 1,
	    _countPerPage: 10,
		init: function() {
			var components;
			
			$("#user-profile-password").jqxPasswordInput({
				height: 20, width: 184
			});
			
			elem = $("#add-emp-btn");
			if (elem && elem.length > 0) {                            
				elem.jqxButton({
					
				});
			}
			elem.on('click', function (){
				WRPAdminApp.pagescript.initUserEditContainer();
				$('#user-add-window').jqxWindow('open');
			});
			
			$("#excel-sales-history-user").click(function () {
				$("#jqx-sales-history").jqxGrid('exportdata', 'xls', 'jqx-users-sales-history');
			});
			
			$("#excel-activations-history-user").on('click', function (){
				$("#jqx-activations").jqxGrid('exportdata', 'xls', 'jqx-activations');
			});
			
			try {
				elem = $(".jqx-datetime-input");

				if (elem && elem.length > 0) {                            
					elem.jqxDateTimeInput({
						width: "99%",
						formatString: "MM/dd/yyyy"
					});
				}
			} catch (e) {

			}

			components = $('#jqx-assigned-store');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: 'store_id', type: 'string'},
									 { name: 'mname', type: 'string'},
									 { name: 'name', type: 'string' },
									 { name: 'dname', type: 'string' },
									 { name: 'Address', type: 'string' },
									 { name: 'Assign', type: 'bool' }
						    ]
					}),
					filterable: true,
					sortable: true,
					//groupable: false,
					editable: true,
					columnsresize:true,

					columns: [
								{ text: 'Store ID', datafield: 'store_id', width: '15%', align: 'center', editable: false },
								{ text: 'Market', datafield: 'mname', width: '15%', align: 'center', editable: false},
								{ text: 'District', datafield: 'dname', width: '15%', align: 'center', editable: false },
								{ text: 'Description', datafield: 'name', width: '25%', align: 'center', editable: false },
								{ text: 'Address', datafield: 'Address', width: '25%', align: 'center', editable: false },
								{ text: 'Assign', datafield: 'Assign', width: '5%', align: 'center', columntype: 'checkbox', editable: true }
					         ]
				});
			}
			
			components = $("#jqx-users-list");
			if(components) {
				components.jqxGrid({
					width: '100%',
					height: '100%',
					source: new $.jqx.dataAdapter({
						datafields:
							[
							 { name: 'sid', type: 'string'},
							 { name: 'userId', type: 'string'},
							 { name: 'userName', type: 'string'},
							 { name: 'email', type: 'string' },
							 { name: 'tel', type: 'string' },
							 { name: 'address', type: 'string' },
							 { name: 'group_sid', type: 'string' },
							 { name: 'roleName', type: 'string' },
							 { name: 'disable', type: 'string' },
							 { name: 'password', type: 'string'},
							 { name: 'firstName', type: 'string'},
							 { name: 'lastName', type: 'string'},
							 { name: 'address1', type: 'string' },
							 { name: 'address2', type: 'string' },
							 { name: 'city', type: 'string' },
							 { name: 'state', type: 'string' },
							 { name: 'zipcode', type: 'string' },
							 { name: 'user_type', type: 'string' },
							 { name: 'hireDate', type: 'string' },
							 { name: 'status', type: 'string' },
							 ],
							 datatype: "json"
					}),
					showfilterrow: false,
					filterable: true,
					sortable: true,
					columnsresize: true,
					theme: 'arctic',
					columns: [
			          { text: 'SID', datafield: 'sid', width: '12%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'ID', datafield: 'userId', width: '12%',  cellsalign: 'right', align: 'center' },
			          { text: 'Name', datafield: 'userName', width: '12%', align: 'center' },
			          { text: 'Email', datafield: 'email', width: '12%', align: 'center' },
			          { text: 'Phone', datafield: 'tel', width: '10%', align: 'center' },
			          { text: 'Address', datafield: 'address', width: '25%', align: 'center'},
			          { text: 'group_sid', datafield: 'group_sid', width: '10%', align: 'center' },
			          { text: 'Role', datafield: 'roleName', width: '10%', align: 'center'},
			          { text: 'Password', datafield: 'password', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'First', datafield: 'firstName', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'last', datafield: 'lastName', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'Address1', datafield: 'address1', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'Address2', datafield: 'address2', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'City', datafield: 'city', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'State', datafield: 'state', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'Zipcode', datafield: 'zipcode', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'Usertype', datafield: 'user_type', width: '15%',  cellsalign: 'right', hidden: 'true'},
			          { text: 'Hire', datafield: 'hireDate', width: '15%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'Active', datafield: 'status', width: '9%', align: 'center' }
			        ]
				});
				
				components.on('rowdoubleclick', function (event){ 
					if (event.args.row.bounddata.disable > 0) {
						document.getElementById("user-edit-auth-disable").checked = true;
					} else {
						document.getElementById("user-edit-auth-enable").checked = true;
					}
					WRPAdminApp.pagescript._selectedUserSid = event.args.row.bounddata.sid;
					WRPAdminApp.pagescript._selectedUserId = event.args.row.bounddata.userId;
					WRPAdminApp.pagescript.informSelectedUserData(WRPAdminApp.pagescript._selectedUserSid);
					$('#user-edit-window').jqxWindow('open');
				});
				
				components.on("rowselect", function (event) {
					//$("#user-profile-id").val(event.args.row.bounddata.ID);

					var data = {}, i, len, elem;

					WRPAdminApp.pagescript._searchType = 0;
					WRPAdminApp.pagescript._searchKeyword = undefined;

					WRPAdminApp.pagescript._selectedUserSid = event.args.row.sid;
					WRPAdminApp.pagescript._selectedUserId = event.args.row.userId;

					$("#user-profile-id").val((event.args.row.userId !== undefined && event.args.row.userId)? event.args.row.userId : "");
					$("#user-profile-password").val((event.args.row.password !== undefined && event.args.row.password)? event.args.row.password : "");
					$("#user-profile-first-name").val((event.args.row.firstName !== undefined && event.args.row.firstName)? event.args.row.firstName : "");
					$("#user-profile-last-name").val((event.args.row.lastName !== undefined && event.args.row.lastName)? event.args.row.lastName : "");
					$("#user-profile-address1").val((event.args.row.address1 !== undefined && event.args.row.address1)? event.args.row.address1 : "");
					$("#user-profile-address2").val((event.args.row.address2 !== undefined && event.args.row.address2)? event.args.row.address2 : "");
					$("#user-profile-city").val((event.args.row.city !== undefined && event.args.row.city)? event.args.row.city : "");
					$("#user-profile-state").val((event.args.row.state !== undefined && event.args.row.state)? event.args.row.state : "");
					$("#user-profile-zipcode").val((event.args.row.zipcode !== undefined && event.args.row.zipcode)? event.args.row.zipcode : "");
					$("#user-profile-email").val((event.args.row.email !== undefined && event.args.row.email)? event.args.row.email : "");
					$("#user-profile-mobile").val((event.args.row.tel !== undefined && event.args.row.tel)? event.args.row.tel : "");
					switch(event.args.row.user_type) {
						case 0: $("#user-profile-type").val("General Manager"); break;
						case 1: $("#user-profile-type").val("Deneral Manager"); break;
						case 2: $("#user-profile-type").val("Area Manager"); break;
						case 3: $("#user-profile-type").val("Store Manager"); break;
						case 4: $("#user-profile-type").val("Employee"); break;
						case 98: $("#user-profile-type").val("Owner"); break;
						case 99: $("#user-profile-type").val("Master"); break;
					}

					if (event.args.row.disable > 0) {
						$("#user-profile-auth").val("Disable");
					} else {
						$("#user-profile-auth").val("Enable");
					}
					
					$("#user-profile-user-role").val((event.args.row.roleName !== undefined && event.args.row.roleName)? event.args.row.roleName : "");
					$("#user-profile-hire-date").val((event.args.row.hireDate !== undefined && event.args.row.hireDate)? event.args.row.hireDate : "");
					
					elem = $("#jqx-users-bottom-panel");
					if (elem) {
						i = elem.jqxTabs('val');
						WRPAdminApp.pagescript.getDetailDataAtIndex(i);
					}
				});
			}

			
			//jqx popup
			components = $('#user-add-window');
			if (components) {
				components.jqxWindow("width", 750);
				components.jqxWindow("height", 320);
				components.css("top", "calc(50% - 160px)");
	    		components.css("left", "calc(50% - 375px)");
			}
			
			components = $('#user-edit-window');
			if (components) {
				components.jqxWindow("width", 750);
				components.jqxWindow("height", 320);
				components.css("top", "calc(50% - 160px)");
	    		components.css("left", "calc(50% - 375px)");
			}

			components = $('#user-saleshistory-invoice-window');
			if (components) {
				components.jqxWindow("width", 800);
				components.jqxWindow("height", 500);
			}
			//jqx grid and row_event
			components = $('#jqx-activations');
			if(components) {
				components.jqxGrid(
						{
							width: '100%',
							height: '100%',
							source: new $.jqx.dataAdapter({
								datatype: "json",
								datafields: [
								             { name: 'invoiceNo', type: 'string'},
								             { name: 'date', type: 'string'},
								             { name: 'name', type: 'string' },
								             { name: 'sku', type: 'string' },
								             { name: 'serialNo', type: 'string'},
								             { name: 'transactionType', type: 'string'},
								             { name: 'customer_name', type: 'string' },
								             { name: 'mobile_no', type: 'string' }
								             ]
							}),
							showfilterrow: false,
							filterable: true,
							sortable: true,
							columnsresize: true,
							theme: 'arctic',
							columns: [
							          { text: 'Invoice No', datafield: 'invoiceNo', width: '12%', align: 'center' },
							          { text: 'Date', datafield: 'date', width: '12%', align: 'center', filtertype: 'date',cellsformat: 'd'},
							          { text: 'Description', datafield: 'name', width: '16%', align: 'center'},
							          { text: 'SKU / UPC', datafield: 'sku', width: '12%', align: 'center'},
							          { text: 'Serial No.', datafield: 'serialNo', width: '12%', align: 'center'},
							          { text: 'Transaction Type', datafield: 'transactionType', width: '12%', align: 'center'},
							          { text: 'Customer Name', datafield: 'customer_name', width: '12%', align: 'center'},
							          { text: 'Phone No', datafield: 'mobile_no', width: '12%', align: 'center'}
							          ]
						});
			}

			components = $('#jqx-sales-history');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: 'store', type: 'string'},
						             { name: 'date', type: 'string'},
						             { name: 'customerId', type: 'string'},
						             { name: 'cash', type: 'number' },
						             { name: 'credit', type: 'number' },
						             { name: 'loan', type: 'number' },
						             { name: 'check', type: 'number' },
						             { name: 'creditMemo', type: 'number' },
						             { name: 'amount', type: 'string' },
						             { name: 'tax', type: 'string' },
						             { name: 'invoiceNo', type: 'string' }
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columnsresize:true,

					columns: [
					          { text: 'store', datafield: 'store', width: '10%', align: 'center'},
					          { text: 'Date', datafield: 'date', width: '10%', filtertype: 'date', align: 'center', cellsformat: 'd' },
					          { text: 'Customer', datafield: 'customerId', width: '10%', align: 'center'},
					          { text: 'Cash', datafield: 'cash', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
					          { text: 'Credit Card', datafield: 'credit', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
					          { text: 'Loan', datafield: 'loan', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
					          { text: 'Credit Memo', datafield: 'creditMemo', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
					          { text: 'Check', datafield: 'check', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
					          { text: 'Amount', datafield: 'amount', width: '10%',  cellsalign: 'right', cellsformat: 'c2', align: 'center' },
					          { text: 'Tax', datafield: 'tax', width: '10%', cellsalign: 'right', cellsformat: 'c2', align: 'center' }
					          ]
				});
			}
	    	
			components = $('#jqx-users-bottom-panel');
			if (components) {
				components.jqxTabs({ height: '100%', width: '100%' });
				components.on("selected", WRPAdminApp.pagescript.onDetailTabSelected);
			}

			try {
				WRPComponents('div[pagename="users"] > .page-submenu-container > .submenu[panelname="user_list"]').addShadowedImage('img/icon/people_03.png');
			} catch (e) {

			}
			try {
				WRPComponents('div[pagename="users"] > .page-submenu-container > .submenu[panelname="clock_in_out"]').addShadowedImage('img/icon/worktime_01.png');
			} catch (e) {

			}
			//jqx radio
			$('#sales-history-radio-1').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
				$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#sales-history-radio-2').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate() - 7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
				$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#sales-history-radio-3').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth() - 1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
				$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
			});  
			$('#user-activations-radio-1').on('checked', function (event) {
				var start,end,startDate,endDate;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				endDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				startDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				$("#user-activations-search-start-date").jqxDateTimeInput('setDate', start);
				$("#user-activations-search-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#user-activations-radio-2').on('checked', function (event) {
				var start, end, startDate, endDate;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				endDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				date.setDate(date.getDate() - 7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				startDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				$("#user-activations-search-start-date").jqxDateTimeInput('setDate', start);
				$("#user-activations-search-end-date").jqxDateTimeInput('setDate', end);	
				//WRPAdminApp.pagescript.getUserActivationsList(startDate, endDate);
			});

			$('#user-activations-radio-3').on('checked', function (event) {
				var start, end, startDate, endDate;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				endDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				date.setMonth(date.getMonth() - 1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				startDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				$("#user-activations-search-start-date").jqxDateTimeInput('setDate', start);
				$("#user-activations-search-end-date").jqxDateTimeInput('setDate', end);

				//WRPAdminApp.pagescript.getUserActivationsList(startDate, endDate);
			});
			
			$("#sales-history-radio-1").jqxRadioButton({checked: true});
			$("#user-activations-radio-1").jqxRadioButton({checked: true});
			// init function
			WRPAdminApp.pagescript.getUserList();
			WRPAdminApp.pagescript.getManagerStoreAssignedList();
			WRPAdminApp.pagescript.getUserRoleList();
			//etc
			
			$("#user-add-hire-date").jqxDateTimeInput({ width: 151, height: 21, formatString: "MM/dd/yyyy",theme: "arctic" });
			$('#user-add-hire-date').on('change viewChange', function (event) {
			});
			$("#user-edit-hire-date").jqxDateTimeInput({ width: 151, height: 21, formatString: "MM/dd/yyyy",theme: "arctic" });
			$('#user-edit-hire-date').on('change viewChange', function (event) {
			});
		},
		getManagerStoreAssignedList: function() {
			$.ajax({
				url: "ajax/store/getManagerStoreAssignedList2.jsp",
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, assignedStoreList, i, len, obj, innerHTML, strBuffer;
					data = result.data;

					if (!data) return;

					assignedStoreList = $("#jqx-assigned-store");
					if(assignedStoreList){
						assignedStoreList.jqxGrid("clear");
						assignedStoreList.jqxGrid("addrow", null, data, "last");
					}
				}
			});
		},
		onDetailTabSelected: function(event) {
			WRPAdminApp.pagescript.getDetailDataAtIndex(event.args.item);
		},
		getDetailDataAtIndex: function(tab_index) {
			switch (tab_index) {
			case 0:
				break;
			case 1:
				WRPAdminApp.pagescript.getStoreUserAccessList();
				break;
			case 2:
				WRPAdminApp.pagescript.getSalesHistoryList();
				break;
			case 3:
				WRPAdminApp.pagescript.getUserActivationsList();
				break;
			}
		},
		getUserRoleList: function() {
			$.ajax({
				url: "ajax/role/getRoleList.jsp",
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, innerHTML;

					data = result.data;
					if (!data) return;

					innerHTML = [];

					innerHTML.push('<option value="0" selected>None</option>');
					for (i = 0, len = data.length; i < len; i++) {
						try {
							obj = data[i];
							innerHTML.push('<option value="');
							innerHTML.push(obj.sid);
							innerHTML.push('">');
							innerHTML.push(obj.name);
							innerHTML.push('</option>');
						} catch (e) {

						}
					}

					try {
						document.getElementById("user-profile-user-role").innerHTML = innerHTML.join("");
						/* 170118 jh : rolelist ?�??추�? */
						document.getElementById("user-edit-user-role").innerHTML = innerHTML.join("");
						document.getElementById("user-add-user-role").innerHTML = innerHTML.join("");
						/**/
					} catch (e) {

					}

					innerHTML = undefined;
				}
			});
		},
		/* 170117 jh : jqxgrid �?변�?*/
		getUserList: function() {
			var data = {}, i, len, elem;

			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
	      	if (arguments.length > 0 && arguments[0] === true) {
	        	try {
	        		WRPAdminApp.pagescript._currPageNo = 1;
	        	} catch (e) {
	        		
	        	}
	        }

			data.curr_page_no = WRPAdminApp.pagescript._currPageNo;
			data.count_per_page = WRPAdminApp.pagescript._countPerPage;
			
			WRPAdminApp.pagescript._searchType = 0;
			WRPAdminApp.pagescript._searchKeyword = undefined;

			WRPAdminApp.pagescript._selectedUserSid = 0;
			WRPAdminApp.pagescript._selectedUserId = undefined;
			
			try {
				WRPAdminApp.pagescript._selectedStoreId = document.getElementById("select-store").value;
			} catch (e) {
				
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			if (WRPAdminApp.pagescript._selectedStoreId !== undefined && WRPAdminApp.pagescript._selectedStoreId.length > 0) {
				data.selectedStoreId = WRPAdminApp.pagescript._selectedStoreId;
			}
			
			$("#jqx-users-list").jqxGrid("clear");

			$.ajax({
				url: "ajax/user/getUserList.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, obj, i;
					data = result.data;
					if (!data){
						try {
	                		document.getElementById("loading-container").style.display = "none";
	                	} catch (e) {
	                		console.warn(e);
	                	}
						return;
					}
					
					if (data.length > 0 && data[0].max_page_no !== undefined) {
	        			WRPAdminApp.pagescript._maxPageNo = data[0].max_page_no;
	        		}

					obj = $("#jqx-users-list");
					if (obj) {
						obj.jqxGrid("clear");
						for(i = 0; i < data.length; i++){
							if(data[i].disable == 0){
								data[i].status = "Enable";
							}else {
								data[i].status = "Disable";
							}
						}
						obj.jqxGrid("addrow", null, data, "last");
					}
					
					try {
		        		document.getElementById("loading-container").style.display = "none";
		        	} catch (e) {
		        		console.warn(e);
		        	}
				}
			});
		},
		getSearchUserList: function() {
			var elem;
			var data = {};
			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}

			try {
				elem = document.getElementsByName("userSearchType");
				for (i = 0, len = elem.length; i < len; i++) {
					if (elem.checked === true) {
						WRPAdminApp.pagescript._searchType = parseInt(elem.value);
						if (!isNaN(WRPAdminApp.pagescript._searchType)) {
							break;
						} else {
							WRPAdminApp.pagescript._searchType = 0;
						}
					}
				}
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}
			
			try {
				WRPAdminApp.pagescript._searchKeyword = document.getElementById("user-search-keyword").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			data.searchType = WRPAdminApp.pagescript._searchType;

			if (WRPAdminApp.pagescript._searchKeyword !== undefined && WRPAdminApp.pagescript._searchKeyword.length > 0) {
				data.searchKeyword = WRPAdminApp.pagescript._searchKeyword;
			}
			if(WRPAdminApp.pagescript._searchKeyword) data.disableFlag = 1;
			
			$.ajax({
				url: "ajax/user/getUserList.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, obj, i;
					data = result.data;
					if (!data){
						try {
	                		document.getElementById("loading-container").style.display = "none";
	                	} catch (e) {
	                		console.warn(e);
	                	}
						return;
					}
					
					obj = $("#jqx-users-list");
					if (obj) {
						obj.jqxGrid("clear");
						for(i = 0; i < data.length; i++){
							if(data[i].disable == 0){
								data[i].status = "Enable";
							}else {
								data[i].status = "Disable";
							}
						}
						obj.jqxGrid("addrow", null, data, "last");
					}
					
					try {
		        		document.getElementById("loading-container").style.display = "none";
		        	} catch (e) {
		        		console.warn(e);
		        	}
				}
			});
		},
		getAllUserList: function() {
			var data = {}, i, len, elem			;
			
			
			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			$("#jqx-users-list").jqxGrid("clear");

			WRPAdminApp.pagescript._searchType = 0;
			WRPAdminApp.pagescript._searchKeyword = undefined;

			WRPAdminApp.pagescript._selectedUserSid = 0;
			WRPAdminApp.pagescript._selectedUserId = undefined;
			try {
				var rowscount = $("#jqx-assigned-store").jqxGrid('getdatainformation').rowscount;
				if(rowscount != 0){
					for (var i = 0; i < rowscount ; i++) {
						var commit = $("#jqx-assigned-store").jqxGrid('getcellvalue', i, "store_id");
						$("#jqx-assigned-store").jqxGrid('setcellvalue', i, "Assign", false);
					}
				}
			} catch (e) {
				console.warn(e);
			}
			
			try {
				elem = document.getElementsByName("userSearchType");
				for (i = 0, len = elem.length; i < len; i++) {
					if (elem.checked === true) {
						WRPAdminApp.pagescript._searchType = parseInt(elem.value);
						if (!isNaN(WRPAdminApp.pagescript._searchType)) {
							break;
						} else {
							WRPAdminApp.pagescript._searchType = 0;
						}
					}
				}
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				WRPAdminApp.pagescript._selectedStoreId = document.getElementById("select-store").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			data.searchType = WRPAdminApp.pagescript._searchType;

			if (WRPAdminApp.pagescript._searchKeyword !== undefined && WRPAdminApp.pagescript._searchKeyword.length > 0) {
				data.searchKeyword = WRPAdminApp.pagescript._searchKeyword;
			}
			data.disableFlag = 1;

			$.ajax({
				url: "ajax/user/getUserList.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, obj, i;
					data = result.data;
					if (!data){
						try {
	                		document.getElementById("loading-container").style.display = "none";
	                	} catch (e) {
	                		console.warn(e);
	                	}
						return;
					}

					obj = $("#jqx-users-list");
					if (obj) {
						obj.jqxGrid("clear");
						for(i = 0; i < data.length; i++){
							if(data[i].disable == 0){
								data[i].status = "Enable";
							}else {
								data[i].status = "Disable";
							}
						}
						obj.jqxGrid("addrow", null, data, "last");
					}
					
					try {
		        		document.getElementById("loading-container").style.display = "none";
		        	} catch (e) {
		        		console.warn(e);
		        	}
				}
			});
		},
		getStoreUserAccessList: function() {
			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			$.ajax({
				url: "ajax/store/getUserStoreAccessList.jsp",
				data: {
					userId: WRPAdminApp.pagescript._selectedUserId
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, j, len, elem, rowscount,commit;
					data = result.data;
					if (!data) return;
					
					elem = $("#jqx-assigned-store");
					if(elem){
						rowscount = elem.jqxGrid('getdatainformation').rowscount;
						if(rowscount != 0){
							for (i = 0; i < rowscount ; i++) {
								$("#jqx-assigned-store").jqxGrid('setcellvalue', i, "Assign", false);
								commit = elem.jqxGrid('getcellvalue', i, "store_id");
								for(j = 0; j < data.length; j++){
									if(data[j].storeId.toUpperCase() == commit.toUpperCase()){
										$("#jqx-assigned-store").jqxGrid('setcellvalue', i, "Assign", true);
									}
								}
							}
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
		informSelectedUserData: function() {
			var i, len, elem, list;

			if (arguments.length < 1) {
				console.warn("no input user sid");
				return;
			}

			WRPAdminApp.pagescript._selectedUserSid = parseInt(arguments[0]);
			if (isNaN(WRPAdminApp.pagescript._selectedUserSid)) {
				console.warn("error user sid");
				WRPAdminApp.pagescript._selectedUserSid = 0;
				return;
			}

			$.ajax({
				url: "ajax/user/getUserInfo.jsp",
				data: {
					userSid: WRPAdminApp.pagescript._selectedUserSid
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data;
					data = result.data;
					if (!data) return;

					try {
						document.getElementById("user-edit-id").value = (data.user_id !== undefined && data.user_id)? data.user_id : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					WRPAdminApp.pagescript._selectedUserId = (data.user_id !== undefined && data.user_id)? data.user_id : '';

					try {
						document.getElementById("user-edit-password").value = (data.password !== undefined && data.password)? data.password : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-type").value = (data.user_type !== undefined && data.user_type)? data.user_type : 3;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-first-name").value = (data.first_name !== undefined && data.first_name)? data.first_name : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-last-name").value = (data.last_name !== undefined && data.last_name)? data.last_name : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-address1").value = (data.address1 !== undefined && data.address1)? data.address1 : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-address2").value = (data.address2 !== undefined && data.address2)? data.address2 : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-city").value = (data.city !== undefined && data.city)? data.city : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-state").value = (data.state !== undefined && data.state)? data.state : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-zipcode").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-mobile").value = (data.tel !== undefined && data.tel)? data.tel : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-email").value = (data.email !== undefined && data.email)? data.email : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						if (data.disabled > 0) {
							document.getElementById("user-edit-auth-disable").checked = true;
						} else {
							document.getElementById("user-edit-auth-enable").checked = true;
						}
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("user-edit-user-role").value = (data.user_role !== undefined && data.user_role > 0) ? data.user_role : 0;
					} catch (e) {
						console.warn(e);
						return;
					}
					
					try {
						var hire_date = (data.hire_date !== undefined && data.hire_date)? data.hire_date : '';
						$('#user-edit-hire-date').val(hire_date);
					} catch (e) {
						console.warn(e);
						return;
					}
				}
			});
		},
		initUserEditContainer: function() {
			var elemList, i, len, elem;
			WRPAdminApp.pagescript._selectedUserSid = 0;
			
			/*170124 jh*/

			/*elemList = document.getElementById("users-assigned-store-list");
			if (!elemList) return;

			for (i = 0, len = elemList.children.length; i < len; i++) {
				try {
					elem = elemList.children[i];
					if (elem.className.indexOf("blank") > -1) continue;
					if (elem.children.length != 4) continue;
					if (elem.children[0].innerText.length == 0) continue;
					document.getElementById("users-assign-"+elem.children[0].innerText.toLowerCase()).checked = false;
				} catch (e) {
					console.warn(e);
				}
			}*/

			WRPAdminApp.pagescript.prevAssignedStoreIdList = {};
			try {
				document.getElementById("user-add-id").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-password").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-type").value = 4;
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-first-name").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-last-name").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-address1").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-address2").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-city").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-state").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-zipcode").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-mobile").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-email").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-auth-enable").checked = true;
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("user-add-user-role").value = 0;
			} catch (e) {
				console.warn(e);
				return;
			}
			
			try {
				$('#user-add-hire-date').jqxDateTimeInput('setDate',WRPCommon.TimeModule.getTime());
			} catch (e) {
				console.warn(e);
				return;
			}
		},
		getSalesHistoryList: function() {
			var storeId, search_start_date, search_end_date;
			
			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
			if (WRPAdminApp.pagescript._selectedUserSid < 1) {
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) {
					try {
                		document.getElementById("loading-container").style.display = "none";
                	} catch (e) {
                		console.warn(e);
                	}
					return;
				}
			} catch (e) {
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				console.warn(e);
				return;
			}
			
			search_start_date = new Date($("#sales-history-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
		    search_start_date = search_start_date.getFullYear()+"-"+(search_start_date.getMonth()+1)+"-"+search_start_date.getDate();
		    search_end_date = new Date($("#sales-history-search-end-date").jqxDateTimeInput('getDate'));
		    search_end_date = search_end_date.getFullYear()+"-"+(search_end_date.getMonth()+1)+"-"+search_end_date.getDate();//"11/30/2016";
			
			
			$.ajax({
				url: "ajax/invoice/getInvoiceListByUserSid.jsp",
				data: {
					userSid: WRPAdminApp.pagescript._selectedUserSid,
					storeId: storeId,
					startDate: search_start_date,
					endDate: search_end_date
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, saleshistory, i, len, obj, innerHTML, strBuffer;
					data = result.data;
					saleshistory = $("#jqx-sales-history");
					saleshistory.jqxGrid("clear");
					if (!data) {
						try {
	                		document.getElementById("loading-container").style.display = "none";
	                	} catch (e) {
	                		console.warn(e);
	                	}
						return;
					}

					for (var i = 0; i < result.data.length; i++) {
						result.data[i].store = document.getElementById("select-store").value; 
					}
					
					saleshistory.jqxGrid("addrow", null, data, "last");
				}
			});
			try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        	}
		},
		getInvoiceDatas: function(event) {
			var invoice_no, store_id;
			invoice_no = event.args.row.bounddata.invoiceNo;

			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length == 0) {
					return;
				}
			} catch (e) {
				console.warn(e);
				return;
			}

			WRPAdminApp.pagescript._selectedInvoiceItems = undefined;
			WRPAdminApp.pagescript._selectedInvoiceRatePlans = undefined;
			WRPAdminApp.pagescript._selectedInvoiceCheckout = undefined;


			$.ajax({
				url: "ajax/invoice/getInvoiceItems.jsp",
				data: {
					invoice_no: invoice_no,
					store_id: store_id
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
					$('#user-saleshistory-invoice-window').jqxWindow('open');
					WRPAdminApp.pagescript.printInvoiceItems();
					WRPAdminApp.pagescript.printInvoiceCheckout();
				}
			});

			$.ajax({
				url: "ajax/invoice/getInvoiceCheckout.jsp",
				data: {
					invoice_no: invoice_no,
					store_id: store_id
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
		printInvoiceItems: function() {
			var total_discount, total_qty, total_tax_amnt, total_price, list, i, len, obj, tmp;

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
				if (obj.tax_rate) {
					obj.tax_amnt = (obj.price - obj.discount) * obj.tax_rate; 
				} else {
					obj.tax_amnt = 0;
				}

				total_tax_amnt = total_tax_amnt + obj.tax_amnt;
				tmp = ((obj.price - obj.discount + obj.tax_amnt) * obj.qty);
				if (obj.subtotal !== tmp) {
					obj.subtotal = tmp;
					total_price = total_price + tmp;
				} else {
					total_price = total_price + obj.subtotal;
				}
			}

			obj = $("#inner-manage-jqx-invoice-item-list");

			if (obj) {
				obj[0].parentNode.innerHTML = '<div id="inner-manage-jqx-invoice-item-list"></div>';
			}

			obj = $("#inner-manage-jqx-invoice-item-list");
			if (obj) {
				obj.jqxDataTable({
					width: "99.8%",
					height: "99%",
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

			obj = document.getElementById("inner-manage-jqx-invoice-qty");
			if (obj) {
				obj.innerHTML = total_qty;
			}

			obj = document.getElementById("inner-manage-jqx-invoice-total-discount");
			if (obj) {
				obj.innerHTML = "$" + total_discount.toFixed(2);
			}

			obj = document.getElementById("inner-manage-jqx-invoice-total-discount");
			if (obj) {
				obj.innerHTML = "$" + total_discount.toFixed(2);
			}

			obj = document.getElementById("inner-manage-jqx-invoice-total-taxes");
			if (obj) {
				obj.innerHTML = "$" + total_tax_amnt.toFixed(2);
			}

			obj = document.getElementById("inner-manage-jqx-invoice-total-price");
			if (obj) {
				obj.innerHTML = "$" + total_price.toFixed(2);
			}
		},
		printInvoiceCheckout: function() {
			var list, obj, i, len;

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
					obj.type_str = "Store Credit";
					break;
				}
			}

			obj = $("#inner-manage-jqx-invoice-checkout-list");

			if (obj) {
				obj[0].parentNode.innerHTML = '<div id="inner-manage-jqx-invoice-checkout-list"></div>';
			}

			obj = $("#inner-manage-jqx-invoice-checkout-list");
			if (obj) {
				obj.jqxDataTable({
					width: "99%",
					height: "99%",
					filterable: false,
					editable: false,
					selectionMode: "custom",
					sortable: false,
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             // hidden
						             { name: "type", type: "number" }, // 1: handset, 2: other items, 3: payment, 4: fee 
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
		},
		getUserActivationsList: function() {
			var param, transactionType, time;

			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
			param = {};
			if (WRPAdminApp.pagescript._selectedUserSid < 1) {
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}
			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) {
					try {
                		document.getElementById("loading-container").style.display = "none";
                	} catch (e) {
                		console.warn(e);
                	}
					return;
				}
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}
			
			
			var search_start_date = new Date($("#user-activations-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
		    search_start_date = search_start_date.getFullYear()+"-"+(search_start_date.getMonth()+1)+"-"+search_start_date.getDate();
		    var search_end_date = new Date($("#user-activations-search-end-date").jqxDateTimeInput('getDate'));
		    search_end_date = search_end_date.getFullYear()+"-"+(search_end_date.getMonth()+1)+"-"+search_end_date.getDate();//"11/30/2016";
			
			
			param.userSid = WRPAdminApp.pagescript._selectedUserSid;
			param.transactionType = transactionType;
			param.startDate = search_start_date;
			param.endDate = search_end_date;
			$.ajax({
				url: "ajax/invoice/getActivationsListByUserSid.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, innerHTML, activationsList;
					data = result.data;
					$('#jqx-activations').jqxGrid("clear");
					if (!data){
						try {
	                		document.getElementById("loading-container").style.display = "none";
	                	} catch (e) {
	                		console.warn(e);
	                	}
						return;
					}

					var datarow = new Array();

					for (var i = 0; i < result.data.length; i++) {
						
						
						
						switch (result.data[i].transactionType) {
						case 0:
							result.data[i].transactionType = 'New Activation';
							break;
						case 1:
							result.data[i].transactionType = 'Re Activation';
							break;
						case 2:
							result.data[i].transactionType = 'Upgrade';
							break;
						case 3:
							result.data[i].transactionType = 'Port-in';
							break;
						case 4:
							result.data[i].transactionType = 'Byod-NewAct';
							break;
						case 5:
							result.data[i].transactionType = 'Byod-ReAct';
							break;
						case 6:
							result.data[i].transactionType = 'Byod-Upgrade';
							break;
						case 7:
							result.data[i].transactionType = 'Byod-PortIn';
							break;
						case 8:
							result.data[i].transactionType = 'ESN Change';
							break;
						case 9:
							result.data[i].transactionType = 'MDN Change';
							break;
						case 10:
							result.data[i].transactionType = 'MPR/DOA';
							break;
						case 11:
							result.data[i].transactionType = 'XBM';
							break;
						case 12:
							result.data[i].transactionType = 'Add A Line';
							break;
						case 13:
							result.data[i].transactionType = 'Byod-Add A Line';
							break;
						case 14:
							result.data[i].transactionType = 'SOR';
							break;
						}

						switch (result.data[i].promotion_type) {
						case 0:
							break;
						case 1:
							result.data[i].promotion_type = 'New Activation';
							break;
						case 2:
							result.data[i].promotion_type = 'Upgrade';
							break;
						case 3:
							result.data[i].promotion_type= 'Port-in';
							break;
						case 4:
							result.data[i].promotion_type = 'SOR';
							break;
						case 5:
							result.data[i].promotion_type = 'Add A Line';
							break;
						case 6:
							result.data[i].promotion_type = 'BOGO';
							break;
						case 7:
							result.data[i].promotion_type = 'POGO';
							break;
						}

					}
					$('#jqx-activations').jqxGrid("addrow", null, data, "last");
				}
			
			});
			try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        	}
		},
		setUserPhotoPreview: function() {
			var itemImage = document.getElementById("users-profile-photo-file"), reader;
			if (!itemImage) return;

			if (itemImage.files && itemImage.files[0]) {
				reader = new FileReader();
				reader.onload = function(e) {
					try { document.querySelector("#users-photo").style.backgroundImage= 'url("'+e.target.result+'")'; } catch (e) {}
				};

				reader.readAsDataURL(itemImage.files[0]);
			} else {
				try { document.getElementById("#users-photo").style.backgroundImage= 'img/user_photo_default.png'; } catch (e) {}
			}
		},
		setUserData: function() {
			var data, elemList, i, len, elem;

			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
			data = {};

			data.userSid = WRPAdminApp.pagescript._selectedUserSid;

			try {
				data.userId = document.getElementById("user-add-id").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			if (data.userId.length == 0) {
				WRPCommon.MsgBoxModule.alert({
					message: "Input User ID"
				});
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.password = document.getElementById("user-add-password").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			if(data.userSid == 0 && data.password.length == 0) {
				WRPCommon.MsgBoxModule.alert({
					message: "Input Password"
				});
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.userType = document.getElementById("user-add-type").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.firstName = document.getElementById("user-add-first-name").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			/*try {
				data.middleName = document.getElementById("user-add-middle-name").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}
			 */
			try {
				data.lastName = document.getElementById("user-add-last-name").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.address1 = document.getElementById("user-add-address1").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.address2 = document.getElementById("user-add-address2").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.city = document.getElementById("user-add-city").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.state = document.getElementById("user-add-state").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.zipcode = document.getElementById("user-add-zipcode").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.tel = document.getElementById("user-add-mobile").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.email = document.getElementById("user-add-email").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				if (document.getElementById("user-add-auth-enable").checked === true) {
					data.disable = 0;
				} else {
					data.disable = 1;
				}
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.userRole = document.getElementById("user-add-user-role").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}
			
			try {
				data.store_id = document.getElementById("select-store").value;
			} catch (e) {
				
			}
			
			try {
				//data.hire_date = document.getElementById("inputuser-add-hire-date").value;
				data.hire_date = $('#user-add-hire-date').jqxDateTimeInput('getDate');
				//data.hire_date = data.hire_date.getDate()+"/"+(data.hire_date.getMonth()+1)+"/"+data.hire_date.getFullYear();
				data.hire_date = WRPAdminApp.toDecimalFormat((data.hire_date.getMonth()+1), "00")+"/"+WRPAdminApp.toDecimalFormat(data.hire_date.getDate(), "00")+"/"+data.hire_date.getFullYear();
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			$.ajax({
				url: "ajax/user/setUserData.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						WRPCommon.MsgBoxModule.alert({
							message: "Completed",
							okBtnClick: function(){
								$('#user-add-window').jqxWindow('close');
								WRPAdminApp.pagescript.initUserEditContainer();
								WRPAdminApp.pagescript.getUserList();
							}
						});
					}else if (result == 1062) {
						WRPCommon.MsgBoxModule.alert({
							message: "Duplicated User."
						});
					} else {
						WRPCommon.MsgBoxModule.alert({
							message: "Error : " + result
						});
					}
				}
			});
			try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        	}
		},
		editUserData: function() {
			var data, elemList, i, len, elem;

			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
			data = {};

			data.userSid = WRPAdminApp.pagescript._selectedUserSid;

			try {
				data.userId = document.getElementById("user-edit-id").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			if (data.userId.length == 0) {

				WRPCommon.MsgBoxModule.alert({
					message: "Input User ID"
				});

				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.password = document.getElementById("user-edit-password").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			if(data.userSid == 0 && data.password.length == 0) {
				WRPCommon.MsgBoxModule.alert({
					message: "Input Password"
				});

				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.userType = document.getElementById("user-edit-type").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.firstName = document.getElementById("user-edit-first-name").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			/*try {
				data.middleName = document.getElementById("user-edit-middle-name").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}*/

			try {
				data.lastName = document.getElementById("user-edit-last-name").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.address1 = document.getElementById("user-edit-address1").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.address2 = document.getElementById("user-edit-address2").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.city = document.getElementById("user-edit-city").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.state = document.getElementById("user-edit-state").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.zipcode = document.getElementById("user-edit-zipcode").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.tel = document.getElementById("user-edit-mobile").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.email = document.getElementById("user-edit-email").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				if (document.getElementById("user-edit-auth-enable").checked === true) {
					data.disable = 0;
				} else {
					data.disable = 1;
				}
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.userRole = document.getElementById("user-edit-user-role").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}
			
			try {
				data.store_id = document.getElementById("select-store").value;
			} catch (e) {
				
			}

			try {
				if(document.getElementById("inputuser-edit-hire-date").value == "") {
					WRPCommon.MsgBoxModule.alert({
						message: "Input Hire Date"
					});
					try {
                		document.getElementById("loading-container").style.display = "none";
                	} catch (e) {
                		console.warn(e);
                	}
					return;
				}else{
					//data.hire_date = document.getElementById("inputuser-edit-hire-date").value;
					data.hire_date = $('#user-edit-hire-date').jqxDateTimeInput('getDate');
					data.hire_date = (data.hire_date.getMonth()+1)+"/"+data.hire_date.getDate()+"/"+data.hire_date.getFullYear();
				}
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			$.ajax({
				url: "ajax/user/setUserData.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						WRPCommon.MsgBoxModule.alert({
							message: "Completed",
							okBtnClick: function(){
								WRPAdminApp.pagescript.initUserEditContainer();
								WRPAdminApp.pagescript.getUserList();
								$('#user-edit-window').jqxWindow('close');
							}
						});
					} else {
						if(result == -2){
							WRPCommon.MsgBoxModule.alert({
								message: "Error : Exist ID."
							});
						}
						if(result == -1){
							WRPCommon.MsgBoxModule.alert({
								message: "Error"
							});
						}
					}
				}
			});
			try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        	}
		},/*?�기*/
		setUserStoreAccess: function() {
			var data, elemList, i, len, elem;

			if (WRPAdminApp.pagescript._selectedUserSid === undefined) {
				WRPCommon.MsgBoxModule.alert({
					message: "Select User ID"
				});
				return;
			}
			data = {};
			data.req_user_sid = WRPAdminApp.pagescript._selectedUserSid;
			data.insertAssignedStoreList = [];
			data.deleteAssignedStoreList = [];

			var rowscount = $("#jqx-assigned-store").jqxGrid('getdatainformation').rowscount;

			for (i = 0; i < rowscount; i++) {
				try {
					var commit = $("#jqx-assigned-store").jqxGrid('getcellvalue', i, "Assign");
					var store = $("#jqx-assigned-store").jqxGrid('getcellvalue', i, "store_id");
					if(commit){ data.insertAssignedStoreList.push(store.toLowerCase()); }
					else{ data.deleteAssignedStoreList.push(store.toLowerCase()); }
				} catch (e) {
					console.warn(e);
				}
			}

			data.insertAssignedStoreList = data.insertAssignedStoreList.join(",");
			data.deleteAssignedStoreList = data.deleteAssignedStoreList.join("','");

			if (data.insertAssignedStoreList.length == 0 && data.deleteAssignedStoreList.length == 0) {
				return;
			}

			$.ajax({
				url: "ajax/store/setUserStoreAccessList.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						WRPCommon.MsgBoxModule.alert({
							message: "Completed"
						});
						//WRPAdminApp.pagescript.initUserEditContainer();
						//WRPAdminApp.pagescript.getUserList();
					} else {
						WRPCommon.MsgBoxModule.alert({
							message: "Error : " + result
						});
					}
				}
			});
		} 
};