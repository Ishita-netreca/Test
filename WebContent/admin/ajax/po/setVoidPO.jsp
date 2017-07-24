<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "storeId", null);
	String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", session.getAttribute("wrp_admin_selected_store_timezone_offset").toString());
	int qty = 0, item_type = 0, item_sid = 0;
	
	String po_sid = MyRequestUtil.getString(request,"sid", null);
	
	try {
	    if (store_id == null || db_name == null || po_sid == null) {
	    	out.print(-1);
	        throw new Exception();
	    }
		// 쿼리 입력
		
		MyDBUtil.execute(String.format("UPDATE `%s`.`tb_po_%s` SET `status`='-1' WHERE sid = '%s'", db_name, store_id, po_sid));

		out.print(0);
	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			out.print(-1);
			e.printStackTrace();
		}
	}
	query = null;
%>