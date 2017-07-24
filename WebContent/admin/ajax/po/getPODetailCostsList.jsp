<% //170208 jh %>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%

		
		StringBuffer query = new StringBuffer();
		String store_id = MyRequestUtil.getString(request, "store_id", null);		
		
		int po_sid = MyRequestUtil.getInt(request, "po_sid", 0);
		try {
		    if (store_id == null || db_name == null || po_sid < 1) {
		    	out.print("{\"data\":[]}");
		    } else {		    	
		    	out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, String.format("SELECT `sid`,`type`,`description`,`cost` FROM `%s`.`tb_po_costs_%s` WHERE `po_sid` IN (%d)", db_name, store_id, po_sid), true));
		    }

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>