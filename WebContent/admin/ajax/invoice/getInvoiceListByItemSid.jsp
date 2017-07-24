<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();
		String store_id = MyRequestUtil.getString(request, "storeId", null);
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		String itemSid = MyRequestUtil.getString(request, "itemSid", null);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			mPreparedStatementParams = new PreparedStatementParams();
			// 쿼리 입력
			query.append(String.format("SELECT `a`.*,DATE_FORMAT(DATE_ADD(`b`.`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`,`c`.`user_id` FROM ", timezone_offset));
			query.append(String.format("(SELECT `sid`,`item_sid`,`invoice_no`,`serial_no`,`qty` FROM `%s`.`tb_invoice_items_%s` WHERE `item_sid`=? ) AS `a`", db_name,store_id));
			mPreparedStatementParams.set(itemSid);
			query.append(String.format(" LEFT JOIN (SELECT `invoice_no`,`date`,`emp_id` FROM `%s`.`tb_invoice_%s`) AS `b` ON `a`.`invoice_no`=`b`.`invoice_no` ", db_name, store_id));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `c` ON `b`.`emp_id`=`c`.`sid` "));  
		    if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {	    	
		    	query.append(String.format(" WHERE (DATE_FORMAT(DATE_ADD(`b`.`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", timezone_offset, start_date, end_date));
		    }
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>