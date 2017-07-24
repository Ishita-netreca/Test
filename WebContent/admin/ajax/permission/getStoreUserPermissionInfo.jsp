<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ include file="../common.jsp" %>
<%
        Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String userId = MyRequestUtil.getString(request, "userId", null);
		String storeId = MyRequestUtil.getString(request, "storeId", null);
		
		try {
		    if (userId == null || storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT `a`.*,`b`.`user_type` FROM (SELECT * FROM `%s`.`tb_user_permission_%s` WHERE `user_id`='%s') AS `a` LEFT JOIN (SELECT `user_id`,`user_type` FROM `wrp`.`tb_user` WHERE `user_id`='%s') AS `b` ON `a`.`user_id`=`b`.`user_id`", db_name, storeId, userId, userId));

			if(rs.next()) {
			    if (rs.getInt("user_type") < 4) {
			        sb.append(rs.getString("backend_permission"));
			    } else {
			        sb.append(rs.getString("sales_permission"));
			    }
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