<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ include file="../ajax/common.jsp" %>
<div pagename="manage_report_inventory" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="csr" onclick="WRP.UI.changePanelBySubmenu('csr');WRPAdminApp.pagescript.csrReportLoad();">
			CSR
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="on_hand_report" onclick="WRP.UI.changePanelBySubmenu('on_hand_report');WRPAdminApp.pagescript.onHandReportLoad();">
			On Hand Report
		</div>
		<div class="border"></div>
<%
	if (user_sid.equals("8")) {
%>
	
		<div class="submenu" panelname="valuation_report" onclick="WRP.UI.changePanelBySubmenu('valuation_report');">
			Valuation Report
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="rma_report" onclick="WRP.UI.changePanelBySubmenu('rma_report');">
			RMA Report
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="audit_report" onclick="WRP.UI.changePanelBySubmenu('audit_report');">
			Audit Report
		</div>
		<div class="border"></div>
<%
	}
%>
	
		<div class="submenu" panelname="inventory_qty_sum_report" onclick="WRP.UI.changePanelBySubmenu('inventory_qty_sum_report');">
			Inventory Qty Summary
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="inventory_sales_qty_sum_report" onclick="WRP.UI.changePanelBySubmenu('inventory_sales_qty_sum_report');">
			Inventory Sales Qty Summary
		</div>
		<div class="border"></div>
	</div>
	<div class="panels">
		<div class="plain-01-panel" style="height: 100%" panelname="csr">
			<iframe id="inventory-csr-iframe" style="width:100%;height:98%" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("wrp_admin_login_user_id").toString() : "")%>"></iframe>	
		</div>
		<div class="plain-01-panel" style="height: 100%;display:none;" panelname="on_hand_report">
			<iframe id="inventory-on-hand-report-iframe" style="width:100%;height:98%" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("wrp_admin_login_user_id").toString() : "")%>"></iframe>	
		</div>
		<div class="plain-01-panel" style="height: 100%;;display:none;" panelname="inventory_qty_sum_report">
			<div class="title-wrapper">
				<div class="line" style="width:700px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3">
						<div class="store-dropdown-list" id="inventory-qty-sum-report-store"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px" onclick="WRPAdminApp.pagescript.invenQtySumReportLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" style="text-align: center;overflow-y: auto;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>INVENTORY REPORT</h3></div>
				<div class="line" style="width:150px; margin: 0 auto;">
					<div class="grid-4">DATE : </div>
					<div class="grid-8" id="inventory-qty-sum-date">&nbsp;</div>
				</div>
				<div class="line" style="text-align: center;height:50px;padding-top:20px;"><h4>PHONE</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>ITEM CODE</th>
			                <th>DESCRIPTION</th>
			                <th>QTY</th>
						</tr>
	                </thead>   
					<tbody id="inventory-qty-sum-report-phone-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:50px;padding-top:20px;"><h4>SIM</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>ITEM CODE</th>
			                <th>DESCRIPTION</th>
			                <th>QTY</th>
						</tr>
	                </thead>   
					<tbody id="inventory-qty-sum-report-sim-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:50px;padding-top:20px;"><h4>SERIALIZED ACCESSORY</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>ITEM CODE</th>
			                <th>DESCRIPTION</th>
			                <th>QTY</th>
						</tr>
	                </thead>   
					<tbody id="inventory-qty-sum-report-serialized-acc-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:60px;padding-top:20px;"><h4>NONSERIALIZED ACCESSORY</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>ITEM CODE</th>
			                <th>DESCRIPTION</th>
			                <th>QTY</th>
						</tr>
	                </thead>   
					<tbody id="inventory-qty-sum-report-non-serialized-acc-list">
					</tbody>
	    		</table>
			</div>
		</div>
		<div class="plain-01-panel" style="height: 100%;;display:none;" panelname="inventory_sales_qty_sum_report">
			<div class="title-wrapper">
				<div class="line" style="width:700px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3">
						<div class="store-dropdown-list" id="inventory-sales-qty-sum-report-store"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">From</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="inventory-sales-qty-sum-report-from"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">To</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="inventory-sales-qty-sum-report-to"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px" onclick="WRPAdminApp.pagescript.invenSalesQtySumReportLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" style="text-align: center;overflow-y: auto;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>INVENTORY SALES REPORT SUMMARY(<span id="inventory-sales-store"></span>)</h3></div>
				<div class="line" style="width:265px; margin: 0 auto;">
					<div class="grid-2">FROM : </div>
					<div class="grid-4" id="inventory-sales-qty-sum-report-from-date">&nbsp;</div>
					<div class="grid-2"> ~ TO : </div>
					<div class="grid-4" id="inventory-sales-qty-sum-report-to-date">&nbsp;</div>
				</div>
				<div class="line" style="text-align: center;height:50px;padding-top:20px;"><h4>BYOD</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>DESCRIPTION</th>
			                <th>SOLD QTY</th>
			                <th>RETRUN QTY</th>
			                <th>NET SALES</th>
						</tr>
	                </thead>   
					<tbody id="inventory-sales-qty-sum-report-byod-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:50px;padding-top:20px;"><h4>PHONE & SIM</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>DESCRIPTION</th>
			                <th>SOLD QTY</th>
			                <th>RETRUN QTY</th>
			                <th>NET SALES</th>
						</tr>
	                </thead>   
					<tbody id="inventory-sales-qty-sum-report-phonesim-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:50px;padding-top:20px;"><h4>ACCESSORY</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>DESCRIPTION</th>
			                <th>SOLD QTY</th>
			                <th>RETRUN QTY</th>
			                <th>NET SALES</th>
						</tr>
	                </thead>   
					<tbody id="inventory-sales-qty-sum-report-acc-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:60px;padding-top:20px;"><h4>SERVICE</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th>NO</th>
			                <th>DESCRIPTION</th>
			                <th>SOLD QTY</th>
			                <th>RETRUN QTY</th>
			                <th>NET SALES</th>
						</tr>
	                </thead>   
					<tbody id="inventory-sales-qty-sum-report-service-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:60px;padding-top:20px;"><h4>QPAY</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	   <th>NO</th>
			                <th>DESCRIPTION</th>
			                <th>SOLD QTY</th>
			                <th>RETRUN QTY</th>
			                <th>NET SALES</th>
						</tr>
	                </thead>   
					<tbody id="inventory-sales-qty-sum-report-qpay-list">
					</tbody>
	    		</table>
				<div class="line" style="text-align: center;height:60px;padding-top:20px;"><h4>SUMMARY</h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px; text-align: center;">
		            	    <th></th>
			                <th width=400></th>
			                <th width=70>SOLD QTY</th>
			                <th width=70>RETURN QTY</th>
			                <th width=70>TOTAL</th>
						</tr>
	                </thead>   
					<tbody id="inventory-sales-qty-sum-report-summary-list">
					</tbody>
	    		</table>
			</div>
		</div>
	</div>
</div>
