<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		
		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
        int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
        String start_date = MyRequestUtil.getString(request, "start_date", null);
    	String end_date = MyRequestUtil.getString(request, "end_date", null);
    	
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }


			query.append("SELECT `a`.`invoice_no` AS `invoiceNo`,`a`.`amount`,`a`.`tax`,DATE_FORMAT(`a`.`date`, '%m/%d/%Y %H:%i:%s') as date,`a`.`customer`,`b`.`emp_id` AS `empId` FROM (");
			if (customerSid > 0) {
			    query.append(String.format("SELECT * FROM `%s`.`tb_invoice_%s` WHERE `customer`='%d'", db_name, storeId, customerSid));
			} else {
			    query.append(String.format("SELECT * FROM `%s`.`tb_invoice_%s`", db_name, storeId));
			}
			query.append(") AS `a`");
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `emp_id` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')) AS `b`", db_name, storeId.toUpperCase()));
			query.append(String.format(" ON `a`.`emp_id`=`b`.`sid`"));
			if (start_date != null && start_date.length() > 0 && end_date != null && end_date.length() > 0) {
				query.append(String.format(" WHERE `date` BETWEEN STR_TO_DATE('%s 00:00:00', '%%m/%%d/%%Y %%H:%%i:%%s') AND STR_TO_DATE('%s 23:59:59', '%%m/%%d/%%Y %%H:%%i:%%s')", start_date, end_date));
			}
            query.append(" ORDER BY `date` DESC ");
            
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query=null;
%>