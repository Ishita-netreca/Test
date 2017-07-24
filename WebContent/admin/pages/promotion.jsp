<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
	session.setAttribute("wrp_admin_last_loaded_page", "promotion");
	String storeId = MyRequestUtil.getString(request, "storeId", null);
	String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
	if (storeId == null) {
    	storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
	}
	String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
	boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
	JSONObject permissionData = null;


	JSONObject obj = null;
%>
<div pagename="promotion" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="promotion"
			onclick="WRP.UI.changePanelBySubmenu('promotion');">Promotion</div>
		<div class="border"></div>
		<div class="submenu" panelname="rate_plan"
			onclick="WRP.UI.changePanelBySubmenu('rate_plan');">Promotion Item Line [v]</div>
		<div class="border"></div>
		<div class="submenu" panelname="coupon"
			onclick="WRP.UI.changePanelBySubmenu('coupon');">Distribute Promotion</div>
	</div>
	<div class="panels">
		<div class="jqx-horizontal-split-panel" panelname="promotion">
			<div class="plain-01-panel" style="width: 100%; height: 100%;">
				<div class="title-wrapper">
					<div class="title">Promotion</div>
					<div class="sub-title">Promotion management</div>
					<div class="left-input-area">
							<div class="jqx-plain-button" id="promotion-new" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.createNewPromotion);" style="width:120px; display:inline-block;">New Promotion</div>
							<!-- <div class="jqx-plain-button" id="promotion-synk" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.syncPromotion);" style="width:80px; display:inline-block;">Sync</div> -->
							<div class="jqx-plain-button" id="promotion-synk" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.syncPromotion);" style="width:80px; display:none;">Sync</div>
					</div>
					
					<div class="right-input-area" style="margin-left: 20px;">
						<div>
							<input type="text" id="rate-plan-search-keyword"
								placeholder="Search" style="margin-top: 3px;"
								onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getRateplanList(); }" />
						</div>
					</div>
				</div>
					
						
					
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="promotion-jqx-promotion-list"></div>
				</div>
			</div>
			<div>
				<div class="jqx-tab-panel">
					<ul>
						<li>Detail</li>
						<li>Source Data</li>
						<li>Rules</li>
						<li>Price Table</li>
						<li>BOGO List</li>
						<li>Reimbursement</li>
					</ul>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Detail</div>
						</div>
						<div class="content-wrapper">
							<div class="line" id="cash-out-profile-container"
								style="margin: 5px 15px 5px 15px; width: 500px;">
								<div class="line">
									<div class="grid-2 info">Description</div>
									<div class="grid-4" id="promotion-profile-description">
										&nbsp;</div>
								</div>
								<div class="line">
									<div class="grid-2 info">Start Date</div>
									<div class="grid-4" id="promotion-profile-start-date">
										&nbsp;</div>
									<div class="grid-2 info">End Date</div>
									<div class="grid-4" id="promotion-profile-end-date">
										&nbsp;</div>
								</div>
							</div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Source Data</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 60px);">
							<div id="promotion-jqx-grid-items-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Rules</div>
							<div class="right-input-area">
								<input type="button" class="jqx-plain-button"
									value="Save" style="width: 70px; height: 26px"
									onclick="WRPAdminApp.pagescript.setPromotionRebateData();" />
							</div>
						</div>

						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 60px);">
							<div id="promotion-jqx-grid-rebates-list"></div>
						</div>
					</div>
						
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Price Table</div>
							<div class="right-input-area">
								<input type="button" class="jqx-plain-button"
									value="Save" style="width: 70px; height: 26px"
									onclick="WRPAdminApp.pagescript.setPromotionRebateData();" />
							</div>
						</div>

						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 60px);">
							<div id="promotion-jqx-grid-rebates-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">BOGO List</div>
							<div class="right-input-area">
								<input type="button" class="jqx-plain-button"
									value="Save" style="width: 70px; height: 26px"
									onclick="WRPAdminApp.pagescript.setPromotionRebateData();" />
							</div>
						</div>

						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 60px);">
							<div id="promotion-jqx-grid-rebates-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Reimbursement</div>
							<div class="right-input-area">
								<input type="button" class="jqx-plain-button"
									value="Save" style="width: 70px; height: 26px"
									onclick="WRPAdminApp.pagescript.setPromotionRebateData();" />
							</div>
						</div>

						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 60px);">
							<div id="promotion-jqx-grid-rebates-list"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="jqx-horizontal-split-panel" panelname="rate_plan" style="display:none;">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Promotion Item Line [v]</div>
					
					<div class="left-input-area">
						<div class="grid-6">
							<div class="jqx-plain-button" id="new-item-line-info" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.newItemLineInfo);">
							New Item Line</div>
						</div>
						
					</div>
					
	
					
					<div class="right-input-area" style="margin-left: 5px;">
						<div>
							<input type="text" id="rate-plan-search-keyword"
								placeholder="Search" style="margin-top: 3px;"
								onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getRateplanList(); }" />
						</div>
					</div>
					</div>
					
					<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-promotion-item-line"></div>
				</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 60px);">
					<div id="jqx-sales-rateplan-list"></div>
				</div>
			
			</div>
			
				
		<div class="jqx-horizontal-split-panel" panelname="coupon" style="display:none;">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Distribute Promotion</div>
					<div class="sub-title"></div>

			
					
					<div class="right-input-area" style="margin-left: 5px;">
						<div>
							<input type="text" id="coupon-search-keyword"
								placeholder="Description" style="margin-top: 3px;"
								onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getCouponList(); }" />
						</div>
					</div>
					<!--  -->
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-coupon-coupon-list"></div>
				</div>
			</div>
			
		</div>
	</div>
	
	<div class="jqx-custom-window" id="promotion-new-window">
		<div role="title">Create New Promotion</div>
		<div role="content" class="jqx-full-sized-dock-panel">
			<div dock="top" style="height: 244px;" class="profile-container">
				<div class="line" style="text-align: right;">
					<input type="button" class="jqx-plain-button" value="Save"
						style="width: 50px; height: 24px" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.savePromotionData);"/>
				</div>
				<div class="line">
					<div class="grid-2 info">Description</div>
					<div class="grid-8">
						<input type="text" class="jqx-text-input"
							style="width: 98.5%; height: 24px;" placeholder="Description"
							id="new-promotion-description" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2 info">Start Date</div>
					<div class="grid-3">
						<input type="text" class="jqx-datetime-input" style="width: 100%;"
							id="new-promotion-start-date" />
					</div>
					<div class="grid-2 info">End Date</div>
					<div class="grid-3">
						<input type="text" class="jqx-datetime-input" style="width: 100%;"
							id="new-promotion-end-date" />
					</div>
				</div>
				<div class="line">
					<input type="button" class="jqx-plain-button" value="Next"
						style="width: 120px; height: 24px"
						onclick="WRPAdminApp.pagescript.initRateplanEditContainer();" /> 
						<input type="button" class="jqx-plain-button" value="Cancel"
						style="width: 120px; height: 24px"
						onclick="$('#promotion-new-window').jqxWindow('close');" />
				</div>
			</div>
			<!-- style="height: 99%; height: calc(100% - 160px);" -->
				<div id="promotion-jqx-grid-new-promotion-items-list"></div>
			 
		</div>
	</div>
	
	
	
	
	<div class="jqx-custom-window" id="promotion-select-item">
		<div role="title">SELECT ITEM</div>
		<div role="content" class="jqx-full-sized-dock-panel">
			

			<div dock="bottom" style="height: 99%; height: calc(100% - 30px);">
				<div id="promotion-jqx-grid-select-items-list"></div>
			</div>
		</div>
	</div>


		<div class="jqx-custom-window" id="sales-rateplan-new-window">
		<div role="title">Items</div>
		<div role="content" style="margin-top: 30px;">
			
			<div class="line" style="text-align: center;">
				
				<div class="line gray">
				<div class="grid-2" style="margin-left: 80px"> Created by:</div>
					<div class="grid-4">
						<input type="text" id="store-add-store-owner" style="width: 100%;"
						value=<%=((session.getAttribute("wrp_admin_login_owner_id") != null)? session.getAttribute("wrp_admin_login_owner_id").toString() : "")%>
						readonly />
					</div>
				</div>
				
				<div style="float: left; margin-left:15px; height: 30px;" textposition="center">
					<div class="jqx-plain-button" id="promotion-copy" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.newPromoNext);">Copy(Override)</div>
				</div>
				
				<div style="float: left">
					<div class="jqx-plain-button" id="rate-plan-save" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setRateplanData);">Delete All</div>
				</div>
			</div>
			
				<div class="line user-input-area">
	 			<div class="grid-1" style="text-align: left;">
	 				Promo Item Line
	 			</div>
	 			<div class="grid-3">
	 			<select id="" onchange="" style="width: 100%;"></select>
	 			</div>
	 			<div class="grid-2" style="text-align: left; width: 3%;">
	 				 	SOR		
<!-- 	 				<div class="jqx-plain-button" style="display: inline-block; width: 90%;'" onclick="WRPAdminApp.pagescript.getItemDictListNotInStore();">SEARCH</div>
 -->	 			</div>
 				<div class="grid-2-1">	 				
 				<input type="text" style="width: 100%;height: 27px;" id="item-management-add-item-search-keyword" onkeydown="<!-- if (event.keyCode === 13) { WRPAdminApp.pagescript.getItemDictListNotInStore(); } -->"/>
 				</div>
 				
 				<div class="grid-3" style="text-align: left; width: 3%;;">
	 				 	IR		
<!-- 	 				<div class="jqx-plain-button" style="display: inline-block; width: 90%;'" onclick="WRPAdminApp.pagescript.getItemDictListNotInStore();">SEARCH</div>
 -->	 			</div>
 				<div class="grid-3-1">	 				
 				<input type="text" style="width: 100%;height: 27px;" id="item-management-add-item-search-keyword" onkeydown="<!-- if (event.keyCode === 13) { WRPAdminApp.pagescript.getItemDictListNotInStore(); } -->"/>
 				</div>
 				<div class="grid-3-2" style="text-align: center; height: 19px;">
				<div class="btn sky" onclick="" >Add</div>
				</div>
	 		</div>
			
			
	 		<div class="line" style="height: 340px;">
	 			<div id="add-item-items-in-wrp-db-list">
	 			</div>
	 		</div>
			
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:75px;display:inline-block;" onclick="WRPAdminApp.pagescript.newPromoNext();">Next</div> 
			
				<div class="jqx-plain-button" style="width:75px;display:inline-block;" onclick="$('#sales-rateplan-new-window').jqxWindow('close');">Cancel</div>
			</div>
		</div>
	</div> 
		
	
		
		


<div class="jqx-custom-window" id="promotion-copy-window">
		<div role="title">Copy Previous Promotions </div>
		<div role="content" style="margin-top: 30px;">
			
			
				<div class="line user-input-area">
	 			<div class="grid-1-5">Date</div>
				<div class="grid-2" style="width:100px; height:20px">
					<div class="jqx-datetime-input" id="store-add-store-open-date"></div>
				</div>
				<div class="grid-1" style="width:10px;line-height:25px;">
					~
				</div>
				<div class="grid-2" style="width:100px;">
					<div class="jqx-datetime-input" id="store-add-store-open-date"></div>
				</div>
				<div class="grid-3-2" style="text-align: center; height: 19px;">
				<div class="btn sky" onclick="" >Search</div>
				</div>
	 		</div>
			
			
	 		<div class="line" style="height: 300px;">
	 			<div id="promotions-copy-table">
	 			</div>
	 		</div>
			
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:75px;display:inline-block;" onclick="">Proceed</div> 
			
				<div class="jqx-plain-button" style="width:75px;display:inline-block;" onclick="$('#promotion-copy-window').jqxWindow('close');">Cancel</div>
			</div>
		</div>
	</div> 
		
		
		<div class="jqx-custom-window" id="new-item-line-info-window">
		<div role="title">New Promotion Item Line Information</div>
		<div role="content" class="jqx-full-sized-dock-panel">
			<div dock="top" style="height: 244px;" class="profile-container">
				<div class="line">
					<div class="grid-2 info">Item Line Name</div>
					<div class="grid-8">
						<input type="text" class="jqx-text-input"
							style="width: 98.5%; height: 24px;" placeholder="Item Line"
							id="new-item line-name" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2">Description</div>
					<div class="grid-4">
						<input type="text" id="new-item-line-description" 
						style="width: 420px; height: 100px;" />
					</div>
				</div>
			</div>
			
				<div class="line" style="text-align: center;">
					<div class="jqx-plain-button" style="width:75px;display:inline-block;" 
					onclick="WRPAdminApp.pagescript.addintoPromoItem();">Next</div> 
					<div class="jqx-plain-button" style="width:75px;display:inline-block;" 
					onclick="$('#new-item-line-info-window').jqxWindow('close');">Cancel</div> 
					 
				</div>
			 
		</div>
	</div>
		
	
	<div class="jqx-custom-window" id="add-item-toline-info-window">
		<div role="title">Add Item to Promo Item Line</div>
		<div role="content" class="jqx-full-sized-dock-panel">
			
				<div class="line">
					<div class="grid-2 info">Item Line Name</div>
					<div class="grid-8">
						<input type="text" class="jqx-text-input"
							style="width: 98.5%; height: 24px;" placeholder="Item Line"
							id="new-item line-name" />
					</div>
				</div>
				<div class="line">
					<div class="grid-2 info">Description</div>
					<div class="grid-8">
						<input type="text" class="jqx-text-input"
							style="width: 98.5%; height: 24px;" placeholder="Description"
							id="new-item-line-description" />
					</div>
				</div>
				<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;">Select Items</div>
				<div class="line" style="height: 250px; width: 98%;">
	 			<div id="select-items-to-add">
	 			</div>
	 		</div>
	 		<div class="line" style="font-weight: bold;border-bottom: 1px gray solid;">Added Items</div>
				 <div class="line" style="height: 250px;">
					<div id="added-items"></div>
				</div>
			
			
			
			
				<div class="line" style="text-align: center;">
					<input type="button" class="jqx-plain-button" value="Save"
						style="width: 120px; height: 24px"
						onclick="WRPAdminApp.pagescript.AddintoPromoItem();" /> 
						<input type="button" class="jqx-plain-button" value="Cancel"
						style="width: 120px; height: 24px"
						onclick="$('#add-item-toline-info-window').jqxWindow('close');" />
				</div>
			 
		</div>
	</div>
	

</div>
	
	
	
	
	
	
	
