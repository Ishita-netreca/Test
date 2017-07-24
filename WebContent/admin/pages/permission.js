
var _pagescript = {
	_selectedUserSid: 0,
	_selectedPermissionGroupSid: 0,
	_tmp: undefined,
    init: function() {
       var components;
       
       components = $("#permission-main-tab");
       if (components && components.length > 0) {
    	   //components.jqxTabs("val", 1);
       }
       
       components = $('#permission-user-user-list:not(.jqx-grid)');
	   if (components && components.length > 0) {
	   		components.jqxGrid({
	   			width: "100%",
	   			height: "99%",
	   			theme: "arctic",
	   			source: new $.jqx.dataAdapter({
	   				datatype: "json",
	   				datafields: [
	   					{ name: 'sid', type: 'number'},
			            { name: 'user_id', type: 'string'},
						{ name: 'user_name', type: 'string'}
	   				]
	   			}),
	   			filterable: true,
	   			editable: false,
	   			sortable: true,
	   	        groupable: false,
	   	        columnsresize:true,
	   			columns: [
	   				  { datafield: "sid", hidden: true }, 
		          	  { text: 'CT.', width: 35, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
			          { text: 'User ID', datafield: 'user_id', cellsalign: 'center', align: 'center'},
	                  { text: 'User Name', datafield: 'user_name', cellsalign: 'center', align: 'center' },
	                  { text: 'Action', cellsalign: 'center', align: 'center', width: 150, columntype: "button", cellsrenderer: function() { return "SET PERMISSION"; }, buttonclick: WRPAdminApp.pagescript.startEditPermissionUser }
				]
	   		});
	   }
       
       components = $('#permission-group-group-list:not(.jqx-grid)');
	   if (components && components.length > 0) {
	   		components.jqxGrid({
	   			width: "100%",
	   			height: "99%",
	   			theme: "arctic",
	   			source: new $.jqx.dataAdapter({
	   				datatype: "json",
	   				datafields: [
	   					{ name: 'sid', type: 'number'},
			            { name: 'permission_group_name', type: 'string'},
			            { name: 'description', type: 'string'}
	   				]
	   			}),
	   			filterable: true,
	   			editable: false,
	   			sortable: true,
	   	        groupable: false,
	   	        columnsresize:true,
	   			columns: [
	   				 { datafield: "sid", hidden: true }, 
			         { text: 'CT.', width: 35, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
			         { text: 'Group Name', datafield: 'permission_group_name', cellsalign: 'center', align: 'center'},
			         { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center'},
	                 { text: 'Action', cellsalign: 'center', align: 'center', width: 100, columntype: "button", cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.startEditPermissionGroup },
	                 { text: 'Action', cellsalign: 'center', align: 'center', width: 100, columntype: "button", cellsrenderer: function() { return "ADD USER"; }, buttonclick: WRPAdminApp.pagescript.startEditPermissionGroupUsers }
				]
	   		});
	   		
	   		components.on("rowselect", WRPAdminApp.pagescript.onPermissionGroupListRowSelect);
	   }
       
       components = $('#permission-group-detail-permission-users-list:not(.jqx-grid)');
	   if (components && components.length > 0) {
	   		components.jqxGrid({
	   			width: "100%",
	   			height: "99%",
	   			theme: "arctic",
	   			source: new $.jqx.dataAdapter({
	   				datatype: "json",
	   				datafields: [
	   					{ name: 'sid', type: 'number'},
			            { name: 'user_id', type: 'string'},
						{ name: 'user_name', type: 'string'}
	   				]
	   			}),
	   			filterable: true,
	   			editable: false,
	   			sortable: true,
	   	        groupable: false,
	   	        columnsresize:true,
	   			columns: [
	   				  { datafield: "sid", hidden: true }, 
		          	  { text: 'CT.', width: 35, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
			          { text: 'User ID', datafield: 'user_id', cellsalign: 'center', align: 'center'},
	                  { text: 'User Name', datafield: 'user_name', cellsalign: 'center', align: 'center' }
					]
	   		});
	   }
	   
	   components = $("#permission-group-detail-permission-struct-sales");
	   if (components && components.length > 0) {
		   components.jqxTreeGrid({
				width: "99%",
				height: "99%",
				source: new $.jqx.dataAdapter({
					dataType: "json",
					dataFields: [
						{name: "sid", type: "number"},
						{name: "permission_id", type: "string"},
						{name: "parent_permission_sid", type: "int"},
						{name: "root_permission_sid", type: "string"},
						{name: "description", type: "string"},
						{name: "permission_flag", type: "number"}
					],
					hierarchy: {
						keyDataField: {name: "sid"},
						parentDataField: {name: "parent_permission_sid"}
					},
					id: "sid"
				}),
				columns: [
					{text: "", width: 30, dataField: "permission_flag", cellsAlign: "left", editable: false, cellsRenderer: function() { return (parseInt(arguments[2])>0)?'<span class="group-permission-flag-checked"></span>':''; } },
					{text: "Description", dataField: "description"}
				]
			});
	   }	
	   
	   components = $("#permission-group-detail-permission-struct-backend");
	   if (components && components.length > 0) {
		   components.jqxTreeGrid({
				width: "99%",
				height: "99%",
				source: new $.jqx.dataAdapter({
					dataType: "json",
					dataFields: [
						{name: "sid", type: "number"},
						{name: "permission_id", type: "string"},
						{name: "parent_permission_sid", type: "int"},
						{name: "root_permission_sid", type: "string"},
						{name: "description", type: "string"},
						{name: "permission_flag", type: "number"}
					],
					hierarchy: {
						keyDataField: {name: "sid"},
						parentDataField: {name: "parent_permission_sid"}
					},
					id: "sid"
				}),
				columns: [
					{text: "", width: 30, dataField: "permission_flag", cellsAlign: "left", editable: false, cellsRenderer: function() { return (parseInt(arguments[2])>0)?'<span class="group-permission-flag-checked"></span>':''; } },
					{text: "Description", dataField: "description"}
				]
			});
	   }	
	   
	   components = $("#permission-set-permission-user-window");
	   if (components && components.length > 0) {
		   components.jqxWindow({
			   	width: 600,
			   	height: 430,
	   			position: {
					x: window.innerWidth * 0.5 - 400,
					y: window.innerHeight * 0.5 - 215
				}
		   });
	   }
	   
	   components = $("#set-permission-user-permission-struct-sales");
	   if (components && components.length > 0) {
		   components.jqxTreeGrid({
				width: "99%",
				height: "99%",
				source: new $.jqx.dataAdapter({
					dataType: "json",
					dataFields: [
						{name: "sid", type: "number"},
						{name: "permission_id", type: "string"},
						{name: "parent_permission_sid", type: "int"},
						{name: "root_permission_sid", type: "string"},
						{name: "description", type: "string"},
						{name: "group_permission_flag", type: "bool" }
					],
					hierarchy: {
						keyDataField: {name: "sid"},
						parentDataField: {name: "parent_permission_sid"}
					},
					id: "sid"
				}),
				checkboxes: true,
				columns: [
					{text: "User", width: 45, cellsAlign: "left",align: "center" },
					{text: "Group", width: 45, cellsAlign: "left",align: "center", dataField: "group_permission_flag", cellsRenderer: function() { return (parseInt(arguments[2])>0)?'<span class="group-permission-flag-checked"></span>':''; } },
					{text: "Description", dataField: "description"}
				]
			});
	   }	
	   
	   components = $("#set-permission-user-permission-struct-backend");
	   if (components && components.length > 0) {
		   components.jqxTreeGrid({
				width: "99%",
				height: "99%",
				source: new $.jqx.dataAdapter({
					dataType: "json",
					dataFields: [
						{name: "sid", type: "number"},
						{name: "permission_id", type: "string"},
						{name: "parent_permission_sid", type: "int"},
						{name: "root_permission_sid", type: "string"},
						{name: "description", type: "string"},
						{name: "group_permission_flag", type: "bool" }
					],
					hierarchy: {
						keyDataField: {name: "sid"},
						parentDataField: {name: "parent_permission_sid"}
					},
					id: "sid"
				}),
				checkboxes: true,
				columns: [
					{text: "User", width: 45, cellsAlign: "left",align: "center" },
					{text: "Group", width: 45, cellsAlign: "left",align: "center", dataField: "group_permission_flag", cellsRenderer: function() { return (parseInt(arguments[2])>0)?'<span class="group-permission-flag-checked"></span>':''; } },
					{text: "Description", dataField: "description"}
				]
			});
	   }	
	   
	   components = $("#permission-set-permission-group-window");
	   if (components && components.length > 0) {
		   components.jqxWindow({
			   	width: 800,
			   	height: 625,
	   			position: {
					x: window.innerWidth * 0.5 - 400,
					y: window.innerHeight * 0.5 - 312
				}
		   });
	   }
	   
	   components = $("#set-permission-group-permission-struct-sales");
	   if (components && components.length > 0) {
		   components.jqxTreeGrid({
				width: "99%",
				height: "99%",
				source: new $.jqx.dataAdapter({
					dataType: "json",
					dataFields: [
						{name: "sid", type: "number"},
						{name: "permission_id", type: "string"},
						{name: "parent_permission_sid", type: "int"},
						{name: "root_permission_sid", type: "string"},
						{name: "description", type: "string"}
					],
					hierarchy: {
						keyDataField: {name: "sid"},
						parentDataField: {name: "parent_permission_sid"}
					},
					id: "sid"
				}),
				checkboxes: true,
				columns: [
					{text: "", width: 30, cellsAlign: "left" },
					{text: "Description", dataField: "description"}
				]
			});
	   }	
	   
	   components = $("#set-permission-group-permission-struct-backend");
	   if (components && components.length > 0) {
		   components.jqxTreeGrid({
				width: "99%",
				height: "99%",
				source: new $.jqx.dataAdapter({
					dataType: "json",
					dataFields: [
						{name: "sid", type: "number"},
						{name: "permission_id", type: "string"},
						{name: "parent_permission_sid", type: "int"},
						{name: "root_permission_sid", type: "string"},
						{name: "description", type: "string"}
					],
					hierarchy: {
						keyDataField: {name: "sid"},
						parentDataField: {name: "parent_permission_sid"}
					},
					id: "sid"
				}),
				checkboxes: true,
				columns: [
					{text: "", width: 30, cellsAlign: "left" },
					{text: "Description", dataField: "description"}
				]
			});	  
	   }
	   
	   components = $("#permission-set-permission-group-users-window");
	   if (components && components.length > 0) {
		   components.jqxWindow({
			   	width: 600,
			   	height: 400,
	   			position: {
					x: window.innerWidth * 0.5 - 400,
					y: window.innerHeight * 0.5 - 200
				}
		   });
	   }
	   
	   components = $("#set-permission-group-users-user-list");
	   if (components && components.length > 0) {
		   components.jqxTreeGrid({
				width: "99%",
				height: "99%",
				source: new $.jqx.dataAdapter({
					dataType: "json",
					dataFields: [
						{name: "sid", type: "number"},
						{name: "user_id", type: "string"},
						{name: "user_name", type: "string"},
						{name: "permission_group_name", type: "string"}
					],
					hierarchy: {
						keyDataField: {name: "sid"},
						parentDataField: {name: "parent_sid"}
					},
					id: "sid"
				}),
				checkboxes: true,
				columns: [
					{text: "", width: 30, cellsAlign: "left", cellsrenderer: function(){  }},
					{text: "User ID", dataField: "user_id"},
					{text: "User Name", dataField: "user_name"},
					{text: "Permission Group", dataField: "permission_group_name"}
				]
			});
		   
	   }	
	   
	   setTimeout(function() {
		   WRPAdminApp.pagescript.getPermissionStructSales();
		   WRPAdminApp.pagescript.getPermissionStructBackend();
		   WRPAdminApp.pagescript.getPermissionGroupList();
	   }, 500);
	   
    },
    searchUserListOwnedByOwner: function() { // used in user tab
    	var params, keyword_elem;
    },
    getPermissionStructSales: function() {
    	try {
    		//$('#permission-group-detail-permission-struct-sales').jqxTreeGrid("clear");
    		//$('#set-permission-user-permission-struct-sales').jqxTreeGrid("clear");
    		//$('#set-permission-group-permission-struct-sales').jqxTreeGrid("clear");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	WRPAdminApp.PermissionModule.getPermissionStructSales({
    		callback: WRPAdminApp.pagescript.callbackGetPermissionStructSales
    	});
    },
    callbackGetPermissionStructSales: function(data) {
    	var i, len, obj;
    	if (data === undefined) {
    		return;
    	}

    	try {
    		$('#permission-group-detail-permission-struct-sales').jqxTreeGrid("addRow", null, data, "last");
    		$('#set-permission-user-permission-struct-sales').jqxTreeGrid("addRow", null, data, "last");
    		$('#set-permission-group-permission-struct-sales').jqxTreeGrid("addRow", null, data, "last");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}    	
    },
    getPermissionStructBackend: function() {
    	try {
    		//$('#permission-group-detail-permission-struct-backend').jqxTreeGrid("clear");
    		//$('#set-permission-user-permission-struct-backend').jqxTreeGrid("clear");
    		//$('#set-permission-group-permission-struct-backend').jqxTreeGrid("clear");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	WRPAdminApp.PermissionModule.getPermissionStructBackend({
    		callback: WRPAdminApp.pagescript.callbackGetPermissionStructBackend
    	});
    },
    callbackGetPermissionStructBackend: function(data) {
    	var i, len, obj, elem;
    	if (data === undefined) {
    		return;
    	}

    	try {
    		$('#permission-group-detail-permission-struct-backend').jqxTreeGrid("addRow", null, data, "last");
    		$('#set-permission-user-permission-struct-backend').jqxTreeGrid("addRow", null, data, "last");
    		$('#set-permission-group-permission-struct-backend').jqxTreeGrid("addRow", null, data, "last");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}    	
    },
    searchUserListOwnedByOwner: function() { // used in user tab
    	var keyword_elem, params;
    	
    	try {
    		$('#permission-user-user-list').jqxGrid("clear");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	keyword_elem = document.getElementById("permission-user-search-keyword");
    	if (!keyword_elem) {
    		return;
    	}
    	
    	params = {};
    	
    	params.keyword = keyword_elem.value;
    	
    	params.callback = WRPAdminApp.pagescript.callbackSearchUserListOwnedByOwner;
    	
    	WRPAdminApp.PermissionModule.getUserListOwnedByOwner(params);
    },
    callbackSearchUserListOwnedByOwner: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	try {
    		$('#permission-user-user-list').jqxGrid("addrow", null, data, "last");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    },
    getPermissionGroupList: function() {
    	var params, keyword_elem, i, len, obj, list, elem;
    	
    	WRPAdminApp.pagescript._selectedPermissionGroupSid = 0;
    	/*
    	try {
    		document.getElementById("permission-group-detail-name").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("permission-group-detail-description").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	*/
/*
    	try {   
    		$('#permission-group-detail-permission-users-list').jqxGrid("clear");
    		
    		elem = $('#permission-group-detail-permission-struct-sales');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    		
    		elem = $('#permission-group-detail-permission-struct-backend');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
 */   	
    	keyword_elem = document.getElementById("permission-group-search-keyword");
    	if (!keyword_elem) {
    		return;
    	}
    	
    	params = {};
    	
    	params.keyword = keyword_elem.value;
    	
    	try {
    		$('#permission-group-group-list').jqxGrid("clear");
    		$('#permission-group-group-list').jqxGrid("clearselection");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	params.callback = WRPAdminApp.pagescript.callbackGetPermissionGroupList;
    	
    	WRPAdminApp.PermissionModule.getPermissionGroupList(params);
    },
    callbackGetPermissionGroupList: function(data) {
    	
    	if (data === undefined || data.length < 1) {
    		return;
    	}
    	try {
    		$('#permission-group-group-list').jqxGrid("addrow", null, data, "last");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    },
    onPermissionGroupListRowSelect: function() {
    	var row, i, len, obj, list, elem;	
    	/*
    	try {
    		document.getElementById("permission-group-detail-name").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("permission-group-detail-description").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	 */
    	try {   
    		$('#permission-group-detail-permission-users-list').jqxGrid("clear");
    		
    		elem = $('#permission-group-detail-permission-struct-sales');
    		list = elem.jqxTreeGrid("getRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("setCellValue", obj.sid, "permission_flag", 0);
    		}
    		
    		elem = $('#permission-group-detail-permission-struct-backend');
    		list = elem.jqxTreeGrid("getRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("setCellValue", obj.sid, "permission_flag", 0);
    		}
    	} catch (e) {
    		console.warn(e);
    	}

    	row = arguments[0].args.row;
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.PermissionModule.getPermissionGroupInfo({
    		permission_group_sid: row.sid,
    		output_users_name_flag: 1,
    		callback: WRPAdminApp.pagescript.callbackGetPermissionGroupInfo
    	});
    },
    callbackGetPermissionGroupInfo: function(data) {
    	var i, len, obj, list, elem, user_id_list, user_name_list;
    	
    	if (data === undefined) {
    		return;
    	}
    	/*
    	try {
    		document.getElementById("permission-group-detail-name").innerHTML = (data.permission_group_name !== undefined)? data.permission_group_name : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("permission-group-detail-description").innerHTML = (data.description !== undefined)? data.description : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	*/
    	if (data.sales_struct_sid_list !== undefined) {
    		try {
        		list = data.sales_struct_sid_list.split(",");
        		elem = $("#permission-group-detail-permission-struct-sales");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("setCellValue", (obj-1), "permission_flag", 1);
        			}
        		}
        		
        		//elem.jqxTreeGrid("refresh");
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	} else {
    		//$("#permission-group-detail-permission-struct-sales").jqxTreeGrid("render");
    	}
    	
    	if (data.backend_struct_sid_list !== undefined) {
    		try {
        		list = data.backend_struct_sid_list.split(",");
        		elem = $("#permission-group-detail-permission-struct-backend");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("setCellValue", (obj-1), "permission_flag", 1);
        			}
        		}
        		
        		//elem.jqxTreeGrid("refresh");
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	} else {
    		//$("#permission-group-detail-permission-struct-backend").jqxTreeGrid("render");
    	}
    	
    	if (data.user_id_list !== undefined && data.user_name_list !== undefined) {
    		user_id_list = data.user_id_list.split("!@#");
    		user_name_list = data.user_name_list.split("!@#");
    		
    		list = [];
    		
    		for (i = 0; i < user_id_list.length && i < user_name_list.length ; i++) {
    			list.push({
    				user_id: user_id_list[i],
    				user_name: user_name_list[i]
    			});
    		}
    		
    		try {
    			$('#permission-group-detail-permission-users-list').jqxGrid("addrow", null, list, "last");
    		} catch (e) {
    			console.warn(e);
    		}
    	}
    },
    startEditPermissionUser: function(index) {
    	var row, elem;
    	
    	WRPAdminApp.pagescript._selectedUserSid = 0;

    	row = $("#permission-user-user-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-user-id").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-user-name").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {    	    		
    		elem = $('#set-permission-user-permission-struct-sales');
    		list = elem.jqxTreeGrid("getRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    			elem.jqxTreeGrid("setCellValue", obj.sid, "group_permission_flag", 0);
    		}
    		
    		elem = $('#set-permission-user-permission-struct-backend');
    		list = elem.jqxTreeGrid("getRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    			elem.jqxTreeGrid("setCellValue", obj.sid, "group_permission_flag", 0);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    	
    	WRPAdminApp.PermissionModule.getUserInfoBySid({
    		user_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackStartEditPermissionUser
    	});
    },
    callbackStartEditPermissionUser: function(data) {
    	var i, len, obj, list, elem;

    	if (data === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.pagescript._selectedUserSid = data.sid;
    	
    	try {
    		document.getElementById("set-permission-user-id").innerHTML = (data.user_id !== undefined)? data.user_id : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-user-name").innerHTML = (data.user_name !== undefined)? data.user_name : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	if (data.sales_struct_sid_list !== undefined) {
    		try {
        		list = data.sales_struct_sid_list.split(",");
        		elem = $("#set-permission-user-permission-struct-sales");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("checkRow", obj);
        			}
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.backend_struct_sid_list !== undefined) {
    		try {
        		list = data.backend_struct_sid_list.split(",");
        		elem = $("#set-permission-user-permission-struct-backend");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("checkRow", obj);
        			}
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.sales_struct_sid_list_group !== undefined) {
    		try {
        		list = data.sales_struct_sid_list_group.split(",");
        		elem = $("#set-permission-user-permission-struct-sales");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("setCellValue", obj, "group_permission_flag", 1);
        			}
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.backend_struct_sid_list_group !== undefined) {
    		try {
        		list = data.backend_struct_sid_list_group.split(",");
        		elem = $("#set-permission-user-permission-struct-backend");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("setCellValue", obj, "group_permission_flag", 1);
        			}
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	$('#permission-set-permission-user-window').jqxWindow('open');
    },
    toggleSetAllChecked: function(element_id, checked) {
    	var element, rows, i, len, row;
    	
    	element = $("#"+element_id);
    	if (element && element.length > 0) {
    		rows = element.jqxTreeGrid("getRows");
    		if (checked === true) {
    			for (i = 0, len = rows.length; i < len; i++) {
    				row = rows[i];
    				element.jqxTreeGrid("checkRow", row.sid);
    			}
    		} else {
    			for (i = 0, len = rows.length; i < len; i++) {
    				row = rows[i];
    				element.jqxTreeGrid("uncheckRow", row.sid);
    			}
    		}
    	}
    },
    confirmSetPermissionUserInfo: function() {
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		msgBoxType: "YesNo",
    		yesBtnClick: WRPAdminApp.pagescript.requestSetPermissionUserInfo
    	});
    },
    requestSetPermissionUserInfo: function() {
    	var params, elem, list, i, len, obj, mStringBuffer;
    	
    	params = {};
    	
    	elem = $("#set-permission-user-permission-struct-sales");
    	
    	list = elem.jqxTreeGrid("getCheckedRows");
    	
    	mStringBuffer = [];
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if(obj.sid === undefined) {
    			continue;
    		}
    		mStringBuffer.push(obj.sid);
    	}
    	
    	params.sales_permission_struct_sid_list_str = mStringBuffer.join(",");
    	mStringBuffer = undefined;
    	
    	elem = $("#set-permission-user-permission-struct-backend");
    	
    	list = elem.jqxTreeGrid("getCheckedRows");
    	
    	mStringBuffer = [];
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if(obj.sid === undefined) {
    			continue;
    		}
    		mStringBuffer.push(obj.sid);
    	}
    	
    	params.backend_permission_struct_sid_list_str = mStringBuffer.join(",");
    	mStringBuffer = undefined;
    	
    	params.user_sid = WRPAdminApp.pagescript._selectedUserSid;
    	
    	params.callback = WRPAdminApp.pagescript.callbackSetPermissionUserInfo;
    	
    	WRPAdminApp.PermissionModule.setPermissionUserInfo(params);
    },
    callbackSetPermissionUserInfo: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data === 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Completed",
    			okBtnClick: function() {
    	        	$('#permission-set-permission-user-window').jqxWindow('close');    		
    	        	WRPAdminApp.pagescript.searchUserListOwnedByOwner();
    			}
    		});
    	} else {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Error : " + data
    		});
    	}
    },
    initSetPermissionGroupWindow: function() {    
    	var i, len, obj, list, elem;	
    	try {
    		document.getElementById("set-permission-group-name").value = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-group-description").value = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {    	
    		
    		/*
    		elem = $('#set-permission-group-user-list');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    		*/
    		elem = $('#set-permission-group-permission-struct-sales');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    		
    		//elem.jqxTreeGrid("render");
    		
    		elem = $('#set-permission-group-permission-struct-backend');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    		
    		//elem.jqxTreeGrid("render");
    	} catch (e) {
    		console.warn(e);
    	}
    	
    	WRPAdminApp.pagescript._selectedPermissionGroupSid = 0;

    	$('#permission-set-permission-group-window').jqxWindow('open');
    },
    startEditPermissionGroup: function(index) {
    	var row, elem;
    	
    	WRPAdminApp.pagescript._selectedPermissionGroupSid = 0;

    	row = $("#permission-group-group-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-group-name").value = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-group-description").value = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {    		
    		/*
    		elem = $('#set-permission-group-user-list');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    		*/
    		
    		elem = $('#set-permission-group-permission-struct-sales');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    		
    		elem = $('#set-permission-group-permission-struct-backend');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    	
    	WRPAdminApp.PermissionModule.getPermissionGroupInfo({
    		permission_group_sid: row.sid,
    		output_users_name_flag: 0,
    		callback: WRPAdminApp.pagescript.callbackStartEditPermissionGroup
    	});
    },
    callbackStartEditPermissionGroup: function(data) {
    	var i, len, obj, list, elem;

    	if (data === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.pagescript._selectedPermissionGroupSid = data.sid;
    	
    	try {
    		document.getElementById("set-permission-group-name").value = (data.permission_group_name !== undefined)? data.permission_group_name : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-group-description").value = (data.description !== undefined)? data.description : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	/*
    	if (data.users_list !== undefined) {
    		try {
        		list = data.users_list.split(",");
        		elem = $("#set-permission-group-user-list");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("checkRow", obj);
        			}
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	*/
    	if (data.sales_struct_sid_list !== undefined) {
    		try {
        		list = data.sales_struct_sid_list.split(",");
        		elem = $("#set-permission-group-permission-struct-sales");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("checkRow", obj);
        			}
        		}
        		
        		//elem.jqxTreeGrid("render");
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	} else {
    		try {
    			//$("#set-permission-group-permission-struct-sales").jqxTreeGrid("render");
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.backend_struct_sid_list !== undefined) {
    		try {
        		list = data.backend_struct_sid_list.split(",");
        		elem = $("#set-permission-group-permission-struct-backend");

        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("checkRow", obj);
        			}
        		}
        		
        		//elem.jqxTreeGrid("render");
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	} else {
    		try {
    			//$("#set-permission-group-permission-struct-backend").jqxTreeGrid("render");
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}

    	$('#permission-set-permission-group-window').jqxWindow('open');
    },
    confirmSetPermissionGroupInfo: function() {
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		msgBoxType: "YesNo",
    		yesBtnClick: WRPAdminApp.pagescript.requestSetPermissionGroupInfo
    	});
    },
    requestSetPermissionGroupInfo: function() {
    	var params, elem, list, i, len, obj, mStringBuffer;
    	
    	params = {};
    	
    	elem = document.getElementById("set-permission-group-name");
    	if (!elem) {
    		return;
    	}
    	
    	if (elem.value.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Enter permission group name"
    		});
    		return;
    	}
    	
    	params.permission_group_name = elem.value;
    	
    	elem = document.getElementById("set-permission-group-description");
    	if (!elem) {
    		return;
    	}
    	
    	params.description = elem.value;
    	/*
    	elem = $("#set-permission-group-user-list");
    	
    	list = elem.jqxTreeGrid("getCheckedRows");
    	
    	if (list.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select users"
    		});
    		return;
    	}
    	
    	mStringBuffer = [];
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if(obj.sid === undefined) {
    			continue;
    		}
    		mStringBuffer.push(obj.sid);
    	}
    	
    	params.users_list_str = mStringBuffer.join(",");
    	mStringBuffer = undefined;
    	*/
    	elem = $("#set-permission-group-permission-struct-sales");
    	
    	list = elem.jqxTreeGrid("getCheckedRows");
    	
    	mStringBuffer = [];
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if(obj.sid === undefined) {
    			continue;
    		}
    		mStringBuffer.push(obj.sid);
    	}
    	
    	params.sales_permission_struct_sid_list_str = mStringBuffer.join(",");
    	mStringBuffer = undefined;
    	
    	elem = $("#set-permission-group-permission-struct-backend");
    	
    	list = elem.jqxTreeGrid("getCheckedRows");
    	
    	mStringBuffer = [];
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if(obj.sid === undefined) {
    			continue;
    		}
    		mStringBuffer.push(obj.sid);
    	}
    	
    	params.backend_permission_struct_sid_list_str = mStringBuffer.join(",");
    	mStringBuffer = undefined;
    	
    	params.permission_group_sid = WRPAdminApp.pagescript._selectedPermissionGroupSid;
    	
    	params.callback = WRPAdminApp.pagescript.callbackSetPermissionGroupInfo;
    	
    	WRPAdminApp.PermissionModule.setPermissionGroupInfo(params);
    },
    callbackSetPermissionGroupInfo: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data === 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Completed",
    			okBtnClick: function() {
    	        	$('#permission-set-permission-group-window').jqxWindow('close');    
    	        	
    	        	WRPAdminApp.pagescript.getPermissionGroupList();
    			}
    		});
    	} else {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Error : " + data
    		});
    	}
    },
    startEditPermissionGroupUsers: function(index) {
    	var row, elem;
    	
    	WRPAdminApp.pagescript._selectedPermissionGroupSid = 0;

    	row = $("#permission-group-group-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-group-users-name").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-group-users-description").innerHTML = "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {  
    		elem = $('#set-permission-group-users-user-list');
    		list = elem.jqxTreeGrid("getCheckedRows");
    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			elem.jqxTreeGrid("uncheckRow", obj.sid);
    		}
    		
    		//elem.jqxTreeGrid("render");
    	} catch (e) {
    		console.warn(e);
    	}
    	
    	WRPAdminApp.PermissionModule.getPermissionGroupInfo({
    		permission_group_sid: row.sid,
    		output_users_name_flag: 0,
    		callback: WRPAdminApp.pagescript.callbackStartEditPermissionGroupUsers
    	});
    },
    callbackStartEditPermissionGroupUsers: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.pagescript._selectedPermissionGroupSid = data.sid;
    	
    	try {
    		document.getElementById("set-permission-group-users-name").innerHTML = (data.permission_group_name !== undefined)? data.permission_group_name : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("set-permission-group-users-description").innerHTML = (data.description !== undefined)? data.description : "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	if (data.users_list !== undefined) {
    		WRPAdminApp.pagescript._tmp = data.users_list;
    	}
    	
    	WRPAdminApp.PermissionModule.getUserListOwnedByOwner({
    		callback: WRPAdminApp.pagescript.callbackGetUserListOwnedByOwnerInSetPermissionGroupUsers
    	});
    },
    callbackGetUserListOwnedByOwnerInSetPermissionGroupUsers: function(data) {
    	var elem, list, i, len, obj;
    	
    	if (data === undefined) {
    		return;
    	}
    	
    	try {
    		elem = $('#set-permission-group-users-user-list');
    		
    		
    		for (i = 0, len = data.length; i < len; i++) {
    			obj = data[i];
    			if (obj.sid === undefined) {
    				break;
    			}
				if (elem.jqxTreeGrid("getRow",obj.sid) === undefined) {
		    		elem.jqxTreeGrid("addRow", null, obj, "last");
				} else {
					elem.jqxTreeGrid("updateRow", obj.sid, obj);
				}
    		}
    		
    		//elem.jqxTreeGrid("clear");
    		//elem.jqxTreeGrid("addRow", null, data, "last");
    		
    		//elem.jqxTreeGrid("render");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}    
    	
    	if (WRPAdminApp.pagescript._tmp !== undefined) {
    		try {
        		list = WRPAdminApp.pagescript._tmp.split(",");

       		 	WRPAdminApp.pagescript._tmp = undefined;
       		 	
        		for (i = 0, len = list.length; i < len; i++) {
        			obj = parseInt(list[i]);
        			if (!isNaN(obj)) {
        				elem.jqxTreeGrid("checkRow", obj);
        			}
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		} 
    		
    		
    	}
    	$('#permission-set-permission-group-users-window').jqxWindow('open');
    },
    confirmSetPermissionGroupUsersInfo: function() {
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		msgBoxType: "YesNo",
    		yesBtnClick: WRPAdminApp.pagescript.requestSetPermissionGroupUsersInfo
    	});
    },
    requestSetPermissionGroupUsersInfo: function() {
    	var params, elem, list, i, len, obj, mStringBuffer;
    	
    	elem = $("#set-permission-group-users-user-list");
    	
    	list = elem.jqxTreeGrid("getCheckedRows");
    	
    	if (list.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select users"
    		});
    		return;
    	}
    	
    	mStringBuffer = [];
    	
    	for (i = 0, len = list.length; i < len; i++) {
    		obj = list[i];
    		if(obj.sid === undefined) {
    			continue;
    		}
    		mStringBuffer.push(obj.sid);
    	}
    	
    	params = {};
    	params.users_list_str = mStringBuffer.join(",");
    	mStringBuffer = undefined;
    	
    	params.permission_group_sid = WRPAdminApp.pagescript._selectedPermissionGroupSid;
    	
    	params.callback = WRPAdminApp.pagescript.callbackSetPermissionGroupUsersInfo;
    	
    	WRPAdminApp.PermissionModule.setPermissionGroupUsersInfo(params);
    },
    callbackSetPermissionGroupUsersInfo: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data === 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Completed",
    			okBtnClick: function() {
    	        	$('#permission-set-permission-group-users-window').jqxWindow('close');   
    	    		$('#permission-group-detail-permission-users-list').jqxGrid("clear");
    	        	
    	        	WRPAdminApp.PermissionModule.getPermissionGroupInfo({
    	        		permission_group_sid: WRPAdminApp.pagescript._selectedPermissionGroupSid,
    	        		output_users_name_flag: 1,
    	        		callback: WRPAdminApp.pagescript.callbackGetPermissionGroupInfo
    	        	});
    			}
    		});
    	} else {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Error : " + data
    		});
    	}
    }
};