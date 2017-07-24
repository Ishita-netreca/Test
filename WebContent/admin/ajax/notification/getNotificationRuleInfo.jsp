<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int notificationRuleSid = MyRequestUtil.getInt(request, "notificationRuleSid", 0);

		try {
		    if (storeId == null || user_sid == null || db_name == null || notificationRuleSid < 1) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT * FROM `%s`.`tb_notification_rule` WHERE `store_id`='%s' AND `sid`='%d'", db_name, storeId, notificationRuleSid));

			rs = stmt.executeQuery(query.toString());

			if(rs.next()) {
			    sb.append("{\"data\":{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
                sb.append(String.format("\"condition\":%d,", rs.getInt("condition")));
                if (rs.getString("store_id") != null) sb.append(String.format("\"storeId\":\"%s\",", rs.getString("store_id")));
                sb.append(String.format("\"sendType\":%d,", rs.getInt("send_type")));
                if (rs.getString("receiver_sms") != null) sb.append(String.format("\"receiverSms\":\"%s\",", rs.getString("receiver_sms")));
                if (rs.getString("receiver_email") != null) sb.append(String.format("\"receiverEmail\":\"%s\",", rs.getString("receiver_email")));
                if (rs.getString("subject_sms") != null) sb.append(String.format("\"subjectSms\":\"%s\",", rs.getString("subject_sms").replaceAll("\\n","\\\\n")));
                if (rs.getString("content_sms") != null) sb.append(String.format("\"contentSms\":\"%s\",", rs.getString("content_sms").replaceAll("\\n","\\\\n")));
                if (rs.getString("subject_email") != null) sb.append(String.format("\"subjectEmail\":\"%s\",", rs.getString("subject_email").replaceAll("\\n","\\\\n")));
                if (rs.getString("content_email") != null) sb.append(String.format("\"contentEmail\":\"%s\",", rs.getString("content_email").replaceAll("\\n","\\\\n")));
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