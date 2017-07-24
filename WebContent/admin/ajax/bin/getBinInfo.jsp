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
		
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT a.*, b.* FROM(SELECT `sid`,`bin_type`,`description`,DATE_FORMAT(`update_date`,'%%m/%%d/%%Y') AS `update_date`,`updater` FROM `%s`.`tb_bin_dict_%s` WHERE 1=1", db_name, storeId));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format("LEFT JOIN (SELECT sid,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.tb_user)AS b ON a.updater=b.sid"));
			query.append(String.format(" WHERE a.sid=%d", sid));
			
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append(String.format("{"));
				sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
				if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
				if (rs.getString("update_date") != null) sb.append(String.format("\"update_date\":\"%s\",", rs.getString("update_date")));
				if (rs.getString("bin_type") != null) sb.append(String.format("\"bin_type\":\"%s\",", rs.getString("bin_type")));
				if (rs.getString("user_name") != null) sb.append(String.format("\"user_name\":\"%s\",", rs.getString("user_name")));
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