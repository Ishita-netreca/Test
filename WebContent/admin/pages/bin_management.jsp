<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
	session.setAttribute("wrp_admin_last_loaded_page", "bin_management");
	String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
	if (storeId == null) {
		storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)
				? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
	}
	String userId = (session.getAttribute("posone_admin_login_user_id") != null)
			? session.getAttribute("posone_admin_login_user_id").toString() : null;
	boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null
			&& session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1")) ? true : false;
	JSONObject permissionData = null;
	if (!isOwner && owner_id != null && storeId != null) {
		///permissionData = (JSONObject) ((JSONObject) UtilMethodClass.getSingleton().getPermissionData(owner_id, storeId,
		//		userId)).get("User");
	}

	JSONObject obj = null;
%>
<div pagename="bin_management" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
		<div class="submenu" panelname="bin_management"
			onclick="WRP.UI.changePanelBySubmenu('bin_management');">Bin
			Management</div>
		<div class="border"></div>

	</div>
	<div class="panels" style="height: 99%;">
		<!--UPDATE BANGWOORI -->
		<div class="jqx-horizontal-split-panel" id="bin-split-panel"
			panelname="bin_management" style="height: 100%;">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Bin Management</div>
					<div class="left-input-area">
						<div class="jqx-plain-button" style="width:100px;" onclick="WRPAdminApp.pagescript.initBinInfo();">+ ADD BIN</div>
					</div>
					<div class="right-input-area">
						<input type="text" placeholder="Keyword" id="inventory-bin-search-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getBinList(); }" />
						<div class="jqx-plain-button" style="width:70px;display:inline-block;" onclick="WRPAdminApp.pagescript.getBinList();">Apply</div>
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-inventory-bin-list"></div>
				</div>
			</div>
			<div class="jqx-tab-panel">
				<ul>
					<li>Profile</li>
					<li>Items</li>
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Bin Info</div>
					</div>
					<div class="content-wrapper">
						<div class="line" id="bin-profile-container"
							style="margin: 7px 0px 0px 10px;">
							<div class="line">
								<div class="grid-3">Bin Type</div>
								<div class="grid-3">
									<input type="text" id="bin-info-type" readonly/>
								</div>
							</div>
							<div class="line" style="margin-left: 0px">
								<div class="grid-3">Description</div>
								<div class="grid-9">
									<input type="text" id="bin-info-description" readonly/>
								</div>
							</div>
							<div class="line" style="margin-left: 0px">
								<div class="grid-3">Update Date</div>
								<div class="grid-3">
									<input type="text" id="bin-info-date" readonly />
								</div>
								<div class="grid-3">Updater</div>
								<div class="grid-3">
									<input type="text" id="bin-info-updater" readonly />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Items</div>
						<div class="right-input-area">
							<div class="jqx-plain-button" id="excel-bin-items" style="float: right;">Export to Excel</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 57px);">
						<div id="jqx-inventory-bin-items-list"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="jqx-custom-window" id="bin-edit-window">
		<div role="title">Edit</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line">
				<div class="grid-2">Bin Name</div>
				<div class="grid-7">
					<input type="text" id="bin-info-type-pop" style="width: 100%;" />
				</div>
			</div>
			<div class="line" style="margin-left: 0px">
				<div class="grid-2">Description</div>
				<div class="grid-7">
					<input type="text" id="bin-info-description-pop"
						style="width: 100%;" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;height:35px;">
				<div class="jqx-plain-button" style="width:90px;display:inline-block;" onclick="WRPAdminApp.pagescript.setBinData();">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="bin-transfer-edit-window">
		<div role="title">Bin Transfer</div>
		<div class="line" style="margin: 10px 10px 0px 30px; font-size: 13px;">
			<div class="line">
				<div class="grid-3">Item Code</div>
				<div class="grid-9">
					<div id="inven-bin-transfer-itemcode"></div>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Serial No</div>
				<div class="grid-9">
					<div id="inven-bin-transfer-serialno"></div>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Description</div>
				<div class="grid-9">
					<div id="inven-bin-transfer-description"></div>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Category</div>
				<div class="grid-9">
					<div id="inven-bin-transfer-category"></div>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Bin Type</div>
				<div class="grid-9">
					<select id="inven-bin-type-pop" class="select-category"
						style="width: 170px;"></select>
				</div>
			</div>
			<div class="line" id="bin-transfer-qty-line" style="display: none;">
				<div class="grid-3">Qty</div>
				<div class="grid-9">
					<input type="text" id="inven-bin-trnasfer-qty"
						style="width: 170px;" value="1" />
				</div>
			</div>
			<div id="inven-bin-transfer-inven-sid" style="display: none;"></div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:90px;display:inline-block;" onclick="WRPAdminApp.pagescript.setBinTransfer();">Transfer</div>
			</div>
		</div>
	</div>
</div>
