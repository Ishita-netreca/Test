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
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	int timezone_sid = MyRequestUtil.getInt(request, "timezone_sid", 0);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null || timezone_sid < 1) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format("UPDATE `%s`.`tb_stores` SET `timezone_id`=(SELECT `timezone_id` FROM `wrp`.`fixed_tb_timezone_define` WHERE `sid` IN (%d)) WHERE `store_id` IN ('%s')", db_name, timezone_sid, store_id));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(query.toString()));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>