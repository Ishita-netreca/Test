<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int sid = MyRequestUtil.getInt(request, "sid", 0);

		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }
			mPreparedStatementParams = new PreparedStatementParams();
			
			query.append(String.format("SELECT `a`.*,DATE_FORMAT(DATE_ADD(`a`.`update_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `updateDate`, `b`.* FROM (SELECT * FROM `%s`.tb_cash_register_%s)", timezone_offset.toString(),db_name, storeId));
			query.append(String.format(" AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.tb_user) AS b ON a.updater=b.sid"));
			if (sid > 0) {
				query.append(String.format(" WHERE a.`sid`=?"));
				mPreparedStatementParams.set(sid);
			}

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));		

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		
		query = null;
		sb = null;
%>