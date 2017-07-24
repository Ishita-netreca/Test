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
	String to_store_id = MyRequestUtil.getString(request, "to_store_id", null);
	String trans_items_list_str = MyRequestUtil.getString(request, "trans_items_list_str", null);
	String trans_serialized_items = MyRequestUtil.getString(request, "trans_serialized_items", null);
	String trans_id = MyRequestUtil.getString(request, "trans_id", null);
	String note = MyRequestUtil.getString(request, "note", "");
	
	int trans_sid = 0;
	
	int inventory_sid = 0;
	
	JSONObject jsonObj = null, jsonObj2 = null;
	JSONArray jsonArr = null;
	
	Iterator mIterator = null;
	
	String key = null;
	
	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if (store_id == null || user_sid == null || db_name == null || trans_id == null || trans_items_list_str == null) {
			out.print(-1);
	        throw new Exception();
	    }
	    
		mPreparedStatementParams = new PreparedStatementParams();

		query.append(String.format("INSERT INTO `%s`.`tb_inventory_trans_%s`(`trans_id`,`request_id`,`req_date`,`req_user_sid`,`appr_date`,`appr_user_sid`,`fulfill_date`,`fulfill_user_sid`,`pickup_date`,`pickup_user_sid`,`recv_date`,`recv_user_sid`,`from_store_id`,`to_store_id`,`status`,`trans_flag`,`recv_memo`) VALUES('%s','%s',NOW(),'%s',NOW(),'%s',NOW(),'%s',NOW(),'%s',NOW(),'%s','%s','%s',5,1,'%s'); SELECT LAST_INSERT_ID() AS `id`;",
				db_name, db_name, trans_id, trans_id, user_sid, user_sid, user_sid, user_sid, user_sid,to_store_id,store_id, MyDBUtil.addSlashes(note)
		));
		
		trans_sid = MyDBUtil.getInstance().getInt(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, "id");

		if (trans_sid < 1) {
			out.print(-2);
			throw new Exception();
		}
		
		if (query.length() > 0) query.delete(0, query.length());
		
		if (trans_serialized_items != null && trans_serialized_items.length() > 0) {
			try {
				jsonObj = (JSONObject)(new JSONParser()).parse(trans_serialized_items);
				mIterator = jsonObj.keySet().iterator();
				while(mIterator.hasNext()) {
					key = (String)mIterator.next();
					jsonArr = (JSONArray)jsonObj.get(key);
					if (jsonArr.size() > 0) {
						for (int i = 0; i < jsonArr.size(); i++) {
							if (jsonArr.get(i) != null) {
								query.append(String.format("INSERT INTO `%s`.`tb_inventory_trans_items_%s` SET", db_name, db_name));
								query.append(String.format(" `trans_sid`=%d,",trans_sid));
								query.append(String.format(" `item_code`=(SELECT `item_code` FROM `%s`.`tb_item_dict_%s` WHERE `sid`=? LIMIT 0,1),",db_name,store_id));
								mPreparedStatementParams.set(key);
								query.append(String.format(" `serial_no`='%s',", jsonArr.get(i).toString()));
								query.append(String.format(" `req_qty`=1,`appr_qty`=1,`fulfill_qty`=1,`pickup_qty`=1,`recv_qty`=1;"));
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
		
		jsonArr = (JSONArray)(new JSONParser()).parse(trans_items_list_str);
		for (int i = 0; i < jsonArr.size(); i++) {
			jsonObj = (JSONObject)jsonArr.get(i);
			if (jsonObj.get("item_sid") == null || jsonObj.get("item_type") == null || jsonObj.get("pre_qty") == null) {
				jsonObj = null;
				continue;
			}
			if (jsonObj.get("item_type").toString().equals("3")) {
				query.append(String.format("INSERT INTO `%s`.`tb_inventory_trans_items_%s` SET", db_name, db_name));
				query.append(String.format(" `trans_sid`=%d,",trans_sid));
				query.append(String.format(" `item_code`='%s',", jsonObj.get("item_code").toString()));
				query.append(String.format(" `req_qty`='%s',`appr_qty`='%s',`fulfill_qty`='%s',`pickup_qty`='%s',`recv_qty`='%s';", jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString(), jsonObj.get("pre_qty").toString()));
			}
			
			jsonObj = null;
		}
		MyDBUtil.getInstance().execute(db_name, owner_id, store_id,query.toString());
		query.delete(0, query.length());
		
		query.append(String.format("INSERT INTO `%s`.`tb_fulfilled_bin_%s`(`serial_no`,`trans_sid`,`item_sid`,`update_date`,`updater`,`qty`,`bin`)", db_name, store_id));
        query.append(String.format("SELECT `a`.`serial_no`,`a`.`trans_sid`,`b`.`item_sid`,NOW() AS `update_date`,'%s' AS `updater`, '0' AS `qty`,'1' AS `bin` FROM (", user_sid));
        query.append(String.format("SELECT `serial_no`,`trans_sid`,`item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `fulfill_qty` > 0", db_name, db_name, trans_sid));
        query.append(String.format(") AS `a` LEFT JOIN ("));
        query.append(String.format("SELECT `sku`,`sid` AS `item_sid`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` < 3 AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `fulfill_qty` > 0)", db_name, store_id, db_name, db_name, trans_sid));
        query.append(String.format(" AND `sid` IN (SELECT `item_sid` AS `sid` FROM `%s`.`tb_inventory_%s` WHERE `qty` > 0)", db_name, store_id));
        query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code` WHERE `item_sid` IS NOT NULL;"));
	    
        query.append(String.format("INSERT INTO `%s`.`tb_fulfilled_bin_%s`(`trans_sid`,`item_sid`,`update_date`,`updater`,`qty`,`bin`)", db_name, store_id));
        query.append(String.format("SELECT `a`.`trans_sid`,`b`.`item_sid`,NOW() AS `update_date`,'%s' AS `updater`, '0' AS `qty`,'1' AS `bin` FROM (", user_sid));
        query.append(String.format("SELECT `trans_sid`,`item_code`,`fulfill_qty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `fulfill_qty` > 0 AND `serial_no` IS NULL", db_name, db_name, trans_sid));
        query.append(String.format(") AS `a` LEFT JOIN ("));
        query.append(String.format("SELECT `sku`,`item_code`,`sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type`='3' AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `fulfill_qty` > 0 AND `serial_no` IS NULL)", db_name, store_id, db_name, db_name, trans_sid));
        query.append(String.format(" AND `sid` IN (SELECT `item_sid` AS `sid` FROM `%s`.`tb_inventory_%s` WHERE `qty` > 0)", db_name, store_id));
        query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code` WHERE `item_sid` IS NOT NULL;"));
        
		query.append(String.format("DELETE FROM `%s`.`tb_inventory_%s` WHERE `serial_no` IN (SELECT `serial_no` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `serial_no` IS NOT NULL AND `trans_sid`='%s' AND `recv_qty` > 0);", db_name, store_id, db_name, db_name, trans_sid));
		
		query.append(String.format("UPDATE `%s`.`tb_inventory_%s` AS `inven`, (", db_name, store_id));
        query.append(String.format("SELECT `b`.`trans_sid`,`a`.`item_sid`,`b`.`recv_qty` FROM ("));
        query.append(String.format("SELECT `sid` AS `item_sid`,`sku`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL)", db_name, store_id, db_name, db_name, trans_sid));
        query.append(String.format(") AS `a` LEFT JOIN ("));
        query.append(String.format("SELECT `trans_sid`,`item_code`,`recv_qty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL", db_name, db_name, trans_sid));
        query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code`"));
        query.append(String.format(") AS `trans` SET"));
        query.append(String.format("`inven`.`qty`=`inven`.`qty`-`trans`.`recv_qty`"));
        query.append(String.format("WHERE `inven`.`item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL));", db_name, store_id, db_name, db_name, trans_sid));
		
		query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s`(`serial_no`,`trans_sid`,`item_sid`,`update_date`,`updater`,`qty`,`bin`,`item_cost`)", db_name, to_store_id));
        query.append(String.format("SELECT `a`.`serial_no`,`a`.`trans_sid`,`b`.`item_sid`,NOW() AS `update_date`,'%s' AS `updater`, '0' AS `qty`,'1' AS `bin`,`b`.`item_cost` FROM (", user_sid));
        query.append(String.format("SELECT `serial_no`,`trans_sid`,`item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0", db_name, db_name, trans_sid));
        query.append(String.format(") AS `a` LEFT JOIN ("));
        query.append(String.format("SELECT `sku`,`sid` AS `item_sid`,`item_code`,`item_cost` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` < 3 AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0)", db_name, to_store_id, db_name, db_name, trans_sid));
        query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code` WHERE `serial_no` NOT IN ("));
        query.append(String.format("SELECT `serial_no` FROM `%s`.`tb_inventory_%s` WHERE `serial_no` IN (SELECT `serial_no` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0)", db_name, to_store_id, db_name, db_name, trans_sid));
        query.append(String.format(") AND `item_sid` IS NOT NULL;"));
		
        // Update Serialized Item's Qty into Inventory Table
        query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=`qty`+1 WHERE `serial_no` IN (SELECT `serial_no` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0);", db_name, to_store_id, db_name, db_name, trans_sid));
        
	    // Insert Non-Serialized Item into Inventory Table if not exists
        query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s`(`trans_sid`,`item_sid`,`update_date`,`updater`,`qty`,`bin`,`item_cost`)", db_name, to_store_id));
        query.append(String.format("SELECT `a`.`trans_sid`,`b`.`item_sid`,NOW() AS `update_date`,'%s' AS `updater`, '0' AS `qty`,'1' AS `bin`,`b`.`item_cost` FROM (", user_sid));
        query.append(String.format("SELECT `trans_sid`,`item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL", db_name, db_name, trans_sid));
        query.append(String.format(") AS `a` LEFT JOIN ("));
        query.append(String.format("SELECT `sku`,`item_code`,`sid` AS `item_sid`,`item_cost` FROM `%s`.`tb_item_dict_%s` WHERE `item_type`='3' AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL)", db_name, to_store_id, db_name, db_name, trans_sid));
        query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code` WHERE `item_sid` NOT IN ("));
        query.append(String.format("SELECT `item_sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL))", db_name, to_store_id, db_name, to_store_id, db_name, db_name, trans_sid));
        query.append(String.format(") AND `item_sid` IS NOT NULL;"));

        // Update Non-Serialized Item's Qty into Inventory Table
        query.append(String.format("UPDATE `%s`.`tb_inventory_%s` AS `inven`, (", db_name, to_store_id));
        query.append(String.format("SELECT `b`.`trans_sid`,`a`.`item_sid`,`b`.`recv_qty` FROM ("));
        query.append(String.format("SELECT `sid` AS `item_sid`,`sku`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL)", db_name, to_store_id, db_name, db_name, trans_sid));
        query.append(String.format(") AS `a` LEFT JOIN ("));
        query.append(String.format("SELECT `trans_sid`,`item_code`,`recv_qty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL", db_name, db_name, trans_sid));
        query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code`"));
        query.append(String.format(") AS `trans` SET"));
        query.append(String.format("`inven`.`qty`=`inven`.`qty`+`trans`.`recv_qty`"));
        query.append(String.format("WHERE `inven`.`item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `recv_qty` > 0 AND `serial_no` IS NULL));", db_name, to_store_id, db_name, db_name, trans_sid));
		
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