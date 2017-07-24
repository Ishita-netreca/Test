<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "express_transfer");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
    JSONObject permissionData = null;
    if (!isOwner && owner_id != null && storeId != null) {
        //permissionData = (JSONObject) ((JSONObject) UtilMethodClass.getSingleton().getPermissionData(owner_id, storeId, userId)).get("User");
    }

    JSONObject obj = null;
%>
<div pagename="express_transfer" class="theme-02">
    <div class="page-submenu-container" style="display:none;">
        <div class="submenu" panelname="express_transfer" onclick="WRP.UI.changePanelBySubmenu('express_transfer');">
            Express Transfer
        </div>
        <div class="border"></div>
    </div>
    <div class="panels" style="height: 99%;">        
	    <div class="jqx-horizontal-split-panel" panelname="express_transfer" style="display: block;">
	    	<div class="plain-01-panel">
	    		<div class="title-wrapper">
                    <div class="title">
                        Express Transfer
                    </div>
                    <div class="sub-title">
                    </div>
                    <div class="left-input-area">
                    	<div class="jqx-plain-button" onclick="WRPAdminApp.pagescript.createExpressTrans();">Create Transfer</div>
                    </div>
                    <div class="right-input-area">	
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="express-transfer-radio-1">Today</div>
						</div>
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="express-transfer-radio-2">1 Week</div>
						</div>
						<div style="width:80px;display:inline-block;">
							<div class="jqx-radio-button" id="express-transfer-radio-3">1 Month</div>
						</div>
						<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="express-transfer-start-date"></div>
	                	</div>
	                	<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="express-transfer-end-date"></div>
	                	</div>											
	                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getExpressTransList();">Search</div>
					</div>
                </div>
        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 50px);">
        			<div id="express-transfer-request-list">
        			</div>
        		</div>
        	</div>
        	<div>
        		<div class="jqx-tab-panel">
        			<ul>
        				<li>Summary</li>
        				<li>Detail</li>
        			</ul>
        			<div class="plain-01-panel" style="overflow: auto;">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Summary
                    		</div>
                		</div>	 
                		<div class="content-wrapper" style="margin: 7px 50px 0px 47px;">
                			<div class="line">
                				Transfer Order : <span id="transfer-store-info"></span>
                			</div>
                			<div class="line" style="width: 730px;">
					 			<div class="grid-4" style="font-size:15px;">
					 				EMP ID : <span id="transfer-detail-emp-id"></span>
					 			</div>
					 			<div class="grid-4" style="font-size:15px;">
					 				DATE : <span id="transfer-detail-date"></span>
					 			</div>
					 			<div class="grid-4" style="text-align:right;font-size:15px;padding-right:20px;">
					 				Total : <span id="transfer-detail-total-qty"></span>
					 			</div>
					 		</div>
	                		<div class="line" style="margin: 3px 50px 0px 0px; height:calc(55% - 50px);">
                			<div id="express-transfer-summary-list">
        					</div>
		        			</div>
							<div class="line" style="margin-top:10px;">Memo</div>
						 	<textarea rows="6" style="width:80%" id="express-transfer-summary-memo" readonly></textarea>
				 			<div class="line">&nbsp;</div>
	        			</div> 	   
        			</div>
        			<div class="plain-01-panel" style="overflow: auto;">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Detail
                    		</div>
                		</div>	 	 
                		<div class="content-wrapper" style="margin: 7px 50px 0px 47px;">
                			<div class="line">
                				Transfer Order : <span id="transfer-store-info-detail"></span>
                			</div>
                			<div class="line" style="width: 730px;">
					 			<div class="grid-4" style="font-size:15px;">
					 				EMP ID : <span id="transfer-detail-emp-id-detail"></span>
					 			</div>
					 			<div class="grid-4" style="font-size:15px;">
					 				DATE : <span id="transfer-detail-date-detail"></span>
					 			</div>
					 			<div class="grid-4" style="text-align:right;font-size:15px;padding-right:20px;">
					 				Total : <span id="transfer-detail-total-qty-detail"></span>
					 			</div>
					 		</div>
	                		<div class="line" style="margin: 3px 50px 0px 0px; height:calc(55% - 50px);">
                			<div id="express-transfer-detail-list">
        					</div>
		        			</div>
							<div class="line" style="margin-top:10px;">Memo</div>
						 	<textarea rows="6" style="width:80%" id="express-transfer-detail-memo" readonly></textarea>
				 			<div class="line">&nbsp;</div>
	        			</div> 
        			</div>
        		</div>
        	</div>
	    </div>
	</div>
	<div class="jqx-custom-window" id="express-transfer-step-01">
		<div role="title">
	 		EXPRESS INVENTORY TRANSFER
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="margin-top:50px;margin-bottom:0px; padding-left:80px;">FROM</div>
	 		<div class="line" style="width:530px;padding: 35px 10px 35px 40px;border: 1px solid rgba(0,0,0,0.2);margin-left: 80px;">
	 			<div class="grid-4">
	 				MARKET<br/>
	 				<select id="from-store-market" disabled>
	 					<option></option>
	 				</select>
	 			</div>
	 			<div class="grid-4">
	 				DISTRICT<br/>
	 				<select id="from-store-district" disabled>
	 					<option></option>
	 				</select>
	 			</div>
	 			<div class="grid-4">
	 				STORE<br/>
	 				<select id="from-store-store" disabled>
	 					<option></option>
	 				</select>
	 			</div>
	 		</div>
	 		<div class="line" style="margin-top:30px;margin-bottom:0px; padding-left:80px;">TO</div>
	 		<div class="line" style="width:530px;padding: 35px 10px 35px 40px;border: 1px solid rgba(0,0,0,0.2);margin-left: 80px;">
	 			<div class="grid-4">
	 				MARKET<br/>
	 				<select id="to-store-market" onchange="WRPAdminApp.pagescript.getDistrictList(this.value);"></select>
	 			</div>
	 			<div class="grid-4">
	 				DISTRICT<br/>
	 				<select id="to-store-district" onchange="WRPAdminApp.pagescript.getToStoreList(this.value);"></select>
	 			</div>
	 			<div class="grid-4">
	 				STORE<br/>
	 				<select id="to-store-store" onchange="WRPAdminApp.pagescript._selectedToStore=this.value;"></select>
	 			</div>
	 		</div>
	 		<div class="line" style="position:absolute; bottom:20px;right:20px;">
				<div class="jqx-plain-button" style="float:right;margin-top:20px;" onclick="$('#express-transfer-step-01').jqxWindow('close');">Cancel</div>
	 			<div class="jqx-plain-button" style="float:right;margin-top:20px;margin-right:5px;" onclick="WRPAdminApp.pagescript.geToExpressPage();">Next</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="express-transfer-step-02">
	 	<div role="title">
	 		EXPRESS INVENTORY TRANSFER
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 				Transfer Order : <span id="trans-order-from"></span> -> <span id="trans-order-to"></span>
	 		</div>
	 		<div class="line">
	 				Transfer ID : <span id="transfer-order-id"></span>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
				<div class="search-container" style="position:absolute;right:0px;top:0px;width:250px;margin-right:10px;">
					<input type="text" style="top:-3px;" placeholder="search" id="express-transfer-search-item" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getStoreItemsList(); }"/>
					<div class="right-btn" onclick="try { WRPAdminApp.pagescript.getStoreItemsList(); } catch (e) {}"></div>
				</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				<div id="express-trans-store-items-list">
	 				</div>
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				Request Items
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				<div id="express-trans-request-items-list">
	 				</div>
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
		 		<div class="line" style="margin-top:10px;">Memo</div>
		 		<textarea rows="6" style="width:95%" id="express-transfer-note"></textarea>
	 		</div>
            <div class="hr">
            </div>
	 		<div class="line" style="bottom:20px;right:20px;">
				<div class="jqx-plain-button" style="float:right;margin-top:20px;" onclick="$('#express-transfer-step-02').jqxWindow('close');">Cancel</div>
	 			<div class="jqx-plain-button" style="float:right;margin-top:20px;margin-right:5px;" onclick="WRPAdminApp.pagescript.goToExpressConfirmPage();">Next</div>
	 		</div>
	 	</div>
	 </div>
	<div class="jqx-custom-window" id="express-transfer-step-03">
	 	<div role="title">
	 		EXPRESS INVENTORY TRANSFER
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="font-weight:bold;">
	 				Transfer Order : <span id="confirm-trans-order-from"></span> -> <span id="confirm-trans-order-to"></span>
	 		</div>
	 		<div class="line">
	 				Transfer ID : <span id="confirm-transfer-order-id"></span>
	 		</div>
	 		<div class="line">
	 			<div class="grid-4" style="font-size:15px;">
	 				EMP ID : <span id="confirm-transfer-emp-id"><%= userId %></span>
	 			</div>
	 			<div class="grid-4" style="font-size:15px;">
	 				DATE : <span id="confirm-transfer-date"></span>
	 			</div>
	 			<div class="grid-4" style="text-align:right;font-size:15px;padding-right:20px;">
	 				Total : <span id="confirm-transfer-total-qty"></span>
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				<div id="express-trans-order-items-list">
	 				</div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12" style="font-size:15px;">
	 				Serial Numbers
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				<div id="express-trans-order-serialized-items">
	 				</div>
	 			</div>
	 		</div>
	 		<div class="line" style="position:absolute;width:95%; bottom:20px;right:20px;">
				<div class="jqx-plain-button" style="float:left;margin-top:20px;" onclick="$('#express-transfer-step-02').jqxWindow('open');$('#express-transfer-step-03').jqxWindow('close');">Go Back</div>
				<div class="jqx-plain-button" style="float:right;margin-top:20px;" onclick="$('#express-transfer-step-03').jqxWindow('close');">Cancel</div>
	 			<div class="jqx-plain-button" style="float:right;margin-top:20px;margin-right:5px;" onclick="WRPAdminApp.pagescript.confirmSaveTransfer();">Confirm</div>
	 		</div>
	 	</div>
	 </div>
	 <div class="jqx-custom-window" id="express-transfer-serialized-item-window">
	 	<div role="title">
	 		Serialized Item
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-2">
	 				Transfer ID
	 			</div>
	 			<div class="grid-4" id="express-transfer-serialized-item-trans-id" style="font-weight: bold;">
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Item Code
	 			</div>
	 			<div class="grid-4" id="express-transfer-serialized-item-item-code" style="font-weight: bold;">
	 			</div>
	 			<div class="grid-2">
	 				SKU
	 			</div>
	 			<div class="grid-4" id="express-transfer-serialized-item-sku" style="font-weight: bold;">
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Description
	 			</div>
	 			<div class="grid-10" id="express-transfer-serialized-item-description" style="font-weight: bold;">
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-2" style="padding-left: 5px;">
	 				<div>&nbsp;</div>
                </div>
                <div class="grid-4">
                	<div id="scan_qty" style="float:left">0</div><div style="float:left">&nbsp;of&nbsp;</div><div style="float:left" id="input_qty"></div>
                </div>
	 		</div>
            <div class="line">
                <div class="grid-2" style="padding-left: 5px;">
	 				<div>&nbsp;</div>
                </div>
                <div class="grid-4" style="width:66%">
                	<input type="text" style="top:0px;width: 100%;" placeholder="Keyword" id="express-trans-serial-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.inputSerialNoInExpresss(this.value); this.value = ''; }"/>
                </div>
                <div class="grid-2" >
	                <div class="btn round" onclick="WRPAdminApp.pagescript.inputSerialNoInExpresss(document.getElementById('express-trans-serial-keyword').value); document.getElementById('express-trans-serial-keyword').value = '';"><div class="icon" style="background-image: url('img/icon/keyboard-01.png');"></div><div class="label">Add</div></div>
                </div>
            </div>
            <div class="line">
                <div class="grid-2" style="padding-left: 5px;">
                    SN / IMEI
                </div>
                <div class="grid-10">
            		<div id="express-transfer-serial-no-list">
                    </div>
                </div>
            </div>
            <div class="hr">
            </div>
            <div class="line">
            	<div class="grid-3">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.submitSerialItems();">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#express-transfer-serialized-item-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
</div>