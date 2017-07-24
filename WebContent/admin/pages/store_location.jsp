<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    //session.setAttribute("wrp_admin_last_loaded_page", "store_location");
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
<div pagename="store_location" class="theme-02">
    <div class="page-submenu-container" style="display:none;">
        <!-- <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRP.UI.changePanelBySubmenu('store_location');">
            Store Locations
        </div> -->
        <!-- <div class="submenu" panelname="item_category" onclick="WRPAdminApp.setPage('item_category');">
            Item Category
        </div>
        <div class="border"></div> -->
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
        <div class="plain-01-panel" panelname="store_location">
                <div class="line" style="padding: 10px 30px; height:100%;">
                    <div class="grid-6">
                        <div class="plain-02-panel" style="height:100%;">
                            <div class="title-wrapper">
                                <div class="title">
                                    Market List
                                </div>
                                <div class="left-input-area">
									<div class="jqx-plain-button" style="width:140px;height: 17px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.initMarketInfo);">
                     					 + CREATE MARKET
                    				</div>
								</div>
                                <div class="right-input-area">
                                    <input type="text" placeholder="Keyword" id="store-group-search-market-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getMarketList();"/>
                                    <div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.getMarketList();" style="height: 17px;width:60px;display:inline-block">
										Apply
									</div>
                                    <div class="jqx-plain-button" id="excel_sys_market_list" style="height: 17px;display:inline-block">
										Export to Excel
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
									<div class="jqx-plain-button" style="width:140px;height: 17px;" onclick="WRPAdminApp.pagescript.initDistrictInfo();">
                     					 + CREATE DISTRICT
                    				</div>
								</div>
								
                                <div class="right-input-area">
                                	<input type="text" placeholder="Keyword" id="store-group-search-district-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getDistrictList();"/>
                                    <div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.getDistrictList();" style="height: 17px;width:60px;display:inline-block">
										Apply
									</div>
                                    <div class="jqx-plain-button" id="excel_sys_district_list" style="height: 17px;display:inline-block">
										Export to Excel
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
                                    Name
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
                                    Name
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
</div>