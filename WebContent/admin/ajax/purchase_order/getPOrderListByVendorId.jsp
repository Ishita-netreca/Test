<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
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
		int vendorId = MyRequestUtil.getInt(request, "vendorId", 0);

		DecimalFormat df = new DecimalFormat("000000000000");
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;

		try {
		    if (storeId == null || vendorId < 1 || owner_id == null) {
		        throw new Exception();
		    }
			query.append(String.format("SELECT `ab`.poId, ab.sid, ab.status, ab.orderer_id as ordererId, ab.order_date as orderDate, ab.vendor_id as vendorId, `c`.`total_order_qty` as totlaOrderQty FROM ("));
			query.append(String.format("SELECT `a`.`sid`, `a`.`status`, `a`.`orderer_id`, `a`.`order_date`, `b`.`vendor_id` FROM (SELECT * FROM `%s`.`tb_po_%s` WHERE `vendor_id`='%d') AS `a` LEFT JOIN `%s`.`tb_vendor` AS `b` ON `a`.`vendor_id`=`b`.`sid`", owner_id, storeId, vendorId, owner_id));

			query.append(String.format(") AS `ab` LEFT JOIN (SELECT `po_sid`, SUM(`order_qty`) AS `total_order_qty` FROM `%s`.`tb_po_items_%s` GROUP BY `po_sid`) AS `c` ON `ab`.`sid`=`c`.`po_sid` ORDER BY `status`, `order_date` DESC", owner_id, storeId));
			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

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