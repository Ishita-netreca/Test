<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ include file="../ajax/common.jsp" %>
<div pagename="manage_report_sales" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="box_sales_report" onclick="WRP.UI.changePanelBySubmenu('box_sales_report');WRPAdminApp.pagescript.boxSalesReportLoad();">
			Box Sales Report
		</div>
		<div class="border"></div>
<%
	if (user_sid.equals("8")) {
%>
	
		<div class="submenu" panelname="box_sales_report_by_emp" onclick="WRP.UI.changePanelBySubmenu('box_sales_report_by_emp');">
			Box Sales Report By Employee
		</div>
		<div class="border"></div>
<%
	}
%>
	
		<div class="submenu" panelname="box_sales_summary" onclick="WRP.UI.changePanelBySubmenu('box_sales_summary');">
			Box Sales Summary
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="sales_summary" onclick="WRP.UI.changePanelBySubmenu('sales_summary');">
			Sales Summary
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="sales_raw_data" onclick="WRP.UI.changePanelBySubmenu('sales_raw_data');WRPAdminApp.pagescript.salesRawDataLoad();">
			Sales Raw Data
		</div>
		<div class="border"></div>
		<div class="submenu" panelname="for_commission_report" onclick="WRP.UI.changePanelBySubmenu('for_commission_report');">
			Data for Commission
		</div>
	</div>
	<div class="panels">
		<div class="plain-01-panel" style="height: 100%" panelname="box_sales_report">
			<iframe id="box-sales-report-iframe" style="width:100%;height:98%" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : "")%>"></iframe>	
		</div>
		<div class="plain-01-panel" style="height: 100%;display:none;" panelname="box_sales_summary">
			<div class="title-wrapper">
				<div class="line" style="width:700px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3">
						<div class="store-dropdown-list" id="box-sales-summary-store"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">From</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="box-sales-summary-from"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">To</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="box-sales-summary-to"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px" onclick="WRPAdminApp.pagescript.boxSalesSumReportLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" style="text-align: center;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>BOX SALES SUMMARY</h3></div>
				<div class="line" style="width:225px; margin: 0 auto;">
					<div class="grid-2">FROM: </div>
					<div class="grid-4" id="box-sales-summary-from-date">&nbsp;</div>
					<div class="grid-2">~ TO: </div>
					<div class="grid-4" id="box-sales-summary-to-date">&nbsp;</div>
				</div>	    
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>Phones</th>
			                <th>Acc</th>
			                <th>Ratio %</th>
			                <th>New Act</th>
			                <th>Upg/SOR Act</th>
			                <th>Total Act</th>
			                <th>Pay Qty</th>
			                <th>Phone/<br>Payment</th>
			                <th>Acc/<br>Payment</th>
			                <th>SIM/BYOD</th>
			                <th>React</th>              
			                <th>New Act <br>$50+ MRC %</th>              
			                <th>Avg MRC $</th>              
			                <th>PHP % Rate<br> Of New</th>              
						</tr>
	                </thead>   
					<tbody id="box-sales-summary-report-list">
					</tbody>
	    		</table>
			</div>
		</div>
		<div class="plain-01-panel" style="height: 100%;display:none;" panelname="sales_summary">
			<div class="title-wrapper">
				<div class="line" style="width:700px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3">
						<div class="store-dropdown-list" id="sales-summary-store"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">From</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="sales-summary-from"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">To</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="sales-summary-to"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px" onclick="WRPAdminApp.pagescript.salesSumReportLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" style="text-align: center;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>SALES SUMMARY</h3></div>
				<div class="line" style="width:225px; margin: 0 auto;">
					<div class="grid-2">FROM: </div>
					<div class="grid-4" id="sales-summary-from-date">&nbsp;</div>
					<div class="grid-2">~ TO: </div>
					<div class="grid-4" id="sales-summary-to-date">&nbsp;</div>
				</div>	    
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>NO</th>
			                <th>STORE</th>
			                <th>Accessory</th>
			                <th>Phones/SIMs</th>
			                <th>Services</th>     
			                <th>Petty Cash</th>
			                <th>Bill Pay</th>
			                <th>Total Revenue</th>
			                <th>Sales Tax</th> 
			                <th>PP Tax</th>
			                <th>POS Cash<br>Amount</th>
			                <th>POS Debit<br>Amount</th>
			                <th>POS Credit<br>Amount</th> 
			                <th>POS Finance<br>Amount</th>
			                <th>POS <br>Store Credit<br>Amount</th>              
						</tr>
	                </thead>   
					<tbody id="sales-summary-report-list">
					</tbody>
	    		</table>
			</div>
		</div>
		<div class="plain-01-panel" style="height: 100%;display:none;" panelname="sales_raw_data">
			<iframe id="sales-raw-data-iframe" style="width:100%;height:98%" user_id="<%=((session.getAttribute("wrp_admin_login_user_id") != null)? session.getAttribute("wrp_admin_login_user_id").toString() : "")%>"></iframe>	
		</div>
				
		<div class="plain-01-panel" style="height: 100%;display:none;" panelname="for_commission_report">
			<div class="title-wrapper">
				<div class="line" style="width:755px;">
					<div class="grid-1" style="line-height:25px;text-align:right;">Store</div>
					<div class="grid-3-5">
						<div class="store-dropdown-list" style="display:inline-block;" id="for-commission-report-store-list">
						</div>
						<div style="font-size:13px;display:inline-block;position:absolute;bottom:5px;right:5px;"><input id="for-commission-report-store-all" type="checkbox" onclick="WRPAdminApp.pagescript.selectStoreAll();">All</div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">From</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="for-commission-report-from"></div>
					</div>
					<div class="grid-1" style="line-height:25px;text-align:right;">To</div>
					<div class="grid-2">
						<div class="jqx-datetime-input" id="for-commission-report-to"></div>
					</div>
					<div class="grid-1-5">
						<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.pagescript.forCommissionReportLoad();">Apply</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper" id="for-commission-report-content" style="overflow-y:auto;text-align: center;display:block;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>EMPLOYEE PERFORMANCE SUMMARY (<span id="for-commission-report-stores"></span>)</h3></div>
				<div class="line" style="width:225px; margin: 0 auto;">
					<div class="grid-2">FROM: </div>
					<div class="grid-4" id="for-commission-report-from-date">&nbsp;</div>
					<div class="grid-2">~ TO: </div>
					<div class="grid-4" id="for-commission-report-to-date">&nbsp;</div>
				</div>	    
				<div class="line"><br><h4> EMPLOYEE RANKING BY QYT OF ACTIVATION </h4></div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>CT</th>
			                <th>ID</th>
			                <th>NAME</th>
			                <th>TOTAL ACTIVATION</th>
			                <th>NEWACT, PORTIN, ADDALINE, REACT</th>
			                <th>UPGRADE</th>
			                <th>BOX</th>
			                <th>BYOD</th>
			                <th>RATIO of ACCESSORY / BOX (%)</th>
			                <th>ACCESSORY</th>
			                <th>ACCESSORY SALES ($)</th>
			                <th>PAYMENT QTY</th>
						</tr>
	                </thead>   
					<tbody id="for-commission-report-list">
					</tbody>
	    		</table>
			</div>
			
			
			<div class="content-wrapper" id="emp-performance-report-content" style="overflow-y:auto;text-align: center;display:none;margin: 0px 5px 0px 32px;">
				<div class="line"></div>
				<div class="line" style="text-align: center;"><h3>BASE DATA FOR COMMISSION(<span id="emp-performance-report-stores"></span>)</h3></div>
				<div class="line" style="width:600px; margin: 0 auto;">
					<div class="grid-3" style="text-align: left;"><a href="#" onclick="document.getElementById('emp-performance-report-content').style.display = 'none';document.getElementById('for-commission-report-content').style.display = 'block';">prev</a></div>
					<div class="grid-1-5">FROM: </div>
					<div class="grid-3" id="emp-performance-from-date">&nbsp;</div>
					<div class="grid-1-5">~ TO: </div>
					<div class="grid-3" id="emp-performance-to-date">&nbsp;</div>
				</div>	
				<div class="line" style="text-align: center;font-size:11px;">Employee ID : <span id="emp-performance-emp-id"></span></div>
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">PHONE SALES SUMMARY</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>TYPE</th>
			                <th>QTY</th>
			                <th>AMOUNT</th>
			                <th>MRC</th>
			                <th>RETURN QTY</th>
			                <th>RETURN AMOUNT</th>
						</tr>
	                </thead>   
					<tbody id="phone-sales-summary-list">
					</tbody>
	    		</table>    
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">ACTIVATION TYPE SUMMARY</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>TYPE</th>
			                <th>QTY</th>
			                <th>MRC</th>
						</tr>
	                </thead>   
					<tbody id="activation-type-summary-list">
					</tbody>
	    		</table>	
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">ACCESSORY SALES SUMMARY</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>TYPE</th>
			                <th>QTY</th>
			                <th>AMOUNT</th>
			                <th>RETURN QTY</th>
			                <th>RETURN AMOUNT</th>
						</tr>
	                </thead>   
					<tbody id="acc-sales-summary-list">
					</tbody>
	    		</table>   
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">CARRIER SERVICE SALES SUMMARY</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>TYPE</th>
			                <th>QTY</th>
			                <th>AMOUNT</th>
						</tr>
	                </thead>   
					<tbody id="carrier-service-sales-summary-list">
					</tbody>
	    		</table>      
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">PHONE (NEW)</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>CT</th>
			            	<th>STORE CODE</th>
			          		<th>DATE</th>
			            	<th>INVOICE NO</th>
			                <th>DESCRIPTION</th>
			                <th>ITEM CODE</th>
			                <th>QTY</th>
			                <th>SERIAL NO</th>  
			                <th>ITEM TYPE</th>
			                <th>TRANSACTION TYPE</th>                      
			                <th>RETURN STATUS</th>                      
			                <th>SUB TOTAL</th> 
			                <th>MRC</th>
			                <th>EMPLOYEE ID</th>
			                <th>EMPLOYEE NAME</th>
			                <th>RETURN INVOICE NO</th>  
			                <th>REFUND</th>
						</tr>
	                </thead>   
					<tbody id="new-phone-sales-list">
					</tbody>
	    		</table>        
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">PHONE (BYOD)</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>CT</th>
			            	<th>STORE CODE</th>
			          		<th>DATE</th>
			            	<th>INVOICE NO</th>
			                <th>DESCRIPTION</th>
			                <th>ITEM CODE</th>
			                <th>QTY</th>
			                <th>SERIAL NO</th>  
			                <th>ITEM TYPE</th>
			                <th>TRANSACTION TYPE</th>                      
			                <th>RETURN STATUS</th>                      
			                <th>SUB TOTAL</th> 
			                <th>MRC</th>
			                <th>EMPLOYEE ID</th>
			                <th>EMPLOYEE NAME</th>
			                <th>RETURN INVOICE NO</th>  
			                <th>REFUND</th>
						</tr>
	                </thead>   
					<tbody id="byod-phone-sales-list">
					</tbody>
	    		</table>         
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">ACCESSORY</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>CT</th>
			            	<th>STORE CODE</th>
			          		<th>DATE</th>
			            	<th>INVOICE NO</th>
			                <th>DESCRIPTION</th>
			                <th>ITEM CODE</th>
			                <th>QTY</th>
			                <th>SERIAL NO</th>  
			                <th>ITEM TYPE</th>
			                <th>RETURN STATUS</th>                      
			                <th>SUB TOTAL</th> 
			                <th>EMPLOYEE ID</th>
			                <th>EMPLOYEE NAME</th>
			                <th>RETURN INVOICE NO</th>  
			                <th>REFUND</th>
						</tr>
	                </thead>   
					<tbody id="accessory-sales-list">
					</tbody>
	    		</table>          
				<div class="line" style="margin-top:15px;margin-bottom:0px;font-weight:bold;">CARRIER SERVICE</div>
				<table class="pure-table pure-table-bordered" style="font-size:10px; margin: 0 auto;">
					<thead>
		            	<tr style="font-size:12px;text-align:center;">
		            	    <th>CT</th>
			            	<th>STORE CODE</th>
			          		<th>DATE</th>
			            	<th>INVOICE NO</th>
			                <th>DESCRIPTION</th>
			                <th>QTY</th>
			                <th>ITEM TYPE</th>
			                <th>RETURN STATUS</th>                      
			                <th>SUB TOTAL</th> 
			                <th>EMPLOYEE ID</th>
			                <th>EMPLOYEE NAME</th>
			                <th>RETURN INVOICE NO</th>  
			                <th>REFUND</th>
						</tr>
	                </thead>   
					<tbody id="carrier-service-sales-list">
					</tbody>
	    		</table> 
			</div>
		</div>
	</div>
</div>
