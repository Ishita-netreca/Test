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
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format("SELECT `a`.`total`, `b`.`customer_id` FROM(SELECT `total`,`customer_sid` FROM `%s`.`tb_store_credit_%s` WHERE customer_sid = '%d' ORDER BY `date` DESC LIMIT 0,1) AS `a`", db_name, store_id, customerSid));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`customer_id` FROM `%s`.`tb_customer_%s`) AS `b` ON `a`.`customer_sid` = `b`.`sid`;", db_name, store_id));

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), false));

	} catch (Exception e) {
		
		
           if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
           }
	}
	query = null;
%>