<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", session.getAttribute("wrp_admin_selected_store_timezone_offset").toString());
	String po_items_list_str = MyRequestUtil.getString(request, "po_items_list_str", null);
	String po_serialized_items = MyRequestUtil.getString(request, "po_serialized_items", null);
	String po_costs = MyRequestUtil.getString(request, "po_costs", null);
	String po_id = MyRequestUtil.getString(request, "po_id", null);
	int vendor_id = MyRequestUtil.getInt(request, "vendor_id", 0);
	
	int po_sid = 0;
	
	int inventory_sid = 0;
	
	JSONObject jsonObj = null, jsonObj2 = null;
	JSONArray jsonArr = null;
	
	Iterator mIterator = null;
	
	String key = null;
	
	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if (store_id == null || user_sid == null || db_name == null || po_id == null || vendor_id < 1 || po_items_list_str == null) {
			out.print(-1);
	        throw new Exception();
	    }
		mPreparedStatementParams = new PreparedStatementParams();
		
		query.append(String.format("SELECT COUNT(`sid`) AS `count` FROM `%s`.`tb_po_%s` WHERE `po_id`=?", db_name, store_id));
		mPreparedStatementParams.set(po_id);
		// 쿼리 입력
		if (MyDBUtil.getInstance().getInt(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams,"count") > 0) {
			out.print(1);
			throw new Exception();
		}
		if (query.length() > 0) query.delete(0, query.length());

		query.append(String.format("INSERT INTO `%s`.`tb_po_%s` SET `po_id`=?,`vendor_id`=%d,`status`=4,`orderer_id`=%s,`fulfiller_id`=%s,`receiver_id`=%s,`order_date`=NOW(),`fulfill_date`=NOW(),`receive_date`=NOW(); SELECT LAST_INSERT_ID() AS `id`;", db_name, store_id,vendor_id, user_sid, user_sid, user_sid));
		mPreparedStatementParams.set(po_id);
		
		po_sid = MyDBUtil.getInstance().getInt(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, "id");

		if (po_sid < 1) {
			out.print(-2);
			throw new Exception();
		}
		
		if (query.length() > 0) query.delete(0, query.length());
		
		if (po_serialized_items != null && po_serialized_items.length() > 0) {
			try {
				jsonObj = (JSONObject)(new JSONParser()).parse(po_serialized_items);
				mIterator = jsonObj.keySet().iterator();
				while(mIterator.hasNext()) {
					key = (String)mIterator.next();
					jsonArr = (JSONArray)jsonObj.get(key);
					if (jsonArr.size() > 0) {
						for (int i = 0; i < jsonArr.size(); i++) {
							if (jsonArr.get(i) != null) {
								query.append(String.format("INSERT INTO `%s`.`tb_po_items_%s` SET", db_name, store_id));
								query.append(String.format(" `po_sid`=%d,",po_sid));
								query.append(String.format(" `item_sid`=?,"));
								mPreparedStatementParams.set(key);
								query.append(String.format(" `serial_no`='%s',", jsonArr.get(i).toString()));
								query.append(String.format(" `order_qty`=1,`fulfill_qty`=1,`receive_qty`=1,`received_date`=NOW(),`status`=1,`fee_sid`=0;"));
							}
						}
					}
					jsonArr = null;
					key = null;
				}
				MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams);
				query.delete(0, query.length());
				
				jsonObj = null;
				mIterator = null;
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		jsonArr = (JSONArray)(new JSONParser()).parse(po_items_list_str);
		for (int i = 0; i < jsonArr.size(); i++) {
			jsonObj = (JSONObject)jsonArr.get(i);
			if (jsonObj.get("item_sid") == null || jsonObj.get("item_type") == null || jsonObj.get("pre_qty") == null) {
				jsonObj = null;
				continue;
			}
			if (jsonObj.get("item_type").toString().equals("3")) {
				query.append(String.format("INSERT INTO `%s`.`tb_po_items_%s` SET", db_name, store_id));
				query.append(String.format(" `po_sid`=%d,", po_sid));
				query.append(String.format(" `item_cost`=%s,", jsonObj.get("item_cost")));
				query.append(String.format(" `item_sid`='%s',", jsonObj.get("item_sid").toString()));
				query.append(String.format(" `order_qty`='%s',`fulfill_qty`='%s',`receive_qty`='%s',", jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString()));
				query.append(String.format(" `received_date`=NOW(),`status`=1,`fee_sid`=0;"));
				
				inventory_sid = MyDBUtil.getInstance().getInt(String.format("SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (%s) LIMIT 0, 1", db_name, store_id, jsonObj.get("item_sid").toString()), "sid");
				
				if (inventory_sid > 0) {
					//query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `po_sid`=%d,`item_sid`=%s, `item_cost`=(`item_cost`*`qty`+%s*%s) / (`qty`+%s), `qty`=`qty`+%s, `update_date`=NOW(),`updater`='%s',`bin`=1 WHERE `sid`=%d;", 
					//db_name, store_id, po_sid,jsonObj.get("item_sid").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("item_cost").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString(), user_sid, inventory_sid));
					query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `po_sid`=%d,`item_sid`=%s, `item_cost`=(`item_cost`+%s) / 2, `qty`=`qty`+%s, `update_date`=NOW(),`updater`='%s',`bin`=1 WHERE `sid`=%d;", 
					db_name, store_id, po_sid,jsonObj.get("item_sid").toString(), jsonObj.get("item_cost").toString(), jsonObj.get("pre_qty").toString(), user_sid, inventory_sid));
				} else {
					query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s` SET `po_sid`=%d,`item_sid`=%s, `qty`=%s, `item_cost`=(%s*%s) / (%s), `update_date`=NOW(),`updater`='%s',`bin`=1;", 
					db_name, store_id, po_sid, jsonObj.get("item_sid").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("item_cost").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString(), user_sid));
				}
				/*
				query.append(String.format(" INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`item_cost`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty`,`item_cost` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d') AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid` WHERE item_sid = %s; ",
						db_name, 		store_id, 																																																	db_name, 			store_id, 			po_sid, 																								db_name, store_id, 		po_sid, jsonObj.get("item_sid").toString()
				));

				query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET item_cost = (SELECT (SUM(item_cost*receive_qty)/SUM(receive_qty)) AS item_cost FROM `%s`.`tb_po_items_%s` WHERE item_sid = '%s' GROUP BY item_sid) WHERE item_sid = '%s';",
						db_name, 		store_id,db_name, 		store_id, jsonObj.get("item_sid").toString(), jsonObj.get("item_sid").toString()
						));
				*/
			}
			else {
				query.append(String.format("UPDATE `%s`.`tb_po_items_%s` SET", db_name, store_id));
				query.append(String.format(" `item_cost`='%s'", jsonObj.get("item_cost").toString()));
				query.append(String.format(" WHERE `item_sid`='%s' and `po_sid`=%d;", jsonObj.get("item_sid").toString(), po_sid));
				
				query.append(String.format(" INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`item_cost`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty`,`item_cost` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d') AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid` WHERE item_sid = %s; ",
						db_name, 		store_id, 																																																	db_name, 			store_id, 			po_sid, 																								db_name, store_id, 		po_sid, jsonObj.get("item_sid").toString()
				));
			}
			jsonObj = null;
		}
		
		/* query.append(String.format(" INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`cost`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty`,`item_cost` as cost FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d') AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid`; ",
											db_name, 		store_id, 																																																	db_name, 			store_id, 			po_sid, 																								db_name, store_id, 		po_sid
		)); */
		//System.out.println(query);
		if (po_costs != null && po_costs.length() > 0) {
			jsonArr = (JSONArray)(new JSONParser()).parse(po_costs);
			for (int i = 0; i < jsonArr.size(); i++) {
				
				jsonObj = (JSONObject)jsonArr.get(i);
				if (jsonObj.get("type") == null || jsonObj.get("description") == null || jsonObj.get("cost") == null) {
					jsonObj = null;
					continue;
				}
				query.append(String.format("INSERT INTO `%s`.`tb_po_costs_%s` SET", db_name, store_id));
				query.append(String.format(" `po_sid`=%d,", po_sid));
				query.append(String.format(" `type`=%s,", jsonObj.get("type").toString()));
				query.append(String.format(" `description`='%s',", MyDBUtil.addSlashes(jsonObj.get("description").toString())));
				query.append(String.format(" `cost`=%s,", jsonObj.get("cost").toString()));
				query.append(String.format(" `update_date`=NOW(),`updater`=%s;", user_sid));
				
				jsonObj = null;
			}
		}
		
		MyDBUtil.getInstance().execute(db_name, owner_id, store_id,query.toString());
		query.delete(0, query.length());
		
		out.print(0);
	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
		
		out.print(-1);
	}
	query = null;
%>