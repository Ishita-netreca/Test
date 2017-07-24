
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
    	var components;
		try {
			WRPComponents('div[pagename="manage_report_operation"] > .page-submenu-container > .submenu[panelname="eod_report"]').addShadowedImage('img/icon/eod_report.png');
			WRPComponents('div[pagename="manage_report_operation"] > .page-submenu-container > .submenu[panelname="summary_of_activation_count"]').addShadowedImage('img/icon/summary_of_activation_count.png');
			WRPComponents('div[pagename="manage_report_operation"] > .page-submenu-container > .submenu[panelname="productivity_per_door"]').addShadowedImage('img/icon/productivity_per_door.png');
			WRPComponents('div[pagename="manage_report_operation"] > .page-submenu-container > .submenu[panelname="detail_activation_report"]').addShadowedImage('img/icon/detail_activation_report.png');
			WRPComponents('div[pagename="manage_report_operation"] > .page-submenu-container > .submenu[panelname="raw_data"]').addShadowedImage('img/icon/raw_data.png');
		} catch (e) {

		}

		
		WRPAdminApp.pagescript.assignedStoreList();
		WRPAdminApp.pagescript.eodXReportLoad();
    },
    eodXReportLoad: function(){
    	var iframe, date, checkedStore, user_id;
    	
    	iframe = document.getElementById("eod-x-report-iframe");
    	if (!iframe) {
    		return;
    	}
    	
    	iframe.onload = function() {
    		try {
    			document.getElementById("loading-container").style.display = "none";
    		} catch (e) {
    			
    		}
    	}
    	/*
    	try{
    		checkedStore = $("#eod-x-report-store").jqxDropDownList('getSelectedItem').label;
    	}catch(e){
    		
    	}
    	*/
    	try {
    		//date = $('#eod-x-report-date').jqxDateTimeInput('getDate');
        	//date = date.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") ;
    		user_id = iframe.getAttribute("user_id") || "";
        	if (user_id && user_id.length > 0) {
    			iframe.src = "https://reports.posmasterus.com/Report/EOD?user="+user_id;
        		try {
        			document.getElementById("loading-container").style.display = "block";
        		} catch (e) {
        			
        		}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    summaryOfActivationCountLoad: function(){
    	var from, to, items, checkedStores, items;
    	
    	try{
    		checkedStores = "";
            items = $("#summary-of-activation-count-store").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#summary-of-activation-count-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#summary-of-activation-count-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;

    	} catch (e) {
    		console.warn(e);
    	}
    	
		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}
    	
        $.ajax({
            url: "ajax/management_report/getSummaryOfActivationCount.jsp",
            data: {
            	store_id : checkedStores,
            	from: from,
            	to: to
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
    			document.getElementById("summary-of-activation-count-from-date").innerHTML = from;
    			document.getElementById("summary-of-activation-count-to-date").innerHTML = to;
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.StoreCode !== undefined && obj.StoreCode)? obj.StoreCode : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.newact_count !== undefined && obj.newact_count)? obj.newact_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.newact_r_count !== undefined && obj.newact_r_count)? obj.newact_r_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.upgrade_count !== undefined && obj.upgrade_count)? obj.upgrade_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.upgrade_r_count !== undefined && obj.upgrade_r_count)? obj.upgrade_r_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.react_count !== undefined && obj.react_count)? obj.react_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.react_r_count !== undefined && obj.react_r_count)? obj.react_r_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=50>');
						innerHTML.push((obj.sor_count !== undefined && obj.sor_count)? obj.sor_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.sor_r_count !== undefined && obj.sor_r_count)? obj.sor_r_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.new_activation !== undefined && obj.new_activation)? obj.new_activation : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.port_in_count !== undefined && obj.port_in_count)? obj.port_in_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.ALL_count !== undefined && obj.ALL_count)? obj.ALL_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("summary-of-activation-count-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("loading-container").style.display = "none";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        })
    	
    },
    productivityPerDoorLoad: function(){
    	var db_name, from, to, items, checkedStores;
    	
    	try{
    		checkedStores = "";
            items = $("#productivity-per-door-store").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
            	checkedStores += this.label + ",";
            });
            
            if(checkedStores.lastIndexOf(",") == checkedStores.length - 1){
            	checkedStores = checkedStores.slice(0, -1);
            }
    		
    	}catch(e){
    		
    	}
    	
    	try {
    		from = $('#productivity-per-door-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#productivity-per-door-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;

    	} catch (e) {
    		console.warn(e);
    	}
    	
		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}

        $.ajax({
            url: "ajax/management_report/getProductivityPerDoor.jsp",
            data: {
            	store_id : checkedStores,
            	from: from,
            	to: to
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML;
    			data = result.data;
    			
    			document.getElementById("productivity-per-door-from-date").innerHTML = from;
    			document.getElementById("productivity-per-door-to-date").innerHTML = to;
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.StoreCode !== undefined && obj.StoreCode)? obj.StoreCode : '');
						innerHTML.push('</td>');
						innerHTML.push('<td width=150>');
						innerHTML.push((obj.net_activation !== undefined && obj.net_activation)? obj.net_activation : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.payment_count !== undefined && obj.payment_count)? obj.payment_count : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td width=70>');
						innerHTML.push((obj.Ratio !== undefined && obj.Ratio)? obj.Ratio : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("productivity-per-door-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("loading-container").style.display = "none";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        });
    },
    assignedStoreList: function(){
    	$.ajax({
            url: "ajax/store/getManagerStoreAssignedList.jsp",
            method: "POST",
            async: false,
            dataType: "json",
            success: function(result) {
                var data, i, len;

                data = result.data;
                if (!data) return;
				
				var datarow = new Array();
				
				for(i = 0; i < data.length ; i++){
					var row = {};
					row["label"] = data[i].storeId;
					row["value"] = data[i].storeId;
					datarow[i] = row;
				}
				
				var source = {
	        			datatype: "json",
	        			localdata: datarow,
	        			datafield: [{ name: "label" }, { name: "value" }]
	        	};
				
				var dataAdapter = new $.jqx.dataAdapter(source);
				
				$(".store-dropdown-list").jqxDropDownList({
					source: dataAdapter,
					width: "100%",
					height: 24,
					displayMember: "label",
					valueMember: "value",
					checkboxes: true
				});
				/*
				$("#eod-x-report-store").jqxDropDownList({
					checkboxes: false
				});
				*/
            }
        })
    }
};