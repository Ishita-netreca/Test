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
<%

		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String userSid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
		String ownerId = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		
		try {
		    if (storeId == null || userSid == null || ownerId == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT a.*, b.`user_name` FROM(SELECT * FROM `%s`.`tb_return_rules_%s` WHERE `sid`=%d", ownerId, storeId, sid));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format("LEFT JOIN (SELECT sid, CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user`) AS b ON `a`.`updater`=`b`.`sid` "));
			
			out.print(MyDBUtil.getJSONString(query.toString(), false));
		} catch (Exception e) {
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>