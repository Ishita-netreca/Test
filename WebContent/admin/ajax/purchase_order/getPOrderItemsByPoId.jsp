<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int poSid = MyRequestUtil.getInt(request, "poSid", 0);
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		if (storeId == null || owner_id == null) {
	        throw new Exception();
	    }
		
		try {
		    if (storeId == null || poSid < 1) {
		        throw new Exception();
		    }
		    sb.append(String.format("SELECT `a`.sid,`a`.po_sid as poSid,`a`.item_sid as itemSid,`a`.order_qty as orderQty,`a`.fulfill_qty as fulfillQty,`a`.receive_qty as receiveQty,`b`.`item_code` as itemCode,`b`.`model`,`a`.`description` FROM (SELECT `sid`,`description`,`po_sid`,`item_sid`,SUM(`order_qty`) AS `order_qty`,SUM(`fulfill_qty`) AS `fulfill_qty`,SUM(`receive_qty`) AS `receive_qty` FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d' GROUP BY `item_sid`) AS `a` LEFT JOIN (SELECT `sid`,`item_code`,`model`,`description` FROM `%s`.`tb_item_dict_%s`) AS `b` ON `a`.`item_sid`=`b`.`sid`",owner_id, storeId, poSid, owner_id, storeId));
			
		    if(keyword != null) {
				sb.append(String.format(" WHERE `b`.`item_code` LIKE '%%%s%%' OR `a`.`description` LIKE '%%%s%%'", keyword, keyword));
			}
		    
		    out.print(MyDBUtil.getInstance().getJSONString(sb.toString(), true));
			
		} catch (Exception e) {

            if (e.getMessage() == null || e.getMessage().length() > 0) {
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