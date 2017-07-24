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

		int transItemSid = MyRequestUtil.getInt(request, "transItemSid", 0);
		int transSid = MyRequestUtil.getInt(request, "transSid", 0);

		int currentStatus = MyRequestUtil.getInt(request, "currentStatus", -1);

		String item_code = MyRequestUtil.getString(request, "item_code", null);

		int inputQty = MyRequestUtil.getInt(request, "inputQty", 0);

		try {
		    if (user_sid == null || db_name == null || transItemSid < 1 || transSid < 1 || item_code == null || currentStatus < 0 || inputQty < 0) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

            switch (currentStatus) {
            case 0:
                query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='%d' WHERE `sid`='%d' AND `trans_sid`='%d' AND `item_code`='%s'",
                		db_name,db_name, inputQty, transItemSid, transSid, item_code));
                break;
            case 2:
                query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `ship_qty`='%d' WHERE `sid`='%d' AND `trans_sid`='%d' AND `item_code`='%s'",
                		db_name,db_name, inputQty, transItemSid, transSid, item_code));
                break;
            case 3:
                query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `recv_qty`='%d' WHERE `sid`='%d' AND `trans_sid`='%d' AND `item_code`='%s'",
                		db_name,db_name, inputQty, transItemSid, transSid, item_code));
                break;
            }

            if (query.length() > 0) {
                stmt = conn.createStatement();

                stmt.execute(query.toString());

                out.print(0);
            } else {
                out.print(1);
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