<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	String user_sid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
	String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
	String timezone_offset = (session.getAttribute("wrp_admin_selected_store_timezone_offset") != null)? session.getAttribute("wrp_admin_selected_store_timezone_offset").toString() : "0";
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	String start_date = MyRequestUtil.getString(request, "start_date", null);
	String end_date = MyRequestUtil.getString(request, "end_date", null);
	int status = MyRequestUtil.getInt(request, "status", -1);
	
	String date_column_name = "req_date";
	
	try {
	    if (store_id == null || user_sid == null || owner_id == null) {
	        throw new Exception();
	    }
	    query.append(String.format("SELECT `trans_info`.*,`trans_items`.`req_qty`,`trans_items`.`appr_qty`,`trans_items`.`ship_qty`,`trans_items`.`recv_qty`"));
	    query.append(String.format(", `req_user`.`req_user_id`, `appr_user`.`appr_user_id`, `ship_user`.`ship_user_id`, `recv_user`.`recv_user_id` FROM"));
	    query.append(String.format(" (SELECT `sid`,`trans_id`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `req_date`,`req_user_sid`", timezone_offset));
	    query.append(String.format(" , DATE_FORMAT(DATE_ADD(`appr_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `appr_date`,`appr_user_sid`", timezone_offset));
	    query.append(String.format(" , DATE_FORMAT(DATE_ADD(`ship_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `ship_date`,`ship_user_sid`", timezone_offset));
	    query.append(String.format(" , DATE_FORMAT(DATE_ADD(`recv_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `recv_date`,`recv_user_sid`", timezone_offset));
	    query.append(String.format(" , `from_store_id`, `to_store_id`, `status` FROM `%s`.`tb_inventory_trans_%s` WHERE 1=1", owner_id, owner_id));
	    if (status > -1) {
	    	query.append(String.format(" AND `status` IN (%d)", status));
	    	switch (status) {
	    	case 0:
	    	case 1:
	    		query.append(String.format(" AND `from_store_id` IN ('%s') ", store_id));
	    		date_column_name = "req_date";
	    		break;
	    	case 2:
	    		query.append(String.format(" AND `to_store_id` IN ('%s') ", store_id));
	    		date_column_name = "appr_date";
	    		break;
	    	case 3:
	    		query.append(String.format(" AND `to_store_id` IN ('%s') ", store_id));
	    		date_column_name = "ship_date";
	    		break;
	    	case 4:
	    		query.append(String.format(" AND `from_store_id` IN ('%s') ", store_id));
	    		date_column_name = "recv_date";
	    		break;
	    	default:
	    		query.append(String.format(" AND ( `from_store_id` IN ('%s') OR `to_store_id` IN ('%s') )", store_id));
	    		break;
	    	}
	    }
	    if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {	    	
	    	query.append(String.format(" AND ( DATE_FORMAT(DATE_ADD(`%s`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", date_column_name, timezone_offset, start_date, end_date));
	    }
	    query.append(String.format(" ) AS `trans_info` LEFT JOIN ("));
	    query.append(String.format(" SELECT `trans_sid`, SUM(`req_qty`) AS `req_qty`,SUM(`appr_qty`) AS `appr_qty`,SUM(`ship_qty`) AS `ship_qty`,SUM(`recv_qty`) AS `recv_qty` "));
	    query.append(String.format(" FROM `posmaster`.`tb_inventory_trans_items_posmaster` GROUP BY `trans_sid`"));
	    query.append(String.format(" ) AS `trans_items` ON `trans_info`.`sid`=`trans_items`.`trans_sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `req_user_id` FROM `wrp`.`tb_user`) AS `req_user` ON `trans_info`.`req_user_sid`=`req_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `appr_user_id` FROM `wrp`.`tb_user`) AS `appr_user` ON `trans_info`.`appr_user_sid`=`appr_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `ship_user_id` FROM `wrp`.`tb_user`) AS `ship_user` ON `trans_info`.`ship_user_sid`=`ship_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `recv_user_id` FROM `wrp`.`tb_user`) AS `recv_user` ON `trans_info`.`recv_user_sid`=`recv_user`.`sid`"));
		
		// 쿼리 입력

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getJSONString(query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>