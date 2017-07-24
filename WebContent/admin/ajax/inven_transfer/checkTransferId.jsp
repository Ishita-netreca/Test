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
	String trans_id = MyRequestUtil.getString(request, "trans_id", null);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		mPreparedStatementParams = new PreparedStatementParams();

		query.append(String.format("SELECT `sid` FROM `%s`.`tb_inventory_trans_%s` WHERE `trans_id`=?", db_name, db_name));
		mPreparedStatementParams.set(trans_id);
		
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) { 
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>