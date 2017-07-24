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

	PreparedStatementParams mPreparedStatementParams = null;
	
	String store_id = MyRequestUtil.getString(request, "store_id", null);
	int lock_flag = MyRequestUtil.getInt(request, "lock_flag", -1);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		mPreparedStatementParams = new PreparedStatementParams();
		
		query.append(String.format("UPDATE `%s`.`tb_stores` SET `lock_inventory_flag`=%d WHERE `store_id`='%s';",db_name,lock_flag,store_id)); 

        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams)); 

	} catch (Exception e) { 
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>