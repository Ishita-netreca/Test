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
		String permissionInfoString = MyRequestUtil.getString(request, "permissionInfoString", null);
		int permissionGroupSid = MyRequestUtil.getInt(request, "permissionGroupSid", 0);

        try {
            if (db_name == null || permissionInfoString == null || permissionGroupSid < 1) {
                throw new Exception();
            }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            stmt.execute(String.format("UPDATE `%s`.`tb_permission_group_%s` SET `backend_permission`='%s' WHERE `sid`='%d'; UPDATE `wrp`.`tb_user` SET `group_permission_flag`='1' WHERE `group_sid`='%d';", db_name, db_name, permissionInfoString, permissionGroupSid, permissionGroupSid));

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