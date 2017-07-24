<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String curr_store_id = MyRequestUtil.getString(request, "curr_store_id", null);	

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format("SELECT `store_id`, TRIM(CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`)) AS `address`,`tel`"));
		query.append(String.format(" FROM `%s`.`tb_stores` WHERE `owner_sid` IN (SELECT `owner_sid` FROM `wrp`.`tb_user` WHERE `sid` IN (%s) )", db_name, user_sid));
		if (curr_store_id != null && curr_store_id.length() > 0) {
			query.append(String.format(" AND `store_id` NOT IN ('%s')", curr_store_id));
		}

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>