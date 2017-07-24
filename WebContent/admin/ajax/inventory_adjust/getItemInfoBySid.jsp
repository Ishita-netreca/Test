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
	int item_sid = MyRequestUtil.getInt(request, "item_sid", 0);
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }		


		mPreparedStatementParams = new PreparedStatementParams();
		// 쿼리 입력

       	
		query.append(String.format("SELECT `a`.*, `b`.`serial_no`,SUM(`b`.`qty`) AS `qty` FROM (SELECT `sid`,`item_code`,`description`,`model`,`sku`,`upc`,`item_type` FROM `%s`.`tb_item_dict_%s`", db_name,store_id));
		query.append(String.format(" WHERE `sid`=%d) AS `a`", item_sid));
		query.append(String.format(" LEFT JOIN (SELECT `item_sid`,`serial_no`,`qty` FROM `%s`.`tb_inventory_%s`) AS `b` ON `a`.`sid`=`b`.`item_sid` GROUP BY `sid`", db_name, store_id));

       	
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>