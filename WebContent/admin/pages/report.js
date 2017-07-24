/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
		salesTotal: 0,
		inventoryTotal: 0,
		inven_data: undefined, 
		year_data: undefined,
		salesAct_data: undefined,
		salesAct__data: undefined,
		salesActGridData: undefined,
		empBoxData: undefined, 
		sales_data: undefined,
		sales__data: undefined,
		_data: undefined,
		__data: undefined,
		_selectedCustomerElement: undefined,
		_selectedCustomerSid: 0,
		_selectedEmployeeElement: undefined,
		_selectedEmployeeSid: 0,
		_selectedItemElement: undefined,
		_selectedItemSid: 0,
		init: function() {
			
			//jqx date input
			try {
				elem = $(".jqx-datetime-input");

				if (elem && elem.length > 0) {                            
					elem.jqxDateTimeInput({
						width: "99%",
						formatString: "MM/yyyy"
					});
				}
			} catch (e) {

			}
			
			try {
				init_date = new Date($("#sales-number-end-date").jqxDateTimeInput('getDate'));
				
		        date = new Date();
		        date.setFullYear(init_date.getFullYear(), init_date.getMonth()-2, 1);
		        $('#sales-number-start-date').jqxDateTimeInput('setDate', date);
				
		        $('#sales-start-date').jqxDateTimeInput('setDate', date);
		        $('#sales-act-start-date').jqxDateTimeInput('setDate', date);
		        $('#porformance_box-start-date').jqxDateTimeInput('setDate', date);
		        $('#porformance_acc-start-date').jqxDateTimeInput('setDate', date);
		        $('#porformance_pay-start-date').jqxDateTimeInput('setDate', date);
		        
			} catch (e) {

			}
			
			
			//jqx grid
			components = $('#report-jqx-porformance_box-grid');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "store_id", type: "string" },
						             { name: "user_id", type: "string" },
						             { name: "year", type: "date" },
						             { name: "month", type: "string" },
						             { name: "Box(Qty)", type: "string" }
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columnsresize:true,

					columns: [
					          { text: "Store ID", datafield: "store_id", width: "20%" },
					          { text: "Employee ID", datafield: "user_id", width: "20%" },
					          { text: "Year", datafield: "year", width: "20%"},
					          { text: "Month", datafield: "month", width: "20%" },
					          { text: "Box(Qty)", datafield: "box", width: "20%", cellsalign: 'right' }
					          ]
				}); 		
			}

			components = $('#report-jqx-porformance_acc-grid');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "store_id", type: "string" },
						             { name: "user_id", type: "string" },
						             { name: "year", type: "date" },
						             { name: "month", type: "string" },
						             { name: "accessory", type: "string" }
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columnsresize:true,

					columns: [
					          { text: "Store ID", datafield: "store_id", width: "20%" },
					          { text: "Employee ID", datafield: "user_id", width: "20%" },
					          { text: "Year", datafield: "year", width: "20%"},
					          { text: "Month", datafield: "month", width: "20%" },
					          { text: "Accessory(Qty)", datafield: "accessory", width: "20%", cellsalign: 'right' }
					          ]
				}); 		
			}

			components = $('#report-jqx-porformance_pay-grid');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "store_id", type: "string" },
						             { name: "user_id", type: "string" },
						             { name: "year", type: "date" },
						             { name: "month", type: "string" },
						             { name: "payment", type: "string" }
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columnsresize:true,

					columns: [
					          { text: "Store ID", datafield: "store_id", width: "20%" },
					          { text: "Employee ID", datafield: "user_id", width: "20%" },
					          { text: "Year", datafield: "year", width: "20%"},
					          { text: "Month", datafield: "month", width: "20%" },
					          { text: "Payment(Qty)", datafield: "payment", width: "20%", cellsalign: 'right' }
					          ]
				}); 		
			}

			components = $('#report-inventory-quantity-grid');
			if (components) {
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "store_id", type: "string" },
						             { name: "sid", type: "string" },
						             { name: "item_code", type: "string" },
						             { name: "item_type_str", type: "string" },
						             { name: "sku", type: "string" },
						             { name: "description", type: "string" },
						             { name: "in_stock", type: "string" }
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columnsresize:true,

					columns: [
					          { text: "Store ID", datafield: "store_id", width: "16%" },
					          { text: "SID", datafield: "sid", width: "16%" },
					          { text: "Item Code", datafield: "item_code", width: "17%"},
					          { text: "Item Type", datafield: "item_type_str", width: "17%"},
					          { text: "SKU", datafield: "sku", width: "17%" },
					          { text: "Description", datafield: "description", width: "18%" },
					          { text: "Qty", datafield: "in_stock", width: "16%", cellsalign: 'right' }
					          ]
				}); 		
			}

			components = $('#report-inventory_value-grid');
			if (components) {
				/*
				var pagerrenderer = function () {
	          	     var element = $("<div style='float: right;position: relative;top: 8px;font-size: 14px;'><div style='display:inline-block;width:120px; text-align:center;'>Total </div><div style='display: inline-block; width:100px;' id='inventory_value_total'><b>"+WRPAdminApp.pagescript.inventoryTotal+"</b></div><div style='display:inline-block;width:80px; text-align:center;'> &nbsp</div></div>");
	          	     return element;
	          	 	};
				*/
				components.jqxGrid({
					width: "100%",
					height: "100%",
					theme: "arctic",
					//pageable: true,
	                //pagesize: 100,
	                //pagerrenderer: pagerrenderer,
					source: new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "store_id", type: "string" },
						             { name: "sid", type: "string" },
						             { name: "item_code", type: "date" },
						             { name: "sku", type: "date" },
						             { name: "description", type: "string" },
						             { name: "item_cost", type: "string" },
						             { name: "in_stock", type: "string" },
						             { name: "subtotal", type: "number" }
						             ]
					}),
					filterable: true,
					sortable: true,
					groupable: false,
					columnsresize:true,

					columns: [
					          { text: "Store ID", datafield: "store_id", width: "10%" },
					          { text: "SID", datafield: "sid", width: "10%" },
					          { text: "Item Code", datafield: "item_code", width: "10%"},
					          { text: "SKU", datafield: "sku", width: "10%" },
					          { text: "Description", datafield: "description", width: "30%" },
					          { text: "Cost", datafield: "item_cost", width: "10%", cellsalign: 'right', cellsformat: 'c2' },
					          { text: "Qty", datafield: "in_stock", width: "10%", cellsalign: 'right' },
					          { text: "Subtotal", datafield: "subtotal", width: "10%", cellsalign: 'right', cellsformat: 'c2' }
					          ]
				}); 		
			}

			//img
			try {
				WRPComponents('div[pagename="report"] > .page-submenu-container > .submenu[panelname]').addShadowedImage('img/icon/report_01.png');
			} catch (e) {

			}

			//jqx etc...
			try {
				elem = $(".jqx-horizontal-split-panel-main");

				if (elem && elem.length > 0) {                            
					elem.jqxSplitter({
						width: "99.8%",
						height: "99.8%",
						orientation: 'horizontal',
						panels: [
						         { size: "21%", min: 100, collapsible: false }, 
						         { min: 100, collapsible: false}
						         ],
						         theme: "arctic"
					});
				}
			} catch (e) {
				console.warn(e);
			}

			var components = $('#SearchCustomerContainer');
			if (components) {
				components.jqxWindow("width", 780);
				components.jqxWindow("height", 445);
			}

			components = $('#SearchEmpContainer');
			if (components) {
				components.jqxWindow("width", 780);
				components.jqxWindow("height", 445);
			}

			components = $('#SearchItemContainer');
			if (components) {
				components.jqxWindow("width", 780);
				components.jqxWindow("height", 445);
			}

			WRPAdminApp.pagescript.getTransactionData();

		},
		initSearchData: function() {
			var pagescript = WRPAdminApp.pagescript;
			if (pagescript._selectedCustomerElement !== undefined) {
				pagescript._selectedCustomerElement.value = "";
			}
			pagescript._selectedCustomerElement= undefined;
			pagescript._selectedCustomerSid= 0;
			if (pagescript._selectedEmployeeElement !== undefined) {
				pagescript._selectedEmployeeElement.value = "";
			}
			pagescript._selectedEmployeeElement= undefined;
			pagescript._selectedEmployeeSid= 0;
			if (pagescript._selectedItemElement !== undefined) {
				pagescript._selectedItemElement.value = "";
			}
			pagescript._selectedItemElement= undefined;
			pagescript._selectedItemSid= 0;
		},
		getTransactionData: function() {
			var storeId, start_date, end_date, date;

			start_date = new Date($("#sales-number-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			end_date = new Date($("#sales-number-end-date").jqxDateTimeInput('getDate'));

			date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}
			$.ajax({
				//url: "ajax/report/getTransactionData.jsp",
				url: "ajax/report/getNumberOfTransactionsFie.jsp",
				data: {
					storeId: storeId,
					start_date: start_date.getFullYear()+"-"+(start_date.getMonth()+1)+"-01",
					end_date: end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+date.getDate()
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (!result.data) return;

					WRPAdminApp.pagescript.__data = result.data;


					$.ajax({
						//url: "ajax/report/getTransactionData.jsp",
						url: "ajax/report/getNumberOfTransactions.jsp",
						data: {
							storeId: storeId,
							start_date_year: start_date.getFullYear(),
							start_date_month: start_date.getMonth()+1,
							end_date_year: end_date.getFullYear(),
							end_date_month: end_date.getMonth()+1
						},
						method: "POST",
						dataType: "json",
						success: function(result) {
							if (!result.data) return;

							WRPAdminApp.pagescript._data = result.data;
							WRPAdminApp.pagescript.printGridAndChart();

						}
					});	
				}
			});
		},
		printGridAndChart: function() {
			var data, fieData, i, len, i2, len2, obj, obj2, obj3, arr, arr2, tmpDataset, pieChartData, lineChartData, newObj, source, adapter, option, settings, year_date, start;
			if (WRPAdminApp.pagescript._data === undefined) {
				return;
			}
			pieChartData = [];
			lineChartData = [];
			data = WRPAdminApp.pagescript._data;

			obj1 = {};

			len = data.length;
			
			if(len > 6) {
				WRPCommon.MsgBoxModule.alert({
					message: "range 6 Month."
				});
				return;
			}
			
			if (len > 6) start = len - 6;
			else		 start = 0;
			
			for (i = 0; i < len; i++) {
				data[i].storeId = document.getElementById("select-store").value;
				data[i].total = data[i].payment_count + data[i].accessory_count + data[i].box_count;
				year_date = data[i].year_month.split("-");
				data[i].year = year_date[0];
				data[i].month = year_date[1];

				obj1.payment_count = data[i].payment_count;
				obj1.accessory_count = data[i].accessory_count;
				obj1.box_count = data[i].box_count;
				obj1.year_month = data[i].year_month;
				lineChartData.push(obj1);
			}
			fieData = WRPAdminApp.pagescript.__data;


			obj3 = {};
			obj3.payment_count = 0;
			obj3.box_count = 0;
			obj3.accessory_count = 0;

			for (i = 0, len = fieData.length; i < len; i++) {
				obj3 = {};
				obj3.count = fieData[i].qty;
				if(fieData[i].TYPE == 0 && fieData[i].item_type == 0)	obj3.type = "Box";
				else if(fieData[i].TYPE == 0 && fieData[i].item_type != 0) obj3.type = "Accessory";
				else if(fieData[i].TYPE == 3) obj3.type = "Payment";
				pieChartData.push(obj3);
			}

			source = {
					localdata: data,
					datafields: [
					             {name: "storeId"},
					             {name: "year"},
					             {name: "month"},
					             {name: "box_count"},
					             {name: "payment_count"},
					             {name: "others_count"},
					             {name: "total"},
					             {name: "accessory_count"}
					             ],
					             datatype: "json"
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					width: "100%",
					height: "100%",
					theme: 'arctic',
					source: adapter,
					filterable: true,
					sortable: true,
					columns: [
					          { text: "Store ID", datafield: "storeId", width: "12%"},
					          { text: "Year", datafield: "year", widwidth: "12%"},
					          { text: "Month", datafield: "month", width: "12%"},
					          { text: "Box(Qty)", datafield: "box_count", width: "12%"},
					          { text: "Accessory(Qty)", datafield: "accessory_count", width: "12%"},
					          { text: "Payment(Qty)", datafield: "payment_count", width: "12%"},
					          { text: "Others(Qty)", datafield: "others_count", width: "12%"},
					          { text: "Total(Qty)", datafield: "total", width: "12%"}
					          ]
			};

			$("#report-jqx-transaction-grid").jqxGrid(settings);

			$("#excel_report_grid").click(function () {
				$("#report-jqx-transaction-grid").jqxGrid('exportdata', 'xls', 'jqx-report-transaction-list');
			});
			source = {
					datatype: "json",
					localdata: pieChartData,
					datafield: [{ name: "type" }, { name: "count" }]
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Ratio of Transactions",
					description: "",
					enableAnimations: true,
					showLegend: true,
					showBorderLine: true,
					legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
					padding: { left: 5, top: 5, right: 5, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
					source: adapter,
					//colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'pie',
							 showLabels: true,
							 series:
								 [
								  { 
									  dataField: 'count',
									  displayText: 'type',
									  labelRadius: 50,
									  initialAngle: 15,
									  radius: 100,
									  centerOffset: 0,
									  formatFunction: function (value) {
										  if (isNaN(value))
											  return value;
										  return parseFloat(value);
									  }
								  }
								  ]
						 }
						 ]
			};

			$("#report-jqx-transaction-pie-chart").jqxChart(settings);

			source = undefined;
			adapter = undefined;
			settings = undefined;

			source = {
					datatype: "json",
					datafields: [
					             {name: "year_month"},
					             {name: "amount"},
					             {name: "payment_count"},
					             {name: "accessory_count"},
					             {name: "box_count"}
					             ],
					             localdata: data
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Number of Transactions",
					theme: "arctic",
					description: "",
					enableAnimations: true,
					showLegend: true,
					padding: { left: 10, top: 5, right: 10, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
					colorScheme: 'myScheme',
					source: adapter,
					xAxis:
					{
						dataField: 'year_month',
						type: 'date',
						formatString: 'MM/dd/yyyy',
						baseUnit: 'month',
						valuesOnTicks: true,
						minValue: data[start].year_month,
						maxValue: data[data.length-1].year_month,
						tickMarks: {
							visible: true,
							interval: 1,
							color: '#BCBCBC'
						},
						unitInterval: 1,
						gridLines: {
							visible: false,
							interval: 3,
							color: '#BCBCBC'
						},
						labels: {
							//angle: -45,
							rotationPoint: 'topright',
							formatFunction: function (value) {
                                return value.getMonth()+1 + '/' + value.getFullYear();
                            }
							//offset: { x: 0, y: -25 }
						}
					},
					valueAxis:
					{
						visible: true,
						title: { text: '' },
						tickMarks: { color: '#BCBCBC' },
						minValue:0,
						gridLines: {
							visible: false,
							interval: 3,
							color: '#BCBCBC'
						}
					},
					//colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'column',
							 series: [
							          { dataField: 'box_count', displayText: 'Box'},
							          { dataField: 'accessory_count', displayText: 'Accessory'},
							          { dataField: 'payment_count', displayText: 'Payment'}
							          ]
						 }
						 ]
			};

			$('#report-jqx-transaction-line-chart').jqxChart(settings);
			
			
			
			
			$('#report-jqx-transaction-pie-chart').jqxChart('addColorScheme', 'myScheme', ['#A2ABB0', '#1A2B33', '#AB292A']);
			$('#report-jqx-transaction-pie-chart').jqxChart('colorScheme', 'myScheme');
			$('#report-jqx-transaction-pie-chart').jqxChart('refresh');
			
			$('#report-jqx-transaction-line-chart').jqxChart('addColorScheme', 'myScheme', ['#A2ABB0', '#1A2B33', '#AB292A']);
			$('#report-jqx-transaction-line-chart').jqxChart('colorScheme', 'myScheme');
			$('#report-jqx-transaction-line-chart').jqxChart('refresh');
		},
		/* 공사 */
		//sales
		getSalesAmount: function() {
			var storeId, start_date, end_date, date;
			WRPAdminApp.pagescript.salesTotal = 0;
			start_date = new Date($("#sales-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			end_date = new Date($("#sales-end-date").jqxDateTimeInput('getDate'));

			date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}
			$.ajax({
				url: "ajax/report/getTransactionsFie.jsp",
				data: {
					storeId: storeId,
					start_date: start_date.getFullYear()+"-"+(start_date.getMonth()+1)+"-01",
					end_date: end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+date.getDate()
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (!result.data) return;

					WRPAdminApp.pagescript.sales__data = result.data;


					$.ajax({
						//url: "ajax/report/getTransactionData.jsp",
						url: "ajax/report/getTransactions.jsp",
						data: {
							storeId: storeId,
							start_date_year: start_date.getFullYear(),
							start_date_month: start_date.getMonth()+1,
							end_date_year: end_date.getFullYear(),
							end_date_month: end_date.getMonth()+1
						},
						method: "POST",
						dataType: "json",
						success: function(result) {
							if (!result.data) return;

							WRPAdminApp.pagescript.sales_data = result.data;
							WRPAdminApp.pagescript.salesPrintGridAndChart();

						}
					});	
				}
			});
		},
		salesPrintGridAndChart: function() {
			var data, fieData, i, len, i2, len2, obj, obj2, obj3, arr, arr2, tmpDataset, pieChartData, lineChartData, newObj, source, adapter, option, settings, year_date, total;
			if (WRPAdminApp.pagescript.sales_data === undefined) {
				return;
			}
			pieChartData = [];
			lineChartData = [];
			data = WRPAdminApp.pagescript.sales_data;

			obj1 = {};
			
			len = data.length;
			
			if(len > 6) {
				WRPCommon.MsgBoxModule.alert({
					message: "range 6 Month."
				});
				return;
			}
			
			if (len > 6) start = len - 6;
			else		 start = 0;
			
			for (i = 0; i < len; i++) {
				data[i].storeId = document.getElementById("select-store").value;
				data[i].total = data[i].payment_cost + data[i].accessory_cost + data[i].box_cost;
				year_date = data[i].year_month.split("-");
				data[i].year = year_date[0];
				data[i].month = year_date[1];

				WRPAdminApp.pagescript.salesTotal += data[i].total; 
				
				obj1.payment_count = data[i].payment_count;
				obj1.accessory_count = data[i].accessory_count;
				obj1.box_count = data[i].box_count;
				obj1.year_month = data[i].year_month;
				lineChartData.push(obj1);
			}
			fieData = WRPAdminApp.pagescript.sales__data;

			obj3 = {};
			obj3.payment_count = 0;
			obj3.box_count = 0;
			obj3.accessory_count = 0;
			total=0;
			for (i = 0, len = fieData.length; i < len; i++) {
				obj3 = {};
				obj3.cost = fieData[i].qty;
				if(fieData[i].TYPE == 0 && fieData[i].item_type == 0)	obj3.type = "Box";
				else if(fieData[i].TYPE == 0 && fieData[i].item_type != 0) obj3.type = "Accessory";
				else if(fieData[i].TYPE == 3) obj3.type = "Payment";
				pieChartData.push(obj3);

				total += fieData[i].qty;
			}
			
			var pagerrenderer = function () {
          	     var element = $("<div style='float: right;position: relative;top: 8px;font-size: 14px;'><div style='display:inline-block;width:120px; text-align:center;'>Total </div><div style='display: inline-block; width:100px;' id='sales_total'><b>"+WRPAdminApp.pagescript.salesTotal+"</b></div><div style='display:inline-block;width:80px; text-align:center;'> &nbsp</div></div>");
          	     return element;
          	 	}
			
			source = {
					localdata: data,
					datafields: [
					             {name: "storeId"},
					             {name: "year"},
					             {name: "month"},
					             {name: "box_cost"},
					             {name: "payment_cost"},
					             {name: "others_cost"},
					             {name: "total"},
					             {name: "accessory_cost"}
					             ],
					             datatype: "json"
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					width: "100%",
					height: "100%",
					theme: 'arctic',
					source: adapter,
					pageable: true,
				    pagesize: 100,
				    pagerrenderer: pagerrenderer,
					filterable: true,
					sortable: true,
					columns: [
					          { text: "Store ID", datafield: "storeId", width: "12%"},
					          { text: "Year", datafield: "year", widwidth: "12%"},
					          { text: "Month", datafield: "month", width: "12%"},
					          { text: "Box($)", datafield: "box_cost", width: "12%", cellsalign: 'right', cellsformat: 'c2'},
					          { text: "Accessory($)", datafield: "accessory_cost", width: "12%", cellsalign: 'right', cellsformat: 'c2'},
					          { text: "Payment($)", datafield: "payment_cost", width: "12%", cellsalign: 'right', cellsformat: 'c2'},
					          { text: "Others($)", datafield: "others_cost", width: "12%", cellsalign: 'right', cellsformat: 'c2'},
					          { text: "Total($)", datafield: "total", width: "12%", cellsalign: 'right', cellsformat: 'c2'}

					          ]
			};

			$("#report-sales-grid").jqxGrid(settings);

			$("#excel_report_grid").click(function () {
				$("#report-jqx-transaction-grid").jqxGrid('exportdata', 'xls', 'jqx-report-transaction-list');
			});
			
			console.log(pieChartData);
			
			source = {
					datatype: "json",
					localdata: pieChartData,
					datafield: [{ name: "type" }, { name: "cost" }]
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Ratio of Transactions",
					description: "",
					enableAnimations: true,
					showLegend: true,
					showBorderLine: true,
					legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
					padding: { left: 5, top: 5, right: 5, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
					source: adapter,
					colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'pie',
							 showLabels: true,
							 series:
								 [
								  { 
									  dataField: 'cost',
									  displayText: 'type',
									  labelRadius: 50,
									  initialAngle: 15,
									  radius: 100,
									  centerOffset: 0,
									  formatFunction: function (value) {
										  if (typeof(value) === "string") {
											  return value;
										  } else {
											  if (isNaN(value))
												  return value;
											  return "$"+parseFloat(value);
										  }
									  }
								  }
								  ]
						 }
						 ]
			};

			$("#report-sales-pie-chart").jqxChart(settings);

			source = undefined;
			adapter = undefined;
			settings = undefined;

			source = {
					datatype: "json",
					datafields: [
					             {name: "year_month"},
					             {name: "amount"},
					             {name: "payment_cost"},
					             {name: "accessory_cost"},
					             {name: "box_cost"}
					             ],
					             localdata: data
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Number of Transactions",
					theme: "arctic",
					description: "",
					enableAnimations: true,
					showLegend: true,
					padding: { left: 10, top: 5, right: 10, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
					//colorScheme: 'scheme09',
					source: adapter,
					xAxis:
					{
						dataField: 'year_month',
						type: 'date',
						baseUnit: 'month',
						valuesOnTicks: true,
						minValue: data[start].year_month,
						maxValue: data[data.length-1].year_month,
						tickMarks: {
							visible: true,
							interval: 1,
							color: '#BCBCBC'
						},
						unitInterval: 1,
						gridLines: {
							visible: false,
							interval: 3,
							color: '#BCBCBC'
						},
						labels: {
							//angle: -45,
							rotationPoint: 'topright',
							formatFunction: function (value) {
                                return value.getMonth()+1 + '/' + value.getFullYear();
                            }
							//offset: { x: 0, y: -25 }
						}
					},
					valueAxis:
					{
						visible: true,
						title: { text: 'Daily Total Price<br>' },
						tickMarks: { color: '#BCBCBC' },
						minValue:0,
						gridLines: {
							visible: false,
							interval: 3,
							color: '#BCBCBC'
						}
					},
					//colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'column',
							 series: [
							          { dataField: 'box_cost', displayText: 'Box'},
							          { dataField: 'accessory_cost', displayText: 'Accessory'},
							          { dataField: 'payment_cost', displayText: 'Payment'}
							          ]
						 }
						 ]
			};

			$('#report-sales-line-chart').jqxChart(settings);
			
			$('#report-sales-pie-chart').jqxChart('addColorScheme', 'myScheme', ['#A2ABB0', '#1A2B33', '#AB292A']);
			$('#report-sales-pie-chart').jqxChart('colorScheme', 'myScheme');
			$('#report-jqx-transaction-pie-chart').jqxChart('refresh');
			
			$('#report-sales-line-chart').jqxChart('addColorScheme', 'myScheme', ['#A2ABB0', '#1A2B33', '#AB292A']);
			$('#report-sales-line-chart').jqxChart('colorScheme', 'myScheme');
			$('#report-sales-line-chart').jqxChart('refresh');
			
			document.getElementById("sales_total").innerHTML = "<b>"+"$ "+WRPAdminApp.pagescript.salesTotal+"</b>";
		},
		//sales-activity
		getSalesActivity: function() {
			var storeId, start_date, end_date, date;
			WRPAdminApp.pagescript.salesTotal = 0;
			start_date = new Date($("#sales-act-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			end_date = new Date($("#sales-act-end-date").jqxDateTimeInput('getDate'));

			date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}
			$.ajax({
				url: "ajax/report/getMonthlyActivations.jsp",
				data: {
					store_id: storeId,
					start_date_year: start_date.getFullYear(),
					start_date_month: start_date.getMonth()+1,
					end_date_year: end_date.getFullYear(),
					end_date_month: end_date.getMonth()+1
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					if (!result.data) return;
					WRPAdminApp.pagescript.salesActGridData = result.data; 	
					WRPAdminApp.pagescript.salesActivityPrintGridAndChart();
					/*
					$.ajax({
						url: "ajax/report/getNumberOfTransactionsFie.jsp",
						data: {
							storeId: storeId,
							start_date: start_date.getFullYear()+"-"+(start_date.getMonth()+1)+"-01",
							end_date: end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+date.getDate()
						},
						method: "POST",
						dataType: "json",
						success: function(result) {
							if (!result.data) return;

							WRPAdminApp.pagescript.salesAct__data = result.data;
							
							$.ajax({
								url: "ajax/report/getNumberOfTransactions.jsp",
								data: {
									storeId: storeId,
									start_date_year: start_date.getFullYear(),
									start_date_month: start_date.getMonth()+1,
									end_date_year: end_date.getFullYear(),
									end_date_month: end_date.getMonth()+1
								},
								method: "POST",
								dataType: "json",
								success: function(result) {
									if (!result.data) return;

									WRPAdminApp.pagescript.salesAct_data = result.data;
										
								}
							});	
						}
					});
					*/
				}
			});
		},
		salesActivityPrintGridAndChart: function() {
			var data, fieData, gridData, i, len, i2, len2, obj, obj2, obj3, arr, arr2, tmpDataset, pieChartData, lineChartData, newObj, source, adapter, option, settings, year_date;

			pieChartData = [];
			lineChartData = [];
			//data = WRPAdminApp.pagescript.salesAct_data;
			data = WRPAdminApp.pagescript.salesActGridData;
			obj1 = {};

			gridData = WRPAdminApp.pagescript.salesActGridData;
			for (i = 0, len = gridData.length; i < len; i++) {
				gridData[i].storeId = document.getElementById("select-store").value;
			}

			len = data.length;
			
			if(len > 6) {
				WRPCommon.MsgBoxModule.alert({
					message: "range 6 Month."
				});
				return;
			}
			
			if (len > 6) start = len - 6;
			else		 start = 0;
			
			for (i = 0; i < len; i++) {
				data[i].storeId = document.getElementById("select-store").value;
				//data[i].total = data[i].byod + data[i].accessory_cost + data[i].box_cost;
				year_date = data[i].year_month.split("-");
				gridData[i].year = year_date[0];
				gridData[i].month = year_date[1];
				/*
				obj1.payment_count = data[i].payment_count;
				obj1.accessory_count = data[i].accessory_count;
				obj1.box_count = data[i].box_count;
				obj1.year_month = data[i].year_month;
				*/
				obj1.newact = data[i].newact;
				obj1.upgrade = data[i].upgrade;
				obj1.port_in = data[i].port_in;
				obj1.byod = data[i].byod;
				
				lineChartData.push(obj1);
			}
			//fieData = WRPAdminApp.pagescript.salesAct__data;
			
			obj3 = {};
			obj3.newact = 0;
			obj3.upgrade = 0;
			obj3.port_in = 0;
			obj3.byod = 0;
			
			var name = new Array('New Act','Upgrade','Port In', 'BYOD');

			for (i = 0, len = data.length; i < len; i++) {
				
				obj3.newact = obj3.newact + data[i].newact;
				obj3.upgrade = obj3.upgrade + data[i].upgrade;
				obj3.port_in = obj3.port_in + data[i].port_in;
				obj3.byod = obj3.byod + data[i].byod;
			}
			
			var datarow = new Array();
			for(i = 0; i < 4; i++){
				var row = {};
				row["type"] = name[i];

				if(i == 0) row["count"] = obj3.newact;
				if(i == 1) row["count"] = obj3.upgrade;
				if(i == 2) row["count"] = obj3.port_in;
				if(i == 3) row["count"] = obj3.byod;

				datarow[i] = row;
			}
			var source = {
					datatype: "json",
					localdata: datarow,
					datafield: [{ name: "type" }, { name: "count" }]
			};

			var dataAdapter = new $.jqx.dataAdapter(source);
			
			/*
			for (i = 0, len = data.length; i < len; i++) {
				obj3 = {};
				obj3.cost = data[i].qty;
				
				obj3["newact"] = obj3.newact;
				obj3["upgrade"] = obj3.upgrade;
				
				if(fieData[i].TYPE == 0 && fieData[i].item_type == 0)	obj3.type = "Box";
				else if(fieData[i].TYPE == 0 && fieData[i].item_type != 0) obj3.type = "Accessory";
				else if(fieData[i].TYPE == 3) obj3.type = "Payment";
				pieChartData.push(obj3);
			}
			*/
			source = {
					localdata: gridData,
					datafields: [
					             {name: "storeId"},
					             {name: "year"},
					             {name: "month"},
					             {name: "newact"},
					             {name: "upgrade"},
					             {name: "port_in"},
					             {name: "byod"},
					             {name: "total"}
					             ],
					             datatype: "json"
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					width: "100%",
					height: "100%",
					theme: 'arctic',
					source: adapter,
					filterable: true,
					sortable: true,
					columns: [
					          { text: "Store ID", datafield: "storeId", width: "12%"},
					          { text: "Year", datafield: "year", widwidth: "12%"},
					          { text: "Month", datafield: "month", width: "12%"},
					          { text: "New Activation", datafield: "newact", width: "12%"},
					          { text: "Upgrade", datafield: "upgrade", width: "12%"},
					          { text: "Port In", datafield: "port_in", width: "12%"},
					          { text: "BYOD", datafield: "byod", width: "12%"},
					          { text: "Total", datafield: "total", width: "12%"}

					          ]
			};

			$("#report-sales-act-grid").jqxGrid(settings);

			$("#excel_report_grid").click(function () {
				$("#report-sales-act-grid").jqxGrid('exportdata', 'xls', 'jqx-report-transaction-list');
			});
			/*
			source = {
					datatype: "json",
					localdata: pieChartData,
					datafield: [{ name: "type" }, { name: "cost" }]
			};
*/
			//adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Ratio of Transactions",
					description: "",
					enableAnimations: true,
					showLegend: true,
					showBorderLine: true,
					legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
					padding: { left: 5, top: 5, right: 5, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
					source: dataAdapter,
					colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'pie',
							 showLabels: true,
							 series:
								 [
								  { 
									  dataField: 'count',
									  displayText: 'type',
									  labelRadius: 50,
									  initialAngle: 15,
									  radius: 100,
									  centerOffset: 0,
									  formatFunction: function (value) {
										  if (isNaN(value))
											  return value;
										  return parseFloat(value);
									  }
								  }
								  ]
						 }
						 ]
			};

			$("#report-sales-act-pie-chart").jqxChart(settings);

			source = undefined;
			adapter = undefined;
			settings = undefined;

			source = {
					datatype: "json",
					datafields: [
					             {name: "year_month"},
					             {name: "newact"},
					             {name: "upgrade"},
					             {name: "port_in"},
					             {name: "byod"}
					             ],
					             localdata: data
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Number of Transactions",
					theme: "arctic",
					description: "",
					enableAnimations: true,
					showLegend: true,
					padding: { left: 10, top: 5, right: 10, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
					colorScheme: 'scheme09',
					source: adapter,
					xAxis:
					{
						dataField: 'year_month',
						type: 'date',
						baseUnit: 'month',
						valuesOnTicks: true,
						minValue: data[start].year_month,
						maxValue: data[data.length-1].year_month,
						tickMarks: {
							visible: true,
							interval: 1,
							color: '#BCBCBC'
						},
						unitInterval: 1,
						gridLines: {
							visible: false,
							interval: 3,
							color: '#BCBCBC'
						},
						labels: {
							//angle: -45,
							rotationPoint: 'topright',
							formatFunction: function (value) {
                                return value.getMonth()+1 + '/' + value.getFullYear();
                            }
							//offset: { x: 0, y: -25 }
						}
					},
					valueAxis:
					{
						visible: true,
						title: { text: 'Daily Total Price<br>' },
						tickMarks: { color: '#BCBCBC' },
						minValue:0,
						gridLines: {
							visible: false,
							interval: 3,
							color: '#BCBCBC'
						},
					},
					colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'column',
							 series: [
							          { dataField: 'newact', displayText: 'New Act'},
							          { dataField: 'upgrade', displayText: 'Upgrade'},
							          { dataField: 'port_in', displayText: 'Port In'},
							          { dataField: 'byod', displayText: 'BYOD'}
							          ]
						 }
						 ]
			};

			$('#report-sales-act-line-chart').jqxChart(settings);
		},
		//inven
		getInventoryDetailData: function() {
			var storeId, start_date, end_date, date;

			//date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}
			$.ajax({
				url: "ajax/report/getQtyInStockItemsByStores.jsp",
				data: {
					storeId: storeId,
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, lineChartData;
					var datarow = new Array();
					
					obj1 = {};
					obj1.accessory_count = 0;
					obj1.sim_count = 0;
					obj1.phone_count = 0;
					
					lineChartData = [];
					$("#report-inventory-quantity-grid").jqxGrid("clear");
					if (!result.data) return;
					
					data = result.data;
					
					for (i = 0, len = data.length; i < len; i++) {
						if(data[i].item_type == 0) data[i].item_type_str = "Phone";
						else if(data[i].item_type == 1) data[i].item_type_str = "SIM";
						else data[i].item_type_str = "Accessory";
						
						obj1.item_type = data[i].item_type;
						if (obj1.item_type == 0)	obj1.phone_count += data[i].in_stock;
						else if (obj1.item_type == 1)	obj1.sim_count += data[i].in_stock;
						else if (obj1.item_type > 1)	obj1.accessory_count += data[i].in_stock;
					}
					
					$("#report-inventory-quantity-grid").jqxGrid("addrow", null, data);
					
					WRPAdminApp.pagescript.inven_data = result.data;

					lineChartData.push(obj1);

					var name = new Array('Phone','SIM','Accessory');

					for(i = 0; i < 3; i++){
						var row = {};
						row["type"] = name[i];

						if(i == 0) row["count"] = obj1.phone_count;
						if(i == 1) row["count"] = obj1.sim_count;
						if(i == 2) row["count"] = obj1.accessory_count;

						datarow[i] = row;
					}
					var source = {
							datatype: "json",
							localdata: datarow,
							datafield: [{ name: "type" }, { name: "count" }]
					};

					var dataAdapter = new $.jqx.dataAdapter(source);

					var settings03 = {
							title: "Quantity Items",
							description: "The number of Activations",
							enableAnimations: true,
							showLegend: false,
							padding: { left: 5, top: 5, right: 5, bottom: 15 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
							borderLineWidth: 0,
							source: dataAdapter,
							//colorScheme: 'scheme09',
							xAxis:
							{
								dataField: 'type',
								unitInterval: 1,
								tickMarks: {
									visible: true,
									unitInterval: 1
								},
								gridLines: {
									visible: false,
									unitInterval: 1
								},
								labels:
								{
									//angle: 55,
									horizontalAlignment: 'left',
									verticalAlignment: 'center',
									rotationPoint: 'right',
									//offset: { x: 10, y: 15 }
								}
							},
							valueAxis:
							{
								minValue: 0,
								visible: true,
								title: { text: '<br>' },
								gridLines: { visible: false }
							},
							seriesGroups:
								[
								 {
									 type: 'column',
									 columnsGapPercent: 50,
									 seriesGapPercent: 5,
									 series: [
									          { dataField: 'count', displayText: 'Count' }
									          ]
								 }
								 ]
					};

					$('#report-inventory-quantity-line-chart').jqxChart(settings03);
					
					$('#report-inventory-quantity-line-chart').jqxChart('addColorScheme', 'myScheme', ['#A2ABB0', '#1A2B33', '#AB292A']);
					$('#report-inventory-quantity-line-chart').jqxChart('colorScheme', 'myScheme');
					$('#report-inventory-quantity-line-chart').jqxChart('refresh');

					var settings = {
							title: "Ratio of Transactions",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: dataAdapter,
							colorScheme: 'scheme09',
							seriesGroups:
								[
								 {
									 type: 'pie',
									 showLabels: true,
									 series:
										 [
										  { 
											  dataField: 'count',
											  displayText: 'type',
											  labelRadius: 50,
											  initialAngle: 15,
											  radius: 100,
											  centerOffset: 0,
											  formatFunction: function (value) {
												  if (isNaN(value))
													  return value;
												  return parseFloat(value);
											  }
										  }
										  ]
								 }
								 ]
					};

					$("#report-inventory-quantity-pie-chart").jqxChart(settings);
					
				}
			});
		},
		//inven value
		getInventoryDetailValue: function() {
			var storeId, start_date, end_date, date;
			WRPAdminApp.pagescript.inventoryTotal = 0;
			//date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}
			$.ajax({
				url: "ajax/report/getQtyInStockItemsByStores.jsp",
				data: {
					storeId: storeId,
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, lineChartData;

					lineChartData = [];
					$("#report-inventory_value-grid").jqxGrid("clear");
					if (!result.data) return;
					
					data = result.data;
					
					for (i = 0, len = data.length; i < len; i++) {
						
						if(data[i].item_type == 0) data[i].item_type_str = "Phone";
						else if(data[i].item_type == 1) data[i].item_type_str = "SIM";
						else data[i].item_type_str = "Accessory";
						
						data[i].subtotal = parseFloat((data[i].item_cost * data[i].in_stock).toFixed(2));
						//data[i].subtotal = data[i].subtotal.toFixed(2);
						//console.log(data[i].item_cost +"*"+ data[i].in_stock+"="+data[i].subtotal.toFixed(2));
					}
					
					
					$("#report-inventory_value-grid").jqxGrid("addRow", null, data);
					
					
					data = result.data;
					WRPAdminApp.pagescript.inven_data = result.data;

					obj1 = {};
					obj1.accessory_cost = 0;
					obj1.sim_cost = 0;
					obj1.phone_cost = 0;

					var datarow = new Array();

					for (i = 0, len = data.length; i < len; i++) {
						obj1.item_type = data[i].item_type;
						if (obj1.item_type == 0)	obj1.phone_cost += data[i].item_cost;
						else if (obj1.item_type == 1)	obj1.sim_cost += data[i].item_cost;
						else if (obj1.item_type > 1)	obj1.accessory_cost += data[i].item_cost;	
						
						WRPAdminApp.pagescript.inventoryTotal += data[i].item_cost;
					}
					lineChartData.push(obj1);
					var name = new Array('Phone','SIM','Accessory');

					for(i = 0; i < 3; i++){
						var row = {};
						row["type"] = name[i];

						if(i == 0) row["count"] = obj1.phone_cost.toFixed(2);
						if(i == 1) row["count"] = obj1.sim_cost.toFixed(2);
						if(i == 2) row["count"] = obj1.accessory_cost.toFixed(2);

						datarow[i] = row;
					}

					var source = {
							datatype: "json",
							localdata: datarow,
							datafield: [{ name: "type" }, { name: "count" }]
					};

					var dataAdapter = new $.jqx.dataAdapter(source);

					var settings03 = {
							title: "Cost of Items",
							description: "The number of Activations",
							enableAnimations: true,
							showLegend: false,
							padding: { left: 5, top: 5, right: 5, bottom: 15 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
							borderLineWidth: 0,
							source: dataAdapter,
							colorScheme: 'scheme20',
							xAxis:
							{
								dataField: 'type',
								unitInterval: 1,
								tickMarks: {
									visible: true,
									unitInterval: 1
								},
								gridLines: {
									visible: false,
									unitInterval: 1
								},
								labels:
								{
									//angle: 55,
									horizontalAlignment: 'left',
									verticalAlignment: 'center',
									rotationPoint: 'right',
									//offset: { x: 10, y: 15 }
								}
							},
							valueAxis:
							{
								minValue: 0,
								visible: true,
								title: { text: '<br>' },
								gridLines: { visible: false }
							},
							seriesGroups:
								[
								 {
									 type: 'column',
									 columnsGapPercent: 50,
									 seriesGapPercent: 5,
									 series: [
									          { dataField: 'count', displayText: 'Count' }
									          ]
								 }
								 ]
					};

					$('#report-inventory_value-line-chart').jqxChart(settings03);
					var settings = {
							title: "Ratio of Transactions",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: dataAdapter,
							colorScheme: 'scheme09',
							seriesGroups:
								[
								 {
									 type: 'pie',
									 showLabels: true,
									 series:
										 [
										  { 
											  dataField: 'count',
											  displayText: 'type',
											  labelRadius: 50,
											  initialAngle: 15,
											  radius: 100,
											  centerOffset: 0,
											  formatFunction: function (value) {
												  if (typeof(value) === "string") {
													  return value;
												  } else {
													  if (isNaN(value))
														  return value;
													  return "$"+parseFloat(value);
												  }
											  }
										  }
										  ]
								 }
								 ]
					};

					$("#report-inventory_value-pie-chart").jqxChart(settings);
				}
			});
			//document.getElementById("inventory_value_total").innerHTML = "<b>"+"$ "+WRPAdminApp.pagescript.inventoryTotal.toFixed(2)+"</b>";
		},
		//emp box
		getEmpPerformanceBox: function() {
			var storeId, start_date, end_date, date, len;

			start_date = new Date($("#porformance_box-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			end_date = new Date($("#porformance_box-end-date").jqxDateTimeInput('getDate'));

			date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/report/getEmployeePerformanceData.jsp",
				data: {
					store_id: storeId,
					box: 1,
					start_date_month: start_date.getMonth()+1,
					start_date_year: start_date.getFullYear() 
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, lineChartData, pieChartData, userList, i, len, obj, i2, len2, obj2, newObj, source, series, settings, year_date;
					WRPAdminApp.pagescript.empBoxData = result.data;
					data = result.data;
					$("#report-jqx-porformance_box-grid").jqxGrid("clear");
					if (!result.data) return;

					lineChartData = [];

					userList = [];
					len = data.length;
					
					
					console.log(len);
					for (i = 0; i < len; i++) {
						year_date = data[i].year_month.split("-");
						data[i].store_id = storeId;
						data[i].year = year_date[0];
						data[i].month = year_date[1];
						console.log(data[i]);
					}
					$("#report-jqx-porformance_box-grid").jqxGrid("addrow", null, data);


					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];

						obj2 = undefined;

						for(i2 = 0, len2 = lineChartData.length; i2 < len2; i2++) {
							obj2 = lineChartData[i2];
							if (obj2.year_month === obj.year_month) {
								obj2[obj.user_id] = obj.box;
								if (userList.indexOf(obj.user_id) == -1) {
									userList.push(obj.user_id);
								}
								break;
							}

							obj2 = undefined;
						}

						if (obj2 === undefined) {
							obj2 = {};
							obj2.year_month = obj.year_month;
							obj2[obj.user_id] = obj.box;
							lineChartData.push(obj2);
							if (userList.indexOf(obj.user_id) == -1) {
								userList.push(obj.user_id);
							}
						}
					}

					len = lineChartData.length;
					if(len > 6) {
						WRPCommon.MsgBoxModule.alert({
							message: "range 6 Month."
						});
						return;
					}
					/*
					if (len > 6) start = len - 6;
					else		 start = 0;
					*/
					for (i = 0; i < len; i++) {
						obj = lineChartData[i];
						for (i2 = 0, len2 = userList.length; i2 < len2; i2++) {
							if (obj[userList[i2]] === undefined) {
								obj[userList[i2]] = 0;
							}
						}
					}
					series = [];

					for (i = 0, len = userList.length; i < len; i++) {
						series.push({ dataField: userList[i], displayText: userList[i] });
					}

					settings = {
							title: "Number of Transactions",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							padding: { left: 10, top: 5, right: 10, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
							colorScheme: 'scheme09',
							source: lineChartData,
							xAxis:
							{
								dataField: 'year_month',
								type: 'date',
								baseUnit: 'month',
								valuesOnTicks: true,
								tickMarks: {
									visible: true,
									interval: 1,
									color: '#BCBCBC'
								},
								unitInterval: 1,
								gridLines: {
									visible: false,
									interval: 3,
									color: '#BCBCBC'
								},
								labels: {
									//angle: -45,
									rotationPoint: 'topright',
									formatFunction: function (value) {
		                                return value.getMonth()+1 + '/' + value.getFullYear();
		                            }
									//ffset: { x: 0, y: -25 }
								}
							},
							valueAxis:
							{
								visible: true,
								title: { text: 'Daily Total Price<br>' },
								tickMarks: { color: '#BCBCBC' },
								minValue:0,
								gridLines: {
									visible: false,
									interval: 3,
									color: '#BCBCBC'
								}
							},
							colorScheme: 'scheme09',
							seriesGroups:
								[
								 {
									 type: 'column',
									 series: series
								 }
								 ]
					};


					$('#report-porformance_box-line-chart').jqxChart(settings);
					WRPAdminApp.pagescript.boxPrintGridAndChart(data[data.length-1].year_month);
				}
			});
		},
		boxPrintGridAndChart: function(year_month) {
			var data, fieData, i, len, i2, len2, obj, obj2, obj3, arr, arr2, tmpDataset, pieChartData, newObj, source, adapter, option, settings, year_date, total;

			data = WRPAdminApp.pagescript.empBoxData;

			pieChartData = [];
			obj = {};
			total = 0;
			/*
			for (i = 0, len = data.length; i < len; i++) {
				if (year_month === obj.year_month) {
					obj2 = {};
					obj2.user_id  = obj.user_id;
					obj2.box = obj.box;
					total = total + obj2.box;
					pieChartData.push(obj2);
				}
			}
			*/
			for (i = 0, len = data.length; i < len; i++) {
				obj = data[i];
				console.log(obj.year_month+"///"+year_month);
				if (year_month === obj.year_month) {
					obj2 = {};
					obj2.user_id = obj.user_id;
					obj2.box = obj.box;
					total = total + obj2.box;
					console.log(obj2);
					pieChartData.push(obj2);
				}
			}
			
			source = {
					datatype: "json",
					localdata: pieChartData,
					datafield: [{ name: "user_id" }, { name: "box" }]
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Ratio of Transactions",
					description: "",
					enableAnimations: true,
					showLegend: true,
					showBorderLine: true,
					legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
					padding: { left: 5, top: 5, right: 5, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
					source: adapter,
					colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'pie',
							 showLabels: true,
							 series:
								 [
								  { 
									  dataField: 'box',
									  displayText: 'user_id',
									  labelRadius: 50,
									  initialAngle: 15,
									  radius: 100,
									  centerOffset: 0,
									  formatFunction: function (value) {
										  if (isNaN(value))
											  return value;
										  return parseFloat(value);
									  }
								  }
								  ]
						 }
						 ]
			};

			$("#report-porformance_box-pie-chart").jqxChart(settings);
		},











		//emp acc
		getEmpPerformanceAcc: function() {
			var storeId, start_date, end_date, date;

			start_date = new Date($("#porformance_acc-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			end_date = new Date($("#porformance_acc-end-date").jqxDateTimeInput('getDate'));

			date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);

			//date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/report/getEmployeePerformanceData.jsp",
				data: {
					store_id: storeId,
					accessory: 1,
					start_date_month: start_date.getMonth()+1,
					start_date_year: start_date.getFullYear() 
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, lineChartData, pieChartData, userList, i, len, obj, i2, len2, obj2, newObj, source, series, settings;
					$("#report-jqx-porformance_acc-grid").jqxGrid("clear");
					data = result.data;
					WRPAdminApp.pagescript.empBoxData = result.data;
					if (!result.data) return;	        	

					for (i = 0, len = data.length; i < len; i++) {
						year_date = data[i].year_month.split("-");
						data[i].store_id = storeId;
						data[i].year = year_date[0];
						data[i].month = year_date[1];
					}
					$("#report-jqx-porformance_acc-grid").jqxGrid("addrow", null, data);

					lineChartData = [];

					//pieChartData = [];

					userList = [];

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];

						obj2 = undefined;

						for(i2 = 0, len2 = lineChartData.length; i2 < len2; i2++) {
							obj2 = lineChartData[i2];
							if (obj2.year_month === obj.year_month) {
								obj2[obj.user_id] = obj.accessory;
								if (userList.indexOf(obj.user_id) == -1) {
									userList.push(obj.user_id);
								}
								break;
							}

							obj2 = undefined;
						}

						if (obj2 === undefined) {
							obj2 = {};
							obj2.year_month = obj.year_month;
							obj2[obj.user_id] = obj.accessory;
							lineChartData.push(obj2);
							if (userList.indexOf(obj.user_id) == -1) {
								userList.push(obj.user_id);
							}
						}
					}

					len = lineChartData.length;
					
					if(len > 6) {
						WRPCommon.MsgBoxModule.alert({
							message: "range 6 Month."
						});
						return;
					}
					
					if (len > 6) start = len - 6;
					else		 start = 0;
					
					for (i = start; i < len; i++) {
						obj = lineChartData[i];
						for (i2 = 0, len2 = userList.length; i2 < len2; i2++) {
							if (obj[userList[i2]] === undefined) {
								obj[userList[i2]] = 0;
							}
						}
					}
					series = [];

					for (i = 0, len = userList.length; i < len; i++) {
						series.push({ dataField: userList[i], displayText: userList[i] });
					}

					settings = {
							title: "Number of Transactions",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							padding: { left: 10, top: 5, right: 10, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
							colorScheme: 'scheme09',
							source: lineChartData,
							xAxis:
							{
								dataField: 'year_month',
								type: 'date',
								baseUnit: 'month',
								valuesOnTicks: true,
								tickMarks: {
									visible: true,
									interval: 1,
									color: '#BCBCBC'
								},
								unitInterval: 1,
								gridLines: {
									visible: false,
									interval: 3,
									color: '#BCBCBC'
								},
								labels: {
									//angle: -45,
									rotationPoint: 'topright',
									formatFunction: function (value) {
		                                return value.getMonth()+1 + '/' + value.getFullYear();
		                            }
									//offset: { x: 0, y: -25 }
								}
							},
							valueAxis:
							{
								visible: true,
								title: { text: 'Daily Total Price<br>' },
								tickMarks: { color: '#BCBCBC' },
								minValue:0,
								gridLines: {
									visible: false,
									interval: 3,
									color: '#BCBCBC'
								}
							},
							colorScheme: 'scheme09',
							seriesGroups:
								[
								 {
									 type: 'column',
									 series: series
								 }
								 ]
					};


					$('#report-porformance_acc-line-chart').jqxChart(settings);
					WRPAdminApp.pagescript.accPrintGridAndChart(data[data.length-1].year_month);
				}
			});
		},
		accPrintGridAndChart: function(year_month) {
			var data, fieData, i, len, i2, len2, obj, obj2, obj3, arr, arr2, tmpDataset, pieChartData, newObj, source, adapter, option, settings, year_date, total;

			data = WRPAdminApp.pagescript.empBoxData;

			pieChartData = [];
			obj = {};

			total = 0;

			for (i = 0, len = data.length; i < len; i++) {
				obj = data[i];
				if (year_month === obj.year_month) {
					obj2 = {};
					obj2.user_id = obj.user_id;
					obj2.accessory = obj.accessory;
					total = total + obj2.accessory;
					pieChartData.push(obj2);
				}
			}

			source = {
					datatype: "json",
					localdata: pieChartData,
					datafield: [{ name: "user_id" }, { name: "accessory" }]
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Ratio of Transactions",
					description: "",
					enableAnimations: true,
					showLegend: true,
					showBorderLine: true,
					legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
					padding: { left: 5, top: 5, right: 5, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
					source: adapter,
					colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'pie',
							 showLabels: true,
							 series:
								 [
								  { 
									  dataField: 'accessory',
									  displayText: 'user_id',
									  labelRadius: 50,
									  initialAngle: 15,
									  radius: 100,
									  centerOffset: 0,
									  formatFunction: function (value) {
										  if (isNaN(value))
											  return value;
										  return parseFloat(value);
									  }
								  }
								  ]
						 }
						 ]
			};

			$("#report-porformance_acc-pie-chart").jqxChart(settings);
		},












		//emp pay
		getEmpPerformancePay: function() {
			var storeId, start_date, end_date, date;

			start_date = new Date($("#porformance_pay-start-date").jqxDateTimeInput('getDate'));//"11/01/2016";
			end_date = new Date($("#porformance_pay-end-date").jqxDateTimeInput('getDate'));

			date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);

			//date=new Date( end_date.getFullYear(), end_date.getMonth()+1, 0);
			try {
				storeId = document.getElementById("select-store").value;
				if (storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/report/getEmployeePerformanceData.jsp",
				data: {
					store_id: storeId,
					payment: 1,
					start_date_month: start_date.getMonth()+1,
					start_date_year: start_date.getFullYear() 
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, lineChartData, pieChartData, userList, i, len, obj, i2, len2, obj2, newObj, source, series, settings;
					$("#report-jqx-porformance_pay-grid").jqxGrid("clear");
					data = result.data;
					WRPAdminApp.pagescript.empBoxData = result.data;
					if (!result.data) return;
					lineChartData = [];

					for (i = 0, len = data.length; i < len; i++) {
						year_date = data[i].year_month.split("-");
						data[i].year = year_date[0];
						data[i].month = year_date[1];
						data[i].store_id = storeId;
					}
					$("#report-jqx-porformance_pay-grid").jqxGrid("addrow", null, data);

					//pieChartData = [];

					userList = [];

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];

						obj2 = undefined;

						for(i2 = 0, len2 = lineChartData.length; i2 < len2; i2++) {
							obj2 = lineChartData[i2];
							if (obj2.year_month === obj.year_month) {
								obj2[obj.user_id] = obj.box;
								if (userList.indexOf(obj.user_id) == -1) {
									userList.push(obj.user_id);
								}
								break;
							}

							obj2 = undefined;
						}

						if (obj2 === undefined) {
							obj2 = {};
							obj2.year_month = obj.year_month;
							obj2[obj.user_id] = obj.payment;
							lineChartData.push(obj2);
							if (userList.indexOf(obj.user_id) == -1) {
								userList.push(obj.user_id);
							}
						}
					}

					len = lineChartData.length;
					
					if(len > 6) {
						WRPCommon.MsgBoxModule.alert({
							message: "range 6 Month."
						});
						return;
					}
					
					if (len > 6) start = len - 6;
					else		 start = 0;

					for (i = start; i < len; i++) {
						obj = lineChartData[i];
						for (i2 = 0, len2 = userList.length; i2 < len2; i2++) {
							if (obj[userList[i2]] === undefined) {
								obj[userList[i2]] = 0;
							}
						}
					}
					series = [];

					for (i = 0, len = userList.length; i < len; i++) {
						series.push({ dataField: userList[i], displayText: userList[i] });
					}
					settings = {
							title: "Number of Transactions",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							padding: { left: 10, top: 5, right: 10, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
							colorScheme: 'scheme09',
							source: lineChartData,
							xAxis:
							{
								dataField: 'year_month',
								type: 'date',
								baseUnit: 'month',
								valuesOnTicks: true,
								tickMarks: {
									visible: true,
									interval: 1,
									color: '#BCBCBC'
								},
								unitInterval: 1,
								gridLines: {
									visible: false,
									interval: 3,
									color: '#BCBCBC'
								},
								labels: {
									//angle: -45,
									rotationPoint: 'topright',
									formatFunction: function (value) {
		                                return value.getMonth()+1 + '/' + value.getFullYear();
		                            }
									//offset: { x: 0, y: -25 }
								}
							},
							valueAxis:
							{
								visible: true,
								title: { text: 'Daily Total Price<br>' },
								tickMarks: { color: '#BCBCBC' },
								minValue:0,
								gridLines: {
									visible: false,
									interval: 3,
									color: '#BCBCBC'
								}
							},
							colorScheme: 'scheme09',
							seriesGroups:
								[
								 {
									 type: 'column',
									 series: series
								 }
								 ]
					};


					$('#report-porformance_pay-line-chart').jqxChart(settings);
					WRPAdminApp.pagescript.payPrintGridAndChart(data[data.length-1].year_month);
				}
			});
		},
		payPrintGridAndChart: function(year_month) {
			var data, fieData, i, len, i2, len2, obj, obj2, obj3, arr, arr2, tmpDataset, pieChartData, newObj, source, adapter, option, settings, year_date, total;

			data = WRPAdminApp.pagescript.empBoxData;

			pieChartData = [];
			obj = {};

			total = 0;

			for (i = 0, len = data.length; i < len; i++) {
				obj = data[i];
				if (year_month === obj.year_month) {
					obj2 = {};
					obj2.user_id = obj.user_id;
					obj2.payment = obj.payment;
					total = total + obj2.payment;
					pieChartData.push(obj2);
				}
			}
			source = {
					datatype: "json",
					localdata: pieChartData,
					datafield: [{ name: "user_id" }, { name: "payment" }]
			};

			adapter = new $.jqx.dataAdapter(source);

			settings = {
					title: "Ratio of Transactions",
					description: "",
					enableAnimations: true,
					showLegend: true,
					showBorderLine: true,
					legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
					padding: { left: 5, top: 5, right: 5, bottom: 5 },
					titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
					source: adapter,
					colorScheme: 'scheme09',
					seriesGroups:
						[
						 {
							 type: 'pie',
							 showLabels: true,
							 series:
								 [
								  { 
									  dataField: 'payment',
									  displayText: 'user_id',
									  labelRadius: 50,
									  initialAngle: 15,
									  radius: 100,
									  centerOffset: 0,
									  formatFunction: function (value) {
										  if (isNaN(value))
											  return value;
										  return parseFloat(value);
									  }
								  }
								  ]
						 }
						 ]
			};
			$("#report-porformance_pay-pie-chart").jqxChart(settings);
		},



		/* 공사 */    

		openCustomerPopup: function() { // arguments { [INPUT Customer Element](Required) }
			if (arguments.length < 1) {
				console.warn("no input element");
				return;
			}
			WRPAdminApp.pagescript._selectedCustomerElement = arguments[0];
			WRPAdminApp.pagescript._selectedCustomerSid = 0;
			$('#SearchCustomerContainer').jqxWindow('open');
			WRPAdminApp.pagescript.getCustomerList("");

		},
		openEmployeePopup: function() { // arguments { [INPUT Employee Element](Required) }
			if (arguments.length < 1) {
				console.warn("no input element");
				return;
			}
			WRPAdminApp.pagescript._selectedEmployeeElement = arguments[0];
			WRPAdminApp.pagescript._selectedEmployeeSid = 0;
			$('#SearchEmpContainer').jqxWindow('open');
			WRPAdminApp.pagescript.getEmployeeList("");
		},
		openItemPopup: function() { // arguments { [INPUT Employee Element](Required) }
			if (arguments.length < 1) {
				console.warn("no input element");
				return;
			}
			WRPAdminApp.pagescript._selectedItemElement = arguments[0];
			WRPAdminApp.pagescript._selectedItemSid = 0;
			$('#SearchItemContainer').jqxWindow('open');
			WRPAdminApp.pagescript.getItemList("");
		},
		getCustomerList: function() { // arguments { [keyword] }
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}


			$.ajax({
				url: "ajax/customer/getCustomerList.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var elem;
					var datarow = new Array();

					for (var i = 0; i < result.data.length; i++){
						var row = {};
						row["sid"] = result.data[i].sid;
						row["Id"] = result.data[i].customerId;
						row["Name"] = result.data[i].name;
						row["Address"] = result.data[i].address;
						row["Phone"] = result.data[i].tel;
						row["Company"] = result.data[i].company;
						row["JoinDate"] = result.data[i].joinDate;

						datarow[i] = row;
					}

					var dataAdapter = new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "sid", type: "number" },
						             { name: "Id", type: "string" },
						             { name: "Name", type: "string" },
						             { name: "Address", type: "string" },
						             { name: "Phone", type: "string" },
						             { name: "Company", type: "string" },
						             { name: "JoinDate", type: "date" },
						             ],
						             localdata: datarow
					});

					elem = $("#jqx-report-customer-grid");
					if (elem) {
						elem[0].parentNode.innerHTML = '<div id="jqx-report-customer-grid"></div>';
					}

					elem = $("#jqx-report-customer-grid");

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
									          { text: 'ID', datafield: 'Id', width: '15%' },
									          { text: 'Name', datafield: 'Name', width: '15%' },
									          { text: 'Address', datafield: 'Address', width: '25%' },
									          { text: 'Phone', datafield: 'Phone', width: '15%'},
									          { text: 'Company', datafield: 'Company', width: '15%' },
									          { text: 'Join Date', datafield: 'JoinDate', width: '15%',filtertype: "range", cellsformat: 'MM/dd/yyyy' },
									          ]
								});
						$("#jqx-report-customer-grid").on('rowclick', WRPAdminApp.pagescript.selectCustomer);
					}
				}
			});
		},
		getEmployeeList: function() { // arguments { [keyword] }
			var param;

			param = {};

			try {
				param.selectedStoreId = document.getElementById("select-store").value;
				if (param.selectedStoreId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			$.ajax({
				url: "ajax/user/getUserList.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var elem;
					var datarow = new Array();

					for (var i = 0; i < result.data.length; i++){
						var row = {};
						row["sid"] = result.data[i].sid;
						row["Id"] = result.data[i].userId;
						row["Name"] = result.data[i].userName;
						row["Email"] = result.data[i].email;
						row["Phone"] = result.data[i].tel;
						row["Address"] = result.data[i].address;
						row["JopPosition"] = result.data[i].jobPosition;
						row["Role"] = result.data[i].roleName;

						datarow[i] = row;
					}

					var dataAdapter = new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "sid", type: "number" },
						             { name: "Id", type: "string" },
						             { name: "Name", type: "string" },
						             { name: "Email", type: "string" },
						             { name: "Phone", type: "string" },
						             { name: "Address", type: "string" },
						             { name: "JopPosition", type: "string" },
						             { name: "Role", type: "string" },
						             ],
						             localdata: datarow
					});

					elem = $("#jqx-report-employee-grid");
					if (elem) {
						elem[0].parentNode.innerHTML = '<div id="jqx-report-employee-grid"></div>';
					}

					elem = $("#jqx-report-employee-grid");

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
									          { text: 'ID', datafield: 'Id', width: '15%' },
									          { text: 'Name', datafield: 'Name', width: '15%' },
									          { text: 'Email', datafield: 'Email', width: '15%'},
									          { text: 'Phone', datafield: 'Phone', width: '15%'},
									          { text: 'Address', datafield: 'Address', width: '20%' },
									          { text: 'Jop Position', datafield: 'JopPosition', width: '10%' },
									          { text: 'Role', datafield: 'Role', width: '10%' },
									          ]
								});
						$("#jqx-report-employee-grid").on('rowclick', WRPAdminApp.pagescript.selectEmployee);
					}

				}
			});
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
					var elem;
					var datarow = new Array();

					for (var i = 0; i < result.data.length; i++){
						var row = {};
						row["sid"] = result.data[i].sid;
						row["ItemCode"] = result.data[i].item_code;
						row["Description"] = result.data[i].description;
						row["Distributor"] = result.data[i].distributor;
						row["Qty"] = result.data[i].qty;
						row["ItemCost"] = result.data[i].item_cost;

						datarow[i] = row;
					}

					var dataAdapter = new $.jqx.dataAdapter({
						datatype: "json",
						datafields: [
						             { name: "sid", type: "number" },
						             { name: "ItemCode", type: "string" },
						             { name: "Description", type: "string" },
						             { name: "Distributor", type: "string" },
						             { name: "Qty", type: "string" },
						             { name: "ItemCost", type: "string" },
						             ],
						             localdata: datarow
					});

					elem = $("#jqx-report-item-grid");
					if (elem) {
						elem[0].parentNode.innerHTML = '<div id="jqx-report-item-grid"></div>';
					}

					elem = $("#jqx-report-item-grid");

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
									          { text: 'Item Code', datafield: 'ItemCode', width: '20%' },
									          { text: 'Description', datafield: 'Description', width: '20%' },
									          { text: 'Company / Carrier', datafield: 'Distributor', width: '20%'},
									          { text: 'Qty', datafield: 'Qty', width: '20%'},
									          { text: 'Item Cost', datafield: 'ItemCost', width: '20%', cellsalign: 'right', cellsformat: 'c2'},
									          ]
								});
						$("#jqx-report-item-grid").on('rowclick', WRPAdminApp.pagescript.selectItem);
					}
				}
			});
		},
		selectCustomer: function(event) {
			var str, rowdata;
			if (WRPAdminApp.pagescript._selectedCustomerElement === undefined) {
				return;
			}
			rowdata = event.args.row.bounddata;
			WRPAdminApp.pagescript._selectedCustomerSid = rowdata.sid;

			str = rowdata.Id;
			WRPAdminApp.pagescript._selectedCustomerElement.value = str;

			$('#SearchCustomerContainer').jqxWindow('close');
		},
		selectEmployee: function(event) {
			var str, rowdata;

			if (WRPAdminApp.pagescript._selectedEmployeeElement === undefined) {
				return;
			}
			rowdata = event.args.row.bounddata;
			WRPAdminApp.pagescript._selectedEmployeeSid = rowdata.sid;

			str = rowdata.Id

			WRPAdminApp.pagescript._selectedEmployeeElement.value = str;

			$('#SearchEmpContainer').jqxWindow('close');
		},
		selectItem: function(event) {
			var str, rowdata;

			if (WRPAdminApp.pagescript._selectedItemElement === undefined) {
				return;
			}

			rowdata = event.args.row.bounddata;
			WRPAdminApp.pagescript._selectedItemSid = rowdata.sid;

			str = rowdata.ItemCode;

			WRPAdminApp.pagescript._selectedItemElement.value = str;

			$('#SearchItemContainer').jqxWindow('close');
		},
		getActivationSummaryData: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			var selection = $("#report-act-summary-date").jqxDateTimeInput('getRange');
			if (selection.from != null) {
				param.startDate = $.jqx.dataFormat.formatdate(selection.from, 'MM/dd/yyyy');
				param.endDate = $.jqx.dataFormat.formatdate(selection.to, 'MM/dd/yyyy');
			}


			param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
			param.empSid = WRPAdminApp.pagescript._selectedEmployeeSid;

			$.ajax({
				url: "ajax/report/getActivationSummaryData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, refined, totalCount, source, adapter, option, settings, elem, prevElem;
					data = result.data;
					if (!data) return;

					refined = [
					           {type: "Add-A-Line", count: 0},
					           {type: "New Activation", count: 0},
					           {type: "ReActivation", count: 0},
					           {type: "Sold Out Right", count: 0},
					           {type: "Upgrade", count: 0}
					           ];

					totalCount = 0;

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						switch (obj.transaction_type) {
						case 0:
							refined[1].count = refined[1].count + obj.count;
							break;
						case 1:
							refined[2].count = refined[2].count + obj.count;
							break;
						case 2:
							refined[4].count = refined[4].count + obj.count;
							break;
						case 4:
							refined[1].count = refined[1].count + obj.count;
							break;
						case 5:
							refined[2].count = refined[2].count + obj.count;
							break;
						case 6:
							refined[4].count = refined[4].count + obj.count;
							break;
						case 12:
							refined[0].count = refined[0].count + obj.count;
							break;
						case 13:
							refined[0].count = refined[0].count + obj.count;
							break;
						case 14:
							refined[3].count = refined[3].count + obj.count;
							break;
						}

						totalCount = totalCount + obj.count;
					}

					for (i = 0, len = refined.length; i < len; i++) {
						obj = refined[i];
						obj.rate = (totalCount > 0)? ( ((obj.count / totalCount) * 100).toFixed(1) + "%" ) : "0%";
					}

					prevElem = document.getElementById("report-jqx-activation-summary-grid");
					if (prevElem) {
						elem = document.createElement("div");
						elem.id = "report-jqx-activation-summary-grid";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        		

					source = {
							localdata: refined,
							datafields: [
							             { name: "type", type: "string" },
							             { name: "count", type: "number" },
							             { name: "rate", type: "string" }
							             ],
							             datatype: "json"
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							width: "100%",
							height: "100%",
							theme: 'arctic',
							source: adapter,
							filterable: true,
							sortable: true,
							ready: function() {

							},
							autoshowfiltericon: true,
							columns: [
							          { text: "Type", datafield: "type", width: "70%" },
							          { text: "Act Count", datafield: "count", cellsalign: "center", width: "15%" },
							          { text: "% of Total", datafield: "rate", cellsalign: "center", width: "15%" }
							          ]
					};

					$(elem).jqxGrid(settings);
					$("#excel_activation_summary").click(function () {
						$("#report-jqx-activation-summary-grid").jqxGrid('exportdata', 'xls', 'jqx-activation-summary-list');
					});

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-activation-summary-pie-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-activation-summary-pie-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "type" }, { name: "rate" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Activation Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme03',
							seriesGroups:
								[
								 {
									 type: 'pie',
									 showLabels: true,
									 series:
										 [
										  { 
											  dataField: 'rate',
											  displayText: 'type',
											  labelRadius: 50,
											  initialAngle: 15,
											  radius: 100,
											  centerOffset: 0,
											  formatFunction: function (value) {
												  return value;
											  },
										  }
										  ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-activation-summary-bar-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-activation-summary-bar-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "type" }, { name: "count" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Activation Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme01',
							xAxis:
							{
								dataField: 'type',
								gridLines: {visible: false},
								tickMarks: {visible: true}
							},
							valueAxis:
							{
								minValue: 0,
								maxValue: 100,
								unitInterval: 10,
								title: {text: 'Activation Type'}
							},
							seriesGroups:
								[
								 {
									 type: 'column',
									 columnsGapPercent: 30,
									 seriesGapPercent: 10,
									 series: [
									          { dataField: 'count', displayText: 'Count'}
									          ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;
				}
			});
		},
		getActSummaryItemData: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			var selection = $("#report-act-summary-item-date").jqxDateTimeInput('getRange');
			if (selection.from != null) {
				param.startDate = $.jqx.dataFormat.formatdate(selection.from, 'MM/dd/yyyy');
				param.endDate = $.jqx.dataFormat.formatdate(selection.to, 'MM/dd/yyyy');
			}

			param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
			param.empSid = WRPAdminApp.pagescript._selectedEmployeeSid;
			param.itemSid = WRPAdminApp.pagescript._selectedItemSid;

			$.ajax({
				url: "ajax/report/getActSummaryItemData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, refined, source, adapter, option, settings, elem, prevElem;
					data = result.data;
					if (!data) return;

					refined = [
					           {type: "Add-A-Line", act_count: 0, rate: 0},
					           {type: "New Activation", act_count: 0, rate: 0},
					           {type: "ReActivation", act_count: 0, rate: 0},
					           {type: "Upgrade", act_count: 0, rate: 0}
					           ];

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						switch (obj.transaction_type) {
						case 0:
							refined[1].act_count = refined[1].act_count + obj.act_count;
							break;
						case 1:
							refined[2].act_count = refined[2].act_count + obj.act_count;
							break;
						case 2:
							refined[3].act_count = refined[3].act_count + obj.act_count;
							break;
						case 4:
							refined[1].act_count = refined[1].act_count + obj.act_count;
							break;
						case 5:
							refined[2].act_count = refined[2].act_count + obj.act_count;
							break;
						case 6:
							refined[3].act_count = refined[3].act_count + obj.act_count;
							break;
						case 12:
							refined[0].act_count = refined[0].act_count + obj.act_count;
							break;
						case 13:
							refined[0].act_count = refined[0].act_count + obj.act_count;
							break;
						}

						obj.rate = (result.total > 0)? ( ( (obj.act_count / result.total) * 100).toFixed(2) + "%" ) : "0%";            			
					}

					for (i = 0, len = refined.length; i < len; i++) {
						obj = refined[i];
						obj.rate = (result.total > 0)? ( ((obj.act_count / result.total) * 100).toFixed(2) + "%" ) : "0%";
					}

					prevElem = document.getElementById("report-jqx-activation-summary-item-grid");
					if (prevElem) {
						elem = document.createElement("div");
						elem.id = "report-jqx-activation-summary-item-grid";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        		

					source = {
							localdata: data,
							datafields: [
							             { name: "item_code", type: "string" },
							             { name: "description", type: "string" },
							             { name: "transaction", type: "string" },
							             { name: "act_count", type: "number" },
							             { name: "rate", type: "string" }
							             ],
							             datatype: "json"
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							width: "99%",
							height: "100%",
							theme: "arctic",
							source: adapter,
							filterable: true,
							sortable: true,
							ready: function() {

							},
							autoshowfiltericon: true,
							columns: [
							          { text: "Item Code", datafield: "item_code" },
							          { text: "Description", datafield: "description" },
							          { text: "Transaction", datafield: "transaction" },
							          { text: "Act Count", datafield: "act_count", cellsalign: "center", width: "15%" },
							          { text: "% of Total", datafield: "rate", cellsalign: "center", width: "15%" }
							          ]
					};

					$(elem).jqxGrid(settings);
					$("#excel_activation_summary_item").click(function () {
						$("#report-jqx-activation-summary-item-grid").jqxGrid('exportdata', 'xls', 'jqx-activation-summary-by-Item');
					});

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-activation-summary-item-pie-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-activation-summary-item-pie-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "type" }, { name: "rate" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Activation Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme03',
							seriesGroups:
								[
								 {
									 type: 'pie',
									 showLabels: true,
									 series:
										 [
										  { 
											  dataField: 'rate',
											  displayText: 'type',
											  labelRadius: 50,
											  initialAngle: 15,
											  radius: 100,
											  centerOffset: 0,
											  formatFunction: function (value) {
												  return value;
											  },
										  }
										  ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-activation-summary-item-bar-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-activation-summary-item-bar-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "type" }, { name: "act_count" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Activation Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme01',
							xAxis:
							{
								dataField: 'type',
								gridLines: {visible: false},
								tickMarks: {visible: true}
							},
							valueAxis:
							{
								minValue: 0,
								maxValue: 100,
								unitInterval: 10,
								title: {text: 'Activation Type'}
							},
							seriesGroups:
								[
								 {
									 type: 'column',
									 columnsGapPercent: 30,
									 seriesGapPercent: 10,
									 series: [
									          { dataField: 'act_count', displayText: 'Count'}
									          ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;
				}
			});
		},
		getCategorySummaryData: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			var selection = $("#report-category-summary-item-date").jqxDateTimeInput('getRange');
			if (selection.from != null) {
				param.startDate = $.jqx.dataFormat.formatdate(selection.from, 'MM/dd/yyyy');
				param.endDate = $.jqx.dataFormat.formatdate(selection.to, 'MM/dd/yyyy');
			}

			param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
			param.empSid = WRPAdminApp.pagescript._selectedEmployeeSid;

			$.ajax({
				url: "ajax/report/getCategorySummaryData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, etc, refined, totalQty, source, adapter, option, settings, elem, prevElem;
					data = result.data;
					if (!data) return;

					refined = [
					           ];

					totalQty = 0;

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						if (obj._category == 0) {
							etc = obj;
							continue;
						}

						elem = {};
						elem.category = obj.category;
						elem.qty = obj.qty;
						elem.price = obj.price;
						elem.tax_amount = obj.tax_amount;
						//elem.discount = obj.discount;
						elem.subtotal = obj.subtotal;
						refined.push(obj);
						elem = undefined;

						totalQty = totalQty + obj.qty;
					}

					if (etc) {
						elem = {};
						elem.category = etc.category;
						elem.qty = etc.qty;
						elem.price = etc.price;
						elem.tax_amount = etc.tax_amount;
						//elem.discount = etc.discount;
						elem.subtotal = etc.subtotal;
						refined.push(etc);
						elem = undefined;

						totalQty = totalQty + etc.qty;
					}

					for (i = 0, len = refined.length; i < len; i++) {
						obj = refined[i];
						obj.rate = (totalQty > 0)? ( ((obj.qty / totalQty) * 100).toFixed(1) + "%" ) : "0%";
					}

					prevElem = document.getElementById("report-jqx-category-summary-grid");
					if (prevElem) {
						elem = document.createElement("div");
						elem.id = "report-jqx-category-summary-grid";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        		

					source = {
							localdata: refined,
							datafields: [
							             { name: "category", type: "string" },
							             { name: "qty", type: "number" },
							             { name: "price", type: "number" },
							             { name: "tax_amount", type: "number" },
							             { name: "subtotal", type: "number" }
							             ],
							             datatype: "json"
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							width: "99%",
							height: "100%",
							theme: "arctic",
							source: adapter,
							filterable: true,
							sortable: true,
							ready: function() {

							},
							autoshowfiltericon: true,
							columns: [
							          { text: "Category", datafield: "category", width: "40%" },
							          { text: "Sold Qty.", datafield: "qty", cellsalign: "center", width: "15%" },
							          { text: "Total Price", datafield: "price", cellsalign: "right", width: "15%", cellsformat: "c2" },
							          { text: "Tax Amnt.", datafield: "tax_amount", cellsalign: "right", width: "15%", cellsformat: "c2" },
							          { text: "Subtotal", datafield: "subtotal", cellsalign: "right", width: "15%", cellsformat: "c2" }
							          ]
					};

					$(elem).jqxGrid(settings);
					$("#excel_category_summary").click(function () {
						$("#report-jqx-category-summary-grid").jqxGrid('exportdata', 'xls', 'jqx-category-summary-list');
					});

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-category-summary-pie-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-category-summary-pie-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "category" }, { name: "rate" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Category Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme03',
							seriesGroups:
								[
								 {
									 type: 'pie',
									 showLabels: true,
									 series:
										 [
										  { 
											  dataField: 'rate',
											  displayText: 'category',
											  labelRadius: 50,
											  initialAngle: 15,
											  radius: 100,
											  centerOffset: 0,
											  formatFunction: function (value) {
												  return value;
											  },
										  }
										  ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-category-summary-bar-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-category-summary-bar-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "category" }, { name: "qty" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Category Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme01',
							xAxis:
							{
								dataField: 'category',
								gridLines: {visible: false},
								tickMarks: {visible: true}
							},
							valueAxis:
							{
								minValue: 0,
								maxValue: 100,
								unitInterval: 10,
								title: {text: 'Category'}
							},
							seriesGroups:
								[
								 {
									 type: 'column',
									 columnsGapPercent: 30,
									 seriesGapPercent: 10,
									 series: [
									          { dataField: 'qty', displayText: 'Qty.'}
									          ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;
				}
			});
		},
		getSubCategorySummaryData: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			var selection = $("#report-subcategory-summary-item-date").jqxDateTimeInput('getRange');
			if (selection.from != null) {
				param.startDate = $.jqx.dataFormat.formatdate(selection.from, 'MM/dd/yyyy');
				param.endDate = $.jqx.dataFormat.formatdate(selection.to, 'MM/dd/yyyy');
			}

			param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
			param.empSid = WRPAdminApp.pagescript._selectedEmployeeSid;

			$.ajax({
				url: "ajax/report/getSubCategorySummaryData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, etc, refined, totalQty, source, adapter, option, settings, elem, prevElem;
					data = result.data;
					if (!data) return;

					refined = [
					           ];

					totalQty = 0;

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						if (obj._sub_category == 0) {
							etc = obj;
							continue;
						}

						elem = {};
						elem.sub_category = obj.sub_category;
						elem.qty = obj.qty;
						elem.price = obj.price;
						elem.tax_amount = obj.tax_amount;
						//elem.discount = obj.discount;
						elem.subtotal = obj.subtotal;
						refined.push(obj);
						elem = undefined;

						totalQty = totalQty + obj.qty;
					}

					if (etc) {
						elem = {};
						elem.sub_category = etc.sub_category;
						elem.qty = etc.qty;
						elem.price = etc.price;
						elem.tax_amount = etc.tax_amount;
						//elem.discount = etc.discount;
						elem.subtotal = etc.subtotal;
						refined.push(etc);
						elem = undefined;

						totalQty = totalQty + etc.qty;
					}

					for (i = 0, len = refined.length; i < len; i++) {
						obj = refined[i];
						obj.rate = (totalQty > 0)? ( ((obj.qty / totalQty) * 100).toFixed(1) + "%" ) : "0%";
					}

					prevElem = document.getElementById("report-jqx-subcategory-summary-grid");
					if (prevElem) {
						elem = document.createElement("div");
						elem.id = "report-jqx-subcategory-summary-grid";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        		

					source = {
							localdata: refined,
							datafields: [
							             { name: "sub_category", type: "string" },
							             { name: "qty", type: "number" },
							             { name: "price", type: "number" },
							             { name: "tax_amount", type: "number" },
							             { name: "subtotal", type: "number" }
							             ],
							             datatype: "json"
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							width: "99%",
							height: "100%",
							theme: "arctic",
							source: adapter,
							filterable: true,
							sortable: true,
							ready: function() {

							},
							autoshowfiltericon: true,
							columns: [
							          { text: "Sub Category", datafield: "sub_category" },
							          { text: "Sold Qty.", datafield: "qty", cellsalign: "center", width: "15%" },
							          { text: "Total Price", datafield: "price", cellsalign: "right", width: "15%", cellsformat: "c2" },
							          { text: "Tax Amnt.", datafield: "tax_amount", cellsalign: "right", width: "15%", cellsformat: "c2" },
							          { text: "Subtotal", datafield: "subtotal", cellsalign: "right", width: "15%", cellsformat: "c2" }
							          ]
					};

					$(elem).jqxGrid(settings);
					$("#excel_subcategory_summary").click(function () {
						$("#report-jqx-subcategory-summary-grid").jqxGrid('exportdata', 'xls', 'jqx-subcategory-summary-list');
					});

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-subcategory-summary-pie-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-subcategory-summary-pie-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "category" }, { name: "rate" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Sub Category Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme03',
							seriesGroups:
								[
								 {
									 type: 'pie',
									 showLabels: true,
									 series:
										 [
										  { 
											  dataField: 'rate',
											  displayText: 'sub_category',
											  labelRadius: 50,
											  initialAngle: 15,
											  radius: 100,
											  centerOffset: 0,
											  formatFunction: function (value) {
												  return value;
											  },
										  }
										  ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-subcategory-summary-bar-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-subcategory-summary-bar-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: refined,
							datafield: [{ name: "sub_category" }, { name: "qty" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Sub Category Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme01',
							xAxis:
							{
								dataField: 'sub_category',
								gridLines: {visible: false},
								tickMarks: {visible: true}
							},
							valueAxis:
							{
								minValue: 0,
								maxValue: 100,
								unitInterval: 10,
								title: {text: 'Sub Category'}
							},
							seriesGroups:
								[
								 {
									 type: 'column',
									 columnsGapPercent: 30,
									 seriesGapPercent: 10,
									 series: [
									          { dataField: 'qty', displayText: 'Qty.'}
									          ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;
				}
			});
		},
		getInStockSerialNoData: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			var selection = $("#report-in-stock-serial-no-date").jqxDateTimeInput('getRange');
			if (selection.from != null) {
				param.startDate = $.jqx.dataFormat.formatdate(selection.from, 'MM/dd/yyyy');
				param.endDate = $.jqx.dataFormat.formatdate(selection.to, 'MM/dd/yyyy');
			}

			$.ajax({
				url: "ajax/report/getInStockSerialNumberData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, etc, refined, totalQty, source, adapter, option, settings, elem, prevElem;
					data = result.data;
					if (!data) return;

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						if (obj.po_recv_date !== undefined) {
							obj.recv_date = obj.po_recv_date;
							obj.po_recv_date = undefined;
						} else if (obj.trans_recv_date !== undefined) {
							obj.recv_date = obj.trans_recv_date;
							obj.trans_recv_date = undefined;
						}

						if (obj.vendor_name === undefined) {
							if (obj.from_store_id !== undefined) {
								obj.vendor_name = obj.from_store_id;
								obj.from_store_id = undefined;
							}
						}

						if (obj.po_id === undefined) {
							if (obj.trans_id !== undefined) {
								obj.po_id = obj.trans_id;
								obj.trans_id = undefined;
							}
						}
					}

					prevElem = document.getElementById("report-jqx-in-stock-serial-no-grid");
					if (prevElem) {
						elem = document.createElement("div");
						elem.id = "report-jqx-in-stock-serial-no-grid";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        		

					source = {
							localdata: data,
							datafields: [
							             { name: "item_code", type: "string" },
							             { name: "description", type: "string" },
							             { name: "serial_no", type: "string" },
							             { name: "recv_date", type: "string" },
							             { name: "user_name", type: "string" },
							             { name: "item_cost", type: "number" },
							             { name: "po_id", type: "string" },
							             { name: "vendor_name", type: "string" }
							             ],
							             datatype: "json"
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							width: "99%",
							height: "100%",
							theme: "arctic",
							source: adapter,
							filterable: true,
							sortable: true,
							ready: function() {

							},
							autoshowfiltericon: true,
							columns: [
							          { text: "Item Code", datafield: "item_code" },  
							          { text: "Description", datafield: "description" },   
							          { text: "Serial No.", datafield: "serial_no" },     
							          { text: "Recv Date", datafield: "recv_date" },      
							          { text: "Recv User", datafield: "user_name" },   
							          { text: "Cost", datafield: "item_cost", cellsalign: "right", cellsformat: "c2" },    
							          { text: "PO ID", datafield: "po_id" },     
							          { text: "Vendor", datafield: "vendor_name" }  
							          ]
					};

					$(elem).jqxGrid(settings);
					$("#excel-in-stock-serial-no").click(function () {
						$("#report-jqx-in-stock-serial-no-grid").jqxGrid('exportdata', 'xls', 'jqx-in-stock-serial-no');
					});

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;
				}
			});
		},
		getEmpInvoiceSummaryListData: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			var selection = $("#report-sales-invoice-report-date").jqxDateTimeInput('getRange');
			if (selection.from != null) {
				param.startDate = $.jqx.dataFormat.formatdate(selection.from, 'MM/dd/yyyy');
				param.endDate = $.jqx.dataFormat.formatdate(selection.to, 'MM/dd/yyyy');
			}

			param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
			param.empSid = WRPAdminApp.pagescript._selectedEmployeeSid;

			$.ajax({
				url: "ajax/report/getEmpInvoiceSummaryListData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, etc, refined, total, source, adapter, option, settings, elem, prevElem, pieChartData, barMinValue, barMaxValue;
					data = result.data;
					if (!data) return;

					pieChartData = [
					                { name: "Cash", amount: 0 },
					                { name: "Credit", amount: 0 },
					                { name: "Debit", amount: 0 },
					                { name: "Check", amount: 0 }    
					                ];

					lineChartData = [];

					totalQty = 0;

					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						pieChartData[0].amount = pieChartData[0].amount + obj.cash_pay_amount;
						pieChartData[1].amount = pieChartData[1].amount + obj.credit_pay_amount;
						pieChartData[2].amount = pieChartData[2].amount + obj.debit_pay_amount;
						pieChartData[3].amount = pieChartData[3].amount + obj.check_pay_amount;

						if (i == 0) {
							elem = {};
							elem.date = obj.date;
							elem.cash = obj.cash_pay_amount;
							elem.credit = obj.credit_pay_amount;
							elem.debit = obj.debit_pay_amount;
							elem.check = obj.check_pay_amount;
							lineChartData.push(elem);
						} else {
							if (elem.date === obj.date) {
								elem.cash = elem.cash + obj.cash_pay_amount;
								elem.credit = elem.credit + obj.credit_pay_amount;
								elem.debit = elem.debit + obj.debit_pay_amount;
								elem.check = elem.check + obj.check_pay_amount;
							} else {
								if (barMinValue === undefined) {
									barMinValue = elem.cash;
								}

								if (barMinValue > elem.cash) barMinValue = elem.cash;
								if (barMinValue > elem.credit) barMinValue = elem.credit;
								if (barMinValue > elem.debit) barMinValue = elem.debit;
								if (barMinValue > elem.check) barMinValue = elem.check;

								if (barMaxValue === undefined) {
									barMaxValue = elem.cash;
								}

								if (barMaxValue < elem.cash) barMaxValue = elem.cash;
								if (barMaxValue < elem.cash) barMaxValue = elem.credit;
								if (barMaxValue < elem.cash) barMaxValue = elem.debit;
								if (barMaxValue < elem.cash) barMaxValue = elem.check;

								elem = {};
								elem.date = obj.date;
								elem.cash = obj.cash_pay_amount;
								elem.credit = obj.credit_pay_amount;
								elem.debit = obj.debit_pay_amount;
								elem.check = obj.check_pay_amount;
								lineChartData.push(elem);
							}
						}
					}

					total = pieChartData[0].amount + pieChartData[1].amount + pieChartData[2].amount + pieChartData[3].amount;

					for (i = 0, len = pieChartData.length; i < len; i++) {
						obj = pieChartData[i];
						obj.rate = (total > 0)? ( ((obj.amount / total) * 100).toFixed(1) + "%" ) : "0%";
					}

					prevElem = document.getElementById("report-jqx-sales-invoice-report-grid");
					if (prevElem) {
						elem = document.createElement("div");
						elem.id = "report-jqx-sales-invoice-report-grid";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        		

					source = {
							localdata: data,
							datafields: [
							             { name: "emp_name", type: "string" },
							             { name: "cust_name", type: "string" },
							             { name: "invoice_no", type: "number" },
							             { name: "date", type: "date" },
							             { name: "cash_pay_amount", type: "number" },
							             { name: "credit_pay_amount", type: "number" },
							             { name: "debit_pay_amount", type: "number" },
							             { name: "check_pay_amount", type: "number" }
							             ],
							             datatype: "json"
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							width: "99%",
							height: "100%",
							theme: "arctic",
							source: adapter,
							filterable: true,
							sortable: true,
							ready: function() {

							},
							autoshowfiltericon: true,
							columns: [
							          { text: "Emp", datafield: "emp_name", width: "20%" },
							          { text: "Customer", datafield: "cust_name", width: "20%" },
							          { text: "Invoice No.", datafield: "invoice_no", width: "10%" },
							          { text: "Invoice Date", datafield: "date", cellsformat: 'MM/dd/yyyy', width: "10%" },
							          { text: "Cash Pay", datafield: "cash_pay_amount", cellsalign: "right", width: "10%", cellsformat: "c2" },
							          { text: "Credit Pay", datafield: "credit_pay_amount", cellsalign: "right", width: "10%", cellsformat: "c2" },
							          { text: "Debit Pay", datafield: "debit_pay_amount", cellsalign: "right", width: "10%", cellsformat: "c2" },
							          { text: "Check Pay", datafield: "check_pay_amount", cellsalign: "right", width: "10%", cellsformat: "c2" }
							          ]
					};

					$(elem).jqxGrid(settings);
					$("#excel-report-sales-invoice").click(function () {
						$("#report-jqx-sales-invoice-report-grid").jqxGrid('exportdata', 'xls', 'jqx-sales-invoice-report');
					});

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-sales-invoice-report-pie-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-sales-invoice-report-pie-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: pieChartData,
							datafield: [{ name: "name" }, { name: "rate" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Sales Invoice Chart",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme03',
							seriesGroups:
								[
								 {
									 type: 'pie',
									 showLabels: true,
									 series:
										 [
										  { 
											  dataField: 'rate',
											  displayText: 'name',
											  labelRadius: 50,
											  initialAngle: 15,
											  radius: 100,
											  centerOffset: 0,
											  formatFunction: function (value) {
												  return value;
											  },
										  }
										  ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;

					prevElem = document.getElementById("report-jqx-sales-invoice-report-bar-chart");
					if (prevElem) {
						elem = document.createElement("div");
						elem.className = "grid-6";
						elem.id = "report-jqx-sales-invoice-report-bar-chart";
						elem.style.height = "calc(99%)";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        	

					source = {
							datatype: "json",
							localdata: lineChartData,
							datafield: [{ name: "date" }, { name: "cash" }, { name: "credit" }, { name: "debit" }, { name: "check" }]
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							title: "Sub Category Summary",
							theme: "arctic",
							description: "",
							enableAnimations: true,
							showLegend: true,
							showBorderLine: true,
							legendLayout: { left: 520, top: 30, width: 100, height: 200, flow: 'vertical' },
							padding: { left: 5, top: 5, right: 5, bottom: 5 },
							titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
							source: adapter,
							colorScheme: 'scheme01',
							xAxis:
							{
								dataField: 'date',
								formatFunction: function (value) {
									return (value.getMonth() + 1) + "/" + (value.getDate()) + "/" + (value.getFullYear());
								},
								type: 'date',
								baseUnit: 'month',
								valuesOnTicks: true,
								minValue: lineChartData[0].date,
								maxValue: lineChartData[lineChartData.length -1].date,
								tickMarks: {
									visible: true,
									interval: 1,
									color: '#BCBCBC'
								},
								unitInterval: 1,
								gridLines: {
									visible: true,
									interval: 3,
									color: '#BCBCBC'
								},
								labels: {
									//angle: -45,
									rotationPoint: 'topright',
									formatFunction: function (value) {
		                                return value.getMonth()+1 + '/' + value.getFullYear();
		                            }
									//offset: { x: 0, y: -25 }
								}
							},
							valueAxis:
							{
								minValue: parseInt((barMinValue - (barMinValue * 0.1)).toFixed(0)),
								maxValue: parseInt((barMaxValue + (barMaxValue * 0.1)).toFixed(0)),
								unitInterval: (barMaxValue - barMinValue) * 0.1,
								title: {text: 'Pay Amount'},
								formatFunction: function (value) {
									return value.toFixed(2);
								}
							},
							seriesGroups:
								[
								 {
									 type: 'line',
									 columnsGapPercent: 30,
									 seriesGapPercent: 10,
									 series: [
									          { dataField: 'cash', displayText: 'Cash' },
									          { dataField: 'credit', displayText: 'Credit' },
									          { dataField: 'debit', displayText: 'Debit' },
									          { dataField: 'check', displayText: 'Check' }
									          ]
								 }
								 ]
					};

					$(elem).jqxChart(settings);

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;
				}
			});
		},

		getDetailedSalesByCategoryData: function() {
			var param;

			param = {};

			try {
				param.storeId = document.getElementById("select-store").value;
				if (param.storeId.length == 0) return;
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				param.categorySid = $("#report-sales-detail-category-category").val();
			} catch (e) {
				console.warn(e);
				return;
			}

			try {
				param.subCategorySid = $("#report-sales-detail-category-category-sub").val();
			} catch (e) {
				console.warn(e);
				return;
			}

			var selection = $("#report-sales-detail-category-date").jqxDateTimeInput('getRange');
			if (selection.from != null) {
				param.startDate = $.jqx.dataFormat.formatdate(selection.from, 'MM/dd/yyyy');
				param.endDate = $.jqx.dataFormat.formatdate(selection.to, 'MM/dd/yyyy');
			}

			param.customerSid = WRPAdminApp.pagescript._selectedCustomerSid;
			param.empSid = WRPAdminApp.pagescript._selectedEmployeeSid;

			$.ajax({
				url: "ajax/report/getDetailedSalesByCategoryData.jsp",
				data: param,
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, etc, refined, totalQty, source, adapter, option, settings, elem, prevElem;
					data = result.data;
					if (!data) return;


					prevElem = document.getElementById("report-jqx-sales-detail-category-grid");
					if (prevElem) {
						elem = document.createElement("div");
						elem.id = "report-jqx-sales-detail-category-grid";
						prevElem.parentNode.replaceChild(elem, prevElem);
					}        		

					source = {
							localdata: data,
							datafields: [
							             { name: "item_code", type: "string" },
							             { name: "description", type: "string" },
							             { name: "serial_no", type: "string" },
							             { name: "emp_name", type: "string" },
							             { name: "category", type: "string" },
							             { name: "sub_category", type: "string" },
							             { name: "qty", type: "number" },
							             { name: "item_cost", type: "number" },
							             { name: "amount", type: "number" },
							             { name: "tax_amnt", type: "number" },
							             { name: "subtotal", type: "number" }
							             ],
							             datatype: "json"
					};

					adapter = new $.jqx.dataAdapter(source);

					settings = {
							width: "99%",
							height: "100%",
							theme: "arctic",
							source: adapter,
							filterable: true,
							sortable: true,
							ready: function() {

							},
							autoshowfiltericon: true,
							columns: [
							          { text: "Item Code", datafield: "item_code" },  
							          { text: "Description", datafield: "description" },   
							          { text: "Serial No,", datafield: "serial_no" }, 
							          { text: "Emp. Name", datafield: "emp_name" }, 
							          { text: "Category", datafield: "category" },     
							          { text: "Qty", datafield: "qty" },      
							          { text: "Cost", datafield: "item_cost", cellsalign: "right", width: "10%", cellsformat: "c2" },    
							          { text: "Price", datafield: "amount", cellsalign: "right", width: "10%", cellsformat: "c2" },    
							          { text: "Tax Amnt", datafield: "tax_amnt", cellsalign: "right", width: "10%", cellsformat: "c2" },    
							          { text: "Subtotal", datafield: "subtotal", cellsalign: "right", width: "10%", cellsformat: "c2" }
							          ]
					};

					$(elem).jqxGrid(settings);
					$("#excel-sales-detail-category").click(function () {
						$("#report-jqx-sales-detail-category-grid").jqxGrid('exportdata', 'xls', 'jqx-report-sales-detail-category');
					});

					elem = undefined;
					prevElem = undefined;
					source = undefined;
					adapter = undefined;
					settings = undefined;
				}
			});
		}
};