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
	int customer_sid = MyRequestUtil.getInt(request, "customer_sid", 0);
	int amount = MyRequestUtil.getInt(request, "amount", 0);
	int total = MyRequestUtil.getInt(request, "total", 0);
	int reason = MyRequestUtil.getInt(request, "reason", 0);
	String note = MyRequestUtil.getString(request, "note", null);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		 query.append(String.format("INSERT INTO `%s`.`tb_store_credit_%s`(`customer_sid`,`amount`,`total`,`reason`,`note`) VALUES('%d','%d','%d','%d','%s')",
                		db_name, store_id, customer_sid, amount, total, reason, note ));
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
		 out.print(MyDBUtil.getInstance().execute(query.toString()));

	} catch (Exception e) {
		
		
           if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
           }
	}
	query = null;
%>