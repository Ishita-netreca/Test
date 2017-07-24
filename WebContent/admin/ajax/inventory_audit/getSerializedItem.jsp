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
	String serial_no = MyRequestUtil.getString(request, "serial_no", null);
	int item_type = MyRequestUtil.getInt(request, "item_type", -1);
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		mPreparedStatementParams = new PreparedStatementParams();

		query.append(String.format("SELECT `a`.*, `b`.`item_code`,`b`.`sku`,`b`.`description` FROM"));
		query.append(String.format("(SELECT `sid`,`item_sid`,`qty` FROM `%s`.`tb_inventory_%s` WHERE `serial_no`=? ) AS `a`", db_name, store_id));
        mPreparedStatementParams.set(serial_no);      
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_code`,`sku`,`description`,`item_type` FROM `%s`.`tb_item_dict_%s`", db_name, store_id));
		query.append(String.format(" ) AS `b` ON `a`.`item_sid`=`b`.`sid`", item_type));
		query.append(String.format(" WHERE `b`.`item_type`=%d ", item_type));
        
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) { 
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>