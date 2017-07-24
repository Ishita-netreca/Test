<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
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
        String toStoreId = MyRequestUtil.getString(request, "toStoreId", null);
        String shipNo = MyRequestUtil.getString(request, "shipNo", "");
        String transferId = MyRequestUtil.getString(request, "transferId", "");

        int transferStatus = MyRequestUtil.getInt(request, "status", -1);
        int transSid = MyRequestUtil.getInt(request, "transSid", 0);
        String transItemsStr = MyRequestUtil.getString(request, "transItems", null);
        String note = MyRequestUtil.getString(request, "note", "");
        
        JSONArray transItems = null;
		JSONObject jsonObj = null;

		try {
		    if (user_sid == null || db_name == null || storeId == null || transferStatus < 0 || transSid < 1) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			switch (transferStatus) {
			case 1: // Reject
			    query.append(String.format("UPDATE `%s`.`tb_inventory_trans_%s` SET `status`='%d', `reject_reason`='%s' WHERE `sid`='%d'", db_name, db_name, transferStatus, MyDBUtil.addSlashes(note), transSid));
			    break;
			case 2: // Approval
			    query.append(String.format("UPDATE `%s`.`tb_inventory_trans_%s` SET `trans_id`='%s', `appr_date`=NOW(), `appr_user_sid`='%s', `to_store_id`='%s', `status`='%d', `appr_memo`='%s' WHERE `sid`='%d';", db_name, db_name, transferId, user_sid, toStoreId, transferStatus,MyDBUtil.addSlashes(note),transSid));
			
			    //transItems = (JSONArray)(new JSONParser().parse(transItemsStr));
                // serialNo가 한번 작성 되고 수정 불가로 변경되면, 테이블 내의 serial_no column의 데이터 NULL 여부검사를 추가하면 됨
                /* for (int i = 0; i < transItems.size(); i++) {
                    jsonObj = (JSONObject)transItems.get(i);
                    if (jsonObj.get("itemCode") != null) {
                        query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='%d' WHERE `trans_sid`='%d' AND `item_code`='%s'; ",
                        		db_name, db_name, Integer.parseInt(jsonObj.get("qty").toString()), transSid, jsonObj.get("itemCode").toString()
                        ));
                    } 
                } */
			    break;
			case 3: // Ship
			    query.append(String.format("UPDATE `%s`.`tb_inventory_trans_%s` SET `ship_date`=NOW(), `ship_user_sid`='%s', `status`='%d', `ship_no`='%s' WHERE `sid`='%d';", db_name, db_name, user_sid, transferStatus, shipNo, transSid));
			    query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=`qty`-1 WHERE `serial_no` IN (SELECT `serial_no` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `serial_no` IS NOT NULL AND `trans_sid`='%s' AND `appr_qty` > 0);", db_name, storeId, db_name, db_name, transSid));
			    query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=`qty`-1 WHERE `item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type`='3' AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%s')) LIMIT 1;", db_name, storeId, db_name, storeId, db_name, db_name, transSid));
			    break;
			case 4: // Receive
			    query.append(String.format("UPDATE `%s`.`tb_inventory_trans_%s` SET `recv_date`=NOW(), `recv_user_sid`='%s', `status`='%d' WHERE `sid`='%d';", db_name, db_name, user_sid, transferStatus, transSid));

                // Insert Serialized Item's Serial Number into Inventory Table if not exists
			    query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s`(`serial_no`,`trans_sid`,`item_sid`,`update_date`,`updater`,`qty`,`bin`)", db_name, storeId));
                query.append(String.format("SELECT `a`.`serial_no`,`a`.`trans_sid`,`b`.`item_sid`,NOW() AS `update_date`,'%s' AS `updater`, '0' AS `qty`,'1' AS `bin` FROM (", user_sid));
                query.append(String.format("SELECT `serial_no`,`trans_sid`,`item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0", db_name, db_name, transSid));
                query.append(String.format(") AS `a` LEFT JOIN ("));
                query.append(String.format("SELECT `sku`,`sid` AS `item_sid`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` < 3 AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0)", db_name, storeId, db_name, db_name, transSid));
                query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code` WHERE `serial_no` NOT IN ("));
                query.append(String.format("SELECT `serial_no` FROM `%s`.`tb_inventory_%s` WHERE `serial_no` IN (SELECT `serial_no` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0)", db_name, storeId, db_name, db_name, transSid));
                query.append(String.format(") AND `item_sid` IS NOT NULL;"));

                // Update Serialized Item's Qty into Inventory Table
                query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=`qty`+1 WHERE `serial_no` IN (SELECT `serial_no` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0);", db_name, storeId, db_name, db_name, transSid));

			    // Insert Non-Serialized Item into Inventory Table if not exists
                query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s`(`trans_sid`,`item_sid`,`update_date`,`updater`,`qty`,`bin`)", db_name, storeId));
                query.append(String.format("SELECT `a`.`trans_sid`,`b`.`item_sid`,NOW() AS `update_date`,'%s' AS `updater`, '0' AS `qty`,'1' AS `bin` FROM (", user_sid));
                query.append(String.format("SELECT `trans_sid`,`item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL", db_name, db_name, transSid));
                query.append(String.format(") AS `a` LEFT JOIN ("));
                query.append(String.format("SELECT `sku`,`item_code`,`sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type`='3' AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL)", db_name, storeId, db_name, db_name, transSid));
                query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code` WHERE `item_sid` NOT IN ("));
                query.append(String.format("SELECT `item_sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL))", db_name, storeId, db_name, storeId, db_name, db_name, transSid));
                query.append(String.format(") AND `item_sid` IS NOT NULL;"));

                // Update Non-Serialized Item's Qty into Inventory Table
                query.append(String.format("UPDATE `%s`.`tb_inventory_%s` AS `inven`, (", db_name, storeId));
                query.append(String.format("SELECT `b`.`trans_sid`,`a`.`item_sid`,`b`.`recv_qty` FROM ("));
                query.append(String.format("SELECT `sid` AS `item_sid`,`sku`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL)", db_name, storeId, db_name, db_name, transSid));
                query.append(String.format(") AS `a` LEFT JOIN ("));
                query.append(String.format("SELECT `trans_sid`,`item_code`,`recv_qty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL", db_name, db_name, transSid));
                query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code`"));
                query.append(String.format(") AS `trans` SET"));
                query.append(String.format("`inven`.`qty`=`inven`.`qty`+`trans`.`recv_qty`"));
                query.append(String.format(" WHERE `inven`.`item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL));", db_name, storeId, db_name, db_name, transSid));
                break;
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