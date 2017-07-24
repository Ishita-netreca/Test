<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="java.sql.Timestamp"%>
<%@ page import="java.util.Date"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer sb = new StringBuffer();

		String storeId = (session.getAttribute("posone_login_store_id") != null)? session.getAttribute("posone_login_store_id").toString() : null;
		String ownerSid = (session.getAttribute("wrp_admin_store_owner_sid") != null)? session.getAttribute("wrp_admin_store_owner_sid").toString() : "0";
		String userSid = (session.getAttribute("wrp_admin_login_user_sid") != null)? session.getAttribute("wrp_admin_login_user_sid").toString() : "0";
		String password = MyRequestUtil.getString(request, "password", null);
		String firstName = MyRequestUtil.getString(request, "firstName", null);
		//String middleName = MyRequestUtil.getString(request, "middleName", null);
		String lastName = MyRequestUtil.getString(request, "lastName", null);
		String address1 = MyRequestUtil.getString(request, "address1", null);
		String address2 = MyRequestUtil.getString(request, "address2", null);
		String city = MyRequestUtil.getString(request, "city", null);
		String state = MyRequestUtil.getString(request, "state", null);
		String zipcode = MyRequestUtil.getString(request, "zipcode", null);
		String email = MyRequestUtil.getString(request, "email", null);
		String mobile = MyRequestUtil.getString(request, "mobile", null);
		
		int result = 0;

		String [] arr = null;

		try {
		    if (db_name == null || userSid.equals("0")) {
		        throw new Exception();
		    }
            sb.append(String.format("UPDATE `wrp`.`tb_user` SET `password`='%s',`first_name`='%s',`last_name`='%s',`address1`='%s',`address2`='%s',`city`='%s',`state`='%s',`zipcode`='%s',`tel`='%s',`email`='%s' WHERE `sid`='%s';",
                    password, firstName, lastName, address1, address2, city, state, zipcode, mobile, email, userSid
                ));
            MyDBUtil.execute(sb.toString());

            out.print("0");

		} catch (Exception e) {

            if (e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

            out.print("-1");
		}
		sb = null;
%>