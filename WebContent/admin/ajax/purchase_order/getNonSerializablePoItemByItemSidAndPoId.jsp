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
		int itemSid = MyRequestUtil.getInt(request, "itemSid", 0);
		int poSid = MyRequestUtil.getInt(request, "poSid", 0);
		int status = MyRequestUtil.getInt(request, "status", -2);
		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;

		try {
		    if (storeId == null || itemSid < 1 || poSid < 1 || status < -1 || owner_id == null) {
		        throw new Exception();
		    }
			out.print(MyDBUtil.getInstance().getJSONString(String.format("SELECT sid, po_sid as poSid, item_sid as itemSid, order_qty as orderQty, fulfill_qty as fulfillQty, receive_qty as receiveQty, status FROM `%s`.`tb_po_items_%s` WHERE `po_sid`='%d' AND `item_sid`='%d'", owner_id, storeId, poSid, itemSid), true));
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