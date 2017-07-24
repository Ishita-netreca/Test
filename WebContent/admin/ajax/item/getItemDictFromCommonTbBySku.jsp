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

		String sku = MyRequestUtil.getString(request, "sku", null);
		String storeId = MyRequestUtil.getString(request, "storeId", null);

		try {
		    if (sku == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `sid`,`item_code`,`model`,`description`,`distributor`,`category`,`sub_category`,`manufacturer`,`color`,`condition`,`store`.`sku`,`item_cost`,`retail_price`,`wholesale_price`,`item_type`,`update_date`,`updater`,`disable`,`serialized`,`carrier_sid`,`vendor_sid`,"));
			query.append(String.format("IF(`a`.`image` IS NOT NULL AND `a`.`image` != '', `a`.`image`, `wrp`.`image`) AS `image` FROM ("));
			query.append(String.format("SELECT * FROM `%s`.`tb_item_dict_%s` WHERE `sku`='%s' ) AS `store`", db_name, storeId, sku));
			query.append(String.format(" LEFT JOIN (SELECT `sku`,`image` FROM `wrp`.`tb_item_dict_[storeid]` WHERE `sku` IN (%d) ",db_name, storeId, sku));
			query.append(String.format(") AS `wrp` ON `a`.`sku`=`wrp`.`sku` "));
			
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":{");

			if(rs.next()) {
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("item_code") != null) sb.append(String.format("\"itemCode\":\"%s\",",rs.getString("item_code")));
                if (rs.getString("model") != null) sb.append(String.format("\"model\":\"%s\",",rs.getString("model")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",",rs.getString("description")));
                if (rs.getString("distributor") != null) sb.append(String.format("\"distributor\":\"%s\",",rs.getString("distributor")));
                sb.append(String.format("\"category\":%d,",rs.getInt("category")));
                sb.append(String.format("\"subCategory\":%d,",rs.getInt("sub_category")));
                if (rs.getString("manufacturer") != null) sb.append(String.format("\"manufacturer\":\"%s\",",rs.getString("manufacturer")));
                if (rs.getString("color") != null) sb.append(String.format("\"color\":\"%s\",",rs.getString("color")));
                if (rs.getString("condition") != null) sb.append(String.format("\"condition\":\"%s\",",rs.getString("condition")));
                if (rs.getString("sku") != null) sb.append(String.format("\"sku\":\"%s\",",rs.getString("sku")));
                sb.append(String.format("\"itemCost\":%f,",rs.getFloat("item_cost")));
                sb.append(String.format("\"retailPrice\":%f,",rs.getFloat("retail_price")));
                sb.append(String.format("\"wholesalePrice\":%f,",rs.getFloat("wholesale_price")));
                sb.append(String.format("\"serialized\":%d,",rs.getInt("serialized")));
                if (rs.getString("image")  != null) sb.append(String.format("\"image\":\"%s\",",rs.getString("image").trim()));
                if (rs.getTimestamp("update_date")  != null) sb.append(String.format("\"updateDate\":\"%s\",",rs.getTimestamp("update_date")));
                sb.append(String.format("\"updater\":%d,",rs.getInt("updater")));
                sb.append(String.format("\"disable\":%d,",rs.getInt("disable")));
			}

			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);

			sb.append("}}");

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