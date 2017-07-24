var _pagescript = {
    _inputReqTransferId: undefined,
    _selectedStoreId: undefined,
    _selectedTransSid: 0,
    _selectedTransItemSid: 0,
    _selectedOrderTransSid: 0,
    orderItems: [],
    _newTransferId: undefined,
    init: function() {
    	var elem, components,date,start;
    	try {
			WRPComponents('div[pagename="inven_transfer"] > .page-submenu-container > .submenu[panelname="request_list"]').addShadowedImage('img/icon/request_list.png');
			WRPComponents('div[pagename="inven_transfer"] > .page-submenu-container > .submenu[panelname="order_list"]').addShadowedImage('img/icon/order_list.png');
			WRPComponents('div[pagename="inven_transfer"] > .page-submenu-container > .submenu[panelname="transfer_adjustment"]').addShadowedImage('img/icon/transfer_adjustment.png');
		} catch (e) {
			
		}
		
		elem = $("#transfer-request-list");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'request_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'user_id', type: 'string'},
							{ name: 'req_date', type: 'string'},
							{ name: 'appr_user', type: 'string'},
							{ name: 'appr_date', type: 'string'},
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
						{ text : 'Request ID',datafield : 'request_id', width : '30%', align: 'center'},
						{ text : 'Store', datafield : 'from_store_id', width : '15%', align: 'center'}, 
						{ text : 'Employee', datafield : 'user_id', width : '15%', align: 'center'}, 
						{ text : 'Date', datafield : 'req_date', width : '17%', align: 'center' }, 
						{ text : 'Status',datafield : 'status_str', width : '13%', align: 'center'},
						{ text: "Action", width: '10%', editable: false,datafield : 'button', align: 'center', autoCellHeight: false, cellsRenderer: function () { 
							if(arguments[5] && arguments[5].status == 0) { 
								var sid = arguments[5].sid;
								return '<input type="button" style="width:50%;height:100%;border-color:white;" onclick="WRPAdminApp.pagescript._selectedTransSid='+sid+';WRPAdminApp.pagescript.openAssign();" value="Accept"/>'
								+'<input type="button" style="width:50%;height:100%;border-color:white;" onclick="WRPAdminApp.pagescript._selectedTransSid='+sid+';$(\'#reject-transfer-pop\').jqxWindow(\'open\');" value="Reject"/>'; 
							} else { 
								return " "; 
								}
							}

						},

				],
			});
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedTransSid=event.args.row.sid;
				WRPAdminApp.pagescript.getReqItems();
				WRPAdminApp.pagescript.getRequestTransaction(event);
				WRPAdminApp.pagescript.getRequestTrackingLog();
			});
		}
		
		elem = $("#transfer-request-item-detail-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
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
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '30%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Request Qty', datafield : 'reqQty', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Assign Qty', datafield : 'apprQty', width : '10%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#transfer-request-transaction-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'appr_user', type: 'string'},
							{ name: 'appr_date', type: 'string'},
							{ name: 'status_str', type: 'string'},
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
						{ text : 'Transaction ID', datafield : 'trans_id',width : '26%', align: 'center'}, 
						{ text : 'Assign Store', datafield : 'to_store_id',width : '17%', align: 'center'}, 
						{ text : 'Assigner', datafield : 'appr_user', width : '17%', align: 'center',cellsalign:'center'}, 
						{ text : 'Date', datafield : 'appr_date', width : '13%', align: 'center',cellsalign:'center' }, 
						{ text : 'Status', datafield : 'status_str', width : '12%', align: 'center',cellsalign:'center' }, 
						{ text: "Action", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Detail'; }
							,buttonclick: function(row){
								WRPAdminApp.pagescript.getReqTransactionDetail(row);
							}
						}
				],

			});
		}
		
		elem = $("#transfer-request-tracking-log");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'location', type: 'string'},
							{ name: 'event', type: 'string'},
							{ name: 'employee', type: 'string'},
							{ name: 'date', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '10%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Location', datafield : 'location',width : '22%', align: 'center'}, 
						{ text : 'Event', datafield : 'event',width : '24%', align: 'center'}, 
						{ text : 'Employee', datafield : 'employee', width : '22%', align: 'center',cellsalign:'center'}, 
						{ text : 'Date', datafield : 'date', width : '22%', align: 'center',cellsalign:'center' }, 
				],

			});
		}

		elem = $("#req-transaction-tracking-log");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '30%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'location', type: 'string'},
							{ name: 'event', type: 'string'},
							{ name: 'employee', type: 'string'},
							{ name: 'date', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '10%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Location', datafield : 'location',width : '22%', align: 'center'}, 
						{ text : 'Event', datafield : 'event',width : '24%', align: 'center'}, 
						{ text : 'Employee', datafield : 'employee', width : '22%', align: 'center',cellsalign:'center'}, 
						{ text : 'Date', datafield : 'date', width : '22%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#transfer-request-item-list");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '40%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
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
				editable : true,
				theme : 'arctic',
				columnsresize:true,
				selectionmode: 'none',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden:true},
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Requested Store',datafield : 'from_store_id',editable: false, width : '15%', align: 'center'},
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '18%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Request Qty', datafield : 'reqQty', width : '12%', align: 'center',cellsalign:'center',editable: false }, 
						{ text : 'Assign Qty', datafield : 'apprQty', width : '10%', align: 'center',cellsalign:'center' }, 
						
				]
			});
			elem.on("cellendedit", function(event) { 
				var index = event.args.rowindex;
				var value = event.args.value;
				
					WRPAdminApp.pagescript.orderItems[index].apprQty = value;
			});
		}
		
		elem = $("#assign-transfer-store-list");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '40%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'market_code', type: 'string'},
							{ name: 'district_code', type: 'string'},
							{ name: 'storeId', type: 'string'},
							{ name: 'address', type: 'string'},
							{ name: 'tel', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				selectionmode: 'checkbox',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid', hidden:true},
						{ text : 'Market',datafield : 'market_code', width : '15%', align: 'center'},
						{ text : 'District', datafield : 'district_code', width : '15%', align: 'center'}, 
						{ text : 'Store', datafield : 'storeId', width : '16%', align: 'center'}, 
						{ text : 'Address', datafield : 'address', width : '25%', align: 'center' }, 
						{ text : 'Phone', datafield : 'tel', width : '15%', align: 'center' }, 
						{ text: "Action", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Detail'; }
							,buttonclick: function(row){
								WRPAdminApp.pagescript.searchStoreTransItem(row);
							}
						}
						
				]
			});
			elem.on("rowselect", function(event){
				var selectIndex = $("#assign-transfer-store-list").jqxGrid('getselectedrowindexes');
				if(selectIndex.length > 1){
					$("#assign-transfer-store-list").jqxGrid('unselectrow', selectIndex[0]);
				}
				WRPAdminApp.pagescript._selectedStoreId = event.args.row.storeId;
			});
		}
		
		elem = $("#transfer-assign-item-list");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '55%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'appr_qty', type: 'string'},
							{ name: 'qty', type: 'string'},
							{ name: 'remain_qty', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				selectionmode: 'none',
				columns : 
					[ 
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code', width : '20%', align: 'center'}, 
						{ text : 'Description', datafield : 'description', width : '30%', align: 'center'}, 
						{ text : 'On-hand Qty', datafield : 'qty', width : '15%', align: 'center',cellsalign:'center' },
						{ text : 'Transfer Qty', datafield : 'appr_qty', width : '15%', align: 'center',cellsalign:'center' }, 
						{ text : 'Remain Qty', datafield : 'remain_qty', width : '15%', align: 'center',cellsalign:'center' }
				]
			});
		}
		
		elem = $("#confirm-transfer-appr-items");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '55%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'appr_qty', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				selectionmode: 'none',
				columns : 
					[ 
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Request Store', datafield : 'from_store_id', width : '15%', align: 'center'}, 
						{ text : 'Assigned Store', datafield : 'to_store_id', width : '15%', align: 'center'}, 
						{ text : 'Item Code', datafield : 'item_code', width : '20%', align: 'center' }, 
						{ text : 'Description', datafield : 'description', width : '35%', align: 'center' }, 
						{ text : 'Qty', datafield : 'appr_qty', width : '10%', align: 'center',cellsalign:'center' }, 
				]
			});
		}
		
		elem = $("#search-store-transfer-item-list");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '80%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'qty', type: 'number'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				selectionmode: 'none',
				columns : 
					[ 
						{ text: 'CT', datafield: '', columntype: 'number', width: '7%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code', width : '20%', align: 'center'}, 
						{ text : 'Description', datafield : 'description', width : '34%', align: 'center'}, 
						{ text : 'On-hand Qty', datafield : 'qty', width : '13%', align: 'center',cellsalign:'center' }, 
						{ text : 'Transfer Qty', datafield : 'transferQty', width : '13%', align: 'center',cellsalign:'center' }, 
						{ text : 'Remain Qty', datafield : 'remainQty', width : '13%', align: 'center',cellsalign:'center' }, 
				]
			});
		}
		
		elem = $("#transfer-order-list");
		if(elem){
			elem.jqxGrid({
				width : '100%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'request_id', type: 'string'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'appr_date', type: 'string'},
							{ name: 'appr_user', type: 'string'},
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
						{ text : 'Request ID',datafield : 'request_id', width : '20%', align: 'center'},
						{ text : 'Trans Order ID',datafield : 'trans_id', width : '20%', align: 'center'},
						{ text : 'Req Store', datafield : 'from_store_id', width : '10%', align: 'center'}, 
						{ text : 'Assign Store', datafield : 'to_store_id', width : '10%', align: 'center'}, 
						{ text : 'Assinger', datafield : 'appr_user', width : '12%', align: 'center'}, 
						{ text : 'Date', datafield : 'appr_date', width : '10%', align: 'center' }, 
						{ text : 'Status',datafield : 'status_str', width : '11%', align: 'center'},
						{ text: "Action", width: '7%', editable: false,columnType : 'button', align: 'center', autoCellHeight: false, 
							cellsRenderer: function () { 
								return "Detail"; 
							},buttonclick: function(row){
								WRPAdminApp.pagescript._selectedOrderTransSid = $('#transfer-order-list').jqxGrid('getcellvalue', row, "sid");
								WRPAdminApp.pagescript.getOrderListDetail();
								//WRPApp.popupscript['transfer-search-status-container'].getTransferDetail();
							}
						},

				],
			});
			elem.on("rowselect", function(event){
				WRPAdminApp.pagescript._selectedOrderTransSid=event.args.row.sid;
				WRPAdminApp.pagescript.getOrderItems();
				WRPAdminApp.pagescript.getOrderItemDetail();
				WRPAdminApp.pagescript.getOrderTrackingLog();
			});
		}
		
		elem = $("#transfer-order-item-detail-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'apprQty', type: 'string'},
							{ name: 'fulfillQty', type: 'string'},
							{ name: 'recvQty', type: 'string'},
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
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '25%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '35%', align: 'center'}, 
						{ text : 'Order Qty', datafield : 'apprQty', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Fulfill Qty', datafield : 'fulfillQty', width : '10%', align: 'center',cellsalign:'center' }, 
						{ text : 'Recv Qty', datafield : 'recvQty', width : '10%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#transfer-order-fulfill-detail-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'fulfill_qty', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '10%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '30%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Serial No', datafield : 'serial_no', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Qty', datafield : 'fulfill_qty', width : '10%', align: 'center',cellsalign:'center' }, 
				],
			});
		}

		elem = $("#transfer-order-pickup-detail-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'pickup_qty', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '10%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '30%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Serial No', datafield : 'serial_no', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Qty', datafield : 'pickup_qty', width : '10%', align: 'center',cellsalign:'center' }, 
				],
			});
		}
		
		elem = $("#transfer-order-receive-detail-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'recv_qty', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '10%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '30%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Serial No', datafield : 'serial_no', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Qty', datafield : 'recv_qty', width : '10%', align: 'center',cellsalign:'center' }, 
				],
			});
		}		

		elem = $("#transfer-order-tracking-log");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'location', type: 'string'},
							{ name: 'event', type: 'string'},
							{ name: 'employee', type: 'string'},
							{ name: 'date', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '10%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Location', datafield : 'location',width : '22%', align: 'center'}, 
						{ text : 'Event', datafield : 'event',width : '24%', align: 'center'}, 
						{ text : 'Employee', datafield : 'employee', width : '22%', align: 'center',cellsalign:'center'}, 
						{ text : 'Date', datafield : 'date', width : '22%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#order-detail-items-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '30%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'appr_qty', type: 'string'},
							{ name: 'fulfill_qty', type: 'string'},
							{ name: 'recv_qty', type: 'string'},
							{ name: 'sid', type: 'number'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Request Store', datafield : 'from_store_id', width : '15%', align: 'center'}, 
						{ text : 'Assigned Store', datafield : 'to_store_id', width : '15%', align: 'center'}, 
						{ text : 'Item Code', datafield : 'item_code', width : '17%', align: 'center' }, 
						{ text : 'Description', datafield : 'description', width : '23%', align: 'center' }, 
						{ text : 'Order Qty', datafield : 'appr_qty', width : '8%', align: 'center',cellsalign:'center' }, 
						{ text : 'Fulfill Qty', datafield : 'fulfill_qty', width : '8%', align: 'center',cellsalign:'center' }, 
						{ text : 'Receive Qty', datafield : 'recv_qty', width : '9%', align: 'center',cellsalign:'center' }, 
				]
			});
			elem.on("rowselect", WRPAdminApp.pagescript.orderSerializedDetail);
		}
		
		elem = $("#req-transaction-items-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '30%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'appr_qty', type: 'string'},
							{ name: 'fulfill_qty', type: 'string'},
							{ name: 'recv_qty', type: 'string'},
							{ name: 'sid', type: 'number'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Request Store', datafield : 'from_store_id', width : '15%', align: 'center'}, 
						{ text : 'Assigned Store', datafield : 'to_store_id', width : '15%', align: 'center'}, 
						{ text : 'Item Code', datafield : 'item_code', width : '17%', align: 'center' }, 
						{ text : 'Description', datafield : 'description', width : '23%', align: 'center' }, 
						{ text : 'Order Qty', datafield : 'appr_qty', width : '8%', align: 'center',cellsalign:'center' }, 
						{ text : 'Fulfill Qty', datafield : 'fulfill_qty', width : '8%', align: 'center',cellsalign:'center' }, 
						{ text : 'Receive Qty', datafield : 'recv_qty', width : '9%', align: 'center',cellsalign:'center' }, 
				]
			});
			elem.on("rowselect", WRPAdminApp.pagescript.getTransactionTrackingLog);
		}
		
		elem = $("#order-detail-items-serialno-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '30%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'serial_no', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				theme : 'arctic',
				columnsresize:true,
				selectionmode: 'none',
				columns : 
					[ 
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code', width : '25%', align: 'center' }, 
						{ text : 'Description', datafield : 'description', width : '40%', align: 'center' }, 
						{ text : 'Serial No', datafield : 'serial_no', width : '30%', align: 'center' }, 
					]
			});
		}
		
		elem = $("#transfer-revert-assign-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'string'},
							{ name: 'request_id', type: 'string'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'appr_user_id', type: 'string'},
							{ name: 'appr_date', type: 'string'},
							{ name: 'status', type: 'string'},
							{ name: 'status_str', type: 'string'},
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
						{ text : 'sid', datafield : 'sid', hidden:true }, 
						{ text : 'status', datafield : 'status', hidden:true }, 
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Req ID', datafield : 'request_id', width : '15%', align: 'center' }, 
						{ text : 'Trans ID', datafield : 'trans_id', width : '15%', align: 'center' }, 
						{ text : 'Req Store', datafield : 'from_store_id', width : '10%', align: 'center' }, 
						{ text : 'Assign Store', datafield : 'to_store_id', width : '10%', align: 'center' }, 
						{ text : 'Assigner', datafield : 'appr_user_id', width : '10%', align: 'center' }, 
						{ text : 'Date', datafield : 'appr_date', width : '15%', align: 'center' }, 
						{ text : 'Status', datafield : 'status_str', width : '10%', align: 'center' }, 
						{ text: "Action", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Revert'; }
							,buttonclick: function(row){
								var rowdata = $("#transfer-revert-assign-list").jqxGrid("getrowdata", row);
								WRPCommon.MsgBoxModule.confirm({
									message: "Are you sure to revert the assignment?",
									yesBtnClick: function(){
										WRPAdminApp.pagescript.saveRevertTransfer(rowdata.status,rowdata.sid);
									},
									noBtnClick: function(){
										return;
									}
								})
							}
						}
					]
			});
			elem.on("rowselect", WRPAdminApp.pagescript.getAdjustItems);
		}
		
		elem = $("#transfer-revert-fulfill-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'string'},
							{ name: 'request_id', type: 'string'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'fulfill_user_id', type: 'string'},
							{ name: 'fulfill_date', type: 'string'},
							{ name: 'status', type: 'string'},
							{ name: 'status_str', type: 'string'},
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
						{ text : 'sid', datafield : 'sid', hidden:true }, 
						{ text : 'status', datafield : 'status', hidden:true }, 
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Req ID', datafield : 'request_id', width : '15%', align: 'center' }, 
						{ text : 'Trans ID', datafield : 'trans_id', width : '15%', align: 'center' }, 
						{ text : 'Req Store', datafield : 'from_store_id', width : '10%', align: 'center' }, 
						{ text : 'Assign Store', datafield : 'to_store_id', width : '10%', align: 'center' }, 
						{ text : 'Assigner', datafield : 'fulfill_user_id', width : '10%', align: 'center' }, 
						{ text : 'Date', datafield : 'fulfill_date', width : '15%', align: 'center' }, 
						{ text : 'Status', datafield : 'status_str', width : '10%', align: 'center' }, 
						{ text: "Action", width: '10%', align: 'center', columnType: "button", autoCellHeight: false, cellsRenderer: function (row, column, value, rowData) { return 'Revert'; }
							,buttonclick: function(row){
								var rowdata = $("#transfer-revert-fulfill-list").jqxGrid("getrowdata", row);
								WRPCommon.MsgBoxModule.confirm({
									message: "Are you sure to revert the fulfillment?",
									yesBtnClick: function(row){
										WRPAdminApp.pagescript.saveRevertTransfer(rowdata.status,rowdata.sid);
									},
									noBtnClick: function(){
										return;
									}
								})
							}
						}
					]
			});
			elem.on("rowselect", WRPAdminApp.pagescript.getAdjustFulfillItems);
		}
		
		elem = $("#transfer-incomplete-receive-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'string'},
							{ name: 'request_id', type: 'string'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'to_store_id', type: 'string'},
							{ name: 'user_id', type: 'string'},
							{ name: 'recvDate', type: 'string'},
							{ name: 'status', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '5%', align: 'center',cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Req ID', datafield : 'request_id', width : '20%', align: 'center' }, 
						{ text : 'Trans ID', datafield : 'trans_id', width : '20%', align: 'center' }, 
						{ text : 'Req Store', datafield : 'from_store_id', width : '10%', align: 'center' }, 
						{ text : 'Assign Store', datafield : 'to_store_id', width : '10%', align: 'center' }, 
						{ text : 'Assigner', datafield : 'user_id', width : '10%', align: 'center' }, 
						{ text : 'Date', datafield : 'recvDate', width : '15%', align: 'center' }, 
						{ text : 'Status', datafield : 'status_str', width : '10%', align: 'center' }, 
					]
			});
			
			elem.on("rowselect", WRPAdminApp.pagescript.getIncompleteItems);
		}
		
		elem = $("#transfer-adjust-items-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
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
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '30%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Request Qty', datafield : 'reqQty', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Assign Qty', datafield : 'apprQty', width : '10%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#transfer-adjust-fulfill-items-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'from_store_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'apprQty', type: 'string'},
							{ name: 'fulfillQty', type: 'string'},
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
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '30%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '40%', align: 'center'}, 
						{ text : 'Order Qty', datafield : 'apprQty', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Fulfilled Qty', datafield : 'fulfillQty', width : '10%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		elem = $("#transfer-adjust-incomplete-items-list");
		if(elem){
			elem.jqxGrid({
				width : '99%',
				height : '99%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'number'},
							{ name: 'trans_id', type: 'string'},
							{ name: 'item_code', type: 'string'},
							{ name: 'description', type: 'string'},
							{ name: 'recv_qty', type: 'string'},
							{ name: 'fulfill_qty', type: 'string'},
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
						{ text: 'CT', datafield: '', columntype: 'number', width: '6%', align: 'center', editable: false,cellsalign:'center',
							cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } }
	 	                 },
						{ text : 'Item Code', datafield : 'item_code',editable: false, width : '17%', align: 'center'}, 
						{ text : 'Description', datafield : 'description',editable: false, width : '30%', align: 'center'}, 
						{ text : 'Serial No', datafield : 'serial_no',editable: false, width : '17%', align: 'center'}, 
						{ text : 'Fulfill Qty', datafield : 'fulfill_qty', width : '10%', align: 'center',cellsalign:'center'}, 
						{ text : 'Receive Qty', datafield : 'recv_qty', width : '10%', align: 'center',cellsalign:'center' }, 
						{ text : 'Status', datafield : 'status', width : '10%', align: 'center',cellsalign:'center' }, 
				],

			});
		}
		
		components = $('#assign-transfer-pop-01');
    	if (components) {
    		components.jqxWindow("width", 800);
    		components.jqxWindow("height", 700);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 350) });
    	}
		
		components = $('#assign-transfer-pop-02');
    	if (components) {
    		components.jqxWindow("width", 800);
    		components.jqxWindow("height", 550);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 275) });
    	}
    	
		components = $('#assign-transfer-pop-03');
    	if (components) {
    		components.jqxWindow("width", 800);
    		components.jqxWindow("height", 550);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 275) });
    	}

		components = $('#reject-transfer-pop');
    	if (components) {
    		components.jqxWindow("width", 600);
    		components.jqxWindow("height", 250);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 125) });
    	}
    	
		components = $('#transfer-store-detail-pop');
    	if (components) {
    		components.jqxWindow("width", 750);
    		components.jqxWindow("height", 550);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 375) , y: ((window.innerHeight * 0.5) - 270) });
    	}
    	
		components = $('#transfer-order-detail-pop');
    	if (components) {
    		components.jqxWindow("width", 950);
    		components.jqxWindow("height", 750);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 475) , y: ((window.innerHeight * 0.5) - 375) });
    	}
    	
		components = $('#transfer-transaction-detail-pop');
    	if (components) {
    		components.jqxWindow("width", 900);
    		components.jqxWindow("height", 650);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 325) });
    	}
    	
		components = $('#transfer-incomplete-receive-pop');
    	if (components) {
    		components.jqxWindow("width", 800);
    		components.jqxWindow("height", 500);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 250) });
    	}
    	
		$('#transfer-request-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-request-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-request-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-request-radio-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-request-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-request-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-request-radio-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-request-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-request-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-order-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-order-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-order-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-order-radio-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-order-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-order-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-order-radio-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-order-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-order-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-assign-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-assign-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-assign-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-assign-radio-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-assign-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-assign-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-fulfill-radio-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-fulfill-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-fulfill-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-fulfill-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-fulfill-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-fulfill-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-fulfill-radio-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-fulfill-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-fulfill-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-fulfill-radio-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-fulfill-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-fulfill-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-imcomplete-radio-1').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate());
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-imcomplete-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-imcomplete-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-imcomplete-radio-2').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setDate(date.getDate()-7);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-imcomplete-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-imcomplete-end-date").jqxDateTimeInput('setDate', end);
		});

		$('#transfer-adjust-imcomplete-radio-3').on('checked', function (event) {
			var start, end;
			var date = WRPCommon.TimeModule.getTime();
			end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			date.setMonth(date.getMonth()-1);
			start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
			$("#transfer-adjust-imcomplete-start-date").jqxDateTimeInput('setDate', start);
			$("#transfer-adjust-imcomplete-end-date").jqxDateTimeInput('setDate', end);
		});
		
		$('#transfer-request-radio-1').jqxRadioButton('check');
		$('#transfer-order-radio-1').jqxRadioButton('check');
		$('#transfer-adjust-assign-radio-1').jqxRadioButton('check');
		$('#transfer-adjust-fulfill-radio-1').jqxRadioButton('check');
		$('#transfer-adjust-imcomplete-radio-1').jqxRadioButton('check');
		
		WRPAdminApp.pagescript.getReqList();
		WRPAdminApp.pagescript.getOrderList();
		WRPAdminApp.pagescript.getAdjustAssginList();
		WRPAdminApp.pagescript.getAdjustFulfillList();
		WRPAdminApp.pagescript.getIncompleteReceive();
    },
    getReqList: function(){
    	var store_id, keyword, start_date, end_date;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
    		keyword = document.getElementById("transfer-request-input-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	start_date = $("#transfer-request-start-date").val();
        	end_date = $("#transfer-request-end-date").val();
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/inven_transfer/getTransferReqList.jsp",
            data: {
            	store_id: store_id,
            	keyword: keyword,
            	start_date: start_date,
            	end_date: end_date
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			for (var i = 0; i < data.length; i++){
            		switch(data[i].status){
            			case 0:
            				data[i].status_str = 'Requested';
            				break;
            			case 1:
            				data[i].status_str = 'Rejected';
            				break;
            			case 2:
            				data[i].status_str = 'Assigned';
            				break;
            			case 3:
            				data[i].status_str = 'Ready to Pickup';
            				break;
            			case 4:
            				data[i].status_str = 'In transit';
            				break;
            			case 5:
            				data[i].status_str = 'Received';
            				break;
            		}
            	}
    			
    			elem = $("#transfer-request-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    			
    			WRPAdminApp.pagescript._selectedTransSid = 0;
            }
        });
    },
    setTransferStatus: function(){
    	var data, i, len, ItemsList;
    	
    	itemsList = WRPAdminApp.pagescript.orderItems;
    	
    	data={};
    	
    	data.status = arguments[0];
    	data.transSid = WRPAdminApp.pagescript._selectedTransSid;
    	
        try {
        	data.storeId = document.getElementById("select-store").value;
            if (data.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        if(WRPAdminApp.pagescript._selectedStoreId != undefined){
        	data.toStoreId = WRPAdminApp.pagescript._selectedStoreId;
        }
        
        if(data.status == 1){
        	data.note = document.getElementById("transfer-reject-reason").value;
        }else if(data.status == 2){
        	data.note = document.getElementById("transfer-apprv-note").value;
        }
        
        if(WRPAdminApp.pagescript._newTransferId){
        	data.transferId = WRPAdminApp.pagescript._newTransferId;
        }
        
    	$.ajax({
            url: "ajax/inven_transfer/setTransferStatus.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message:"Completed",
                		okBtnClick: function(){
                			if(data.status==2){
                				$('#assign-transfer-pop-02').jqxWindow('close');
                				WRPAdminApp.pagescript.transOrderConfirm();
                			}else if(data.status==1){
                				$('#reject-transfer-pop').jqxWindow('close');
                			}

                			$("#transfer-request-list").jqxGrid("clearselection");
                			WRPAdminApp.pagescript.getReqList();
                		}
                	});
                } else {

                }
            }
        });
    },
    openAssign: function(){
    	var store_id;

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
		WRPAdminApp.pagescript.orderItems = [];
		$("#assign-transfer-store-list").jqxGrid("clear");
    	$.ajax({
            url: "ajax/inven_transfer/getTransferItemsList.jsp",
            data: {
                storeId: store_id,
                transSid: WRPAdminApp.pagescript._selectedTransSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, orderItems;
            	
                data = result.data;
                if (!data) return;

 	       		$("#assign-transfer-pop-01").jqxWindow("open");
 	       		
 	       		for(i = 0; i < data.length; i++){
	       			obj = data[i];
	       			obj.apprQty = obj.reqQty;
	       			orderItems = {};
	       			orderItems.transSid = obj.transSid;
	       			orderItems.itemCode = obj.item_code;
	       			orderItems.description = obj.description;
	       			orderItems.reqQty = obj.reqQty;
	       			orderItems.apprQty = obj.apprQty;
	       			orderItems.item_type = obj.item_type;
	       			orderItems.sid = obj.sid;
	 	       		WRPAdminApp.pagescript.orderItems.push(orderItems);
	       		}
 	       	
                elem = $("#transfer-request-item-list");
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
    getStoreListByOwnerSid: function() {
    	var data, itemsList;
    	data={};
        try {
        	data.store_id = document.getElementById("select-store").value;
            if (data.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        WRPAdminApp.pagescript._selectedStoreId = undefined;
    	
    	itemsList = WRPAdminApp.pagescript.orderItems;
    	
    	data.transItems = [];

        for (i = 0, len = itemsList.length; i < len ; i++) {
            try {
                obj = {};
                /*if(itemsList[i].apprQty == -1){
                	WRPCommon.MsgBoxModule.alert({
                		message:"Enter Assign Qty"
                	});
                	return;
                }*/
                obj.sid = itemsList[i].sid;
                obj.itemCode = itemsList[i].itemCode;
                obj.reqQty = itemsList[i].reqQty;
                obj.apprQty = itemsList[i].apprQty;
                data.transItems.push(obj);
            } catch (e) {
                console.warn(e);
                return;
            }
        }
    	
        try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
		  	console.warn(e);
		}
		
        data.transItems = JSON.stringify(data.transItems);
        
        $.ajax({
            url: "ajax/inven_transfer/getStoreListforTransfer.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem, currentStoreId;
                data = result.data;
                if (!data) return;

                elem = $("#assign-transfer-store-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
                	try { elem.find("[role='columnheader']").eq(0).find("div").remove(); } catch (e) {}  
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
    AssingTransferInven: function(){
    	var elem, orderItems, data, i, len, ItemsList;
    	data = {};
    	
    	if(WRPAdminApp.pagescript._selectedStoreId == undefined){
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select Store"
    		});
    		return;
    	}
    	
    	data.transSid = WRPAdminApp.pagescript._selectedTransSid;
    	
        try {
        	data.store_id = document.getElementById("select-store").value;
            if (data.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
		
    	itemsList = WRPAdminApp.pagescript.orderItems;
    	
    	data.transItems = [];

        for (i = 0, len = itemsList.length; i < len ; i++) {
            try {
                obj = {};
                if(itemsList[i].apprQty == -1){
                	WRPCommon.MsgBoxModule.alert({
                		message:"Enter Assign Qty"
                	});
                	return;
                }
                obj.sid = itemsList[i].sid;
                obj.itemCode = itemsList[i].itemCode;
                obj.reqQty = itemsList[i].reqQty;
                obj.apprQty = itemsList[i].apprQty;
                obj.item_type = itemsList[i].item_type;
                
                data.transItems.push(obj);
            } catch (e) {
                console.warn(e);
                return;
            }
        }
    	
        try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
		  	console.warn(e);
		}
		
        data.transItems = JSON.stringify(data.transItems);
        
        $.ajax({
            url: "ajax/inven_transfer/saveTransferItems.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem;
                if(result==0){
                	WRPAdminApp.pagescript.successSaveTransferItems();
                }
                try {
        			document.getElementById("loading-container").style.display = "none";
        		} catch (e) {
        		  	console.warn(e);
        		}
        		
            }
        });
    	
    },
    successSaveTransferItems: function(){
    	var data, itemsList;
    	
    	document.getElementById("trans-from-store").innerHTML = document.getElementById("select-store").value;
    	document.getElementById("trans-to-store").innerHTML = WRPAdminApp.pagescript._selectedStoreId;
    	
		data={};
		
		itemsList = WRPAdminApp.pagescript.orderItems;
		
		data.to_store_id = WRPAdminApp.pagescript._selectedStoreId;
		data.transSid = WRPAdminApp.pagescript._selectedTransSid;
    	
        $.ajax({
            url: "ajax/inven_transfer/getTransOrderItems.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, j, len, obj, elem;
                
                data = result.data;
                
                if(!data) return;

                $("#assign-transfer-pop-01").jqxWindow("close");
            	$("#assign-transfer-pop-02").jqxWindow("open");
            	
            	elem = $("#transfer-assign-item-list");
            	
            	for(i = 0; i < data.length; i++){
            		obj=data[i];
            		obj.remain_qty = obj.qty - obj.appr_qty;
            	}
                
            	if(elem){
            		try {
	        			elem.jqxGrid("clear");
	        			elem.jqxGrid("addRow", null, data, "last");	
	        		} catch (e) {
	        			console.warn(e);
	        		}
            		
            	}

            }
        });

    },
    assginConfirm: function() {
		var date, transfer_id, tmp, store_id;
		date = WRPCommon.TimeModule.getTime();
		
		store_id = document.getElementById("select-store").value;
		
		transfer_id = [];
		
		transfer_id.push("TRANS_ORD_");
		
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
    	
    	if(!WRPAdminApp.pagescript.checkDuplicateId(transfer_id.join(""))){
    		WRPAdminApp.pagescript._newTransferId = transfer_id.join("");
    		WRPAdminApp.pagescript.setTransferStatus(2);
    	}else{
    		WRPAdminApp.pagescript.assginConfirm();
    	}
    	
	},
	checkDuplicateId: function(){
		var store_id;
		try {
    		store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
		$.ajax({
			url: "ajax/inven_transfer/checkTransferId.jsp",
			data: {
				store_id: store_id, 
				trans_id: arguments[0]
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, len, obj, itemList, elem;

				data = result.data;
				if (data) {
					//console.log("true");
					return true;
				}else{
					//console.log("false");
					return false;
				}
           }
		});
	},
	transOrderConfirm: function(){
		var store_id;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
		$.ajax({
            url: "ajax/inven_transfer/getTransferInfo.jsp",
            data: {
            	transferSid: WRPAdminApp.pagescript._selectedTransSid,
            	store_id: store_id
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, elem, currentStoreId;
                data = result.data;
                if (!data) return;

        		$('#assign-transfer-pop-03').jqxWindow('open');
        		
                document.getElementById("confirm-trans-from-store").innerHTML = data[0].from_store_id;
                document.getElementById("confirm-trans-to-store").innerHTML = data[0].to_store_id;
                document.getElementById("confirm-trans-req-id").innerHTML = data[0].request_id;
                document.getElementById("confirm-trans-id").innerHTML = data[0].trans_id;
                document.getElementById("confirm-requested-user").innerHTML = data[0].req_user_id;
                document.getElementById("confirm-approved-user").innerHTML = data[0].appr_user_id;
                document.getElementById("confirm-requested-date").innerHTML = data[0].req_date;
                document.getElementById("confirm-approved-date").innerHTML = data[0].appr_date;
                
                elem = $("#confirm-transfer-appr-items");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    			
            }
        });
	},
	searchStoreTransItem : function(){
		var data, itemsList;
		
		data={};
		
		itemsList = WRPAdminApp.pagescript.orderItems;
		
		data.store_id = $('#assign-transfer-store-list').jqxGrid('getcellvalue', arguments[0], "storeId");
    	document.getElementById("detail-store-id").innerHTML = data.store_id;
    	
    	data.transItems = [];

        for (i = 0, len = itemsList.length; i < len ; i++) {
            try {
                obj = {};
                if(itemsList[i].apprQty == ""){
                	WRPCommon.MsgBoxModule.alert({
                		message:"Enter Assign Qty"
                	});
                	return;
                }
                obj.itemCode = itemsList[i].itemCode;
                obj.item_type = itemsList[i].item_type;
                obj.qty = itemsList[i].apprQty;
                
                data.transItems.push(obj);
            } catch (e) {
                console.warn(e);
                return;
            }
        }
        data.transItems = JSON.stringify(data.transItems);
        
        $.ajax({
            url: "ajax/inven_transfer/searchStoreTransItem.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, j, len, obj, elem;
                
                data = result.data;
                
                if(!data) return;
                
                $("#transfer-store-detail-pop").jqxWindow("open");
                
                for(i = 0; i < data.length; i++){
                	obj=data[i];
                	obj.transferQty = 0;
                	for(j = 0; j < itemsList.length; j++){
                		if(itemsList[j].itemCode == obj.item_code){
                    		obj.transferQty = obj.transferQty + parseInt(itemsList[j].apprQty);
                    	}
                	}
                	
                	obj.remainQty = obj.qty - obj.transferQty;
                }
                
                elem = $("#search-store-transfer-item-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    			
            }
        });
	},
	getReqItems: function(){
		var store_id;

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
            	var data, elem, i, obj, orderItems;
            	
                data = result.data;
                if (!data) return;
                
                elem = $("#transfer-request-item-detail-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}
 	       		document.getElementById("transfer-request-detail-note").value = (data[0].req_memo)?data[0].req_memo:"";
            }
        });
	},
    getOrderList: function(){
    	var store_id, keyword, start_date, end_date;
    	
    	try {
    		store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
    		keyword = document.getElementById("transfer-order-input-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	start_date = $("#transfer-order-start-date").val();
        	end_date = $("#transfer-order-end-date").val();
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
            url: "ajax/inven_transfer/getTransferReqList.jsp",
            data: {
            	store_id: store_id,
            	keyword: keyword,
            	start_date: start_date,
            	end_date: end_date,
            	onOrder: 1
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			
    			data = result.data;
    			if (!data) return;
    			
    			for (var i = 0; i < data.length; i++){
            		switch(data[i].status){
            			case 0:
            				data[i].status_str = 'Requested';
            				break;
            			case 1:
            				data[i].status_str = 'Rejected';
            				break;
            			case 2:
            				data[i].status_str = 'Assigned';
            				break;
            			case 3:
            				data[i].status_str = 'Ready to Pickup';
            				break;
            			case 4:
            				data[i].status_str = 'In transit';
            				break;
            			case 5:
            				data[i].status_str = 'Received';
            				break;
            		}
            	}
    			
    			elem = $("#transfer-order-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
    			}
    			
    			WRPAdminApp.pagescript._selectedTransSid = 0;
            }
        });
    },
	getOrderItems: function(){
		var store_id;

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
                transSid: WRPAdminApp.pagescript._selectedOrderTransSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, orderItems;
            	
                data = result.data;
                if (!data) return;
                
                elem = $("#transfer-order-item-detail-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}

            }
        });
	},
	getOrderItemDetail: function(){
		var store_id;

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
                transSid: WRPAdminApp.pagescript._selectedOrderTransSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, getselectedrowindexes,rowdata;
            	
                data = result.data;
                if (!data) return;
                
                getselectedrowindexes = $('#transfer-order-list').jqxGrid('getselectedrowindexes');
                rowdata = $('#transfer-order-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
                
                switch(rowdata.status){
                	case 2:
                		elem = $("#transfer-order-fulfill-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       		}
                		elem = $("#transfer-order-pickup-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       		}
                		elem = $("#transfer-order-receive-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       		}
                		document.getElementById('transfer-detail-fulfill-note').value="";
                		document.getElementById('transfer-detail-pickup-note').value="";
                		document.getElementById('transfer-detail-recv-note').value="";
                		break;
                	case 3:
                		elem = $("#transfer-order-fulfill-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       			elem.jqxGrid("addRow", null, data, "last");
         	       		}
                		elem = $("#transfer-order-pickup-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       		}
                		elem = $("#transfer-order-receive-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       		}
                		document.getElementById('transfer-detail-fulfill-note').value=(data[0].fulfill_memo)?data[0].fulfill_memo:"";
                		document.getElementById('transfer-detail-pickup-note').value="";
                		document.getElementById('transfer-detail-recv-note').value="";
                		break;
                	case 4:
                		elem = $("#transfer-order-fulfill-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       			elem.jqxGrid("addRow", null, data, "last");
         	       		}
                		elem = $("#transfer-order-pickup-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       			elem.jqxGrid("addRow", null, data, "last");
         	       		}
                		elem = $("#transfer-order-receive-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       		}
                		document.getElementById('transfer-detail-fulfill-note').value=(data[0].fulfill_memo)?data[0].fulfill_memo:"";
                		document.getElementById('transfer-detail-pickup-note').value=(data[0].pickup_memo)?data[0].pickup_memo:"";
                		document.getElementById('transfer-detail-recv-note').value="";
                		break;
                	case 5:
                		elem = $("#transfer-order-fulfill-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       			elem.jqxGrid("addRow", null, data, "last");
         	       		}
                		elem = $("#transfer-order-pickup-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       			elem.jqxGrid("addRow", null, data, "last");
         	       		}
                		elem = $("#transfer-order-receive-detail-list");
                		if (elem) {
         	       			elem.jqxGrid("clear");
         	       			elem.jqxGrid("addRow", null, data, "last");
         	       		}
                		document.getElementById('transfer-detail-fulfill-note').value=(data[0].fulfill_memo)?data[0].fulfill_memo:"";
                		document.getElementById('transfer-detail-pickup-note').value=(data[0].pickup_memo)?data[0].pickup_memo:"";
                		document.getElementById('transfer-detail-recv-note').value=(data[0].recv_memo)?data[0].recv_memo:"";
                		break;
                }
            }
        });
	},
	getOrderListDetail: function(){
		var store_id;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/inven_transfer/getTransferInfo.jsp",
        	data: {
        		transferSid: WRPAdminApp.pagescript._selectedOrderTransSid,
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem, currentStoreId;
        		data = result.data;
        		if (!data) return;

        		$('#transfer-order-detail-pop').jqxWindow('open');
        		$("#order-detail-items-serialno-list").jqxGrid("clear");
        		
        		document.getElementById("order-detail-from-store").innerHTML = data[0].from_store_id;
        		document.getElementById("order-detail-to-store").innerHTML = data[0].to_store_id;
        		document.getElementById("order-detail-req-id").innerHTML = data[0].request_id;
        		document.getElementById("order-detail-trans-id").innerHTML = data[0].trans_id;
        		document.getElementById("order-detail-requested-user").innerHTML = data[0].req_user_id;
        		document.getElementById("order-detail-approved-user").innerHTML = data[0].appr_user_id;
        		document.getElementById("order-detail-requested-date").innerHTML = data[0].req_date;
        		document.getElementById("order-detail-approved-date").innerHTML = data[0].appr_date;
        		
        		elem = $("#order-detail-items-list");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("clearselection");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
	},
	orderSerializedDetail: function(event){
		var store_id, transSid, item_code;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        transSid = event.args.row.sid;
        item_code = event.args.row.item_code;
        $.ajax({
        	url: "ajax/inven_transfer/getTransOrderSerialItemDetail.jsp",
        	data: {
        		transSid: transSid,
        		store_id: store_id,
        		item_code: item_code
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem, currentStoreId;
        		data = result.data;
        		if (!data) return;

        		elem = $("#order-detail-items-serialno-list");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
		//alert(event.args.row.sid);
	},
	getRequestTransaction: function(event){
		var rowdata, data, elem;
		rowdata = event.args.row;
		
		data={};
		
		data.sid = rowdata.sid;
		data.trans_id = rowdata.trans_id;
		data.to_store_id = rowdata.to_store_id;
		data.appr_user = rowdata.appr_user;
		data.appr_date = rowdata.req_date;
		data.status_str = rowdata.status_str;
		
		elem = $("#transfer-request-transaction-list");
 		if (elem) {
 			elem.jqxGrid("clear");
 			elem.jqxGrid("addRow", null, data, "last");
 		}
	},
	getReqTransactionDetail: function(){
		var store_id,transferSid;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        transferSid = $('#transfer-request-transaction-list').jqxGrid('getcellvalue', arguments[0], "sid");
        
        $.ajax({
        	url: "ajax/inven_transfer/getTransferInfo.jsp",
        	data: {
        		transferSid: transferSid,
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem, currentStoreId;
        		data = result.data;
        		if (!data) return;
        		
        		$('#transfer-transaction-detail-pop').jqxWindow('open');
        		$("#req-transaction-tracking-log").jqxGrid("clear");

        		document.getElementById("transaction-detail-from-store").innerHTML = data[0].from_store_id;
        		document.getElementById("transaction-detail-to-store").innerHTML = data[0].to_store_id;
        		document.getElementById("transaction-detail-req-id").innerHTML = data[0].request_id;
        		document.getElementById("transaction-detail-trans-id").innerHTML = data[0].trans_id;
        		
        		elem = $("#req-transaction-items-list");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("clearselection");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
	},
	getRequestTrackingLog: function(){
		var store_id;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/inven_transfer/getTrackingLog.jsp",
        	data: {
        		transSid: WRPAdminApp.pagescript._selectedTransSid,
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem;
        		data = result.data;
        		if (!data) return;

        		elem = $("#transfer-request-tracking-log");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
	},
	getTransactionTrackingLog: function(event){
		var store_id,transSid;
		transSid = event.args.row.sid;
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/inven_transfer/getTrackingLog.jsp",
        	data: {
        		transSid: transSid,
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem;
        		data = result.data;
        		if (!data) return;

        		elem = $("#req-transaction-tracking-log");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
	},
	getOrderTrackingLog: function(){
		var store_id;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/inven_transfer/getTrackingLog.jsp",
        	data: {
        		transSid: WRPAdminApp.pagescript._selectedOrderTransSid,
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem;
        		data = result.data;
        		if (!data) return;

        		elem = $("#transfer-order-tracking-log");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
	},
	getAdjustAssginList: function(){
		var store_id, start_date, end_date;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	start_date = $("#transfer-adjust-assign-start-date").val();
        	end_date = $("#transfer-adjust-assign-end-date").val();
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/inven_transfer/getTransferList.jsp",
        	data: {
        		store_id: store_id,
        		status: 2,
        		start_date: start_date,
        		end_date: end_date
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem;
        		data = result.data;
        		if (!data) return;

    			for (var i = 0; i < data.length; i++){
            		data[i].status_str = "Assgined"
            	}
    			
        		elem = $("#transfer-revert-assign-list");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
	},
	getAdjustFulfillList: function(){
		var store_id, start_date, end_date;

        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	start_date = $("#transfer-adjust-fulfill-start-date").val();
        	end_date = $("#transfer-adjust-fulfill-end-date").val();
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/inven_transfer/getTransferList.jsp",
        	data: {
        		store_id: store_id,
        		status: 3,
        		start_date: start_date,
        		end_date: end_date
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj, elem;
        		data = result.data;
        		if (!data) return;

    			for (var i = 0; i < data.length; i++){
            		data[i].status_str = "Fulfilled"
            	}
    			
        		elem = $("#transfer-revert-fulfill-list");
  	       		if (elem) {
  	       			elem.jqxGrid("clear");
  	       			elem.jqxGrid("addRow", null, data, "last");
  	       		}
        	}
        });
	},
	getAdjustIncompleteList: function(){
		
	},
	saveRevertTransfer: function(){
		var store_id, transSid, status;

		if(arguments.length < 2){
			return;
		}
		
		status = arguments[0];
		transSid = arguments[1];
		
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

		$.ajax({
        	url: "ajax/inven_transfer/saveRevertTransfer.jsp",
        	data: {
        		store_id: store_id,
        		status:status,
        		transSid: transSid
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message:"Completed",
                		okBtnClick: function(){
                			if(status==2){
                				WRPAdminApp.pagescript.getAdjustAssginList();
                			}else if(status==3){
                				WRPAdminApp.pagescript.getAdjustFulfillList();
                			}
                		}
                	});
                } else {

                }

    			
        	}
        });
	},
	getAdjustItems: function(event){
		var store_id, transSid, status;
		
		transSid = event.args.row.sid;
        status = event.args.row.status;
        
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
                transSid: transSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, orderItems;
            	
                data = result.data;
                if (!data) return;
                
                elem = $("#transfer-adjust-items-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}
 	       		
       			document.getElementById("transfer-adjust-note").value = (data[0].appr_memo)?data[0].appr_memo:"";
 	       		
            }
        });
	},
	getAdjustFulfillItems: function(event){
		var store_id, transSid, status;
		
		transSid = event.args.row.sid;
        status = event.args.row.status;
        
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
                transSid: transSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, orderItems;
            	
                data = result.data;
                if (!data) return;
                
                elem = $("#transfer-adjust-fulfill-items-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}
 	       		
 	       		document.getElementById("transfer-adjust-fulfill-note").value = (data[0].fulfill_memo)?data[0].fulfill_memo:"";
            }
        });
	},
	getIncompleteReceive: function(){
		var store_id;

		try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

		$.ajax({
            url: "ajax/inven_transfer/getIncompleteReceive.jsp",
            data: {
            	store_id: store_id,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, orderItems;
            	
                data = result.data;
                if (!data) return;

    			for (var i = 0; i < data.length; i++){
            		switch(data[i].status){
            			case 0:
            				data[i].status_str = 'Requested';
            				break;
            			case 1:
            				data[i].status_str = 'Rejected';
            				break;
            			case 2:
            				data[i].status_str = 'Assigned';
            				break;
            			case 3:
            				data[i].status_str = 'Ready to Pickup';
            				break;
            			case 4:
            				data[i].status_str = 'In transit';
            				break;
            			case 5:
            				data[i].status_str = 'Received';
            				break;
            		}
            	}
    			
                elem = $("#transfer-incomplete-receive-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}
            }
        });
	},
	getIncompleteItems: function(event){
		var store_id, transSid, status;
		
		transSid = event.args.row.sid;
        
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
                transSid: transSid,
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, obj, orderItems;
            	
                data = result.data;
                if (!data) return;
                
                for(i=0; i<data.length; i++){
                	if(data[i].fulfill_qty > data[i].recv_qty){
                		data[i].status="Incomplete"
                	}else{
                		data[i].status="Complete"
                	}
                }
                
                elem = $("#transfer-adjust-incomplete-items-list");
 	       		if (elem) {
 	       			elem.jqxGrid("clear");
 	       			elem.jqxGrid("addRow", null, data, "last");
 	       		}
 	       		
 	       		document.getElementById("transfer-adjust-incomplete-note").value = (data[0].recv_memo)?data[0].recv_memo:"";
            }
        });
	}
};