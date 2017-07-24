
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
	_storeArchievementData: undefined,
    init: function() {
    	WRPAdminApp.pagescript.getEmplActRankInStore();
    	WRPAdminApp.pagescript.getTodayActivationsInStore();
    	WRPAdminApp.pagescript.getMonthActivationsInStore();
    	WRPAdminApp.pagescript.getMonthlySales();
    	WRPAdminApp.pagescript.getGoalOftheMonth();
    
    },

    getEmplActRankInStore: function(){
    	var storeId, date;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        date = WRPCommon.TimeModule.getTime();
        $.ajax({
			url: "ajax/dashboard/getStaffActRankInStore.jsp",
			data: {
                store_id: storeId,
				year: date.getFullYear(),
				month: (date.getMonth() + 1),
				date: date.getDate()
            },
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, staffActRank, userId, count, elem, elem2;
				data = result.data;
				if (!data) return;
				
				var datarow = new Array();
				count = 0;
				
				for (var i = 0; i < result.data.length; i++) {
					var row = {};
					row["Employee"] = data[i].employee;
					row["Population"] = data[i].box_count;
					datarow[i] = row;
				}
				
				var source = {
	        			datatype: "json",
	        			localdata: datarow,
	        			datafield: [{ name: "Employee" }, { name: "Population" }]
	        	};
				
				var dataAdapter = new $.jqx.dataAdapter(source);

				var settings01 = {
	                title: "Employee Ranking",
	                description: "Box sales ranking",
	                showLegend: false,
	                enableAnimations: true,
	                padding: { left: 5, top: 5, right: 25, bottom: 5 },
	                titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
					borderLineWidth: 0,
	                source: dataAdapter,
	                xAxis:
	                {
						title: {
	                    	text: '<br>'
	                    },
	                    type: 'basic',
	                    formatFunction: function (value) {
	                            return value;
	                    },
	                    dataField: 'Employee',
	                    gridLines: { visible: false },
	                    flip: false,
						labels:
	                    {
	                        angle: 90,
	                        horizontalAlignment: 'right',
	                        verticalAlignment: 'center',
	                        rotationPoint: 'right',
	                        offset: { x: 0, y: 0 }
	                    }
	                },
	                valueAxis:
	                {
						title: {
	                    	text: 'Box Sales<br><br>'
	                    },
	                    gridLines: { visible: false },
	                    flip: true,
	                    labels: {
	                        visible: true,
	                        /*formatFunction: function (value) {
	                            return parseInt(value / 1000000);
	                        }*/
	                    }
	                },
	                colorScheme: 'scheme02',
	                seriesGroups:
	                    [
	                        {
	                            type: 'column',
	                            orientation: 'horizontal',
	                            columnsGapPercent: 50,
	                            mouseover: function (event) {
	                                setTimeout(function () {
	                                    $('.jqx-chart-tooltip-text').parent().parent().css('z-index', 12345);
	                                }, 1000);
	                            },
	                            series: [
	                                    { dataField: 'Population', displayText: 'Box Sales'}
	                                ]
	                        }
	                    ],
	            };
	            
	            elem = $("#ct01");
	            if(elem){
	            	elem.jqxChart(settings01);
	            }
	            
			}
		});
    },
    getTodayActivationsInStore: function(){
    	var storeId, date;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        date = WRPCommon.TimeModule.getTime();
        
    	$.ajax({
			url: "ajax/dashboard/getTodayTransactionCount.jsp",
			data: {
				store_id: storeId,
				year: date.getFullYear(),
				month: (date.getMonth() + 1),
				date: date.getDate()
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, elem;
				data = result.data;
				if (!data) return;
				
				var datarow = new Array();
				
				var name = new Array('Total','NewAct','ReAct','Upgrade','Port In','S0R','Acc','Payment','Total');
				var count = new Array(data.today_total,data.newact_count, data.react_count, data.upgrade_count,data.port_in_count,data.sor_count,data.accessory_count,data.payment_count);
				
				for(i = 0; i < 8; i++){
					var row = {};
					row["Sales"] = name[i];
					row["Count"] = count[i];
					
					datarow[i] = row;
				}
				
				var source = {
	        			datatype: "json",
	        			localdata: datarow,
	        			datafield: [{ name: "Sales" }, { name: "Count" }]
	        		};
				
				var dataAdapter = new $.jqx.dataAdapter(source);
				
				var settings02 = {
		                title: "Today's Activations",
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
		                    dataField: 'Sales',
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
		                        angle: 55,
		                        horizontalAlignment: 'left',
		                        verticalAlignment: 'center',
		                        rotationPoint: 'right',
		                        offset: { x: 10, y: 15 }
		                    }
		                },
		                valueAxis:
		                {
		                    unitInterval: 10,
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
		                            mouseover: function (event) {
		                                setTimeout(function () {
		                                    $('.jqx-chart-tooltip-text').parent().parent().css('z-index', 12345);
		                                }, 1000);
		                            },
		                            series: [
		                                    { dataField: 'Count', displayText: 'Count' }
		                            ]
		                        }
		                    ]
		            };
				
				elem = $("#ct02");
				if(elem){
					elem.jqxChart(settings02);
				}
			}
    	});
	},
    
    getMonthActivationsInStore: function(){
    	var storeId, date;
        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        date = WRPCommon.TimeModule.getTime();
    	$.ajax({
			url: "ajax/dashboard/getTransactionCountOfMonth.jsp",
			data: {
				store_id: storeId,
				year: date.getFullYear(),
				month: (date.getMonth() + 1),
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, elem;
				data = result.data;
				if (!data) return;
				
				var datarow = new Array();
				
				var name = new Array('Total','NewAct','ReAct','Upgrade','Port In','S0R','Acc','Payment');
				var count = new Array(data.today_total,data.newact_count, data.react_count, data.upgrade_count,data.port_in_count,data.sor_count,data.accessory_count,data.payment_count);
				
				for(i = 0; i < 8; i++){
					var row = {};
					row["Sales"] = name[i];
					row["Count"] = count[i];
					
					datarow[i] = row;
				}
				
				var r = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
				
				var source = {
	        			datatype: "json",
	        			localdata: datarow,
	        			datafield: [{ name: "Sales" }, { name: "Count" }]
	        		};
				
				var dataAdapter = new $.jqx.dataAdapter(source);
				
				var settings03 = {
		                title: "Activations of the Month"+" ("+ r[new Date().getMonth()]+")",
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
		                    dataField: 'Sales',
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
		                        angle: 55,
		                        horizontalAlignment: 'left',
		                        verticalAlignment: 'center',
		                        rotationPoint: 'right',
		                        offset: { x: 10, y: 15 }
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
		                            mouseover: function (event) {
		                                setTimeout(function () {
		                                    $('.jqx-chart-tooltip-text').parent().parent().css('z-index', 12345);
		                                }, 1000);
		                            },
		                            series: [
		                                    { dataField: 'Count', displayText: 'Count' }
		                            ]
		                        }
		                    ]
		            };
				
				elem = $("#ct03");
				if(elem){
					elem.jqxChart(settings03);
				}
			}
    	});
	},
	
	getMonthlySales: function(){
		var param={};
        try {
            param.storeId = document.getElementById("select-store").value;
            if (param.storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        param.nowMonth = WRPCommon.TimeModule.getTime().getMonth() + 1;
        param.nowYear = WRPCommon.TimeModule.getTime().getFullYear();
        $.ajax({
			url: "ajax/dashboard/getMonthlySales.jsp",
			data: param,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, i, elem, month;
				data = result.data;
				if (!data) return;
				
				var datarow = new Array();
				var date = new Date();
				
				
				for(i = 0; i < data.length; i++){
					var row = {};
					month = data[i].year_month.split("-");
					if(month[1]=='01') row["Month"] = 'Jan';
					else if(month[1]=='02') row["Month"] = 'Feb';
					else if(month[1]=='03') row["Month"] = 'Mar';
					else if(month[1]=='04') row["Month"] = 'Apr';
					else if(month[1]=='05') row["Month"] = 'May';
					else if(month[1]=='06') row["Month"] = 'Jun';
					else if(month[1]=='07') row["Month"] = 'Jul';
					else if(month[1]=='08') row["Month"] = 'Aug';
					else if(month[1]=='09') row["Month"] = 'Sep';
					else if(month[1]=='10') row["Month"] = 'Oct';
					else if(month[1]=='11') row["Month"] = 'Nov';
					else if(month[1]=='12') row["Month"] = 'Dec';
					
					row["NewActivation"] = data[i].newact_count;
					row["Reactivation"] = data[i].react_count;
					row["Upgrade"] = data[i].upgrade_count;
					row["PortIn"] = data[i].port_in_count;
					row["Payment"] = data[i].payment_count;
					row["Accessory"] = data[i].accessory_count;

					datarow[i] = row;
				}
				
				var source = {
	        			datatype: "json",
	        			localdata: datarow,
	        			datafield: [
	        				{ name: "Month" }, 
	        				{ name: "NewActivation" }, 
	        				{ name: "Reactivation" }, 
	        				{ name: "Upgrade" }, 
	        				{ name: "PortIn" }, 
	        				{ name: "Payment" },
	        				{ name: "Accessory"}
	        			]
	        		};
				
				var dataAdapter = new $.jqx.dataAdapter(source);
				
				var settings04 = {
		                title: "Monthly Sales Trend",
		                description: "The number of Activations",
		                enableAnimations: true,
		                showLegend: true,
		                padding: { left: 5, top: 5, right: 5, bottom: 15 },
		                titlePadding: { left: 0, top: 0, right: 0, bottom: 5 },
						borderLineWidth: 0,
		                source: dataAdapter,
		                colorScheme: 'scheme09',
		                xAxis:
		                {
		                    dataField: 'Month',
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
		                        angle: 55,
		                        horizontalAlignment: 'left',
		                        verticalAlignment: 'center',
		                        rotationPoint: 'right',
		                        offset: { x: 10, y: 15 }
		                    }
		                },
		                valueAxis:
		                {
		                    minValue: 0.1,
		                    visible: true,
		                    title: { text: '<br>' },
		                    gridLines: { visible: false }
		                },
		                seriesGroups:
		                    [
		                        {
		                            type: 'stackedcolumn',
		                            //columnsGapPercent: 50,
		                            seriesGapPercent: 5,
		                            mouseover: function (event) {
		                                setTimeout(function () {
		                                    $('.jqx-chart-tooltip-text').parent().parent().css('z-index', 12345);
		                                }, 1000);
		                            },
		                            series: [
		                                    { dataField: 'NewActivation', displayText: 'New Activation' },
		                                    { dataField: 'Reactivation', displayText: 'Reactivation' },
		                                    { dataField: 'Upgrade', displayText: 'Upgrade' },
		                                    { dataField: 'PortIn', displayText: 'PortIn' }
		                            ]
		                        },
		                        {
		                            type: 'stackedcolumn',
		                            columnsGapPercent: 50,
		                            seriesGapPercent: 5,
		                            mouseover: function (event) {
		                                setTimeout(function () {
		                                    $('.jqx-chart-tooltip-text').parent().parent().css('z-index', 12345);
		                                }, 1000);
		                            },
		                            series: [
		                                    { dataField: 'Accessory', displayText: 'Accessory' }
		                            ]
		                        },
								{
		                            type: 'stackedcolumn',
		                            columnsGapPercent: 50,
		                            seriesGapPercent: 5,
		                            mouseover: function (event) {
		                                setTimeout(function () {
		                                    $('.jqx-chart-tooltip-text').parent().parent().css('z-index', 12345);
		                                }, 1000);
		                            },
		                            series: [
		                                    { dataField: 'Payment', displayText: 'Payment' }
		                            ]
		                        },
		                    ]
		            };
				
				elem = $("#ct04");
				if(elem){
					elem.jqxChart(settings04);
				}
			}
    	});
	},
	
	getGoalOftheMonth: function(){
		var date = WRPCommon.TimeModule.getTime();
		var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
		$.ajax({
			url: "ajax/dashboard/getStoreArchievementData.jsp",
			data: {
				store_id: storeId,
				year: date.getFullYear(),
				month: (date.getMonth() + 1),
			},
			method: "POST",
			dataType: "json",
			success: function(result) {
				var elem;
				var data=result.data;
				
				if(!data) return;
				
				if(!data.boxSalesGoal || !data.accSalesGoal || !data.moreThan50MRCNewGoal) return;
				
				WRPAdminApp.pagescript._storeArchievementData = data;
				
				var date = WRPCommon.TimeModule.getTime();
				var day=date.getDate();
	            // setup the chart

				elem= $("#ct05");
				if(elem){
					elem.jqxBarGauge({
		                width: '49%',
		                height: '100%',
		                colorScheme: 'scheme09',
						title: {
		                    text: 'Goal of the Month',
		                    font: {
		                        size: 40
		                    },
		                    verticalAlignment: 'top',
		                    margin: 0,
		                    subtitle: {
		                        text: 'Box Sales Goal & Accessory Goal & $50+ MRC % of New',
		                        font: {
		                            size: 20
		                        }
		                    }
		                },
		                labels: {	                    
		                    formatFunction: function (value, index) {
		                    	try {
		                    		switch (index) {
		                    		case 0:
		                    			return WRPAdminApp.pagescript._storeArchievementData.boxSales.toFixed(0);
		                    			break;
		                    		case 1:
		                    			return WRPAdminApp.pagescript._storeArchievementData.accSales.toFixed(0);
		                    			break;
		                    		case 2:
		                    			return WRPAdminApp.pagescript._storeArchievementData.moreThan50MRCNew.toFixed(0);
		                    			break;
		                    		case 3:
		                    			return (value / 3.225).toFixed(0);
		                    			break;
		                    		default:
		                    			return value;
		                    		}
		                    	} catch (e) {
		                    		return value;
		                    	}
		                    }
		                },
						tooltip: {
		                    visible: true,
		                    formatFunction: function (value, index)
		                    {
								if (index == 0) return "Box Sales Goal: " + WRPAdminApp.pagescript._storeArchievementData.boxSales;
								else if (index == 1) return "Accessory Goal: " + WRPAdminApp.pagescript._storeArchievementData.accSales;
								else if (index == 2) return "$50+ MRC % of New: " + WRPAdminApp.pagescript._storeArchievementData.moreThan50MRCNew;
								else if (index == 3) return "Day: " + day;
		                    }
		                },
		                values: [(data.boxSales/data.boxSalesGoal)*100, (data.accSales/data.accSalesGoal)*100, (data.moreThan50MRCNew/data.moreThan50MRCNewGoal)*100, (day*3.225)],
		            });
				}
			}
		});
	}
};