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

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			if (keyword != null && keyword.length() > 0) {
				keyword = String.format("%%%s%%",keyword);
			}
			mPreparedStatementParams = new PreparedStatementParams();
			

			// 쿼리 입력
			query.append(String.format("SELECT DATE_FORMAT(DATE_ADD(`a`.date, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') as date, `a`.*, `b`.`user_id`,`c`.`exp_name` FROM (SELECT * FROM `%s`.`tb_expense_history_%s`) AS `a`",timezone_offset,db_name,store_id));
			query.append(String.format(" LEFT JOIN(SELECT `sid`, `user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `emp_name` FROM `wrp`.`tb_user`) AS `b` ON `a`.`emp_id`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`, `name` AS `exp_name` FROM `%s`.`tb_expense_dict_%s`) AS `c` ON `a`.`exp_sid`=`c`.`sid` WHERE 1=1 ", db_name, store_id));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            
			if (search_start_date != null && search_end_date != null) {
				query.append(String.format("AND (DATE_ADD(`date`, INTERVAL %s HOUR) BETWEEN ? AND ?)",timezone_offset));
				mPreparedStatementParams.set(search_start_date);
				mPreparedStatementParams.set(search_end_date);
			}
			
			if (keyword != null && keyword != "") {
				query.append(String.format("AND (`c`.`exp_name` LIKE ? OR `a`.`note` LIKE ?)"));
				mPreparedStatementParams.set(keyword);
				mPreparedStatementParams.set(keyword);
			}
			
			query.append(String.format(" ORDER BY `date` DESC"));
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>