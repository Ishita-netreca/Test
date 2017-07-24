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
	
	
	String item_sid_list_str = MyRequestUtil.getString(request, "item_sid_list_str", null);
	
	int download_from_wrp_flag = MyRequestUtil.getInt(request, "download_from_wrp_flag", 0);
	if (download_from_wrp_flag < 0) {
		download_from_wrp_flag = 0;
	}
	
	String sourceTableDescription = null, targetTableDescription = null;
	
	String store_list_str = null;
	String [] store_list = null;
	
	int item_sid_range = 100000;
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if ((!master_user_flag && !subdealer_user_flag) || user_sid == null || db_name == null) {
	    	out.print(-1);
	        throw new Exception();
	    }
	    
	    if (master_user_flag) {
	    	if (download_from_wrp_flag < 1) {
	    		out.print(-2);
		        throw new Exception();
	    	}	    	
	    	sourceTableDescription = String.format("`wrp`.`tb_item_dict_[storeid]`");
	    	targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);	    	
	    	item_sid_range = 100000;
	    } else if (subdealer_user_flag) {
	    	if (download_from_wrp_flag > 0) {	 
		    	sourceTableDescription = String.format("`wrp`.`tb_item_dict_[storeid]`");
		    	targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);   	
		    	item_sid_range = 100000; 
	    	} else {
		    	sourceTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
		    	targetTableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
		    	item_sid_range = 200000;
	    	}
	    } else {
    		out.print(-3);
	        throw new Exception();
	    }
	    
		query.append(String.format("DELETE FROM %s WHERE (`sid` BETWEEN 1 AND %d)", targetTableDescription, item_sid_range));
		if (item_sid_list_str != null && item_sid_list_str.length() > 0) {
			query.append(String.format(" AND `sid` IN (%s)", item_sid_list_str));
		}
		query.append(String.format("; INSERT INTO %s ( SELECT * FROM %s WHERE (`sid` BETWEEN 1 AND %d)", targetTableDescription, sourceTableDescription, item_sid_range));
		if (item_sid_list_str != null && item_sid_list_str.length() > 0) {
			query.append(String.format(" AND `sid` IN (%s)", item_sid_list_str));
		}
		query.append(String.format(");"));
		
		if (subdealer_user_flag) {
			store_list_str = MyDBUtil.getInstance().getString(String.format("SELECT GROUP_CONCAT(`store_id` SEPARATOR '|') AS `store_list_str` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s' AND `store_id` IN (SELECT `store_id` FROM `%s`.`tb_stores`)", user_sid, db_name), "store_list_str");
			if (store_list_str != null && store_list_str.length() > 0) {
				store_list = store_list_str.split("\\|");
				
				for (int i = 0; i < store_list.length; i++) {
					query.append(String.format("DELETE FROM `%s`.`tb_item_dict_%s`", db_name, store_list[i]));
					if (item_sid_list_str != null && item_sid_list_str.length() > 0) {
						query.append(String.format(" WHERE `sid` IN (%s)", item_sid_list_str));
					}
					query.append(String.format("; INSERT INTO `%s`.`tb_item_dict_%s` ( SELECT * FROM `%s`.`tb_item_dict_%s`", db_name, store_list[i], db_name, owner_id));
					if (item_sid_list_str != null && item_sid_list_str.length() > 0) {
						query.append(String.format(" WHERE `sid` IN (%s)", item_sid_list_str));
					}
					query.append(String.format(");"));
				}
			}
		}

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
		out.print(MyDBUtil.getInstance().execute(db_name, null, null, query.toString()));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>