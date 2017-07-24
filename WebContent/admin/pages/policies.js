var _pagescript = {
		_selectStoreid: undefined,
		_selectpolicySid: 0,
		init: function() {
			try {
				//WRPComponents('div[pagename="cash_out"] > .page-submenu-container > .submenu[panelname="cash_out_list"]').addShadowedImage('img/icon/icon_policy.png');
			} catch (e) {

			}

			var components = $('#policy-new-window');
			if (components) {
				components.jqxWindow("width", 730);
				components.jqxWindow("height", 350);
	    		components.css("top", "calc(50% - 175px)");
	    		components.css("left", "calc(50% - 365px)");
			}

			components = $("#jqx-policy-store-list");
	    	if(components){
				components.jqxGrid({
					width : '100%',
					height : '100%',
					source : new $.jqx.dataAdapter({
						datafields:
							[
								{ name: 'sid', type: 'date'},
								{ name: 'storeId', type: 'string'},
								{ name: 'name', type: 'string'},
								{ name: 'ownerId', type: 'string'},
								{ name: 'manager', type: 'string'},
								{ name: 'marketName', type: 'string'},
								{ name: 'districtName', type: 'string'},
							],
		            	datatype: "json"
		            }),
					showfilterrow : false,
					filterable : true,
					sortable : true,
					columnsresize : true,
					theme : 'arctic',
					columns : 
						[ 
							{ text : 'sid',datafield : 'sid',hidden:true }, 
							{ text : 'Store Id',datafield : 'storeId', width : '20%', align: 'center'},
							{ text : 'Description', datafield : 'name',width : '20%', align: 'center'}, 
							{ text : 'Owner Id', datafield : 'ownerId',width : '15%', align: 'center'}, 
							{ text : 'Manager', datafield : 'manager',width : '15%', align: 'center'}, 
							{ text : 'Market', datafield : 'marketName',width : '15%', align: 'center'}, 
							{ text : 'District', datafield : 'districtName',width : '15%', align: 'center'}, 
						]
				});
				components.on('rowselect', function(event){
					WRPAdminApp.pagescript._selectStoreid = event.args.row.storeId;
					WRPAdminApp.pagescript.loadpolicyData();
				});
			}
	    	
			var components = $("#policy-grid");
			if(components){
				components.jqxGrid(
						{
							width: '100%',
							height: '100%',
							source: new $.jqx.dataAdapter({
								datatype: "json",
								datafields: [
								             { name: 'sid', type: 'string'},
								             { name: 'date', type: 'string'},
								             { name: 'user_id', type: 'string' },
								             { name: 'name', type: 'string'},
								             { name: 'policy', type: 'string' }
								             ]
							}),
							showfilterrow: false,
							filterable: true,
							sortable: true,
							columnsresize:true,
							theme: 'arctic',
							columns: [
							          { text: 'Index', datafield: 'sid', width: '12%', hidden: true},
							          { text: 'Date', datafield: 'reg_date', filtertype: "range", width: '15%', cellsformat: 'MM/dd/yyyy HH:mm:ss', hidden: true },
							          { text: 'Emp.ID', datafield: 'user_id', width: '15%', hidden: true},
							          { text: 'Name', datafield: 'name', width: '10%', align: 'center'},
							          { text: 'Policy', datafield: 'policy', width: '90%', align: 'center'}
							          ]
						});
				components.on('rowdoubleclick', WRPAdminApp.pagescript.getEditPopup);
				
				$("#excel_cash_out").click(function () {
					components.jqxGrid('exportdata', 'xls', 'jqx-policy-list');
				});
			}
			
			WRPAdminApp.pagescript.getStoreList();
		},
		getStoreList: function() {
	        $.ajax({
	            url: "ajax/store/getStoreList.jsp",
	            method: "POST",
	            dataType: "json",
	            success: function(result) {  
	            	var data, elem, i, len, obj;
	    			
	    			data = result.data;
	    			if (!data) return;
	    			
	    			elem = $("#jqx-policy-store-list");
	    			if (elem) {
	    				elem.jqxGrid("clear");
	   					elem.jqxGrid("addRow", null, data, "last");
	    			}
	            	
	            }
	        });
	    },
		addpolicyData : function() {
			$('#policy-new-window').jqxWindow('open');
			//$('#policy-profile-EmpId-pop').val(document.getElementById("login-user-name").innerHTML);
			$('#policy-profile-policy-pop').val("");
			WRPAdminApp.pagescript._selectpolicySid = 0;

		},
		loadpolicyData : function() {
			var keyword;
			
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				console.warn(e);
			}
			/*
			start_date = new Date($("#policy-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			start_date = start_date.getFullYear()+"-"+(start_date.getMonth()+1)+"-"+start_date.getDate();
			end_date = new Date($("#policy-end-date").jqxDateTimeInput('getDate'));
			end_date = end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+end_date.getDate();//"11/30/2016";
			*/
			try {
				keyword = $("#policies-search-keyword").val();
			} catch (e) {
				console.warn(e);
			}
			$.ajax({
				url: "ajax/policy/getPolicy.jsp",
				data: {
					storeId: WRPAdminApp.pagescript._selectStoreid,
					keyword: keyword
					//search_start_date: start_date,
					//search_end_date: end_date
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, elem, i, len, obj, innerHTML;
					$("#policy-grid").jqxGrid("clear");
					data = result.data;

					if (!data) {
						try {
							document.getElementById("loading-container").style.display = "none";
						} catch (e) {
							console.warn(e);
						}
						return;
					}
					if ($("#policy-grid")) {
						for(i=0; i < data.length; i++){
							data[i].policy = data[i].policy.replace(/<br>/g, "\r\n");
						}
						$("#policy-grid").jqxGrid("addRow", null, data, "last");
					}
					try {
						document.getElementById("loading-container").style.display = "none";
					} catch (e) {
						console.warn(e);
					}
				}
			});
		},

		setpolicyData : function(){
			try {
				document.getElementById("loading-container").style.display = "block";
			} catch (e) {
				console.warn(e);
			}
			
			try {
			var policy = $("#policy-profile-policy-pop").val().replace(/\n/g, "<br>");
			} catch (e) {
				console.warn(e);
			}
			
			try {
				var name = $("#policy-profile-name-pop").val();
				} catch (e) {
					console.warn(e);
				}
				
			$.ajax({
				url: "ajax/policy/setPolicy.jsp",
				data: {
					sid: WRPAdminApp.pagescript._selectpolicySid,
					policy: policy,
					name: name,
					storeId: WRPAdminApp.pagescript._selectStoreid
				},
				method: "POST",
				success: function(result) {
					alert("Completed");
					$('#policy-new-window').jqxWindow('close');
					WRPAdminApp.pagescript._selectpolicySid = 0;
					WRPAdminApp.pagescript.loadpolicyData();
				}
			});
			try {
				document.getElementById("loading-container").style.display = "none";
			} catch (e) {
				console.warn(e);
			}
		},
		getEditPopup: function(event) {

			WRPAdminApp.pagescript._selectpolicySid = event.args.row.bounddata.sid;
			//$("#policy-profile-EmpId-pop").val(event.args.row.bounddata.user_id);

			$("#policy-profile-name-pop").val(event.args.row.bounddata.name).prop("selected", true);

			$("#policy-profile-policy-pop").val(event.args.row.bounddata.policy);

			$('#policy-new-window').jqxWindow('open');
		}
};