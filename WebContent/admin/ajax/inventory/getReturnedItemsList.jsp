<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="org.json.simple.parser.*"%>
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
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		String invoiceNo = MyRequestUtil.getString(request, "invoiceNo", null);
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT *,DATE_FORMAT(DATE_ADD(`ad`.`date`, INTERVAL %s HOUR),'%%m/%%d/%%Y %%H:%%i:%%s') AS `return_date` FROM (",timezone_offset));
			query.append(String.format("SELECT `a`.*,`d`.`date` FROM (SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `qty` < 0) AS `a` LEFT JOIN (SELECT * FROM `%s`.`tb_invoice_%s` WHERE `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_items_%s` WHERE `subtotal` < 0)) AS `d` ON `a`.`invoice_no`=`d`.`invoice_no`", db_name, storeId, db_name, storeId, db_name, storeId));
			query.append(String.format(") AS `ad` LEFT JOIN ("));
			query.append(String.format("SELECT `b`.`sid`,`b`.`serial_no`,`c`.`item_code`,`c`.`description` FROM ("));
			query.append(String.format("SELECT * FROM `%s`.`tb_inventory_%s` WHERE `sid` IN (SELECT `inventory_sid` AS `sid` FROM `%s`.`tb_invoice_items_%s` WHERE `amount` < 0)", db_name, storeId, db_name, storeId));
			query.append(String.format(") AS `b` LEFT JOIN ("));
			query.append(String.format("SELECT * FROM `%s`.`tb_item_dict_%s`", db_name, storeId));
			query.append(String.format(") AS `c` ON `b`.`item_sid`=`c`.`sid`"));
			query.append(String.format(") AS `bc` ON `ad`.`inventory_sid`=`bc`.`sid`"));
			if (invoiceNo != null && invoiceNo.length() > 0) {
                query.append(String.format(" WHERE (`invoice_no`='%s')", invoiceNo));
            } else {
            	if(start_date != null && end_date != null) {
    				query.append(String.format(" WHERE DATE_ADD(`ad`.`date`, INTERVAL %s HOUR) BETWEEN '%s' AND '%s' ",timezone_offset, start_date, end_date));
    			}
            }
			
			query.append(String.format("ORDER BY `ad`.`date` DESC"));
			
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
			    sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                sb.append(String.format("\"invoiceNo\":%d,", rs.getInt("invoice_no")));
                if (rs.getString("serial_no") != null) sb.append(String.format("\"serialNo\":\"%s\",", rs.getString("serial_no")));
                sb.append(String.format("\"qty\":%d,", rs.getInt("qty") ));
                sb.append(String.format("\"price\":%f,", rs.getFloat("amount")));
                sb.append(String.format("\"taxRate\":%f,", rs.getFloat("tax_rate")));
                sb.append(String.format("\"subtotal\":%f,", rs.getFloat("subtotal")));
                if (rs.getString("return_date") != null) sb.append(String.format("\"returnDate\":\"%s\",", rs.getString("return_date")));
                if (rs.getString("item_code") != null) sb.append(String.format("\"itemCode\":\"%s\",", rs.getString("item_code")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
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
		sb = null;
%>