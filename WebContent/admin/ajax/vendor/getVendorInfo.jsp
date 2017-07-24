<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		int vendorSid = MyRequestUtil.getInt(request, "vendorSid", 0);
		
		try {
		    if (vendorSid < 1 || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `sid`,`vendor_id` AS `vendorId`,`vendor_name` AS `vendorName`,`address1`,`address2`,`city`,`state`,`zipcode`,`contact_name` AS `contactName`,`tel`,`owner_id` FROM `%s`.`tb_vendor` WHERE `sid`='%d'", db_name, vendorSid));
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), false));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query=null;
%>