<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "reconciliation");
%>
<div pagename="reconciliation" class="theme-02" style="width: 99.9%; height: 99.8%;">
	<div class="page-submenu-container">
        <div class="submenu" panelname="upload" onclick="WRP.UI.changePanelBySubmenu('upload');">
            <!-- consol ... -> reconciliation -->
         	Upload File
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="reconciliation" onclick="WRP.UI.changePanelBySubmenu('reconciliation');">
            <!-- consol ... -> reconciliation -->
         	Reconciliation
        </div>
    </div>
    
    <div class="panels">
    	<div class="jqx-tab-panel" panelname="upload">
				<ul>
					<li>Activation Qualify</li>
					<li>Activation Disqualify</li>
					<li>Rebate</li>
					<li>Spiff</li>
					<li>Bill float</li>
					<li>Qpay</li>
				</ul>
				<div class="jqx-horizontal-split-panel" style="display: block; height: 100%;">
			        <div class="plain-01-panel">
			            <div class="title-wrapper">
			                   <div class="title">
			                       Upload File
			                   </div>
			                   <div class="sub-title">
			                       information Management
			                   </div>
				               <div class="left-input-area" style="width: calc(100% - 300px);">
				               		 <select style="position: relative; top: 2px; width: 100px;" id= "upload-qualify-year">
										<option value="0" selected>Year</option>
										<option value="2016">2016</option>
										<option value="2017">2017</option>
									</select>
									<select style="position: relative; top: 2px; width: 100px;" id= "upload-qualify-month">
										<option value="0" selected>Month</option>
										<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
										<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
										<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
									</select> 
									<form id="reconciliation-upload-file-form" method="post"
											enctype="multipart/form-data" style="display: inline-block; position: relative; top: 3px;">
			                       		<input type="file" name="uploadExcelFile" id="qualify-excel"/>
			                       		<div class="btn sky" onclick="WRPAdminApp.pagescript.uploadreconciliationExcelFile();">Upload</div>
			                       		<!-- <div class="btn sky" onclick="WRPAdminApp.pagescript.uploadMonthYear(1);">Upload</div> -->
									</form>
				               </div>
			               </div>
						<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
			       			<div id="jqx-upload-file-list">
			       			</div>
						</div>
			       	</div>
			       	<div>
						<div class="plain-01-panel" style="height:100%">
				            <div class="title-wrapper">
				                   <div class="title">
				                  <!-- consol... -> reconciliation -->
				                       File Detail
				                   </div>
				                   <div class="sub-title">
				                       information Management
				                   </div>
				                   <!-- 
					               <div class="left-input-area" style="width: calc(100% - 300px);">
										<div class="jqx-radio-button" id="reconciliation-radio-1" style="display: inline-block; width:80px;" checked>1 Week</div>
										<div class="jqx-radio-button" id="reconciliation-radio-2" style="display: inline-block; width:80px;">1 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-3" style="display: inline-block; width:80px;">3 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-4" style="display: inline-block; width:80px;">Period</div>
										<div class="jqx-datetime-input" id="reconciliation-search-start-date" style="display: inline-block; "></div>
										<div class="jqx-datetime-input" id="reconciliation-search-end-date" style="display: inline-block; "></div>
					               </div>
					                -->
				               </div>
							<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
				       			<div id="jqx-reconciliation-list">
				       			</div>
							</div>
				       	</div>
					</div> 
	    		</div>
				<div class="jqx-horizontal-split-panel" style="display: block; height: 100%;">
			        <div class="plain-01-panel">
			            <div class="title-wrapper">
			                   <div class="title">
			                  <!-- consol... -> reconciliation -->
			                       Upload File
			                   </div>
			                   <div class="sub-title">
			                       information Management
			                   </div>
				               <div class="left-input-area" style="width: calc(100% - 300px);">
				               		 
				               		<select style="position: relative; top: 2px; width: 100px;" id= "upload-disqualify-year" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Year</option>
										<option value="2016">2016</option>
										<option value="2017">2017</option>
									</select>
									<select style="position: relative; top: 2px; width: 100px;" id= "upload-disqualify-month" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Month</option>
										<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
										<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
										<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
									</select>
									 
									<form id="disqualify-upload-file-form" method="post"
											enctype="multipart/form-data" style="display: inline-block; position: relative; top: 3px;">
			                       		<input type="file" name="uploadExcelFile" id="disqualify-excel"/>
			                       		<div class="btn sky" onclick="WRPAdminApp.pagescript.uploadDisqualifyExcelFile();">Upload</div>
									</form>
				               </div>
			               </div>
						<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
			       			<div id="jqx-upload-disqualify-list">
			       			</div>
						</div>
			       	</div>
			       	<div>
						<div class="plain-01-panel" style="height:100%">
				            <div class="title-wrapper">
				                   <div class="title">
				                  <!-- consol... -> reconciliation -->
				                       Upload File
				                   </div>
				                   <div class="sub-title">
				                       information Management
				                   </div>
				                   <!-- 
					               <div class="left-input-area" style="width: calc(100% - 300px);">
										<div class="jqx-radio-button" id="reconciliation-radio-1" style="display: inline-block; width:80px;" checked>1 Week</div>
										<div class="jqx-radio-button" id="reconciliation-radio-2" style="display: inline-block; width:80px;">1 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-3" style="display: inline-block; width:80px;">3 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-4" style="display: inline-block; width:80px;">Period</div>
										<div class="jqx-datetime-input" id="reconciliation-search-start-date" style="display: inline-block; "></div>
										<div class="jqx-datetime-input" id="reconciliation-search-end-date" style="display: inline-block; "></div>
					               </div>
					                -->
				               </div>
							<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
				       			<div id="jqx-disqualify-list">
				       			</div>
							</div>
				       	</div>
					</div> 
	    		</div>
				<div class="jqx-horizontal-split-panel" style="display: block; height: 100%;">
			        <div class="plain-01-panel">
			            <div class="title-wrapper">
			                   <div class="title">
			                  <!-- consol... -> reconciliation -->
			                       Upload File
			                   </div>
			                   <div class="sub-title">
			                       information Management
			                   </div>
				               <div class="left-input-area" style="width: calc(100% - 300px);">
				               		<select style="position: relative; top: 2px; width: 100px;" id= "upload-rebate-year" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Year</option>
										<option value="2016">2016</option>
										<option value="2017">2017</option>
									</select>
									<select style="position: relative; top: 2px; width: 100px;" id= "upload-rebate-month" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Month</option>
										<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
										<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
										<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
									</select> 
									<form id="rebate-upload-file-form" method="post"
											enctype="multipart/form-data" style="display: inline-block; position: relative; top: 3px;">
			                       		<input type="file" name="uploadExcelFile" id="rebate-excel"/>
			                       		<div class="btn sky" onclick="WRPAdminApp.pagescript.uploadRebateExcelFile();">Upload</div>
									</form>
				               </div>
			               </div>
						<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
			       			<div id="jqx-upload-rebate-list">
			       			</div>
						</div>
			       	</div>
			       	<div>
						<div class="plain-01-panel" style="height:100%">
				            <div class="title-wrapper">
				                   <div class="title">
				                  <!-- consol... -> reconciliation -->
				                       Upload File
				                   </div>
				                   <div class="sub-title">
				                       information Management
				                   </div>
				                   <!-- 
					               <div class="left-input-area" style="width: calc(100% - 300px);">
										<div class="jqx-radio-button" id="reconciliation-radio-1" style="display: inline-block; width:80px;" checked>1 Week</div>
										<div class="jqx-radio-button" id="reconciliation-radio-2" style="display: inline-block; width:80px;">1 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-3" style="display: inline-block; width:80px;">3 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-4" style="display: inline-block; width:80px;">Period</div>
										<div class="jqx-datetime-input" id="reconciliation-search-start-date" style="display: inline-block; "></div>
										<div class="jqx-datetime-input" id="reconciliation-search-end-date" style="display: inline-block; "></div>
					               </div>
					                -->
				               </div>
							<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
				       			<div id="jqx-rebate-list">
				       			</div>
							</div>
				       	</div>
					</div> 
	    		</div>
				<div class="jqx-horizontal-split-panel" style="display: block; height: 100%;">
			        <div class="plain-01-panel">
			            <div class="title-wrapper">
			                   <div class="title">
			                  <!-- consol... -> reconciliation -->
			                       Upload File
			                   </div>
			                   <div class="sub-title">
			                       information Management
			                   </div>
				               <div class="left-input-area" style="width: calc(100% - 300px);">
				               		<select style="position: relative; top: 2px; width: 100px;" id= "upload-spiff-year" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Year</option>
										<option value="2016">2016</option>
										<option value="2017">2017</option>
									</select>
									<select style="position: relative; top: 2px; width: 100px;" id= "upload-spiff-month" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Month</option>
										<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
										<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
										<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
									</select>
									<form id="spiff-upload-file-form" method="post"
											enctype="multipart/form-data" style="display: inline-block; position: relative; top: 3px;">
			                       		<input type="file" name="uploadExcelFile" id="spiff-excel"/>
			                       		<div class="btn sky" onclick="WRPAdminApp.pagescript.uploadSpiffExcelFile();">Upload</div>
									</form>
				               </div>
			               </div>
						<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
			       			<div id="jqx-upload-spiff-list">
			       			</div>
						</div>
			       	</div>
			       	<div>
						<div class="plain-01-panel" style="height:100%">
				            <div class="title-wrapper">
				                   <div class="title">
				                  <!-- consol... -> reconciliation -->
				                       Upload File
				                   </div>
				                   <div class="sub-title">
				                       information Management
				                   </div>
				                   <!-- 
					               <div class="left-input-area" style="width: calc(100% - 300px);">
										<div class="jqx-radio-button" id="reconciliation-radio-1" style="display: inline-block; width:80px;" checked>1 Week</div>
										<div class="jqx-radio-button" id="reconciliation-radio-2" style="display: inline-block; width:80px;">1 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-3" style="display: inline-block; width:80px;">3 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-4" style="display: inline-block; width:80px;">Period</div>
										<div class="jqx-datetime-input" id="reconciliation-search-start-date" style="display: inline-block; "></div>
										<div class="jqx-datetime-input" id="reconciliation-search-end-date" style="display: inline-block; "></div>
					               </div>
					                -->
				               </div>
							<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
				       			<div id="jqx-spiff-list">
				       			</div>
							</div>
				       	</div>
					</div> 
	    		</div>
				<div class="jqx-horizontal-split-panel" style="display: block; height: 100%;">
			        <div class="plain-01-panel">
			            <div class="title-wrapper">
			                   <div class="title">
			                  <!-- consol... -> reconciliation -->
			                       Upload File
			                   </div>
			                   <div class="sub-title">
			                       information Management
			                   </div>
				               <div class="left-input-area" style="width: calc(100% - 300px);">
				               		<select style="position: relative; top: 2px; width: 100px;" id= "upload-bill-year" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Year</option>
										<option value="2016">2016</option>
										<option value="2017">2017</option>
									</select>
									<select style="position: relative; top: 2px; width: 100px;" id= "upload-bill-month" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Month</option>
										<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
										<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
										<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
									</select>
									<form id="bill-upload-file-form" method="post"
											enctype="multipart/form-data" style="display: inline-block; position: relative; top: 3px;">
			                       		<input type="file" name="uploadExcelFile" id="bill-excel"/>
			                       		<div class="btn sky" onclick="WRPAdminApp.pagescript.uploadBillExcelFile();">Upload</div>
									</form>
				               </div>
			               </div>
						<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
			       			<div id="jqx-upload-bill-list">
			       			</div>
						</div>
			       	</div>
			       	<div>
						<div class="plain-01-panel" style="height:100%">
				            <div class="title-wrapper">
				                   <div class="title">
				                  <!-- consol... -> reconciliation -->
				                       Upload File
				                   </div>
				                   <div class="sub-title">
				                       information Management
				                   </div>
				                   <!-- 
					               <div class="left-input-area" style="width: calc(100% - 300px);">
										<div class="jqx-radio-button" id="reconciliation-radio-1" style="display: inline-block; width:80px;" checked>1 Week</div>
										<div class="jqx-radio-button" id="reconciliation-radio-2" style="display: inline-block; width:80px;">1 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-3" style="display: inline-block; width:80px;">3 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-4" style="display: inline-block; width:80px;">Period</div>
										<div class="jqx-datetime-input" id="reconciliation-search-start-date" style="display: inline-block; "></div>
										<div class="jqx-datetime-input" id="reconciliation-search-end-date" style="display: inline-block; "></div>
					               </div>
					                -->
				               </div>
							<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
				       			<div id="jqx-bill-list">
				       			</div>
							</div>
				       	</div>
					</div> 
	    		</div>
				<div class="jqx-horizontal-split-panel" style="display: block; height: 100%;">
			        <div class="plain-01-panel">
			            <div class="title-wrapper">
			                   <div class="title">
			                  <!-- consol... -> reconciliation -->
			                       Upload File
			                   </div>
			                   <div class="sub-title">
			                       information Management
			                   </div>
				               <div class="left-input-area" style="width: calc(100% - 300px);">
				               		<select style="position: relative; top: 2px; width: 100px;" id= "upload-qpay-year" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Year</option>
										<option value="2016">2016</option>
										<option value="2017">2017</option>
									</select>
									<select style="position: relative; top: 2px; width: 100px;" id= "upload-qapy-month" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
										<option value="0" selected>Month</option>
										<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
										<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
										<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
									</select>
									<form id="qpay-upload-file-form" method="post"
											enctype="multipart/form-data" style="display: inline-block; position: relative; top: 3px;">
			                       		<input type="file" name="uploadExcelFile" id="qpay-excel"/>
			                       		<div class="btn sky" onclick="WRPAdminApp.pagescript.uploadQpayExcelFile();">Upload</div>
									</form>
				               </div>
			               </div>
						<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
			       			<div id="jqx-upload-qpay-list">
			       			</div>
						</div>
			       	</div>
			       	<div>
						<div class="plain-01-panel" style="height:100%">
				            <div class="title-wrapper">
				                   <div class="title">
				                  <!-- consol... -> reconciliation -->
				                       Upload File
				                   </div>
				                   <div class="sub-title">
				                       information Management
				                   </div>
				                   <!-- 
					               <div class="left-input-area" style="width: calc(100% - 300px);">
										<div class="jqx-radio-button" id="reconciliation-radio-1" style="display: inline-block; width:80px;" checked>1 Week</div>
										<div class="jqx-radio-button" id="reconciliation-radio-2" style="display: inline-block; width:80px;">1 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-3" style="display: inline-block; width:80px;">3 Month</div>
										<div class="jqx-radio-button" id="reconciliation-radio-4" style="display: inline-block; width:80px;">Period</div>
										<div class="jqx-datetime-input" id="reconciliation-search-start-date" style="display: inline-block; "></div>
										<div class="jqx-datetime-input" id="reconciliation-search-end-date" style="display: inline-block; "></div>
					               </div>
					                -->
				               </div>
							<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
				       			<div id="jqx-qpay-list">
				       			</div>
							</div>
				       	</div>
					</div> 
	    		</div>
			</div>
	       	<div class="jqx-tab-panel" panelname="reconciliation" style="display:none;">
				<ul>
					<li>Activation Qualify</li>
					<li>Activation Disqualify</li>
					<li>Rebate</li>
					<li>Spiff</li>
					<li>Bill float</li>
					<li>Qpay</li>
				</ul>
				<div class="plain-01-panel" panelname="reconciliation">
		            <div class="title-wrapper">
		            	<div class="title">
		                       Reconciliation
		               	</div>
		               	<div class="sub-title">
		                       information Management
		               	</div>
			           	<div class="left-input-area" style="width: calc(100% - 350px);"> 
							<div class="jqx-radio-button" id="reconciliation-radio-1" style="display: inline-block; width:80px; display:none;" checked>1 Week</div>
							<div class="jqx-radio-button" id="reconciliation-radio-2" style="display: inline-block; width:80px; display:none;">1 Month</div>
							<div class="jqx-radio-button" id="reconciliation-radio-3" style="display: inline-block; width:80px; display:none;">3 Month</div>
							<div class="jqx-radio-button" id="reconciliation-radio-4" style="display: inline-block; width:80px; display:none;">Period</div>
							<div class="jqx-datetime-input" id="reconciliation-qualify-search-start-date" style="display: inline-block; display:none;"></div>
							<div class="jqx-datetime-input" id="reconciliation-qualify-search-end-date" style="display: inline-block; display:none;"></div>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-qualify-year" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
								<option value="0" selected>Year</option>
								<option value="2016">2016</option>
								<option value="2017">2017</option>
							</select>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-qualify-month" onchange="WRPAdminApp.pagescript.getLastDate('qualify-');">
								<option value="0" selected>Month</option>
								<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
								<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
								<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
							</select>
							<div class="btn sky" style="width:60px; top:2px;" onclick="WRPAdminApp.pagescript.getreconciliationList('qualify-','reconciliation_qualified');">Apply</div>
							
			           	</div>
		            </div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
		       			<div id="jqx-reconciliation-qualify-list">
		       			</div>
					</div>
		       	</div>
				<div class="plain-01-panel" panelname="reconciliation">
		            <div class="title-wrapper">
		            	<div class="title">
		                       Reconciliation
		               	</div>
		               	<div class="sub-title">
		                       information Management
		               	</div>
			           	<div class="left-input-area" style="width: calc(100% - 350px);"> 
							<div class="jqx-radio-button" id="reconciliation-disqualify-radio-1" style="display: inline-block; width:80px; display:none;" checked>1 Week</div>
							<div class="jqx-radio-button" id="reconciliation-disqualify-radio-2" style="display: inline-block; width:80px; display:none;">1 Month</div>
							<div class="jqx-radio-button" id="reconciliation-disqualify-radio-3" style="display: inline-block; width:80px; display:none;">3 Month</div>
							<div class="jqx-radio-button" id="reconciliation-disqualify-radio-4" style="display: inline-block; width:80px; display:none;">Period</div>
							<div class="jqx-datetime-input" id="reconciliation-disqualify-search-start-date" style="display: inline-block;  display:none;"></div>
							<div class="jqx-datetime-input" id="reconciliation-disqualify-search-end-date" style="display: inline-block;  display:none;"></div>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-disqualify-year" onchange="WRPAdminApp.pagescript.getLastDate('disqualify-');">
								<option value="0" selected>Year</option>
								<option value="2016">2016</option>
								<option value="2017">2017</option>
							</select>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-disqualify-month" onchange="WRPAdminApp.pagescript.getLastDate('disqualify-');">
								<option value="0" selected>Month</option>
								<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
								<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
								<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
							</select>
			           		<div class="btn sky" style="width:60px; top:2px;" onclick="WRPAdminApp.pagescript.getreconciliationList('disqualify-', 'reconciliation_disqualified');">Apply</div>
			           	</div>
		            </div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
		       			<div id="jqx-reconciliation-disqualify-list">
		       			</div>
					</div>
		       	</div>
				<div class="plain-01-panel" panelname="reconciliation">
		            <div class="title-wrapper">
		            	<div class="title">
		                       Reconciliation
		               	</div>
		               	<div class="sub-title">
		                       information Management
		               	</div>
			           	<div class="left-input-area" style="width: calc(100% - 350px);"> 
							<div class="jqx-radio-button" id="reconciliation-rebate-radio-1" style="display: inline-block; width:80px; display:none;" checked>1 Week</div>
							<div class="jqx-radio-button" id="reconciliation-rebate-radio-2" style="display: inline-block; width:80px; display:none;">1 Month</div>
							<div class="jqx-radio-button" id="reconciliation-rebate-radio-3" style="display: inline-block; width:80px; display:none;">3 Month</div>
							<div class="jqx-radio-button" id="reconciliation-rebate-radio-4" style="display: inline-block; width:80px; display:none;">Period</div>
							<div class="jqx-datetime-input" id="reconciliation-rebate-search-start-date" style="display: inline-block; display:none; "></div>
							<div class="jqx-datetime-input" id="reconciliation-rebate-search-end-date" style="display: inline-block; display:none; "></div>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-rebate-year" onchange="WRPAdminApp.pagescript.getLastDate('rebate-');">
								<option value="0" selected>Year</option>
								<option value="2016">2016</option>
								<option value="2017">2017</option>
							</select>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-rebate-month" onchange="WRPAdminApp.pagescript.getLastDate('rebate-');">
								<option value="0" selected>Month</option>
								<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
								<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
								<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
							</select>
			           		<div class="btn sky" style="width:60px; top:2px;" onclick="WRPAdminApp.pagescript.getreconciliationList('rebate-','reconciliation_rebate');">Apply</div>
			           	</div>
		            </div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
		       			<div id="jqx-reconciliation-rebate-list">
		       			</div>
					</div>
		       	</div>
				<div class="plain-01-panel" panelname="reconciliation">
		            <div class="title-wrapper">
		            	<div class="title">
		                       Reconciliation
		               	</div>
		               	<div class="sub-title">
		                       information Management
		               	</div>
			           	<div class="left-input-area" style="width: calc(100% - 350px);"> 
							<div class="jqx-radio-button" id="reconciliation-spiff-radio-1" style="display: inline-block; width:80px; display:none;" checked>1 Week</div>
							<div class="jqx-radio-button" id="reconciliation-spiff-radio-2" style="display: inline-block; width:80px; display:none;">1 Month</div>
							<div class="jqx-radio-button" id="reconciliation-spiff-radio-3" style="display: inline-block; width:80px; display:none;">3 Month</div>
							<div class="jqx-radio-button" id="reconciliation-spiff-radio-4" style="display: inline-block; width:80px; display:none;">Period</div>
							<div class="jqx-datetime-input" id="reconciliation-spiff-search-start-date" style="display: inline-block; display:none; "></div>
							<div class="jqx-datetime-input" id="reconciliation-spiff-search-end-date" style="display: inline-block; display:none; "></div>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-spiff-year" onchange="WRPAdminApp.pagescript.getLastDate('spiff-');">
								<option value="0" selected>Year</option>
								<option value="2016">2016</option>
								<option value="2017">2017</option>
							</select>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-spiff-month" onchange="WRPAdminApp.pagescript.getLastDate('spiff-');">
								<option value="0" selected>Month</option>
								<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
								<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
								<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
							</select>
			           		<div class="btn sky" style="width:60px; top:2px;" onclick="WRPAdminApp.pagescript.getreconciliationList('spiff-','reconciliation_spiff');">Apply</div>
			           	</div>
		            </div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
		       			<div id="jqx-reconciliation-spiff-list">
		       			</div>
					</div>
		       	</div>
				<div class="plain-01-panel" panelname="reconciliation">
		            <div class="title-wrapper">
		            	<div class="title">
		                       Reconciliation
		               	</div>
		               	<div class="sub-title">
		                       information Management
		               	</div>
			           	<div class="left-input-area" style="width: calc(100% - 350px);"> 
							<div class="jqx-radio-button" id="reconciliation-bill-radio-1" style="display: inline-block; width:80px; display:none;" checked>1 Week</div>
							<div class="jqx-radio-button" id="reconciliation-bill-radio-2" style="display: inline-block; width:80px; display:none;">1 Month</div>
							<div class="jqx-radio-button" id="reconciliation-bill-radio-3" style="display: inline-block; width:80px; display:none;">3 Month</div>
							<div class="jqx-radio-button" id="reconciliation-bill-radio-4" style="display: inline-block; width:80px; display:none;">Period</div>
							<div class="jqx-datetime-input" id="reconciliation-bill-search-start-date" style="display: inline-block;  display:none;"></div>
							<div class="jqx-datetime-input" id="reconciliation-bill-search-end-date" style="display: inline-block;  display:none;"></div>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-bill-year" onchange="WRPAdminApp.pagescript.getLastDate('bill-');">
								<option value="0" selected>Year</option>
								<option value="2016">2016</option>
								<option value="2017">2017</option>
							</select>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-bill-month" onchange="WRPAdminApp.pagescript.getLastDate('bill-');">
								<option value="0" selected>Month</option>
								<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
								<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
								<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
							</select>
			           		<div class="btn sky" style="width:60px; top:2px;" onclick="WRPAdminApp.pagescript.getreconciliationList('bill-','reconciliation_bill');">Apply</div>
			           	</div>
		            </div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
		       			<div id="jqx-reconciliation-bill-list">
		       			</div>
					</div>
		       	</div>
				<div class="plain-01-panel" panelname="reconciliation">
		            <div class="title-wrapper">
		            	<div class="title">
		                       Reconciliation
		               	</div>
		               	<div class="sub-title">
		                       information Management
		               	</div>
			           	<div class="left-input-area" style="width: calc(100% - 350px);"> 
							<div class="jqx-radio-button" id="reconciliation-qpay-radio-1" style="display: inline-block; width:80px; display:none;" checked>1 Week</div>
							<div class="jqx-radio-button" id="reconciliation-qpay-radio-2" style="display: inline-block; width:80px; display:none;">1 Month</div>
							<div class="jqx-radio-button" id="reconciliation-qpay-radio-3" style="display: inline-block; width:80px; display:none;">3 Month</div>
							<div class="jqx-radio-button" id="reconciliation-qpay-radio-4" style="display: inline-block; width:80px; display:none;">Period</div>
							<div class="jqx-datetime-input" id="reconciliation-qpay-search-start-date" style="display: inline-block;  display:none;"></div>
							<div class="jqx-datetime-input" id="reconciliation-qpay-search-end-date" style="display: inline-block;  display:none;"></div>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-qpay-year" onchange="WRPAdminApp.pagescript.getLastDate('qpay-');">
								<option value="0" selected>Year</option>
								<option value="2016">2016</option>
								<option value="2017">2017</option>
							</select>
							<select style="position: relative; top: 2px; width: 100px;" id= "reconciliation-qpay-month" onchange="WRPAdminApp.pagescript.getLastDate('qpay-');">
								<option value="0" selected>Month</option>
								<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
								<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
								<option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
							</select>
			           		<!-- <div class="btn sky" style="width:60px; top:2px;" onclick="WRPAdminApp.pagescript.getreconciliationList('qpay-','reconciliation_qpay')">Apply</div> -->
			           		<div class="btn sky" style="width:60px; top:2px;" onclick="WRPAdminApp.pagescript.getQpayReconciliationList('qpay-','reconciliation_qpay')">Apply</div>
			           	</div>
		            </div>
					<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
		       			<div id="jqx-reconciliation-qpay-list">
		       			</div>
					</div>
		       	</div>
			</div>
		</div>
	</div>	
	<div class="jqx-custom-window" id="reconciliation-upload-progress-window">
	 	<div role="title">
	 		UPLOADING PROCESS
	 	</div>
	 	<div role="content">
	 		<div class="jqx-progress-bar" id="reconciliation-upload-progress-bar" style="width:100%;height:40px;"></div>
	 	</div>
	</div>	
</div>