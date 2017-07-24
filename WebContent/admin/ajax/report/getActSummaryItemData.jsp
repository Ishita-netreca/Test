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
		
		String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);
		
		int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
		int empSid = MyRequestUtil.getInt(request, "empSid", 0);
		int itemSid = MyRequestUtil.getInt(request, "itemSid", 0);
		
		int total = 0;

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
		    
		    if (customerSid < 0) customerSid = 0;
		    if (empSid < 0) empSid = 0;
		    if (itemSid < 0) itemSid = 0;

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `a`.*,`c`.`item_code`,`c`.`description` FROM ("));
			query.append(String.format(" SELECT `invoice_no`, `inventory_sid`, `transaction_type`, COUNT(`sid`) AS `act_count` FROM `%s`.`tb_invoice_items_%s` ", db_name, storeId));
			query.append(String.format(" WHERE `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE ", db_name, storeId));
			query.append(String.format(" `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0)", db_name, storeId));
			if (itemSid > 0) {
				query.append(String.format(" AND `sid` IN ('%d')", itemSid));
			}
			query.append(String.format(" ) "));
			query.append(String.format(" )"));
			query.append(String.format(" AND `transaction_type` IN ('0','1','2','4','5','6','12','13')"));
			query.append(String.format(" AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name, storeId));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND ( DATE_FORMAT(`date`, '%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			if (customerSid > 0) {
				query.append(String.format(" AND `customer` IN ('%d')", customerSid));
			}
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d')", empSid));
			}
			query.append(String.format(" )"));
			query.append(String.format(" GROUP BY `transaction_type`,`inventory_sid`"));
			query.append(String.format(" ORDER BY `inventory_sid`"));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_sid` FROM `%s`.`tb_inventory_%s` WHERE ", db_name, storeId));
			query.append(String.format(" `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0))", db_name, storeId));
			query.append(String.format(" ) AS `b` ON `a`.`inventory_sid`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_code`,`description` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0)", db_name, storeId));
			if (itemSid > 0) {
				query.append(String.format(" AND `sid` IN ('%d')", itemSid));
			}
			query.append(String.format(" ) AS `c` ON `b`.`item_sid`=`c`.`sid`"));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"invoice_no\":%d,", rs.getInt("invoice_no")));
				sb.append(String.format("\"transaction_type\":%d,", rs.getInt("transaction_type")));
				switch (rs.getInt("transaction_type")) {
				case 0:
					sb.append(String.format("\"transaction\":\"New Activation\","));
					break;
				case 1:
					sb.append(String.format("\"transaction\":\"Re Activation\","));
					break;
				case 2:
					sb.append(String.format("\"transaction\":\"Upgrade\","));
					break;
				case 4:
					sb.append(String.format("\"transaction\":\"New Activation\","));
					break;
				case 5:
					sb.append(String.format("\"transaction\":\"Re Activation\","));
					break;
				case 6:
					sb.append(String.format("\"transaction\":\"Upgrade\","));
					break;
				case 12:
					sb.append(String.format("\"transaction\":\"Add-A-Line\","));
					break;
				case 13:
					sb.append(String.format("\"transaction\":\"Add-A-Line\","));
					break;
				}
				sb.append(String.format("\"act_count\":%d,", rs.getInt("act_count")));
				if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
				if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
				if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
				sb.append("},");
				
				total = total + rs.getInt("act_count");
			}

			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);

			sb.append(String.format("],\"total\":%d}", total));

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