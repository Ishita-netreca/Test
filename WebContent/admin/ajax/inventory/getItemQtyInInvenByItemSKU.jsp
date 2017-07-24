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

            query.append(String.format("SELECT `a`.*, `b`.`qty` FROM ("));
            query.append(String.format("SELECT `sid` AS `item_sid`,`item_code`,`model`,`description`,`sku`,`item_type` FROM `%s`.`tb_item_dict_%s` WHERE `sku`='%s'", db_name, storeId, sku));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `item_sid`, SUM(`qty`) AS `qty` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku`='%s') GROUP BY `item_sid`", db_name, storeId, db_name, storeId, sku));
            query.append(String.format(") AS `b` ON `a`.`item_sid`=`b`.`item_sid`"));

			stmt = conn.createStatement();

			rs = stmt.executeQuery(query.toString());

			if(rs.next()) {

			    sb.append("{\"data\":{");
                sb.append(String.format("\"itemSid\":%d,", rs.getInt("item_sid")));
                if (rs.getString("item_code") != null) sb.append(String.format("\"itemCode\":\"%s\",", rs.getString("item_code")));
                if (rs.getString("model") != null) sb.append(String.format("\"model\":\"%s\",", rs.getString("model")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
                if (rs.getString("sku") != null) sb.append(String.format("\"sku\":\"%s\",", rs.getString("sku")));
                sb.append(String.format("\"itemType\":%d,", rs.getInt("item_type")));
                sb.append(String.format("\"qty\":%d,", rs.getInt("qty")));
		    	if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
		    	sb.append("}}");
			} else {
			    sb.append("{\"data\":null}");
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