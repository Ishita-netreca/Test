<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%

		StringBuffer query = new StringBuffer();
		
		
		String storeId = (session.getAttribute("posone_login_store_id") != null)? session.getAttribute("posone_login_store_id").toString() : null;
		int userSid = MyRequestUtil.getInt(request, "userSid", 0);
		
		try {
		    if (userSid < 1 || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT * FROM `wrp`.`tb_user` WHERE `sid`='%d'", userSid));

			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), false));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>