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

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	String item_code = MyRequestUtil.getString(request, "item_code", null);
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	String store_id_list_str = null;
	String [] store_id_list = null;
	
	try {
	    if (user_sid == null || db_name == null || item_code == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams();		

	    if (master_user_flag) {
			query.append(String.format("SELECT GROUP_CONCAT(DISTINCT `store_id` SEPARATOR '|') AS `store_id_list_str` FROM `wrp`.`tb_stores` WHERE `master_sid`='%s'", user_sid));
	    } else if (subdealer_user_flag) {
			query.append(String.format("SELECT GROUP_CONCAT(DISTINCT `store_id` SEPARATOR '|') AS `store_id_list_str` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s'", user_sid));
			
	    } else {
	    	query.append(String.format("SELECT GROUP_CONCAT(DISTINCT `store_id` SEPARATOR '|') AS `store_id_list_str` FROM `%s`.`tb_stores` WHERE `store_id` IN ", db_name));
	    	query.append(String.format("(SELECT `store_id` FROM `posmaster`.`tb_user_store_access` WHERE `user_sid` IN (%s));  ", user_sid));
	    }
	    
	    store_id_list_str = MyDBUtil.getInstance().getString(query.toString(), "store_id_list_str");
	    
	    query.delete(0, query.length());
	    
	    if (store_id_list_str == null) {
	    	throw new Exception();
	    }
	    
	    store_id_list = store_id_list_str.split("\\|");
	    
	    query.append(String.format("SELECT `stores`.*,`stores_in_item_dict`.`srp`,`stores_in_item_dict`.`status` FROM ("));
	    for(int i = 0; i < store_id_list.length; i++) {
	    	if (i > 0) {
	    		query.append(String.format(" UNION "));
	    	}
	    	query.append(String.format("(SELECT UPPER(?) AS `store_id`,`retail_price` AS `srp`,IF(`disable`>0,'Disabled','Enabled') AS `status` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`=? LIMIT 0, 1)", db_name, store_id_list[i]));
	    	mPreparedStatementParams.set(store_id_list[i]);
	    	mPreparedStatementParams.set(item_code);
	    }
	    query.append(String.format(" ) AS `stores_in_item_dict` RIGHT JOIN ("));
		query.append(String.format(" SELECT `store_id`,TRIM(CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`)) AS `address`,`market_code`,`district_code` FROM `%s`.`tb_stores`", db_name));
		query.append(String.format(" ) AS `stores` ON `stores_in_item_dict`.`store_id`=`stores`.`store_id` "));
		query.append(String.format(" WHERE `stores_in_item_dict`.`store_id` IS NOT NULL"));

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
		out.print(MyDBUtil.getInstance().getJSONString(query.toString(), mPreparedStatementParams, true));
	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>