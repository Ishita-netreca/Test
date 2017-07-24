
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
        var date = new Date(), elem;
        
    	try {
			WRPComponents('div[pagename="cashRegister"] > .page-submenu-container > .submenu[panelname="cashRegister"]').addShadowedImage('img/icon/cash_register.png');
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
		
		$("#excel-cash-register").click(function(){
			$("#jqx-cash-register-list").jqxGrid('exportdata', 'xls', 'jqx-notification-history');
		});
		
    	var components = $('#cashregister-edit-window');
    	if (components) {
    		components.jqxWindow("width", 550);
    		components.jqxWindow("height", 400);
    	}
		
    	components = $("#jqx-cash-register-list");
    	if(components){
    		components.jqxGrid({
         	   width: '100%',
         	   height: '100%',
         	   source: new $.jqx.dataAdapter({
         		   datatype: "json",
         		   datafields: [
         			   	{ name: "sid", type: "number" },
						{ name: "register_no", type: "number" },
						{ name: "description", type: "string" },
						{ name: "updateDate", type: "date" },
						{ name: "user_id", type: "string" },
					]
         	   }),
         	   showfilterrow: false,
         	   filterable: true,
         	   sortable: true,
         	   columnsresize:true,
         	   theme: 'arctic',
         	   columns: [
         		  { text: 'sid', datafield: 'sid', hidden:true},
         		  { text: 'Register No', datafield: 'register_no', width: '15%' },
         		  { text: 'Description', datafield: 'description', width: '35%' },
         		  { text: 'Update Date', datafield: 'updateDate', width: '25%' ,filtertype: "range", cellsformat: 'MM/dd/yyyy HH:mm:ss'},
         		  { text: 'Updater', datafield: 'user_id', width: '25%'},
                 ]
 			});
    		components.on('rowselect', WRPAdminApp.pagescript.getCashRegisterInfo);
    		components.on('rowdoubleclick', WRPAdminApp.pagescript.getCashRegisterInfoPop);
    	}
    	
        WRPAdminApp.pagescript.getCashRegisterList();
    },
    getCashRegisterList : function(){
    	var storeId;
    	
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/cash_register/getCashRegisterList.jsp",
        	data: {
        		storeId: storeId
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result){
        		var data, elem, i, len, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-cash-register-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
        	}
        })
    },
    getCashRegisterInfo: function(event){
    	var storeId, rowdata;
    	
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
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
    	WRPAdminApp.pagescript._selectedRegisterSid = rowdata.sid;
        
        $.ajax({
            url: "ajax/cash_register/getCashRegisterList.jsp",
            data: {
                sid: WRPAdminApp.pagescript._selectedRegisterSid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;
                data = result.data;
                if (!data) return;
                for(i = 0, len = data.length; i < len; i++) {
                	obj=data[i];
                    try {
                    	document.getElementById("cash-register-no").value = (obj.register_no !== undefined && obj.register_no)? obj.register_no : '';
                    } catch (e) {
                    	console.warn(e);
                        return;
                    }
                    try {
                        document.getElementById("cash-register-description").value = (obj.description !== undefined && obj.description)? obj.description : '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    try {
                    	document.getElementById("cash-register-credit-url").value = (obj.credit_device_url !== undefined && obj.credit_device_url)? obj.credit_device_url : '';
                    } catch (e) {
                    	console.warn(e);
                        return;
                    }
                    try {
                        document.getElementById("cash-register-credit-port").value = (obj.credit_device_port !== undefined && obj.credit_device_port)? obj.credit_device_port : '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    try {
                        document.getElementById("cash-register-credit-token").value = (obj.credit_device_identity_token !== undefined && obj.credit_device_identity_token)? obj.credit_device_identity_token : '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }
            }
        });
    },
    getCashRegisterInfoPop: function(event){
    	var storeId, rowdata;
    	
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
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
    	WRPAdminApp.pagescript._selectedRegisterSid = rowdata.sid;
        
        $.ajax({
            url: "ajax/cash_register/getCashRegisterList.jsp",
            data: {
                sid: WRPAdminApp.pagescript._selectedRegisterSid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;
                data = result.data;
                if (!data) return;
                for(i = 0, len = data.length; i < len; i++) {
                	obj=data[i];
                    try {
                    	document.getElementById("cash-register-no-pop").value = (obj.register_no !== undefined && obj.register_no)? obj.register_no : '';
                    } catch (e) {
                    	console.warn(e);
                        return;
                    }
                    try {
                        document.getElementById("cash-register-description-pop").value = (obj.description !== undefined && obj.description)? obj.description : '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    try {
                    	document.getElementById("cash-register-credit-url-pop").value = (obj.credit_device_url !== undefined && obj.credit_device_url)? obj.credit_device_url : '';
                    } catch (e) {
                    	console.warn(e);
                        return;
                    }
                    try {
                        document.getElementById("cash-register-credit-port-pop").value = (obj.credit_device_port !== undefined && obj.credit_device_port)? obj.credit_device_port : '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                    try {
                        document.getElementById("cash-register-credit-token-pop").value = (obj.credit_device_identity_token !== undefined && obj.credit_device_identity_token)? obj.credit_device_identity_token : '';
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }
                $('#cashregister-edit-window').jqxWindow('open');
            }
        });
    },
    setCashRegister : function(){
    	var param = {};
    	var storeId, sid, registerNo, description;
        param.sid = WRPAdminApp.pagescript._selectedRegisterSid;
        
        try {
            param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            param.registerNo = document.getElementById("cash-register-no-pop").value;
            if (param.registerNo.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Cash Register Number"
            	});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	param.description = document.getElementById("cash-register-description-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	param.credit_device_url = document.getElementById("cash-register-credit-url-pop").value;
        } catch (e) {
        	console.warn(e);
            return;
        }
        try {
        	param.credit_device_port = document.getElementById("cash-register-credit-port-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
        	param.credit_device_identity_token = document.getElementById("cash-register-credit-token-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        $.ajax({
        	url: "ajax/cash_register/setCashRegister.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result){
        		 if (result === 0) {
                 	WRPCommon.MsgBoxModule.alert({
                		message: "complete!",
                		okBtnClick: function(){
                            $('#cashregister-edit-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getCashRegisterList();
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
    deleteCashRegister : function(){
    	var storeId, sid;
        sid = WRPAdminApp.pagescript._selectedRegisterSid;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/cash_register/deleteCashRegister.jsp",
        	data:{
        		storeId: storeId,
        		sid: sid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result){
        		 if (result === 0) {
                 	WRPCommon.MsgBoxModule.alert({
                		message: "complete!",
                		okBtnClick: function(){
                			WRPAdminApp.pagescript.getCashRegisterList();
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
    addCashRegister : function(){
    	WRPAdminApp.pagescript._selectedRegisterSid = 0;

        try {
            document.getElementById("cash-register-no-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("cash-register-description-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	document.getElementById("cash-register-credit-url-pop").value = "";
        } catch (e) {
        	console.warn(e);
            return;
        }
        try {
            document.getElementById("cash-register-credit-port-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        try {
            document.getElementById("cash-register-credit-token-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $('#cashregister-edit-window').jqxWindow('open');
    }
};