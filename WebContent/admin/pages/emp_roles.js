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
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="emp_roles"]').addShadowedImage('img/icon/tree_01.png');
		} catch (e) {
			
		}
		
		var components;
    	
		components = $('#role-new-window');
    	if (components) {
    		components.jqxWindow("width", 550);
    		components.jqxWindow("height", 220);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 180) });
    	}

    	
    	components = $('#jqx-sys-conf-user-role-list');
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
    					{ name: "roleName", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    			columns: [
 				   { text: "ID", datafield: "userId", width: "30%" },
				   { text: "Name", datafield: "userName", width: "40%" },
				   { text: "Role", datafield: "roleName", width: "30%"},
				]
    		});
    		$("#excel_sys_user_role_list").click(function(){
    			$('#jqx-sys-conf-user-role-list').jqxGrid('exportdata', 'xls', 'jqx-user-role-list');
 			});
    	}
    	
    	
        WRPAdminApp.pagescript.getRoleList();
    },
    getRoleList: function() {
        WRPAdminApp.pagescript._selectedRoleSid = 0;

        $.ajax({
            url: "ajax/role/getRoleList.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		
            		row["sid"] = result.data[i].sid;
            		row["name"] = result.data[i].name;
            		row["description"] = result.data[i].description;
            		row["updateDate"] = WRPAdminApp.timeZone(result.data[i].updateDate);
            		datarow[i] = row;

            	}
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
    					{ name: "name", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "updateDate", type: "date" }
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-sys-conf-role");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-sys-conf-role"></div>';
            	}
    		
            	elem = $("#jqx-sys-conf-role");
    		
            	if(elem){
            		elem.jqxGrid(
            			{
	                	   width: '100%',
	                	   height: '100%',
	                	   source: dataAdapter,
	                	   showfilterrow: false,
	                	   filterable: true,
	                	   sortable: true,
	                	   columnsresize:true,
	                	   theme: 'arctic',
	                	   columns: [
	                		   { text: "sid", datafield: "sid", hidden: true },
	         				   { text: "Name", datafield: "name", width: "15%" },
	        				   { text: "Description", datafield: "description", width: "70%" },
	        				   { text: "Update Date", datafield: "updateDate", width: "15%", filtertype: "range", cellsformat: 'MM/dd/yyyy HH:mm:ss' }
		                     ]
            			});
            		
            		elem.on("rowselect", WRPAdminApp.pagescript.getRoleInfo);
            		elem.on("rowselect", WRPAdminApp.pagescript.getUserListInRole);
            		elem.on("rowdoubleclick", WRPAdminApp.pagescript.getRoleInfoPop);
            		
            		$("#excel_system_role").click(function(){
            			$('#jqx-sys-conf-role').jqxGrid('exportdata', 'xls', 'jqx-system-role-list');
         			});
            	}
            }
        });
    },
    getRoleInfo: function(event) {
        var rowdata;
        
        rowdata = event.args.row;
        
        $.ajax({
            url: "ajax/role/getRoleInfo.jsp",
            data: {
                roleSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedRoleSid = data.sid;

                try {
                    document.getElementById("sys-conf-role-name").value = (data.name !== undefined && data.name !== null) ? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("sys-conf-role-description").value = (data.description !== undefined && data.description !== null) ? data.description : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

            }
        });
    },
    getRoleInfoPop: function(event) {
        var rowdata;
        
        rowdata = event.args.row.bounddata;
        
        $.ajax({
            url: "ajax/role/getRoleInfo.jsp",
            data: {
                roleSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedRoleSid = data.sid;

                try {
                    document.getElementById("sys-conf-role-name-pop").value = (data.name !== undefined && data.name !== null) ? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("sys-conf-role-description-pop").value = (data.description !== undefined && data.description !== null) ? data.description : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }
                $('#role-new-window').jqxWindow('open');
            }
        });
    },
    getUserListInRole: function(event) {
    	var rowdata;
    	rowdata = event.args.row;
        $.ajax({
            url: "ajax/user/getUserList.jsp",
            data: {
                userRoleSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			
    			data = result.data;
    			
    			if (!data) return;
    			
    			elem = $("#jqx-sys-conf-user-role-list");
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
    initRoleInfo: function() {
    	/* 170117 jh : information message */
    	//alert("Enter a new role information at the bottom section.");
    	/**/
    	
        WRPAdminApp.pagescript._selectedRoleSid = 0;

        try {
            document.getElementById("sys-conf-role-name-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("sys-conf-role-description-pop").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        $('#role-new-window').jqxWindow('open');

    },
    setRoleInfo: function() {
        var data;

        data = {};

        data.roleSid = parseInt(WRPAdminApp.pagescript._selectedRoleSid);
        if (isNaN(data.roleSid)) {
            console.warn("Role sid error");
            data = undefined;
            return;
        }

        try {
            data.name = document.getElementById("sys-conf-role-name-pop").value;
            if (data.name.length < 1) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "You have to input role name"
            	});
                data = undefined;
                return;
            }
        } catch (e) {
            console.warn(e);
            data = undefined;
            return;
        }

        try {
            data.description = document.getElementById("sys-conf-role-description-pop").value;
        } catch (e) {
            console.warn(e);
            data = undefined;
            return;
        }

        $.ajax({
            url: "ajax/role/setRoleInfo.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Completed",
                		okBtnClick: function(){
                            $('#role-new-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getRoleList();
                		}
                	});
                } else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error : " + result
                	});
                }
            }
            }
        );
    }
};