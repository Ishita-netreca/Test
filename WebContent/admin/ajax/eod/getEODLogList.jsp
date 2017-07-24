<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
			if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			mPreparedStatementParams = new PreparedStatementParams();
			
			query.append(String.format("SELECT `a`.sid, `a`.`eod_date` as eodDate, `a`.`update_time` as updateTime, `a`.`pos_no` as posNo, `b`.`user_id` FROM ("));
			query.append(String.format("SELECT `sid`,DATE_FORMAT(DATE_ADD(`eod_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `eod_date`, DATE_FORMAT(DATE_ADD(`eod_date`, INTERVAL %s HOUR), '%%H:%%i:%%s') AS `update_time`,`updater`,`pos_no` FROM `%s`.`tb_eod_%s`", timezone_offset.toString(),timezone_offset.toString(),db_name, storeId));
			
			if (start_date != null && end_date != null) {
				query.append(String.format(" WHERE DATE_FORMAT(DATE_ADD(`eod_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ? ", timezone_offset.toString()));
				mPreparedStatementParams.set(start_date);
				mPreparedStatementParams.set(end_date);
			}
			
			query.append(String.format(") AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s') ) AS `b` ON `a`.`updater`=`b`.`sid`", db_name, storeId));
			query.append(String.format(" ORDER BY `eod_date` DESC;"));
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
			if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>