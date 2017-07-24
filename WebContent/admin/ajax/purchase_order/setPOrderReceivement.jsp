<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String userSid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
        int poSid = MyRequestUtil.getInt(request, "poSid", 0);

		try {
		    if (storeId == null || userSid == null || poSid < 1 || owner_id == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			stmt.execute(String.format("UPDATE `%s`.`tb_po_%s` SET `status`='4',`receiver_id`='%s',`receive_date`=NOW() WHERE `sid`='%d'; INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d' AND `serial_no` IS NOT NULL) AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid`; UPDATE `%s`.`tb_inventory_%s` AS `a`, (SELECT * FROM `%s`.`tb_po_items_%s` WHERE `serial_no` IS NULL AND `po_sid`='%s') AS `b` SET `a`.`qty`=`a`.`qty`+`b`.`receive_qty` WHERE `a`.`item_sid`=`b`.`item_sid`;",
					owner_id, storeId, userSid, poSid, owner_id, storeId, owner_id, storeId, poSid, owner_id, storeId, poSid, owner_id, storeId, owner_id, storeId, poSid
			));

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