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
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `a`.`invoice_no`,`a`.`amount`,`a`.`tax`,`a`.`date`,`a`.`emp_id`,`b`.`customer_id`,`c`.`cash`,`c`.`credit`,`c`.`loan`,`c`.`check`,`c`.`creditmemo` FROM ("));
			query.append(String.format("SELECT `invoice_no`,`amount`,`tax`,`emp_id`,`customer`,DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date` FROM `%s`.`tb_invoice_%s`", timezone_offset,db_name, storeId));
			query.append(") AS `a`");
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`customer_id` FROM `%s`.`tb_customer_%s`) AS `b`", db_name, storeId));
			query.append(String.format(" ON `a`.`customer`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `invoice_no`,IF(`type`=0,`amount`,0) AS `cash`,IF(`type`=1,`amount`,0) AS `credit_card`,IF(`type`=1,`amount`,0) AS `credit`,"));
            query.append(String.format("IF(`type`=3,`amount`,0) AS `loan`,IF(`type`=4,`amount`,0) AS `check`,IF(`type`=5,`amount`,0) AS `creditmemo` "));
            query.append(String.format("FROM `%s`.`tb_checkout_items_%s`) AS `c` ON `a`.`invoice_no` = `c`.`invoice_no`", db_name, storeId));
            if (start_date != null && start_date.length() > 0 && end_date != null && end_date.length() > 0) {
				query.append(String.format(" WHERE `date` BETWEEN '%s 00:00:00' AND '%s 23:59:59'", start_date, end_date));
			}
			query.append(" ORDER BY `date` DESC");

			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>