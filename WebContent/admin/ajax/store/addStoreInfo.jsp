<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer(), query2 = new StringBuffer();

		int intTmp = 0;

		JSONObject jsonObj = null;
		JSONArray tables = null;
		
		String table_name = null;
 
		int store_sid = MyRequestUtil.getInt(request, "storeSid", 0);
		String store_id = MyRequestUtil.getString(request, "storeId", "");
		String name = MyRequestUtil.getString(request, "name", "");
		String address1 = MyRequestUtil.getString(request, "address1", "");
		String address2 = MyRequestUtil.getString(request, "address2", "");
		String city = MyRequestUtil.getString(request, "city", "");
		String state = MyRequestUtil.getString(request, "state", "");
		String zipcode = MyRequestUtil.getString(request, "zipcode", "");
		int poscnt = MyRequestUtil.getInt(request, "poscnt", 0);
		int protection = MyRequestUtil.getInt(request, "protection", 1);
		String tel = MyRequestUtil.getString(request, "tel", "");
		String fax = MyRequestUtil.getString(request, "fax", "");
		float tax_rate = MyRequestUtil.getFloat(request, "taxRate", (float)0.4);
		String marketCode = MyRequestUtil.getString(request, "marketCode", "");
		String districtCode = MyRequestUtil.getString(request, "districtCode", "");
		//String owner = MyRequestUtil.getString(request, "owner", null);
		int status = MyRequestUtil.getInt(request, "status", 0);
		int active = MyRequestUtil.getInt(request, "active", 0);
		String asapId = MyRequestUtil.getString(request, "asapId", "");
		String asapPassword = MyRequestUtil.getString(request, "asapPassword", "");
		String qpayId = MyRequestUtil.getString(request, "qpayId", "");
		String qpayPassword = MyRequestUtil.getString(request, "qpayPassword", "");
		String qpayInvenId = MyRequestUtil.getString(request, "qpayInvenId", "");
		String qpayInvenPassword = MyRequestUtil.getString(request, "qpayInvenPassword", "");
		String qpayApiId = MyRequestUtil.getString(request, "qpayApiId", "");
		String qpayApiPassword = MyRequestUtil.getString(request, "qpayApiPassword", "");
		String qpayApiKey = MyRequestUtil.getString(request, "qpayApiKey", "");
		String xbmId = MyRequestUtil.getString(request, "xbmId", "");
		String xbmPassword = MyRequestUtil.getString(request, "xbmPassword", "");
		String year = MyRequestUtil.getString(request, "year", "");
		String month = MyRequestUtil.getString(request, "month", "");
		String open_time = MyRequestUtil.getString(request, "open_time", "");
		String close_time = MyRequestUtil.getString(request, "close_time", "");
		String daily_work_hour = MyRequestUtil.getString(request, "daily_work_hour", "");
		String weekly_work_hour = MyRequestUtil.getString(request, "weekly_work_hour", "");
		int clock_in_sales_only = MyRequestUtil.getInt(request, "clock_in_sales_only", 0);
		int all_permissions_allow = MyRequestUtil.getInt(request, "all_permissions_allow", 0);
		int return_only_store_credit = MyRequestUtil.getInt(request, "return_only_store_credit", 0);
		int external_clockio = MyRequestUtil.getInt(request, "external_clockio", 0);
		String open_date = MyRequestUtil.getString(request, "open_date", null);
		String external_clockio_url = MyRequestUtil.getString(request, "external_clockio_url", "");
		try {
		    if (store_id == null || user_id == null || store_sid < 0 || owner_sid == null) {
		    	throw new Exception();     
		    }
		    /*
			query.append(String.format("SELECT `sid` FROM `tb_stores` WHERE `store_id`='%s';", store_id));
			
			intTmp = MyDBUtil.getInt(query.toString(), "sid");
					*/
			int st = MyDBUtil.getInstance().getInt(String.format("SELECT c.*, d.c_store FROM (SELECT b.*, a.`license` FROM `wrp`.`tb_owner_info` AS a, `wrp`.`tb_user` AS b WHERE a.user_sid = b.sid AND a.user_sid='%s') AS c LEFT JOIN (SELECT COUNT(*) AS c_store, owner_sid FROM wrp.tb_stores WHERE active = 1 GROUP BY owner_sid) AS d ON c.sid = d.owner_sid;",user_sid), "c_store");
			if(active != 0){
				int li = MyDBUtil.getInstance().getInt(String.format("SELECT c.*, d.c_store FROM (SELECT b.*, a.`license` FROM `wrp`.`tb_owner_info` AS a, `wrp`.`tb_user` AS b WHERE a.user_sid = b.sid AND a.user_sid='%s') AS c LEFT JOIN (SELECT COUNT(*) AS c_store, owner_sid FROM wrp.tb_stores WHERE active = 1 GROUP BY owner_sid) AS d ON c.sid = d.owner_sid;",user_sid), "license");
				if (st >= li){ // license 0
					out.print("5"); 
					return;
				}
			}
			
			query.delete(0, query.length());
			
			query.append(String.format("SELECT `a`.*,IF (`b`.`user_id` IS NOT NULL, 1, 0) AS `owner_flag` FROM ("));
			query.append(String.format(" SELECT * FROM `wrp`.`tb_user` WHERE `sid`='%s' AND `sid`=`owner_sid`", owner_sid));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `user_id` FROM `wrp`.`tb_owner_info`"));
			query.append(String.format(" ) AS `b` ON `a`.`user_id`=`b`.`user_id`"));
			
			if (db_name == null) {
				out.print(4);
				throw new Exception();
			}
			
			query.delete(0, query.length());
			
			query.append(String.format("CREATE DATABASE IF NOT EXISTS %s;", db_name));
			query.append(String.format("CREATE TABLE IF NOT EXISTS `%s`.`tb_stores` LIKE `wrp`.`tb_stores`;", db_name));
			
			if (store_sid > 0) { // UPDATE
				query.append(String.format("UPDATE `wrp`.`tb_stores` SET"));
				query2.append(String.format("UPDATE `%s`.`tb_stores` SET", db_name));
			} else { // INSERT		
				query.append(String.format("INSERT INTO `wrp`.`tb_stores` SET"));
				query.append(String.format(" `store_id`='%s',", store_id.toUpperCase()));
				query.append(String.format(" `transaction_protection`='%d',", protection));
				query2.append(String.format("INSERT INTO `%s`.`tb_stores` SET", db_name));
				query2.append(String.format(" `store_id`='%s',", store_id.toUpperCase()));
				query2.append(String.format(" `transaction_protection`='%d',", protection));
			}

			if (name != null) {
				query.append(String.format(" `name`='%s',", name));
				query2.append(String.format(" `name`='%s',", name));
			}
			if (address1 != null) {
				query.append(String.format(" `address1`='%s',", address1));
				query2.append(String.format(" `address1`='%s',", address1));
			}
			if (address2 != null) {
				query.append(String.format(" `address2`='%s',", address2));
				query2.append(String.format(" `address2`='%s',", address2));
			}
			if (city != null) {
				query.append(String.format(" `city`='%s',", city));
				query2.append(String.format(" `city`='%s',", city));
			}
			if (state != null) {
				query.append(String.format(" `state`='%s',", state));
				query2.append(String.format(" `state`='%s',", state));
			}
			if (marketCode != null) { 
				query.append(String.format(" `market_code`='%s',", marketCode));
				query2.append(String.format(" `market_code`='%s',", marketCode));
			}
            if (districtCode != null) { 
            	query.append(String.format(" `district_code`='%s',", districtCode));
            	query2.append(String.format(" `district_code`='%s',", districtCode));
            }
			if (zipcode != null) {
				query.append(String.format(" `zipcode`='%s',", zipcode));
				query2.append(String.format(" `zipcode`='%s',", zipcode));
			}
			if (tel != null) {
				query.append(String.format(" `tel`='%s',", tel));
				query2.append(String.format(" `tel`='%s',", tel));
			}
			if (fax != null) {
				query.append(String.format(" `fax`='%s',", fax));
				query2.append(String.format(" `fax`='%s',", fax));
			}
			if (open_date != null) {
				query.append(String.format(" `open_date`=str_to_date('%s','%%m/%%d/%%Y'),", open_date));
				query2.append(String.format(" `open_date`=str_to_date('%s','%%m/%%d/%%Y'),", open_date));
			}
			if (open_time != null) {
				query.append(String.format(" `open_time`='%s',", open_time));
				query2.append(String.format(" `open_time`='%s',", open_time));
			}
			if (close_time != null) {
				query.append(String.format(" `close_time`='%s',", close_time));
				query2.append(String.format(" `close_time`='%s',", close_time));
			}
			if (daily_work_hour != null) {
				query.append(String.format(" `daily_work_hour`='%s',", daily_work_hour));
				query2.append(String.format(" `daily_work_hour`='%s',", daily_work_hour));
			}
			if (weekly_work_hour != null) {
				query.append(String.format(" `weekly_work_hour`='%s',", weekly_work_hour));
				query2.append(String.format(" `weekly_work_hour`='%s',", weekly_work_hour));
			}
			query.append(String.format(" `tax_rate`='%.4f',", tax_rate));
			query2.append(String.format(" `tax_rate`='%.4f',", tax_rate));
			
			query.append(String.format(" `timezone_id`='US/Pacific',"));
			query2.append(String.format(" `timezone_id`='US/Pacific',"));
			
			query.append(String.format(" `active`='%d',", active));
			query2.append(String.format(" `active`='%d',", active));
			
			query.append(String.format(" `clock_in_sales_only`='%d',", clock_in_sales_only));
			query2.append(String.format(" `clock_in_sales_only`='%d',", clock_in_sales_only));
			
			query.append(String.format(" `all_permissions_allow`='%d',", all_permissions_allow));
			query2.append(String.format(" `all_permissions_allow`='%d',", all_permissions_allow));
			
			query.append(String.format(" `return_only_store_credit`='%d',", return_only_store_credit));
			query2.append(String.format(" `return_only_store_credit`='%d',", return_only_store_credit));
			query.append(String.format(" `external_clockio`='%d',", external_clockio));
			query2.append(String.format(" `external_clockio`='%d',", external_clockio));
			query.append(String.format(" `external_clockio_url`='%s',", external_clockio_url));
			query2.append(String.format(" `external_clockio_url`='%s',", external_clockio_url));
			query.append(String.format(" `status`='%d', `owner_sid`='%s', `master_sid`='%s'", status, owner_sid, master_sid));
			query2.append(String.format(" `status`='%d', `owner_sid`='%s', `master_sid`='%s'", status, owner_sid, master_sid));

			if (store_sid > 0) { // UPDATE				
				query.append(String.format(" WHERE `sid`='%d' AND `store_id`='%s';", store_sid, store_id));
				query2.append(String.format(" WHERE `sid`='%d' AND `store_id`='%s';", store_sid, store_id));
			} else { // INSERT				
				query.append(";");		
				//query2.append(String.format(";CREATE TABLE IF NOT EXISTS `%s`.`tb_manager_store_assigned` LIKE `wrp`.`tb_manager_store_assigned`;CREATE TABLE IF NOT EXISTS `%s`.`tb_user_store_access` LIKE `wrp`.`tb_user_store_access`;", db_name, db_name));
				query2.append(String.format(";CREATE TABLE IF NOT EXISTS `%s`.`tb_user_store_access` LIKE `wrp`.`tb_user_store_access`;", db_name, db_name));
				
				//query2.append(String.format("DELETE FROM `%s`.`tb_manager_store_assigned` WHERE `store_id`='%s' AND `user_id`='%s';", db_name, store_id, db_name));
				//query2.append(String.format("DELETE FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s';", db_name, store_id));
				//query2.append(String.format("INSERT INTO `%s`.`tb_manager_store_assigned` SET `store_id`='%s', `user_id`='%s';", db_name, store_id, db_name));
				//query2.append(String.format("INSERT INTO `%s`.`tb_user_store_access` SET `store_id`='%s', `user_id`='%s',`user_sid`='%s';", db_name, store_id, db_name,user_sid));
			}	
			
			query.append(query2.toString());
			
			query2.delete(0, query2.length());
			intTmp = MyDBUtil.getInstance().execute(query.toString());
			if (intTmp != 0) {
				out.print(String.format("%d", (-1000 + intTmp)));
				throw new Exception();
			}
			
			if (store_sid == 0) {
				query.delete(0, query.length());

				query.append(String.format("SELECT DISTINCT `table_name` FROM `information_schema`.`tables` WHERE `table_schema`='wrp' AND `table_name` LIKE '%%[storeid]' OR (`table_schema`='wrp' AND (`table_name`='tb_bin' OR `table_name`='tb_bin_type' OR `table_name`='tb_categories_dict' OR `table_name`='tb_fee_dict' OR `table_name`='tb_user_permission'));"));

				
				tables = MyDBUtil.getInstance().getList(query.toString());
					
				
				if (tables != null) {
					query.delete(0, query.length());
					
					for (int i = 0; i < tables.size(); i++) {
						jsonObj = (JSONObject)tables.get(i);
						if (jsonObj == null) {
							continue;
						}
						
						if (jsonObj.get("table_name") != null) {
							table_name = jsonObj.get("table_name").toString();
							if (table_name.indexOf("[storeid]") > -1) {
								query.append(String.format("CREATE TABLE IF NOT EXISTS `%s`.`%s` LIKE `wrp`.`%s`;", db_name, table_name.replace("[storeid]", store_id), table_name));
								
								if(table_name.indexOf("tb_bin_dict") == 0) query.append(String.format("INSERT INTO `%s`.`%s` SELECT * FROM `wrp`.`%s`;", db_name ,table_name.replace("[storeid]", store_id), table_name));
								
							} else {
								query.append(String.format("CREATE TABLE IF NOT EXISTS `%s`.`%s_%s` LIKE `wrp`.`%s`;", db_name, table_name, store_id, table_name));	
								
								query.append(String.format("INSERT INTO `%s`.`%s_%s` SELECT * FROM `wrp`.`%s`;", db_name ,table_name, store_id, table_name));	
							}
						}
					}
					query.append(String.format("INSERT INTO `%s`.`tb_store_archievement_%s` SET `box_sales_goal`='250', `accessory_goal`='250', `more_than_50_mrc_new_goal`='125', `year`='%s', `month`='%s', `week`='0';", db_name, store_id, year, month));
					query.append(String.format("INSERT INTO `%s`.`tb_cash_register_%s` SET `register_no`='1', `description`='station1', `update_date`=now(), `updater`='%s';", db_name, store_id, owner_sid));
					query.append(String.format("UPDATE `%s`.`tb_expense_dict_%s` SET `update_date`=now(), `updater`='%s';", db_name, store_id, owner_sid));
					
					query.append(String.format("INSERT INTO `%s`.`tb_promotion_%s` (SELECT * FROM `wrp`.`tb_promotion_[storeid]` WHERE `sid` BETWEEN 1 AND 100000);INSERT INTO `%s`.`tb_promotion_items_%s` (promotion_sid, carrier_sid, sku, new_act_price, upg_price, port_in_price, sor_price, aal_price, aal_max_qty, aal_bogo_price, aal_bogo_max_qty, aal_pogo_price, aal_pogo_max_qty) (SELECT promotion_sid, carrier_sid, sku, new_act_price, upg_price, port_in_price, sor_price, aal_price, aal_max_qty, aal_bogo_price, aal_bogo_max_qty, aal_pogo_price, aal_pogo_max_qty FROM `wrp`.`tb_promotion_items_[storeid]` WHERE `promotion_sid` BETWEEN 1 AND 100000);", db_name, store_id, db_name, store_id));
		            query.append(String.format("INSERT INTO `%s`.`tb_rateplan_%s` (SELECT * FROM `wrp`.`tb_rateplan_[storeid]` WHERE `sid` BETWEEN 1 AND 100000);", db_name, store_id));
		            query.append(String.format("INSERT INTO `%s`.`tb_expense_dict_%s` (SELECT * FROM wrp.`tb_expense_dict_[storeid]` WHERE `sid` BETWEEN 1 AND 100000);", db_name, store_id));
		            query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` (SELECT * FROM %s.`tb_item_dict_%s` WHERE `sid` BETWEEN 1 AND 100000);", db_name, store_id, db_name, owner_id));
				}
				
			}
			
			out.print(MyDBUtil.getInstance().execute(query.toString()));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
            	e.printStackTrace();
            }
		}
		query = null;
		query2 = null;
%>