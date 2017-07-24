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

		int transSid = MyRequestUtil.getInt(request, "transSid", 0);
		int currentStatus = MyRequestUtil.getInt(request, "currentStatus", -1);
		String item_code = MyRequestUtil.getString(request, "item_code", null);

		try {
		    if (item_code == null || user_sid == null || db_name == null || currentStatus < 0 || transSid < 1) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            query.append(String.format("SELECT `sid`,`item_code`,`serial_no`,`req_qty`,`appr_qty`,`ship_qty`,`recv_qty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `item_code`='%s'", db_name, db_name, transSid, item_code));

            switch (currentStatus) {
            case 2:
                query.append(String.format(" AND `appr_qty` > 0"));
                break;
            case 3:
                query.append(String.format(" AND `ship_qty` > 0"));
                break;
            }

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("item_code") != null) sb.append(String.format("\"item_code\":\"%s\",", rs.getString("item_code")));
                if (rs.getString("serial_no") != null) sb.append(String.format("\"serialNo\":\"%s\",", rs.getString("serial_no")));
                sb.append(String.format("\"reqQty\":%d,", rs.getInt("req_qty")));
                sb.append(String.format("\"apprQty\":%d,", rs.getInt("appr_qty")));
                sb.append(String.format("\"shipQty\":%d,", rs.getInt("ship_qty")));
                sb.append(String.format("\"recvQty\":%d,", rs.getInt("recv_qty")));
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