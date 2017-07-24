<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		
		String searchPeriodStart = MyRequestUtil.getString(request, "searchPeriodStart", null);
		String searchPeriodEnd = MyRequestUtil.getString(request, "searchPeriodEnd", null);
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            query.append(String.format("SELECT `ab`.*,`c`.`manager_name` FROM ("));
            query.append(String.format("SELECT `a`.*,`b`.`user_id`,`b`.`user_name` FROM ("));
            query.append(String.format("SELECT `sid`,`emp_sid`,DATE_FORMAT(`req_date`,'%%m/%%d/%%Y') AS `req_date`,DATE_FORMAT(`start_date`,'%%m/%%d/%%Y') AS `start_date`,DATE_FORMAT(`end_date`,'%%m/%%d/%%Y') AS `end_date`,`reason`,`note`,`manager_sid`,`req_state` FROM `%s`.`tb_time_off_%s` WHERE `manager_sid`='%s'", db_name, storeId, user_sid));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,`user_id`,IF(`middle_name` IS NOT NULL && `middle_name`!='',CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`),CONCAT(`first_name`,' ',`last_name`)) AS `user_name` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, storeId));
            query.append(String.format(") AS `b` ON `a`.`emp_sid`=`b`.`sid`"));
            query.append(String.format(") AS `ab` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,IF(`middle_name` IS NOT NULL && `middle_name`!='',CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`),CONCAT(`first_name`,' ',`last_name`)) AS `manager_name` FROM `wrp`.`tb_user` WHERE `sid`='%s'", user_sid));
            query.append(String.format(") AS `c` ON `ab`.`manager_sid`=`c`.`sid`"));
            if(searchPeriodStart != null && searchPeriodEnd != null) {
				query.append(String.format(" WHERE `req_date` BETWEEN '%s' AND '%s' ", searchPeriodStart, searchPeriodEnd));
			}
            query.append(String.format(" ORDER BY `req_date`"));
            
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("req_date") != null) sb.append(String.format("\"reqDate\":\"%s\",", rs.getString("req_date")));
                if (rs.getString("user_id") != null) sb.append(String.format("\"userId\":\"%s\",", rs.getString("user_id")));
                if (rs.getString("user_name") != null) sb.append(String.format("\"userName\":\"%s\",", rs.getString("user_name")));
                if (rs.getString("start_date") != null) sb.append(String.format("\"startDate\":\"%s\",", rs.getString("start_date")));
                if (rs.getString("end_date") != null) sb.append(String.format("\"endDate\":\"%s\",", rs.getString("end_date")));
                if (rs.getString("reason") != null) sb.append(String.format("\"reason\":\"%s\",", rs.getString("reason")));
                if (rs.getString("note") != null) sb.append(String.format("\"note\":\"%s\",", rs.getString("note")));
                sb.append(String.format("\"managerSid\":%d,", rs.getInt("manager_sid")));
                sb.append(String.format("\"reqState\":%d,", rs.getInt("req_state")));
                switch (rs.getInt("req_state")) {
                case 0:
                    sb.append("\"reqStateStr\":\"Request\",");
                    break;
                case 1:
                    sb.append("\"reqStateStr\":\"Accept\",");
                    break;
                case 2:
                    sb.append("\"reqStateStr\":\"Denied\",");
                    break;
                }
                if (rs.getString("manager_name") != null) sb.append(String.format("\"managerName\":\"%s\",", rs.getString("manager_name")));
			    if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
                sb.append("},");
			}

			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);

			sb.append("]}");

            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }
            try {
                if (stmt != null && !stmt.isClosed()) {
                    stmt.close();
                }
            } catch (Exception e2) {

            }
            try {
                if (conn != null && !conn.isClosed()) {
                    conn.close();
                }
            } catch (Exception e2) {

            }

            out.print(sb.toString());

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

			try {
				if (rs != null && !rs.isClosed()) {
					rs.close();
				}
			} catch (Exception e2) {

			}
			try {
				if (stmt != null && !stmt.isClosed()) {
					stmt.close();
				}
			} catch (Exception e2) {

			}
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (Exception e2) {

			}
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		query = null;
		sb = null;
%>