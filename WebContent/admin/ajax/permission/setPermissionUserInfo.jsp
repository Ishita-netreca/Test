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

	int request_user_sid = MyRequestUtil.getInt(request, "user_sid", 0);
	
	String sales_permission_struct_sid_list_str = MyRequestUtil.getString(request, "sales_permission_struct_sid_list_str", null);
	String backend_permission_struct_sid_list_str = MyRequestUtil.getString(request, "backend_permission_struct_sid_list_str", null);
	
	String [] sid_list = null;
	int sid = 0;

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (user_sid == null || db_name == null || owner_id == null || request_user_sid < 1) {
	    	out.print(-1);
	        throw new Exception();
	    }
	    
	    if (!subdealer_user_flag) {
	    	out.print(-2);
	    	throw new Exception();
	    }

		mPreparedStatementParams = new PreparedStatementParams();		

		query.append(String.format("DELETE FROM `%s`.`tb_permission_user_sales_%s` WHERE `user_sid`=%d;", db_name, owner_id, request_user_sid));
		if (sales_permission_struct_sid_list_str != null && sales_permission_struct_sid_list_str.length() > 0) {
			sid_list = sales_permission_struct_sid_list_str.split(",");			
			
			for (int i = 0; i < sid_list.length ; i++) {
				try {
					sid = Integer.parseInt(sid_list[i]);
					if (i == 0) {
						query.append(String.format("INSERT INTO `%s`.`tb_permission_user_sales_%s`(`user_sid`,`permission_struct_sid`) VALUES", db_name, owner_id));					
					}
					
					query.append(String.format("(%d,%d)",request_user_sid, sid));
					
					if (i < sid_list.length-1) {
						query.append(",");
					} else {
						query.append(";");
					}
				} catch (Exception e) {
					
				}
			}
		}

		if (MyDBUtil.getInstance().execute(db_name, owner_id, null, query.toString(), mPreparedStatementParams) != 0) {
			out.print(-5);
			throw new Exception();
		}
		
		if (query.length() > 0) {
			query.delete(0, query.length());
		}

		query.append(String.format("DELETE FROM `%s`.`tb_permission_user_backend_%s` WHERE `user_sid`=%d;", db_name, owner_id, request_user_sid));
		if (backend_permission_struct_sid_list_str != null && backend_permission_struct_sid_list_str.length() > 0) {
			sid_list = backend_permission_struct_sid_list_str.split(",");			
			
			for (int i = 0; i < sid_list.length ; i++) {
				try {
					sid = Integer.parseInt(sid_list[i]);
					if (i == 0) {
						query.append(String.format("INSERT INTO `%s`.`tb_permission_user_backend_%s`(`user_sid`,`permission_struct_sid`) VALUES", db_name, owner_id));					
					}
					
					query.append(String.format("(%d,%d)",request_user_sid, sid));
					
					if (i < sid_list.length-1) {
						query.append(",");
					} else {
						query.append(";");
					}
				} catch (Exception e) {
					
				}
			}
		}

		if (MyDBUtil.getInstance().execute(db_name, owner_id, null, query.toString(), mPreparedStatementParams) != 0) {
			out.print(-6);
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