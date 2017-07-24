<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%
		StringBuffer sb = new StringBuffer();
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		if (owner_id == null) {
	        throw new Exception();
	    }
		try {
			sb.append(String.format("SELECT sid, vendor_id as vendorId, vendor_name as vendorName, address1, address2, city, state, zipcode, contact_name as contactName, tel, owner_id FROM `%s`.`tb_vendor` ", owner_id));
			
			if(keyword != null) {
				sb.append(String.format("WHERE vendor_id LIKE '%%%s%%' OR vendor_name LIKE '%%%s%%'", keyword, keyword));
			}
			out.print(MyDBUtil.getInstance().getJSONString(sb.toString(), true));
		} catch (Exception e) {

            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		sb = null;
%>