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
		int registerNo = MyRequestUtil.getInt(request, "registerNo", 0);
		String description = MyRequestUtil.getString(request, "description", null);
		String credit_device_url = MyRequestUtil.getString(request, "credit_device_url", null);
		int credit_device_port = MyRequestUtil.getInt(request, "credit_device_port", 0);
		String credit_device_identity_token = MyRequestUtil.getString(request, "credit_device_identity_token", null);
		
		try {
		    if (storeId == null || db_name == null || user_id == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			if(sid == 0){
	            query.append(String.format("INSERT INTO `%s`.`tb_cash_register_%s`(`register_no`,`description`,`update_date`,`updater`,`credit_device_url`,`credit_device_port`,`credit_device_identity_token`) VALUES('%d','%s',NOW(),(SELECT `sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s'),'%s','%d','%s');",
	            		db_name, storeId, registerNo, description, user_id, credit_device_url, credit_device_port, credit_device_identity_token));
			}else{
				query.append(String.format("UPDATE `%s`.`tb_cash_register_%s` SET `update_date`=NOW(), `updater`=(SELECT `sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s'),", db_name, storeId, user_id));
				if (registerNo > 0) query.append(String.format("`register_no`='%d',", registerNo));
				if (description != null) query.append(String.format("`description`='%s',", description));
				if (credit_device_url != null) query.append(String.format("`credit_device_url`='%s',", credit_device_url));
				if (credit_device_port > 0) query.append(String.format("`credit_device_port`='%d',", credit_device_port));
				if (credit_device_identity_token != null) query.append(String.format("`credit_device_identity_token`='%s',", credit_device_identity_token));
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