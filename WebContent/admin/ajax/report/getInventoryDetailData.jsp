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
		int categorySid = MyRequestUtil.getInt(request, "categorySid", 0);
		int subCategorySid = MyRequestUtil.getInt(request, "subCategorySid", 0);

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
		    
		    if (categorySid < 0) categorySid = 0;
		    if (subCategorySid < 0) subCategorySid = 0;

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `a`.*,`b`.`qty`,`c`.`category`,`d`.`sub_category` FROM ( "));
			query.append(String.format(" SELECT `sid`,`item_code`,`sku`,`item_cost`,`description`,`category` AS `_category`,`sub_category` AS `_sub_category`,`manufacturer`,IF(`item_type` < 3,'Y','N') AS `serialized`"));
			query.append(String.format(" FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, storeId));
			if (categorySid > 0) {
				query.append(String.format(" AND `category` IN ('%d')", categorySid));
			}
			if (subCategorySid > 0) {
				query.append(String.format(" AND `sub_category` IN ('%d')", subCategorySid));
			}
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `item_sid`,SUM(`qty`) AS `qty` FROM `%s`.`tb_inventory_%s`", db_name, storeId));
			query.append(String.format(" WHERE `item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, storeId));
			if (categorySid > 0) {
				query.append(String.format(" AND `category` IN ('%d')", categorySid));
			}
			if (subCategorySid > 0) {
				query.append(String.format(" AND `sub_category` IN ('%d')", subCategorySid));
			}
			query.append(String.format(" ) GROUP BY `item_sid`"));
			query.append(String.format(" ) AS `b` ON `a`.`sid`=`b`.`item_sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`='0') AS `c` ON `a`.`_category`=`c`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`>'0') AS `d` ON `a`.`_sub_category`=`d`.`sid`", db_name, storeId));
			query.append(String.format(" ORDER BY `item_code`"));
			
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
				if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
				if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
				if (rs.getString("category") != null) sb.append(String.format("\"category\":\"%s\",", rs.getString("category")));
				if (rs.getString("item_cost") != null) sb.append(String.format("\"cost\":\"%s\",", rs.getString("item_cost")));
				if (rs.getString("sku") != null) sb.append(String.format("\"sku\":\"%s\",", rs.getString("sku")));
				if (rs.getString("sub_category") != null) sb.append(String.format("\"sub_category\":\"%s\",", rs.getString("sub_category")));
				if (rs.getString("manufacturer") != null) sb.append(String.format("\"manufacturer\":\"%s\",", rs.getString("manufacturer")));
				if (rs.getString("serialized") != null) sb.append(String.format("\"serialized\":\"%s\",", rs.getString("serialized")));
				sb.append(String.format("\"qty\":%d,", rs.getInt("qty")));
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