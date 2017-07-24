<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "vendor");
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
<div pagename="vendor" class="theme-02">
    <div class="page-submenu-container" style="display:none;">
        <div class="submenu" panelname="vendor_list" onclick="WRP.UI.changePanelBySubmenu('vendor_list');">
            Vendor List
        </div>
    </div>
    <div class="panels" style="height:100%;">
        <div class="jqx-horizontal-split-panel" panelname="vendor_list" style="display:block;">
            <div class="plain-01-panel" style="height: 40%">
                <div class="title-wrapper">
                    <div class="title">
                        Vendor
                    </div>
                    <div class="sub-title">
                        information Management
                    </div>
                    <div class="left-input-area">
						<div class="grid-4">
							<div class="jqx-plain-button" id="add_vendor" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.initVendorEditContainer);">ADD VENDOR</div>
						</div>
						<div class="grid-4">
							<div class="jqx-plain-button" id="excelExport">Export to Excel</div>
						</div>
						 <div class="grid-4">
							<div class="jqx-plain-button" id="vendorSync" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.syncVendorList);">Sync</div>
						</div>
					</div>
                    <div class="right-input-area">
						<input type="text" class="jqx-text-input" id="vendor-search-keyword" placeholder="keyword" style="width:140px;height:25px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getVendorList(); }"/>
						<div class="jqx-plain-button" style="display:inline-block;width:70px;" id="vendor-search-btn" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getVendorList);">Apply</div>
					</div>
                </div>
                
				<div style="margin-left: 32px; margin-right: 50px; margin-top: 3px; height:calc(100% - 53px);">
					<div id="jqx-vendor-list"></div>
				</div>
            </div>
            
            <div>
				<div class="jqx-tab-panel" id="jqx-users-bottom-panel">
					<ul>
						<li>Profile</li>
						<li>Purchase Orders</li>
					</ul>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-vendor-profile">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Vendor Information</div>
									<div class="left-input-area"></div>
									<div class="right-input-area">
									</div>
								</div>
							</div>
							<div id="vendor-profile-container"
								style="margin-left: 32px; margin-right: 50px; margin-top: 3px; width:600px;">
								<div class="line">
									<div class="grid-2">Vendor ID</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="vendor-profile-id" readonly/>
									</div>
									<div class="grid-2">VendorName</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent" style="width:100%;"
											id="vendor-profile-name" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Address1</div>
									<div class="grid-10">
										<input type="text" class="fill_width_parent"
											id="vendor-profile-address1" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Address2</div>
									<div class="grid-10">
										<input type="text" class="fill_width_parent"
											id="vendor-profile-address2" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">City</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="vendor-profile-city" readonly/>
									</div>
									<div class="grid-2">State</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent" style="width:100%;"
											id="vendor-profile-state" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Zipcode</div>
									<div class="grid-10">
										<input type="text" class="fill_width_parent"
											id="vendor-profile-zipcode" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Mobile</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="vendor-profile-mobile" readonly/>
									</div>
									<div class="grid-2">Contact Name</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent" style="width:100%;"
											id="vendor-profile-contact" readonly/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-vendor-assigned">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Purchase Orders</div>
									<div class="left-input-area"></div>
									<div class="right-input-area" style="width:650px;">
										<div class="line" style="overflow:hidden;">
											<div class="grid-1" style="width:70px;">
												<div class="jqx-radio-button" id="vendor-po-search-radio-1">1 Week</div>
												</div>
											<div class="grid-1" style="width:70px;">
												<div class="jqx-radio-button" id="vendor-po-search-radio-2">2 Week</div>
												</div>
											<div class="grid-1" style="width:70px;">
												<div class="jqx-radio-button" id="vendor-po-search-radio-3">1 Month</div>
												</div>
											<div class="grid-2" style="width:100px;">
												<div class="jqx-datetime-input"
												id="vendor-po-search-start-date"></div>
												</div>
											<div class="grid-2" style="width:100px;">
												<div class="jqx-datetime-input"
												id="vendor-po-search-end-date"></div>
												</div>
											<div class="grid-1" style="width:80px;margin-left:7px;">
												<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getPurchaseOrderListByVendorId);">Apply</div>
				                        	</div>
											<div class="grid-1" style="width:80px;margin-left:11px;">
												<div class="jqx-plain-button" style="width:80px;" onclick="$('#jqx-puchase-order').jqxGrid('exportdata', 'xls', 'jqx-puchase-order');">Excel</div>
				                        	</div>
										</div>
									</div>
								</div>
							</div>
							<div style="margin-left: 32px; height: 350px; margin-right: 50px; margin-top: 3px;">
									<div id="jqx-puchase-order"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
    <div class="jqx-custom-window" id="vendor-edit-window" >
		<div role="title">Edit Vendor Window</div>
		<div id="vendor-edit-container"
			style="margin-left: 32px; margin-right: 32px; margin-top: 3px;">
			<div class="line">
				<div class="grid-2">Vendor ID</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" id="vendor-edit-id" readonly/>
				</div>
				<div class="grid-2">VendorName</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-edit-name" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Address1</div>
				<div class="grid-10">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-edit-address1" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Address2</div>
				<div class="grid-10">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-edit-address2" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">City</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent"
						id="vendor-edit-city" />
				</div>
				<div class="grid-2">State</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-edit-state" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Zipcode</div>
				<div class="grid-10">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-edit-zipcode" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Mobile</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent"
						id="vendor-edit-mobile" />
				</div>
				<div class="grid-2">Contact Name</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-edit-contact" />
				</div>
			</div>
			<div class="line">
    			<div class="grid-6" style="text-align: right; margin-top: 5px; width:100%;">
    				<div class="jqx-plain-button" style="width:90px; display:inline-block;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.editVendorData);">Save</div>
    				<div class="jqx-plain-button" style="width:90px; display:inline-block;" onclick="$('#vendor-edit-window').jqxWindow('close');">Cancel</div>
    			</div>
    		</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="vendor-add-window" >
		<div role="title">Add Vendor Window</div>
		<div id="vendor-add-container"
			style="margin-left: 32px; margin-right: 32px; margin-top: 3px;">
			<div class="line">
				<div class="grid-2">Vendor ID</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" id="vendor-add-id" />
				</div>
				<div class="grid-2">VendorName</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-add-name" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Address1</div>
				<div class="grid-10">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-add-address1" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Address2</div>
				<div class="grid-10">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-add-address2" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">City</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent"
						id="vendor-add-city" />
				</div>
				<div class="grid-2">State</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-add-state" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Zipcode</div>
				<div class="grid-10">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-add-zipcode" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Mobile</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent"
						id="vendor-add-mobile" />
				</div>
				<div class="grid-2">Contact Name</div>
				<div class="grid-4">
					<input type="text" class="fill_width_parent" style="width:100%;"
						id="vendor-add-contact" />
				</div>
			</div>
			<div class="line">
    			<div class="grid-6" style="text-align: right; margin-top: 5px; width:100%;">
    				<div class="jqx-plain-button" style="width:90px; display:inline-block;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setVendorData);">Save</div>
    				<div class="jqx-plain-button" style="width:90px; display:inline-block;" onclick="$('#vendor-add-window').jqxWindow('close');">Cancel</div>
    			</div>
    		</div>
		</div>
	</div>
</div>