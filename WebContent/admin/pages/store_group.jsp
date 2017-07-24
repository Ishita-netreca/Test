<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
session.setAttribute("wrp_admin_last_loaded_page", "store_group");
%>

<div pagename="store_group" class="theme-01">
    <div class="page-title-wrapper">
        <div class="page-title">
            Store Group
        </div>
        <div class="page-sub-title">
            Store Group Management
        </div>
        <div class="left-input-area">
        </div>
        <div class="right-input-area">

        </div>
    </div>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="line">
                <div class="grid-6">
                    <div class="panel">
                        <div class="title no-icon">
                            <div class="left-area">
                              Market List
                            </div>
                            <div class="right-area">
                                <div class="search-container">
                                    <input type="text" placeholder="Keyword" id="store-group-search-market-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getMarketList();"/>
                                    <div class="right-btn" onclick="WRPAdminApp.pagescript.getMarketList();">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <table class="header-fixed-table fill-height-parent" height="420">
                                <thead>
                                    <tr>
                                        <th>Market Code</th>
                                        <th>Description</th>
                                        <th>Tel</th>
                                    </tr>
                                </thead>
                                <tbody id="store-group-market-list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="line" style="text-align: right; padding-right: 10px;">
                        <div class="btn sky" onclick="WRPAdminApp.pagescript.initMarketInfo();">+ NEW MARKET</div>
                    </div>
                </div>
                <div class="grid-6">
                    <div class="panel">
                        <div class="title no-icon">
                            <div class="left-area">
                                District List
                            </div>
                            <div class="right-area">
                                <div class="search-container">
                                    <input type="text" placeholder="Keyword" id="store-group-search-district-keyword" onkeydown="if(event.keyCode === 13) WRPAdminApp.pagescript.getDistrictList();"/>
                                    <div class="right-btn" onclick="WRPAdminApp.pagescript.getDistrictList();">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <table class="header-fixed-table fill-height-parent" height="420">
                                <thead>
                                    <tr>
                                        <th>District Code</th>
                                        <th>Description</th>
                                        <th>Tel</th>
                                        <th>Dist.</th>
                                    </tr>
                                </thead>
                                <tbody id="store-group-district-list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="line" style="text-align: right; padding-right: 10px;">
                        <div class="btn sky" onclick="WRPAdminApp.pagescript.initDistrictInfo();">+ NEW DISTRICT</div>
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
</div>