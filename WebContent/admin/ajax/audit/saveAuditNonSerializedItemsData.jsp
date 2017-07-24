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

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		int audit_sid = MyRequestUtil.getInt(request, "audit_sid", 0);
		int item_sid = MyRequestUtil.getInt(request, "item_sid", 0);
		int inventory_sid = MyRequestUtil.getInt(request, "inventory_sid", 0);
		int system_qty = MyRequestUtil.getInt(request, "system_qty", 0);
		int scanned_qty = MyRequestUtil.getInt(request, "scanned_qty", 0);

		try {
		    if (store_id == null || sid < 0 || audit_sid < 1 || item_sid < 1 || inventory_sid < 0|| db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
						
			if (sid > 0) {
				query.append(String.format("UPDATE `%s`.`tb_audit_items_%s` SET `scanned_qty`='%d',`inventory_sid`='%d',`item_sid`='%d' WHERE `sid`='%d' AND `audit_sid`='%d'",
						db_name, store_id, scanned_qty, inventory_sid, item_sid, sid, audit_sid
				));
			} else {
				query.append(String.format("INSERT INTO `%s`.`tb_audit_items_%s` SET", db_name, store_id));
				query.append(String.format(" `audit_sid`='%d'", audit_sid));
				query.append(String.format(" ,`item_sid`='%d'", item_sid));
				query.append(String.format(" ,`inventory_sid`='%d'", inventory_sid));
				query.append(String.format(" ,`system_qty`='%d'", system_qty));
				query.append(String.format(" ,`scanned_qty`='%d'", scanned_qty));
			}

			stmt.execute(query.toString());

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