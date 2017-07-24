<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "eod");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;

%>
<div pagename="eod" class="theme-02">
    <div class="page-submenu-container">
        <div class="submenu" panelname="eod_list" onclick="WRP.UI.changePanelBySubmenu('eod_list');">
            EOD List
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_open" onclick="WRP.UI.changePanelBySubmenu('store_open');">
            Store Open
        </div>
    </div>
    <div class="panels">
    	<div class="jqx-horizontal-split-panel" panelname="eod_list" style="height: 100%;">
            <div class="plain-01-panel">
                <div class="title-wrapper">
                    <div class="title">
                        EOD
                    </div>
                    <div class="sub-title">

                    </div>
                    <div class="left-input-area">
                    </div>
                    <div class="right-input-area" style="width:740px;">
						<div class="line" style="overflow: hidden;">
							<div class="grid-1-5">&nbsp;</div>
							<div class="grid-1">
								<div class="jqx-radio-button" id="eod-radio-1" groupName="EOD">Today</div>
							</div>
							<div class="grid-1" style="width:60px;">
								<div class="jqx-radio-button" id="eod-radio-2" groupName="EOD">1 Week</div>
							</div>
							<div class="grid-1-5">
								<div class="jqx-radio-button" id="eod-radio-3" groupName="EOD">1 Month</div>
							</div>
							<div class="grid-2" style="margin-left:0px;">
								<div class="jqx-datetime-input" id="eod-start-date"></div>
							</div>
							<div class="grid-2" style="margin-left:7px;">
								<div class="jqx-datetime-input" id="eod-end-date"></div>
							</div>
							<div class="grid-1_5" style="margin-left:7px;">
								<div class="jqx-plain-button" id="eod-apply" style="width:80px;" onclick="WRPAdminApp.pagescript.getEODLogList();">Apply</div>
							</div>
							<div class="grid-1_5" style="margin-left:5px;">
								<div class="jqx-plain-button" id="excel-eod-grid" style="width:80px;">Excel</div>
							</div>
							
						</div>
					</div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
                    	<div id="jqx-eod-grid">
       					</div>
                </div>
            </div>
            <div class="plain-02-panel" id="eod-detail-view" style="height: 45%; padding: 10px 15px;">
				<div class="title-wrapper">
                    <div class="title">
                        EOD Report
                    </div>
                    <div class="sub-title">

                    </div>
                    <div class="left-input-area">
                    	<div class="line">
                    		<div class="grid-9">Date : <span id="eod-report-eod-date"></span></div>
                    		<div class="grid-3"><div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.printEOD();">Print</div></div>
                    	</div>
                    </div>
                </div>
                <div class="content-wrapper" style="margin-left:0px;">
                    <div class="content" style="padding-top: 10px;">
						<div class="eod-table" id="eod-info-table-1">
							<div class="tr">
								<div class="td header" style="">&nbsp;</div>
								<div class="td header">Sales</div>
								<div class="td header">Return</div>
								<div class="td header">Net Total</div>
								<div class="td header">Floating</div>
								<div class="td header">System Total</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td header">Physical Total</div>
								<div class="td header">Variance</div>
							</div>
							<div class="tr">
								<div class="td text_center">Cash</div>
								<div class="td" id="eod-report-cash-sales-amount" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-refund-amount" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-nettotal-amount" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-floating-amount" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-system-total" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-cash-actual-amount" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td none" style="text-align: right;"></div>
							</div>
							<div class="tr">
								<div class="td text_center">Cash Safe</div>							
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-cash-out-actual-amount" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td none" style="text-align: right;"></div>
							</div>
							<div class="tr">
								<div class="td text_center">Expense</div>							
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td none">&nbsp;</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-expense-actual-amount" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td none" style="text-align: right;"></div>
							</div>
							<div class="tr">
								<div class="td text_center">Cash Total</div>							
								<div class="td" id="eod-report-cash-total-sales" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-total-return" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-total-net-total" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-total-floating" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-cash-total-system-total" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-cash-total-physical-total" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td" id="eod-report-cash-total-variance" style="text-align: right;">$0.00</div>
							</div>
							<div class="tr">
								<div class="td line" style="height:2px;"></div>							
								<div class="td line" style="height:2px;"></div>
								<div class="td line" style="height:2px;"></div>
								<div class="td line" style="height:2px;"></div>
								<div class="td line" style="height:2px;"></div>
								<div class="td line" style="height:2px;"></div>
								<div class="td line" style="height:2px;width:3px;padding:0px;"></div>
								<div class="td line" style="height:2px;"></div>
								<div class="td line" style="height:2px;"></div>
							</div>
							<div class="tr">
								<div class="td text_center">Credit Card</div>							
								<div class="td" id="eod-report-credit-sales-amount" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-credit-refund-amount"  style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-credit-nettotal-amount"  style="text-align: right;">$0.00</div>
								<div class="td none">&nbsp;</div>
								<div class="td" id="eod-report-credit-system-total"  style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-credit-actual-amount" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td" id="eod-report-credit-variance-amount" style="text-align: right;">$0.00</div>
							</div>
							<div class="tr">
								<div class="td text_center">Debit Card</div>							
								<div class="td" id="eod-report-debit-sales-amount"  style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-debit-refund-amount"  style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-debit-nettotal-amount" style="text-align: right;">$0.00</div>
								<div class="td none">&nbsp;</div>
								<div class="td" id="eod-report-debit-system-total"  style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-debit-actual-amount" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td" id="eod-report-debit-variance-amount"  style="text-align: right;">$0.00</div>
							</div>
							<div class="tr">
								<div class="td text_center">Finance</div>							
								<div class="td" id="eod-report-finance-sales-amount" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-finance-refund-amount" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-finance-nettotal-amount" style="text-align: right;">$0.00</div>
								<div class="td none">&nbsp;</div>
								<div class="td" id="eod-report-finance-system-total" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-finance-actual-amount" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td" id="eod-report-finance-variance" style="text-align: right;">$0.00</div>
							</div>
							<div class="tr">
								<div class="td line" style="height:7px;"></div>							
								<div class="td line" style="height:7px;"></div>
								<div class="td line" style="height:7px;"></div>
								<div class="td line" style="height:7px;"></div>
								<div class="td line" style="height:7px;"></div>
								<div class="td line" style="height:7px;"></div>
								<div class="td line" style="height:7px;width:3px;padding:0px;"></div>
								<div class="td line" style="height:7px;"></div>
								<div class="td line" style="height:7px;"></div>
							</div>
							<div class="tr">
								<div class="td text_center">Total</div>							
								<div class="td" id="eod-report-total-sales-amount" style="text-align: right;font-size:12px;font-weight:bold;"></div>
								<div class="td" id="eod-report-total-refund-amount" style="text-align: right;font-size:12px;font-weight:bold;"></div>
								<div class="td" id="eod-report-total-nettotal-amount" style="text-align: right;font-size:12px;font-weight:bold;"></div>
								<div class="td none"></div>
								<div class="td" id="eod-report-total-system-total" style="text-align: right;font-size:12px;font-weight:bold;"></div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-total-actual-amount"  style="text-align: right;font-size:12px;font-weight:bold;"></div>
								<div class="td" id="eod-report-total-variance-amount" style="text-align: right;"></div>
							</div>
						</div>
						<div class="eod-table" id="eod-info-table-2" style="margin-top:15px;">
							<div class="tr">
								<div class="td header" style="">&nbsp;</div>
								<div class="td header">Qpay POS Sales</div>
								<div class="td header">Qpay POS Return</div>
								<div class="td header">Qpay POS Net Total</div>
								<div class="td header">&nbsp;</div>
								<div class="td header">Qpay POS Total</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td header">Qpay Web Total</div>
								<div class="td header">Variance</div>
							</div>
							<div class="tr">
								<div class="td text_center">Qpay</div>
								<div class="td" id="eod-report-qpay-sales" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-qpay-return" style="text-align: right;">$0.00</div>
								<div class="td" id="eod-report-qpay-net-total" style="text-align: right;">$0.00</div>
								<div class="td none">&nbsp;</div>
								<div class="td" id="eod-report-qpay-total" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td line" style="width:3px;padding:0px;"></div>
								<div class="td" id="eod-report-qpay-web-total" style="text-align: right;font-size:12px;font-weight:bold;">$0.00</div>
								<div class="td" id="eod-report-qpay-variance" style="text-align: right;">$0.00</div>
							</div>
						</div>
						<div class="line" style="padding-top:15px;">
							<div class="grid-2_5" style="width:160px; text-align:center;">Note</div>
							<div class="grid-9_5" style="margin-left: -1px;width:80%;"> <textarea id="eod-report-eod-note" style="height:70px;" readonly></textarea></div>
						</div>	
                    </div>
                </div>
            </div>
        </div>
        <div class="jqx-horizontal-split-panel" panelname="store_open" style="height: 100%; display: none;">
            <div class="plain-01-panel">
                <div class="title-wrapper">
                    <div class="title">
                        Store Open
                    </div>
                    <div class="sub-title">

                    </div>
                    <div class="left-input-area">
                    </div>
                    
                    <div class="right-input-area" style="width:740px;">
                    	<div class="line" style="overflow: hidden;">
							<div class="grid-1-5">&nbsp;</div>
							<div class="grid-1">
								<div class="jqx-radio-button" id="store-open-radio-1" groupName="storeOpen">Today</div>
							</div>
							<div class="grid-1" style="width:60px;">
								<div class="jqx-radio-button" id="store-open-radio-2" groupName="storeOpen">1 Week</div>
							</div>
							<div class="grid-1-5">
								<div class="jqx-radio-button" id="store-open-radio-3" groupName="storeOpen">1 Month</div>
							</div>
							<div class="grid-2" style="margin-left:0px;">
								<div class="jqx-datetime-input" id="store-open-start-date"></div>
							</div>
							<div class="grid-2" style="margin-left:7px;">
								<div class="jqx-datetime-input" id="store-open-end-date"></div>
							</div>
							<div class="grid-1_5" style="margin-left:7px;">
								<div class="jqx-plain-button" id="store-open-apply" style="width:80px;" onclick="WRPAdminApp.pagescript.getStoreOpenList();">Apply</div>
							</div>
							<div class="grid-1_5" style="margin-left:5px;">
								<div class="jqx-plain-button" id="excel-store-open-grid" style="width:80px;">Excel</div>
							</div>
							
						</div>
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
                    <div id="jqx-store-open-grid"></div>	
                </div>
            </div>
            <div class="plain-01-panel" style="height: 45%; padding: 10px 15px;">
				<div class="title-wrapper">
                    <div class="title">
                        Store Open Details
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
                    <div id="jqx-store-open-details-grid"></div>	
                </div>
            </div>
        </div>
    </div>
</div>