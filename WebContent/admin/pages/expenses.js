
var _pagescript = {
    _selectedStoreSid: 0,
    _selectedStoreId: null,
    _selectedNotificationRuleSid: 0,
    _selectedRegisterSid: 0,
    /*170210 jh : monthly goal selected store*/
    _selectedMonthlyStoreId: null,
    _selectedMonthlyGoal: null,
    _selectedExpenseSid: 0,
    _license: 0,
    _store: 0,
    /*monthly goal selected store end*/
    init: function() {
        var date = WRPCommon.TimeModule.getTime(), elem, components;
        
    	try {
			WRPComponents('div[pagename="expenses"] > .page-submenu-container > .submenu[panelname="expenses"]').addShadowedImage('img/icon/calc_02.png');
		} catch (e) {
			
		}
		
		try {
			elem = $(".jqx-date-input");

			if (elem && elem.length > 0) {                            
				elem.jqxDateTimeInput({
					width: "98%",
	            	formatString: "HH:mm:ss", 
	            	showTimeButton: true, 
	            	showCalendarButton: false
				});
			}
		} catch (e) {

		}
		
       	$('#expense-history-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#expense-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#expense-history-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#expense-history-radio-2').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#expense-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#expense-history-search-end-date").jqxDateTimeInput('setDate', end);
  		 });
  		 
       	$('#expense-history-radio-3').on('checked', function (event) {
       		var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth() - 1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#expense-history-search-start-date").jqxDateTimeInput('setDate', start);
        	$("#expense-history-search-end-date").jqxDateTimeInput('setDate', end);
       	});
       	
    	components = $('#expense-edit-window');
    	if (components) {
    		components.jqxWindow("width", 450);
    		components.jqxWindow("height", 250);
    		components.css("top", "calc(50% - 125px)");
    		components.css("left", "calc(50% - 225px)");
    	}
    	
        components = $('#jqx-expense-history-list');
    	if(components){
    		components.jqxGrid({
            	   width: '100%',
            	   height: '100%',
            	   source: new $.jqx.dataAdapter({
            		   datatype: "json",
            		   datafields: [
            			   	{ name: 'sid', type: 'number'},
       						{ name: 'date', type: 'date'},
       						{ name: 'user_id', type: 'string'},
       						{ name: 'expense', type: 'number'},
       						{ name: 'note', type: 'string'},
       						{ name: 'emp_name', type: 'string'},
       						{ name: 'pos_no', type: 'string'},
					]
            	   }),
            	   showfilterrow: false,
            	   filterable: true,
            	   sortable: true,
            	   columnsresize:true,
            	   theme: 'arctic',
            	   columns: [
            		   { text: 'Date', datafield: 'date', filtertype: 'date', width: '20%', cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center'},
            		   { text: 'Item Name', datafield: 'exp_name',width: '15%', align: 'center' },
            		   { text: 'Expense', datafield: 'expense', width: '20%',cellsformat: 'c2', cellsalign: 'right', align: 'center' },
            		   { text: 'Note', datafield: 'note', width: '20%', align: 'center' },
            		   { text: 'Updater', datafield: 'user_id', width: '15%', align: 'center' },
            		   { text: 'Pos No', datafield: 'pos_no', width: '10%', align: 'center'}
                     ]
    			});
    		$("#excel-expense-history").click(function () {
                $("#jqx-expense-history-list").jqxGrid('exportdata', 'xls', 'jqx-expense-history-list');
            });
    	}
    	
    	components = $('#jqx-expense-dict-list');
    	if(components){
    		components.jqxGrid({
            	   width: '100%',
            	   height: '100%',
            	   source: new $.jqx.dataAdapter({
            		   datatype: "json",
            		   datafields: [
            			   	{ name: 'sid', type: 'number'},
       						{ name: 'name', type: 'string'},
       						{ name: 'description', type: 'string'},
       						{ name: 'quickbook_code', type: 'string'},
       						{ name: 'update_date', type: 'date'},
       						{ name: 'user_id', type: 'string'},
					]
            	   }),
            	   showfilterrow: false,
            	   filterable: true,
            	   sortable: true,
            	   columnsresize:true,
            	   theme: 'arctic',
            	   columns: [
            		   { text: 'Item Name', datafield: 'name',width: '20%', align: 'center' },
            		   { text: 'Description', datafield: 'description', width: '20%', align: 'center' },
            		   { text: 'QuickBook Code', datafield: 'quickbook_code', width: '20%', align: 'center' },
            		   { text: 'Update Date', datafield: 'update_date', filtertype: 'date', width: '20%', cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center'},
            		   { text: 'Updater', datafield: 'user_id', width: '20%', align: 'center' },
                     ]
    			});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.editExpenseDict);
    		components.on('rowselect', function (event) {
	        	$("#expense-profile-name").val(event.args.row.name);
	        	$("#expense-profile-description").val(event.args.row.description);
	        	$("#expense-profile-quickbookcode").val(event.args.row.quickbook_code);
	        	$("#expense-profile-date").val(event.args.row.update_date);
	        	$("#expense-profile-updater").val(event.args.row.user_id);
            });
    	}
    	
    	$('#expense-history-radio-1').jqxRadioButton('check');
    	
        WRPAdminApp.pagescript.getExpenseHistoryList();
        WRPAdminApp.pagescript.getExpenseDictList();
    },
    getExpenseHistoryList: function(){
    	var storeId, search_start_date, search_end_date, keyword;
    	
    	try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        search_start_date = new Date($("#expense-history-search-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
	    search_start_date = search_start_date.getFullYear()+"-"+(search_start_date.getMonth()+1)+"-"+search_start_date.getDate();
	    search_end_date = new Date($("#expense-history-search-end-date").jqxDateTimeInput('getDate'));
	    search_end_date = search_end_date.getFullYear()+"-"+(search_end_date.getMonth()+1)+"-"+search_end_date.getDate();//"11/30/2016";
        
	    keyword = document.getElementById("expense-history-keyword").value;
        
        $.ajax({
            url: "ajax/expense/getExpenseHistoryList.jsp",
            data: {
            	store_id : storeId,
            	search_start_date: search_start_date,
            	search_end_date: search_end_date,
            	keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data,i, len, obj, innerHTML;
                data = result.data;
                $("#jqx-expense-history-list").jqxGrid("clear");
                if (!data) return;
                //
    			$("#jqx-expense-history-list").jqxGrid("addrow", null, data);
    			
            }
        });
    },
    getExpenseDictList: function(){
    	var storeId;
    	
    	try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/expense/getExpenseDictList.jsp",
            data: {
            	store_id : storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data,i, len, obj, innerHTML;
                data = result.data;

                if (!data) return;
                
                elem = $("#jqx-expense-dict-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    					elem.jqxGrid("addRow", null, data, "last");
    			}
            }
        });
    },
    editExpenseDict: function(event){
    	var rowdata = event.args.row.bounddata;
    	WRPAdminApp.pagescript._selectedExpenseSid = event.args.row.bounddata.sid;
    	document.getElementById("expense-name-info-pop").value = rowdata.name;
    	document.getElementById("expense-description-info-pop").value = (rowdata.description !== undefined && rowdata.description)? rowdata.description : "";
    	document.getElementById("expense-quickbookCode-info-pop").value = (rowdata.quickbook_code !== undefined && rowdata.quickbook_code)? rowdata.quickbook_code : "";
    	
    	$('#expense-edit-window').jqxWindow('open');
    },
    newExpenseDict: function(){
    	WRPAdminApp.pagescript._selectedExpenseSid = 0;
    	document.getElementById("expense-name-info-pop").value = "";
    	document.getElementById("expense-description-info-pop").value = "";
    	document.getElementById("expense-quickbookCode-info-pop").value = "";
    	
    	$('#expense-edit-window').jqxWindow('open');
    },
    setExpenseDict: function(){
    	var storeId, param;
    	
    	param={};
    	try {
            param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        param.expenseSid = WRPAdminApp.pagescript._selectedExpenseSid;
        param.name = document.getElementById("expense-name-info-pop").value;
        param.description = document.getElementById("expense-description-info-pop").value;
        param.quickbook_code = document.getElementById("expense-quickbookCode-info-pop").value;
        
        $.ajax({
            url: "ajax/expense/setExpenseDict.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
            	if (result === 0) {
            		WRPCommon.MsgBoxModule.alert({
        				message: "Completed",
        				okBtnClick: function(){
                            $('#expense-edit-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getExpenseDictList();
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