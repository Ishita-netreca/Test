
<%
	String user_id = (session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("wrp_admin_login_user_id").toString() : null;
	String user_sid = (session.getAttribute("wrp_admin_login_user_sid") != null)? session.getAttribute("wrp_admin_login_user_sid").toString() : null;
	String owner_sid = (session.getAttribute("wrp_admin_store_owner_sid") != null)? session.getAttribute("wrp_admin_store_owner_sid").toString() : null;
	String owner_id =  (session.getAttribute("wrp_admin_login_owner_id") != null)? session.getAttribute("wrp_admin_login_owner_id").toString() : null;
	String master_sid = (session.getAttribute("wrp_admin_login_master_sid") != null)? session.getAttribute("wrp_admin_login_master_sid").toString() : null;
	String db_name = (session.getAttribute("wrp_admin_login_master_db_name") != null)? session.getAttribute("wrp_admin_login_master_db_name").toString() : null;
	String timezone_offset = (session.getAttribute("wrp_admin_selected_store_timezone_offset") != null)? session.getAttribute("wrp_admin_selected_store_timezone_offset").toString() : "0";
	
	boolean master_user_flag = (session.getAttribute("wrp_admin_login_user_master_flag") != null && session.getAttribute("wrp_admin_login_user_master_flag").toString().equals("0"))? false: true;
	boolean subdealer_user_flag = (session.getAttribute("wrp_admin_login_user_subdealer_flag") != null && session.getAttribute("wrp_admin_login_user_subdealer_flag").toString().equals("0"))? false: true;
%>