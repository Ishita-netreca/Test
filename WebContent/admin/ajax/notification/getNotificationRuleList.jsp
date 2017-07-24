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

			query.append(String.format("SELECT * FROM `%s`.`tb_notification_rule` WHERE `store_id`='%s'", db_name, storeId));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
                sb.append(String.format("\"condition\":%d,", rs.getInt("condition")));
                switch (rs.getInt("condition")) {
                case 1:
                    sb.append(String.format("\"conditionStr\":\"Activation\","));
                    break;
                case 2:
                    sb.append(String.format("\"conditionStr\":\"EOD\","));
                    break;
                case 3:
                    sb.append(String.format("\"conditionStr\":\"Return\","));
                    break;
                case 4:
                    sb.append(String.format("\"conditionStr\":\"PO Receive\","));
                    break;
                }
                if (rs.getString("store_id") != null) sb.append(String.format("\"storeId\":\"%s\",", rs.getString("store_id")));
                sb.append(String.format("\"sendType\":%d,", rs.getInt("send_type")));
                switch (rs.getInt("send_type")) {
                case 0:
                    sb.append(String.format("\"sendTypeStr\":\"Don't send\","));
                    break;
                case 1:
                    sb.append(String.format("\"sendTypeStr\":\"SMS Only\","));
                    break;
                case 2:
                    sb.append(String.format("\"sendTypeStr\":\"E-Mail Only\","));
                    break;
                case 3:
                    sb.append(String.format("\"sendTypeStr\":\"Both\","));
                    break;
                }
                if (rs.getString("receiver_sms") != null) sb.append(String.format("\"receiverSms\":\"%s\",", rs.getString("receiver_sms")));
                if (rs.getString("receiver_email") != null) sb.append(String.format("\"receiverEmail\":\"%s\",", rs.getString("receiver_email")));
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