<% //170208 jh %>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%

		
		StringBuffer query = new StringBuffer();
		String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
		String store_id = MyRequestUtil.getString(request, "store_id", null);		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		
		int po_sid = MyRequestUtil.getInt(request, "po_sid", 0);
		try {
		    if (store_id == null || owner_id == null || po_sid < 1) {
		    	out.print("{\"data\":[]}");
		    } else {
		    	query.append(String.format("SELECT `a`.`sid`,`a`.`item_sid`,`a`.`order_qty`,`a`.`fulfill_qty`,`a`.`receive_qty`,`b`.`description`,`b`.`item_cost` FROM ("));
		    	query.append(String.format(" SELECT `sid`,`po_sid`,`item_sid`,`serial_no`,`imei_no`,SUM(`order_qty`) AS `order_qty`,SUM(`fulfill_qty`) AS `fulfill_qty`,SUM(`receive_qty`) AS `receive_qty`,`status`,`received_date`,`item_cost` FROM `%s`.`tb_po_items_%s` WHERE `po_sid` IN (%d)", owner_id, store_id, po_sid));
		    	query.append(String.format(" GROUP BY `item_sid`) AS `a`"));
		    	query.append(String.format(" LEFT JOIN (SELECT `sid`,`description`,`item_cost` FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (SELECT `item_sid` FROM `%s`.`tb_po_items_%s` WHERE `po_sid` IN (%d))", owner_id, store_id, owner_id, store_id, po_sid));
		    	query.append(String.format(" ) AS `b` on `a`.`item_sid`=`b`.`sid`"));
		    	
		    	out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
		    }

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>