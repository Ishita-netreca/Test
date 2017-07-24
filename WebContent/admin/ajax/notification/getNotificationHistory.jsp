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
		String searchPeriodStart = MyRequestUtil.getString(request, "searchPeriodStart", null);
		String searchPeriodEnd = MyRequestUtil.getString(request, "searchPeriodEnd", null);

		try {
		    if (user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `a`.*,`b`.`emp_name` FROM ("));
            query.append(String.format("(SELECT '1' AS `sent_flag`,`sid`,`send_type`,`msg_type`,`content`,`receiver`,`sender`,`store_code`, NULL AS `reserved_date`, FROM_UNIXTIME(`sent_datetime`,'%%m/%%d/%%Y %%H:%%i:%%s') AS `sent_date`,`result_status` AS `sent_status`, '-1' AS `pending_status`,`customer_name` FROM `%s`.`tb_notification_sent`", db_name));
            if (searchPeriodStart != null && searchPeriodEnd != null) {
                query.append(String.format(" WHERE (`sent_datetime` BETWEEN UNIX_TIMESTAMP(STR_TO_DATE('%s 00:00:00','%%m/%%d/%%Y %%H:%%i:%%s')) AND UNIX_TIMESTAMP(STR_TO_DATE('%s 23:59:59','%%m/%%d/%%Y %%H:%%i:%%s')))", searchPeriodStart, searchPeriodEnd));
            } // 26 26
            query.append(String.format(") UNION ("));
            query.append(String.format("SELECT '0' AS `sent_flag`,`sid`,`send_type`,`msg_type`,`content`,`receiver`,`sender`,`store_code`,FROM_UNIXTIME(`reserved_date`,'%%m/%%d/%%Y %%H:%%i:%%s') AS `reserved_date`,NULL AS `sent_date`,'-1' AS `sent_status`, `pending` AS `pending_status`,`customer_name` FROM `%s`.`tb_notification_tobesent`", db_name));
            if (searchPeriodStart != null && searchPeriodEnd != null) {
                query.append(String.format(" WHERE (`reserved_date` BETWEEN DATE_FORMAT(STR_TO_DATE('%s','%%m/%%d/%%Y'), '%%Y-%%m-%%d') AND DATE_FORMAT(STR_TO_DATE('%s','%%m/%%d/%%Y'), '%%Y-%%m-%%d'))", searchPeriodStart, searchPeriodEnd));
            }
            query.append(String.format(")) AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,CONCAT_WS(' ', `first_name`,`middle_name`,`last_name`) AS `emp_name` FROM `wrp`.`tb_user`"));
            query.append(String.format(") AS `b` ON `a`.`sender`=`b`.`sid` ORDER BY `reserved_date` DESC, `sent_date` DESC;"));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                switch (rs.getInt("sent_flag")) {
                case 1:
                    sb.append(String.format("\"sentSid\":%d,", rs.getInt("sid")));
                    break;
                case 0:
                    sb.append(String.format("\"tobesentSid\":%d,", rs.getInt("sid")));
                    break;
                }
                sb.append(String.format("\"sendType\":%d,", rs.getInt("send_type")));
                sb.append(String.format("\"msgType\":%d,", rs.getInt("msg_type")));
                if (rs.getString("content") != null) sb.append(String.format("\"content\":\"%s\",", rs.getString("content").replaceAll("\\r\\n"," ").replaceAll("\\n"," ").trim()));
                if (rs.getString("receiver") != null) sb.append(String.format("\"receiver\":\"%s\",", rs.getString("receiver")));
                if (rs.getString("sender") != null) sb.append(String.format("\"sender\":\"%s\",", rs.getString("sender")));
                if (rs.getString("store_code") != null) sb.append(String.format("\"storeCode\":\"%s\",", rs.getString("store_code")));
                if (rs.getString("reserved_date") != null) sb.append(String.format("\"reservedDate\":\"%s\",", rs.getString("reserved_date")));
                if (rs.getString("sent_date") != null) sb.append(String.format("\"sentDate\":\"%s\",", rs.getString("sent_date")));
                sb.append(String.format("\"sentStatus\":%d,", rs.getInt("sent_status")));
                sb.append(String.format("\"pendingStatus\":%d,", rs.getInt("pending_status")));
                switch (rs.getInt("sent_flag")) {
                case 1:
                    switch (rs.getInt("sent_status")) {
                    case 1:
                        sb.append(String.format("\"status\":\"Success\","));
                        break;
                    case 0:
                        sb.append(String.format("\"status\":\"Fail\","));
                        break;
                    }
                    break;
                case 0:
                        sb.append(String.format("\"status\":\"Pending\","));
                    break;
                }
                if (rs.getString("customer_name") != null) sb.append(String.format("\"customerName\":\"%s\",", rs.getString("customer_name")));
                if (rs.getString("emp_name") != null) sb.append(String.format("\"empName\":\"%s\",", rs.getString("emp_name")));
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