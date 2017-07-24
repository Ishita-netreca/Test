<%//170208 jh%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		StringBuffer query = new StringBuffer();
		String store_id = MyRequestUtil.getString(request, "storeId", null);
		String user_sid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
		
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		
		String feeSid = MyRequestUtil.getString(request, "feeSid", null);
		try {
		    if (store_id == null || user_sid == null || owner_id == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT * FROM (SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `item_type` = 1 AND `fee_sid` = %s) AS a", owner_id, store_id, feeSid));
			query.append(String.format(" LEFT JOIN (SELECT c.`date`, c.`invoice_no`, d.`user_id` FROM `%s`.`tb_invoice_%s` AS c, `wrp`.`tb_user` AS d WHERE c.`emp_id` = d.`sid`) AS b ON a.invoice_no = b.`invoice_no`;", owner_id, store_id));
			out.print(MyDBUtil.getJSONString(query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>