<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);

		try {
		    if (user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			query.append(String.format("SELECT DATE_FORMAT(update_date, '%%m-%%d-%%Y') AS update_date, a.`year`,a.`month`,a.`file`, DATE_FORMAT(a.`update_date`, '%%m/%%d/%%Y %%H:%%i:%%s') as update_date, a.`user_id` AS user_sid, a.`sid`, a.`type`, b.`user_id` FROM `%s`.`tb_reconciliation_update_%s` AS a LEFT JOIN `wrp`.`tb_user` AS b ON a.`user_id` = b.`sid`", db_name, db_name)); 
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
			
            out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>