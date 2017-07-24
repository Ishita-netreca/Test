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
		
		int promotion_sid = MyRequestUtil.getInt(request, "promotion_sid", -1);
		
		String description = MyRequestUtil.getString(request, "description", null);
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		String items_json_str = MyRequestUtil.getString(request, "items_json_str", null);
		
		JSONArray items = null;
		JSONObject item = null;
		
		int items_sid = 0;

		PreparedStatementParams mPreparedStatementParams = null;

		try {
		    if (store_id == null || user_sid == null || db_name == null || promotion_sid < 0 || description == null || start_date == null || end_date == null || items_json_str == null) {
		        throw new Exception();
		    }
			mPreparedStatementParams = new PreparedStatementParams();
			
			if (promotion_sid == 0) {
				query.append(String.format("INSERT INTO `%s`.`tb_promotion_%s` SET", db_name, store_id));
				query.append(String.format(" `description`=?,"));
				mPreparedStatementParams.set(description);
				query.append(String.format(" `start_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", start_date));
				query.append(String.format(" `end_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", end_date));
				query.append(String.format(" `update_date`=NOW(), `updater`='%s';", user_sid));
				query.append(String.format(" SELECT LAST_INSERT_ID() AS `id`;"));
				
				promotion_sid = MyDBUtil.getInstance().getInt(query.toString(), "id");
			} else {
				query.append(String.format("UPDATE `%s`.`tb_promotion_%s` SET", db_name, store_id));
				query.append(String.format(" `description`=?,"));
				mPreparedStatementParams.set(description);
				query.append(String.format(" `start_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", start_date));
				query.append(String.format(" `end_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", end_date));
				query.append(String.format(" `update_date`=NOW(), `updater`='%s'", user_sid));		
				query.append(String.format(" WHERE `sid`='%d'", promotion_sid));
				
				MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams);				
			}
			
			query.delete(0, query.length());
			
			if (promotion_sid > 0) {
				items = (JSONArray)new JSONParser().parse(items_json_str);
				
				for (int i = 0; i < items.size(); i++) {
					item = (JSONObject)items.get(i);
					if (item.get("sid") == null || item.get("carrier_sid") == null || item.get("sku") == null) continue;
					items_sid = Integer.parseInt(item.get("sid").toString());
					
					if (items_sid == 0) {
						query.append(String.format("INSERT INTO `%s`.`tb_promotion_items_%s` SET", db_name, store_id));
					} else {
						query.append(String.format("UPDATE `%s`.`tb_promotion_items_%s` SET", db_name, store_id));						
					}
					
					query.append(String.format(" `promotion_sid`='%d',`carrier_sid`=?,`sku`=?,", 
						promotion_sid
					));
					mPreparedStatementParams.set(item.get("carrier_sid").toString());
					mPreparedStatementParams.set(item.get("sku").toString());
					
					if (item.get("new_act_price") != null) {
						query.append(String.format(" `new_act_price`='%s',", item.get("new_act_price").toString()));
					}
					if (item.get("upg_price") != null) {
						query.append(String.format(" `upg_price`='%s',", item.get("upg_price").toString()));
					}
					if (item.get("port_in_price") != null) {
						query.append(String.format(" `port_in_price`='%s',", item.get("port_in_price").toString()));
					}
					if (item.get("sor_price") != null) {
						query.append(String.format(" `sor_price`='%s',", item.get("sor_price").toString()));
					}
					if (item.get("aal_price") != null) {
						query.append(String.format(" `aal_price`='%s',", item.get("aal_price").toString()));
					}
					if (item.get("aal_max_qty") != null) {
						query.append(String.format(" `aal_max_qty`='%s',", item.get("aal_max_qty").toString()));
					}
					if (item.get("aal_bogo_price") != null) {
						query.append(String.format(" `aal_bogo_price`='%s',", item.get("aal_bogo_price").toString()));
					}
					if (item.get("aal_bogo_max_qty") != null) {
						query.append(String.format(" `aal_bogo_max_qty`='%s',", item.get("aal_bogo_max_qty").toString()));
					}
					if (item.get("aal_pogo_price") != null) {
						query.append(String.format(" `aal_pogo_price`='%s',", item.get("aal_pogo_price").toString()));
					}
					if (item.get("aal_pogo_max_qty") != null) {
						query.append(String.format(" `aal_pogo_max_qty`='%s',", item.get("aal_pogo_max_qty").toString()));
					}
					
					if (query.lastIndexOf(",") == query.length() -1 ) query.deleteCharAt(query.length() - 1);
					
					if (items_sid > 0) {
						query.append(String.format(" WHERE `sid`='%d'", items_sid));
					}
					
					query.append(";");
				}
				
				out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams));
			}
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>