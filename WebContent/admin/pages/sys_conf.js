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
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="item_category"]').addShadowedImage('img/icon/category_01.png');
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="chart_of_account"]').addShadowedImage('img/icon/chart_01.png');
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="dt_setup"]').addShadowedImage('img/icon/datetime_02.png');
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="emp_roles"]').addShadowedImage('img/icon/tree_01.png');
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="permission_group"]').addShadowedImage('img/icon/permission_01.png');
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="store_location"]').addShadowedImage('img/icon/map_01.png');
		} catch (e) {
			
		}
		
		var components;
		
		components = $('#category-info-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 220);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 180) });
    	}
    	
    	components = $('#sub-category-info-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 250);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 180) });
    	}
    	
		components = $('#role-new-window');
    	if (components) {
    		components.jqxWindow("width", 550);
    		components.jqxWindow("height", 220);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 180) });
    	}
    	
    	components = $('#permission-new-window');
    	if (components) {
    		components.jqxWindow("width", 500);
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
    	
    	components = $('#jqx-sys-market-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "marketCode", type: "string" },
    					{ name: "name", type: "string" },
    					{ name: "tel", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    			columns: [
 				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "Market Code", datafield: "marketCode", width: "30%", align:'center', cellsalign:'center' },
				   { text: "Description", datafield: "name", width: "40%", align:'center', cellsalign:'center' },
				   { text: "Tel", datafield: "tel", width: "30%", align:'center', cellsalign:'center' },
				]
    		});
    		$("#jqx-sys-market-list").on('rowselect', WRPAdminApp.pagescript.getDistrictList);
    		$("#jqx-sys-market-list").on('rowdoubleclick', WRPAdminApp.pagescript.getMarketInfo);
    		$("#excel_sys_market_list").click(function(){
    			$('#jqx-sys-market-list').jqxGrid('exportdata', 'xls', 'jqx-sys-market-list');
 			});
    		
    	}
    	
    	components = $('#jqx-sys-district-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "districtCode", type: "string" },
    					{ name: "name", type: "string" },
    					{ name: "tel", type: "string" },
    					{ name: "parentMarketCode", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    			columns: [
 				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "District Code", datafield: "districtCode", width: "25%", align:'center', cellsalign:'center' },
				   { text: "Description", datafield: "name", width: "25%", align:'center', cellsalign:'center' },
				   { text: "Tel", datafield: "tel", width: "25%", align:'center', cellsalign:'center' },
				   { text: "Dist.", datafield: "parentMarketCode", width: "25%", align:'center', cellsalign:'center' }
				]
    		});
    		$("#jqx-sys-district-list").on('rowdoubleclick', WRPAdminApp.pagescript.getDistrictInfo);
    		$("#excel_sys_district_list").click(function(){
    			$('#jqx-sys-district-list').jqxGrid('exportdata', 'xls', 'jqx-sys-district-list');
 			});
    		
    	}

    	
    	components = $('#jqx-timezone-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "timezone_id", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "offset", type: "date"}
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    			columns: [
 				   { datafield: "sid", hidden: true },
				   { text: "Description", datafield: "description", width: "80%"},
				   { text: "Time Offset", datafield: "offset", width: "20%"}
				]
    		});
    		$("#excel_permission_group_user").click(function(){
    			$('#sys-permission-group-user-list').jqxGrid('exportdata', 'xls', 'jqx-permission-group-users');
 			});
    	}
    	
        WRPAdminApp.pagescript.getCategoryList();
        WRPAdminApp.pagescript.getRoleList();
        WRPAdminApp.pagescript.getPermissionGroupList();
        WRPAdminApp.pagescript.getMarketList();
        
        WRPAdminApp.pagescript.getTimeZoneList();
    },
    getCategoryList: function() {
        var storeId;

        WRPAdminApp.pagescript._selectedCategorySid = 0;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        var elem;
    	var datarow = new Array();
    	
    	var source = 
		{
			localdata: datarow,
			datafields:
				[
					{ name: "sid", type: "number" },
					{ name: "Category", type: "string" },
					{ name: "SubCategory", type: "string" }
				],
				datatype: "json"
		};
		
    	var dataAdapter = new $.jqx.dataAdapter(source);
		elem = $("#jqx-sys-sub-category-list");
		if (elem) {
			elem[0].parentNode.innerHTML = '<div id="jqx-sys-sub-category-list"></div>';
		}

		elem = $("#jqx-sys-sub-category-list");

		if (elem) {
			elem.jqxGrid({
				width : '100%',
				height : '100%',
				source : dataAdapter,
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : [ 
					{ text: 'Sub Category', datafield: 'SubCategory', width: '50%', cellsalign:'center', align: 'center'},
					{ text: 'Category', datafield: 'Category', width: '50%', cellsalign:'center', align: 'center'},
				 ]
			});
		}
		
        $.ajax({
            url: "ajax/category/getCategoriesByParentSid.jsp",
            data: {
                storeId: storeId,
                parentSid: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
            	var innerHTML= [];
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		
            		row["sid"] = result.data[i].sid;
            		row["Category"] = result.data[i].categoryName;
            		
            		datarow[i] = row;
            		
            		innerHTML.push('<option value="');
                    innerHTML.push(result.data[i].sid);
                    if (i == 0) {
                        innerHTML.push('" selected>');
                    } else {
                        innerHTML.push('">');
                    }
                    innerHTML.push(result.data[i].categoryName);
                    innerHTML.push('</option>');
            	}
            	
            	try {
                    document.getElementById("sys-conf-parent-category-name").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "Category", type: "string" },
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-sys-category-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-sys-category-list"></div>';
            	}
    		
            	elem = $("#jqx-sys-category-list");
    		
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
	                		   { text: 'Category', datafield: 'Category', width: '100%', cellsalign:'center', align: 'center'},
		                     ]
            			});
            		
            		$("#jqx-sys-category-list").on('rowselect', WRPAdminApp.pagescript.getSubCategoryList);
            		$("#jqx-sys-category-list").on('rowdoubleclick', WRPAdminApp.pagescript.getCategoryInfo);
            	}
            }
        });
    },
    getSubCategoryList: function(event) {
        var storeId, rowdata;

        if(arguments.length > 0){
        	rowdata = event.args.row;
        	WRPAdminApp.pagescript._selectedSubCategorySid = 0;
        	WRPAdminApp.pagescript._selectedCategorySid = rowdata.sid;
        }else{
        	var getselectedrowindexes = $('#jqx-sys-category-list').jqxGrid('getselectedrowindexes');
            var rowdata = $('#jqx-sys-category-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
            WRPAdminApp.pagescript._selectedSubCategorySid = 0;
            WRPAdminApp.pagescript._selectedCategorySid = rowdata.sid;
        }
       
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/getCategoriesByParentSid.jsp",
            data: {
                storeId: storeId,
                parentSid: WRPAdminApp.pagescript._selectedCategorySid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
        	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		
            		row["sid"] = result.data[i].sid;
            		row["Category"] = result.data[i].categoryName;
            		row["SubCategory"] = result.data[i].subCategoryName;
            		
            		datarow[i] = row;
            		
            	}
            	
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "Category", type: "string" },
						{ name: "SubCategory", type: "string" }
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-sys-sub-category-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-sys-sub-category-list"></div>';
            	}
    		
            	elem = $("#jqx-sys-sub-category-list");
    		
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
	                		   { text: 'Sub Category', datafield: 'SubCategory', width: '50%', cellsalign:'center', align: 'center'},
	                		   { text: 'Category', datafield: 'Category', width: '50%', cellsalign:'center', align: 'center'},
		                     ]
            			});
           
            		$("#jqx-sys-sub-category-list").on('rowdoubleclick', WRPAdminApp.pagescript.getSubCategoryInfo);
            	}
            }
        });
    },
    getCategoryInfo: function(event) {
        var storeId, rowdata;

        rowdata = event.args.row.bounddata;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/getCategoryInfoBySid.jsp",
            data: {
                categorySid: rowdata.sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data[0];
                if (!data) return;

                WRPAdminApp.pagescript._selectedCategorySid = data.sid;

                try {
                    document.getElementById("sys-conf-input-category-name").value = data.categoryName;
                } catch (e) {
                    console.warn(e);
                    return;
                }
                $('#category-info-window').jqxWindow('open');
            }
        });
    },
    initCategoryInfo: function() {
        WRPAdminApp.pagescript._selectedCategorySid = 0;

        try {
            document.getElementById("sys-conf-input-category-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        $('#category-info-window').jqxWindow('open');
    },
    setCategoryInfo: function() {
        var storeId, categoryName;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            categoryName = document.getElementById("sys-conf-input-category-name").value;
            if (categoryName.length == 0) {
                alert("Input Category Name");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/updateCategoryInfo.jsp",
            data: {
                storeId: storeId,
                categoryName: categoryName,
                categorySid: WRPAdminApp.pagescript._selectedCategorySid,
                parentSid: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete");
                    WRPAdminApp.pagescript.getCategoryList();
                    $('#category-info-window').jqxWindow('close');
                } else if (result === 1) {
                    alert("This category name has already exists");
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    getSubCategoryInfo: function(event) {
        var storeId, rowdata;

        rowdata = event.args.row.bounddata;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/getCategoryInfoBySid.jsp",
            data: {
                categorySid: rowdata.sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data[0];
                if (!data) return;

                WRPAdminApp.pagescript._selectedSubCategorySid = data.sid;

                try {
                    document.getElementById("sys-conf-input-sub-category-name").value = data.categoryName;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("sys-conf-parent-category-name").value = data.parentSid;
                } catch (e) {
                    console.warn(e);
                    return;
                }
                $('#sub-category-info-window').jqxWindow('open');
            }
        });
    },
    initSubCategoryInfo: function() {
        WRPAdminApp.pagescript._selectedSubCategorySid = 0;
        
        try {
            document.getElementById("sys-conf-input-sub-category-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            document.getElementById("sys-conf-parent-category-name").value = WRPAdminApp.pagescript._selectedCategorySid;
        } catch (e) {
            console.warn(e);
            return;
        }
        $('#sub-category-info-window').jqxWindow('open');
    },
    setSubCategoryInfo: function() {
        var storeId, categoryName, parentSid;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            categoryName = document.getElementById("sys-conf-input-sub-category-name").value;
            if (categoryName.length == 0) {
                alert("Input Category Name");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            parentSid = parseInt(document.getElementById("sys-conf-parent-category-name").value);
            if (isNaN(parentSid)) {
                alert("Parent Sid Error");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/updateCategoryInfo.jsp",
            data: {
                storeId: storeId,
                categoryName: categoryName,
                categorySid: WRPAdminApp.pagescript._selectedSubCategorySid,
                parentSid: parentSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete");
                    WRPAdminApp.pagescript.getSubCategoryList();
                    $('#sub-category-info-window').jqxWindow('close');
                } else if (result === 1) {
                    alert("This category name has already exists");
                } else {
                    alert("Error : " + result);
                }
            }
        });
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
                alert("You have to input role name");
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
                    alert("Complete!");
                    $('#role-new-window').jqxWindow('close');
                    WRPAdminApp.pagescript.getRoleList();
                } else {
                    alert("Error : " + result);
                }
            }
            }
        );
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
            	var datarow = new Array();
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		
            		row["sid"] = result.data[i].sid;
            		row["name"] = result.data[i].name;
            		row["user_id"] = result.data[i].user_id;
            		row["updateDate"] = WRPAdminApp.timeZone(result.data[i].updateDate);
            		datarow[i] = row;

            	}
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
    					{ name: "name", type: "string" },
    					{ name: "user_id", type: "string" },
    					{ name: "updateDate", type: "date" }
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-sys-permission-group-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-sys-permission-group-list"></div>';
            	}
    		
            	elem = $("#jqx-sys-permission-group-list");
    		
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
	         				   { text: "Name", datafield: "name", width: "30%" },
	        				   { text: "Update Date", datafield: "updateDate", width: "40%", filtertype: "range", cellsformat: 'MM/dd/yyyy HH:mm:ss' },
	         				   { text: "Updater", datafield: "user_id", width: "30%" }
		                     ]
            			});
            		
            		elem.on("rowselect", WRPAdminApp.pagescript.getPermissionGroupInfo);
            		elem.on("rowselect", WRPAdminApp.pagescript.getGroupUserList);

            		elem.on("rowdoubleclick", WRPAdminApp.pagescript.getPermissionEditPop);

            		$("#excel_system_permission_group").click(function(){
            			$('#jqx-sys-permission-group-list').jqxGrid('exportdata', 'xls', 'jqx-permission-group-list');
         			});
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

            }
        })
    },
    getGroupUserList: function(event) {
    	var rowdata;
    	rowdata = event.args.row;

        $.ajax({
            url: "ajax/permission_group/getGroupUserList.jsp",
            data: {
                permissionGroupSid: rowdata.sid
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
                    alert("Complete");
                    $('#permission-new-window').jqxWindow('close');
                    WRPAdminApp.pagescript.getPermissionGroupList();
                } else {
                    alert("Error : " + result);
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
            alert("Select Group");
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
                    alert("Complete!");
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    saveBackendPermissionInfo: function() {
        var savingObj, permissionSetList, i, len, elem, key, j, len2, key2, elem2, storeId;

        if (WRPAdminApp.pagescript._selectedPermissionGroupSid === undefined || WRPAdminApp.pagescript._selectedPermissionGroupSid == 0) {
            alert("Select Group");
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
                    alert("Complete!");
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    getMarketList: function () {
        var search;
        search = document.getElementById("store-group-search-market-keyword");
        if (!search) return;

        WRPAdminApp.pagescript._selectedMarketSid = undefined;
        WRPAdminApp.pagescript._selectedMarketCode = undefined;

        $.ajax({
            url: "ajax/market/getMarketList.jsp",
            data: {
            	searchKeyword: search.value
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
            	var data, elem, i, len, obj, districtInfoMarketCodes;
    			var innerHTML=[];
    			data = result.data;
    			
    			if (!data) return;
    			
    			districtInfoMarketCodes = document.getElementById("district-info-market-code");
                if (!districtInfoMarketCodes) {
                    return;
                }
                
    			elem = $("#jqx-sys-market-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");	
    					
    					innerHTML.push('<option value="');
                        innerHTML.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML.push('">');
                        innerHTML.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML.push('</option>');
    	            	}
    				}
    			
    			
    				districtInfoMarketCodes.innerHTML = innerHTML.join("");
    			}
            
        });
    },
    selectMarket: function(event) {
        var marketList, i, len, elem, rowdata;

        rowdata = event.args.row;
        WRPAdminApp.pagescript._selectedMarketCode = rowdata.marketCode;

        marketList = document.getElementById("store-group-market-list");
        if (!marketList) return;

        for (i = 0, len = marketList.children.length; i < len; i++) {
            try {
                elem = marketList.children[i];
                if (elem.children.length != 3) continue;
                if (WRPAdminApp.pagescript._selectedMarketCode === elem.children[0].innerText) {
                    elem.className = "tr selected";
                } else {
                    elem.className = "tr";
                }
            } catch (e) {

            }
        }

        WRPAdminApp.pagescript.getDistrictList();
    },
    getDistrictList: function (event) {
        var rowdata;
        
        rowdata = event.args.row;
        WRPAdminApp.pagescript._selectedMarketCode = rowdata.marketCode;
        
        /*if (arguments.length > 0) {
            WRPAdminApp.pagescript._selectedMarketCode = arguments[0];
        }*/

        /*search = document.getElementById("store-group-search-district-keyword");
        if (!search) return;
*/
        WRPAdminApp.pagescript._selectedDistrictSid = undefined;
        WRPAdminApp.pagescript._selectedDistrictCode = undefined;

        $.ajax({
            url: "ajax/district/getDistrictList.jsp",
            data: {
                marketCode: WRPAdminApp.pagescript._selectedMarketCode,
                /*searchKeyword: search.value*/
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
            	var data, elem, i, len, obj;
    			data = result.data;
    			
    			if (!data) return;
    			
    			districtInfoMarketCodes = document.getElementById("district-info-market-code");
                if (!districtInfoMarketCodes) {
                    return;
                }
                
    			elem = $("#jqx-sys-district-list");
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
    getMarketInfo: function (event) {
        var rowdata;
        rowdata = event.args.row.bounddata;
        $.ajax({
            url: "ajax/market/getMarketInfoBySid.jsp",
            data: {
                marketSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
                var data;
                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedMarketSid = data.sid;
                WRPAdminApp.pagescript._selectedMarketCode = (data.marketCode !== undefined && data.marketCode) ? data.marketCode : undefined;

                if (WRPAdminApp.pagescript._selectedMarketCode === undefined) return;

                try {
                    document.getElementById("market-info-market-code").value = (data.marketCode !== undefined && data.marketCode) ? data.marketCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("market-info-description").value = (data.name !== undefined && data.name) ? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("market-info-tel").value = (data.tel !== undefined && data.tel) ? data.tel : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.openPopupInPage('MarketViewContainer');
            }
        });
    },
    initMarketInfo: function () {
        WRPAdminApp.pagescript._selectedMarketSid = 0;
        WRPAdminApp.pagescript._selectedMarketCode = undefined;

        try {
            document.getElementById("market-info-market-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("market-info-description").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("market-info-tel").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.openPopupInPage('MarketViewContainer');
    },
    updateMarketInfo: function () {
        var param = {};
        param.marketSid = parseInt(WRPAdminApp.pagescript._selectedMarketSid);
        if (isNaN(param.marketSid)) {
            console.warn("market sid error");
            return;
        }
        if (WRPAdminApp.pagescript._selectedMarketCode !== undefined) {
            param.prevMarketCode = WRPAdminApp.pagescript._selectedMarketCode;
        }

        try {
            param.marketCode = document.getElementById("market-info-market-code").value;
            if (param.marketCode.length === 0) {
                alert("Input market code");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.name = document.getElementById("market-info-description").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.tel = document.getElementById("market-info-tel").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/market/updateMarketInfo.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function (result) {
                if (result === 1) {
                    alert("This market code already exists");
                } else if (result === 0) {
                    alert("Complete");
                    WRPAdminApp.closePopup('MarketViewContainer');
                    WRPAdminApp.pagescript.init();
                } else {
                    alert("Error " + result);
                }
            }
        });
    },
    getDistrictInfo: function (event) {
        var rowdata;
        rowdata = event.args.row.bounddata;

        $.ajax({
            url: "ajax/district/getDistrictInfo.jsp",
            data: {
                districtSid: rowdata.sid
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
                var data;
                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedDistrictSid = data.sid;
                WRPAdminApp.pagescript._selectedDistrictCode = (data.districtCode !== undefined && data.districtCode) ? data.districtCode : undefined;

                if (WRPAdminApp.pagescript._selectedDistrictCode === undefined) return;

                try {
                    document.getElementById("district-info-district-code").value = (data.districtCode !== undefined && data.districtCode) ? data.districtCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("district-info-description").value = (data.name !== undefined && data.name) ? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("district-info-tel").value = (data.tel !== undefined && data.tel) ? data.tel : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("district-info-market-code").value = (data.parentMarketCode !== undefined && data.parentMarketCode) ? data.parentMarketCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.openPopupInPage('DistrictViewContainer');
            }
        });
    },
    initDistrictInfo: function () {

        WRPAdminApp.pagescript._selectedDistrictSid = 0;
        WRPAdminApp.pagescript._selectedDistrictCode = undefined;

        try {
            document.getElementById("district-info-district-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("district-info-description").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("district-info-tel").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("district-info-market-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.openPopupInPage('DistrictViewContainer');
    },
    updateDistrictInfo: function () {
        var param = {};
        param.districtSid = parseInt(WRPAdminApp.pagescript._selectedDistrictSid);
        if (isNaN(param.districtSid)) {
            console.warn("district sid error");
            return;
        }
        try {
            param.districtCode = document.getElementById("district-info-district-code").value;
            if (param.districtCode.length === 0) {
                alert("Input district code");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.name = document.getElementById("district-info-description").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.tel = document.getElementById("district-info-tel").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.parentMarketCode = document.getElementById("district-info-market-code").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/district/updateDistrictInfo.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function (result) {
                if (result === 1) {
                    alert("This district code already exists");
                } else if (result === 0) {
                    alert("Complete");
                    WRPAdminApp.closePopup('DistrictViewContainer');
                    WRPAdminApp.pagescript.getDistrictList();
                } else {
                    alert("Error " + result);
                }
            }
        });
    },
    getTimeZoneList: function() {
    	var store_id;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/timezone/getTimeZoneList.jsp",
        	data: {
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var elem, i, len, obj, current;
        		try {
            		if (result.data) {
            			elem = $("#jqx-timezone-list");
            			if (elem) {
            				elem.jqxGrid("clear");
            				for (i = 0, len = result.data.length; i < len; i++) {
            					obj = result.data[i];
            					if (obj.selected === 1 && current === undefined) {
            						current = obj;
            						continue;
            					}
            					
            					elem.jqxGrid("addrow", null, obj, "last");
            				}
            				if (current !== undefined) {
            					elem.jqxGrid("addrow", null, current, "first");
                    			
                    			try {
                    				document.getElementById("timezone-current-timezone-desc").innerHTML = current.description;
                    			} catch (e) {
                    				
                    			}
            					elem.jqxGrid("selectrow", 0);
            				}
            			}
            		}
        		} catch (e) {
        			console.warn(e);
        		}
        	}
        });
    },
    saveTimezone: function() {
    	var row, elem, store_id;
    	if (!confirm("Are you sure?")) return;
    	
    	elem = $("#jqx-timezone-list");
    	if (!elem) {
    		return;
    	}
    	
    	row = elem.jqxGrid("getrowdata",elem.jqxGrid("getselectedrowindex"));
    	
    	if (row === undefined) return;
    	
    	if (row.sid === undefined) return;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
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
        	url: "ajax/timezone/setStoreTimeZone.jsp",
        	data: {
        		store_id: store_id,
        		timezone_sid: row.sid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
        			alert("Complete");
        			
        			try {
        				document.getElementById("timezone-current-timezone-desc").innerHTML = row.description;
        			} catch (e) {
        				
        			}
        			
        		} else {
        			alert("Error: " + result);
        		}
                
                try {
                	document.getElementById("loading-container").style.display = "none";
                } catch (e) {
                	console.warn(e);
                }
        	}
        })
    }
};