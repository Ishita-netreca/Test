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
		
		String sku = MyRequestUtil.getString(request, "sku", null);
		
		int audit_sid = MyRequestUtil.getInt(request, "audit_sid", 0);
		int category_sid = MyRequestUtil.getInt(request, "category_sid", 0);
		int sub_category_sid = MyRequestUtil.getInt(request, "sub_category_sid", 0);
		
		
		String bins = MyRequestUtil.getString(request, "bins", null);
		String categories = MyRequestUtil.getString(request, "categories", null);

		try {
		    if (storeId == null || audit_sid < 1 || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `a`.`sid`,`a`.`item_code`,`a`.`description`,`a`.`sku`,`b`.`bin`,`g`.`bin_name`,`b`.`system_qty`, `c`.`scanned_qty`,`d`.`status`,`e`.`category`,`f`.`sub_category` FROM ("));
			query.append(String.format(" SELECT `sid`,`item_code`,`description`,`sku`,`category`,`sub_category` FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, storeId));
			if (sku != null && sku.length() > 0) {
				query.append(String.format(" AND `sku` IN ('%s')", sku));
			}
			if (category_sid > 0) {
				query.append(String.format(" AND `category` IN ('%d')", category_sid)); 
			} else if (categories != null && categories.length() > 0) {
				query.append(String.format(" AND `category` IN (%s)", categories));
			}
			if (sub_category_sid > 0) {
				query.append(String.format(" AND `sub_category` IN ('%d')", sub_category_sid));
			}
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid` AS `inven_sid`,`item_sid`,SUM(`qty`) AS `system_qty`,`bin` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, storeId, db_name, storeId));
			if (sku != null && sku.length() > 0) {
				query.append(String.format(" AND `sku` IN ('%s')", sku));
			}
			if (category_sid > 0) {
				query.append(String.format(" AND `category` IN ('%d')", category_sid));
			} else if (categories != null && categories.length() > 0) {
				query.append(String.format(" AND `category` IN (%s)", categories));
			}
			if (sub_category_sid > 0) {
				query.append(String.format(" AND `sub_category` IN ('%d')", sub_category_sid));
			}
			if (categories != null && categories.length() > 0) {
				query.append(String.format(" AND `category` IN (%s)", categories));
			}	
			query.append(String.format(" ) "));
			if (bins != null && bins.length() > 0) {
				query.append(String.format(" AND `bin` IN (%s)", bins));
			}	
			query.append(String.format(" GROUP BY `item_sid`,`bin`) AS `b` ON `a`.`sid`=`b`.`item_sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `audit_sid`,`item_sid`,SUM(`scanned_qty`) AS `scanned_qty` FROM `%s`.`tb_audit_items_%s` WHERE `audit_sid` IN ('%d') GROUP BY `item_sid`) AS `c` ON `a`.`sid`=`c`.`item_sid`", db_name, storeId, audit_sid));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`status` FROM `%s`.`tb_audit_%s` WHERE `sid` IN ('%d')) AS `d` ON `c`.`audit_sid`=`d`.`sid`", db_name, storeId, audit_sid));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`='0') AS `e` ON `a`.`category`=`e`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`>'0') AS `f` ON `a`.`sub_category`=`f`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`description` AS `bin_name` FROM `%s`.`tb_bin_dict_%s` WHERE 1=1" , db_name, storeId));
			if (bins != null && bins.length() > 0) {
				query.append(String.format(" AND `sid` IN (%s)", bins));
			}
			query.append(String.format(" ) AS `g` ON `b`.`bin`=`g`.`sid`"));
			query.append(String.format(" WHERE `b`.`inven_sid` > 0"));			
						
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
				if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
				if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
				if (rs.getString("sku") != null) sb.append(String.format("\"sku\":\"%s\",", rs.getString("sku")));
				sb.append(String.format("\"bin\":%d,", rs.getInt("bin")));
				if (rs.getString("bin_name") != null) sb.append(String.format("\"bin_name\":\"%s\",", rs.getString("bin_name")));
				sb.append(String.format("\"system_qty\":%d,", rs.getInt("system_qty")));
				sb.append(String.format("\"scanned_qty\":%d,", rs.getInt("scanned_qty")));
				sb.append(String.format("\"variance\":%d,", ( rs.getInt("scanned_qty") -  rs.getInt("system_qty") ) ) );
				sb.append(String.format("\"status\":%d,", rs.getInt("status")));
				if (rs.getString("category") != null) sb.append(String.format("\"category\":\"%s\",", rs.getString("category")));
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