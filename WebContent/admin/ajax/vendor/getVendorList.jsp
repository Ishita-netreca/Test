<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		StringBuffer query = new StringBuffer();

		try {
			
			if (db_name == null) {
		        throw new Exception();
		    }
			
			
			query.append(String.format("SELECT `sid`,`vendor_id` AS `vendorId`,`vendor_name` AS `vendorName`,`address1`,`address2`,`city`,`state`,`zipcode`,CONCAT_WS(', ',`address1`,`address2`,`city`,`state`,`zipcode`) AS `address`,`contact_name` AS `contactName`,`tel`,`owner_id` FROM `%s`.`tb_vendor`", db_name));

			if(keyword != null) {
				query.append(String.format("WHERE vendor_id LIKE '%%%s%%' OR vendor_name LIKE '%%%s%%'", keyword, keyword));
			}
			
			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>