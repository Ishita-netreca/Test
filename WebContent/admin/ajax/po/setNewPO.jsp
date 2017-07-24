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
	
	int po_sid = 0;
	
	int qty = 0, item_type = 0, item_sid = 0;
	
	String po_id = MyRequestUtil.getString(request,"po_id", null);
	int vendor_sid = MyRequestUtil.getInt(request, "vendor_sid", 0);
	String po_items_list_str = MyRequestUtil.getString(request, "po_items_list_str", null);
	String po_costs = MyRequestUtil.getString(request, "po_costs", null);
	String item_cost = "";
	
	JSONObject jsonObj = null;
	JSONArray jsonArr = null;
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		if (MyDBUtil.getInstance().getInt(String.format("SELECT COUNT(`sid`) AS `count` FROM `%s`.`tb_po_%s` WHERE `po_id`='%s'", db_name, store_id, po_id),"count") > 0) {
			out.print(1);
	        throw new Exception();
		}
		
		po_sid = MyDBUtil.getInstance().getInt(String.format("INSERT INTO `%s`.`tb_po_%s` SET `po_id`='%s',`vendor_id`=%d,`status`=0,`orderer_id`=%s,`order_date`=NOW(); SELECT LAST_INSERT_ID() AS `id`;", db_name, store_id,po_id, vendor_sid, user_sid), "id");

		if (po_sid < 1) {
			out.print(-2);
			throw new Exception();
		}
		
		if (query.length() > 0) query.delete(0, query.length());
		
		jsonArr = (JSONArray)(new JSONParser()).parse(po_items_list_str);
		for (int i = 0; i < jsonArr.size(); i++) {
			jsonObj = (JSONObject)jsonArr.get(i);
			if (jsonObj.get("item_sid") == null || jsonObj.get("item_type") == null || jsonObj.get("qty") == null) {
				jsonObj = null;
				continue;
			}
			item_sid = Integer.parseInt(jsonObj.get("item_sid").toString());
			item_type = Integer.parseInt(jsonObj.get("item_type").toString());
			qty = Integer.parseInt(jsonObj.get("qty").toString());
			item_cost = jsonObj.get("item_cost").toString();
			
			switch (item_type) {
			case 0:
			case 1:
			case 2:
				for (int i2 = 0; i2 < qty; i2++) {
					query.append(String.format("INSERT INTO `%s`.`tb_po_items_%s` SET", db_name, store_id));
					query.append(String.format(" `po_sid`=%d,", po_sid));
					query.append(String.format(" `item_sid`=%d, `item_cost`='%s',", item_sid, item_cost));
					query.append(String.format(" `order_qty`=1,`status`=-1,`fee_sid`=0;"));
				}
				break;
			case 3:
				query.append(String.format("INSERT INTO `%s`.`tb_po_items_%s` SET", db_name, store_id));
				query.append(String.format(" `po_sid`=%d,", po_sid));
				query.append(String.format(" `item_sid`=%d,  `item_cost`='%s',", item_sid, item_cost));
				query.append(String.format(" `order_qty`=%d,", qty));
				query.append(String.format(" `status`=-1,`fee_sid`=0;"));
				break;
			}
			jsonObj = null;
		}

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

		MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString());
		query.delete(0, query.length());

		out.print(0);
	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>