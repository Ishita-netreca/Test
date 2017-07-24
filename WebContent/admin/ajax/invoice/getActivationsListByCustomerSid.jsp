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

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
		String transactionType = MyRequestUtil.getString(request, "transactionType", null); // Comma(,)로 구분
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

		try {
		    if (storeId == null || customerSid < 1 || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `a`.`invoice_no`,`a`.`date`,`a`.`amount`,`a`.`tax`,`b`.`emp_id` FROM"));
			query.append(String.format(" (SELECT * FROM `%s`.`tb_invoice_%s` WHERE", db_name, storeId));
			if (transactionType != null && transactionType.length() > 0) query.append(String.format(" `invoice_no` IN (SELECT DISTINCT `invoice_no` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN (%s)) AND `customer`='%d'", db_name, storeId, transactionType, customerSid));
			else  query.append(String.format(" `customer`='%d'", customerSid));
			query.append(String.format(") AS `a` LEFT JOIN (SELECT `sid`,`user_id` AS `emp_id` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')) AS `b` ON `a`.`emp_id`=`b`.`sid` ORDER BY `date` DESC", db_name, storeId));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append(String.format("{\"invoiceNo\":%d,\"amount\":%s,\"tax\":%s,\"date\":\"%s\",\"empId\":\"%s\"},",
                    rs.getInt("invoice_no"),
                     (rs.getString("amount") != null)? rs.getString("amount") : "",
                     (rs.getString("tax") != null)? rs.getString("tax") : "",
                     (rs.getString("date") != null)? sdf.format(rs.getTimestamp("date")) : "",
                     (rs.getString("emp_id") != null)? rs.getString("emp_id") : "GUEST"
                ));
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
		sb = null;
%>