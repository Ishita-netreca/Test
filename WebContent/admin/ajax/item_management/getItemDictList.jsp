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
	
	String searchKeyword = MyRequestUtil.getString(request, "search_keyword", null);
	
	String type_str = null;
	
	int item_type = MyRequestUtil.getInt(request, "item_type", -1);
	
	int wrp_managed_items_only_flag = MyRequestUtil.getInt(request, "wrp_managed_items_only_flag", 0);
	
	int select_from_wrp_db_table_flag = MyRequestUtil.getInt(request, "select_from_wrp_db_table_flag", 0);
	int select_from_master_table_flag = MyRequestUtil.getInt(request, "select_from_master_table_flag", 0);
	int select_from_owner_table_flag = MyRequestUtil.getInt(request, "select_from_owner_table_flag", 0);
	
	String categoryTableDescription = null;
	
	try {
		
	    if ((select_from_wrp_db_table_flag < 1 && select_from_master_table_flag < 1 && select_from_owner_table_flag < 1 && !master_user_flag && !subdealer_user_flag && store_id == null) || user_sid == null || db_name == null || (item_type < -1 || item_type > 4)) {
	        throw new Exception();
	    }	

		// 쿼리 입력
		
		switch (item_type) {
		case 0:
			type_str = "PHONE";
			break;
		case 1:
			type_str = "SIM CARD";
			break;
		case 2:
		case 3:
			type_str = "ACCESSORY";
			break;
		case 4:
			type_str = "SERVICE ITEM";
			break;
		}
		
		if (select_from_wrp_db_table_flag > 0) {
			categoryTableDescription = "`wrp`.`tb_categories_dict_[storeid]`";
		} else if (select_from_master_table_flag > 0) {
			categoryTableDescription = String.format("`%s`.`tb_categories_dict_%s`", db_name, db_name);		
		} else if (select_from_owner_table_flag > 0) {
			categoryTableDescription = String.format("`%s`.`tb_categories_dict_%s`", db_name, owner_id);			
		} else {
		    if (master_user_flag) {
				categoryTableDescription = String.format("`%s`.`tb_categories_dict_%s`", db_name, db_name);	
		    } else if (subdealer_user_flag) {
				categoryTableDescription = String.format("`%s`.`tb_categories_dict_%s`", db_name, owner_id);	
		    } else {
				categoryTableDescription = String.format("`%s`.`tb_categories_dict_%s`", db_name, store_id);		
		    }
		}
		
		mPreparedStatementParams = new PreparedStatementParams();
		query.append(String.format("SELECT `item_dict`.*"));		
		query.append(String.format(",`category`.`category`,`sub_category`.`sub_category`"));
			

		query.append(String.format(" FROM ("));
		query.append(String.format(" SELECT `sid`,"));
		if (type_str != null) {
			query.append(String.format(" ? AS `type`,"));	
			mPreparedStatementParams.set(type_str);		
		}
		query.append(String.format(" `item_type`,`item_code`,`sku`,`description`,`category` As `category_sid`,`sub_category` As `sub_category_sid`,`manufacturer`,IF(`disable`>0,'Disable','Enable') as `status`,`disable`"));
		if (select_from_wrp_db_table_flag > 0) {
			query.append(String.format(" FROM `wrp`.`tb_item_dict_[storeid]`"));
		} else if (select_from_master_table_flag > 0) {
			query.append(String.format(" FROM `%s`.`tb_item_dict_%s`", db_name, db_name));			
		} else if (select_from_owner_table_flag > 0) {
			query.append(String.format(" FROM `%s`.`tb_item_dict_%s`", db_name, owner_id));			
		} else {
		    if (master_user_flag) {
				query.append(String.format(" FROM `%s`.`tb_item_dict_%s`", db_name, db_name));
		    } else if (subdealer_user_flag) {
				query.append(String.format(" FROM `%s`.`tb_item_dict_%s`", db_name, owner_id));
		    } else {
				query.append(String.format(" FROM `%s`.`tb_item_dict_%s`", db_name, store_id));    	
		    }
		}
		query.append(String.format(" ) AS `item_dict`"));
				
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM %s) As `category` ON `item_dict`.`category_sid`=`category`.`sid`", categoryTableDescription));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM %s) As `sub_category` ON `item_dict`.`sub_category_sid`=`sub_category`.`sid`", categoryTableDescription));			
		
		if (item_type == 2 || item_type == 3) {
			query.append(String.format(" WHERE `item_dict`.`item_type` IN (?,?)"));
			mPreparedStatementParams.set(2);
			mPreparedStatementParams.set(3);
		} else {
			query.append(String.format(" WHERE `item_dict`.`item_type` IN (?)"));
			mPreparedStatementParams.set(item_type);
		}
		if (searchKeyword != null && searchKeyword.length() > 0) {
			query.append(String.format(" AND (`item_dict`.`item_code` LIKE ? OR `item_dict`.`sku` LIKE ? OR `item_dict`.`description` LIKE ?)"));
			mPreparedStatementParams.set(String.format("%%%s%%",searchKeyword));			
			mPreparedStatementParams.set(String.format("%%%s%%",searchKeyword));			
			mPreparedStatementParams.set(String.format("%%%s%%",searchKeyword));			
		}
		if (wrp_managed_items_only_flag > 0) {
			query.append(String.format(" AND `item_dict`.`sid` BETWEEN 1 AND 100000"));
		}
		
		
		// 파라미터 입력
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>