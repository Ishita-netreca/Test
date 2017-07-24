<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		int result = -1;
		// 0: success
		// -1: error
		// 1: user id or password is incorrect
		// 2: access denied
		// 3: store not exists
		int isOwner = 0;

		//String storeId = (session.getAttribute("posone_login_store_id") != null)? session.getAttribute("posone_login_store_id").toString() : null;
		String userId = request.getParameter("userId");
		String password = request.getParameter("password");

		try {
		    if (userId == null || password == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `abc`.*, `d`.`owner_id` FROM ("));
            query.append(String.format("SELECT `ab`.*, `c`.`store_sid`,`c`.`owner` FROM ("));
            query.append(String.format("SELECT `a`.*,`b`.`store_id` FROM ("));
            query.append(String.format("SELECT `sid`,`user_id`,`user_type` FROM `tb_user` WHERE `user_id`='%s' AND `password`='%s'", userId, password));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT * FROM `tb_manager_store_assigned` WHERE `user_id`='%s'", userId));
            query.append(String.format(") AS `b` ON `a`.`user_id`=`b`.`user_id`"));
            query.append(String.format(") AS `ab` LEFT JOIN ("));
            query.append(String.format("SELECT `sid` AS `store_sid`,`store_id`,`owner` FROM `tb_stores`"));
            query.append(String.format(") AS `c` ON `ab`.`store_id`=`c`.`store_id`"));
            query.append(String.format(") AS `abc` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,`user_id` AS `owner_id` FROM `tb_user` WHERE `owner_sid` IN (SELECT `owner_sid` FROM `tb_user` WHERE `user_id`='%s')", userId));
            query.append(String.format(") AS `d` ON `abc`.`owner`=`d`.`sid`"));

			rs = stmt.executeQuery(query.toString());

			if(rs.next()) {
                if (rs.getInt("user_type") == 4) {
                    result = 2;
                }
                if (result == -1 && rs.getInt("store_sid") == 0) {
                    result = 3;
                }
                if (result == -1) {
                    userId = rs.getString("user_id").toUpperCase();
                    session.setAttribute("posone_admin_login_user_id",userId);
                    session.setAttribute("posone_admin_login_user_sid",rs.getInt("sid"));
                    session.setAttribute("posone_admin_login_store_id",rs.getString("store_id").toUpperCase());
                    session.setAttribute("posone_admin_login_store_sid",rs.getInt("store_sid"));
                    session.setAttribute("wrp_admin_selected_store_id", rs.getString("store_id").toUpperCase());
                    session.setAttribute("wrp_admin_store_owner_sid", rs.getString("owner"));
                    session.setAttribute("wrp_admin_store_owner_id", rs.getString("owner_id"));
                    result = 0;
                }
			} else {
			    result = 1;
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

			if (result == 0) {
                stmt = conn.createStatement();
                rs = stmt.executeQuery(String.format("SELECT COUNT(`sid`) AS `count` FROM `tb_owner_info` WHERE `user_id`='%s'", userId));
                if (rs.next()) {
                    if (rs.getInt("count") > 0) {
                        isOwner = 1;
                        session.setAttribute("wrp_admin_login_user_owner_flag", "1");
                    } else {
                        isOwner = 0;
                        session.setAttribute("wrp_admin_login_user_owner_flag", null);
                    }
                } else {
                    session.setAttribute("wrp_admin_login_user_owner_flag", null);
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

		out.print(result);

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>