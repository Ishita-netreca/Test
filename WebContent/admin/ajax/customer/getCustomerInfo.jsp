<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);

		try {
		    if (storeId == null || db_name == null || customerSid < 1) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT * FROM `%s`.`tb_customer_%s` WHERE `sid`='%d'", db_name, storeId, customerSid));
			
			sb.append("{\"data\":{");

			if(rs.next()) {
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("customer_id") != null) sb.append(String.format("\"customerId\":\"%s\",", rs.getString("customer_id")));
                if (rs.getString("pin") != null) sb.append(String.format("\"pin\":\"%s\",", rs.getString("pin")));
                if (rs.getString("first_name") != null) sb.append(String.format("\"firstName\":\"%s\",", rs.getString("first_name")));
                if (rs.getString("middle_name") != null) sb.append(String.format("\"middleName\":\"%s\",", rs.getString("middle_name")));
                if (rs.getString("last_name") != null) sb.append(String.format("\"lastName\":\"%s\",", rs.getString("last_name")));
                if (rs.getString("address1") != null) sb.append(String.format("\"address1\":\"%s\",", rs.getString("address1")));
                if (rs.getString("address2") != null) sb.append(String.format("\"address2\":\"%s\",", rs.getString("address2")));
                if (rs.getString("city") != null) sb.append(String.format("\"city\":\"%s\",", rs.getString("city")));
                if (rs.getString("state") != null) sb.append(String.format("\"state\":\"%s\",", rs.getString("state")));
                if (rs.getString("zipcode") != null) sb.append(String.format("\"zipcode\":\"%s\",", rs.getString("zipcode")));
                if (rs.getString("tel") != null) sb.append(String.format("\"tel\":\"%s\",", rs.getString("tel")));
                if (rs.getString("email") != null) sb.append(String.format("\"email\":\"%s\",", rs.getString("email")));
                if (rs.getString("company") != null) sb.append(String.format("\"company\":\"%s\",", rs.getString("company")));
                sb.append(String.format("\"joinDate\":\"%s\",", sdf.format(rs.getTimestamp("join_date"))));

	    		if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
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