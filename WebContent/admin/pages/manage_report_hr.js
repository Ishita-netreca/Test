
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
		try {
			WRPComponents('div[pagename="manage_report_hr"] > .page-submenu-container > .submenu[panelname="clock_io_report"]').addShadowedImage('img/icon/clock_in_out.png');
			WRPComponents('div[pagename="manage_report_hr"] > .page-submenu-container > .submenu[panelname="itme_clock_adjust"]').addShadowedImage('img/icon/item_clock_adjustment.png');
			WRPComponents('div[pagename="manage_report_hr"] > .page-submenu-container > .submenu[panelname="employee_schedule"]').addShadowedImage('img/icon/employee_schedule.png');
		} catch (e) {

		}
		
		WRPAdminApp.pagescript.assignedStoreList();
    },
    clockIOReportLoad: function(){
    	var from, to, store_id;
    	
    	try {
			store_id = document.getElementById("select-store").value;
		} catch (e) {
			
		}
		
    	try {
        	from = $('#clock-io-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#clock-io-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;

    	} catch (e) {
    		console.warn(e);
    	}
    	
		try {
			document.getElementById("loading-container").style.display = "block";
		} catch (e) {
			
		}
    	
        $.ajax({
            url: "ajax/management_report/getClockTotalSummary.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id: store_id,
            	step: 1
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, is_odd;
    			data = result.data;
    			document.getElementById("clock-io-report-from-date").innerHTML = from;
    			document.getElementById("clock-io-report-to-date").innerHTML = to;
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td><a href="#" onclick="WRPAdminApp.pagescript.clockIODailyReportLoad(\''+obj.EMP_ID+'\')">');
						innerHTML.push((obj.EMP_ID !== undefined && obj.EMP_ID)? obj.EMP_ID : '');
						innerHTML.push('<br>(');
						innerHTML.push((obj.NAME !== undefined && obj.NAME)? obj.NAME : '');
						innerHTML.push(')</a></td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.WORK_HOUR !== undefined && obj.WORK_HOUR)? obj.WORK_HOUR : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.LUNCH_HOUR !== undefined && obj.LUNCH_HOUR)? obj.LUNCH_HOUR : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.TOTAL_WORK_HOUR !== undefined && obj.TOTAL_WORK_HOUR)? obj.TOTAL_WORK_HOUR : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.REGULAR_TIME !== undefined && obj.REGULAR_TIME)? obj.REGULAR_TIME : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.OVER_TIME !== undefined && obj.OVER_TIME)? obj.OVER_TIME : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("clock-io-report-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("loading-container").style.display = "none";
        			document.getElementById("clock-io-report-content").style.display = "block";
        			document.getElementById("clock-io-daily-report-content").style.display = "none";
        			document.getElementById("clock-io-log-report-content").style.display = "none";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        });
    },
    clockIODailyReportLoad: function(emp_id){
    	var from, to, store_id;
    	
    	try {
			store_id = document.getElementById("select-store").value;
		} catch (e) {
			
		}
		
    	try {
        	from = $('#clock-io-report-from').jqxDateTimeInput('getDate');
        	from = from.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((from.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(from.getDate(), "00") ;

        	to = $('#clock-io-report-to').jqxDateTimeInput('getDate');
        	to = to.getFullYear()+"-"+WRPAdminApp.toDecimalFormat((to.getMonth() + 1), "00") + "-" + WRPAdminApp.toDecimalFormat(to.getDate(), "00") ;

    	} catch (e) {
    		console.warn(e);
    	}
    	
        $.ajax({
            url: "ajax/management_report/getClockTotalSummary.jsp",
            data: {
            	from: from,
            	to: to,
            	store_id: store_id,
            	step: 2,
            	emp_id: emp_id
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, total_work, total_lunch, total_total_work,total_regular,total_over;
    			data = result.data;
    			
    			document.getElementById("clock-io-report-daily-from-date").innerHTML = from;
    			document.getElementById("clock-io-report-daily-to-date").innerHTML = to;
    			
    			innerHTML = [];
    			total_work = 0;
    			total_lunch = 0;
    			total_total_work = 0;
    			total_regular = 0;
    			total_over = 0;
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						total_work = total_work + obj.WORK_HOUR;
						total_lunch = total_lunch + obj.LUNCH_HOUR;
						total_total_work = total_total_work + obj.TOTAL_WORK_HOUR;
						total_regular = total_regular + obj.REGULAR_TIME;
						total_over = total_over + obj.OVER_TIME;
						
						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.EMP_ID !== undefined && obj.EMP_ID)? obj.EMP_ID : '');
						innerHTML.push('<br>(');
						innerHTML.push((obj.NAME !== undefined && obj.NAME)? obj.NAME : '');
						innerHTML.push(')</a></td>');
						innerHTML.push('</td>');
						innerHTML.push('<td><a href="#" onclick="WRPAdminApp.pagescript.clockIOLogReportLoad(\''+obj.EMP_ID+'\',\''+obj.DATE+'\')">');
						innerHTML.push((obj.DATE !== undefined && obj.DATE)? obj.DATE : '');
						innerHTML.push('</a></td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.WEEKDAY !== undefined && obj.WEEKDAY)? obj.WEEKDAY : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.WORK_HOUR !== undefined && obj.WORK_HOUR)? obj.WORK_HOUR : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.LUNCH_HOUR !== undefined && obj.LUNCH_HOUR)? obj.LUNCH_HOUR : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.TOTAL_WORK_HOUR !== undefined && obj.TOTAL_WORK_HOUR)? obj.TOTAL_WORK_HOUR : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.REGULAR_TIME !== undefined && obj.REGULAR_TIME)? obj.REGULAR_TIME : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.OVER_TIME !== undefined && obj.OVER_TIME)? obj.OVER_TIME : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}


				try {
					innerHTML.push('<tr>');
					innerHTML.push('<td colspan=4>');
					innerHTML.push('TOTAL');
					innerHTML.push('</td>');
					innerHTML.push('<td>');
					innerHTML.push((total_work !== undefined && total_work)? total_work : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td>');
					innerHTML.push((total_lunch !== undefined && total_lunch)? total_lunch : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td>');
					innerHTML.push((total_total_work !== undefined && total_total_work)? total_total_work : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td>');
					innerHTML.push((total_regular !== undefined && total_regular)? total_regular : 0);
					innerHTML.push('</td>');
					innerHTML.push('<td>');
					innerHTML.push((total_over !== undefined && total_over)? total_over : 0);
					innerHTML.push('</td>');
					innerHTML.push('</tr>');
				} catch (e) {
					console.warn(e);
				}

				try {
					document.getElementById("clock-io-daily-report-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("clock-io-report-content").style.display = "none";
        			document.getElementById("clock-io-daily-report-content").style.display = "block";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        });
    },
    clockIOLogReportLoad: function(emp_id,date){
    	var store_id;
    	
    	try {
			store_id = document.getElementById("select-store").value;
		} catch (e) {
			
		}
		
		$.ajax({
            url: "ajax/management_report/getClockTotalSummary.jsp",
            data: {
            	from: date,
            	to: date,
            	store_id: store_id,
            	emp_id: emp_id,
            	step: 3
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var data, elem, i, len, obj, innerHTML, is_odd;
    			data = result.data;
    			document.getElementById("clock-io-report-log-from-date").innerHTML = date;
    			document.getElementById("clock-io-report-log-to-date").innerHTML = date;
    			
    			innerHTML = [];
    			
    			for(i = 0; i < data.length; i++){
    				try {
						obj = data[i];

						innerHTML.push('<tr class=pure-table-odd>');
						innerHTML.push('<td>');
						innerHTML.push(i+1);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.EMP_ID !== undefined && obj.EMP_ID)? obj.EMP_ID : '');
						innerHTML.push('<br>(');
						innerHTML.push((obj.NAME !== undefined && obj.NAME)? obj.NAME : '');
						innerHTML.push(')</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.DATE !== undefined && obj.DATE)? obj.DATE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.WEEKDAY !== undefined && obj.WEEKDAY)? obj.WEEKDAY : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.STORE !== undefined && obj.STORE)? obj.STORE : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.TYPE !== undefined && obj.TYPE)? obj.TYPE : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.START !== undefined && obj.START)? obj.START : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.END !== undefined && obj.END)? obj.END : 0);
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.HOURS !== undefined && obj.HOURS)? obj.HOURS : 0);
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {
						console.warn(e);
					}
    			}

				try {
					document.getElementById("clock-io-log-report-list").innerHTML = innerHTML.join("");
				} catch (e) {
					console.warn(e);
				}
				
        		try {
        			document.getElementById("clock-io-daily-report-content").style.display = "none";
        			document.getElementById("clock-io-log-report-content").style.display = "block";
        		} catch (e) {
        			
        		}

				innerHTML = undefined;
            }
        });
    }
};