<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String userSid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;

		String select = MyRequestUtil.getString(request, "select", null);

		String pre = null;
		
		try {
		    if (userSid == null) {
		        throw new Exception();
		    }

		    pre = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
%>
<%=pre%>