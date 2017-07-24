/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedStoreId: undefined,
    _selectedBinSid: 0,
	_currPageNo: 1,
    _maxPageNo: 1,
    _countPerPage: 10,
    init: function() {
    	try {
			WRPComponents('div[pagename="inventory"] > .page-submenu-container > .submenu[panelname="bin_management"]').addShadowedImage('img/icon/bin_management.png');
		} catch (e) {
			
		}
		try {
            var elem = $("#bin-split-panel");
            
            if (elem && elem.length > 0) {                            
            	elem.jqxSplitter({
                	width: "99.8%",
                	height: "99.6%",
                	orientation: 'horizontal',
                	panels: [
                		{ size: "40%", min: 100, collapsible: false }, 
                		{ min: 100, collapsible: false}
                	],
        			theme: "arctic"
                });
            }
		} catch (e) {
			console.warn(e);
		}
		var components = $('#bin-edit-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 200);
    		components.css("top", "calc(50% - 100px)");
    		components.css("left", "calc(50% - 250px)");
    	}
    	
    	components = $('#bin-transfer-edit-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 300);
    		components.css("top", "calc(50% - 150px)");
    		components.css("left", "calc(50% - 250px)");
    	}
    	
    	components = $('#jqx-inventory-bin-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "bin_type", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "update_date", type: "date" },
    					{ name: "user_id", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
				   { text: "Bin Name", datafield: "bin_type", width: "25%", align: 'center' },
				   { text: "Description", datafield: "description", width: "25%", align: 'center' },
				   { text: "Update Date", datafield: "update_date", width: "25%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center'},
				   { text: "Updater", datafield: "user_id", width: "25%", align: 'center' },
				   { text: "sid", datafield: "sid", hidden: true }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.informSelectedBinData);
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.informSelectedBinPop);
    	}
    	
    	components = $('#jqx-inventory-bin-items-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "itemCode", type: "string" },
    					{ name: "serial_no", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "distributor", type: "string" },
    					{ name: "category_name", type: "string" },
    					{ name: "qty", type: "number" },
    					{ name: "itemCost", type: "number" },
    					{ name: "item_type", type: "number" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        pageable: true,
    	        columnsresize:true,
    			columns: [
				   { text: "Item Code", datafield: "itemCode", width: "15%", align: 'center' },
				   { text: "Serial No", datafield: "serial_no", width: "15%", align: 'center' },
				   { text: "Description", datafield: "description", width: "20%", align: 'center' },
				   { text: "Company/Carrier", datafield: "distributor", width: "20%", align: 'center'},
				   { text: "Category", datafield: "category_name", width: "10%", align: 'center' },
				   { text: "Qty", datafield: "qty", width: "10%", align: 'center' },
				   { text: "Item Cost", datafield: "itemCost", width: "10%", cellsformat: "c2", cellsalign:"right", align: 'center'},
				]
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.binTransferPop);
    		$("#excel-bin-items").click(function () {
    			$('#jqx-inventory-bin-items-list').jqxGrid('exportdata', 'xls', 'jqx-inventory-bin-items');
            });
    	}
    	
		/*///*/
    	
        WRPAdminApp.pagescript.getBinList();
        WRPAdminApp.pagescript.getBinSelectList();
    },
    /*BIN START (BANGWOORI) */
    getBinSelectList: function(){
    	var storeId;
        
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	$.ajax({
            url: "ajax/bin/getBinCategory.jsp",
            data: {
                storeId: storeId,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            		var data, i, len, obj, innerHTML;

            		data = result.data;
            		if (!data) return;

            		innerHTML = [];
            		innerHTML.push('<option value="0">-- SELECT --</option>');
            		 
            		for (i = 0, len = data.length; i < len; i++) {
            			try {
            				obj = data[i];

            				innerHTML.push('<option value="');
            				innerHTML.push(obj.sid);
            				innerHTML.push('"');
            				innerHTML.push('>');
            				innerHTML.push(obj.bin_type);
            				innerHTML.push('</option>');
            			} catch (e) {
            				console.warn(e);
            				return;
            			}
            		}

            		try {
            			document.getElementById("inven-bin-type-pop").innerHTML = innerHTML.join("");
            		} catch (e) {
            			console.warn(e);
            		}
            }
        });
    },
    getBinList: function() {
        var storeId, keyword, bin_type;

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
            keyword = document.getElementById("inventory-bin-search-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }


        WRPAdminApp.pagescript._selectedBinSid = 0;

        $.ajax({
            url: "ajax/bin/getBinList.jsp",
            data: {
                storeId: storeId,
                keyword: keyword,
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
    			
    			elem = $("#jqx-inventory-bin-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");		
    			}
            }
        })
    },
    informSelectedBinData: function(event) {
        var i, len, elem, list, storeId, sid, rowdata;

        rowdata = event.args.row;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        sid = rowdata.sid;
        $.ajax({
            url: "ajax/bin/getBinInfo.jsp",
            data: {
                sid: sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;
                data = result.data;
                if (!data) return;
                
                for (i = 0, len = data.length; i < len; i++) {
                    obj = data[i];
                    
                WRPAdminApp.pagescript._selectedBinSid = obj.sid;
                try {
                    document.getElementById("bin-info-type").value = (obj.bin_type !== undefined && obj.bin_type)? obj.bin_type : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("bin-info-description").value = (obj.description !== undefined && obj.description)? obj.description : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("bin-info-date").value = (obj.update_date !== undefined && obj.update_date)? obj.update_date : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("bin-info-updater").value = (obj.user_name !== undefined && obj.user_name)? obj.user_name : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }
                WRPAdminApp.pagescript.getItemByBin();
                }
            }
        });
        
    },
    
    informSelectedBinPop: function(event) {
        var i, len, elem, list, storeId, sid, rowdata;

        rowdata = event.args.row.bounddata;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        sid = rowdata.sid;
        
        if(sid < 6 && sid > 0) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "Can not be edited !"
        	});
        	return;
        }
        
        $.ajax({
            url: "ajax/bin/getBinInfo.jsp",
            data: {
                sid: sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;
                data = result.data;
                if (!data) return;
                
                for (i = 0, len = data.length; i < len; i++) {
                    obj = data[i];
                    
                    WRPAdminApp.pagescript._selectedBinSid = obj.sid;
	                try {
	                    document.getElementById("bin-info-type-pop").value = (obj.bin_type !== undefined && obj.bin_type)? obj.bin_type : '';
	                } catch (e) {
	                    console.warn(e);
	                    return;
	                }

	                try {
	                    document.getElementById("bin-info-description-pop").value = (obj.description !== undefined && obj.description)? obj.description : '';
	                } catch (e) {
	                    console.warn(e);
	                    return;
	                }

                }
                $('#bin-edit-window').jqxWindow('open'); 
            }
        });
        
    },
    initBinInfo: function() {
    	WRPAdminApp.pagescript._selectedBinSid = 0;
        
        try {
            document.getElementById("bin-info-type-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("bin-info-description-pop").value = "";
        } catch (e) {
            console.log(e);
        }
        
        $('#bin-edit-window').jqxWindow('open'); 
    },
    
    setBinData: function() {
        var data, storeId;

        storeId = WRPAdminApp.pagescript._selectedStoreId;

        if (storeId === undefined || storeId.length === 0) {
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) {
                    return;
                }
            } catch (e) {
                return;
            }
        }

        data = {};
        data.storeId = storeId;
        data.sid = WRPAdminApp.pagescript._selectedBinSid;
        
        try {
            data.type = document.getElementById("bin-info-type-pop").value;
            if(data.type.length < 1){
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Bin Name"
            	});
            	return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.description = document.getElementById("bin-info-description-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }


        $.ajax({
            url: "ajax/bin/setBinData.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Completed",
                		okBtnClick: function(){
                            $('#bin-edit-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getBinList();
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
    
    getItemByBin: function() {
    	var storeId;
    	
    	try {
    		document.getElementById("loading-container").style.display = "block";
    	} catch (e) {
    		console.warn(e);
    	}
    	
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/bin/getItemListByBin.jsp",
            data: {
                sid: WRPAdminApp.pagescript._selectedBinSid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj;
    			
    			data = result.data;
    			
    			if (!data) return;
    			
    			elem = $("#jqx-inventory-bin-items-list");
    			if (elem) {
    				elem.jqxGrid("clear");
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
    
    binTransferPop: function(event){
    	var rowdata;
    	
    	rowdata = event.args.row.bounddata;
    	
    	document.getElementById("inven-bin-transfer-inven-sid").innerHTML = rowdata.sid;
    	document.getElementById("inven-bin-transfer-itemcode").innerHTML = rowdata.itemCode;
    	document.getElementById("inven-bin-transfer-serialno").innerHTML = rowdata.serial_no;
    	document.getElementById("inven-bin-transfer-description").innerHTML = rowdata.description;
    	document.getElementById("inven-bin-transfer-category").innerHTML = rowdata.category_name;
    	document.getElementById("inven-bin-type-pop").value = rowdata.bin;
    	if(rowdata.item_type==3) document.getElementById("bin-transfer-qty-line").style.display="block"
    	else document.getElementById("bin-transfer-qty-line").style.display="none";
    	
    	$("#bin-transfer-edit-window").jqxWindow('open'); 
    },
	setBinTransfer: function(){
    	var param, qty;
    	param = {};
    	try {
            param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        param.inventory_sid = document.getElementById("inven-bin-transfer-inven-sid").innerHTML;
        param.bin_sid = document.getElementById("inven-bin-type-pop").value;
        param.qty = document.getElementById("inven-bin-trnasfer-qty").value;
        
        
        $.ajax({
        	url: "ajax/bin/transferInvenItemIntoBin.jsp",
        	data: param,
        	method: "POST",
            dataType: "json",
            success: function(result) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Completed",
            		okBtnClick: function(){
                    	document.getElementById("inven-bin-trnasfer-qty").value == null;
                    	$("#bin-transfer-edit-window").jqxWindow('close'); 
                    	WRPAdminApp.pagescript.getItemByBin();
                    	WRPAdminApp.pagescript.getBinSelectList();
            		}
            	});
            }
        });
    	
    }
};