<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "inven_transfer");
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
<div pagename="inven_transfer" class="theme-02">
    <div class="page-submenu-container">
        <div class="submenu" panelname="request_list" onclick="WRP.UI.changePanelBySubmenu('request_list');">
            Request List
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="order_list" onclick="WRP.UI.changePanelBySubmenu('order_list');">
            Order List
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="transfer_adjustment" onclick="WRP.UI.changePanelBySubmenu('transfer_adjustment');">
            Transfer Adjustment
        </div>
    </div>
    <div class="panels">        
	    <div class="jqx-horizontal-split-panel" panelname="request_list" style="display: block;">
	    	<div class="plain-01-panel">
	    		<div class="title-wrapper">
                    <div class="title">
                        Transfer Request List
                    </div>
                    <div class="sub-title">
                    </div>
                    <div class="left-input-area">
                    </div>
                    <div class="right-input-area">	
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="transfer-request-radio-1" groupName="RequestList">Today</div>
						</div>
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="transfer-request-radio-2" groupName="RequestList">1 Week</div>
						</div>
						<div style="width:80px;display:inline-block;">
							<div class="jqx-radio-button" id="transfer-request-radio-3" groupName="RequestList">1 Month</div>
						</div>
						<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="transfer-request-start-date"></div>
	                	</div>
	                	<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="transfer-request-end-date"></div>
	                	</div>											
	                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getReqList();">Apply</div>
                        <input type="text" class="jqx-text-input" placeholder="Keyword" id="transfer-request-input-keyword" style="display:inline-block;width:120px;float:right;margin-left: 15px;margin-right: 5px;" onkeydown="if(event.keyCode === 13){ WRPAdminApp.pagescript.getReqList(); }"/>
					</div>
                </div>
        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 50px);">
        			<div id="transfer-request-list">
        			</div>
        		</div>
        	</div>
        	<div>
        		<div class="jqx-tab-panel">
        			<ul>
        				<li>Req.Items</li>
        				<li>Transactions</li>
        				<li>Tracking Log</li>
        			</ul>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Req.Items
                    		</div>
                		</div>		  	   
                		<div class="content-wrapper" style="overflow-y: auto;">
	                		<div class="line" style="margin: 3px 0px 0px 0px; height: 55%;overflow:hidden;">
	                			<div id="transfer-request-item-detail-list">
        						</div>
			        		</div>	  	   
	                		<div class="line" style="margin-top:10px;">Memo</div>
		 					<textarea rows="6" style="width:80%" id="transfer-request-detail-note" readonly></textarea>
	 					</div>
        			</div>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Transactions
                    		</div>
                		</div>	   
                		<div class="line" style="margin: 3px 50px 0px 35px; height:calc(100% - 50px);">   
                			<div id="transfer-request-transaction-list">
        					</div>  			
		        		</div>
        			</div>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Tracking Log
                    		</div>
                		</div>	   
                		<div class="line" style="margin: 3px 50px 0px 35px; height:calc(100% - 50px);">    
                			<div id="transfer-request-tracking-log">
        					</div>      			
		        		</div>
        			</div>
        		</div>
        	</div>
	    </div>
    	<div class="jqx-horizontal-split-panel" panelname="order_list" style="display: none;">
			<div class="plain-01-panel">
	    		<div class="title-wrapper">
                    <div class="title">
                        Transfer Order List
                    </div>
                    <div class="sub-title">
                    </div>
                    <div class="left-input-area">
                    </div>
                    <div class="right-input-area">	
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="transfer-order-radio-1" groupName="OrderList">Today</div>
						</div>
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="transfer-order-radio-2" groupName="OrderList">1 Week</div>
						</div>
						<div style="width:80px;display:inline-block;">
							<div class="jqx-radio-button" id="transfer-order-radio-3" groupName="OrderList">1 Month</div>
						</div>
						<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="transfer-order-start-date"></div>
	                	</div>
	                	<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="transfer-order-end-date"></div>
	                	</div>											
	                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getOrderList();">Apply</div>
                        <input type="text" class="jqx-text-input" placeholder="Keyword" id="transfer-order-input-keyword" style="display:inline-block;width:120px;float:right;margin-left: 15px;margin-right: 5px;" onkeydown="if(event.keyCode === 13){ WRPAdminApp.pagescript.getOrderList(); }"/>
					</div>
                </div>
        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 50px);">
        			<div id="transfer-order-list">
        			</div>
        		</div>
        	</div>
        	<div>
        		<div class="jqx-tab-panel">
        			<ul>
        				<li>Items</li>
        				<li>Fulfill</li>
        				<li>Pickup</li>
        				<li>Receive</li>
        				<li>Tracking Log</li>
        			</ul>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Items
                    		</div>
                		</div>	  	   
                		<div class="line" style="margin: 3px 50px 0px 35px; height: calc(100% - 53px);">
                			<div id="transfer-order-item-detail-list">
        					</div>
		        		</div> 
        			</div>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Fulfill
                    		</div>
                		</div>	  	   
                		<div class="content-wrapper" style="overflow-y: auto;">
	                		<div class="line" style="margin: 3px 0px 0px 0px; height: 55%;overflow:hidden;">
	                			<div id="transfer-order-fulfill-detail-list">
	        					</div>
			        		</div>	  	   
	                		<div class="line" style="margin-top:10px;">Memo</div>
		 					<textarea rows="6" style="width:80%" id="transfer-detail-fulfill-note" readonly></textarea>
	 					</div>
        			</div>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Pickup
                    		</div>
                		</div>	  	   
                		<div class="content-wrapper" style="overflow-y: auto;">
	                		<div class="line" style="margin: 3px 0px 0px 0px; height: 55%;overflow:hidden;">
	                			<div id="transfer-order-pickup-detail-list">
        						</div>
			        		</div>	  	   
	                		<div class="line" style="margin-top:10px;">Memo</div>
		 					<textarea rows="6" style="width:80%" id="transfer-detail-pickup-note" readonly></textarea>
	 					</div>	  
        			</div>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Receive
                    		</div>
                		</div>	  	   
                		<div class="content-wrapper" style="overflow-y: auto;">
	                		<div class="line" style="margin: 3px 0px 0px 0px; height: 55%;overflow:hidden;">
	                			<div id="transfer-order-receive-detail-list">
        						</div>
			        		</div>	  	   
	                		<div class="line" style="margin-top:10px;">Memo</div>
		 					<textarea rows="6" style="width:80%" id="transfer-detail-recv-note" readonly></textarea>
	 					</div>	 
        			</div>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Tracking Log
                    		</div>
                		</div>	   
                		<div class="line" style="margin: 3px 50px 0px 35px; height:calc(100% - 50px);">    
                			<div id="transfer-order-tracking-log">
        					</div>      			
		        		</div>
        			</div>
        		</div>
        	</div>
    	</div>
        		<div class="jqx-tab-panel" panelname="transfer_adjustment" style="display: none;">
        			<ul>
        				<li>Revert Assignment</li>
        				<li>Revert Fulfillment</li>
        				<li>Incomplete Receive</li>
        			</ul>
        			<div class="jqx-horizontal-split-panel">
	        			<div class="plain-01-panel">
				    		<div class="title-wrapper">
			                    <div class="title">
			                        Revert Assignment
			                    </div>
			                    <div class="sub-title">
			                    </div>
			                    <div class="left-input-area">
			                    </div>
			                    <div class="right-input-area">	
									<div style="width:70px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-assign-radio-1" groupName="Adjustassign">Today</div>
									</div>
									<div style="width:70px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-assign-radio-2" groupName="Adjustassign">1 Week</div>
									</div>
									<div style="width:80px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-assign-radio-3" groupName="Adjustassign">1 Month</div>
									</div>
									<div style="width:100px; display:inline-block;">
				                    	<div class="jqx-datetime-input" id="transfer-adjust-assign-start-date"></div>
				                	</div>
				                	<div style="width:100px; display:inline-block;">
				                    	<div class="jqx-datetime-input" id="transfer-adjust-assign-end-date"></div>
				                	</div>											
				                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getAdjustAssginList();">Apply</div>
								</div>
			                </div>
			        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 50px);">
			        			<div id="transfer-revert-assign-list">
			        			</div>
			        		</div>
			        	</div>
						<div style="height: 39%">
							<div class="jqx-tab-panel">
								<ul>
									<li>Items</li>
								</ul>
								<div class="plain-01-panel" style="overflow: auto;">
									<div class="title-wrapper">
										<div class="title">Items</div>
									</div>
					                <div class="content-wrapper" style="overflow-y: auto;">
										<div class="line" style="margin: 3px 0px 0px 0px; height: 55%;overflow:hidden;">
											<div id="transfer-adjust-items-list">
											</div>
										</div>	  	   
										<div class="line" style="margin-top:10px;">Memo</div>
										<textarea rows="6" style="width:80%" id="transfer-adjust-note" readonly></textarea>
									</div> 
								</div>
							</div>
						</div>
					</div>
        			<div class="jqx-horizontal-split-panel">
	        			<div class="plain-01-panel">	
	        				<div class="title-wrapper">
	                    		<div class="title">
	                       			Revert Fulfillment
	                    		</div>
			                    <div class="sub-title">
			                    </div>
			                    <div class="left-input-area">
			                    </div>
			                    <div class="right-input-area">	
									<div style="width:70px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-fulfill-radio-1" groupName="Adjustfulfill">Today</div>
									</div>
									<div style="width:70px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-fulfill-radio-2" groupName="Adjustfulfill">1 Week</div>
									</div>
									<div style="width:80px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-fulfill-radio-3" groupName="Adjustfulfill">1 Month</div>
									</div>
									<div style="width:100px; display:inline-block;">
				                    	<div class="jqx-datetime-input" id="transfer-adjust-fulfill-start-date"></div>
				                	</div>
				                	<div style="width:100px; display:inline-block;">
				                    	<div class="jqx-datetime-input" id="transfer-adjust-fulfill-end-date"></div>
				                	</div>											
				                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getAdjustFulfillList();">Apply</div>
								</div>
	                		</div>	   
	                		<div class="line" style="margin: 3px 50px 0px 35px; height:calc(100% - 50px);""> 
			        			<div id="transfer-revert-fulfill-list">
			        			</div>    			
			        		</div>
	        			</div>
						<div style="height: 39%">
							<div class="jqx-tab-panel">
								<ul>
									<li>Items</li>
								</ul>
								<div class="plain-01-panel" style="overflow: auto;">
									<div class="title-wrapper">
										<div class="title">Items</div>
									</div>
					                <div class="content-wrapper" style="overflow-y: auto;">
										<div class="line" style="margin: 3px 0px 0px 0px; height: 55%;overflow:hidden;">
											<div id="transfer-adjust-fulfill-items-list">
											</div>
										</div>	  	   
										<div class="line" style="margin-top:10px;">Memo</div>
										<textarea rows="6" style="width:80%" id="transfer-adjust-fulfill-note" readonly></textarea>
									</div> 
								</div>
							</div>
						</div>
					</div>
					<div class="jqx-horizontal-split-panel">
	        			<div class="plain-01-panel">	
	        				<div class="title-wrapper">
	                    		<div class="title">
	                       			Incomplete Receive
	                    		</div>
			                    <div class="sub-title">
			                    </div>
			                    <div class="left-input-area">
			                    </div>
			                    <div class="right-input-area">	
									<div style="width:70px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-imcomplete-radio-1" groupName="Adjustimcomplete">Today</div>
									</div>
									<div style="width:70px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-imcomplete-radio-2" groupName="Adjustimcomplete">1 Week</div>
									</div>
									<div style="width:80px;display:inline-block;">
										<div class="jqx-radio-button" id="transfer-adjust-imcomplete-radio-3" groupName="Adjustimcomplete">1 Month</div>
									</div>
									<div style="width:100px; display:inline-block;">
				                    	<div class="jqx-datetime-input" id="transfer-adjust-imcomplete-start-date"></div>
				                	</div>
				                	<div style="width:100px; display:inline-block;">
				                    	<div class="jqx-datetime-input" id="transfer-adjust-imcomplete-end-date"></div>
				                	</div>											
				                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="">Apply</div>
								</div>
	                		</div>	   
	                		<div class="line" style="margin: 3px 50px 0px 35px; height:calc(100% - 50px);""> 
			        			<div id="transfer-incomplete-receive-list">
			        			</div>		
			        		</div>
	        			</div>
						<div style="height: 39%">
							<div class="jqx-tab-panel">
								<ul>
									<li>Items</li>
								</ul>
								<div class="plain-01-panel" style="overflow: auto;">
									<div class="title-wrapper">
										<div class="title">Items</div>
										<div class="right-input-area">
											<div class="jqx-plain-button" onclick="$('#transfer-incomplete-receive-pop').jqxWindow('open');">Accept</div>
										</div>
									</div>							
					                <div class="content-wrapper" style="overflow-y: auto;">
										<div class="line" style="margin: 3px 0px 0px 0px; height: 55%;overflow:hidden;">
											<div id="transfer-adjust-incomplete-items-list">
											</div>
										</div>	  	   
										<div class="line" style="margin-top:10px;">Memo</div>
										<textarea rows="6" style="width:80%" id="transfer-adjust-incomplete-note" readonly></textarea>
									</div> 
								</div>
							</div>
						</div>
					</div>
        		</div>
    </div>
	<div class="jqx-custom-window" id="assign-transfer-pop-01">
		<div role="title">
	 		Assign Transfer Order
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div id="transfer-request-item-list"></div>
	 		<div class="jqx-plain-button" style="float:right;margin: 10px 0px 10px 0px;" onclick="WRPAdminApp.pagescript.getStoreListByOwnerSid();">Search Stores</div>
	 		<div id="assign-transfer-store-list"></div>
	 		<div class="line" style="margin: 10px 0px 10px 0px;">
	 			<div class="jqx-plain-button" style="float:left;width:200px;" onclick="WRPAdminApp.pagescript.AssingTransferInven();">Assign Transfer Inventory</div>
	 			<div class="jqx-plain-button" style="float:right;" onclick="$('#assign-transfer-pop-01').jqxWindow('close');">Cancel</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="assign-transfer-pop-02">
		<div role="title">
	 		Transfer Order
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="font-size:16px;">
	 			Transfer Order : <span id="trans-to-store"></span> -> <span id="trans-from-store"></span>
	 		</div>
	 		<div id="transfer-assign-item-list"></div>
	 		<div class="line" style="margin-top:10px;">Memo</div>
	 		<textarea rows="8" style="width:95%" id="transfer-apprv-note"></textarea>
	 		<div class="line" style="margin: 10px 0px 10px 0px;">
	 			<div class="jqx-plain-button" style="float:left;" onclick="WRPAdminApp.pagescript.assginConfirm();">Confirm</div>
	 			<div class="jqx-plain-button" style="float:right;" onclick="$('#assign-transfer-pop-02').jqxWindow('close');">Cancel</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="assign-transfer-pop-03">
		<div role="title">
	 		Transfer Order
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;margin-top:5px;">
	 			Transfer Order : <span id="confirm-trans-to-store"></span> -> <span id="confirm-trans-from-store"></span>
	 		</div>
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;">
	 			Request ID : <span id="confirm-trans-req-id"></span>
	 		</div>
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;">
	 			Transfer ID : <span id="confirm-trans-id"></span>
	 		</div>
	 		<div class="line" style="margin-bottom: 3px;margin-top:20px;">
	 			<div class="grid-5">
	 				Requested By : <span id="confirm-requested-user"></span>
	 			</div>
	 			<div class="grid-76">
	 				Approved By : <span id="confirm-approved-user"></span>
	 			</div>
	 		</div>
	 		<div class="line" style="margin-bottom: 3px;">
	 			<div class="grid-5">
	 				Requested Date : <span id="confirm-requested-date"></span>
	 			</div>
	 			<div class="grid-7">
	 				Approved Date : <span id="confirm-approved-date"></span>
	 			</div>
	 		</div>
	 		<div id="confirm-transfer-appr-items"></div>
	 		<div class="line" style="margin: 10px 0px 10px 0px;">
	 			<div class="jqx-plain-button" style="float:right;" onclick="$('#assign-transfer-pop-03').jqxWindow('close');">Close</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="reject-transfer-pop">
		<div role="title">
	 		Reject Transfer
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="margin-top:10px;">Memo</div>
	 		<textarea rows="8" style="width:99%" id="transfer-reject-reason"></textarea>
	 		<div class="line" style="margin: 20px 0px 10px 0px;">
	 			<div class="jqx-plain-button" style="float:left;" onclick="WRPAdminApp.pagescript.setTransferStatus(1);">Submit</div>
	 			<div class="jqx-plain-button" style="float:right;" onclick="$('#reject-transfer-pop').jqxWindow('close');">Cancel</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="transfer-store-detail-pop">
		<div role="title">
	 		Store Detail
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="font-size:16px;">
	 			Store : <span id="detail-store-id"></span>
	 		</div>
	 		<div id="search-store-transfer-item-list"></div>
	 		<div class="jqx-plain-button" style="float:right;margin-top:20px;" onclick="$('#transfer-store-detail-pop').jqxWindow('close');">Close</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="transfer-order-detail-pop">
		<div role="title">
	 		Transfer Order Detail
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;margin-top:5px;">
	 			Transfer Order : <span id="order-detail-from-store"></span> -> <span id="order-detail-to-store"></span>
	 		</div>
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;">
	 			Request ID : <span id="order-detail-req-id"></span>
	 		</div>
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;">
	 			Transfer ID : <span id="order-detail-trans-id"></span>
	 		</div>
	 		<div class="line" style="margin-bottom: 3px;margin-top:20px;">
	 			<div class="grid-5">
	 				Requested By : <span id="order-detail-requested-user"></span>
	 			</div>
	 			<div class="grid-76">
	 				Approved By : <span id="order-detail-approved-user"></span>
	 			</div>
	 		</div>
	 		<div class="line" style="margin-bottom: 3px;">
	 			<div class="grid-5">
	 				Requested Date : <span id="order-detail-requested-date"></span>
	 			</div>
	 			<div class="grid-7">
	 				Approved Date : <span id="order-detail-approved-date"></span>
	 			</div>
	 		</div>
			<div id="order-detail-items-list">
			</div>
			<div class="line" style="margin-top:15px;">Serial Number</div>
			<div id="order-detail-items-serialno-list">
			</div>
	 		<div class="jqx-plain-button" style="float:right;margin: 40px 20px 0px 0px;" onclick="$('#transfer-order-detail-pop').jqxWindow('close');">Close</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="transfer-transaction-detail-pop">
		<div role="title">
	 		Transfer Transaction Detail
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;margin-top:5px;">
	 			Transfer Order : <span id="transaction-detail-from-store"></span> -> <span id="transaction-detail-to-store"></span>
	 		</div>
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;">
	 			Request ID : <span id="transaction-detail-req-id"></span>
	 		</div>
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;">
	 			Transfer ID : <span id="transaction-detail-trans-id"></span>
	 		</div>
			<div class="line">&nbsp;</div>
			<div id="req-transaction-items-list">
			</div>
			<div class="line">&nbsp;</div>
			<div id="req-transaction-tracking-log">
			</div>
	 		<div class="jqx-plain-button" style="float:right;margin: 40px 20px 0px 0px;" onclick="$('#transfer-transaction-detail-pop').jqxWindow('close');">Close</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="transfer-incomplete-receive-pop">
		<div role="title">
	 		INCOMPLETE RECEIVE ADJUSTMENT
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;margin-top:5px;">
	 			Request ID : <span id="incomplete-detail-req-id"></span>
	 		</div>
	 		<div class="line" style="font-size:16px;margin-bottom: 3px;">
	 			Transfer ID : <span id="incomplete-detail-trans-id"></span>
	 		</div>
	 		<div class="line" style="margin-bottom: 3px;margin-top:20px;">
	 			<div class="grid-5">
	 				Received By : <span id="incomplete-detail-received-user"></span>
	 			</div>
	 			<div class="grid-76">
	 				Delivered By : <span id="incomplete-detail-delivered-user"></span>
	 			</div>
	 		</div>
	 		<div class="line" style="margin-bottom: 3px;">
	 			<div class="grid-5">
	 				Date : <span id="incomplete-detail-received-date"></span>
	 			</div>
	 			<div class="grid-7">
	 				Date : <span id="incomplete-detail-delivered-date"></span>
	 			</div>
	 		</div>
	 		<div class="jqx-plain-button" style="float:right;margin: 40px 20px 0px 0px;" onclick="$('#transfer-incomplete-receive-pop').jqxWindow('close');">Close</div>
	 	</div>
	</div>
</div>