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

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
		    
		    if (customerSid < 1) customerSid = 0;
		    if (empSid < 1) empSid = 0;

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT SUM(`a`.`qty`) AS `qty`,SUM(`a`.`amount`) AS `price`, SUM(`a`.`tax_amount`) AS `tax_amount`, SUM(`a`.`discount`) AS `discount`, SUM(`a`.`subtotal`) AS `subtotal`,`c`.`_sub_category`,IF(`e`.`sub_category` IS NULL, 'etc.', `e`.`sub_category`) AS `sub_category` FROM ("));
			query.append(String.format(" SELECT `sid`,`inventory_sid`,`qty`,`amount`,( ( `amount` * `tax_rate` ) * `qty` ) AS `tax_amount`,`discount`,`subtotal` FROM `%s`.`tb_invoice_items_%s` ", db_name, storeId));
			query.append(String.format(" WHERE `item_type` IN ('0') "));
			query.append(String.format(" AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1 ", db_name, storeId));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0){
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y')) ", startDate, endDate));
			}
			if (customerSid > 0) {
				query.append(String.format(" AND `customer`='%d'", customerSid));
			}
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id`='%d'", empSid));
			}
					
			query.append(String.format(") "));
			query.append(String.format(") AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_sid` FROM `%s`.`tb_inventory_%s`) AS `b` ON `a`.`inventory_sid`=`b`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid` AS `item_sid`,`category` AS `_category`,`sub_category` AS `_sub_category` FROM `%s`.`tb_item_dict_%s`) AS `c` ON `b`.`item_sid`=`c`.`item_sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`='0') AS `d` ON `c`.`_category`=`d`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`>'0') AS `e` ON `c`.`_sub_category`=`e`.`sid`", db_name, storeId));
			query.append(String.format(" WHERE `c`.`item_sid` IS NOT NULL"));
			query.append(String.format(" GROUP BY `_sub_category`"));	
			
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"qty\":%d,", rs.getInt("qty")));
				sb.append(String.format("\"price\":%f,", rs.getFloat("price")));
				sb.append(String.format("\"tax_amount\":%f,", rs.getFloat("tax_amount")));
				sb.append(String.format("\"discount\":%f,", rs.getFloat("discount")));
				sb.append(String.format("\"subtotal\":%f,", rs.getFloat("subtotal")));
				sb.append(String.format("\"_sub_category\":%d,", rs.getInt("_sub_category")));
				if (rs.getString("sub_category") != null) sb.append(String.format("\"sub_category\":\"%s\",", rs.getString("sub_category")));
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