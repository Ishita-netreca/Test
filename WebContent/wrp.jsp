<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="com.boas.wrp.util.MyDBUtil" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ include file="ajax/common.jsp" %>
<% //
	//response.setHeader("Cache-Control", "no-cache");
	//response.setDateHeader("Expires", 0);
	String pageName = MyRequestUtil.getString(request, "pageName", null);
	
	String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
	
	boolean allow_all_permission_flag = ( (session.getAttribute("wrp_allow_all_permission_flag") != null && session.getAttribute("wrp_allow_all_permission_flag").toString().equals("1") ) 
			|| (session.getAttribute("wrp_login_user_master_flag") != null && session.getAttribute("wrp_login_user_master_flag").toString().equals("1") )  
			|| (session.getAttribute("wrp_login_user_subdealer_flag") != null && session.getAttribute("wrp_login_user_subdealer_flag").toString().equals("1") ) )? true: false;
	org.json.simple.JSONObject permission_object = (session.getAttribute("wrp_login_user_permission_obj") != null)? (org.json.simple.JSONObject)session.getAttribute("wrp_login_user_permission_obj"): null;
	
	boolean permission_flag = false;
%>
<%
	String lastLoadedPage = (session.getAttribute("wrp_last_loaded_page") == null)? "" : session.getAttribute("wrp_last_loaded_page").toString();
	int userSid = 0;
	int userType = 3;
	int posNo = 1;
	int intTmp = 0;
	StringBuffer query = null;
	try {
		userSid = Integer.parseInt(session.getAttribute("wrp_login_user_sid").toString());
	} catch (Exception e) {
		//e.printStackTrace();
	}
	try {
		userType = Integer.parseInt(session.getAttribute("wrp_login_user_type").toString());
	} catch (Exception e) {
	}

	try {
		posNo = Integer.parseInt(session.getAttribute("wrp_login_pos_no").toString());
	} catch (Exception e) {
	}
	JSONObject permissionData = null;
	JSONObject store_info_obj = null;
%>

<%
	if (db_name != null && store_id != null && userSid > 0) {
		if (query == null) {
			query = new StringBuffer();
		}
		query.append(String.format("SELECT `clock_io`.`clock_io_sid`,`store`.*,`return`.`return_policy`,`payment`.`payment_policy`,`xbm`.`xbm_policy`,`store_open`.`store_open_flag`,`eod`.`eod_flag`,`clock_io`.`clock_io_status`,`cash_register`.`credit_device_host` FROM ("));
		query.append(String.format(" SELECT *, '%s' AS `user_id`, TRIM(CONCAT_WS(' ',`address1`,`address2`)) AS `addr1`, TRIM(CONCAT_WS(' ',IF(`city` IS NOT NULL AND `city` != '', CONCAT(`city`,','), ''),`state`,`zipcode`)) AS `addr2` FROM `%s`.`tb_stores` WHERE `store_id`='%s' LIMIT 0,1", user_id, db_name, store_id));
		query.append(String.format(" ) AS `store` LEFT JOIN ("));
		query.append(String.format(" SELECT '%s' AS `store_id`,`policy` AS `return_policy` FROM `%s`.`tb_policies_print_%s` WHERE `name`='return' LIMIT 0,1", store_id, db_name, store_id));
		query.append(String.format(" ) AS `return` ON `store`.`store_id`=`return`.`store_id` LEFT JOIN ("));
		query.append(String.format(" SELECT '%s' AS `store_id`,`policy` AS `payment_policy` FROM `%s`.`tb_policies_print_%s` WHERE `name`='payment' LIMIT 0,1", store_id, db_name, store_id));
		query.append(String.format(" ) AS `payment` ON `store`.`store_id`=`payment`.`store_id` LEFT JOIN ("));
		query.append(String.format(" SELECT '%s' AS `store_id`,`policy` AS `xbm_policy` FROM `%s`.`tb_policies_print_%s` WHERE `name`='xbm' LIMIT 0,1", store_id, db_name, store_id));
		query.append(String.format(" ) AS `xbm` ON `store`.`store_id`=`xbm`.`store_id` LEFT JOIN ("));
		query.append(String.format(" SELECT COUNT(`sid`) AS `unmentioned`,'%s' AS `store_id`,IF(COUNT(`sid`) > 0, 1, 0) AS `store_open_flag` FROM `%s`.`tb_store_open_%s`", store_id, db_name, store_id));
		query.append(String.format(" WHERE DATE_FORMAT(DATE_ADD(`update_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y')=DATE_FORMAT(DATE_ADD(NOW(), INTERVAL %s HOUR),'%%m/%%d/%%Y') AND `pos_no` IN (%s) LIMIT 0, 1",timezone_offset,timezone_offset,pos_no));
		query.append(String.format(" ) AS `store_open` ON `store`.`store_id`=`store_open`.`store_id` LEFT JOIN ("));
		query.append(String.format(" SELECT COUNT(`sid`) AS `unmentioned`,'%s' AS `store_id`, IF(COUNT(`sid`) > 0, 1, 0) AS `eod_flag` FROM `%s`.`tb_eod_%s`", store_id, db_name,store_id));
		query.append(String.format(" WHERE DATE_FORMAT(DATE_ADD(`eod_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y')=DATE_FORMAT(DATE_ADD(NOW(), INTERVAL %s HOUR),'%%m/%%d/%%Y') AND `pos_no` IN (%s)",timezone_offset,timezone_offset,pos_no));
		query.append(String.format(" ) AS `eod` ON `store`.`store_id`=`eod`.`store_id` LEFT JOIN ("));
		query.append(String.format(" SELECT `a`.`sid` AS `clock_io_sid`, COUNT(`sid`) AS `unmentioned`,'%s' AS `store_id`, IF(`a`.`status` IS NOT NULL, IF((`a`.`end` IS NOT NULL OR `a`.`end` != '') AND `a`.`status`= 0,3,`a`.`status`), -1) AS `clock_io_status` FROM (", store_id));
		query.append(String.format(" SELECT `sid`,`status`,`end` FROM `%s`.`tb_clock_io_%s` WHERE `emp_sid` IN (%s) AND `pos_no` IN (%s) AND DATE_FORMAT(DATE_ADD(`update_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y')=DATE_FORMAT(DATE_ADD(NOW(), INTERVAL %s HOUR),'%%m/%%d/%%Y') ORDER BY `sid` DESC LIMIT 0, 1",db_name,store_id, user_sid, pos_no,timezone_offset,timezone_offset));
		query.append(String.format(" ) AS `a`) AS `clock_io` ON `store`.`store_id`=`clock_io`.`store_id` LEFT JOIN ("));
		query.append(String.format(" SELECT '%s' AS `store_id`,IF(( `credit_device_url` IS NOT NULL AND `credit_device_url` != '' ) AND ( `credit_device_port` IS NOT NULL AND `credit_device_port` > 0 ) , CONCAT(`credit_device_url`,':',`credit_device_port`), NULL) AS `credit_device_host` FROM `%s`.`tb_cash_register_%s` WHERE `register_no`='%d'", store_id, db_name, store_id, posNo));
		query.append(String.format(" ) AS `cash_register` ON `store`.`store_id`=`cash_register`.`store_id`"));
		store_info_obj = MyDBUtil.getInstance().getObject(db_name, owner_id, store_id, query.toString());
		
	}
%>

<!doctype html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<title>Wireless Retail POS</title>
<%
	if (userSid == 0 ) {
%>
		<script>
			alert("You signed out from this system. Move to index page");
			location.href="index.jsp";
		</script>
<%
	}
%>
		<link type="text/css" rel="stylesheet" href="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.css?timestamp=<%=timestamp%>"/>
		<link rel="stylesheet" href="https://myaccount.posmasterus.com/common/scrollbar/scrollbar.css?timestamp=<%=timestamp%>" />
		<link rel="stylesheet" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.base.css?timestamp=<%=timestamp%>" type="text/css" />
        <link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.arctic.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="wrp.less.1200.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="assets/wrp.components.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="wrp.icons.less.1200.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="wrp.workscheduler.less.1200.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="wrp.weeklyworkscheduler.less.1200.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="wrp.ui.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="wrp.pages.less.1200.css?timestamp=<%=timestamp%>"/>
		<link type="text/css" rel="stylesheet" href="wrp.popup.less.1200.css?timestamp=<%=timestamp%>"/>
		<link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.css"/>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"  />
		
		<!-- 161226 jh : jqx -->
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-1.10.2.min.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery.form.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/scrollbar/jquery.scrollbar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcore.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtabs.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.js?timestamp=<%=timestamp%>"></script> 
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatatable.js?timestamp=<%=timestamp%>"></script> 
   	 	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxwindow.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbuttons.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxradiobutton.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollbar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxlistbox.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcombobox.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdropdownlist.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxmenu.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.edit.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.grouping.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.filter.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.sort.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.selection.js?timestamp=<%=timestamp%>"></script> 
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/globalization/globalize.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcalendar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatetimeinput.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcheckbox.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdraw.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtooltip.js?timestamp=<%=timestamp%>"></script>
  		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxchart.core.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtree.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxsplitter.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.columnsresize.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxinput.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxmaskedinput.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtextarea.js?timestamp=<%=timestamp%>"></script>
	</head>
	<body oncontextmenu="return false;">
	<!--<div onclick="WRPApp.SalesModule.callAsapPage();" style="position: fixed; left: 10px; top: 50px; text-align: center; width: 150px; height: 30px; line-height: 25px; z-index:3; background-color: rgba(255,255,0,1); cursor: pointer; border-radius:5px;">Open ASAP</div>-->
		<div id="user-info-container">
			<div class="user-info">
				EMPLOYEE. <span id="logined-emp-name"><%=(session.getAttribute("wrp_login_user_id") != null)? session.getAttribute("wrp_login_user_id").toString() : ""%></span>
				<span id="logined-emp-lastname">(<%=(session.getAttribute("wrp_login_user_lastname") != null)? session.getAttribute("wrp_login_user_lastname").toString() : ""%></span>
				<span id="logined-emp-firstname">, <%=(session.getAttribute("wrp_login_user_firstname") != null)? session.getAttribute("wrp_login_user_firstname").toString() : ""%>)</span>
			</div>
			<div class="store-info" id="logined-emp-store-name">
				<%=(session.getAttribute("wrp_login_store_id") != null)? session.getAttribute("wrp_login_store_id").toString() : ""%>
			</div>
			<div class="pos-info" >
				REGISTER <span id="logined-emp-pos-name"><%=(session.getAttribute("wrp_login_pos_no") != null)? session.getAttribute("wrp_login_pos_no").toString() : ""%></span>
			</div>
			<div class="status-info">
<%
	if (store_info_obj != null) {
		/* try {
			if (store_info_obj.get("store_open_flag") != null) {
				intTmp = Integer.parseInt(store_info_obj.get("store_open_flag").toString());
			} else {
				intTmp = 0;
			}

			out.println(String.format("<span class=\"%s\" id=\"status-info-is-store-opened\">%s</span>", 
				(intTmp > 0)? "true": "false",
				(intTmp > 0)? "Store : Open": "Store : Close"
			));
		} catch (Exception e) {
			
		}
		try {
			if (store_info_obj.get("eod_flag") != null) {
				intTmp = Integer.parseInt(store_info_obj.get("eod_flag").toString());
			} else {
				intTmp = 0;
			}

			out.println(String.format("<span class=\"%s\" id=\"status-info-is-eod-registered\">%s</span>", 
				(intTmp > 0)? "true": "false",
				(intTmp > 0)? "EOD : Done": "EOD : To do"
			));
		} catch (Exception e) {
			
		} */
		try {
			
			if (store_info_obj.get("external_clockio") != null && store_info_obj.get("external_clockio").toString().equals("1")) {
				store_info_obj.put("clock_io_status",0); // working
			} else {
				if (store_info_obj.get("clock_io_status") != null) {
					intTmp = Integer.parseInt(store_info_obj.get("clock_io_status").toString());
				} else {
					intTmp = 0;
				}
				
				switch (intTmp) {
				case -1:
					out.println(String.format("<span class=\"false\" id=\"status-info-clock-io-status\" style=\"color:red\">CLOCKED OUT</span>"));					
					break;
				case 3:
					out.println(String.format("<span class=\"false\" id=\"status-info-clock-io-status\" style=\"color:red\">CLOCKED OUT</span>"));
					break;
				case 0:
					out.println(String.format("<span class=\"true\" id=\"status-info-clock-io-status\">CLOCKED IN</span>"));
					break;
				case 1:
					out.println(String.format("<span class=\"false\" id=\"status-info-clock-io-status\">You're taking a break</span>"));
					break;
				case 2:
					out.println(String.format("<span class=\"false\" id=\"status-info-clock-io-status\">You're having lunch</span>"));
					break;
				}
			}
		} catch (Exception e) {
			
		}
%>

<%
	} else {
%>
				<!-- <span class="false" id="status-info-is-store-opened"></span>
				<span class="false" id="status-info-is-eod-registered"></span> -->
				<span class="false" id="status-info-clock-io-status"></span>
<%
	}
%>
			</div>
			
			<div class="logout" onclick="WRPApp.logoutSystem();">
				Sign out
			</div >
			<div class="my-page" onclick="WRPApp.EventsModule.onclick(WRPApp.startLoadingPopup,'my-page-container');">
				MY PAGE
			</div>
			<!-- 161226 jh -->
			<div style="display:none;">
				<input id="selected_btn" type="text"  />
			</div>
			<!--  -->
			
			
			
		</div>
		<div id="navigator-container">
			
		</div>
		<div id="gohome-container" style="width: 100%; height:20px;backgrund-size:5%; display:none;    top: 56px; position: absolute;">		
			<div id="gohome" class="gohome" style="background-size: 20%;" onclick="WRPApp.loadPage('wrp');">
					<i></i>Go Home
			</div>
		</div>
		<div id="page-logo-area">
		</div>	
		<div id="page-area">
		</div>
		<div id="favorite-area">
			<div id="favorite-toggle" onclick="WRPApp.toggleFavoriteArea();">
				MENU
			</div>
			<div id="favorite-content-wrapper">
				<div id="favorite-content">
					<!-- 
					<div class="favorite timeclock" id="favorite-timeclock" onclick="WRPApp.loadPopup('clock-io-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Clock In/Out</div>
					</div>
					<div class="favorite storeopen" onclick="WRPApp.loadPopup('store-open-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Store Open</div>
					</div>
					<div class="favorite eod" id="favorite-eod" onclick="WRPApp.startProtection('eod-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">End of Day</div>
					</div>
					<div class="favorite expense" onclick="WRPApp.loadPopup('expenses-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Expense</div>
					</div>
					<div class="favorite inventory" onclick="WRPApp.startProtection('manage-inven-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Inventory</div>
					</div>
					<div class="favorite invoice" onclick="WRPApp.loadPopup('manage-jqx-invoice-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Invoice List</div>
					</div>
					<div class="favorite audit" onclick="WRPApp.loadPopup('stock-count-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Inven. Audit</div>
					</div>
					<div class="favorite purchaseorder" id="favorite-timeclock" onclick="WRPApp.loadPopup('purchase-order-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Purchase Order</div>
					</div>
					 -->

<%
	permission_flag = allow_all_permission_flag || (permission_object != null && permission_object.get("customer") != null && permission_object.get("customer").toString().equals("1") );
	if (permission_flag) {
%>
					<div class="favorite customer" onclick="WRPApp.loadPopup('customer-manage-container');">
<%
	} else {
%>
					<div class="favorite customer" onclick="WRPCommon.MsgBoxModule.alert({ 'message': 'You aren\'t allowed to access.\nPlease, contact store manager' });">
<%
	} 
%>					
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Customer</div>
					</div>
<%
	permission_flag = allow_all_permission_flag || (permission_object != null && permission_object.get("qpay_inventory") != null && permission_object.get("qpay_inventory").toString().equals("1") );
	if (permission_flag) {
%>
					<div class="favorite qpay-inventory" onclick="WRPApp.loadPopup('qpay-inventory-container');">
<%
	} else {
%>
					<div class="favorite qpay-inventory" onclick="WRPCommon.MsgBoxModule.alert({ 'message': 'You aren\'t allowed to access.\nPlease, contact store manager' });">
<%
	} 
%>					
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Inventory</div>
					</div>

					<div class="favorite cashout" onclick="WRPApp.startProtection('cash-out-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Cash Out</div>
					</div>

<%
	permission_flag = allow_all_permission_flag || (permission_object != null && permission_object.get("payment_list_bottom") != null && permission_object.get("payment_list_bottom").toString().equals("1") );
	if (permission_flag) {
%>
					<div class="favorite payment-list" onclick="WRPApp.loadPopup('manage-payment-list-container');">
<%
	} else {
%>
					<div class="favorite payment-list" onclick="WRPCommon.MsgBoxModule.alert({ 'message': 'You aren\'t allowed to access.\nPlease, contact store manager' });">
<%
	} 
%>		
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Payment List</div>
					</div>	
<%
	permission_flag = allow_all_permission_flag || (permission_object != null && permission_object.get("xbm_manager") != null && permission_object.get("xbm_manager").toString().equals("1") );
	if (permission_flag) {
%>
					<div class="favorite xbm-change" onclick="WRPApp.loadPopup('manage-xbm-container');">
<%
	} else {
%>
					<div class="favorite xbm-change" onclick="WRPCommon.MsgBoxModule.alert({ 'message': 'You aren\'t allowed to access.\nPlease, contact store manager' });">
<%
	} 
%>			
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">XBM Manager</div>
					</div>			
					<!-- <div class="favorite rateplan" onclick="WRPApp.loadPopup('manage-rate-plan-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Rate Plan</div>
					</div> -->
<%
	permission_flag = allow_all_permission_flag || (permission_object != null && permission_object.get("expense") != null && permission_object.get("expense").toString().equals("1") );
	if (permission_flag) {
%>
					<div class="favorite expense" onclick="WRPApp.loadPopup('expenses-container');">
<%
	} else {
%>
					<div class="favorite expense" onclick="WRPCommon.MsgBoxModule.alert({ 'message': 'You aren\'t allowed to access.\nPlease, contact store manager' });">
<%
	} 
%>			
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Expense</div>
					</div>
					
<%
	if (store_info_obj != null && store_info_obj.get("credit_device_host") != null && (master_user_flag || subdealer_user_flag)) {
%>					
					
					<div class="favorite creditlog" onclick="WRPApp.loadPopup('manage-credit-log-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Credit/Debit History</div>
					</div>
<%
	}
%>					
					
<%
	permission_flag = allow_all_permission_flag || (permission_object != null && permission_object.get("inventory_transfer") != null && permission_object.get("inventory_transfer").toString().equals("1") );
	if (permission_flag) {
%>
					<div class="favorite transfer" onclick="WRPApp.loadPopup('transfer-request-menu-container');">
<%
	} else {
%>
					<div class="favorite transfer" onclick="WRPCommon.MsgBoxModule.alert({ 'message': 'You aren\'t allowed to access.\nPlease, contact store manager' });">
<%
	} 
%>			
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Inventory Transfer</div>
					</div>

<%
	//if (userSid == 8) {
%>
					<div class="favorite blind-audit" onclick="WRPApp.loadPopup('blind-audit-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Blind Audit</div>
					</div>
<%
	//}
%>
<%
	if (userType < 4) {
%>
	<%
		permission_flag = allow_all_permission_flag || (permission_object != null && permission_object.get("inventory_transfer") != null && permission_object.get("inventory_transfer").toString().equals("1") );
		if (permission_flag) {
	%>
					<div class="favorite configuration" onclick="WRPApp.loadPopup('sys-conf-container');">
	<%
		} else {
	%>
					<div class="favorite configuration" onclick="WRPCommon.MsgBoxModule.alert({ 'message': 'You aren\'t allowed to access.\nPlease, contact store manager' });">
	<%
		} 
	%>								
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Configuration</div>
					</div>
<%
	}
%>
					
					<!-- 161228 jh : favorite audit -->
					<!--  -->
					<div class="favorite issuetracking" style="display: none;" onclick="WRPApp.loadPopup('issue-tracking-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Issue Tracking</div>
					</div>
					<div class="favorite servicemanual" style="display: none;" onclick="WRPApp.loadPopup('service-manual-container');">
						<div class="favorite-icon">
						</div>
						<div class="favorite-text">Service Manual</div>
					</div>
					
				</div>
			</div>
		</div>
		<div id="footer">
			<div style="position: absolute;left:0px;top:0px;color: rgba(100,100,100,1);padding-left: 10px;cursor: pointer;" onclick="window.open('https://manage.posmasterus.com/admin/');">Admin</div>
			&copy; 2016-2017 POSMaster, LLC. All Right Reserved.<input type="checkbox" id="debug" style="display: none;"/>
		</div>
		<div id="logo" onclick="WRPApp.loadPage('wrp');">
		</div>
		<div class="full-sized-alert-container" id="jqx-invoice-alert-credit-container">
			<div class="full-sized-alert-container-content">
				<div class="line" style="height:100%;background-image: url('img/swipe_credit_card.png');background-position:center 65%;background-size:60%;background-repeat:no-repeat;">
				<div class="grid-12" style="background-color:rgba(242,242,242,1);line-height: 40px;text-align:center;height:40px;position:absolute;left:0px;top: 0px;width: 100%;">
						SWIPE CREDIT CARD
					</div>
				</div>
				
			</div>
		</div>
		<div id="popup-area">
		</div>			
		<div id="notice-item-was-added">
			Item was added.
		</div>
		<div id="invoice-btn" onclick="WRPApp.EventsModule.onclick(WRPApp.startLoadingPopup,'invoice-container');">
			<i></i>INVOICE
		</div>
		<div id="menu-btn" onclick="WRPApp.EventsModule.onclick(WRPApp.startLoadingPopup,'main-menu-container');">
			<i></i>QUICK
		</div>
		<div class="loading-container" id="loading-container">
			<div class="close-btn" onclick="try { document.getElementById('loading-container').style.display='none';document.getElementById('waiting-text-container').style.display='none'; } catch (e) {}"></div>
			<div class="loading-animation-component">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<!--  
			<div id="waiting-text-container" onclick="this.style.display='block';" style="display: none;">
				Wait for 00 Seconds
			</div>
			-->
		</div>
		<div class="data-container-for-printing" id="send-data-to-desktop-app">			
			<!-- 
				Format
				<div id="[key]">
					[value]
				</div>
			 -->
		</div>
		<div class="data-container-for-printing" id="print-store-info-dataset">			
			<!-- 
				Format
				<div id="[key]">
					[value]
				</div>
			 -->
			 <div id="print-store-info-emp-id">
<%
				out.println((session.getAttribute("wrp_login_user_id") != null)? session.getAttribute("wrp_login_user_id") : "");
%>
			 </div>
<% 
	if (store_info_obj != null) {
		if (store_info_obj.get("name") != null) {
			out.println(String.format("<div id=\"print-store-info-store-id\">%s</div>", store_info_obj.get("name").toString()));
		} else if (store_info_obj.get("store_id") != null) {
			out.println(String.format("<div id=\"print-store-info-store-id\">%s</div>", store_info_obj.get("store_id").toString()));
		}
		
		if (store_info_obj.get("addr1") != null) {
			out.println(String.format("<div id=\"print-store-info-store-addr1\">%s</div>", store_info_obj.get("addr1").toString()));
		}
		
		if (store_info_obj.get("addr2") != null) {
			out.println(String.format("<div id=\"print-store-info-store-addr2\">%s</div>", store_info_obj.get("addr2").toString()));
		}
		
		if (store_info_obj.get("tel") != null) {
			out.println(String.format("<div id=\"print-store-info-store-tel\">%s</div>", store_info_obj.get("tel").toString()));
		}
		
		if (store_info_obj.get("return_policy") != null) {
			out.println(String.format("<div id=\"print-store-return-policy\">%s</div>", store_info_obj.get("return_policy").toString().replaceAll("\\r\\n","<br/>")));
		}
		
		if (store_info_obj.get("payment_policy") != null) {
			out.println(String.format("<div id=\"print-store-payment-policy\">%s</div>", store_info_obj.get("payment_policy").toString().replaceAll("\\r\\n","<br/>")));
		}
		
		if (store_info_obj.get("xbm_policy") != null) {
			out.println(String.format("<div id=\"print-store-xbm-policy\">%s</div>", store_info_obj.get("xbm_policy").toString().replaceAll("\\r\\n","<br/>")));
		}
		
		

		
		if (store_info_obj.get("external_clockio") != null && store_info_obj.get("external_clockio").toString().equals("1")) {
			out.println(String.format("<div id=\"print-store-info-external-clockio\"></div>"));
		}
		
		if (store_info_obj.get("clock_in_sales_only") != null && store_info_obj.get("clock_in_sales_only").toString().equals("1")) {
			out.println(String.format("<div id=\"print-store-info-clock-in-sales-only\"></div>"));
		}
		
		if (store_info_obj.get("transaction_protection") != null && store_info_obj.get("transaction_protection").toString().equals("1")) {
			out.println(String.format("<div id=\"print-store-info-transaction-protection\"></div>"));
		}
		
		if (store_info_obj.get("all_permissions_allow") != null && store_info_obj.get("all_permissions_allow").toString().equals("1")) {
			out.println(String.format("<div id=\"print-store-info-all-permissions-allow\"></div>"));
		}
		
		if (store_info_obj.get("return_only_store_credit") != null && store_info_obj.get("return_only_store_credit").toString().equals("1")) {
			out.println(String.format("<div id=\"print-store-info-return-only-store-credit\"></div>"));
		}
		
		if (store_info_obj.get("external_clockio_url") != null) {
			out.println(String.format("<div id=\"print-store-info-external-clockio-url\">%s</div>", store_info_obj.get("external_clockio_url").toString()));
		}
		
		if (store_info_obj.get("credit_device_host") != null) {
			out.println(String.format("<div id=\"print-store-info-credit-device-host\">%s</div>", store_info_obj.get("credit_device_host").toString()));
		}
	}
%>			 			 
			 
		</div>
		<div class="data-container-for-printing" id="print-store-policies-dataset">			
			<!-- 
				Format
				<div id="[key]">
					[value]
				</div>
			 -->
		</div>
		<!-- It will be deprecated after May, 2017 -->
		<div class="data-container-for-printing" id="store-info-for-printing">
			<!-- 
				Format
				<div>
					<div>Key</div>
					<div>Value</div>
				</div>
			 -->
		</div>
		<!-- end -->
		<div class="data-container-for-printing" id="invoice-meta-for-printing">
			<!-- 
				Format
				<div>
					<div>Key</div>
					<div>Value</div>
				</div>
			 -->
		</div>
		<div class="data-container-for-printing" id="qpay-receipt-text-for-printing">
		</div>
		<div class="data-container-for-printing" id="print-coupon-code-for-printing">
			
		</div>
		<div id="print-data-container" style="display: none;">
			Customer Name : GUEST<br/>
			Date : 02/03/2017 13:39:52<br/>
			QPay ID : QPAYPC9704509<br/>
			Product : Premium Handset Protection<br/>
			Payment : $109.00<br/><br/>		
			--------------------------------<br/>	<br/>		
		
			Thank you for your time and the<br/>information you have provided.<br/>Please take the receipt for your<br/>records with the following<br/>information on your claim and<br/>shipment.<br/>--------------------------------<br/>Note: If you have provided us<br/>with an email address, you will<br/>receive two emails related to<br/>your claim. You will receive an<br/>email from Asurion confirming<br/>that your claim has been<br/>completed and a separate message<br/>from the Shipping Carrier with<br/>tracking information on your<br/>shipment.<br/>If you have any questions or<br/>issues, you may contact us at<br/>www.phoneclaim.com/metropcs or<br/>1-888-862-3397<br/>--------------------------------<br/>THANK YOU FOR YOUR PAYMENT<br/>CUSTOMER SERVICE *228 OR<br/>1888-863-8768<br/>
			
		</div>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/wrp/wrp.time.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="wrp.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.components.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.ui.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.event.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.sales.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.services.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.workscheduler.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.weeklyworkscheduler.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.invoice.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.metropcs.payment.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.metropcsapi.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.qpay.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.qpayapi.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.qpay.inventory.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="scripts/wrp.print.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.js"></script>
		<script>
		<%
			try {
				intTmp = -1;
				intTmp = Integer.parseInt((store_info_obj != null && store_info_obj.get("clock_io_status") != null)? store_info_obj.get("clock_io_status").toString() : "-1");
			} catch (Exception e) {
				
			}
			if (pageName != null) {
		%>
			WRPApp.init("<%=pageName%>", <%= (intTmp == 0)? "true": "false" %>);
		<%
			} else {
		%>
			WRPApp.init("<%=lastLoadedPage%>", <%= (intTmp == 0)? "true": "false" %>);
		<%
			}
		%>
			WRPApp.SalesModule.init();
			WRP.UI.init();
			WRPApp.InvoiceModule.init();
			WRP.QPayModule.init();
			WRPApp.QPayAPIModule.init();
			//WRPApp.Scheduler.init("emp-timeclock-scheduler");
			/*
			$("input").on("change", function(event) {
				console.log(this);
			});
			*/
		</script>
		<script type="text/javascript" id="page-script"></script>
		<script type="text/javascript" id="popup-script"></script>
	</body>
</html>