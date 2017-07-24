<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ include file="../ajax/common.jsp" %>
<div pagename="manage_report_operation" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="eod_report" onclick="WRP.UI.changePanelBySubmenu('eod_report');">
			EOD Report
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="summary_of_activation_count" onclick="WRP.UI.changePanelBySubmenu('summary_of_activation_count');">
			Summary of Activation Count
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="productivity_per_door" onclick="WRP.UI.changePanelBySubmenu('productivity_per_door');">
			Productivity per Door
		</div>
		<div class="border"></div>
<%
	if (user_sid.equals("8")) {
%>
		<div class="submenu" panelname="detail_activation_report" onclick="WRP.UI.changePanelBySubmenu('detail_activation_report');">
			Detail Activation Report
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="raw_data" onclick="WRP.UI.changePanelBySubmenu('raw_data');">
			Raw Data
		</div>
		<div class="border"></div>
		
<%
	}
%>
	
	</div>
	<div class="panels">
		<div class="plain-01-panel" style="height: 100%;" panelname="eod_report">
		<!-- 
			<div class="title-wrapper">
				<div class="line" style="width:700px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3">
						<div class="store-dropdown-list" id="eod-x-report-store"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">Date</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="eod-x-report-date"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px" onclick="WRPAdminApp.pagescript.eodXReportLoad();">Apply</div>
					</div>
				</div>
			</div>
			 -->
			<iframe id="eod-x-report-iframe" style="width:100%;height:98%" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("wrp_admin_login_user_id").toString() : "")%>"></iframe>	
		</div>
		<div class="plain-01-panel" style="height: 100%;display:none;" panelname="summary_of_activation_count">
			<div class="title-wrapper">
				<div class="line" style="width:700px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3">
						<div class="store-dropdown-list" id="summary-of-activation-count-store"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">From</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="summary-of-activation-count-from"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">To</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="summary-of-activation-count-to"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px" onclick="WRPAdminApp.pagescript.summaryOfActivationCountLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" style="text-align: center;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>Summary of Activation Count</h3></div>
				<div class="line" style="width:225px; margin: 0 auto;">
					<div class="grid-2">FROM: </div>
					<div class="grid-4" id="summary-of-activation-count-from-date">&nbsp;</div>
					<div class="grid-2">~ TO: </div>
					<div class="grid-4" id="summary-of-activation-count-to-date">&nbsp;</div>
				</div>	    
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>NEW ACT</th>
			                <th>NEW ACT <br> RETURN</th>
			                <th>UPGRADE</th>
			                <th>UPGRADE <br> RETURN</th>
			                <th>REACT</th>
			                <th>REACT <br> RETURN</th>
			                <th>SOR</th>
			                <th>SOR <br> RETURN</th>
			                <th>NET ACTIVATION</th>
			                <th>NET PORT CNT</th>
			                <th>ALL CNT</th>              
						</tr>
	                </thead>   
					<tbody id="summary-of-activation-count-list">
					</tbody>
	    		</table>
			</div>
		</div>
		<div class="plain-01-panel" style="height: 100%;display:none;" panelname="productivity_per_door">
			<div class="title-wrapper">
				<div class="line" style="width:700px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3">
						<div class="store-dropdown-list" id="productivity-per-door-store"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">From</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="productivity-per-door-from"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">To</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="productivity-per-door-to"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px" onclick="WRPAdminApp.pagescript.productivityPerDoorLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" style="text-align: center;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>PRODUCTIVITY PER DOOR</h3></div>
				<div class="line" style="width:225px; margin: 0 auto;">
					<div class="grid-2">FROM: </div>
					<div class="grid-4" id="productivity-per-door-from-date">&nbsp;</div>
					<div class="grid-2">~ TO: </div>
					<div class="grid-4" id="productivity-per-door-to-date">&nbsp;</div>
				</div>	    
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>TOTAL ACT (New/Upg/SOR)</th>
			                <th>Qpay Qty</th>
			                <th>Ratio %</th>
						</tr>
	                </thead>   
					<tbody id="productivity-per-door-list">
					</tbody>
	    		</table>
			</div>
		</div>
	</div>
</div>
