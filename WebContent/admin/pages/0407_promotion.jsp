<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	session.setAttribute("wrp_last_loaded_page", "promotion");
%>
<div pagename="promotion" class="theme-02">
	<div class="page-submenu-container">
		<div class="submenu" panelname="promotion"
			onclick="WRP.UI.changePanelBySubmenu('promotion');">Promotion</div>
		<div class="border"></div>
		<div class="submenu" panelname="rate_plan"
			onclick="WRP.UI.changePanelBySubmenu('rate_plan');">Rate Plan</div>
		<div class="border"></div>
		<div class="submenu" panelname="coupon"
			onclick="WRP.UI.changePanelBySubmenu('coupon');">Coupon</div>
	</div>
	<div class="panels">
		<div class="jqx-horizontal-split-panel" panelname="promotion">
			<div class="plain-01-panel" style="width: 100%; height: 100%;">
				<div class="title-wrapper">
					<div class="title">Promotion</div>
					<div class="sub-title">Promotion management</div>
					<div class="left-input-area">
							<div class="jqx-plain-button" id="promotion-new" style="width:120px; display:inline-block;">New Promotion</div>
							<div class="jqx-plain-button"id="promotion-synk" style="width:80px; display:inline-block;">Sync</div>
					</div>

					<div class="right-input-area" style="float: right; margin-left: 5px; width:720px;">
						<div class="grid-1_5" style="width: 70px;">
						<div class="jqx-radio-button" style="width: 60px;"
								id="promotion-radio-1">Today</div>
						</div>
						<div class="grid-1_5" style="width: 70px;margin-left:0px;">
							<div class="jqx-radio-button" style="width: 80px;"
								id="promotion-radio-2">1 Week</div>
						</div>
						<div class="grid-1_5" style="width: 70px;margin-left:0px;">
							<div class="jqx-radio-button" style="width: 80px;"
								id="promotion-radio-3">1 Month</div>
						</div>
						<div class="grid-1_5" style="width:100px;">
							<div class="jqx-datetime-input" id="promotion-start-date"></div>
						</div>
						<div class="grid-1_5" style="width:100px;">
							<div class="jqx-datetime-input" id="promotion-end-date"></div>
						</div>
						<div class="grid-1_5" style="width:110px;">
							<input type="text" id="promotion-search-keyword"
								style="margin-top: 3px;width:100px;"
								onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getPromotionList(); }" />
						</div>
						<div class="grid-1_5" style="margin-left:0px;width:70px;">
							<div class="jqx-plain-button"
								id="promotion-apply" style="width:60px;">Apply</div>
								</div>
						<div class="grid-1" style="margin-left:2px;width:60px;">
							<div class="jqx-plain-button"
								id="promotion-excel" style="width:60px;">Excel</div>
						</div>
					</div>
					<!-- <div class="right-input-area" style="margin-left: 5px;">
						
					</div> -->
					<!-- <div class="right-input-area" style="margin-left: 5px;">
					
					</div> -->
					<!-- <div class="right-input-area"
						style="width: 43%; padding-left: 15%;">
						<div style="float: left;">
							<div class="jqx-radio-button" style="width: 80px;"
								id="promotion-radio-1">Today</div>
						</div>
						<div style="float: left">
							<div class="jqx-radio-button" style="width: 80px;"
								id="promotion-radio-2">1 Week</div>
						</div>
						<div style="float: left">
							<div class="jqx-radio-button" style="width: 80px;"
								id="promotion-radio-3">1 Month</div>
						</div>
						<div style="float: left; width: 100px; margin-left: 1%;">
							<div class="jqx-datetime-input" id="promotion-start-date"></div>
						</div>
						<div style="float: left; width: 100px; margin-left: 1%;">
							<div class="jqx-datetime-input" id="promotion-end-date"></div>
						</div>
					</div> -->
				</div>

				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="promotion-jqx-promotion-list"></div>
				</div>
			</div>
			<div>
				<div class="jqx-tab-panel">
					<ul>
						<li>Profile</li>
						<li>Items</li>
						<li>Rebates</li>
					</ul>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Profile</div>
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
							<div class="title">Items</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 60px);">
							<div id="promotion-jqx-grid-items-list"></div>
						</div>
					</div>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Rebates</div>
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

					<!--     <div tabname="items" class="jqx-full-sized-dock-panel">     
       					<div dock="top" style="height: 50px;">
       					</div>
       					<div dock="bottom" style="height: 99%; height: calc(99% - 50px);">
       						<div id="promotion-jqx-grid-items-list">
       						</div>
       					</div>
        			</div> -->

				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel" panelname="rate_plan">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Rate Plan</div>
					<div class="sub-title">Rate Plan Management</div>
					<div class="left-input-area">
						<div class="grid-6">
							<div class="jqx-plain-button" id="new-rate-plan">New
								Rate Plan</div>
						</div>
						<div class="grid-6">
							<div class="jqx-plain-button"
								id="rate-plan-synk">Sync</div>
						</div>
					</div>
					<div class="left-input-area" style="margin-left: 5px;">
						<div class="grid-6">
							<div class="jqx-plain-button"
								id="rate-plan-show-all">Show All</div>
						</div>
					</div>

					<div class="right-input-area"
						style="float: right; margin-left: 5px;">
						<div class="grid-1">
							<div class="jqx-plain-button"
								id="rate-plan-excel">Excel</div>
						</div>
					</div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								id="rate-plan-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div>
							<input type="text" id="rate-plan-search-keyword"
								placeholder="Description" style="margin-top: 3px;"
								onkeydown="if (event.keyCode === 13) { WRPAdminApp.pagescript.getRateplanList(); }" />
						</div>
					</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqx-sales-rateplan-list"></div>
				</div>
			</div>
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Rate Plan</div>
					<div class="right-input-area"></div>
				</div>
				<div class="content-wrapper">
					<div class="content" style="margin-top: 10px;">
						<div class="line">
							<div class="grid-2">Rateplan Code</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-rateplan-code" readonly/>
							</div>
							<div class="grid-2">Description</div>
							<div class="grid-6">
								<input type="text" id="rateplan-edit-description"  readonly/>
							</div>
						</div>
						<div class="line">
							<div class="grid-2">Carrier</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-carrier"  readonly/>
							</div>
							<div class="grid-2">Plan Type</div>
							<div class="grid-2">
								<select id="rateplan-edit-plan-type">
									<option value="0">Voice</option>
									<option value="1">Feature</option>
								</select>
							</div>
							<div class="grid-2">Group Type</div>
							<div class="grid-2">
								<select id="rateplan-edit-group-type">
									<option value="0">Individual</option>
									<option value="1">Family</option>
								</select>
							</div>
						</div>
						<div class="line">
							<div class="grid-2">MRC</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-mrc"  readonly/>
							</div>
							<div class="grid-2">Reactivation Plan</div>
							<div class="grid-2">
								<input type="checkbox" id="rateplan-edit-react-plan-flag" />
							</div>
							<div class="grid-2">Upgrade Plan</div>
							<div class="grid-2">
								<input type="checkbox" id="rateplan-edit-upgrade-plan-flag" />
							</div>
						</div>
						<div class="line">
							<div class="grid-2">Start Date</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-start-date"
									class="jquery-datepicker"  readonly/>
							</div>
							<div class="grid-2">End Date</div>
							<div class="grid-2">
								<input type="text" id="rateplan-edit-end-date"
									class="jquery-datepicker"  readonly/>
							</div>
							<div class="grid-2">Disable</div>
							<div class="grid-2">
								<input type="checkbox" id="rateplan-edit-disable" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel" panelname="coupon">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Coupon</div>
					<div class="sub-title">information Management</div>

					<div class="left-input-area">
						<div class="grid-6">
							<div class="jqx-plain-button" id="new-coupon">New
								Coupon</div>
						</div>
					</div>
					<div class="left-input-area" style="margin-left: 5px;">
						<div class="grid-6">
							<div class="jqx-plain-button"
								id="coupon-show-all">Show All</div>
						</div>
					</div>

					<div class="right-input-area"
						style="float: right; margin-left: 5px;">
						<div class="grid-1">
							<div class="jqx-plain-button" id="coupon-excel">Excel</div>
						</div>
					</div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button" id="coupon-apply">Apply</div>
						</div>
					</div>
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
			<div>
				<div class="jqx-tab-panel" id="jqx-coupon-bottom-panel">
					<ul>
						<li>Profile</li>
					</ul>
					<div class="plain-01-panel">
						<div class="title-wrapper">
							<div class="title">Profile</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div class="line" style="height: 100%;">
								<div class="grid-9">
									<div class="line">
										<div class="grid-3">Name</div>
										<div class="grid-2-5" id="info-coupon-name">&nbsp;</div>
										<div class="grid-3">Coupon Code</div>
										<div class="grid-2-5" id="info-coupon-code">&nbsp;</div>
									</div>
									<div class="line">
										<div class="grid-3">Description</div>
										<div class="grid-8" id="info-coupon-description">&nbsp;
										</div>
									</div>
									<div class="line">
										<div class="grid-3">Start Date</div>
										<div class="grid-2-5" id="info-coupon-start-date">
											&nbsp;</div>
										<div class="grid-3">End Date</div>
										<div class="grid-2-5" id="info-coupon-end-date">&nbsp;</div>
									</div>
									<div class="line">
										<div class="grid-3">Discount Type</div>
										<div class="grid-2-5" id="info-coupon-discount-type">
											&nbsp;</div>
										<div class="grid-3">Max Discount Price</div>
										<div class="grid-2-5" id="info-coupon-max-discount-price">
											&nbsp;</div>
									</div>
									<div class="line">
										<div class="grid-3">Apply Count</div>
										<div class="grid-2-5" id="info-coupon-apply-count">
											&nbsp;</div>
										<div class="grid-3">
											Multiple Apply Count <br />per Transaction
										</div>
										<div class="grid-2-5" id="info-coupon-multiple-apply-count">
											&nbsp;</div>
									</div>
									<div class="line">
										<div class="grid-3">All coupons have each ID</div>
										<div class="grid-2-5" id="info-coupon-has-each-id">
											&nbsp;</div>
									</div>
									<div class="line">
										<div class="grid-3">Transaction</div>
										<div class="grid-2-5" id="info-coupon-transaction-type">
											&nbsp;</div>
									</div>
									<div class="line">
										<div class="grid-3">Printable</div>
										<div class="grid-2-5" id="info-coupon-printable">&nbsp;
										</div>
										<div class="grid-3">Visible</div>
										<div class="grid-2-5" id="info-coupon-visible">&nbsp;</div>
									</div>
								</div>
								<div class="grid-3"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="promotion-new-window">
		<div role="title">Create New Promotion</div>
		<div role="content" class="jqx-full-sized-dock-panel">
			<div dock="top" style="height: 160px;" class="profile-container">
				<div class="line" style="text-align: right;">
					<input type="button" class="jqx-plain-button" value="Save"
						style="width: 50px; height: 24px"
						onclick="WRPAdminApp.pagescript.savePromotionData();" />
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
					<input type="button" class="jqx-plain-button" value="Add Item"
						style="width: 120px; height: 24px"
						onclick="WRPAdminApp.pagescript.openSelectItemWindow();" /> <input
						type="button" class="jqx-plain-button" value="Remove Item"
						style="width: 120px; height: 24px"
						onclick="WRPAdminApp.pagescript.removeItemInPromotionInfo();" />
				</div>
			</div>
			<div dock="bottom" style="height: 99%; height: calc(100% - 160px);">
				<div id="promotion-jqx-grid-new-promotion-items-list"></div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="promotion-select-item">
		<div role="title">SELECT ITEM</div>
		<div role="content" class="jqx-full-sized-dock-panel">
			<!-- 
	 		<div dock="top" style="height: 30px;">
	 			<div class="line">
	 				<div class="grid-3-5">
	 					<div class="jqx-select-item-category" id="promotion-jqx-select-item-category" placeholder="Select Category" style="width:100%;">
	 					</div>  
	 				</div>
	 				<div class="grid-3-5"> 
	 					<div id="promotion-jqx-select-item-category-sub" class="jqx-empty-category" placeholder="Select Sub-Category" style="width:100%;">
	 					</div>
	 				</div>
	 				<div class="grid-3-5"> 
	 					<input type="text" class="jqx-text-input" placeholder="Search Keyword" style="width: 100%;height:24px;"/>
	 				</div>
	 				<div class="grid-1-5">
	 					<input type="button" class="jqx-plain-button" value="Search" style="width: 100%;"/>
	 				</div>
	 			</div>
	 		</div>-->

			<div dock="bottom" style="height: 99%; height: calc(100% - 30px);">
				<div id="promotion-jqx-grid-select-items-list"></div>
			</div>
		</div>
	</div>



	<div class="jqx-custom-window" id="sales-rateplan-new-window">
		<div role="title">Rate Plan Edit</div>
		<div role="content" style="margin-top: 20px;">
			<div class="line">
				<div class="grid-2">Rateplan Code</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-rateplan-code-pop"
						style="width: 100%" />
				</div>
				<div class="grid-2">Description</div>
				<div class="grid-6">
					<input type="text" id="rateplan-edit-description-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Carrier</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-carrier-pop"
						style="width: 100%" />
				</div>
				<div class="grid-2">Plan Type</div>
				<div class="grid-2">
					<select id="rateplan-edit-plan-type-pop" style="width: 100%">
						<option value="0">Voice</option>
						<option value="1">Feature</option>
					</select>
				</div>
				<div class="grid-2">Group Type</div>
				<div class="grid-2">
					<select id="rateplan-edit-group-type-pop" style="width: 100%">
						<option value="0">Individual</option>
						<option value="1">Family</option>
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2">MRC</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-mrc-pop" style="width: 100%" />
				</div>
				<div class="grid-2">Reactivation Plan</div>
				<div class="grid-2">
					<input type="checkbox" id="rateplan-edit-react-plan-flag-pop" />
				</div>
				<div class="grid-2">Upgrade Plan</div>
				<div class="grid-2">
					<input type="checkbox" id="rateplan-edit-upgrade-plan-flag-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Start Date</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-start-date-pop"
						class="jqx-datetime-input" style="width: 100%" />
				</div>
				<div class="grid-2">End Date</div>
				<div class="grid-2">
					<input type="text" id="rateplan-edit-end-date-pop"
						class="jqx-datetime-input" style="width: 100%" />
				</div>
				<div class="grid-2">Disable</div>
				<div class="grid-2">
					<input type="checkbox" id="rateplan-edit-disable-pop" />
				</div>
			</div>
			<div class="line" style="text-align: center;">
				<!-- 
				<div class="btn sky"
					onclick="WRPAdminApp.pagescript.setRateplanData();">Save</div> -->
				<div style="float: right; margin-left:5px;" textposition="center">
					<div class="jqx-plain-button" id="rate-plan-cancel">Cancel</div>
				</div>
				<div style="float: right">
					<div class="jqx-plain-button" id="rate-plan-save">Save</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="coupon-edit-window">
		<div role="title">Edit Coupon Window</div>
		<div role="content" style="padding: 10px 15px;">
			<div class="line" style="height: 100%;">
				<div class="grid-9">
					<div class="line">
						<div class="grid-3-5">Name</div>
						<div class="grid-2-5">
							<input type="text" class="jqx-text-input" style="width: 100%"
								id="edit-coupon-name" />
						</div>
						<div class="grid-2-5">Coupon Code</div>
						<div class="grid-2-5">
							<input type="text" class="jqx-text-input" style="width: 100%"
								id="edit-coupon-code" /> &nbsp;
						</div>
					</div>
					<div class="line">
						<div class="grid-3-5">Description</div>
						<div class="grid-7-5">
							<input type="text" class="jqx-text-input" style="width: 100%"
								id="edit-coupon-description" />
						</div>
					</div>
					<div class="line">
						<div class="grid-3-5">Start Date</div>
						<div class="grid-2-5">
							<input type="text" class="jqx-datetime-input"
								id="edit-coupon-start-date" />
						</div>
						<div class="grid-2-5">End Date</div>
						<div class="grid-2-5">
							<input type="text" class="jqx-datetime-input"
								id="edit-coupon-end-date" />
						</div>
					</div>
					<div class="line">
						<div class="grid-3-5">Discount Type</div>
						<div class="grid-2-5">
							<label> <input type="radio" name="couponDiscountType"
								id="edit-coupon-discount-type-flat" checked /> Flat
							</label> &nbsp; <label> <input type="radio"
								name="couponDiscountType"
								id="edit-coupon-discount-type-percentage" /> %
							</label>
						</div>
						<div class="grid-2-5">Max Discount Price</div>
						<div class="grid-2-5">
							<input type="text" class="jqx-text-input" style="width: 100%"
								id="edit-coupon-max-discount-price" />
						</div>
					</div>
					<div class="line">
						<div class="grid-3-5">Apply Count</div>
						<div class="grid-2-5">
							<input type="text" class="jqx-text-input" style="width: 100%"
								id="edit-coupon-apply-count" />
						</div>
						<div class="grid-2-5">
							Multiple Apply Count<br /> per Transaction
						</div>
						<div class="grid-2-5">
							<input type="text" class="jqx-text-input" style="width: 100%"
								id="edit-coupon-multiple-apply-count" />
						</div>
					</div>
					<div class="line">
						<div class="grid-3-5">All coupons have each ID</div>
						<div class="grid-2-5">
							<input type="checkbox" id="edit-coupon-has-each-id" />
						</div>
					</div>
					<div class="line">
						<div class="grid-3-5">Transaction</div>
						<div class="grid-2-5">
							<select style="width: 100%;" id="edit-coupon-transaction-type">
								<option value="0" selected>All Transaction</option>
								<option value="1">Activation Only</option>
							</select>
						</div>
					</div>
					<div class="line">
						<div class="grid-3-5">Printable</div>
						<div class="grid-2-5">
							<input type="checkbox" id="edit-coupon-printable" />
						</div>
						<div class="grid-2-5">Visible</div>
						<div class="grid-2-5">
							<input type="checkbox" id="edit-coupon-visible" />
						</div>
					</div>
					<div class="line">
					<!-- 
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.setCouponInfo();">Save</div> -->
							<div class="jqx-plain-button"
								id="coupon-save">Save</div>
					</div>
				</div>
				<div class="grid-3" id="jqx-tree-category-struct-container">
					<div id="jqx-tree-category-struct"></div>
				</div>
			</div>
		</div>
	</div>
</div>