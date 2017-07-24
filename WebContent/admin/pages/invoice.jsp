<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "invoice");
%>
<div pagename="invoice" class="theme-02">
	<div class="page-submenu-container">
        <div class="submenu" panelname="invoice_list" onclick="">
            Invoice
        </div>
    </div>
    <div class="panels">
        <div class="split-panel" panelname="invoice_list" style="display:block;">
            <div class="plain-01-panel" style="height: 50%">
            
				<div class="title-wrapper">
					<div class="title">Invoice</div>
					<div class="sub-title"></div>
					<div class="left-input-area"></div>
					<div class="right-input-area">
						<span style="font-size:11px; margin-left:10px;">Customer</span>
						<div class="search-container" style="margin-left:3px;width:17px;height:15px;">
							<div class="right-btn" onclick="WRPAdminApp.openPopupInPage('searchCustomerContainer');">
							</div>
						</div>
						<span style="font-size:11px; margin-left:10px;">Date</span>
						<div class="search-container period">
                        	<input type="text" class="jquery-datepicker" id="invoice-search-date-start" readonly />
                    	</div>
                    	<span style="font-size:11px;">~</span>
                   		<div class="search-container period" style="margin-right:15px;">
                        	<input type="text" class="jquery-datepicker" id="invoice-search-date-end" readonly />
                        	<div class="right-btn" onclick="WRPAdminApp.pagescript.getInvoiceList();">
							</div>
                        </div>
                        <span style="font-size:11px; margin-left:12px;">Amount</span>
						<div class="search-container" style="margin-left:0px;width:50px;">
							<input type="text" placeholder="$___" id="invoice-amount-search-start" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getInvoiceList(); }" />
						</div>
						<span style="font-size:11px;">~</span>
						<div class="search-container" style="margin-left:0px;width:65px;">
							<input type="text" placeholder="$___" id="invoice-amount-search-end" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getInvoiceList(); }" />
							<div class="right-btn" onclick="WRPAdminApp.pagescript.getInvoiceList();">
							</div>
						</div>
						<label for="search-type-1" style="font-size:11px;margin-left:10px;"><input type="radio" name="SearchType" id="search-type-1" value="1"/>Invoice #</label>
						<label for="search-type-2" style="font-size:11px;"><input type="radio" name="SearchType" id="search-type-2" value="2"/>Serial #</label>
						<div class="search-container" style="margin-left:0px; width:120px;">
							<input type="text" placeholder="Keyword" id="invoice-search-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getInvoiceList(); }" />
							<div class="right-btn" onclick="WRPAdminApp.pagescript.getInvoiceList();">
							</div>
						</div>
						
					</div>
				</div>
				<div class="content-wrapper">
        			<div class="content">
            		<table class="header-fixed-table fill-height-parent" height="150">
                		<thead>
                   		<tr>
                        	<th>Invoice No.</th>
                        	<th>Employee</th>
                        	<th>Customer ID</th>
                        	<th>Date</th>
                        	<th>Amount</th>
                        	<th>Tax</th>
                    	</tr>
                		</thead>
                		<tbody id="invoice-list">

                		</tbody>
            		</table>
        			</div>
    			</div>
    		</div>
    		<div class="tab-panel" style="height: 50%">
                <div class="tab-container" id="invoice-tab-container">
                    <div class="tab activate" tabname="items" onclick="WRP.UI.changeTab(this);">Items</div>
                    <div class="tab" tabname="payments" onclick="WRP.UI.changeTab(this);">Payments</div>
                    <!-- <div class="tab" tabname="commissions" onclick="WRP.UI.changeTab(this);">Sales Person Commissions</div> -->
                </div>
                <div class="tab-content-container" id="invoice-tab-content-container">
                    <div class="tab-content activate" tabname="items">
                       <div class="plain-01-panel">
                            <div class="title-wrapper">
                                <div class="title">
                                    Items
                                </div>
                                <div class="left-input-area">

                                </div>
                                <div class="right-input-area">

                                </div>
                            </div>
                            <div class="content-wrapper">
                                <div class="content">

                                    <table class="header-fixed-table fill-height-parent" height="175">
                                        <thead>
                                        <tr>
												<th>Item No.</th>
												<th width=180>Description</th>
												<th>Serial Number</th>
												<th width=60>Qty</th>
												<th>Price</th>
												<th>Tax</th>
												<th>Tax Amnt</th>
												<th>Disc.</th>
												<th>Sub Total</th>
											</tr>
                                        </thead>
                                        <tbody id="invoice-view-item-list">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" tabname="payments">
                        <div class="plain-01-panel">

                            <div class="title-wrapper">
                                <div class="title">
                                    Payments
                                </div>
                                <div class="left-input-area">

                                </div>
                                <div class="right-input-area">

                                </div>
                            </div>
                            <div class="content-wrapper">
                                <div class="content">

                                    <table class="header-fixed-table fill-height-parent" height="175">
                                        <thead>
                                        <tr>
                                            <th width=90>Payment Type</th>
                                            <th>Amount</th>
                                            <th width=150>Notes</th>
                                            <th>Created Date</th>
                                            <th>Created By</th>
                                            <th>Credit/Debit Card Number</th>
                                            <th>Holder Name</th>
                                        </tr>
                                        </thead>
                                        <tbody id="invoice-payments-list">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" tabname="commissions">
                        <div class="plain-01-panel">

                            <div class="title-wrapper">
                                <div class="title">
                                    Sales Person Commissions
                                </div>
                                <div class="left-input-area">
                                </div>
                                <div class="right-input-area">
                                </div>
                            </div>
                            <div class="content-wrapper">
                                <div class="content">
                                    <table class="header-fixed-table fill-height-parent" height="175">
                                        <thead>
                                        <tr>
                                            <th>Selected</th>
                                            <th>Sales Person</th>
                                            <th>% split</th>
                                        </tr>
                                        </thead>
                                        <tbody id="invoice-commissions-list">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
    <div class="popup-area">
        <div class="popup-container" popupname="searchCustomerContainer">
            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                INVOICE CUSTOMER SEARCH
            </div>
            <div class="plain-view">
				<div class="plain-content">
					<div class="panel">
						<div class="title">
							<div class="left-area">Customer Search
							</div>
							<div class="right-area text_right" style="font-size:11px;">
								<label for="customer-search-type-1"><input type="radio" name="customerSearchType" id="customer-search-type-1" value="1"/>ID</label>
								<label for="customer-search-type-2"><input type="radio" name="customerSearchType" id="customer-search-type-2" value="2"/>Name</label>
								<label for="customer-search-type-0"><input type="radio" name="customerSearchType" id="customer-search-type-0" value="0" checked/>ALL</label>
								<div class="search-container">
									<input type="text" placeholder="Keyword" id="inner-invoice-customer-search-keyword"/>
									<div class="right-btn">
									</div>
								</div>
							</div>
						</div>
						<div class="content">
							<table class="header-fixed-table">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Address</th>
										<th>Phone</th>
										<th>Company</th>
										<th>Join Date</th>
									</tr>
								</thead>
								<tbody id="inner-invoice-customer-list">

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
        </div>

    </div>
</div>