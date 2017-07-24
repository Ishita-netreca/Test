var _pagescript = {
		_selectCashOutSid: 0,
		_currPageNo: 1,
	    _maxPageNo: 1,
	    _countPerPage: 10,
		init: function() {
			try {
				WRPComponents('div[pagename="cash_out"] > .page-submenu-container > .submenu[panelname="cash_out_list"]').addShadowedImage('img/icon/icon_cashout.png');
			} catch (e) {

			}

			var components = $('#cashout-new-window');
			if (components) {
				components.jqxWindow("width", 600);
				components.jqxWindow("height", 310);
				components.css("top", "calc(50% - 155px)");
	    		components.css("left", "calc(50% - 300px)");
			}
			var storeId = document.getElementById("select-store").value;
			//jqx radio
			$('#cashout-radio-1').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#cashout-start-date").jqxDateTimeInput('setDate', start);
				$("#cashout-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#cashout-radio-2').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#cashout-start-date").jqxDateTimeInput('setDate', start);
				$("#cashout-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#cashout-radio-3').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#cashout-start-date").jqxDateTimeInput('setDate', start);
				$("#cashout-end-date").jqxDateTimeInput('setDate', end);
			});
			//jqx grid
			var components = $("#jqxgrid");
			if(components){
				components.jqxGrid(
						{
							width: '100%',
							height: '100%',
							source: new $.jqx.dataAdapter({
								datatype: "json",
								datafields: [
								             { name: 'sid', type: 'string'},
								             { name: 'date', type: 'string'},
								             { name: 'empid', type: 'string' },
								             { name: 'user_id', type: 'string'},
								             { name: 'empname', type: 'string' },
								             { name: 'store', type: 'string' },
								             { name: 'cash', type: 'number' },
								             { name: 'outto', type: 'string' },
								             { name: 'outStr', type: 'string' },
								             { name: 'note', type: 'string' }
								             ]
							}),
							showfilterrow: false,
							filterable: true,
							sortable: true,
							columnsresize:true,
							theme: 'arctic',
							columns: [
							          { text: 'Index', datafield: 'sid', width: '12%', hidden: true},
							          { text: 'Date', datafield: 'date', filtertype: "range", width: '14%', cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
							          { text: 'Emp.ID', columntype: 'textbox',  datafield: 'empid', width: '14%', hidden: true },
							          { text: 'Emp ID', columntype: 'textbox',  datafield: 'user_id', width: '14%', align: 'center' },
							          { text: 'Emp.Name', columntype: 'textbox',  datafield: 'empname', width: '14%', align: 'center' },
							          { text: 'Store', datafield: 'store', width: '14%', align: 'center'},
							          { text: 'Cash', datafield: 'cash', width: '14%',  cellsalign: "right", cellsformat: "c2", align: 'center' },
							          { text: 'Note', datafield: 'note', width: '16%', align: 'center'},
							          { text: 'Outto', datafield: 'outto', width: '14%', hidden: true},
							          { text: 'Out to', datafield: 'outtoStr', width: '14%', align: 'center'}
							          ]
						});
				$("#jqxgrid").on('rowselect', function (event) {
					$("#cash-out-profile-Index").val(event.args.row.index);
					$("#cash-out-profile-EmpId").val(event.args.row.user_id);
					$("#cash-out-profile-StoreId").val(event.args.row.store);
					$("#cash-out-profile-EmpName").val(event.args.row.empname);
					$("#cash-out-profile-Date").val(event.args.row.date);
					$("#cash-out-profile-Amount").val(event.args.row.cash);
					
					if(event.args.row.outtoStr == "Bank")	$("#cash-out-profile-Out-to").val("1");
					else if(event.args.row.outtoStr == "Cash Safe")	$("#cash-out-profile-Out-to").val("2");
					else if(event.args.row.outtoStr == "Other")	$("#cash-out-profile-Out-to").val("3");

					$("#cash-out-profile-Note").val(event.args.row.note);
				});

				$("#jqxgrid").on('rowdoubleclick', WRPAdminApp.pagescript.getEditPopup);
			}
			$("#excel_cash_out").click(function () {
				$("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqx-cashout-list');
			});
			$("#cashout-apply").on('click', function (){
				WRPAdminApp.pagescript.loadCashoutData();
			});
			//
			
			$('#cashout-radio-1').jqxRadioButton('check');
			WRPAdminApp.pagescript.loadCashoutData();
		},
		loadCashoutData : function() {
			var storeId, start_date, end_date;
			storeId = document.getElementById("select-store").value;
			
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
			start_date = $("#cashout-start-date").val();
			end_date = $("#cashout-end-date").val();

			$.ajax({
				url: "ajax/cashout/loadCashOutData.jsp",
				data: {
					storeId: storeId,
					start_date: start_date,
					end_date: end_date,
					curr_page_no : WRPAdminApp.pagescript._currPageNo,
	        		count_per_page : WRPAdminApp.pagescript._countPerPage
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, elem, i, len, obj, innerHTML;
					$("#jqxgrid").jqxGrid("clear");
					data = result.data;
					
					if (data.length > 0 && data[0].max_page_no !== undefined) {
	        			WRPAdminApp.pagescript._maxPageNo = data[0].max_page_no;
	        		}
					
					for (i = 0, len = data.length; i < len; i++) {
						data[i].store = document.getElementById("select-store").value;

						if(data[i].outto == "1")	data[i].outtoStr = "Bank";
						else if(data[i].outto == "2")	data[i].outtoStr = "Cash Safe";
						else if(data[i].outto == "3")	data[i].outtoStr ="Other";
					}

					if (!data) {
						try {
	                		document.getElementById("loading-container").style.display = "none";
	                	} catch (e) {
	                		console.warn(e);
	                	}
						return;
					}

					elem = $("#jqxgrid");
					if (elem) {
						elem.jqxGrid("clearselection");
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

		editCashOutData : function(){
			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
			var note = $("#cash-out-profile-Note-pop").val();
			var empId = $("#cash-out-profile-EmpId-pop").val();
			var storeId = $("#cash-out-profile-StoreId-pop").val();
			var amount = $("#cash-out-profile-Amount-pop").val();
			var outTo = $("#cash-out-profile-Out-to-pop").val();
			var date = $("#cash-out-profile-Date-pop").val();
			var index = $("#cash-out-profile-Index-pop").val();

			$.ajax({
				url: "ajax/cashout/editCashOutData.jsp",
				data: {
					note: note,
					empId: empId,
					storeId: storeId,
					amount: amount,
					outTo: outTo,
					date: date,
					index: index
				},
				method: "POST",
				success: function(result) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							$('#cashout-new-window').jqxWindow('close');
							WRPAdminApp.pagescript.loadCashoutData();
						}
					});
				}
			});
			try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        	}
		},
		getEditPopup: function(event) {
			$("#cash-out-profile-Index-pop").val(event.args.row.bounddata.sid);
			$("#cash-out-profile-EmpId-pop").val(event.args.row.bounddata.user_id);
			$("#cash-out-profile-StoreId-pop").val(event.args.row.bounddata.store);
			$("#cash-out-profile-EmpName-pop").val(event.args.row.bounddata.empname);
			$("#cash-out-profile-Date-pop").val(event.args.row.bounddata.date);
			$("#cash-out-profile-Amount-pop").val(event.args.row.bounddata.cash);
			if(event.args.row.bounddata.outtoStr == "Bank")	$("#cash-out-profile-Out-to-pop").val("1");
			else if(event.args.row.bounddata.outtoStr == "Cash Safe")	$("#cash-out-profile-Out-to-pop").val("2");
			else if(event.args.row.bounddata.outtoStr == "Other")	$("#cash-out-profile-Out-to-pop").val("3");

			$("#cash-out-profile-Note-pop").val(event.args.row.bounddata.note);

			$('#cashout-new-window').jqxWindow('open');
		},
};