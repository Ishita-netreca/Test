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
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		
		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT DATE_FORMAT(`a`.update_date, '%%m/%%d/%%Y %%H:%%i:%%s') as update_date, a.*, b.`user_name` FROM(SELECT * FROM `%s`.`tb_return_rules_%s` WHERE `sid`=%d", db_name, storeId, sid));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format("LEFT JOIN (SELECT sid, CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user`) AS b ON `a`.`updater`=`b`.`sid` "));
			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), false));
		} catch (Exception e) {
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>