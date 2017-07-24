<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<div pagename="company_report_inventory" class="theme-02">
	<iframe id="company-report-inventory-main-iframe" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : "")%>"></iframe>
</div>
