<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
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

		int transSid = MyRequestUtil.getInt(request, "transSid", 0);
		String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));

		try {
		    if (storeId == null || user_sid == null || db_name == null || transSid < 1) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `a`.*,`b`.`model`,`b`.`description`,`c`.`from_store_id` FROM ("));
            query.append(String.format("SELECT `trans_sid`,`item_code`,SUM(`req_qty`) AS `req_qty`,SUM(`appr_qty`) AS `appr_qty`,SUM(`ship_qty`) AS `ship_qty`,SUM(`recv_qty`) AS `recv_qty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE trans_sid='%d' GROUP BY `item_code`", db_name, db_name, transSid));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `item_code`,`model`,`description` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT DISTINCT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d') GROUP BY `item_code`", db_name, storeId, db_name, db_name, transSid));
            query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code`"));
            query.append(String.format(" LEFT JOIN (SELECT `sid`,`from_store_id` FROM `%s`.`tb_inventory_trans_%s`) AS `c` ON `a`.`trans_sid`=`c`.`sid`", db_name, db_name));
            if (keyword != null && keyword.length() > 0 ){
                query.append(String.format(" WHERE (`b`.`description` LIKE '%%%s%%' OR `a`.`item_code`='%s' OR `b`.`model` LIKE '%%%s%%')",keyword,keyword,keyword));                    
            }
            
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
                sb.append(String.format("\"transSid\":%d,", rs.getInt("trans_sid")));
                sb.append(String.format("\"reqQty\":%d,", rs.getInt("req_qty")));
                sb.append(String.format("\"apprQty\":%d,", rs.getInt("appr_qty")));
                sb.append(String.format("\"shipQty\":%d,", rs.getInt("ship_qty")));
                sb.append(String.format("\"recvQty\":%d,", rs.getInt("recv_qty")));
                if (rs.getString("model") != null) sb.append(String.format("\"model\":\"%s\",", rs.getString("model")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
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