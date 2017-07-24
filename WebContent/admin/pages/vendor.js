
var _pagescript = {
		_selectedVendorSid: 0,
		_currPageNo: 1,
	    _maxPageNo: 1,
	    _countPerPage: 10,
		init: function() {
			var date, components;
			
			try {
				WRPComponents('div[pagename="vendor"] > .page-submenu-container > .submenu[panelname="vendor_list"]').addShadowedImage('img/icon/people_03.png');
			} catch (e) {

			}
			//jqx button

			$('#vendor-po-search-radio-1').on('checked', function (event) {
				date = new Date();
				try {
                	$("#vendor-po-search-end-date").val(WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear());
                } catch (e) {
                    console.warn(e);
                    return;
                }
                date.setDate(date.getDate() - 7);
                try {
                	$("#vendor-po-search-start-date").val(WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear());
                } catch (e) {
                    console.warn(e);
                    return;
                }
	  		 });
	        
	        $('#vendor-po-search-radio-2').on('checked', function (event) {
	        	date = new Date();
                date.setDate(date.getDate() - 14);
                try {
                	$("#vendor-po-search-start-date").val(WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear());
                } catch (e) {
                    console.warn(e);
                    return;
                }
	  		 });
	        
	        $('#vendor-po-search-radio-3').on('checked', function (event) {
	        	date = new Date();
	        	date.setMonth(date.getMonth() - 1);
                try {
                	$("#vendor-po-search-start-date").val(WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear());
                } catch (e) {
                    console.warn(e);
                    return;
                }
	  		 });
	        
			//jqx popup
			components = $('#vendor-add-window');
			if (components) {
				components.jqxWindow("width", 650);
				components.jqxWindow("height", 260);
				components.css("top", "calc(50% - 130px)");
	    		components.css("left", "calc(50% - 325px)");
			}
			components = $('#vendor-edit-window');
			if (components) {
				components.jqxWindow("width", 650);
				components.jqxWindow("height", 260);
				components.css("top", "calc(50% - 130px)");
	    		components.css("left", "calc(50% - 325px)");
			}
			//init func
			WRPAdminApp.pagescript.getVendorList();

			//jqxgrid
			components = $('#jqx-vendor-list');
			if(components){
				components.jqxGrid({
					width: '100%',
					height: '100%',
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: 'vendorId', type: 'string'},
						             { name: 'vendorName', type: 'string'},
						             { name: 'address', type: 'string'},
						             { name: 'tel', type: 'string'},
						             { name: 'contactName', type: 'string' },
						             { name: 'address1', type: 'string'},
						             { name: 'address2', type: 'string'},					
						             { name: 'city', type: 'string' },
						             { name: 'owner_id', type: 'string' },
						             { name: 'sid', type: 'string' },
						             { name: 'state', type: 'string' },
						             { name: 'zipcode', type: 'string' }
						             ]
					}),
					showfilterrow: false,
					filterable: true,
					sortable: true,
					columnsresize:true,
					theme: 'arctic',
					columns: [
					          { text: 'ID', datafield: 'vendorId', width: '15%',  cellsalign: 'right', align: 'center'},
					          { text: 'Name', datafield: 'vendorName', width: '15%',  cellsalign: 'right', align: 'center' },
					          { text: 'Address', datafield: 'address', width: '40%', cellsalign: 'right', align: 'center'},
					          { text: 'Tel', datafield: 'tel', width: '15%', cellsalign: 'right', align: 'center' },
					          { text: 'Contact Name', datafield: 'contactName', width: '15%', cellsalign: 'right', align: 'center' },
					          { text: 'Address1', datafield: 'address1', width: '15%',  cellsalign: 'right', hidden: 'true' },
					          { text: 'Address2', datafield: 'address2', width: '15%',  cellsalign: 'right', hidden: 'true' },
					          { text: 'City', datafield: 'city', width: '15%',  cellsalign: 'right', hidden: 'true' },
					          { text: 'Owner ID', datafield: 'ownerId', width: '15%',  cellsalign: 'right', hidden: 'true' },
					          { text: 'SID', datafield: 'sid', width: '15%',  cellsalign: 'right', hidden: 'true' },
					          { text: 'State', datafield: 'state', width: '15%',  cellsalign: 'right', hidden: 'true' }
					          ]
				});
				$('#jqx-vendor-list').on('rowdoubleclick', function (event){ 
					
					WRPAdminApp.pagescript._selectedVendorSid = event.args.row.bounddata.sid;
					$("#vendor-edit-id").val("");
					$("#vendor-edit-name").val("");
					$("#vendor-edit-address1").val("");
					$("#vendor-edit-address2").val("");
					$("#vendor-edit-city").val("");
					$("#vendor-edit-state").val("");
					$("#vendor-edit-zipcode").val("");
					$("#vendor-edit-mobile").val("");
					$("#vendor-edit-contact").val("");
					
					$("#vendor-edit-id").val(event.args.row.bounddata.vendorId);
					$("#vendor-edit-name").val(event.args.row.bounddata.vendorName);
					$("#vendor-edit-address1").val(event.args.row.bounddata.address1);
					$("#vendor-edit-address2").val(event.args.row.bounddata.address2);
					$("#vendor-edit-city").val(event.args.row.bounddata.city);
					$("#vendor-edit-state").val(event.args.row.bounddata.state);
					$("#vendor-edit-zipcode").val(event.args.row.bounddata.zipcode);
					$("#vendor-edit-mobile").val(event.args.row.bounddata.tel);
					$("#vendor-edit-contact").val(event.args.row.bounddata.contactName);
					
					$('#vendor-edit-window').jqxWindow('open');
				});
				$("#jqx-vendor-list").on("rowselect", function (event) {
					//$("#user-profile-id").val(event.args.row.bounddata.ID);

					//WRPAdminApp.pagescript._selectedVendorSid = event.args.row.sid;
					
					$("#vendor-profile-id").val("");
					$("#vendor-profile-name").val("");
					$("#vendor-profile-address1").val("");
					$("#vendor-profile-address2").val("");
					$("#vendor-profile-city").val("");
					$("#vendor-profile-state").val("");
					$("#vendor-profile-zipcode").val("");
					$("#vendor-profile-mobile").val("");
					$("#vendor-profile-contact").val("");
					
					$("#vendor-profile-id").val(event.args.row.vendorId);
					$("#vendor-profile-name").val(event.args.row.vendorName);
					$("#vendor-profile-address1").val(event.args.row.address1);
					$("#vendor-profile-address2").val(event.args.row.address2);
					$("#vendor-profile-city").val(event.args.row.city);
					$("#vendor-profile-state").val(event.args.row.state);
					$("#vendor-profile-zipcode").val(event.args.row.zipcode);
					$("#vendor-profile-mobile").val(event.args.row.tel);
					$("#vendor-profile-contact").val(event.args.row.contactName);

					WRPAdminApp.pagescript.getPurchaseOrderListByVendorId(event.args.row.sid);
				});
				
				$("#excelExport").click(function () {
					components.jqxGrid('exportdata', 'xls', 'jqx-vendor-list');
				});
			}
			
			components = $('#jqx-puchase-order');
			if(components){
				components.jqxGrid({
					width: '100%',
					height: '100%',
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
							{ name: 'po_id', type: 'string'},
							{ name: 'orderDate', type: 'string'},
							{ name: 'vendorId', type: 'string'},
							{ name: 'total_order_qty', type: 'string'},
							{ name: 'status', type: 'string' },
							{ name: 'amount', type: 'string' }
						]
					}),
					showfilterrow: false,
					filterable: true,
					sortable: true,
					columnsresize:true,
					theme: 'arctic',
					columns: [
						{ text: 'P.O ID', datafield: 'po_id', width: '16%', align: 'center'},
				        { text: 'Date', datafield: 'orderDate', width: '16%', filtertype: 'date', width: '16%',cellsformat: 'd', align: 'center' },
				        { text: 'Vendor ID', datafield: 'vendorId', width: '16%', align: 'center'},
				        { text: 'Status', datafield: 'status', width: '16%', align: 'center'},
				        { text: 'Qty', datafield: 'total_order_qty', width: '16%', align: 'center'},
				        { text: 'Amount', datafield: 'amount', width: '20%', cellsalign: 'right',cellsformat:'c2', align: 'center' },
					]
				});
				
				$("#excel_purchase_order").click(function () {
					$("#jqx-puchase-order").jqxGrid('exportdata', 'xls', 'jqx-puchase-order');
				});
			}
			
			$('#vendor-po-search-radio-1').jqxRadioButton('check');
		},
		syncVendorList: function() {
			var storeId;
			try {
	            storeId = document.getElementById("select-store").value;
	            if (storeId.length == 0) return;
	        } catch (e) {
	            console.warn(e);
	            return;
	        }
	        
	    	$.ajax({
	            url:  "ajax/vendor/syncVendorList.jsp",
	            data: {
	                storeId: storeId
	            },
	            method: "POST",
	            dataType: "json",
	            success: function(result) {
	            	WRPCommon.MsgBoxModule.alert({
	            		message: "Completed",
	            		okBtnClick: function(){
	    	                WRPAdminApp.pagescript.getVendorList();
	            		}
	            	});
	            }
	        });
	    },
		getVendorList: function() {
			var keyword;
			
			if (arguments.length > 0 && arguments[0] === true) {
	        	try {
	        		WRPAdminApp.pagescript._currPageNo = 1;
	        	} catch (e) {
	        		
	        	}
	        }
			
			try {
				keyword = document.getElementById("vendor-search-keyword").value;
			} catch (e) {
				console.warn(e);
			}
			
			WRPAdminApp.pagescript._selectedVendorSid = 0;
			$.ajax({
				url: "ajax/vendor/getVendorList.jsp",
				data: {
					keyword: keyword,
					curr_page_no : WRPAdminApp.pagescript._currPageNo,
	        		count_per_page : WRPAdminApp.pagescript._countPerPage
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, vendorList, i, len, obj, innerHTML, strBuffer;
					data = result.data;
					
					if (data.length > 0 && data[0].max_page_no !== undefined) {
	        			WRPAdminApp.pagescript._maxPageNo = data[0].max_page_no;
	        		}
					
					$("#jqx-vendor-list").jqxGrid('clear');
					if (!data) return;

					$("#jqx-vendor-list").jqxGrid('addrow', null, data);
				}
			});
			
		},
		informVendorData: function() {
			var i, len, elem, list;

			if (arguments.length < 1) {
				console.warn("informVendorData : no input vendor sid");
				return;
			}

			WRPAdminApp.pagescript._selectedVendorSid = parseInt(arguments[0]);
			if (isNaN(WRPAdminApp.pagescript._selectedVendorSid)) {
				console.warn("informVendorData : vendor sid format error");
				return;
			}

			if (arguments.length > 1) {
				list = document.getElementById("vendor-list");
				if (list) {
					for (i = 0, len = list.children.length; i < len; i++) {
						try {
							elem = list.children[i];
							if (elem.className === "blank") continue;
							if (elem === arguments[1]) {
								elem.className = "selected";
							} else {
								elem.className = "";
							}
						} catch (e) {

						}
					}
				}
			}

			$.ajax({
				url: "ajax/vendor/getVendorInfo.jsp",
				data: {
					vendorSid: WRPAdminApp.pagescript._selectedVendorSid
				},
				mehtod: "POST",
				dataType: "json",
				success: function(result) {
					var data;
					data= result.data;
					if (!data) return;

					try {
						document.getElementById("vendor-profile-id").value = (data.vendorId !== undefined && data.vendorId)? data.vendorId : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-name").value = (data.vendorName !== undefined && data.vendorName)? data.vendorName : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-address1").value = (data.address1 !== undefined && data.address1)? data.address1 : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-address2").value = (data.address2 !== undefined && data.address2)? data.address2 : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-city").value = (data.city !== undefined && data.city)? data.city : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-state").value = (data.state !== undefined && data.state)? data.state : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-zipcode").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-tel").value = (data.tel !== undefined && data.tel)? data.tel : "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("vendor-profile-contact-name").value = (data.contactName !== undefined && data.contactName)? data.contactName : "";
					} catch (e) {
						console.warn(e);
						return;
					}
				}
			});
		},
		getPurchaseOrderListByVendorId: function() {
			var storeId, searchPeriodStart, searchPeriodEnd, vendorId;
			var getselectedrowindexes = $('#jqx-vendor-list').jqxGrid('getselectedrowindexes');
	        var rowdata = $('#jqx-vendor-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
	        
			if (arguments.length > 1) {
				vendorId = arguments[0];
			}else {
				vendorId = rowdata.sid;
			}

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
			
			searchPeriodStart = $("#vendor-po-search-start-date").val();
	        searchPeriodEnd = $("#vendor-po-search-end-date").val();

			$.ajax({
				url : "ajax/purchase_order/getPOrderListAmountByVendorId.jsp",
				data: {
					storeId: storeId,
					vendorId: vendorId,
					searchPeriodStart: searchPeriodStart,
					searchPeriodEnd: searchPeriodEnd
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, elem;
					data=result.data;
					if (!data) return;
					
					for (var i = 0; i < data.length; i++) {
						switch(data[i].status){
						case 0:
							data[i].status = "ordered";
							break;
						case 1:
							data[i].status = "order approval";
							break;
						case 2:
							data[i].status = "fulfilled";
							break;
						case 3:
							data[i].status = "fulfill approval";
							break;
						case 4:
							data[i].status = "received";
							break;
						case 5:
							data[i].status = "received approval";
							break;
						}
						
					}
					
					elem = $("#jqx-puchase-order");
					if(elem){
						elem.jqxGrid("clear");
						elem.jqxGrid('addrow', null, data, 'last');
					}
					
				}
			});
		},
		initVendorEditContainer: function() {
			$('#vendor-add-window').jqxWindow('open');

			WRPAdminApp.pagescript._selectedVendorSid = 0;

			try {
				document.getElementById("vendor-add-id").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-name").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-address1").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-address2").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-city").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-state").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-zipcode").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-mobile").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("vendor-add-contact-name").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}
		},
		setVendorData: function() {
			var data;

			data = {};

			data.vendorSid = WRPAdminApp.pagescript._selectedVendorSid;

			try {
				data.vendorId = document.getElementById("vendor-add-id").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			if (data.vendorId.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input User ID"
            	});
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.vendorName = document.getElementById("vendor-add-name").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			if(data.vendorName.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Vendor Name"
            	});
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.address1 = document.getElementById("vendor-add-address1").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.address2 = document.getElementById("vendor-add-address2").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.city = document.getElementById("vendor-add-city").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.state = document.getElementById("vendor-add-state").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.zipcode = document.getElementById("vendor-add-zipcode").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.tel = document.getElementById("vendor-add-mobile").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.contactName = document.getElementById("vendor-add-contact").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			$.ajax({
				url: "ajax/vendor/setVendorData.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
		            	WRPCommon.MsgBoxModule.alert({
		            		message: "Completed",
		            		okBtnClick: function(){
								$('#vendor-add-window').jqxWindow('close');
								WRPAdminApp.pagescript.getVendorList();
		            		}
		            	});
					}else if (result == 1062) {
		            	WRPCommon.MsgBoxModule.alert({
		            		message: "Duplicated Vendoor."
		            	});
					}else {
		            	WRPCommon.MsgBoxModule.alert({
		            		message: "Error : " + result
		            	});
					}
				}
			});
			try {
				document.getElementById("loading-container").style.display = "none";
			} catch (e) {
				console.warn(e);
			}
		},
		editVendorData: function() {
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				console.warn(e);
			}
			var data;

			data = {};

			data.vendorSid = WRPAdminApp.pagescript._selectedVendorSid;
			try {
				data.vendorId = document.getElementById("vendor-edit-id").value;

			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			if (data.vendorId.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: data.vendorId
            	});
            	
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.vendorName = document.getElementById("vendor-edit-name").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			if(data.vendorName.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Vendor Name"
            	});
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.address1 = document.getElementById("vendor-edit-address1").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.address2 = document.getElementById("vendor-edit-address2").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.city = document.getElementById("vendor-edit-city").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.state = document.getElementById("vendor-edit-state").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.zipcode = document.getElementById("vendor-edit-zipcode").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.tel = document.getElementById("vendor-edit-mobile").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			try {
				data.contactName = document.getElementById("vendor-edit-contact").value;
			} catch (e) {
				console.warn(e);
				try {
					document.getElementById("loading-container").style.display = "none";
				} catch (e) {
					console.warn(e);
				}
				return;
			}

			$.ajax({
				url: "ajax/vendor/setVendorData.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
		            	WRPCommon.MsgBoxModule.alert({
		            		message: "Completed",
		            		okBtnClick: function(){
								$('#vendor-edit-window').jqxWindow('close');
								WRPAdminApp.pagescript.getVendorList();
		            		}
		            	});
					} else {
		            	WRPCommon.MsgBoxModule.alert({
		            		message: "Error : " + result
		            	});
					}
				}
			});
			try {
				document.getElementById("loading-container").style.display = "none";
			} catch (e) {
				console.warn(e);
			}
		}
};