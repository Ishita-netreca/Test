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
		int poSid = MyRequestUtil.getInt(request, "poSid", 0);

		int receivedQty = 0;
		String vendorName = null;
		String receiverName = null;

        String subject = null;
        String content = null;
        String receiver = null;

        int sendType = 0;


		try {
		    if (storeId == null || user_sid == null || db_name == null || poSid < 1) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `a`.*,`b`.`receive_qty`,`c`.`vendor_name`,`d`.`recevier_name` FROM ("));
            query.append(String.format("SELECT * FROM `%s`.`tb_po_%s` WHERE `sid`='%d'", db_name, storeId, poSid));
            query.append(String.format(") AS `a`"));
            query.append(String.format("LEFT JOIN (SELECT `po_sid`,SUM(`receive_qty`) AS `receive_qty` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d' GROUP BY `po_sid`) AS `b` ON `a`.`sid`=`b`.`po_sid`", db_name, storeId, poSid));
            query.append(String.format("LEFT JOIN (SELECT `sid`,`vendor_name` FROM `tb_vendor`) AS `c` ON `a`.`vendor_id`=`c`.`sid`"));
            query.append(String.format("LEFT JOIN (SELECT `sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `recevier_name` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')) AS `d` ON `a`.`receiver_id`=`d`.`sid`;", db_name, storeId));

			rs = stmt.executeQuery(query.toString());

			query.delete(0, query.length());

			if(rs.next()) {
                receivedQty = rs.getInt("receive_qty");
                vendorName = rs.getString("vendor_name");
                receiverName = rs.getString("recevier_name");
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



            stmt = conn.createStatement();

			query.append(String.format("SELECT * FROM `%s`.`tb_notification_rule` WHERE `condition`='4' AND `store_id`='%s'", db_name, storeId));

            rs = stmt.executeQuery(query.toString());

            query.delete(0, query.length());

            while (rs.next()) {

                sendType = rs.getInt("send_type");

                if (sendType == 1 || sendType == 3) {
                    receiver = rs.getString("receiver_sms");
                    subject = rs.getString("subject_sms");
                    content = rs.getString("content_sms");

                    if (receiver != null && receiver.length() > 0) {
                        if (subject != null && subject.length() > 0) {
                            if (content != null && content.length() > 0) {
                                content = content.replaceAll("\\r\\n","\\\\r\\\\n");
                                subject = subject.replaceAll("\\{Qty\\}", String.format("%d",receivedQty)).replaceAll("\\{UserName\\}", receiverName).replaceAll("\\{VendorName\\}", vendorName);
                                content = content.replaceAll("\\{Qty\\}", String.format("%d",receivedQty)).replaceAll("\\{UserName\\}", receiverName).replaceAll("\\{VendorName\\}", vendorName);

                                query.append(String.format("INSERT INTO `%s`.`tb_notification_tobesent` SET `send_type`='1',`content`='%s',`subject`='%s',`receiver`='%s',`sender`='%s',`pending`='1',`store_code`='%s';", db_name, content, subject, receiver, user_sid, storeId));
                            }
                        }
                    }
                }

                receiver = null;
                subject = null;
                content = null;

                if (sendType == 2 || sendType == 3) {
                    receiver = rs.getString("receiver_email");
                    subject = rs.getString("subject_email");
                    content = rs.getString("content_email");

                    if (receiver != null && receiver.length() > 0) {
                        if (subject != null && subject.length() > 0) {
                            if (content != null && content.length() > 0) {
                                content = content.replaceAll("\\r\\n","\\\\r\\\\n");
                                subject = subject.replaceAll("\\{Qty\\}", String.format("%d",receivedQty)).replaceAll("\\{UserName\\}", receiverName).replaceAll("\\{VendorName\\}", vendorName);
                                content = content.replaceAll("\\{Qty\\}", String.format("%d",receivedQty)).replaceAll("\\{UserName\\}", receiverName).replaceAll("\\{VendorName\\}", vendorName);

                                query.append(String.format("INSERT INTO `%s`.`tb_notification_tobesent` SET `send_type`='0',`content`='%s',`subject`='%s',`receiver`='%s',`sender`='%s',`pending`='1',`store_code`='%s';", db_name, content, subject, receiver, user_sid, storeId));
                            }
                        }
                    }
                }
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