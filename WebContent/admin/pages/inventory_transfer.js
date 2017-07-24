/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _inputReqTransferId: undefined,
    _selectedStoreId: undefined,
    _selectedTransSid: 0,
    _selectedTransItemSid: 0,
    init: function() {
    	var elem, components,date,start;
    	try {
			WRPComponents('div[pagename="inventory_transfer"] > .page-submenu-container > .submenu[panelname="inventory_transfer"]').addShadowedImage('img/icon/transfer_01.png');
		} catch (e) {
			
		}

		components = $("#jqx-inventory-transfer-history-list");
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "transId", type: "string" },
						{ name: "fromStoreId", type: "string" },
						{ name: "toStoreId", type: "string" },
						{ name: "reqDate", type: "string" },
						{ name: "reqUserId", type: "string" },
						{ name: "apprDate", type: "date" },
						{ name: "apprUserId", type: "string" },
						{ name: "shipDate", type: "date" },
						{ name: "shipUserId", type: "string" },
						{ name: "recvDate", type: "date" },
						{ name: "recvUserId", type: "string" },
						{ name: "status", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				{ text: 'Transfer ID', datafield: 'transId', width: '7%', align: 'center' },
         		   { text: 'From', datafield: 'fromStoreId', width: '7%', align: 'center' },
         		   { text: 'To', datafield: 'toStoreId', width: '7%', align: 'center' },
         		   { text: 'Request Date', datafield: 'reqDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center'},
         		   { text: 'Request User', datafield: 'reqUserId', width: '9%', align: 'center'},
         		   { text: 'Approval Date', datafield: 'apprDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center' },
         		   { text: 'Approval User', datafield: 'apprUserId', width: '9%', align: 'center'},
         		   { text: 'Ship Date', datafield: 'shipDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center'},
         		   { text: 'Ship User', datafield: 'shipUserId', width: '9%', align: 'center'},
         		   { text: 'Receive Date', datafield: 'recvDate', width: '9%',filtertype: "date", cellsformat: 'MM/dd/yyyy', align: 'center'},
         		   { text: 'Receive User', datafield: 'recvUserId', width: '9%', align: 'center'},
         		   { text: 'Status', datafield: 'status', width: '7%', align: 'center'},
				]
    		});
        		
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.transferHistoryInfo);
    	}
	
        components = $('#jqx-inventory-transfer-ship-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "transId", type: "number" },
    					{ name: "fromStoreId", type: "string" },
    					{ name: "toStoreId", type: "string" },
    					{ name: "shipDate", type: "date" },
    					{ name: "shipUserId", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
				   { text: "Transfer ID", datafield: "transId", width: "20%", align: 'center' },
				   { text: "From", datafield: "fromStoreId", width: "20%", align: 'center' },
				   { text: "To", datafield: "toStoreId", width: "20%", align: 'center'},
				   { text: "Ship Date", datafield: "shipDate", width: "20%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
				   { text: "Ship User", datafield: "shipUserId", width: "20%", align: 'center' },
				]
    		});
    		
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.informTransferInfo);
    	}
    	
    	components = $('#jqx-inventory-transfer-req-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "transId", type: "number" },
    					{ name: "fromStoreId", type: "string" },
    					{ name: "toStoreId", type: "string" },
    					{ name: "reqDate", type: "date" },
    					{ name: "reqUserId", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
				   { text: "Transfer ID", datafield: "transId", width: "20%", align: 'center' },
				   { text: "From", datafield: "fromStoreId", width: "20%", align: 'center' },
				   { text: "To", datafield: "toStoreId", width: "20%", align: 'center'},
				   { text: "Request Date", datafield: "reqDate", width: "20%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
				   { text: "Request User", datafield: "reqUserId", width: "20%", align: 'center' },
				]
    		});
    		
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.informTransferInfo);
    	}
    	
    	components = $('#jqx-inventory-transfer-appr-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "transId", type: "number" },
    					{ name: "fromStoreId", type: "string" },
    					{ name: "toStoreId", type: "string" },
    					{ name: "apprDate", type: "date" },
    					{ name: "apprUserId", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
				   { text: "Transfer ID", datafield: "transId", width: "20%", align: 'center' },
				   { text: "From", datafield: "fromStoreId", width: "20%", align: 'center' },
				   { text: "To", datafield: "toStoreId", width: "20%", align: 'center'},
				   { text: "Approval Date", datafield: "apprDate", width: "20%", filtertype: "date", cellsformat: 'MM/dd/yyyy HH:mm:ss', align: 'center' },
				   { text: "Approval User", datafield: "apprUserId", width: "20%", align: 'center' },
				]
    		});
    		components.on("rowdoubleclick", WRPAdminApp.pagescript.informTransferInfo);
    	}
    
    	$("#excel-inventory-transfer-history").click(function () {
			$("#jqx-inventory-transfer-history-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-history');
        });
    	
    	$("#excel-inventory-transfer-req-history").click(function () {
			$("#jqx-inventory-transfer-req-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-req-history');
        });
    	
    	$("#excel-inventory-transfer-appr-history").click(function () {
			$("#jqx-inventory-transfer-appr-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-appr-history');
        });
    	
    	$("#excel-inventory-transfer-ship-history").click(function () {
			$("#jqx-inventory-transfer-ship-list").jqxGrid('exportdata', 'xls', 'jqx-inventory-transfer-ship-history');
        });
    	
    	date = WRPCommon.TimeModule.getTime();
    	
    	$("#inventory-transfer-history-end-date").jqxDateTimeInput('setDate', date);
    	$("#inventory-transfer-ship-end-date").jqxDateTimeInput('setDate', date);
    	$("#inventory-transfer-req-end-date").jqxDateTimeInput('setDate', date);
    	$("#inventory-transfer-appr-end-date").jqxDateTimeInput('setDate', date);
    	
    	date.setDate(date.getDate()-7);
    	start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
    	$("#inventory-transfer-history-start-date").jqxDateTimeInput('setDate', start);
    	$("#inventory-transfer-ship-start-date").jqxDateTimeInput('setDate', start);
    	$("#inventory-transfer-req-start-date").jqxDateTimeInput('setDate', start);
    	$("#inventory-transfer-appr-start-date").jqxDateTimeInput('setDate', start);
    	
		/*///*/
        WRPAdminApp.pagescript.getTransferHistoryList();
        WRPAdminApp.pagescript.getTransferRequestHistoryList();
        WRPAdminApp.pagescript.getTransferApprovalHistoryList();
        WRPAdminApp.pagescript.getTransferShipHistoryList();
    },
    informTransferInfoByTransferId: function() {
        var transferId;

        try {
            transferId = document.getElementById("inventory-req-transfer-id").value;
            if (transferId.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Transfer ID"
            	});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.pagescript._inputReqTransferId = transferId;

        $.ajax({
            url: "ajax/transfer/informTransferInfoByTransferId.jsp",
            data: {
                transferId: transferId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) {
                    return;
                }
                if (data.sid !== undefined && data.sid !== null) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "This Transfer already exists"
                	});
                    WRPAdminApp.pagescript._inputReqTransferId = undefined;
                    return;
                }

                document.getElementById('inven-transfer-req-store-keyword').value = "";
                document.getElementById('inven-transfer-req-item-keyword').value = "";
                WRPAdminApp.openPopupInPage('reqTransferContainer');
                WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='reqTransferInputIDContainer']"));
                WRPAdminApp.pagescript.getStoreListByOwnerSid();
            }
        });
    },
    getStoreListByOwnerSid: function() {
    	var keyword;
    	
        WRPAdminApp.pagescript._selectedStoreId = undefined;

        try{
            keyword = document.getElementById("inven-transfer-req-store-keyword").value;
        }catch (e){
        	console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/store/getStoreListByOwnerSid.jsp",
            data: {
            	keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML, currentStoreId;
                data = result.data;
                if (!data) return;

                try {
                    currentStoreId = document.getElementById("select-store").value;
                    if (currentStoreId.length == 0) {
                    	WRPCommon.MsgBoxModule.alert({
                    		message: "Select Store"
                    	});
                    	return;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        if (obj.storeId.toUpperCase() === currentStoreId.toUpperCase()) continue;
                        innerHTML.push('<tr store_id="');
                        innerHTML.push(obj.storeId);
                        innerHTML.push('" onclick="WRPAdminApp.pagescript.selectStore(this);">');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.storeId);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.address);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.tel);
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                    }
                }

                try {
                    document.getElementById("inventory-req-transfer-store-list").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                innerHTML = undefined;
            }
        });
    },
    selectStore: function() {
        var elem, parent, i, len, selected;

        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }
        selected = arguments[0];

        parent = selected;
        while(parent) {
            try {
                if (parent.id === "inventory-req-transfer-store-list") break;
            } catch (e) {

            }
            parent = parent.parentNode;
        }

        if (!parent) return;

        WRPAdminApp.pagescript._selectedStoreId = undefined;

        for (i = 0, len = parent.children.length; i < len; i++) {
            try {
                elem = parent.children[i];
                if (elem === selected) {
                    elem.setAttribute("class", "selected");
                    WRPAdminApp.pagescript._selectedStoreId = elem.getAttribute("store_id");
                    if (!WRPAdminApp.pagescript._selectedStoreId) {
                        console.warn("selectStore : store id error");
                        WRPAdminApp.pagescript._selectedStoreId = undefined;
                        return;
                    }
                } else {
                    elem.setAttribute("class", "");
                }
            } catch (e) {
                console.warn(e);
                return;
            }
        }
    },
    nextStepInReqTransfer: function() {

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "Select Store"
        	});
            return;
        }

        WRPAdminApp.setViewInPopup("reqTransferContainer", "selectItems");

        WRPAdminApp.pagescript.getOverlappedItemListBetweenStores();
    },
    getOverlappedItemListBetweenStores: function() {
        var storeId, keyword, param;
        param={};
        try {
        	storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
    		param.store1Id = storeId;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	param.keyword = document.getElementById("inven-transfer-req-item-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "Select Store"
        	});
            return;
        }
        
        try {
			if (document.getElementById("item-type-phone").checked == true) {
				param.searchPhone=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			if (document.getElementById("item-type-acc").checked == true) {
				param.searchAcc=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		
		try {
			if (document.getElementById("item-type-sim").checked == true) {
				param.searchSim=1;
			}
		} catch (e) {
			console.warn(e);
			return;
		}

		param.store2Id = WRPAdminApp.pagescript._selectedStoreId;
		
        $.ajax({
            url: "ajax/item/getOverlappedItemListBetweenStores.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;

                data = result.data;

                if (!data) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr item_code="');
                        innerHTML.push(obj.item_code);
                        innerHTML.push('">');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.item_code);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.model);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.description);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.qty);
                        innerHTML.push('</td>');
                        innerHTML.push('<td><div class="invoice-btn" onclick="WRPAdminApp.pagescript.transferAddItemToAddedItemsList(this);"></div></td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }

                try {
                    document.getElementById("inventory-req-transfer-items-list").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                innerHTML = undefined;
            }
        });
    },
    transferAddItemToAddedItemsList: function() {
        var addItems, selected, item_code, i, len, elem, newElem, innerHTML, tmp;

        if (arguments.length < 1) {
            console.warn("no input item");
            return;
        }

        selected = arguments[0];

        while(selected) {
            try {
                if (selected.nodeName === "TR") break;
            } catch (e) {

            }
            selected = selected.parentNode;
        }

        if (!selected || !selected.getAttribute) {
            console.warn("1st argument must be element");
            return;
        }

        item_code = selected.getAttribute("item_code");

        if (!item_code) {
            console.warn("this element doesn't contain itemcode attribute");
            return;
        }

        addItems = document.getElementById("inventory-req-transfer-added-items");

        if (!addItems) {
            return;
        }

        for (i = 0, len = addItems.children.length; i < len; i++) {
            try {
                elem = addItems.children[i];

                if (elem.getAttribute("item_code") === item_code) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "This item is already added"
                	});
                    return;
                }
            } catch (e) {
                console.warn(e);
            }
        }

        newElem = document.createElement("tr");
        newElem.setAttribute("item_code", item_code);
        try {
            innerHTML = [];
            innerHTML.push('<td>');
            innerHTML.push(selected.children[0].innerText);
            innerHTML.push('</td>');
            innerHTML.push('<td>');
            innerHTML.push(selected.children[1].innerText);
            innerHTML.push('</td>');
            innerHTML.push('<td>');
            innerHTML.push(selected.children[2].innerText);
            innerHTML.push('</td>');
            innerHTML.push('<td><input type="text" value="1"/></td>');
            innerHTML.push('<td><div class="remove-item-btn" onclick="WRPAdminApp.pagescript.transferRemoveAddedItem(this);"></div></td>');

            newElem.innerHTML = innerHTML.join("");
            innerHTML = undefined;
        } catch (e) {
            console.warn(e);
            return;
        }

        addItems.appendChild(newElem);
    },
    transferRemoveAddedItem: function() {
        var tr, parent, i, len, innerHTML;
        if (arguments.length < 1) {
            console.warn("no input item");
            return;
        }

        tr = arguments[0];

        while(tr) {
            try {
                if (tr.nodeName === "TR") break;
            } catch (e) {

            }
            tr = tr.parentNode;
        }

        if (!tr) {
            return;
        }

        parent = tr.parentNode;

        if (parent.id === "inventory-req-transfer-added-items") {
            parent.removeChild(tr);
        }
    },
    saveTransfer: function() {
        var transferData, i, len, elem, elemContainer, item, fromStoreId, toStoreId;

        try {
            fromStoreId = document.getElementById("select-store").value;
            if (fromStoreId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "Select Store"
        	});
            return;
        }

        toStoreId = WRPAdminApp.pagescript._selectedStoreId;

        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){
        		transferData = {};

    	        transferData.items = [];

    	        elemContainer = document.getElementById("inventory-req-transfer-added-items");

    	        if (!elemContainer || elemContainer.children.length < 1) {
    	        	WRPCommon.MsgBoxModule.alert({
    	        		message: "added items list is not exists"
    	        	})
    	            return;
    	        }

    	        for (i = 0, len = elemContainer.children.length ; i < len; i++) {
    	            try {
    	                elem = elemContainer.children[i];
    	                if (elem.className.indexOf("blank") > -1) continue;
    	                if (elem.children.length != 5) {
    	                    console.warn("added items error");
    	                    return;
    	                }
    	                item = {};
    	                item.item_code = elem.getAttribute("item_code");
    	                if (!item.item_code) {
    	                    console.warn("added item itemcode error");
    	                }

    	                item.qty = parseInt(elem.children[3].children[0].value);
    	                if (isNaN(item.qty)) {
    	                	WRPCommon.MsgBoxModule.alert({
    	                		message: "qty value contains non-numeric number"
    	                	});
    	                    return;
    	                }

    	                transferData.items.push(item);
    	            } catch (e) {
    	                console.warn(e);
    	                item = undefined;
    	                return;
    	            }
    	        }

    	        $.ajax({
    	            url: "ajax/transfer/saveTransfer.jsp",
    	            data: {
    	                transferData: JSON.stringify(transferData),
    	                fromStoreId: fromStoreId,
    	                toStoreId: toStoreId,
    	                transferId: WRPAdminApp.pagescript._inputReqTransferId
    	            },
    	            method: "POST",
    	            dataType: "json",
    	            success: function(result) {
    	                if (result === 0) {
    	                    WRPAdminApp.closePopup("reqTransferContainer");
    	                    WRPAdminApp.pagescript._inputReqTransferId = undefined;
    	                    WRPAdminApp.pagescript.getTransferHistoryList();
    	                } else {
    	                	WRPCommon.MsgBoxModule.alert({
    	                		message: "Error : " + result
    	                	});
    	                }
    	            }
    	        });
        	}
   
        });
        
    },
    getTransferHistoryList: function() {
        var storeId, start_date, end_date;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try{
            start_date = $("#inventory-transfer-history-start-date").val();
        }catch (e){
        	
        }
        
        try{
            end_date = $("#inventory-transfer-history-end-date").val();
        }catch (e){
        	
        }
        
        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId,
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem, data;
            	data = result.data;
            	
            	for (var i = 0; i < data.length; i++){
            		switch(data[i].status){
            			case 0:
            				data[i].status = 'Request';
            				break;
            			case 1:
            				data[i].status = 'Reject';
            				break;
            			case 2:
            				data[i].status = 'Approval';
            				break;
            			case 3:
            				data[i].status = 'Ship';
            				break;
            			case 4:
            				data[i].status = 'Received';
            				break;
            		}
            	}
            	
            	elem = $("#jqx-inventory-transfer-history-list");
            	
            	if(elem){
            		elem.jqxGrid("clear"); 
                	elem.jqxGrid("addrow", null, data);
            	}
            }
        });
    },
    getTransferRequestHistoryList: function() {
        var storeId,start_date,end_date;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try{
            start_date = $("#inventory-transfer-req-start-date").val();
        }catch (e){
        	
        }
        
        try{
            end_date = $("#inventory-transfer-req-end-date").val();
        }catch (e){
        	
        }

        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId,
                status: 0,
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-inventory-transfer-req-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}

                try {
                    document.getElementById("inventory-total-transfer-req-count").innerHTML = data.length;
                } catch (e) {
                    console.warn(e);
                }
            }
        });
    },
    getTransferApprovalHistoryList: function() {
        var storeId,start_date,end_date ;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try{
           start_date = $("#inventory-transfer-appr-start-date").val();
        }catch (e){
        	
        }
        
        try{
            end_date = $("#inventory-transfer-appr-end-date").val();
        }catch (e){
        	
        }

        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId,
                status: 2,
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-inventory-transfer-appr-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}

                try {
                    document.getElementById("inventory-total-transfer-appr-count").innerHTML = data.length;
                } catch (e) {
                    console.warn(e);
                }
            }
        });
    },
    getTransferShipHistoryList: function() {
        var storeId,start_date,end_date;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try{
            start_date = $("#inventory-transfer-ship-start-date").val();
        }catch (e){
        	
        }
        
        try{
            end_date = $("#inventory-transfer-ship-end-date").val();
        }catch (e){
        	
        }

        WRPAdminApp.pagescript._selectedTransSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferList.jsp",
            data: {
                storeId: storeId,
                status: 3,
                start_date: start_date,
                end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			innerHTML = [];
    			
    			elem = $("#jqx-inventory-transfer-ship-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}

                try {
                    document.getElementById("inventory-total-transfer-ship-count").innerHTML = data.length;
                } catch (e) {
                    console.warn(e);
                }

            }
        });
    },
    transferHistoryInfo: function(event) {
    	var rowdata;
    	rowdata = event.args.row.bounddata;
        /*if (arguments.length < 1) {
            console.warn("no input transfer id");
            return;
        }*/
        
    	document.getElementById("inven-transfer-appr-keyword").value = "";
        $.ajax({
            url: "ajax/transfer/getTransferInfo.jsp",
            data: {
                transferId: rowdata.transId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elementId, store_id;
                data = result.data;

                if (!data) return;

                try {
                	store_id = document.getElementById("select-store").value;
                    if (store_id.length == 0) return;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.pagescript._selectedTransSid = data.sid;
                
                try { document.getElementById("transfer-info-transfer-id").innerHTML = data.transId; } catch (e) { console.warn(e); return; }
                try { document.getElementById("transfer-info-ship-no").innerHTML = data.shipNo; } catch (e) { console.warn(e); return; }
                try { document.getElementById("transfer-info-transfer-from").innerHTML = data.fromStoreId; } catch (e) { console.warn(e); return; }
                try { document.getElementById("transfer-info-transfer-to").innerHTML = data.toStoreId; } catch (e) { console.warn(e); return; }

                WRPAdminApp.openPopupInPage('transferInfoContainer');

                elementId = "transfer-info-item-list";
                

                WRPAdminApp.pagescript.getTransferItemsList(data.sid, elementId, 5);
            }
        });
    },
    informTransferInfo: function(event) {
    	var rowdata;
    	rowdata = event.args.row.bounddata;
        /*if (arguments.length < 1) {
            console.warn("no input transfer id");
            return;
        }*/
        
    	document.getElementById("inven-transfer-appr-keyword").value = "";
        $.ajax({
            url: "ajax/transfer/getTransferInfo.jsp",
            data: {
                transferId: rowdata.transId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elementId, store_id;
                data = result.data;

                if (!data) return;

                try {
                	store_id = document.getElementById("select-store").value;
                    if (store_id.length == 0) return;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.pagescript._selectedTransSid = data.sid;

                switch (data.status) {
                    case 0:
                    	if (data.fromStoreId && store_id.toLowerCase() == data.fromStoreId.toLowerCase()) {
                    		return;
                    	}
                        try { document.getElementById("transfer-appr-transfer-id").innerHTML = data.transId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-appr-transfer-from").innerHTML = data.fromStoreId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-appr-transfer-to").innerHTML = data.toStoreId; } catch (e) { console.warn(e); return; }

                        WRPAdminApp.openPopupInPage('transferApprovalContainer');

                        elementId = "transfer-appr-item-list";
                        break;
                    case 1:
                        break;
                    case 2:
                    	if (data.fromStoreId && store_id.toLowerCase() == data.fromStoreId.toLowerCase()) {
                    		return;
                    	}
                        try { document.getElementById("transfer-ship-transfer-id").innerHTML = data.transId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-ship-transfer-from").innerHTML = data.fromStoreId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-ship-transfer-to").innerHTML = data.toStoreId; } catch (e) { console.warn(e); return; }

                        WRPAdminApp.openPopupInPage('transferShipContainer');

                        elementId = "transfer-ship-item-list";
                        break;
                    case 3:
                    	if (data.toStoreId && store_id.toLowerCase() == data.toStoreId.toLowerCase()) {
                    		return;
                    	}
                        try { document.getElementById("transfer-recv-transfer-id").innerHTML = data.transId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-recv-ship-no").innerHTML = data.shipNo; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-recv-transfer-from").innerHTML = data.fromStoreId; } catch (e) { console.warn(e); return; }
                        try { document.getElementById("transfer-recv-transfer-to").innerHTML = data.toStoreId; } catch (e) { console.warn(e); return; }

                        WRPAdminApp.openPopupInPage('transferRecvContainer');

                        elementId = "transfer-recv-item-list";
                        break;
                    case 4:
                        break;
                }

                WRPAdminApp.pagescript.getTransferItemsList(data.sid, elementId, data.status);
            }
        });
    },
    getTransferItemsList: function() { // parameters { transSid, output element id, status }
        var storeId, outputElementId, status, keyword;
        if (arguments.length < 3) {
            console.warn("input parameters (transSid, output element id)");
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	keyword = document.getElementById("inven-transfer-appr-keyword").value;
        } catch (e) {
        	
        }
        outputElementId = arguments[1];
        status = arguments[2];
        
        WRPAdminApp.pagescript._selectedTransItemSid = 0;

        $.ajax({
            url: "ajax/transfer/getTransferItemsList.jsp",
            data: {
                storeId: storeId,
                transSid: arguments[0],
                keyword: keyword
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;

                data = result.data;
                if (!data) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.item_code !== undefined && obj.item_code !== null)? obj.item_code : '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.model !== undefined && obj.model !== null)? obj.model : '');
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.description !== undefined && obj.description !== null)? obj.description : '');
                        innerHTML.push('</td>');
                        switch (status) {
                            case 0:
                                innerHTML.push('<td>');
                                innerHTML.push((obj.reqQty !== undefined && obj.reqQty !== null)? obj.reqQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.apprQty !== undefined && obj.apprQty !== null)? obj.apprQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitTransferApproval(\'');
                                innerHTML.push(obj.item_code);
                                innerHTML.push('\');"></div></td>');
                                innerHTML.push('</tr>');
                                break;
                            case 2:
                                innerHTML.push('<td>');
                                innerHTML.push((obj.apprQty !== undefined && obj.apprQty !== null)? obj.apprQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.shipQty !== undefined && obj.shipQty !== null)? obj.shipQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitTransferShipment(\'');
                                innerHTML.push(obj.item_code);
                                innerHTML.push('\');"></div></td>');
                                innerHTML.push('</tr>');
                                break;
                            case 3:
                                innerHTML.push('<td>');
                                innerHTML.push((obj.shipQty !== undefined && obj.shipQty !== null)? obj.shipQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.recvQty !== undefined && obj.recvQty !== null)? obj.recvQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openSubmitTransferReceive(\'');
                                innerHTML.push(obj.item_code);
                                innerHTML.push('\');"></div></td>');
                                innerHTML.push('</tr>');
                                break;
                            case 5:
                                innerHTML.push('<td>');
                                innerHTML.push((obj.reqQty !== undefined && obj.reqQty !== null)? obj.reqQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.apprQty !== undefined && obj.apprQty !== null)? obj.apprQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.shipQty !== undefined && obj.shipQty !== null)? obj.shipQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.recvQty !== undefined && obj.recvQty !== null)? obj.recvQty : '');
                                innerHTML.push('</td>');
                                innerHTML.push('<td><div class="submit-btn" onclick="WRPAdminApp.pagescript.openDetailTransferInfo(\'');
                                innerHTML.push(obj.item_code);
                                innerHTML.push('\');"></div></td>');
                                innerHTML.push('</tr>');
                                break;
                        }
                    } catch (e) {
                        console.warn(e);
                    }
                }

                try {
                    document.getElementById(outputElementId).innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }

                innerHTML = undefined;
            }
        });
    },
    openDetailTransferInfo: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item code");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemCode.jsp",
            data: {
                store_id: storeId,
                item_code: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                switch (data.item_type) {
                    case 0:
                    case 1:
                    case 2:
                        try {
                            document.getElementById("transfer-info-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-info-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-info-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferInfoContainer", "info_serialized_items");
                        WRPAdminApp.pagescript.getTransferSerializedItemsByItemCode(5, data.item_code);
                        break;
                    case 3:
                        try {
                            document.getElementById("transfer-info-non-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-info-non-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-info-non-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferInfoContainer", "info_non_serialized_items");
                        WRPAdminApp.pagescript.getTransferNonSerializedItemsByItemCode(5, data.item_code);
                        break;
                }
            }
        });
    },
    openSubmitTransferApproval: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item code");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemCode.jsp",
            data: {
                store_id: storeId,
                item_code: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                switch (data.item_type) {
                    case 0:
                    case 1:
                    case 2:
                        try {
                            document.getElementById("transfer-appr-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferApprovalContainer", "appr_serialized_items");
                        WRPAdminApp.pagescript.getTransferSerializedItemsByItemCode(0, data.item_code);
                        break;
                    case 3:
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferApprovalContainer", "appr_non_serialized_items");
                        WRPAdminApp.pagescript.getTransferNonSerializedItemsByItemCode(0, data.item_code);
                        break;
                }
            }
        });
    },
    openSubmitTransferShipment: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item code");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemCode.jsp",
            data: {
                store_id: storeId,
                item_code: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                switch (data.item_type) {
                    case 0:
                    case 1:
                    case 2:
                        try {
                            document.getElementById("transfer-ship-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferShipContainer", "ship_serialized_items");
                        WRPAdminApp.pagescript.getTransferSerializedItemsByItemCode(2, data.item_code);
                        break;
                    case 3:
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferShipContainer", "ship_non_serialized_items");
                        WRPAdminApp.pagescript.getTransferNonSerializedItemsByItemCode(2, data.item_code);
                        break;
                }
            }
        });
    },
    openSubmitTransferReceive: function() {
        var storeId;

        if (arguments.length < 1) {
            console.warn("no input item code");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemCode.jsp",
            data: {
                store_id: storeId,
                item_code: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;

                if (!data) return;

                switch (data.item_type) {
                    case 0:
                    case 1:
                    case 2:
                        try {
                            document.getElementById("transfer-recv-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferRecvContainer", "recv_serialized_items");
                        WRPAdminApp.pagescript.getTransferSerializedItemsByItemCode(3, data.item_code);
                        break;
                    case 3:
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-code").value = (data.item_code !== undefined && data.item_code !== null) ? data.item_code : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-model").value = (data.model !== undefined && data.model !== null) ? data.model : '';
                        } catch (e) {
                            console.warn(e);
                        }
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-desc").value = (data.description !== undefined && data.description !== null) ? data.description : '';
                        } catch (e) {
                            console.warn(e);
                        }

                        WRPAdminApp.setViewInPopup("transferRecvContainer", "recv_non_serialized_items");
                        WRPAdminApp.pagescript.getTransferNonSerializedItemsByItemCode(3, data.item_code);
                        break;
                }
            }
        });
    },
    getTransferSerializedItemsByItemCode: function() { // arguments [ transfer_status, item_sku ]
        var status;

        if (arguments.length < 2) {
            console.warn("Input parameters [ transfer_status, item_code ]");
            return;
        }

        status = parseInt(arguments[0]);

        $.ajax({
            url: "ajax/transfer/getTransferSerializedItemsByItemCode.jsp",
            data: {
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                currentStatus: status,
                item_code: arguments[1]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, innerHTML;

                data = result.data;

                if (!data) return;

                innerHTML = [];

                switch (status) {
                    case 0: // Open Approval Container [transfer status = Request]

                        for (i = 0, len = data.length; i < len; i++) {
                            try {
                                obj = data[i];
                                innerHTML.push('<tr trans_items_sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.item_code !== undefined && obj.item_code !== null)? obj.item_code : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push('<input type="text" id="transfer-appr-serial-no" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo(); }" value="');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo : "");
                                innerHTML.push('" />');
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push(1);
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.cancelTransferApproval(this);"></div>');
                                innerHTML.push('</td>');
                                innerHTML.push('</tr>');
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                        }

                        try {
                            document.getElementById("transfer-appr-item-serial-no-list").innerHTML = innerHTML.join("");
                        } catch (e) {
                            console.warn(e);
                        }
                        break;
                    case 2: // Open Ship Container [transfer status = Approval]

                        for (i = 0, len = data.length; i < len; i++) {
                            try {
                                obj = data[i];
                                innerHTML.push('<tr trans_items_sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.item_code !== undefined && obj.item_code !== null)? obj.item_code : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push(1);
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                //innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.cancelTransferApproval(this);"></div>');
                                innerHTML.push('</td>');
                                innerHTML.push('</tr>');
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                        }

                        try {
                            document.getElementById("transfer-ship-item-serial-no-list").innerHTML = innerHTML.join("");
                        } catch (e) {
                            console.warn(e);
                        }

                        break;
                    case 3: // Open Receive Container [transfer status = Ship]

                        for (i = 0, len = data.length; i < len; i++) {
                            try {
                                obj = data[i];
                                innerHTML.push('<tr trans_items_sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.item_code !== undefined && obj.item_code !== null)? obj.item_code : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push(1);
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                //innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.cancelTransferApproval(this);"></div>');
                                innerHTML.push('</td>');
                                innerHTML.push('</tr>');
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                        }

                        try {
                            document.getElementById("transfer-recv-item-serial-no-list").innerHTML = innerHTML.join("");
                        } catch (e) {
                            console.warn(e);
                        }

                        break;
                    case 5: // Open Information Container

                        for (i = 0, len = data.length; i < len; i++) {
                            try {
                                obj = data[i];
                                innerHTML.push('<tr trans_items_sid="');
                                innerHTML.push(obj.sid);
                                innerHTML.push('">');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.item_code !== undefined && obj.item_code !== null)? obj.item_code : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo : "");
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                innerHTML.push(1);
                                innerHTML.push('</td>');
                                innerHTML.push('<td>');
                                //innerHTML.push('<div class="remove-item-btn" onclick="WRPAdminApp.pagescript.cancelTransferApproval(this);"></div>');
                                innerHTML.push('</td>');
                                innerHTML.push('</tr>');
                            } catch (e) {
                                console.warn(e);
                                return;
                            }
                        }

                        try {
                            document.getElementById("transfer-info-item-serial-no-list").innerHTML = innerHTML.join("");
                        } catch (e) {
                            console.warn(e);
                        }

                        break;
                }

                innerHTML = undefined;
            }
        });
    },
    getTransferNonSerializedItemsByItemCode: function() {
        var status, storeId;

        if (arguments.length < 2) {
            console.warn("Input parameters [ transfer_status, item_code ]");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        status = parseInt(arguments[0]);

        $.ajax({
            url: "ajax/transfer/getTransferNonSerializedItemsByItemCode.jsp",
            data: {
                transSid: WRPAdminApp.pagescript._selectedTransSid,
                currentStatus: status,
                storeId: storeId,
                item_code: arguments[1]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, obj;

                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedTransItemSid = data.sid;

                switch (status) {
                    case 0: // Open Approval Container [transfer status = Request]
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-req-qty").value = data.reqQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        if(data.inStock !== undefined && data.inStock < 1) {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "This item is out of stock",
                        		okBtnClick: function(){
                                    try {
                                        document.getElementById("transfer-appr-non-serialized-item-appr-qty").setAttribute("readonly","");
                                    } catch (e) {
                                        console.warn(e);
                                        return;
                                    }
                                    try {
                                        obj = document.getElementById("inventory-transfer-appr-save-btn");
                                        obj.style.display = "none";
                                    } catch (e) {
                                        console.warn(e);
                                        return;
                                    }
                        		}
                        	});
                            return;
                        }
                        try {
                            document.getElementById("transfer-appr-non-serialized-item-appr-qty").value = data.apprQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        break;
                    case 2: // Open Ship Container [transfer status = Approval]
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-appr-qty").value = data.apprQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        if(data.inStock !== undefined && data.inStock < 1) {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "This item is out of stock",
                        		okBtnClick: function(){
                                    try {
                                        document.getElementById("transfer-ship-non-serialized-item-ship-qty").setAttribute("readonly","");
                                    } catch (e) {
                                        console.warn(e);
                                        return;
                                    }
                                    try {
                                        obj = document.getElementById("inventory-transfer-ship-save-btn");
                                        obj.style.display = "none";
                                    } catch (e) {
                                        console.warn(e);
                                        return;
                                    }
                        		}
                        	});
                            return;
                        }
                        try {
                            document.getElementById("transfer-ship-non-serialized-item-ship-qty").value = data.shipQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        break;
                    case 3: // Open Receive Container [transfer status = Ship]
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-ship-qty").value = data.shipQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        try {
                            document.getElementById("transfer-recv-non-serialized-item-recv-qty").value = data.recvQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        break;
                    case 5: // Open Information Container
                    	try {
                            document.getElementById("transfer-info-non-serialized-item-req-qty").value = data.reqQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        try {
                            document.getElementById("transfer-info-non-serialized-item-appr-qty").value = data.apprQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        try {
                            document.getElementById("transfer-info-non-serialized-item-ship-qty").value = data.shipQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        try {
                            document.getElementById("transfer-info-non-serialized-item-recv-qty").value = data.recvQty;
                        } catch (e) {
                            console.warn(e);
                            return;
                        }
                        break;
                }

                innerHTML = undefined;
            }
        });
    },
    transferApprGetItemInInvenBySerialNo: function() {
        var storeId, keyword, item_code;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	item_code = document.getElementById("transfer-appr-serialized-item-code").value;
            if (item_code.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            keyword = document.getElementById("transfer-appr-serial-no").value;
            document.getElementById("transfer-appr-serial-no").value = "";
            if (keyword.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Serial No"
            	});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/inventory/getSerializedItemInInvenBySerialNoAnditemCode.jsp",
            data: {
                storeId: storeId,
                serialNo: keyword,
                item_code: item_code
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elem, list, i, len;

                data = result.data;

                if (data) {
                    if (typeof(data) === "number") {
                        switch (data) {
                            case -1:
                            	WRPCommon.MsgBoxModule.alert({
                            		message: "There is no item with serial no."
                            	});
                                break;
                            case -2:
                            	WRPCommon.MsgBoxModule.alert({
                            		message: "Sold out"
                            	});
                                return;
                        }
                    } else {

                        list = document.getElementById("transfer-appr-item-serial-no-list");
                        if (!list) return;

                        for (i = 0, len = list.children.length; i < len; i++) {
                            elem = list.children[i];
                            if (elem.children.length != 4) continue;
                            if (elem.children[1].innerText.trim().length == 0) break;
                            if (elem.children[1].innerText.trim() === data.serialNo.trim()) {
                            	WRPCommon.MsgBoxModule.alert({
                            		message: "This item is already added"
                            	});
                                return;
                            }
                        }

                        elem.children[1].innerHTML = data.serialNo;
                    }
                }
            }
        });
    },
    cancelTransferApproval: function() {
        var tr;
        if (arguments.length < 1) {
            console.warn("no input element");
            return;
        }

        tr = arguments[0];

        while(tr) {
            try {
                if (tr.nodeName === "TR") break;
            } catch (e) {
                console.warn(e);
                return;
            }
            tr = tr.parentNode;
        }

        if (tr) {
            if (tr.children.length == 4) {
                tr.children[1].innerHTML = '<input type="text" id="transfer-appr-serial-no" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo(); }"/>';
            }
        }
    },
    saveTransferApprSerializedItems: function() {
        var serialNoList, i, len, tr, data, sid, obj, serialNo;

        serialNoList = document.getElementById("transfer-appr-item-serial-no-list");
        if (!serialNoList) {
            return;
        }
        
        for (i = 0, len = serialNoList.children.length; i < len; i++) {
            elem = serialNoList.children[i];
            if (!elem.children[1].innerText || elem.children[1].innerText == "") {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Serial Number."
            	});
                return;
            }
        }
        

        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){
        		data = {};
                data.transSid = WRPAdminApp.pagescript._selectedTransSid;
                try {
                    data.item_code = document.getElementById("transfer-appr-serialized-item-code").value;
                    if (data.item_code.length == 0) {
                        console.warn("saveTransferApprSerializedItems : item code error");
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                data.serialIDs = [];

                for (i = 0, len = serialNoList.children.length; i < len ; i++) {
                    try {
                        tr = serialNoList.children[i];
                        if (tr.children.length != 4) continue;
                        sid = parseInt(tr.getAttribute("trans_items_sid"));
                        if (isNaN(sid)) {
                            continue;
                        }
                        obj = {};
                        obj.sid = sid;
                        serialNo = tr.children[1].innerText.trim();
                        if (serialNo.length > 0) {
                            obj.serialNo = serialNo;
                        } else {
                            obj.serialNo = null;
                        }

                        data.serialIDs.push(obj);

                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }

                data.serialIDs = JSON.stringify(data.serialIDs);

                data.currentStatus = 0;

                $.ajax({
                    url: "ajax/transfer/saveTransferSerializedItems.jsp",
                    data: data,
                    method: "POST",
                    dataType: "json",
                    success: function(result) {
                        if (result === 0) {
                            WRPAdminApp.setViewInPopup("transferApprovalContainer", "item_list");

                            WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-appr-item-list", 0);
                        } else {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "Error : " + result
                        	});
                        }
                    }
                });
        	}
        });
        
    },
    saveTransferShipSerializedItems: function() {
        var serialNoList, i, len, tr, data, sid, obj, serialNo;

        serialNoList = document.getElementById("transfer-ship-item-serial-no-list");
        if (!serialNoList) {
            return;
        }

        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){
        		data = {};
                data.transSid = WRPAdminApp.pagescript._selectedTransSid;
                try {
                    data.item_code = document.getElementById("transfer-ship-serialized-item-code").value;
                    if (data.item_code.length == 0) {
                        console.warn("saveTransferShipSerializedItems : item code error");
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                data.serialIDs = [];

                for (i = 0, len = serialNoList.children.length; i < len ; i++) {
                    try {
                        tr = serialNoList.children[i];
                        if (tr.children.length != 4) continue;
                        sid = parseInt(tr.getAttribute("trans_items_sid"));
                        if (isNaN(sid)) {
                            continue;
                        }
                        obj = {};
                        obj.sid = sid;
                        serialNo = tr.children[1].innerText.trim();
                        if (serialNo.length > 0) {
                            obj.serialNo = serialNo;
                        } else {
                            obj.serialNo = null;
                        }

                        data.serialIDs.push(obj);

                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }

                data.serialIDs = JSON.stringify(data.serialIDs);

                data.currentStatus = 2;

                $.ajax({
                    url: "ajax/transfer/saveTransferSerializedItems.jsp",
                    data: data,
                    method: "POST",
                    dataType: "json",
                    success: function(result) {
                        if (result === 0) {
                            WRPAdminApp.setViewInPopup("transferShipContainer", "item_list");

                            WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-ship-item-list", 2);
                        } else {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "Error : " + result
                        	});
                        }
                    }
                });
        	}
        });
    },
    saveTransferRecvSerializedItems: function() {
        var serialNoList, i, len, tr, data, sid, obj, serialNo;

        serialNoList = document.getElementById("transfer-recv-item-serial-no-list");
        if (!serialNoList) {
            return;
        }

        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){
        		data = {};
                data.transSid = WRPAdminApp.pagescript._selectedTransSid;
                try {
                    data.item_code = document.getElementById("transfer-recv-serialized-item-code").value;
                    if (data.item_code.length == 0) {
                        console.warn("saveTransferRecvSerializedItems : item code error");
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                data.serialIDs = [];

                for (i = 0, len = serialNoList.children.length; i < len ; i++) {
                    try {
                        tr = serialNoList.children[i];
                        if (tr.children.length != 4) continue;
                        sid = parseInt(tr.getAttribute("trans_items_sid"));
                        if (isNaN(sid)) {
                            continue;
                        }
                        obj = {};
                        obj.sid = sid;
                        serialNo = tr.children[1].innerText.trim();
                        if (serialNo.length > 0) {
                            obj.serialNo = serialNo;
                        } else {
                            obj.serialNo = null;
                        }

                        data.serialIDs.push(obj);

                    } catch (e) {
                        console.warn(e);
                        return;
                    }
                }

                data.serialIDs = JSON.stringify(data.serialIDs);

                data.currentStatus = 3;

                $.ajax({
                    url: "ajax/transfer/saveTransferSerializedItems.jsp",
                    data: data,
                    method: "POST",
                    dataType: "json",
                    success: function(result) {
                        if (result === 0) {
                            WRPAdminApp.setViewInPopup("transferRecvContainer", "item_list");

                            WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-recv-item-list", 3);
                        } else {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "Error : " + result
                        	});
                        }
                    }
                });
        	}
        });
    },
    saveTransferApprNonSerializedItems: function() {
        var inputQty, item_code;

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "No selected transfer info"
        	});
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransItemSid < 1) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "No selected Item"
        	});
            return;
        }

        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){
        		try {
                    inputQty = parseInt(document.getElementById("transfer-appr-non-serialized-item-appr-qty").value);
                    if (isNaN(inputQty)) {
                    	WRPCommon.MsgBoxModule.alert({
                    		message: "Approval Qty value contains non-numeric characters"
                    	});
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                }

                try {
                	item_code = document.getElementById("transfer-appr-non-serialized-item-code").value;
                    if (item_code.length == 0) {
                        console.warn("saveTransferApprSerializedItems : item code error");
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                $.ajax({
                    url: "ajax/transfer/saveTransferNonSerializedItems.jsp",
                    data: {
                        currentStatus: 0,
                        transSid: WRPAdminApp.pagescript._selectedTransSid,
                        transItemSid: WRPAdminApp.pagescript._selectedTransItemSid,
                        item_code: item_code,
                        inputQty: inputQty
                    },
                    method: "POST",
                    dataType: "json",
                    success: function(result) {
                        if (result === 0) {
                            WRPAdminApp.setViewInPopup("transferApprovalContainer", "item_list");

                            WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-appr-item-list", 0);
                        } else {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "Error : " + result
                        	});
                        }
                    }
                });
        	}
        });
    },
    saveTransferShipNonSerializedItems: function() {
        var inputQty, item_code;

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "No selected transfer info"
        	});
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransItemSid < 1) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "No selected Item"
        	});
            return;
        }

        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){
        		try {
                    inputQty = parseInt(document.getElementById("transfer-ship-non-serialized-item-ship-qty").value);
                    if (isNaN(inputQty)) {
                    	WRPCommon.MsgBoxModule.alert({
                    		message: "Ship Qty value contains non-numeric characters"
                    	});
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                }

                try {
                	item_code = document.getElementById("transfer-ship-non-serialized-item-code").value;
                    if (item_code.length == 0) {
                        console.warn("saveTransferShipNonSerializedItems : item code error");
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                $.ajax({
                    url: "ajax/transfer/saveTransferNonSerializedItems.jsp",
                    data: {
                        currentStatus: 2,
                        transSid: WRPAdminApp.pagescript._selectedTransSid,
                        transItemSid: WRPAdminApp.pagescript._selectedTransItemSid,
                        item_code: item_code,
                        inputQty: inputQty
                    },
                    method: "POST",
                    dataType: "json",
                    success: function(result) {
                        if (result === 0) {
                            WRPAdminApp.setViewInPopup("transferShipContainer", "item_list");

                            WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-ship-item-list", 2);
                        } else {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "Error : " + result
                        	});
                        }
                    }
                });
        	}
        });
    },
    saveTransferRecvNonSerializedItems: function() {
        var inputQty, item_code;

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "No selected transfer info"
        	});
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransItemSid < 1) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "No selected Item"
        	});
            return;
        }

        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){
        		try {
                    inputQty = parseInt(document.getElementById("transfer-recv-non-serialized-item-recv-qty").value);
                    if (isNaN(inputQty)) {
                    	WRPCommon.MsgBoxModule.alert({
                    		message: "Recv Qty value contains non-numeric characters"
                    	});
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                }

                try {
                	item_code = document.getElementById("transfer-recv-non-serialized-item-code").value;
                    if (item_code.length == 0) {
                        console.warn("saveTransferRecvNonSerializedItems : item code error");
                        return;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                $.ajax({
                    url: "ajax/transfer/saveTransferNonSerializedItems.jsp",
                    data: {
                        currentStatus: 3,
                        transSid: WRPAdminApp.pagescript._selectedTransSid,
                        transItemSid: WRPAdminApp.pagescript._selectedTransItemSid,
                        item_code: item_code,
                        inputQty: inputQty
                    },
                    method: "POST",
                    dataType: "json",
                    success: function(result) {
                        if (result === 0) {
                            WRPAdminApp.setViewInPopup("transferRecvContainer", "item_list");

                            WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, "transfer-recv-item-list", 3);
                        } else {
                        	WRPCommon.MsgBoxModule.alert({
                        		message: "Error : " + result
                        	});
                        }
                    }
                });
        	}
        });
    },
    setTransferStatus: function() { // element, transfer_status
        var popupContainer, popupName, status, storeId, shipNo;

        if (arguments.length < 2) {
            console.warn("Input parameters (Element, trnsfer_status)");
            return;
        }

        if (WRPAdminApp.pagescript._selectedTransSid < 1) {
        	WRPCommon.MsgBoxModule.alert({
        		message: "No selected transfer info"
        	});
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

		popupContainer = arguments[0];
        status = arguments[1];
        
        WRPCommon.MsgBoxModule.confirm({
        	message: "Are you sure?",
        	noBtnClick: function(){
        		return;
        	},
        	yesBtnClick: function(){

                while(popupContainer) {
                    try {
                        if (popupContainer.getAttribute("class") === "popup-container") {
                            popupName = popupContainer.getAttribute("popupname");
                            if (popupName && popupName.length > 0) {
                                break;
                            }
                        }
                    } catch (e) {
                        console.warn(e);
                        return;
                    }

                    popupContainer = popupContainer.parentNode;
                }

                if (popupName === undefined || popupName.length == 0) {
                    return;
                }


                switch (status) {
                    case 1:
                        if (popupName !== "transferApprovalContainer") {
                            console.warn("Status 'Reject' is only applied at transferApprovalContainer popup");
                            return;
                        }
                        break;
                    case 2:
                        if (popupName !== "transferApprovalContainer") {
                            console.warn("Status 'Reject' is only applied at transferApprovalContainer popup");
                            return;
                        }
                        break;
                    case 3:
                        if (popupName !== "transferShipContainer") {
                            console.warn("Status 'Save' is only applied at transferShipContainer popup");
                            return;
                        }
                        try {
                            shipNo = document.getElementById("transfer-ship-no").value;
                        } catch (e) {

                        }
                        break;
                    case 4:
                        if (popupName !== "transferRecvContainer") {
                            console.warn("Status 'Save' is only applied at transferRecvContainer popup");
                            return;
                        }
                        break;
                    default:
                        break;
                }

                $.ajax({
                    url: "ajax/transfer/setTransferStatus.jsp",
                    data: {
                        transferStatus: status,
                        storeId: storeId,
                        transSid: WRPAdminApp.pagescript._selectedTransSid,
                        shipNo: shipNo
                    },
                    method: "POST",
                    dataType: "json",
                    success: function(result) {
                        if (result === 0) {
                            switch (status) {
                                case 1:
                                case 2:
                                    WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='transferApprovalContainer']"));
                                    break;
                                case 3:
                                    WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='transferShipContainer']"));
                                    break;
                                case 4:
                                    WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='transferRecvContainer']"));
                                    break;
                            }
                            WRPAdminApp.pagescript.getTransferHistoryList();
                            WRPAdminApp.pagescript.getTransferRequestHistoryList();
                            WRPAdminApp.pagescript.getTransferApprovalHistoryList();
                            WRPAdminApp.pagescript.getTransferShipHistoryList();
                        } else {

                        }
                    }
                });
        	}
        });
    },
    onConfirmSetTransferStatusYesClick: function() {
    	
    }
  
    /*///*/
    /*///*/
};