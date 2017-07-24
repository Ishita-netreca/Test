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
	
	String search_keyword = MyRequestUtil.getString(request, "search_keyword", null);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append("SELECT `a`.*,IF(`b`.`store_id` IS NOT NULL, 1, 0) AS `selected` FROM (");
		query.append(String.format("SELECT `sid`,`timezone_id`,`description`,CONCAT(`offset`,':00') AS `offset` FROM `wrp`.`fixed_tb_timezone_define` WHERE `timezone_id` LIKE 'US/%%'"));
		if (search_keyword != null && search_keyword.length() > 0) {
			query.append(String.format(" AND (`timezone_id` LIKE '%%%s%%' OR `description` LIKE '%%%s%%')", search_keyword, search_keyword));
		}
		query.append(") AS `a` LEFT JOIN (");
		query.append(String.format("SELECT `store_id`,`timezone_id` FROM `%s`.`tb_stores` WHERE `store_id` IN ('%s')", db_name, store_id.toUpperCase()));
		query.append(String.format(") AS `b` ON `a`.`timezone_id`=`b`.`timezone_id`"));
		query.append(" ORDER BY `a`.`description`");
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>