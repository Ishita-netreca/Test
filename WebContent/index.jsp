<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%
	//response.setHeader("Cache-Control", "no-cache");
	//response.setDateHeader("Expires", 0);
	
	String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
%>
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<title>Wireless Retail POS</title>
		
		<link type="text/css" rel="stylesheet" href="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.css?timestamp=<%=timestamp%>"/>
		<link rel="stylesheet" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.base.css?timestamp=<%=timestamp%>" type="text/css" />
        <link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.arctic.css?timestamp=<%=timestamp%>"/>
		<link rel="stylesheet" type="text/css" media="screen and (max-width: 1280px)" href="index.0.1280.css?timestamp=<%=timestamp%>"/>
		<link rel="stylesheet" type="text/css" media="screen and (min-width: 1281px)" href="index.1281.max.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.css?timestamp=<%=timestamp%>"/>
		<link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.css"/>
		
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-1.10.2.min.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcore.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollbar.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbuttons.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxinput.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpasswordinput.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcombobox.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxlistbox.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdropdownlist.js?timestamp=<%=timestamp%>"></script>
		
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"  />
	</head>
	<body oncontextmenu="return false;" style="overflow-y: hidden;">
		<div id="received-store-id-from-app" onclick="try{document.getElementById('store-id').value=this.innerText.trim();WRPIndexModule.getPosNo(this.innerText.trim());}catch(e){alert(e);}"></div>
		<div id="turn-off-btn" onclick="WRPIndexModule.turnOffApplication();">EXIT</div>
		<div id="page-container">
			<div id="logo">
			</div>
			<div id="login-container">
				<form id="login-form" method="POST">
					<input type="text" class="jqx-login-input" id="store-id" name="storeid"/>
					<div id="pos-no" name="posno" style="background-color: rgba(252,252,252,1);"></div>
					<input type="text" class="jqx-login-input" id="user-name" name="userid"/>
					<input type="password" class="jqx-password-input" name="password" id="password" />					
					<button class="login-btn" onclick="WRPIndexModule.loginSystem(); return false;">Sign in</button>
				</form>
			</div>
			<div id="release">
				
			</div>
		</div>
		<!-- 
		<div id="admin-auth-container" onclick="if(event.target === this) { this.style.display = 'none'; }">
			<div id="auth-container">
				<div class="container-header">
					<div class="header">
						Manager Login
					</div>
				</div>
				<form id="auth-form" method="POST">
					<input id="admin-name" name="adminId" placeholder="Username" onchange="WRPIndexModule.getPosNo();"/>
					<input id="admin-password" type="password" name="adminPasswd" placeholder="Password"/>
					<button class="login-btn" onclick="WRPIndexModule.authAdministrator(); return false;">Login</button>
				</form>
			</div>
		</div>
		  -->
		<div id="footer">
			<div style="position: absolute;left:0px;top:0px;color: rgba(100,100,100,1);padding-left: 10px;cursor: pointer;" onclick="window.open('admin/');">Admin</div>
			<span onclick="WRPIndexModule.loginSystemAsManager();" >&copy;</span> 2016-2017 POSMaster, LLC. <span onclick="WRPIndexModule.loginSystemAsNoah();" >A</span>ll Right Reserved.
		</div>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/index.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript">
			setTimeout(WRPIndexModule.getPosNo, 500);
		</script>
	</body>
</html>