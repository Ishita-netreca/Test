<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%
		
		StringBuffer query = new StringBuffer();

		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

		String storeId = MyRequestUtil.getString(request, "storeId", null);
        int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
        String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
        String start_date = MyRequestUtil.getString(request, "start_date", null);
    	String end_date = MyRequestUtil.getString(request, "end_date", null);
    	
		try {
		    if (storeId == null || owner_id == null) {
		        throw new Exception();
		    }


			query.append("SELECT `a`.`invoice_no` AS `invoiceNo`,`a`.`amount`,`a`.`tax`,`a`.`date`,`a`.`customer`,`b`.`emp_id` AS `empId` FROM (");
			if (customerSid > 0) {
			    query.append(String.format("SELECT * FROM `%s`.`tb_invoice_%s` WHERE `customer`='%d'", owner_id, storeId, customerSid));
			} else {
			    query.append(String.format("SELECT * FROM `%s`.`tb_invoice_%s`", owner_id, storeId));
			}
			query.append(") AS `a`");
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `emp_id` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')) AS `b`", owner_id, storeId.toUpperCase()));
			query.append(String.format(" ON `a`.`emp_id`=`b`.`sid`"));
			if (start_date != null && start_date.length() > 0 && end_date != null && end_date.length() > 0) {
				query.append(String.format(" WHERE `date` BETWEEN STR_TO_DATE('%s 00:00:00', '%%m/%%d/%%Y %%H:%%i:%%s') AND STR_TO_DATE('%s 23:59:59', '%%m/%%d/%%Y %%H:%%i:%%s')", start_date, end_date));
			}
            query.append(" ORDER BY `date` DESC ");
            
            out.print(MyDBUtil.getJSONString(query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query=null;
%>