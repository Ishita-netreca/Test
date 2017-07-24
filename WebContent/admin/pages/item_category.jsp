<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    //session.setAttribute("wrp_admin_last_loaded_page", "item_category");
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
<div pagename="item_category" class="theme-02">
    <div class="page-submenu-container" style="display:none;">
        <div class="submenu" panelname="item_category" onclick="WRPAdminApp.setPage('item_category');">
            Item Category
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="chart_of_account" onclick="WRPAdminApp.setPage('cashRegister');">
            Station
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="dt_setup" onclick="WRPAdminApp.setPage('dt_setup');">
            Date & Time Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="emp_roles" onclick="WRPAdminApp.setPage('emp_roles');">
            Employee Roles
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="permission_group" onclick="WRPAdminApp.setPage('permission_group');">
            Permission Group
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRPAdminApp.setPage('store_location');">
            Region Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRPAdminApp.setPage('qpay_favorite_providers');">
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
                                    <!--
                                    <div class="search-container">
                                        <input type="text" placeholder="Keyword" id="store-group-search-market-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getMarketList();"/>
                                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getMarketList();">
                                        </div>
                                    </div>
                                    -->
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
                                <!--
                                    <div class="search-container">
                                        <input type="text" placeholder="Keyword" id="store-group-search-district-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getDistrictList();"/>
                                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getDistrictList();">
                                        </div>
                                    </div>
                                -->
                            </div>
                        </div>
                        <div style="margin-top:3px; height:calc(100% - 53px);">
							<div id="jqx-sys-sub-category-list"></div>
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
</div>