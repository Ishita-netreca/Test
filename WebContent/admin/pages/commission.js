
var _pagescript = {
	_selectedProfileSid: 0,
	_selectedStructSid: 0,
	_commissionData: undefined,
	_removeCommissionData: undefined,
    init: function() {
    	var elem;
    	try {
			WRPComponents('div[pagename="commission"] > .page-submenu-container > .submenu[panelname="commission"]').addShadowedImage('img/icon/commisssion.png');
			WRPComponents('div[pagename="commission"] > .page-submenu-container > .submenu[panelname="calculation"]').addShadowedImage('img/icon/commission_calc.png');
		} catch (e) {
			
		}
		
		try {
            elem = $(".jqx-horizontal-split-panel-main");
            
            if (elem && elem.length > 0) {                            
            	elem.jqxSplitter({
                	width: "99.8%",
                	height: "99.8%",
                	orientation: 'horizontal',
                	panels: [
                		{ size: "30%", min: 100, collapsible: false }, 
                		{ min: 100, collapsible: false}
                	],
        			theme: "arctic"
                });
            }
		} catch (e) {
			console.warn(e);
		}
		
		var components = $('#commission-new-window');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 200);
    		components.css("top", "calc(50% - 200px)");
    		components.css("left", "calc(50% - 300px)");
    	}
    	
    	components = $('#jqx-commission-profile-list');
    	if(components){
    		components.jqxGrid({
            	   width: '100%',
            	   height: '100%',
            	   source: new $.jqx.dataAdapter({
            		   datatype: "json",
            		   datafields: [
            			   	{ name: 'sid', type: 'string'},
       						{ name: 'name', type: 'string'},
       						{ name: 'updateDate', type: 'date'},
       						{ name: 'user_id', type: 'string'},
       					]
            	   }),
            	   showfilterrow: false,
            	   filterable: true,
            	   sortable: true,
            	   columnsresize:true,
            	   theme: 'arctic',
            	   columns: [
            		   { text: 'sid', datafield: 'sid', hidden:true},
            		   { text: 'Profile Name', datafield: 'name', width: '40%'},
            		   { text: 'Update Date', datafield: 'updateDate', filtertype: 'date', width: '30%', cellsformat: 'MM/dd/yyyy HH:mm:ss'},
            		   { text: 'Updater', datafield: 'user_id', width: '30%' },
                   ]
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.commissionProfilePop);
    		components.on("rowselect", function(event){
    			WRPAdminApp.pagescript._selectedProfileSid = event.args.row.sid;
    			WRPAdminApp.pagescript.getCommissionStruct();
    		});
    	}
    	
    	components = $('#jqx-commission-employee-list');
    	if(components){
    		components.jqxGrid({
            	   width: '100%',
            	   height: '100%',
            	   source: new $.jqx.dataAdapter({
            		   datatype: "json",
            		   datafields: [
            			   	{ name: 'sid', type: 'string'},
       						{ name: 'userId', type: 'string'},
       						{ name: 'userName', type: 'string'},
       						{ name: 'address', type: 'string'},
       						{ name: 'email', type: 'string'},
       						{ name: 'tel', type: 'string'},
       					]
            	   }),
            	   showfilterrow: false,
            	   filterable: true,
            	   sortable: true,
            	   columnsresize:true,
            	   theme: 'arctic',
            	   columns: [
            		   { text: 'sid', datafield: 'sid', hidden:true},
            		   { text: 'ID', datafield: 'userId', width: '20%'},
            		   { text: 'Name', datafield: 'userName', width: '20%'},
            		   { text: 'Address', datafield: 'address', width: '20%' },
            		   { text: 'Email', datafield: 'email', width: '20%' },
            		   { text: 'Phone', datafield: 'tel', width: '19.9%' },
                   ]
    		});
    		components.on("rowselect", WRPAdminApp.pagescript.getSelectProfileList);
    	}
    	
    	WRPAdminApp.pagescript._selectedProfileSid = 0;
		WRPAdminApp.pagescript.getCommissionProfileList();
		//WRPAdminApp.pagescript.getCommissionStruct();
		WRPAdminApp.pagescript.getEmployeeList();
    },
    commissionProfilePop: function(event){
    	var rowdata ;
    	
    	if(event != null){
    		rowdata = event.args.row.bounddata;
    		
    		document.getElementById("commission-add-profile-name").value = rowdata.name;
    		WRPAdminApp.pagescript._selectedProfileSid = rowdata.sid;
    	}else{
    		document.getElementById("commission-add-profile-name").value = "";
    		WRPAdminApp.pagescript._selectedProfileSid = 0;
    	}
    	
    	$('#commission-new-window').jqxWindow('open');
    },
    getCommissionStruct: function() {
    	var storeId, rowdata;
    	
    	
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $('#jqx-tree-commission-struct')[0].parentNode.innerHTML = '<div id="jqx-tree-commission-struct"></div>';
        
        $.ajax({
        	url: "ajax/commission/getCommissionList.jsp",
        	data: {
        		storeId: storeId,
        		profileSid: WRPAdminApp.pagescript._selectedProfileSid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, source, adapter, records, elem;
        		data = result.data;
        		if (!data) return;
        		
        		source = {
        			datatype: "json",
        			datafields: [
        				{name: "sid"},
        				{name: "name"},
        				{name: "value"},
        				{name: "icon"},
        				{name: "parent_sid"}
        			],
        			id: "sid",
        			localdata: data
        		};
        		
        		adapter = new $.jqx.dataAdapter(source);
        		adapter.dataBind();
        		
        		records = adapter.getRecordsHierarchy("sid", "parent_sid", "items", [{ name: 'name', map: 'label', value: 'sid'}]);
        		        		
        		elem = $('#jqx-tree-commission-struct');
        		
        		elem.jqxTree({ 
        			source: records,
        			width: '100%', 
        			height: "99%", 
        			hasThreeStates: true, 
        			checkboxes: true,
        			theme: "arctic" 
        		});
        		
        		elem.on("select", function(event) {
        			WRPAdminApp.pagescript._selectedStructSid = elem.jqxTree('getSelectedItem').value;
        			WRPAdminApp.pagescript.getCommissionInfo();
        		});    
        		
        		 WRPAdminApp.pagescript.getCommissionCheck();
        	}
        });
    },
    getCommissionCheck: function(event){
    	var storeId, rowdata;
    	
    	try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/commission/getCommissionCheck.jsp",
        	data: {
        		storeId: storeId,
        		profileSid: WRPAdminApp.pagescript._selectedProfileSid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var i,j, data, obj, value, items, currentItem; 
        		data = result.data;
        		
        		items = $('#jqx-tree-commission-struct').jqxTree('getItems');
        		for(i = 0; i < data.length; i++){
        			
        			obj = data[i];
        			
        			if(obj.carrier != undefined || obj.carrier != null){
        				value = obj.target_type+"_"+obj.carrier+"_"+obj.target_sid;
        			}else{
        				value = obj.target_type+"_"+obj.target_sid;
        			}
        			
        			for (j = 0; j < items.length; j++) {
                        currentItem = items[j];
                        if (currentItem.value == value) {
                        	$('#jqx-tree-commission-struct').jqxTree('checkItem',currentItem.element, true);
                        };
                    };
        		}

        	}
        });
    },
    getCommissionProfileList: function() {
    	var storeId;
    	
    	//WRPAdminApp.pagescript._selectedProfileSid = 0;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $("#jqx-grid-commission-info")[0].parentNode.innerHTML = '<div id="jqx-grid-commission-info"></div>';
        
        $.ajax({
        	url: "ajax/commission/getCommissionProfileList.jsp",
        	data: {
        		storeId: storeId
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, elem, i, len, obj,getselectedrowindexes,rowdata;

    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-commission-profile-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    				elem.jqxGrid('selectrow', 0);
    			}
    			getselectedrowindexes = $('#jqx-commission-profile-list').jqxGrid('getselectedrowindexes');
    	        rowdata = $('#jqx-commission-profile-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
    	        
    	        WRPAdminApp.pagescript._selectedProfileSid =rowdata.sid;
    			WRPAdminApp.pagescript.getCommissionStruct();
        	}
        });
    },
    addCommissionProfile: function() {
    	var profile,storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
    	try {
    		profile = document.getElementById("commission-add-profile-name").value;
    		if (profile.length == 0) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "Input profile name"
    			});
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	$.ajax({
    		url: "ajax/commission/addCommissionProfile.jsp",
    		data: {
    			storeId: storeId,
    			profile_name: profile
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			if (result === 0) {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Completed",
        				okBtnClick: function(){
            				$('#commission-new-window').jqxWindow('close');
            				WRPAdminApp.pagescript.getCommissionProfileList();
        				}
        			});
    			} else if (result === 1) {
        			WRPCommon.MsgBoxModule.alert({
        				message: "This Profile already exists"
        			});
    				return;
    			} else {
        			WRPCommon.MsgBoxModule.alert({
        				message: "Error : " + result
        			});
    			}
    		}
    	});
    },
    deleteCommissionProfile: function() {
    	var profile_sid, storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	
    	try {
    		profile_sid = WRPAdminApp.pagescript._selectedProfileSid;
    		if (isNaN(profile_sid) || profile_sid < 1) {
    			console.warn("profile sid format error");
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
		WRPCommon.MsgBoxModule.confirm({
			message: "This process can not be restored.\nAre you sure?",
			noBtnClick: function(){
				return;
			},
			yesBtnClick: function(){
		    	$.ajax({
		    		url: "ajax/commission/deleteCommissionProfile.jsp",
		    		data: {
		    			profile_sid: profile_sid,
		    			storeId: storeId
		    		},
		    		method: "POST",
		    		dataType: "json",
		    		success: function(result) {
		    			if (result === 0) {
		    				$('#commission-new-window').jqxWindow('close');
		    				WRPAdminApp.pagescript.getCommissionProfileList();
		    			} else {
		        			WRPCommon.MsgBoxModule.alert({
		        				message: "Error : " + result
		        			});
		    			}
		    		}
		    	})
			}
		});
    },
    getCommissionInfo: function() {
    	var param, arr,getselectedrowindexes,rowdata;
    	param = {};

        try {
            param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.profileSid = parseInt(WRPAdminApp.pagescript._selectedProfileSid);
        	if (isNaN(param.profileSid)) {
        		console.warn("profile format error");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        if (param.profileSid < 1) {
			WRPCommon.MsgBoxModule.alert({
				message: "Select Commission Profile"
			});
        	return;
        }
        
        if (WRPAdminApp.pagescript._selectedStructSid === undefined) {
        	return;
        }
        
        arr = WRPAdminApp.pagescript._selectedStructSid.split("_");
        if (arr.length == 1) {
        	param.target_type = arr[0];
        } else if (arr.length > 1) {
        	param.target_type = arr[0];
        	param.target_sid = arr[arr.length-1];        	
        }
        
        $("#jqx-grid-commission-info")[0].parentNode.innerHTML = '<div id="jqx-grid-commission-info"></div>';
        
        $.ajax({
        	url: "ajax/commission/getCommissionInfo.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, type, source, adapter, columns, elem;
        		
        		data = result.data;
        		if (!data) return;
        		
        		WRPAdminApp.pagescript._commissionData = data;
        		
        		if (data.length > 0) {
        			try {
        				type = data[0].type;
        				document.getElementById("commission-type").value = type;
        			} catch (e) {
        				console.warn(e);
        				return;
        			}
        		} else {
        			try {
        				type = 0;
        				document.getElementById("commission-type").value = type;
        			} catch (e) {
        				console.warn(e);
        				return;
        			}
        		}
        		
        		source = {
        			datatype: "json",
        			datafields: [
        				{ name: "sid", type: "number" },
        				{ name: "from", type: "number" },
        				{ name: "to", type: "number" },
        				{ name: "commission_value", type: "number" }
        			],
        			localdata: data
        		};
        		
        		switch (type) {
        		case 0:
        			columns = [];
        			break;
        		case 1:
        			columns = [
        				{ text:"sid", datafield: "sid", hidden: true },
        				{ text:"From", datafield: "from", width: "30%" },
        				{ text:"To", datafield: "to", width: "30%",
        					initEverPresentRowWidget: function (datafield, htmlElement) {
        						var input = htmlElement.find('input');
        						input.attr('value', '9999');
        					} 
        				},
        				{ text:"Commission Amount $", datafield: "commission_value", width: "30%"},
        				{ text: '', datafield: 'addButtonColumn', width: "10%"}
        			];
        			break;
        		case 2:
        		case 3:
        			columns = [
        				{ text:"sid", datafield: "sid", hidden: true },
        				{ text:"From", datafield: "from", width: "30%" },
        				{ text:"To", datafield: "to", width: "30%",
        					initEverPresentRowWidget: function (datafield, htmlElement) {
        						var input = htmlElement.find('input');
        						input.attr('value', '9999');
        					} 
        				},
        				{ text:"Commission %", datafield: "commission_value", width: "30%" },
        				{ text: '', datafield: 'addButtonColumn', width: "10%"}
        			];
        			break;
        		}
        		
        		adapter = new $.jqx.dataAdapter(source);
        		
        		elem = $("#jqx-grid-commission-info");
        		
        		elem.jqxGrid({
        			source: adapter,
        			columns: columns,
        			width: "100%",
        			showeverpresentrow: true,
        			everpresentrowposition: "top",
        			everpresentrowactions: "add",
                    everpresentrowactionsmode: "columns",
        			editable: true,
        			theme: "arctic"
        		});

        		elem.on("cellendedit", WRPAdminApp.pagescript.onCommissionCellEndEdit);
        	}
        });
    },
    /*getCommissionInfoByProfileAndStruct: function() {
    	var param;
    	
    	param = {};

        try {
            param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.profileSid = parseInt(WRPAdminApp.pagescript._selectedProfileSid);
        	if (isNaN(param.profileSid)) {
        		console.warn("profile format error");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        if (param.profileSid < 1) {
        	alert("Select Commission Profile");
        	return;
        }
        
        param.structSid = WRPAdminApp.pagescript._selectedStructSid;
        if (isNaN(param.structSid)) {
        	console.warn("struct format error");
        	return;
        }
        
        if (param.structSid < 1) {
        	alert("No selected commission");
        	return;
        }
        
        $("#jqx-grid-commission-info")[0].parentNode.innerHTML = '<div id="jqx-grid-commission-info"></div>';
        
        $.ajax({
        	url: "ajax/commission/getCommissionInfoByProfileAndStruct.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, type, source, adapter, columns, elem;
        		
        		data = result.data;
        		if (!data) return;
        		
        		WRPAdminApp.pagescript._commissionData = data;
        		
        		if (data.length > 0) {
        			try {
        				type = data[0].type;
        				document.getElementById("commission-type").value = type;
        			} catch (e) {
        				console.warn(e);
        				return;
        			}
        		} else {
        			try {
        				type = 0;
        				document.getElementById("commission-type").value = type;
        			} catch (e) {
        				console.warn(e);
        				return;
        			}
        		}
        		
        		source = {
        			datatype: "json",
        			datafields: [
        				{ name: "sid", type: "number" },
        				{ name: "from", type: "number" },
        				{ name: "to", type: "number" },
        				{ name: "commission_value", type: "number" }
        			],
        			localdata: data
        		};
        		
        		switch (type) {
        		case 0:
					columns = [];
					break;
        		case 1:
        			columns = [
        				{ text:"sid", datafield: "sid", hidden: true },
        				{ text:"From", datafield: "from" },
        				{ text:"To", datafield: "to" },
        				{ text:"Commission Amount", datafield: "commission_value" },
        				{ text: '', datafield: 'addButtonColumn', width: "10%"}
        			];
        			break;
        		case 2:
        		case 3:
        			columns = [
        				{ text:"sid", datafield: "sid", hidden: true },
        				{ text:"From", datafield: "from" },
        				{ text:"To", datafield: "to" },
        				{ text:"Commission %", datafield: "commission_value" },
        				{ text: '', datafield: 'addButtonColumn', width: "10%"}
        			];
        			break;
        		}
        		
        		adapter = new $.jqx.dataAdapter(source);
        		
        		elem = $("#jqx-grid-commission-info");
        		
        		elem.jqxGrid({
        			source: adapter,
        			columns: columns,
        			width: "100%",
        			showeverpresentrow: true,
        			everpresentrowposition: "top",
        			everpresentrowactions: "add",
                    everpresentrowactionsmode: "columns",
        			editable: true,
        			theme: "arctic"
        		});

        		elem.on("cellendedit", WRPAdminApp.pagescript.onCommissionCellEndEdit);
        	}
        });
    },*/
    onCommissionTypeChanged: function() { // parameter { [type](required) }
    	var type, data, i, len, source, adapter, columns, elem;
    	if (arguments.length < 1) {
    		console.warn("no input commission type");
    		return;
    	}
    	
    	type = parseInt(arguments[0]);
    	if (isNaN(type)) {
    		console.warn("type format error");
    		return;
    	}
    	
    	data = WRPAdminApp.pagescript._commissionData;
    	
    	if (data === undefined) return;
    	
    	for (i = 0, len = data.length; i < len; i++) {
    		data[i].type = type;
    	}
    	
        $("#jqx-grid-commission-info")[0].parentNode.innerHTML = '<div id="jqx-grid-commission-info"></div>';

		source = {
			datatype: "json",
			datafields: [
				{ name: "sid", type: "number" },
				{ name: "from", type: "number" },
				{ name: "to", type: "number" },
				{ name: "commission_value", type: "number" },
			],
			localdata: data
		};
		
		switch (type) {
		case 0:
			columns = [];
			break;
		case 1:
			columns = [
				{ text:"sid", datafield: "sid", hidden: true },
				{ text:"From", datafield: "from", width: "30%" },
				{ text:"To", datafield: "to", width: "30%",
					initEverPresentRowWidget: function (datafield, htmlElement) {
						var input = htmlElement.find('input');
						input.attr('value', '9999');
					} 
				},
				{ text:"Commission Amount $", datafield: "commission_value", width: "30%"},
				{ text: '', datafield: 'addButtonColumn', width: "10%"}
			];
			break;
		case 2:
		case 3:
			columns = [
				{ text:"sid", datafield: "sid", hidden: true },
				{ text:"From", datafield: "from", width: "30%" },
				{ text:"To", datafield: "to", width: "30%",
					initEverPresentRowWidget: function (datafield, htmlElement) {
						var input = htmlElement.find('input');
						input.attr('value', '9999');
					} 
				},
				{ text:"Commission %", datafield: "commission_value", width: "30%" },
				{ text: '', datafield: 'addButtonColumn', width: "10%"}
			];
		}
		
		adapter = new $.jqx.dataAdapter(source);
		
		elem = $("#jqx-grid-commission-info");
		
		elem.jqxGrid({
			source: adapter,
			columns: columns,
			width: "100%",
			showeverpresentrow: true,
			everpresentrowposition: "top",
			everpresentrowactions: "add",
            everpresentrowactionsmode: "columns",
			editable: true,
			theme: "arctic"
		});
		
		elem.on("cellendedit", WRPAdminApp.pagescript.onCommissionCellEndEdit);
    }, 
    onCommissionCellEndEdit: function(event) {
    	var rowData, commissionData, i, len, obj, dataField, newVal; 
		rowData = event.args.row;
	    dataField = event.args.datafield;
	    newVal = event.args.value;
		
		commissionData = WRPAdminApp.pagescript._commissionData;
		
		if (commissionData === undefined) return;
		
		for (i = 0, len = commissionData.length; i < len; i++) {
			obj = commissionData[i];
			
			if (obj.sid === rowData.sid) {
				obj[dataField] = (!isNaN(parseInt(newVal) ) )? parseInt(newVal) : newVal;
				return;
			}
			
			obj = undefined;
		}
		
		if (obj === undefined) {
			obj = {};
			obj.sid = 0;
			obj[dataField] = (!isNaN(parseInt(newVal) ) )? parseInt(newVal) : newVal;
			commissionData.push(obj);
		}
    },
    setCommissionInfo: function() {
    	var rows, i, len, obj, param, type, arr;

    	param = {};
    	
        try {
        	param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	param.profile_sid = parseInt(WRPAdminApp.pagescript._selectedProfileSid);
        	if (isNaN(param.profile_sid)) {
        		console.warn("profile format error");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        if (param.profile_sid < 1) {
			WRPCommon.MsgBoxModule.alert({
				message: "Select Commission Profile"
			});
        	return;
        }
        

        
        arr = WRPAdminApp.pagescript._selectedStructSid.split("_");
        if (arr.length == 1) {
        	param.target_type = arr[0];
        } else if (arr.length > 1) {
        	param.target_type = arr[0];
        	param.target_sid = arr[arr.length-1];        	
        }
        
    	try {
        	type = parseInt(document.getElementById("commission-type").value);
        	if (isNaN(type)) {
        		console.warn("type format error");
        		return;
        	}
    	}catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		rows = JSON.parse(JSON.stringify( $("#jqx-grid-commission-info").jqxGrid('getrows') ) );
    		for (i = 0, len = rows.length; i < len; i++) {
    			obj = rows[i];
    			if (obj.sid === null || obj.sid === undefined) obj.sid = 0;
    			if (obj.from === null || obj.from === undefined) {
    				WRPCommon.MsgBoxModule.alert({
    					message: "'From' Column value is empty"
    				});
    				return;
    			}   
    			if (obj.to === null || obj.to === undefined) {
    				WRPCommon.MsgBoxModule.alert({
    					message: "'To' Column value is empty"
    				});
    				return;
    			}   
    			if (obj.commission_value === null || obj.commission_value === undefined) {
    				WRPCommon.MsgBoxModule.alert({
    					message: "'Commission' Column value is empty"
    				});
    				return;
    			}
    			obj.type = type;
    			obj.boundIndex = undefined;
    			delete obj.boundIndex;
    			obj.uid = undefined;
    			delete obj.uid;
    			obj.uniqueid = undefined;
    			delete obj.uniqueid;
    			obj.visibleindex = undefined;
    			delete obj.visibleindex;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	param.jsonParam = JSON.stringify(rows);
    	
    	$.ajax({
    		url: "ajax/commission/setCommissionInfo.jsp",
    		data: param,
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			if (result === 0) {
    				WRPCommon.MsgBoxModule.alert({
    					message: "Completed",
    					okBtnClick: function(){
    	    				WRPAdminApp.pagescript.getCommissionStruct();
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
    getEmployeeList: function(){
    	var selectedStoreId;
    	
    	try {
    		selectedStoreId = document.getElementById("select-store").value;
            if (selectedStoreId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
    		url: "ajax/user/getUserList.jsp",
    		data: {
    			selectedStoreId:selectedStoreId,
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, elem, i, len, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-commission-employee-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    		}
    	});
    },
    getSelectProfileList: function(event){
    	var storeId;
    	try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        document.getElementById("commission-total").style.display='none';
        $('#jqx-commission-calcul-list').jqxDataTable("clear");
        $.ajax({
        	url: "ajax/commission/getCommissionProfileList.jsp",
        	data: {
        		storeId: storeId
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
        		
        		innerHTML.push('<option value="">Select Profile</option>');
        		for (i = 0, len = data.length; i < len; i++) {
        			try {
        				obj = data[i];
        				innerHTML.push('<option value="');
        				innerHTML.push(obj.sid);
        				innerHTML.push('">');
        				innerHTML.push((obj.name !== undefined)? obj.name : "");
        				innerHTML.push('</option>');
        			} catch (e) {
        				console.warn(e);
        				return;
        			}
        		}
        		
        		try {
        			document.getElementById("commission-select-profile").innerHTML = innerHTML.join("");
        		} catch (e) {
        			console.warn(e);
        		}
        		
        		innerHTML = undefined;
        	}
        });
    },
    getCalculCommissionList: function(){
    	var storeId;
    	var getselectedrowindexes = $('#jqx-commission-employee-list').jqxGrid('getselectedrowindexes');
        var rowdata = $('#jqx-commission-employee-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
        
    	try {
    		storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
    		url: "ajax/commission/getCommissionCalculation.jsp",
    		data: {
    			store_id:storeId,
    			emp_id: rowdata.sid,
    			profile_sid: arguments[0],
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, i, obj, elem;
    			var datarow = new Array();
    			var calculation = 0, total_commission=0, commission;
    			
    			data=result.data;
    			
    			for (i = 0; i<data.length; i++){
    				obj = data[i];
    				
    				var row = {};
    				
    				if(obj.type==1){
    					calculation = obj.commission_value * obj.qty;
    					commission = "$" + obj.commission_value;
    				}else if(obj.type == 2){
    					calculation = obj.total * (obj.commission_value / 100);
    					commission = obj.commission_value + "%";
    				}
    				total_commission = total_commission + calculation;
    				
    				row["target_sid"] = obj.target_sid;
    				row["target_type"] = obj.target_type;
    				row["name"] = obj.name;
					row["from"] = obj.from;
					row["to"] = obj.to;
					row["qty"] = obj.qty
					row["amount"] = obj.total;
					row["commission"] = commission;
					row["calculation"] = calculation;
					row["description"] = obj.description;
					datarow[i] = row;
					
    			}
    			
    			var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: 'target_sid', type: 'number'},
						{ name: 'target_type', type: 'number'},
						{ name: 'name', type: 'string'},
   						{ name: 'from', type: 'string'},
   						{ name: 'to', type: 'string'},
   						{ name: 'qty', type: 'string'},
   						{ name: 'amount', type: 'string'},
   						{ name: 'commission', type: 'string'},
   						{ name: 'calculation', type: 'string'},
   						{ name: 'description', type: 'string'}
					],
					localdata: datarow
				});
    			
    	    	elem = $('#jqx-commission-calcul-list');
    	    	if(elem){
    	    		elem.jqxDataTable({
    	            	   width: '99%',
    	            	   height: '100%',
    	            	   source: dataAdapter,
    	            	   sortable: true,
    	            	   columnsResize:true,
    	            	   rowDetails: true,
    	            	   theme: 'arctic',
    	            	   initRowDetails: WRPAdminApp.pagescript.getCommissionDetail,
    	            	   columns: [
    	            		   { text: 'Profile Name', datafield: 'name', width: '10%'},
    	            		   { text: 'Description', datafield: 'description', width: '28.5%'},
    	            		   /*{ text: 'From', datafield: 'from', width: '10%'},
    	            		   { text: 'To', datafield: 'to', width: '10%'},
    	            		   { text: 'commission', datafield: 'commission', width: '10%',cellsalign:'right' },*/
    	            		   { text: 'Total Sales Qty', datafield: 'qty', width: '20%' },
    	            		   { text: 'Total Sales Amount', datafield: 'amount', width: '20%',cellsformat:'c2',cellsalign:'right' },
    	            		   { text: 'Commission', datafield: 'calculation', width: '20%',cellsformat:'c2',cellsalign:'right' },
    	                   ]
    	    		});
    	    		$("#commission-excel-btn").click(function () {
            			elem.jqxDataTable('exportData', 'xls', 'jqx-commmission-list');
                    });
    	    	}
    	    	
    	    	try{
    	    		document.getElementById("commission-total").innerHTML = "Total Commission : "+"$" +total_commission.toFixed(2);
    	    		document.getElementById("commission-total").style.display='block';
    	    	}catch(e){
    	    		
    	    	}
    	    	
    	    	
    		}
        });
    },
    getCalculCommissionByDate: function(){
    	var start_date, end_date;
    	var getselectedrowindexes = $('#jqx-commission-employee-list').jqxGrid('getselectedrowindexes');
        var rowdata = $('#jqx-commission-employee-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
        var data = {};
        
    	try {
    		data.store_id = document.getElementById("select-store").value;
            if (data.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        data.emp_id = rowdata.sid;
        data.profile_sid = document.getElementById("commission-select-profile").value;
        
        start_date = new Date($("#commission-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
        data.start_date = WRPAdminApp.toDecimalFormat((start_date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(start_date.getDate(), "00") + "/" + start_date.getFullYear();
	    end_date = new Date($("#commission-end-date").jqxDateTimeInput('getDate'));
	    data.end_date = WRPAdminApp.toDecimalFormat((end_date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(end_date.getDate(), "00") + "/" + end_date.getFullYear();

        $.ajax({
    		url: "ajax/commission/getCommissionCalculation.jsp",
    		data: data,
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, i, obj, elem;
    			var datarow = new Array();
    			var calculation = 0, total_commission=0, commission;
    			
    			data=result.data;
    			
    			for (i = 0; i<data.length; i++){
    				obj = data[i];
    				
    				var row = {};
    				
    				if(obj.type==1){
    					calculation = obj.commission_value * obj.qty;
    					commission = "$" + obj.commission_value;
    				}else if(obj.type == 2){
    					calculation = obj.total * (obj.commission_value / 100);
    					commission = obj.commission_value + "%";
    				}
    				total_commission = total_commission + calculation;
    				
    				row["target_sid"] = obj.target_sid;
    				row["target_type"] = obj.target_type;
    				row["name"] = obj.name;
					row["from"] = obj.from;
					row["to"] = obj.to;
					row["qty"] = obj.qty
					row["amount"] = obj.total;
					row["commission"] = commission;
					row["calculation"] = calculation;
					row["description"] = obj.description;
					datarow[i] = row;
					
    			}
    			
    			var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: 'target_sid', type: 'number'},
						{ name: 'target_type', type: 'number'},
						{ name: 'name', type: 'string'},
   						{ name: 'from', type: 'string'},
   						{ name: 'to', type: 'string'},
   						{ name: 'qty', type: 'string'},
   						{ name: 'amount', type: 'string'},
   						{ name: 'commission', type: 'string'},
   						{ name: 'calculation', type: 'string'},
   						{ name: 'description', type: 'string'}
					],
					localdata: datarow
				});
    			
    	    	elem = $('#jqx-commission-calcul-list');
    	    	if(elem){
    	    		elem.jqxDataTable({
    	            	   width: '99%',
    	            	   height: '100%',
    	            	   source: dataAdapter,
    	            	   sortable: true,
    	            	   columnsResize:true,
    	            	   rowDetails: true,
    	            	   theme: 'arctic',
    	            	   initRowDetails: WRPAdminApp.pagescript.getCommissionDetailByDate,
    	            	   columns: [
    	            		   { text: 'Profile Name', datafield: 'name', width: '10%'},
    	            		   { text: 'Description', datafield: 'description', width: '28.5%'},
    	            		   /*{ text: 'From', datafield: 'from', width: '10%'},
    	            		   { text: 'To', datafield: 'to', width: '10%'},
    	            		   { text: 'commission', datafield: 'commission', width: '10%',cellsalign:'right' },*/
    	            		   { text: 'Total Sales Qty', datafield: 'qty', width: '20%' },
    	            		   { text: 'Total Sales Amount', datafield: 'amount', width: '20%',cellsformat:'c2',cellsalign:'right' },
    	            		   { text: 'Commission', datafield: 'calculation', width: '20%',cellsformat:'c2',cellsalign:'right' },
    	                   ]
    	    		});
    	    		$("#commission-excel-btn").click(function () {
            			elem.jqxDataTable('exportData', 'xls', 'jqx-commmission-list');
                    });
    	    	}
    	    	
    	    	try{
    	    		document.getElementById("commission-total").innerHTML = "Total Commission : "+"$" +total_commission.toFixed(2);
    	    		document.getElementById("commission-total").style.display='block';
    	    	}catch(e){
    	    		
    	    	}
    	    	
    	    	
    		}
        });
    },
    getCommissionDetail: function(id, row, element, rowinfo) {
    	var data = {};
    	var getselectedrowindexes = $('#jqx-commission-employee-list').jqxGrid('getselectedrowindexes');
        var rowdata = $('#jqx-commission-employee-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
        
        try {
    		data.store_id = document.getElementById("select-store").value;
            if (data.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try{
        	data.emp_sid = rowdata.sid;
        }catch (e){
        	console.warn(e);
        }
        
        try{
        	data.target_type = row.target_type;
        }catch (e){
        	console.warn(e);
        }
        
        try{
        	data.target_sid = row.target_sid;
        }catch (e){
        	console.warn(e);
        }
        
    	
		
		$.ajax({
    		url: "ajax/commission/getCommissionDetail.jsp",
    		data: data,
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, i, obj, table;
    			var datarow = new Array();
    			data = result.data;
    			rowinfo.detailsHeight = 205;
    			element.html('<div style="margin-top:5px; width: 100%;height:205px;"></div>');
    			table = $(element.children()[0]);
    			
    			for (var i = 0; i<data.length; i++){
    				obj = data[i];
    				
    				var row = {};
    				
    				row["name"] = obj.name;
    				row["subtotal"] = obj.subtotal;
    				row["transation_date"] = obj.transaction_date;
					row["qty"] = obj.qty;
					row["invoice_no"] = obj.invoice_no;

					datarow[i] = row;
					
    			}
    			
    			$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "name", type: "string" },
							{ name: "subtotal", type: "number" },
							{ name: "transation_date", type: "date" },
							{ name: "qty", type: "number" },
							{ name: "invoice_no", type: "string" },
	    				],
	    				localdata: datarow
	    			}),
    				width: "99%",
    				pageable: true,
                    pageSize: 4,
    				theme: "arctic",
	    			columns: [
	    				{ text: "Invoice No", datafield: "invoice_no", width: '10%' },
	    				{ text: "Name", datafield: "name" ,width:'30%'},
	    				{ text: "amount", datafield: "subtotal",width:'20%',cellsformat:'c2',cellsalign:'right' },
	    				{ text: "qty", datafield: "qty", width:'20%' },
	    				{ text: "transation_date", datafield: "transation_date", width:'20%', cellsformat: 'd' },
	    			]
				});
			}
    			
		});
	},
	getCommissionDetailByDate: function(id, row, element, rowinfo) {
		var start_date, end_date;
    	var data = {};
    	var getselectedrowindexes = $('#jqx-commission-employee-list').jqxGrid('getselectedrowindexes');
        var rowdata = $('#jqx-commission-employee-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
        
        try {
    		data.store_id = document.getElementById("select-store").value;
            if (data.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try{
        	data.emp_sid = rowdata.sid;
        }catch (e){
        	console.warn(e);
        }
        
        try{
        	data.target_type = row.target_type;
        }catch (e){
        	console.warn(e);
        }
        
        try{
        	data.target_sid = row.target_sid;
        }catch (e){
        	console.warn(e);
        }
        
        start_date = new Date($("#commission-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
        data.start_date = WRPAdminApp.toDecimalFormat((start_date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(start_date.getDate(), "00") + "/" + start_date.getFullYear();
	    end_date = new Date($("#commission-end-date").jqxDateTimeInput('getDate'));
	    data.end_date = WRPAdminApp.toDecimalFormat((end_date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(end_date.getDate(), "00") + "/" + end_date.getFullYear();
		
		$.ajax({
    		url: "ajax/commission/getCommissionDetail.jsp",
    		data: data,
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, i, obj, table;
    			var datarow = new Array();
    			data = result.data;
    			rowinfo.detailsHeight = 200;
    			element.html('<div style="margin-top:5px; width: 100%;height:200px;"></div>');
    			table = $(element.children()[0]);
    			
    			for (var i = 0; i<data.length; i++){
    				obj = data[i];
    				
    				var row = {};
    				
    				row["name"] = obj.name;
    				row["subtotal"] = obj.subtotal;
    				row["transation_date"] = obj.transaction_date;
					row["qty"] = obj.qty;
					row["invoice_no"] = obj.invoice_no;

					datarow[i] = row;
					
    			}
    			
    			$(table).jqxDataTable({
					source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
							{ name: "name", type: "string" },
							{ name: "subtotal", type: "number" },
							{ name: "transation_date", type: "date" },
							{ name: "qty", type: "number" },
							{ name: "invoice_no", type: "string" },
	    				],
	    				localdata: datarow
	    			}),
    				width: "99%",
    				pageable: true,
                    pageSize: 4,
    				theme: "arctic",
	    			columns: [
	    				{ text: "Invoice No", datafield: "invoice_no", width: '10%' },
	    				{ text: "Name", datafield: "name" ,width:'30%'},
	    				{ text: "amount", datafield: "subtotal",width:'20%',cellsformat:'c2',cellsalign:'right' },
	    				{ text: "qty", datafield: "qty", width:'20%' },
	    				{ text: "transation_date", datafield: "transation_date", width:'20%', cellsformat: 'd' },
	    			]
				});
			}
    			
		});
	},
};