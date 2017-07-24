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
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", session.getAttribute("wrp_admin_selected_store_timezone_offset").toString());
	
	int po_sid = MyRequestUtil.getInt(request, "po_sid", 0);
	int group_by = MyRequestUtil.getInt(request, "group_by", 0);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null || po_sid < 1) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format(" SELECT `a`.*,`b`.`item_code`,`b`.`sku`,`b`.`description`,`b`.`item_type` FROM ("));
		if (group_by > 0) {
			query.append(String.format("  SELECT `sid`,`po_sid`,`item_sid`,`serial_no`,SUM(`order_qty`) AS `order_qty`,SUM(`fulfill_qty`) AS `fulfill_qty`,SUM(`receive_qty`) AS `receive_qty`,`status`,`received_date`,`item_cost` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`=%d", db_name, store_id, po_sid));
			query.append(String.format(" GROUP BY `item_sid`"));
		} else {
			query.append(String.format("  SELECT `sid`,`po_sid`,`item_sid`,`serial_no`,`order_qty`,`fulfill_qty`,`receive_qty`,`status`,`received_date`,`item_cost` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`=%d", db_name, store_id, po_sid));
		}
		query.append(String.format("  ) AS `a` LEFT JOIN ("));
		query.append(String.format("  SELECT `sid`,`item_code`,`sku`,`description`,`item_type` FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (", db_name, store_id));
		query.append(String.format("  SELECT `item_sid` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`=%d", db_name, store_id, po_sid));
		query.append(String.format(" )) AS `b` ON `a`.`item_sid`=`b`.`sid`"));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>