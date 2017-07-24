<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		String master_db_name = MyRequestUtil.getString(request, "master_db_name", null);

		StringBuffer query = new StringBuffer();

		try {
		    if (master_db_name == null) {
		        throw new Exception();
		    }
			
		    query.append(String.format("SELECT `store_id` FROM `%s`.`tb_stores`", master_db_name));
			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		
		query = null;
%>