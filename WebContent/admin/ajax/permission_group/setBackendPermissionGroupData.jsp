<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	int sid = MyRequestUtil.getInt(request, "sid", -1);
	int permission_group_sid = MyRequestUtil.getInt(request, "permission_group_sid", 0);
	
	String request_payload = MyRequestUtil.getString(request, "request_payload", null);
	
	JSONObject jsonObj = null;
	
	Iterator keyIterator = null;
	
	String column = null;
	
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (user_sid == null || db_name == null || sid < 0 || permission_group_sid < 1 || (request_payload == null || request_payload.length() < 1) ) {
	        throw new Exception();
	    }
	    
	    jsonObj = (JSONObject)(new JSONParser().parse(request_payload));
	    
	    keyIterator = jsonObj.keySet().iterator();
	    
	    if (sid == 0) {
	    	query.append(String.format("INSERT INTO `%s`.`tb_permission_group_for_backend_%s` SET", db_name, db_name));
	    } else {
	    	query.append(String.format("UPDATE `%s`.`tb_permission_group_for_backend_%s` SET", db_name, db_name));
	    }
	    
	    query.append(String.format(" `permission_group_sid`='%d'", permission_group_sid));
	    
	   	while(keyIterator.hasNext()) {
	   		column = (String)keyIterator.next();
	   		if (jsonObj.get(column) != null) {
	   			query.append(String.format(" ,`%s`='%s'", column, jsonObj.get(column).toString()));
	   		}
	   	}
		
	   	if (sid > 0) {
	   		query.append(String.format(" WHERE `sid`='%d'", sid));
	   	}
	   	
	   	out.print(MyDBUtil.getInstance().execute(query.toString()));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
		
		out.print(-1);
	}
	
	column = null;
	keyIterator = null;
	jsonObj = null;
	query = null;
%>