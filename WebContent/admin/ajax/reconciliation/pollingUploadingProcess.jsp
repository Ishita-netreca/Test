<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
	if (session.getAttribute("wrp_admin_upload_reconciliation_last_row_num") != null && session.getAttribute("wrp_admin_upload_reconciliation_curr_row_num") != null) {
		out.print(String.format("{\"last\":%s,\"curr\":%s}", session.getAttribute("wrp_admin_upload_reconciliation_last_row_num").toString(), session.getAttribute("wrp_admin_upload_reconciliation_curr_row_num").toString()));
	}
%>