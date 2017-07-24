<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);

	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }


		mPreparedStatementParams = new PreparedStatementParams();
		// 쿼리 입력
		query.append(String.format("SELECT `store`.`store_id`,`market`.*, `district`.* FROM"));
		query.append(String.format("(SELECT * FROM `%s`.`tb_stores` WHERE `store_id`=?) AS `store`", db_name));
		mPreparedStatementParams.set(store_id);
		query.append(String.format(" LEFT JOIN (SELECT `name` AS `marketName`,`market_code` FROM `%s`.`tb_markets`) AS `market` ON `store`.`market_code`=`market`.`market_code`",db_name));
		query.append(String.format(" LEFT JOIN (SELECT `name` AS `districtName`,`district_code` FROM `%s`.`tb_districts`) AS `district` ON `store`.`district_code`=`district`.`district_code`",db_name));
		
		// 파라미터 입력
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>