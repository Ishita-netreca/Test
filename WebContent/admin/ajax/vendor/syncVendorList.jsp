<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%><%@ page import="java.lang.invoke.MutableCallSite"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request,"storeId", null);
		
		
		String query;
		try {
			if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query = String.format("DELETE FROM `%s`.`tb_vendor` WHERE `sid` BETWEEN 1 AND 100000;INSERT INTO `%s`.`tb_vendor` (SELECT * FROM `wrp`.`tb_vendor` WHERE `sid` BETWEEN 1 AND 100000);", db_name, db_name);
			
			stmt.execute(query);

			out.print("0");
		} catch (Exception e) {
			out.print("-1");
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>