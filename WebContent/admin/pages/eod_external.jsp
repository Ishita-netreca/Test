<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<div pagename="eod_external" class="theme-02">
	
	<div class="panels" style="height: 100%;">	
		<iframe id="eod-external-iframe" style="width:100%;height:98%" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("wrp_admin_login_user_id").toString() : "")%>"></iframe>	
	</div>
</div>
