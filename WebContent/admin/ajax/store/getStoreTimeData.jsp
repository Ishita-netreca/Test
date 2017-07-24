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
		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `daily_work_hour`,`weekly_work_hour`,`open_time`,`close_time` FROM `%s`.`tb_stores` WHERE `store_id`='%s'", db_name, storeId));

			rs = stmt.executeQuery(query.toString());

			if(rs.next()) {
			    sb.append("{\"data\":{");

			    if (rs.getString("daily_work_hour") != null) sb.append(String.format("\"dailyWorkHour\":\"%s\",", rs.getString("daily_work_hour")));
			    if (rs.getString("weekly_work_hour") != null) sb.append(String.format("\"weeklyWorkHour\":\"%s\",", rs.getString("weekly_work_hour")));
			    if (rs.getString("open_time") != null) sb.append(String.format("\"openTime\":\"%s\",", rs.getString("open_time")));
			    if (rs.getString("close_time") != null) sb.append(String.format("\"closeTime\":\"%s\",", rs.getString("close_time")));

			    if (sb.lastIndexOf(",") == sb.length() -1) sb.deleteCharAt(sb.length()-1);

                sb.append("}}");
			} else {
			    sb.append("{\"data\":null}");
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