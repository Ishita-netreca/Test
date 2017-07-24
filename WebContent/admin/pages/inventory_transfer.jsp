<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
	session.setAttribute("wrp_admin_last_loaded_page", "inventory_transfer");
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
<div pagename="inventory_transfer" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
		<div class="submenu" panelname="inventory_transfer"
			onclick="WRP.UI.changePanelBySubmenu('inventory_transfer');">
			Inventory Trans.</div>
		<div class="border"></div>
	</div>
	<div class="panels">
		<div class="tab-panel" panelname="inventory_transfer"
			style="width: 99.8%; height:99%;">
			<div class="flow-panel" style="height: 100px;">
				<div class="upper-image-flow"
					onclick="$('#jqxTabs').jqxTabs('select', 0);"
					style="background-image: url('img/icon/two_boxes_01.png'); margin-right: 40px;">
					Trans. History</div>
				<div class="upper-image-flow"
					onclick="WRPAdminApp.openPopupInPage('reqTransferInputIDContainer');document.getElementById('inventory-req-transfer-id').value='';"
					style="background-image: url('img/icon/document_02.png');">
					Request Trans</div>
				<div class="next"></div>
				<div class="upper-image-flow"
					onclick="$('#jqxTabs').jqxTabs('select', 1);"
					style="background-image: url('img/icon/document_03.png');">
					Receive [<span id="inventory-total-transfer-ship-count"
						style="font-weight: bold;"></span>]
				</div>
				&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
				<div class="upper-image-flow"
					onclick="$('#jqxTabs').jqxTabs('select', 2);"
					style="background-image: url('img/icon/boxes_in_box_01.png');">
					Approval [<span id="inventory-total-transfer-req-count"
						style="font-weight: bold;"></span>]
				</div>
				<div class="next"></div>
				<div class="upper-image-flow"
					onclick="$('#jqxTabs').jqxTabs('select', 3);"
					style="background-image: url('img/icon/document_04.png');">
					Ship [<span id="inventory-total-transfer-appr-count"
						style="font-weight: bold;"></span>]
				</div>
			</div>
			<div class="jqx-tab-panel" id="jqxTabs">
				<ul>
					<li id="tab-transfer">Trans. History</li>
					<li id="tab-receive">Receive</li>
					<li id="tab-approval">Approval</li>
					<li id="tab-ship">Ship</li>
				</ul>
				<div class="plain-01-panel">
					<div class="title-wrapper">
						<div class="title">Transfer History</div>
						<div class="sub-title">Transfer Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area">
							<div class="jqx-plain-button" id="excel-inventory-transfer-history"
								style="float: right;margin-left:5px;">Export to Excel</div>
							<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.getTransferHistoryList();" style="float: right;margin-left:5px;width:80px;">Apply</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-history-start-date"></div>
							</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-history-end-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 57px);">
						<div id="jqx-inventory-transfer-history-list"></div>
					</div>
				</div>
				<div class="plain-01-panel">
					<div class="title-wrapper">
						<div class="title">Receive</div>
						<div class="sub-title">Transfer Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area">
							<div class="jqx-plain-button" id="excel-inventory-transfer-ship-history"
								style="float: right;margin-left:5px;">Export to Excel</div>
							<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.getTransferShipHistoryList();" style="float: right;margin-left:5px;width:80px;">Apply</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-ship-start-date"></div>
							</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-ship-end-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 57px);">
						<div id="jqx-inventory-transfer-ship-list"></div>
					</div>
				</div>
				<div class="plain-01-panel">
					<div class="title-wrapper">
						<div class="title">Approval</div>
						<div class="sub-title">Transfer Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area">
							<div class="jqx-plain-button" id="excel-inventory-transfer-req-history"
								style="float: right;margin-left:5px;">Export to Excel</div>
							<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.getTransferRequestHistoryList();" style="float: right;margin-left:5px;width:80px;">Apply</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-req-start-date"></div>
							</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-req-end-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 57px);">
						<div id="jqx-inventory-transfer-req-list"></div>
					</div>
				</div>
				<div class="plain-01-panel">
					<div class="title-wrapper">
						<div class="title">Ship</div>
						<div class="sub-title">Transfer Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area">
							<div class="jqx-plain-button" id="excel-inventory-transfer-appr-history"
								style="float: right;margin-left:5px;">Export to Excel</div>
							<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.getTransferApprovalHistoryList();" style="float: right;margin-left:5px;width:80px;">Apply</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-appr-start-date"></div>
							</div>
							<div style="width: 120px; display:inline-block;">
								<div class="jqx-datetime-input" id="inventory-transfer-appr-end-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 57px);">
						<div id="jqx-inventory-transfer-appr-list"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="popup-area">

			<div class="popup-container" popupname="reqTransferInputIDContainer">
				<div class="close-btn" onclick=""></div>
				<div class="title-bar">REQUEST TRANSFER</div>
				<div class="plain-view">
					<div class="plain-content">
						<div class="line">
							<div class="grid-4">Transfer ID</div>
							<div class="grid-8">
								<input type="text" id="inventory-req-transfer-id"
									onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.informTransferInfoByTransferId(); }" />
							</div>
						</div>
						<div class="line" style="">
							<div class="grid-12" style="text-align: center;">
								<div class="left_bg_btn check-01"
									onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.informTransferInfoByTransferId);">Next</div>
								<div class="left_bg_btn cancel-01"
									onclick="WRPAdminApp.closePopup(this);">Cancel</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="popup-container" popupname="reqTransferContainer">
				<div class="close-btn" onclick=""></div>
				<div class="title-bar">REQUEST TRANSFER</div>
				<div class="plain-view" viewname="selectStore">
					<div class="plain-content">
						<div class="panel">
							<div class="title">
								<div class="left-area">Store Select</div>
								<div class="right-area text_right">
									<div class="search-container">
										<input type="text" id="inven-transfer-req-store-keyword" placeholder="Keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getStoreListByOwnerSid(); }"/>
										<div class="right-btn" onclick="WRPAdminApp.pagescript.getStoreListByOwnerSid();"></div>
									</div>
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="375">
									<thead>
										<tr>
											<th width="80">Store ID</th>
											<th>Address</th>
											<th width="100">Tel</th>
										</tr>
									</thead>
									<tbody id="inventory-req-transfer-store-list">
									</tbody>
								</table>
							</div>
						</div>
						<div class="line" style="padding: 0px 30px;">
							<div class="grid-6" style="text-align: left;">&nbsp;</div>
							<div class="grid-6" style="text-align: right;">
								<div class="left_bg_btn check-01"
									onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.nextStepInReqTransfer);">Next</div>
								<div class="left_bg_btn cancel-01"
									onclick="WRPAdminApp.closePopup(this);">Cancel</div>
							</div>
						</div>
					</div>
				</div>

				<div class="plain-view" viewname="selectItems">
					<div class="plain-content">
						<div class="panel">
							<div class="title">
								<div class="left-area" style="width:20%;">Select Items</div>
								<div class="right-area text_right" style="width:80%">
									<span style="margin-right: 5px;font-size:12px">Item Type</span>
									<input type="checkbox" name="searchCheck" id="item-type-phone" style="position: relative; top:2px;"/><label style="margin-top:1px;">Phones</label>
									<input type="checkbox" name="searchCheck" id="item-type-acc" style="position: relative; top:2px;"/><label>Accessories</label>
									<input type="checkbox" name="searchCheck" id="item-type-sim" style="position: relative; top:2px;"/><label>SIM</label>
									<div class="search-container">
										<input type="text" id="inven-transfer-req-item-keyword" placeholder="Keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getOverlappedItemListBetweenStores(); }"/>
										<div class="right-btn" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getOverlappedItemListBetweenStores);"></div>
									</div>
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="150">
									<thead>
										<tr>
											<th width="120">Item Code</th>
											<th width="120">MODEL</th>
											<th>Desc.</th>
											<th width="40">Qty</th>
											<th width="40">Add</th>
										</tr>
									</thead>
									<tbody id="inventory-req-transfer-items-list">
									</tbody>
								</table>
							</div>
						</div>
						<div class="panel">
							<div class="title"
								style="background-image: url('img/icon/download_01.png'); background-size: 20px; background-position: 6px 2px;">
								<div class="left-area">Added Items</div>
							</div>
							<div class="content" style="height: 160px;">
								<table class="header-fixed-table" height="120">
									<thead>
										<tr>
											<th width="120">Item ID</th>
											<th width="120">Name</th>
											<th>Description</th>
											<th width="60">Qty.</th>
											<th width="25"></th>
										</tr>
									</thead>
									<tbody id="inventory-req-transfer-added-items">

									</tbody>
								</table>
							</div>
							<div class="line">
								<div class="grid-6" style="text-align: left;">
									<div class="left_bg_btn reset-01"
										onclick="WRPAdminApp.setViewInPopup('reqTransferContainer','selectStore');">Select
										Store</div>
								</div>
								<div class="grid-6" style="text-align: right;">
									<div class="left_bg_btn check-01"
										onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.saveTransfer);">Save</div>
									<div class="left_bg_btn cancel-01"
										onclick="WRPAdminApp.closePopup(this);">Cancel</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="popup-container" popupname="transferApprovalContainer">
				<div class="close-btn" onclick=""></div>
				<div class="title-bar">TRANSFER APPROVAL</div>
				<div class="plain-view" viewname="item_list">
					<div class="plain-content">
						<div class="panel">
							<div class="title no_icon">
								<div class="left-area">Transfer Approval</div>
								<div class="right-area text_right">
									<div class="info">
										Trans. ID <span class="font_bold"
											id="transfer-appr-transfer-id"></span>
									</div>
									<div class="info">
										From. <span class="font_bold" id="transfer-appr-transfer-from"></span>
									</div>
									<div class="info">
										To. <span class="font_bold" id="transfer-appr-transfer-to"></span>
									</div>
									<div class="search-container" style="display:none;">
										<input type="text" placeholder="Keyword" id="inven-transfer-appr-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, 'transfer-appr-item-list', 0); }"/>
										<div class="right-btn" onclick="WRPAdminApp.pagescript.getTransferItemsList(WRPAdminApp.pagescript._selectedTransSid, 'transfer-appr-item-list', 0);"></div>
									</div>
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="325">
									<thead>
										<tr>
											<th width="120">Item Code</th>
											<th width="120">Name</th>
											<th>Desc.</th>
											<th width="35">Req<br />Qty
											</th>
											<th width="35">Appr<br />Qty
											</th>
											<th width="50">Detail</th>
										</tr>
									</thead>
									<tbody id="transfer-appr-item-list">

									</tbody>
								</table>
							</div>
						</div>
						<div class="line bottom-left">
							<div class="grid-6" style="text-align: left; padding-left: 35px;">
								<div class="left_bg_btn check-01"
									onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setTransferStatus,this, 1);">Reject</div>
							</div>
							<div class="grid-6"
								style="text-align: right; padding-right: 35px;">
								<div class="left_bg_btn check-01"
									onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setTransferStatus,this, 2);">Save</div>
							</div>
						</div>
					</div>
				</div>
				<div class="plain-view" viewname="appr_serialized_items">
					<div class="plain-content">
						<div class="panel">
							<div class="title no_icon">
								<div class="left-area">Transfer Approval</div>
							</div>
							<div class="content">
								<div class="line">
									<div class="grid-2">Item Code</div>
									<div class="grid-4">
										<input type="text" id="transfer-appr-serialized-item-code"
											readonly />
									</div>
									<div class="grid-2">Model</div>
									<div class="grid-4">
										<input type="text" id="transfer-appr-serialized-item-model"
											readonly />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Description</div>
									<div class="grid-10">
										<input type="text" id="transfer-appr-serialized-item-desc"
											readonly />
									</div>
								</div>
							</div>
						</div>
						<div class="panel">
							<div class="title no_icon">
								<div class="left-area">Transfer Items</div>
								<div class="right-area">
									<!-- <div class="search-container">
										<input type="text" placeholder="Keyword"
											id="transfer-appr-serial-no"
											onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo(); }" />
										<div class="right-btn"
											onclick="WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo();">
										</div>
									</div> -->
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="200">
									<thead>
										<tr>
											<th>Item Code</th>
											<th>Serial No</th>
											<th width="40">qty</th>
											<th width="40"></th>
										</tr>
									</thead>
									<tbody id="transfer-appr-item-serial-no-list">

									</tbody>
								</table>
							</div>
						</div>
						<div class="line bottom-left">
							<div class="grid-6" style="text-align: left; padding-left: 35px;">
								<div class="left_bg_btn cancel-01"
									onclick="WRPAdminApp.setViewInPopup('transferApprovalContainer', 'item_list');">Cancel</div>
							</div>
							<div class="grid-6"
								style="text-align: right; padding-right: 35px;">
								<div class="left_bg_btn check-01"
									onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.saveTransferApprSerializedItems);">Save</div>
							</div>
						</div>
					</div>
				</div>				
				
	            <div class="plain-view" viewname="appr_non_serialized_items">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Approval</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    Item Code
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-appr-non-serialized-item-code" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    Model
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-appr-non-serialized-item-model" readonly/>
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    Description
	                                </div>
	                                <div class="grid-10">
	                                    <input type="text" id="transfer-appr-non-serialized-item-desc" readonly/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Set Item Approval</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Request Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-appr-non-serialized-item-req-qty" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Approval Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-appr-non-serialized-item-appr-qty"/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.setViewInPopup('transferApprovalContainer', 'item_list');">Cancel</div>
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                            <div class="left_bg_btn check-01" id="inventory-transfer-appr-save-btn" onclick="WRPAdminApp.pagescript.saveTransferApprNonSerializedItems();">Save</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
				
			</div>
			
			
	        <div class="popup-container" popupname="transferShipContainer">
	            <div class="close-btn" onclick="">
	            </div>
	            <div class="title-bar">
	                TRANSFER SHIPMENT
	            </div>
	            <div class="plain-view" viewname="item_list">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Shipment</div>
	                            <div class="right-area text_right">
	                                <div class="info">Trans. ID <span class="font_bold" id="transfer-ship-transfer-id"></span></div>
	                                <div class="info">From. <span class="font_bold" id="transfer-ship-transfer-from"></span></div>
	                                <div class="info">To. <span class="font_bold" id="transfer-ship-transfer-to"></span></div>
	                                <div class="search-container" style="display:none;">
	                                    <input type="text" placeholder="Keyword"/>
	                                    <div class="right-btn">
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="content">
	                            <table class="header-fixed-table" height="325">
	                                <thead>
	                                <tr>
	                                    <th width="120">Item Code</th>
	                                    <th width="120">Name</th>
	                                    <th>Desc.</th>
	                                    <th width="35">Appt<br/>Qty</th>
	                                    <th width="35">Ship<br/>Qty</th>
	                                    <th width="50">Detail</th>
	                                </tr>
	                                </thead>
	                                <tbody id="transfer-ship-item-list">
	
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-10" style="text-align: right;padding-left: 35px;">
	                            <div class="grid-6">
	                                Ship No.
	                            </div>
	                            <div class="grid-4">
	                                <input type="text" id="transfer-ship-no"/>
	                            </div>
	                        </div>
	                        <div class="grid-2" style="text-align: right;padding-right: 35px;">
	                            <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.setTransferStatus(this, 3);">Save</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="plain-view" viewname="ship_serialized_items">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Shipment</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    Item Code
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-ship-serialized-item-code" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    Model
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-ship-serialized-item-model" readonly/>
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    Description
	                                </div>
	                                <div class="grid-10">
	                                    <input type="text" id="transfer-ship-serialized-item-desc" readonly/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Items</div>
	                            <div class="right-area">
	                                <!--
	                                <div class="search-container">
	                                    <input type="text" placeholder="Keyword" id="transfer-ship-serial-no" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo(); }"/>
	                                    <div class="right-btn" onclick="WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo();">
	                                    </div>
	                                </div>
	                                -->
	                            </div>
	                        </div>
	                        <div class="content">
	                            <table class="header-fixed-table" height="200">
	                                <thead>
	                                <tr>
	                                    <th>Item Code</th>
	                                    <th>Serial No</th>
	                                    <th width="40">qty</th>
	                                    <th width="40"></th>
	                                </tr>
	                                </thead>
	                                <tbody id="transfer-ship-item-serial-no-list">
	
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.setViewInPopup('transferShipContainer', 'item_list');">Cancel</div>
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                            <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.saveTransferShipSerializedItems();">Save</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="plain-view" viewname="ship_non_serialized_items">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Shipment</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    Item Code
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-ship-non-serialized-item-code" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    Model
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-ship-non-serialized-item-model" readonly/>
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    Description
	                                </div>
	                                <div class="grid-10">
	                                    <input type="text" id="transfer-ship-non-serialized-item-desc" readonly/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Set Item Shipment</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Approval Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-ship-non-serialized-item-appr-qty" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Ship Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-ship-non-serialized-item-ship-qty"/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.setViewInPopup('transferShipContainer', 'item_list');">Cancel</div>
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                            <div class="left_bg_btn check-01" id="inventory-transfer-ship-save-btn" onclick="WRPAdminApp.pagescript.saveTransferShipNonSerializedItems();">Save</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	
	        <div class="popup-container" popupname="transferRecvContainer">
	            <div class="close-btn" onclick="">
	            </div>
	            <div class="title-bar">
	                TRANSFER RECEIVEMENT
	            </div>
	            <div class="plain-view" viewname="item_list">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Receivement</div>
	                            <div class="right-area text_right">
	                                <div class="info">Trans. ID <span class="font_bold" id="transfer-recv-transfer-id"></span></div>
	                                <div class="info">Ship No. <span class="font_bold" id="transfer-recv-ship-no"></span></div>
	                                <div class="info">From. <span class="font_bold" id="transfer-recv-transfer-from"></span></div>
	                                <div class="info">To. <span class="font_bold" id="transfer-recv-transfer-to"></span></div>
	                                <div class="search-container" style="display:none;">
	                                    <input type="text" placeholder="Keyword"/>
	                                    <div class="right-btn">
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="content">
	                            <table class="header-fixed-table" height="325">
	                                <thead>
	                                <tr>
	                                    <th width="120">Item Code</th>
	                                    <th width="120">Name</th>
	                                    <th>Desc.</th>
	                                    <th width="35">Ship<br/>Qty</th>
	                                    <th width="35">Recv<br/>Qty</th>
	                                    <th width="50">Detail</th>
	                                </tr>
	                                </thead>
	                                <tbody id="transfer-recv-item-list">
	
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            &nbsp;
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                            <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.setTransferStatus(this, 4);">Save</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="plain-view" viewname="recv_serialized_items">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Receivement</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    Item Code
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-recv-serialized-item-code" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    Model
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-recv-serialized-item-model" readonly/>
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    Description
	                                </div>
	                                <div class="grid-10">
	                                    <input type="text" id="transfer-recv-serialized-item-desc" readonly/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Items</div>
	                            <div class="right-area">
	                                <!--
	                                <div class="search-container">
	                                    <input type="text" placeholder="Keyword" id="transfer-ship-serial-no" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo(); }"/>
	                                    <div class="right-btn" onclick="WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo();">
	                                    </div>
	                                </div>
	                                -->
	                            </div>
	                        </div>
	                        <div class="content">
	                            <table class="header-fixed-table" height="200">
	                                <thead>
	                                <tr>
	                                    <th>Item Code</th>
	                                    <th>Serial No</th>
	                                    <th width="40">qty</th>
	                                    <th width="40"></th>
	                                </tr>
	                                </thead>
	                                <tbody id="transfer-recv-item-serial-no-list">
	
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.setViewInPopup('transferRecvContainer', 'item_list');">Cancel</div>
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                            <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.saveTransferRecvSerializedItems();">Save</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="plain-view" viewname="recv_non_serialized_items">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Receivement</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    Item Code
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-recv-non-serialized-item-code" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    Model
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-recv-non-serialized-item-model" readonly/>
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    Description
	                                </div>
	                                <div class="grid-10">
	                                    <input type="text" id="transfer-recv-non-serialized-item-desc" readonly/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Set Item Receive</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Ship Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-recv-non-serialized-item-ship-qty" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Receive Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-recv-non-serialized-item-recv-qty"/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.setViewInPopup('transferRecvContainer', 'item_list');">Cancel</div>
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                            <div class="left_bg_btn check-01" id="inventory-transfer-recv-save-btn" onclick="WRPAdminApp.pagescript.saveTransferRecvNonSerializedItems();">Save</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
			<div class="popup-container" popupname="transferInfoContainer">
	            <div class="close-btn" onclick="">
	            </div>
	            <div class="title-bar">
	                TRANSFER INFORMATION
	            </div>
	            <div class="plain-view" viewname="item_list">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Information</div>
	                            <div class="right-area text_right">
	                                <div class="info">Trans. ID <span class="font_bold" id="transfer-info-transfer-id"></span></div>
	                                <div class="info">Ship No. <span class="font_bold" id="transfer-info-ship-no"></span></div>
	                                <div class="info">From. <span class="font_bold" id="transfer-info-transfer-from"></span></div>
	                                <div class="info">To. <span class="font_bold" id="transfer-info-transfer-to"></span></div>
	                            </div>
	                        </div>
	                        <div class="content">
	                            <table class="header-fixed-table" height="325">
	                                <thead>
	                                <tr>
	                                    <th width="120">Item Code</th>
	                                    <th width="120">Name</th>
	                                    <th>Desc.</th>
	                                    <th width="35">Req<br/>Qty</th>
	                                    <th width="35">Appr<br/>Qty</th>
	                                    <th width="35">Ship<br/>Qty</th>
	                                    <th width="35">Recv<br/>Qty</th>
	                                    <th width="50">Detail</th>
	                                </tr>
	                                </thead>
	                                <tbody id="transfer-info-item-list">
	
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            &nbsp;
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                        	<div class="left_bg_btn cancel-01" onclick="WRPAdminApp.closePopup('transferInfoContainer');">Cancel</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="plain-view" viewname="info_serialized_items">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Information</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    Item Code
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-serialized-item-code" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    Model
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-serialized-item-model" readonly/>
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    Description
	                                </div>
	                                <div class="grid-10">
	                                    <input type="text" id="transfer-info-serialized-item-desc" readonly/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Items</div>
	                            <div class="right-area">
	                                <!--
	                                <div class="search-container">
	                                    <input type="text" placeholder="Keyword" id="transfer-ship-serial-no" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo(); }"/>
	                                    <div class="right-btn" onclick="WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo();">
	                                    </div>
	                                </div>
	                                -->
	                            </div>
	                        </div>
	                        <div class="content">
	                            <table class="header-fixed-table" height="200">
	                                <thead>
	                                <tr>
	                                    <th>Item Code</th>
	                                    <th>Serial No</th>
	                                    <th width="40">qty</th>
	                                    <th width="40"></th>
	                                </tr>
	                                </thead>
	                                <tbody id="transfer-info-item-serial-no-list">
	
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.setViewInPopup('transferInfoContainer', 'item_list');">Cancel</div>
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="plain-view" viewname="info_non_serialized_items">
	                <div class="plain-content">
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Transfer Information</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    Item Code
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-non-serialized-item-code" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    Model
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-non-serialized-item-model" readonly/>
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    Description
	                                </div>
	                                <div class="grid-10">
	                                    <input type="text" id="transfer-info-non-serialized-item-desc" readonly/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="panel">
	                        <div class="title no_icon">
	                            <div class="left-area">Item Information</div>
	                        </div>
	                        <div class="content">
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Req Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-non-serialized-item-req-qty" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Appr Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-non-serialized-item-appr-qty" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Ship Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-non-serialized-item-ship-qty" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                            <div class="line">
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                                <div class="grid-4">
	                                    Receive Qty
	                                </div>
	                                <div class="grid-4">
	                                    <input type="text" id="transfer-info-non-serialized-item-recv-qty" readonly/>
	                                </div>
	                                <div class="grid-2">
	                                    &nbsp;
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="line bottom-left">
	                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
	                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.setViewInPopup('transferInfoContainer', 'item_list');">Cancel</div>
	                        </div>
	                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		</div>
	</div>
</div>
