<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
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
		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;

		try {
		    if (storeId == null || poSid == 0 || owner_id == null) {
		        throw new Exception();
		    }
			out.print(MyDBUtil.getInstance().getJSONString(String.format("SELECT `a`.`sid`,`a`.`po_id` as poId, `a`.`status`, `b`.`vendor_id` as vendorId FROM (SELECT `sid`,`po_id`,`status`,`vendor_id` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `a` LEFT JOIN `%s`.`tb_vendor` AS `b` ON `a`.`vendor_id`=`b`.`sid`", owner_id, storeId, poSid, owner_id), true));
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