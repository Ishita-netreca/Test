<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.*"%>
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
		String userId = MyRequestUtil.getString(request, "userId", null);
		
		JSONObject userSalesPermission = null, userBackendPermission = null, defaultSalesPermission = null, defaultBackendPermission = null;

        JSONParser jsonParser = new JSONParser();

		try {
		    if (storeId == null || userId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT * FROM `%s`.`tb_user_permission_%s` WHERE `user_id`='%s'", db_name, storeId, userId));

			rs = stmt.executeQuery(query.toString());

			if(rs.next()) {
                try {
                    userSalesPermission = (JSONObject)jsonParser.parse(rs.getString("sales_permission"));
                } catch (Exception e) {
                    userSalesPermission = new JSONObject();
                }
                try {
                    userBackendPermission = (JSONObject)jsonParser.parse(rs.getString("backend_permission"));
                } catch (Exception e) {
                    userBackendPermission = new JSONObject();
                }
			} else {
                userSalesPermission = new JSONObject();
                userBackendPermission = new JSONObject();
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

            stmt = conn.createStatement();

            query.delete(0, query.length());

            query.append(String.format("SELECT * FROM `%s`.`tb_user_permission_%s` LIMIT 0, 1", db_name, storeId));

            rs = stmt.executeQuery(query.toString());

            if (rs.next()) {
                try {
                    defaultSalesPermission = (JSONObject)jsonParser.parse(rs.getString("sales_permission"));
                } catch (Exception e) {
                    e.printStackTrace();
                    defaultSalesPermission = new JSONObject();
                }
                try {
                    defaultBackendPermission = (JSONObject)jsonParser.parse(rs.getString("backend_permission"));
                } catch (Exception e) {
                    defaultBackendPermission = new JSONObject();
                }
            }

            userSalesPermission = (JSONObject)JSONObjectController.getInstance().jsonObjectsUnion(userSalesPermission, defaultSalesPermission);
            userBackendPermission = (JSONObject)JSONObjectController.getInstance().jsonObjectsUnion(userBackendPermission, defaultBackendPermission);

            if (userSalesPermission != null && userBackendPermission != null) {
                out.println(String.format("{\"sales\":%s,\"backend\":%s}", userSalesPermission.toString(), userBackendPermission.toString()));
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