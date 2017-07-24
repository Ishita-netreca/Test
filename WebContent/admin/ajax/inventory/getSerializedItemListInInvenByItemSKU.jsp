<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String sku = MyRequestUtil.getString(request, "sku", null);

		try {
		    if (storeId == null || sku == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

            query.append(String.format("SELECT `ab`.*,`c`.`vendor_name`,`d`.`user_name` FROM ("));
            query.append(String.format("SELECT `a`.*,`b`.`po_id`,`b`.`vendor_id` FROM ("));
            query.append(String.format("SELECT `sid`,`po_sid`,`item_sid`,`serial_no`,`qty`,DATE_FORMAT(`update_date`,'%%m/%%d/%%Y') AS `update_date`,`updater` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku` IN ('%s'))", db_name, storeId, db_name, storeId, sku));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,`po_id`,`vendor_id` FROM `%s`.`tb_po_%s`", db_name, storeId));
            query.append(String.format(") AS `b` ON `a`.`po_sid`=`b`.`sid`"));
            query.append(String.format(") AS `ab`"));
            query.append(String.format("LEFT JOIN (SELECT `sid`,`vendor_name` FROM `%s`.`tb_vendor`) AS `c` ON `ab`.`vendor_id`=`c`.`sid`", db_name));
            query.append(String.format("LEFT JOIN (SELECT `sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user`) AS `d` ON `ab`.`updater`=`d`.`sid`"));

			stmt = conn.createStatement();

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
		    	sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                sb.append(String.format("\"poSid\":%d,", rs.getInt("po_sid")));
                sb.append(String.format("\"itemSid\":%d,", rs.getInt("item_sid")));
                if (rs.getString("serial_no") != null) sb.append(String.format("\"serialNo\":\"%s\",", rs.getString("serial_no")));
                sb.append(String.format("\"qty\":%d,", rs.getInt("qty")));
                if (rs.getString("update_date") != null) sb.append(String.format("\"updateDate\":\"%s\",", rs.getString("update_date")));
                if (rs.getString("vendor_name") != null) sb.append(String.format("\"vendorName\":\"%s\",", rs.getString("vendor_name")));
                if (rs.getString("user_name") != null) sb.append(String.format("\"userName\":\"%s\",", rs.getString("user_name")));
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