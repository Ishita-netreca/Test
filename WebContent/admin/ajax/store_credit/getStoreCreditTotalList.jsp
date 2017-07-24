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
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format("SELECT `a`.*, `b`.`customer_name` FROM "));
		query.append(String.format("(SELECT `customer_sid`,`total`,DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR),'%%m/%%d/%%Y %%H:%%i:%%s') as `date` FROM `%s`.`tb_store_credit_%s` WHERE `sid` IN (SELECT MAX(`sid`) FROM `%s`.`tb_store_credit_%s` GROUP BY `customer_sid`) AND `total` > 0) AS `a`",timezone_offset.toString(),db_name,store_id,db_name,store_id));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `customer_name` FROM `%s`.`tb_customer_%s`) AS `b` on `a`.`customer_sid`=`b`.`sid`",db_name,store_id));
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

	} catch (Exception e) {
           if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
           }
	}
	query = null;
%>