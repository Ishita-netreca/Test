<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	String user_sid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
	String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
	String timezone_offset = (session.getAttribute("wrp_admin_selected_store_timezone_offset") != null)? session.getAttribute("wrp_admin_selected_store_timezone_offset").toString() : null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", session.getAttribute("wrp_admin_selected_store_timezone_offset").toString());
	String po_items_list_str = MyRequestUtil.getString(request, "po_items_list_str", null);
	String po_serialized_items = MyRequestUtil.getString(request, "po_serialized_items", null);
	String po_costs = MyRequestUtil.getString(request, "po_costs", null);
	String po_id = MyRequestUtil.getString(request, "po_id", null);
	int vendor_id = MyRequestUtil.getInt(request, "vendor_id", 0);
	
	int po_sid = 0;
	
	JSONObject jsonObj = null, jsonObj2 = null;
	JSONArray jsonArr = null;
	
	Iterator mIterator = null;
	
	String key = null;
	
	try {
	    if (store_id == null || user_sid == null || owner_id == null || po_id == null || vendor_id < 1 || po_items_list_str == null) {
			out.print(-1);
	        throw new Exception();
	    }
		
		// 쿼리 입력
		if (MyDBUtil.getInt(String.format("SELECT COUNT(`sid`) AS `count` FROM `%s`.`tb_po_%s` WHERE `po_id`='%s'", owner_id, store_id, po_id),"count") > 0) {
			out.print(1);
			throw new Exception();
		}
		
		po_sid = MyDBUtil.getInt(String.format("INSERT INTO `%s`.`tb_po_%s` SET `po_id`='%s',`vendor_id`=%d,`status`=4,`orderer_id`=%s,`fulfiller_id`=%s,`receiver_id`=%s,`order_date`=NOW(),`fulfill_date`=NOW(),`receive_date`=NOW(); SELECT LAST_INSERT_ID() AS `id`;", owner_id, store_id,po_id, vendor_id, user_sid, user_sid, user_sid), "id");

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
								query.append(String.format("INSERT INTO `%s`.`tb_po_items_%s` SET", owner_id, store_id));
								query.append(String.format(" `po_sid`=%d,",po_sid));
								query.append(String.format(" `item_sid`='%s',", key));
								query.append(String.format(" `serial_no`='%s',", jsonArr.get(i).toString()));
								query.append(String.format(" `order_qty`=1,`fulfill_qty`=1,`receive_qty`=1,`received_date`=NOW(),`status`=1,`fee_sid`=0;"));
							}
						}
					}
					jsonArr = null;
					key = null;
				}
				/* MyDBUtil.execute(query.toString()); */
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
				query.append(String.format("INSERT INTO `%s`.`tb_po_items_%s` SET", owner_id, store_id));
				query.append(String.format(" `po_sid`=%d,", po_sid));
				query.append(String.format(" `item_cost`=%d,", jsonObj.get("item_cost")));
				query.append(String.format(" `item_sid`='%s',", jsonObj.get("item_sid").toString()));
				query.append(String.format(" `order_qty`='%s',`fulfill_qty`='%s',`receive_qty`='%s',", jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString()));
				query.append(String.format(" `received_date`=NOW(),`status`=1,`fee_sid`=0;"));
			}
			else if (jsonObj.get("item_type").toString().equals("0")) {
				query.append(String.format("UPDATE `%s`.`tb_po_items_%s` SET", owner_id, store_id));
				query.append(String.format(" `item_cost`='%s'", jsonObj.get("item_cost").toString()));
				query.append(String.format(" WHERE `item_sid`='%s' and `po_sid`=%d;", jsonObj.get("item_sid").toString(), po_sid));
			}
			jsonObj = null;
		}
		
		query.append(String.format(" INSERT INTO `%s`.`tb_inventory_%s`(`po_sid`,`item_sid`,`serial_no`,`qty`,`updater`,`update_date`,`bin`) SELECT `a`.*,`b`.`updater`,`b`.`update_date`, 1 AS `bin` FROM (SELECT `po_sid`,`item_sid`,`serial_no`,`receive_qty` AS `qty` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d') AS `a` LEFT JOIN (SELECT `sid`,`receiver_id` AS `updater`,`receive_date` AS `update_date` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `b` ON `a`.`po_sid`=`b`.`sid`;",
											owner_id, 		store_id, 																																																	owner_id, 			store_id, 			po_sid, 																								owner_id, store_id, 		po_sid
		));
		
		if (po_costs != null && po_costs.length() > 0) {
			
			jsonArr = (JSONArray)(new JSONParser()).parse(po_costs);
			for (int i = 0; i < jsonArr.size(); i++) {
				jsonObj = (JSONObject)jsonArr.get(i);
				if (jsonObj.get("type") == null || jsonObj.get("description") == null || jsonObj.get("cost") == null) {
					jsonObj = null;
					continue;
				}
				query.append(String.format("INSERT INTO `%s`.`tb_po_costs_%s` SET", owner_id, store_id));
				query.append(String.format(" `po_sid`=%d,", po_sid));
				query.append(String.format(" `type`=%s,", jsonObj.get("type").toString()));
				query.append(String.format(" `description`='%s',", MyDBUtil.addSlashes(jsonObj.get("description").toString())));
				query.append(String.format(" `cost`=%s,", jsonObj.get("cost").toString()));
				query.append(String.format(" `update_date`=NOW(),`updater`=%s;", user_sid));
				
				jsonObj = null;
			}
		}
		
		MyDBUtil.execute(query.toString());
		query.delete(0, query.length());
		
		out.print(0);
	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>