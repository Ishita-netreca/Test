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
		int audit_sid = MyRequestUtil.getInt(request, "audit_sid", 0);

		try {
		    if (store_id == null || user_sid == null || audit_sid < 1|| db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("UPDATE `%s`.`tb_audit_%s` SET `status`='2' WHERE `sid`='%d';", db_name, store_id, audit_sid));

			// 먼저 모든 inven 수량 0으로 초기화
			query.append(String.format("UPDATE `%s`.`tb_inventory_%s` AS `inven`,`%s`.`tb_audit_items_%s` AS `audit` SET `inven`.`qty`='0' WHERE ", db_name, store_id, db_name,store_id));
			query.append(String.format(" `inven`.`item_sid`=`audit`.`item_sid` AND `audit_sid` IN ('%d');", audit_sid));
						
			// inventory_sid가 있는 경우 sid에 대응하는 튜플에 업데이트
			query.append(String.format("UPDATE `%s`.`tb_inventory_%s` AS `inven`, `%s`.`tb_audit_items_%s` AS `audit` SET `inven`.`serial_no`=`audit`.`scanned_serial_no`,`inven`.`qty`=`audit`.`scanned_qty` WHERE ", db_name, store_id, db_name, store_id));
			query.append(String.format(" `inven`.`sid`=`audit`.`inventory_sid` AND `audit_sid` IN ('%d') AND `audit`.`inventory_sid` > '0';", audit_sid));
			
			// 새로운 serialized item 추가
			query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s`(`item_sid`,`serial_no`,`qty`,`update_date`,`updater`)", db_name, store_id));
			query.append(String.format(" (SELECT `item_sid`,`scanned_serial_no` AS `serial_no`,`scanned_qty` AS `qty`,NOW() AS `update_date`,'%s' AS `updater` FROM `%s`.`tb_audit_items_%s` ", user_sid, db_name, store_id));
			query.append(String.format(" WHERE `audit_sid` IN ('%d') AND `inventory_sid` < '1'", audit_sid));
			query.append(String.format(" AND (`serial_no` IS NULL OR `serial_no` = '') AND (`scanned_serial_no` IS NOT NULL AND `scanned_serial_no` != '')"));
			query.append(String.format(" AND `item_sid` IN (SELECT `item_sid` FROM `%s`.`tb_audit_items_%s` WHERE (`serial_no` IS NULL OR `serial_no` = '') AND (`scanned_serial_no` IS NOT NULL AND `scanned_serial_no` != '') AND `scanned_qty` > 0 GROUP BY `item_sid`)", db_name, store_id));
			query.append(String.format(" );"));

			// 새로운 non serialized item 추가
			query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s`(`item_sid`,`qty`,`update_date`,`updater`)", db_name, store_id));
			query.append(String.format(" (SELECT `item_sid`,`scanned_qty` AS `qty`,NOW() AS `update_date`,'8' AS `updater` FROM `%s`.`tb_audit_items_%s` ", db_name, store_id));
			query.append(String.format(" WHERE `audit_sid` IN ('%d') AND `inventory_sid` < '1'", audit_sid));
			query.append(String.format(" AND `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('3'))", db_name, store_id));
			query.append(String.format(" AND `item_sid` IN (SELECT `item_sid` FROM `%s`.`tb_audit_items_%s` WHERE (`serial_no` IS NULL OR `serial_no` = '') AND `scanned_qty` > 0 GROUP BY `item_sid`)", db_name, store_id));
			query.append(String.format(" );"));
			

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