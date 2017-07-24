<%/* 170207 jh */%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%

		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String itemSid = MyRequestUtil.getString(request, "itemSid", null);
		int status = MyRequestUtil.getInt(request, "status", -1);
		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null); // MM/dd/yyyy
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null); // MM/dd/yyyy
		
		try {
			if (storeId == null || db_name == null) {
		        throw new Exception();
		    }
			query.append(String.format("SELECT `ab`.po_id as poId, `ab`.sid, `ab`.status, `ab`.orderer_id as ordererId, `ab`.`orderDate`, `ab`.vendor_id as vendorId, SUM(`c`.`total_order_qty`) AS `total_order_qty`, SUM(`c`.`amount`) AS `amount` FROM ("));
			query.append(String.format("SELECT `a`.`sid`,`a`.`po_id`,  `a`.`status`, `a`.`orderer_id`,DATE_FORMAT(DATE_ADD(`a`.`order_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `orderDate`, `b`.`vendor_id` FROM `%s`.`tb_po_%s` AS `a` LEFT JOIN `%s`.`tb_vendor` AS `b` ON `a`.`vendor_id`=`b`.`sid`", timezone_offset,db_name, storeId, db_name));
			if (status > -1) {
			query.append(String.format(" WHERE `status`='%d'", status));
			}
			query.append(String.format(") AS `ab` LEFT JOIN (SELECT (k.`item_cost` * j.`order_qty`) AS amount,`po_sid`, `order_qty` AS `total_order_qty` FROM `%s`.`tb_po_items_%s` AS j, `%s`.`tb_item_dict_%s` AS k WHERE j.`item_sid` = k.`sid` AND j.`item_sid` = %s) AS `c`", db_name, storeId, db_name, storeId, itemSid));
			query.append(String.format(" ON `ab`.`sid`=`c`.`po_sid`"));
			if (search_start_date != null && search_end_date != null && search_start_date.length() > 0 && search_end_date.length() > 0) {
				query.append(String.format(" WHERE `orderDate` BETWEEN '%s' AND '%s'", search_start_date, search_end_date));
			}
			query.append(String.format(" GROUP BY `po_sid` ORDER BY `status`, `orderDate` DESC"));
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>