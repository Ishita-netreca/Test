var _pagescript = {
		_selectMessageSid: 0,
		init: function() {
			try {
				//WRPComponents('div[pagename="cash_out"] > .page-submenu-container > .submenu[panelname="cash_out_list"]').addShadowedImage('img/icon/icon_message.png');
			} catch (e) {

			}

			var components = $('#message-new-window');
			if (components) {
				components.jqxWindow("width", 730);
				components.jqxWindow("height", 350);
			}
			var storeId = document.getElementById("select-store").value;

			//jqx dateinput

			//jqx radio
			$('#message-radio-1').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#message-start-date").jqxDateTimeInput('setDate', start);
				$("#message-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#message-radio-2').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#message-start-date").jqxDateTimeInput('setDate', start);
				$("#message-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#message-radio-3').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#message-start-date").jqxDateTimeInput('setDate', start);
				$("#message-end-date").jqxDateTimeInput('setDate', end);
			});
			//jqx grid
			var components = $("#message-grid");
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
								             { name: 'user_id', type: 'string' },
								             { name: 'target_store_id', type: 'string'},
								             { name: 'content', type: 'string' }
								             ]
							}),
							showfilterrow: false,
							filterable: true,
							sortable: true,
							columnsresize:true,
							theme: 'arctic',
							columns: [
							          { text: 'Index', datafield: 'sid', width: '12%', hidden: true},
							          { text: 'Date', datafield: 'reg_date', filtertype: "range", width: '15%', cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
							          { text: 'Emp.ID', datafield: 'user_id', width: '15%', align: 'center'},
							          { text: 'Store', datafield: 'target_store_id', width: '15%', align: 'center'},
							          { text: 'Content', datafield: 'content', width: '55%', align: 'center'}
							          ]
						});
				$("#message-grid").on('rowselect', function (event) {
					$("#message-profile-EmpId").val(event.args.row.user_id);
					$("#message-profile-StoreId").val(event.args.row.target_store_id);
					$("#message-profile-Note").val(event.args.row.content);
				});

				$("#message-grid").on('rowdoubleclick', WRPAdminApp.pagescript.getEditPopup);
			}
			$("#excel_cash_out").click(function () {
				$("#message-grid").jqxGrid('exportdata', 'xls', 'jqx-message-list');
			});
			
			$('#message-radio-1').jqxRadioButton('check');
			//
			WRPAdminApp.pagescript.setAssignedStoreList();
			WRPAdminApp.pagescript.loadMessageData();
		},
		addMessageData : function() {
			$('#message-new-window').jqxWindow('open');
			$('#message-profile-EmpId-pop').val(document.getElementById("login-user-name").innerHTML);
			$('#message-profile-Note-pop').val("");
			WRPAdminApp.pagescript._selectMessageSid = 0;

		},
		loadMessageData : function() {
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				console.warn(e);
			}

			start_date = new Date($("#message-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			start_date = start_date.getFullYear()+"-"+(start_date.getMonth()+1)+"-"+start_date.getDate();
			end_date = new Date($("#message-end-date").jqxDateTimeInput('getDate'));
			end_date = end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+end_date.getDate();//"11/30/2016";

			var storeId = document.getElementById("select-store").value;

			$.ajax({
				url: "ajax/message/getMessage.jsp",
				data: {
					search_start_date: start_date,
					search_end_date: end_date,
					storeId: storeId
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, elem, i, len, obj, innerHTML;
					$("#message-grid").jqxGrid("clear");
					data = result.data;

					if (!data) {
						try {
							document.getElementById("loading-container").style.display = "none";
						} catch (e) {
							console.warn(e);
						}
						return;
					}
					if ($("#message-grid")) {
						for(i=0; i < data.length; i++){
							data[i].content = data[i].content.replace(/<br>/g, "\r\n");
						}
						$("#message-grid").jqxGrid("addRow", null, data, "last");
					}
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						console.warn(e);
					}
				}
			});
		},

		setMessageData : function(){
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				console.warn(e);
			}

			var note = $("#message-profile-Note-pop").val().replace(/\n/g, "<br>");

			$.ajax({
				url: "ajax/message/setMessage.jsp",
				data: {
					sid: WRPAdminApp.pagescript._selectMessageSid,
					note: note,
					storeId: document.getElementById("message-profile-store").value
				},
				method: "POST",
				success: function(result) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							$('#message-new-window').jqxWindow('close');
							WRPAdminApp.pagescript.loadMessageData();
							WRPAdminApp.pagescript._selectMessageSid = 0;
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

			WRPAdminApp.pagescript._selectMessageSid = event.args.row.bounddata.sid;
			$("#message-profile-EmpId-pop").val(event.args.row.bounddata.user_id);

			$("#message-profile-store").val(event.args.row.bounddata.target_store_id).prop("selected", true);

			$("#message-profile-Note-pop").val(event.args.row.bounddata.content);

			$('#message-new-window').jqxWindow('open');
		},
		setAssignedStoreList: function() {

			var storeId;

			if (arguments.length > 0) {
				storeId = arguments[0];
			}

			$.ajax({
				url: "ajax/store/getManagerStoreAssignedList.jsp",
				method: "POST",
				async: false,
				dataType: "json",
				success: function(result) {
					var selectStoreBoxList, data, i, len, select, innerHTML;

					data = result.data;
					if (!data) return;

					innerHTML = [];
					innerHTML.push('<option value="All">ALL</option>');
					for (i = 0, len = data.length; i < len; i++) {
						innerHTML.push('<option value="');
						innerHTML.push(data[i].storeId);
						if (storeId !== undefined) {
							if (storeId.toLowerCase() === data[i].storeId.toLowerCase()) {
								innerHTML.push('" selected>');
							} else {
								innerHTML.push('">');
							}
						} else {
							if (i == 0) {
								innerHTML.push('" selected>');                                
							} else {
								innerHTML.push('">');
							}
						}
						innerHTML.push(data[i].storeId.toUpperCase());
						innerHTML.push('</option>');
					}

					selectStoreBoxList = document.getElementById("message-profile-store");
					selectStoreBoxList.innerHTML = innerHTML.join("");

					innerHTML = undefined;
				}
			})
		}
};