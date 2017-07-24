<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "jqx_invoice");
%>
<div pagename="jqx_invoice" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
        <div class="submenu" panelname="invoice_list" onclick="">
            Invoice
        </div>
    </div>
    <div class="panels" style="height:100%;">
        <div class="jqx-horizontal-split-panel" panelname="invoice_list" style="height: 100%;">
        	<div class="plain-01-panel">
        	<div class="title-wrapper">
                    <div class="title">
                        Invoice
                    </div>
                    <div class="sub-title">
                    </div>
                    <div class="left-input-area">
                    </div>
                    <div class="right-input-area" style="width:750px;">
						<div class="grid-1-5">
							<div class="jqx-radio-button" id="invoice-list-radio-1">1 Week</div>
						</div>
						<div class="grid-1-5">
							<div class="jqx-radio-button" id="invoice-list-radio-2">1 Month</div>
						</div>
						<div class="grid-1-5">
							<div class="jqx-radio-button" id="invoice-list-radio-3">3 Months</div>
						</div>
						<div class="grid-2">
							<div class="jqx-datetime-input" id="invoice-list-search-start-date"></div>
						</div>
						<div class="grid-2">
							<div class="jqx-datetime-input" id="invoice-list-search-end-date"></div>
						</div>
						<div class="grid-2">
							<div class="jqx-plain-button" style="width:65px;" onclick="WRPAdminApp.pagescript.getInvoiceList();">
							Search</div>
						</div>
						<div class="grid-1-5">
							<div class="jqx-plain-button" id="excel_invoice_list" style="float: right;">
							Export to Excel</div>
						</div>
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-invoice-invoice-list"></div>
				</div>
        	</div>
        	<div>        	
        		<div class="jqx-tab-panel" id="jqx-invoice-bottom-panel">
        			<ul>
        				<li>Information</li>
        				<li>Items</li>
        				<li>Checkout</li>
        			</ul>
        			<div class="plain-01-panel" style="width: 100%; height: 100%; overflow:auto;">
        				<div class="title-wrapper">
                           <div class="title">
                              Invoice information
                           </div>
                        </div>
                        <div class="content-wrapper" style="margin:5px 72px 0px 40px;">
                        	<div class="line" style="line-height:20px;">
		        				<div class="line">
		        					<div class="grid-1">
		        						Invoice No.
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-inv-no" readonly/>
		        					</div>
		        					<div class="grid-1">
		        						POS No.
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-pos-no" readonly/>
		        					</div>
		        					<div class="grid-1">
		        						Date
		        					</div>
		        					<div class="grid-4">
		        						<input type="text" id="jqx-invoice-info-date" readonly/>
		        					</div>
		        				</div>
		        				<div class="hr" style="margin: 10px 0px;">
		        				</div>
		        				<div class="line">
		        					<div class="grid-2 title">
		        						<b>Employee</b>
		        					</div>
		        				</div>
		        				<div class="line" >
		        					<div class="grid-1">
		        						ID
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-emp-id" readonly/>
		        					</div>
		        					<div class="grid-1">
		        						Name
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-emp-name" readonly/>
		        					</div>
		        				</div>
		        				<div class="hr" style="margin: 10px 0px;">
		        				</div>
		        				<div class="line">
		        					<div class="grid-2 title">
		        						<b>Customer</b>
		        					</div>
		        				</div>
		        				<div class="line">
		        					<div class="grid-1">
		        						Account ID
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-cust-id" readonly/>
		        					</div>
		        					<div class="grid-1">
		        						Name
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-cust-name" readonly/>
		        					</div>
		        				</div>
		        				<div class="line">
		        					<div class="grid-1">
		        						Address
		        					</div>
		        					<div class="grid-10">
		        						<input type="text" id="jqx-invoice-info-cust-addr" readonly/>
		        					</div>
		        				</div>
		        				<div class="hr" style="margin: 10px 0px;">
		        				</div>
		        				<div class="line">
		        					<div class="grid-2 title">
		        						<b>Sales</b>
		        					</div>
		        				</div>
		        				<div class="line">
		        					<div class="grid-1">
		        						Total Qty
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-total-qty" readonly/>
		        					</div>
		        					<div class="grid-1">
		        						Total Discount
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-total-discount" readonly/>
		        					</div>
		        				</div>
		        				<div class="line">
		        					<div class="grid-1">
		        						Tax Amnt
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-total-tax-amnt" readonly/>
		        					</div>
		        					<div class="grid-1">
		        						Total Price
		        					</div>
		        					<div class="grid-2">
		        						<input type="text" id="jqx-invoice-info-total-price" readonly/>
		        					</div>
		        				</div>
        					</div>
        				</div>
        			</div>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                           <div class="title">
                              Items
                           </div>
                       		<div class="right-input-area">
                      			<div class="jqx-plain-button" id="excel_invoice_items" style="float:right;">
                          			Export to Excel
                      			</div>
                      		</div>
                        </div>
        			<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
        				<div id="jqx-invoice-items-list"></div>
        			</div>
        			</div>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                           <div class="title">
                              Check Out
                           </div>
                           <div class="left-input-area" id="invoice-checkout-info" style="margin-left:10px;">
                           	Total : <span id="invoice-checkout-total">$0.00</span>
                           	 / Change : <span id="invoice-checkout-change">$0.00</span>
                           </div>
                           <div class="right-input-area">
                      			<div class="jqx-plain-button" id="excel_invoice_checkout" style="float:right;">
                          			Export to Excel
                      			</div>
                      		</div>
                        </div>
        			<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
        				<div id="jqx-invoice-checkout-list"></div>
        			</div>
        			</div>
        		</div>
        	</div>
        </div>
    </div>
</div>