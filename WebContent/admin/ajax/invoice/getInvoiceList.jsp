<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			// 쿼리 입력
			query.append(String.format("SELECT `invoice`.`invoice_no`,`invoice`.`amount`,`invoice`.`tax`,DATE_FORMAT(DATE_ADD(`invoice`.`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`,", timezone_offset.toString()));
			query.append(String.format(" `invoice`.`pos_no`,IF(`invoice`.`customer` > 0, `customer`.`customer_name`, 'GUEST') AS `customer_name`,`user`.`user_id`,`invoice_items`.`transaction_type` FROM "));
			query.append(String.format(" (SELECT `invoice_no`,`amount`,`tax`,`date`,`customer`,`emp_id`,`pos_no` FROM `%s`.`tb_invoice_%s`) AS `invoice`", db_name, store_id));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) AS `customer_name` FROM `%s`.`tb_customer_%s`) AS `customer` ON `invoice`.`customer`=`customer`.`sid`", db_name, store_id));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `user` ON `invoice`.`emp_id`=`user`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `invoice_no`,`transaction_type` FROM `%s`.`tb_invoice_items_%s` GROUP BY `invoice_no`) AS `invoice_items` ON `invoice`.`invoice_no`=`invoice_items`.`invoice_no` WHERE 1=1", db_name, store_id));
			if (start_date != null && start_date.length() > 0 && end_date != null && end_date.length() > 0) {
				query.append(String.format(" AND (DATE(DATE_ADD(`invoice`.`date`, INTERVAL %s HOUR)) BETWEEN STR_TO_DATE('%s 00:00:00', '%%m/%%d/%%Y %%H:%%i:%%s') AND STR_TO_DATE('%s 23:59:59', '%%m/%%d/%%Y %%H:%%i:%%s'))", timezone_offset.toString(),start_date, end_date));
			}
			query.append(String.format(" ORDER BY `invoice`.`date` DESC;"));
			
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>