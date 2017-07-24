<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%

		StringBuffer query = new StringBuffer();

		String searchKeyword = MyRequestUtil.getString(request, "searchKeyword", null);
		if (searchKeyword != null) {
		    searchKeyword = searchKeyword.replaceAll("'","''");
		}

		try {
		    if (user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `sid`,`market_code` AS `marketCode`,`name`,`tel` FROM `%s`.`tb_markets`", db_name));
			if (searchKeyword != null && searchKeyword.length() > 0) {
			    query.append(String.format(" WHERE `market_code` LIKE '%%%s%%'", searchKeyword));
			}
			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>