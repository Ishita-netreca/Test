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
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String itemSid = MyRequestUtil.getString(request, "itemSid", null);
		int status = MyRequestUtil.getInt(request, "status", -1);

		DecimalFormat df = new DecimalFormat("000000000000");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;

		try {
			if (storeId == null || owner_id == null) {
		        throw new Exception();
		    }
			query.append(String.format("SELECT `ab`.po_id as poId, `ab`.sid, `ab`.status, `ab`.orderer_id as ordererId, `ab`.order_date as orderDate, `ab`.vendor_id as vendorId, SUM(`c`.`total_order_qty`) AS `total_order_qty`, SUM(`c`.`amount`) AS `amount` FROM ("));
			query.append(String.format("SELECT `a`.`sid`,`a`.`po_id`,  `a`.`status`, `a`.`orderer_id`, `a`.`order_date`, `b`.`vendor_id` FROM `%s`.`tb_po_%s` AS `a` LEFT JOIN `%s`.`tb_vendor` AS `b` ON `a`.`vendor_id`=`b`.`sid`", owner_id, storeId, owner_id));
			if (status > -1) {
			query.append(String.format(" WHERE `status`='%d'", status));
			}
			query.append(String.format(") AS `ab` LEFT JOIN (SELECT (k.`item_cost` * j.`order_qty`) AS amount,`po_sid`, `order_qty` AS `total_order_qty` FROM `%s`.`tb_po_items_%s` AS j, `%s`.`tb_item_dict_%s` AS k WHERE j.`item_sid` = k.`sid` AND j.`item_sid` = %s) AS `c`", owner_id, storeId, owner_id, storeId, itemSid));
			query.append(String.format(" ON `ab`.`sid`=`c`.`po_sid` GROUP BY `po_sid` ORDER BY `status`, `order_date` DESC", status));
			out.print(MyDBUtil.getJSON(query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>