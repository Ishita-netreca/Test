/**
 * Created by Researcher01 on 2016-10-07.
 */
/*170122 jh*/
var _pagescript = {
		_selectedsubDealerid: 0,
		_selectedUserId: undefined,
		_searchType: 0,
		_searchKeyword: undefined,
		_selectedStoreId: undefined,
		_selectedInvoiceItems: undefined,
		_selectedInvoiceRatePlans: undefined,
		_selectedInvoiceCheckout: undefined,
		_dataCheck: 0,
		prevAssignedStoreIdList: {},
		_currPageNo: 1,
	    _maxPageNo: 1,
	    _countPerPage: 10,
		init: function() {
			
			//jqx password
			
			$("#subdealer-profile-password").jqxPasswordInput({
				height: 20, width: 184
			});
			//jqx input
			
			//jqx button
			/*
			$("#add-save-btn").on('click', function (){
				WRPAdminApp.pagescript.setUserData();
			});
			*/
			$("#add-cancel-btn").on('click', function (){
				$('#subdealer-add-window').jqxWindow('close');
			});
			
			$("#edit-save-btn").on('click', function (){
				WRPAdminApp.pagescript.editUserData();
			});
			
			$("#edit-cancel-btn").on('click', function (){
				$('#subdealer-add-window').jqxWindow('close');
			});
			
			//jqx dateinput
			try {
				elem = $(".jqx-datetime-input");

				if (elem && elem.length > 0) {                            
					elem.jqxDateTimeInput({
						width: "99%",
						formatString: "MM/dd/yyyy"
					});
				}
			} catch (e) {

			}

			components = $("#jqx-subDealer-list");
			if(components) {
				components.jqxGrid({
					width: '100%',
					height: '100%',
					source: new $.jqx.dataAdapter({
						datafields:
							[
							 { name: 'sid', type: 'string'},
							 { name: 'user_id', type: 'string'},
							 { name: 'hire_date', type: 'string'}
							 ],
							 datatype: "json"
					}),
					showfilterrow: false,
					filterable: true,
					sortable: true,
					columnsresize: true,
					theme: 'arctic',
					columns: [
			          { text: 'SID', datafield: 'sid', width: '12%',  cellsalign: 'right', hidden: 'true' },
			          { text: 'Owner Id', datafield: 'user_id', width: '50%'},
			          { text: 'Join Date', datafield: 'hire_date', width: '50%' }
			        ]
				});
				
				components.on('rowdoubleclick', function (event){ 
					if (event.args.row.bounddata.disable > 0) {
						document.getElementById("subdealer-edit-auth-disable").checked = true;
					} else {
						document.getElementById("subdealer-edit-auth-enable").checked = true;
					}
					WRPAdminApp.pagescript._selectedsubDealerid = event.args.row.bounddata.sid;
					WRPAdminApp.pagescript._selectedUserId = event.args.row.bounddata.userId;
					$('#subdealer-edit-window').jqxWindow('open');
				});
				
				components.on("rowselect", WRPAdminApp.pagescript.selectSubDealer);
			}

			components = $("#jqx-assigned-store");
			if(components) {
				components.jqxGrid({
					width: '100%',
					height: '100%',
					source: new $.jqx.dataAdapter({
						datafields:
							[
							 { name: 'store_id', type: 'string'},
							 { name: 'tel', type: 'string'},
							 { name: 'fax', type: 'string'},
							 { name: 'address1', type: 'string'},
							 ],
							 datatype: "json"
					}),
					showfilterrow: false,
					filterable: true,
					sortable: true,
					columnsresize: true,
					theme: 'arctic',
					columns: [
			          { text: 'Store', datafield: 'store_id', width: '33%'},
			          { text: 'Tel', datafield: 'tel', width: '34%'},
			          { text: 'Fax', datafield: 'fax', width: '33%' }
			        ]
				});
			}
			
			
			//jqx popup
			var components = $('#subdealer-add-window');
			if (components) {
				components.jqxWindow("width", 750);
				components.jqxWindow("height", 320);
				components.css("top", "calc(50% - 160px)");
	    		components.css("left", "calc(50% - 375px)");
			}
			components = $('#subdealer-edit-window');
			if (components) {
				components.jqxWindow("width", 750);
				components.jqxWindow("height", 320);
				components.css("top", "calc(50% - 160px)");
	    		components.css("left", "calc(50% - 375px)");
			}

			//jqx radio
			/*
			$("#sales-history-radio-1").jqxRadioButton({checked: true});
			$('#sales-history-radio-1').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
				$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#sales-history-radio-2').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate() - 7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
				$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#sales-history-radio-3').on('checked', function (event) {
				var start, end;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth() - 1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#sales-history-search-start-date").jqxDateTimeInput('setDate', start);
				$("#sales-history-search-end-date").jqxDateTimeInput('setDate', end);
			});  
			$("#subdealer-activations-radio-1").jqxRadioButton({checked: true});
			$('#subdealer-activations-radio-1').on('checked', function (event) {
				var start,end,startDate,endDate;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				endDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				startDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				$("#subdealer-activations-search-start-date").jqxDateTimeInput('setDate', start);
				$("#subdealer-activations-search-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#subdealer-activations-radio-2').on('checked', function (event) {
				var start, end, startDate, endDate;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				endDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				date.setDate(date.getDate() - 7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				startDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				$("#subdealer-activations-search-start-date").jqxDateTimeInput('setDate', start);
				$("#subdealer-activations-search-end-date").jqxDateTimeInput('setDate', end);	
				//WRPAdminApp.pagescript.getUserActivationsList(startDate, endDate);
			});

			$('#subdealer-activations-radio-3').on('checked', function (event) {
				var start, end, startDate, endDate;
				var date = new Date();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				endDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				date.setMonth(date.getMonth() - 1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				startDate = date.getFullYear() + WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + WRPAdminApp.toDecimalFormat(date.getDate(), "00");
				$("#subdealer-activations-search-start-date").jqxDateTimeInput('setDate', start);
				$("#subdealer-activations-search-end-date").jqxDateTimeInput('setDate', end);

				//WRPAdminApp.pagescript.getUserActivationsList(startDate, endDate);
			});
			// init function
			WRPAdminApp.pagescript.getSubDealerList();
			WRPAdminApp.pagescript.getManagerStoreAssignedList();
			WRPAdminApp.pagescript.getUserRoleList();
			
			//etc
			try {
				$(document.getElementById("subDealer-sales-permission-set-list").parentNode).scrollbar();
				$(document.getElementById("subDealer-backend-permission-set-list").parentNode).scrollbar();
			} catch (e) {
				console.log(e);
			}
			$("#subdealer-add-hire-date").jqxDateTimeInput({ width: 151, height: 21 });
			$('#subdealer-add-hire-date').on('change viewChange', function (event) {
			});
			$("#subdealer-edit-hire-date").jqxDateTimeInput({ width: 151, height: 21 });
			$('#subdealer-edit-hire-date').on('change viewChange', function (event) {
			});*/
			// init function
			WRPAdminApp.pagescript.getSubDealerList();
		},
		/* 170117 jh : jqxgrid �?변�?*/
		getSubDealerList: function() {
			var data = {}, i, len, elem;

			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
	      	if (arguments.length > 0 && arguments[0] === true) {
	        	try {
	        		WRPAdminApp.pagescript._currPageNo = 1;
	        	} catch (e) {
	        		
	        	}
	        }

			data.curr_page_no = WRPAdminApp.pagescript._currPageNo;
			data.count_per_page = WRPAdminApp.pagescript._countPerPage;
			
			WRPAdminApp.pagescript._searchType = 0;
			WRPAdminApp.pagescript._searchKeyword = undefined;

			WRPAdminApp.pagescript._selectedsubDealerid = 0;
			WRPAdminApp.pagescript._selectedUserId = undefined;

			if (WRPAdminApp.pagescript._searchKeyword !== undefined && WRPAdminApp.pagescript._searchKeyword.length > 0) {
				data.searchKeyword = WRPAdminApp.pagescript._searchKeyword;
			}
			
			$("#jqx-subDealer-list").jqxGrid("clear");

			$.ajax({
				url: "ajax/subdealer/getSubDealerList.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, obj, i;
					data = result.data;
					if (!data){
						try {
	                		document.getElementById("loading-container").style.display = "none";
	                	} catch (e) {
	                		console.warn(e);
	                	}
						return;
					}
					obj = $("#jqx-subDealer-list");
					obj.jqxGrid("addrow", null, data, "last");
					try {
		        		document.getElementById("loading-container").style.display = "none";
		        	} catch (e) {
		        		console.warn(e);
		        	}
				}
			});
		},
		informSelectedUserData: function() {
			var i, len, elem, list;

			if (arguments.length < 1) {
				console.warn("no input user sid");
				return;
			}

			if (arguments.length > 1) {
				list = document.getElementById("subdealer-list");
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

			WRPAdminApp.pagescript._selectedsubDealerid = parseInt(arguments[0]);
			if (isNaN(WRPAdminApp.pagescript._selectedsubDealerid)) {
				console.warn("error user sid");
				WRPAdminApp.pagescript._selectedsubDealerid = 0;
				return;
			}

			$.ajax({
				url: "ajax/user/getUserInfo.jsp",
				data: {
					subDealerid: WRPAdminApp.pagescript._selectedsubDealerid
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data;
					data = result.data;
					if (!data) return;

					try {
						document.getElementById("subdealer-profile-id").value = (data.userId !== undefined && data.userId)? data.userId : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					WRPAdminApp.pagescript._selectedUserId = (data.userId !== undefined && data.userId)? data.userId : '';

					try {
						document.getElementById("subdealer-profile-password").value = "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-type").value = (data.userType !== undefined && data.userType)? data.userType : 3;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-first-name").value = (data.firstName !== undefined && data.firstName)? data.firstName : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-middle-name").value = (data.middleName !== undefined && data.middleName)? data.middleName : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-last-name").value = (data.lastName !== undefined && data.lastName)? data.lastName : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-address1").value = (data.address1 !== undefined && data.address1)? data.address1 : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-address2").value = (data.address2 !== undefined && data.address2)? data.address2 : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-city").value = (data.city !== undefined && data.city)? data.city : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-state").value = (data.state !== undefined && data.state)? data.state : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-zipcode").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-mobile").value = (data.tel !== undefined && data.tel)? data.tel : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-email").value = (data.email !== undefined && data.email)? data.email : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						if (data.disabled > 0) {
							document.getElementById("subdealer-profile-auth-disable").checked = true;
						} else {
							document.getElementById("subdealer-profile-auth-enable").checked = true;
						}
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subDealer-sales-history-list").innerHTML = "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subDealer-activations-list").innerHTML = "";
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("subdealer-profile-subdealer-role").value = (data.userRole !== undefined && data.userRole > 0) ? data.userRole : 0;
					} catch (e) {
						console.warn(e);
						return;
					}

					//WRP.UI.changeTab(document.querySelector("#subDealer-tab-container > .tab[tabname='profile']"));
					//WRPAdminApp.pagescript.getSalesHistoryList();
					//WRPAdminApp.pagescript.getUserActivationsList();
					//WRPAdminApp.pagescript.getUserPermission(data.userId);
					//WRPAdminApp.pagescript.getStoreUserAccessList(data.userId);
				}
			});
		},
		initUserEditContainer: function() {
			var elemList, i, len, elem;
			WRPAdminApp.pagescript._selectedsubDealerid = 0;

			/*170124 jh*/

			/**/
			elemList = document.getElementById("subDealer-assigned-store-list");
			if (!elemList) return;

			WRPAdminApp.pagescript.prevAssignedStoreIdList = {};

			try {
				document.getElementById("subdealer-profile-id").value = "";
				document.getElementById("subdealer-add-id").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-password").value = "";
				document.getElementById("subdealer-add-password").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-type").value = 4;
				document.getElementById("subdealer-add-type").value = 4;
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-first-name").value = "";
				document.getElementById("subdealer-add-first-name").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-middle-name").value = "";
				document.getElementById("subdealer-add-middle-name").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-last-name").value = "";
				document.getElementById("subdealer-add-last-name").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-address1").value = "";
				document.getElementById("subdealer-add-address1").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-address2").value = "";
				document.getElementById("subdealer-add-address2").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-city").value = "";
				document.getElementById("subdealer-add-city").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-state").value = "";
				document.getElementById("subdealer-add-state").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-zipcode").value = "";
				document.getElementById("subdealer-add-zipcode").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-mobile").value = "";
				document.getElementById("subdealer-add-mobile").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-email").value = "";
				document.getElementById("subdealer-add-email").value = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-auth-enable").checked = true;
				document.getElementById("subdealer-add-auth-enable").checked = true;
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subDealer-sales-history-list").innerHTML = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subDealer-activations-list").innerHTML = "";
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("subdealer-profile-subdealer-role").value = 0;
			} catch (e) {
				console.warn(e);
				return;
			}
		},
		setUserPhotoPreview: function() {
			var itemImage = document.getElementById("subDealer-profile-photo-file"), reader;
			if (!itemImage) return;

			if (itemImage.files && itemImage.files[0]) {
				reader = new FileReader();
				reader.onload = function(e) {
					try { document.querySelector("#subDealer-profile-container > .subdealer-photo").style.backgroundImage= 'url("'+e.target.result+'")'; } catch (e) {}
				};

				reader.readAsDataURL(itemImage.files[0]);
			} else {
				try { document.getElementById("#subDealer-profile-container > .subdealer-photo").style.backgroundImage= 'img/user_photo_default.png'; } catch (e) {}
			}
		},
		setSubDealer: function() {
			var data, elemList, i, len, elem;

			try {
	      		document.getElementById("loading-container").style.display = "block";
	      	} catch (e) {
	    		console.warn(e);
	    	}
			
			data = {};

			data.subDealerid = WRPAdminApp.pagescript._selectedsubDealerid;

			try {
				data.userId = document.getElementById("subdealer-add-id").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			if (data.userId.length == 0) {
				alert("Input User ID");
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.password = document.getElementById("subdealer-add-password").value;
			} catch (e) {
				console.warn(e);
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			if(data.subDealerid == 0 && data.password.length == 0) {
				alert("Input Password");
				try {
            		document.getElementById("loading-container").style.display = "none";
            	} catch (e) {
            		console.warn(e);
            	}
				return;
			}

			try {
				data.userType = document.getElementById("subdealer-add-type").value;
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
				data.firstName = document.getElementById("subdealer-add-first-name").value;
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
				data.middleName = document.getElementById("subdealer-add-middle-name").value;
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
				data.lastName = document.getElementById("subdealer-add-last-name").value;
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
				data.address1 = document.getElementById("subdealer-add-address1").value;
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
				data.address2 = document.getElementById("subdealer-add-address2").value;
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
				data.city = document.getElementById("subdealer-add-city").value;
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
				data.state = document.getElementById("subdealer-add-state").value;
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
				data.zipcode = document.getElementById("subdealer-add-zipcode").value;
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
				data.tel = document.getElementById("subdealer-add-mobile").value;
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
				data.email = document.getElementById("subdealer-add-email").value;
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
				if (document.getElementById("subdealer-add-auth-enable").checked === true) {
					data.disable = 0;
				} else {
					data.disable = 1;
				}
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
				data.userRole = document.getElementById("subdealer-add-subdealer-role").value;
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
				data.userType = 98;
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
				url: "ajax/subdealer/setSubDealer.jsp",
				data: data,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						alert("Complete");
						WRPAdminApp.pagescript.initUserEditContainer();
						WRPAdminApp.pagescript.getSubDealerList();
						$('#subdealer-add-window').jqxWindow('close');
					} else {
						alert("Error : " + result);

					}
				}
			});
			try {
        		document.getElementById("loading-container").style.display = "none";
        	} catch (e) {
        		console.warn(e);
        	}
		},
		selectSubDealer: function(event) {
			var data = {}, i, len, elem;

			WRPAdminApp.pagescript._searchType = 0;
			WRPAdminApp.pagescript._searchKeyword = undefined;

			WRPAdminApp.pagescript._selectedsubDealerid = event.args.row.sid;
			WRPAdminApp.pagescript._selectedUserId = event.args.row.userId;

			$("#subdealer-profile-id").val(event.args.row.userId);
			$("#subdealer-profile-password").val(event.args.row.password);
			$("#subdealer-profile-first-name").val(event.args.row.firstName);
			$("#subdealer-profile-last-name").val(event.args.row.lastName);
			$("#subdealer-profile-address1").val(event.args.row.address1);
			$("#subdealer-profile-address2").val(event.args.row.address2);
			$("#subdealer-profile-city").val(event.args.row.city);
			$("#subdealer-profile-state").val(event.args.row.state);
			$("#subdealer-profile-zipcode").val(event.args.row.zipcode);
			$("#subdealer-profile-email").val(event.args.row.email);
			$("#subdealer-profile-mobile").val(event.args.row.tel);
			//$("#subdealer-profile-type").val(event.args.row.userType).prop("selected", true);
			
			if (event.args.row.userType > 3) {
				$("#subdealer-profile-type").val("Store Manager");
			} else {
				$("#subdealer-profile-type").val("Employee");
			}
			
			if (event.args.row.disable > 0) {
				$("#subdealer-profile-auth").val("Disable");
				//document.getElementById("subdealer-profile-auth-disable").checked = true;
			} else {
				$("#subdealer-profile-auth").val("Enable");
				//document.getElementById("subdealer-profile-auth-enable").checked = true;
			}
			$("#subdealer-group").val(event.args.row.jobPosition);
			
			document.getElementById("subdealer-profile-type").value = (data.userType !== undefined && data.userType)? data.userType : 3;
			
			
			$("#subdealer-profile-subdealer-role").val((event.args.row.roleName !== undefined && event.args.row.roleName)? event.args.row.roleName : "");

			$("#subdealer-profile-hire-date").val("");
			$("#subdealer-profile-hire-date").val(event.args.row.hire_date);

			$("#subdealer-edit-id").val(event.args.row.userId);
			$("#subdealer-edit-password").val(event.args.row.password);
			$("#subdealer-edit-first-name").val(event.args.row.firstName);
			$("#subdealer-edit-last-name").val(event.args.row.lastName);
			$("#subdealer-edit-address1").val(event.args.row.address1);
			$("#subdealer-edit-address2").val(event.args.row.address2);
			$("#subdealer-edit-city").val(event.args.row.city);
			$("#subdealer-edit-state").val(event.args.row.state);
			$("#subdealer-edit-zipcode").val(event.args.row.zipcode);
			$("#subdealer-edit-email").val(event.args.row.email);
			$("#subdealer-edit-mobile").val(event.args.row.tel);
			//$("#subdealer-edit-type").val(event.args.row.userType).prop("selected", true);
			$("#subdealer-edit-group").val(event.args.row.jobPosition);
			//if(event.args.row.roleName == "Manager") $("#subdealer-edit-subdealer-role").val(1).prop("selected", true);
			//else if(event.args.row.roleName == "Employee") $("#subdealer-edit-subdealer-role").val(2).prop("selected", true);
			//else if(event.args.row.roleName == "New Role") $("#subdealer-edit-subdealer-role").val(3).prop("selected", true);
			//else $("#subdealer-edit-subdealer-role").val(0).prop("selected", true); 
			$("#inputsubdealer-edit-hire-date").val("");
			$("#inputsubdealer-edit-hire-date").val(event.args.row.hire_date);

			WRPAdminApp.pagescript._selectedsubDealerid = event.args.row.sid;
			WRPAdminApp.pagescript.getStoreList(event.args.row.user_id);
		},
		getStoreList: function(userId) {
			$.ajax({
				url: "ajax/subdealer/getStoreList.jsp",
				data: {
					userId : userId
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data = result.data;
					$("#jqx-assigned-store").jqxGrid("clear");
					if (!data) return;
					
					$("#jqx-assigned-store").jqxGrid("addrow", null, data);
				}
			});
		}
};