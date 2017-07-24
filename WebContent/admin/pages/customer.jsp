<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "customer");
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
<div pagename="customer" class="theme-02">
    <div class="page-submenu-container" style="display:none;">
        <div class="submenu" panelname="customer_list" onclick="WRP.UI.changePanelBySubmenu('customer_list');">
            Customer List
        </div>
    </div>
    <div class="panels" style="height:100%;">
        <div class="jqx-horizontal-split-panel" panelname="customer_list" style="height: 100%;">
            <div class="plain-01-panel">
                <div class="title-wrapper">
                    <div class="title">
                        Customers
                    </div>
                    <div class="sub-title">
                        information Management
                    </div>
                    <div class="left-input-area">
                        <div class="jqx-plain-button" style="width:140px;" onclick="WRPAdminApp.pagescript.PopCustomerAdd();">
                            + ADD CUSTOMER
                        </div>
                    </div>
                    <div class="right-input-area">
                        <input type="text" placeholder="Keyword" id="customers-search-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getCustomerList(); }"/>
                        <div class="jqx-plain-button" style="width:70px; display:inline-block;"onclick="WRPAdminApp.pagescript.getCustomerList();">Apply</div>
                        <div class="jqx-plain-button" style="display:inline-block" id="excel-customers-list" style="float:right;">Export to Excel</div>
                    </div>
                </div>
				<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-customer-list"></div>
				</div>
            </div>
        	<div>
        		<div class="jqx-tab-panel">
        			<ul>
        				<li>Profile</li>
        				<li>Sales History</li>
        				<li>Activations</li>
        				<li>Store Credit</li>
        			</ul>
                    <div class="plain-01-panel" style="width: 100%; height: 100%;">
                            <div class="title-wrapper">
                                <div class="title">
                                    Profile
                                </div>
                            </div>
                       <div class="content-wrapper">
                        <div class="line" id="customer-profile-container">
                            <div class="line">
                                <div class="grid-2">
                                    ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-id" readonly/>
                                </div>
                                <div class="grid-2">
                                    ASAP Pin
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-pin" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2">
                                    First Name
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-first-name" readonly/>
                                </div>
                                <div class="grid-2">
                                    Address1
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-address1" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2">
                                    Middle Name
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-middle-name" readonly/>
                                </div>
                                <div class="grid-2">
                                    Address2
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-address2" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2">
                                    Last Name
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-last-name" readonly/>
                                </div>
                                <div class="grid-2">
                                    City
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-city" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2">
                                    e-Mail
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-email" readonly/>
                                </div>
                                <div class="grid-2">
                                    State
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-state" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2">
                                    Tel
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-tel" readonly/>
                                </div>
                                <div class="grid-2">
                                    Zipcode
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-zipcode" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2">
                                    Company
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-company" readonly/>
                                </div>
                                <div class="grid-2">
                                    Join Date
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="customer-profile-join-date" readonly/>
                                </div>
                            </div>
                        </div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
                            <div class="title-wrapper">
                                <div class="title">
                                    Sales History
                                </div>
                                <div class="left-input-area">
									</div>
                                <div class="right-input-area" style="width:635px;">
                                	<div class="line" style="overflow: hidden;">
										<div class="grid-1-5" style="width:60px;">
											<div class="jqx-radio-button" id="customer-sales-history-radio-1" groupName="CustomerSalesHistory">1 Week</div>
										</div>
										<div class="grid-1-5" style="width:60px;">
											<div class="jqx-radio-button" id="customer-sales-history-radio-2" groupName="CustomerSalesHistory">1 Month</div>
										</div>
										<div class="grid-2" >
											<div class="jqx-radio-button" id="customer-sales-history-radio-3" groupName="CustomerSalesHistory">3 Months</div>
										</div>
										<div class="grid-2-5" style="width:110px;margin-left:0px;">
											<div class="jqx-datetime-input" id="sales-history-search-start-date"></div>
										</div>
										<div class="grid-2-5" style="width:110px;margin-left:5px;">
											<div class="jqx-datetime-input" id="sales-history-search-end-date"></div>
										</div>
										<div class="grid-2" style="margin-left:13px;width:70px;">
											<div class="jqx-plain-button" style="width:70px;float: right;" onclick="WRPAdminApp.pagescript.getSalesHistoryList();">Apply</div>
										</div>
										<div class="grid-2" style="width:70px;">
											<div class="jqx-plain-button" id="excel-customer-sales-history" style="width:70px;float: right;">Excel</div>
										</div>
									</div>
                                </div>
                            </div>
                            <div style="margin: 3px 50px 0px 32px; height: 80%;">
								<div id="jqx-customers-sales-history"></div>
							</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
                            <div class="title-wrapper">
                                <div class="title">
                                    Activations
                                </div>
                                <div class="left-input-area">
                                </div>
                                <div class="right-input-area">
                                    <span style="font-size: 11px; margin-right:10px;">Activation Type</span>
                                    <select id="customers-activations-select-transaction-type" onchange="WRPAdminApp.pagescript.getCustomerActivationsList();">
                                        <option value="">ALL</option>
                                        <option value="12">Add a Line - New Handset</option>
                                        <option value="13">Add a Line - BYOD Handset</option>
                                        <option value="0">New Activation - New Handset</option>
                                        <option value="4">New Activation - BYOD Handset</option>
                                        <option value="3">Port In - New Handset</option>
                                        <option value="7">Port In - BYOD Handset</option>
                                        <option value="1">Re Activation - New Handset</option>
                                        <option value="5">Re Activation - BYOD Handset</option>
                                    </select>
                                    <div class="jqx-plain-button" id="excel-customer-activation-list" style="margin-left:5px;float:right;">
				                        Export to Excel
				                    </div>
                                </div>
                            </div>
						<div style="margin: 3px 50px 0px 32px; height: 80%;">
							<div id="jqx-customers-activations-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
                            <div class="title-wrapper">
                                <div class="title">
                                    Store Credit
                                </div>
                                <div class="left-input-area">
                                	<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.pagescript.getCreditOutPop();">
                            			Credit Out
                        			</div>
								</div>
                                <div class="right-input-area" style="width:642px;">
                                	<div class="line" style="overflow: hidden;">
										<div class="grid-1-5" style="width:65px;">
											<div class="jqx-radio-button" id="customer-store-credit-radio-1" groupName="CustomerStoreCredit">1 Month</div>
										</div>
										<div class="grid-1-5" style="width:70px;">
											<div class="jqx-radio-button" id="customer-store-credit-radio-2" groupName="CustomerStoreCredit">2 Months</div>
										</div>
										<div class="grid-2" style="width:87px;">
											<div class="jqx-radio-button" id="customer-store-credit-radio-3" groupName="CustomerStoreCredit">3 Months</div>
										</div>
										<div class="grid-2-5" style="margin-left:0px;width:110px;">
											<div class="jqx-datetime-input" id="store-credit-search-start-date"></div>
										</div>
										<div class="grid-2-5" style="margin-left:5px;width:110px;">
											<div class="jqx-datetime-input" id="store-credit-search-end-date"></div>
										</div>
										<div class="grid-2" style="margin-left:13px;width:70px;">
											<div class="jqx-plain-button" style="width:70px;float: right;" onclick="WRPAdminApp.pagescript.getStoreCreditList();">Apply</div>
										</div>
										<div class="grid-2" style="width:70px;">
											<div class="jqx-plain-button" id="excel-store-credit-history" style="width:70px;float: right;">Excel</div>
										</div>
									</div>
                                </div>
                            </div>
							<div style="margin: 3px 50px 0px 32px; height: 80%;">
								<div id="jqx-customers-store-credit-history"></div>
							</div>
					</div>
            	</div>
        	</div>
    </div>
</div>
    <div class="jqx-custom-window" id="customer-edit-window">
		<div class="title-wrapper">
			<div class="title">Profile</div>
		</div>
		<div class="content-wrapper">
			<div class="line" id="customer-profile-container" style="margin: 10px 0px 0px 20px;">
				<div class="line">
					<div class="grid-2">ID</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-id-pop" />
					</div>
					<div class="grid-2">ASAP Pin</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-pin-pop" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2">First Name</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-first-name-pop" />
					</div>
					<div class="grid-2">Address1</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-address1-pop" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2">Middle Name</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-middle-name-pop" />
					</div>
					<div class="grid-2">Address2</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-address2-pop" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2">Last Name</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-last-name-pop" />
					</div>
					<div class="grid-2">City</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-city-pop" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2">e-Mail</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-email-pop" />
					</div>
					<div class="grid-2">State</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-state-pop" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2">Tel</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-tel-pop" />
					</div>
					<div class="grid-2">Zipcode</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-zipcode-pop" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2">Company</div>
					<div class="grid-4">
						<input type="text" class="fill_width_parent" id="customer-profile-company-pop" />
					</div>
					<div class="grid-2">Join Date</div>
					<div class="grid-4" style="width:140px;">
						<input type="text" class="jqx-datetime-input" id="customer-profile-join-date-pop" />
					</div>
				</div>
				<div class="line"></div>
				<div class="line" style="text-align: center;">
					<div class="jqx-plain-button" style="width:90px; display:inline-block;" onclick="WRPAdminApp.pagescript.setCustomerData();">
                        Save
                    </div>
				</div>

			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="credit-out-window">
		<div class="title-wrapper">
			<div class="title">Credit out</div>
		</div>
		<div class="content-wrapper">
			<div class="line" style="margin: 15px 0px 0px 20px;">
				<div class="line">
					<div class="grid-3">Customer ID</div>
					<div class="grid-8">
						<input type="text" class="fill_width_parent" id="credit-out-customer-id" style="width:100%;" readonly/>
					</div>
				</div>
					<div class="line">
					<div class="grid-3">Total</div>
					<div class="grid-8">
						<input type="text" class="fill_width_parent" id="credit-out-credit-total" style="width:100%;" readonly/>
					</div>
				</div>
				<div class="line">
					<div class="grid-3">Out Amount</div>
					<div class="grid-8">
						<input type="text" class="fill_width_parent" id="credit-out-credit-amount" style="width:100%;" />
					</div>
				</div>
				<div class="line">
					<div class="grid-3">Reason</div>
					<div class="grid-8">
						<select id="credit-out-reason-type" style="width:100%;">
			        		<!-- <option value="0">None</option> -->
			        		<option value="2">Check</option>
			        		<option value="3">Cash</option>
			        		<option value="0">Others</option>
			        	</select>
					</div>
				</div>
					<div class="line">
					<div class="grid-3">Note</div>
					<div class="grid-8">
						<textarea id="credit-out-creidt-note" style="width: 100%; height:100px; border: rgba(217, 217, 217, 1) 1px solid;" ></textarea>
					</div>
				</div>
				<div class="line"></div>
				<div class="line" style="text-align: center;">
					<div class="jqx-plain-button" style="width:90px; display:inline-block;" onclick="WRPAdminApp.pagescript.setStoreCreditOut();">
                        Save
                    </div>
				</div>

			</div>
		</div>
	</div>
</div>