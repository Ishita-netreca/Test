<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "notification");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
    
%>
<div pagename="notification" class="theme-02">
    <div class="page-submenu-container">
        <div class="submenu" panelname="notification" onclick="WRP.UI.changePanelBySubmenu('notification');">
            Notification
        </div>
    </div>
    <div class="panels">
        <div class="plain-01-panel" panelname="notification" style="display: block;">
            <div class="title-wrapper">
                <div class="title">
                    Notification
                </div>
                <div class="sub-title">
                    History Management
                </div>
                <div class="right-input-area">
                    <label><input type="radio" name="searchHistoryPeriod" value="1" onclick="WRPAdminApp.pagescript.onSearchPeriodTypeChange(this.value);" checked/>1 Week</label>
                    <label><input type="radio" name="searchHistoryPeriod" value="2" onclick="WRPAdminApp.pagescript.onSearchPeriodTypeChange(this.value);" />2 Week</label>
                    <label><input type="radio" name="searchHistoryPeriod" value="3" onclick="WRPAdminApp.pagescript.onSearchPeriodTypeChange(this.value);" />1 Month</label>
                    <label><input type="radio" name="searchHistoryPeriod" value="4" onclick="WRPAdminApp.pagescript.onSearchPeriodTypeChange(this.value);" />Period</label>
                    <div class="search-container period">
                        <input type="text" placeholder="Keyword" class="jquery-datepicker" id="clock-io-history-search-period-start" readonly />
                    </div>
                    <div class="search-container period">
                        <input type="text" placeholder="Keyword" class="jquery-datepicker" id="clock-io-history-search-period-end" readonly />
                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getClockIOHistoryInStore();">
                        </div>
                    </div>
                    <div class="search-container">
                        <input type="text" placeholder="Keyword" id="clock-io-history-search-keyword" onkeydown="if(event.keyCode === 13) {  }"/>
                        <div class="right-btn" onclick="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-wrapper">
                <div class="content">
                    <table class="header-fixed-table fill-height-parent" height="400">
                        <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th width="8.7%">Date</th>
                        <th width="7.1%">Work Start</th>
                        <th width="7.1%">Lunch Start</th>
                        <th width="7.1%">Lunch End</th>
                        <th width="7.1%">Work End</th>
                        <th width="7.1%">Work Hour</th>
                        <th width="7.1%">Overtime</th>
                        <th width="6.6%">Adj.</th>
                        </thead>
                        <tbody id="clock-io-history-list">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>