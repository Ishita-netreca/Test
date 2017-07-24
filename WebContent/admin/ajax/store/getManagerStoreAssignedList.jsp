<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();
	
	JSONArray jsonArr = null;
	JSONObject jsonObj = null;
	
	String timezone_id = null;
	
	TimeZone mTimeZone = null;
	
	try {
	    if (user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
	    if (master_user_flag) {
			query.append(String.format("SELECT `a`.* FROM (SELECT `store_id` AS `storeId`,`timezone_id` FROM `wrp`.`tb_stores` WHERE `master_sid`='%s') AS `a`", user_sid));
	    } else if (subdealer_user_flag) {
			query.append(String.format("SELECT `a`.* FROM (SELECT `store_id` AS `storeId`,`timezone_id` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s') AS `a`", user_sid));
			
	    } else {
			query.append(String.format("SELECT `a`.*,`b`.`timezone_id`,`c`.`userId` FROM (SELECT `sid`, `store_id` AS `storeId`,`user_sid` FROM `%s`.`tb_user_store_access` WHERE `user_sid`='%s' GROUP BY `store_id`) AS `a`", db_name, user_sid));
			query.append(String.format(" LEFT JOIN (SELECT `store_id`,`timezone_id` FROM `%s`.`tb_stores` WHERE `store_id` IN (SELECT `store_id` FROM `%s`.`tb_user_store_access` WHERE `user_sid`='%s')) AS `b` ON `a`.`storeId`=`b`.`store_id`", db_name, db_name, user_sid));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `userId` FROM `wrp`.`tb_user` WHERE `sid` IN (%s) ) AS `c` ON `a`.`user_sid`=`c`.`sid`", user_sid));
			
	    }
		jsonArr = MyDBUtil.getInstance().getList(query.toString());
		
		query.delete(0, query.length());
		
		if (jsonArr != null && jsonArr.size() > 0) {
			
			if (session.getAttribute("wrp_admin_selected_store_timezone_id") == null) {
				if (jsonArr.size() > 1) {
					jsonObj = (JSONObject)jsonArr.get(0);
					if (jsonObj != null && jsonObj.get("storeId") != null && jsonObj.get("timezone_id") != null) {
					   	session.setAttribute("wrp_admin_selected_store_timezone_id", jsonObj.get("timezone_id").toString());
						mTimeZone = TimeZone.getTimeZone(jsonObj.get("timezone_id").toString());
		           		session.setAttribute("wrp_admin_selected_store_timezone_offset", mTimeZone.getOffset(0) / 3600000); 
					}
				}
			}
			
			jsonObj = new JSONObject();
			jsonObj.put("data", jsonArr);
			out.print(jsonObj.toString());
		}
		
	} catch (Exception e) {
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}

	query = null;
%>