<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

		String storeId = MyRequestUtil.getString(request, "storeId", null);
        int userSid = MyRequestUtil.getInt(request, "userSid", 0);
        String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);
		
		try {
		    if (storeId == null || db_name == null || startDate == null || endDate == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append("SELECT `a`.`invoice_no`,`a`.`amount`,`a`.`tax`,`a`.`date`,`a`.`emp_id`,`b`.`customer_id`,`c`.`cash`,`c`.`credit`,`c`.`loan`,`c`.`check`,`c`.`creditmemo` FROM (");
			if (userSid > 0) {
			    query.append(String.format("SELECT * FROM `%s`.`tb_invoice_%s` WHERE `emp_id`='%d'", db_name, storeId, userSid));
			} else {
			    query.append(String.format("SELECT * FROM `%s`.`tb_invoice_%s`", db_name, storeId));
			}
			query.append(") AS `a`");
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`customer_id` FROM `%s`.`tb_customer_%s`) AS `b`", db_name, storeId));
			query.append(String.format(" ON `a`.`customer`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `invoice_no`,IF(`type`=0,`amount`,0) AS `cash`,IF(`type`=1,`amount`,0) AS `credit_card`,IF(`type`=1,`amount`,0) AS `credit`,"));
            query.append(String.format("IF(`type`=3,`amount`,0) AS `loan`,IF(`type`=4,`amount`,0) AS `check`,IF(`type`=5,`amount`,0) AS `creditmemo` "));
            query.append(String.format("FROM `%s`.`tb_checkout_items_%s`) AS `c` ON `a`.`invoice_no` = `c`.`invoice_no`", db_name, storeId));
			
            if (startDate != null && endDate != null) {
            	query.append(String.format(" WHERE (`date` BETWEEN '%s' AND '%s')", startDate, endDate));
			}

			query.append(" ORDER BY `date` DESC");
			rs = stmt.executeQuery(query.toString());

            sb.append("{\"data\":[");
            while (rs.next()) {
                sb.append(String.format("{\"invoiceNo\":%d,\"amount\":%s,\"tax\":%s,\"date\":\"%s\",\"customerId\":\"%s\",\"cash\":\"%s\",\"credit\":\"%s\",\"loan\":\"%s\",\"check\":\"%s\",\"creditmemo\":\"%s\"},",
                    rs.getInt("invoice_no"),
                     (rs.getString("amount") != null)? rs.getString("amount") : "",
                     (rs.getString("tax") != null)? rs.getString("tax") : "",
                     (rs.getString("date") != null)? sdf.format(rs.getTimestamp("date")) : "",
                     (rs.getString("customer_id") != null)? rs.getString("customer_id") : "GUEST",
                     (rs.getString("cash") != null)? rs.getString("cash") : "",
                     (rs.getString("credit") != null)? rs.getString("credit") : "",
                     (rs.getString("loan") != null)? rs.getString("loan") : "",
                     (rs.getString("check") != null)? rs.getString("check") : "",
                     (rs.getString("creditmemo") != null)? rs.getString("creditmemo") : ""
                ));
            }

            if (sb.lastIndexOf(",") == sb.length() -1) sb.deleteCharAt(sb.length() -1);

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

		sdf = null;

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>