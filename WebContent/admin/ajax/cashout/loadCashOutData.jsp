<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
/*
SELECT c.`date`, c.`amount`, c.`emp_id`, c.`out_type`, c.`note`, u.`first_name` FROM `tb_cashout_pca017` AS c, tb_user AS u WHERE c.emp_id = u.`sid` AND u.`sid` = 8;
SELECT c.`date`, c.`amount`, c.`emp_id`, c.`out_type`, c.`note`, u.`first_name` FROM `tb_cashout_?` AS c, tb_user AS u WHERE c.emp_id = u.`sid` AND u.`sid` = ?;
*/

	StringBuffer query = new StringBuffer();

	
	String storeId = request.getParameter("storeId");
	String start_date = MyRequestUtil.getString(request, "start_date", null);
	String end_date = MyRequestUtil.getString(request, "end_date", null);

	int sid = 0;

	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if (storeId == null || db_name == null) {
	        throw new Exception();
	    }
		mPreparedStatementParams = new PreparedStatementParams();
		
		query.append(String.format("SELECT `c`.`sid`, DATE_FORMAT(DATE_ADD(`c`.`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`, `c`.`amount` as `cash`, `c`.`emp_id` as `empid`, `c`.`out_type` as `outto`, `c`.`note`, CONCAT_WS(' ',`u`.`first_name`,`u`.`middle_name`,`u`.`last_name`) AS `empname`, `u`.`user_id` FROM `%s`.`tb_cashout_%s` AS `c`, `wrp`.`tb_user` AS `u` WHERE `c`.`emp_id` = `u`.`sid`", timezone_offset.toString(),db_name, storeId));
		
		if (start_date != null && end_date != null){
			query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`c`.`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ?", timezone_offset));
			mPreparedStatementParams.set(start_date);
			mPreparedStatementParams.set(end_date);
		}
		query.append(String.format(" ORDER BY `date` DESC"));
		out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));
	} catch (Exception e) {
	    if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
	    }
	}
	
	query=null;
%>