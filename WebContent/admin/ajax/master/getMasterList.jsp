<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%

		StringBuffer query = new StringBuffer();

		try {
			
		    query.append(String.format("SELECT `master_id`,`db_name` FROM `wrp`.`tb_master_info`"));
			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		
		query = null;
%>