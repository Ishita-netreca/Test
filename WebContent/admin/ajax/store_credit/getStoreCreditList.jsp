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
	int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
	String start_date = MyRequestUtil.getString(request, "start_date", null);
	String end_date = MyRequestUtil.getString(request, "end_date", null);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format("SELECT `sid`,`customer_sid`,`amount`,`total`,DATE_FORMAT(date, '%%m/%%d/%%Y %%H:%%i:%%s') as date,IF(`reason`=1,'Return',IF(`reason`=2,'Check',IF(`reason`=3,'Cash','Others'))) AS `reason` FROM `%s`.`tb_store_credit_%s` WHERE `customer_sid` = '%d' ", db_name, store_id, customerSid));
		
		if (start_date != null && start_date.length() > 0 && end_date != null && end_date.length() > 0) {
			query.append(String.format(" AND `date` BETWEEN STR_TO_DATE('%s 00:00:00', '%%m/%%d/%%Y %%H:%%i:%%s') AND STR_TO_DATE('%s 23:59:59', '%%m/%%d/%%Y %%H:%%i:%%s')", start_date, end_date));
		}
		query.append(String.format("ORDER BY `date` DESC "));
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

	} catch (Exception e) {
		
		
           if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
           }
	}
	query = null;
%>