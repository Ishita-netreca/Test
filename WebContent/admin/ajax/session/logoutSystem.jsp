<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    session.setAttribute("posone_admin_login_user_id",null);
    session.setAttribute("posone_admin_login_user_sid",null);
    session.setAttribute("posone_admin_login_store_id",null);
    session.setAttribute("posone_admin_login_store_sid",null);
    session.setAttribute("wrp_admin_selected_store_id", null);
    session.setAttribute("wrp_last_loaded_page",null);
    session.setAttribute("wrp_admin_login_user_owner_flag", null);
    session.setAttribute("wrp_admin_selected_store_timezone_id", null);
	session.setAttribute("wrp_admin_selected_store_timezone_offset", null); 
    out.print("0");
%>