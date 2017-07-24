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
	
	int transferSid = MyRequestUtil.getInt(request, "transferSid", -1);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
	    query.append(String.format("SELECT `trans_info`.*,SUM(`trans_items`.`appr_qty`) AS `appr_qty`,SUM(`trans_items`.`fulfill_qty`) AS `fulfill_qty`,SUM(`trans_items`.`recv_qty`) AS `recv_qty`,`trans_items`.`item_code`"));
	    query.append(String.format(", `req_user`.`req_user_id`, `appr_user`.`appr_user_id`,`item_dict`.`description` FROM"));
	    query.append(String.format(" (SELECT `sid`,`trans_id`,`request_id`,`req_date` AS `_req_date`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `req_date`,`req_user_sid`", timezone_offset));
	    query.append(String.format(" ,`appr_date` AS `_appr_date`, DATE_FORMAT(DATE_ADD(`appr_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `appr_date`,`appr_user_sid`", timezone_offset));
	    query.append(String.format(" ,`recv_date` AS `_recv_date`, DATE_FORMAT(DATE_ADD(`recv_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `recv_date`,`recv_user_sid`", timezone_offset));
	    query.append(String.format(" , `from_store_id`, `to_store_id`, `status` FROM `%s`.`tb_inventory_trans_%s` WHERE 1=1", db_name, db_name));
	    if (transferSid > -1){
	    	query.append(String.format(" AND ( `sid`='%d' )", transferSid));
	    }
	    query.append(String.format(" ) AS `trans_info` LEFT JOIN ("));
	    query.append(String.format(" SELECT `trans_sid`,`appr_qty`,`fulfill_qty`,`recv_qty`,`item_code`"));
	    query.append(String.format(" FROM `%s`.`tb_inventory_trans_items_%s`",db_name, db_name));
	    query.append(String.format(" ) AS `trans_items` ON `trans_info`.`sid`=`trans_items`.`trans_sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `req_user_id` FROM `wrp`.`tb_user`) AS `req_user` ON `trans_info`.`req_user_sid`=`req_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT `sid`, `user_id` AS `appr_user_id` FROM `wrp`.`tb_user`) AS `appr_user` ON `trans_info`.`appr_user_sid`=`appr_user`.`sid`"));
	    query.append(String.format(" LEFT JOIN (SELECT DISTINCT `item_code`, `description` FROM `%s`.`tb_item_dict_%s`) AS `item_dict` ON `trans_items`.`item_code`=`item_dict`.`item_code` GROUP BY `item_code` ",db_name,store_id));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>