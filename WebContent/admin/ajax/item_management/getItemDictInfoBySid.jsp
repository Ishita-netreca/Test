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

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	int item_sid = MyRequestUtil.getInt(request, "item_sid", 0);
	
	int wrp_db_flag = MyRequestUtil.getInt(request, "wrp_db_flag", 0);
	
	int master_flag = MyRequestUtil.getInt(request, "master_flag", 0);
	
	int owner_flag = MyRequestUtil.getInt(request, "owner_flag", 0);
	
	String tableDescription = null;
	
	try {
	    if (user_sid == null || db_name == null || item_sid < 1) {
	        throw new Exception();
	    }
	    
	    if (wrp_db_flag > 0) {
	    	tableDescription = String.format("`wrp`.`tb_item_dict_[storeid]`");
	    } else if (master_flag > 0) {
			tableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);	    	
	    } else if (owner_flag > 0) {
			tableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);	    	
	    } else if (master_user_flag) {
			tableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
		} else if (subdealer_user_flag) {
			tableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
		} else {
			throw new Exception();
		}
		
		// 쿼리 입력
		mPreparedStatementParams = new PreparedStatementParams();
		query.append(String.format("SELECT `item_dict`.*"));
		if (wrp_db_flag > 0) {
			
		} else {
			if (store_id != null) query.append(String.format(",`category`.`category`,`sub_category`.`sub_category`"));
		}
		query.append(String.format(" FROM ("));
		query.append(String.format(" SELECT `sid`,`item_type`,`item_code`,`sku`,`model`,`description`,`category` AS `category_sid`,`sub_category` As `sub_category_sid`,`manufacturer`,IF(`disable`>0,'Disable','Enable') as `status`"));
		query.append(String.format(" ,`distributor`,`color`,`condition`,`item_cost`,`retail_price`,`wholesale_price`,`image`,`upc`"));
		query.append(String.format(" FROM %s", tableDescription));			
		
		query.append(String.format(" ) AS `item_dict`"));
		if (wrp_db_flag > 0) {
			
		} else {
			if (store_id != null) {
				query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM `%s`.`tb_categories_dict_%s`) AS `category` ON `item_dict`.`category_sid`=`category`.`sid`", db_name, store_id));
				query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM `%s`.`tb_categories_dict_%s`) AS `sub_category` ON `item_dict`.`sub_category_sid`=`sub_category`.`sid`", db_name, store_id));
			}
		}
		query.append(String.format(" WHERE `item_dict`.`sid` IN (?)"));
		mPreparedStatementParams.set(1, item_sid);
		
		// 파라미터 입력

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>