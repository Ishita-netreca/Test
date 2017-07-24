<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>WRP Administrator's Page</title>

  <link type="text/css" rel="stylesheet" href="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.css"/>
    	<link rel="stylesheet" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.base.css" type="text/css" />
        <link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.arctic.css?"/>
        <link rel="stylesheet" type="text/css" href="main.less.1200.css"/>
        <link rel="stylesheet" type="text/css" href="main.pagethemes.less.1200.css"/>
        <link rel="stylesheet" type="text/css" href="main.pages.less.1200.css"/>
        <link rel="stylesheet" type="text/css" href="wrp.ui.css"/>
        <link rel="stylesheet" type="text/css" href="assets/wrp.components.css"/>
		<link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.css"/>
        <link rel="stylesheet" href="https://myaccount.posmasterus.com/common/scrollbar/scrollbar.css" />
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery.form.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/scrollbar/jquery.scrollbar.js"></script>

        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/d3/d3.v3.min.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/xls/xls.js"></script>        
        
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcore.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtabs.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.js"></script> 
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatatable.js"></script>
   	 	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxwindow.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbuttons.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxradiobutton.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollbar.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxlistbox.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdropdownlist.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxmenu.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.edit.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.grouping.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.filter.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.sort.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.selection.js"></script> 
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxinput.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/globalization/globalize.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcalendar.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatetimeinput.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcheckbox.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdraw.js"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtooltip.js"></script>
  		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxchart.core.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js"></script>
   		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxprogressbar.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtree.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxsplitter.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.pager.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.columnsresize.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcombobox.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpasswordinput.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbargauge.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcolorpicker.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxslider.js"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollview.js"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtreegrid.js"></script>
    	<!-- 170120 jh : export.js-->
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.export.js"></script> 
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.export.js"></script>
		


</head>
<body>

	
	<form name="promotionsetup" method="" action="">
		<button type="button" onClick="">Promotion</button>
		<button type="button" onClick="">Promotion Item Line</button>
		<button type="button" onClick="">Distribute Promotion</button>
		
		
		<h4>Promotion</h4>
		<button type="button" onClick="">New Promotion</button>
		<input type="text" placeholder="Search" />
		<table id="PromotionID">

	<thead>
	<tr>
		<th>CT</th>
		<th>Promotion ID</th>
		<th>Description</th>
		<th>Start Date</th>
		<th>End Date</th>
		<th>Updated by</th>
		<th>Action</th>
		</tr>
	</thead>
	
	<tbody>
	
	<s:iterator value="">
		<tr>
		<td><s:property value=""/></td>
		<td><s:property value=""/></td>
		<td><s:property value=""/></td>
		<td><s:property value=""/></td>
		<td><s:property value=""/></td>
		<td><s:property value=""/></td>
		<td><s:property value=""/></td>
		</tr>
	</s:iterator>
	</tbody>
	
</table>
		
		<div pagename="store" class="theme-02">
			<div class="panels" style="height:100%;">
				<div class="jqx-horizontal-split-panel" panelname="stores"
				style="height: 100%;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Stores</div>
					<div class="sub-title">Store Configuration</div>
					<div class="left-input-area">
						<div class="jqx-plain-button" style="width:100px;"
							onclick=" WRPAdminApp.pagescript.initStoreInfo();$('#store-add-window').jqxWindow('open');">
							+ ADD Store</div>
					</div>
					<div class="right-input-area">
						<div class="jqx-plain-button" id="refresh_store_list" style="width:90px;display:inline-block;" onclick="WRPAdminApp.pagescript.getLicense();WRPAdminApp.pagescript.getStoreList();">
							Refresh
						</div>
						<div class="jqx-plain-button" id="excel_store_list" style="display:inline-block;">
							Export to Excel</div>
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-stores-list"></div>
				</div>
				</div>
				
				
			
			
		</div>
		
			<div>
				<div class="jqx-tab-panel" id="jqx-store-bottom-panel">
					<ul>
						<li>Profile</li>
						<li>Invoices</li>
						<li>Purchase Order</li>
						<li>MetroPCS & Qpay</li>
						<li>Monthly Goal</li>
					</ul>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Store Information</div>
						</div>
						<div class="content-wrapper" style="margin: 7px 50px 0px 32px;">
							<div class="line">
								<div class="line gray">
									<div class="grid-1-5">Store ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-id"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Open Date</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-open-date"
											class="jquery-datepicker" style="width: 100%;" readonly />
									</div>
									<div class="grid-1-5">Owner</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-owner"
											style="width: 100%;" readonly />
									</div>
									<div class="grid-1-5">Manager</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-manager"
											style="width: 100%;" readonly />
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">Address 1</div>
									<div class="grid-4-5">
										<input type="text" id="store-info-store-addr1"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Market</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-market-code"
											style="width: 100%;" readonly/>
											<!-- 
										<select id="store-info-store-market-code"
											onchange="WRPAdminApp.pagescript.getDistrictList(this.value);"
											style="width: 100%;"></select> -->
									</div>
									<div class="grid-1-5">District</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-district-code"
											style="width: 100%;" readonly/>
											<!-- 
										<select id="store-info-store-district-code"
											style="width: 100%;"></select> -->
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">Address 2</div>
									<div class="grid-4-5">
										<input type="text" id="store-info-store-addr2"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5 title">Status</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-status"
											style="width: 100%;" readonly/>
											<!-- 
										<label for="store-info-status-open"> <input
											type="radio" id="store-info-status-open"
											name="storeInfoStatus" /> Open
										</label> <label for="store-info-status-close"> <input
											type="radio" id="store-info-status-close"
											name="storeInfoStatus" /> Close
										</label> -->
									</div>
									<div class="grid-1-5 title">Tax Rate</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-tax-rate"
											style="width: 100%;" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">City</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-city"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5 title">Store Name</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-name"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Cash Register</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-poscnt"
											style="width: 100%;" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">State</div>
									<div class="grid-1-5">
										<!-- <select id="store-info-store-state" style="width: 100%;"></select> -->
										<input type="text" id="store-info-store-state"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Contact NO.</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-tel"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5 title">Carrier Market</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-carrier-market"
											style="width: 100%;" readonly />
									</div>
									<div class="grid-1-5 title">Door Code</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-door-code"
											style="width: 100%;" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-1-5">Zip Code</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-zipcode"
											style="width: 100%;" readonly/>
									</div>
									<div class="grid-1-5">Fax</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-fax"
											style="width: 100%;" readonly/>
									</div>
									<!-- 170220 jh : active -->
									<div class="grid-1-5 title">Active</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-active"
											style="width: 100%;" readonly/>
									<!-- 
										<label for="store-info-status-open"> <input
											type="radio" id="store-info-active" name="storeActive" />
											Active
										</label> <label for="store-info-status-close"> <input
											type="radio" id="store-info-inactive" name="storeActive" />
											Inactive
										</label>
										 -->
									</div>
									<!-- active end -->
									<div class="grid-1-5 title">Protection</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-onprotection"
											style="width: 100%;" readonly/>
									<!--
										<label for="store-info-protection"> <input
											type="radio" id="store-info-onprotection"
											name="protection" /> On
										</label> <label for="store-info-status-close"> <input
											type="radio" id="store-info-offprotection"
											name="protection" /> Off
										</label>
										-->
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Invoice</div>
							<div class="right-input-area" style="width: 804px; margin-right: -30px;">
								<div class="line" style="overflow: hidden;">
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-invoice-radio-0" groupName="store-invoice-group">Today</div>
									</div>
									<div class="grid-1-5" style="width: 65px;margin-left:5px;">
										<div class="jqx-radio-button" id="store-invoice-radio-1" groupName="store-invoice-group">1 Week</div>
									</div>
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-invoice-radio-2" groupName="store-invoice-group">1 Month</div>
									</div>
									<div class="grid-2" style="width: 90px;">
										<div class="jqx-radio-button" id="store-invoice-radio-3" groupName="store-invoice-group">3 Months</div>
									</div>
									<div class="grid-2-5" style="margin-left: 0px;width: 110px;">
										<div class="jqx-datetime-input" id="store-invoice-search-start-date"></div>
									</div>
									<div class="grid-2-5" style="margin-left: 7px;width: 110px;">
										<div class="jqx-datetime-input" id="store-invoice-search-end-date"></div>
									</div>
									<div class="grid-2" style="margin-left: 5px;width:100px;">
										<div class="jqx-plain-button" style="width:70px" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getStoreInvoiceList,WRPAdminApp.pagescript._selectedStoreId);">Apply</div>
									</div>
									<div class="grid-2" style="margin-left: 0px;">
										<div class="jqx-plain-button" id="excel_store_invoice" style="float: right;">Export to Excel</div>
									</div>
								</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-store-invoice-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Purchase Order</div>
							<div class="right-input-area" style="width: 720px; margin-right: -30px;">
								<div class="line" style="overflow: hidden;">
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-porder-radio-1" groupName="store-po-group">1 Week</div>
									</div>
									<div class="grid-1-5" style="width: 65px;">
										<div class="jqx-radio-button" id="store-porder-radio-2" groupName="store-po-group">1 Month</div>
									</div>
									<div class="grid-2" style="width: 90px;">
										<div class="jqx-radio-button" id="store-porder-radio-3" groupName="store-po-group">3 Months</div>
									</div>
									<div class="grid-2-5" style="margin-left: 0px;width: 110px;">
										<div class="jqx-datetime-input" id="stores-po-search-start-date"></div>
									</div>
									<div class="grid-2-5" style="margin-left: 7px;width: 110px;">
										<div class="jqx-datetime-input" id="stores-po-search-end-date"></div>
									</div>
									<div class="grid-2" style="margin-left: 5px;width:100px;">
										<div class="jqx-plain-button" style="width:70px" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getStorePOList,WRPAdminApp.pagescript._selectedStoreId);">Apply</div>
									</div>
									<div class="grid-2" style="margin-left: 0px;">
										<div class="jqx-plain-button" id="excel_store_po" style="float: right;">Export to Excel</div>
									</div>
								</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-store-po-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">MetroPCS & Qpay</div>
						</div>
						<div class="content-wrapper" style="margin: 3px 50px 0px 32px;">
							<div class="line">
								<div class="line gray">
									<div class="grid-2 title">MetroPCS Account Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-asap-id"
											style="width: 100%" readonly/>
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-asap-password"
											style="width: 100%" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2 title">QPay Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-id"
											style="width: 100%" readonly/>
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-password"
											style="width: 100%" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2 title">QPay Inventory Information</div>
									<div class="grid-1 title" style="display:none;">ID</div>
									<div class="grid-1-5" style="display:none;">
										<input type="text" id="store-info-store-qpay-inven-id"
											style="width: 100%" readonly/>
									</div>
									<div class="grid-1 title" style="display:none;">Password</div>
									<div class="grid-1-5" style="display:none;">
										<input type="text" id="store-info-store-qpay-inven-password"
											style="width: 100%" />
									</div>
									<div class="grid-1 title">Branch ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-inven-branch-id"
											style="width: 100%" readonly/>
									</div>
								</div>
								<div class="line gray" style="display:none;">
									<div class="grid-2 title">QPay API Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-api-id"
											style="width: 100%" readonly/>
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-qpay-api-password"
											style="width: 100%" readonly/>
									</div>
								</div>
								<div class="line gray">
									<div class="grid-2 title">BroadTech Information</div>
									<div class="grid-1 title">ID</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-xbm-id"
											style="width: 100%" readonly/>
									</div>
									<div class="grid-1 title">Password</div>
									<div class="grid-1-5">
										<input type="text" id="store-info-store-xbm-password"
											style="width: 100%" readonly/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 170208 jh -->
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Monthly Goal</div>
							<div class="left-input-area">
								<div class="jqx-plain-button" id="excel_store_invoice" style="width:90px" onclick="WRPAdminApp.pagescript.openAddMonthlyGoal();">+ Add Goal</div>
							</div>
							<div class="right-input-area">
								<div class="line" style="overflow: hidden;">
										<div class="jqx-plain-button" id="excel_store_monthly-goal" style="float: right;">Export to Excel</div>
								</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="jqx-monthly-goal-list"></div>
						</div>
					</div>
					<!--  -->
				</div>
			</div>
		
		</div>
					
					
				
		
	</form>

<script type="text/javascript" src="https://beta.posmasterus.com/common/wrp/wrp.time.js"></script>
        <script type="text/javascript" src="wrp.admin.js"></script>
        <script type="text/javascript" src="scripts/wrp.ui.js"></script>
        <script type="text/javascript" src="scripts/wrp.inventory.audit.js"></script>
        <script type="text/javascript" src="scripts/wrp.inventory.transfer.js"></script>
        <script type="text/javascript" src="scripts/wrp.itemmanager.js"></script> 
        <script type="text/javascript" src="scripts/wrp.permission.js"></script> 
        <script type="text/javascript" src="scripts/wrp.event.js"></script>
        <script type="text/javascript" src="scripts/wrp.components.js"></script>
        <script type="text/javascript" src="scripts/wrp.weeklyworkscheduler.js"></script>
        <script type="text/javascript" src="scripts/wrp.audit.js"></script>
        <script type="text/javascript" src="scripts/wrp.po.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/wrp/wrp.msgbox.js"></script>
</body>
</html>