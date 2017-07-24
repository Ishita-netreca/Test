<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "_inventory_audit");
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
<div pagename="_inventory_audit" class="theme-02">
    <div class="page-submenu-container">
        <div class="submenu" panelname="audit_history" onclick="WRP.UI.changePanelBySubmenu('audit_history');">
            Audit History
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="create_new_audit" onclick="$('#audit-creation-window').jqxWindow('open'); WRPAdminApp.pagescript.getLoginedUserInfoInNewAudit();">
            Create New Audit
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="stock_count" onclick="WRP.UI.changePanelBySubmenu('stock_count');">
            Stock Count
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="reconciliation" onclick="WRP.UI.changePanelBySubmenu('reconciliation');">
            Reconciliation
        </div>
    </div>
    <div class="panels">        
	    <div class="jqx-horizontal-split-panel" panelname="audit_history" style="display: block;">
	    	<div class="plain-01-panel">
	    		<div class="title-wrapper">
                    <div class="title">
                        Audit History
                    </div>
                    <div class="sub-title">
                    </div>
                    <div class="left-input-area">
                    </div>
                    <div class="right-input-area">	
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="inven-audit-radio-1" groupName="AuditHistory">Today</div>
						</div>
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="inven-audit-radio-2" groupName="AuditHistory">1 Week</div>
						</div>
						<div style="width:80px;display:inline-block;">
							<div class="jqx-radio-button" id="inven-audit-radio-3" groupName="AuditHistory">1 Month</div>
						</div>
						<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="inventory-audit-history-start-date"></div>
	                	</div>
	                	<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="inventory-audit-history-end-date"></div>
	                	</div>											
						<div class="jqx-plain-button" id="excel_audit_history" style="display:inline-block;width:70px;float:right;margin-left:5px;">Excel</div>
	                    <div class="jqx-plain-button" id="audit-history-search" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getAuditHistoryList();">Apply</div>
                        <input type="text" class="jqx-text-input" placeholder="Keyword" id="audit-histsory-input-keyword" style="display:inline-block;width:120px;float:right;margin-left: 15px;margin-right: 5px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getAuditHistoryList(); }"/>
					</div>
                </div>
        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 50px);">
        			<div id="audit-jqx-grid-audit-history">
        			</div>
        		</div>
        	</div>
        	<div>
        		<div class="jqx-tab-panel">
        			<ul>
        				<li>Profile</li>
        				<li>Detail</li>
        			</ul>
        			<div class="plain-01-panel">	
        				<div class="title-wrapper">
                    		<div class="title">
                       			Profile
                    		</div>
                		</div>	   
                		<div class="line" style="margin: 3px 50px 0px 35px;">     			
		        			<div class="line">
		        				<div class="grid-2">
		        					Audit ID
		        				</div>
		        				<div class="grid-2" style="font-weight: bold;" id="audit-history-audit-id">
		        					&nbsp;	
		        				</div>
		        				<div class="grid-1">
		        					&nbsp;
		        				</div>
		        				<div class="grid-2">
		        					Counted by
		        				</div>
		        				<div class="grid-2" style="font-weight: bold;" id="audit-history-counted-by">
		        					&nbsp;	
		        				</div>
		        			</div>
		        			<div class="line">
		        				<div class="grid-2">
		        					Open Time
		        				</div>
		        				<div class="grid-2" style="font-weight: bold;" id="audit-history-open-time">
		        					&nbsp;	
		        				</div>
		        				<div class="grid-1">
		        					&nbsp;
		        				</div>
		        				<div class="grid-2">
		        					Confirmed by
		        				</div>
		        				<div class="grid-2" style="font-weight: bold;" id="audit-history-confirmed-by">
		        					&nbsp;	
		        				</div>
		        			</div>
		        			<div class="line">
		        				<div class="grid-2">
		        					Close Time
		        				</div>
		        				<div class="grid-2" style="font-weight: bold;" id="audit-history-close-time">
		        					&nbsp;	
		        				</div>
		        				<div class="grid-1">
		        					&nbsp;
		        				</div>
		        				<div class="grid-2">
		        					Status
		        				</div>
		        				<div class="grid-2" style="font-weight: bold;" id="audit-history-status">
		        					&nbsp;	
		        				</div>
		        			</div>
		        			<div class="line">
		        				<div class="grid-2">
		        					Close Time
		        				</div>
		        				<div class="grid-7" style="font-weight: bold;" id="audit-history-note">
		        					&nbsp;	
		        				</div>
		        			</div>
		        		</div>
        			</div>
        			<div>
        			</div>
        		</div>
        	</div>
	    </div>
    	<div class="jqx-full-sized-dock-panel" panelname="stock_count" style="display: none;">
    		<div dock="top" style="height: 100px; padding: 10px 15px;">
    			<div class="line">
        			<div class="grid-1-5">
        				Select Audit ID
        			</div>        		
        			<div class="grid-1-5">
        				<select id="audit-stock-count-select-audit-id" style="width: 100%;" onchange="WRPAdminApp.pagescript.getAuditInformationInStockCount(this.value);">
        				</select>
        			</div>
        			<div class="grid-1-5">
        				<div class="btn sky" onclick="WRPAdminApp.pagescript.requestInventoryAudit();">Save</div>
        				<div class="btn blue" onclick="WRPAdminApp.pagescript.clearAuditDataInStockCount();">Clear</div>
        			</div>
        		</div>
        		<div class="hr">
        		</div>
        		<div class="line">
        			<div class="grid-1">
        				Bin
        			</div>
        			<div class="grid-1-5">
        				<select id="audit-stock-count-select-bin" style="width: 100%;" onchange="WRPAdminApp.pagescript.filterGridInStockCount();"></select>
        			</div>
        			<div class="grid-1">
        				Category
        			</div>
        			<div class="grid-1-5">
        				<select id="audit-stock-count-select-category" style="width: 100%;" onchange="WRPAdminApp.pagescript.filterGridInStockCount();WRPAdminApp.getSubCategoryList(event);"></select>
        			</div>
        			<div class="grid-1">
        				Sub-Category
        			</div>
        			<div class="grid-1-5">
        				<select id="audit-stock-count-select-category-sub" style="width: 100%;" onchange="WRPAdminApp.pagescript.filterGridInStockCount();"></select>
        			</div>
        			<div class="grid-1">
        				SKU
        			</div>
        			<div class="grid-1-5">
        				<input type="text" id="audit-stock-count-search-sku"/>
        			</div>
        			<div class="grid-1">
        				<div class="btn sky" onclick="WRPAdminApp.pagescript.getAuditItemsListInStockCount();">Search</div>
        			</div>
        		</div>
    		</div>
	        <div dock="bottom" style="height: 90%; height: calc(100% - 105px);">
	        	<div class="jqx-horizontal-split-panel">
			        <div style="padding: 5px 0 0 5px;">        		
		        		<div id="audit-jqx-grid-stock-count-list">
		        		</div>
		        	</div>
		        	<div>
		        		<div class="jqx-tab-panel">
		        			<ul>
		        				<li>IMEI / Serial</li>
		        			</ul>
		        			<div>		        			
				        		
		        			</div>
		        		</div>
		        	</div>
	        	</div>
	        </div>
    	</div>
    	<div class="jqx-full-sized-dock-panel" panelname="reconciliation" style="display: none;">
    		<div dock="top" style="height: 100px; padding: 10px 15px;">
    			<div class="line">
        			<div class="grid-1-5">
        				Select Audit ID
        			</div>        		
        			<div class="grid-1-5">
        				<select id="audit-reconciliation-select-audit-id" style="width: 100%;" onchange="WRPAdminApp.pagescript.getAuditInformationInReconciliation(this.value);">
        				</select>
        			</div>
        			<div class="grid-1-5">
        				<div class="btn sky" onclick="WRPAdminApp.pagescript.completeInventoryAudit();">Complete</div>
        				<div class="btn blue" onclick="WRPAdminApp.pagescript.clearAuditDataInReconciliation();">Clear</div>
        			</div>
        		</div>
        		<div class="hr">
        		</div>
        		<div class="line">
        			<div class="grid-1">
        				Bin
        			</div>
        			<div class="grid-1-5">
        				<select id="audit-reconciliation-select-bin" style="width: 100%;" onchange="WRPAdminApp.pagescript.filterGridInReconciliation();"></select>
        			</div>
        			<div class="grid-1"> 
        				Category
        			</div>
        			<div class="grid-1-5">
        				<select id="audit-reconciliation-select-category" style="width: 100%;" onchange="WRPAdminApp.pagescript.filterGridInReconciliation();WRPAdminApp.getSubCategoryList(event);"></select>
        			</div>
        			<div class="grid-1">
        				Sub-Category
        			</div>
        			<div class="grid-1-5">
        				<select id="audit-reconciliation-select-category-sub" style="width: 100%;" onchange="WRPAdminApp.pagescript.filterGridInReconciliation();"></select>
        			</div>
        			<div class="grid-1">
        				SKU
        			</div>
        			<div class="grid-1-5">
        				<input type="text" id="audit-reconciliation-search-sku"/>
        			</div>
        			<div class="grid-1">
        				<div class="btn sky" onclick="">Search</div>
        			</div>
        		</div>
    		</div>
	        <div dock="bottom" style="height: 90%; height: calc(100% - 105px);">
	        	<div class="jqx-horizontal-split-panel">
			        <div style="padding: 5px 0 0 5px;">        		
		        		<div id="audit-jqx-grid-reconciliation-list">
		        		</div>
		        	</div>
		        	<div>
		        		<div class="jqx-tab-panel">
		        			<ul>
		        				<li>IMEI / Serial</li>
		        			</ul>
		        			<div>		        			
				        		
		        			</div>
		        		</div>
		        	</div>
	        	</div>
	        </div>
    	</div>
    </div>
    <div class="jqx-custom-window" id="audit-creation-window">
    	<div role="title">
    		Create New Audit
    	</div>
    	<div role="content">
    		<div class="line">
    			<div class="grid-2">
    				Audit ID
    			</div>
    			<div class="grid-4">
    				<input type="text" style="width:100%;" id="audit-creation-audit-id"/>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				Emp. ID
    			</div>
    			<div class="grid-2-5">
    				<input type="text" style="width:100%;" id="audit-creation-emp-id" readonly/>
    			</div>
    			<div class="grid-2">
    			&nbsp;
    			</div>
    			<div class="grid-2">
    				Store ID
    			</div>
    			<div class="grid-2-5">
    				<input type="text" style="width:100%;" id="audit-creation-store-id" readonly/>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				Emp. Name
    			</div>
    			<div class="grid-2-5">
    				<input type="text" style="width:100%;" id="audit-creation-emp-name" readonly/>
    			</div>
    			<div class="grid-2">
    			&nbsp;
    			</div>
    			<div class="grid-2">
    				Date
    			</div>
    			<div class="grid-2-5">
    				<input type="text" style="width:100%;" id="audit-creation-date" readonly/>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				Bins
    			</div>
    			<div class="grid-4-5">
    				<div id="audit-creation-bin-list">
    				</div>
    			</div>
    			<div class="grid-2">
    				Category
    			</div>
    			<div class="grid-3">    				
    				<div id="audit-creation-category-list">
    				</div>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				Note
    			</div>
    			<div class="grid-9">
    				<textarea style="width: 100%;" id="audit-creation-note"></textarea>
    			</div>
    		</div>
    		<div class="line">
    		
    		</div>
    		<div class="line">
    			<div class="grid-6">
    			&nbsp;
    			</div>
    			<div class="grid-6" style="text-align: right;padding-right: 20px;">
    				<div class="btn sky" onclick="WRPAdminApp.pagescript.createNewAuditInfo();">Submit</div>
    				<div class="btn blue" onclick="$('#audit-creation-window').jqxWindow('close');">Cancel</div>
    			</div>
    		</div>
    	</div>
    </div>
    <div class="jqx-custom-window" id="audit-serialized-window">
    	<div role="title">
    		IMEI Scan for Audit
    	</div>
    	<div role="content">
    		<div class="line">
    			<div class="grid-2">
    				Audit ID
    			</div>
    			<div class="grid-5">
    				<input type="text" style="width:100%;" id="audit-serialized-audit-id" readonly/>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				SKU / UPC
    			</div>
    			<div class="grid-5">
    				<input type="text" style="width:100%;" id="audit-serialized-sku" readonly/>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				Description
    			</div>
    			<div class="grid-10">
    				<input type="text" style="width:100%;" id="audit-serialized-description" readonly/>
    			</div>
    		</div>
    		<div class="line" style="margin-top: 20px;">
				<div class="grid-2">
					&nbsp;
				</div>    
				<div class="grid-4">
					<input type="text" style="width:100%;" id="audit-serialized-input-scanned" onkeydown="if(event.keyCode == 13) { WRPAdminApp.pagescript.scanSerialNo(); }"/>
				</div>			
				<div class="grid-3">
					<div class="btn blue" onclick="WRPAdminApp.pagescript.scanSerialNo();">ADD</div>
				</div>
    		</div>
    		<div class="line" style="height: 180px;">
    			<div id="jqx-grid-audit-serialized-list"></div>    			
    		</div>
    		<div class="line">
    			<div class="grid-6">
    			&nbsp;
    			</div>
    			<div class="grid-6" style="text-align: right;padding-right: 20px;">
    				<div class="btn sky" onclick="WRPAdminApp.pagescript.submitSerializedAuditData(1);">Submit</div>
    				<div class="btn blue" onclick="$('#audit-serialized-window').jqxWindow('close');">Cancel</div>
    			</div>
    		</div>
    	</div>
    </div>
    <div class="jqx-custom-window" id="audit-nonserialized-window">
    	<div role="title">
    		Input Qty for Audit
    	</div>
    	<div role="content">
    		<div class="line">
    			<div class="grid-2">
    				Audit ID
    			</div>
    			<div class="grid-5">
    				<input type="text" style="width:100%;" id="audit-nonserialized-audit-id" readonly/>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				SKU / UPC
    			</div>
    			<div class="grid-5">
    				<input type="text" style="width:100%;" id="audit-nonserialized-sku" readonly/>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-2">
    				Description
    			</div>
    			<div class="grid-10">
    				<input type="text" style="width:100%;" id="audit-nonserialized-description" readonly/>
    			</div>
    		</div>
    		<div class="line" style="margin-top: 20px;">
				<div class="grid-3">
					System Qty
				</div>    
				<div class="grid-3">
					<input type="text" style="width:100%;" id="audit-nonserialized-system-qty" readonly/>
				</div>	
				<div class="grid-3">
					Scanned Qty
				</div>    
				<div class="grid-3">
					<input type="text" style="width:100%;" id="audit-nonserialized-scanned-qty"/>
				</div>	
    		</div>
    		<div class="line">
    			<div class="grid-6">
    			&nbsp;
    			</div>
    			<div class="grid-6" style="text-align: right;padding-right: 20px;">
    				<div class="btn sky" onclick="WRPAdminApp.pagescript.submitAuditNonSerializedItem();">Submit</div>
    				<div class="btn blue" onclick="$('#audit-nonserialized-window').jqxWindow('close');">Cancel</div>
    			</div>
    		</div>
    	</div>
    </div>
</div>