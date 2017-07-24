<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	int permission_group_sid = MyRequestUtil.getInt(request, "permission_group_sid", 0);
	
	String users_list_str = MyRequestUtil.getString(request, "users_list_str", null);
	
	String [] sid_list = null;
	int sid = 0;

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (user_sid == null || db_name == null || owner_id == null || permission_group_sid < 1 ) {
	    	out.print(-1);
	        throw new Exception();
	    }
	    
	    if (!subdealer_user_flag) {
	    	out.print(-2);
	    	throw new Exception();
	    }

		mPreparedStatementParams = new PreparedStatementParams();
		
		sid_list = users_list_str.split(",");
		if (sid_list.length < 1) {
			out.print(-4);
			throw new Exception();
		}
		
		query.append(String.format("DELETE FROM `%s`.`tb_permission_group_users_%s` WHERE `permission_group_sid`=%d;", db_name, owner_id, permission_group_sid));
		for (int i = 0; i < sid_list.length ; i++) {
			try {
				sid = Integer.parseInt(sid_list[i]);
				if (i == 0) {
					query.append(String.format("INSERT INTO `%s`.`tb_permission_group_users_%s`(`permission_group_sid`,`user_sid`) VALUES", db_name, owner_id));					
				}
				
				query.append(String.format("(%d,%d)",permission_group_sid, sid));
				
				if (i < sid_list.length-1) {
					query.append(",");
				} else {
					query.append(";");
				}
			} catch (Exception e) {
				
			}
		}

		if (MyDBUtil.getInstance().execute(db_name, owner_id, null, query.toString(), mPreparedStatementParams) != 0) {
			out.print(-4);
			throw new Exception();
		}
		
		if (query.length() > 0) {
			query.delete(0, query.length());
		}

		out.print(0);
	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>