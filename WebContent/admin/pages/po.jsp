<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "po");
%>
<style type="text/css">
    .jqx-grid-column-header
    {
        font-weight: bold;
    }
    
    #row0po-express-store-items-list
    {
    	background-color: #cccccc;
    }
</style>
<div pagename="po" class="theme-02">
	<div class="plain-01-panel" panelname="po" style="width:99.96%; height:100%;">
		<div class="flow-panel" style="height: 100px;">
				<div class="upper-image-flow" onclick="WRPAdminApp.pagescript.openExpressPOWindow();" style="background-image: url('img/icon/express_po.png');margin-right: 40px;">
                    Express P.O
                </div>
                <div class="upper-image-flow" onclick="$('#jqx-po-Tabs').jqxTabs('select', 0);" style="background-image: url('img/icon/two_boxes_01.png');margin-right: 40px;">
                    Purchase Order History
                </div>
                <div class="upper-image-flow" onclick="WRPAdminApp.pagescript.openNewPOWindow();" style="background-image: url('img/icon/document_02.png');">
                    Enter Order
                </div>
                <div class="next"></div>
                <div class="upper-image-flow" onclick="$('#jqx-po-Tabs').jqxTabs('select', 1);" style="background-image: url('img/icon/document_03.png');">
                    Approval [<span id="inventory-total-order-count" style="font-weight: bold;"></span>]
                </div>
                <div class="next"></div>
                <div class="upper-image-flow" onclick="$('#jqx-po-Tabs').jqxTabs('select', 2);" style="background-image: url('img/icon/boxes_in_box_01.png');">
                    Receive Items [<span id="inventory-total-fulfill-count" style="font-weight: bold;"></span>]
                </div>
                <div class="next"></div>
                <div class="upper-image-flow" onclick="$('#jqx-po-Tabs').jqxTabs('select', 3);" style="background-image: url('img/icon/document_04.png');">
                    Completed
                </div>
         </div>
         <!-- 170208 jh : po tab jqx -->
         <div class="jqx-tab-panel" id="jqx-po-Tabs" style="height:100%">
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
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-radio-1" groupName="purchase-order">Today</div>
							</div>
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-radio-2" groupName="purchase-order">1 Week</div>
							</div>
							<div style="width:80px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-radio-3" groupName="purchase-order">1 Month</div>
							</div>
							<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-start-date"></div>
		                	</div>
		                	<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-end-date"></div>
		                	</div>											
							<div class="jqx-plain-button" id="excel-purchase-order" style="display:inline-block;width:70px;float:right;margin-left:5px;">
		                        Excel
		                    </div>
		                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.POModule.getPOList('jqx-po-list',-1,$('#purchase-order-list-input-keyword').val(),$('#jqx-purchase-order-start-date').val(),$('#jqx-purchase-order-end-date').val());">Apply
	                        </div>
	                        <input type="text" class="jqx-text-input" placeholder="Keyword" id="purchase-order-list-input-keyword" style="display:inline-block;width:120px;float:right;margin-left: 15px;margin-right: 5px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.POModule.getPOList('jqx-po-list',-1,this.value,$('#jqx-purchase-order-start-date').val(),$('#jqx-purchase-order-end-date').val()); }"/>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
						<div id="jqx-po-list"></div>
					</div>
                </div>
                <div style="height: 39%">
					<div class="jqx-tab-panel">
						<ul>
							<li>PO Detail</li>
							<li>Costs</li>
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
								<div id="jqx-po-detail"></div>
							</div>
						</div>
						<div class="plain-01-panel" style="overflow: auto;">
							<div class="title-wrapper">
								<div class="title">Costs</div>
								<div class="right-input-area">	
								
								</div>
							</div>
							
							<div class="content-wrapper" style="padding-top:3px;">
								<div id="jqx-po-detail-costs-list"></div>
							</div>
						</div>
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
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-appr-radio-1" groupName="purchase-order-appr">Today</div>
							</div>
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-appr-radio-2" groupName="purchase-order-appr">1 Week</div>
							</div>
							<div style="width:80px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-appr-radio-3" groupName="purchase-order-appr">1 Month</div>
							</div>
							<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-appr-start-date"></div>
		                	</div>
		                	<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-appr-end-date"></div>
		                	</div>											
							<div class="jqx-plain-button" id="excel-appr-purchase-order" style="display:inline-block;width:70px;float:right;margin-left:5px;">
		                        Excel
		                    </div>
		                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.POModule.getPOList('jqx-order-po-list',0,$('#purchase-order-appr-list-input-keyword').val(),$('#jqx-purchase-order-appr-start-date').val(),$('#jqx-purchase-order-appr-end-date').val());">Apply
	                        </div>
	                        <input type="text" class="jqx-text-input" placeholder="Keyword" id="purchase-order-appr-list-input-keyword" style="display:inline-block;width:120px;float:right;margin-left: 15px;margin-right: 5px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.POModule.getPOList('jqx-order-po-list',0,this.value,$('#jqx-purchase-order-appr-start-date').val(),$('#jqx-purchase-order-appr-end-date').val()); }"/>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
						<div id="jqx-order-po-list"></div>
					</div>
				</div>
				<div style="height: 39%">
					<div class="jqx-tab-panel">
						<ul>
							<li>PO Detail</li>
							<li>Costs</li>
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
								<div id="jqx-order-po-detail"></div>
							</div>
						</div>
						<div class="plain-01-panel" style="overflow: auto;">
							<div class="title-wrapper">
								<div class="title">Costs</div>
								<div class="right-input-area">
								</div>
							</div>							
							<div class="content-wrapper" style="padding-top:3px;">
								<div id="jqx-order-po-detail-costs-list"></div>
							</div>
						</div>
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
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-recv-radio-1" groupName="purchase-order-recv">Today</div>
							</div>
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-recv-radio-2" groupName="purchase-order-recv">1 Week</div>
							</div>
							<div style="width:80px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-recv-radio-3" groupName="purchase-order-recv">1 Month</div>
							</div>
							<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-recv-start-date"></div>
		                	</div>
		                	<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-recv-end-date"></div>
		                	</div>											
							<div class="jqx-plain-button" id="excel-recv-purchase-order" style="display:inline-block;width:70px;float:right;margin-left:5px;">
		                        Excel
		                    </div>
		                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.POModule.getPOList('jqx-fulfill-po-list',2,$('#purchase-order-recv-list-input-keyword').val(),$('#jqx-purchase-order-recv-start-date').val(),$('#jqx-purchase-order-recv-end-date').val());">Apply
	                        </div>
	                        <input type="text" class="jqx-text-input" placeholder="Keyword" id="purchase-order-recv-list-input-keyword" style="display:inline-block;width:120px;float:right;margin-left: 15px;margin-right: 5px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.POModule.getPOList('jqx-fulfill-po-list',2,this.value,$('#jqx-purchase-order-recv-start-date').val(),$('#jqx-purchase-order-recv-end-date').val()); }"/>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
						<div id="jqx-fulfill-po-list"></div>
					</div>
				</div>
				<div style="height: 39%">
					<div class="jqx-tab-panel">
						<ul>
							<li>PO Detail</li>
							<li>Costs</li>
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
								<div id="jqx-fulfill-po-detail"></div>
							</div>
						</div>						
						<div class="plain-01-panel" style="overflow: auto;">
							<div class="title-wrapper">
								<div class="title">Costs</div>
								<div class="right-input-area">	
								
								</div>
							</div>
							
							<div class="content-wrapper" style="padding-top:3px;">
								<div id="jqx-fulfill-po-detail-costs-list"></div>
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
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-complete-radio-1" groupName="purchase-order-complete">Today</div>
							</div>
							<div style="width:70px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-complete-radio-2" groupName="purchase-order-complete">1 Week</div>
							</div>
							<div style="width:80px;display:inline-block;">
								<div class="jqx-radio-button" id="purchase-order-complete-radio-3" groupName="purchase-order-complete">1 Month</div>
							</div>
							<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-complete-start-date"></div>
		                	</div>
		                	<div style="width:100px; display:inline-block;">
		                    	<div class="jqx-datetime-input" id="jqx-purchase-order-complete-end-date"></div>
		                	</div>											
							<div class="jqx-plain-button" id="excel-complete-purchase-order" style="display:inline-block;width:70px;float:right;margin-left:5px;">
		                        Excel
		                    </div>
		                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.POModule.getPOList('jqx-recv-po-list',4,$('#purchase-order-complete-list-input-keyword').val(),$('#jqx-purchase-order-complete-start-date').val(),$('#jqx-purchase-order-complete-end-date').val());">Apply
	                        </div>
	                        <input type="text" class="jqx-text-input" placeholder="Keyword" id="purchase-order-complete-list-input-keyword" style="display:inline-block;width:120px;float:right;margin-left: 15px;margin-right: 5px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.POModule.getPOList('jqx-recv-po-list',4,this.value,$('#jqx-purchase-order-complete-start-date').val(),$('#jqx-purchase-order-complete-end-date').val()); }"/>
						</div>
					</div>
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
						<div id="jqx-recv-po-list"></div>
					</div>
				</div>
				<div style="height: 39%">
					<div class="jqx-tab-panel">
						<ul>
							<li>PO Detail</li>
							<li>Costs</li>
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
								<div id="jqx-receive-po-detail"></div>
							</div>
						</div>
						<div class="plain-01-panel" style="overflow: auto;">
							<div class="title-wrapper">
								<div class="title">Costs</div>
								<div class="right-input-area">	
								
								</div>
							</div>
							
							<div class="content-wrapper" style="padding-top:3px;">
								<div id="jqx-receive-po-detail-costs-list"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- po tab jqx end -->
	</div>	
	 <div class="jqx-custom-window" id="po-express-po-window">
	 	<div role="title">
	 		Express Purchase Order
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-1" style="text-align: right;">
	 				PO ID
	 			</div>
	 			<div class="grid-3">
	 				<input type="text" style="width: 100%;" id="po-express-new-po-id"/>
	 			</div>
	 			<div class="grid-2" style="text-align:right;">
	 				Vendor
	 			</div>
	 			<div class="grid-3">
	 				<div id="po-express-vendor-list" class="jqx-plain-combobox">
	 				</div>
	 			</div>
	 			<div class="grid-1-5">
	 				&nbsp;
	 			</div>
	 			<div class="grid-1">
	 				
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
				<div class="search-container" style="position:absolute;right:0px;top:0px;width:250px;margin-right:10px;">
					<input type="text" style="top:-3px;" placeholder="Keyword" id="po-express-search-item-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.POModule.getStoreItemsList('po-express-store-items-list', this.value); }"/>
					<div class="right-btn" onclick="try { WRPAdminApp.POModule.getStoreItemsList('po-express-store-items-list', document.getElementById('po-express-search-item-keyword').value); } catch (e) {}"></div>
				</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				<div id="po-express-store-items-list">
	 				</div>
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				Added Items
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				<div id="po-express-added-items-list">
	 				</div>
	 			</div>
	 		</div>
	 		<div class="line">
				<div class="grid-12" style="text-align:right">
					Total Cost <span id="po-express-total-cost" style="font-weight:bold">$0.00</span>
				</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-1-5">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				<select id="po-express-cost-type" style="width:100%;height: 100%;" class="jqx-plain-combobox">
	 					<option value="1">Shipping Cost</option>
	 					<option value="0">Others</option>
	 				</select>
	 			</div>
	 			<div class="grid-5">
	 				<input type="text" class="jqx-text-input" style="width:100%;height: 100%;" id="po-express-cost-description" placeholder="Description"/>
	 			</div>
	 			<div class="grid-2">
	 				<input type="text" class="jqx-text-input" style="width:100%;height: 100%;" id="po-express-cost-cost" placeholder="Cost"/>
	 			</div>
	 			<div class="grid-1">
	 				<div class="jqx-plain-button" style="width:90%;height: 100%;" onclick="WRPAdminApp.pagescript.addCostInExpress();">
	 					Add
	 				</div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-12">
	 				<div id="po-express-costs-list">
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
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="if(confirm('are you sure?')) WRPAdminApp.POModule.setExpressPO(WRPAdminApp.pagescript.onPOTabsSelected);">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-express-po-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 <div class="jqx-custom-window" id="po-express-confirm-serialized-item-window">
	 	<div role="title">
	 		Serialized Item
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
            <div id="po-express-manual-input-serial-container">
                <div class="line">
                    <input type="text" placeholder="Input Serial No." id="po-express-manual-input-serial" style="width: 100%;" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.inputSerialNoInExpresss(this.value); this.value = ''; }"/>
                </div>
                <div class="line" style="text-align: right">
                    <div class="left_bg_btn cancel-01" onclick="try{ document.getElementById('po-express-manual-input-serial-container').style.display = 'none'; } catch (e){ console.warn(e); }">Cancel</div>
                </div>
            </div>
	 		<div class="line">
	 			<div class="grid-2">
	 				PO ID
	 			</div>
	 			<div class="grid-4" id="po-express-confirm-serialized-item-po-id" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				Vendor
	 			</div>
	 			<div class="grid-4" id="po-express-confirm-serialized-item-vendor-name" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Item Code
	 			</div>
	 			<div class="grid-4" id="po-express-confirm-serialized-item-code" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				SKU
	 			</div>
	 			<div class="grid-4" id="po-express-confirm-serialized-item-sku" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Description
	 			</div>
	 			<div class="grid-10" id="po-express-confirm-serialized-item-description" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-2" style="padding-left: 5px;">
	 				<div>&nbsp</div>
                </div>
                <div class="grid-4">
                	<div id="scan_qty" style="float:left">0</div><div style="float:left">&nbspof&nbsp</div><div style="float:left" id="input_qty"></div>
                </div>
	 		</div>
            <div class="line">
                <div class="grid-2" style="padding-left: 5px;">
	 				<div>&nbsp</div>
                </div>
                <div class="grid-4" style="width:66%">
                	<input type="text" style="top:0px;    width: 100%;" placeholder="Keyword" id="new-po-search-item-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.inputSerialNoInExpresss(this.value); this.value = ''; }"/>
                    <!-- <div class="btn round" ><div class="icon" style="background-image: url('img/icon/storage-01.png');"></div><div class="label">from Master</div></div> -->
                </div>
                <div class="grid-2" >
	                <div class="btn round" onclick="WRPAdminApp.pagescript.inputSerialNoInExpresss(document.getElementById('new-po-search-item-keyword').value); document.getElementById('new-po-search-item-keyword').value = '';"><div class="icon" style="background-image: url('img/icon/keyboard-01.png');"></div><div class="label">Add</div></div>
                </div>
            </div>
            <!--  
            <div class="line">
                <div class="grid-2" style="padding-left: 5px;">
                    &nbsp;
                </div>
                <div class="grid-4">
                    <div class="btn round" onclick="try{document.getElementById('po-express-select-excel-file').click();}catch(e){}"><div class="icon" style="background-image: url('img/icon/excel-01.png');"></div><div class="label">from Excel</div></div>
                    <input type="file" style="display: none;" id="po-express-select-excel-file" onchange="WRPAdminApp.pagescript.onExpressSerialNoExcelFileSelected(event);"/>                
                </div>

            </div>
            -->
            <!-- 
            <div class="line">
                <div class="grid-2" style="padding-left: 15px;">
                    &nbsp;
                </div>
                <div class="grid-4">
                    <div class="btn round" onclick="try{ document.getElementById('po-express-manual-input-serial-container').style.display = 'block'; document.getElementById('po-express-manual-input-serial').focus(); document.getElementById('po-express-manual-input-serial').value = '';} catch (e){ console.warn(e); }"><div class="icon" style="background-image: url('img/icon/keyboard-01.png');"></div><div class="label">Manually Input</div></div>
                </div>
                <div class="grid-2" style="padding-left: 15px;">
                    &nbsp;
                </div>
                <div class="grid-4" style="display:none;">
                    <input id="nowCount" type="text" style="width:33%;margin-right: 13%;" readonly>&nbsp/&nbsp<input id="maxCount" type="text" style="width:33%;float:right;">
                </div>  
            </div>
             -->
            <div class="line">
                <div class="grid-2" style="padding-left: 5px;">
                    SN / IMEI
                </div>
                <div class="grid-10">
            		<div id="po-express-confirm-serial-no-list">
                        <!-- <div class="item"><div class="serial">12345</div><div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div></div> -->
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
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.submitExpressPOSerialItem();">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-express-confirm-serialized-item-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 <div class="jqx-custom-window" id="po-express-confirm-nonserialized-item-window">
	 	<div role="title">
	 		Serialized Item
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-3">
	 				PO ID
	 			</div>
	 			<div class="grid-9" id="po-express-confirm-nonserialized-item-po-id" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Vendor
	 			</div>
	 			<div class="grid-9" id="po-express-confirm-nonserialized-item-vendor-name" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Item Code
	 			</div>
	 			<div class="grid-9" id="po-express-confirm-nonserialized-item-code" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				SKU
	 			</div>
	 			<div class="grid-9" id="po-express-confirm-nonserialized-item-sku" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Description
	 			</div>
	 			<div class="grid-9" id="po-express-confirm-nonserialized-item-description" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Qty
	 			</div>
	 			<div class="grid-9">
	 				<input type="text" id="po-express-confirm-nonserialized-item-qty"/>
	 			</div>
	 		</div>
            <div class="hr">
            </div>
            <div class="line">
            	<div class="grid-3">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.submitExpressPONonSerialItem();">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-express-confirm-nonserialized-item-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 <div class="jqx-custom-window" id="po-new-po-window">
	 	<div role="title">
	 		New Purchase Order
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel" id="po-new-po-contents">
	 		<div style="width:100%;height:100%;display:block;">
	 			<div class="line">
	 				<div class="grid-5">
	 					PO ID
	 				</div>
	 				<div class="grid-7">
	 					<input type="text" style="width:100%;" id="new-po-new-po-id"/>
	 				</div>
	 			</div>
	            <div class="line">
	            	<div class="grid-3-5">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.showPageInNewPOWindow(2,1);">
	            			Next
	            		</div>
	            	</div>
	            	<div class="grid-1">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-new-po-window').jqxWindow('close');">
	            			Cancel
	            		</div>
	            	</div>
	            	<div class="grid-3-5">
	            		&nbsp;
	            	</div>
	            </div>
	 		</div>
	 		<div style="width:100%;height:100%;display:none;">
	 			<div class="line">
	 				<div class="grid-6">
	 				Select Vendor
	 				</div>
	 				<div class="grid-6">
	 				</div>
	 			</div>
	 			<div class="hr">
	 			</div>
	 			<div class="line">
	 				<div id="new-po-vendor-list">
	 				</div>
	 			</div>
	            <div class="line">
	            	<div class="grid-2">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.showPageInNewPOWindow(1,2);">
	            			Prev
	            		</div>
	            	</div>
	            	<div class="grid-1">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.showPageInNewPOWindow(3,2);">
	            			Next
	            		</div>
	            	</div>
	            	<div class="grid-1">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-new-po-window').jqxWindow('close');">
	            			Cancel
	            		</div>
	            	</div>
	            	<div class="grid-2">
	            		&nbsp;
	            	</div>
	            </div>
	 		</div>
	 		<div style="width:100%;height:100%;display:none;">
	 			<div class="line">
	 				<div class="grid-6">
	 				&nbsp;
	 				</div>
	 				<div class="grid-6">
	 					<div class="search-container" style="position:absolute;right:0px;top:0px;width:250px;margin-right:10px;">
							<input type="text" style="top:0px;" placeholder="Keyword" id="new-po-search-item-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.POModule.getStoreItemsList('new-po-store-items-list', this.value); }"/>
							<div class="right-btn" onclick="try { WRPAdminApp.POModule.getStoreItemsList('new-po-store-items-list', document.getElementById('new-po-search-item-keyword').value); } catch (e) {}"></div>
						</div>
	 				</div>
	 			</div>
	 			<div class="line">
	 				<div id="new-po-store-items-list">
	 				</div>
	 			</div>
	 			<div class="hr">
	 			</div>
	 			<div class="line">
	 				<div class="grid-6">
	 				Added Items
	 				</div>
	 				<div class="grid-6">
	 				</div>
	 			</div>
	 			<div class="line">
	 				<div id="new-po-added-items-list">
	 				</div>
	 			</div>	  
		 		<div class="line">
					<div class="grid-12" style="text-align:right">
						Total Cost <span id="new-po-total-cost" style="font-weight:bold">$0.00</span>
					</div>
		 		</div>          
		 		<div class="hr">
		 		</div>
		 		<div class="line">
		 			<div class="grid-1-5">
		 				Costs
		 			</div>
		 			<div class="grid-2">
		 				<select id="new-po-cost-type" style="width:100%;height: 100%;" class="jqx-plain-combobox">
		 					<option value="1">Shipping Cost</option>
		 					<option value="0">Others</option>
		 				</select>
		 			</div>
		 			<div class="grid-5">
		 				<input type="text" class="jqx-text-input" style="width:100%;height: 100%;" id="new-po-cost-description" placeholder="Description"/>
		 			</div>
		 			<div class="grid-2">
		 				<input type="text" class="jqx-text-input" style="width:100%;height: 100%;" id="new-po-cost-cost" placeholder="Cost"/>
		 			</div>
		 			<div class="grid-1">
		 				<div class="jqx-plain-button" style="width:90%;height: 100%;" onclick="WRPAdminApp.pagescript.addCostInNewPO();">
		 					Add
		 				</div>
		 			</div>
		 		</div>
		 		<div class="line">
		 			<div class="grid-12">
		 				<div id="new-po-costs-list">
		 				</div>
		 			</div>
		 		</div>     
		 		<div class="hr">
		 		</div>
	            <div class="line">
	            	<div class="grid-2">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.showPageInNewPOWindow(2,3);">
	            			Prev
	            		</div>
	            	</div>
	            	<div class="grid-1">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;"  onclick="if(confirm('are you sure?')) WRPAdminApp.POModule.setNewPO(WRPAdminApp.pagescript.onPOTabsSelected);">
	            			Submit
	            		</div>
	            	</div>
	            	<div class="grid-1">
	            		&nbsp;
	            	</div>
	            	<div class="grid-2">
	            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-new-po-window').jqxWindow('close');">
	            			Cancel
	            		</div>
	            	</div>
	            	<div class="grid-2">
	            		&nbsp;
	            	</div>
	            </div>	
	 		</div>
	 	</div>
	 </div>	 
	 <div class="jqx-custom-window" id="po-fulfillment-window">
	 	<div role="title">
	 		P.O. Fulfillment
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-2">
	 				Vendor ID
	 			</div>
	 			<div class="grid-4" id="po-fulfill-vendor-id">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				PO ID
	 			</div>
	 			<div class="grid-4" id="po-fulfill-po-id">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div id="po-fulfill-po-items-list">
	 			</div>
	 		</div>
            <div class="line">
            	<div class="grid-3-5">
            		&nbsp;
            	</div>
            	<div class="grid-2">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="if(confirm('are you sure?')) WRPAdminApp.POModule.submitOrderedPOFulfillment(WRPAdminApp.pagescript.onPOTabsSelected);">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-fulfillment-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3-5">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 
	 <div class="jqx-custom-window" id="po-fulfill-serialized-item-window">
	 	<div role="title">
	 		Serialized Item
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
            <div id="po-fulfill-manual-input-serial-container">
                <div class="line">
                    <input type="text" placeholder="Input Serial No." id="po-fulfill-manual-input-serial" style="width: 100%;" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.inputSerialNoInFulfill(this.value); this.value=''; }"/>
                </div>
                <div class="line" style="text-align: right">
                    <div class="left_bg_btn cancel-01" onclick="try{ document.getElementById('po-fulfill-manual-input-serial-container').style.display = 'none'; } catch (e){ console.warn(e); }">Cancel</div>
                </div>
            </div>
	 		<div class="line">
	 			<div class="grid-2">
	 				PO ID
	 			</div>
	 			<div class="grid-4" id="po-fulfill-serialized-item-po-id" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				Vendor
	 			</div>
	 			<div class="grid-4" id="po-fulfill-serialized-item-vendor-name" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Item Code
	 			</div>
	 			<div class="grid-4" id="po-fulfill-serialized-item-code" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				SKU
	 			</div>
	 			<div class="grid-4" id="po-fulfill-serialized-item-sku" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Description
	 			</div>
	 			<div class="grid-10" id="po-fulfill-serialized-item-description" style="font-weight: bold;">
	 				&nbsp;
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
                    <div class="btn round" onclick="try{document.getElementById('po-fulfill-select-excel-file').click();}catch(e){}"><div class="icon" style="background-image: url('img/icon/excel-01.png');"></div><div class="label">from Excel</div></div>
                    <input type="file" style="display: none;" id="po-fulfill-select-excel-file" onchange="WRPAdminApp.pagescript.onFulfillSerialNoExcelFileSelected(event);"/>                
                </div>                
                <!-- 170208 jh -->
                <!-- 
                <div class="grid-4">
                    <div class="btn round"><div class="icon" style="background-image: url('img/icon/excel-01.png');"></div><div class="label">Template</div></div>
                </div>
                 -->
                <!--  -->
            </div>
            <div class="line">
                <div class="grid-2" style="padding-left: 15px;">
                    &nbsp;
                </div>
                <div class="grid-4">
                    <div class="btn round" onclick="try{ document.getElementById('po-fulfill-manual-input-serial-container').style.display = 'block'; document.getElementById('po-fulfill-manual-input-serial').focus(); document.getElementById('po-fulfill-manual-input-serial').value = '';} catch (e){ console.warn(e); }"><div class="icon" style="background-image: url('img/icon/keyboard-01.png');"></div><div class="label">Manually Input</div></div>
                </div>
            </div>
            <div class="line">
                <div class="grid-2" style="padding-left: 5px;">
                    SN / IMEI
                </div>
                <div class="grid-10">
            		<div id="po-fulfill-serial-no-list">
                        <div class="item"><div class="serial">12345</div><div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div></div>
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
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.submitFulfillSerailizedItem();">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-fulfill-serialized-item-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 <div class="jqx-custom-window" id="po-fulfill-nonserialized-item-window">
	 	<div role="title">
	 		Serialized Item
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-3">
	 				PO ID
	 			</div>
	 			<div class="grid-9" id="po-fulfill-nonserialized-item-po-id" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Vendor
	 			</div>
	 			<div class="grid-9" id="po-fulfill-nonserialized-item-vendor-name" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Item Code
	 			</div>
	 			<div class="grid-9" id="po-fulfill-nonserialized-item-code" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				SKU
	 			</div>
	 			<div class="grid-9" id="po-fulfill-nonserialized-item-sku" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Description
	 			</div>
	 			<div class="grid-9" id="po-fulfill-nonserialized-item-description" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Order Qty
	 			</div>
	 			<div class="grid-9" id="po-fulfill-nonserialized-item-order-qty">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Fulfill Qty
	 			</div>
	 			<div class="grid-9">
	 				<input type="text" id="po-fulfill-nonserialized-item-fulfill-qty"/>
	 			</div>
	 		</div>
            <div class="hr">
            </div>
            <div class="line">
            	<div class="grid-3">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.submitFulfillNonSerializedItem();">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-fulfill-nonserialized-item-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 
	 <div class="jqx-custom-window" id="po-receivement-window">
	 	<div role="title">
	 		P.O. Receivement
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-2">
	 				Vendor ID
	 			</div>
	 			<div class="grid-4" id="po-receive-vendor-id">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				PO ID
	 			</div>
	 			<div class="grid-4" id="po-receive-po-id">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div id="po-receive-po-items-list">
	 			</div>
	 		</div>
            <div class="line">
            	<div class="grid-3-5">
            		&nbsp;
            	</div>
            	<div class="grid-2">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="if(confirm('are you sure?')) WRPAdminApp.POModule.submitOrderedPOReceivement(WRPAdminApp.pagescript.onPOTabsSelected);">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-receivement-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3-5">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 
	 <div class="jqx-custom-window" id="po-receive-serialized-item-window">
	 	<div role="title">
	 		Serialized Item
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-2">
	 				PO ID
	 			</div>
	 			<div class="grid-4" id="po-receive-serialized-item-po-id" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				Vendor
	 			</div>
	 			<div class="grid-4" id="po-receive-serialized-item-vendor-name" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Item Code
	 			</div>
	 			<div class="grid-4" id="po-receive-serialized-item-code" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 			<div class="grid-2">
	 				SKU
	 			</div>
	 			<div class="grid-4" id="po-receive-serialized-item-sku" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Description
	 			</div>
	 			<div class="grid-10" id="po-receive-serialized-item-description" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Input Serial
	 			</div>
	 			<div class="grid-10">
	 				<input type="text" id="po-receive-input-serial-no" style="width:100%;" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.inputSerialNoInReceive(this.value); this.value=''; }"/>
	 			</div>
	 		</div>
            <div class="line">
                <div class="grid-2" style="padding-left: 5px;">
                    SN / IMEI
                </div>
                <div class="grid-10">
            		<div id="po-receive-serial-no-list">
                        <div class="item"><div class="serial">12345</div><div class="remove-item-btn" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div></div>
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
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.submitReceiveSerailizedItem();">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-receive-serialized-item-window').jqxWindow('close');">
            			Cancel
            		</div>
            	</div>
            	<div class="grid-3">
            		&nbsp;
            	</div>
            </div>
	 	</div>
	 </div>
	 <div class="jqx-custom-window" id="po-receive-nonserialized-item-window">
	 	<div role="title">
	 		Serialized Item
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-3">
	 				PO ID
	 			</div>
	 			<div class="grid-9" id="po-receive-nonserialized-item-po-id" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Vendor
	 			</div>
	 			<div class="grid-9" id="po-receive-nonserialized-item-vendor-name" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Item Code
	 			</div>
	 			<div class="grid-9" id="po-receive-nonserialized-item-code" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				SKU
	 			</div>
	 			<div class="grid-9" id="po-receive-nonserialized-item-sku" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Description
	 			</div>
	 			<div class="grid-9" id="po-receive-nonserialized-item-description" style="font-weight: bold;">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="hr">
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Fulfill Qty
	 			</div>
	 			<div class="grid-9" id="po-receive-nonserialized-item-fulfill-qty">
	 				&nbsp;
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-3">
	 				Receive Qty
	 			</div>
	 			<div class="grid-9">
	 				<input type="text" id="po-receive-nonserialized-item-receive-qty"/>
	 			</div>
	 		</div>
            <div class="hr">
            </div>
            <div class="line">
            	<div class="grid-3">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="WRPAdminApp.pagescript.submitReceiveNonSerializedItem();">
            			Submit
            		</div>
            	</div>
            	<div class="grid-1">
            		&nbsp;
            	</div>
            	<div class="grid-2-5">
            		<div class="jqx-plain-button" style="width:99%;height:18px;" onclick="$('#po-receive-nonserialized-item-window').jqxWindow('close');">
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