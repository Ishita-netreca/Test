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
		String type = MyRequestUtil.getString(request, "type", null);
		String description = MyRequestUtil.getString(request, "description", null);
		
		try {
		    if (storeId == null || db_name == null || user_sid == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			if(sid == 0){
	            query.append(String.format("INSERT INTO `%s`.`tb_bin_dict_%s`(`bin_type`,`description`,`update_date`,`updater`) VALUES('%s','%s',NOW(),'%s');",
	            		db_name, storeId, type, description, user_sid));
			}else{
				query.append(String.format("UPDATE `%s`.`tb_bin_dict_%s` SET `update_date`=NOW(), `updater`='%s',", db_name, storeId,user_sid));
				if (type != null) query.append(String.format("`bin_type`='%s',", type));
				if (description != null) query.append(String.format("`description`='%s',", description));
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