<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
	session.setAttribute("wrp_last_loaded_page", "inventory");
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
<div pagename="inventory" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="items"
			onclick="WRP.UI.changePanelBySubmenu('items');">Items</div>
		<div class="border"></div>
		<div class="submenu" panelname="return"
			onclick="WRP.UI.changePanelBySubmenu('return');">Return</div>
		<div class="border"></div>
		<div class="submenu" panelname="return_reasons"
			onclick="WRP.UI.changePanelBySubmenu('return_reasons');">Return
			Reasons</div>
	</div>
	<div class="panels">
		<div class="tab-panel" panelname="items"
			style="display: block; width: 99.8%; height: 99.6%">
			<div class="jqx-tab-panel">
				<ul>
					<li>Phone & SIM</li>
					<li>Accessories</li>
					<li>Service Items</li>
				</ul>
				<div class="jqx-horizontal-split-panel">
					<div class="plain-01-panel" style="height: 60%">
						<div class="title-wrapper">
							<div class="title">Phone & SIM</div>
							<div class="sub-title">information Management</div>
							<div class="left-input-area">
								<div class="jqx-plain-button" style="display:inline-block;width:100px;" onclick="WRPAdminApp.pagescript.initSerializedItemDictInfo();">+ ADD ITEM</div>
								<div class="jqx-plain-button" style="display:inline-block;width:60px;" onclick="WRPAdminApp.pagescript.syncItemDictList();">Sync</div>
							</div>
							<div class="right-input-area">
								<label>Item Type</label>
								<input type="checkbox" name="searchCheck" id="item-type-phone" onClick="WRPAdminApp.pagescript.searchTypeChecked(this);"/><label>Phones</label>
								<input type="checkbox" name="searchCheck" id="item-type-sim" onClick="WRPAdminApp.pagescript.searchTypeChecked(this);"/><label>SIM</label>
								<input type="checkbox" name="searchCheck" id="instock" onClick="WRPAdminApp.pagescript.searchTypeChecked(this);" /><label>In-stock</label>
								<label style="margin-left:20px;">Category</label>
								<select id="inven-serialized-items-search-category" style="width:100px" onchange="WRPAdminApp.pagescript.getCategoriesDicListByParentSID(this.value, 0, 'inven-serialized-items-search-category-sub');">
								 	<option value="0" selected> ALL</option>
								 	<option value="1" > PHONE</option>
								 	<option value="3" > SIM CARD</option>
								 </select>
								 <select id="inven-serialized-items-search-category-sub" style="width:100px" onchange="">
								 	<option value="0" selected> ALL</option>
								 </select>
								<input type="text" class="jqx-text-input" id="inven-serialized-items-search-keyword" placeholder="keyword" style="width:120px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getSerializedItemDictList(); }"/>
								<div class="jqx-plain-button" id="inven-serial-items-search-btn" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getSerializedItemDictList);"
									style="display:inline-block;width:70px;">Search</div>
								<div class="jqx-plain-button" id="excel-serialized-items"
									style="display:inline-block;width:50px;">Excel</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px;">
							<div style="margin-top: 3px; height: calc(100% - 10px);">
								<div id="jqx-serialized-items"></div>
							</div>
						</div>
					</div>
					<div style="height: 39%">
						<div class="jqx-tab-panel">
							<ul>
								<li>Detail</li>
								<li>Serial No.</li>
								<li>PO History</li>
								<li>Sales History</li>
								<li>Promotion Price History</li>
							</ul>
							<div class="plain-01-panel"
								style="width: 100%; height: 100%; overflow: auto;">
								<div class="title-wrapper">
									<div class="title">Item Detail</div>
									<div class="left-input-area"></div>
									<div class="right-input-area"></div>
								</div>
								<div class="content-wrapper" style="padding-top: 3px;">
									<div class="tab-content activate" tabname="profile">
										<div class="line" id="serialized-profile-container">
											<div class="item-image"
												id="serialized-item-profile-image-view" onclick=""></div>
											<!-- <form id="serialized-item-profile-image-form" method="post" enctype="multipart/form-data" style="display: none;">
	                                            <input type="file" name="itemImageFile" id="serialized-item-profile-image-file" onchange="WRPAdminApp.pagescript.setSerializedItemImagePreview();"/>
	                                        </form> -->
											<div class="line">
												<div class="grid-3">Item Code</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-item-code" readonly/>
												</div>
												<div class="grid-3">Model</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-model" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Description</div>
												<div class="grid-9">
													<input type="text" id="serialized-item-description" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Company / Carrier</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-distributor" readonly/>
												</div>
												<div class="grid-3">Manufacturer</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-manufacturer" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Category</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-category" readonly/>
													<!-- <select id="serialized-item-category"
														onchange="WRPAdminApp.pagescript.getCategoriesDicListByParentSID(this.value, undefined, 'serialized-item-sub-category');"></select>
													 -->
												</div>
												<div class="grid-3">Sub Category</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-sub-category" readonly/>
													<!-- <select id="serialized-item-sub-category"></select> -->
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Color</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-color" readonly/>
												</div>
												<div class="grid-3">Condition</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-condition" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">SKU</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-sku" readonly/>
												</div>
												<div class="grid-3">Item Type</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-item-type" readonly/>
													<!-- <select id="serialized-item-item-type">
														<option value="0">Phone</option>
	                                                    <option value="1">Sim Card</option>
	                                                    <option value="2">Accessory (Serialized)</option>
	                                                    <option value="3">Accessory (non-Serialized)</option>
													</select> -->
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Item Cost</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-item-cost" readonly/>
												</div>

												<div class="grid-3">Vendor</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-vendor" readonly/>
													<!--<select id="serialized-item-vendor">
														 <option value="0">Phone</option>
	                                                    <option value="1">Sim Card</option>
	                                                    <option value="2">Accessory (Serialized)</option>
	                                                    <option value="3">Accessory (non-Serialized)</option> 
													</select>-->
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Retail Price</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-retail-price" readonly/>
												</div>
												<div class="grid-3">Wholesale Price</div>
												<div class="grid-3">
													<input type="text" id="serialized-item-wholesale-price" readonly/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Serial No.</div>
									<div class="left-input-area"></div>
									<div class="right-input-area">
										<div class="jqx-plain-button" id="excel-serial-no-list" style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper"
									style="padding-top: 3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-serial-no"></div>
								</div>
							</div>
							<!-- 170207 jh : PO, SALES, Promotion price ?�의 history 추�?. -->
							<!-- PO History -->
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">PO History</div>
									<div class="left-input-area"></div>
									<div class="right-input-area" style="width: 720px; margin-right: -30px;">
										<div class="line" style="overflow: hidden;">
											<div class="grid-1-5" style="width: 65px;">
												<div class="jqx-radio-button" id="item-porder-radio-1" groupName="item-po-group">1 Week</div>
											</div>
											<div class="grid-1-5" style="width: 65px;">
												<div class="jqx-radio-button" id="item-porder-radio-2" groupName="item-po-group">1 Month</div>
											</div>
											<div class="grid-2" style="width: 90px;">
												<div class="jqx-radio-button" id="item-porder-radio-3" groupName="item-po-group">3 Months</div>
											</div>
											<div class="grid-2-5" style="margin-left: 0px;width: 110px;">
												<div class="jqx-datetime-input" id="item-po-search-start-date"></div>
											</div>
											<div class="grid-2-5" style="margin-left: 7px;width: 110px;">
												<div class="jqx-datetime-input" id="item-po-search-end-date"></div>
											</div>
											<div class="grid-2" style="margin-left: 5px;width:100px;">
												<div class="jqx-plain-button" style="width:70px" onclick="WRPAdminApp.pagescript.getPoHistoryBySerialItem(WRPAdminApp.pagescript._selectedSerializedItemSid);">Apply</div>
											</div>
											<div class="grid-2" style="margin-left: 0px;">
												<div class="jqx-plain-button" id="excel-po-history" style="float: right;">Export to Excel</div>
											</div>
										</div>
									</div>
								</div>
								<div class="content-wrapper"
									style="padding-top: 3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-po-history"></div>
								</div>
							</div>

							<!--  Sales History -->
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Sales History</div>
									<div class="left-input-area"></div>
									<div class="right-input-area" style="width: 610px;">
										<div class="line" style="overflow: hidden;">
											<div class="grid-1-5" style="width:70px;">
												<div class="jqx-radio-button"
													id="serialized-item-history-radio-1" groupName="serialized-item-history">1 Week</div>
											</div>
											<div class="grid-1-5" style="width:70px;">
												<div class="jqx-radio-button"
													id="serialized-item-history-radio-2" groupName="serialized-item-history">1 Month</div>
											</div>
											<div class="grid-1-5" style="width:80px;">
												<div class="jqx-radio-button"
													id="serialized-item-history-radio-3" groupName="serialized-item-history">3 Months</div>
											</div>
											<div class="grid-2-5" style="width:120px;">
												<div class="jqx-datetime-input"
													id="serialized-item-search-start-date"></div>
											</div>
											<div class="grid-2-5" style="width:120px;">
												<div class="jqx-datetime-input"
													id="serialized-item-search-end-date"></div>
											</div>
											<div class="grid-2-5" style="width:70px;">
												<div class="jqx-plain-button" id="excel-sales-history" style="display:inline-block;width:70px">Excel</div>
											</div>
										</div>
										<!-- <div class="btn sky" id="excel-sales-history"
										style="float: right;">Export to Excel</div> -->
									</div>
								</div>
								<div class="content-wrapper"
									style="padding-top: 3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-sales-history"></div>
								</div>
							</div>

							<!-- Promotion Price History -->
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Promotion Price History</div>
									<div class="left-input-area"></div>
									<div class="right-input-area">
										<div class="jqx-plain-button" id="excel-price-history"
											style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper"
									style="padding-top: 3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-price-history"></div>
								</div>
							</div>
							<!-- /// -->
						</div>
					</div>
				</div>
				<div class="jqx-horizontal-split-panel">
					<div class="plain-01-panel" style="height: 60%">
						<div class="title-wrapper">
							<div class="title">Accessories</div>
							<div class="sub-title">information Management</div>
							<div class="left-input-area">
								<div class="jqx-plain-button" style="display:inline-block;width:100px;" onclick="WRPAdminApp.pagescript.initSerializedItemDictInfo();">+ ADD ITEM</div>
							</div>
							<div class="right-input-area">
								<label>Item Type</label>
								<input type="checkbox" name="searchCheck2" id="item-type-acc" onClick="WRPAdminApp.pagescript.searchTypeChecked(this);"/><label>Accessories</label>
								<input type="checkbox" name="searchCheck2" id="acc-instock" onClick="WRPAdminApp.pagescript.searchTypeChecked(this);" /><label>In-stock</label>
								<label style="margin-left:20px;">Category</label>
								<select id="inventory-accessory-category" style="width:100px" onchange="WRPAdminApp.pagescript.getCategoriesDicListByParentSID(this.value, 0, 'inventory-accessory-category-sub');">
								 	<option value="0" selected> ALL</option>
								 	<option value="4" > ACCESSORYS</option>
								 </select>
								 <select id="inventory-accessory-category-sub" style="width:100px" onchange="">
								 	<option value="0" selected> ALL</option>
								 </select>
								<input type="text" class="jqx-text-input" id="inven-accessory-search-keyword" placeholder="keyword" style="width:120px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getAccessoryItemDictList(); }"/>
								<div class="jqx-plain-button" id="inven-accessory-search-btn" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getAccessoryItemDictList);" style="display:inline-block;width:70px;">Search</div>
								<div class="jqx-plain-button" id="excel-inventory-accessory-list" style="display:inline-block;width:50px;">Excel</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-inventory-items-accessory-list"></div>
						</div>
					</div>
					<div style="height: 39%">
						<div class="jqx-tab-panel">
							<ul>
								<li>Profile</li>
								<li>PO History</li>
								<li>sales History</li>
							</ul>
							<div class="plain-01-panel" style="overflow: auto;">
								<div class="title-wrapper">
									<div class="title">Accessory Item Info</div>
								</div>
								<div class="content-wrapper" style="padding-top: 3px;">
									<div class="tab-content" tabname="profile">
										<div class="line" id="accessory-profile-container">
											<div class="item-image"
												id="accessory-item-profile-image-view"
												onclick="try{ document.getElementById('serialized-item-profile-image-file').click(); }catch(e){}">
											</div>
											<!-- <form id="accessory-item-profile-image-form" method="post"
												enctype="multipart/form-data" style="display: none;">
												<input type="file" id="accessory-item-profile-image-file"
													onchange="" />
											</form> -->
											<div class="line">
												<div class="grid-3">Item Code</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-item-code" readonly/>
												</div>
												<div class="grid-3">Model</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-model" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Description</div>
												<div class="grid-9">
													<input type="text" id="accessory-item-description" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Company / Carrier</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-distributor" readonly/>
												</div>
												<div class="grid-3">Manufacturer</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-manufacturer" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Category</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-category" readonly/>
												<!-- 
													<select id="accessory-item-category"
														onchange="WRPAdminApp.pagescript.getCategoriesDicListByParentSID(this.value, undefined, 'accessory-item-sub-category');"></select>
														 -->
												</div>
												<div class="grid-3">Sub Category</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-sub-category" readonly/>
													<!-- <select id="accessory-item-sub-category"></select> -->
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Color</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-color" readonly/>
												</div>
												<div class="grid-3">Condition</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-condition" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">SKU</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-sku" readonly/>
												</div>
												<div class="grid-3">Item Type</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-item-type" readonly/>
													<!--<select id="accessory-item-item-type">
														 <option value="0">Phone</option>
														<option value="1">Sim Card</option>
														<option value="2">Accessory (Serialized)</option>
														<option value="3" selected>Accessory</option> 
													</select>-->
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Item Cost</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-item-cost" readonly/>
												</div>
												<div class="grid-3">Qty</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-qty" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Retail Price</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-retail-price" readonly/>
												</div>
												<div class="grid-3">Wholesale Price</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-wholesale-price" readonly/>
												</div>
											</div>
											<div class="line">
												<div class="grid-3">Vendor</div>
												<div class="grid-3">
													<input type="text" id="accessory-item-vendor" readonly/>
													<!--<select id="accessory-item-vendor">
														 <option value="0">Phone</option>
	                                                    <option value="1">Sim Card</option>
	                                                    <option value="2">Accessory (Serialized)</option>
	                                                    <option value="3">Accessory (non-Serialized)</option> 
													</select>-->
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- 170207 jh : PO, SALES, Promotion price ?�의 history 추�?. -->
							<!-- PO History -->
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">PO History</div>
									<div class="left-input-area"></div>
									<div class="right-input-area">
										<div class="jqx-plain-button" id="excel-accessory-po-history"
											style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper"
									style="padding-top: 3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-accessory-po-history"></div>
								</div>
							</div>

							<!--  Sales History -->
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Sales History</div>
									<div class="left-input-area"></div>
									<div class="right-input-area" style="width: 700px;">
										<div class="line" style="overflow: hidden;">
											<div class="grid-1-5">
												<div class="jqx-radio-button"
													id="accessory-sales-history-radio-1" groupName="accessory-sales-history">1 Week</div>
											</div>
											<div class="grid-1-5">
												<div class="jqx-radio-button"
													id="accessory-sales-history-radio-2" groupName="accessory-sales-history">1 Month</div>
											</div>
											<div class="grid-1-5">
												<div class="jqx-radio-button"
													id="accessory-sales-history-radio-3" groupName="accessory-sales-history">3 Months</div>
											</div>
											<div class="grid-2-5">
												<div class="jqx-datetime-input"
													id="accessory-sales-search-start-date"></div>
											</div>
											<div class="grid-2-5">
												<div class="jqx-datetime-input"
													id="accessory-sales-search-end-date"></div>
											</div>
											<div class="grid-2-5">
												<div class="jqx-plain-button" id="excel-accessory-sales-history"
													style="float: right;">Export to Excel</div>
											</div>
										</div>
									</div>
								</div>
								<div class="content-wrapper"
									style="padding-top: 3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-accessory-sales-history"></div>
								</div>
							</div>

							<!-- /// -->
						</div>
					</div>
				</div>
				<div class="jqx-horizontal-split-panel">
					<div class="plain-01-panel" style="height: 60%">
						<div class="title-wrapper">
							<div class="title">Service Items</div>
							<div class="sub-title">information Management</div>
							<div class="left-input-area">
								<div class="jqx-plain-button" style="display:inline-block;width:100px;" onclick="WRPAdminApp.pagescript.initFeeInfo();">+ ADD ITEM</div>
								<div class="jqx-plain-button" style="display:inline-block;width:60px;" onclick="WRPAdminApp.pagescript.syncFeeList();">Sync</div>
							</div>
							<div class="right-input-area">
								<input type="text" class="jqx-text-input" id="inven-service-items-search-keyword" placeholder="keyword" style="width:150px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getFeeList(); }"/>
								<div class="jqx-plain-button" id="search-inventory-service-items" style="display:inline-block;width:80px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getFeeList);">Search</div>
								<div class="jqx-plain-button" id="excel-inventory-service-items" style="display:inline-block;width:60px;">Excel</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-inventory-items-service-list"></div>
						</div>
					</div>
					<div style="height: 39%">
						<div class="jqx-tab-panel">
							<ul>
								<li>Profile</li>
								<li>Sales History</li>
							</ul>
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Service Item Info</div>
								</div>
								<div class="content-wrapper" style="margin: 7px 0px 0px 40px;">
									<div class="line" id="service-item-profile-container">
										<div class="line">
											<div class="grid-3">Item Type</div>
											<div class="grid-9">
												<input type="text" id="service-item-type" readonly/>

											</div>
										</div>
										<div class="line">
											<div class="grid-3">Name</div>
											<div class="grid-9">
												<input type="text" id="service-item-name" readonly/>
											</div>
										</div>
										<div class="line">
											<div class="grid-3">Description</div>
											<div class="grid-9">
												<input type="text" id="service-item-description" readonly/>
											</div>
										</div>
										<div class="line">
											<div class="grid-3">Amount</div>
											<div class="grid-3">
												<input type="text" id="service-item-amount" readonly/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- 170207 jh : SALES history 추�?. -->
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Sales History</div>
									<div class="left-input-area"></div>
									<div class="right-input-area" style="width: 700px;">
										<div class="line" style="overflow: hidden;">
											<div class="grid-1-5">
												<div class="jqx-radio-button"
													id="service-sales-history-radio-1" groupName="service-sales-history">1 Week</div>
											</div>
											<div class="grid-1-5">
												<div class="jqx-radio-button"
													id="service-sales-history-radio-2" groupName="service-sales-history">1 Month</div>
											</div>
											<div class="grid-1-5">
												<div class="jqx-radio-button"
													id="service-sales-history-radio-3" groupName="service-sales-history">3 Months</div>
											</div>
											<div class="grid-2-5">
												<div class="jqx-datetime-input"
													id="service-sales-search-start-date"></div>
											</div>f
											<div class="grid-2-5">
												<div class="jqx-datetime-input"
													id="service-sales-search-end-date"></div>
											</div>
											<div class="grid-2-5">
												<div class="jqx-plain-button" id="excel-service-sales-history"
													style="float: right;">Export to Excel</div>
											</div>
										</div>
									</div>
								</div>
								<div class="content-wrapper"
									style="padding-top: 3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-service-sales-history"></div>
								</div>
							</div>
							<!-- /// -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="plain-01-panel" panelname="return" style="display: none;">
			<div class="title-wrapper">
				<div class="title">Return</div>
				<div class="left-input-area"></div>
				<div class="right-input-area" style="width:650px;">
                   	<div class="line" style="overflow: hidden;">
						<div class="grid-1" style="width:70px;">
							<div class="jqx-radio-button" id="inventory-return-radio-1" groupName="inventory-return">1 Week</div>
						</div>
						<div class="grid-1" style="width:70px;">
							<div class="jqx-radio-button" id="inventory-return-radio-2" groupName="inventory-return">1 Month</div>
						</div>
						<div class="grid-1-5" style="width:90px;">
							<div class="jqx-radio-button" id="inventory-return-radio-3" groupName="inventory-return">3 Month</div>
						</div>
						<div class="grid-2" style="margin-left:0px;">
							<div class="jqx-datetime-input" id="inventory-return-start-date"></div>
						</div>
						<div class="grid-2" style="margin-left:7px;">
							<div class="jqx-datetime-input" id="inventory-return-end-date"></div>
						</div>
						<div class="grid-1_5" style="margin-left:7px;">
							<div class="jqx-plain-button" id="inventory-return-apply" style="width:80px;" onclick="WRPAdminApp.pagescript.getReturnedItemsList();">Apply</div>
						</div>
						<div class="grid-1_5" style="margin-left:5px;">
							<div class="jqx-plain-button" id="excel-inventory-returned-list" style="width:80px;">Excel</div>
						</div>
						
					</div>
                   </div>
			</div>
			<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
				<div id="jqx-inventory-returned-list"></div>
			</div>
		</div>
		<div class="tab-panel" panelname="inventory_transfer"
			style="display: none; width: 99.8%; height: calc(100% - 105px);">
			<div class="flow-panel" style="height: 100px;">
				<div class="upper-image-flow"
					onclick="$('#jqxTabs').jqxTabs('select', 0);"
					style="background-image: url('img/icon/two_boxes_01.png'); margin-right: 40px;">
					Trans. History</div>
				<div class="upper-image-flow"
					onclick="WRPAdminApp.openPopupInPage('reqTransferInputIDContainer');"
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
							<div class="btn sky" id="excel-inventory-transfer-history"
								style="float: right;">Export to Excel</div>
							<div style="width: 200px; float: right;">
								<div class="jqx-datetime-range-input"
									id="inventory-transfer-history-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
						<div id="jqx-inventory-transfer-history-list"></div>
					</div>
				</div>
				<div class="plain-01-panel">
					<div class="title-wrapper">
						<div class="title">Receive</div>
						<div class="sub-title">Transfer Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area">
							<div class="btn sky" id="excel-inventory-transfer-ship-history"
								style="float: right;">Export to Excel</div>
							<div style="width: 200px; float: right;">
								<div class="jqx-datetime-range-input"
									id="inventory-transfer-ship-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
						<div id="jqx-inventory-transfer-ship-list"></div>
					</div>
				</div>
				<div class="plain-01-panel">
					<div class="title-wrapper">
						<div class="title">Approval</div>
						<div class="sub-title">Transfer Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area">
							<div class="btn sky" id="excel-inventory-transfer-req-history"
								style="float: right;">Export to Excel</div>
							<div style="width: 200px; float: right;">
								<div class="jqx-datetime-range-input"
									id="inventory-transfer-req-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
						<div id="jqx-inventory-transfer-req-list"></div>
					</div>
				</div>
				<div class="plain-01-panel">
					<div class="title-wrapper">
						<div class="title">Ship</div>
						<div class="sub-title">Transfer Management</div>
						<div class="left-input-area"></div>
						<div class="right-input-area">
							<div class="btn sky" id="excel-inventory-transfer-appr-history"
								style="float: right;">Export to Excel</div>
							<div style="width: 200px; float: right;">
								<div class="jqx-datetime-range-input"
									id="inventory-transfer-appr-date"></div>
							</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
						<div id="jqx-inventory-transfer-appr-list"></div>
					</div>
				</div>
			</div>
		</div>

		<!--UPDATE BANGWOORI -->
		<div class="jqx-horizontal-split-panel" id="bin-split-panel"
			panelname="bin_management" style="display: none; height: 100%;">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Bin Management</div>
					<div class="left-input-area">
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.initBinInfo();">+ ADD BIN</div>
					</div>
					<div class="right-input-area">
						<div class="search-container">
							<input type="text" placeholder="Keyword"
								id="inventory-bin-search-keyword"
								onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getBinList(); }" />
							<div class="right-btn"
								onclick="WRPAdminApp.pagescript.getBinList();"></div>
						</div>
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
									<input type="text" id="bin-info-type" />
								</div>
							</div>
							<div class="line" style="margin-left: 0px">
								<div class="grid-3">Description</div>
								<div class="grid-9">
									<input type="text" id="bin-info-description" />
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
							<div class="btn sky" id="excel-bin-items" style="float: right;">Export
								to Excel</div>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(70% - 2px);">
						<div id="jqx-inventory-bin-items-list"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="jqx-horizontal-split-panel" id="reasons-split-panel"
			panelname="return_reasons" style="display: none; height: 100%;">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Return Reasons</div>
					<div class="left-input-area">
						<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.addRule();">+
							NEW RULE</div>
					</div>
					<div class="right-input-area">
						<!-- <div class="search-container">
							<input type="text" placeholder="Keyword"
								id="inventory-bin-search-keyword"
								onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getBinList(); }" />
							<div class="right-btn"
								onclick="WRPAdminApp.pagescript.getBinList();"></div>
						</div> -->
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-return-reason-list"></div>
				</div>
			</div>
			<div class="jqx-tab-panel">
				<ul>
					<li>Profile</li>
				</ul>
				<div class="plain-01-panel" style="width: 100%; height: 100%;">
					<div class="title-wrapper">
						<div class="title">Return Rule Info</div>
					</div>
					<div class="content-wrapper">
						<div class="line" id="rule-profile-container"
							style="margin: 7px 0px 0px 10px; width: 900px;">
							<div class="line">
								<div class="grid-3">Reason</div>
								<div class="grid-3">
									<input type="text" id="rule-info-name" style="width: 100%" readonly/>
								</div>
							</div>
							<div class="line" style="margin-left: 0px">
								<div class="grid-3">Description</div>
								<div class="grid-3">
									<input type="text" id="rule-info-description"
										style="width: 100%" readonly/>
								</div>
							</div>
							<div class="line" style="margin-left: 0px">
								<div class="grid-3">Destination</div>
								<div class="grid-3">
									<select id="rule-info-destination" style="width: 100%"></select>
								</div>
							</div>
							<div class="line" style="margin-left: 0px">
								<div class="grid-3">Update Date</div>
								<div class="grid-3">
									<input type="text" id="rule-info-date" readonly
										style="width: 100%" />
								</div>
								<div class="grid-3">Updater</div>
								<div class="grid-3">
									<input type="text" id="rule-info-updater" readonly
										style="width: 100%" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--UPDATE BANGWOORI END -->

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
									onclick="WRPAdminApp.pagescript.informTransferInfoByTransferId();">Next</div>
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
										<input type="text" placeholder="Keyword" />
										<div class="right-btn"></div>
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
									onclick="WRPAdminApp.pagescript.nextStepInReqTransfer();">Next</div>
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
								<div class="left-area">Select Items</div>
								<div class="right-area text_right">
									<div class="search-container">
										<input type="text" placeholder="Keyword" />
										<div class="right-btn"></div>
									</div>
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="150">
									<thead>
										<tr>
											<th width="120">SKU</th>
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
										onclick="WRPAdminApp.pagescript.saveTransfer();">Save</div>
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
									<div class="search-container">
										<input type="text" placeholder="Keyword" />
										<div class="right-btn"></div>
									</div>
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="325">
									<thead>
										<tr>
											<th width="120">SKU</th>
											<th width="120">Name</th>
											<th>Desc.</th>
											<th width="35">Req<br />Qty
											</th>
											<th width="35">Appr<br />Qty
											</th>
											<th width="50">Submit</th>
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
									onclick="WRPAdminApp.pagescript.setTransferStatus(this, 1);">Reject</div>
							</div>
							<div class="grid-6"
								style="text-align: right; padding-right: 35px;">
								<div class="left_bg_btn check-01"
									onclick="WRPAdminApp.pagescript.setTransferStatus(this, 2);">Save</div>
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
									<div class="grid-2">SKU</div>
									<div class="grid-4">
										<input type="text" id="transfer-appr-serialized-item-sku"
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
									<div class="search-container">
										<input type="text" placeholder="Keyword"
											id="transfer-appr-serial-no"
											onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo(); }" />
										<div class="right-btn"
											onclick="WRPAdminApp.pagescript.transferApprGetItemInInvenBySerialNo();">
										</div>
									</div>
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="200">
									<thead>
										<tr>
											<th>SKU</th>
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
									onclick="WRPAdminApp.pagescript.saveTransferApprSerializedItems();">Save</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="jqx-custom-window" id="serialized-item-window">
		<div role="title">Add</div>
		<div id="serialized-profile-add-container" style="padding-top: 15px;">
			<form id="serialized-item-profile-image-form" method="post"
				enctype="multipart/form-data" style="display: none;">
				<input type="file" name="itemImageFile"
					id="serialized-item-profile-image-file"
					onchange="WRPAdminApp.pagescript.setSerializedItemImagePreview();" />
			</form>
			<div class="item-image" id="serialized-item-profile-image"
				onclick="try{ document.getElementById('serialized-item-profile-image-file').click(); }catch(e){}">
			</div>
			<div class="line">
				<div class="grid-3">Item Code</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-item-code-pop"
						style="width: 85%;" />
				</div>
				<div class="grid-3">Model</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-model-pop"
						style="width: 85%;" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Description</div>
				<div class="grid-9">
					<input type="text" id="serialized-item-description-pop"
						style="width: 95.5%;" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Company / Carrier</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-distributor-pop"
						style="width: 85%;" />
				</div>
				<div class="grid-3">Manufacturer</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-manufacturer-pop"
						style="width: 85%;" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Category</div>
				<div class="grid-3">
					<select id="serialized-item-category-pop" style="width: 85%;"
						onchange="WRPAdminApp.pagescript.getCategoriesDicListByParentSID(this.value, undefined, 'serialized-item-sub-category-pop');"></select>
				</div>
				<div class="grid-3">Sub Category</div>
				<div class="grid-3">
					<select id="serialized-item-sub-category-pop" style="width: 85%;"></select>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Color</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-color-pop"
						style="width: 85%;" />
				</div>
				<div class="grid-3">Condition</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-condition-pop"
						style="width: 85%;" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">SKU</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-sku-pop" style="width: 85%;" />
				</div>
				<div class="grid-3">Item Type</div>
				<div class="grid-3">
					<select id="serialized-item-item-type-pop" style="width: 85%;">
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Item Cost</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-item-cost-pop"
						style="width: 85%;" />
				</div>
				<div class="grid-3">Vendor</div>
				<div class="grid-3">
					<select id="serialized-item-vendor-pop">
					
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Retail Price</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-retail-price-pop"
						style="width: 85%;" />
				</div>
				<div class="grid-3">Wholesale Price</div>
				<div class="grid-3">
					<input type="text" id="serialized-item-wholesale-price-pop"
						style="width: 85%;" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:90px;display:inline-block;" 
					onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.saveSerializedItem);">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="accessory-edit-window">
		<div role="title">Edit</div>
		<div id="accessory-add-container">
			<div class="item-image" id="accessory-item-profile-image"
				onclick="try{ document.getElementById('accessory-item-profile-image-file').click(); }catch(e){}">
			</div>
			<form id="accessory-item-profile-image-form" method="post"
				enctype="multipart/form-data" style="display: none;">
				<input type="file" id="accessory-item-profile-image-file"
					name="itemImageFile"
					onchange="WRPAdminApp.pagescript.setAccessoryItemImagePreview();" />
			</form>
			<div class="line">
				<div class="grid-3">Item Code</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-item-code-pop" />
				</div>
				<div class="grid-3">Model</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-model-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Description</div>
				<div class="grid-9">
					<input type="text" id="accessory-item-description-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Company / Carrier</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-distributor-pop" />
				</div>
				<div class="grid-3">Manufacturer</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-manufacturer-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Category</div>
				<div class="grid-3">
					<select id="accessory-item-category-pop"
						onchange="WRPAdminApp.pagescript.getCategoriesDicListByParentSID(this.value, undefined, 'accessory-item-sub-category-pop');"></select>
				</div>
				<div class="grid-3">Sub Category</div>
				<div class="grid-3">
					<select id="accessory-item-sub-category-pop"></select>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Color</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-color-pop" />
				</div>
				<div class="grid-3">Condition</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-condition-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">SKU</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-sku-pop" />
				</div>
				<div class="grid-3">Item Type</div>
				<div class="grid-3">
					<select id="accessory-item-item-type-pop">
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Item Cost</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-item-cost-pop" />
				</div>
				<div class="grid-3">Qty</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-qty-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Retail Price</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-retail-price-pop" />
				</div>
				<div class="grid-3">Wholesale Price</div>
				<div class="grid-3">
					<input type="text" id="accessory-item-wholesale-price-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Vendor</div>
				<div class="grid-3">
					<select id="accessory-item-vendor-pop">
					</select>
				</div>
			</div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:90px;display:inline-block;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.saveAccessoryItem);">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="service-items-edit-window">
		<div role="title">Edit</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line">
				<div class="grid-3">Item Type</div>
				<div class="grid-9">
					<input type="text" id="service-item-type-pop" />

				</div>
			</div>
			<div class="line">
				<div class="grid-3">Name</div>
				<div class="grid-9">
					<input type="text" id="service-item-name-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Description</div>
				<div class="grid-9">
					<input type="text" id="service-item-description-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-3">Amount</div>
				<div class="grid-3">
					<input type="text" id="service-item-amount-pop" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:90px;display:inline-block;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setFeeInfo);">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="rule-edit-window">
		<div role="title">Edit</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line" style="line-height: 20px;">
				<div class="grid-2">Reason</div>
				<div class="grid-3">
					<input type="text" id="rule-info-name-pop" />
				</div>
			</div>
			<div class="line" style="line-height: 20px;">
				<div class="grid-2">Description</div>
				<div class="grid-3">
					<input type="text" id="rule-info-description-pop" />
				</div>
			</div>
			<div class="line" style="line-height: 20px;">
				<div class="grid-2">Destination</div>
				<div class="grid-3">
					<select id="rule-info-destination-pop"></select>
				</div>
			</div>
			<div class="line" style="line-height: 20px;">
				<div class="grid-2">Update Date</div>
				<div class="grid-4">
					<input type="text" id="rule-info-date-pop" readonly />
				</div>
				<div class="grid-2">Updater</div>
				<div class="grid-2">
					<input type="text" id="rule-info-updater-pop" readonly />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="btn sky" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setRuleInfo);">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="return-invoice-viewer">
		<div role="title">INVOICE</div>
		<div class="plain-view">
			<div class="plain-content">
				<div class="line customer-info" style="font-size:12px;">
					<span>Customer Information</span><span>Account ID : <span class="font_bold" id="invoice-selected-customer-id"></span></span><span>Name : <span class="font_bold" id="invoice-selected-customer-name"></span></span><span>Address : <span class="font_bold" id="invoice-selected-customer-address"></span></span>
				</div>
				<div class="line" style="height: 340px;">
					<div id="jqx-return-invoice-item-list"></div>
				</div>
				<div class="line" style="height: 95px;">
					<div class="invoice-info-box">
						<div class="grid-4">
							<div style="width: 10%; line-height: 650%; text-align: center; font-weight: bold; font-size: 11px; float: left;">Note</div>
							<div style="width: 86%; height:100%;float: right;"><textarea class="fill_width_parent fill_height_parent" id="return-invoice-note" style="width:100%;height:100%;" readonly></textarea></div>
						</div>
						<div class="grid-8" style="margin-top: 8px;">
							<div class="grid-4" style="font-size: 13px; text-align: right;">
								<div><span>Qty : <span id="return-invoice-info-total-qty">0</span></span></div>
								<div><span>Discount : <span id="return-invoice-total-discount">$0.00</span></span></div>
								<div><span>Taxes : <span id="return-invoice-total-taxes">$0.00</span></span></div>
							</div>
							<div class="grid-8" style="font-size: 40px; text-align: right;">
								Total : <span id="return-invoice-info-total-price">$0.00</span>
							</div>
						</div>
					</div>
				</div>
				<div class="line">
				</div>
				<div class="line">
					<div class="jqx-plain-button" style="float:right;height:33px;line-height:33px;" onclick="$('#return-invoice-viewer').jqxWindow('close');">Close</div>
				</div>
			</div>
		</div>
	</div>
</div>
