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
		String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);
		
		String keyword = MyRequestUtil.getString(request, "keyword", null);

		try {
		    if (storeId == null || db_name == null || startDate == null || endDate == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            query.append(String.format("SELECT `a`.*,`b`.`user_name` FROM ("));
            query.append(String.format("SELECT `sid`,`emp_sid`,`date`,IF(DATE_FORMAT(`date`,'%%w') = '0', '7', DATE_FORMAT(`date`,'%%w')) AS `index`,DATE_FORMAT(`work_start`,'%%H:%%i') AS `work_start`,DATE_FORMAT(`work_end`,'%%H:%%i') AS `work_end` FROM `%s`.`tb_clock_inout_schedule_%s` WHERE (`date` BETWEEN '%s' AND '%s')", db_name, storeId, startDate, endDate));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,IF(`middle_name` IS NOT NULL && `middle_name`!='',CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`),CONCAT(`first_name`,' ',`last_name`)) AS `user_name` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, storeId.toUpperCase()));
            query.append(String.format(") AS `b` ON `a`.`emp_sid`=`b`.`sid`"));
            
            if (keyword != null && keyword.length() > 0) {
            	query.append(String.format(" WHERE `user_name` LIKE '%%%s%%'", keyword));
            }

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                sb.append(String.format("\"empSid\":%d,", rs.getInt("emp_sid")));
                if (rs.getString("date") != null) sb.append(String.format("\"date\":\"%s\",", rs.getString("date")));
                sb.append(String.format("\"index\":%d,", rs.getInt("index")));
                if (rs.getString("work_start") != null) sb.append(String.format("\"workStart\":\"%s\",", rs.getString("work_start")));
                if (rs.getString("work_end") != null) sb.append(String.format("\"workEnd\":\"%s\",", rs.getString("work_end")));
                if (rs.getString("user_name") != null) sb.append(String.format("\"userName\":\"%s\",", rs.getString("user_name")));
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