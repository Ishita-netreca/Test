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
		
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT * FROM"));
			query.append(String.format("(SELECT * FROM `%s`.tb_inventory_%s WHERE `bin`=%d AND `qty` > 0) AS `a` ", db_name, storeId, sid));
			query.append(String.format("LEFT JOIN (SELECT * FROM `%s`.`tb_item_dict_%s`) AS `b` ON `a`.`item_sid`=`b`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`= 0) AS `c` ON `b`.`category`=`c`.`sid`", db_name, storeId));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`bin_type` FROM `%s`.`tb_bin_dict_%s`) AS `d` ON `a`.`bin` = `d`.`sid`", db_name, storeId));
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append(String.format("{"));
				sb.append(String.format("\"sid\":%d,",rs.getInt("sid")));
				if (rs.getString("item_code") != null) sb.append(String.format("\"itemCode\":\"%s\",",rs.getString("item_code")));
				if (rs.getString("serial_no") != null) sb.append(String.format("\"serial_no\":\"%s\",",rs.getString("serial_no")));
				if (rs.getString("distributor") != null) sb.append(String.format("\"distributor\":\"%s\",",rs.getString("distributor")));
				if (rs.getString("category_name") != null) sb.append(String.format("\"category_name\":\"%s\",",rs.getString("category_name")));
				if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
				sb.append(String.format("\"qty\":%d,",rs.getInt("qty")));
				sb.append(String.format("\"bin\":%d,",rs.getInt("bin")));
				sb.append(String.format("\"item_type\":%d,",rs.getInt("item_type")));
				sb.append(String.format("\"bin_type\":\"%s\",",rs.getString("bin_type")));
				sb.append(String.format("\"itemCost\":%f,",rs.getFloat("item_cost")));
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