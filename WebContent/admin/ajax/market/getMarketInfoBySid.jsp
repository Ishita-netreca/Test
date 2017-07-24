<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%

		StringBuffer query = new StringBuffer();

		int marketSid = MyRequestUtil.getInt(request, "marketSid", 0);

		try {
		    if (db_name == null || marketSid < 1) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `sid`,`market_code` AS `marketCode`,``name ,`tel` FROM `%s`.`tb_markets` WHERE `sid`='%d'", db_name, marketSid));

			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), false));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>