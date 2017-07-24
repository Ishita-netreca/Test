<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.util.TimeZone"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		JSONObject jsonObj = null;
		
		TimeZone mTimeZone = null;	
		
		try {
		    if (storeId == null || db_name == null) {
				out.print(-1);
		        throw new Exception();
		    }
		    
		   jsonObj = MyDBUtil.getInstance().getObject(String.format("SELECT `sid`,`store_id`,`timezone_id` FROM `%s`.`tb_stores` WHERE `store_id`='%s'", db_name, storeId.toUpperCase()));

		   if (jsonObj == null) {
			   out.print(-2);
		       throw new Exception();
		   }
		   
		   if (jsonObj.get("store_id") == null) {
			   out.print(-3);
		       throw new Exception();
		   }		      
		   		   
		   session.setAttribute("wrp_admin_selected_store_id", jsonObj.get("store_id").toString());
		   
		   if (jsonObj.get("timezone_id") != null) {
			   session.setAttribute("wrp_admin_selected_store_timezone_id", jsonObj.get("timezone_id").toString());
			   mTimeZone = TimeZone.getTimeZone(jsonObj.get("timezone_id").toString());
	        	if(mTimeZone.inDaylightTime(new Date())) {
	           		session.setAttribute("wrp_admin_selected_store_timezone_offset", (mTimeZone.getOffset(0) / 3600000) + 1); 
				} else {
	           		session.setAttribute("wrp_admin_selected_store_timezone_offset", mTimeZone.getOffset(0) / 3600000); 
				}   
		   } else {
				session.setAttribute("wrp_admin_selected_store_timezone_id", null);
				mTimeZone = TimeZone.getTimeZone(jsonObj.get("timezone_id").toString());
				session.setAttribute("wrp_admin_selected_store_timezone_offset", 0); 
		   }
		   
		   out.print(0);

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

%>