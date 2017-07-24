<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    //session.setAttribute("wrp_admin_last_loaded_page", "cashRegister");
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
<div pagename="cashRegister" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
		<!-- <div class="submenu" panelname="cashRegister"
			onclick="WRP.UI.changePanelBySubmenu('cashRegister');">Cash &
			Credit</div>
		<div class="border"></div> -->
<!-- 		<div class="submenu" panelname="item_category" onclick="WRPAdminApp.setPage('item_category');">
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
		<div class="jqx-horizontal-split-panel" panelname="cashRegister">
			<div class="plain-01-panel" style="height: 50%">
				<div class="title-wrapper">
					<div class="title">Station & Credit Device</div>
					<div class="sub-title">Station & Credit Device Management</div>
					<div class="left-input-area">
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.addCashRegister();">+ ADD</div>
					</div>
					<div class="right-input-area">
						<div class="btn sky" id="excel-cash-register"
							style="float: right;">Export to Excel</div>
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-cash-register-list"></div>
				</div>
			</div>
			<div class="jqx-tab-panel">
				<ul>
					<li>Profile</li>
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Station & Credit Device Information</div>
						<!-- <div class="right-area">
                                    <div class="btn sky" onclick="WRPAdminApp.pagescript.updateStoreInfo();">Save</div>
                                </div> -->
					</div>
					<div class="content-wrapper" style="margin: 3px 50px 0px 32px;">
						<div class="content" style="padding-top: 10px;">
							<div class="line gray">
								<div class="grid-2">Station & Credit Device No</div>
								<div class="grid-1-5">
									<input type="text" id="cash-register-no" readonly/>
								</div>
							</div>
							<div class="line gray">
								<div class="grid-2">Description</div>
								<div class="grid-4-5">
									<input type="text" id="cash-register-description"
										style="width: 100%;" readonly/>
								</div>
							</div>
							<div class="line gray">
								<div class="grid-2">Credit Device URL</div>
								<div class="grid-3">
									<input type="text" id="cash-register-credit-url"
										style="width: 100%;" readonly/>
								</div>
							</div>
							<div class="line gray">
								<div class="grid-2">Credit Device Port</div>
								<div class="grid-3">
									<input type="text" id="cash-register-credit-port"
										style="width: 100%;" readonly/>
								</div>
							</div>
							<div class="line gray">
								<div class="grid-2">Credit Device Token</div>
								<div class="grid-4-5">
									<textarea id="cash-register-credit-token"
										style="width: 100%; height: 120px; border: rgba(217, 217, 217, 1) 1px solid;" readonly></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="cashregister-edit-window">
		<div role="title">Edit</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line gray">
				<div class="grid-4">Cash Register No</div>
				<div class="grid-7">
					<input type="text" id="cash-register-no-pop" style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4">Description</div>
				<div class="grid-7">
					<input type="text" id="cash-register-description-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4">Credit Device URL</div>
				<div class="grid-7">
					<input type="text" id="cash-register-credit-url-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4">Credit Device Port</div>
				<div class="grid-7">
					<input type="text" id="cash-register-credit-port-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4">Credit Device Token</div>
				<div class="grid-7-5">
					<textarea id="cash-register-credit-token-pop"
						style="width: 100%; height: 130px; border: rgba(217, 217, 217, 1) 1px solid;"></textarea>
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="btn sky"
					onclick="WRPAdminApp.pagescript.setCashRegister();">Save</div>
			</div>
		</div>
	</div>
</div>