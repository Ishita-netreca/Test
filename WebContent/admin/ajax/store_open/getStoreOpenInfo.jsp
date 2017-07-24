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

	int sid = MyRequestUtil.getInt(request, "sid", 0);
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
			query.append(String.format("SELECT `sid`,`cash_count_100`,`cash_count_50`,`cash_count_20`,`cash_count_10`,`cash_count_5`,`cash_count_2`,`cash_count_1`,`cash_count_0.25` AS `cash_count_025`, `cash_count_0.10` AS `cash_count_010`,`cash_count_0.05` AS `cash_count_005`, `cash_count_0.01` AS `cash_count_001`,`check_amount` FROM `%s`.`tb_store_open_%s` WHERE `sid`='%d' ", db_name, store_id, sid));
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
           out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

	} catch (Exception e) {
		
		
           if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
           }
	}
	query = null;
%>