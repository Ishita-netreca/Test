<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<div pagename="manage_report_accounting" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="sales_tax_report" onclick="WRP.UI.changePanelBySubmenu('sales_tax_report');">
			Sales Tax Report
		</div>
		<div class="border"></div>
	</div>
	<div class="panels">
		<div class="plain-01-panel" style="height: 100%" panelname="sales_tax_report">
			<iframe id="sales-tax-report-iframe" style="width:100%;height:98%" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("wrp_admin_login_user_id").toString() : "")%>"></iframe>	
		</div>
	</div>
</div>
