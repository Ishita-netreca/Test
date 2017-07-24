<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.SimpleDateFormat" %>
<!doctype html>
<%		
	String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());

	session.setAttribute("wrp_last_loaded_page", null);
%>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="cache-control" content="no-cache"/>
        <title>WRP Administrator's Page</title>
        <link rel="stylesheet" type="text/css" href="index.less.1200.css?timestamp=<%=timestamp%>"/>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-1.10.2.min.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.js?timestamp=<%=timestamp%>"></script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"  />
    </head>
    <body oncontextmenu="return false;">
        <div id="header">

        </div>
        <div id="background">

        </div>
        <!--
        <div id="gradient-container">

        </div>
        -->
        <div id="article">
            <div class="logo">

            </div>
            <div id="login-container">
                <div class="title">
                    Sign in
                </div>
                <input type="text" placeholder="ID" id="login-user-id"/>
                <input type="password" placeholder="Password" id="login-user-password" onkeydown="if(event.keyCode === 13) { POSOneAdminIndexModule.loginSystem(); }"/>
                <div class="line" style="text-align: right; margin-top: 15px;">
                    <div id="login-btn" onclick="POSOneAdminIndexModule.loginSystem();">Sign in<i class="icon in"></i></div>
                </div>
            </div>
        </div>
        <div id="footer">
            <span onclick="POSOneAdminIndexModule.loginSystemAsEmily()">ⓒ</span> 2016-2017 POSMaster, Ilc. All rights reserved.
        </div>
        <script type="text/javascript" src="index.js?timestamp=<%=timestamp%>"></script>
    </body>
</html>