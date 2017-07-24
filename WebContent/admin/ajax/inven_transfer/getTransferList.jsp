<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	String start_date = MyRequestUtil.getString(request, "start_date", null);
	String end_date = MyRequestUtil.getString(request, "end_date", null);
	int status = MyRequestUtil.getInt(request, "status", -1);
	
	String date_column_name = "req_date";
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
	    query.append(String.format("SELECT `trans_info`.*,`trans_items`.`req_qty`,`trans_items`.`appr_qty`,`trans_items`.`fulfill_qty`,`trans_items`.`recv_qty`"));
	    query.append(String.format(", `req_user`.`req_user_id`, `appr_user`.`appr_user_id`, `fulfill_user`.`fulfill_user_id`, `recv_user`.`recv_user_id` FROM"));
	    query.append(String.format(" (SELECT `sid`,`request_id`,`trans_id`,`req_date` AS `_req_date`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `req_date`,`req_user_sid`", timezone_offset));
	    query.append(String.format(" ,`appr_date` AS `_appr_date`, DATE_FORMAT(DATE_ADD(`appr_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `appr_date`,`appr_user_sid`", timezone_offset));
	    query.append(String.format(" ,`fulfill_date` AS `_fulfill_date`, DATE_FORMAT(DATE_ADD(`fulfill_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `fulfill_date`,`fulfill_user_sid`", timezone_offset));
	    query.append(String.format(" ,`recv_date` AS `_recv_date`, DATE_FORMAT(DATE_ADD(`recv_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `recv_date`,`recv_user_sid`", timezone_offset));
	    query.append(String.format(" , `from_store_id`, `to_store_id`, `status` FROM `%s`.`tb_inventory_trans_%s` WHERE 1=1", db_name, db_name));
	    if (status > -1) {
	    	query.append(String.format(" AND `status` IN (%d)", status));
	    	switch (status) {
	    	case 0:
	    		//query.append(String.format(" AND `to_store_id` IN ('%s') ", store_id));
	    		date_column_name = "req_date";
	    		break;
	    	case 2:
	    		query.append(String.format(" AND `from_store_id` IN ('%s') ", store_id));
	    		date_column_name = "appr_date";
	    		break;
	    	case 3:
	    		query.append(String.format(" AND `to_store_id` IN ('%s') ", store_id));
	    		date_column_name = "fulfill_date";
	    		break;
	    	case 4:
	    		//query.append(String.format(" AND ( `from_store_id` IN ('%s') OR `to_store_id` IN ('%s') )", store_id, store_id));
	    		date_column_name = "pickup_date";
	    		break;
	    	case 5:
	    		//query.append(String.format(" AND ( `from_store_id` IN ('%s') OR `to_store_id` IN ('%s') )", store_id, store_id));
	    		date_column_name = "recv_date";
	    		break;
	    	default:
	    		query.append(String.format(" AND ( `from_store_id` IN ('%s') OR `to_store_id` IN ('%s') )", store_id, store_id));
	    		break;
	    	}
	    } else {
    		query.append(String.format(" AND ( `from_store_id` IN ('%s') OR `to_store_id` IN ('%s') )", store_id, store_id));
	    }
	    if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {	    	
	    	query.append(String.format(" AND ( DATE_FORMAT(DATE_ADD(`%s`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", date_column_name, timezone_offset, start_date, end_date));
	    }
	    query.append(String.format(" ) AS `trans_info` LEFT JOIN ("));
	    query.append(String.format(" SELECT `trans_sid`, SUM(`req_qty`) AS `req_qty`,SUM(`appr_qty`) AS `appr_qty`,SUM(`fulfill_qty`) AS `fulfill_qty`,SUM(`recv_qty`) AS `recv_qty` "));
	    query.append(String.format(" FROM `%s`.`tb_inventory_trans_items_%s` GROUP BY `trans_sid`",db_name, db_name));
	    query.append(String.format(" ) AS `trans_items` ON `trans_info`.`sid`=`trans_items`.`trans_sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `req_user_id` FROM `wrp`.`tb_user`) AS `req_user` ON `trans_info`.`req_user_sid`=`req_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `appr_user_id` FROM `wrp`.`tb_user`) AS `appr_user` ON `trans_info`.`appr_user_sid`=`appr_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `fulfill_user_id` FROM `wrp`.`tb_user`) AS `fulfill_user` ON `trans_info`.`fulfill_user_sid`=`fulfill_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `recv_user_id` FROM `wrp`.`tb_user`) AS `recv_user` ON `trans_info`.`recv_user_sid`=`recv_user`.`sid`"));
    	query.append(String.format(" ORDER BY `trans_info`.`_%s` DESC", date_column_name));	    
		
		// 쿼리 입력

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>