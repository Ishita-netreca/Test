var _pagescript = {
	_selectedToStore:undefined,
	_newTransferId: undefined,
	_storeItemsList: undefined,
	_expressAddedItems: undefined,
	_expressSerialNoList: undefined,
	_expressSelectedAddedItemSid:0,
	_selectedTransSid: 0,
    init: function() {
    	var elem, components,date,start;
    	try {
			WRPComponents('div[pagename="express_transfer"] > .page-submenu-container > .submenu').addShadowedImage('img/icon/transfer_01.png');
		} catch (e) {
			
		}
		
		elem = $("#express-transfer-request-list");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'user_id', type: 'string'},
							{ name: 'req_date', type: 'string'},
							{ name: 'status', type: 'number'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden:true},
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Transfer ID',datafield : 'trans_id', width : '30%', align: 'center'},
						{ text : 'Request Store', datafield : 'from_store_id', width : '15%', align: 'center'}, 
						{ text : 'Assign Store', datafield : 'to_store_id', width : '15%', align: 'center'}, 
						{ text : 'Date', datafield : 'req_date', width : '20%', align: 'center' }, 
						{ text : 'Employee',datafield : 'user_id', width : '15%', align: 'center'},

				],
			});
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedTransSid=event.args.row.sid;
				WRPAdminApp.pagescript.getExpressTransSummary(event);
				WRPAdminApp.pagescript.getExpressTransDetail(event);
			});
		}
		
		elem = $("#express-transfer-summary-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'reqQty', type: 'string'},
							{ name: 'item_type', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden:true},
						{ text: 'CT', datafield: '', columntype: 'number', width: '10%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '35%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Qty', datafield : 'reqQty', width : '15%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#express-transfer-detail-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'req_qty', type: 'string'},
							{ name: 'item_type', type: 'string'},
							{ name: 'serial_no', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden:true},
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '25%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Serial No', datafield : 'serial_no',editable: false, width : '20%', align: 'center'}, 
						{ text : 'Qty', datafield : 'req_qty', width : '10%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#express-trans-store-items-list");
    	if (elem) {
    		elem.jqxGrid({
    			width: "99.8%",
    			height: "200",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					{ name: "item_code", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "in_stock", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,    	        
    			columns: [
				   { datafield: "sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center', editable: false,cellsalign:'center',
					   cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	               },
				   { text: "Item Code", datafield: "item_code", width: "18%", align: 'center' },
				   { text: "Description", datafield: "description", width: "40%", align: 'center'},
				   { text: "SKU", datafield: "sku", width: "17%", align: 'center' },
				   { text: "Qty", datafield: "in_stock", width: "10%", align: 'center', cellsalign: 'center' },
				   { text: "", columntype: 'button', width: "10%", cellsrenderer: function(){ return "ADD"; }, buttonclick:WRPAdminApp.pagescript.addExpressItem }
				]
    		});
    	}
    	
    	elem = $("#express-trans-request-items-list");
    	if (elem) {
			elem.jqxGrid({
    			width: "99.8%",
    			height: "166",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					// hidden
    					{ name: "item_sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					// hidden
    					{ name: "item_code", type: "string" },
    					{ name: "model", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "item_cost", type: "number" },
    					{ name: "pre_qty", type: "number" },
    					{ name: "qty", type: "number" },
    					{ name: "sub_total", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,    	  
    	        editable: true,
    			columns: [
				   { datafield: "item_sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center', editable: false,cellsalign:'center',
					   cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	               },
				   { text: "Item Code", datafield: "item_code", width: "15%", editable: false, align: 'center' },
				   { text: "Description", datafield: "description", width: "29%", editable: false, align: 'center'},
				   { text: "SKU", datafield: "sku", width: "15%", editable: false, align: 'center' },
				   { text: "Qty", datafield: "pre_qty", width: "10%", editable: true, align: 'center', cellsalign: 'center' },
				   { text: "Added IMEI", datafield: "qty", width: "10%", editable: false, align: 'center', cellsalign: 'center' },
				   { text: "", columntype: 'button', width: "8%", editable: false, cellsrenderer: function(){ if(arguments[5] && arguments[5].item_type < 3) { return "Add-IMEI"; } else { return " "; }  }, buttonclick: WRPAdminApp.pagescript.onExpressAddImei },
				   { text: "", columntype: 'button', width: "8%", editable: false, cellsrenderer: function(){ return "Delete"; }, buttonclick:WRPAdminApp.pagescript.deleteExpressItem }
				]
    		});
			elem.on("cellendedit", function(event) { if(event.args.datafield==="pre_qty") { setTimeout(function() { WRPAdminApp.pagescript.printExpressItemsList(); }, 500); } });
    	}

		elem = $("#express-trans-order-items-list");
    	if (elem) {
    		elem.jqxGrid({
    			width: "99.8%",
    			height: "200",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "item_sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					{ name: "item_code", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "sku", type: "string" },
    					{ name: "pre_qty", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,    	        
    			columns: [
				   { datafield: "item_sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center', editable: false,cellsalign:'center',
					   cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	               },
				   { text: "Item Code", datafield: "item_code", width: "25%", align: 'center' },
				   { text: "Description", datafield: "description", width: "40%", align: 'center'},
				   { text: "SKU", datafield: "sku", width: "20%", align: 'center' },
				   { text: "Qty", datafield: "pre_qty", width: "10%", align: 'center', cellsalign:'center' }
				]
    		});
    		elem.on("rowselect", WRPAdminApp.pagescript.getSerialNoList);
    	}

		elem = $("#express-trans-order-serialized-items");
    	if (elem) {
    		elem.jqxGrid({
    			width: "95%",
    			height: "220",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "item_sid", type: "number" },
    					{ name: "item_type", type: "number" },
    					{ name: "item_code", type: "string" },
    					{ name: "description", type: "string" },
    					{ name: "serialNo", type: "number" }
    				]
    			}),
    			filterable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,    	        
    			columns: [
				   { datafield: "item_sid", hidden:true },
				   { datafield: "item_type", hidden:true },
				   { text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center', editable: false,cellsalign:'center',
					   cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	               },
				   { text: "Item Code", datafield: "item_code", width: "25%", align: 'center' },
				   { text: "Description", datafield: "description", width: "40%", align: 'center'},
				   { text: "Serial No", datafield: "serialNo", width: "30%", align: 'center' },
				]
    		});
    	}
    	
		components = $('#express-transfer-step-01');
    	if (components) {
    		components.jqxWindow("width", 700);
    		components.jqxWindow("height", 500);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 350) , y: ((window.innerHeight * 0.5) - 250) });
    	}
    	
    	components = $('#express-transfer-step-02');
    	if (components) {
    		components.jqxWindow("width", 1000);
    		components.jqxWindow("height", 700);
    		components.jqxWindow("resizable", false);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 500) , y: ((window.innerHeight * 0.5) - 350)  });
    	}

    	components = $('#express-transfer-step-03');
    	if (components) {
    		components.jqxWindow("width", 1000);
    		components.jqxWindow("height", 650);
    		components.jqxWindow("resizable", false);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 500) , y: ((window.innerHeight * 0.5) - 325)  });
    	}

    	components = $('#express-transfer-serialized-item-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 650);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 210) , y: ((window.innerHeight * 0.5) - 300) });
    	}
    	
		$('#express-transfer-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#express-transfer-start-date").jqxDateTimeInput('setDate', start);
			$("#express-transfer-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#express-transfer-radio-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#express-transfer-start-date").jqxDateTimeInput('setDate', start);
			$("#express-transfer-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#express-transfer-radio-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#express-transfer-start-date").jqxDateTimeInput('setDate', start);
			$("#express-transfer-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#express-transfer-radio-1').jqxRadioButton('check');
		WRPAdminApp.pagescript.getExpressTransList();
    },
    getExpressTransList: function(){
    	var store_id, keyword, start_date, end_date;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	start_date = $("#express-transfer-start-date").val();
        	end_date = $("#express-transfer-end-date").val();
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
            url: "ajax/inven_transfer/getTransferReqList.jsp",
            data: {
            	store_id: store_id,
            	transFlag: 1,
            	start_date: start_date,
            	end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#express-transfer-request-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    			
    	        try {
    	        	document.getElementById("loading-container").style.display = "none";
    	        } catch (e) {
    	        	console.warn(e);
    	        }   
    			
    			WRPAdminApp.pagescript._selectedTransSid = 0;
            }
        });
    },
    getExpressTransSummary: function(event){
    	var store_id, rowdata;
    	rowdata = event.args.row;
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

		$.ajax({
            url: "ajax/inven_transfer/getTransferItemsList.jsp",
            data: {
                storeId: store_id,
                transSid: WRPAdminApp.pagescript._selectedTransSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, total;
            	total = 0;
                data = result.data;
                if (!data) return;
                
                for(i=0; i < data.length; i++){
                	total = total + data[i].reqQty;
                }
                
                document.getElementById("transfer-store-info").innerHTML = rowdata.to_store_id+"->"+rowdata.from_store_id;
                document.getElementById("transfer-store-info-detail").innerHTML = rowdata.to_store_id+"->"+rowdata.from_store_id;
                document.getElementById("transfer-detail-emp-id").innerHTML = rowdata.user_id;
                document.getElementById("transfer-detail-emp-id-detail").innerHTML = rowdata.user_id;
                document.getElementById("transfer-detail-date").innerHTML = rowdata.req_date;
                document.getElementById("transfer-detail-date-detail").innerHTML = rowdata.req_date;
                document.getElementById("transfer-detail-total-qty").innerHTML = total;
                document.getElementById("transfer-detail-total-qty-detail").innerHTML = total;
                
                
                elem = $("#express-transfer-summary-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}

            }
        });
    },
    getExpressTransDetail: function(event){
    	var store_id, rowdata;
    	rowdata = event.args.row;
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

		$.ajax({
            url: "ajax/inven_transfer/getTransOrderItemDetail.jsp",
            data: {
            	store_id: store_id,
                transSid: WRPAdminApp.pagescript._selectedTransSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, total;
            	total = 0;
                data = result.data;
                if (!data) return;
               

                document.getElementById("express-transfer-summary-memo").value = data[0].recv_memo;
                document.getElementById("express-transfer-detail-memo").innerHTML = data[0].recv_memo;

                elem = $("#express-transfer-detail-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}

            }
        });
    },
    createExpressTrans: function(){

    	document.getElementById("to-store-market").innerHTML = "";
    	document.getElementById("to-store-district").innerHTML = "<option>--ALL--</option>";
    	document.getElementById("to-store-store").innerHTML = "";
    	WRPAdminApp.pagescript._selectedToStore = undefined;
    	WRPAdminApp.pagescript._newTransferId = undefined;
    	WRPAdminApp.pagescript._storeItemsList = undefined;
    	WRPAdminApp.pagescript._expressAddedItems = undefined;
    	WRPAdminApp.pagescript._expressSerialNoList = undefined;
    	$("#express-trans-store-items-list").jqxGrid("clear");
    	$("#express-trans-request-items-list").jqxGrid("clear");
    	$("#express-transfer-search-item").val("");
    	$("#express-transfer-note").val("");
    	
    	
    	$('#express-transfer-step-01').jqxWindow('open');
    	WRPAdminApp.pagescript.getTransferStore();
    },
	getTransferStore: function(){
		var store_id;
		store_id = document.getElementById('select-store').value;
	
		$.ajax({
			url: "ajax/store/getStoreInfoById.jsp",
			data:{
				store_id: store_id  
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj, elem, innerHTML;
				data = result.data;
				if (!data) return;

				document.getElementById('from-store-store').innerHTML = (data.store_id)? "<option>"+data.store_id+"</option>" : "";
				document.getElementById('from-store-market').innerHTML = (data.marketName)? "<option>"+data.marketName+"</option>" : "";
				document.getElementById('from-store-district').innerHTML = (data.districtName)? "<option>"+data.districtName+"</option>" : "";
        	   
				WRPAdminApp.pagescript.getMarketList();
				WRPAdminApp.pagescript.getAllStoreList();
			}
		});
	},
	getAllStoreList: function(){
		var store_id;
		store_id = document.getElementById('select-store').value;
		
		$.ajax({
			url: "ajax/store/getStoreListByOwnerSid.jsp",
			data:{
				store_id: store_id  
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj, elem, innerHTML;
				data = result.data;
				if (!data) return;

				innerHTML = [];
				innerHTML.push('<option value="0" selected>--SELECT--</option>');
				
				for (i = 0, len = data.length; i < len; i++) {
					try {
						obj = data[i];
						innerHTML.push('<option value="');
						innerHTML.push(obj.storeId);
						innerHTML.push('">');
						innerHTML.push(obj.storeId);
						innerHTML.push('</option>');
					} catch (e) {

					}
				}
				try {
					document.getElementById("to-store-store").innerHTML = innerHTML.join("");
				} catch (e) {

				}

				innerHTML = undefined;
			}
		});
	},
	getMarketList: function(){
	   $.ajax({
           url: "ajax/market/getMarketList.jsp",
           method: "POST",
           dataType: "json",
           success: function(result) {
               var data, i, len, obj, elem, innerHTML;
               data = result.data;
               if (!data) return;

        	   
        	   innerHTML = [];
        	   innerHTML.push('<option value="0" selected>--ALL--</option>');
        	   for (i = 0, len = data.length; i < len; i++) {
					try {
						obj = data[i];
						innerHTML.push('<option value="');
						innerHTML.push(obj.marketCode);
						innerHTML.push('">');
						innerHTML.push(obj.name);
						innerHTML.push('</option>');
					} catch (e) {

					}
				}
        	   try {
					document.getElementById("to-store-market").innerHTML = innerHTML.join("");
				} catch (e) {

				}

				innerHTML = undefined;
           }
       });
	},
	getDistrictList: function(){
	   var marketCode = arguments[0];
	   
	   if(marketCode==0){
			WRPAdminApp.pagescript.getAllStoreList();
			document.getElementById("to-store-district").innerHTML = "<option>--ALL--</option>";
			return;
	   }
	   
	   $.ajax({
           url: "ajax/district/getDistrictList.jsp",
           data:{
        	   marketCode: marketCode
           },
           method: "POST",
           dataType: "json",
           success: function(result) {
               var data, i, len, obj, elem, innerHTML;
               data = result.data;
               if (!data) return;

        	   
        	   innerHTML = [];
        	   innerHTML.push('<option value="0" selected>--SELECT--</option>');
        	   for (i = 0, len = data.length; i < len; i++) {
					try {
						obj = data[i];
						innerHTML.push('<option value="');
						innerHTML.push(obj.districtCode);
						innerHTML.push('">');
						innerHTML.push(obj.name);
						innerHTML.push('</option>');
					} catch (e) {

					}
				}
        	   try {
					document.getElementById("to-store-district").innerHTML = innerHTML.join("");
				} catch (e) {

				}

				innerHTML = undefined;
           }
       });
	},
	getToStoreList: function(){
		var districtCode = arguments[0];
		var store_id = document.getElementById('select-store').value;
		$.ajax({
			url: "ajax/store/getStoreListByDistrict.jsp",
			data:{
				districtCode: districtCode,
				store_id: store_id
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj, elem, innerHTML;
				data = result.data;
				if (!data) return;

				innerHTML = [];
				innerHTML.push('<option value="0" selected>--SELECT--</option>');
				
				for (i = 0, len = data.length; i < len; i++) {
					try {
						obj = data[i];
						innerHTML.push('<option value="');
						innerHTML.push(obj.store_id);
						innerHTML.push('">');
						innerHTML.push(obj.store_id);
						innerHTML.push('</option>');
					} catch (e) {

					}
				}
				try {
					document.getElementById("to-store-store").innerHTML = innerHTML.join("");
				} catch (e) {

				}

				innerHTML = undefined;
           }
	   });
	},
	getStoreItemsList: function(){
		var output_element_id, search_keyword, store_id, vendor_sid;
		
		try {
			store_id = document.getElementById("select-store").value;
			if (store_id.length == 0) {
				return;
			}
		} catch (e) {
			console.warn(e);
		}
		
		try {
			search_keyword = document.getElementById("express-transfer-search-item").value;
		} catch (e) {
			console.warn(e);
		}
		
        try {
        	document.getElementById("loading-container").style.display = "block";
        } catch (e) {
        	console.warn(e);
        }       
        
        WRPAdminApp.pagescript._storeItemsList = undefined;
		
		$.ajax({
			url: "ajax/po/getStoreItemsList.jsp",
			data: {
				store_id: store_id,
				search_keyword: search_keyword
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var elem;
				
				if(!result.data) {
					try {
			        	document.getElementById("loading-container").style.display = "none";
			        } catch (e) {
			        	console.warn(e);
			        }
					return;
				}
				WRPAdminApp.pagescript._storeItemsList = result.data;

				elem = $('#express-trans-store-items-list');
				if (elem) {				
					elem.jqxGrid("clear");				
					elem.jqxGrid("addrow",null,WRPAdminApp.pagescript._storeItemsList,"last");
				}
				
		        try {
		        	document.getElementById("loading-container").style.display = "none";
		        } catch (e) {
		        	console.warn(e);
		        }
			}
		});
	},
	addExpressItem: function(index) {
		var i, len, obj,_expressAddedItems, item, elem;
    	
    	item = $("#express-trans-store-items-list").jqxGrid("getrowdata", index);
    	
    	if (item == undefined) {
        	return;
    	}
    	

		if (WRPAdminApp.pagescript._expressAddedItems === undefined) {
			WRPAdminApp.pagescript._expressAddedItems = [];
		}
		
		for (i = 0, len = WRPAdminApp.pagescript._expressAddedItems.length; i < len; i++) {
			obj = WRPAdminApp.pagescript._expressAddedItems[i];
			if (obj.item_sid === item.sid) {
				WRPCommon.MsgBoxModule.alert({
					message: "This item has already been added"
				});
				return;
			}				
			obj = undefined;
		}
		
		if (obj === undefined) {
			obj = {};
			obj.item_sid = item.sid;
			obj.item_type = item.item_type;
			obj.item_code = item.item_code;
			obj.description = item.description;
			obj.sku = item.sku;
			obj.qty = 0;
			obj.pre_qty = 0;
			WRPAdminApp.pagescript._expressAddedItems.push(obj);
		}		
		
		WRPAdminApp.pagescript.printExpressItemsList();
		
	},
	deleteExpressItem: function(index) {
		var item, i, len, obj, elem;
    	
    	item = $("#express-trans-request-items-list").jqxGrid("getrowdata", index);
    	
    	if (item == undefined) {
        	return;
    	}
    	
		if (WRPAdminApp.pagescript._expressAddedItems === undefined) {
			WRPAdminApp.pagescript._expressAddedItems = [];
		}
		
		for (i = 0, len = WRPAdminApp.pagescript._expressAddedItems.length; i < len; i++) {
			obj = WRPAdminApp.pagescript._expressAddedItems[i];
			if (obj.item_sid === item.item_sid) {
				WRPAdminApp.pagescript._expressAddedItems.splice(i, 1);
				if (WRPAdminApp.pagescript._expressSerialNoList[obj.item_sid] !== undefined) {
					WRPAdminApp.pagescript._expressSerialNoList[obj.item_sid] = undefined;
				}
				
				WRPAdminApp.pagescript.printExpressItemsList();
				break;
			}
		}			
	},
    onExpressAddImei: function(index) {
    	var item, page, nodes;
    	
    	item = $("#express-trans-request-items-list").jqxGrid("getrowdata", index);
   		if (item.pre_qty == 0 && $("#textboxeditorexpress-trans-request-items-listpre_qty").length) item.pre_qty = $("#textboxeditorexpress-trans-request-items-listpre_qty").val();

    	if(item.item_type > 1) return;
    	if(item.pre_qty === undefined || item.pre_qty < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Enter Qty"
    		});
    		return;	
    	}

    	if (item !== undefined) {	
    		WRPAdminApp.pagescript.confirmAddedItemInExpress(item.item_sid);
    		document.getElementById("input_qty").innerHTML = item.pre_qty;
    	}

    	page = window.document.getElementById("express-transfer-serial-no-list");
    	nodes = page.childElementCount;
    	document.getElementById("scan_qty").innerHTML = nodes;
    },
	confirmAddedItemInExpress: function(item_sid) {
		var item, value, innerHTML, serial, i, len;
		
		WRPAdminApp.pagescript._expressSelectedAddedItemSid = 0;
		
		item = WRPAdminApp.pagescript.getExpressAddedItemsByItemSid(item_sid);	
					
		if (item === undefined) {
			return;
		}
		
		WRPAdminApp.pagescript._expressSelectedAddedItemSid = item_sid;
		
		if(item.item_type < 3){
			try {
				value = document.getElementById("transfer-order-id").innerHTML;
				if(value !== undefined && value.length > 0) {
					document.getElementById("express-transfer-serialized-item-trans-id").innerHTML = value;
				} else {
					document.getElementById("express-transfer-serialized-item-trans-id").innerHTML = "";
				}
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("express-transfer-serialized-item-item-code").innerHTML = (item.item_code !== undefined && item.item_code.length > 0)? item.item_code : "&nbsp;";					
			} catch (e) {
				console.warn(e);
				return;
			}
			try {
				document.getElementById("express-transfer-serialized-item-sku").innerHTML = (item.sku !== undefined && item.sku.length > 0)? item.sku : "&nbsp;";					
			} catch (e) {
				console.warn(e);
				return;
			}
			try {
				document.getElementById("express-transfer-serialized-item-description").innerHTML = (item.description !== undefined && item.description.length > 0)? item.description : "&nbsp;";					
			} catch (e) {
				console.warn(e);
				return;
			}

			
			if (WRPAdminApp.pagescript._expressSerialNoList === undefined) {
				WRPAdminApp.pagescript._expressSerialNoList = {};
			}
			
			serial = WRPAdminApp.pagescript._expressSerialNoList[WRPAdminApp.pagescript._expressSelectedAddedItemSid];
			
			if (serial !== undefined) {
				innerHTML = [];
				for (i = 0, len = serial.length; i < len; i++) {
					innerHTML.push('<div class="item">');
					innerHTML.push('<div class="serial">');
					innerHTML.push(serial[i]);
					innerHTML.push('</div>');
					innerHTML.push('<div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);');
					innerHTML.push("document.getElementById('scan_qty').innerHTML =  parseInt(document.getElementById('scan_qty').innerHTML)-1;");
					innerHTML.push('"></div>')
					innerHTML.push('</div>');					
				}
				try {
					document.getElementById("express-transfer-serial-no-list").innerHTML = innerHTML.join("");					
				} catch (e) {
					console.warn(e);
					return;
				}
				
				innerHTML = undefined;
			} else {
				try {
					document.getElementById("express-transfer-serial-no-list").innerHTML = "";					
				} catch (e) {
					console.warn(e);
					return;
				}
			}
			
			$("#express-transfer-serialized-item-window").jqxWindow("open");
		}

	},
	getExpressAddedItemsByItemSid: function(item_sid) {
		var i, len, obj;
		if (item_sid === undefined || item_sid < 1) {
			return undefined;
		}
		
		if (WRPAdminApp.pagescript._expressAddedItems === undefined) {
			WRPAdminApp.pagescript._expressAddedItems = [];
		}
		
		for (i = 0, len = WRPAdminApp.pagescript._expressAddedItems.length; i < len; i++) {
			obj = WRPAdminApp.pagescript._expressAddedItems[i];
			if (obj.item_sid === item_sid) {
				return obj;
			}
		}
		
		return undefined;
	},
	geToExpressPage: function(){
		var date, transfer_id, tmp, store_id;
	   
		if(WRPAdminApp.pagescript._selectedToStore==undefined || WRPAdminApp.pagescript._selectedToStore==0){
			WRPCommon.MsgBoxModule.alert({
				message: "Select Store" 
			});
			return;
		}
	   
		date = WRPCommon.TimeModule.getTime();
		store_id = document.getElementById("select-store").value;
		
		transfer_id = [];
		transfer_id.push("TRANS_EXP_");
		
		if (store_id.length > 0) {
			transfer_id.push(store_id.toUpperCase());
			transfer_id.push("_");
		}

		tmp = (date.getMonth() + 1);
		if (tmp < 10) {
			transfer_id.push("0");
		}
		transfer_id.push(tmp);

		tmp = date.getDate();
		if (tmp < 10) {
		   transfer_id.push("0");
		}
		transfer_id.push(tmp);
   	
		tmp = date.getFullYear();
		transfer_id.push(tmp);
		transfer_id.push("_");
   	
		tmp = Math.floor(Math.random() * 10000) + 1000;

		if(tmp > 10000){
			tmp = tmp-1000;
		}
   	
		transfer_id.push(tmp);
   	
		WRPAdminApp.pagescript._newTransferId = transfer_id.join("");
   	
		$('#express-transfer-step-02').jqxWindow('open');
		$('#express-transfer-step-01').jqxWindow('close');
	   
		document.getElementById('transfer-order-id').innerHTML = WRPAdminApp.pagescript._newTransferId;
		document.getElementById('confirm-transfer-order-id').innerHTML = WRPAdminApp.pagescript._newTransferId;
		document.getElementById('trans-order-from').innerHTML = store_id;
		document.getElementById('confirm-trans-order-from').innerHTML = store_id;
		document.getElementById('trans-order-to').innerHTML = WRPAdminApp.pagescript._selectedToStore;
		document.getElementById('confirm-trans-order-to').innerHTML = WRPAdminApp.pagescript._selectedToStore;
   },
   goToExpressConfirmPage: function(){
	   var elem, i, total, _expressAddedItems;
	   
	   for(i =0; i < WRPAdminApp.pagescript._expressAddedItems.length; i++) {
			if(parseInt(WRPAdminApp.pagescript._expressAddedItems[i].pre_qty) == 0) { 
	    		WRPCommon.MsgBoxModule.alert({
	    			message: "Qty must be greater than 0."
	    		});
				return; 
			}
			
			if(WRPAdminApp.pagescript._expressAddedItems[i].item_type < 2) {
				if(parseInt(WRPAdminApp.pagescript._expressAddedItems[i].pre_qty) !=  parseInt(WRPAdminApp.pagescript._expressAddedItems[i].qty)) { 
					WRPCommon.MsgBoxModule.alert({
						message: "Quantity and Imei are different."
					});
					return; 
				}
			}
		}
	   
	   WRPAdminApp.pagescript.getCurrentTime();
	   $('#express-transfer-step-03').jqxWindow('open');
	   $('#express-transfer-step-02').jqxWindow('close');

	   _expressAddedItems = WRPAdminApp.pagescript._expressAddedItems;
	   
	   elem = $('#express-trans-order-items-list');
	   if (elem) {				
			elem.jqxGrid("clear");
			elem.jqxGrid("clearselection");
			elem.jqxGrid("addrow",null,_expressAddedItems,"last");
		}
	   $("#express-trans-order-serialized-items").jqxGrid("clear");
	   
	   total = 0;
	   for(i=0; i < _expressAddedItems.length; i++){
		   total = total + parseInt(_expressAddedItems[i].pre_qty);
	   }
	   
	   document.getElementById('confirm-transfer-total-qty').innerHTML = total;
	   //console.log(WRPAdminApp.pagescript._expressAddedItems);
	   //console.log(WRPAdminApp.pagescript._expressSerialNoList);
	   //console.log(WRPAdminApp.pagescript._expressSelectedAddedItemSid);
   },
   getSerialNoList: function(event){
	   var rowdata, expressSerialNoList, elem, data, i, obj;
	   rowdata = event.args.row;
	   
	   expressSerialNoList = WRPAdminApp.pagescript._expressSerialNoList;
	   data = [];
	   
	   if(!expressSerialNoList[rowdata.item_sid]){
		   $("#express-trans-order-serialized-items").jqxGrid("clear");	
		   return;
	   }
	   
	   for(i=0; i < expressSerialNoList[rowdata.item_sid].length; i++){
		   obj = {};
		   obj.item_code = rowdata.item_code;
		   obj.description = rowdata.description;
		   obj.serialNo = expressSerialNoList[rowdata.item_sid][i];
		   data.push(obj);
	   }
	   
	   
	   elem = $("#express-trans-order-serialized-items");
	   if (elem) {				
			elem.jqxGrid("clear");				
			elem.jqxGrid("addrow",null,data,"last");
		}
	   
   },
   getCurrentTime: function(){
	   var date;
	   date = WRPCommon.TimeModule.getTime();
	   
	   document.getElementById('confirm-transfer-date').innerHTML = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear() + " " + WRPAdminApp.toDecimalFormat(date.getHours(), "00") + ":"+WRPAdminApp.toDecimalFormat(date.getMinutes(), "00");
   },
   printExpressItemsList: function(){
	   var elem, i, len, obj, serial;
		
		if (WRPAdminApp.pagescript._expressAddedItems === undefined) {
			WRPAdminApp.pagescript._expressAddedItems = [];
		}
		
		if (WRPAdminApp.pagescript._expressSerialNoList === undefined) {
			WRPAdminApp.pagescript._expressSerialNoList = {};
		}
		
		elem = $('#express-trans-request-items-list');
		
		if (elem) {
			elem.jqxGrid("clear");
			for (i =0, len = WRPAdminApp.pagescript._expressAddedItems.length; i < len; i++) {
				obj = WRPAdminApp.pagescript._expressAddedItems[i];
				
				if (obj.item_type < 3) {
					serial = WRPAdminApp.pagescript._expressSerialNoList[obj.item_sid];
					if (serial !== undefined) {
						obj.qty = serial.length;
					}
				} else {
					if (obj.qty != obj.pre_qty) {
						obj.qty = obj.pre_qty;
					}
					obj.qty = 0;
				}
			}
			elem.jqxGrid("addrow", null, WRPAdminApp.pagescript._expressAddedItems, "last");
			
		}
	},
	inputSerialNoInExpresss: function(serial_no) {
		var item_code, store_id;
		
		if (serial_no === undefined || serial_no.length < 1) {	
		   WRPCommon.MsgBoxModule.alert({
			   message: "Input Serial no."
		   });
		   return;
		}
		
		try {
			store_id = document.getElementById("select-store").value;
			if (store_id.length == 0) {
				return;
			}
		} catch (e) {
			console.warn(e);
		}
		
		serial_no = serial_no.toUpperCase();
		item_code = document.getElementById("express-transfer-serialized-item-item-code").innerHTML;
		
		$.ajax({
           url: "ajax/inven_transfer/getSerialNo.jsp",
           data: {
               storeId: store_id,
               serialNo: arguments[0],
               item_code: item_code
           },
           method: "POST",
           dataType: "json",
           success: function(result) {
        	   var data, serialItemList, i, len, obj, innerHTML;

        	   data = result.data;

               if(!data){
           		WRPCommon.MsgBoxModule.alert({
           			message: "There is no item with serial no."
           		});
               	return;
               }
               
               if(parseInt(document.getElementById("scan_qty").innerHTML) == parseInt(document.getElementById("input_qty").innerHTML)) { 
           		WRPCommon.MsgBoxModule.alert({
           			message: "Quantity exceeded."
           		});
           		return; 
           	}

               if($("#sn"+data.serial_no).val() != undefined) { 
           		WRPCommon.MsgBoxModule.alert({
           			message: "This item is already added"
           		});
               	return; 
               }
               
               if(data){
            	   WRPAdminApp.pagescript.inputSerialNo(data.serial_no, 'express-transfer-serial-no-list','<div class=\'item\'><div class=\'serial\' id=\'sn'+data.serial_no+'\'>{serial}</div><div class=\'remove-item-btn\' onclick=\'this.parentNode.parentNode.removeChild(this.parentNode);document.getElementById("scan_qty").innerHTML = parseInt(document.getElementById("scan_qty").innerHTML)-1;\'></div></div>');
            	   document.getElementById("scan_qty").innerHTML = parseInt(document.getElementById("scan_qty").innerHTML)+1;
               }
        	   
           }
       });
	},
	inputSerialNo: function(serial_no, print_element_id, print_str_format) {
		var elem, print_str;
		if (serial_no === undefined || serial_no.length < 1) {
			alert("Enter Serial no.");
			return;
		}
		elem = document.getElementById(print_element_id);
		if (elem) {
			print_str = print_str_format.replace(/{serial}/gi, serial_no);
			
			elem.innerHTML = elem.innerHTML + print_str;
		}
	},
	submitSerialItems: function(serial_no_list_id, grid_id) {
		var list, i, len, elem, serial_no_list;
		
		if (WRPAdminApp.pagescript._expressSelectedAddedItemSid < 1) {
			return;
		}
		
		list = document.getElementById('express-transfer-serial-no-list');
		if (!list) {
			return;
		}
		
		if (WRPAdminApp.pagescript._expressSerialNoList === undefined) {
			WRPAdminApp.pagescript._expressSerialNoList = {};
		}
		
		serial_no_list = WRPAdminApp.pagescript._expressSerialNoList[WRPAdminApp.pagescript._expressSelectedAddedItemSid];
		serial_no_list = [];
		WRPAdminApp.pagescript._expressSerialNoList[WRPAdminApp.pagescript._expressSelectedAddedItemSid] = serial_no_list;
		
		for (i = 0, len = list.children.length; i < len; i++) {
			elem = list.children[i];
			if (elem.children.length == 2) {
				if (elem.children[0].innerText.length > 0) {
					serial_no_list.push(elem.children[0].innerText);
				}
			}
		}
		
		WRPAdminApp.pagescript.printExpressItemsList();
		$('#express-transfer-serialized-item-window').jqxWindow('close');
		
	},
	confirmSaveTransfer: function(){
		WRPCommon.MsgBoxModule.confirm({
			message: "Are you sure?",
			noBtnClick: function(){
				return;
			},
			yesBtnClick: function(){
				WRPAdminApp.pagescript.setExpressTransfer();
			}
		});
	},
	setExpressTransfer: function() {
		var param, tmp, i, len, obj;
		
		if (WRPAdminApp.pagescript._expressAddedItems === undefined || WRPAdminApp.pagescript._expressAddedItems.length == 0) {
			WRPCommon.MsgBoxModule.alert({
				message: "Add items"
			});
			return;
		}
		
		param = {};
		
		try {
			param.store_id = document.getElementById("select-store").value;
			if (param.store_id.length < 1) {
				param = undefined;
				return;
			}
		} catch (e) {
			console.warn(e);
			param = undefined;
			return;
		}

		try {
			param.to_store_id = WRPAdminApp.pagescript._selectedToStore;
			if (param.to_store_id.length < 1) {
				param = undefined;
				return;
			}
		} catch (e) {
			console.warn(e);
			param = undefined;
			return;
		}
		
		try {
			param.trans_id = WRPAdminApp.pagescript._newTransferId;
			if (param.trans_id.length < 1) {
				param = undefined;
				return;
			}
		} catch (e) {
			console.warn(e);
			param = undefined;
			return;
		}	
		

		try {
			param.note = document.getElementById("express-transfer-note").value;
		} catch (e) {
			console.warn(e);
			param = undefined;
			return;
		}	
		
		try {
			
			/*for(i =0; i < WRPAdminApp.pagescript._expressAddedItems.length; i++) {
				if(WRPAdminApp.pagescript._expressAddedItems[i].item_type < 2) {
					if(parseInt(WRPAdminApp.pagescript._expressAddedItems[i].pre_qty) !=  parseInt(WRPAdminApp.pagescript._expressAddedItems[i].qty)) { 
						WRPCommon.MsgBoxModule.alert({
							message: "Quantity and Imei are different."
						});
						return; 
					}
				}
			}*/
			
			param.trans_items_list_str = JSON.stringify(WRPAdminApp.pagescript._expressAddedItems);
		} catch (e) {
			console.warn(e);
			param = undefined;
			return;
		}		
		
		try {
			param.trans_serialized_items = JSON.stringify(WRPAdminApp.pagescript._expressSerialNoList);
			
		} catch (e) {
			console.warn(e);
			param = undefined;
			return;
		}		

        try {
        	document.getElementById("loading-container").style.display = "block";
        } catch (e) {
        	console.warn(e);
        }
        
		$.ajax({
			url: "ajax/inven_transfer/setExpressTransfer.jsp",
			data: param,
			method: "POST",
			dataType: "json",
			success: function(result) {
				if (result === 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							try {
								$("#express-transfer-step-03").jqxWindow("close");	
								WRPAdminApp.pagescript.getExpressTransList();						
							} catch (e) {
								console.warn(e);
							}
						}
					});
					
				} else {
					alert("Error : " + result);
				}	
		        
		        try {
		        	document.getElementById("loading-container").style.display = "none";
		        } catch (e) {
		        	console.warn(e);
		        }				
		        
			}			
		});
	}
	
};