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

		String items_json_str = MyRequestUtil.getString(request, "items_json_str", null);
		
		JSONArray items = null;
		JSONObject item = null;

		int rebate_item_sid = 0;
		int promotion_item_sid = 0;
		
		try {
		    if (store_id == null || user_sid == null || db_name == null || items_json_str == null) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			items = (JSONArray)new JSONParser().parse(items_json_str);
			
			for (int i = 0; i < items.size(); i++) {
				item = (JSONObject)items.get(i);
				if (item.get("rebate_item_sid") == null || item.get("promotion_item_sid") == null) continue;
				rebate_item_sid = Integer.parseInt(item.get("rebate_item_sid").toString());
				promotion_item_sid = Integer.parseInt(item.get("promotion_item_sid").toString());
				
				if (rebate_item_sid == 0) {
					query.append(String.format("INSERT INTO `%s`.`tb_rebate_items_%s` SET", db_name, store_id));
				} else {
					query.append(String.format("UPDATE `%s`.`tb_rebate_items_%s` SET", db_name, store_id));						
				}
				
				query.append(String.format(" `promotion_item_sid`='%d',", promotion_item_sid));
				
				if (item.get("new_act_rebate") != null) {
					query.append(String.format(" `new_act_rebate`='%s',", item.get("new_act_rebate").toString()));
				}
				if (item.get("upg_rebate") != null) {
					query.append(String.format(" `upg_rebate`='%s',", item.get("upg_rebate").toString()));
				}
				if (item.get("port_in_rebate") != null) {
					query.append(String.format(" `port_in_rebate`='%s',", item.get("port_in_rebate").toString()));
				}
				if (item.get("sor_rebate") != null) {
					query.append(String.format(" `sor_rebate`='%s',", item.get("sor_rebate").toString()));
				}
				if (item.get("aal_rebate") != null) {
					query.append(String.format(" `aal_rebate`='%s',", item.get("aal_rebate").toString()));
				}
				if (item.get("aal_bogo_rebate") != null) {
					query.append(String.format(" `aal_bogo_rebate`='%s',", item.get("aal_bogo_rebate").toString()));
				}
				if (item.get("aal_pogo_rebate") != null) {
					query.append(String.format(" `aal_pogo_rebate`='%s',", item.get("aal_pogo_rebate").toString()));
				}
				
				if (query.lastIndexOf(",") == query.length() -1 ) query.deleteCharAt(query.length() - 1);
				
				if (rebate_item_sid > 0) {
					query.append(String.format(" WHERE `sid`='%d'", rebate_item_sid));
				}
				
				query.append(";");
			}
			
			out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString()));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>