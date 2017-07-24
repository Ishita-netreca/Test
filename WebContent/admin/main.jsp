<%-- <%@ page import="com.boas.posone.util.MyRequestUtil" %>
 --%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.SimpleDateFormat" %>
 <%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
	String user_sid = (session.getAttribute("wrp_admin_login_user_sid") != null)? session.getAttribute("wrp_admin_login_user_sid").toString() : null;
	String master_sid = (session.getAttribute("wrp_admin_login_master_sid") != null)? session.getAttribute("wrp_admin_login_master_sid").toString() : null;
	JSONObject permission_object = (session.getAttribute("wrp_admin_login_user_permission_obj") != null)? (JSONObject)session.getAttribute("wrp_admin_login_user_permission_obj"): null;
	boolean master_user_flag = (session.getAttribute("wrp_admin_login_user_master_flag") != null && session.getAttribute("wrp_admin_login_user_master_flag").toString().equals("0"))? false: true;
	boolean subdealer_user_flag = (session.getAttribute("wrp_admin_login_user_subdealer_flag") != null && session.getAttribute("wrp_admin_login_user_subdealer_flag").toString().equals("0"))? false: true;
	
%>
<!doctype html>
<%
    String lastLoadedPage = (session.getAttribute("wrp_admin_last_loaded_page") != null)? session.getAttribute("wrp_admin_last_loaded_page").toString() : null;
    String storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    /*
    if (storeId != null) {
        session.setAttribute("wrp_admin_selected_store_id", storeId);
    }
    */
    boolean permission_flag = false;
    String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
    String timezone_offset = (session.getAttribute("wrp_admin_selected_store_timezone_offset") != null)? session.getAttribute("wrp_admin_selected_store_timezone_offset").toString() : "0";
%>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="cache-control" content="no-cache"/>
        <title>WRP Administrator's Page</title>
        
        <link type="text/css" rel="stylesheet" href="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.css"/>
    	<link rel="stylesheet" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.base.css" type="text/css" />
        <link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.arctic.css"/>
        <link rel="stylesheet" type="text/css" href="main.less.1200.css"/>
        <link rel="stylesheet" type="text/css" href="main.pagethemes.less.1200.css"/>
        <link rel="stylesheet" type="text/css" href="main.pages.less.1200.css"/>
        <link rel="stylesheet" type="text/css" href="wrp.ui.css"/>
        <link rel="stylesheet" type="text/css" href="assets/wrp.components.css"/>
		<link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.css"/>
        <link rel="stylesheet" href="https://myaccount.posmasterus.com/common/scrollbar/scrollbar.css" />
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery.form.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/scrollbar/jquery.scrollbar.js"></script>

        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/d3/d3.v3.min.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/xls/xls.js"></script>        
        
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcore.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtabs.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.js"></script> 
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatatable.js"></script>
   	 	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxwindow.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbuttons.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxradiobutton.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollbar.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxlistbox.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdropdownlist.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxmenu.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.edit.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.grouping.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.filter.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.sort.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.selection.js"></script> 
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxinput.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/globalization/globalize.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcalendar.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatetimeinput.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcheckbox.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdraw.js"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtooltip.js"></script>
  		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxchart.core.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js"></script>
   		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxprogressbar.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtree.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxsplitter.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.pager.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.columnsresize.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcombobox.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpasswordinput.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbargauge.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcolorpicker.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxslider.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollview.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtreegrid.js"></script>
    	<!-- 170120 jh : export.js-->
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.export.js"></script> 
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.export.js"></script>
		<!-- 
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/highcharts-3d.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
		-->
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    </head>
    <body>
        <div id="header">
                  </div>
        <div id="left-aside">
            <div class="menu" pagename="dashboard" style="background-image: url('img/icon/dashboard_02.png');" onclick="setTip('1');WRPAdminApp.allClose();WRPAdminApp.setPage('dashboard');">
                Dashboard<img id="tip1" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"><img id="tip1" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
            </div>

<div class="menu" pagename="promotion" style="background-image: url('img/icon/dashboard_02.png');" onclick="WRPAdminApp.setPage('promotion');">
                Promotion<img id="tip1" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"><img id="tip1" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
            </div>

            <div class="menu" pagename="users" style="background-image: url('img/icon/people_01.png');" onclick="WRPAdminApp.submenu('users');">
                Employees<!-- <img id="tip2" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="users-drop"></div>
                <!-- <img id="dropdown" style="float:right;z-index:99999999999;margin-top:8px;" src="img/dropdown.png"> -->
            </div>
            <div class="menu-wrapper" id="users" style="display: none;">   
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("employees") != null && permission_object.get("employees").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="users" onclick="setTip('2');WRPAdminApp.setPage('users');">
	                Employee List<img id="tip2" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("clock_io") != null && permission_object.get("clock_io").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="clock_io" onclick="setTip('3');WRPAdminApp.setPage('clock_io');">
	                Clock in/out<img id="tip3" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
            </div>
            <div class="menu" pagename="store" style="background-image: url('img/icon/building_01.png');" onclick="WRPAdminApp.submenu('store');">
                Stores<!-- <img id="tip5" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="store-drop"></div>
            </div>
            <div class="menu-wrapper" id="store" style="display: none;">  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("stores") != null && permission_object.get("stores").toString().equals("1"))) {
%>
            	<div class="sub-menu" pagename="store" onclick="setTip('19');WRPAdminApp.setPage('store', 'stores');">
	                Stores<img id="tip19" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("expenses") != null && permission_object.get("expenses").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="expenses" onclick="setTip('4');WRPAdminApp.setPage('expenses');">
	                Expenses<img id="tip4" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
	            <div class="sub-menu" style="display:none" pagename="" onclick="setTip('5');WRPAdminApp.setPage('store', 'notification');">
	                Notification<img id="tip5" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div> 
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("eod") != null && permission_object.get("eod").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="end-of-day" onclick="setTip('6');WRPAdminApp.setPage('eod');">
	                End of Day<img id="tip6" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("cashout") != null && permission_object.get("cashout").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="cash_out" onclick="setTip('7');WRPAdminApp.setPage('cash_out');">
	                Cash Out<img id="tip7" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("message") != null && permission_object.get("message").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="message" onclick="setTip('20');WRPAdminApp.setPage('message');">
	                Message<img id="tip20" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("policies") != null && permission_object.get("policies").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="policies" onclick="setTip('21');WRPAdminApp.setPage('policies');">
	                Policies<img id="tip21" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
            </div>
            <div class="menu" pagename="po" style="background-image: url('img/icon/casher_01.png');" onclick="WRPAdminApp.submenu('po');">
                Purchase<!-- <img id="tip10" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="po-drop"></div>
            </div>
            <div class="menu-wrapper" id="po" style="display: none;">
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("vendors") != null && permission_object.get("vendors").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="vendor" onclick="setTip('8');WRPAdminApp.setPage('vendor');">
	                Vendors<img id="tip8" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("purchase_order") != null && permission_object.get("purchase_order").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="po" onclick="setTip('9');WRPAdminApp.setPage('po');">
	                Purchase Order<img id="tip9" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
            </div>
            <div class="menu" pagename="inventory" style="background-image: url('img/icon/warehouse_01.png');" onclick="WRPAdminApp.submenu('inventory');">
                Inventory<!-- <img id="tip13" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="inventory-drop"></div>
            </div>
            <div class="menu-wrapper" id="inventory" style="display: none;">
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("items") != null && permission_object.get("items").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="inventory" onclick="setTip('10');WRPAdminApp.setPage('inventory', 'items');">
	                Items<img id="tip10" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("inventory_transfer") != null && permission_object.get("inventory_transfer").toString().equals("1"))) {
%>
	            <!-- <div class="sub-menu" pagename="inventory_transfer" onclick="setTip('11');WRPAdminApp.setPage('inventory_transfer');">
	                Inventory Transfer<img id="tip11" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div> -->
	            <div class="sub-menu" pagename="inven_transfer" onclick="setTip('28');WRPAdminApp.setPage('inven_transfer');">
	                Inventory Transfer<img id="tip28" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div> 	            
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("express_transfer") != null && permission_object.get("express_transfer").toString().equals("1"))) {
%>
	             <div class="sub-menu" pagename="express_transfer" onclick="setTip('29');WRPAdminApp.setPage('express_transfer');">
	                Express Transfer<img id="tip29" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div> 
<%
	}
%>  
<%
	//if (user_sid.equals("8")) {
%>
	            <div class="sub-menu" pagename="inventory_audit" onclick="setTip('12');WRPAdminApp.setPage('inventory_audit');">
	                Inventory Audit<img id="tip12" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	//}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("bin_management") != null && permission_object.get("bin_management").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="bin_management" onclick="setTip('13');WRPAdminApp.setPage('bin_management');">
	                Bin management<img id="tip13" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("item_management") != null && permission_object.get("item_management").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="item_management" onclick="setTip('14');WRPAdminApp.setPage('item_management');">
	                Item Management<img id="tip14" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
            </div>
            <div class="menu" pagename="sales_conf" style="background-image: url('img/icon/sales_02.png');" onclick="WRPAdminApp.submenu('sales');">
                Sales<!-- <img id="tip18" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="sales-drop"></div>
            </div>
            <div class="menu-wrapper" id="sales" style="display: none;"> 
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("customers") != null && permission_object.get("customers").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="customer" onclick="setTip('14');WRPAdminApp.setPage('customer');">
	                Customers<img id="tip14" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("store_credit") != null && permission_object.get("store_credit").toString().equals("1"))) {
%>

	            <div class="sub-menu" pagename="store_credit" onclick="setTip('30');WRPAdminApp.setPage('store_credit');">
	                Store Credit<img id="tip30" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>

<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("sales_invoice") != null && permission_object.get("sales_invoice").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="jqx_invoice" onclick="setTip('15');WRPAdminApp.setPage('jqx_invoice');">
	                Sales Invoice<img id="tip15" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="users-2" onclick="setTip('16');" style="display:none;">
	                Return invoice<img id="tip16" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("commission") != null && permission_object.get("commission").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="commission" onclick="setTip('17');WRPAdminApp.setPage('commission');">
	                Commission<img id="tip17" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("reconsolidation") != null && permission_object.get("reconsolidation").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="reconciliation" onclick="setTip('18');WRPAdminApp.setPage('reconciliation');">
	                <!-- 0220 jh : Recon -->
	                Reconciliation<img id="tip18" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
<%
	}
%>  
            </div>   
            
<%-- <%
	if (master_sid.equals("72")) {
%>    --%>         
            <div class="menu" pagename="report" style="background-image: url('img/icon/graph_01.png');" onclick="setTip('19');WRPAdminApp.allClose();WRPAdminApp.setPage('report');">
                Snapshot Report<img id="tip19" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
            </div>
            
<%-- <%
	}
%>            
 --%>
            <div class="menu" pagename="company_report" style="background-image: url('img/icon/graph_01.png');" onclick="WRPAdminApp.submenu('company_report');">
                Management Report<!-- <img id="tip25" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="company_report-drop"></div>
            </div>
            <div class="menu-wrapper" id="company_report" style="display: none;">
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("management_report_sales") != null && permission_object.get("management_report_sales").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="" onclick="setTip('31');WRPAdminApp.setPage('manage_report_sales');"> <!-- onclick="WRPAdminApp.subsubmenu('sales_sub');" -->
	                Sales<img id="tip31" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <!-- <div class="dropdown" id="sales_sub-drop"></div> -->
	            </div>            
<%
	}
%>          
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("management_report_inventory") != null && permission_object.get("management_report_inventory").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="" onclick="setTip('32');WRPAdminApp.setPage('manage_report_inventory');"> <!-- onclick="WRPAdminApp.subsubmenu('sales_sub');" -->
	                Inventory<img id="tip32" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <!-- <div class="dropdown" id="sales_sub-drop"></div> -->
	            </div>            
<%
	}
%>          
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("management_report_hr") != null && permission_object.get("management_report_hr").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="" onclick="setTip('33');WRPAdminApp.setPage('manage_report_hr');"> <!-- onclick="WRPAdminApp.subsubmenu('sales_sub');" -->
	                HR<img id="tip33" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <!-- <div class="dropdown" id="sales_sub-drop"></div> -->
	            </div>            
<%
	}
%>          
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("management_report_operation") != null && permission_object.get("management_report_operation").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="" onclick="setTip('34');WRPAdminApp.setPage('manage_report_operation');"> <!-- onclick="WRPAdminApp.subsubmenu('sales_sub');" -->
	                Operation<img id="tip34" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <!-- <div class="dropdown" id="sales_sub-drop"></div> -->
	            </div>            
<%
	}
%>          
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("management_report_accounting") != null && permission_object.get("management_report_accounting").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="" onclick="setTip('35');WRPAdminApp.setPage('manage_report_accounting');"> <!-- onclick="WRPAdminApp.subsubmenu('sales_sub');" -->
	                Accounting<img id="tip35" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <!-- <div class="dropdown" id="sales_sub-drop"></div> -->
	            </div>            
<%
	}
%>      
            </div>

            <div class="menu" pagename="sys_conf" style="background-image: url('img/icon/setting_02.png');" onclick="WRPAdminApp.submenu('sys_conf');">
                Configuration<!-- <img id="tip25" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="sys_conf-drop"></div>
            </div>
            <div class="menu-wrapper" id="sys_conf" style="display: none;">   
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("configuration_sales") != null && permission_object.get("configuration_sales").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="" onclick="setTip('38');WRPAdminApp.setPage('promotion');"> <!-- onclick="WRPAdminApp.subsubmenu('sales_sub');" -->
	                Sales<img id="tip38" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <!-- <div class="dropdown" id="sales_sub-drop"></div> -->
	            </div>            
<%
	}
%>          
	            <!-- <div class="sub-menu-container" id="sales_sub" style="display:none">
		            <div class="sub-sub-menu" pagename="" onclick="setTip('111');WRPAdminApp.setPage('sales_conf');">
		                Rate Plan<img id="tip111" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="promotion" onclick="setTip('200');WRPAdminApp.setPage('promotion');">
		                Promotion<img id="tip200" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="coupon" onclick="setTip('210');WRPAdminApp.setPage('coupon');">
		                Coupon<img id="tip210" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
	            </div> -->    
<%
	if (master_user_flag || subdealer_user_flag || (permission_object.get("configuration_system") != null && permission_object.get("configuration_system").toString().equals("1"))) {
%>
	            <div class="sub-menu" pagename="sys_conf" onclick="setTip('22');WRPAdminApp.setPage('conf_sys', undefined, 'cashRegister');">
	                System<img id="tip22" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>            
<%
	}
%>   

<div class="menu" pagename="promotion" style="background-image: url('img/icon/setting_02.png');" onclick="WRPAdminApp.submenu('promotion');">
                Promotion
               
            </div>       
	            <!-- <div class="sub-menu-container" id="system_sub" style="display:none">
		            <div class="sub-sub-menu" pagename="item_category" onclick="setTip('23');WRPAdminApp.setPage('item_category');">
		                Item Category<img id="tip23" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="cashRegister" onclick="setTip('24');WRPAdminApp.setPage('cashRegister');">
		                Station<img id="tip24" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="dt_setup" onclick="setTip('25');WRPAdminApp.setPage('dt_setup');">
		                Date & Time<img id="tip25" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="emp_roles" onclick="setTip('26');WRPAdminApp.setPage('emp_roles');">
		                Employee Roles<img id="tip26" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="permission_group" onclick="setTip('27');WRPAdminApp.setPage('permission_group');">
		                Permission Group<img id="tip27" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="store_location" onclick="setTip('28');WRPAdminApp.setPage('store_location');">
		                Region Setup<img id="tip28" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="qpay_favorite_providers" onclick="setTip('29');WRPAdminApp.setPage('qpay_favorite_providers');">
		                Qpay Favorite<img id="tip37" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
	            </div> -->
            </div>
<%
	if (master_user_flag) {
%>
			<!-- 
            <div class="menu" pagename="subdealer" style="background-image: url('img/icon/sub_dealer.png');" onclick="setTip('20');WRPAdminApp.allClose();WRPAdminApp.setPage('subdealer');">
                Sub Dealer<img id="tip20" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
            </div>-->
<%
	}        
%>     
        </div>
        
        <div id="article">
        </div>
        <div id="footer">
               &copy; 2016-2017 POSMaster, Ilc. All rights reserved.
        </div>
        <div id="popup-area" class="theme-01">

        </div>
		<div class="loading-container" id="loading-container">
			<div class="close-btn" onclick="document.getElementById('loading-container').style.display='none';"></div>
			<div class="loading-animation-component">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
		<script type="text/javascript" src="https://beta.posmasterus.com/common/wrp/wrp.time.js"></script>
        <script type="text/javascript" src="wrp.admin.js"></script>
        <script type="text/javascript" src="scripts/wrp.ui.js"></script>
        <script type="text/javascript" src="scripts/wrp.inventory.audit.js"></script>
        <script type="text/javascript" src="scripts/wrp.inventory.transfer.js"></script>
        <script type="text/javascript" src="scripts/wrp.itemmanager.js"></script> 
        <script type="text/javascript" src="scripts/wrp.permission.js"></script> 
        <script type="text/javascript" src="scripts/wrp.event.js"></script>
        <script type="text/javascript" src="scripts/wrp.components.js"></script>
        <script type="text/javascript" src="scripts/wrp.weeklyworkscheduler.js"></script>
        <script type="text/javascript" src="scripts/wrp.audit.js"></script>
        <script type="text/javascript" src="scripts/wrp.po.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.js"></script>
        
    </body>
</html>