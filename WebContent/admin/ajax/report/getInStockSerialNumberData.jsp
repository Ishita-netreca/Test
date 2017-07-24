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

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `a`.*,`b`.`item_code`,`b`.`description`,`b`.`item_cost`,`c`.`po_id`,DATE_FORMAT(`c`.`receive_date`,'%%m/%%d/%%Y %%H:%%i:%%s') AS `po_recv_date`,`d`.`vendor_name`,`e`.`trans_id`,`e`.`trans_id`,DATE_FORMAT(`e`.`recv_date`,'%%m/%%d/%%Y %%H:%%i:%%s') AS `trans_recv_date`,`e`.`from_store_id`,`f`.`user_name` FROM ("));
			query.append(String.format("SELECT * FROM `%s`.`tb_inventory_%s` WHERE `qty` > 0 AND `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0','1','2')) ", db_name, storeId, db_name, storeId));
			query.append(String.format(") AS `a`"));
			query.append(String.format("LEFT JOIN (SELECT `sid` AS `item_sid`,`item_code`,`description`,`item_cost` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0','1','2') ) AS `b` ON `a`.`item_sid`=`b`.`item_sid`", db_name, storeId));
			query.append(String.format("LEFT JOIN (SELECT `sid` AS `po_sid`,`po_id`,`vendor_id`,`receive_date` FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, storeId));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND (DATE_FORMAT(`receive_date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s')", startDate, endDate));
			}			
			query.append(String.format(") AS `c` ON `a`.`po_sid`=`c`.`po_sid`"));
			query.append(String.format("LEFT JOIN (SELECT `sid` AS `vendor_sid`,`vendor_name` FROM `tb_vendor`) AS `d` ON `c`.`vendor_id`=`d`.`vendor_sid`"));
			query.append(String.format("LEFT JOIN (SELECT `sid` AS `trans_sid`,`trans_id`,`recv_date`,`from_store_id` FROM `%s`.`tb_inventory_trans_%s` WHERE `to_store_id`='%s'", db_name, db_name, storeId));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format("AND (DATE_FORMAT(`recv_date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s')", startDate, endDate));
			}			
			query.append(String.format(") AS `e` ON `a`.`trans_sid`=`e`.`trans_sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid` AS `user_sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s') ) AS `f` ON `a`.`updater`=`f`.`user_sid`", db_name, storeId));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" WHERE `c`.`receive_date` IS NOT NULL OR `e`.`recv_date` IS NOT NULL"));
			}
			query.append(String.format(" ORDER BY `item_code`;"));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
				if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
				if (rs.getString("serial_no") != null) sb.append(String.format("\"serial_no\":\"%s\",", rs.getString("serial_no")));
				if (rs.getString("po_recv_date") != null) sb.append(String.format("\"po_recv_date\":\"%s\",", rs.getString("po_recv_date")));
				if (rs.getString("trans_recv_date") != null) sb.append(String.format("\"trans_recv_date\":\"%s\",", rs.getString("trans_recv_date")));
				if (rs.getString("user_name") != null) sb.append(String.format("\"user_name\":\"%s\",", rs.getString("user_name")));
				sb.append(String.format("\"item_cost\":%f,", rs.getFloat("item_cost")));
				if (rs.getString("po_id") != null) sb.append(String.format("\"po_id\":\"%s\",", rs.getString("po_id")));
				if (rs.getString("trans_id") != null) sb.append(String.format("\"trans_id\":\"%s\",", rs.getString("trans_id")));
				if (rs.getString("vendor_name") != null) sb.append(String.format("\"vendor_name\":\"%s\",", rs.getString("vendor_name")));
				if (rs.getString("from_store_id") != null) sb.append(String.format("\"from_store_id\":\"%s\",", rs.getString("from_store_id")));
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