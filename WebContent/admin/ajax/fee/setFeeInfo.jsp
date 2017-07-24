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
		int feeSid = MyRequestUtil.getInt(request, "feeSid", 0);
		String feeType = MyRequestUtil.getString(request, "feeType", null);
		String name =  MyRequestUtil.getString(request, "name", null);
		String description =  MyRequestUtil.getString(request, "description", null);
		float amount = MyRequestUtil.getFloat(request, "amount", 0);


		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            if (feeSid == 0) {
                query.append(String.format("INSERT INTO `%s`.`tb_fee_dict_%s`(`fee_type`,`name`,`description`,`amount`,`update_date`,`updater`,`disable`) ", db_name, storeId));
                query.append(String.format("VALUES('%s','%s','%s','%f',NOW(),'%s',0)", feeType, name, description, amount, user_sid));
            } else {
                query.append(String.format("UPDATE `%s`.`tb_fee_dict_%s` SET `update_date`=NOW(), `updater`='%s',", db_name, storeId, user_sid));
                if (feeType != null) query.append(String.format("`fee_type`='%s',", feeType));
                if (name != null) query.append(String.format("`name`='%s',", name));
                if (description != null) query.append(String.format("`description`='%s',", description));
                query.append(String.format("`amount`='%f',", amount));
			    if (query.length() > 0 && query.lastIndexOf(",") == query.length() -1 ) query.deleteCharAt(query.length() -1);
			    query.append(String.format(" WHERE `sid`='%d'", feeSid));
            }

            stmt.execute(query.toString());

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

            out.print(-1);
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		query = null;
		sb = null;
%>