<!-- 170106 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "cash_out");
%>
<div pagename="cash_out" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
		<div class="submenu" panelname="cash_out_list"
			onclick="WRP.UI.changePanelBySubmenu('cash_out_list');">Cash
			Out</div>
	</div>

	<div class="panels" style="height:100%;">
		<div class="jqx-horizontal-split-panel" panelname="cash_out_list"
			style="height: 100%;">
			<div class="plain-01-panel" style="width: 100%; height: 100%;">
				<div class="title-wrapper">
					<div class="title">Cash out</div>
					<div class="sub-title">Cash out management</div>
					<div class="right-input-area" style="width: 660px;">
						<div class="line" style="overflow: hidden;">
							<div class="grid-1" style="width:70px;">
								<div class="jqx-radio-button"id="cashout-radio-1">Today</div>
							</div>
							<div class="grid-1" style="width:70px;">
								<div class="jqx-radio-button"id="cashout-radio-2">1
									Week</div>
							</div>
							<div class="grid-1-5" style="width:100px;">
								<div class="jqx-radio-button"id="cashout-radio-3">1
									Month</div>
							</div>
							<div class="grid-2-5" style="margin-left: 0px;width:110px;">
								<div class="jqx-datetime-input" id="cashout-start-date"></div>
							</div>
							<div class="grid-2-5" style="margin-left: 7px;width:110px;">
								<div class="jqx-datetime-input" id="cashout-end-date"></div>
							</div>
							<div class="grid-1" style="margin-left: 7px;width:75px;">
								<div class="jqx-plain-button"
									id="cashout-apply" style="width:70px;">Apply</div>
							</div>
							<div class="grid-1" style="margin-left: 7px;width:75px;">
								<div class="jqx-plain-button"
									id="excel_cash_out" style="width:70px;">Excel</div>
							</div>

						</div>
					</div>
				</div>

				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="jqxgrid"></div>

				</div>
			</div>
			<div>
				<div class="jqx-tab-panel" id="jqx-cashout-bottom-panel">
					<ul>
						<li>Information</li>
					</ul>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Cash out Information</div>
						</div>
						<div class="content-wrapper">
							<div class="line" id="cash-out-profile-container"
								style="margin: 5px 15px 5px 15px;">
								<div class="line">
									<div class="grid-2" style="width: 70px;">Emp.ID</div>
									<div class="grid-4" style="width: 120px;">
										<input type="text" class="fill_width_parent"
											id="cash-out-profile-EmpId" readonly/>
									</div>
									<div class="grid-2" style="width: 70px; margin-left: 110px;">
										Store ID</div>
									<div class="grid-4" style="width: 120px;">
										<input type="text" class="fill_width_parent"
											id="cash-out-profile-StoreId" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2" style="width: 70px;">Emp.Name</div>
									<div class="grid-4" style="width: 120px;">
										<input type="text" class="fill_width_parent"
											id="cash-out-profile-EmpName" readonly />
									</div>
									<div class="grid-2" style="width: 70px; margin-left: 110px;">
										Date</div>
									<div class="grid-4" style="width: 120px;">
										<input type="text" class="fill_width_parent"
											id="cash-out-profile-Date" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2" style="width: 70px;">Amount</div>
									<div class="grid-4" style="width: 120px;">
										<input type="text" class="fill_width_parent"
											id="cash-out-profile-Amount" readonly/>
									</div>
									<div class="grid-2" style="width: 70px; margin-left: 110px;">
										Out to</div>
									<div class="grid-4" style="width: 120px;">
										<select id="cash-out-profile-Out-to" style="width: 150px"
											onchange="" disabled>
											<option value="0" selected>Select</option>
											<option value="1">Bank</option>
											<option value="2">Cash Safe</option>
											<option value="3">Other</option>
										</select>
									</div>
								</div>
								<div class="line">
									<div class="grid-2" style="width: 70px;">Note</div>
									<div class="grid-4" style="width: 150px;">
										<textarea id="cash-out-profile-Note"
											style="width: 468px; height: 100px;" readonly></textarea>
										<input type="text" id="cash-out-profile-Index"
											style="display: none;" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="cashout-new-window">
		<div role="title">Edit</div>
		<div role="content">
			<div class="line">
				<div class="grid-2" style="width: 70px;">Emp.ID</div>
				<div class="grid-4" style="width: 120px;">
					<input type="text" class="fill_width_parent"
						id="cash-out-profile-EmpId-pop" readonly/>
				</div>
				<div class="grid-2" style="width: 70px; margin-left: 110px;">
					Store ID</div>
				<div class="grid-4" style="width: 120px;">
					<input type="text" class="fill_width_parent"
						id="cash-out-profile-StoreId-pop" readonly/>
				</div>
			</div>
			<div class="line">
				<div class="grid-2" style="width: 70px;">Emp.Name</div>
				<div class="grid-4" style="width: 120px;">
					<input type="text" class="fill_width_parent"
						id="cash-out-profile-EmpName-pop" readonly />
				</div>
				<div class="grid-2" style="width: 70px; margin-left: 110px;">
					Date</div>
				<div class="grid-4" style="width: 120px;">
					<input type="text" class="fill_width_parent"
						id="cash-out-profile-Date-pop" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2" style="width: 70px;">Amount</div>
				<div class="grid-4" style="width: 120px;">
					<input type="text" class="fill_width_parent"
						id="cash-out-profile-Amount-pop" />
				</div>
				<div class="grid-2" style="width: 70px; margin-left: 110px;">
					Out to</div>
				<div class="grid-4" style="width: 120px;">
					<select id="cash-out-profile-Out-to-pop" style="width: 150px"
						onchange="">
						<option value="0" selected>Select</option>
						<option value="1">Bank</option>
						<option value="2">Cash Safe</option>
						<option value="3">Other</option>
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2" style="width: 70px;">Note</div>
				<div class="grid-4" style="width: 150px;">
					<textarea id="cash-out-profile-Note-pop"
						style="width: 468px; height: 100px;"></textarea>
					<input type="text" id="cash-out-profile-Index-pop"
						style="display: none;" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:90px; display:inline-block;" onclick="WRPAdminApp.pagescript.editCashOutData();">Save</div>
			</div>
		</div>
	</div>
</div>
