<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		int year = MyRequestUtil.getInt(request, "year", 0);
		int month = MyRequestUtil.getInt(request, "month", 0);

		try {
		    if (store_id == null || db_name == null) {
		        throw new Exception();
		    }

		    query.append(String.format("SELECT DISTINCT `users`.`user_id` `employee`,IF(`transaction_count`.`box_count` is null, 0, `transaction_count`.`box_count`) as `box_count` FROM"));
		    query.append(String.format(" (SELECT `sid`,`user_id` FROM `wrp`.`tb_user` WHERE `sid` IN ( SELECT `user_sid` FROM `%s`.`tb_user_store_access` WHERE `store_id` IN ('%s') ) AND `sid` != `master_sid` AND `disable`=0) as `users`", db_name, store_id));
		    query.append(String.format(" LEFT JOIN (SELECT `b`.`emp_id`,`c`.`user_id`,SUM(IF (`a`.`transaction_type` IN (0, 1, 2, 3, 12, 14), 1, 0)) `box_count`,sum(if (`a`.`transaction_type` in (4, 5, 6, 7, 13), 1, 0)) `byod_count` FROM `%s`.`tb_invoice_items_%s` `a`", db_name, store_id));
		    query.append(String.format(" LEFT JOIN `%s`.`tb_invoice_%s` `b` on `a`.`invoice_no` = `b`.`invoice_no` LEFT JOIN `wrp`.`tb_user` `c` ON `b`.`emp_id` = `c`.`sid`",db_name, store_id));
		    query.append(String.format(" WHERE DATE_FORMAT(`b`.`date`, '%%m%%y') = DATE_FORMAT(DATE_ADD(now(), INTERVAL %s HOUR), '%%m%%y') GROUP BY `b`.`emp_id` ) as `transaction_count`",timezone_offset));
		    query.append(String.format(" on `users`.`user_id` = `transaction_count`.`user_id` ORDER BY `box_count` DESC, `employee` ASC LIMIT 10;"));

		    out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>