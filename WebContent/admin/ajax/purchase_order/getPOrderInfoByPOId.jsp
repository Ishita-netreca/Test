<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.DecimalFormat" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String poId = MyRequestUtil.getString(request, "poId", null);
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;

		try {
		    if (storeId == null || poId == null || owner_id == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT * FROM `%s`.`tb_po_%s` WHERE `po_id`='%s'", owner_id, storeId, poId));


			if(rs.next()) {
			    sb.append("{\"data\":{");
                if (rs.getString("po_id") != null) sb.append(String.format("\"poId\":\"%s\",", rs.getString("po_id")));
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                sb.append(String.format("\"status\":%d,", rs.getInt("status")));
                if (rs.getString("vendor_id") != null) sb.append(String.format("\"vendorId\":\"%s\",", rs.getString("vendor_id")));
                sb.append(String.format("\"newPoId\":\"%s\",", poId));
	    		if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
			    sb.append("}}");
			} else {
			    sb.append(String.format("{\"data\":{\"newPoId\":\"%s\"}}", poId));
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