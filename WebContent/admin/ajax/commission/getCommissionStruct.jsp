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
		
		int profileSid = MyRequestUtil.getInt(request, "profileSid", 0);

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			if (profileSid > 0) {
				query.append(String.format("(SELECT `sid`,`name`,IF(`parent_sid` > 0, `parent_sid`, -1) AS `parent_sid`, '0' AS `registered` FROM `%s`.`tb_commission_struct`", db_name));
				query.append(String.format(" WHERE `sid` NOT IN (SELECT `struct_sid` FROM `%s`.`tb_commission_%s` WHERE `profile_sid` IN ('%d')))", db_name, storeId, profileSid));
			    query.append(String.format(" UNION"));
				query.append(String.format(" (SELECT `sid`,`name`,IF(`parent_sid` > 0, `parent_sid`, -1) AS `parent_sid`, '1' AS `registered` FROM `%s`.`tb_commission_struct`", db_name));
				query.append(String.format(" WHERE `sid` IN (SELECT `struct_sid` FROM `%s`.`tb_commission_%s` WHERE `profile_sid` IN ('%d')))", db_name, storeId, profileSid));
				query.append(String.format(" ORDER BY `sid`"));
			} else {
				query.append(String.format("SELECT `sid`,`name`,IF (`parent_sid` > 0 , `parent_sid`, -1) AS `parent_sid`, '0' AS `registered` FROM `tb_commission_struct`"));
			}
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
				sb.append(String.format("\"value\":%d,", rs.getInt("sid")));
				if (rs.getInt("registered") > 0) sb.append(String.format("\"icon\":\"img/icon/check_02.png\","));
				if (rs.getString("name") != null) sb.append(String.format("\"name\":\"%s\",", rs.getString("name")));
				sb.append(String.format("\"parent_sid\":%d,", rs.getInt("parent_sid")));
				
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