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
	
	String tableDescription = null;
	
	int itemType = MyRequestUtil.getInt(request, "item_type", -1);
	try {
	    if (user_sid == null || db_name == null) {
	        throw new Exception();
	    }	
	    
	    if (master_user_flag) {
	    	tableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
	    } else if (subdealer_user_flag) {
	    	tableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
	    } else {
	    	tableDescription = String.format("`%s`.`tb_item_dict_%s`", db_name, store_id);	    	
	    }
	    
		// 쿼리 입력
		mPreparedStatementParams = new PreparedStatementParams();
		query.append(String.format("SELECT "));
		switch (itemType) {
		case 0:
			query.append(String.format(" 'PHONE' AS `type`,"));
			break;
		case 1:
			query.append(String.format(" 'SIM' AS `type`,"));
			break;
		case 2:
		case 3:
			query.append(String.format(" 'ACCESSORY' AS `type`,"));
			break;
		}
		query.append(String.format(" `sid`,`item_code`,`sku`,`description`,`manufacturer` FROM `wrp`.`tb_item_dict_[storeid]`"));
		query.append(String.format(" WHERE `item_code` NOT IN (SELECT `item_code` FROM %s)", tableDescription));
		query.append(String.format(" AND `sid` < 100001 AND `sid` NOT IN (SELECT `item_code` FROM %s WHERE `sid` BETWEEN 1 AND 100000)", tableDescription));
		switch (itemType) {
		case 0:
			query.append(String.format("AND `item_type` IN (0)"));
			break;
		case 1:
			query.append(String.format("AND `item_type` IN (1)"));
			break;
		case 2:
		case 3:
			query.append(String.format("AND `item_type` IN (2,3)"));
			break;
		}
		if (searchKeyword != null && searchKeyword.length() > 0) {
			query.append(String.format(" AND (`description` LIKE ? OR `sku` LIKE ?)"));
			mPreparedStatementParams.set(String.format("%%%s%%", searchKeyword));
			mPreparedStatementParams.set(String.format("%%%s%%", searchKeyword));
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