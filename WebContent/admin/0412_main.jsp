<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.SimpleDateFormat" %>
<!doctype html>
<%
    String lastLoadedPage = (session.getAttribute("wrp_last_loaded_page") != null)? session.getAttribute("wrp_last_loaded_page").toString() : null;
    String storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    /*
    if (storeId != null) {
        session.setAttribute("wrp_admin_selected_store_id", storeId);
    }
    */
    String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
    String timezone_offset = (session.getAttribute("wrp_admin_selected_store_timezone_offset") != null)? session.getAttribute("wrp_admin_selected_store_timezone_offset").toString() : "0";
%>
<%
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
%>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="cache-control" content="no-cache"/>
        <title>WRP Administrator's Page</title>
        <%
            if (
                    session.getAttribute("posone_admin_login_user_id") == null
                 || session.getAttribute("posone_admin_login_user_sid") == null
               ) {
        %>
        <script>
            alert("You signed out from this system. Move to index page");
            location.href = "index.jsp";
        </script>
        <%
            }
        %>
        <link type="text/css" rel="stylesheet" href="http://myaccount.posmasterus.com:8080/common/jquery/jquery-ui.min.css?timestamp=<%=timestamp%>"/>
    	<link rel="stylesheet" href="http://myaccount.posmasterus.com:8080/common/jqwidgets/styles/jqx.base.css?timestamp=<%=timestamp%>" type="text/css" />
        <link rel="stylesheet" type="text/css" href="http://myaccount.posmasterus.com:8080/common/jqwidgets/styles/jqx.arctic.css?timestamp=<%=timestamp%>"/>
        <link rel="stylesheet" type="text/css" href="main.less.1200.css?timestamp=<%=timestamp%>"/>
        <link rel="stylesheet" type="text/css" href="main.pagethemes.less.1200.css?timestamp=<%=timestamp%>"/>
        <link rel="stylesheet" type="text/css" href="main.pages.less.1200.css?timestamp=<%=timestamp%>"/>
        <link rel="stylesheet" type="text/css" href="wrp.ui.css?timestamp=<%=timestamp%>"/>
        <link rel="stylesheet" type="text/css" href="assets/wrp.components.css?timestamp=<%=timestamp%>"/>
        <link rel="stylesheet" href="http://myaccount.posmasterus.com:8080/common/scrollbar/scrollbar.css?timestamp=<%=timestamp%>" />
        <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jquery/jquery-1.10.2.min.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jquery/jquery-ui.min.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jquery/jquery.form.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/scrollbar/jquery.scrollbar.js?timestamp=<%=timestamp%>"></script>

        <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/d3/d3.v3.min.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/xls/xls.js?timestamp=<%=timestamp%>"></script>        
        
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxcore.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxtabs.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxdata.js?timestamp=<%=timestamp%>"></script> 
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxdatatable.js?timestamp=<%=timestamp%>"></script>
   	 	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxwindow.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxbuttons.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxradiobutton.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxscrollbar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxlistbox.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxdropdownlist.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxmenu.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.edit.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.grouping.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.filter.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.sort.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.selection.js?timestamp=<%=timestamp%>"></script> 
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxinput.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxpanel.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/globalization/globalize.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxcalendar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxdatetimeinput.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxcheckbox.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxdraw.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxtooltip.js?timestamp=<%=timestamp%>"></script>
  		<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxchart.core.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxpanel.js?timestamp=<%=timestamp%>"></script>
   		<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxprogressbar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxtree.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxsplitter.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.pager.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.columnsresize.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxcombobox.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxpasswordinput.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxbargauge.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxcolorpicker.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxslider.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxscrollview.js?timestamp=<%=timestamp%>"></script>
    	<!-- 170120 jh : export.js-->
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxdata.export.js?timestamp=<%=timestamp%>"></script> 
    	<script type="text/javascript" src="http://myaccount.posmasterus.com:8080/common/jqwidgets/jqxgrid.export.js?timestamp=<%=timestamp%>"></script>
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
            <div class="login-user-info">
                <div style="background-image: url('img/icon_store.png');">
                    STORE
                    <select id="select-store" class="select-store" onchange="WRPAdminApp.onStoreChanged(this.value);">

                    </select>
                </div>
                <div id="login-user-name" onclick="WRPAdminApp.setPage('__users');"><%=((session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : "")%></div>
                <div id="logout-system" onclick="WRPAdminApp.logoutSystem();">Sign out</div>
            </div>
        </div>
        <div id="left-aside">
            <div class="menu" pagename="dashboard" style="background-image: url('img/icon/dashboard_02.png');" onclick="setTip('1');WRPAdminApp.allClose();WRPAdminApp.setPage('dashboard');">
                Dashboard<img id="tip1" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"><img id="tip1" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
            </div>
            <div class="menu" pagename="users" style="background-image: url('img/icon/people_01.png');" onclick="WRPAdminApp.submenu('users');">
                Employees<!-- <img id="tip2" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="users-drop"></div>
                <!-- <img id="dropdown" style="float:right;z-index:99999999999;margin-top:8px;" src="img/dropdown.png"> -->
            </div>
            <div class="menu-wrapper" id="users" style="display: none;">
	            <div class="sub-menu" pagename="users" onclick="setTip('2');WRPAdminApp.setPage('users');">
	                Employee List<img id="tip2" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="clock_io" onclick="setTip('3');WRPAdminApp.setPage('clock_io');">
	                Clock in/out<img id="tip3" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
            </div>
            <div class="menu" pagename="store" style="background-image: url('img/icon/building_01.png');" onclick="WRPAdminApp.submenu('store');">
                Stores<!-- <img id="tip5" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="store-drop"></div>
            </div>
            <div class="menu-wrapper" id="store" style="display: none;">
            	<div class="sub-menu" pagename="store" onclick="setTip('19');WRPAdminApp.setPage('store', 'stores');">
	                Stores<img id="tip19" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="expenses" onclick="setTip('4');WRPAdminApp.setPage('expenses');">
	                Expenses<img id="tip4" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" style="display:none" pagename="" onclick="setTip('5');WRPAdminApp.setPage('store', 'notification');">
	                Notification<img id="tip5" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="end-of-day" onclick="setTip('6');WRPAdminApp.setPage('eod');">
	                End of Day<img id="tip6" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="cash_out" onclick="setTip('7');WRPAdminApp.setPage('cash_out');">
	                Cash Out<img id="tip7" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="message" onclick="setTip('20');WRPAdminApp.setPage('message');">
	                Message<img id="tip20" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="policies" onclick="setTip('21');WRPAdminApp.setPage('policies');">
	                Policies<img id="tip21" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
            </div>
            <div class="menu" pagename="po" style="background-image: url('img/icon/casher_01.png');" onclick="WRPAdminApp.submenu('po');">
                Purchase<!-- <img id="tip10" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="po-drop"></div>
            </div>
            <div class="menu-wrapper" id="po" style="display: none;">
	            <div class="sub-menu" pagename="vendor" onclick="setTip('8');WRPAdminApp.setPage('vendor');">
	                Vendors<img id="tip8" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="po" onclick="setTip('9');WRPAdminApp.setPage('po');">
	                Purchase Order<img id="tip9" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
            </div>
            <div class="menu" pagename="inventory" style="background-image: url('img/icon/warehouse_01.png');" onclick="WRPAdminApp.submenu('inventory');">
                Inventory<!-- <img id="tip13" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="inventory-drop"></div>
            </div>
            <div class="menu-wrapper" id="inventory" style="display: none;">
	            <div class="sub-menu" pagename="inventory" onclick="setTip('10');WRPAdminApp.setPage('inventory', 'items');">
	                Items<img id="tip10" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="inventory_transfer" onclick="setTip('11');WRPAdminApp.setPage('inventory_transfer');">
	                Inventory Transfer<img id="tip11" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="inventory_audit" onclick="setTip('12');WRPAdminApp.setPage('inventory_audit');">
	                Inventory Audit<img id="tip12" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="bin_management" onclick="setTip('13');WRPAdminApp.setPage('bin_management');">
	                Bin management<img id="tip13" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
            </div>
            <div class="menu" pagename="sales_conf" style="background-image: url('img/icon/sales_02.png');" onclick="WRPAdminApp.submenu('sales');">
                Sales<!-- <img id="tip18" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="sales-drop"></div>
            </div>
            <div class="menu-wrapper" id="sales" style="display: none;">
	            <div class="sub-menu" pagename="customer" onclick="setTip('14');WRPAdminApp.setPage('customer');">
	                Customers<img id="tip14" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="store_credit" onclick="setTip('30');WRPAdminApp.setPage('store_credit');">
	                Store Credit<img id="tip30" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="jqx_invoice" onclick="setTip('15');WRPAdminApp.setPage('jqx_invoice');">
	                Sales Invoice<img id="tip15" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="users-2" onclick="setTip('16');" style="display:none;">
	                Return invoice<img id="tip16" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="commission" onclick="setTip('17');WRPAdminApp.setPage('commission');">
	                Commission<img id="tip17" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
	            <div class="sub-menu" pagename="consolidation" onclick="setTip('18');WRPAdminApp.setPage('consolidation');">
	                <!-- 0220 jh : Recon -->
	                Reconciliation<img id="tip18" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	            </div>
            </div>
            <div class="menu" pagename="report" style="background-image: url('img/icon/graph_01.png');" onclick="setTip('19');WRPAdminApp.allClose();WRPAdminApp.setPage('report');">
                Report<img id="tip19" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
            </div>
            <div class="menu" pagename="sys_conf" style="background-image: url('img/icon/setting_02.png');" onclick="WRPAdminApp.submenu('sys_conf');">
                Configuration<!-- <img id="tip25" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png"> -->
                <div class="dropdown" id="sys_conf-drop"></div>
            </div>
            <div class="menu-wrapper" id="sys_conf" style="display: none;">
	            <div class="sub-menu" pagename="" onclick="setTip('38');WRPAdminApp.setPage('promotion');"> <!-- onclick="WRPAdminApp.subsubmenu('sales_sub');" -->
	                Sales<img id="tip38" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <!-- <div class="dropdown" id="sales_sub-drop"></div> -->
	            </div>
	            <div class="sub-menu-container" id="sales_sub" style="display:none">
		            <div class="sub-sub-menu" pagename="" onclick="setTip('111');WRPAdminApp.setPage('sales_conf');">
		                Rate Plan<img id="tip111" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="promotion" onclick="setTip('200');WRPAdminApp.setPage('promotion');">
		                Promotion<img id="tip200" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
		            <div class="sub-sub-menu" pagename="coupon" onclick="setTip('210');WRPAdminApp.setPage('coupon');">
		                Coupon<img id="tip210" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
		            </div>
	            </div>
	            <div class="sub-menu" pagename="sys_conf" onclick="WRPAdminApp.subsubmenu('system_sub');">
	                System<img id="tip22" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
	                <div class="dropdown" id="system_sub-drop"></div>
	            </div>
	            <div class="sub-menu-container" id="system_sub" style="display:none">
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
	            </div>
            </div>
            <!--
            <div class="menu" pagename="subdealer" style="background-image: url('img/icon/sub_dealer.png');" onclick="setTip('20');WRPAdminApp.allClose();WRPAdminApp.setPage('subdealer');">
                Sub Dealer<img id="tip20" style="float:right;z-index:99999999999;margin-top:8px;display:none;" src="img/tip.png">
            </div>
              -->
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
        <script type="text/javascript" src="wrp.admin.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="scripts/wrp.ui.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="scripts/wrp.event.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="scripts/wrp.components.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="scripts/wrp.weeklyworkscheduler.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="scripts/wrp.audit.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="scripts/wrp.po.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="scripts/wrp.time.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript">
            <%
                if (storeId != null && storeId.length() > 0) {
            %>
                WRPAdminApp.init('<%=storeId%>');
            <%
                } else {
            %>
                WRPAdminApp.init();
            <%
                }
            %>
            WRPAdminApp.setPage('<%=(lastLoadedPage != null && lastLoadedPage.length() > 0)? lastLoadedPage : "dashboard" %>');
			//alert();
			function setTip(pagePos) {
				//alert(pagePos)	
				for(i=1; i<40; i++) {
					if (pagePos == i) {
						$('#tip'+i).css('display','block');
					} else {
						$('#tip'+i).css('display','none');
					}
				}
			}

			WRPAdminApp.TimeModule.setTimezoneOffset(<%=timezone_offset%>);
        </script>
    </body>
</html>