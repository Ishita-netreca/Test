<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ include file="../ajax/common.jsp" %>
<div pagename="manage_report_hr" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="clock_io_report" onclick="WRP.UI.changePanelBySubmenu('clock_io_report');">
			Clock In/Out
		</div>
		<div class="border"></div>
<%
	if (user_sid.equals("8")) {
%>
	
		<div class="submenu" panelname="itme_clock_adjust" onclick="WRP.UI.changePanelBySubmenu('itme_clock_adjust');">
			Itme Clock Adjustment
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="employee_schedule" onclick="WRP.UI.changePanelBySubmenu('employee_schedule');">
			Employee Schedule
		</div>
		<div class="border"></div>
<%
	}
%>
	
	</div>
	<div class="panels">
		<div class="plain-01-panel" style="height: 100%" panelname="clock_io_report">
			<div class="title-wrapper">
				<div class="line" style="width:510px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">From</div>
					<div class="grid-3">
						<div class="jqx-datetime-input" id="clock-io-report-from"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">To</div>
					<div class="grid-3">
						<div class="jqx-datetime-input" id="clock-io-report-to"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.clockIOReportLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" id="clock-io-report-content" style="overflow-y:auto;text-align: center;display:block;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>CLOCK IN/OUT SUMMARY REPORT</h3></div>
				<div class="line" style="width:225px; margin: 0 auto;">
					<div class="grid-2">FROM: </div>
					<div class="grid-4" id="clock-io-report-from-date">&nbsp;</div>
					<div class="grid-2">~ TO: </div>
					<div class="grid-4" id="clock-io-report-to-date">&nbsp;</div>
				</div>	    
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th></th>
			                <th width=150>EMPLOYEE</th>
			                <th width=60>WORK</th>
			                <th width=60>LUNCH</th>
			                <th width=60>TOTAL<br>TIME</th>
			                <th width=60>REGULAR<br>TIME</th>
			                <th width=60>OVER<br>TIME</th>
						</tr>
	                </thead>   
					<tbody id="clock-io-report-list">
					</tbody>
	    		</table>
			</div>
			<div class="content-wrapper" id="clock-io-daily-report-content" style="overflow-y:auto;text-align: center;display:none;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>CLOCK IN/OUT DAILY SUMMARY REPORT BY EMPLOYEE</h3></div>
				<div class="line" style="width:600px; margin: 0 auto;">
					<div class="grid-3" style="text-align: left;"><a href="#" onclick="document.getElementById('clock-io-daily-report-content').style.display = 'none';document.getElementById('clock-io-report-content').style.display = 'block';">prev</a></div>
					<div class="grid-1-5">FROM: </div>
					<div class="grid-3" id="clock-io-report-daily-from-date">&nbsp;</div>
					<div class="grid-1-5">~ TO: </div>
					<div class="grid-3" id="clock-io-report-daily-to-date">&nbsp;</div>
				</div>	    
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th></th>
			                <th width=150>EMPLOYEE</th>
			                <th width=100>DATE</th>
			                <th width=60>WEEKDAY</th>
			                <th width=60>WORK</th>
			                <th width=60>LUNCH</th>
			                <th width=60>TOTAL<br>TIME</th>
			                <th width=60>REGULAR<br>TIME</th>
			                <th width=60>OVER<br>TIME</th>
						</tr>
	                </thead>   
					<tbody id="clock-io-daily-report-list">
					</tbody>
	    		</table>
			</div>
			<div class="content-wrapper" id="clock-io-log-report-content" style="overflow-y:auto;text-align: center;display:none;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>CLOCK IN/OUT LOG REPORT BY EMPLOYEE</h3></div>
				<div class="line" style="width:600px; margin: 0 auto;">
					<div class="grid-3" style="text-align: left;"><a href="#" onclick="document.getElementById('clock-io-log-report-content').style.display = 'none';document.getElementById('clock-io-daily-report-content').style.display = 'block';">prev</a></div>
					<div class="grid-1-5">FROM: </div>
					<div class="grid-3" id="clock-io-report-log-from-date">&nbsp;</div>
					<div class="grid-1-5">~ TO: </div>
					<div class="grid-3" id="clock-io-report-log-to-date">&nbsp;</div>
				</div>	    
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th></th>
			                <th width=150>EMPLOYEE</th>
			                <th width=100>DATE</th>
			                <th width=60>WEEKDAY</th>
			                <th width=60>STORE</th>
			                <th width=60>TYPE</th>
			                <th width=60>START</th>
			                <th width=60>END</th>
			                <th width=60>HOURS</th>
						</tr>
	                </thead>   
					<tbody id="clock-io-log-report-list">
					</tbody>
	    		</table>
			</div>
		</div>
	</div>
</div>
