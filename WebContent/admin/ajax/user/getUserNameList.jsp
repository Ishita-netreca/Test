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

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
        int userType = MyRequestUtil.getInt(request, "userType", -1);
        String searchKeyword = MyRequestUtil.getString(request, "searchKeyword", null);
		try {
		    if (storeId == null || userId == null) {
		       throw new Exception();
		    }

			query.append("SELECT `a`.* FROM (SELECT `sid`,`user_id` AS `userId`,IF(`middle_name` IS NOT NULL AND `middle_name` != '', CONCAT(`first_name`, ' ', `middle_name`, ' ', `last_name`), CONCAT(`first_name`, ' ', `last_name`)) AS `name`,`tel` FROM `wrp`.`tb_user`");

            switch (userType) {
            case 3:
                query.append(String.format(" WHERE (`user_id` != '%s' AND `user_id` IN (SELECT `user_id` FROM `%s`.`tb_manager_store_assigned` WHERE `store_id`='%s')) AND `user_type`='3'", userId, db_name, storeId));
                break;
            case 4:
                query.append(String.format(" WHERE (`user_id` != '%s' AND `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')) AND `user_type`='4'", db_name, userId, storeId));
                break;
            }

			query.append(") as `a` ");

			if (searchKeyword != null && searchKeyword.length() > 0) {
			    query.append(" WHERE");
			    query.append(String.format(" (`user_id` LIKE '%%%s%%' OR `name` LIKE '%%%s%%')", searchKeyword, searchKeyword));
			}

			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query=null;
%>