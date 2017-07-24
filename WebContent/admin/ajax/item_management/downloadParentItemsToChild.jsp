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
	
	String item_sid_list_str = MyRequestUtil.getString(request, "item_sid_list_str", null);
	
	int syncAllItemsFlag = MyRequestUtil.getInt(request, "sync_all_items_flag", 0);
	int syncDifferentItemsOnlyFlag = MyRequestUtil.getInt(request, "sync_different_items_only_flag", 0);
	
	int child_master_flag = MyRequestUtil.getInt(request, "child_master_flag", 0);
	int child_owner_flag = MyRequestUtil.getInt(request, "child_owner_flag", 0);
	
	int parent_wrp_flag = MyRequestUtil.getInt(request, "parent_wrp_flag", 0);
	int parent_master_flag = MyRequestUtil.getInt(request, "parent_master_flag", 0);
	int parent_owner_flag = MyRequestUtil.getInt(request, "parent_owner_flag", 0);
	
	String sourceTableDescription = null;
	String targetTableDescription = null;
	
	try {
	    if ((child_master_flag < 1 && child_owner_flag < 1 && store_id == null) || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
	    
	    if (parent_wrp_flag > 0) {
	    	sourceTableDescription = "`wrp`.`tb_item_dict_[storeid]`";
	    	if (child_master_flag > 0) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
	    	} else if (child_owner_flag > 0) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
	    	} else if (store_id != null) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, store_id);
	    	}
	    } else if (parent_master_flag > 0) {
	    	sourceTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
	    	if (child_master_flag > 0) {
	    		throw new Exception();
	    	} else if (child_owner_flag > 0) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
	    	} else if (store_id != null) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, store_id);
	    	}
	    } else if (parent_owner_flag > 0) {
	    	sourceTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
	    	if (child_master_flag > 0 || child_owner_flag > 0) {
	    		throw new Exception();
	    	}else if (store_id != null) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, store_id);
	    	}
	    } else {
	    	sourceTableDescription = "`wrp`.`tb_item_dict_[storeid]`";

	    	if (master_user_flag) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
	    	} else if (subdealer_user_flag) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
	    	} else if (store_id != null) {
	    		targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, store_id);
	    	} else {
	    		throw new Exception();
	    	}
	    }
		
		// 쿼리 입력
		if (syncAllItemsFlag > 0) { // sync all items from wrp db
			query.append(String.format("DELETE FROM `%s`.`tb_item_dict_%s` WHERE `sid` BETWEEN 1 AND 100000;", db_name, store_id));
			query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` (SELECT * FROM `wrp`.`tb_item_dict_[storeid]` WHERE `sid` BETWEEN 1 AND 100000);", db_name, store_id));
		} else if (syncDifferentItemsOnlyFlag > 0 && item_sid_list_str != null) { // sync all different items from wrp db
			query.append(String.format("DELETE FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (%s);", db_name, store_id, item_sid_list_str));
			query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` (SELECT * FROM `wrp`.`tb_item_dict_[storeid]` WHERE `sid` IN (%s));", db_name, store_id, item_sid_list_str));
		} else if (item_sid_list_str != null) { // add new item from wrp db
			query.append(String.format("DELETE FROM %s WHERE `sid` IN (%s);", targetTableDescription, item_sid_list_str));
			query.append(String.format("INSERT INTO %s (SELECT * FROM %s WHERE `sid` IN (%s));", targetTableDescription, sourceTableDescription, item_sid_list_str));
		} else {
			throw new Exception();
		}

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString()));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
		
		out.print(-1);
	}
	query = null;
%>