<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();
		String store_id = MyRequestUtil.getString(request, "storeId", null);
		
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		
		String feeSid = MyRequestUtil.getString(request, "feeSid", null);
		try {
		    if (store_id == null || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT * FROM (SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `item_type` = 1 AND `fee_sid` = %s) AS a", db_name, store_id, feeSid));
			query.append(String.format(" LEFT JOIN (SELECT DATE_FORMAT(c.`date`, '%%m/%%d/%%Y %%H:%%i:%%s') as date, c.`invoice_no`, d.`user_id` FROM `%s`.`tb_invoice_%s` AS c, `wrp`.`tb_user` AS d WHERE c.`emp_id` = d.`sid`) AS b ON a.invoice_no = b.`invoice_no`;", db_name, store_id));
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>