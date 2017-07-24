<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();
		
		//String sid = MyRequestUtil.getString(request, "sid", null);
		String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;

		
		String ownerSid = (session.getAttribute("wrp_admin_store_owner_sid") != null)? session.getAttribute("wrp_admin_store_owner_sid").toString() : null;
		String userSid = (session.getAttribute("wrp_admin_login_user_sid") != null)? session.getAttribute("wrp_admin_login_user_sid").toString() : null;
		String masterSid = (session.getAttribute("wrp_admin_login_master_sid") != null)? session.getAttribute("wrp_admin_login_master_sid").toString() : null;
		
		String ownerId = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;


		try {
		    if (db_name == null || userSid == null) {
		        throw new Exception();
		    }
			
		    if (master_user_flag || subdealer_user_flag) {
				query.append(String.format("SELECT * FROM wrp.tb_user where sid = %s;", user_sid));
			} else {
				throw new Exception();
			}
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getJSONString(query.toString(), false));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
            out.print("-1");
		}
		query = null;
%>