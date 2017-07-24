<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	session.setAttribute("wrp_admin_last_loaded_page", "report");
%>
<div pagename="report" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="report"
			onclick="WRP.UI.changePanelBySubmenu('report');">
			Sales(Quantity)</div>
		<div class="border"></div>
		<div class="submenu" panelname="sales"
			onclick="WRP.UI.changePanelBySubmenu('sales');WRPAdminApp.pagescript.initSearchData();WRPAdminApp.pagescript.getSalesAmount();">
			Sales($)</div>
		<div class="border"></div>
		<div class="submenu" panelname="sales_act"
			onclick="WRP.UI.changePanelBySubmenu('sales_act');WRPAdminApp.pagescript.initSearchData();WRPAdminApp.pagescript.getSalesActivity();">
			Sales - Activation</div>
		<div class="border"></div>
		<div class="submenu" panelname="inventory_quantity"
			onclick="WRP.UI.changePanelBySubmenu('inventory_quantity');WRPAdminApp.pagescript.initSearchData();WRPAdminApp.pagescript.getInventoryDetailData();">
			Inventory Quantity</div>
		<div class="border"></div>
		<div class="submenu" panelname="inventory_value"
			onclick="WRP.UI.changePanelBySubmenu('inventory_value');WRPAdminApp.pagescript.initSearchData();WRPAdminApp.pagescript.getInventoryDetailValue();">
			<!-- act_summary -->
			Inventory Values
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="porformance_box"
			onclick="WRP.UI.changePanelBySubmenu('porformance_box');WRPAdminApp.pagescript.initSearchData();WRPAdminApp.pagescript.getEmpPerformanceBox();">
			<!-- act_summary_item -->
			Emp. Performance Box
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="porformance_acc"
			onclick="WRP.UI.changePanelBySubmenu('porformance_acc');WRPAdminApp.pagescript.initSearchData();WRPAdminApp.pagescript.getEmpPerformanceAcc();">
			<!-- category_summary -->
			Emp. Performance Acc
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="porformance_pay"
			onclick="WRP.UI.changePanelBySubmenu('porformance_pay');WRPAdminApp.pagescript.initSearchData();WRPAdminApp.pagescript.getEmpPerformancePay();">
			<!-- sub_category_summary -->
			Emp. Performance Payment
		</div>
	</div>
	<div class="panels">
		<div class="jqx-horizontal-split-panel" panelname="report"
			style="height: 100%;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Sales(Quantity)</div>
					<div class="sub-title"></div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								onclick="WRPAdminApp.pagescript.getTransactionData();"
								id="sales-number-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area" style="padding-left: 5px;">

						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="sales-number-end-date"></div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="sales-number-start-date"></div>
						</div>
					</div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-jqx-transaction-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-jqx-transaction-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 55%">
				<div class="title-wrapper">
					<div class="title">Sales(Quantity) Data</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="report-jqx-transaction-grid"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel" panelname="sales"
			style="height: 100%;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Sales($)</div>
					<div class="sub-title"></div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								onclick="WRPAdminApp.pagescript.getSalesAmount();"
								id="sales-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area" style="padding-left: 5px;">

						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="sales-end-date"></div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="sales-start-date"></div>
						</div>
					</div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-sales-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-sales-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 55%">
				<div class="title-wrapper">
					<div class="title">Sales($) Data</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="report-sales-grid"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel" panelname="sales_act"
			style="height: 100%;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Sales - Activation</div>
					<div class="sub-title"></div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								onclick="WRPAdminApp.pagescript.getSalesActivity();"
								id="sales-act-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area" style="padding-left: 5px;">

						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="sales-act-end-date"></div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="sales-act-start-date"></div>
						</div>
					</div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-sales-act-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-sales-act-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 55%">
				<div class="title-wrapper">
					<div class="title">Sales - Activation Data</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="report-sales-act-grid"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel"
			panelname="inventory_quantity" style="display: none;height: 100%;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Inventory Quantity</div>
					<div class="sub-title"></div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-inventory-quantity-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-inventory-quantity-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 80%">
				<div class="title-wrapper">
					<div class="title">Inventory Quantity Data</div>
					<div class="sub-title"></div>
					<div class="left-input-area"></div>
					<div class="right-input-area">
						<div class="btn sky" id="excel-inventory-quantity-report"
							style="float: right;">Export to Excel</div>
					</div>
				</div>
				<div style="margin: 3px 43px 0px 32px; height: calc(100% - 53px);">
					<div id="report-inventory-quantity-grid"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel"
			panelname="inventory_value" style="display: none;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Inventory Values</div>
					<div class="sub-title"></div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-inventory_value-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-inventory_value-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 55%">
				<div class="title-wrapper">
					<div class="title">Inventory Values Data</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="report-inventory_value-grid"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel"
			panelname="porformance_box" style="display: none;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Emp. Performance Box</div>
					<div class="sub-title"></div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								onclick="WRPAdminApp.pagescript.getEmpPerformanceBox();"
								id="porformance_box-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area" style="padding-left: 5px;">

						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="porformance_box-end-date"></div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="porformance_box-start-date"></div>
						</div>
					</div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-porformance_box-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-porformance_box-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 55%">
				<div class="title-wrapper">
					<div class="title">Emp. Performance Box Data</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="report-jqx-porformance_box-grid"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel"
			panelname="porformance_acc" style="display: none;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Emp. Performance Accessory</div>
					<div class="sub-title"></div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								onclick="WRPAdminApp.pagescript.getEmpPerformanceAcc();"
								id="porformance_acc-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area" style="padding-left: 5px;">

						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="porformance_acc-end-date"></div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="porformance_acc-start-date"></div>
						</div>
					</div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-porformance_acc-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-porformance_acc-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 55%">
				<div class="title-wrapper">
					<div class="title">Emp. Performance Accessory Data</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="report-jqx-porformance_acc-grid"></div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel"
			panelname="porformance_pay" style="display: none;">
			<div class="plain-01-panel" style="height: 45%">
				<div class="title-wrapper">
					<div class="title">Emp. Performance Payment</div>
					<div class="sub-title"></div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								onclick="WRPAdminApp.pagescript.getEmpPerformancePay();"
								id="porformance_pay-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area" style="padding-left: 5px;">

						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="porformance_pay-end-date"></div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="porformance_pay-start-date"></div>
						</div>
					</div>
				</div>
				<div class="line"
					style="margin: 3px 50px 0px 32px; height: calc(100% - 45px); overflow: hidden;">
					<div class="grid-6" id="report-porformance_pay-line-chart"
						style="height: calc(95%);"></div>
					<div class="grid-6" id="report-porformance_pay-pie-chart"
						style="height: calc(95%);"></div>

				</div>
			</div>
			<div class="plain-01-panel" style="height: 55%">
				<div class="title-wrapper">
					<div class="title">Emp. Performance Payment Data</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="report-jqx-porformance_pay-grid"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="SearchCustomerContainer"
		popupname="SearchCustomerContainer">
		<div role="title">SELECT CUSTOMER</div>
		<div class="plain-01-panel">
			<div style="height: 400px;">
				<div id="jqx-report-customer-grid"></div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="SearchEmpContainer"
		popupname="SearchEmpContainer">
		<div role="title">SELECT EMPLOYEE</div>
		<div class="plain-01-panel">
			<div style="height: 400px;">
				<div id="jqx-report-employee-grid"></div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="SearchItemContainer"
		popupname="SearchItemContainer">
		<div role="title">SELECT ITEM</div>
		<div class="plain-01-panel">
			<div style="height: 400px;">
				<div id="jqx-report-item-grid"></div>
			</div>
		</div>
	</div>
</div>