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
		StringBuffer sb = new StringBuffer();
		StringBuffer query = new StringBuffer();

		String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
		int searchType = MyRequestUtil.getInt(request, "searchType", 0);
		String searchKeyword = MyRequestUtil.getString(request, "searchKeyword", null);
		String selectedStoreId = MyRequestUtil.getString(request, "selectedStoreId", null);
        int userType = MyRequestUtil.getInt(request, "userType", -1);
		try {
		    if (userId == null) {
		       throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append("SELECT * FROM `wrp`.`tb_user`");

			if (selectedStoreId == null) {
			    query.append(String.format(" WHERE `sid` IN (SELECT `user_sid` FROM `%s`.`tb_user_store_access` WHERE `store_id` IN (SELECT `store_id` FROM `%s`.`tb_user_store_access` WHERE `user_sid`='%s'))", db_name, db_name, user_sid));
			} else if (selectedStoreId.length() > 0) {
			   query.append(String.format(" WHERE `sid` IN (SELECT `user_sid` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, selectedStoreId));
			}

			if (searchType > -1 && (searchKeyword != null && searchKeyword.length() > 0)) {
			    if (query.indexOf("WHERE") > -1) {
			        query.append(" AND");
			    } else {
			        query.append(" WHERE");
			    }
                switch (searchType) {
                case 0:
                    query.append(String.format(" (`user_id` LIKE '%%%s%%' OR (`first_name` LIKE '%%%s%%' OR `middle_name` LIKE '%%%s%%' OR `last_name` LIKE '%%%s%%'))", searchKeyword, searchKeyword, searchKeyword, searchKeyword));
                    break;
                case 1:
                    query.append(String.format(" `user_id` LIKE '%%%s%%'", searchKeyword));
                    break;
                case 2:
                    query.append(String.format(" (`first_name` LIKE '%%%s%%' OR `middle_name` LIKE '%%%s%%' OR `last_name` LIKE '%%%s%%')", searchKeyword, searchKeyword, searchKeyword));
                    break;
                }
			}

			if (userType > -1) {
			    if (query.indexOf("WHERE") == -1) {
			        query.append(" WHERE");
			    } else {
			        query.append(" AND");
			    }
			    query.append(String.format(" `user_type`='%d'", userType));
			}

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
			    sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("user_id") != null) sb.append(String.format("\"userId\":\"%s\",", rs.getString("user_id")));
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
                if (rs.getString("address1") != null) sb.append(String.format("\"address1\":\"%s\",", rs.getString("address1")));
                if (rs.getString("address2") != null) sb.append(String.format("\"address2\":\"%s\",", rs.getString("address2")));
                if (rs.getString("city") != null) sb.append(String.format("\"city\":\"%s\",", rs.getString("city")));
                if (rs.getString("state") != null) sb.append(String.format("\"state\":\"%s\",", rs.getString("state")));
                if (rs.getString("zipcode") != null) sb.append(String.format("\"zipcode\":\"%s\",", rs.getString("zipcode")));
                if (rs.getString("tel") != null) sb.append(String.format("\"tel\":\"%s\",", rs.getString("tel")));
                if (rs.getString("email") != null) sb.append(String.format("\"email\":\"%s\",", rs.getString("email")));
                sb.append(String.format("\"payrollId\":%d,", rs.getInt("payroll_id")));
                sb.append(String.format("\"disable\":%d,", rs.getInt("disable")));

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