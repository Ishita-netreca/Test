<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", session.getAttribute("wrp_admin_selected_store_timezone_offset").toString());
	
	int po_sid = MyRequestUtil.getInt(request, "po_sid", 0), sid = 0, item_type = 0, inventory_sid = 0;
	
	String ordered_po_items_list = MyRequestUtil.getString(request, "ordered_po_items_list", null);
	
	JSONArray jsonArr = null;
	JSONObject jsonObj = null;
	
	
	try {
	    if (store_id == null || user_sid == null || db_name == null || ordered_po_items_list == null || po_sid < 1) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		jsonArr = (JSONArray)(new JSONParser()).parse(ordered_po_items_list);
		
		
		
		for (int i = 0; i < jsonArr.size(); i++) {
			jsonObj = (JSONObject)jsonArr.get(i);
			if (jsonObj.get("sid") == null || jsonObj.get("item_type") == null || jsonObj.get("item_sid") == null) {
				continue;
			}
			try {
				sid = Integer.parseInt(jsonObj.get("sid").toString());
				item_type = Integer.parseInt(jsonObj.get("item_type").toString());
			} catch (Exception e) {
				continue;
			}
			
			if (item_type < 0 || item_type > 3) {
				continue;
			}
			
			if (sid > 0) {
				query.append(String.format("UPDATE "));
			} else {
				query.append(String.format("INSERT INTO "));				
			}			
			
			query.append(String.format("`%s`.`tb_po_items_%s` SET", db_name, store_id));
			
			if (sid < 1) {
				query.append(String.format("`item_sid`=%s,", jsonObj.get("item_sid").toString()));
			}
			
			switch (item_type) {
			case 0:
			case 1:
			case 2:
				if (jsonObj.get("input_serial_no") != null) {
					query.append(String.format("`serial_no`='%s',`receive_qty`=1,", jsonObj.get("input_serial_no").toString()));
				} else {
					query.append(String.format("`receive_qty`=0,"));
				}
				
				query.append(String.format("`status`=1,`po_sid`=%d,`fee_sid`=0", po_sid));		
				
				if (sid > 0) {
					query.append(String.format(" WHERE `sid`=%d", sid));
				}
				
				query.append(";");
				query.append(String.format(" INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`item_cost`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty`,`item_cost` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d') AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid` WHERE item_sid = %s; ",
						db_name, 		store_id, 																																																	db_name, 			store_id, 			po_sid, 																								db_name, store_id, 		po_sid, jsonObj.get("item_sid").toString()
				));
				
				break;
			case 3:
				query.append(String.format("`receive_qty`=%s,", jsonObj.get("receive_qty").toString()));
				
				query.append(String.format("`status`=1,`po_sid`=%d,`fee_sid`=0", po_sid));		
				
				if (sid > 0) {
					query.append(String.format(" WHERE `sid`=%d", sid));
				}
				
				query.append(";");				

				inventory_sid = MyDBUtil.getInstance().getInt(String.format("SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (%s) LIMIT 0, 1", db_name, store_id, jsonObj.get("item_sid").toString()), "sid");
				
				if (inventory_sid > 0) {
					//query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `po_sid`=%d,`item_sid`=%s, `item_cost`=(`item_cost`*`qty`+%s*%s) / (`qty`+%s), `qty`=`qty`+%s, `update_date`=NOW(),`updater`='%s',`bin`=1 WHERE `sid`=%d;", 
					//db_name, store_id, po_sid,jsonObj.get("item_sid").toString(), jsonObj.get("receive_qty").toString(), jsonObj.get("item_cost").toString(), jsonObj.get("receive_qty").toString(), jsonObj.get("receive_qty").toString(), user_sid, inventory_sid));
					query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `po_sid`=%d,`item_sid`=%s, `item_cost`=(`item_cost`+%s) / 2, `qty`=`qty`+%s, `update_date`=NOW(),`updater`='%s',`bin`=1 WHERE `sid`=%d;", 
					db_name, store_id, po_sid,jsonObj.get("item_sid").toString(), jsonObj.get("item_cost").toString(), jsonObj.get("receive_qty").toString(), user_sid, inventory_sid));
				} else {
					query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s` SET `po_sid`=%d,`item_sid`=%s, `qty`=%s, `item_cost`=(%s*%s) / (%s), `update_date`=NOW(),`updater`='%s',`bin`=1;", 
					db_name, store_id, po_sid, jsonObj.get("item_sid").toString(), jsonObj.get("receive_qty").toString(), jsonObj.get("item_cost").toString(), jsonObj.get("receive_qty").toString(), jsonObj.get("receive_qty").toString(), user_sid));
				}
				/*
				query.append(String.format(" INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`item_cost`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty`,`item_cost` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d') AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid` WHERE item_sid = %s; ",
						db_name, 		store_id, 																																																	db_name, 			store_id, 			po_sid, 																								db_name, store_id, 		po_sid, jsonObj.get("item_sid").toString()
				));
				query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET item_cost = (SELECT (SUM(item_cost*receive_qty)/SUM(receive_qty)) AS item_cost FROM `%s`.`tb_po_items_%s` WHERE item_sid = '%s' GROUP BY item_sid) WHERE item_sid = '%s';",
						db_name, 		store_id,db_name, 		store_id, jsonObj.get("item_sid").toString(), jsonObj.get("item_sid").toString()
						));
				*/
				break;
			}
			/* query.append(String.format("`status`=1,`po_sid`=%d,`fee_sid`=0", po_sid));		
			
			if (sid > 0) {
				query.append(String.format(" WHERE `sid`=%d", sid));
			}
			
			query.append(";"); */
		}
		
		query.append(String.format("UPDATE `%s`.`tb_po_%s` SET `status`=4,`receiver_id`=%s,`receive_date`=NOW() WHERE `sid`=%d;", db_name, store_id, user_sid, po_sid));
		
		 /* query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d' AND (`serial_no` IS NOT NULL OR `receive_qty` > 0)) AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid`",
												db_name,		store_id,																																																	db_name,		store_id,			po_sid,																																					db_name,	store_id,		po_sid				
		)); */
		 

		//System.out.println(query);
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString()));
        query.delete(0, query.length());

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>