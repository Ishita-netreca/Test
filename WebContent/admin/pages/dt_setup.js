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
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="dt_setup"]').addShadowedImage('img/icon/datetime_02.png');
		} catch (e) {
			
		}

    	var components = $('#jqx-timezone-list');
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
    	}
    	
        WRPAdminApp.pagescript.getTimeZoneList();
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

		WRPCommon.MsgBoxModule.confirm({
			message: "Are you sure?",
			noBtnClick: function(){
				return;
			},
			yesBtnClick: function(){
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
		        			WRPCommon.MsgBoxModule.alert({
		        				message: "Completed",
		        				okBtnClick: function(){
		                			try {
		                				document.getElementById("timezone-current-timezone-desc").innerHTML = row.description;
		                			} catch (e) {
		                				
		                			}
		        				}
		        			});
		        			
		        		} else {
		        			WRPCommon.MsgBoxModule.alert({
		        				message: "Error: " + result
		        			});
		        		}
		                try {
		                	document.getElementById("loading-container").style.display = "none";
		                } catch (e) {
		                	console.warn(e);
		                }
		        	}
		        });
			}
		});
    	
    }
};