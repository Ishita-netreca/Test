var _pagescript = {
	_selectedClockIOAdjSid: 0,
	_selectedTimeOffSid: 0,
	_storeWorkTime: 0,
	_currPageNo: 1,
	_maxPageNo: 1,
	_countPerPage: 10,
	_selectedEmpSid:0,
	_editClockIOList: undefined,
	init: function() {
		var elem, components;
		try {
			WRPComponents('div[pagename="clock_io"] > .page-submenu-container > .submenu[panelname="schedule"]').addShadowedImage('img/icon/calendar_01.png');
			WRPComponents('div[pagename="clock_io"] > .page-submenu-container > .submenu[panelname="history"]').addShadowedImage('img/icon/drawer_01.png');
			WRPComponents('div[pagename="clock_io"] > .page-submenu-container > .submenu[panelname="time_adjust"]').addShadowedImage('img/icon/datetime_01.png');
			WRPComponents('div[pagename="clock_io"] > .page-submenu-container > .submenu[panelname="time_off"]').addShadowedImage('img/icon/timeoff_01.png');
			WRPComponents('div[pagename="clock_io"] > .page-submenu-container > .submenu[panelname="simple_adjustment"]').addShadowedImage('img/icon/datetime_01.png');
		} catch (e) {

		}

//			jqx button
		$("#work-schedule-show-all").on('click', function (){
			try{ 
				document.getElementById('clock-io-schedule-search-keyword').value=''; 
				WRPAdminApp.pagescript.getUserListInStore(); 
			}catch(e){}
		});

		$("#clockio-history-apply").on('click', function (){
			try{ 
				WRPAdminApp.pagescript.getClockIOHistoryInStore(); 
			}catch(e){}
		});

		$("#clockio-history-show-all").on('click', function (){
			try{ 
				$('#jqx-clock-io-history-list').jqxGrid('clearfilters'); 
			}catch(e){}
		});

		$("#last-week").on('click', function (){
			try{ 
				WRPAdminApp.pagescript.getLastWeekScheduleData();
			}catch(e){}
		});

//			jqx dateinput
		try {
			elem = $(".jqx-date-input");

			if (elem && elem.length > 0) {                            
				elem.jqxDateTimeInput({
					width: "100%",
					formatString: "MM/dd/yyyy"
				});
			}
		} catch (e) {

		}

		components = $('#jqx-clock-io-adjust-req-list');
		if (components) {
			components.jqxGrid({
				width: "100%",
				height: "100%",
				theme: "arctic",
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "clock_io_sid", type: "number" },
						{ name: "user_id", type: "string" },
						{ name: "req_date", type: "date" },
						{ name: "time_start", type: "date" },
						{ name: "time_end", type: "date" },
						{ name: "adj_time_start", type: "string" },
						{ name: "adj_time_end", type: "string" },
						{ name: "adjStatus", type: "string" },
						]
				}),
				filterable: true,
				sortable: true,
				groupable: false,
				columnsresize:true,
				columns: [
					{ text: "sid", datafield: "sid", hidden: true },
					{ text: "clock_io_sid", datafield: "clock_io_sid", hidden: true },
					{ text: "Employee", datafield: "user_id", width: "15%", align: 'center' },
					{ text: "Req. Date", datafield: "req_date", width: "15%", filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center' },
					{ text: "Status", datafield: "status", width: "10%", align: 'center' },
					{ text: "Start", datafield: "time_start", width: "10%", align: 'center' },
					{ text: "End", datafield: "time_end", width: "10%", align: 'center' },
					{ text: "Adj. Start", datafield: "adj_time_start", width: "15%", align: 'center' },
					{ text: "Adj. End", datafield: "adj_time_end", width: "15%", align: 'center' },
					{ text: "Adj. State", datafield: "adjStatus", width: "10%", align: 'center' },
					]
			});

			components.on("rowselect", WRPAdminApp.pagescript.getClockIOAdjInfo);

			$('#time-adj-radio-1').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-time-adjust-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-time-adjust-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#time-adj-radio-2').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-time-adjust-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-time-adjust-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#time-adj-radio-3').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-time-adjust-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-time-adjust-end-date").jqxDateTimeInput('setDate', end);
			});


			$("#excel_clock_io_adjust").click(function () {
				$("#jqx-clock-io-adjust-req-list").jqxGrid('exportdata', 'xls', 'jqx-clockIO-adjustment');
			});
		}

		components = $('#jqx-clock-io-timeoff-list');
		if (components) {
			components.jqxGrid({
				width: "100%",
				height: "100%",
				theme: "arctic",
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "userId", type: "string" },
						{ name: "userName", type: "string" },
						{ name: "startDate", type: "date" },
						{ name: "endDate", type: "date" },
						{ name: "reason", type: "string" },
						{ name: "note", type: "string" },
						{ name: "managerName", type: "string" },
						{ name: "reqDate", type: "date" },
						{ name: "reqStateStr", type: "string" },
						]
				}),
				filterable: true,
				sortable: true,
				groupable: false,
				columnsresize:true,
				columns: [
					{ text: "sid", datafield: "sid", hidden: true },
					{ text: "ID", datafield: "userId", width: "10%", align: 'center' },
					{ text: "Name", datafield: "userName", width: "10%", align: 'center' },
					{ text: "Start Date", datafield: "startDate", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center' },
					{ text: "End Date", datafield: "endDate", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center' },
					{ text: "Reason", datafield: "reason", width: "15%", align: 'center' },
					{ text: "Note", datafield: "note", width: "15%", align: 'center' },
					{ text: "Assigned by", datafield: "managerName", width: "10%", align: 'center' },
					{ text: "Req. Date", datafield: "reqDate", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center'},
					{ text: "State", datafield: "reqStateStr", width: "10%", align: 'center' },
					]
			});

			components.on("rowselect", WRPAdminApp.pagescript.getTimeOffInfo);

			$('#time-off-radio-1').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-time-off-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-time-off-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#time-off-radio-2').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-time-off-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-time-off-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#time-off-radio-3').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-time-off-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-time-off-end-date").jqxDateTimeInput('setDate', end);
			});
		}

		components = $('#jqx-clock-io-history-list');
		if (components) {
			components.jqxGrid({
				width: "100%",
				height: "100%",
				theme: "arctic",
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "emp_sid", type: "number" },
						{ name: "user_id", type: "string" },
						{ name: "name", type: "string" },
						{ name: "date", type: "date" },
						{ name: "work_start", type: "string" },
						{ name: "lunch_start", type: "string" },
						{ name: "lunch_end", type: "string" },
						{ name: "work_end", type: "date" },
						{ name: "schedule_work_start", type: "string" },
						{ name: "schedule_work_end", type: "string" },
						{ name: "work_hour", type: "string" },
						{ name: "store_work_time", type: "string" },
						{ name: "over_time", type: "string" },
						{ name: "diff_start", type: "string" },
						{ name: "diff_end", type: "string" },
						]
				}),
				filterable: true,
				sortable: true,
				groupable: false,
				columnsresize:true,
				columns: [
					{ text: "sid", datafield: "sid", hidden: true },
					{ text: "ID", datafield: "user_id", width: "8%", align: 'center' },
					{ text: "Name", datafield: "name", width: "8%", align: 'center' },
					{ text: "Date", datafield: "date", width: "8%", filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center' },
					{ text: "Work Start", datafield: "work_start", width: "6%", align: 'center' },
					{ text: "Lunch Start", datafield: "lunch_start", width: "6%", align: 'center' },
					{ text: "Lunch End", datafield: "lunch_end", width: "6%", align: 'center' },
					{ text: "Work End", datafield: "work_end", width: "6%", align: 'center'},
					{ text: "Schedule Work Start", datafield: "schedule_work_start", width: "8%", align: 'center' },
					{ text: "Schedule Work End", datafield: "schedule_work_end", width: "8%", align: 'center' },
					{ text: "Total Hour", datafield: "work_hour", width: "6%", align: 'center' },
					{ text: "Over Time", datafield: "over_time", width: "6%", align: 'center' },
					{ text: "Start Schedule Diff.", datafield: "diff_start", width: "9%", align: 'center' },
					{ text: "End Schedule Diff.", datafield: "diff_end", width: "9%", align: 'center' },
					{ text : '', columntype: 'button', width : '6%', filterable:false,sortable:false,menu: false,cellsrenderer: function () {
			            return "Detail";
			        }, buttonclick: function(row){
			        	var date = $('#jqx-clock-io-history-list').jqxGrid('getcellvalue', row, "date");
			        	var emp_sid = $('#jqx-clock-io-history-list').jqxGrid('getcellvalue', row, "emp_sid");
			        	WRPAdminApp.pagescript.getClockIOHistoryInfo(date,emp_sid);			        	
    				}
					}
					]
			});
			$('#history-radio-1').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-history-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-history-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#history-radio-2').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-history-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-history-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#history-radio-3').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#clockio-history-start-date").jqxDateTimeInput('setDate', start);
				$("#clockio-history-end-date").jqxDateTimeInput('setDate', end);
			});

			$("#excel-clockio-history").click(function () {
				components.jqxGrid('exportdata', 'xls', 'jqx-clockIO-history');
			});
		}

		$("#excel_clock_io_timeoff").click(function () {
			$("#jqx-clock-io-timeoff-list").jqxGrid('exportdata', 'xls', 'jqx-clockIO-timeoff');
		});

		elem = $(".jqx-datetime-input");
		if (elem && elem.length > 0) {                            
			elem.jqxDateTimeInput({
				width: "100%",
				formatString: "HH:mm", 
				showTimeButton: true, 
				showCalendarButton: false
			});
		}

		$("#clock-io-adj-adj-start").on('change', function (event) {
			WRPAdminApp.pagescript.calcAdjWorkHour();
		});

		$("#clock-io-adj-adj-end").on('change', function (event) {
			WRPAdminApp.pagescript.calcAdjWorkHour();
		});
		
		components = $("#clock-io-history-detail-list");
		if(components){
			components.jqxGrid({
				width : '100%',
				height : '87%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'date', type: 'date'},
							{ name: 'status', type: 'string'},
							{ name: 'start', type: 'string'},
							{ name: 'end', type: 'string'},
							{ name: 'amount', type: 'string'},
							{ name: 'adj_status', type: 'number'},
							{ name: 'memo', type: 'string'}
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden:true },
						{ text : 'Date/Day',datafield : 'date', width : '12%', align: 'center',cellsalign:'center' },
						{ text : 'Status', datafield : 'status',width : '12%', align: 'center',cellsalign:'center'},
						{ text : 'Start', datafield : 'start',width : '12%', align: 'center',cellsalign:'center' }, 
						{ text : 'End', datafield : 'end',width : '12%', align: 'center',cellsalign:'center'}, 
						{ text : 'Total Hours', datafield : 'amount',width : '12%', align: 'center',cellsalign:'center' }, 
						{ text : 'Memo', datafield : 'memo',width : '40%', align: 'center' }, 
				]
			});
		}
		
		components = $("#jqx-clock-io-emp-list");
		if(components){
			components.jqxGrid({
				width : '100%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'emp_sid', type: 'number'},
							{ name: 'user_id', type: 'string'},
							{ name: 'name', type: 'string'},
							{ name: 'date', type: 'date'},
							{ name: 'work_start', type: 'string'},
							{ name: 'work_end', type: 'string'},
							{ name: 'amount', type: 'string'},
							{ name: 'over_time', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columns : 
					[ 
						{ text : 'ID',datafield : 'user_id', width : '15%', align: 'center' }, 
						{ text : 'Name',datafield : 'name', width : '15%', align: 'center' }, 
						{ text : 'Date',datafield : 'date', width : '10%', align: 'center' },
						{ text : 'Clocked In', datafield : 'work_start',width : '12%', align: 'center' }, 
						{ text : 'Clocked Out', datafield : 'work_end',width : '12%', align: 'center' }, 
						{ text : 'Work Hour', datafield : 'amount',width : '12%', align: 'center' }, 
						{ text : 'overtime', datafield : 'over_time',width : '12%', align: 'center'}, 
						{ text : 'Action', columntype: 'button', width : '12%', align: 'center', filterable:false,sortable:false,menu: false,cellsrenderer: function () {
				            return "Adjust";
				        }, buttonclick: function(row){
				        	WRPAdminApp.pagescript.openClockIOAdjust(row);
	    				}
					}
				]
			});
		}
		
		components = $("#jqx-adjust-clock-io-original");
		if(components){
			components.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'start', type: 'string'},
							{ name: 'end', type: 'string'},
							{ name: 'status', type: 'string'},
							{ name: 'status_str', type: 'string'},
							{ name: 'amount', type: 'string'},
						],
					datatype: "json"
				}),
				showfilterrow : false,
				filterable : false,
				sortable : false,
				theme : 'arctic',
				selectionmode: 'none',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden: true }, 
						{ text : 'Status',datafield : 'status_str', width : '25%', align: 'center',cellsalign: 'center' }, 
						{ text : 'Start',datafield : 'start', width : '25%', align: 'center',cellsalign: 'center' }, 
						{ text : 'End',datafield : 'end', width : '25%', align: 'center',cellsalign: 'center' },
						{ text : 'Hours',datafield : 'amount', width : '25%', align: 'center',cellsalign: 'center' },
					]
			});
		}
		
		components = $("#jqx-adjust-clock-io-edit");
		if(components){
			components.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'start', type: 'string'},
							{ name: 'end', type: 'string'},
							{ name: 'status', type: 'string'},
							{ name: 'status_str', type: 'string'},
							],
							datatype: "json"
				}),
				showfilterrow : false,
				filterable : false,
				sortable : false,
				theme : 'arctic',
				selectionmode: 'none',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden: true }, 
						{ text : 'Status',datafield : 'status_str', width : '30%', align: 'center',cellsalign: 'center' }, 
						{ text : 'Start',datafield : 'start', width : '30%', align: 'center',cellsalign: 'center' }, 
						{ text : 'End',datafield : 'end', width : '30%', align: 'center',cellsalign: 'center' },
						{ text: "", width: '10%', editable: false, autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return '<div class="remove-list-btn"></div>'; } 
						}
					]
			});
			components.on("rowclick", function(event){
				WRPAdminApp.pagescript.deleteAdjust(event);
			});
		}
		
		components = $("#jqx-adjust-clock-io-confirm-original");
		if(components){
			components.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'start', type: 'string'},
							{ name: 'end', type: 'string'},
							{ name: 'status', type: 'string'},
							{ name: 'status_str', type: 'string'},
							{ name: 'amount', type: 'string'},
						],
					datatype: "json"
				}),
				showfilterrow : false,
				filterable : false,
				sortable : false,
				theme : 'arctic',
				selectionmode: 'none',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden: true }, 
						{ text : 'Status',datafield : 'status_str', width : '25%', align: 'center',cellsalign: 'center' }, 
						{ text : 'Start',datafield : 'start', width : '25%', align: 'center',cellsalign: 'center' }, 
						{ text : 'End',datafield : 'end', width : '25%', align: 'center',cellsalign: 'center' },
						{ text : 'Hours',datafield : 'amount', width : '25%', align: 'center',cellsalign: 'center' }
					]
			});
		}
		
		components = $("#jqx-adjust-clock-io-confirm-edit");
		if(components){
			components.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'start', type: 'string'},
							{ name: 'end', type: 'string'},
							{ name: 'status', type: 'string'},
							{ name: 'status_str', type: 'string'},
							{ name: 'amount', type: 'string'},
						],
					datatype: "json"
				}),
				showfilterrow : false,
				filterable : false,
				sortable : false,
				theme : 'arctic',
				selectionmode: 'none',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden: true }, 
						{ text : 'Status',datafield : 'status_str', width : '25%', align: 'center',cellsalign: 'center' }, 
						{ text : 'Start',datafield : 'start', width : '25%', align: 'center',cellsalign: 'center' }, 
						{ text : 'End',datafield : 'end', width : '25%', align: 'center',cellsalign: 'center' },
						{ text : 'Hours',datafield : 'amount', width : '25%', align: 'center',cellsalign: 'center' },
					]
			});
		}
		
		components = $('#clock-io-history-detail-window');
		if (components) {
			components.jqxWindow("width", 800);
			components.jqxWindow("height", 450);
			components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 225) });
		}
		
		components = $('#clock-io-simple-adjust-window');
    	if (components) {
    		components.jqxWindow("width", 850);
    		components.jqxWindow("height", 650);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 425) , y: ((window.innerHeight * 0.5) - 325) });
    	}
    	
    	components = $('#clock-io-simple-adjust-confirm-window');
    	if (components) {
    		components.jqxWindow("width", 850);
    		components.jqxWindow("height", 650);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 425) , y: ((window.innerHeight * 0.5) - 325) });
    	}
    	
    	components = $('#clock-io-simple-adjust-edit-window');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 260);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 130) });
    	}
    	
    	components = $('#simple-time-adj-today');
    	if (components){
    		components.on('checked', function (event) {
    			var start, end;
    			var date = WRPCommon.TimeModule.getTime();
    			$("#simple-time-adj-date").jqxDateTimeInput('setDate', date);
    		});
    	}
    	
    	components = $('#simple-time-adj-date');
    	if(components){
    		components.on('close', function (event) {
          		 $('#simple-time-adj-today').jqxRadioButton('uncheck');
       	 });
    	}
    	
    	components = $('#simple-adjust-edit-start');
    	components.jqxDateTimeInput({
    		showTimeButton: false
        });

    	components = $('#simple-adjust-edit-end');
    	components.jqxDateTimeInput({
    		showTimeButton: false
        });
    	
		$('#history-radio-1').jqxRadioButton('check');
		$('#time-adj-radio-1').jqxRadioButton('check');
		$('#time-off-radio-1').jqxRadioButton('check');
		$('#simple-time-adj-today').jqxRadioButton('check');

		WRPAdminApp.pagescript.getStoreWorkTime();
		WRPAdminApp.pagescript.getStoreTimeData();
		if (WRP.WeeklyWorkScheduler.getWeeklySchedule()) {
			WRPAdminApp.pagescript.getUserListInStore();
			WRPAdminApp.pagescript.printWeekScheduleController();
		}   
		WRPAdminApp.pagescript.getClockIOHistoryInStore();
		WRPAdminApp.pagescript.getClockIOAdjListInStore();
		WRPAdminApp.pagescript.getTimeOffList();
		WRPComponents(".wrp-timepicker").timepicker();
	},
	onSearchPeriodTypeChange: function(){
		var type, date;
		if (arguments.length < 1) {
			console.warn("no input search period type");
			return;
		}

		type = parseInt(arguments[0]);
		if (isNaN(type)) {
			console.warn("search period type error");
			return;
		}

		date = new Date();

		switch(type) {
		case 1:
			try {
				document.getElementById("clock-io-history-search-period-end").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			} catch (e) {
				console.warn(e);
				return;
			}
			date.setDate(date.getDate() - 7);
			try {
				document.getElementById("clock-io-history-search-period-start").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			} catch (e) {
				console.warn(e);
				return;
			}
			break;
		case 2:
			try {
				document.getElementById("clock-io-history-search-period-end").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			} catch (e) {
				console.warn(e);
				return;
			}
			date.setDate(date.getDate() - 14);
			try {
				document.getElementById("clock-io-history-search-period-start").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			} catch (e) {
				console.warn(e);
				return;
			}
			break;
		case 3:
			try {
				document.getElementById("clock-io-history-search-period-end").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			} catch (e) {
				console.warn(e);
				return;
			}
			date.setMonth(date.getMonth() - 1);
			try {
				document.getElementById("clock-io-history-search-period-start").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			} catch (e) {
				console.warn(e);
				return;
			}
			break;
		}
	},
	getStoreTimeData: function() {
		var storeId;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		$.ajax({
			url: "ajax/store/getStoreTimeData.jsp",
			data: {
				storeId: storeId
			},
			async: false,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data;
				data = result.data;
				if (!data) return;
				if (data.dailyWorkHour === undefined) return;
				WRPAdminApp.pagescript._storeDailyWorkHour = data.dailyWorkHour;
				if (data.weeklyWorkHour === undefined) return;
				WRPAdminApp.pagescript._storeWeeklyWorkHour = data.weeklyWorkHour;
				if (data.openTime === undefined) return;
				WRPAdminApp.pagescript._storeOpenTime = data.openTime;
				if (data.closeTime === undefined) return;
				WRPAdminApp.pagescript._storeCloseTime = data.closeTime;
			}
		});
	},
	getStoreWorkTime: function() {
		var storeId;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		$.ajax({
			url: "ajax/store/getStoreWorkTime.jsp",
			data: {
				storeId: storeId
			},
			async: false,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data;
				data = result.data;
				if (!data) return;
				if (data.workTime === undefined) return;
				WRPAdminApp.pagescript._storeWorkTime = data.workTime;
			}
		});
	},
	getStoreWeeklyWorkHour: function() {
		var storeId;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}
		$.ajax({
			url: "ajax/store/getStoreWeeklyWorkHour.jsp",
			data: {
				storeId: storeId
			},
			async: false,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data;
				data = result.data;
				if (!data) return;
				if (data.weeklyWorkHour === undefined) return;
				WRPAdminApp.pagescript._storeWeeklyWorkHour = data.weeklyWorkHour;
			}
		});
	},
	resetWeeklySchedule: function() {
		if (arguments.length < 3) {
			console.warn("input parameters {[year],[month(0~11)],[date]}")
		}
		if (WRP.WeeklyWorkScheduler.getWeeklySchedule(new Date(arguments[0],arguments[1],arguments[2]))) {
			WRPAdminApp.pagescript.printWeekScheduleController();
			WRPAdminApp.pagescript.getUserListInStore();
			//   WRPAdminApp.pagescript.getClockIOScheduleList();
		}
	},
	searchWeeklySchedule: function() {
		var startDate, endDate, year, month, date;

		startDate = $('#clockio-schedule-start-date').jqxDateTimeInput('getDate');
		endDate = $('#clockio-schedule-end-date').jqxDateTimeInput('getDate');

		year = startDate.getFullYear();
		month = startDate.getMonth();
		date = startDate.getDate();

		if (WRP.WeeklyWorkScheduler.getWeeklySchedule(new Date(year,month,date))) {
			WRPAdminApp.pagescript.printWeekScheduleController();
			WRPAdminApp.pagescript.getUserListInStore();
			//   WRPAdminApp.pagescript.getClockIOScheduleList();
		}
	},
	printWeekScheduleController: function() {
		var i, len, elem, header, date, controller, date2;

		if (!WRP.WeeklyWorkScheduler.getWeekStartDate()) return;

		if (!WRP.WeeklyWorkScheduler.getWeekEndDate()) return;

		controller = document.getElementById("clock-io-scheduler-week-ctrl");
		if (!controller) return;

		header = document.getElementById("clock-io-work-schedule-list-header");
		if (!header) return;

		elem = [];
		date2 = WRP.WeeklyWorkScheduler.getWeekStartDate();
		date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()-1);
		elem.push('<div class="select-prev-month" onclick="WRPAdminApp.pagescript.resetWeeklySchedule(');
		elem.push(date2.getFullYear());
		elem.push(',');
		elem.push(date2.getMonth());
		elem.push(',');
		elem.push(date2.getDate());
		elem.push(');"></div>');
		date2 = WRP.WeeklyWorkScheduler.getWeekEndDate();
		date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()+1);
		elem.push('<div class="select-next-month" onclick="WRPAdminApp.pagescript.resetWeeklySchedule(');
		elem.push(date2.getFullYear());
		elem.push(',');
		elem.push(date2.getMonth());
		elem.push(',');
		elem.push(date2.getDate());
		elem.push(');"></div>');
		elem.push('<div class="week-info">');
		date = WRP.WeeklyWorkScheduler.getWeekStartDate();
		elem.push(date.getMonth() + 1);
		elem.push('/');
		elem.push(date.getDate());
		elem.push('/');
		elem.push(date.getFullYear());
		elem.push(' ~ ');
		date = WRP.WeeklyWorkScheduler.getWeekEndDate();
		elem.push(date.getMonth() + 1);
		elem.push('/');
		elem.push(date.getDate());
		elem.push('/');
		elem.push(date.getFullYear());
		elem.push('</div>');

		controller.innerHTML = elem.join("");
		elem = undefined;

		date = new Date(WRP.WeeklyWorkScheduler.getWeekStartDate().getFullYear(), WRP.WeeklyWorkScheduler.getWeekStartDate().getMonth(), WRP.WeeklyWorkScheduler.getWeekStartDate().getDate());

		for (i = 1; i < 8; i++) {
			try {
				elem = header.children[i];
				elem.setAttribute("date", (date.getFullYear() + "-" + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat((date.getDate()), "00")));

				date.setDate(date.getDate() + 1);
			} catch (e) {
				console.warn(e);
				return;
			}
		}
	},
	getUserListInStore: function() {
		var storeId, searchKeyword;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			searchKeyword = document.getElementById("clock-io-schedule-search-keyword").value;
		} catch(e) {
			console.warn(e);
			return;
		}

		$.ajax({
			url: "ajax/user/getUserList.jsp",
			data: {
				selectedStoreId: storeId,
				searchKeyword: searchKeyword
			},
			async: false,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj, innerHTML, innerHTML2;
				data = result.data;
				if (!data) return;

				innerHTML = [];
				innerHTML2 = [];
				try {
					document.getElementById("clock-io-schedule-btn-visible").style.display = (data.length > 0)? "inline" : "none";
				} catch (e) {
					console.warn(e);
				}

				for (i = 0, len = data.length; i < len; i++) {
					try {
						obj = data[i];
						if (obj.sid === undefined) continue;
						innerHTML.push('<tr emp_sid="');
						innerHTML.push(obj.sid);
						innerHTML.push('">');
						innerHTML.push('<td>');
						innerHTML.push(obj.userId);
						innerHTML.push('</td>');
						innerHTML.push('<td><input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/>~<input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/></td>');
						innerHTML.push('<td><input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/>~<input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/></td>');
						innerHTML.push('<td><input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/>~<input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/></td>');
						innerHTML.push('<td><input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/>~<input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/></td>');
						innerHTML.push('<td><input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/>~<input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/></td>');
						innerHTML.push('<td><input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/>~<input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/></td>');
						innerHTML.push('<td><input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/>~<input type="text" maxlength="5" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcEmpWorkScheduleData(this); }" onchange="WRPAdminApp.pagescript.calcEmpWorkScheduleData(this);" class="wrp-timepicker"/></td>');
						innerHTML.push('<td>00:00</td>');
						innerHTML.push('<td>00:00</td>');
						innerHTML.push('</tr>');

						innerHTML2.push('<tr emp_sid="');
						innerHTML2.push(obj.sid);
						innerHTML2.push('">');
						innerHTML2.push('<td>');
						innerHTML2.push(obj.userId);
						innerHTML2.push('</td>');
						innerHTML2.push('<td><div class="percentage"></div></td>');
						innerHTML2.push('<td><div class="percentage"></div></td>');
						innerHTML2.push('<td><div class="percentage"></div></td>');
						innerHTML2.push('<td><div class="percentage"></div></td>');
						innerHTML2.push('<td><div class="percentage"></div></td>');
						innerHTML2.push('<td><div class="percentage"></div></td>');
						innerHTML2.push('<td><div class="percentage"></div></td>');
						innerHTML2.push('<td>00:00</td>');
						innerHTML2.push('<td>00:00</td>');
						innerHTML2.push('</tr>');
					} catch (e) {
						console.warn(e);
						return;
					}
				}

				try {
					document.getElementById("clock-io-work-schedule-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}

				try {
					document.getElementById("clock-io-weekly-schedule-graph-list").innerHTML = innerHTML2.join("");
				} catch (e) {
					console.warn(e);
				}
				WRPAdminApp.pagescript.getClockIOScheduleList();

				WRPComponents(".wrp-timepicker").timepicker();

				innerHTML = undefined;
				innerHTML2 = undefined;
			}
		});
	},
	getClockIOScheduleList: function() {
		var storeId, date, startDate, endDate, i, header, searchKeyword;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			searchKeyword = document.getElementById("clock-io-schedule-search-keyword").value;
		} catch(e) {
			console.warn(e);
			return;
		}

		date = WRP.WeeklyWorkScheduler.getWeekStartDate();
		if (date === undefined) return;

		startDate = date.getFullYear() + "-" + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(date.getDate(), "00");

		header = document.getElementById("clock-io-weekly-schedule-graph-list-header");
		if (header) {
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			for (i = 1; i < 8; i++) {
				try {
					header.children[i].children[0].innerHTML = date.getDate();
					date.setDate(date.getDate() + 1);
				} catch (e) {
					console.warn(e);
				}
			}
		}

		date = WRP.WeeklyWorkScheduler.getWeekEndDate();
		if (date === undefined) return;
		endDate = date.getFullYear() + "-" + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
		$('#clockio-schedule-start-date').val(startDate);
		$('#clockio-schedule-end-date').val(endDate);
		$.ajax({
			url: "ajax/clockIOSchedule/getClockIOScheduleList.jsp",
			data: {
				storeId: storeId,
				startDate: startDate,
				endDate: endDate,
				keyword: searchKeyword
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj, tr, elem;
				data = result.data;

				if (!data) return;

				for (i = 0, len = data.length ; i < len; i++) {
					try {
						obj = data[i];
						if (obj.empSid === undefined || obj.index === undefined) continue;
						tr = document.querySelector('#clock-io-work-schedule-list > tr[emp_sid="'+obj.empSid+'"]');
						if (tr && tr.children.length > 9) {
							tr.children[obj.index].setAttribute("update", obj.sid);
							if (obj.workStart) {
								tr.children[obj.index].children[0].value = obj.workStart;
							}
							if (obj.workEnd) {
								tr.children[obj.index].children[1].value = obj.workEnd;
							}
						}

					} catch (e) {
						console.warn(e);
						return;
					}
				}

				elem = document.getElementById("clock-io-work-schedule-list");
				if (elem) {
					for(i = 0, len = elem.children.length; i < len; i++) {
						WRPAdminApp.pagescript.calcEmpWorkScheduleData(elem.children[i]);
					}
				}

			}
		});
	},
	getLastWeekScheduleData: function() {
		var storeId, date, startDate, endDate, i, header;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		date = WRP.WeeklyWorkScheduler.getWeekStartDate();
		if (date === undefined) return;

		startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

		header = document.getElementById("clock-io-weekly-schedule-graph-list-header");
		if (header) {
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			for (i = 1; i < 8; i++) {
				try {
					header.children[i].children[0].innerHTML = date.getDate();
					date.setDate(date.getDate() + 1);
				} catch (e) {
					console.warn(e);
				}
			}
		}

		date = WRP.WeeklyWorkScheduler.getWeekEndDate();
		if (date === undefined) return;

		endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

		$.ajax({
			url: "ajax/clockIOSchedule/getClockIOScheduleList.jsp",
			data: {
				storeId: storeId,
				startDate: startDate.getFullYear() + "-" + WRPAdminApp.toDecimalFormat((startDate.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(startDate.getDate(), "00"),
				endDate: endDate.getFullYear() + "-" + WRPAdminApp.toDecimalFormat((endDate.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(endDate.getDate(), "00")
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj, tr;
				data = result.data;

				if (!data) return;

				for (i = 0, len = data.length ; i < len; i++) {
					try {
						obj = data[i];
						if (obj.empSid === undefined || obj.index === undefined) continue;
						tr = document.querySelector('#clock-io-work-schedule-list > tr[emp_sid="'+obj.empSid+'"]');
						if (tr && tr.children.length > 9) {
							tr.children[obj.index].setAttribute("update", 0);
							if (obj.workStart) {
								tr.children[obj.index].children[0].value = obj.workStart;
							}
							if (obj.workEnd) {
								tr.children[obj.index].children[1].value = obj.workEnd;
							}
						}
					} catch (e) {
						console.warn(e);
						return;
					}
				}

				obj = document.getElementById("clock-io-work-schedule-list");
				if (obj) {
					for(i = 0, len = obj.children.length; i < len; i++) {
						WRPAdminApp.pagescript.calcEmpWorkScheduleData(obj.children[i]);
					}
				}
			}
		});
	},
	calcEmpWorkScheduleData: function() {
		var tr, totalWorkTime, storeWeeklyWorkHour, storeOpenTime, storeCloseTime, storeWorkTime, overTime, i, len, elem, tmp, workDayCount, empSid, tr2, percentage, empWorkStart, empWorkTime;

		if (arguments.length < 1) {
			console.warn("no input elements");
			return;
		}

		tr = arguments[0];

		while(tr) {
			try {
				if (tr.nodeName === "TR" && tr.parentNode.id === "clock-io-work-schedule-list") break;
			} catch (e) {
				console.warn(e);
			}

			tr = tr.parentNode;
		}

		if (!tr) return;

		try {
			empSid = tr.getAttribute("emp_sid");
			if (!empSid) {
				return;
			}
		} catch(e) {
			console.warn(e);
			return;
		}

		totalWorkTime = 0;

		storeWeeklyWorkHour = WRP.WeeklyWorkScheduler.getTimeToSeconds(WRPAdminApp.pagescript._storeWeeklyWorkHour.split(":"));
		storeOpenTime = WRP.WeeklyWorkScheduler.getTimeToSeconds(WRPAdminApp.pagescript._storeOpenTime.split(":"));
		storeCloseTime = WRP.WeeklyWorkScheduler.getTimeToSeconds(WRPAdminApp.pagescript._storeCloseTime.split(":"));

		storeWorkTime = storeCloseTime - storeOpenTime;

		overTime = 0;

		for (i = 0, len = tr.children.length; i < len; i++) {
			try {
				elem = tr.children[i];
				if (i > 0 && i < 8) {
					if (elem.children.length != 2) continue;
					if (elem.children[1].value.length > 0 && elem.children[0].value.length > 0) {
						empWorkStart = WRP.WeeklyWorkScheduler.getTimeToSeconds(elem.children[0].value.split(":"));
						empWorkTime = WRP.WeeklyWorkScheduler.getTimeToSeconds(elem.children[1].value.split(":")) - empWorkStart;
						totalWorkTime = totalWorkTime + empWorkTime;
						workDayCount++;
					}

					tr2 = document.querySelector('#clock-io-weekly-schedule-graph-list > tr[emp_sid="'+empSid+'"]');
					if (tr2 && tr2.children.length > 9) {
						if (empWorkTime > 0) {
							elem = tr2.children[i].children[0];

							percentage = Math.floor(((empWorkStart - storeOpenTime) / (storeCloseTime - storeOpenTime)) * 100);

							if (percentage < 0) percentage = 0;
							else if (percentage > 100) percentage = 100;
							elem.style.left = percentage + "%";

							percentage = Math.floor((empWorkTime / storeWorkTime) * 100);
							empWorkTime = WRP.WeeklyWorkScheduler.getSecondsToTime(empWorkTime);
							elem.innerHTML = empWorkTime.substring(0, empWorkTime.lastIndexOf(":"));
							if (percentage > 100) percentage = 100;
							elem.style.width = percentage + "%";
							elem.style.paddingRight = "5px";
						} else {
							elem = tr2.children[i].children[0];
							elem.innerHTML = '';
							elem.style.width = "0%";
							elem.style.paddingRight = "0px"
						}
					}
				} else if (i == len - 2) {
					overTime = totalWorkTime - storeWeeklyWorkHour;
					totalWorkTime = WRP.WeeklyWorkScheduler.getSecondsToTime(totalWorkTime);
					totalWorkTime = totalWorkTime.substring(0, totalWorkTime.lastIndexOf(":"));
					elem.innerHTML = WRPCommon.TimeModule.getWorkAmountF(totalWorkTime).toFixed(2);
					elem = document.querySelector('#clock-io-weekly-schedule-graph-list > tr[emp_sid="'+empSid+'"] > td:nth-of-type('+ (i + 1) +')');
					if (elem) {
						elem.innerHTML = WRPCommon.TimeModule.getWorkAmountF(totalWorkTime).toFixed(2);
					}
				} else if (i == len - 1) {
					if (overTime > 0) {
						overTime = WRP.WeeklyWorkScheduler.getSecondsToTime(overTime);
						overTime = overTime.substring(0, overTime.lastIndexOf(":"));
						elem.innerHTML = WRPCommon.TimeModule.getWorkAmountF(overTime).toFixed(2);

						elem = document.querySelector('#clock-io-weekly-schedule-graph-list > tr[emp_sid="'+empSid+'"] > td:nth-of-type('+ (i + 1) +')');
						if (elem) {
							elem.innerHTML = WRPCommon.TimeModule.getWorkAmountF(overTime).toFixed(2);
						}
					} else {
						elem.innerHTML = "0.00";

						elem = document.querySelector('#clock-io-weekly-schedule-graph-list > tr[emp_sid="'+empSid+'"] > td:nth-of-type('+ (i + 1) +')');
						if (elem) {
							elem.innerHTML = "0.00";
						}
					}
				}
			} catch (e) {
				console.warn(e);
			}
		}
	},
	saveWeekWorkScheduleData: function() {
		var workScheduleList, i, len, i2, len2, elem, data, schedule, arr, date, header, tmp;
		var storeId;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			console.warn(e);
		}

		workScheduleList = document.getElementById("clock-io-work-schedule-list");
		if (!workScheduleList) return;

		header = document.getElementById("clock-io-work-schedule-list-header");
		if (!header) return;

		data = [];

		for (i = 0, len = workScheduleList.children.length; i < len; i++) {
			try {
				elem = workScheduleList.children[i]; // tr
				if (isNaN(parseInt(elem.getAttribute("emp_sid")))) continue;
				for (i2 = 1; i2 < 8; i2++) {
					schedule = {};

					if (elem.children[i2].children[0].value.length == 0) {
						tmp = elem;
					} else {
						arr = elem.children[i2].children[0].value.split(":");
						if (arr.length != 2) {
							WRPCommon.MsgBoxModule.alert({
								message: "Format error",
								okBtnClick: function(){
									elem.children[i2].children[0].style.backgroundColor = "rgba(255,255,0,1)";
								}
							});
							return;
						}
						schedule.workStart = arr.join(":");
						arr = undefined;
					}

					if (elem.children[i2].children[1].value.length == 0) {
						if (tmp !== undefined) {
							if (isNaN(parseInt(elem.children[i2].getAttribute("update")))) {
								tmp = undefined;
								continue;
							} else {
								schedule.empSid = parseInt(elem.getAttribute("emp_sid"));
								schedule.sid = parseInt(elem.children[i2].getAttribute("update"));
								data.push(schedule);
								tmp = undefined;
								schedule = undefined;
								continue;
							}
						} else {
							WRPCommon.MsgBoxModule.alert({
								message: "Input Work End Time.",
								okBtnClick: function(){
									elem.children[i2].children[1].style.backgroundColor = "rgba(255,255,0,1)";
								}
							});
							return;
						}
					}
					if (tmp !== undefined) {
						WRPCommon.MsgBoxModule.alert({
							message: "Input Work Start Time.",
							okBtnClick: function(){
								elem.children[i2].children[1].style.backgroundColor = "rgba(255,255,0,1)";
							}
						});
						return;
					}
					arr = elem.children[i2].children[1].value.split(":");
					if (arr.length != 2) {
						WRPCommon.MsgBoxModule.alert({
							message: "Format error",
							okBtnClick: function(){
								elem.children[i2].children[1].style.backgroundColor = "rgba(255,255,0,1)";
							}
						});
						return;
					}
					schedule.workEnd = arr.join(":");
					arr = undefined;

					schedule.empSid = parseInt(elem.getAttribute("emp_sid"));
					schedule.date = header.children[i2].getAttribute("date");
					if (isNaN(parseInt(elem.children[i2].getAttribute("update")))) {
						schedule.sid = 0;
					} else {
						schedule.sid = parseInt(elem.children[i2].getAttribute("update"));
					}

					data.push(schedule);
					tmp = undefined;
					schedule = undefined;
				}
			} catch (e) {
				console.warn(e);
				return;
			}
		}

		$.ajax({
			url: "ajax/clockIOSchedule/saveWeekClockIOSchedule.jsp",
			data: {
				storeId: storeId,
				data: JSON.stringify(data)
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				if (result === 0) {
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						console.warn(e);
					}

					WRPCommon.MsgBoxModule.alert({
						message: "Completed"
					});
				} else {
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						console.warn(e);
					}
					WRPCommon.MsgBoxModule.alert({
						message: "Error : " + result
					});
				}
			}
		});
	},
	getClockIOHistoryInStore: function() {
		var storeId, searchKeyword, search_start_date, search_end_date;

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
			console.warn(e);

			try {
				document.getElementById("loading-container").style.display = "none";
			} catch (e) {
				console.warn(e);
			}
			return;
		}

		search_start_date = $("#clockio-history-start-date").val();
		search_end_date = $("#clockio-history-end-date").val();

		$.ajax({
			url: "ajax/clockIO/getClockIOHistoryInStore.jsp",
			data: {
				storeId: storeId,
				searchPeriodStart: search_start_date,
				searchPeriodEnd: search_end_date,
				searchKeyword: searchKeyword,
				curr_page_no : WRPAdminApp.pagescript._currPageNo,
				count_per_page : WRPAdminApp.pagescript._countPerPage
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, elem, i, len, obj;

				data = result.data;

				if (data.length > 0 && data[0].max_page_no !== undefined) {
					WRPAdminApp.pagescript._maxPageNo = data[0].max_page_no;
				}

				elem = $("#jqx-clock-io-history-list");
				if (elem) {
					elem.jqxGrid("clear");
					for(i = 0; i < data.length; i++){
						if(data[i].work_hour) data[i].work_hour = WRPCommon.TimeModule.getWorkAmountF(data[i].work_hour).toFixed(2);
						if(data[i].over_time) data[i].over_time = WRPCommon.TimeModule.getWorkAmountF(data[i].over_time).toFixed(2);
					}
					elem.jqxGrid("addRow", null, data, "last");
				}


				if (!data) {
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						console.warn(e);
					}
					return;
				}
			}
		});

		try {
			document.getElementById("loading-container").style.display = "none";
		} catch (e) {
			console.warn(e);
		}
	},
    getClockIOHistoryInfo: function(date,emp_sid) {
    	var store_id;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
			if (store_id.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}
		
        $.ajax({
            url: "ajax/clockIO/getClockIOHistoryInfo.jsp",
            data: {
            	store_id: store_id,
                clockIODate: date,
                emp_sid: emp_sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data,i, len, obj, elem;
                data = result.data;
                
                if (!data) return;

                
                elem = $("#clock-io-history-detail-list");
                if(elem){
                	elem.jqxGrid("clear");
                	for(i = 0; i < data.length; i++){
    					if(data[i].amount) data[i].amount = WRPCommon.TimeModule.getWorkAmountF(data[i].amount).toFixed(2);
    				}
					elem.jqxGrid("addRow", null, data, "last");
					$('#clock-io-history-detail-window').jqxWindow('open');
                    elem.jqxGrid("render");
                }
            }
        });
    },
	getClockIOAdjListInStore: function() {
		var storeId, search_start_date, search_end_date;

		if (arguments.length > 0 && arguments[0] === true) {
			try {
				WRPAdminApp.pagescript._currPageNo = 1;
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

		WRPAdminApp.pagescript._selectedClockIOAdjSid = 0;

		search_start_date = $("#clockio-time-adjust-start-date").val();
		search_end_date = $("#clockio-time-adjust-end-date").val();

		$.ajax({
			url: "ajax/clockIO/getClockIOAdjList.jsp",
			data: {
				storeId: storeId,
				adjustState: 1,
				searchPeriodStart: search_start_date,
				searchPeriodEnd: search_end_date,
				curr_page_no : WRPAdminApp.pagescript._currPageNo,
				count_per_page : WRPAdminApp.pagescript._countPerPage
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, elem, i, len, obj;

				data = result.data;

				if (!data) return;

				if (data.length > 0 && data[0].max_page_no !== undefined) {
					WRPAdminApp.pagescript._maxPageNo = data[0].max_page_no;
				}

				elem = $("#jqx-clock-io-adjust-req-list");
				if (elem) {
					elem.jqxGrid("clear");
					elem.jqxGrid("addRow", null, data, "last");		
				}
			}
		});
	},
	getClockIOAdjInfo: function(event) {
		var storeId, rowdata, clockIOAdjSid;

		if(event){
			rowdata = event.args.row;
			clockIOAdjSid = rowdata.sid;
		}else{
			clockIOAdjSid = WRPAdminApp.pagescript._selectedClockIOAdjSid;
		}


		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		$.ajax({
			url: "ajax/clockIO/getClockIOAdjInfo.jsp",
			data: {
				storeId: storeId,
				clockIOAdjSid: clockIOAdjSid
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, list, i, len, start, end;
				data = result.data;

				if (!data) return;

				WRPAdminApp.pagescript._selectedClockIOAdjSid = data.sid;

				try {
					document.getElementById("clock-io-adj-user-id").value = (data.user_id !== undefined && data.user_id !== null)? data.user_id : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-adj-mobile-no").value = (data.tel !== undefined && data.tel !== null)? data.tel : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-adj-date").innerHTML = (data.datestr !== undefined && data.datestr !== null)? data.datestr : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-adj-status").value = (data.status !== undefined && data.status !== null)? data.status : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-adj-start").value = (data.time_start !== undefined && data.time_start !== null)? data.time_start : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-adj-end").value = (data.time_end !== undefined && data.time_end !== null)? data.time_end : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-adj-total-hour").value = (data.time_amount !== undefined && data.time_amount !== null)? WRPCommon.TimeModule.getWorkAmountF(data.time_amount).toFixed(2) : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				if (data.adj_status == 0) {
					try {
						document.getElementById("clock-io-adj-adj-status").value = (data.status !== undefined && data.status !== null)? data.status : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						$('#clock-io-adj-adj-start').jqxDateTimeInput('val', data.date + " " + data.adj_time_start);
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						$('#clock-io-adj-adj-end').jqxDateTimeInput('val', data.date + " " + data.adj_time_end);
					} catch (e) {
						console.warn(e);
						return;
					}

					WRPAdminApp.pagescript.calcAdjWorkHour();
					list = document.querySelectorAll(".adj-for-accept-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "visible";
					}
					list = document.querySelectorAll(".adj-for-reject-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "visible";
					}
				} else if (data.adj_status == 1) {
					list = document.querySelectorAll(".adj-for-accept-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "hidden";
					}
					list = document.querySelectorAll(".adj-for-reject-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "visible";
					}
				} else if (data.adj_status == 2) {
					list = document.querySelectorAll(".adj-for-accept-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "hidden";
					}
					list = document.querySelectorAll(".adj-for-reject-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "hidden";
					}
				}

				WRPAdminApp.pagescript._storeWorkTime = (data.store_work_time !== undefined && data.store_work_time !== null)? data.store_work_time : '08:00:00';
			}
		});
	},
	calcAdjWorkHour: function() {
		var start, end, diff, arr,totalhour;

		start = $('#clock-io-adj-adj-start').jqxDateTimeInput('getDate').getTime();
		end = $('#clock-io-adj-adj-end').jqxDateTimeInput('getDate').getTime();
		diff = (end - start) / 1000;
		arr = [];
		arr[0] = Math.floor(diff / 3600);
		arr[1] = Math.floor((diff - (arr[0] * 3600)) / 60);
		arr[2] = diff - (arr[1] * 60) - (arr[0] * 3600);
		totalhour = WRPAdminApp.toDecimalFormat(arr[0], "00") + ":" + WRPAdminApp.toDecimalFormat(arr[1], "00");
		try {
			document.getElementById("clock-io-adj-adj-total-hour").value = WRPCommon.TimeModule.getWorkAmountF(totalhour).toFixed(2);
		} catch (e) {
			console.warn(e);
		} finally {
			arr = undefined;
		}
		/*var workStart, lunchStart, lunchEnd, workEnd, storeWorkTime, diff, arr;

workEnd = new Date();
workEnd = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), 0, 0, 0);

try {
    arr = WRPAdminApp.pagescript._storeWorkTime.split(":");
    if (arr.length != 3 && arr.length != 2) {
        console.warn("Store Work Time format error");
        return;
    }

    if (arr.length == 3) storeWorkTime = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], arr[2]);
    else if (arr.length == 2) storeWorkTime = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], 0);
    storeWorkTime = storeWorkTime - workEnd; // To millisecond
} catch (e) {
    console.warn(e);
} finally {
    arr = undefined;
}

try {
    arr = document.getElementById("clock-io-adj-adj-work-start").value.split(":");
    if (arr.length != 3 && arr.length != 2) {
        console.warn("Adj. Work Start time format error");
        return;
    }

    if (arr.length == 3) workStart = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], arr[2]);
    else if (arr.length == 2) workStart = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], 0);
} catch (e) {
    console.warn(e);
} finally {
    arr = undefined;
}

try {
    arr = document.getElementById("clock-io-adj-adj-lunch-start").value.split(":");
    if (arr.length != 3 && arr.length != 2) {
        console.warn("Adj. Lunch Start time format error");
        return;
    }

    if (arr.length == 3) lunchStart = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], arr[2]);
    else if (arr.length == 2) lunchStart = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], 0);
} catch (e) {
    console.warn(e);
} finally {
    arr = undefined;
}

try {
    arr = document.getElementById("clock-io-adj-adj-lunch-end").value.split(":");
    if (arr.length != 3 && arr.length != 2) {
        console.warn("Adj. Lunch End time format error");
        return;
    }

    if (arr.length == 3) lunchEnd = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], arr[2]);
    else if (arr.length == 2) lunchEnd = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], 0);
} catch (e) {
    console.warn(e);
} finally {
    arr = undefined;
}

try {
    arr = document.getElementById("clock-io-adj-adj-work-end").value.split(":");
    if (arr.length != 3 && arr.length != 2) {
        console.warn("Adj. Work End time format error");
        return;
    }

    if (arr.length == 3) workEnd = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], arr[2]);
    else if (arr.length == 2) workEnd = new Date(workEnd.getFullYear(), workEnd.getMonth(), workEnd.getDate(), arr[0], arr[1], 0);
} catch (e) {
    console.warn(e);
} finally {
    arr = undefined;
}

diff = ((workEnd - workStart) - (lunchEnd - lunchStart)) / 1000;

arr = [];
arr[0] = Math.floor(diff / 3600);
arr[1] = Math.floor((diff - (arr[0] * 3600)) / 60);
arr[2] = diff - (arr[1] * 60) - (arr[0] * 3600);

try {
    document.getElementById("clock-io-adj-adj-work-hour").value = WRPAdminApp.toDecimalFormat(arr[0], "00") + ":" + WRPAdminApp.toDecimalFormat(arr[1], "00");
} catch (e) {
    console.warn(e);
} finally {
    arr = undefined;
}

diff = (((workEnd - workStart) - (lunchEnd - lunchStart)) - storeWorkTime) / 1000;

if (diff > 0) {
    arr = [];
    arr[0] = Math.floor(diff / 3600);
    arr[1] = Math.floor((diff - (arr[0] * 3600)) / 60);
    arr[2] = diff - (arr[1] * 60) - (arr[0] * 3600);

    try {
        document.getElementById("clock-io-adj-adj-overtime").value = WRPAdminApp.toDecimalFormat(arr[0], "00") + ":" + WRPAdminApp.toDecimalFormat(arr[1], "00");
    } catch (e) {
        console.warn(e);
    } finally {
        arr = undefined;
    }
} else {
    try {
        document.getElementById("clock-io-adj-adj-overtime").value = "00:00";
    } catch (e) {
        console.warn(e);
    }
}*/
	},
	setClockIOAdjInfo: function() {
		var data, arr, i;
		var storeId;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		if (WRPAdminApp.pagescript._selectedClockIOAdjSid < 1) {
			WRPCommon.MsgBoxModule.alert({
				message: "Select Clock IO"
			});
			return;
		}

		data = {};

		data.clockIOAdjSid = WRPAdminApp.pagescript._selectedClockIOAdjSid;

		try {
			hours = $('#clock-io-adj-adj-start').jqxDateTimeInput('getDate').getHours();
			minutes = $('#clock-io-adj-adj-start').jqxDateTimeInput('getDate').getMinutes();

			data.adjStart = hours+":"+minutes;
		} catch (e) {
			console.warn(e);
			data = undefined;
			return;
		}

		try {
			hours = $('#clock-io-adj-adj-end').jqxDateTimeInput('getDate').getHours();
			minutes = $('#clock-io-adj-adj-end').jqxDateTimeInput('getDate').getMinutes();

			data.adjEnd = hours+":"+minutes;
		} catch (e) {
			console.warn(e);
			data = undefined;
			return;
		}
		data.storeId = storeId;

		data.adjustState = 1;

		$.ajax({
			url: "ajax/clockIO/setClockIOAdjInfo.jsp",
			data: data,
			method: "POST",
			dataType: "json",
			success: function(result) {
				if (result === 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							WRPAdminApp.pagescript.getClockIOAdjListInStore();
							WRPAdminApp.pagescript.getClockIOAdjInfo();
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
	rejectClockIOAdj: function() {
		var storeId;

		if (WRPAdminApp.pagescript._selectedClockIOAdjSid < 1) {
			WRPCommon.MsgBoxModule.alert({
				message: "Select Clock IO"
			});
			return;
		}

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		$.ajax({
			url: "ajax/clockIO/setClockIOAdjInfo.jsp",
			data: {
				storeId: storeId,
				clockIOAdjSid: WRPAdminApp.pagescript._selectedClockIOAdjSid,
				adjustState: 2
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				if (result === 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							WRPAdminApp.pagescript.getClockIOAdjListInStore();
							WRPAdminApp.pagescript.getClockIOAdjInfo();
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
	getTimeOffList: function() {
		var storeId, start_date, end_date;

		if (arguments.length > 0 && arguments[0] === true) {
			try {
				WRPAdminApp.pagescript._currPageNo = 1;
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
			document.getElementById("clock-io-timeoff-user-id").value = '';
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			document.getElementById("clock-io-timeoff-mobile-no").value = '';
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			document.getElementById("clock-io-timeoff-date-count").innerHTML = '';
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			document.getElementById("clock-io-timeoff-start-date").value = '';
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			document.getElementById("clock-io-timeoff-end-date").value = '';
		} catch (e) {
			console.warn(e);
			return;
		}

		WRPAdminApp.pagescript._selectedTimeOffSid = 0;

		start_date = $('#clockio-time-off-start-date').val();
		end_date = $('#clockio-time-off-end-date').val();
		$.ajax({
			url: "ajax/timeoff/getTimeOffList.jsp",
			data: {
				storeId: storeId,
				searchPeriodStart: start_date,
				searchPeriodEnd: end_date,
				curr_page_no : WRPAdminApp.pagescript._currPageNo,
				count_per_page: WRPAdminApp.pagescript._countPerPage
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, elem, i, len, obj;

				data = result.data;

				if (!data) return;

				if (data.length > 0 && data[0].max_page_no !== undefined) {
					WRPAdminApp.pagescript._maxPageNo = data[0].max_page_no;
				}

				elem = $("#jqx-clock-io-timeoff-list");
				if (elem) {
					elem.jqxGrid("clear");
					elem.jqxGrid("addRow", null, data, "last");		
				}
			}
		});
	},
	getTimeOffInfo: function(event) {
		var storeId, rowdata;

		rowdata = event.args.row;

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		$.ajax({
			url: "ajax/timeoff/getTimeOffInfo.jsp",
			data: {
				storeId: storeId,
				timeOffSid: rowdata.sid
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, list, i, len;
				data = result.data;

				if (!data) return;

				WRPAdminApp.pagescript._selectedTimeOffSid = data.sid;

				try {
					document.getElementById("clock-io-timeoff-user-id").value = (data.userId !== undefined && data.userId !== null)? data.userId : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-timeoff-mobile-no").value = (data.tel !== undefined && data.tel !== null)? data.tel : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-timeoff-date-count").innerHTML = (data.dateCount !== undefined && data.dateCount !== null)? ( (data.dateCount > 1)? data.dateCount + ' Days' : data.dateCount + " Day" ) : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-timeoff-start-date").value = (data.startDate !== undefined && data.startDate !== null)? data.startDate : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-timeoff-end-date").value = (data.endDate !== undefined && data.endDate !== null)? data.endDate : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-timeoff-adj-start-date").value = (data.startDate !== undefined && data.startDate !== null)? data.startDate : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-timeoff-adj-end-date").value = (data.endDate !== undefined && data.endDate !== null)? data.endDate : '';
				} catch (e) {
					console.warn(e);
					return;
				}

				switch (data.reqState) {
				case 0:
					list = document.querySelectorAll(".off-for-accept-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "visible";
					}
					list = document.querySelectorAll(".off-for-reject-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "visible";
					}
					break;
				case 1:
					list = document.querySelectorAll(".off-for-accept-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "hidden";
					}
					list = document.querySelectorAll(".off-for-reject-only");
					for (i = 0, len = list.length; i < len; i++) {
						list[i].style.visibility = "visible";
					}
					break;
				default:
					list = document.querySelectorAll(".off-for-accept-only");
				for (i = 0, len = list.length; i < len; i++) {
					list[i].style.visibility = "hidden";
				}
				list = document.querySelectorAll(".off-for-reject-only");
				for (i = 0, len = list.length; i < len; i++) {
					list[i].style.visibility = "hidden";
				}
				break;
				}

				try {
					document.getElementById("clock-io-timeoff-paid-flag").innerHTML = (data.paidFlagStr !== undefined)? data.paidFlagStr : "&nbsp;";
				} catch (e) {
					console.warn(e);
					return;
				}

				try {
					document.getElementById("clock-io-timeoff-adj-paid-flag").value = (data.paidFlag !== undefined)? data.paidFlag : 1;
				} catch (e) {
					console.warn(e);
					return;
				}
			}
		});
	},
	setTimeoff: function() {
		var storeId, data;
		if (WRPAdminApp.pagescript._selectedTimeOffSid < 1) {
			console.warn("Select Time Off Request");
			return;
		}

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		data = {};

		data.timeOffSid = WRPAdminApp.pagescript._selectedTimeOffSid;
		data.storeId = storeId;

		try {
			data.startDate = document.getElementById("clock-io-timeoff-adj-start-date").value;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			data.endDate = document.getElementById("clock-io-timeoff-adj-end-date").value;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			data.paidFlag = document.getElementById("clock-io-timeoff-adj-paid-flag").value;
		} catch (e) {
			console.warn(e);
			return;
		}

		data.state = 1;

		$.ajax({
			url: "ajax/timeoff/setTimeOffInfo.jsp",
			data: data,
			method: "POST",
			dataType: "json",
			success: function(result) {
				if (result === 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							WRPAdminApp.pagescript.getTimeOffList();
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

	rejectTimeOff: function() {
		var storeId, data;
		if (WRPAdminApp.pagescript._selectedTimeOffSid < 1) {
			console.warn("Select Time Off Request");
			return;
		}

		try {
			storeId = document.getElementById("select-store").value;
			if (storeId.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		data = {};

		data.timeOffSid = WRPAdminApp.pagescript._selectedTimeOffSid;
		data.storeId = storeId;

		data.state = 2;

		$.ajax({
			url: "ajax/timeoff/setTimeOffInfo.jsp",
			data: data,
			method: "POST",
			dataType: "json",
			success: function(result) {
				if (result === 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							WRPAdminApp.pagescript.getTimeOffList();
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
    getEmpClockIOHistory: function(){
    	var param;
    	param={};
    	param.keyword = document.getElementById("simple-time-adj-emp-search").value;

		try {
			param.store_id = document.getElementById("select-store").value;
			if (param.store_id.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			param.searchDate = $('#simple-time-adj-date').val();
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			console.warn(e);
		}

		$.ajax({
			url: "ajax/clockIO/getClockIOByEmp.jsp",
			data: param,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, elem;
				data = result.data;
				if(!data) return;
				
				elem = $("#jqx-clock-io-emp-list");
				if (elem) {
					elem.jqxGrid("clear");
					for(i = 0; i < data.length; i++){
    					if(data[i].amount) data[i].amount = WRPCommon.TimeModule.getWorkAmountF(data[i].amount).toFixed(2);
    					if(data[i].over_time) data[i].over_time = WRPCommon.TimeModule.getWorkAmountF(data[i].over_time).toFixed(2);
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
    openClockIOAdjust: function(row){
    	var store_id, emp_sid, date;
    	
    	date = $('#jqx-clock-io-emp-list').jqxGrid('getcellvalue', row, "date");
    	emp_sid = $('#jqx-clock-io-emp-list').jqxGrid('getcellvalue', row, "emp_sid");
    	
    	WRPAdminApp.pagescript._selectedEmpSid = emp_sid;
    	
		try {
			store_id = document.getElementById("select-store").value;
			if (store_id.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}
		
		document.getElementById("simple-adjust-clock-io-memo").value = "";
		document.getElementById("simple-adjust-clock-io-employee").innerHTML = $('#jqx-clock-io-emp-list').jqxGrid('getcellvalue', row, "user_id");
		document.getElementById("simple-adjust-clock-io-date").innerHTML = date;

		$.ajax({
			url: "ajax/clockIO/getClockIOOfDay.jsp",
			data: {
				store_id: store_id,
				date: date,
				emp_sid: emp_sid
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, elem,i,work,lunch,breakHour,total;
				data = result.data;
				if(!data) return;

				work=0;
				lunch=0;
				breakHour=0;
				total=0;
				$('#clock-io-simple-adjust-window').jqxWindow('open');

				elem = $("#jqx-adjust-clock-io-original");
				if (elem) {
					elem.jqxGrid("clear");
					for(i = 0; i < data.length; i++){
    					if(data[i].amount) data[i].amount = WRPCommon.TimeModule.getWorkAmountF(data[i].amount).toFixed(2);
    					total = (data[i].amount)?total+parseFloat(data[i].amount):total+0;
    					switch(parseInt(data[i].status)){
    					case 0:
    						work = (data[i].amount)?work + parseFloat(data[i].amount): work+0;
    						break;
    					case 1:
    						breakHour = (data[i].amount)?breakHour + parseFloat(data[i].amount):breakHour+0;
    						break;
    					case 2:
    						lunch = (data[i].amount)?lunch + parseFloat(data[i].amount):lunch+0;
    						break;
    					}
    				}
					
					elem.jqxGrid("addRow", null, data, "last");		
				}
				
				document.getElementById("original-work-total").innerHTML = work.toFixed(2);
				document.getElementById("original-lunch-total").innerHTML = lunch.toFixed(2);
				document.getElementById("original-break-total").innerHTML = breakHour.toFixed(2);
				document.getElementById("original-total-total").innerHTML = total.toFixed(2);
				document.getElementById("adjust-work-total").innerHTML = work.toFixed(2);
				document.getElementById("adjust-lunch-total").innerHTML = lunch.toFixed(2);
				document.getElementById("adjust-break-total").innerHTML = breakHour.toFixed(2);
				document.getElementById("adjust-total-total").innerHTML = total.toFixed(2);
				
				WRPAdminApp.pagescript.getOriginalEditList(date, emp_sid);
			}
		});
    },
    getOriginalEditList: function(date, emp_sid){
    	var store_id;
    	
    	try {
			store_id = document.getElementById("select-store").value;
			if (store_id.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}
		
    	$.ajax({
			url: "ajax/clockIO/getClockIOOfDay.jsp",
			data: {
				store_id: store_id,
				date: date,
				emp_sid: emp_sid
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, elem, i;
				data = result.data;
				if(!data) return;

				for(i = 0; i < data.length; i++){
					if(data[i].amount) data[i].amount = WRPCommon.TimeModule.getWorkAmountF(data[i].amount).toFixed(2);
				}
				
				WRPAdminApp.pagescript._editClockIOList = data;
				
				$('#clock-io-simple-adjust-window').jqxWindow('open');

				elem = $("#jqx-adjust-clock-io-edit");
				if (elem) {
					elem.jqxGrid("clear");
					elem.jqxGrid("addRow", null, data, "last");		
				}
			}
		});
    },
	deleteAdjust: function(event) {
		var target, row, id;
		try {
			row = event.args.row;
			target = event.args.originalEvent.target;
			if (target.className === "remove-list-btn") {
				id = $("#jqx-adjust-clock-io-edit").jqxGrid('getrowid', row.boundindex);
				$("#jqx-adjust-clock-io-edit").jqxGrid('deleterow', id);
				WRPAdminApp.pagescript._editClockIOList.splice(row.boundindex, 1);
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		
		WRPAdminApp.pagescript.calcAdjustTotalHour();
	},
    openAddClockIO: function(){
    	var clockIoList, lastRow, date;
    	clockIoList = WRPAdminApp.pagescript._editClockIOList;
    	
    	document.getElementById("simple-adjust-edit-type").value = 0;
    	$("#simple-adjust-edit-start").val('00:00');
    	$("#simple-adjust-edit-start").jqxDateTimeInput({disabled: false});
    	$("#simple-adjust-edit-end").val('00:00');
    	
    	lastRow = clockIoList[clockIoList.length - 1];
    	
    	if(!lastRow || lastRow.length < 1){
    		$('#clock-io-simple-adjust-edit-window').jqxWindow('open');
    		return;
    	}
    	
    	if(lastRow.end){
        	$("#simple-adjust-edit-start").val(lastRow.end.substring(0,5));
        	$("#simple-adjust-edit-start").jqxDateTimeInput({disabled: true});
    	}
    	
    	$('#clock-io-simple-adjust-edit-window').jqxWindow('open');
    },
    addAdjustClockIO: function(){
    	var start, end, gap, clockIoList, status_str, elem;
    	start = $("#simple-adjust-edit-start").jqxDateTimeInput('getDate');
    	end = $("#simple-adjust-edit-end").jqxDateTimeInput('getDate');
    	
    	start = ((start.getHours() * 60)*60) + (start.getMinutes()*60) + start.getSeconds();
    	end = ((end.getHours() * 60)*60) + (end.getMinutes()*60) + end.getSeconds();
    	
    	gap = end - start;
    	if(gap < 0){
    		WRPCommon.MsgBoxModule.alert({
    			message : "Start time is less than end time"
    		});
    		return;
    	}

    	clockIoList = WRPAdminApp.pagescript._editClockIOList;
    	
    	switch(parseInt(document.getElementById("simple-adjust-edit-type").value)){
    	case 0:
    		status_str = "Work";
    		break;
    	case 1:
    		status_str = "Break";
    		break;
    	case 2:
    		status_str ="Lunch";
    		break;
    	}
    	
    	clockIoList.push({
    		status: document.getElementById("simple-adjust-edit-type").value,
			status_str: status_str,
			start: $("#simple-adjust-edit-start").val() + ":00",
			end: $("#simple-adjust-edit-end").val() + ":00",
			amount: ((gap / 60) / 60).toFixed(2)
		});

    	elem = $("#jqx-adjust-clock-io-edit");
    	if (elem) {
    		elem.jqxGrid("clear");
   			elem.jqxGrid("addRow", null, clockIoList, "last");
    	}
    	
    	WRPAdminApp.pagescript.calcAdjustTotalHour();
    	$('#clock-io-simple-adjust-edit-window').jqxWindow('close');
    },
    openConfirmClockIO: function(){
    	var origin_list, adjust_list, elem, elem2, i;
    	
    	origin_list = $('#jqx-adjust-clock-io-original').jqxGrid('getrows');
    	adjust_list = WRPAdminApp.pagescript._editClockIOList;
    	
    	for(i=0; i < adjust_list.length-1; i++){
    		if(adjust_list[i].end != adjust_list[i+1].start){
    			WRPCommon.MsgBoxModule.alert({
    				message: "Incorrect Start Time"
    			});
    			return;
    		}
    	}
    	
    	$('#clock-io-simple-adjust-confirm-window').jqxWindow('open');

    	elem2 = $("#jqx-adjust-clock-io-confirm-edit");
    	if (elem2) {
    		elem2.jqxGrid("clear");
    		elem2.jqxGrid("addRow", null, WRPAdminApp.pagescript._editClockIOList, "last");
    	}
    	
    	elem = $("#jqx-adjust-clock-io-confirm-original");
    	if (elem) {
    		elem.jqxGrid("clear");
   			elem.jqxGrid("addRow", null, origin_list, "last");
    	}
    	
    	try{
    		document.getElementById("simple-adjust-clock-io-confirm-emp").innerHTML = document.getElementById("simple-adjust-clock-io-employee").innerHTML;
    		document.getElementById("simple-adjust-clock-io-confirm-date").innerHTML = document.getElementById("simple-adjust-clock-io-date").innerHTML;
    		document.getElementById("simple-adjust-clock-io-confirm-memo").value = document.getElementById("simple-adjust-clock-io-memo").value;

    		document.getElementById("confirm-original-work-total").innerHTML = document.getElementById("original-work-total").innerHTML;
    		document.getElementById("confirm-original-lunch-total").innerHTML = document.getElementById("original-lunch-total").innerHTML;
    		document.getElementById("confirm-original-break-total").innerHTML = document.getElementById("original-break-total").innerHTML;
    		document.getElementById("confirm-original-total-total").innerHTML = document.getElementById("original-total-total").innerHTML;

    	}catch(e){
    		
    	}
    	
    },
    calcAdjustTotalHour: function(){
    	var adjust_list, i, work, lunch, breakHour, total;
    	
    	adjust_list = WRPAdminApp.pagescript._editClockIOList;
    	
    	work = 0;
    	lunch = 0;
    	breakHour = 0;
    	total = 0;
    	
    	for(i=0; i < adjust_list.length; i++){
    		switch(parseInt(adjust_list[i].status)){
    		case 0:
				work = (adjust_list[i].amount)?work + parseFloat(adjust_list[i].amount): work+0;
				break;
			case 1:
				breakHour = (adjust_list[i].amount)?breakHour + parseFloat(adjust_list[i].amount):breakHour+0;
				break;
			case 2:
				lunch = (adjust_list[i].amount)?lunch + parseFloat(adjust_list[i].amount):lunch+0;
				break;
    		}
    		total = (adjust_list[i].amount)?total + parseFloat(adjust_list[i].amount):total+0;
    	}
    	
    	document.getElementById("adjust-work-total").innerHTML = work.toFixed(2);
		document.getElementById("adjust-lunch-total").innerHTML = lunch.toFixed(2);
		document.getElementById("adjust-break-total").innerHTML = breakHour.toFixed(2);
		document.getElementById("adjust-total-total").innerHTML = total.toFixed(2);
    	document.getElementById("confirm-adjust-work-total").innerHTML = work.toFixed(2);
		document.getElementById("confirm-adjust-lunch-total").innerHTML = lunch.toFixed(2);
		document.getElementById("confirm-adjust-break-total").innerHTML = breakHour.toFixed(2);
		document.getElementById("confirm-adjust-total-total").innerHTML = total.toFixed(2);
    	
    },
    confirmSimpleAdjust: function(){
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		yesBtnClick : WRPAdminApp.pagescript.setSimpleAdjust
    	});
    },
    setSimpleAdjust: function(){
    	var origin, param, origin_list, date, dateArray;
    	origin = $('#jqx-adjust-clock-io-confirm-original').jqxGrid('getrows');
    	
    	param = {};
    	
		try {
			param.store_id = document.getElementById("select-store").value;
			if (param.store_id.length == 0) return;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			param.memo = document.getElementById("simple-adjust-clock-io-confirm-memo").value;
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			date = document.getElementById("simple-adjust-clock-io-confirm-date").innerHTML;
			dateArray = date.split("/");
			param.date = dateArray[2]+"-"+dateArray[0]+"-"+dateArray[1];
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			param.emp_sid = WRPAdminApp.pagescript._selectedEmpSid;
		} catch (e) {
			console.warn(e);
			return;
		}
		
    	origin_list = [];
    	adjust_list = [];
    	
    	for (i = 0, len = origin.length; i < len; i++) {
			row = origin[i];

			
			origin_list.push({
				sid: row.sid
			});
		}
    	
    	param.origin_list_str = JSON.stringify(origin_list);
    	
    	for (i = 0, len = WRPAdminApp.pagescript._editClockIOList.length; i < len; i++) {
			row = WRPAdminApp.pagescript._editClockIOList[i];
			
			adjust_list.push({
				status: row.status,
				start: row.start,
				end: row.end
			});
		}
    	
    	param.adjust_list_str = JSON.stringify(adjust_list);
    	
        $.ajax({
            url: "ajax/clockIO/setClockIOSimpleAdjust.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if(result==0){
                	WRPCommon.MsgBoxModule.alert({
                		message: "Completed",
                		okBtnClick: function(){
                			$('#clock-io-simple-adjust-window').jqxWindow('close');
                			$('#clock-io-simple-adjust-confirm-window').jqxWindow('close');
                			WRPAdminApp.pagescript.getEmpClockIOHistory();
                		}
                	});
                }
            }
        });
    }
};