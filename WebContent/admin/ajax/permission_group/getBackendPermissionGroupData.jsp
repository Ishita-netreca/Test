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
	
	int permission_group_sid = MyRequestUtil.getInt(request, "permission_group_sid", 0);
	
	JSONObject jsonObj = null;
	String columns_name_str = null;
	
	String[] columns = null;
	
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (user_sid == null || db_name == null || permission_group_sid < 1) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		query.append(String.format("SELECT * FROM `%s`.`tb_permission_group_for_backend_%s` WHERE `permission_group_sid`=%d LIMIT 0,1", db_name, db_name, permission_group_sid));		
		
		jsonObj = MyDBUtil.getInstance().getObject(query.toString());
		
		if (query.length() > 0) {
			query.delete( 0, query.length() );
		}
		
		if (jsonObj == null) {			
			query.append(String.format("SELECT GROUP_CONCAT(`column_name` SEPARATOR ',') AS `columns_name_str` FROM `information_schema`.`columns` WHERE `table_schema`='%s' AND `table_name`='tb_permission_group_for_backend_%s';", db_name, db_name));
			columns_name_str = MyDBUtil.getInstance().getString(query.toString(), "columns_name_str");

			if (query.length() > 0) {
				query.delete( 0, query.length() );
			}
			
			if (columns_name_str != null && columns_name_str.length() > 0) {
				columns = columns_name_str.split(",");
				
				jsonObj = new JSONObject();
				for (int i = 0;i < columns.length;i++) {
					if (columns[i].equals("permission_group_sid")) {
						jsonObj.put(columns[i], permission_group_sid);
					} else {
						jsonObj.put(columns[i], 0);
					}
				}
			}
		}
		if (jsonObj != null) out.print(jsonObj.toString());

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>