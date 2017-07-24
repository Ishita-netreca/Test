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
		int audit_sid = MyRequestUtil.getInt(request, "audit_sid", 0);
		String sku = MyRequestUtil.getString(request, "sku", null);

		try {
		    if (storeId == null || sku == null || audit_sid < 1|| db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("("));
			query.append(String.format(" SELECT `sid`,`audit_sid`,`item_sid`,IF(`inventory_sid` > 0, `inventory_sid`, 0) AS `inventory_sid`,`serial_no`,`scanned_serial_no` FROM `%s`.`tb_audit_items_%s`", db_name, storeId));
			query.append(String.format(" WHERE `audit_sid` IN ('%d') AND", audit_sid));
			query.append(String.format(" `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku` IN ('%s'))", db_name, storeId, sku));
			query.append(String.format(" ) UNION ("));
			query.append(String.format(" SELECT '0' AS `sid`,'%d' AS `audit_sid`,`item_sid`,`sid` AS `inventory_sid`,`serial_no`, NULL AS `scanned_serial_no` FROM `%s`.`tb_inventory_%s`", audit_sid, db_name, storeId));
			query.append(String.format(" WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku` IN ('%s'))", db_name, storeId, sku));
			query.append(String.format(" AND `serial_no` NOT IN (SELECT `serial_no` FROM `%s`.`tb_audit_items_%s` WHERE `serial_no` IS NOT NULL AND `audit_sid` IN ('%d') AND `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku` IN ('%s')))", db_name, storeId, audit_sid, db_name, storeId, sku));
			query.append(String.format(" )"));

			rs = stmt.executeQuery(query.toString());
			
			query.delete(0, query.length());

			sb.append("{\"data\":[");

			while(rs.next()) {
				if (rs.getString("serial_no") != null) {
					sb.append("{");
					sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
					sb.append(String.format("\"audit_sid\":%d,", rs.getInt("audit_sid")));
					sb.append(String.format("\"item_sid\":%d,", rs.getInt("item_sid")));
					sb.append(String.format("\"inventory_sid\":%d,", rs.getInt("inventory_sid")));
					if (rs.getString("serial_no") != null) sb.append(String.format("\"serial_no\":\"%s\",", rs.getString("serial_no")));
					if (rs.getString("scanned_serial_no") != null) sb.append(String.format("\"scanned_serial_no\":\"%s\",", rs.getString("scanned_serial_no")));
					if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
					sb.append("},");
				} else {
					query.append("{");
					query.append(String.format("\"sid\":%d,", rs.getInt("sid")));
					query.append(String.format("\"audit_sid\":%d,", rs.getInt("audit_sid")));
					query.append(String.format("\"item_sid\":%d,", rs.getInt("item_sid")));
					query.append(String.format("\"inventory_sid\":%d,", rs.getInt("inventory_sid")));
					if (rs.getString("serial_no") != null) query.append(String.format("\"serial_no\":\"%s\",", rs.getString("serial_no")));
					if (rs.getString("scanned_serial_no") != null) query.append(String.format("\"scanned_serial_no\":\"%s\",", rs.getString("scanned_serial_no")));
					if (query.length() > 0 && query.lastIndexOf(",") == query.length() -1 ) query.deleteCharAt(query.length() -1);
					query.append("},");
				}
			}
			sb.append(query.toString());
			
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