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

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		String return_reason = MyRequestUtil.getString(request, "return_reason", null);
		String description = MyRequestUtil.getString(request, "description", null);
		String destination = MyRequestUtil.getString(request, "destination", null);

		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			if(sid == 0){
	            query.append(String.format("INSERT INTO `%s`.`tb_return_rules_%s`(`return_reason`,`description`,`destination`,`update_date`,`updater`) VALUES('%s','%s','%s',NOW(),(SELECT `sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s'));",
	            		db_name, storeId, return_reason, description,destination,user_sid));
			}else{
				query.append(String.format("UPDATE `%s`.`tb_return_rules_%s` SET `update_date`=NOW(), `updater`=(SELECT `sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s'),", db_name, storeId,user_sid));
				if (return_reason != null) query.append(String.format("`return_reason`='%s',", return_reason));
				if (description != null) query.append(String.format("`description`='%s',", description));
				if (destination != null) query.append(String.format("`destination`='%s',", destination));
				if (query.length() > 0 && query.lastIndexOf(",") == query.length() -1 ) query.deleteCharAt(query.length() -1);
				query.append(String.format(" WHERE `sid`='%d'", sid));
			}

            stmt.executeUpdate(query.toString());

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

            out.print("0");

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
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

            out.print("-1");
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>