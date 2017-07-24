<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ include file="../ajax/common.jsp" %>
<%
	session.setAttribute("wrp_admin_last_loaded_page", "item_management");
	String storeId = MyRequestUtil.getString(request, "storeId", null);
    //String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
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
<div pagename="item_management" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="item_management"
			onclick="WRPAdminApp.pagescript.changePanelBySubmenu('item_management');">Item Management</div>
		<div class="border"></div>
		<div class="submenu" panelname="price_change"
			onclick="WRPAdminApp.pagescript.changePanelBySubmenu('price_change');">Price Change</div>
		<div class="border"></div>
		<div class="submenu" panelname="status_change"
			onclick="WRPAdminApp.pagescript.changePanelBySubmenu('status_change');">Status Change</div>
		<div class="border"></div>
		<div class="submenu" panelname="item_download"
			onclick="WRPAdminApp.pagescript.changePanelBySubmenu('item_download');">Item Download</div>
		<div class="border"></div>
		<div class="submenu" panelname="item_category"
			onclick="WRPAdminApp.pagescript.changePanelBySubmenu('item_category');">Item Category</div>
	</div>
	<div class="panels">
		<div class="plain-01-panel" panelname="item_management" style="display: block; width: 99.8%; height: 99.6%">
			<div class="jqx-horizontal-split-panel" style="height: 100%;">			
				<div>		
					<div class="jqx-tab-panel" id="item-management-tab-panel" style="height: 100%;">
						<ul>
							<li>PHONE</li>
							<li>SIM</li>
							<li>ACCESSORY</li>
							<li>SERVICE</li>
						</ul>	
						<div class="plain-01-panel">
							<div class="title-wrapper">	
								<div class="add-item-button-container">
									<div class="jqx-plain-button" style="display:inline-block; width: 100%" onclick="WRPAdminApp.pagescript.openAddItemFromWRPDBWindow(0);">ADD ITEM</div>
								</div>						
								<div class="line after-add-item-button-container">
									<div class="grid-9">
										<input type="text" style="width:100%;height: 27px;" id="item-management-phone-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getItemManagerPhoneList(); }"/>
									</div>
									<div class="grid-3">
										<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getItemManagerPhoneList();">SEARCH</div>
									</div>
								</div>
								<div class="right-input-area">
									<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.pagescript.getItemManagerRefresh(0);">Refresh</div>
								</div>
							</div>
							<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height:calc(100% - 53px);">								
								<div id="item-management-phone-list"></div>
							</div>
						</div>
						<div class="plain-01-panel" style="height: 100%;">
							<div class="title-wrapper">	
								<div class="add-item-button-container">
									<div class="jqx-plain-button" style="display:inline-block; width: 100%" onclick="WRPAdminApp.pagescript.openAddItemFromWRPDBWindow(1);">ADD ITEM</div>
								</div>						
								<div class="line after-add-item-button-container">
									<div class="grid-9">
										<input type="text" style="width:100%;height: 27px;" id="item-management-sim-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getItemManagerSimList(); }"/>
									</div>
									<div class="grid-3">
										<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getItemManagerSimList();">SEARCH</div>
									</div>
								</div>
								<div class="right-input-area">
									<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.pagescript.getItemManagerRefresh(1);">Refresh</div>
								</div>
							</div>
							<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height:calc(100% - 53px);">				
								<div id="item-management-sim-list"></div>
							</div>
						</div>
						<div class="plain-01-panel" style="height: 100%;">
							<div class="title-wrapper">				
								<div class="add-item-button-container">
									<div class="jqx-plain-button" style="display:inline-block; width: 100%" onclick="WRPAdminApp.pagescript.openAddItemFromWRPDBWindow(3);">ADD ITEM</div>
								</div>						
								<div class="line after-add-item-button-container">
									<div class="grid-9">
										<input type="text" style="width:100%;height: 27px;" id="item-management-accessory-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getItemManagerAccessoryList(); }"/>
									</div>
									<div class="grid-3">
										<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getItemManagerAccessoryList();">SEARCH</div>
									</div>
								</div>
								<div class="right-input-area">
									<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.pagescript.getItemManagerRefresh(2);">Refresh</div>
								</div>
							</div>
							<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height:calc(100% - 53px);">			
								<div id="item-management-accessory-list"></div>
							</div>
						</div>
						<div class="plain-01-panel" style="height: 100%;">
							<div class="title-wrapper">	
								<div class="add-item-button-container">
									<div class="jqx-plain-button" style="display:inline-block; width: 100%" onclick="WRPAdminApp.pagescript.initAddItemWindow();">ADD ITEM</div>
								</div>						
								<div class="line after-add-item-button-container">
									<div class="grid-9">
										<input type="text" style="width:100%;height: 27px;" id="item-management-service-search-keyword"/>
									</div>
									<div class="grid-3">
										<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getItemManagerServiceList();">SEARCH</div>
									</div>
								</div>
								<div class="right-input-area">
									<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.pagescript.getItemManagerRefresh(3);">Refresh</div>
								</div>
							</div>
							<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height:calc(100% - 53px);">				
								<div id="item-management-service-list"></div>
							</div>
						</div>
					</div>				
				</div>
				<div class="jqx-tab-panel" style="height:50%">
					<ul>
						<li>DETAIL</li>
					</ul>
					<div class="plain-02-panel" style="height: 100%;">
						<div class="title-wrapper" style="margin: 0px 15px;border-bottom: 0px solid;">
							<div class="title" id="item-management-detail-item-description-in-title"></div>
						</div>
						
						<div class="content-wrapper item-management-detail-content" style="margin: 0px 10px;" id="item-management-detail-content">
							<div class="item-image" id="item-management-detail-content-item-image" style="background-position: center; background-size: contain; background-repeat: no-repeat;float: left; width: 140px; height: 160px;">
							</div>
							<div class="line panel-for-detail" >
									<div class="line">
										<div class="grid-2 title">
											TYPE:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-type">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											CODE:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-code">
											&nbsp;
										</div>
										<div class="grid-2 title">
											SKU:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-sku">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											MODEL:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-model">
											&nbsp;
										</div>
										<div class="grid-2 title">
											UPC:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-upc">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											DESCRIPTION:
										</div>
										<div class="grid-10 value gray" id="item-management-detail-content-item-description">
											&nbsp;
										</div>
									</div>
								</div>
								<div class="line panel-for-detail" >
									<div class="line">
										<div class="grid-2 title">
											CATEGORY:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-category">
											&nbsp;
										</div>
										<div class="grid-2 title">
											SUB-CATEGORY:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-sub-category">
											&nbsp;
										</div>
									</div>
								</div>
								<div class="line panel-for-detail" >
									<div class="line">
										<div class="grid-2 title">
											CARRIER:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-carrier">
											&nbsp;
										</div>
										<div class="grid-2 title">
											COLOR:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-color">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											MANUFACTURER:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-manufacturer">
											&nbsp;
										</div>
										<div class="grid-2 title">
											CONDITION:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-condition">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											VENDOR:
										</div>
										<div class="grid-4 value gray" id="item-management-detail-content-item-vendor">
											&nbsp;
										</div>
									</div>
								</div>
						</div>							
						
						<div class="content-wrapper item-management-detail-content" style="margin: 0px 10px; display: none;" id="item-management-service-detail-content">
							
							<div style="">
								<div class="line panel-for-detail" >
									<div class="line">
										<div class="grid-2 title">
											TYPE:
										</div>
										<div class="grid-3 value gray">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											CODE:
										</div>
										<div class="grid-3 value gray">
											&nbsp;
										</div>
										<div class="grid-2 title">
											SKU:
										</div>
										<div class="grid-3 value gray">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											MODEL:
										</div>
										<div class="grid-3 value gray">
											&nbsp;
										</div>
										<div class="grid-2 title">
											UPC:
										</div>
										<div class="grid-3 value gray">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											DESCRIPTION:
										</div>
										<div class="grid-9 value gray">
											&nbsp;
										</div>
									</div>
								</div>
								<div class="line panel-for-detail" >
									<div class="line">
										<div class="grid-2 title">
											CATEGORY:
										</div>
										<div class="grid-3 value">
											&nbsp;
										</div>
										<div class="grid-2 title">
											SUB-CATEGORY:
										</div>
										<div class="grid-3 value">
											&nbsp;
										</div>
									</div>
								</div>
								<div class="line panel-for-detail" >
									<div class="line">
										<div class="grid-2 title">
											CARRIER:
										</div>
										<div class="grid-3 value">
											&nbsp;
										</div>
										<div class="grid-2 title">
											COLOR:
										</div>
										<div class="grid-3 value">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											MANUFACTURER:
										</div>
										<div class="grid-3 value">
											&nbsp;
										</div>
										<div class="grid-2 title">
											CONDITION:
										</div>
										<div class="grid-3 value">
											&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-2 title">
											VENDOR:
										</div>
										<div class="grid-3 value">
											&nbsp;
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="plain-01-panel" panelname="price_change" style="display: none; width: 99.8%; height: 99.6%">
			<div class="content-wrapper" style="margin: 0px;height:100%;">
				<div class="jqx-tab-panel" id="item-management-price-change-tab-panel">
					<ul>
						<li>PHONE</li>
						<li>SIM</li>
						<li>ACCESSORY</li>
						<li>SERVICE</li>
					</ul>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">												
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="price-change-phone-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getPriceChangePhoneList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getPriceChangePhoneList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">								
							<div id="price-change-phone-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">											
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="price-change-sim-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getPriceChangeSimList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getPriceChangeSimList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">				
							<div id="price-change-sim-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">											
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="price-change-accessory-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getPriceChangeAccessoryList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getPriceChangeAccessoryList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">			
							<div id="price-change-accessory-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">											
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="price-change-service-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getPriceChangeServiceList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getPriceChangeServiceList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">				
							<div id="price-change-service-list"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="plain-01-panel" panelname="status_change" style="display: none; width: 99.8%; height: 99.6%">
			<div class="content-wrapper" style="margin: 0px;height:100%;">
				<div class="jqx-tab-panel">
					<ul>
						<li>PHONE</li>
						<li>SIM</li>
						<li>ACCESSORY</li>
						<li>SERVICE</li>
					</ul>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">											
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="status-change-phone-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getStatusChangePhoneList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getStatusChangePhoneList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">								
							<div id="status-change-phone-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">									
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="status-change-sim-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getStatusChangeSimList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getStatusChangeSimList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">				
							<div id="status-change-sim-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">									
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="status-change-accessory-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getStatusChangeAccessoryList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getStatusChangeAccessoryList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">			
							<div id="status-change-accessory-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="title-wrapper">									
							<div class="line">
								<div class="grid-2">
									<input type="text" style="width:100%;height: 27px;" id="status-change-service-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getStatusChangeServiceList(); }"/>
								</div>
								<div class="grid-2">
									<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getStatusChangeServiceList();">SEARCH</div>
								</div>
							</div>
						</div>
						<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height: calc(100% - 55px);">				
							<div id="status-change-service-list"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="plain-01-panel" panelname="item_download" style="display: none; width: 99.8%; height: 99.6%">
			<div class="content-wrapper" style="margin: 0px;height:100%;">
				<div class="jqx-tab-panel">
					<ul>
						<li>PHONE</li>
						<li>SIM</li>
						<li>ACCESSORY</li>
					</ul>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="line">
						</div>
						<div class="line">
							<div class="grid-1">
								&nbsp;
							</div>
							<div class="grid-10">
								<div class="jqx-plain-button" style="width:100%; height: 50px; line-height: 50px;" onclick="WRPAdminApp.pagescript.openDownloadItemFromWRPDBWindow(0);">Proceed Download (PHONE)</div>
							</div>
						</div>		
					</div>
					<div class="plain-01-panel" style="height: 100%;">	
						<div class="line">
						</div>						
						<div class="line">								
							<div class="grid-1">
								&nbsp;
							</div>
							<div class="grid-10">					
								<div class="jqx-plain-button" style="width:100%; height: 50px; line-height: 50px;" onclick="WRPAdminApp.pagescript.openDownloadItemFromWRPDBWindow(1);">Proceed Download (SIM)</div>
							</div>	
						</div>								
					</div>
					<div class="plain-01-panel" style="height: 100%;">
						<div class="line">
						</div>						
						<div class="line">								
							<div class="grid-1">
								&nbsp;
							</div>
							<div class="grid-10">	
								<div class="jqx-plain-button" style="width:100%; height: 50px; line-height: 50px;" onclick="WRPAdminApp.pagescript.openDownloadItemFromWRPDBWindow(2);">Proceed Download (ACCESSORY)</div>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
		
		<div class="plain-01-panel" panelname="item_category"  style="display: none;">
            <div class="line" style="padding: 10px 30px; height:100%;">
                <div class="grid-6">
                    <div class="plain-01-panel" style="height:100%;">
                        <div class="title-wrapper">
                            <div class="title">
                                Category List
                            </div>
                            <div class="right-input-area">
                                <!-- <div class="btn sky" onclick="WRPAdminApp.pagescript.initCategoryInfo();">+ NEW CATEGORY</div> -->
                            </div>
                        </div>
                        <div style="height:calc(100% - 53px);width: 92%; margin: 3px auto;">
							<div id="jqx-sys-category-list"></div>
						</div>
                    </div>
                </div>
                <div class="grid-6">
                    <div class="plain-01-panel" style="height:100%;">
                        <div class="title-wrapper">
                            <div class="title">
                                Sub Category List
                            </div>
                            <div class="right-input-area">
                                <div class="jqx-plain-button" style="width:185px;" onclick="WRPAdminApp.pagescript.initSubCategoryInfo();">+ NEW SUB CATEGORY</div>
                            </div>
                        </div>
                        <div style="height:calc(100% - 53px);width: 92%; margin: 3px auto;">
							<div id="jqx-sys-sub-category-list"></div>
						</div>
                    </div>
                </div>
            </div>
        </div>
	</div>
	<div class="jqx-custom-window item-management-window" id="item-management-edit-item-window">
	 	<div role="title">
	 		ITEM INFORMATION
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">	 		
	 		<div class="item-management-detail-content">
				<div id="item-edit-window-content-item-image" onclick="document.getElementById('item-edit-item-image-file').click();" style="background-position: center; background-size: contain; background-repeat: no-repeat; float: left; width: 180px; height: 215px; border: rgba(127, 127, 127, 1) 1px solid;">
				</div>
				<form id="item-edit-window-set-item-image-form" style="display: none;" method="post" enctype="multipart/form-data">
					<input type="file" id="item-edit-item-image-file"
						name="itemImageFile"
						onchange="WRPAdminApp.pagescript.onItemImageFileChange();" />
					<input type="hidden" id="item-edit-hidden-item-dict-data" name="hiddenItemDictData" />
				</form>
				<div style="margin-left: 190px;" id=""> 
					<div class="line panel-for-detail" >
						<div class="line">
							<div class="grid-2 title">
								TYPE:
							</div>
							<div class="grid-4 value">
								<select id="item-edit-window-item-type">
									<option value="0">PHONE</option>
									<option value="1">SIM CARD</option>
									<option value="2">ACCESSORY (Seralizable)</option>
									<option value="3">ACCESSORY (Non-seralizable)</option>
									<option value="4">SERVICE ITEM</option>
								</select>
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								ITEM CODE:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-code" style="width:100%;"/>
							</div>
							<div class="grid-2">
								<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.getItemCodeExistFlag();" style="width:50px;height:12px;display:inline-block;">Check</div>
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								MODEL:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-model" style="width:100%;"/>
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								DESCRIPTION:
							</div>
							<div class="grid-10 value">
								<input type="text" id="item-edit-window-item-description" style="width:100%;"/>
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								SKU:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-sku" style="width:100%;"/>
							</div>
							<div class="grid-2 title">
								UPC:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-upc" style="width:100%;"/>
							</div>
						</div>
					</div>
					<div class="line panel-for-detail" >
						<div class="line">
							<div class="grid-2 title">
								CATEGORY:
							</div>
							<div class="grid-3 value">
								<select id="item-edit-window-item-category" onchange="WRPAdminApp.pagescript.getSubCategoryListByCategorySid();" style="width:100%;"></select>
							</div>
							<div class="grid-2 title">
								SUB-CATEGORY:
							</div>
							<div class="grid-3 value">
								<select id="item-edit-window-item-sub-category" style="width:100%;"></select>
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								DISTRIBUTOR:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-distributor" style="width:100%;"/>
							</div>
							<div class="grid-2 title">
								MANUFACTURER:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-manufacturer" style="width:100%;"/>
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								COLOR:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-color" style="width:100%;"/>
							</div>
							<div class="grid-2 title">
								CONDITION:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-condition" style="width:100%;"/>
							</div>
						</div>
					</div>
					<!-- 
					<div class="line panel-for-detail" >
						<div class="line">
							<div class="grid-2 title">
								ITEM COST:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-cost" style="width:100%;"/>
							</div>
							<div class="grid-2 title">
								RETAIL PRICE:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-retail-price" style="width:100%;"/>
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								WHOLESALE PRICE:
							</div>
							<div class="grid-3 value">
								<input type="text" id="item-edit-window-item-wholesale-price" style="width:100%;"/>
							</div>
						</div>
					</div>
					-->
					<div class="line" style="text-align: right;">
 						<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.confirmSaveItemDict();">Save</div>
 						<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-edit-item-window').jqxWindow('close');">Close</div>
					</div>
				</div>
			</div>	
	 	</div>
	</div>
	
	<div class="jqx-custom-window item-management-window" id="item-management-add-item-window">
	 	<div role="title">
	 		ADD ITEMS (<span id="item-management-add-item-type"></span>)
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">	 		
	 		<div class="line">
	 			SEARCH ITEM BY SKU, UPC OR NAME FROM WRP DATABASE
	 		</div>
	 		<div class="line user-input-area">
	 			<div class="grid-6" style="text-align: right;">
	 				SKU / UPC / NAME
	 			</div>
	 			<div class="grid-4">
	 				<input type="text" style="width: 100%;height: 27px;" id="item-management-add-item-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getItemDictListNotInStore(); }"/>
	 			</div>
	 			<div class="grid-2">	 			
	 				<div class="jqx-plain-button" style="display: inline-block; width: 90%;'" onclick="WRPAdminApp.pagescript.getItemDictListNotInStore();">SEARCH</div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			SELECT ITEMS
	 		</div>
	 		<div class="line" style="height: 360px;">
	 			<div id="add-item-items-in-wrp-db-list">
	 			</div>
	 		</div>
	 		<div class="line">
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllItemsInAddItemWindowSelected(true);">SELECT ALL</div>
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllItemsInAddItemWindowSelected(false);">UNSELECT ALL</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-6">
	 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.initAddItemWindow();">ADD A NEW ITEM</div>
	 			</div>
	 			<div class="grid-6" style="text-align: right;">
	 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.openConfirmationDownloadItemsPage();">DOWNLOAD</div>
	 				<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-add-item-window').jqxWindow('close');">CANCEL</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	
	<div class="jqx-custom-window item-management-window" id="item-management-item-detail-window">
	 	<div role="title" id="item-detail-window-title-bar">
	 		ITEMS DESCRIPTION
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">	 		
	 		<div class="item-management-detail-content">
				<div id="item-detail-window-content-item-image" style="background-position: center; background-size: contain; background-repeat: no-repeat;float: left; width: 180px; height: 215px; border: rgba(127, 127, 127, 1) 1px solid;">
				</div>
				<div style="margin-left: 190px;">
					<div class="line panel-for-detail" >
						<div class="line">
							<div class="grid-2 title">
								TYPE:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-type">
								&nbsp;
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								CODE:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-code">
								&nbsp;
							</div>
							<div class="grid-2 title">
								SKU:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-sku">
								&nbsp;
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								MODEL:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-model">
								&nbsp;
							</div>
							<div class="grid-2 title">
								UPC:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-upc">
								&nbsp;
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								DESCRIPTION:
							</div>
							<div class="grid-9 value gray" id="item-detail-window-content-item-description">
								&nbsp;
							</div>
						</div>
					</div>
					<div class="line panel-for-detail" >
						<div class="line">
							<div class="grid-2 title">
								CATEGORY:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-category">
								&nbsp;
							</div>
							<div class="grid-2 title" style="letter-spacing: -2px;">
								SUB-CATEGORY:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-sub-category">
								&nbsp;
							</div>
						</div>
					</div>
					<div class="line panel-for-detail" >
						<div class="line">
							<div class="grid-2 title">
								CARRIER:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-carrier">
								&nbsp;
							</div>
							<div class="grid-2 title">
								COLOR:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-color">
								&nbsp;
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title" style="letter-spacing: -2px;">
								MANUFACTURER:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-manufacturer">
								&nbsp;
							</div>
							<div class="grid-2 title">
								CONDITION:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-condition">
								&nbsp;
							</div>
						</div>
						<div class="line">
							<div class="grid-2 title">
								VENDOR:
							</div>
							<div class="grid-3 value gray" id="item-detail-window-content-item-vendor">
								&nbsp;
							</div>
						</div>
					</div>
					<div class="line" style="text-align: right;">
 						<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-item-detail-window').jqxWindow('close');">Close</div>
					</div>
				</div>
			</div>	
	 	</div>
	</div>
	
	<div class="jqx-custom-window item-management-window" id="item-management-confirmation-download-item-window">
	 	<div role="title">
	 		CONFIRMATION THE ITEMS
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">	 		
	 		<div class="line">
	 			This items will be downloaded to your stores
	 		</div>	 		
	 		<div class="line" style="height: 240px;">
	 			<div id="confirmation-download-item-items-list">
	 			</div>
	 		</div>
	 		<div class="line" style="text-align: right;">
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.confirmDownloadItems();">CONFIRM</div>
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-confirmation-download-item-window').jqxWindow('close');">CLOSE</div> 			
	 		</div>
	 	</div>
	</div>
	
	<div class="jqx-custom-window item-management-window" id="item-management-price-change-window">
	 	<div role="title" id="item-management-price-change-title-bar">
	 		Item Name
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line item-information-in-window">
	 			<div class="item-image" id="item-management-price-change-item-image">
	 				
	 			</div>
	 			<div class="item-information-container">
	 				<div class="line">
	 					<div class="grid-3 title">
	 						TYPE
	 					</div>
	 					<div class="grid-3 value gray" id="item-management-price-change-item-type">
	 						&nbsp;
	 					</div>
	 				</div>
	 				<div class="line">
	 					<div class="grid-3 title">
	 						CODE
	 					</div>
	 					<div class="grid-3 value gray" id="item-management-price-change-item-code">
	 						&nbsp;
	 					</div>
	 					<div class="grid-2 title">
	 						SKU
	 					</div>
	 					<div class="grid-3 value gray" id="item-management-price-change-item-sku">
	 						&nbsp;
	 					</div>
	 				</div>
	 				<div class="line">
	 					<div class="grid-3 title">
	 						DESCRIPTION
	 					</div>
	 					<div class="grid-8 value gray" id="item-management-price-change-item-description">
	 						&nbsp;
	 					</div>
	 				</div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			SELECT STORE
	 		</div>
	 		<div class="line" style="height: 200px;">
	 			<div id="price-change-store-list">
	 				
	 			</div>
	 		</div>
	 		<div class="line">
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllStoresInPriceChangeWindowSelected(true);">SELECT ALL</div>
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllStoresInPriceChangeWindowSelected(false);">UNSELECT ALL</div>
	 		</div>
	 		<div class="line">
	 			APPLY NEW PRICE
	 		</div>
	 		<div class="line user-input-area">
	 			<div class="grid-4" style="text-align: right;">
	 				NEW PRICE
	 			</div>
	 			<div class="grid-4">
	 				<input type="text" id="item-management-price-change-set-new-price" style="width: 100%;height: 27px;" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.applyPriceInStore(); }"/>
	 			</div>	 			
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.applyPriceInStore();">Apply</div>
	 			</div>
	 		</div>
	 		<div class="line" style="text-align: center;">
	 			<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.confirmSubmitPriceChange();">Submit</div>
	 			<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-price-change-window').jqxWindow('close');">Close</div>
	 		</div>
	 	</div>
	</div>
	
	<div class="jqx-custom-window item-management-window" id="item-management-status-change-window">
	 	<div role="title" id="item-management-status-change-title-bar">
	 		Item Name
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line item-information-in-window">
	 			<div class="item-image" id="item-management-status-change-item-image">
	 				
	 			</div>
	 			<div class="item-information-container">
	 				<div class="line">
	 					<div class="grid-3 title">
	 						TYPE
	 					</div>
	 					<div class="grid-3 value gray" id="item-management-status-change-item-type">
	 						&nbsp;
	 					</div>
	 				</div>
	 				<div class="line">
	 					<div class="grid-3 title">
	 						CODE
	 					</div>
	 					<div class="grid-3 value gray" id="item-management-status-change-item-code">
	 						&nbsp;
	 					</div>
	 					<div class="grid-2 title">
	 						SKU
	 					</div>
	 					<div class="grid-3 value gray" id="item-management-status-change-item-sku">
	 						&nbsp;
	 					</div>
	 				</div>
	 				<div class="line">
	 					<div class="grid-3 title">
	 						DESCRIPTION
	 					</div>
	 					<div class="grid-8 value gray" id="item-management-status-change-item-description">
	 						&nbsp;
	 					</div>
	 				</div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			SELECT STORE
	 		</div>
	 		<div class="line" style="height: 200px;">
	 			<div id="status-change-store-list">
	 				
	 			</div>
	 		</div>
	 		<div class="line">
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllStoresInStatusChangeWindowSelected(true);">SELECT ALL</div>
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllStoresInStatusChangeWindowSelected(false);">UNSELECT ALL</div>
	 		</div>
	 		<div class="line">
	 			APPLY NEW STATUS
	 		</div>
	 		<div class="line" style="font-size: 19px !important; height: 50px; line-height: 50px; background-color: rgba(230, 230, 230, 1); border: rgba(127,127,127,1) 1px solid;">
	 			<div class="grid-4" style="text-align: right;">
	 				NEW STATUS
	 			</div>
	 			<div class="grid-4">
	 				<select id="item-management-status-change-set-new-status" style="width: 100%; height: 27px;">
	 					<option value="0">Enable</option>
	 					<option value="1">Disable</option>
	 				</select>
	 			</div> 			
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.applyStatusInStore();">Apply</div>
	 			</div>
	 		</div>
	 		<div class="line" style="text-align: center;">
	 			<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.confirmSubmitStatusChange();">Submit</div>
	 			<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-status-change-window').jqxWindow('close');">Close</div>
	 		</div>
	 	</div>
	</div>
		
	<div class="jqx-custom-window item-management-window" id="item-management-download-item-window">
	 	<div role="title">
	 		DOWNLOAD ITEMS (<span id="item-management-download-item-type"></span>)
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">	 		
	 		<div class="line" style="display: none;">
	 			SELECT DOWNLOAD FROM
	 		</div>
<%
	if (master_user_flag) {
%>
			<div class="line user-input-area" style="display: none;">
		 		<div class="grid-3" style="text-align: center;">
	 				<label><input type="radio" name="selectDownloadFrom" id="download-item-from-wrp" checked/> CLOUD</label>
	 			</div>
	 		</div> 	
<%
	} else if (subdealer_user_flag) {
%>
	 		<div class="line user-input-area" style="display: none;">
	 			<div class="grid-3" style="text-align: center;">
	 				<label><input type="radio" name="selectDownloadFrom" id="download-item-from-master" checked/> MASTER</label>
	 			</div>
	 		</div> 	
<%
	} else {
%>	
	 		<div class="line user-input-area" style="display: none;">
	 			<div class="grid-3" style="text-align: center;">
	 				<label><input type="radio" name="selectDownloadFrom" id="download-item-from-owner" checked/> SUBDEALER</label>
	 			</div>
	 		</div> 	
<%
	}
%>
	 		<div class="line" style="display: none;">
	 			SELECT DOWNLOAD TARGET
	 		</div>
	
<%
	if (master_user_flag) {
%>
	 		<div class="line user-input-area" style="display: none;">
	 			<div class="grid-3" style="text-align: center;">
	 				<label><input type="radio" name="selectDownloadTo" id="download-item-to-master" checked/> MASTER</label>
	 			</div>
	 		</div> 	
<%
	} else if (subdealer_user_flag) {
%>	 		
	 		<div class="line user-input-area" style="display: none;">
	 			<div class="grid-3" style="text-align: center;">
	 				<label><input type="radio" name="selectDownloadTo" id="download-item-to-owner" checked/> SUBDEALER</label>
	 			</div>
	 		</div> 	
<%
	} else {
%>	
	 		<div class="line user-input-area" style="display: none;">
	 			<div class="grid-3" style="text-align: center;">
	 				<label><input type="radio" name="selectDownloadTo" id="download-item-to-store" checked/> STORE</label>
	 			</div>
	 		</div> 	
<%
	}
%>	
	 		<div class="line">
	 			SEARCH ITEM BY SKU, UPC OR NAME
	 		</div>
	 		<div class="line user-input-area">
	 			<div class="grid-6" style="text-align: right;">
	 				SKU / UPC / NAME
	 			</div>
	 			<div class="grid-4">
	 				<input type="text" style="width: 100%;height: 27px;" id="item-management-download-item-search-keyword" onkeydown="if (event.keyCode === 13) {  }"/>
	 			</div>
	 			<div class="grid-2">	 			
	 				<div class="jqx-plain-button" style="display: inline-block; width: 90%;'" onclick="WRPAdminApp.pagescript.compareParentAndChildItems();">SEARCH</div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			SELECT ITEMS
	 		</div>
	 		<div class="line" style="height: 360px;">
	 			<div id="download-item-compared-result-list">
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-6">
		 			<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllItemsInDownloadItemFromParentWindowSelected(true);">SELECT ALL</div>	 	
		 			<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.changeAllItemsInDownloadItemFromParentWindowSelected(false);">UNSELECT ALL</div>	 		
	 			</div>
	 			<div class="grid-6" style="text-align: right;">	 			
		 			<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.openConfirmDownloadItemFromParentWindow();">DOWNLOAD</div>
		 			<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-download-item-window').jqxWindow('close');">CANCEL</div>	 	
	 			</div>		
	 		</div>
	 	</div>
	</div>
	
	<div class="jqx-custom-window item-management-window" id="item-management-confirmation-download-item-from-parent-window">
	 	<div role="title">
	 		CONFIRMATION THE ITEMS
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">	 		
	 		<div class="line">
	 			This items will be downloaded to your stores
	 		</div>	 		
	 		<div class="line" style="height: 240px;">
	 			<div id="confirmation-download-item-from-parent-items-list">
	 			</div>
	 		</div>
	 		<div class="line" style="text-align: right;">
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.confirmDownloadParentItemsToChild();">CONFIRM</div>
 				<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#item-management-confirmation-download-item-from-parent-window').jqxWindow('close');">CLOSE</div> 			
	 		</div>
	 	</div>
	</div>
	
	<div class="jqx-custom-window" id="category-info-window">
		<div role="title">CATEGORY INFORMATION</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line">Enter Category Info</div>
			<div class="line" style="margin-top: 30px;">
				<div class="grid-4">
					Category Name
				</div>
				<div class="grid-6">
					 <input type="text" id="sys-conf-input-category-name" style="width: 100%;"/>
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="btn sky" onclick="WRPAdminApp.pagescript.setCategoryInfo();">Save</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="sub-category-info-window">
		<div role="title">SUB CATEGORY INFORMATION</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line">Enter Category Info</div>
			<div class="line" style="margin-top: 30px;">
				<div class="grid-4">
					Category Name
				</div>
				<div class="grid-6">
					 <input type="text" id="sys-conf-input-sub-category-name" style="width: 100%;"/>
				</div>
			</div>
			<div class="line">
				<div class="grid-4">
					Category
				</div>
				<div class="grid-6">
					<select id="sys-conf-parent-category-name">
					</select>
                </div>
            </div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:75px;display:inline-block;" onclick="WRPAdminApp.pagescript.setSubCategoryInfo();">Save</div>
			</div>
		</div>
	</div>
</div>
