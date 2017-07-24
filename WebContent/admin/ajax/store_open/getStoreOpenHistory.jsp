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
	
	String searchPeriodStart = MyRequestUtil.getString(request, "searchPeriodStart", null);
	String searchPeriodEnd = MyRequestUtil.getString(request, "searchPeriodEnd", null);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
			if(searchPeriodStart != null && searchPeriodEnd != null) {
				query.append(String.format("SELECT * FROM( ", searchPeriodStart, searchPeriodEnd));
			}
			query.append(String.format("SELECT `a`.*,DATE_FORMAT(DATE_ADD(`a`.`update_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `updateDate`,DATE_FORMAT(DATE_ADD(`update_date`, INTERVAL %s HOUR), '%%H:%%i:%%s') AS `updateTime`, `b`.`user_id` FROM (SELECT `sid`,`pos_no`,`update_date`,`updater` ", timezone_offset.toString(),timezone_offset.toString()));
			query.append(String.format(" FROM `%s`.`tb_store_open_%s` ORDER BY `update_date` DESC) AS `a` ", db_name, store_id));
			query.append(String.format("LEFT JOIN (SELECT `sid`,`user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s') ) AS `b` ON `a`.`updater`=`b`.`sid`", db_name, store_id));
			query.append(String.format(" ORDER BY `a`.`update_date` DESC"));
			if(searchPeriodStart != null && searchPeriodEnd != null) {
				query.append(String.format(" ) AS `open`  WHERE `open`.`updateDate` BETWEEN '%s' AND '%s' ", searchPeriodStart, searchPeriodEnd));
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