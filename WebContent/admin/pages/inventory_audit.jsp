<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "inventory_audit");
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
	String user_sid = (session.getAttribute("wrp_admin_login_user_sid") != null)? session.getAttribute("wrp_admin_login_user_sid").toString() : null;

    JSONObject obj = null;
%>
<div pagename="inventory_audit" class="theme-02" id="inventory-audit-page">
    <div class="page-submenu-container">
        <div class="submenu" panelname="simple_adjustment" onclick="WRP.UI.changePanelBySubmenu('simple_adjustment');">
            Simple Adjustment
        </div>
<%
	//if (user_sid.equals("8")) {
%>
        <div class="border"></div>
        <div class="submenu" panelname="blind_audit" onclick="WRP.UI.changePanelBySubmenu('blind_audit');">
            Blind Audit
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="missing_bin" onclick="WRP.UI.changePanelBySubmenu('missing_bin');">
            Missing Bin
        </div>
<%
	// } 
%>
    </div>
    <div class="panels">        
	    <div class="jqx-horizontal-split-panel" panelname="simple_adjustment" style="display: block;">
	    	<div class="plain-01-panel">
	    		<div class="title-wrapper" style="height:55px;">
                    <div class="title" style="line-height:35px;">
                        Simple Adjustment
                    </div>
                    <div class="sub-title">
                    </div>
                    <div class="left-input-area">
               			<div class="jqx-plain-button" style="width:130px;height:24px;line-height:24px;" onclick="WRPAdminApp.pagescript.newSimpleAdjustOpen();">New Adjustment</div>
                    </div>
                    <div class="right-input-area">	
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="simple-adjust-radio-1" groupName="simple-adjust">Today</div>
						</div>
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="simple-adjust-radio-2" groupName="simple-adjust">1 Week</div>
						</div>
						<div style="width:80px;display:inline-block;">
							<div class="jqx-radio-button" id="simple-adjust-radio-3" groupName="simple-adjust">1 Month</div>
						</div>
						<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="simple-adjust-history-start-date"></div>
	                	</div>
	                	<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="simple-adjust-history-end-date"></div>
	                	</div>											
	                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getSimpleAdjustList();">Search</div>
					</div>
                </div>
        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
        			<div id="simple-adjustment-list">
        			</div>
        		</div>
        	</div>
        	<div>
        		<div class="jqx-tab-panel" id="simple-adjust-bottom-tab">
        			<ul>
        				<li>Detail</li>
        				<li>Serial No</li>
        			</ul>
        			<div class="plain-01-panel" style="overflow: auto;">	
		       			<div class="title-wrapper">
			                <div class="title">
			                	Detail
			                </div>
		               	</div>	   
		               	<div class="content-wrapper" style="width:650px;">
		               		<div class="line" style="padding: 10px 10px 0px 10px;line-height: 20px;">
		               			<div class="grid-2-5">
		               				Inventory Adjustment
		               			</div>
		               			<div class="grid-3-5">
		               				<input type="text" id="simple-adjust-detail-store" readonly/>
		               			</div>
		               			<div class="grid-1-5">
		               				Date
		               			</div>
		               			<div class="grid-4">
		               				<input type="text" id="simple-adjust-detail-date" style="width:100%;" readonly/>
		               			</div>
		               		</div>
		               		<div class="line" style="padding: 0px 10px 0px 10px;line-height: 20px;">
		               			<div class="grid-2-5">
		               				Adjust ID
		               			</div>
		               			<div class="grid-3-5">
		               				<input type="text" id="simple-adjust-detail-id" readonly/>
		               			</div>
		               			<div class="grid-1-5">
		               				Adjust By
		               			</div>
		               			<div class="grid-4">
		               				<input type="text" id="simple-adjust-detail-user" style="width:100%;" readonly/>
		               			</div>
		               		</div>
		               		<div style="padding:10px;border: 1px solid gray;">
								<div class="line">
									<div class="grid-2-5">Item Code</div>
									<div class="grid-3-5"><input type="text" id="simple-adjust-detail-item-code" readonly/></div>
									<div class="grid-1-5">SKU/UPC</div>
									<div class="grid-4"><input type="text" id="simple-adjust-detail-item-sku" style="width:100%;" readonly/></div>
								</div>
								<div class="line">
									<div class="grid-2-5">Description</div>
									<div class="grid-9"><input type="text" id="simple-adjust-detail-item-description" style="width:463px;" readonly/></div>
								</div>
							</div>
							<div class="line" style="padding: 10px; border: 1px solid gray; margin-top: 5px;">
								<div class="grid-2-5" style="font-size: 15px;">Adjusted Qty</div>
								<div class="grid-5" style="font-size: 15px;"><input type="text" id="simple-adjust-detail-qty" readonly/></div>
							</div>
							<div class="line" style="margin-top:10px;">Memo</div>
				 			<textarea rows="6" style="width:100%" id="simple-adjust-detail-memo" readonly></textarea>
				 			<div class="line">&nbsp;</div>
		               	</div>
		       		</div>
		       		
        			<div class="plain-01-panel" style="overflow: auto;">	
		       			<div class="title-wrapper">
			                <div class="title">
			                	Serialized Item
			                </div>
		               	</div>	   
		               	<div class="content-wrapper" style="width:800px;">
		               		<div class="line" style="padding:10px;">
		               			<div class="grid-2-5">
		               				Inventory Adjustment : 
		               			</div>
		               			<div class="grid-2" id="simple-adjust-serial-detail-store">
		               				&nbsp;
		               			</div>
		               			<div class="grid-1">
		               				Date : 
		               			</div>
		               			<div class="grid-3" id="simple-adjust-serial-detail-date">
		               				&nbsp;
		               			</div>
		               		</div>
		               		<div class="line" style="padding: 0px 10px 0px 10px;">
		               			<div class="grid-1-5">
		               				Adjust ID : 
		               			</div>
		               			<div class="grid-3" id="simple-adjust-serial-detail-id">
		               				&nbsp;
		               			</div>
		               			<div class="grid-1-5">
		               				Adjust By : 
		               			</div>
		               			<div class="grid-2-5" id="simple-adjust-serial-detail-user">
		               				&nbsp;
		               			</div>
		               		</div>
		               		<div class="line" style="margin-left:10px;">
		               			<span id="simple-adjust-serial-detail-type" style="font-size:15px;"></span>
		               		</div>
			        		<div style="margin: 3px 5px 5px 5px; height:calc(100% - 57px);">
			        			<div id="simple-adjustment-serial-no-list">
			        			</div>
			        		</div>
		               	</div>
		       		</div>
        		</div>
        	</div>
	    </div>
<%
	//if (user_sid.equals("8")) {
%>	           
	    <div class="jqx-horizontal-split-panel" panelname="blind_audit" style="display: none;">
	    	<div class="plain-01-panel">
	    		<div class="title-wrapper" style="height:55px;">
                    <div class="title" style="line-height:35px;">
                        
                    </div>
                    <div class="sub-title">
                    </div>
                    <div class="left-input-area">
               			<div class="jqx-plain-button" style="height: 30px;" onclick="WRPAdminApp.pagescript.runBlindAudit();">RUN BLIND AUDIT</div>
                    </div>
                    <div class="right-input-area">	
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="blind-audit-search-period-1" groupName="blind-audit-search-period">Today</div>
						</div>
						<div style="width:70px;display:inline-block;">
							<div class="jqx-radio-button" id="blind-audit-search-period-2" groupName="blind-audit-search-period">1 Week</div>
						</div>
						<div style="width:80px;display:inline-block;">
							<div class="jqx-radio-button" id="blind-audit-search-period-3" groupName="blind-audit-search-period">1 Month</div>
						</div>
						<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="blind-audit-history-start-date"></div>
	                	</div>
	                	<div style="width:100px; display:inline-block;">
	                    	<div class="jqx-datetime-input" id="blind-audit-history-end-date"></div>
	                	</div>											
	                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getBlindAuditList();">Search</div>
					</div>
                </div>
        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
        			<div id="blind-audit-list">
        			</div>
        		</div>
        	</div>
        	<div>
        		<div class="jqx-tab-panel" id="blind-audit-info-tab-panel">
        			<ul>
        				<li>Detail</li>
        				<li>Phone</li>
        				<li>SIM</li>
        				<li>Serialized Acc.</li>
        				<li>Non-Serialized Acc.</li>
        			</ul>
        			<div class="plain-01-panel" style="padding: 10px 15px; overflow: auto;">	
		       			<div class="line">
		       				<div class="grid-6">
		       					INVENTORY BLIND AUDIT : <span id="blind-audit-detail-tab-store-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					AUDIT BY : <span id="blind-audit-detail-tab-audit-user-name"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-6">
		       					AUDIT ID : <span id="blind-audit-detail-tab-audit-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					START : <span id="blind-audit-detail-tab-audit-start-date"></span> | END : <span id="blind-audit-detail-tab-audit-end-date"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-6">
		       					&nbsp;
		       				</div>
		       				<div class="grid-6" style="text-align: right">
		       					<div class="jqx-plain-button" style="display: inline-block" onclick="WRPAdminApp.pagescript.openBlindAuditDetailWindow();">Print Detail</div>
		       				</div>
		       			</div>
		       			<div class="line" style="height:150px; width: 820px;">
		       				<div class="grid-3 blind-audit-detail-item-type-information">
		       					<div class="line title orange">
		       						PHONE
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						System:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-phone-system">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Scanned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-phone-scanned">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Matched:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-phone-matched">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Orphaned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-phone-orphan">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Missing:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-phone-missing">
			       						0
			       					</div>
		       					</div>
		       				</div>
		       				<div class="grid-3 blind-audit-detail-item-type-information">
		       					<div class="line title yellow">
		       						SIM
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						System:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-sim-system">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Scanned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-sim-scanned">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Matched:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-sim-matched">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Orphaned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-sim-orphan">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Missing:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-sim-missing">
			       						0
			       					</div>
		       					</div>
		       				</div>
		       				<div class="grid-3 blind-audit-detail-item-type-information">
		       					<div class="line title green">
		       						Serailized Accessory
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						System:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-serialized-acc-system">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Scanned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-serialized-acc-scanned">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Matched:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-serialized-acc-matched">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Orphaned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-serialized-acc-orphan">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Missing:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-serialized-acc-missing">
			       						0
			       					</div>
		       					</div>
		       				</div>
		       				<div class="grid-3 blind-audit-detail-item-type-information">
		       					<div class="line title blue">
		       						Non-Serailized Accessory
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						System:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-nonserialized-acc-system">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Scanned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-nonserialized-acc-scanned">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Matched:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-nonserialized-acc-matched">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Orphaned:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-nonserialized-acc-orphan">
			       						0
			       					</div>
		       					</div>
		       					<div class="line info">
			       					<div class="grid-6 label">
			       						Missing:
			       					</div>
			       					<div class="grid-6 value" id="blind-audit-detail-tab-nonserialized-acc-missing">
			       						0
			       					</div>
		       					</div>
		       				</div>
		       			</div>
		       			<div class="line">
		       				MEMO
		       			</div>
		       			<div class="line" style="height: 80px; border: 1px solid; padding: 10px 15px; font-size: 11px;" id="blind-audit-detail-tab-audit-memo">
		       			
		       			</div>
		       		</div>
        			<div class="plain-01-panel" style="padding: 10px 15px; overflow: auto;">	
		       			<div class="line">
		       				<div class="grid-5">
		       					INVENTORY BLIND AUDIT : <span id="blind-audit-phone-tab-store-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					AUDIT BY : <span id="blind-audit-phone-tab-audit-user-name"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5">
		       					AUDIT ID : <span id="blind-audit-phone-tab-audit-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					START : <span id="blind-audit-phone-tab-audit-start-date"></span> | END : <span id="blind-audit-phone-tab-audit-end-date"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5" style="font-size: 16px; font-weight: bold;">
		       					PHONE
		       				</div>
		       				<div class="grid-6" style="text-align: right">
		       					<div class="jqx-plain-button" style="display: inline-block" onclick="WRPAdminApp.pagescript.openBlindAuditDetailWindow(0);">Print Detail</div>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-1">
		       					&nbsp;
		       				</div>
		       				<div class="grid-2">
		       					SYSTEM : <span id="blind-audit-phone-tab-phone-system">0</span>
		       				</div>
		       				<div class="grid-2">
		       					SCANNED : <span id="blind-audit-phone-tab-phone-scanned">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MATCHED : <span id="blind-audit-phone-tab-phone-matched">0</span>
		       				</div>
		       				<div class="grid-2">
		       					ORPHAN : <span id="blind-audit-phone-tab-phone-orphan">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MISSING : <span id="blind-audit-phone-tab-phone-missing">0</span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">	
			       				<div class="blind-audit-info-items-list" id="blind-audit-phone-tab-items-list">
			       				</div>
			       			</div>
		       			</div>
		       			<div class="line" style="font-size:14px;margin-bottom: 0px;">
		       				ORPHAN SERIAL NUMBERS
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">			       				
			       				<div class="blind-audit-info-orphan-items-list" id="blind-audit-phone-tab-orphan-items-list">
			       				</div>
		       				</div>
		       			</div>
		       			<div class="line" style="font-size:14px;margin-bottom: 0px;">
		       				MISSING SERIAL NUMBERS
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">			       				
			       				<div class="blind-audit-info-missing-items-list" id="blind-audit-phone-tab-missing-items-list">
			       				</div>
		       				</div>
		       			</div>
		       		</div>
        			<div class="plain-01-panel" style="padding: 10px 15px; overflow: auto;">	
		       			<div class="line">
		       				<div class="grid-5">
		       					INVENTORY BLIND AUDIT : <span id="blind-audit-sim-tab-store-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					AUDIT BY : <span id="blind-audit-sim-tab-audit-user-name"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5">
		       					AUDIT ID : <span id="blind-audit-sim-tab-audit-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					START : <span id="blind-audit-sim-tab-audit-start-date"></span> | END : <span id="blind-audit-sim-tab-audit-end-date"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5" style="font-size: 16px; font-weight: bold;">
		       					SIM
		       				</div>
		       				<div class="grid-6" style="text-align: right">
		       					<div class="jqx-plain-button" style="display: inline-block" onclick="WRPAdminApp.pagescript.openBlindAuditDetailWindow(1);">Print Detail</div>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-1">
		       					&nbsp;
		       				</div>
		       				<div class="grid-2">
		       					SYSTEM : <span id="blind-audit-sim-tab-sim-system">0</span>
		       				</div>
		       				<div class="grid-2">
		       					SCANNED : <span id="blind-audit-sim-tab-sim-scanned">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MATCHED : <span id="blind-audit-sim-tab-sim-matched">0</span>
		       				</div>
		       				<div class="grid-2">
		       					ORPHAN : <span id="blind-audit-sim-tab-sim-orphan">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MISSING : <span id="blind-audit-sim-tab-sim-missing">0</span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">
			       				<div class="blind-audit-info-items-list" id="blind-audit-sim-tab-items-list">
			       				</div>
			       			</div>
		       			</div>
		       			<div class="line" style="font-size:14px;margin-bottom: 0px;">
		       				ORPHAN SERIAL NUMBERS
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">			       				
			       				<div class="blind-audit-info-orphan-items-list" id="blind-audit-sim-tab-orphan-items-list">
			       				</div>
		       				</div>
		       			</div>
		       			<div class="line" style="font-size:14px;margin-bottom: 0px;">
		       				MISSING SERIAL NUMBERS
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">			       				
			       				<div class="blind-audit-info-missing-items-list" id="blind-audit-sim-tab-missing-items-list">
			       				</div>
		       				</div>
		       			</div>
		       		</div>
        			<div class="plain-01-panel" style="padding: 10px 15px; overflow: auto;">	
		       			<div class="line">
		       				<div class="grid-5">
		       					INVENTORY BLIND AUDIT : <span id="blind-audit-serialized-acc-tab-store-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					AUDIT BY : <span id="blind-audit-serialized-acc-tab-audit-user-name"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5">
		       					AUDIT ID : <span id="blind-audit-serialized-acc-tab-audit-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					START : <span id="blind-audit-serialized-acc-tab-audit-start-date"></span> | END : <span id="blind-audit-serialized-acc-tab-audit-end-date"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5" style="font-size: 16px; font-weight: bold;">
		       					SERIALIZED ACCESSORY
		       				</div>
		       				<div class="grid-6" style="text-align: right">
		       					<div class="jqx-plain-button" style="display: inline-block" onclick="WRPAdminApp.pagescript.openBlindAuditDetailWindow(2);">Print Detail</div>
		       				</div>
		       			</div>		       			
		       			<div class="line">
		       				<div class="grid-1">
		       					&nbsp;
		       				</div>
		       				<div class="grid-2">
		       					SYSTEM : <span id="blind-audit-serialized-acc-tab-serialized-acc-system">0</span>
		       				</div>
		       				<div class="grid-2">
		       					SCANNED : <span id="blind-audit-serialized-acc-tab-serialized-acc-scanned">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MATCHED : <span id="blind-audit-serialized-acc-tab-serialized-acc-matched">0</span>
		       				</div>
		       				<div class="grid-2">
		       					ORPHAN : <span id="blind-audit-serialized-acc-tab-serialized-acc-orphan">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MISSING : <span id="blind-audit-serialized-acc-tab-serialized-acc-missing">0</span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">
			       				<div class="blind-audit-info-items-list" id="blind-audit-serialized-acc-tab-items-list">
			       				</div>
		       				</div>
		       			</div>
		       			<div class="line" style="font-size:14px;margin-bottom: 0px;">
		       				ORPHAN SERIAL NUMBERS
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">			       				
			       				<div class="blind-audit-info-orphan-items-list" id="blind-audit-serialized-acc-tab-orphan-items-list">
			       				</div>
		       				</div>
		       			</div>
		       			<div class="line" style="font-size:14px;margin-bottom: 0px;">
		       				MISSING SERIAL NUMBERS
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">			       				
			       				<div class="blind-audit-info-missing-items-list" id="blind-audit-serialized-acc-tab-missing-items-list">
			       				</div>
		       				</div>
		       			</div>
		       		</div>
        			<div class="plain-01-panel" style="padding: 10px 15px; overflow: auto;">	
		       			<div class="line">
		       				<div class="grid-5">
		       					INVENTORY BLIND AUDIT : <span id="blind-audit-nonserialized-acc-tab-store-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					AUDIT BY : <span id="blind-audit-nonserialized-acc-tab-audit-user-name"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5">
		       					AUDIT ID : <span id="blind-audit-nonserialized-acc-tab-audit-id"></span>
		       				</div>
		       				<div class="grid-6">
		       					START : <span id="blind-audit-nonserialized-acc-tab-audit-start-date"></span> | END : <span id="blind-audit-nonserialized-acc-tab-audit-end-date"></span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-5" style="font-size: 16px; font-weight: bold;">
		       					NON-SERIALIZED ACCESSORY
		       				</div>
		       				<div class="grid-6" style="text-align: right">
		       					<div class="jqx-plain-button" style="display: inline-block" onclick="WRPAdminApp.pagescript.openBlindAuditDetailWindow(3);">Print Detail</div>
		       				</div>
		       			</div>		       			
		       			<div class="line">
		       				<div class="grid-1">
		       					&nbsp;
		       				</div>
		       				<div class="grid-2">
		       					SYSTEM : <span id="blind-audit-nonserialized-acc-tab-nonserialized-acc-system">0</span>
		       				</div>
		       				<div class="grid-2">
		       					SCANNED : <span id="blind-audit-nonserialized-acc-tab-nonserialized-acc-scanned">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MATCHED : <span id="blind-audit-nonserialized-acc-tab-nonserialized-acc-matched">0</span>
		       				</div>
		       				<div class="grid-2">
		       					ORPHAN : <span id="blind-audit-nonserialized-acc-tab-nonserialized-acc-orphan">0</span>
		       				</div>
		       				<div class="grid-2">
		       					MISSING : <span id="blind-audit-nonserialized-acc-tab-nonserialized-acc-missing">0</span>
		       				</div>
		       			</div>
		       			<div class="line">
		       				<div class="grid-11">
			       				<div class="blind-audit-info-items-list" id="blind-audit-nonserialized-acc-tab-items-list">
			       				</div>
			       			</div>
		       			</div>
		       		</div>
        		</div>
        	</div>
	    </div>
	    <div class="tab-panel" panelname="missing_bin" style="display: none; width: 99.8%; height: 99.6%">
			<div class="jqx-tab-panel">
				<ul>
					<li>Phone</li>
					<li>Sim</li>
					<li>Serialized Accessory</li>
					<li>Non-Serialized Accessory</li>
				</ul>
		    	<div class="plain-01-panel">
		    		<div class="title-wrapper">
	                    <div class="title">
	                        Missing Bin
	                    </div>
	                    <div class="sub-title">
	                    	Phone
	                    </div>
	                    <div class="right-input-area">	
	                    	<div class="grid-2-5">
	                    		<div class="jqx-radio-button" id="missing-bin-phone-cur" groupName="missing-phone">Current</div>
	                    	</div>
	                    	<div class="grid-2">
	                    		<div class="jqx-radio-button" id="missing-bin-phone-log" groupName="missing-phone">Log</div>
	                    	</div>
	                    	<div class="grid-5-5">
	                    		<input type="text" id="missing-bin-phone-search" style="width:95%;height:25px;" placeholder="keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getMissingPhoneList(); }"/>
	                    	</div>
	                    	<div class="grid-2">
	                    		<div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getMissingPhoneList();">Search</div>
	                    	</div>
						</div>
	                </div>
	        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
	                	<div id="missing-bin-item-phone-list"></div>
	        		</div>
	          	</div>
		    	<div class="plain-01-panel">
		    		<div class="title-wrapper">
	                    <div class="title">
	                        Missing Bin
	                    </div>
	                    <div class="sub-title">
	                    	Sim
	                    </div>
	                    <div class="right-input-area">	
	                    	<div class="grid-2-5">
	                    		<div class="jqx-radio-button" id="missing-bin-sim-cur" groupName="missing-sim">Current</div>
	                    	</div>
	                    	<div class="grid-2">
	                    		<div class="jqx-radio-button" id="missing-bin-sim-log" groupName="missing-sim">Log</div>
	                    	</div>
	                    	<div class="grid-5-5">
	                    		<input type="text" id="missing-bin-sim-search" style="width:95%;height:25px;" placeholder="keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getMissingSimList(); }"/>
	                    	</div>
	                    	<div class="grid-2">
		                    	<div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getMissingSimList();">Search</div>
	                    	</div>
						</div>
	                </div>
	        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
	                	<div id="missing-bin-item-sim-list"></div>
	        		</div>
	          	</div>
		    	<div class="plain-01-panel">
		    		<div class="title-wrapper">
	                    <div class="title">
	                        Missing Bin
	                    </div>
	                    <div class="sub-title">
	                    	Serialized Accessory
	                    </div>
	                    <div class="right-input-area">	
	                    	<div class="grid-2-5">
	                    		<div class="jqx-radio-button" id="missing-bin-ser-acc-cur" groupName="missing-ser-acc">Current</div>
	                    	</div>
	                    	<div class="grid-2">
	                    		<div class="jqx-radio-button" id="missing-bin-ser-acc-log" groupName="missing-ser-acc">Log</div>
	                    	</div>
	                    	<div class="grid-5-5">
	                    		<input type="text" id="missing-bin-ser-acc-search" style="width:95%;height:25px;" placeholder="keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getMissingAccList(); }"/>
	                    	</div>
	                    	<div class="grid-2">
			                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getMissingAccList();">Search</div>
	                    	</div>
						</div>
	                </div>
	        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
	                	<div id="missing-bin-item-ser-acc-list"></div>
	        		</div>
	          	</div>
		    	<div class="plain-01-panel">
		    		<div class="title-wrapper">
	                    <div class="title">
	                        Missing Bin
	                    </div>
	                    <div class="sub-title">
	                    	Non-serialized Accessory
	                    </div>
	                    <div class="right-input-area">	
	                    	<div class="grid-2-5">
	                    		<div class="jqx-radio-button" id="missing-bin-non-acc-cur" groupName="missing-non-acc">Current</div>
	                    	</div>
	                    	<div class="grid-2">
	                    		<div class="jqx-radio-button" id="missing-bin-non-acc-log" groupName="missing-non-acc">Log</div>
	                    	</div>
	                    	<div class="grid-5-5">
	                    		<input type="text" id="missing-bin-non-acc-search" style="width:95%;height:25px;" placeholder="keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getMissingNonAccList(); }"/>
	                    	</div>
	                    	<div class="grid-2">
			                    <div class="jqx-plain-button" style="display:inline-block;width:70px;float:right" onclick="WRPAdminApp.pagescript.getMissingNonAccList();">Search</div>
	                    	</div>
						</div>
	                </div>
	        		<div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
	                	<div id="missing-bin-item-non-acc-list"></div>
	        		</div>
	          	</div>
		    </div>
	    </div>
    </div>
    
<%
	//}
%>    
    
	<div class="jqx-custom-window" id="simple-adjust-select-item-type-window">
		<div role="title">
	 		Select Adjust Item Type
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="jqx-plain-button" style="height:35px;line-height:35px;width:90%;margin:0 auto;margin-top:50px;" onclick="WRPAdminApp.pagescript.selectSerialType(0);">PHONE</div>
			<div class="jqx-plain-button" style="height:35px;line-height:35px;width:90%;margin:0 auto;margin-top:25px;" onclick="WRPAdminApp.pagescript.selectSerialType(1);">SIM</div>
			<div class="jqx-plain-button" style="height:35px;line-height:35px;width:90%;margin:0 auto;margin-top:25px;" onclick="WRPAdminApp.pagescript.selectSerialType(2);">SERIALIZED ACCESSORY</div>
			<div class="jqx-plain-button" style="height:35px;line-height:35px;width:90%;margin:0 auto;margin-top:25px;" onclick="WRPAdminApp.pagescript.openSearchItemWindow(3);">NON-SERIALIZED ACCESSORY</div>
	 		<div class="line" style="margin: 70px 27px 10px 0px;">
	 			<div class="grid-7-5">
	 				&nbsp;
	 			</div>
	 			<div class="grid-4-5">
	 				<div class="jqx-plain-button" style="float:right;" onclick="$('#simple-adjust-select-item-type-window').jqxWindow('close');">Cancel</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="simple-adjust-select-adjust-type-window">
		<div role="title">
	 		Select Adjust Type
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="jqx-plain-button" style="height:35px;line-height:35px;width:90%;margin:0 auto;margin-top:70px;" onclick="WRPAdminApp.pagescript.openSearchItemWindow(1);">Reverse Adjust Out</div>
			<div class="jqx-plain-button" style="height:35px;line-height:35px;width:90%;margin:0 auto;margin-top:25px;" onclick="WRPAdminApp.pagescript.openSearchItemWindow(2);">Subtract</div>
	 		<div class="line" style="margin: 80px 27px 10px 0px;">
	 			<div class="grid-7-5">
	 				&nbsp;
	 			</div>
	 			<div class="grid-4-5">
	 				<div class="jqx-plain-button" style="float:right;" onclick="$('#simple-adjust-select-adjust-type-window').jqxWindow('close');">Cancel</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="simple-adjust-select-item-window">
		<div role="title">
	 		<span id="simple-adjust-select-type-title"></span>
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;margin:25px;">Enter SKU Or Keyword</div>						
			<div class="line">
				<div class="grid-2-5">
					&nbsp;
				</div>
				<div class="grid-6">
					<input type="text" style="width:100%;height: 27px;" id="simple-adjust-item-search-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.simpleAdjustSearchItem(); }"/>
				</div>
				<div class="grid-3-5">
					<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.simpleAdjustSearchItem();">SEARCH</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;margin:25px;">Select Item For Adjustment</div>
			<div style="height:60%;margin-left:25px;margin-right:25px;">
				<div id="simple-adjust-search-item-list"></div>
	 		</div>
	 		<div class="line" style="margin: 10px 30px 10px 0px;">
	 			<div class="grid-8">
	 				<div class="jqx-plain-button" style="float:right;width:200px;height:30px;line-height:30px;" onclick="WRPAdminApp.pagescript.nextSimpleAdjust();">Next</div>
	 			</div>
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="position:absolute;top:11px;right:0px;" onclick="$('#simple-adjust-select-item-window').jqxWindow('close');">Cancel</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="simple-adjust-serialized-add-window">
		<div role="title">
	 		Add Serialized Inventory
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div style="padding:10px;border: 1px solid gray;width:94%;margin: 0px 0px 7px 20px;">
				<div class="line">
					<div class="grid-1-5">Item Code : </div>
					<div class="grid-3" id="add-adjust-selected-item-code"></div>
					<div class="grid-1-5">SKU/UPC : </div>
					<div class="grid-5"><span id="add-adjust-selected-item-sku"></span> / <span id="add-adjust-selected-item-upc"></span></div>
				</div>
				<div class="line">
					<div class="grid-1-5">Description : </div>
					<div class="grid-5" id="add-adjust-selected-item-description"></div>
				</div>
			</div>
			<div class="line" style="padding: 15px 10px 15px 10px; border: 1px solid gray; width:94%;margin: 7px 0px 7px 20px;">
				<div class="grid-2-5">
					&nbsp;
				</div>
				<div class="grid-6">
					<input type="text" style="width:100%;height: 27px;" id="add-serialno-keyword" onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.AddSerialNo(); }"/>
				</div>
				<div class="grid-3-5">
					<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.AddSerialNo();">ADD</div>
				</div>
			</div>
	 		<div class="line" style="height: 290px;padding:5px 20px;">
	 			<div id="add-adjust-serial-no-list"></div>
	 		</div>
			<div class="line" style="height:25px;margin-top:15px;">
				<div class="grid-2">&nbsp;</div>
				<div class="grid-2" style="text-align:right; line-height:20px; font-size:15px;">Reason : </div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-4">
					<select style="width:100%;" id="add-adjust-selected-reason">
						<option value="0">Reason1</option>
						<option value="1">Reason2</option>
						<option value="2">Reason3</option>
					</select>
				</div>
			</div>
			<div style="margin: 15px 0px 10px 30px;">
			<div class="line" style="margin-top:10px;">Memo</div>
		 	<textarea rows="6" style="width:97%" id="add-new-simple-adjust-memo"></textarea>
		 	</div>
	 		<div class="line" style="margin: 20px 22px 10px 0px;">
	 			<div class="grid-8">
	 				<div class="jqx-plain-button" style="float:right;width:200px;height:30px;line-height:30px;" onclick="WRPAdminApp.pagescript.proceedSerializedSimpleAdjust();">Proceed</div>
	 			</div>
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="position:absolute;top:11px;right:0px;" onclick="$('#simple-adjust-serialized-add-window').jqxWindow('close');">Cancel</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="simple-adjust-serialized-subtract-window">
		<div role="title">
	 		Inventory Subtract
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div style="padding:10px;border: 1px solid gray; width:94%;margin: 7px 0px 7px 20px;">
				<div class="line">
					<div class="grid-1-5">Item Code : </div>
					<div class="grid-3" id="subtract-adjust-selected-item-code"></div>
					<div class="grid-1-5">SKU/UPC : </div>
					<div class="grid-5"><span id="subtract-adjust-selected-item-sku"></span> / <span id="subtract-adjust-selected-item-upc"></span></div>
				</div>
				<div class="line">
					<div class="grid-1-5">Description : </div>
					<div class="grid-5" id="subtract-adjust-selected-item-description"></div>
				</div>
			</div>
			<div class="line" style="padding: 15px 10px 15px 10px; border: 1px solid gray; width:94%;margin: 7px 0px 7px 20px;">
				<div class="grid-3-5" style="font-size: 15px;">Current Qty On-Hand : </div>
				<div class="grid-5" style="font-size: 15px;" id="subtract-adjust-selected-item-system-qty"></div>
			</div>
	 		<div class="line" style="height: 290px;padding:5px 20px;">
	 			<div id="subtract-adjust-serial-no-list">
	 				
	 			</div>
	 		</div>
			<div class="line" style="height:25px;margin-top:15px;">
				<div class="grid-2">&nbsp;</div>
				<div class="grid-2" style="text-align:right; line-height:20px; font-size:15px;">Reason : </div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-4">
					<select style="width:100%;" id="subtract-adjust-selected-reason">
						<option value="0">Reason1</option>
						<option value="1">Reason2</option>
						<option value="2">Reason3</option>
					</select>
				</div>
			</div>
			<div style="margin: 15px 0px 10px 30px;">
			<div class="line" style="margin-top:10px;">Memo</div>
		 	<textarea rows="6" style="width:97%" id="subtract-new-simple-adjust-memo"></textarea>
		 	</div>
	 		<div class="line" style="margin: 15px 22px 10px 0px;">
	 			<div class="grid-8">
	 				<div class="jqx-plain-button" style="float:right;width:200px;height:35px;line-height:35px;" onclick="WRPAdminApp.pagescript.proceedSerializedSimpleAdjust();">Proceed</div>
	 			</div>
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="position:absolute;top:11px;right:0px;" onclick="$('#simple-adjust-serialized-subtract-window').jqxWindow('close');">Cancel</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="simple-adjust-adjust-qty-window">
		<div role="title">
	 		Inventory Adjustment
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div style="padding:10px;border: 1px solid gray;width:94%;margin: 7px 0px 7px 20px;">
				<div class="line">
					<div class="grid-1-5">Item Code : </div>
					<div class="grid-3" id="adjust-selected-item-code"></div>
					<div class="grid-1-5">SKU/UPC : </div>
					<div class="grid-5"><span id="adjust-selected-item-sku"></span> / <span id="adjust-selected-item-upc"></span></div>
				</div>
				<div class="line">
					<div class="grid-1-5">Description : </div>
					<div class="grid-5" id="adjust-selected-item-description"></div>
				</div>
			</div>
			
			<div class="line" style="padding: 15px 10px 15px 10px; border: 1px solid gray;width:94%;margin: 7px 0px 7px 20px;">
				<div class="grid-3-5" style="font-size: 15px;">Current Qty On-Hand : </div>
				<div class="grid-5" style="font-size: 15px;" id="adjust-selected-item-system-qty"></div>
			</div>
			<div class="line"></div>
			<div class="line" style="height:25px;margin-top:20px;">
				<div class="grid-2">&nbsp;</div>
				<div class="grid-2" style="text-align:right; line-height:20px; font-size:15px;">Reason : </div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-4">
					<select style="width:100%;" id="adjust-selected-reason">
						<option value="0">Reason1</option>
						<option value="1">Reason2</option>
						<option value="2">Reason3</option>
					</select>
				</div>
			</div>
			<div class="line" style="height:25px;">
				<div class="grid-2">&nbsp;</div>
				<div class="grid-2" style="text-align:right; line-height:20px; font-size:15px;">Adjust Qty : </div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-6"><input type="text" style="text-align:right;" id="new-simple-adjust-qty" onkeyup="WRPAdminApp.pagescript.calcOnhandQty();"/></div>
			</div>
			<div class="line" style="height:40px;">
				<div class="grid-1">&nbsp;</div>
				<div class="grid-3" style="text-align:right; line-height:15px; font-size:15px;">Final Qty On-Hand : <br><span style="font-size:11px;margin-right: 10px;">(After Adjustment)</span></div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-6"><input type="text" style="text-align:right;" id="new-simple-adjust-onhand-qty" readonly/></div>
			</div>
			<div style="margin: 45px 0px 45px 30px;">
			<div class="line" style="margin-top:10px;">Memo</div>
		 	<textarea rows="6" style="width:96%" id="new-simple-adjust-memo"></textarea>
		 	</div>
	 		<div class="line" style="margin: 10px 28px 10px 0px;">
	 			<div class="grid-8">
	 				<div class="jqx-plain-button" style="float:right;width:200px;height:30px;line-height:30px;" onclick="WRPAdminApp.pagescript.submitSimpleAdjust();">Submit</div>
	 			</div>
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="position:absolute;top:11px;right:0px;" onclick="$('#simple-adjust-adjust-qty-window').jqxWindow('close');">Cancel</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="simple-adjust-serialized-confirm-window">
		<div role="title">
	 		Confirm Serialized Inventory Adjustment
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="line" style="padding:7px; width:94%;margin: 7px 0px 7px 20px;">
				<div class="grid-2-5" style="font-size:12px;">Inventory Adjustment : </div>
				<div class="grid-3" style="font-size:12px;" id="serialized-adjust-confirm-store-id"></div>
				<div class="grid-1-5" style="font-size:12px;">Adjust By : </div>
				<div class="grid-5" style="font-size:12px;"><%= userId %></div>
			</div>
			<div style="padding:10px;border: 1px solid gray; width:94%;margin: 7px 0px 7px 20px;">
				<div class="line">
					<div class="grid-2-5" style="font-size:12px;">Item Code : </div>
					<div class="grid-3" style="font-size:12px;" id="serialized-adjust-confirm-item-code"></div>
					<div class="grid-1-5" style="font-size:12px;">SKU/UPC : </div>
					<div class="grid-5" style="font-size:12px;"><span id="serialized-adjust-confirm-item-sku"></span> / <span id="serialized-adjust-confirm-item-upc"></span></div>
				</div>
				<div class="line">
					<div class="grid-2-5" style="font-size:12px;">Description : </div>
					<div class="grid-5" style="font-size:12px;" id="serialized-adjust-confirm-item-description"></div>
				</div>
			</div>
			<div class="line" style="padding: 15px 10px 15px 10px; border: 1px solid gray; width:94%;margin: 7px 0px 7px 20px;">
				<div class="grid-2" style="font-size: 15px;">Adjust Qty : </div>
				<div class="grid-3" style="font-size: 15px;" id="serialized-adjust-confirm-adjust-qty"></div>
			</div>
	 		<div class="line" style="height: 250px;padding:5px 20px;">
	 			<div id="confirm-adjust-serial-no-list">
	 				
	 			</div>
	 		</div>
			<div style="margin: 15px 0px 15px 30px;">
			<div class="line">
				<div class="grid-1-5" style="font-size:15px;">Reason : </div>
				<div class="grid-5"><input type="text" id="serialized-adjust-confirm-reason" style="width:100%;font-size:13px" readonly/></div>
			</div>
			<div class="line" style="margin-top:10px;">Memo</div>
		 	<textarea rows="6" style="width:96%;font-size:13px;" id="serialized-new-simple-confirm-adjust-memo" readonly></textarea>
		 	</div>
	 		<div class="line" style="margin: 20px 26px 10px 0px;">
	 			<div class="grid-8">
	 				<div class="jqx-plain-button" style="float:right;width:200px;height:30px;line-height:30px;" onclick="WRPAdminApp.pagescript.confirmSerializedSimpleAdjust();">Confirm</div>
	 			</div>
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="position:absolute;top:11px;right:0px;" onclick="$('#simple-adjust-serialized-confirm-window').jqxWindow('close');">Close</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="simple-adjust-confirm-window">
		<div role="title">
	 		Confirm Inventory Adjustment
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="line" style="padding:7px; width:94%;margin: 7px 0px 7px 20px;"">
				<div class="grid-2-5" style="font-size:12px;">Inventory Adjustment : </div>
				<div class="grid-3" style="font-size:13px;" id="adjust-confirm-store-id"></div>
				<div class="grid-1-5" style="font-size:13px;">Adjust By : </div>
				<div class="grid-5" style="font-size:13px;"><%= userId %></div>
			</div>
			<div style="padding:10px;border: 1px solid gray; width:94%;margin: 12px 0px 7px 20px;"">
				<div class="line">
					<div class="grid-2-5" style="font-size:13px;">Item Code : </div>
					<div class="grid-3" style="font-size:13px;" id="adjust-confirm-item-code"></div>
					<div class="grid-1-5" style="font-size:13px;">SKU/UPC : </div>
					<div class="grid-5" style="font-size:13px;"><span id="adjust-confirm-item-sku"></span> / <span id="adjust-confirm-item-upc"></span></div>
				</div>
				<div class="line">
					<div class="grid-2-5" style="font-size:13px;">Description : </div>
					<div class="grid-5" style="font-size:13px;" id="adjust-confirm-item-description"></div>
				</div>
			</div>
			
			<div class="line" style="padding: 15px 10px 15px 10px; border: 1px solid gray; width:94%;margin: 10px 0px 7px 20px;"">
				<div class="grid-2" style="font-size: 15px;">Adjust Qty : </div>
				<div class="grid-3" style="font-size: 15px;" id="adjust-confirm-adjust-qty"></div>
				<div class="grid-2" style="font-size: 15px;">On-Hand Qty : </div>
				<div class="grid-3" style="font-size: 15px;" id="adjust-confirm-onhand-qty"></div>
			</div>
			<div class="line"></div>
			<div style="margin: 15px 0px 45px 30px;">
			<div class="line" style="margin-top:10px;">
				<div class="grid-1-5" style="font-size:15px;">Reason : </div>
				<div class="grid-5"><input type="text" id="new-simple-confirm-adjust-reason" style="width:100%;font-size:13px;" readonly/></div>
			</div>
			<div class="line" style="margin-top:35px;">Memo</div>
		 	<textarea rows="8" style="width:97%;font-size:13px;" id="new-simple-confirm-adjust-memo" readonly></textarea>
		 	</div>
	 		<div class="line" style="margin: 10px 25px 10px 0px;">
	 			<div class="grid-8">
	 				<div class="jqx-plain-button" style="float:right;width:200px;height:30px;line-height:30px;" onclick="WRPAdminApp.pagescript.confirmSimpleAdjust();">Confirm</div>
	 			</div>
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="position:absolute;top:11px;right:0px;" onclick="$('#simple-adjust-confirm-window').jqxWindow('close');">Close</div>
	 			</div>
	 		</div>
	 	</div>
	</div>

<%
	//if (user_sid.equals("8")) {
%>	           
	<div class="jqx-custom-window" id="blind-audit-print-detail-window">
		<div role="title">
			&nbsp;
		</div>
		<div role="content">
			<iframe id="blind-audit-print-detail-window-content" style="width: 100%; height: 100%; border: 0px solid;">
			</iframe>
		</div>
	</div>
	<div class="jqx-custom-window" id="blind-audit-detail-view-window">
		<div role="title">
			&nbsp;
		</div>
		<div role="content" id="blind-audit-detail-view-window-content"> 
			<div id="blind-audit-detail-view-audit-info-area">
				<div class="line">
       				<div class="grid-5">
       					INVENTORY BLIND AUDIT : <span id="blind-audit-detail-window-store-id"></span>
       				</div>
       				<div class="grid-6">
       					AUDIT BY : <span id="blind-audit-detail-window-audit-user-name"></span>
       				</div>
       			</div>
       			<div class="line">
       				<div class="grid-5">
       					AUDIT ID : <span id="blind-audit-detail-window-audit-id"></span>
       				</div>
       				<div class="grid-6">
       					START : <span id="blind-audit-detail-window-audit-start-date"></span> | END : <span id="blind-audit-detail-window-audit-end-date"></span>
       				</div>
       			</div>
			</div>
			
			<div id="blind-audit-detail-view-phone-type-info">				
       			<div class="line">
       				<div class="grid-6" style="font-size: 16px; font-weight: bold;">
       					PHONE
       				</div>
       			</div>
       			<div class="line">
       				<div class="grid-1">
       					&nbsp;
       				</div>
       				<div class="grid-2">
       					SYSTEM : <span id="blind-audit-detail-window-phone-system">0</span>
       				</div>
       				<div class="grid-2">
       					SCANNED : <span id="blind-audit-detail-window-phone-scanned">0</span>
       				</div>
       				<div class="grid-2">
       					MATCHED : <span id="blind-audit-detail-window-phone-matched">0</span>
       				</div>
       				<div class="grid-2">
       					ORPHAN : <span id="blind-audit-detail-window-phone-orphan">0</span>
       				</div>
       				<div class="grid-2">
       					MISSING : <span id="blind-audit-detail-window-phone-missing">0</span>
       				</div>
       			</div>
       			<div class="line">
       				<div class="grid-12">	
	       				<div class="blind-audit-info-items-list" id="blind-audit-detail-window-phone-items-list">
	       				</div>
       				</div>
       			</div>
       			<div class="line" style="font-size:14px;margin-bottom:0px;">
       				ORPHAN SERIAL NUMBERS
       			</div>
       			<div class="line">
       				<div class="grid-12">			       				
	       				<div class="blind-audit-info-orphan-items-list" id="blind-audit-detail-window-phone-orphan-items-list">
	       				</div>
       				</div>
       			</div>
       			<div class="line" style="font-size:14px;margin-bottom:0px;">
       				MISSING SERIAL NUMBERS
       			</div>
       			<div class="line">
       				<div class="grid-12">			       				
	       				<div class="blind-audit-info-missing-items-list" id="blind-audit-detail-window-phone-missing-items-list">
	       				</div>
       				</div>
       			</div>
			</div>
			<div class="blind-audit-detail-view-border" id="blind-audit-detail-view-border-after-phone">
			
			</div>	
			<div id="blind-audit-detail-view-sim-type-info">					
	   			<div class="line">
	   				<div class="grid-5" style="font-size: 16px; font-weight: bold;">
	   					SIM
	   				</div>
	   			</div>
	   			<div class="line">
	   				<div class="grid-1">
	   					&nbsp;
	   				</div>
	   				<div class="grid-2">
	   					SYSTEM : <span id="blind-audit-detail-window-sim-system">0</span>
	   				</div>
	   				<div class="grid-2">
	   					SCANNED : <span id="blind-audit-detail-window-sim-scanned">0</span>
	   				</div>
	   				<div class="grid-2">
	   					MATCHED : <span id="blind-audit-detail-window-sim-matched">0</span>
	   				</div>
	   				<div class="grid-2">
	   					ORPHAN : <span id="blind-audit-detail-window-sim-orphan">0</span>
	   				</div>
	   				<div class="grid-2">
	   					MISSING : <span id="blind-audit-detail-window-sim-missing">0</span>
	   				</div>
	   			</div>
	   			<div class="line">
	   				<div class="grid-12">
		   				<div class="blind-audit-info-items-list" id="blind-audit-detail-window-sim-items-list">
		   				</div>
	   				</div>
	   			</div>
	   			<div class="line" style="font-size:14px;margin-bottom:0px;">
	   				ORPHAN SERIAL NUMBERS
	   			</div>
	   			<div class="line">
	   				<div class="grid-12">			       				
	    				<div class="blind-audit-info-orphan-items-list" id="blind-audit-detail-window-sim-orphan-items-list">
	    				</div>
	   				</div>
	   			</div>
	   			<div class="line" style="font-size:14px;margin-bottom:0px;">
	   				MISSING SERIAL NUMBERS
	   			</div>
	   			<div class="line">
	   				<div class="grid-12">			       				
	    				<div class="blind-audit-info-missing-items-list" id="blind-audit-detail-window-sim-missing-items-list">
	    				</div>
	   				</div>
	   			</div>
			</div>		
			<div class="blind-audit-detail-view-border" id="blind-audit-detail-view-border-after-sim">
			
			</div>
			<div id="blind-audit-detail-view-serialized-acc-type-info">					
	   			<div class="line">
	   				<div class="grid-6" style="font-size: 16px; font-weight: bold;">
	   					SERIALIZED ACCESSORY
	   				</div>
	   			</div>		       			
	   			<div class="line">
	   				<div class="grid-1">
	   					&nbsp;
	   				</div>
	   				<div class="grid-2">
	   					SYSTEM : <span id="blind-audit-detail-window-serialized-acc-system">0</span>
	   				</div>
	   				<div class="grid-2">
	   					SCANNED : <span id="blind-audit-detail-window-serialized-acc-scanned">0</span>
	   				</div>
	   				<div class="grid-2">
	   					MATCHED : <span id="blind-audit-detail-window-serialized-acc-matched">0</span>
	   				</div>
	   				<div class="grid-2">
	   					ORPHAN : <span id="blind-audit-detail-window-serialized-acc-orphan">0</span>
	   				</div>
	   				<div class="grid-2">
	   					MISSING : <span id="blind-audit-detail-window-serialized-acc-missing">0</span>
	   				</div>
	   			</div>
	   			<div class="line">
	   				<div class="grid-12">
		   				<div class="blind-audit-info-items-list" id="blind-audit-detail-window-serialized-acc-items-list">
		   				</div>
		   			</div>
	   			</div>
	   			<div class="line" style="font-size:14px;margin-bottom:0px;">
	   				ORPHAN SERIAL NUMBERS
	   			</div>
	   			<div class="line">
	   				<div class="grid-12">			       				
	    				<div class="blind-audit-info-orphan-items-list" id="blind-audit-detail-window-serialized-acc-orphan-items-list">
	    				</div>
	   				</div>
	   			</div>
	   			<div class="line" style="font-size:14px;margin-bottom:0px;">
	   				MISSING SERIAL NUMBERS
	   			</div>
	   			<div class="line">
	   				<div class="grid-12">			       				
	    				<div class="blind-audit-info-missing-items-list" id="blind-audit-detail-window-serialized-acc-missing-items-list">
	    				</div>
	   				</div>
	   			</div>
			</div>		
			<div class="blind-audit-detail-view-border" id="blind-audit-detail-view-border-after-serialized-acc">
			
			</div>
			<div id="blind-audit-detail-view-nonserialized-acc-type-info">	
				<div class="line">
	  				<div class="grid-6" style="font-size: 16px; font-weight: bold;">
	  					NON-SERIALIZED ACCESSORY
	  				</div>
	  			</div>		       			
	  			<div class="line">
	  				<div class="grid-1">
	  					&nbsp;
	  				</div>
	  				<div class="grid-2">
	  					SYSTEM : <span id="blind-audit-detail-window-nonserialized-acc-system">0</span>
	  				</div>
	  				<div class="grid-2">
	  					SCANNED : <span id="blind-audit-detail-window-nonserialized-acc-scanned">0</span>
	  				</div>
	  				<div class="grid-2">
	  					MATCHED : <span id="blind-audit-detail-window-nonserialized-acc-matched">0</span>
	  				</div>
	  				<div class="grid-2">
	  					ORPHAN : <span id="blind-audit-detail-window-nonserialized-acc-orphan">0</span>
	  				</div>
	  				<div class="grid-2">
	  					MISSING : <span id="blind-audit-detail-window-nonserialized-acc-missing">0</span>
	  				</div>
	  			</div>
	  			<div class="line">
	  				<div class="grid-12">
		  				<div class="blind-audit-info-items-list" id="blind-audit-detail-window-nonserialized-acc-items-list">
		  				</div>
		  			</div>
	  			</div>
			</div>
			<div class="blind-audit-detail-view-border" id="blind-audit-detail-view-border-after-nonserialized-acc">
			
			</div>
			<div id="blind-audit-detail-window-audit-memo" style="height: 100px; border: 1px solid; padding: 10px 15px;">
			
			</div>
			
	 		<div class="line" style="text-align:center; margin-top: 15px;" id="blind-audit-detail-btn-area">
	 			<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.printBlindAuditDetailWindow();">Print</div>	 	
	 			<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#blind-audit-detail-view-window').jqxWindow('close');">Close</div>	 			
	 		</div>
	 		
		</div>		
	</div>
<%
	//}
%>	
	<div class="jqx-custom-window" id="missing-bin-detail-window">
		<div role="title">
	 		Detail
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div id="missing-bin-detail-list"></div>
	 		<div class="line" style="text-align:right;margin-top:10px;">
	 			<div class="jqx-plain-button" style="display: inline-block;" onclick="$('#missing-bin-detail-window').jqxWindow('close');">Close</div>	 			
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="run-blind-audit-window-1" step="1">
		<div role="title">
	 		BLIND AUDIT
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="line">&nbsp;</div>
			<div class="line audit-item-type-container orange">
				<div class="grid-1">&nbsp;</div>
				<div class="grid-9 audit-item-type-title">PHONE</div>
				<div class="grid-2">
					<div class="jqx-check-box" id="blind-audit-phone-check" style="margin-left: 10px;margin-top:25px;">
					</div>
				</div>
			</div>
			<div class="line audit-item-type-container yellow">
				<div class="grid-1">&nbsp;</div>
				<div class="grid-9 audit-item-type-title">SIM</div>
				<div class="grid-2">
					<div class="jqx-check-box" id="blind-audit-sim-check" style="margin-left: 10px;margin-top:25px;">
					</div>
				</div>
			</div>
			<div class="line audit-item-type-container blue">
				<div class="grid-1">&nbsp;</div>
				<div class="grid-9 audit-item-type-title">NON-SERIALIZED ACCESSORY</div>
				<div class="grid-2">
					<div class="jqx-check-box" id="blind-audit-accessory-check" style="margin-left: 10px;margin-top:25px;">
					</div>
				</div>
			</div>
			<div class="line audit-item-type-container green">
				<div class="grid-1">&nbsp;</div>
				<div class="grid-9 audit-item-type-title">SERIALIZED ACCESSORY</div>
				<div class="grid-2">
					<div class="jqx-check-box" id="blind-audit-serialized-accessory-check" style="margin-left: 10px;margin-top:25px;">
					</div>
				</div>
			</div>
	 		<div class="line" style="margin: 50px 25px 10px 0px;">
	 			<div class="grid-8">
	 				<div class="jqx-plain-button" style="float:right;width:300px;height:40px;line-height:40px;" onclick="WRPAdminApp.pagescript.setStepBySelectType();WRPAdminApp.pagescript.newAuditID();">Start Audit</div>
	 			</div>
	 			<div class="grid-4">
	 				<div class="jqx-plain-button" style="position:absolute;top:11px;right:16px;" onclick="$('#run-blind-audit-window-1').jqxWindow('close');">Close</div>
	 			</div>
	 		</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="run-blind-audit-phone-window">
		<div role="title">
	 		BLIND AUDIT
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			PHONE
			<div class="line" style="text-align: center;">
				<input type="text" id="enter-phone-serial-no" style="width: 300px;height:22px" placeholder="Enter IMEI" onkeydown="if(event.keyCode === 13){ WRPAdminApp.pagescript.AddPhoneSerialNo(); }"/>
				<div class="jqx-plain-button" style="display: inline-block;line-height:19px;" onclick="WRPAdminApp.pagescript.AddPhoneSerialNo();">ENTER</div>
			</div>	
			<div class="line" style="text-align: center;margin-right: 120px;">
				<span id="duplicate-check-phone" style="color:red;display:none;">(**Duplicated IMEI**)</span>
			</div>
			<div class="line" style="font-size:15px;">
				TOTAL : <span id="enter-phone-qty">0</span>
			</div>
			<div style="height:450px;">
				<div id="enter-phone-serial-no-list"></div>
			</div>
			<div class="line" style="position: absolute; left:10px;height:40px;">
				<div class="jqx-plain-button" style="height:27px;line-height:27px;display: inline-block;" onclick="WRPAdminApp.pagescript.resetAudit(0);">Reset</div>
			</div>
			<div class="line" style="position: absolute; right:10px;height:40px;">
				<div class="jqx-plain-button" id="phone-update-btn" style="height:25px;line-height:25px;display: none;" onclick="WRPAdminApp.pagescript.setPage(4);">Update</div>
				<div class="jqx-plain-button" id="phone-next-btn" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.nextStepActivate();">Next</div>
				<div class="jqx-plain-button" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.cancelAudit();">Cancel</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="run-blind-audit-sim-window">
		<div role="title">
	 		BLIND AUDIT
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			SIM
			<div class="line" style="text-align: center;">
				<input type="text" id="enter-sim-serial-no" style="width: 300px;height:22px" placeholder="Enter serial number" onkeydown="if(event.keyCode === 13){ WRPAdminApp.pagescript.AddSimSerialNo(); }"/>
				<div class="jqx-plain-button" style="display: inline-block;line-height:19px;" onclick="WRPAdminApp.pagescript.AddSimSerialNo();">ENTER</div>
			</div>
			<div class="line" style="text-align: center;margin-right: 120px;">
				<span id="duplicate-check-sim" style="color:red;display:none;">(**Duplicated IMEI**)</span>
			</div>
			<div class="line" style="font-size:15px;">
				TOTAL : <span id="enter-sim-qty">0</span>
			</div>
			<div style="height:450px;">
				<div id="enter-sim-serial-no-list"></div>
			</div>
			<div class="line" style="position: absolute; left:10px;height:40px;">
				<div class="jqx-plain-button" style="height:27px;line-height:27px;display: inline-block;" onclick="WRPAdminApp.pagescript.resetAudit(0);">Reset</div>
			</div>
			<div class="line" style="position: absolute; right:10px;height:40px;">
				<div class="jqx-plain-button" id="sim-update-btn" style="height:25px;line-height:25px;display: none;" onclick="WRPAdminApp.pagescript.setPage(4);">Update</div>
				<div class="jqx-plain-button" id="sim-next-btn" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.nextStepActivate();">Next</div>
				<div class="jqx-plain-button" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.cancelAudit();">Cancel</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="run-blind-audit-non-acc-window">
		<div role="title">
	 		BLIND AUDIT
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			NON-SERIALIZED ACCESSORY	
			<div class="line" style="text-align: center;">
				<input type="text" id="enter-accessory-keyword" style="width: 300px;height:22px" placeholder="Enter SKU or UPC" onkeydown="if(event.keyCode === 13){ WRPAdminApp.pagescript.enterNonSerialized(); }"/>
				<div class="jqx-plain-button" style="display: inline-block;line-height:19px;" onclick="WRPAdminApp.pagescript.enterNonSerialized();">ENTER</div>
			</div>
			<div class="line" style="text-align: center;margin-right: 120px;">
				&nbsp;
			</div>
			<div class="line" style="font-size:15px;">
				TOTAL : <span id="enter-acc-qty">0</span>
			</div>
			<div style="height:450px;">
				<div id="enter-accessory-item-list"></div>
			</div>
			<div class="line" style="position: absolute; left:10px;height:40px;">
				<div class="jqx-plain-button" style="height:27px;line-height:27px;display: inline-block;" onclick="WRPAdminApp.pagescript.resetAudit(0);">Reset</div>
			</div>
			<div class="line" style="position: absolute; right:10px;height:40px;">
				<div class="jqx-plain-button" id="acc-update-btn" style="height:25px;line-height:25px;display: none;" onclick="WRPAdminApp.pagescript.setPage(4);">Update</div>
				<div class="jqx-plain-button" id="acc-next-btn" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.nextStepActivate();">Next</div>
				<div class="jqx-plain-button" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.cancelAudit();">Cancel</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="run-blind-audit-ser-acc-window">
		<div role="title">
	 		BLIND AUDIT
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			SERIALIZED ACCESSORY
			<div class="line" style="text-align: center;">
				<input type="text" id="enter-accessory-serial-no" style="width: 300px;height:22px" placeholder="Enter serial number" onkeydown="if(event.keyCode === 13){ WRPAdminApp.pagescript.AddAccSerialNo(); }" />
				<div class="jqx-plain-button" style="display: inline-block;line-height:19px;" onclick="WRPAdminApp.pagescript.AddAccSerialNo();">ENTER</div>
			</div>
			<div class="line" style="text-align: center;margin-right: 120px;">
				<span id="duplicate-check-acc" style="color:red;display:none;">(**Duplicated Serial Number**)</span>
			</div>
			<div class="line" style="font-size:15px;">
				TOTAL : <span id="enter-serialized-acc-qty">0</span>
			</div>
			<div style="height:450px;">
				<div id="enter-accessory-serial-no-list"></div>
			</div>
			<div class="line" style="position: absolute; left:10px;height:40px;">
				<div class="jqx-plain-button" style="height:27px;line-height:27px;display: inline-block;" onclick="WRPAdminApp.pagescript.resetAudit(0);">Reset</div>
			</div>
			<div class="line" style="position: absolute; right:10px;height:40px;">
				<div class="jqx-plain-button" id="serialized-acc-update-btn" style="height:25px;line-height:25px;display: none;" onclick="WRPAdminApp.pagescript.setPage(4);">Update</div>
				<div class="jqx-plain-button" id="serialized-acc-next-btn" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.nextStepActivate();">Next</div>
				<div class="jqx-plain-button" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.cancelAudit();">Cancel</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="run-blind-audit-total-window">
		<div role="title">
	 		BLIND AUDIT
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="line" style="margin-left: 28px;margin-top: 10px;">TOTAL</div>
			<div class="line">&nbsp;</div>
			<div class="line" style="margin-left:85px;">
				Audit ID : <input type="text" id="blind-audit-id" style="width:300px;"/>
			</div>
			<div class="line" style="width:80%; margin:50px auto;height:60px;line-height:60px;">
				<div class="grid-4 audit-total-item orange" onclick="WRPAdminApp.pagescript.setPage(0);">
					PHONE
				</div>
				<div class="grid-1-5 audit-total-qty" id="audit-total-phone-qty">
					0
				</div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-4 audit-total-item yellow" onclick="WRPAdminApp.pagescript.setPage(1);">
					SIM
				</div>
				<div class="grid-1-5 audit-total-qty" id="audit-total-sim-qty">
					0
				</div>
			</div>
			<div class="line" style="width:80%; margin:30px auto;height:60px;line-height:60px;">
				<div class="grid-4 audit-total-item blue" onclick="WRPAdminApp.pagescript.setPage(2);">
					NON-SERIALIZED ACCESSORY
				</div>
				<div class="grid-1-5 audit-total-qty" id="audit-total-non-acc-qty">
					0
				</div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-4 audit-total-item green" onclick="WRPAdminApp.pagescript.setPage(3);">
					SERIALIZED ACCESSORY
				</div>
				<div class="grid-1-5 audit-total-qty" id="audit-total-acc-qty">
					0
				</div>
			</div>
			<div class="line" style="margin: 85px 0px 0px 80px;">
				Memo <br/>
				<textarea rows="8" style="width:85%" id="blind-audit-memo"></textarea>
			</div>
			<div class="line">&nbsp;</div>
			<div class="line" style="height:40px;text-align:center;">
				<div class="jqx-plain-button" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.getConfirmAudit();">Submit</div>
				<div class="jqx-plain-button" style="height:25px;line-height:25px;display: inline-block;" onclick="WRPAdminApp.pagescript.cancelAudit();">Cancel</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="run-blind-audit-confirm-window">
		<div role="title">
	 		Confirm Audit
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="line" style="padding:15px;margin-left:60px;">
				INVENTORY AUDIT : <span id="blind-audit-confirm-store-id"></span>
			</div>
			<div class="line" style="margin-left:75px;">
				AUDIT ID : <span id="blind-audit-confirm-id"></span>
			</div>
			<div class="line" style="margin-left:75px;">
				<div class="grid-6">
					AUDIT BY : 	<span id="blind-audit-confirm-user"><%= userId %></span>
				</div>
				<div class="grid-6">
					STORE : <span id="blind-audit-confirm-store"><%= storeId %></span>
				</div>
			</div>
			<div class="line" style="margin-left:75px;">
				<div class="grid-6">
					START TIME : <span id="blind-audit-confirm-start-time"></span>
				</div>
				<div class="grid-6">
					END TIME : <span id="blind-audit-confirm-end-time"></span>
				</div>
			</div>
			<div class="blind-audit-confirm-item-box" style="margin-left:70px;margin-top:20px;border-right:0px;border-bottom:0px;">
				PHONE<br>
				<span id="blind-audit-confirm-phone-qty">0</span>
			</div>
			<div class="blind-audit-confirm-item-box" style="margin-top:20px;border-bottom:0px;">
				SIM<br>
				<span id="blind-audit-confirm-sim-qty">0</span>
			</div>
			<div class="blind-audit-confirm-item-box" style="margin-left:70px;border-right:0px;">
				NON-SERAILIZED ACCESSORY<br>
				<span id="blind-audit-confirm-acc-qty">0</span>
			</div>
			<div class="blind-audit-confirm-item-box" style="">
				SERAILIZED ACCESSORY<br>
				<span id="blind-audit-confirm-ser-acc-qty">0</span>
			</div>
			<div class="line">&nbsp;</div>
			<div class="line" style="margin: 10px 0px 0px 70px;">
				Memo <br/>
				<textarea rows="8" style="width:84.5%" id="blind-audit-confirm-memo" readonly></textarea>
			</div>
			<div class="line">&nbsp;</div>
			<div class="line" style="height:40px;text-align:center;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="WRPAdminApp.pagescript.confirmMessage();">Confirm</div>
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#run-blind-audit-confirm-window').jqxWindow('close');">Close</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="popup-blind-audit-non-accessory-select">
		<div role="title">
	 		SELECT ITEM
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div id="non-serialized-acc-select-list"></div>
			<div class="line" style="margin-top:10px;text-align: center;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="WRPAdminApp.pagescript.nextSelectNonAcc();">Next</div>
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#popup-blind-audit-non-accessory-select').jqxWindow('close');">Close</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="popup-blind-audit-enter-accessory">
		<div role="title">
	 		MESSAGE
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div style="padding:15px;border:1px solid;">
				<div class="line">
					<input type="text" id="audit-acc-itemsid" style="display:none;"/>
					<div class="grid-2-5">Item Code : </div>
					<div class="grid-3-5"><span id="audit-acc-itemCode"></span></div>
					<div class="grid-2">SKU : </div>
					<div class="grid-4"><span id="audit-acc-sku"></span></div>
				</div>
				<div class="line">
					<div class="grid-2-5">Description : </div>
					<div class="grid-9"><span id="audit-acc-description"></span></div>
				</div>
			</div>
			<div class="line">&nbsp;</div>
			<div class="line" style="text-align:center; margin-left:15px;">
				<div class="grid-4">Enter Qty :</div>
				<div class="grid-8"><input type="text" id="blind-audit-acc-qty" style="width:150px; height:23px;" onkeydown="if(event.keyCode === 13){ WRPAdminApp.pagescript.addNonSerializedItems(); }"/></div>
			</div>
			<div class="line">&nbsp;</div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="WRPAdminApp.pagescript.addNonSerializedItems();">Submit</div>
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#popup-blind-audit-enter-accessory').jqxWindow('close');">Close</div>
			</div>
	 	</div>
	</div>
	<div class="jqx-custom-window" id="popup-blind-audit-duplicate-accessory">
		<div role="title">
	 		MESSAGE
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div class="line" style="font-size:16px;padding:5px;">There is a duplicated item in the request list.<br>Would you like to update the Qty?</div>
			<div style="padding:6px;">
				<div class="line">
					<div class="grid-2-5">Item Code : </div>
					<div class="grid-3-5"><span id="message-itemCode"></span></div>
					<div class="grid-2">SKU : </div>
					<div class="grid-4"><span id="message-sku"></span></div>
				</div>
				<div class="line">
					<div class="grid-2-5">Description : </div>
					<div class="grid-9"><span id="message-description"></span></div>
				</div>
				<div class="line">
					<div class="grid-5">Current Qty on the list : </div>
					<div class="grid-3"><span id="message-qty"></span></div>
				</div>
			</div>
			<div class="line">&nbsp;</div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="WRPAdminApp.pagescript.updateNonSerializedItem();">Yes</div>
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#popup-blind-audit-duplicate-accessory').jqxWindow('close');">No</div>
			</div>
	 	</div>
	</div>
</div>