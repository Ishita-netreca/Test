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
		int notificationRuleSid = MyRequestUtil.getInt(request, "notificationRuleSid", -1);

		String description = MyRequestUtil.getString(request, "description", null);
		int condition = MyRequestUtil.getInt(request, "condition", 1);
		int sendType = MyRequestUtil.getInt(request, "sendType", 0);
		String receiverSms = MyRequestUtil.getString(request, "receiverSms", null);
		String receiverEmail = MyRequestUtil.getString(request, "receiverEmail", null);
		String subjectSms = MyRequestUtil.getString(request, "subjectSms", null);
		String subjectEmail = MyRequestUtil.getString(request, "subjectEmail", null);
		String contentSms = MyRequestUtil.getString(request, "contentSms", null);
		String contentEmail = MyRequestUtil.getString(request, "contentEmail", null);

		try {
		    if (storeId == null || user_sid == null || db_name == null || notificationRuleSid < 0 || description == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			if (notificationRuleSid > 0) {
			    query.append(String.format("UPDATE `%s`.`tb_notification_rule` SET `description`='%s',`condition`='%d',`store_id`='%s',`send_type`='%d',`receiver_sms`='%s',`receiver_email`='%s',`subject_sms`='%s',`subject_email`='%s',`content_sms`='%s',`content_email`='%s' WHERE `sid`='%d'",
			    		db_name, description,   condition,            storeId,            sendType,              receiverSms,             receiverEmail,          subjectSms,         subjectEmail,           contentSms,          contentEmail,          notificationRuleSid
			    ));
			} else {
			    query.append(String.format("INSERT INTO `%s`.`tb_notification_rule` SET `description`='%s',`condition`='%d',`store_id`='%s',`send_type`='%d',`receiver_sms`='%s',`receiver_email`='%s',`subject_sms`='%s',`subject_email`='%s',`content_sms`='%s',`content_email`='%s'",
			    		db_name, description,   condition,            storeId,            sendType,              receiverSms,             receiverEmail,          subjectSms,         subjectEmail,           contentSms,          contentEmail
			    ));
			}

			stmt.execute(query.toString());

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

            out.print(0);

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

            out.print(-1);
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		query = null;
		sb = null;
%>