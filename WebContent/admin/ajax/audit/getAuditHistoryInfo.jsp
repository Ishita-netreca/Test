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
		int audit_sid = MyRequestUtil.getInt(request, "audit_sid", 0);

		try {
		    if (storeId == null || audit_sid < 1 || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			
			query.append(String.format("SELECT `a`.`sid`,`a`.`audit_id`,`a`.`open_date`,`a`.`close_date`,`a`.`note`,`a`.`status`,`a`.`bins`,`a`.`category`,`b`.`counted_by`,`c`.`confirmed_by` FROM ("));
			query.append(String.format(" SELECT `sid`,DATE_FORMAT(`open_date`,'%%m/%%d/%%Y %%H:%%i:%%s') AS `open_date`,DATE_FORMAT(`close_date`,'%%m/%%d/%%Y %%H:%%i:%%s') AS `close_date`,`emp_id`,`audit_id`,`status`,`confirmer_id`,`note`,`bins`,`category` FROM `%s`.`tb_audit_%s`", db_name, storeId));
			query.append(String.format(" WHERE `sid` IN ('%d')", audit_sid));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `counted_by` FROM `wrp`.`tb_user` WHERE `user_id` IN"));
			query.append(String.format(" (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, storeId));
			query.append(String.format(" ) AS `b` ON `a`.`emp_id`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `confirmed_by` FROM `wrp`.`tb_user` WHERE `user_id` IN"));
			query.append(String.format(" (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, storeId));
			query.append(String.format(" ) AS `c` ON `a`.`confirmer_id`=`c`.`sid`"));

			rs = stmt.executeQuery(query.toString());

			if(rs.next()) {
				sb.append("{\"data\":{");
				sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
				if (rs.getString("audit_id") != null) sb.append(String.format("\"audit_id\":\"%s\",", rs.getString("audit_id")));
				if (rs.getString("open_date") != null) sb.append(String.format("\"open_date\":\"%s\",", rs.getString("open_date")));
				if (rs.getString("close_date") != null) sb.append(String.format("\"close_date\":\"%s\",", rs.getString("close_date")));
				if (rs.getString("bins") != null) sb.append(String.format("\"bins\":\"%s\",", rs.getString("bins")));
				if (rs.getString("category") != null) sb.append(String.format("\"category\":\"%s\",", rs.getString("category")));
				if (rs.getString("note") != null) sb.append(String.format("\"note\":\"%s\",", rs.getString("note")));
				sb.append(String.format("\"status\":%d,", rs.getInt("status")));
				switch (rs.getInt("status")) {
				case 0:
					sb.append(String.format("\"status_str\":\"Open\","));
					break;
				case 1:
					sb.append(String.format("\"status_str\":\"Request\","));
					break;
				case 2:
					sb.append(String.format("\"status_str\":\"Complete\","));
					break;
				case 3:
					sb.append(String.format("\"status_str\":\"Void\","));
					break;
				}
				if (rs.getString("counted_by") != null) sb.append(String.format("\"counted_by\":\"%s\",", rs.getString("counted_by")));
				if (rs.getString("confirmed_by") != null) sb.append(String.format("\"confirmed_by\":\"%s\",", rs.getString("confirmed_by")));
				if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
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