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

		int permissionGroupSid = MyRequestUtil.getInt(request, "permissionGroupSid", 0);

		try {
		    if (permissionGroupSid < 1 || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `sid`,`user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name`,`user_type`,`tel`,`email` FROM `wrp`.`tb_user` WHERE `group_sid`='%d' AND `owner_sid`='%s'",
			             permissionGroupSid, owner_sid));
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("user_id") != null) sb.append(String.format("\"userId\":\"%s\",", rs.getString("user_id")));
                if (rs.getString("user_name") != null) sb.append(String.format("\"userName\":\"%s\",", rs.getString("user_name")));
                sb.append(String.format("\"userType\":%d,", rs.getInt("user_type")));
                switch (rs.getInt("user_type")) {
                case 0:
                    sb.append(String.format("\"jobPosition\":\"General Manager\","));
                    break;
                case 1:
                    sb.append(String.format("\"jobPosition\":\"District Manager\","));
                    break;
                case 2:
                    sb.append(String.format("\"jobPosition\":\"Area Manager\","));
                    break;
                case 3:
                    sb.append(String.format("\"jobPosition\":\"Store Manager\","));
                    break;
                case 4:
                    sb.append(String.format("\"jobPosition\":\"Employee\","));
                    break;
                }
                if (rs.getString("tel") != null) sb.append(String.format("\"tel\":\"%s\",", rs.getString("tel")));
                if (rs.getString("email") != null) sb.append(String.format("\"email\":\"%s\",", rs.getString("email")));

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