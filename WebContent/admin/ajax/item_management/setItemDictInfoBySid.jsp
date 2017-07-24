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
	
	int sid = MyRequestUtil.getInt(request, "sid", -1);
	
	int item_type = MyRequestUtil.getInt(request, "item_type", 3);
	String item_code = MyRequestUtil.getString(request, "item_code", null);
	String model = MyRequestUtil.getString(request, "model", null);
	String description = MyRequestUtil.getString(request, "description", null);
	String distributor = MyRequestUtil.getString(request, "distributor", null);
	int category = MyRequestUtil.getInt(request, "category", 0);
	int sub_category = MyRequestUtil.getInt(request, "sub_category", 0);
	String manufacturer = MyRequestUtil.getString(request, "manufacturer", null);
	String color = MyRequestUtil.getString(request, "color", null);
	String condition = MyRequestUtil.getString(request, "condition", null);
	String sku = MyRequestUtil.getString(request, "sku", null);
	String upc = MyRequestUtil.getString(request, "upc", null);
	float item_cost = MyRequestUtil.getFloat(request, "item_cost", 0);
	float retail_price = MyRequestUtil.getFloat(request, "retail_price", 0);
	float wholesale_price = MyRequestUtil.getFloat(request, "wholesale_price", 0);

	String image = MyRequestUtil.getString(request, "image", null);
	
	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	String table_description = null;
	String store_list_str = null;
	String [] store_list = null;
	
	try {
	    if ((!master_user_flag && !subdealer_user_flag && store_id == null) || user_sid == null || db_name == null || sid < 0 || (item_code == null || item_code.length() < 1)) {
	    	out.print(-1);
	        throw new Exception();
	    }
		// 쿼리 입력
		
		if (master_user_flag) {
			table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
		} else if (subdealer_user_flag) {
			table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
		} else {
			table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, store_id);
		}
		
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams();
		if (sid > 0) {
			query.append(String.format("SELECT COUNT(`sid`) AS `count` FROM %s WHERE (`sid`=? AND `item_code` != ?) AND `item_code`=?", table_description));
			mPreparedStatementParams.set(sid);
			mPreparedStatementParams.set(item_code);
			mPreparedStatementParams.set(item_code);
		} else {
			query.append(String.format("SELECT COUNT(`sid`) AS `count` FROM %s WHERE `item_code`=?", table_description));
			mPreparedStatementParams.set(item_code);
		}
	
		
		if (MyDBUtil.getInstance().getInt(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, "count") > 0) {
			out.print(1);
			throw new Exception();
		}
		
		if (query.length() > 0) query.delete(0, query.length());
		
		if (sid > 0) {
			query.append(String.format("UPDATE %s SET", table_description));			
		} else {
			query.append(String.format("INSERT INTO %s SET", table_description));
		}
		
		query.append(String.format("`item_type`=?, `update_date`=NOW(), `updater`=?, `item_code`=?"));
		mPreparedStatementParams.set(item_type);
		mPreparedStatementParams.set(user_sid);
		mPreparedStatementParams.set(item_code);
		
		if (sid == 0) {
			if (master_user_flag) {
				query.append(String.format(" ,`sid`=(SELECT `insert`.`sid` FROM (SELECT IF(MAX(`sid`) > 100000, MAX(`sid`)+1, 100001 ) AS `sid` FROM %s) AS `insert`)", table_description));
			} else if (subdealer_user_flag) {
				query.append(String.format(" ,`sid`=(SELECT `insert`.`sid` FROM (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`)+1, 300001 ) AS `sid` FROM %s) AS `insert`)", table_description));				
			} else {
				query.append(String.format(" ,`sid`=(SELECT `insert`.`sid` FROM (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`)+1, 300001 ) AS `sid` FROM %s) AS `insert`)", table_description));
			}
		}
		
		if (model != null && model.length() > 0) {
			query.append(String.format(" ,`model`=?"));
			mPreparedStatementParams.set(model);
		}
		
		if (description != null && description.length() > 0) {
			query.append(String.format(" ,`description`=?"));
			mPreparedStatementParams.set(description);
		}
		
		if (distributor != null && distributor.length() > 0) {
			query.append(String.format(" ,`distributor`=?"));
			mPreparedStatementParams.set(distributor);
		}
		
		query.append(String.format(" ,`category`=?"));
		mPreparedStatementParams.set(category);
		
		query.append(String.format(" ,`sub_category`=?"));
		mPreparedStatementParams.set(sub_category);
		
		if (manufacturer != null && manufacturer.length() > 0) {
			query.append(String.format(" ,`manufacturer`=?"));
			mPreparedStatementParams.set(manufacturer);
		}
		
		if (color != null && color.length() > 0) {
			query.append(String.format(" ,`color`=?"));
			mPreparedStatementParams.set(color);
		}
		
		if (condition != null && condition.length() > 0) {
			query.append(String.format(" ,`condition`=?"));
			mPreparedStatementParams.set(condition);
		}
		
		if (sku != null && sku.length() > 0) {
			query.append(String.format(" ,`sku`=?"));
			mPreparedStatementParams.set(sku);
		}
		
		if (upc != null && upc.length() > 0) {
			query.append(String.format(" ,`upc`=?"));
			mPreparedStatementParams.set(upc);
		}
		
		if (sid == 0) {
			query.append(String.format(" ,`item_cost`=?"));
			mPreparedStatementParams.set(item_cost);
			
			query.append(String.format(" ,`retail_price`=?"));
			mPreparedStatementParams.set(retail_price);
			
			query.append(String.format(" ,`wholesale_price`=?"));
			mPreparedStatementParams.set(wholesale_price);
		}
		
		if (image != null && image.length() > 0) {
			query.append(String.format(" ,`image`=?"));
			mPreparedStatementParams.set(image);
		}	
		
		
		if (sid > 0) {
			query.append(String.format(" WHERE `sid`=?;"));
			mPreparedStatementParams.set(sid);
		} else {
			query.append(String.format(";"));
		}
		
		if (subdealer_user_flag) {
			store_list_str = MyDBUtil.getInstance().getString(String.format("SELECT GROUP_CONCAT(`store_id` SEPARATOR '|') AS `store_list_str` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s' AND `store_id` IN (SELECT `store_id` FROM `%s`.`tb_stores`)", user_sid, db_name), "store_list_str");
			if (store_list_str != null && store_list_str.length() > 0) {
				store_list = store_list_str.split("\\|");				
				if (sid > 0) {
					for (int i = 0; i < store_list.length; i++) {
						/*
						query.append(String.format("DELETE FROM `%s`.`tb_item_dict_%s` WHERE `sid`=%d;", db_name, store_list[i], sid));
						query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` ( SELECT * FROM `%s`.`tb_item_dict_%s` WHERE `sid`=%d);", db_name, store_list[i], db_name, owner_id, sid));	
						*/

						
						query.append(String.format("UPDATE `%s`.`tb_item_dict_%s` SET", db_name, store_list[i]));			
						
						
						query.append(String.format("`item_type`=?, `update_date`=NOW(), `updater`=?, `item_code`=?"));
						mPreparedStatementParams.set(item_type);
						mPreparedStatementParams.set(user_sid);
						mPreparedStatementParams.set(item_code);
						
						if (model != null && model.length() > 0) {
							query.append(String.format(" ,`model`=?"));
							mPreparedStatementParams.set(model);
						}
						
						if (description != null && description.length() > 0) {
							query.append(String.format(" ,`description`=?"));
							mPreparedStatementParams.set(description);
						}
						
						if (distributor != null && distributor.length() > 0) {
							query.append(String.format(" ,`distributor`=?"));
							mPreparedStatementParams.set(distributor);
						}
						
						query.append(String.format(" ,`category`=?"));
						mPreparedStatementParams.set(category);
						
						query.append(String.format(" ,`sub_category`=?"));
						mPreparedStatementParams.set(sub_category);
						
						if (manufacturer != null && manufacturer.length() > 0) {
							query.append(String.format(" ,`manufacturer`=?"));
							mPreparedStatementParams.set(manufacturer);
						}
						
						if (color != null && color.length() > 0) {
							query.append(String.format(" ,`color`=?"));
							mPreparedStatementParams.set(color);
						}
						
						if (condition != null && condition.length() > 0) {
							query.append(String.format(" ,`condition`=?"));
							mPreparedStatementParams.set(condition);
						}
						
						if (sku != null && sku.length() > 0) {
							query.append(String.format(" ,`sku`=?"));
							mPreparedStatementParams.set(sku);
						}
						
						if (upc != null && upc.length() > 0) {
							query.append(String.format(" ,`upc`=?"));
							mPreparedStatementParams.set(upc);
						}						
						
						if (image != null && image.length() > 0) {
							query.append(String.format(" ,`image`=?"));
							mPreparedStatementParams.set(image);
						}	
						
						query.append(String.format(" WHERE `sid`=?;"));
						mPreparedStatementParams.set(sid);						
					}
				} else {
					for (int i = 0; i < store_list.length; i++) {
						query.append(String.format("DELETE FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`), 300001 ) AS `sid` FROM `%s`.`tb_item_dict_%s`);", db_name, store_list[i], db_name, owner_id));
						query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` ( SELECT * FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`), 300001 ) AS `sid` FROM `%s`.`tb_item_dict_%s`) );", db_name, store_list[i], db_name, owner_id, db_name, owner_id));						
					}
				}
			}
		}

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>