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

		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		
		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `a`.*, `b`.`amount`,`b`.`transaction_type` AS `_transaction_type`,`c`.`description`,`d`.`item_sid` FROM ("));
			query.append(String.format("SELECT `invoice_no`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `_date`,TIME_FORMAT(`date`,'%%H:%%i:%%s') AS `_time` FROM `%s`.`tb_invoice_%s` WHERE ", db_name, storeId));
			
			query.append(String.format("`date` BETWEEN '%s' AND '%s' AND ", start_date, end_date));
			
			query.append(String.format("`invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN ('0','1','2','3','4','5','6','7','12','13','14') )", db_name, storeId)); 
			query.append(String.format(") AS `a`"));
			query.append(String.format("LEFT JOIN (SELECT `invoice_no`,SUM(`subtotal`) AS `amount`,`transaction_type`,`inventory_sid` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN ('0','1','2','3','4','5','6','7','12','13','14') GROUP BY `invoice_no`) AS `b` ON `a`.`invoice_no`=`b`.`invoice_no`", db_name, storeId));
			query.append(String.format("LEFT JOIN (SELECT `invoice_no`,`name` AS `description` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN ('0','1','2','3','4','5','6','7','12','13','14') AND (( `serial_no` IS NOT NULL AND `serial_no` != '' ))) AS `c` ON `a`.`invoice_no`=`c`.`invoice_no`", db_name, storeId));
			query.append(String.format("LEFT JOIN (SELECT `sid`,`item_sid` FROM `%s`.`tb_inventory_%s` WHERE `sid` IN (SELECT `inventory_sid` AS `sid` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN ('0','1','2','3','4','5','6','7','12','13','14'))) AS `d` ON `b`.`inventory_sid`=`d`.`sid`", db_name, storeId, db_name, storeId));
		
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");
			int i = 0;
			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"id\":%d,",i++));
				sb.append(String.format("\"available\":true,"));
				sb.append(String.format("\"invoiceNo\":%d,",rs.getInt("invoice_no")));
				if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",",rs.getString("description")));
				else sb.append(String.format("\"description\":\"\","));
				if (rs.getString("_date") != null) sb.append(String.format("\"_date\":\"%s\",",rs.getString("_date")));
				if (rs.getString("_time") != null) sb.append(String.format("\"_time\":\"%s\",",rs.getString("_time")));
				sb.append(String.format("\"amount\":%f,",rs.getFloat("amount")));
				switch (rs.getInt("_transaction_type")) {
				case 0:
				case 4:
					sb.append(String.format("\"transactiontype\":\"New Activation\","));
					break;
				case 1:
				case 5:
					sb.append(String.format("\"transactiontype\":\"Re Activation\","));
					break;
				case 2:
				case 6:
					sb.append(String.format("\"transactiontype\":\"Upgrade\","));
					break;
				case 3:
				case 7:
					sb.append(String.format("\"transactiontype\":\"Port-In\","));
					break;
				case 12:
				case 13:
					sb.append(String.format("\"transactiontype\":\"Add-A-Line\","));
					break;
				case 14:
					sb.append(String.format("\"transactiontype\":\"SOR\","));
					break;
				default:
					sb.append(String.format("\"transactiontype\":\"\","));
					break;
				}
				sb.append(String.format("\"itemSid\":%d,",rs.getInt("item_sid")));
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