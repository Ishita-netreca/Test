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
		
		int categorySid = MyRequestUtil.getInt(request, "categorySid", 0);
		int subCategorySid = MyRequestUtil.getInt(request, "subCategorySid", 0);
		int empSid = MyRequestUtil.getInt(request, "empSid", 0);
		int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `a`.`invoice_no`,`a`.`name` AS `description`,`a`.`serial_no`,`a`.`qty`,`a`.`discount`,`a`.`amount`,TRUNCATE(`a`.`tax_rate`*`a`.`amount`,2) AS `tax_amnt`,`a`.`subtotal`,"));
			query.append(String.format(" `c`.`item_code`,`c`.`item_cost`,IF(`e`.`cust_name` IS NULL OR `e`.`cust_name` = -1, 'GUEST', `e`.`cust_name`) AS `cust_name`,`f`.`emp_name`,`g`.`category`,`h`.`sub_category` FROM ("));
			query.append(String.format(" SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `inventory_sid` > 0 AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name,storeId, db_name,storeId));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND ( DATE_FORMAT(`date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			if (customerSid > 0) {
				query.append(String.format(" AND `customer` IN ('%d')", customerSid));
			}
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d')", empSid));
			}
			query.append(String.format(") ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_sid` FROM `%s`.`tb_inventory_%s`) AS `b` ON `a`.`inventory_sid`=`b`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_code`,`category` AS `_category`, `sub_category` AS `_sub_category`,`item_cost` FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, storeId));
			if (categorySid > 0) {
				query.append(String.format(" AND `category` IN ('%d')", categorySid));
			}
			if (subCategorySid > 0) {
				query.append(String.format(" AND `sub_category` IN ('%d')", subCategorySid));
			}
			query.append(String.format(" ) AS `c` ON `b`.`item_sid`=`c`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `invoice_no`,`customer`,`emp_id` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name, storeId));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND ( DATE_FORMAT(`date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			if (customerSid > 0) {
				query.append(String.format(" AND `customer` IN ('%d')", customerSid));
			}
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d')", empSid));
			}
			query.append(String.format(" ) AS `d` ON `a`.`invoice_no`=`d`.`invoice_no`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `cust_name` FROM `%s`.`tb_customer_%s`", db_name, storeId));
			if (customerSid > 0) {
				query.append(String.format(" AND `sid` IN ('%d')", customerSid));
			}
			query.append(String.format(" ) AS `e` ON `d`.`customer`=`e`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `emp_name` FROM `wrp`.`tb_user`"));
			query.append(String.format(" WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id` IN ('%s') )", db_name, storeId));
			if (empSid > 0) {
				query.append(String.format(" AND `sid` IN ('%d')", empSid));
			}
			query.append(String.format(" ) AS `f` ON `d`.`emp_id`=`f`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`='0') AS `g` ON `c`.`_category`=`g`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`>'0') AS `h` ON `c`.`_sub_category`=`h`.`sid`", db_name, storeId));
			query.append(String.format(" WHERE `item_code` IS NOT NULL ORDER BY `category`,`sub_category`"));

			rs = stmt.executeQuery(query.toString());
			
			query.delete(0, query.length());

			sb.append("{\"data\":[");

			while(rs.next()) {
				if (rs.getString("category") == null) {
					query.append("{");
					query.append(String.format("\"invoice_no\":%d,", rs.getInt("invoice_no")));
					if (rs.getString("description") != null) query.append(String.format("\"description\":\"%s\",", rs.getString("description")));
					if (rs.getString("serial_no") != null) query.append(String.format("\"serial_no\":\"%s\",", rs.getString("serial_no")));
					query.append(String.format("\"qty\":%d,", rs.getInt("qty")));
					query.append(String.format("\"discount\":%f,", rs.getFloat("discount")));
					query.append(String.format("\"amount\":%f,", rs.getFloat("amount")));
					query.append(String.format("\"tax_amnt\":%f,", rs.getFloat("tax_amnt")));
					query.append(String.format("\"subtotal\":%f,", rs.getFloat("subtotal")));
					if (rs.getString("item_code") != null) query.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
					query.append(String.format("\"item_cost\":%f,", rs.getFloat("item_cost")));
					if (rs.getString("cust_name") != null) query.append(String.format("\"cust_name\":\"%s\",", rs.getString("cust_name")));
					if (rs.getString("emp_name") != null) query.append(String.format("\"emp_name\":\"%s\",", rs.getString("emp_name")));
					if (query.length() > 0 && query.lastIndexOf(",") == query.length() -1 ) query.deleteCharAt(query.length() -1);
					query.append("},");
				} else {
					sb.append("{");
					sb.append(String.format("\"invoice_no\":%d,", rs.getInt("invoice_no")));
					if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
					if (rs.getString("serial_no") != null) sb.append(String.format("\"serial_no\":\"%s\",", rs.getString("serial_no")));
					sb.append(String.format("\"qty\":%d,", rs.getInt("qty")));
					sb.append(String.format("\"discount\":%f,", rs.getFloat("discount")));
					sb.append(String.format("\"amount\":%f,", rs.getFloat("amount")));
					sb.append(String.format("\"tax_amnt\":%f,", rs.getFloat("tax_amnt")));
					sb.append(String.format("\"subtotal\":%f,", rs.getFloat("subtotal")));
					if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
					sb.append(String.format("\"item_cost\":%f,", rs.getFloat("item_cost")));
					if (rs.getString("cust_name") != null) sb.append(String.format("\"cust_name\":\"%s\",", rs.getString("cust_name")));
					if (rs.getString("emp_name") != null) sb.append(String.format("\"emp_name\":\"%s\",", rs.getString("emp_name")));
					if (rs.getString("category") != null) sb.append(String.format("\"category\":\"%s\",", rs.getString("category")));
					if (rs.getString("sub_category") != null) sb.append(String.format("\"sub_category\":\"%s\",", rs.getString("sub_category")));
					if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
					sb.append("},");
				}
			}
			
			sb.append(query.toString());
			query.delete(0, query.length());

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