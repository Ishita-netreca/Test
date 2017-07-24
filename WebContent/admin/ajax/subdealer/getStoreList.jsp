<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();
		
		String req_user_id = MyRequestUtil.getString(request, "userId", null);
		try {
		    if (req_user_id == null || db_name == null) {
		        throw new Exception();
		    }
			// 쿼리 입력
			query.append(String.format("SELECT b.* FROM (SELECT * FROM %s.tb_user_store_access WHERE user_id='%s') a LEFT JOIN %s.`tb_stores` AS b ON a.store_id = b.`store_id`;", db_name, req_user_id, db_name));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>