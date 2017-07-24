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
		String userId = MyRequestUtil.getString(request, "userId", null);
		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String permissionInfoString = MyRequestUtil.getString(request, "permissionInfoString", null);
		boolean isUpdate = false;

        try {
            if (userId == null || storeId == null || permissionInfoString == null || db_name == null) {
                throw new Exception();
            }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT `sid` FROM `%s`.`tb_user_permission_%s` WHERE `user_id`='%s'", db_name, storeId, userId));

            if (rs.next()) {
                isUpdate = true;
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
            if (isUpdate) {
                stmt.execute(String.format("UPDATE `%s`.`tb_user_permission_%s` SET `sales_permission`='%s' WHERE `user_id`='%s'; UPDATE `wrp`.`tb_user` SET `group_permission_flag`='0' WHERE `user_id`='%s';", db_name, storeId, permissionInfoString, userId, userId));
            } else {
                stmt.execute(String.format("INSERT INTO `%s`.`tb_user_permission_%s`(`user_id`,`sales_permission`) VALUES('%s','%s'); UPDATE `wrp`.`tb_user` SET `group_permission_flag`='0' WHERE `user_id`='%s';", db_name, storeId, userId, permissionInfoString, userId));
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

            out.print(0);
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
                e.printStackTrace();
            }

            out.print(-1);
        }
%>