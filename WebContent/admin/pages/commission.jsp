<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "commission");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
    JSONObject permissionData = null;
    if (!isOwner && owner_id != null && storeId != null) {
      //  permissionData = (JSONObject) ((JSONObject) UtilMethodClass.getSingleton().getPermissionData(owner_id, storeId, userId)).get("User");
    }

    JSONObject obj = null;
%>
<div pagename="commission" class="theme-02">
    <div class="page-submenu-container">
        <div class="submenu" panelname="commission" onclick="WRP.UI.changePanelBySubmenu('commission');">
            Commission
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="calculation" onclick="WRP.UI.changePanelBySubmenu('calculation');">
            Calculation
        </div>
    </div>
    <div class="panels">
    	<div class="jqx-horizontal-split-panel-main" panelname="commission" style="height: 100%;">
        	<div class="plain-01-panel" style="width: 100%; height: 100%;">
        		<div class="title-wrapper">
                    <div class="title">
                        Profile
                    </div>
                    <div class="sub-title">
                        Commission Profile List
                    </div>
					<div class="left-input-area">
						<div class="jqx-plain-button" style="float: right;" onClick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.commissionProfilePop);">+ ADD PROFILE</div>
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
        			<div id="jqx-commission-profile-list"></div>
				</div>
			</div>
			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        		<div class="title-wrapper">
                    <div class="title">
                        Profile Setting
                    </div>
                    <div class="sub-title">
                    </div>
					<div class="right-input-area">
						<div class="jqx-plain-button" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setCommissionInfo);" style="width:150px;">SAVE CHANGE</div>
					</div>
				</div>
				<div class="content-wrapper" style="margin: 3px 50px 0px 35px;">
					<div class="jqx-vertical-split-panel">		        	
			        	<div style="height: 100%; overflow-y: auto;">
			        		<div id="jqx-tree-commission-struct">
			        		</div>
			        	</div>
			        	<div style="padding: 10px 0 0 10px;">
			        		<div class="line" id="activate-type">
			        			<div class="grid-2" style="line-height: 20px;">
			        				Calculation Activate
			        			</div>
			        			<div class="grid-3">
			        				<select id="commission-type" onchange="WRPAdminApp.pagescript.onCommissionTypeChanged(this.value);">
			        					<option value="0">None</option>
			        					<option value="1">Flat Amount</option>
			        					<option value="2">% of Sale</option>
			        					<!-- <option value="3">% of Gross Profit</option> -->
			        				</select>
			        			</div>
			        		</div>
			        		<div class="line" style="min-height: 200px;max-height: 500px;">
			        			<div class="grid-10">
			        				<div id="jqx-grid-commission-info"></div>
			        			</div>
			        		</div>
			        		
			        	</div>
		        	</div>
	        	</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel" panelname="calculation" style="display:none;">
        	<div class="plain-01-panel" style="width: 100%; height: 100%;">
        		<div class="title-wrapper">
                    <div class="title">
                        Employee
                    </div>
                    <div class="sub-title">
                        Commission Employee List
                    </div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-commission-employee-list"></div>
				</div>
			</div>
			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        		<div class="title-wrapper">
                    <div class="title">
                        Detail
                    </div>
                    <div class="sub-title">
                    </div>
					<div class="right-input-area">
					</div>
				</div>
				<div class="content-wrapper" style="margin: 7px 50px 0px 47px;">
					<div class="line" style="width:80%;">
						<div id="select-profile">
							<div class="grid-1_5" style="font-size:15px; line-height: 30px;">
								Select Profile
							</div>
							<div class="grid-2">
								<select id="commission-select-profile" style="width: 100%;height: 30px;">
									<option value="0">Select Profile</option>
	    						</select>
							</div>
						</div>
						<div class="grid-2" style="margin-left:15px;line-height: 30px;">
							<div class="jqx-datetime-input" id="commission-start-date"></div>
						</div>
						<div class="grid-2" style="margin-left:7px;line-height: 30px;">
							<div class="jqx-datetime-input" id="commission-end-date"></div>
						</div>
						<div class="grid-1_5" style="margin-left:5px;">
							<div class="jqx-plain-button" id="commission-apply-btn" style="width:80px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getCalculCommissionByDate);">Apply</div>
						</div>
						<div class="grid-1" style="margin-left:3px;">
							<div class="jqx-plain-button" id="commission-excel-btn" style="width:80px;" onclick="">Excel</div>
						</div>
						<div id="commission-total" style="display:none;line-height: 30px; margin-left: 65px; width: 300px; float: left;"></div>
					</div>
					<div style="height:calc(100% - 53px);">
						<div id="jqx-commission-calcul-list"></div>
					</div>
	        	</div>
			</div>
		</div>
	</div>
    <div class="jqx-custom-window" id="commission-new-window">
		<div role="title">Add</div>
		<div class="line" style="margin:30px 10px 0px 30px;">
			<div class="line gray" style="height: 40px; line-height: 40px;">
				<div class="grid-4" style="font-size:13px;">Profile Name</div>
				<div class="grid-6">
					<input type="text" id="commission-add-profile-name" style="width: 100%; height:30px;font-size:14px;" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;height:40px;">
				<div class="jqx-plain-button" style="display:inline-block;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.addCommissionProfile);">Save</div>
				<div class="jqx-plain-button" style="display:inline-block;" onclick="$('#commission-new-window').jqxWindow('close');">Cancel</div>
			</div>
		</div>
	</div>
</div>