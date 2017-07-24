<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		int categorySid = MyRequestUtil.getInt(request, "categorySid", 0);
		String storeId = MyRequestUtil.getString(request, "storeId", null);

		PreparedStatementParams mPreparedStatementParams = null;
		try {
		    if (storeId == null || db_name == null || categorySid < 1) {
		        throw new Exception();
		    }

			mPreparedStatementParams = new PreparedStatementParams();
			
		    query.append(String.format("SELECT sid, category_name as categoryName, parent_sid as parentSid FROM `%s`.`tb_categories_dict_%s` WHERE `sid`=?", db_name, owner_id));
			mPreparedStatementParams.set(categorySid);
			
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>