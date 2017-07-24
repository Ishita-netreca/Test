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
		
		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
		
		String storeId = (session.getAttribute("posone_login_store_id") != null)? session.getAttribute("posone_login_store_id").toString() : null;
		int userSid = MyRequestUtil.getInt(request, "userSid", 0);
		int role = MyRequestUtil.getInt(request, "role", 0);
				
		try {
		    if (userSid < 1 || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			if(role != 0)	rs = stmt.executeQuery(String.format("SELECT * FROM `wrp`.`tb_user` WHERE `sid`='%d'", userSid));
			else			rs = stmt.executeQuery(String.format("SELECT * FROM `wrp`.`tb_user` AS u, `%s`.`tb_role_%s` AS r WHERE u.`sid`='%d' AND u.`user_role` = r.`sid`;", db_name, userSid));
			
			sb.append("{\"data\":[");

			while(rs.next()) {
			    sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("user_id") != null) sb.append(String.format("\"userId\":\"%s\",", rs.getString("user_id")));
                //if (rs.getString("user_name") != null) sb.append(String.format("\"userName\":\"%s\",", rs.getString("user_name"))); // 이거
                sb.append(String.format("\"userType\":%d,", rs.getInt("user_type")));
                switch (rs.getInt("user_type")) {
                case 0:
                    sb.append(String.format("\"jobPosition\":\"General Manager\","));
                    break;
                case 1:
                    sb.append(String.format("\"jobPosition\":\"District Manager\","));
                    break;
                case 2:
                    sb.append(String.format("\"jobPosition\":\"Area Manager\","));
                    break;
                case 3:
                    sb.append(String.format("\"jobPosition\":\"Store Manager\","));
                    break;
                case 4:
                    sb.append(String.format("\"jobPosition\":\"Employee\","));
                    break;
                }
                if (rs.getString("first_name") != null) sb.append(String.format("\"firstName\":\"%s\",", rs.getString("first_name")));
                if (rs.getString("middle_name") != null) sb.append(String.format("\"middleName\":\"%s\",", rs.getString("middle_name")));
                if (rs.getString("last_name") != null) sb.append(String.format("\"lastName\":\"%s\",", rs.getString("last_name")));
                //if (rs.getString("address") != null) sb.append(String.format("\"address\":\"%s\",", rs.getString("address")));
                if (rs.getString("address1") != null) sb.append(String.format("\"address1\":\"%s\",", rs.getString("address1")));
                if (rs.getString("address2") != null) sb.append(String.format("\"address2\":\"%s\",", rs.getString("address2")));
                if (rs.getString("city") != null) sb.append(String.format("\"city\":\"%s\",", rs.getString("city")));
                if (rs.getString("state") != null) sb.append(String.format("\"state\":\"%s\",", rs.getString("state")));
                if (rs.getString("zipcode") != null) sb.append(String.format("\"zipcode\":\"%s\",", rs.getString("zipcode")));
                if (rs.getString("tel") != null) sb.append(String.format("\"tel\":\"%s\",", rs.getString("tel")));
                if (rs.getString("email") != null) sb.append(String.format("\"email\":\"%s\",", rs.getString("email")));
                if (rs.getString("password") != null) sb.append(String.format("\"pw\":\"%s\",", rs.getString("password")));
                sb.append(String.format("\"user_role\":%d,", rs.getInt("user_role")));
                sb.append(String.format("\"disable\":%d,", rs.getInt("disable")));
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getTimestamp("hire_date") != null) sb.append(String.format("\"hire_date\":\"%s\",", format.format(rs.getTimestamp("hire_date"))));
                //if (rs.getString("role_name") != null) sb.append(String.format("\"roleName\":\"%s\",", rs.getString("role_name")));

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
		sb = null;
%>