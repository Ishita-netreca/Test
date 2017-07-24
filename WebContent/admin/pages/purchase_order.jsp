<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "purchase_order");
%>
<div pagename="purchase_order" class="theme-02">
	<div class="plain-01-panel" panelname="purchase_order" style="width:99.96%; height:100%;">
		<div class="flow-panel" style="height: 100px;">
				<div class="upper-image-flow" onclick="WRPAdminApp.pagescript.newExpress();" style="background-image: url('img/icon/express_po.png');margin-right: 40px;">
                    Express P.O
                </div>
                <div class="upper-image-flow" onclick="$('#jqxPOTabs').jqxTabs('select', 0);" style="background-image: url('img/icon/two_boxes_01.png');margin-right: 40px;">
                    Purchase Order History
                </div>
                <div class="upper-image-flow" onclick="WRPAdminApp.pagescript.newPurchaseOrder();" style="background-image: url('img/icon/document_02.png');">
                    Enter Order
                </div>
                <div class="next"></div>
                <div class="upper-image-flow" onclick="$('#jqxPOTabs').jqxTabs('select', 1);" style="background-image: url('img/icon/document_03.png');">
                    Approval [<span id="inventory-total-order-count" style="font-weight: bold;"></span>]
                </div>
                <div class="next"></div>
                <div class="upper-image-flow" onclick="$('#jqxPOTabs').jqxTabs('select', 2);" style="background-image: url('img/icon/boxes_in_box_01.png');">
                    Receive Items [<span id="inventory-total-approval-count" style="font-weight: bold;"></span>]
                </div>
                <div class="next"></div>
                <div class="upper-image-flow" onclick="$('#jqxPOTabs').jqxTabs('select', 3);" style="background-image: url('img/icon/document_04.png');">
                    Completed
                </div>
         </div>
         <!-- 170208 jh : po tab jqx -->
         <div class="jqx-tab-panel" id="jqxPOTabs" style="height:100%">
				<ul>
        			<li>Purchase Order</li>
        			<li>Vendor Approval</li>
        			<li>Receiving</li>
        			<li>Completed</li>
        		</ul>
        		<div class="jqx-horizontal-split-panel">
	        		<div class="plain-01-panel">
	                	<div class="title-wrapper">
	                    	<div class="title">
	                           Purchase Order
	                        </div>
	                        <div class="sub-title">
	                            P.O Management
	                        </div>
	                        <div class="left-input-area">
	                        </div>
							<div class="right-input-area">											
								<div class="search-container" style="width:250px;margin-right:10px;">
		                        	<input type="text" style="top:-1px;" placeholder="Keyword" id="purchase-order-list-input-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getPurchaseOrderList(); }"/>
			                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getPurchaseOrderList();">
			                        </div>
		                        </div>
								<div class="btn sky" id="excel-purchase-order" style="float:right;">
			                        Export to Excel
			                    </div>
			                	<div style="width:200px; float:right;">
			                    	<div class="jqx-datetime-range-input" id="jqx-purchase-order-date"></div>
			                	</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height:calc(90% - 53px);">
							<div id="jqx-purchase-order-list"></div>
						</div>
	                </div>
	                <div style="height: 39%">
						<div class="jqx-tab-panel">
							<ul>
								<li>PO Detail</li>
								<!-- 
								<li>Receiving Status</li>
								<li>Waiting Items</li>
								 -->
							</ul>
							<div class="plain-01-panel" style="overflow: auto;">
								<div class="title-wrapper">
									<div class="title">PO Detail</div>
									<div class="right-input-area">	
									<div class="btn sky" id="excel-purchase-po-detail"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								
								<div class="content-wrapper" style="padding-top:3px;">
									<div id="jqx-purchase-po-detail"></div>
								</div>
							</div>
							<!-- 
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Receiving Status</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-vendor-receiving-status"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-vendor-receiving-status"></div>
								</div>
							</div>
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Waiting Items</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-purchase-waiting-items"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-purchase-waiting-items"></div>
								</div>
							</div>
							 -->
						</div>
					</div>
                </div>
                <div class="jqx-horizontal-split-panel">
	        		<div class="plain-01-panel">
	                	<div class="title-wrapper">
	                    	<div class="title">
	                        	Vendor Approval
	                        </div>
	                    	<div class="sub-title">
	                        	P.O Management
	                     	</div>
	                         <div class="left-input-area">
	                         </div>
	                         <div class="right-input-area">										
								<div class="search-container" style="width:250px;margin-right:10px;">
		                        	<input type="text" style="top:-1px;" placeholder="Keyword" id="purchase-order-appr-list-input-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getApprovalPurchaseOrderList(); }"/>
			                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getApprovalPurchaseOrderList();">
			                        </div>
		                        </div>
								<div class="btn sky" id="excel-appr-purchase-order" style="float:right;">
			                        Export to Excel
			                    </div>
			                	<div style="width:200px; float:right;">
			                    	<div class="jqx-datetime-range-input" id="jqx-appr-purchase-order-date"></div>
			                	</div>
	                         </div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
							<div id="jqx-approval-po-list"></div>
						</div>
					</div>
					<div style="height: 39%">
						<div class="jqx-tab-panel">
							<ul>
								<li>PO Detail</li>
								<!-- 
								<li>Receiving Status</li>
								<li>Waiting Items</li>
								 -->
							</ul>
							<div class="plain-01-panel" style="overflow: auto;">
								<div class="title-wrapper">
									<div class="title">PO Detail</div>
									<div class="right-input-area">
									<div class="btn sky" id="excel-vendor-po-detail"
										style="float: right;">Export to Excel</div>
								</div>
								</div>
								
								<div class="content-wrapper" style="padding-top:3px;">
									<div id="jqx-vendor-po-detail"></div>
								</div>
							</div>
							<!-- 
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Receiving Status</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-vendor-receiving-status"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-vendor-receiving-status"></div>
								</div>
							</div>
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Waiting Items</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-vendor-waiting-items"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-vendor-waiting-items"></div>
								</div>
							</div>
							 -->
						</div>
					</div>
				</div>
				<div class="jqx-horizontal-split-panel">
					<div class="plain-01-panel">
						<div class="title-wrapper">
							<div class="title">Receive Items</div>
							<div class="sub-title">P.O Management</div>
							<div class="left-input-area"></div>
							<div class="right-input-area">								
								<div class="search-container" style="width:250px;margin-right:10px;">
		                        	<input type="text" style="top:-1px;" placeholder="Keyword" id="purchase-order-recv-list-input-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getReceivePurchaseOrderList(); }"/>
			                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getReceivePurchaseOrderList();">
			                        </div>
		                        </div>
								<div class="btn sky" id="excel-recv-purchase-order" style="float:right;">
			                        Export to Excel
			                    </div>
			                	<div style="width:200px; float:right;">
			                    	<div class="jqx-datetime-range-input" id="jqx-recv-purchase-order-date"></div>
			                	</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-receive-po-list"></div>
						</div>
					</div>
					<div style="height: 39%">
						<div class="jqx-tab-panel">
							<ul>
								<li>PO Detail</li>
								<!-- 
								<li>Receiving Status</li>
								<li>Waiting Items</li>
								 -->
							</ul>
							<div class="plain-01-panel" style="overflow: auto;">
								<div class="title-wrapper">
									<div class="title">PO Detail</div>
									<div class="right-input-area">
									<div class="btn sky" id="excel-receive-po-detail"
										style="float: right;">Export to Excel</div>
								</div>
								</div>
								
								<div class="content-wrapper" style="padding-top:3px;">
									<div id="jqx-receive-po-detail"></div>
								</div>
							</div>
							
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Receiving Status</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-receive-po-detail"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-receive-po-detail"></div>
								</div>
							</div>
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Waiting Items</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-receive-waiting-items"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-receive-waiting-items"></div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				<div class="jqx-horizontal-split-panel">
					<div class="plain-01-panel">
						<div class="title-wrapper">
							<div class="title">Complete</div>
							<div class="sub-title">P.O Management</div>
							<div class="left-input-area"></div>
							<div class="right-input-area">					
								<div class="search-container" style="width:250px;margin-right:10px;">
		                        	<input type="text" style="top:-1px;" placeholder="Keyword" id="purchase-order-complete-list-input-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getCompletePurchaseOrderList(); }"/>
			                        <div class="right-btn" onclick="WRPAdminApp.pagescript.getCompletePurchaseOrderList();">
			                        </div>
		                        </div>
								<div class="btn sky" id="excel-complete-purchase-order" style="float:right;">
			                        Export to Excel
			                    </div>
			                	<div style="width:200px; float:right;">
			                    	<div class="jqx-datetime-range-input" id="jqx-complete-purchase-order-date"></div>
			                	</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-complete-po-list"></div>
						</div>
					</div>
					<div style="height: 39%">
						<div class="jqx-tab-panel">
							<ul>
								<li>PO Detail</li>
								<!-- 
								<li>Receiving Status</li>
								<li>Waiting Items</li>
								 -->
							</ul>
							<div class="plain-01-panel" style="overflow: auto;">
								<div class="title-wrapper">
									<div class="title">PO Detail</div>
									<div class="right-input-area">
									<div class="btn sky" id="excel-complete-po-detail"
										style="float: right;">Export to Excel</div>
								</div>
								</div>
								
								<div class="content-wrapper" style="padding-top:3px;">
									<div id="jqx-complete-po-detail"></div>
								</div>
							</div>
							<!-- 
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Receiving Status</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-complete-po-detail"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-complete-po-detail"></div>
								</div>
							</div>
							<div class="plain-01-panel" style="width: 100%; height: 100%;">
								<div class="title-wrapper">
									<div class="title">Waiting Items</div>
									<div class="left-input-area">
									</div>
									<div class="right-input-area">
										<div class="btn sky" id="excel-complete-waiting-items"
										style="float: right;">Export to Excel</div>
									</div>
								</div>
								<div class="content-wrapper" style="padding-top:3px; margin: 0px 50px 0px 32px;">
									<div id="jqx-complete-waiting-items"></div>
								</div>
							</div>
							 -->
						</div>
					</div>
				</div>
		</div>
		<!-- po tab jqx end -->
	</div>
    <div class="popup-area">
		<div class="popup-container" popupname="newPOInputPOIDContainer">
			<div class="close-btn" onclick=""></div>
			<div class="title-bar">NEW PURCHASE ORDER</div>
			<div class="plain-view">
				<div class="plain-content">
					<div class="line">
						<div class="grid-4">PO ID</div>
						<div class="grid-8">
							<input type="text" id="inventory-new-po-id" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.informPOrderInfoByPOID(); }" />
						</div>
					</div>
					<div class="line" style="">
						<div class="grid-12" style="text-align: center;">
							<div class="left_bg_btn check-01"
								onclick="WRPAdminApp.pagescript.informPOrderInfoByPOID();">Next</div>
							<div class="left_bg_btn cancel-01"
								onclick="WRPAdminApp.closePopup(this);">Cancel</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="popup-container" popupname="newPurchaseOrderContainer">
            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                NEW PURCHASE ORDER
            </div>
            <div class="plain-view" viewname="selectVendor">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            <div class="left-area">Vendor Select</div>
                            <div class="right-area text_right">
                                <div class="search-container">
                                    <input type="text" placeholder="Keyword" id="new-purchase-order-vendor-keyword" onkeydown="if(event.keyCode === 13) {WRPAdminApp.pagescript.getVendorList();}"/>
                                    <div class="right-btn" onclick="WRPAdminApp.pagescript.getVendorList();"></div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <table class="header-fixed-table" height="500px">
                                <thead>
                                    <tr>
                                        <th>Vendor ID</th>
                                        <th>Name</th>
                                        <th>Contact Name</th>
                                        <th>Tel.</th>
                                    </tr>
                                </thead>
                                <tbody id="new-purchase-order-vendor-list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="plain-view" viewname="selectItems">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            <div class="left-area">Select Items</div>
                            <div class="right-area text_right" style="display:none;">
                                <div class="search-container">
                                    <input type="text" placeholder="Keyword"/>
                                    <div class="right-btn">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <div style="height:190px;">
                            	<div id="select-items"></div>
                            </div>
	                        <div class="left-input-area" style="margin-top: 10px;">
		                        <div class="btn sky" onclick = "WRPAdminApp.pagescript.setShipping();">
					                        Shipping Cost
					            </div>
					            <div class="btn sky" onclick = "WRPAdminApp.pagescript.setOther();">
					                        Other
					            </div>
					            <div style="float:right">
					                        Cost &nbsp&nbsp<input type=text style="width:100px;" id="shipping_cost"/>&nbsp&nbsp&nbsp&nbsp
					                        Description &nbsp&nbsp<input type=text style="width:250px;" id="shipping_des"/>
					            </div>
				            </div>
                        </div>
                    </div>
                    <div class="panel" style="margin-top:-15px;">
                        <div class="title" style="background-image: url('img/icon/download_01.png'); background-size: 20px; background-position: 6px 2px;">
                            <div class="left-area">Added Items</div>
                        </div>
                        <div class="content" style="">
                        	<div style="height:190px;">
                              <div id="added-items"></div>
                             </div>
                        </div>
                        <div class="left-input-area" style="margin-top: 10px;">
					            <div style="float:right">
					                        Total Amount: &nbsp&nbsp&nbsp<input id="new-purchase-order-total-amount" type=text style="width:100px;" value="0" readonly/>
					            </div>
				        </div>
                        <div class="line" style="margin-top: 35px;">
                            <div class="grid-6" style="text-align: left;">
                                <div class="left_bg_btn reset-01" onclick="WRPAdminApp.setViewInPopup('newPurchaseOrderContainer', 'selectVendor');">Select Vendor</div>
                            </div>
                            <div class="grid-6" style="text-align: right;">
                                <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.savePurchaseOrder();">Save</div>
                                <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.closePopup(this);">Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup-container" popupname="POFulfillmentContainer" style="width:700px;">

            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                PUCHASE ORDER FULFILLMENT
            </div>

            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            <div class="left-area">P.O Fulfillment</div>
                            <div class="right-area" style="text-align: right;">
                            	<div class="info" style="display:none;">Vendor <span class="font_bold" id="porder-fulfill-po-sid"></span></div>
                                <div class="info">Vendor <span class="font_bold" id="porder-fulfill-vendor-id"></span></div>
                                <div class="info">P.O. ID <span class="font_bold" id="porder-fulfill-po-id"></span></div>
                                <div class="search-container">
                                    <input type="text" placeholder="Keyword" id="porder-fulfill-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getOrderedItemListByPoId(); }"/>
                                    <div class="right-btn" onclick="WRPAdminApp.pagescript.getOrderedItemListByPoId();">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <table class="header-fixed-table" height="300">
                                <thead>
                                    <tr>
                                        <th width="120">Item ID</th>
                                        <th width="120">Name</th>
                                        <th>Description</th>
                                        <th width="50">Odr Qty</th>
                                        <th width="50">Ffl Qty</th>
                                        <th width="50">Submit</th>
                                        <th width="80">Express</th>
                                    </tr>
                                </thead>
                                <tbody id="fulfill-purchase-order-item-list">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="line bottom-left">
                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
                            <div class="left_bg_btn reset-01" onclick="WRPAdminApp.pagescript.getPurchaseOrderList(); WRPAdminApp.closePopup('POFulfillmentContainer');">Return to P.O List</div>
                        </div>
                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
                            <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.setPOrderFulfillment();">Save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup-container" popupname="SubmitFulfillSerialContainer">
            <div class="title-bar">
                PURCHASE ORDER
            </div>
            <div id="manual-input-serial-container">
                <div class="line">
                    <input type="text" placeholder="Input Serial No." id="manual-input-serial" style="width: 100%;" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.inputSerialNo(this); }"/>
                </div>
                <div class="line" style="text-align: right">
                    <div class="left_bg_btn cancel-01" onclick="try{ document.getElementById('manual-input-serial-container').style.display = 'none'; } catch (e){ console.warn(e); }">Cancel</div>
                </div>
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            Submit Fulfillment
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    P.O. ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-serial-po-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    Vendor
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-serial-vendor-id" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Item ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-serial-item-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    SKU
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-serial-item-sku" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Desc.
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-serial-item-description" readonly/>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Import
                                </div>
                                <div class="grid-4">
                                    <div class="btn round"><div class="icon" style="background-image: url('img/icon/storage-01.png');"></div><div class="label">from Master</div></div>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    &nbsp;
                                </div>
                                <div class="grid-4">
                                <!-- 170213 jh : excel -->
                                    <div class="btn round" onclick="try{document.getElementById('inventory-approval-select-excel-file').click();}catch(e){}"><div class="icon" style="background-image: url('img/icon/excel-01.png');"></div><div class="label">from Excel</div></div>
                                    <input type="file" style="display: none;" id="inventory-approval-select-excel-file" onchange="WRPAdminApp.pagescript.onSelectExcelFile(event);"/>
                                <!-- excel end -->
                                </div>
                                <!-- 170208 jh -->
                                <div class="grid-4">
                                    <div class="btn round"><div class="icon" style="background-image: url('img/icon/excel-01.png');"></div><div class="label">Template</div></div>
                                </div>
                                <!--  -->
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 15px;">
                                    &nbsp;
                                </div>
                                <div class="grid-4">
                                    <div class="btn round" onclick="try{ document.getElementById('manual-input-serial-container').style.display = 'block'; document.getElementById('manual-input-serial').focus(); document.getElementById('manual-input-serial').value = '';} catch (e){ console.warn(e); }"><div class="icon" style="background-image: url('img/icon/keyboard-01.png');"></div><div class="label">Manually Input</div></div>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    SN / IMEI
                                </div>
                                <div class="grid-10">
                                    <div class="item-list-wrapper">
                                        <div class="item-list" id="submit-fulfill-serial-item-list">
                                            <input type="text" placeholder="Input Serial No." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                        </div>
                        <div class="line bottom-center" style="bottom: -20px; text-align: center;">
                            <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.submitFulfillSerializeItems();">Submit</div>
                            <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.closePopup(this);">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup-container" popupname="SubmitFulfillNonSerialContainer">
            <div class="title-bar">
                PURCHASE ORDER
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            Submit Fulfillment
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    P.O. ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-nonserial-po-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    Vendor
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-nonserial-vendor-id" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Item ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-nonserial-item-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    SKU
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-nonserial-item-sku" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Desc.
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-nonserial-item-description" readonly/>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Odr Qty
                                </div>
                                <div class="grid-4" id="submit-fulfill-nonserial-item-odr-qty">

                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    Ffl Qty
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-fulfill-nonserial-item-ffl-qty" value="0"/>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                        </div>
                    </div>
                    <div class="line" style="bottom: -20px; text-align: center;">
                        <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.submitFulfillNonSerializeItem();">Submit</div>
                        <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.closePopup(this);">Cancel</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="popup-container" popupname="POReceivementContainer">

            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                PUCHASE ORDER FULFILLMENT
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            <div class="left-area">P.O Receivement</div>
                            <div class="right-area text_right">
                            	<div class="info" style="display:none;"><span class="font_bold" id="porder-receive-po-sid"></span></div>
                                <div class="info">Vendor <span class="font_bold" id="porder-receive-vendor-id">IIG Corporation</span></div>
                                <div class="info">P.O. ID <span class="font_bold" id="porder-receive-po-id">61021464617</span></div>
                                <div class="search-container">
                                    <input type="text" placeholder="Keyword" id="porder-receive-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getFulfilledItemListByPoId(); }" />
                                    <div class="right-btn" onclick = "WRPAdminApp.pagescript.getFulfilledItemListByPoId();">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <!--
                            <div class="table">
                                <div class="thead">
                                    <div class="tr">
                                        <div class="td">Item ID</div>
                                        <div class="td">Name</div>
                                        <div class="td">Description</div>
                                        <div class="td">Odr Qty</div>
                                        <div class="td">Ffl Qty</div>
                                        <div class="td">Submit</div>
                                    </div>
                                </div>
                            </div>
                            -->
                            <div class="table-wrapper">
                                <div class="table">
                                    <div class="thead">
                                        <div class="tr">
                                            <div class="td">Item ID</div>
                                            <div class="td">Name</div>
                                            <div class="td">Desc.</div>
                                            <div class="td">Ffl Qty</div>
                                            <div class="td">Recv Qty</div>
                                            <div class="td">Submit</div>
                                        </div>
                                    </div>
                                    <div class="tbody" id="receivement-purchase-order-ltem-list">
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                        <div class="tr">
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                            <div class="td"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="line bottom-left">
                        <div class="grid-6" style="text-align: left;padding-left: 35px;">
                            <div class="left_bg_btn reset-01" onclick="WRPAdminApp.pagescript.getPurchaseOrderList(); WRPAdminApp.closePopup('POReceivementContainer');">Return to P.O List</div>
                        </div>
                        <div class="grid-6" style="text-align: right;padding-right: 35px;">
                            <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.setPOrderReceivement();">Save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup-container" popupname="SubmitReceivePhonesContainer">
            <div class="title-bar">
                PURCHASE ORDER
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            Submit Receivement
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    P.O. ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-phone-po-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;" >
                                    Vendor
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-phone-vendor-id" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Item ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-phone-item-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    SKU
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-phone-item-sku" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Desc.
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="fill_width_parent" id="submit-receive-phone-item-description" readonly/>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Insert
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="barcode-input" id="submit-receive-phone-serial-no" placeholder="Serial No." onkeydown="if (event.keyCode === 13) { try { document.getElementById('submit-receive-phone-imei-no').focus(); } catch(e) { } }"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    &nbsp;
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="barcode-input" id="submit-receive-phone-imei-no" placeholder="IMEI No." onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.checkPhoneInReceiveItemList(); }"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    &nbsp;
                                </div>
                                <div class="grid-10" id="received-phone-list-header">
                                    <div>
                                        Fulfilled
                                    </div>
                                    <div>
                                        Received
                                    </div>
                                    <div>
                                        IMEI
                                    </div>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Serial no.
                                </div>
                                <div class="grid-10">
                                    <div class="item-list-wrapper">
                                        <div class="item-list" id="submit-receive-phone-item-list">
                                            <!--<div class="item"><div>6646557</div><div>6646557</div></div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                            <div class="line" style="bottom: -20px; text-align: center;">
                                <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.submitReceivePhones();">Submit</div>
                                <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.closePopup(this);">Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup-container" popupname="SubmitReceiveSerialContainer">
            <div class="title-bar">
                PURCHASE ORDER
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            Submit Receivement
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    P.O. ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-serial-po-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;" >
                                    Vendor
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-serial-vendor-id" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Item ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-serial-item-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    SKU
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-serial-item-sku" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Desc.
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="fill_width_parent" id="submit-receive-serial-item-description" readonly/>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Insert
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="barcode-input" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.checkSerialNoInReceiveItemList(this.value); this.value=''; }"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    SN / IMEI
                                </div>
                                <div class="grid-10">
                                    <div class="item-list-wrapper">
                                        <div class="item-list" id="submit-receive-serial-item-list">
                                            <!--<div class="item"><div>6646557</div><div>6646557</div></div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                        </div>
                    </div>
                    <div class="line" style="bottom: -5px; text-align: center;">
                        <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.submitReceiveSerializeItems();">Submit</div>
                        <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.closePopup(this);">Cancel</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup-container" popupname="SubmitReceiveNonSerialContainer">
            <div class="title-bar">
                PURCHASE ORDER
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            Submit Receivement
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    P.O. ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-nonserial-po-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    Vendor
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-nonserial-vendor-id" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Item ID
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-nonserial-item-id" readonly/>
                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    SKU
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-nonserial-item-sku" readonly/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Desc.
                                </div>
                                <div class="grid-10">
                                    <input type="text" class="fill_width_parent" id="submit-receive-nonserial-item-description" readonly/>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                            <div class="line">
                                <div class="grid-2" style="padding-left: 5px;">
                                    Ffl Qty
                                </div>
                                <div class="grid-4" id="submit-receive-nonserial-item-ffl-qty">

                                </div>
                                <div class="grid-2" style="padding-left: 5px;">
                                    Recv Qty
                                </div>
                                <div class="grid-4">
                                    <input type="text" class="fill_width_parent" id="submit-receive-nonserial-item-recv-qty" value="0"/>
                                </div>
                            </div>
                            <div class="hr">
                            </div>
                        </div>
                    </div>
                    <div class="line" style="bottom: -5px; text-align: center;">
                        <div class="left_bg_btn check-01" onclick="WRPAdminApp.pagescript.submitReceiveNonSerializeItem();">Submit</div>
                        <div class="left_bg_btn cancel-01" onclick="WRPAdminApp.closePopup(this);">Cancel</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="popup-container" popupname="POCompleteContainer">

				<div class="close-btn" onclick=""></div>
				<div class="title-bar">PURCHASE ORDER</div>
				<div class="plain-view">
					<div class="plain-content">
						<div class="panel">
							<div class="title">
								<div class="left-area">P.O</div>
								<div class="right-area text_right">
									<div class="info">
										Vendor <span class="font_bold" id="porder-complete-vendor-id">IIG
											Corporation</span>
									</div>
									<div class="info">
										P.O. ID <span class="font_bold" id="porder-complete-po-id">61021464617</span>
									</div>
									<div class="search-container">
										<input type="text" placeholder="Keyword" />
										<div class="right-btn"></div>
									</div>
								</div>
							</div>
							<div class="content">
								<table class="header-fixed-table" height="325">
									<thead>
										<tr>
											<th width="120">Item ID</th>
											<th width="120">Name</th>
											<th>Desc.</th>
											<th width="35">Recv<br />Qty
											</th>
											<th width="50">Submit</th>
										</tr>
									</thead>
									<tbody id="complete-purchase-order-ltem-list">

									</tbody>
								</table>
							</div>
						</div>
						<div class="line bottom-left">
							<div class="grid-6" style="text-align: left; padding-left: 35px;">
								<div class="left_bg_btn reset-01"
									onclick="WRPAdminApp.pagescript.getPurchaseOrderList(); WRPAdminApp.closePopup('POCompleteContainer');">Return
									to P.O List</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
</div>