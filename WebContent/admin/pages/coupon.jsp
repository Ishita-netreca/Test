<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "coupon");
%>
<div pagename="coupon" class="theme-02">
	<div class="page-submenu-container" style="display: none;">
		<div class="submenu" panelname="coupon" onclick="">Coupon</div>
	</div>
	<div class="panels" style="height: 100%;">
		<div class="jqx-horizontal-split-panel" panelname="coupon">
			<div class="plain-01-panel">
				<div class="title-wrapper">
					<div class="title">Coupon</div>
					<div class="sub-title">information Management</div>
					<div class="left-input-area">
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.openEditCouponContainerForNewCoupon();">
							+ ADD COUPON</div>
					</div>
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
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.setCouponInfo();">Save</div>
					</div>
				</div>
				<div class="grid-3" id="jqx-tree-category-struct-container">
					<div id="jqx-tree-category-struct"></div>
				</div>
			</div>
		</div>
	</div>
</div>