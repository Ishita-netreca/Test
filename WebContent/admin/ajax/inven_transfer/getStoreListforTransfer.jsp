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
	String transItemsStr = MyRequestUtil.getString(request, "transItems", null);
	String[] store_sid_arr= null;

	JSONArray transItems = null;
	JSONObject jsonObj = null;
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams();
		transItems = (JSONArray)(new JSONParser().parse(transItemsStr));

		// 쿼리 입력
		query.append(String.format("SELECT GROUP_CONCAT(`store_id` SEPARATOR ',') AS `store_list_str` FROM `wrp`.`tb_stores` WHERE `store_id` NOT IN ('%s')",store_id));
		if (master_user_flag) {
			query.append(String.format(" AND `master_sid`='%s'",master_sid));
	    } else if (subdealer_user_flag) {
	    	query.append(String.format(" AND `owner_sid`='%s'",owner_sid));
	    } else {
    		out.print(-3);
	        throw new Exception();
	    }
		
		store_sid_arr = MyDBUtil.getInstance().getString(db_name, owner_id, store_id, query.toString(), "store_list_str").split(",");

        query.delete(0, query.length());

        for(int i=0; i < store_sid_arr.length; i++){
        	
        	query.append(" (SELECT a.*, b.`item_code`,SUM(`c`.`qty`) AS `qty` FROM");
        	query.append(String.format("(SELECT `sid`,`store_id` AS `storeId`,`market_code`,`district_code`,CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`) AS `address`, `tel` FROM `wrp`.`tb_stores`"));
        	query.append(String.format(" WHERE `store_id`='%s') AS `a` LEFT JOIN",store_sid_arr[i]));
        	query.append(String.format(" (SELECT `sid`,'%s' AS `storeId`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (",store_sid_arr[i],db_name,store_sid_arr[i]));
        	for (int j = 0; j < transItems.size(); j++) {
                jsonObj = (JSONObject)transItems.get(j);
                query.append(String.format("'%s',",jsonObj.get("itemCode").toString()));
    		}
        	if (query.length() > 0 && query.lastIndexOf(",") == query.length() -1 ) query.deleteCharAt(query.length() -1);
        	query.append(String.format(") ) AS `b` ON `a`.`storeId`=`b`.`storeId`"));
        	query.append(String.format(" LEFT JOIN (SELECT `qty`,'%s' AS `storeId`,`item_sid` FROM `%s`.`tb_inventory_%s`) AS `c` ON `b`.`sid`=`c`.`item_sid`", store_sid_arr[i], db_name, store_sid_arr[i]));
        	query.append(String.format(" GROUP BY `item_code` HAVING"));
        	for (int j = 0; j < transItems.size(); j++) {
                jsonObj = (JSONObject)transItems.get(j);
                query.append(String.format(" SUM(`c`.`qty`) >= %d OR",Integer.parseInt(jsonObj.get("apprQty").toString())));
    		}
        	if (query.length() > 0 && query.lastIndexOf("R") == query.length() -1 ) query.delete(query.length() -2,query.length());
        	query.append(" LIMIT 0,1 ) UNION");

		}
        if (query.length() > 0 && query.lastIndexOf("N") == query.length() -1 ) query.delete(query.length() -5,query.length());

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>