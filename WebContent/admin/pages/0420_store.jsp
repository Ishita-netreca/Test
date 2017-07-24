<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "store");
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
<div pagename="store" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
		<div class="submenu" panelname="stores"
			onclick="WRP.UI.changePanelBySubmenu('stores');">Store</div>
		<div class="border" style="display: none"></div>
		<div class="submenu" style="display: none" panelname="notification"
			onclick="WRP.UI.changePanelBySubmenu('notification');">
			Notification</div>
		<div class="border"></div>
		<div class="submenu" panelname="expenses"
			onclick="WRP.UI.changePanelBySubmenu('expenses');">Expenses</div>
		<div class="border"></div>
		<div class="submenu" panelname="cashRegister"
			onclick="WRP.UI.changePanelBySubmenu('cashRegister');">Cash &
			Credit</div>
		<div class="border"></div>
		<div class="submenu" panelname="qpay_favorite_providers"
			onclick="WRP.UI.changePanelBySubmenu('qpay_favorite_providers');">
			Q-Pay Favorite</div>
	</div>
	<div class="panels" style="height:100%;">
		<div class="jqx-horizontal-split-panel" panelname="stores"
			style="height: 100%;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Stores</div>
					<div class="sub-title">Store Configuration</div>
					<div class="left-input-area">
						<div class="jqx-plain-button" style="width:100px;"
							onclick=" WRPAdminApp.pagescript.initStoreInfo();$('#store-add-window').jqxWindow('open');">
							+ ADD Store</div>
					</div>
					<div class="right-input-area">
						<div class="jqx-plain-button" id="excel_store_list" style="float: right;">
							Export to Excel</div>
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-stores-list"></div>
				</div>
			</div>
			<div>
				<div class="jqx-tab-panel">
					<ul>
						<li>Profile</li>
						<li>Invoices</li>
						<li>Purchase Order</li>
						<li>ASAP & Qpay</li>
						<li>Monthly Goal</li>
					</ul>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Store Information</div>
						</div>
						<div class="content-wrapper" style="margin: 7px 50px 0px 32px;">
							<div class="line">
								<div class="line gray">
									<div class="grid-1-5">Store ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-id"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Open Date</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-open-date"
											class="jquery-datepicker" style="width: 100%;" readonly />
									</div>
									<div class="grid-1-5">Owner</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-owner"
											style="width: 100%;" readonly />
									</div>
									<div class="grid-1-5">Manager</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-manager"
											style="width: 100%;" readonly />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">Address 1</div>
									<div class="grid-4-5">
										<input type="text" id="store-info-store-addr1"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">City</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-city"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">State</div>
									<div class="grid-1-5">
										<!-- <select id="store-info-store-state" style="width: 100%;"></select> -->
										<input type="text" id="store-info-store-state"
											style="width: 100%;" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">Address 2</div>
									<div class="grid-4-5">
										<input type="text" id="store-info-store-addr2"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Zip Code</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-zipcode"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Vendor</div>
									<div class="grid-1-5">
										<!-- <select id="store-info-store-vendor" style="width: 100%;"></select> -->
										<input type="text" id="store-info-store-vendor"
										style="width: 100%;" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">Market</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-market-code"
											style="width: 100%;" readonly/>
											<!-- 
										<select id="store-info-store-market-code"
											onchange="WRPAdminApp.pagescript.getDistrictList(this.value);"
											style="width: 100%;"></select> -->
									</div>
									<div class="grid-1-5">District</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-district-code"
											style="width: 100%;" readonly/>
											<!-- 
										<select id="store-info-store-district-code"
											style="width: 100%;"></select> -->
									</div>
									<div class="grid-1-5">Contact NO.</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-tel"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Fax</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-fax"
											style="width: 100%;" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5 title">Tax Rate</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-tax-rate"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5 title">Store Name</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-name"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5 title">Carrier Market</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-carrier-market"
											style="width: 100%;" readonly />
									</div>
									<div class="grid-1-5 title">Door Code</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-door-code"
											style="width: 100%;" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5 title">Status</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-status"
											style="width: 100%;" readonly/>
											<!-- 
										<label for="store-info-status-open"> <input
											type="radio" id="store-info-status-open"
											name="storeInfoStatus" /> Open
										</label> <label for="store-info-status-close"> <input
											type="radio" id="store-info-status-close"
											name="storeInfoStatus" /> Close
										</label> -->
									</div>
									<div class="grid-1-5">Cash Register</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-poscnt"
											style="width: 100%;" readonly/>
									</div>
									<!-- 170220 jh : active -->
									<div class="grid-1-5 title">Active</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-active"
											style="width: 100%;" readonly/>
									<!-- 
										<label for="store-info-status-open"> <input
											type="radio" id="store-info-active" name="storeActive" />
											Active
										</label> <label for="store-info-status-close"> <input
											type="radio" id="store-info-inactive" name="storeActive" />
											Inactive
										</label>
										 -->
									</div>
									<!-- active end -->
									<div class="grid-1-5 title">Protection</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-onprotection"
											style="width: 100%;" readonly/>
									<!--
										<label for="store-info-protection"> <input
											type="radio" id="store-info-onprotection"
											name="protection" /> On
										</label> <label for="store-info-status-close"> <input
											type="radio" id="store-info-offprotection"
											name="protection" /> Off
										</label>
										-->
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Invoice</div>
							<div class="right-input-area" style="width: 720px; margin-right: -30px;">
								<div class="line" style="overflow: hidden;">
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-invoice-radio-1" groupName="store-invoice-group">1 Week</div>
									</div>
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-invoice-radio-2" groupName="store-invoice-group">1 Month</div>
									</div>
									<div class="grid-2" style="width: 90px;">
										<div class="jqx-radio-button" id="store-invoice-radio-3" groupName="store-invoice-group">3 Months</div>
									</div>
									<div class="grid-2-5" style="margin-left: 0px;width: 110px;">
										<div class="jqx-datetime-input" id="store-invoice-search-start-date"></div>
									</div>
									<div class="grid-2-5" style="margin-left: 7px;width: 110px;">
										<div class="jqx-datetime-input" id="store-invoice-search-end-date"></div>
									</div>
									<div class="grid-2" style="margin-left: 5px;width:100px;">
										<div class="jqx-plain-button" style="width:70px" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getStoreInvoiceList,WRPAdminApp.pagescript._selectedStoreId);">Apply</div>
									</div>
									<div class="grid-2" style="margin-left: 0px;">
										<div class="jqx-plain-button" id="excel_store_invoice" style="float: right;">Export to Excel</div>
									</div>
								</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-store-invoice-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Purchase Order</div>
							<div class="right-input-area" style="width: 720px; margin-right: -30px;">
								<div class="line" style="overflow: hidden;">
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-porder-radio-1" groupName="store-po-group">1 Week</div>
									</div>
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-porder-radio-2" groupName="store-po-group">1 Month</div>
									</div>
									<div class="grid-2" style="width: 90px;">
										<div class="jqx-radio-button" id="store-porder-radio-3" groupName="store-po-group">3 Months</div>
									</div>
									<div class="grid-2-5" style="margin-left: 0px;width: 110px;">
										<div class="jqx-datetime-input" id="stores-po-search-start-date"></div>
									</div>
									<div class="grid-2-5" style="margin-left: 7px;width: 110px;">
										<div class="jqx-datetime-input" id="stores-po-search-end-date"></div>
									</div>
									<div class="grid-2" style="margin-left: 5px;width:100px;">
										<div class="jqx-plain-button" style="width:70px" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getStorePOList,WRPAdminApp.pagescript._selectedStoreId);">Apply</div>
									</div>
									<div class="grid-2" style="margin-left: 0px;">
										<div class="jqx-plain-button" id="excel_store_po" style="float: right;">Export to Excel</div>
									</div>
								</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-store-po-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">ASAP & Qpay</div>
						</div>
						<div class="content-wrapper" style="margin: 3px 50px 0px 32px;">
							<div class="line">
								<div class="line gray">
									<div class="grid-2 title">ASAP Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-asap-id"
											style="width: 100%" />
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-asap-password"
											style="width: 100%" />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2 title">QPay Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-id"
											style="width: 100%" />
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-password"
											style="width: 100%" />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2 title">QPay Inventory Information</div>
									<div class="grid-1 title" style="display:none;">ID</div>
									<div class="grid-1-5" style="display:none;">
										<input type="text" id="store-info-store-qpay-inven-id"
											style="width: 100%" />
									</div>
									<div class="grid-1 title" style="display:none;">Password</div>
									<div class="grid-1-5" style="display:none;">
										<input type="text" id="store-info-store-qpay-inven-password"
											style="width: 100%" />
									</div>
									<div class="grid-1 title">Branch ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-inven-branch-id"
											style="width: 100%" />
									</div>
								</div>
								<div class="line gray" style="display:none;">
									<div class="grid-2 title">QPay API Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-api-id"
											style="width: 100%" />
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-api-password"
											style="width: 100%" />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2 title">BroadTech Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-xbm-id"
											style="width: 100%" />
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-xbm-password"
											style="width: 100%" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 170208 jh -->
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Monthly Goal</div>
							<div class="left-input-area">
								<div class="jqx-plain-button" id="excel_store_invoice" style="width:90px" onclick="$('#mothly-add-window').jqxWindow('open');">+ Add Goal</div>
							</div>
							<div class="right-input-area">
								<div class="line" style="overflow: hidden;">
										<div class="jqx-plain-button" id="excel_store_monthly-goal" style="float: right;">Export to Excel</div>
								</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-monthly-goal-list"></div>
						</div>
					</div>
					<!--  -->
				</div>
			</div>
		</div>
		<div class="plain-01-panel" panelname="notification"
			style="display: none">
			<div class="jqx-tab-panel">
				<ul>
					<li>History</li>
					<li style="margin-bottom: -6px;">Configuration</li>
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Notification</div>
						<div class="sub-title">History Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area"
							style="width: 700px; margin-right: -30px;">
							<div class="line" style="overflow: hidden;">
								<div class="grid-1-5">
									<div class="jqx-radio-button" id="history-radio-1">1 Week</div>
								</div>
								<div class="grid-1-5">
									<div class="jqx-radio-button" id="history-radio-2">2 Week</div>
								</div>
								<div class="grid-2">
									<div class="jqx-radio-button" id="history-radio-3">1
										Month</div>
								</div>
								<div class="grid-2-5" style="margin-left: 0px;">
									<div class="jqx-datetime-input"
										id="notification-history-search-start-date"></div>
								</div>
								<div class="grid-2-5" style="margin-left: 7px;">
									<div class="jqx-datetime-input"
										id="notification-history-search-end-date"></div>
								</div>
								<div class="grid-2" style="margin-left: 0px;">
									<div class="btn sky" id="excel-notification-history"
										style="float: right;">Export to Excel</div>
								</div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 58px);">
						<div id="jqx-notification-list"></div>
					</div>
				</div>
				<div class="jqx-horizontal-split-panel"
					style="width: 100%; height: 100%;">
					<div class="plain-01-panel">
						<div class="title-wrapper">
							<div class="title">Notification</div>
							<div class="sub-title">Configuration</div>
							<div class="right-input-area">
								<div class="btn sky" id="excel-notification-configuration"
									style="float: right;">Export to Excel</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-notification-rule-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Notification Information</div>
							<div class="right-area"></div>
						</div>
						<div class="content-wrapper">
							<div class="content" id="store-notice-rule-profile">
								<div class="line">
									<div class="grid-2">Condition</div>
									<div class="grid-3">
										<select id="store-notification-rule-condition">
											<option value="1">Activation</option>
											<option value="2">EOD</option>
											<option value="3">Return</option>
											<option value="4">PO Receive</option>
										</select>
									</div>
									<div class="grid-2">Description</div>
									<div class="grid-3">
										<input type="text" id="store-notification-rule-desc" />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">SMS</div>
									<div class="grid-3">
										<input type="checkbox" id="store-notification-rule-sms-enable" />
									</div>
									<div class="grid-2">E-Mail</div>
									<div class="grid-3">
										<input type="checkbox"
											id="store-notification-rule-email-enable" />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Receiver SMS</div>
									<div class="grid-3">
										<input type="text" id="store-notification-rule-recv-sms" />
									</div>
									<div class="grid-2">Receiver E-mail</div>
									<div class="grid-3">
										<input type="text" id="store-notification-rule-recv-email" />
									</div>
								</div>
								<div class="line">
									<div class="grid-5">SMS Setting</div>
									<div class="grid-5">E-mail Setting</div>
								</div>
								<div class="line">
									<div class="grid-2">Subject</div>
									<div class="grid-3">
										<input type="text" id="store-notification-rule-subject-sms" />
									</div>
									<div class="grid-2">Subject</div>
									<div class="grid-3">
										<input type="text" id="store-notification-rule-subject-email" />
									</div>
								</div>
								<div class="line" style="height: 50px">
									<div class="grid-2">Content</div>
									<div class="grid-3">
										<textarea id="store-notification-rule-content-sms"></textarea>
									</div>
									<div class="grid-2">Content</div>
									<div class="grid-3">
										<textarea id="store-notification-rule-content-email"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 170208 jh -->
	<div class="jqx-custom-window" id="mothly-add-window">
		<div role="title">Add</div>
		<div class="line" id="store-profile-container"
			style="margin: 10px 10px 0px 10px;">
			<div class="line gray">
				<div class="grid-2">Box Goal</div>
				<div class="grid-4">
					<input type="text" id="add-box-goal" style="width: 100%;" />
				</div>
				<div class="grid-2">Accessory Goal</div>
				<div class="grid-4">
					<input type="text" id="add-accessory-goal" style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-2">50+MRC Goal</div>
				<div class="grid-4">
					<input type="text" id="add-mrc-goal" style="width: 100%;" />
				</div>
				<div class="grid-2">Date</div>
				<div class="grid-4">
					<div id="add-date-goal"></div>
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="display:inline-block; width:90px;" onclick="WRPAdminApp.pagescript.setMonthlyGoal();">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="mothly-edit-window">
		<div role="title">Edit</div>
		<div class="line" id="store-profile-container"
			style="margin: 10px 10px 0px 10px;">
			<div class="line gray">
				<div class="grid-2">Box Goal</div>
				<div class="grid-4">
					<input type="text" id="edit-box-goal" style="width: 100%;" />
				</div>
				<div class="grid-2">Accessory Goal</div>
				<div class="grid-4">
					<input type="text" id="edit-accessory-goal" style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-2">50+MRC Goal</div>
				<div class="grid-4">
					<input type="text" id="edit-mrc-goal" style="width: 100%;" />
				</div>
				<div class="grid-2">Date</div>
				<div class="grid-4">
					<div id="edit-date-goal"></div>
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="display:inline-block; width:90px;" onclick="WRPAdminApp.pagescript.updateMonthlyGoal();">Save</div>
			</div>
		</div>
	</div>
	<!--  -->
	<div class="jqx-custom-window" id="store-add-window">
		<div role="title">Add</div>
		<div class="line" id="store-profile-container"
			style="margin: 10px 10px 0px 10px;">
			<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;">Store Information</div>
			<div class="line gray">
				<div class="grid-1-5">Store ID</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-id" style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Market</div>
				<div class="grid-4">
					<select id="store-add-store-market-code"
						onchange="WRPAdminApp.pagescript.getDistrictList(this.value);"
						style="width: 100%;"></select>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">Store Name</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-name" style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">District</div>
				<div class="grid-4">
					<select id="store-add-store-district-code" style="width: 100%;"></select>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">State</div>
				<div class="grid-4">
					<select id="store-add-store-state" style="width: 100%;"></select>
				</div>
				<div class="grid-2 title" style="margin-left: 40px;">Carrier Market</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-carrier-market"
						style="width: 100%;" readonly />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">City</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-city" style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Address 1</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-addr1" style="width: 100%;" />
				</div>
				<div class="grid-2 title" style="margin-left: 40px;">Tax Rate</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-tax-rate"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Address 2</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-addr2" style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Tel.</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-tel" style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Zip Code</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-zipcode"
						style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Fax</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-fax" style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Owner</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-owner" style="width: 100%;"
						value=<%=((session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : "")%>
						readonly />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Manager</div>
				<div class="grid-4">
					<input type="text" id="store-add-store-manager"
						style="width: 100%;" readonly />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Work Time</div>
				<div class="grid-2" style="width:100px;">
					<div class="jqx-date-input" id="store-info-open-time"></div>
				</div>
				<div class="grid-1" style="width:10px;line-height:25px;">
					~
				</div>
				<div class="grid-2" style="width:100px;">
					<div class="jqx-date-input" id="store-info-close-time"></div>
				</div>
				<div class="grid-2" style="margin-left: 40px;">Daily Work Hour</div>
				<div class="grid-4">
					<div class="jqx-date-input" id="store-info-daily-work-hour"></div>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Open Date</div>
				<div class="grid-4">
					<div class="jqx-datetime-input" id="store-add-store-open-date"></div>
				</div>
				<div class="grid-2" style="margin-left: 40px;">Weekly Work Hour</div>
				<div class="grid-4">
					<input type="text" class="jqx-text-input" id="store-info-weekly-work-hour" style="width:100%;" />
				</div>
			</div>
			<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;"> Store Status</div>
			<div class="line gray">
				<div class="grid-1-5 title">Open</div>
				<div class="grid-4">
					<label for="store-add-status-open"> <input
						type="radio" id="store-add-status-open" name="storeInfoStatus" />
						Open
					</label> <label for="store-add-status-close" style="margin-left:38px;"> <input
						type="radio" id="store-add-status-close" name="storeInfoStatus" />
						Close
					</label>
				</div>
				<div class="grid-2 title" style="margin-left: 40px;">Trsc.Protection</div>
				<div class="grid-4">
					<label for="store-add-onprotection-pop"> <input type="radio"
						id="store-add-onprotection-pop" name="protection1" /> On
					</label> <label for="store-add-offprotection-pop" style="margin-left:50px;"> <input type="radio"
						id="store-add-offprotection-pop" name="protection1" checked/> Off
					</label>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">Active</div>
				<div class="grid-4">
					<label for="store-add-active"> <input
						type="radio" id="store-add-active" name="storeActive" checked/> Act
					</label> <label for="store-add-inactive" style="margin-left:50px;"> <input
						type="radio" id="store-add-inactive" name="storeActive" /> Inact
					</label>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4 title">Restriction on making sales without Clock In</div>
				<div class="grid-1" style="margin-left: 0px;">
					<div class="jqx-check-box" id="check-sales-clockio-add" style="width:80px;height:15px;"></div>
				</div>
				<div class="grid-2-5" style="margin-left: 10px;">All permission is allowed</div>
				<div class="grid-1" style="margin-left: 0px;">
					<div class="jqx-check-box" id="check-all-permission-add" style="width:80px;height:15px;"></div>
				</div>
				<div class="grid-2-5 title">Return only store credit</div>
				<div class="grid-1" style="margin-left: 0px;">
					<div class="jqx-check-box" id="check-return-store-credit-add" style="width:80px;height:15px;"></div>
				</div>
			</div>
			<div class="line" style="min-height: 0px; display: none;"></div>
			<div class="line gray" style="display: none;">
				<div class="grid-2 title">ASAP Information</div>
				<div class="grid-1 title">ID</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-asap-id" style="width: 100%" />
				</div>
				<div class="grid-1 title">Password</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-asap-password"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray" style="display: none;">
				<div class="grid-2 title">QPay Information</div>
				<div class="grid-1 title">ID</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-qpay-id" style="width: 100%" />
				</div>
				<div class="grid-1 title">Password</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-qpay-password"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray" style="display: none;">
				<div class="grid-2 title">QPay Inventory Information</div>
				<div class="grid-1 title">ID</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-qpay-inven-id"
						style="width: 100%" />
				</div>
				<div class="grid-1 title">Password</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-qpay-inven-password"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray" style="display: none;">
				<div class="grid-2 title">QPay API Information</div>
				<div class="grid-1 title">ID</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-qpay-api-id"
						style="width: 100%" />
				</div>
				<div class="grid-1 title">Password</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-qpay-api-password"
						style="width: 100%" />
				</div>
				<div class="grid-1 title">Key</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-qpay-api-key"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray" style="display: none;">
				<div class="grid-2 title">BroadTech Information</div>
				<div class="grid-1 title">ID</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-xbm-id" style="width: 100%" />
				</div>
				<div class="grid-1 title">Password</div>
				<div class="grid-1-5">
					<input type="text" id="store-add-store-xbm-password"
						style="width: 100%" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="display:inline-block; width:90px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.addStoreInfo);">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="store-edit-window">
		<div role="title">Edit</div>
		<div class="line" id="store-profile-container"
			style="margin: 10px 10px 0px 10px;">
			<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;">Store Information</div>
			<div class="line gray">
				<div class="grid-1-5">Store ID</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-id-pop"
						style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Market</div>
				<div class="grid-4">
					<select id="store-info-store-market-code-pop"
						onchange="WRPAdminApp.pagescript.getDistrictList(this.value);"
						style="width: 100%;"></select>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">Store Name</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-name-pop"
						style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">District</div>
				<div class="grid-4">
					<select id="store-info-store-district-code-pop"
						style="width: 100%;"></select>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">State</div>
				<div class="grid-4">
					<select id="store-info-store-state-pop" style="width: 100%;"></select>
				</div>
				<div class="grid-2" style="margin-left: 40px;">Carrier Market</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-carrier-market-pop"
						style="width: 100%;" readonly />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">City</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-city-pop"
						style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Door Code</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-door-code-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Address 1</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-addr1-pop"
						style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Tax Rate</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-tax-rate-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Address 2</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-addr2-pop"
						style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Tel.</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-tel-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Zip Code</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-zipcode-pop"
						style="width: 100%;" />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Fax</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-fax-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Owner</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-owner-pop"
						style="width: 100%;" readonly />
				</div>
				<div class="grid-2" style="margin-left: 40px;">Manager</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-manager-pop"
						style="width: 100%;" readonly />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Work Time</div>
				<div class="grid-2" style="width:100px;">
					<div class="jqx-date-input" id="store-info-open-time-edit"></div>
				</div>
				<div class="grid-1" style="width:10px;line-height:25px;">
					~
				</div>
				<div class="grid-2" style="width:100px;">
					<div class="jqx-date-input" id="store-info-close-time-edit"></div>
				</div>
				<div class="grid-2" style="margin-left: 40px;">Daily Work Hour</div>
				<div class="grid-4">
					<div class="jqx-date-input" id="store-info-daily-work-hour-edit"></div>
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5">Open Date</div>
				<div class="grid-4">
					<div class="jqx-datetime-input" id="store-info-store-open-date-pop"></div>
				</div>
				<div class="grid-2" style="margin-left: 40px;">Weekly Work Hour</div>
				<div class="grid-4">
					<input type="text" class="jqx-text-input" id="store-info-weekly-work-hour-edit" style="width:100%;" />
				</div>
			</div>
			<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;"> Store Status</div>
			<div class="line gray">
				<div class="grid-1-5 title">Open</div>
				<div class="grid-4">
					<label for="store-info-status-open-pop"> 
						<input type="radio" id="store-info-status-open-pop" name="storeInfoStatus" /> Open
					</label> 
					<label for="store-info-status-close-pop" style="margin-left:38px;"> 
					<input type="radio" id="store-info-status-close-pop" name="storeInfoStatus" /> Close
					</label>
				</div>
				<div class="grid-2" style="margin-left: 40px;">Trsc.Protection</div>
				<div class="grid-4">
					<label for="store-info-protection-pop"> 
						<input type="radio" id="store-info-onprotection-pop" name="protection2" /> On
					</label> 
					<label for="store-info-status-close" style="margin-left:50px;"> 
						<input type="radio" id="store-info-offprotection-pop" name="protection2" /> Off
					</label>
				</div>
				<!-- Active end -->
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">Active</div>
				<div class="grid-4">
					<label for="store-info-status-open-pop"> 
						<input type="radio" id="store-info-active-pop" name="storeActive" />
						Act
					</label>
					 <label for="store-info-status-close-pop" style="margin-left:50px;"> 
					 	<input type="radio" id="store-info-inactive-pop" name="storeActive" />
						Inact
					</label>
				</div>
				<div class="grid-2" style="margin-left: 40px;">Cash Register</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-poscnt-pop"
						style="width: 100%;" readonly />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4 title">Restriction on making sales without Clock In</div>
				<div class="grid-1" style="margin-left: 0px;">
					<div class="jqx-check-box" id="check-sales-clockio" style="width:80px;height:15px;"></div>
				</div>
				<div class="grid-2-5" style="margin-left: 10px;">All permission is allowed</div>
				<div class="grid-1" style="margin-left: 0px;">
					<div class="jqx-check-box" id="check-all-permission" style="width:80px;height:15px;"></div>
				</div>
				<div class="grid-2-5 title">Return only store credit</div>
				<div class="grid-1" style="margin-left: 0px;">
					<div class="jqx-check-box" id="check-return-store-credit" style="width:80px;height:15px;"></div>
				</div>
			</div>
			<div class="line">
				<div class="grid-5 title" style="width:340px;font-weight: bold;font-size: 15px;border-bottom: 1px gray solid;">ASAP</div>
				<div class="grid-1 title" style="width: 5px;">&nbsp;</div>
				<div class="grid-6 title" style="font-weight: bold;font-size: 15px;border-bottom: 1px gray solid;">Q-pay</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">ID</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-asap-id-pop"
						style="width: 100%" />
				</div>
				<div class="grid-1 title" style="width: 11px;">&nbsp;</div>
				<div class="grid-2 title">ID</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-qpay-id-pop"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">Password</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-asap-password-pop"
						style="width: 100%" />
				</div>
				<div class="grid-1 title" style="width: 11px;">&nbsp;</div>
				<div class="grid-2 title">Password</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-qpay-password-pop"
						style="width: 100%" />
				</div>
			</div>
			<div class="line">
				<div class="grid-5 title" style="width:340px;font-weight: bold;font-size: 15px;border-bottom: 1px gray solid;">Broad-Tech</div>
				<div class="grid-1 title" style="width: 5px;">&nbsp;</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">ID</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-xbm-id-pop"
						style="width: 100%" />
				</div>
				<div class="grid-1 title" style="width: 11px;">&nbsp;</div>
				<div class="grid-2 title">Branch ID</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-qpay-inven-branch-id-pop"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1-5 title">Password</div>
				<div class="grid-4">
					<input type="text" id="store-info-store-xbm-password-pop"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-1 title" style="display:none;">ID</div>
				<div class="grid-1-5" style="display:none;">
					<input type="text" id="store-info-store-qpay-inven-id-pop"
						style="width: 100%" />
				</div>
				<div class="grid-1 title" style="display:none;">Password</div>
				<div class="grid-1-5" style="display:none;">
					<input type="text" id="store-info-store-qpay-inven-password-pop"
						style="width: 100%" />
				</div>
			</div>
			<div class="line gray" style="display:none;">
				<div class="grid-2 title">QPay API Information</div>
				<div class="grid-1 title">ID</div>
				<div class="grid-1-5">
					<input type="text" id="store-info-store-qpay-api-id-pop"
						style="width: 100%" />
				</div>
				<div class="grid-1 title">Password</div>
				<div class="grid-1-5">
					<input type="text" id="store-info-store-qpay-api-password-pop"
						style="width: 100%" />
				</div>
			</div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="display:inline-block; width:90px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.updateStoreInfo);">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="notification-edit-window">
		<div role="title">Edit</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line">
				<div class="grid-2">Condition</div>
				<div class="grid-4">
					<select id="store-notification-rule-condition-pop"
						style="width: 90%;">
						<option value="1">Activation</option>
						<option value="2">EOD</option>
						<option value="3">Return</option>
						<option value="4">PO Receive</option>
					</select>
				</div>
				<div class="grid-2">Description</div>
				<div class="grid-4">
					<input type="text" id="store-notification-rule-desc-pop"
						style="width: 90%;" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">SMS</div>
				<div class="grid-4">
					<input type="checkbox" id="store-notification-rule-sms-enable-pop" />
				</div>
				<div class="grid-2">E-Mail</div>
				<div class="grid-4">
					<input type="checkbox"
						id="store-notification-rule-email-enable-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Receiver SMS</div>
				<div class="grid-4">
					<input type="text" id="store-notification-rule-recv-sms-pop"
						style="width: 90%;" />
				</div>
				<div class="grid-2">Receiver E-mail</div>
				<div class="grid-4">
					<input type="text" id="store-notification-rule-recv-email-pop"
						style="width: 90%;" />
				</div>
			</div>
			<div class="line">
				<div class="grid-6">SMS Setting</div>
				<div class="grid-6">E-mail Setting</div>
			</div>
			<div class="line">
				<div class="grid-2">Subject</div>
				<div class="grid-4">
					<input type="text" id="store-notification-rule-subject-sms-pop"
						style="width: 90%;" />
				</div>
				<div class="grid-2">Subject</div>
				<div class="grid-4">
					<input type="text" id="store-notification-rule-subject-email-pop"
						style="width: 90%;" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Content</div>
				<div class="grid-4">
					<textarea id="store-notification-rule-content-sms-pop"
						style="width: 90%; height: 60px"></textarea>
				</div>
				<div class="grid-2">Content</div>
				<div class="grid-4">
					<textarea id="store-notification-rule-content-email-pop"
						style="width: 90%; height: 60px"></textarea>
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="btn sky"
					onclick="WRPAdminApp.pagescript.setNotificationRuleInfo();">Save</div>
			</div>
		</div>
	</div>

</div>