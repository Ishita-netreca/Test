<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "sales_conf");
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
<div pagename="sales_conf" class="theme-02">
	<div class="page-submenu-container" style="display: none;">
		<!-- <div class="submenu" panelname="promotion" onclick="WRP.UI.changePanelBySubmenu('promotion');">
            Promotion
        </div> -->
		<!-- <div class="submenu" panelname="carrier_setup" onclick="WRP.UI.changePanelBySubmenu('carrier_setup');">
            Carrier Setup
        </div>
        <div class="submenu" panelname="loan" onclick="WRP.UI.changePanelBySubmenu('loan');">
            Loan
        </div> -->
		<div class="submenu" panelname="rate_plan"
			onclick="WRP.UI.changePanelBySubmenu('rate_plan');">Rate Plan</div>
	</div>
	<div class="panels" style="height: 100%;">
		<div class="tab-panel" panelname="promotion" style="display: none;">
			<div class="jqx-tab-panel">
				<ul>
					<li>Instant Rebate</li>
					<li>BOGO</li>
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Instant Rebate</div>
					</div>
					<div class="content-wrapper"></div>
				</div>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">BOGO</div>
					</div>
					<div class="content-wrapper"></div>
				</div>
			</div>
		</div>
		<div class="tab-panel" panelname="carrier_setup"
			style="display: none;">
			<div class="jqx-tab-panel">
				<ul>
					<li>Q-Pay Account</li>
					<li>ASAP Account</li>
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Q-Pay Account</div>
					</div>
					<div class="content-wrapper"></div>
				</div>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">ASAP Account</div>
					</div>
					<div class="content-wrapper"></div>
				</div>
			</div>
		</div>
		<div class="tab-panel" panelname="loan" style="display: none;">
			<div class="jqx-tab-panel">
				<ul>
					<li>Smart Pay</li>
					<li>Progressive</li>
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Smart Pay</div>
					</div>
					<div class="content-wrapper"></div>
				</div>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Progressive</div>
					</div>
					<div class="content-wrapper"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel" panelname="rate_plan">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Rate Plan</div>
					<div class="sub-title">Rate Plan Management</div>
					<div class="left-input-area">
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.initRateplanEditContainer();">
							+ ADD RATEPLAN</div>
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.syncRatePlanList();">Sync</div>
					</div>
					<div class="right-input-area">
						<div class="btn sky" id="excel-sales-rateplan"
							style="float: right;">Export to Excel</div>
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-sales-rateplan-list"></div>
				</div>
			</div>
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Rate Plan</div>
					<div class="right-input-area"></div>
				</div>
				<div class="content-wrapper">
					<div class="content" style="margin-top: 10px;">
						<div class="line">
							<div class="grid-2">Rateplan Code</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-rateplan-code" />
							</div>
							<div class="grid-2">Description</div>
							<div class="grid-6">
								<input type="text" id="rateplan-edit-description" />
							</div>
						</div>
						<div class="line">
							<div class="grid-2">Carrier</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-carrier" />
							</div>
							<div class="grid-2">Plan Type</div>
							<div class="grid-2">
								<select id="rateplan-edit-plan-type">
									<option value="0">Voice</option>
									<option value="1">Feature</option>
								</select>
							</div>
							<div class="grid-2">Group Type</div>
							<div class="grid-2">
								<select id="rateplan-edit-group-type">
									<option value="0">Individual</option>
									<option value="1">Family</option>
								</select>
							</div>
						</div>
						<div class="line">
							<div class="grid-2">MRC</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-mrc" />
							</div>
							<div class="grid-2">Reactivation Plan</div>
							<div class="grid-2">
								<input type="checkbox" id="rateplan-edit-react-plan-flag" />
							</div>
							<div class="grid-2">Upgrade Plan</div>
							<div class="grid-2">
								<input type="checkbox" id="rateplan-edit-upgrade-plan-flag" />
							</div>
						</div>
						<div class="line">
							<div class="grid-2">Start Date</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-start-date"
									class="jquery-datepicker" />
							</div>
							<div class="grid-2">End Date</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-end-date"
									class="jquery-datepicker" />
							</div>
							<div class="grid-2">Disable</div>
							<div class="grid-2">
								<input type="checkbox" id="rateplan-edit-disable" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="sales-rateplan-new-window">
		<div role="title">Rate Plan Edit</div>
		<div role="content" style="margin-top: 20px;">
			<div class="line">
				<div class="grid-2">Rateplan Code</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-rateplan-code-pop"
						style="width: 100%" />
				</div>
				<div class="grid-2">Description</div>
				<div class="grid-6">
					<input type="text" id="rateplan-edit-description-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Carrier</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-carrier-pop"
						style="width: 100%" />
				</div>
				<div class="grid-2">Plan Type</div>
				<div class="grid-2">
					<select id="rateplan-edit-plan-type-pop" style="width: 100%">
						<option value="0">Voice</option>
						<option value="1">Feature</option>
					</select>
				</div>
				<div class="grid-2">Group Type</div>
				<div class="grid-2">
					<select id="rateplan-edit-group-type-pop" style="width: 100%">
						<option value="0">Individual</option>
						<option value="1">Family</option>
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2">MRC</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-mrc-pop" style="width: 100%" />
				</div>
				<div class="grid-2">Reactivation Plan</div>
				<div class="grid-2">
					<input type="checkbox" id="rateplan-edit-react-plan-flag-pop" />
				</div>
				<div class="grid-2">Upgrade Plan</div>
				<div class="grid-2">
					<input type="checkbox" id="rateplan-edit-upgrade-plan-flag-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Start Date</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-start-date-pop"
						class="jqx-datetime-input" style="width: 100%" />
				</div>
				<div class="grid-2">End Date</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-end-date-pop"
						class="jqx-datetime-input" style="width: 100%" />
				</div>
				<div class="grid-2">Disable</div>
				<div class="grid-2">
					<input type="checkbox" id="rateplan-edit-disable-pop" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="btn sky"
					onclick="WRPAdminApp.pagescript.setRateplanData();">Save</div>
			</div>
		</div>
	</div>
</div>