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

		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `ab`.*,`c`.`category`,`d`.`sub_category` FROM ("));
            query.append(String.format("SELECT `a`.*,`b`.`item_code`,`b`.`description`,`b`.`sku`,`b`.`_category`,`b`.`_sub_category` FROM ("));
            query.append(String.format("SELECT `sid`,`item_sid`,`serial_no`,`qty` FROM `%s`.`tb_inventory_%s` WHERE `qty` > 0", db_name, storeId));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,`item_code`,`description`,`sku`,`category` AS `_category`,`sub_category` AS `_sub_category` FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (SELECT `item_sid` FROM `%s`.`tb_inventory_%s`)", db_name, storeId, db_name, storeId));
            query.append(String.format(") AS `b` ON `a`.`item_sid`=`b`.`sid`"));
            query.append(String.format(") AS `ab`"));
            query.append(String.format("LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`='0') AS `c` ON `ab`.`_category`=`c`.`sid`", db_name, storeId));
            query.append(String.format("LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid` > '0') AS `d` ON `ab`.`_sub_category`=`d`.`sid`", db_name, storeId));

			rs = stmt.executeQuery(query.toString());


			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                sb.append(String.format("\"itemSid\":%d,", rs.getInt("item_sid")));
                if (rs.getString("serial_no") != null) sb.append(String.format("\"serialNo\":\"%s\",", rs.getString("serial_no")));
                sb.append(String.format("\"qty\":%d,", rs.getInt("qty")));
                if (rs.getString("item_code") != null) sb.append(String.format("\"itemCode\":\"%s\",", rs.getString("item_code")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
                if (rs.getString("sku") != null) sb.append(String.format("\"sku\":\"%s\",", rs.getString("sku")));
                if (rs.getString("category") != null) sb.append(String.format("\"category\":\"%s\",", rs.getString("category")));
                else sb.append(String.format("\"category\":\"\","));
                if (rs.getString("sub_category") != null) sb.append(String.format("\"subCategory\":\"%s\",", rs.getString("sub_category")));
                else sb.append(String.format("\"subCategory\":\"\","));
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