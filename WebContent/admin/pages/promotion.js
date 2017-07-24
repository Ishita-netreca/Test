var _pagescript = {
		_selectedPromotionSid: 0,

		_selectedRateplanSid: 0,
		_searchType: 0,
		_searchKeyword: undefined,
		_selectedCouponSid: 0,

		init: function() {
			try {
				WRPComponents('div[pagename="promotion"] > .page-submenu-container > .submenu[panelname="promotion"]').addShadowedImage('img/icon/promotion_01.png', 10, 10, 12);
				WRPComponents('div[pagename="promotion"] > .page-submenu-container > .submenu[panelname="rate_plan"]').addShadowedImage('img/icon/rateplan_01.png');
				WRPComponents('div[pagename="promotion"] > .page-submenu-container > .submenu[panelname="coupon"]').addShadowedImage('img/icon/invoice.png');
			} catch (e) {

			}
			//jqx popup
			var components = $('#sales-rateplan-new-window');
			if (components) {
				components.jqxWindow("width", 950);
				components.jqxWindow("height", 600);
				components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 300) });
			}
			
			var components = $('#new-item-line-info-window');
			if (components) {
				components.jqxWindow("width", 600);
				components.jqxWindow("height", 400);
				components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 250) , y: ((window.innerHeight * 0.5) - 250) });
			}
			
			var components = $('#add-item-toline-info-window');
			if (components) {
				components.jqxWindow("width", 1000);
				components.jqxWindow("height", 800);
				components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 400) });
			}
			
			
			var components = $('#promotion-copy-window');
			if (components) {
				components.jqxWindow("width", 800);
				components.jqxWindow("height", 500);
				components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 300) });
			}
			
			
			//jqx button
			
			$("#promotion-excel").on('click', function (){

			});
			
			$("#rate-plan-show-all").on('click', function (){
				$("#rate-plan-search-keyword").val("");
				WRPAdminApp.pagescript.getRateplanList();
			});
			
			$("#rate-plan-cancel").on('click', function (){
				$('#sales-rateplan-new-window').jqxWindow('close');
				WRPAdminApp.pagescript.getRateplanList();
			});
			
			$("#coupon-show-all").on('click', function (){
				$("#coupon-search-keyword").val("");
				WRPAdminApp.pagescript.getCouponList();
			});
			
			//jqx popup
			var components;
			components = $('#promotion-new-window');
			if (components) {
				components.jqxWindow("width", 500);
				components.jqxWindow("height", 300);
				components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 450) , y: ((window.innerHeight * 0.5) - 300) });
			}
			
			components = $('#promotion-select-item');
			if (components) {
				components.jqxWindow("width", 800);
				components.jqxWindow("height", 600);
				components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 400) , y: ((window.innerHeight * 0.5) - 300) });
			}

			//jqx radio
			$('#promotion-radio-1').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate());
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#promotion-start-date").jqxDateTimeInput('setDate', start);
				$("#promotion-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#promotion-radio-2').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setDate(date.getDate()-7);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#promotion-start-date").jqxDateTimeInput('setDate', start);
				$("#promotion-end-date").jqxDateTimeInput('setDate', end);
			});

			$('#promotion-radio-3').on('checked', function (event) {
				var start, end;
				var date = WRPCommon.TimeModule.getTime();
				end = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				date.setMonth(date.getMonth()-1);
				start = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
				$("#promotion-start-date").jqxDateTimeInput('setDate', start);
				$("#promotion-end-date").jqxDateTimeInput('setDate', end);
			});

			//jqx grid
			components = $('#promotion-jqx-promotion-list');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "ct", type: "number" },
						             { name: "promoid", type: "number" },
						             { name: "description", type: "string" },
						             { name: "start_date", type: "date" },
						             { name: "end_date", type: "date" },
						             { name: "updatedby", type: "number" },
						             {name: "Action", type:"button"}
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columns: [
					          { text: "ct", datafield: "ct", width: "10%" },
					          { text: "Promotion ID", datafield: "promoid", width: "10%" },
					          { text: "Description", datafield: "description", width: "25%" },
					          { text: "Start Date", datafield: "start_date", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy' },
					          { text: "End Date", datafield: "end_date", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy' },
					          { text: "Item Count", datafield: "item_count", width: "10%" },
					          { text: "Updated by", datafield: "updatedby", width: "10%" },
					          { text: "Action", width: "10%" }
					          ]
				});

				components.on("rowclick", WRPAdminApp.pagescript.getPromotionInfo);
			}
			
			components = $('#select-items-to-add');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "ct", type: "number" },
						             { name: "type", type: "string" },
						             { name: "itemcode", type: "number" },
						             { name: "description", type: "string" },
						             { name: "category", type: "string" },
						             { name: "subcategory", type: "string" },
						             { name: "status", type: "string" },
						             {name: "Action", type:"button"}
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columns: [
					          { text: "ct", datafield: "ct", width: "5%" },
					          { text: "Type", datafield: "type", width: "10%" },
					          { text: "Item Code", datafield: "itemcode", width: "10%" },
					          { text: "Description", datafield: "description", width: "25%" },
					          { text: "Category", datafield: "start_date", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy' },
					          { text: "Sub-Category", datafield: "end_date", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy' },
					          { text: "Status", datafield: "item_count", width: "10%" },
					          { text: "Action", width: "10%" }
					          ]
				});

				components.on("rowclick", WRPAdminApp.pagescript.getPromotionInfo);
			}
			
			components = $('#promotions-copy-table');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "", type: "checkbox" },
						             { name: "promoid", type: "number" },
						             { name: "description", type: "string" },
						             { name: "start_date", type: "date" },
						             { name: "end_date", type: "date" },
						             { name: "updatedby", type: "number" }						            
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columns: [
					          { text: "", datafield: "", width: "10%" },
					          { text: "Promotion ID", datafield: "promoid", width: "10%" },
					          { text: "Description", datafield: "description", width: "25%" },
					          { text: "Start Date", datafield: "start_date", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy' },
					          { text: "End Date", datafield: "end_date", width: "10%", filtertype: "date", cellsformat: 'MM/dd/yyyy' },
					          { text: "Item Count", datafield: "item_count", width: "10%" },
					          { text: "Updated by", datafield: "updatedby", width: "10%" }
					          ]
				});

				components.on("rowclick", WRPAdminApp.pagescript.getPromotionInfo);
			}
			
			
			
			/*components = $('#promotion-jqx-grid-new-promotion-items-list');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					filterable: true,
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "sid", type: "number" },
						             { name: "edited", type: "number" },
						             { name: "deleted", type: "number" },
						             { name: "item_code", type: "string" },
						             { name: "description", type: "string" },
						             { name: "carrier", type: "string" },
						             { name: "sku", type: "string" },
						             { name: "item_cost", type: "number" },
						             { name: "new_act_price", type: "number" },
						             { name: "upg_price", type: "number" },
						             { name: "port_in_price", type: "number" },
						             { name: "sor_price", type: "number" },
						             { name: "aal_price", type: "number" },
						             { name: "aal_max_qty", type: "number" },
						             { name: "aal_bogo_price", type: "number" },
						             { name: "aal_bogo_max_qty", type: "number" },
						             { name: "aal_pogo_price", type: "number" },
						             { name: "aal_pogo_max_qty", type: "number" }
						             ]
					}),
					editable: true,
					sortable: true,
					groupable: false,
					columns: [
					          { text: "sid", datafield: "sid", hidden: true, editable: false },
					          { text: "edited", datafield: "edited", hidden: true, editable: false },
					          { text: "deleted", datafield: "deleted", hidden: true, editable: false },
					          { text: "Item Code", datafield: "item_code", width: 150, editable: false },
					          { text: "Description", datafield: "description", width: 150, editable: false },
					          { text: "Carrier", datafield: "carrier", width: 150, editable: false },
					          { text: "SKU", datafield: "sku", width: 150, editable: false },
					          { text: "Item Cost", datafield: "item_cost", width: 80, cellsformat: "c2", editable: false },
					          { text: "New Act Price", datafield: "new_act_price", width: 100, cellsformat: "c2" },
					          { text: "Upg Price", datafield: "upg_price", width: 80, cellsformat: "c2" },
					          { text: "Port-In Price", datafield: "port_in_price", width: 100, cellsformat: "c2" },
					          { text: "SOR Price", datafield: "sor_price", width: 80, cellsformat: "c2" },
					          { text: "AAL Price", datafield: "aal_price", width: 80, cellsformat: "c2" },
					          { text: "AAL Max Qty", datafield: "aal_max_qty", width: 100 },
					          { text: "AAL BOGO Price", datafield: "aal_bogo_price", width: 120, cellsformat: "c2" },
					          { text: "AAL BOGO Max Qty", datafield: "aal_bogo_max_qty", width: 150 },
					          { text: "AAL POGO Price", datafield: "aal_pogo_price", width: 120, cellsformat: "c2" },
					          { text: "AAL POGO Max Qty", datafield: "aal_pogo_max_qty", width: 150 }
					  ]
				});
			}*/
			
			components = $("#add-item-items-in-wrp-db-list");
	    	if (components) {
	    		components.jqxGrid({
	    			width: "99.8%",
	    			height: "99%",
	    			theme: "arctic",
	    			source: new $.jqx.dataAdapter({
	    				datatype: "json",
	    				datafields: [
	    					{ name: 'sid', type: 'number'},
	    					{ name: "CT", type: "bool"},
			             	{ name: 'promoitemline', type: 'string'},
							{ name: 'description', type: 'string' },
			                { name: 'SOR', type: 'string' },
			                { name: 'IR', type: 'string' },
			                { name: 'EDLP', type: 'string' },
			                { name: 'action', type: 'button' }
	    				]
	    			}),
	    			filterable: true,
	    			editable: true,
	    			sortable: true,
	    	        groupable: false,
	    	        columnsresize:true,
	    			columns: [
	    				  { datafield: "sid", hidden: true },
			          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
			          	  { text: 'Promo Item Line', editable: false, datafield: 'type', cellsalign: 'center', align: 'center', width: 170},	                      
	                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center' },
	                      { text: 'SOR', editable: false, datafield: 'category', cellsalign: 'center', align: 'center' },
	                      { text: 'IR', editable: false, datafield: 'sub_category', cellsalign: 'center', align: 'center' },
	                      { text: 'EDLP', editable: false, datafield: 'manufacturer', cellsalign: 'center', align: 'center' },
	                      { text: 'Action', editable: false, cellsalign: 'center', align: 'center', columntype: "button", cellsrenderer: function() { return "Detail"; }, buttonclick: WRPAdminApp.pagescript.onItemsInWRPDBListDetailButtonClick }
					]
	    		});
	    	}
	    	
			
			components = $("#promotion-jqx-grid-items-list");
			if (components) {   
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "item_code", type: "string" },
						             { name: "description", type: "string" },
						             { name: "carrier_id", type: "string" },
						             { name: "item_cost", type: "number" },
						             { name: "new_act_price", type: "number" },
						             { name: "upg_price", type: "number" },
						             { name: "port_in_price", type: "number" },
						             { name: "sor_price", type: "number" },
						             { name: "aal_price", type: "number" },
						             { name: "aal_max_qty", type: "number" },
						             { name: "aal_bogo_price", type: "number" },
						             { name: "aal_bogo_max_qty", type: "number" },
						             { name: "aal_pogo_price", type: "number" },
						             { name: "aal_pogo_max_qty", type: "number" }
						  ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columns: [
					          { text: "Item Code", datafield: "item_code", width: "15%" },
					          { text: "Description", datafield: "description", width: "30%" },
					          { text: "Carrier ID", datafield: "carrier_id", width: "15%" },
					          { text: "Item Cost", datafield: "item_cost", width: 80, cellsformat: "c2", editable: false },
					          { text: "New Act Price", datafield: "new_act_price", width: 100, cellsformat: "c2" },
					          { text: "Upg Price", datafield: "upg_price", width: 80, cellsformat: "c2" },
					          { text: "Port-In Price", datafield: "port_in_price", width: 100, cellsformat: "c2" },
					          { text: "SOR Price", datafield: "sor_price", width: 80, cellsformat: "c2" },
					          { text: "AAL Price", datafield: "aal_price", width: 80, cellsformat: "c2" },
					          { text: "AAL Max Qty", datafield: "aal_max_qty", width: 100 },
					          { text: "AAL BOGO Price", datafield: "aal_bogo_price", width: 120, cellsformat: "c2" },
					          { text: "AAL BOGO Max Qty", datafield: "aal_bogo_max_qty", width: 150 },
					          { text: "AAL POGO Price", datafield: "aal_pogo_price", width: 120, cellsformat: "c2" },
					          { text: "AAL POGO Max Qty", datafield: "aal_pogo_max_qty", width: 150 }
					          ]
				});    			
			}


			
			components = $("#promotion-jqx-grid-rebates-list");
			if (components) {   
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             // hidden
						             { name: "rebate_item_sid", type: "number" },
						             { name: "promotion_item_sid", type: "number" },
						             // hidden end
						             { name: "sku", type: "string" },
						             { name: "description", type: "string" },
						             { name: "retail_price", type: "number" },
						             { name: "new_act_price", type: "number" },
						             { name: "new_act_rebate", type: "number" },
						             { name: "upg_price", type: "number" },
						             { name: "upg_rebate", type: "number" },
						             { name: "port_in_price", type: "number" },
						             { name: "port_in_rebate", type: "number" },
						             { name: "sor_price", type: "number" },
						             { name: "sor_rebate", type: "number" },
						             { name: "aal_price", type: "number" },
						             { name: "aal_rebate", type: "number" },
						             { name: "aal_bogo_price", type: "number" },
						             { name: "aal_bogo_rebate", type: "number" },
						             { name: "aal_pogo_price", type: "number" },
						             { name: "aal_pogo_rebate", type: "number" }
						             ]
					}),
					editable: true,
					filterable: false,
					sortable: false,
					groupable: false,
					columns: [
					          { datafield: "rebate_item_sid", hidden: true, editable: false },
					          { datafield: "promotion_item_sid", hidden: true, editable: false },
					          { text: "SKU", datafield: "sku", width: 120, editable: false },
					          { text: "Description", datafield: "description", width: 300, editable: false },
					          { text: "New Act. Price", datafield: "new_act_price", width: 120, cellsformat: "c2", editable: false },
					          { text: "New Act. Rebate", datafield: "new_act_rebate", width: 120, cellsformat: "c2", editable: true },
					          { text: "Upg. Price", datafield: "upg_price", width: 80, cellsformat: "c2", editable: false },
					          { text: "Upg. Rebate", datafield: "upg_rebate", width: 100, cellsformat: "c2", editable: true },
					          { text: "Port-In Price", datafield: "port_in_price", width: 100, cellsformat: "c2", editable: false },
					          { text: "Port-In Rebate", datafield: "port_in_rebate", width: 120, cellsformat: "c2", editable: true },
					          { text: "SOR Price", datafield: "sor_price", width: 80, cellsformat: "c2", editable: false },
					          { text: "SOR Rebate", datafield: "sor_rebate", width: 100, cellsformat: "c2", editable: true },
					          { text: "Add-A-Line Price", datafield: "aal_price", width: 120, cellsformat: "c2", editable: false },
					          { text: "Add-A-Line Rebate", datafield: "aal_rebate", width: 150, cellsformat: "c2", editable: true },
					          { text: "AAL. BOGO Price", datafield: "aal_bogo_price", width: 120, cellsformat: "c2", editable: false },
					          { text: "AAL. BOGO Rebate", datafield: "aal_bogo_rebate", width: 150, cellsformat: "c2", editable: true },
					          { text: "AAL. POGO Price", datafield: "aal_pogo_price", width: 120, cellsformat: "c2", editable: false },
					          { text: "AAL. POGO Rebate", datafield: "aal_pogo_rebate", width: 150, cellsformat: "c2", editable: true }
					          ]
				});    			
			}
			/**/
			components = $("#jqx-sales-rateplan-list");
			if (components) {   
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						            
						             { name: 'CT', type: 'string'},
						             { name: 'Itemcode', type: 'string'},
						             { name: 'description', type: 'string'},
						             { name: 'sku', type: 'string'},
						             { name: 'upc', type: 'string'},
						             { name: 'qty', type: 'number'}
						             ]
					}),
					editable: false,
					filterable: false,
					sortable: false,
					groupable: false,
					columns: [
					         
					          { text: 'CT', datafield: '', width: '10%' },
					          { text: 'Item_Code', datafield: 'carrier', width: '15%' },
					          { text: 'Description', datafield: 'description', width: '30%' },
					          { text: 'SKU', datafield: 'planTypeStr', width: '15%'},
					          { text: 'UPC', datafield: 'groupTypeStr', width: '15%'},
					          { text: 'Qty', datafield: 'mrc', width: '10%', cellsformat: 'c2', cellsalign: 'center'}
					          ]
				});
				$("#jqx-sales-rateplan-list").on('rowselect', WRPAdminApp.pagescript.informSelectedRateplanData);
				$("#jqx-sales-rateplan-list").on('rowdoubleclick',WRPAdminApp.pagescript.PopRateplanData);
			}
			
			components = $("#jqx-promotion-item-line");
			if (components) {   
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						            
						             { name: 'CT', type: 'string'},
						             { name: 'promolineid', type: 'string'},
						             { name: 'description', type: 'string'},
						             { name: 'updatedby', type: 'string'},
						             { name: 'status', type: 'string'}
						             ]
					}),
					editable: false,
					filterable: false,
					sortable: false,
					groupable: false,
					columns: [
					         
					          { text: 'CT', datafield: '', width: '10%' },
					          { text: 'Promo Line ID', datafield: 'promolineid', width: '15%' },
					          { text: 'Description', datafield: 'description', width: '30%' },
					          { text: 'Updated By', datafield: 'updatedby', width: '15%'},
					          { text: 'Status', datafield: 'status', width: '15%'},
					          { text: 'Action', width: '15%', cellsformat: 'c2', cellsalign: 'center'}
					          ]
				});
				$("#jqx-sales-rateplan-list").on('rowselect', WRPAdminApp.pagescript.informSelectedRateplanData);
				$("#jqx-sales-rateplan-list").on('rowdoubleclick',WRPAdminApp.pagescript.PopRateplanData);
			}
			
			
			/**/
			components = $("#jqx-coupon-coupon-list");
			if (components) {
				components.jqxGrid({
					width: "99.8%",
					height: "99%",
					theme: "arctic",
					filterable: false,
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						            
						             // hidden end
						             { name: 'CT', type: 'string'},
						             { name: 'promolineid', type: 'string'},
						             { name: 'description', type: 'string'},
						             { name: 'updatedby', type: 'string'},
						             { name: 'status', type: 'string'}
						             ]
					}),
					columns: [		
					          { text: 'CT', datafield: '', width: '10%' },
					          { text: 'Promo Line ID', datafield: 'promolineid', width: '15%' },
					          { text: 'Description', datafield: 'description', width: '30%' },
					          { text: 'Updated By', datafield: 'updatedby', width: '15%'},
					          { text: 'Status', datafield: 'status', width: '15%'},
					          { text: 'Action', width: '15%', cellsformat: 'c2', cellsalign: 'center'}
					          ]
				});
				components.on("rowclick", WRPAdminApp.pagescript.onCouponListRowClick);
				components.on("rowdoubleclick", WRPAdminApp.pagescript.openEditCouponContainer);			
			}
			
			
			
			$('#promotion-radio-1').jqxRadioButton('check');
			
			WRPAdminApp.pagescript.getPromotionList();
			WRPAdminApp.pagescript.getRateplanList();
			WRPAdminApp.pagescript.getCouponList();
			WRPAdminApp.pagescript.getCategoriesStruct();
		},
		getPromotionList: function() {
			var param;

			param = {};

			start_date = new Date($("#promotion-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
		    param.start_date = start_date.getFullYear()+"-"+(start_date.getMonth()+1)+"-"+start_date.getDate();
		    end_date = new Date($("#promotion-end-date").jqxDateTimeInput('getDate'));
		    param.end_date = end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+end_date.getDate();//"11/30/2016";
			
			param.keyword = document.getElementById("promotion-search-keyword").value;
		    
			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/promotion/getPromotionList.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, elem, i, len, obj;

					data = result.data;

					if (!data) return;

					elem = $("#promotion-jqx-promotion-list");
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
		getPromotionInfo: function(event) {
			var rowdata, store_id, promotion_sid;

			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}
			try {
				rowdata = event.args.row.bounddata;
			} catch (e) {
				console.warn(e);
				return;
			}

			console.log(rowdata);

			if (!rowdata.sid) {

			}

			$.ajax({
				url: "ajax/promotion/getPromotionInfo.jsp",
				data: {
					store_id: store_id,
					promotion_sid: rowdata.sid
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data;
					data = result.data;
					if (!data) return;

					WRPAdminApp.pagescript._selectedPromotionSid = data.sid;

					try {
						document.getElementById("promotion-profile-description").innerHTML = (data.description !== undefined && data.description)? data.description : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("promotion-profile-start-date").innerHTML = (data.start_date !== undefined && data.start_date)? data.start_date : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("promotion-profile-end-date").innerHTML = (data.end_date !== undefined && data.end_date)? data.end_date : '';
					} catch (e) {
						console.warn(e);
						return;
					}
					WRPAdminApp.pagescript.getPromotionItemList();
					WRPAdminApp.pagescript.getPromotionRebateList();
				}
			});
		},
		getPromotionItemList: function(event) {
			var param, rowdata;

			param = {};

			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			param.promotion_sid = WRPAdminApp.pagescript._selectedPromotionSid;

			if (param.promotion_sid < 1) {
				WRPCommon.MsgBoxModule.alert({
					message: "no select promotion"
				});
				return;
			}    	

			$.ajax({
				url: "ajax/promotion/getPromotionItemsList.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, elem, i, len, obj;

					data = result.data;

					if (!data) return;

					elem = $("#promotion-jqx-grid-items-list");
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
		createNewPromotion: function() {
			var elem;
			try {
				WRPAdminApp.pagescript._selectedPromotionSid = 0;
				$('#new-promotion-description').val('');
				$('#promotion-jqx-grid-new-promotion-items-list').jqxGrid("clear");
				elem = document.querySelector("#promotion-new-window");

				$('#promotion-new-window').jqxWindow('open');
			} catch (e) {
				console.warn(e);
			}
		},
		newPromoNext: function() {
			var elem;
			try {
				WRPAdminApp.pagescript._selectedPromotionSid = 0;
				/*$('#new-promotion-description').val('');*/
				$('#promotions-copy-table').jqxGrid("clear");
				elem = document.querySelector("#promotion-copy-window");

				$('#promotion-copy-window').jqxWindow('open');
			} catch (e) {
				console.warn(e);
			}
		},
		newItemLineInfo: function(){
			var elem;
			try {
				
				elem = document.querySelector("#new-item-line-info-window");

				$('#new-item-line-info-window').jqxWindow('open');
			} catch (e) {
				console.warn(e);
			}
		},
		
		addintoPromoItem: function() {
			var elem;
			try {
								
				$('#select-items-to-add').jqxGrid("clear");
				elem = document.querySelector("#add-item-toline-info-window");

				$('#add-item-toline-info-window').jqxWindow('open');
			} catch (e) {
				console.warn(e);
			}
		},
		
		openSelectItemWindow: function() {
			$('#promotion-select-item').jqxWindow('open');
			WRPAdminApp.pagescript.getItemList();
		},
		getItemList: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			param.itemType = 0;

			$.ajax({
				url: "ajax/item/getItemDictList.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, source, adapter, elem;

					data = result.data;

					if (!data) return;

					source = {
							datatype: "json",
							localdata: data,
							datafields: [
							             { name: "sid", type: "number" },
							             { name: "carrier_sid", type: "number" },
							             { name: "item_code", type: "string" },
							             { name: "description", type: "string" },
							             { name: "carrier_id", type: "string" },
							             { name: "sku", type: "string" },
							             { name: "qty", type: "number" },
							             { name: "item_cost", type: "number" }
							             ]
					}; 	

					adapter = new $.jqx.dataAdapter(source);
					elem = $("#promotion-jqx-grid-select-items-list");
					if (elem) {

						elem.off("rowdoubleclick");

						elem.jqxGrid({
							width: "100%",
							height: "100%",
							theme: "arctic",
							source: adapter,
							filterable: true,
							sortable: true,
							showfilterrow: true,
							groupable: false,
							columns: [
							          { text: "sid", datafield: "sid", hidden: true },
							          { text: "carrier_sid", datafield: "carrier_sid", hidden: true },
							          { text: "Item Code", datafield: "item_code", width: "15%" },
							          { text: "Description", datafield: "description", width: "40%" },
							          { text: "Carrier ID", datafield: "carrier_id", width: "15%" },
							          { text: "SKU", datafield: "sku", width: "15%" },
							          { text: "Qty", datafield: "qty", width: "5%" },
							          { text: "Item Cost", datafield: "item_cost", width: "10%", cellsformat: "c2" }
							          ]
						});

						elem.on("rowdoubleclick", WRPAdminApp.pagescript.addItemInListToPromotionInfo);
					}
				}
			});
		},
		addItemInListToPromotionInfo: function(event) {
			var rowdata, newData, elem;

			try {
				rowdata = event.args.row.bounddata;
			} catch (e) {
				console.warn(e);
				return;
			}

			if (!rowdata.sid) {
				return;
			}

			newData = {};
			newData.sid = 0;
			newData.carrier_sid = rowdata.carrier_sid;
			newData.item_code = rowdata.item_code;
			newData.description = rowdata.description;
			newData.carrier = rowdata.carrier_id;
			newData.carrier_sid = rowdata.carrier_sid;
			newData.sku = rowdata.sku;
			newData.item_cost = rowdata.item_cost;
			newData.new_act_price = rowdata.item_cost;
			newData.upg_price = rowdata.item_cost;
			newData.port_in_price = rowdata.item_cost;
			newData.sor_price = rowdata.item_cost;
			newData.aal_price = rowdata.item_cost;    	
			newData.aal_max_qty = (rowdata.qty > 0) ? rowdata.qty : 0;
			newData.aal_bogo_price = rowdata.item_cost;    	
			newData.aal_bogo_max_qty = (rowdata.qty > 0) ? rowdata.qty : 0;
			newData.aal_pogo_price = rowdata.item_cost;    	
			newData.aal_pogo_max_qty = (rowdata.qty > 0) ? rowdata.qty : 0;
			elem = $('#promotion-jqx-grid-new-promotion-items-list');
			if (elem) {
				elem.jqxGrid("addrow", null, newData, "last");
			}
			$('#promotion-select-item').jqxWindow('close');
		},
		removeItemInPromotionInfo: function() {
			var elem, selectedIndex;

			elem = $('#promotion-jqx-grid-new-promotion-items-list');

			if (elem) {
				selectedIndex = elem.jqxGrid("getselectedrowindex");
				if (selectedIndex > -1) {
					elem.jqxGrid("deleterow", selectedIndex);
				}
			}
		},
		savePromotionData: function() {
			var param, elem, rows, i, len, obj;

			param = {};

			param.promotion_sid = WRPAdminApp.pagescript._selectedPromotionSid;

			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				param.description = document.getElementById("new-promotion-description").value;
				if (param.description.length == 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Input Description"
					});
					return;
				}
			} catch (e) {
				console.warn(e);
				return;
			}
			
			try {
				param.description = document.getElementById("new-item-line-description").value;
				if (param.description.length == 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Input Description"
					});
					return;
				}
			} catch (e) {
				console.warn(e);
				return;
			}
			
			try {
				elem = $("#new-promotion-start-date");
				if (!elem) {
					return;
				}
				param.start_date = elem.jqxDateTimeInput("getText");
				if (param.start_date.length == 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Input Start Date"
					});
					return;
				}
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				elem = $("#new-promotion-end-date");
				if (!elem) {
					return;
				}
				param.end_date = elem.jqxDateTimeInput("getText");
				if (param.end_date.length == 0) {
					WRPCommon.MsgBoxModule.alert({
						message: "Input End Date"
					});
					return;
				}
			} catch (e) {
				console.warn(e);
				return;
			}  

			elem = $("#promotion-jqx-grid-new-promotion-items-list");

			if (!elem) {
				return;
			}

			rows = elem.jqxGrid("getrows");

			for (i = 0, len = rows.length; i < len; i++) {
				obj = rows[i];
				obj.boundindex = undefined;
				delete obj.boundindex;
				obj.uid = undefined;
				delete obj.uid;
				obj.uniqueid = undefined;
				delete obj.uniqueid;
				obj.visibleindex = undefined;
				delete obj.visibleindex;
			}

			param.items_json_str = JSON.stringify(rows);

			WRPCommon.MsgBoxModule.confirm({
				message: "Are you sure?",
				noBtnClick: function(){
					return;
				},
				yesBtnClick: function(){
					$.ajax({
						url: "ajax/promotion/setPromotionData.jsp",
						data: param,
						method: "POST",
						dataType: "json",
						success: function(result) {
							if (result === 0) {
								$('#promotion-new-window').jqxWindow('close');
								WRPAdminApp.pagescript.getPromotionList();
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
		getPromotionRebateList: function() {    	
			var param, rowdata;
			param = {};

			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			param.promotion_sid = WRPAdminApp.pagescript._selectedPromotionSid;

			if (param.promotion_sid < 1) {
				WRPCommon.MsgBoxModule.alert({
					message: "no select promotion"
				});
				return;
			}

			$.ajax({
				url: "ajax/promotion/getPromotionRebateList.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, elem, i, len, obj;

					data = result.data;

					if (!data) return;

					elem = $("#promotion-jqx-grid-rebates-list");
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
		setPromotionRebateData: function() {
			var param, elem, rows, i, len, obj;

			param = {};

			param.promotion_sid = WRPAdminApp.pagescript._selectedPromotionSid;

			if (param.promotion_sid < 1) {
				WRPCommon.MsgBoxModule.alert({
					message: "no select promotion"
				});
				return;
			}

			try {
				param.store_id = document.getElementById("select-store").value;
				if (param.store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			elem = $("#promotion-jqx-grid-rebates-list");

			if (!elem) {
				return;
			}

			rows = elem.jqxGrid("getrows");    	

			for (i = 0, len = rows.length; i < len; i++) {
				obj = rows[i];
				obj.boundindex = undefined;
				delete obj.boundindex;
				obj.uid = undefined;
				delete obj.uid;
				obj.uniqueid = undefined;
				delete obj.uniqueid;
				obj.visibleindex = undefined;
				delete obj.visibleindex;

				obj.aal_bogo_price = undefined;
				delete obj.aal_bogo_price;
				obj.aal_pogo_price = undefined;
				delete obj.aal_pogo_price;
				obj.aal_price = undefined;
				delete obj.aal_price;
				obj.description = undefined;
				delete obj.description;
				obj.new_act_price = undefined;
				delete obj.new_act_price;
				obj.port_in_price = undefined;
				delete obj.port_in_price;
				obj.promotion_sid = undefined;
				delete obj.promotion_sid;
				obj.retail_price = undefined;
				delete obj.retail_price;
				obj.sku = undefined;
				delete obj.sku;
				obj.sor_price = undefined;
				delete obj.sor_price;
				obj.upg_price = undefined;
				delete obj.upg_price;
			}

			param.items_json_str = JSON.stringify(rows);

			rows = undefined;

			$.ajax({
				url: "ajax/promotion/setPromotionRebateData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (result === 0) {
						WRPCommon.MsgBoxModule.alert({
							message:"Completed",
							okBtnClick: function(){
								WRPAdminApp.pagescript.getPromotionRebateList();
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
		syncPromotion: function() {
			$.ajax({
				url:  "ajax/promotion/syncPromotion.jsp",
				data: {
					storeId: document.getElementById("select-store").value
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					WRPCommon.MsgBoxModule.alert({
						message:"Completed",
						okBtnClick: function(){
							WRPAdminApp.pagescript.init();
						}
					});
				}
			});
		},
		//rate plan
		getRateplanList: function() {
			var storeId, i, len, elem, keyword;

			keyword = document.getElementById("rate-plan-search-keyword").value;
			
			try {
				storeId = document.getElementById("select-store").value;
			} catch (e) {
				console.warn(e);
				return;
			}

			WRPAdminApp.pagescript._selectedRateplanSid = 0;
			WRPAdminApp.pagescript._searchType = 0;
			WRPAdminApp.pagescript._searchKeyword = undefined;

			$.ajax({
				url: "ajax/rateplan/getRateplanList.jsp",
				data: {
					storeId : storeId,
					keyword: keyword
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, elem, i, len, obj, innerHTML;
					elem = $("#jqx-sales-rateplan-list");
					elem.jqxGrid("clear");

					data = result.data;
					if (!data) return;

					elem.jqxGrid("addrow", null, data);
				}
			});
		},
		PopRateplanData: function(event) {
			var rowdata, storeId;
			rowdata = event.args.row.bounddata;

			WRPAdminApp.pagescript._selectedRateplanSid = rowdata.sid;

			if (WRPAdminApp.pagescript._selectedRateplanSid > 0 && WRPAdminApp.pagescript._selectedRateplanSid < 100001) {
				WRPCommon.MsgBoxModule.alert({
					message: "Can not be edited !"
				});
				return;
			}

			if (isNaN(WRPAdminApp.pagescript._selectedRateplanSid)) {
				console.warn("error rateplan sid");
				WRPAdminApp.pagescript._selectedRateplanSid = 0;
				return;
			}

			try {
				storeId = document.getElementById("select-store").value;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/rateplan/getRateplanInfo.jsp",
				data: {
					rateplanSid: WRPAdminApp.pagescript._selectedRateplanSid,
					storeId : storeId
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data;
					data = result.data;
					if (!data) return;

					try {
						document.getElementById("rateplan-edit-rateplan-code-pop").value = (data.rateplanCode !== undefined && data.rateplanCode)? data.rateplanCode : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-carrier-pop").value = (data.carrier !== undefined && data.carrier)? data.carrier : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-description-pop").value = (data.description !== undefined && data.description)? data.description : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-plan-type-pop").value = (data.planType !== undefined && data.planType)? data.planType : '0';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-group-type-pop").value = (data.groupType !== undefined && data.groupType)? data.groupType : '0';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-mrc-pop").value = (data.mrc !== undefined && data.mrc)? "$"+data.mrc.toFixed(2) : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-react-plan-flag-pop").checked = (data.reactPlanFlag !== undefined && data.reactPlanFlag > 0)? true : false;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-upgrade-plan-flag-pop").checked = (data.upgradePlanFlag !== undefined && data.upgradePlanFlag > 0)? true : false;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						$("#rateplan-edit-start-date-pop").jqxDateTimeInput('setDate', data.startDate);
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						$("#rateplan-edit-end-date-pop").jqxDateTimeInput('setDate', data.endDate);
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-disable-pop").checked = (data.disable !== undefined && data.disable > 0)? true : false;
					} catch (e) {
						console.warn(e);
						return;
					}
					$('#sales-rateplan-new-window').jqxWindow('open');
				}
			});
		},
		informSelectedRateplanData: function(event) {
			var rowdata, storeId;
			rowdata = event.args.row;

			WRPAdminApp.pagescript._selectedRateplanSid = rowdata.sid;

			if (isNaN(WRPAdminApp.pagescript._selectedRateplanSid)) {
				console.warn("error rateplan sid");
				WRPAdminApp.pagescript._selectedRateplanSid = 0;
				return;
			}

			try {
				storeId = document.getElementById("select-store").value;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/rateplan/getRateplanInfo.jsp",
				data: {
					rateplanSid: WRPAdminApp.pagescript._selectedRateplanSid,
					storeId: storeId
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data;
					data = result.data;
					if (!data) return;

					try {
						document.getElementById("rateplan-edit-rateplan-code").value = (data.rateplanCode !== undefined && data.rateplanCode)? data.rateplanCode : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-carrier").value = (data.carrier !== undefined && data.carrier)? data.carrier : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-description").value = (data.description !== undefined && data.description)? data.description : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-plan-type").value = (data.planType !== undefined && data.planType)? data.planType : '0';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-group-type").value = (data.groupType !== undefined && data.groupType)? data.groupType : '0';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-mrc").value = (data.mrc !== undefined && data.mrc)? "$"+data.mrc.toFixed(2) : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-react-plan-flag").checked = (data.reactPlanFlag !== undefined && data.reactPlanFlag > 0)? true : false;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-upgrade-plan-flag").checked = (data.upgradePlanFlag !== undefined && data.upgradePlanFlag > 0)? true : false;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-start-date").value = (data.startDate !== undefined && data.startDate)? data.startDate : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-end-date").value = (data.endDate !== undefined && data.endDate)? data.endDate : '';
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						document.getElementById("rateplan-edit-disable").checked = (data.disable !== undefined && data.disable > 0)? true : false;
					} catch (e) {
						console.warn(e);
						return;
					}

					WRPAdminApp.openPopupInPage('rateplanEditContainer');
				}
			});
		},
		initRateplanEditContainer: function() {
			var elem;
			try
			{
				/*WRPAdminApp.pagescript._selectedPromotionSid = 0;*/
				$('#new-item-line-description').val('');
				/*$('#promotion-jqx-grid-new-item-line-list').jqxGrid("clear");*/
				elem = document.querySelector("#sales-rateplan-new-window");

				$('#sales-rateplan-new-window').jqxWindow('open');
			}
			catch(e){
				console.warn(e);
			}
		},
		setRateplanData: function() {
			var data;
			
			WRPCommon.MsgBoxModule.confirm({
				message: "Are you sure?",
				noBtnClick: function(){
					return;
				},
				yesBtnClick: function(){
					data = {};
					data.rateplanSid = WRPAdminApp.pagescript._selectedRateplanSid;

					if (data.rateplanSid < 100001 && data.rateplanSid > 1) {
						WRPCommon.MsgBoxModule.alert({
							message: "Can not be edited !"
						});
						return;
					}

					try {
						data.store_id = document.getElementById("select-store").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.rateplanCode = document.getElementById("rateplan-edit-rateplan-code-pop").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					if (data.rateplanCode.length == 0) {
						WRPCommon.MsgBoxModule.alert({
							message: "Input Rateplan Code"
						});
						return;
					}

					try {
						data.carrier = document.getElementById("rateplan-edit-carrier-pop").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.description = document.getElementById("rateplan-edit-description-pop").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.planType = document.getElementById("rateplan-edit-plan-type-pop").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.groupType = document.getElementById("rateplan-edit-group-type-pop").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.mrc = parseFloat(document.getElementById("rateplan-edit-mrc-pop").value.replace("$",""));
						if (isNaN(data.mrc)) {
							WRPCommon.MsgBoxModule.alert({
								message: "MRC contains non-numeric character"
							});
							return;
						}
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.reactPlanFlag = (document.getElementById("rateplan-edit-react-plan-flag-pop").checked === true)? 1 : 0;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.upgradePlanFlag = (document.getElementById("rateplan-edit-upgrade-plan-flag-pop").checked === true)? 1 : 0;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.startDate = document.getElementById("rateplan-edit-start-date-pop").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.endDate = document.getElementById("rateplan-edit-end-date-pop").value;
					} catch (e) {
						console.warn(e);
						return;
					}

					try {
						data.disable = (document.getElementById("rateplan-edit-disable-pop").checked === true)? 1 : 0;
					} catch (e) {
						console.warn(e);
						return;
					}

					$.ajax({
						url: "ajax/rateplan/setRateplanData.jsp",
						data: data,
						method: "POST",
						dataType: "json",
						success: function(result) {
							if (result === 0) {
								WRPCommon.MsgBoxModule.alert({
									message: "Completed",
									okBtnClick: function(){
										$('#sales-rateplan-new-window').jqxWindow('close');
										WRPAdminApp.pagescript.getRateplanList();
									}
								});
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
		syncRatePlanList: function() {
			$.ajax({
				url:  "ajax/rateplan/syncRatePlanList.jsp",
				data: {
					storeId: document.getElementById("select-store").value
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					WRPCommon.MsgBoxModule.alert({
						message: "Completed",
						okBtnClick: function(){
							WRPAdminApp.pagescript.init();
						}
					});
				}
			});
		},
		// coupon
		getCouponList: function() {
			var store_id, keyword;

			keyword = document.getElementById("coupon-search-keyword").value;
			
			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}
			$.ajax({
				url: "ajax/coupon/getCouponList.jsp",
				data: {
					store_id: store_id,
					keyword: keyword
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, obj, i, len, elem;
					elem = $("#jqx-coupon-coupon-list");
					data = result.data;
					elem.jqxGrid("clear");
					if (!data) return;

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						if (obj.discount_type !== undefined) {
							switch (obj.discount_type) {
							case 0:
								obj.discount_type_str = "Flat";
								break;
							case 1:
								obj.discount_type_str = "%";
								break;
							}
						}
					}
					if (elem) {
						elem.jqxGrid("addrow", null, data);
					}
				}
			});
		},
		getCategoriesStruct: function() {
			var store_id;

			try {
				store_id = document.getElementById("select-store").value;
				if (store_id.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/category/getCategoriesList.jsp",
				data: {
					store_id: store_id
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, adapter, elem, i, len;

					data = result.data;

					if (!data) return;    

					for (i = 0, len = data.length; i < len; i++) {
						elem = data[i];
						elem.value = elem.sid;
					}

					adapter = new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             {name: "sid"},
						             {name: "category_name"},
						             {name: "parent_sid"},
						             {name: "value"}
						             ],
						             id: "sid",
						             localdata: data
					});
					adapter.dataBind();

					records = adapter.getRecordsHierarchy("sid", "parent_sid", "items", [{ name: 'category_name', map: 'label', value: "value"}]);

					elem = $('#jqx-tree-category-struct');

					elem.jqxTree({ 
						source: records, 
						width: '99%', 
						height: "98%",
						theme: "arctic", 
						hasThreeStates: true, 
						checkboxes: true,
						theme: "arctic"    			
					});  
				}
			});
		},
		onCouponListRowClick: function(event) {
			var rowdata;

			rowdata = event.args.row.bounddata;

			try {
				document.getElementById("info-coupon-name").innerHTML = (rowdata.name !== undefined)? rowdata.name : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("info-coupon-code").innerHTML = (rowdata.coupon_code !== undefined)? rowdata.coupon_code : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("info-coupon-description").innerHTML = (rowdata.description !== undefined)? rowdata.description : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("info-coupon-start-date").innerHTML = (rowdata.start_date !== undefined)? rowdata.start_date : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("info-coupon-end-date").innerHTML = (rowdata.end_date !== undefined)? rowdata.end_date : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				if (rowdata.discount_type !== undefined) {
					switch (rowdata.discount_type) {
					case 0:
						document.getElementById("info-coupon-discount-type").innerHTML = "Flat";
						break;
					case 1:
						document.getElementById("info-coupon-discount-type").innerHTML = "%";
						break;
					default:
						document.getElementById("info-coupon-discount-type").innerHTML = "&nbsp;";
					}
				} else {
					document.getElementById("info-coupon-discount-type").innerHTML = "&nbsp;";
				}  		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("info-coupon-max-discount-price").innerHTML = (rowdata.max_discount_price !== undefined)? "$"+rowdata.max_discount_price.toFixed(2) : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("info-coupon-apply-count").innerHTML = (rowdata.apply_count !== undefined)? rowdata.apply_count : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				document.getElementById("info-coupon-multiple-apply-count").innerHTML = (rowdata.multiple_apply !== undefined)? rowdata.multiple_apply : "&nbsp;";    		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				if (rowdata.coupon_id !== undefined) {
					switch (rowdata.coupon_id) {
					case 0:
						document.getElementById("info-coupon-has-each-id").innerHTML = "False";
						break;
					case 1:
						document.getElementById("info-coupon-has-each-id").innerHTML = "True";
						break;
					default:
						document.getElementById("info-coupon-has-each-id").innerHTML = "&nbsp;";
					}
				} else {
					document.getElementById("info-coupon-has-each-id").innerHTML = "&nbsp;";
				}  		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				if (rowdata.print_flag !== undefined) {
					switch (rowdata.print_flag) {
					case 0:
						document.getElementById("info-coupon-transaction-type").innerHTML = "All Transactions";
						break;
					case 1:
						document.getElementById("info-coupon-transaction-type").innerHTML = "Activation Transaction Only";
						break;
					default:
						document.getElementById("info-coupon-transaction-type").innerHTML = "&nbsp;";
					}
				} else {
					document.getElementById("info-coupon-transaction-type").innerHTML = "&nbsp;";
				}  		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				if (rowdata.printable !== undefined) {
					switch (rowdata.printable) {
					case 0:
						document.getElementById("info-coupon-printable").innerHTML = "False";
						break;
					case 1:
						document.getElementById("info-coupon-printable").innerHTML = "True";
						break;
					default:
						document.getElementById("info-coupon-printable").innerHTML = "&nbsp;";
					}
				} else {
					document.getElementById("info-coupon-printable").innerHTML = "&nbsp;";
				}  		
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				if (rowdata.visible !== undefined) {
					switch (rowdata.visible) {
					case 0:
						document.getElementById("info-coupon-visible").innerHTML = "False";
						break;
					case 1:
						document.getElementById("info-coupon-visible").innerHTML = "True";
						break;
					default:
						document.getElementById("info-coupon-visible").innerHTML = "&nbsp;";
					}
				} else {
					document.getElementById("info-coupon-visible").innerHTML = "&nbsp;";
				}  		
			} catch (e) {
				console.warn(e);
				return;
			}
		}
};