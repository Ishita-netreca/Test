<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "expenses");
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
<div pagename="expenses" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
		<div class="submenu" panelname="expenses" onclick="WRP.UI.changePanelBySubmenu('expenses');">Expenses</div>
	</div>
	<div class="panels" style="height:100%;">
	<div class="plain-01-panel" panelname="expenses">
			<div class="jqx-tab-panel">
				<ul>
					<li>History</li>
					<li>Management</li>
					<!-- <li style="margin-bottom: -6px;">Configuration</li> -->
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Expenses</div>
						<div class="sub-title">History Management</div>
						<div class="left-input-area">
							<!-- <div class="jqx-left-imgbeforetext-center-btn" id="jqx-reload-btn">Reload</div> -->
						</div>
						<div class="right-input-area" style="width: 730px;">
							<div class="line" style="overflow: hidden;">
								<div class="grid-1">
									<div class="jqx-radio-button" id="expense-history-radio-1" groupName="expense-history-group">Today</div>
								</div>
								<div class="grid-1" style="width:60px;">	
									<div class="jqx-radio-button" id="expense-history-radio-2" groupName="expense-history-group">1
										Week</div>
								</div>
								<div class="grid-1-5">
									<div class="jqx-radio-button" id="expense-history-radio-3" groupName="expense-history-group">1
										Month</div>
								</div>
								<div class="grid-2-5" style="margin-left: 0px; width:105px;">
									<div class="jqx-datetime-input"
										id="expense-history-search-start-date"></div>
								</div>
								<div class="grid-2-5" style="margin-left: 7px; width:105px;">
									<div class="jqx-datetime-input"
										id="expense-history-search-end-date"></div>
								</div>
								<div class="grid-2-5" style="margin-left: 7px; width:120px;">
									<input type="text" class="jqx-text-input" id="expense-history-keyword" placeholder="keyword" style="width:120px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getExpenseHistoryList(); }"/>
								</div>
								<div class="grid-1" style="margin-left: 7px; width:75px;">
									<div class="jqx-plain-button"
										id="expense-history-apply" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getExpenseHistoryList);" style="width:70px;">Apply</div>
								</div>
								<div class="grid-1" style="margin-left: 7px; width:75px;">
									<div class="jqx-plain-button"
										id="excel-expense-history" style=" width:70px;">Excel</div>
								</div>
							</div>
						</div>
						
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 58px);">
						<div id="jqx-expense-history-list"></div>
					</div>
				</div>
				<div class="jqx-horizontal-split-panel"
					style="width: 100%; height: 100%;">
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Expenses</div>
							<div class="sub-title">Items Management</div>
							<div class="left-input-area">
								<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.newExpenseDict);">+ ADD</div>
							</div>
							<div class="right-input-area"></div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 58px);">
							<div id="jqx-expense-dict-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Expense Details</div>
							<div class="left-input-area"></div>
							<div class="right-input-area"></div>
						</div>
						<div class="content-wrapper" style="margin: 3px 50px 0px 32px;">
							<div class="content" style="padding-top: 10px;">
								<div class="line gray">
									<div class="grid-2">Item Name</div>
									<div class="grid-2-5">
										<input type="text" id="expense-profile-name"
											style="width: 100%;" />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2">Description</div>
									<div class="grid-2-5">
										<input type="text" id="expense-profile-description"
											style="width: 100%;" />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2">QuickBook Code</div>
									<div class="grid-2-5">
										<input type="text" id="expense-profile-quickbookcode"
											style="width: 100%;" />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2">Update Date</div>
									<div class="grid-2-5">
										<input type="text" id="expense-profile-date"
											style="width: 100%;" />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2">Updater</div>
									<div class="grid-2-5">
										<input type="text" id="expense-profile-updater"
											style="width: 100%;" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="expense-edit-window">
		<div role="title">Expenses</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line gray">
				<div class="grid-4">Item Name</div>
				<div class="grid-6">
					<input type="text" id="expense-name-info-pop" style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4">Description</div>
				<div class="grid-6">
					<input type="text" id="expense-description-info-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line gray">
				<div class="grid-4">QuickBook Code</div>
				<div class="grid-6">
					<input type="text" id="expense-quickbookCode-info-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:90px;display:inline-block;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setExpenseDict);">Save</div>
			</div>
		</div>
	</div>
</div>