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
	int adjust_sid = MyRequestUtil.getInt(request, "adjust_sid", 0);
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }		


		mPreparedStatementParams = new PreparedStatementParams();
		// 쿼리 입력

       	
		query.append(String.format("SELECT `a`.*, `b`.`description` FROM (SELECT `item_sid`,`serial_no` FROM `%s`.`tb_inventory_simple_adjust_items_%s`", db_name,store_id));
		query.append(String.format(" WHERE `adjust_sid`=%d ) AS `a` LEFT JOIN (", adjust_sid));
		query.append(String.format(" SELECT `description`,`sid` FROM `%s`.`tb_item_dict_%s`) AS `b` ON `a`.`item_sid`=`b`.`sid`", db_name,store_id));

       	
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>