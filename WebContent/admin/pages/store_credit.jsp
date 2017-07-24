<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "store_credit");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
    JSONObject permissionData = null;
    if (!isOwner && owner_id != null && storeId != null) {
     //   permissionData = (JSONObject) ((JSONObject) UtilMethodClass.getSingleton().getPermissionData(owner_id, storeId, userId)).get("User");
    }

    JSONObject obj = null;
%>
<div pagename="store_credit" class="theme-02">
    
    <div class="panels" style="height:100%;">
        <div class="jqx-horizontal-split-panel" panelname="store_list" style="height: 100%;">
            <div class="plain-01-panel">
                <div class="title-wrapper">
                    <div class="title">
                        Store Credit
                    </div>
                    <div class="sub-title">
                        information Management
                    </div>
                    <div class="left-input-area">
                    </div>
                    <div class="right-input-area">
						<!-- <div class="search-container" style="width:250px;">
                          <input type="text" placeholder="Keyword" id="customers-search-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getCustomerList(); }"/>
                          <div class="right-btn" onclick="WRPAdminApp.pagescript.getCustomerList();">
                          </div>
                        </div> -->
                    </div>
                </div>
				<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-store-credit-list"></div>
				</div>
            </div>
        	<div class="plain-01-panel" style="width: 100%; height: 100%;">
				<div class="title-wrapper">
					<div class="title">Store Credit Detail</div>
					<div class="right-input-area" style="width: 700px; margin-right: -30px;">
						<!-- <div class="line" style="overflow: hidden;">
							<div class="grid-1-5">
								<div class="jqx-radio-button" id="store-porder-radio-1">1
									Week</div>
							</div>
							<div class="grid-1-5">
								<div class="jqx-radio-button" id="store-porder-radio-2">1
									Month</div>
							</div>
							<div class="grid-2">
								<div class="jqx-radio-button" id="store-porder-radio-3">3
									Months</div>
							</div>
							<div class="grid-2-5" style="margin-left: 0px;">
								<div class="jqx-datetime-input"
									id="stores-po-search-start-date"></div>
							</div>
							<div class="grid-2-5" style="margin-left: 7px;">
								<div class="jqx-datetime-input" id="stores-po-search-end-date"></div>
							</div>
							<div class="grid-2" style="margin-left: 0px;">
								<div class="btn sky" id="excel_store_po" style="float: right;">Export
									to Excel</div>
							</div>
						</div> -->
					</div>
				</div>
				<div class="content-wrapper" style="margin: 7px 50px 0px 47px;">
				<div class="line">
						Total Credit : 
						<input type="text" id="store-credit-total-value" style="margin-left:5px;font-size:13px;"/>
				</div>
				<div style="height: calc(100% - 53px);">
					<div id="jqx-store-credit-detail-list"></div>
				</div>
				</div>
			</div>
    </div>
</div>
</div>