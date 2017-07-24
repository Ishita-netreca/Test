<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "sys_conf");
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
<div pagename="sys_conf" class="theme-02">
    <div class="page-submenu-container">
        <div class="submenu" panelname="item_category" onclick="WRP.UI.changePanelBySubmenu('item_category');">
            Item Category
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="chart_of_account" onclick="WRP.UI.changePanelBySubmenu('chart_of_account');">
            Station
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="dt_setup" onclick="WRP.UI.changePanelBySubmenu('dt_setup');">
            Date & Time Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="emp_roles" onclick="WRP.UI.changePanelBySubmenu('emp_roles');">
            Employee Roles
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="permission_group" onclick="WRP.UI.changePanelBySubmenu('permission_group');">
            Permission Group
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRP.UI.changePanelBySubmenu('store_location');">
            Region Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRP.UI.changePanelBySubmenu('store_location');">
            Qpay Favorite
        </div>
    </div>
    <div class="panels" style="height:100%">
        <div class="plain-01-panel" panelname="item_category"  style="display: block">
            <div class="line" style="padding: 10px 30px; height:100%;">
                <div class="grid-6">
                    <div class="plain-02-panel" style="height:100%;">
                        <div class="title-wrapper">
                            <div class="title">
                                Category List
                            </div>
                            <div class="right-input-area">
                                <div class="btn sky" onclick="WRPAdminApp.pagescript.initCategoryInfo();">+ NEW CATEGORY</div>
                            </div>
                        </div>
                        
                        <div style="margin-top:3px; height:calc(100% - 53px);">
							<div id="jqx-sys-category-list"></div>
						</div>
                    </div>
                </div>
                <div class="grid-6">
                    <div class="plain-02-panel" style="height:100%;">
                        <div class="title-wrapper">
                            <div class="title">
                                Sub Category List
                            </div>
                            <div class="right-input-area">
                                <div class="btn sky" onclick="WRPAdminApp.pagescript.initSubCategoryInfo();">+ NEW SUB CATEGORY</div>
                            </div>
                        </div>
                        <div style="margin-top:3px; height:calc(100% - 53px);">
							<div id="jqx-sys-sub-category-list"></div>
						</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="plain-01-panel" panelname="chart_of_account" style="display: none">
            Chart of Account
        </div>
        <div class="plain-01-panel" panelname="dt_setup" style="display: none">
            <div class="plain-01-panel" style="height:100%">
                <div class="title-wrapper">
                    <div class="title">
                        Date & Time Setup
                    </div>
                    <div class="sub-title">
                        Time Zone Management
                    </div>
                    <div class="left-input-area">
                        Current Time Zone : <span id="timezone-current-timezone-desc"></span>
                    </div>
                    <div class="right-input-area">
						<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.saveTimezone();">Save</div>
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-timezone-list"></div>
				</div>
            </div>
        </div>
        <div class="jqx-horizontal-split-panel" panelname="emp_roles" style="display: none">
            <div class="plain-01-panel" style="height:45%">
                <div class="title-wrapper">
                    <div class="title">
                        Employee Roles
                    </div>
                    <div class="sub-title">
                        Role Management
                    </div>
                    <div class="left-input-area">
                        <div class="btn sky" onclick="WRPAdminApp.pagescript.initRoleInfo();">
                            + ADD ROLE
                        </div>
                    </div>
                    <div class="right-input-area">
						<div class="btn sky" id="excel_system_role" style="float:right;">
							Export to Excel
						</div>
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-sys-conf-role"></div>
				</div>
            </div>
            <div>
            	<div class="jqx-tab-panel">
            		<ul>
        				<li>Profile</li>
        				<li>User List</li>
        			</ul>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                           <div class="title">
                               Role Profile
                           </div>
                        </div>

                        <div class="line" style="margin: 8px 50px 0px 40px;">
                        <div class="line">
                            <div class="grid-1">
                                Name
                            </div>
                            <div class="grid-2">
                                <input type="text" style="width: 100%;" id="sys-conf-role-name" readonly/>
                            </div>
                        </div>
                        <div class="line">
                            <div class="grid-1">
                                Description
                            </div>
                            <div class="grid-5">
                                <input type="text" style="width: 100%;" id="sys-conf-role-description"/>
                            </div>
                        </div>
                        </div>
        			</div>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                           <div class="title">
                               User List
                           </div>
                           <div class="right-input-area">
                      			<div class="btn sky" id="excel_sys_user_role_list" style="float:right;">
                         			 Export to Excel
                     			 </div>
                    	</div>
                        </div>
                        <div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
							<div id="jqx-sys-conf-user-role-list"></div>
						</div>
        			</div>
            	</div>
            </div>
        </div>
        <div class="jqx-horizontal-split-panel" panelname="permission_group" style="display: none">
            <div class="plain-01-panel" style="height:45%;">
                <div class="title-wrapper">
                    <div class="title">
                        Permission Group
                    </div>
                    <div class="sub-title">
                        Group Management
                    </div>
                    <div class="left-input-area">
                        <div class="btn sky" onclick="WRPAdminApp.pagescript.addPermissionPop();">
                            + ADD GROUP
                        </div>
                    </div>
                    <div class="right-input-area">
						<div class="btn sky" id="excel_system_permission_group" style="float:right;">
							Export to Excel
						</div>
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-sys-permission-group-list"></div>
				</div>
            </div>
           <div>
            	<div class="jqx-tab-panel">
            		<ul>
        				<li>Profile</li>
        				<li>Permission</li>
        				<li>Users</li>
        			</ul>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                            <div class="title">
                                Permission Group
                            </div>
                        </div>
                        <div class="content-wrapper" style="margin: 7px 0px 0px 40px;">
                        <div class="line">
                            <div class="grid-1">
                                Name
                            </div>
                            <div class="grid-2">
                                <input type="text" style="width: 100%;" id="sys-conf-permission-group-name"/>
                            </div>
                        </div>
                        </div>
        			</div>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
                        <div class="line" style="margin-top:3px">
                        <div class="grid-6">
                            <div class="plain-02-panel">
                                <div class="title-wrapper">
                                    <div class="title">
                                        Sales Permission
                                    </div>
                                    <div class="left-input-area">
                                    </div>
                                    <div class="right-input-area">
                                        <div class="btn sky" style="top:-4px" onclick="WRPAdminApp.pagescript.saveSalesPermissionInfo();">Save</div>
                                    </div>
                                </div>
                                <div class="content-wrapper">
                                    <div class="content" style="margin-top: 10px;padding: 0px;">
                                        <div class="line" style="font-weight:bold;margin-bottom: 0px;border-bottom: rgba(217,217,217,1) 1px solid;overflow-x:hidden;">
                                            <div class="grid-1">
                                                &nbsp;
                                            </div>
                                            <div class="grid-4">
                                                Functions
                                            </div>
                                            <div class="grid-4" style="text-align: center;">
                                                Description
                                            </div>
                                            <div class="grid-3" style="text-align: center;">
                                                Permission
                                            </div>
                                        </div>
                                        <div class="line" style="height: 285px;">
                                            <div class="permission-set-list" id="sys-conf-sales-permission-set-list">

                                            </div>
                                        </div>
                                        <div class="line" style="margin-top:-10px;min-height: 0px;height: 0px;border-top: rgba(217,217,217,1) 1px solid;">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid-6">
                            <div class="plain-02-panel">
                                <div class="title-wrapper">
                                    <div class="title">
                                        Backend Permission
                                    </div>
                                    <div class="left-input-area">
                                    </div>
                                    <div class="right-input-area">
                                        <div class="btn sky" style="top:-4px" onclick="WRPAdminApp.pagescript.saveBackendPermissionInfo();">Save</div>
                                    </div>
                                </div>
                                <div class="content-wrapper">
                                    <div class="content" style="margin-top: 10px;padding: 0px;">
                                        <div class="line" style="font-weight:bold;margin-bottom: 0px;border-bottom: rgba(217,217,217,1) 1px solid;overflow-x:hidden;">
                                            <div class="grid-1">
                                                &nbsp;
                                            </div>
                                            <div class="grid-4">
                                                Functions
                                            </div>
                                            <div class="grid-4" style="text-align: center;">
                                                Description
                                            </div>
                                            <div class="grid-3" style="text-align: center;">
                                                Permission
                                            </div>
                                        </div>
                                        <div class="line" style="height: 285px;margin-bottom: 0px;">
                                            <div class="permission-set-list" id="sys-conf-backend-permission-set-list">

                                            </div>
                                        </div>
                                        <div class="line" style="margin-top:-10px;min-height: 0px;height: 0px;border-top: rgba(217,217,217,1) 1px solid;">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
        			</div>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                            <div class="title">
                                Users
                            </div>
                            <div class="right-input-area">
								<div class="btn sky" id="excel_permission_group_user" style="float:right;">
									Export to Excel
								</div>
                    		</div>
                        </div>
                        <div style="margin: 3px 50px 0px 32px; height:calc(100% - 60px);">
							<div id="sys-permission-group-user-list"></div>
						</div>
        			</div>
            	</div>
            </div>
        </div>
        <div class="plain-01-panel" panelname="store_location" style="display: none">
                <div class="line" style="padding: 10px 30px; height:100%;">
                    <div class="grid-6">
                        <div class="plain-02-panel" style="height:100%;">
                            <div class="title-wrapper">
                                <div class="title">
                                    Market List
                                </div>
                                <div class="left-input-area">
									<div class="btn sky" onclick="WRPAdminApp.pagescript.initMarketInfo();">
                     					 + CREATE MARKET
                    				</div>
								</div>
                                <div class="right-input-area">
                                	<div class="btn sky" id="excel_sys_market_list" style="float:right;">
										Export to Excel
									</div>
                                    <div class="search-container">
                                        <input type="text" placeholder="Keyword" id="store-group-search-market-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getMarketList();"/>
                                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getMarketList();">
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div style="margin-top:3px; height:calc(100% - 53px);">
								<div id="jqx-sys-market-list"></div>
							</div>
                        </div>
                    </div>
                    <div class="grid-6">

                        <div class="plain-02-panel" style="height:100%;">
                            <div class="title-wrapper">
                                <div class="title">
                                    District List
                                </div>
                                <div class="left-input-area">
									<div class="btn sky" onclick="WRPAdminApp.pagescript.initDistrictInfo();">
                     					 + CREATE DISTRICT
                    				</div>
								</div>
                                <div class="right-input-area">
                                	<div class="btn sky" id="excel_sys_district_list" style="float:right;">
										Export to Excel
									</div>
                                    <div class="search-container">
                                        <input type="text" placeholder="Keyword" id="store-group-search-district-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getDistrictList();"/>
                                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getDistrictList();">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top:3px; height:calc(100% - 53px);">
								<div id="jqx-sys-district-list"></div>
							</div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    <div class="popup-area">
        <div class="popup-container" popupname="MarketViewContainer">
            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                Market
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title no_icon">
                            <div class="left-area">Market Information</div>
                            <div class="right-area text_right"><div class="btn sky" onclick="WRPAdminApp.pagescript.updateMarketInfo();">SAVE</div></div>
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-6">
                                    Market Code
                                </div>
                                <div class="grid-6">
                                    <input type="text" class="fill_width_parent" id="market-info-market-code"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-6">
                                    Description
                                </div>
                                <div class="grid-6">
                                    <input type="text" class="fill_width_parent" id="market-info-description"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-6">
                                    Tel
                                </div>
                                <div class="grid-6">
                                    <input type="text" class="fill_width_parent" id="market-info-tel"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup-container" popupname="DistrictViewContainer">
            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                District
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title no_icon">
                            <div class="left-area">District Information</div>
                            <div class="right-area text_right"><div class="btn sky" onclick="WRPAdminApp.pagescript.updateDistrictInfo();">SAVE</div></div>
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-6">
                                    District Code
                                </div>
                                <div class="grid-6">
                                    <input type="text" class="fill_width_parent" id="district-info-district-code"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-6">
                                    Description
                                </div>
                                <div class="grid-6">
                                    <input type="text" class="fill_width_parent" id="district-info-description"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-6">
                                    Tel
                                </div>
                                <div class="grid-6">
                                    <input type="text" class="fill_width_parent" id="district-info-tel"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-6">
                                    Market Code
                                </div>
                                <div class="grid-6">
                                    <select class="fill_width_parent" id="district-info-market-code">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="jqx-custom-window" id="category-info-window">
		<div role="title">CATEGORY INFORMATION</div>
		<div class="line" style="margin: 10px 10px 0px 30px;">
			<div class="line">Input Category Info</div>
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
			<div class="line">Input Category Info</div>
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
				<div class="btn sky" onclick="WRPAdminApp.pagescript.setSubCategoryInfo();">Save</div>
			</div>
		</div>
	</div>
    <div class="jqx-custom-window" id="role-new-window">
		<div role="title">Edit</div>
			<div class="line" style="margin: 10px 10px 0px 30px;">
                        <div class="line">
                            <div class="grid-3">
                                Name
                            </div>
                            <div class="grid-3">
                                <input type="text" style="width: 100%;" id="sys-conf-role-name-pop"/>
                            </div>
                        </div>
                        <div class="line">
                            <div class="grid-3">
                                Description
                            </div>
                            <div class="grid-5">
                                <input type="text" style="width: 100%;" id="sys-conf-role-description-pop"/>
                            </div>
                        </div>
				<div class="line"></div>
				<div class="line" style="text-align: center;">
					<div class="btn sky" onclick="WRPAdminApp.pagescript.setRoleInfo();">Save</div>
				</div>
			</div>
	</div>
	<div class="jqx-custom-window" id="permission-new-window">
		<div role="title">Edit</div>
			<div class="line" style="margin: 10px 10px 0px 30px;">
				<div class="line">
					<div class="grid-2">
						Name
					</div>
					<div class="grid-6">
						<input type="text" style="width: 100%;" id="sys-conf-permission-group-name-pop"/>
					</div>
				</div>
				<div class="line"></div>
				<div class="line" style="text-align: center;">
					<div class="btn sky" onclick="WRPAdminApp.pagescript.setPermissionGroupInfo();">Save</div>
				</div>
			</div>
	</div>
</div>