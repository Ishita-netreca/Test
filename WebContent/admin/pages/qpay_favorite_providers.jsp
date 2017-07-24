<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    //session.setAttribute("wrp_admin_last_loaded_page", "qpay_favorite_providers");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
    JSONObject permissionData = null;
    

    JSONObject obj = null;
%>
<div pagename="qpay_favorite_providers" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
	<!-- 	
		<div class="submenu" panelname="qpay_favorite_providers"
			onclick="WRP.UI.changePanelBySubmenu('qpay_favorite_providers');">
			Q-Pay Favorite</div> -->
			<!-- <div class="submenu" panelname="item_category" onclick="WRPAdminApp.setPage('item_category');">
            Item Category
        </div>
        <div class="border"></div> -->
        <div class="submenu" panelname="chart_of_account" onclick="WRPAdminApp.setPage('cashRegister');">
            Station
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="dt_setup" onclick="WRPAdminApp.setPage('dt_setup');">
            Date & Time Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="emp_roles" onclick="WRPAdminApp.setPage('emp_roles');">
            Employee Roles
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="permission_group" onclick="WRPAdminApp.setPage('permission_group');">
            Permission Group
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRPAdminApp.setPage('store_location');">
            Region Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRPAdminApp.setPage('qpay_favorite_providers');">
            Qpay Favorite
        </div>
	</div>
	<div class="panels" style="height:100%;">
		<div class="plain-01-panel" panelname="qpay_favorite_providers">
			<div class="title-wrapper">
				<div class="title">QPay Providers</div>
				<div class="sub-title">Favorite Management</div>
				<div class="right-input-area">
					<div class="btn sky"
						onclick="WRPAdminApp.pagescript.saveQPayProviderFavorite();">Save</div>
				</div>
			</div>
			<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
				<div id="jqx-store-favorite-provider-list"></div>
			</div>
		</div>
	</div>
</div>