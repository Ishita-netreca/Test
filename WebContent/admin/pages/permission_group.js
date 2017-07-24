/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedCategorySid: 0,
    _selectedSubCategorySid: 0,
    _selectedRoleSid: 0,
    _selectedPermissionGroupSid: 0,
    _selectedMarketCode: undefined,
    _selectedMarketSid: 0,
    _selectedDistrictCode: undefined,
    _selectedDistrictSid: 0,
    init: function() {
    	try {
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="permission_group"]').addShadowedImage('img/icon/permission_01.png');
		} catch (e) {
			
		}
		
		var components;
    	
    	components = $('#permission-new-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 220);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 180) });
    	}
    	
    	components = $('#jqx-sys-permission-group-list');
		
    	if (components) {        	
    		components.jqxGrid(
    			{
            	   width: '100%',
            	   height: '100%',
            	   source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
							{ name: "sid", type: "number" },
	    					{ name: "name", type: "string" },
	    					{ name: "user_id", type: "string" },
	    					{ name: "updateDate", type: "date" }
						]
					}),
            	   showfilterrow: false,
            	   filterable: true,
            	   sortable: true,
            	   columnsresize:true,
            	   theme: 'arctic',
            	   columns: [
            		   { text: "sid", datafield: "sid", hidden: true },
     				   { text: "Name", datafield: "name", width: "30%" },
    				   { text: "Update Date", datafield: "updateDate", width: "40%", filtertype: "range", cellsformat: 'MM/dd/yyyy HH:mm:ss' },
     				   { text: "Updater", datafield: "user_id", width: "30%" }
                     ]
    			});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.getPermissionGroupInfo);
    		//components.on("rowselect", );
    		//elem.on("rowselect", WRPAdminApp.pagescript.getPermissionSet);

    		components.on("rowdoubleclick", WRPAdminApp.pagescript.getPermissionEditPop);

    		$("#excel_system_permission_group").click(function(){
    			$('#jqx-sys-permission-group-list').jqxGrid('exportdata', 'xls', 'jqx-permission-group-list');
    		});
    	}
    	
    	components = $('#sys-permission-group-user-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "userId", type: "string" },
    					{ name: "userName", type: "string" },
    					{ name: "tel", type: "string" },
    					{ name: "email", type: "string" },
    					{ name: "jobPosition", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    			columns: [
 				   { text: "ID", datafield: "userId", width: "20%" },
				   { text: "Name", datafield: "userName", width: "20%" },
				   { text: "Tel", datafield: "tel", width: "20%"},
				   { text: "Email", datafield: "email", width: "20%"},
				   { text: "Position", datafield: "jobPosition", width: "20%"}
				]
    		});
    		$("#excel_permission_group_user").click(function(){
    			$('#sys-permission-group-user-list').jqxGrid('exportdata', 'xls', 'jqx-permission-group-users');
 			});
    	}

    	components = $("#group-sales-permission-setting");
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "page_name", type: "string" },
    					{ name: "all", type: "number" },
    					{ name: "view", type: "number" },
    					{ name: "add", type: "number" },
    					{ name: "edit", type: "number" },
    				]
    			}),
    			filterable: false,
    			sortable: false,
    			editable: true,
    	        groupable: false,
    	        selectionmode: 'none',
    			columns: [
 				   { text: "Name", datafield: "page_name", width: "40%", editable: false },
				   { text: "", datafield: "all", width: "15%", columntype: 'checkbox', align: 'center'},
				   { text: "View", datafield: "view", width: "15%", columntype: 'checkbox', align: 'center',
					 cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
						 if (value > 0) {
							value = 1;
						} else if (value === -1) {
							return "";
						} else {
							value = 0;
						}
					 }
			       },
				   { text: "Add", datafield: "add", width: "15%", columntype: 'checkbox', align: 'center' ,
			    	 cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
			    		 if (value > 0) {
							value = 1;
						} else if (value === -1) {
							return "";
						} else {
							value = 0;
						}
			    	   }
				   },
				   { text: "Edit", datafield: "edit", width: "15%", columntype: 'checkbox', align: 'center' ,
					   cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
							if (value > 0) {
								value = 1;
							} else if (value === -1) {
								return "";
							} else {
								value = 0;
							}
						}
					}
				]
    		});
    		/*
    		components.on('cellvaluechanged', function (event) {
			    var datafield = event.args.datafield;
			    var rowBoundIndex = event.args.rowindex;
			    var value = event.args.newvalue;
			    
			    if(datafield == "all"){
			    	if(value == true){		    		
			    		$("#group-sales-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "view", true);
		    			$("#group-sales-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "add", true);
			    		$("#group-sales-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "edit", true);
			    	}else{
			    		$("#group-sales-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "view", false);
			    		$("#group-sales-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "add", false);
			    		$("#group-sales-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "edit", false);
			    	}
			    }else{
			    	return;
			    }
			});
			*/
    	}
    	
    	components = $("#group-backend-permission-setting");
    	if (components) {
    		components.jqxGrid({
    			width: "99%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "page_name", type: "string" },
    					{ name: "all", type: "number" },
    					{ name: "view", type: "number" },
    					{ name: "add", type: "number" },
    					{ name: "edit", type: "number" },
    				]
    			}),
    			filterable: false,
    			sortable: false,
    			editable: true,
    	        groupable: false,
    	        selectionmode: 'none',
    			columns: [
 				   { text: "Name", datafield: "page_name", width: "40%", editable: false },
				   { text: "", datafield: "all", width: "15%", columntype: 'checkbox', align: 'center'  },
				   { text: "View", datafield: "view", width: "15%", columntype: 'checkbox', align: 'center',
					   cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
						   if (value > 0) {
								value = 1;
							} else if (value === -1) {
								return "";
							} else {
								value = 0;
							}
					   }
		         },
				   { text: "Add", datafield: "add", width: "15%", columntype: 'checkbox', align: 'center',
					   cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
						   if (value > 0) {
								value = 1;
							} else if (value === -1) {
								return "";
							} else {
								value = 0;
							}
						}
			         },
				   { text: "Edit", datafield: "edit", width: "15%", columntype: 'checkbox', align: 'center',
						   cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
							   if (value > 0) {
									value = 1;
								} else if (value === -1) {
									return "";
								} else {
									value = 0;
								}
						   }
				   }
				]
    		});
    		
    		components.on('cellvaluechanged', function (event) {
			    var datafield = event.args.datafield;
			    var rowBoundIndex = event.args.rowindex;
			    var value = event.args.newvalue;
			    var row = $("#group-backend-permission-setting").jqxGrid("getrowdata", rowBoundIndex);
			    
			   // console.log(row);
			    
			    if(datafield == "all"){
			    	if(value == true){
			    		if (row.view > -1) {
				    		$("#group-backend-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "view", 1);
			    		}
			    		if (row.add > -1) {
				    		$("#group-backend-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "add", 1);
			    		}
			    		if (row.edit > -1) {
				    		$("#group-backend-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "edit", 1);
			    		}
			    		
			    	}else{
			    		
			    		if (row.view > -1) {
				    		$("#group-backend-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "view", 0);
			    		}
			    		if (row.add > -1) {
				    		$("#group-backend-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "add", 0);
			    		}
			    		if (row.edit > -1) {
				    		$("#group-backend-permission-setting").jqxGrid('setcellvalue', rowBoundIndex, "edit", 0);
			    		}
			    		
			    	}
			    	
			    }else{
			    	
			    }
		    	$("#group-backend-permission-setting").jqxGrid("refresh");
			});
			
    	}
    	
        WRPAdminApp.pagescript.getPermissionGroupList();
    },
    getPermissionGroupList: function() {

        WRPAdminApp.pagescript._selectedPermissionGroupSid = 0;

        try {
            document.getElementById("sys-conf-permission-group-name").value = "";
        } catch (e) {
            console.warn(e);
        }

        try { document.getElementById("sys-conf-sales-permission-set-list").innerHTML = ""; } catch (e) {}
        try { document.getElementById("sys-conf-backend-permission-set-list").innerHTML = ""; } catch (e) {}

        $.ajax({
            url: "ajax/permission_group/getPermissionGroupList.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;   		
            	elem = $("#jqx-sys-permission-group-list");
    		
            	if(elem){
            		elem.jqxGrid("clear");
            		elem.jqxGrid("addrow", null, result.data, "last");
            		
            	}
            }
        });
    },
    getPermissionSet: function(){
    	var elem, data;
    	
    	data = [
    		{page_name:"dashboard", all:false, view:1, add:0, edit:false},
    		{page_name:"dashboard", all:false, view:1, add:0, edit:false},
    		{page_name:"dashboard", all:false, view:2, add:1, edit:false},
    		{page_name:"dashboard", all:false, view:false, add:false, edit:false},
    		{page_name:"dashboard", all:false, view:false, add:false, edit:false},
    		{page_name:"dashboard", all:false, view:false, add:false, edit:false},
    		{page_name:"dashboard", all:false, view:false, add:false, edit:false},
    	];
    	elem = $("#group-sales-permission-setting");
		if (elem) {
			elem.jqxGrid("clear");
			//elem.jqxGrid("addRow", null, data, "last");		
		}
		
		elem = $("#group-backend-permission-setting");
		if (elem) {
			elem.jqxGrid("clear");
			elem.jqxGrid("addRow", null, data, "last");		
		}
    },
    getBackendPermissionGroupData: function() {
    	if (WRPAdminApp.pagescript._selectedPermissionGroupSid === undefined) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select Permission group"
    		});
    		return;
    	}
    	
    	$.ajax({
    		url: "ajax/permission_group/getBackendPermissionGroupData.jsp",
    		data: {
    			permission_group_sid: WRPAdminApp.pagescript._selectedPermissionGroupSid
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, column, obj, refined, obj2, prefix, grid_column;
    			
    			data = (result.data)?result.data:result;
    			if (!data) return;
    			
    			if (data.sid === undefined || data.permission_group_sid === undefined) {
    				return;
    			}
    			
    			refined = [];
    			
    			for (column in data) {
    				if (column == "sid" || column == "permission_group_sid") {
    					continue;
    				}
    				
    				if (column.lastIndexOf("_") < 0 || column.lastIndexOf("_") > column.length - 2) {
    					continue;
    				}
    				
    				prefix = column.substring(0, column.lastIndexOf("_"));
    				grid_column = column.substring(column.lastIndexOf("_") + 1);
    				
    				obj2 = refined[prefix];
    				
    				if (obj2 !== undefined) {
    					obj2[grid_column] = data[column];
    					if (obj2.view !== undefined && obj2.view > 0) {
    						if (obj2.add !== undefined && obj2.add > 0) {
    							if (obj2.edit !== undefined && obj2.edit > 0) {
    	    						obj2.all = 1;
    	    					}
        					}
    					}
    				} else {
    					obj2 = {};
    					obj2.prefix = prefix;
    					obj2[grid_column] = data[column];
    					obj2.page_name = prefix.replace(/_/gi, " ").trim();
    					obj2.permission_group_sid = data.permission_group_sid;
    					obj2.sid = data.sid;
    					refined.push(obj2);
    					refined[prefix] = obj2;
    				}
    			}
    			
    			for (key in refined) {
    				if (isNaN(parseInt(key))) {
    					refined[key] = undefined;
    					delete refined[key];
    					continue;
    				}
    				
    				if (refined[key].view === undefined) { // 값이 -1??경우 체크박스 출력 ?�됨
    					refined[key].view = -1;
    				}
    				
    				if (refined[key].add === undefined) {
    					refined[key].add = -1;
    				}
    				
    				if (refined[key].edit === undefined) {
    					refined[key].edit = -1;
    				}
    			}
    			
    			obj = $("#group-backend-permission-setting");
    			if (obj) {
    				obj.jqxGrid("clear");
    				obj.jqxGrid("addRow", null, refined, "last");		
    			}    			
    		}
    	});
    },
    getPermissionGroupInfo: function(event) {
        var rowdata;
        
        rowdata = event.args.row;

        try { document.getElementById("sys-conf-sales-permission-set-list").innerHTML = ""; } catch (e) {}
        try { document.getElementById("sys-conf-backend-permission-set-list").innerHTML = ""; } catch (e) {}

        $.ajax({
            url: "ajax/permission_group/getPermissionGroupInfo.jsp",
            data: {
                permissionGroupSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, salesKey, backendKey;

                data = result.data;

                WRPAdminApp.pagescript._selectedPermissionGroupSid = data.sid;

                if (!data) return;

                try {
                    document.getElementById("sys-conf-permission-group-name").value = (data.name !== undefined && data.name !== null)? data.name : '';
                } catch (e) {
                    console.warn(e);
                }
/*
                if (data.salesPermission) {
                    for (salesKey in data.salesPermission) {
                        WRPAdminApp.pagescript.appendPermissionElement(data.salesPermission[salesKey], salesKey, document.getElementById("sys-conf-sales-permission-set-list"));
                    }
                }

                if (data.backendPermission) {
                    for (backendKey in data.backendPermission) {
                        WRPAdminApp.pagescript.appendPermissionElement(data.backendPermission[backendKey], backendKey, document.getElementById("sys-conf-backend-permission-set-list"));
                    }
                }
*/				
                WRPAdminApp.pagescript.getGroupUserList();
                WRPAdminApp.pagescript.getBackendPermissionGroupData();
            }
        })
    },
    getGroupUserList: function(event) {

        $.ajax({
            url: "ajax/permission_group/getGroupUserList.jsp",
            data: {
                permissionGroupSid: WRPAdminApp.pagescript._selectedPermissionGroupSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			
    			data = result.data;
    			
    			if (!data) return;
    			
    			elem = $("#sys-permission-group-user-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");		
    				}
    			}
            }
        });
    },
    appendPermissionElement: function() {
        var newElem, parent, name, permissionObj, i, len, obj, innerHTML, childrenContainer;
        if (arguments.length < 3) {
            console.warn("Input parameter [ permission object, name, page element ]");
            return;
        }

        permissionObj = arguments[0];
        name = arguments[1];
        parent = arguments[2];

        i = 0;
        while(parent) {
            try {
                if (parent.className.indexOf("permission-set-list") > -1) break;
            } catch (e) {

            }
            i += 0.5;
            parent = parent.parentNode;
        }

        newElem = document.createElement("div");
        if (i < 2) {
            newElem.className = "container";
        } else  {
            newElem.className = "component";
        }

        if (permissionObj.children) {
            childrenContainer = document.createElement("div");
            if (i < 1) {
                childrenContainer.className = "containers";
            } else {
                childrenContainer.className = "components";
            }
        }

        parent = arguments[2];

        innerHTML = [];
        innerHTML.push('<div class="name">');
        innerHTML.push(name);
        innerHTML.push('</div>');
        innerHTML.push('<div class="desc" title="');
        innerHTML.push(permissionObj.desc);
        innerHTML.push('">');
        innerHTML.push(permissionObj.desc);
        innerHTML.push('</div>');
        innerHTML.push('<div class="checkbox">');
        if (permissionObj.allow === true) innerHTML.push('<input type="checkbox" checked/>');
        else innerHTML.push('<input type="checkbox"/>');
        innerHTML.push('</div>');

        newElem.innerHTML = innerHTML.join("");
        innerHTML = undefined;

        parent.appendChild(newElem);

        if (permissionObj.children) {
            newElem.appendChild(childrenContainer);
            for (name in permissionObj.children) {
                WRPAdminApp.pagescript.appendPermissionElement(permissionObj.children[name], name, childrenContainer);
            }
        }
    },
    getPermissionEditPop: function(event) {
        var rowdata;
        
        rowdata = event.args.row.bounddata;
        
        $.ajax({
            url: "ajax/permission_group/getPermissionGroupInfo.jsp",
            data: {
                permissionGroupSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, salesKey, backendKey;

                data = result.data;

                WRPAdminApp.pagescript._selectedPermissionGroupSid = data.sid;

                if (!data) return;

                try {
                    document.getElementById("sys-conf-permission-group-name-pop").value = (data.name !== undefined && data.name !== null)? data.name : '';
                } catch (e) {
                    console.warn(e);
                }
                $('#permission-new-window').jqxWindow('open');

            }
        });
    },
    addPermissionPop: function() {
         try {
             document.getElementById("sys-conf-permission-group-name-pop").value = '';
         } catch (e) {
             console.warn(e);
         }
         WRPAdminApp.pagescript._selectedPermissionGroupSid = 0;
         $('#permission-new-window').jqxWindow('open');

    },
    setPermissionGroupInfo: function() {
        var data;

        if (WRPAdminApp.pagescript._selectedPermissionGroupSid < 0) {
            return;
        }

        data = {};

        try {
            data.groupName = document.getElementById("sys-conf-permission-group-name-pop").value;
            if(data.groupName.length < 1){
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Permission Group Name"
            	});
            	return;
            }
        } catch (e) {
            console.warn(e);
            data = undefined;
            return;
        }

        data.permissionGroupSid = WRPAdminApp.pagescript._selectedPermissionGroupSid;

        $.ajax({
            url: "ajax/permission_group/setPermissionGroupInfo.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
            		WRPCommon.MsgBoxModule.alert({
            			message: "Completed",
            			okBtnClick: function(){
                            $('#permission-new-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getPermissionGroupList();
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
    /*
     param
     0: Parent Object
     1: Children Element
     */
    getPermissionObject: function() {
        var parent, children, i, len, elem, name, newObj;

        if (arguments.length < 2) {
            console.warn("Input parameters [Parent Object, Children Element]");
            return;
        }

        parent = arguments[0];
        children = arguments[1];

        for (i = 0, len = children.length; i < len; i++) {
            try {
                elem = children[i];
                newObj = {};
                if (elem.children.length > 2) {
                    parent[elem.children[0].innerText] = newObj;
                    newObj.desc = elem.children[1].innerText;
                    newObj.allow = elem.children[2].children[0].checked;
                    if (elem.children.length > 3) {// contains children
                        newObj.children = {};
                        WRPAdminApp.pagescript.getPermissionObject(newObj.children, elem.children[3].children); // [class=containers].children, [class=components].children
                    }
                }
            } catch (e) {
                console.warn(e);
            }
        }

        return parent;
    },
    saveSalesPermissionInfo: function() {
        var savingObj, permissionSetList, i, len, elem, key, j, len2, key2, elem2, storeId;

        if (WRPAdminApp.pagescript._selectedPermissionGroupSid === undefined || WRPAdminApp.pagescript._selectedPermissionGroupSid == 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select Group"
    		});
            return;
        }

        permissionSetList = document.getElementById("sys-conf-sales-permission-set-list");
        if (!permissionSetList) return;

        savingObj = WRPAdminApp.pagescript.getPermissionObject({}, permissionSetList.children);

        $.ajax({
            url: "ajax/permission_group/setGroupSalesPermissionInfo.jsp",
            data: {
                storeId: storeId,
                permissionGroupSid: WRPAdminApp.pagescript._selectedPermissionGroupSid,
                permissionInfoString: JSON.stringify(savingObj)
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
            		WRPCommon.MsgBoxModule.alert({
            			message: "Completed"
            		});
                } else {
            		WRPCommon.MsgBoxModule.alert({
            			message: "Error : " + result
            		});
                }
            }
        });
    },
    saveBackendPermissionInfo: function() {
        var savingObj, permissionSetList, i, len, elem, key, j, len2, key2, elem2, storeId;

        if (WRPAdminApp.pagescript._selectedPermissionGroupSid === undefined || WRPAdminApp.pagescript._selectedPermissionGroupSid == 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select Group"
    		});
            return;
        }

        permissionSetList = document.getElementById("sys-conf-backend-permission-set-list");
        if (!permissionSetList) return;

        savingObj = WRPAdminApp.pagescript.getPermissionObject({}, permissionSetList.children);

        $.ajax({
            url: "ajax/permission_group/setGroupBackendPermissionInfo.jsp",
            data: {
                storeId: storeId,
                permissionGroupSid: WRPAdminApp.pagescript._selectedPermissionGroupSid,
                permissionInfoString: JSON.stringify(savingObj)
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
            		WRPCommon.MsgBoxModule.alert({
            			message: "Completed"
            		});
                } else {
            		WRPCommon.MsgBoxModule.alert({
            			message: "Error : " + result
            		});
                }
            }
        });
    },
    setBackendPermissionGroupData: function() {
    	var obj, list, i, len, key, requestObj, sid, permission_group_sid;
    	
        if (WRPAdminApp.pagescript._selectedPermissionGroupSid === undefined || WRPAdminApp.pagescript._selectedPermissionGroupSid == 0) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "Select Group"
        	});
            return;
        }
        
        obj = $("#group-backend-permission-setting");
        
        if (!obj) {
        	return;
        }
        
        list = obj.jqxGrid("getrows");
        
        requestObj = {};
        
        for (i = 0, len = list.length; i < len; i++) {
        	obj = list[i];
        	if (obj.prefix === undefined) {
        		continue;
        	}
        	
        	if (sid === undefined && obj.sid !== undefined) {
        		sid = obj.sid;
        	}
        	
        	if (permission_group_sid === undefined) {
        		permission_group_sid = WRPAdminApp.pagescript._selectedPermissionGroupSid;
        	}
        	
        	if (obj.view !== undefined && obj.view !== -1) {
        		requestObj[obj.prefix+"_view"] = obj.view;
        	}
        	
        	if (obj.add !== undefined && obj.add !== -1) {
        		requestObj[obj.prefix+"_add"] = obj.add;
        	}
        	
        	if (obj.edit !== undefined && obj.edit !== -1) {
        		requestObj[obj.prefix+"_edit"] = obj.edit;
        	}
        }
        
        
        $.ajax({
        	url: "ajax/permission_group/setBackendPermissionGroupData.jsp",
        	data: { 
        		sid: sid,
        		permission_group_sid: WRPAdminApp.pagescript._selectedPermissionGroupSid,
        		request_payload: JSON.stringify(requestObj)
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
            		WRPCommon.MsgBoxModule.alert({
            			message: "Completed"
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