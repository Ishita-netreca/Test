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
		String serialNo = MyRequestUtil.getString(request, "serialNo", null);
		String sku = MyRequestUtil.getString(request, "sku", null);

		try {
		    if (storeId == null || serialNo == null || sku == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

            query.append(String.format("SELECT `a`.*,`b`.`model`,`b`.`description`,`b`.`item_code` FROM ("));
            query.append(String.format("SELECT `sid`,`item_sid`,`serial_no`,`qty` FROM `%s`.`tb_inventory_%s` WHERE `serial_no`='%s'", db_name, storeId, serialNo));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,`model`,`description`,`sku`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`='%s' AND `sid` IN (SELECT `item_sid` AS `sid` FROM `%s`.`tb_inventory_%s` WHERE `serial_no`='%s' AND `qty` > 0)", db_name, storeId, sku, db_name, storeId, serialNo));
            query.append(String.format(") AS `b` ON `a`.`item_sid`=`b`.`sid`"));
            query.append(String.format(" WHERE `item_code` IS NOT NULL"));

			stmt = conn.createStatement();

			rs = stmt.executeQuery(query.toString());


			if(rs.next()) {
			    if (rs.getInt("qty") > 0) {
                    sb.append("{\"data\":{");
                    sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                    sb.append(String.format("\"itemSid\":%d,", rs.getInt("item_sid")));
                    if (rs.getString("serial_no") != null) sb.append(String.format("\"serialNo\":\"%s\",", rs.getString("serial_no")));
                    sb.append(String.format("\"qty\":%d,", rs.getInt("qty")));
                    if (rs.getString("model") != null) sb.append(String.format("\"model\":\"%s\",", rs.getString("model")));
                    if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
                    if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
                    if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
                    sb.append("}}");
			    } else {
			        sb.append("{\"data\":-2}");
			    }
			} else {
			    sb.append("{\"data\":-1}");
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