<!-- 170106 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "message");
%>
<div pagename="message" class="theme-02">
	<div class="panels" style="height: 100%;">
		<div class="jqx-horizontal-split-panel" panelname="message_list"
			style="height: 100%;">
			<div class="plain-01-panel" style="width: 100%; height: 100%;">
				<div class="title-wrapper">
					<div class="title">Store Message</div>
					<div class="sub-title">message management</div>
					<div class="left-input-area">
						<div class="line" style="overflow: hidden;">
							<div class="grid-1" style="margin-left: 7px;">
								<div class="jqx-plain-button" id="message-add"
									onclick="WRPAdminApp.pagescript.addMessageData();"
									style="float: left;">ADD Message</div>
							</div>
						</div>
					</div>
					<div class="right-input-area" style="margin-left: 5px;">
						<div style="margin-right: 1%;">
							<div class="jqx-plain-button"
								onclick="WRPAdminApp.pagescript.loadMessageData();"
								id="message-apply">Apply</div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="message-end-date"></div>
						</div>
					</div>
					<div class="right-input-area">
						<div style="float: left; width: 100px; margin-left: 5px;">
							<div class="jqx-datetime-input" id="message-start-date"></div>
						</div>
					</div>
					<div class="right-input-area" style="padding-left: 15%;">
						<div style="float: left;">
							<div class="jqx-radio-button" style="width: 80px;"
								id="message-radio-1">Today</div>
						</div>
						<div style="float: left">
							<div class="jqx-radio-button" style="width: 80px;"
								id="message-radio-2">1 Week</div>
						</div>
						<div style="float: left">
							<div class="jqx-radio-button" style="width: 80px;"
								id="message-radio-3">1 Month</div>
						</div>
					</div>
				</div>

				<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
					<div id="message-grid"></div>

				</div>
			</div>
			<div sty>
				<div class="jqx-tab-panel" id="jqx-message-bottom-panel">
					<ul>
						<li>Information</li>
					</ul>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Message Information</div>
						</div>
						<div class="content-wrapper">
							<div class="line" id="message-profile-container"
								style="margin: 5px 15px 5px 15px;">
								<div class="line">
									<div class="grid-2" style="width: 70px;">Emp.ID</div>
									<div class="grid-4" style="width: 120px;">
										<input type="text" class="fill_width_parent"
											id="message-profile-EmpId" readonly/>
									</div>
									<div class="grid-2" style="width: 70px; margin-left: 110px;">
										Store ID</div>
									<div class="grid-4" style="width: 120px;">
										<input type="text" class="fill_width_parent"
											id="message-profile-StoreId" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2" style="width: 70px;">Note</div>
									<div class="grid-4" style="width: 50%;">
										<textarea id="message-profile-Note"
											style="width: 100%; height: 300px;" readonly></textarea>
										<input type="text" id="message-profile-Index"
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
	<div class="jqx-custom-window" id="message-new-window">
		<div role="title">Message</div>
		<div role="content">
			<div class="line">
				<div class="grid-2" style="width: 70px;">Emp.ID</div>
				<div class="grid-4" style="width: 120px;">
					<input type="text" class="fill_width_parent"
						id="message-profile-EmpId-pop" readonly />
				</div>
				<div class="grid-2" style="width: 70px; margin-left: 40px;">
					Store ID</div>
				<div class="grid-4" style="width: 120px;">
					<select id="message-profile-store" class="select-store" onchange="">

					</select>
				</div>
			</div>
			<div class="line" style="height: 75%">
				<div class="grid-2" style="width: 70px;">Note</div>
				<div class="grid-4" style="width: 85%; height: 100%;">
					<textarea id="message-profile-Note-pop"
						style="width: 100%; height: 99%;"></textarea>
					<input type="text" id="message-profile-Index-pop"
						style="display: none;" />
				</div>
			</div>
			<div class="line" style="text-align: center;">
				<div class="grid-2" style="margin-right: 1%; margin-left: 61%;">
					<div class="jqx-plain-button"
						onclick="WRPAdminApp.pagescript.setMessageData();"
						id="promotion-apply">Save</div>
				</div>
				<div class="grid-2">
					<div class="jqx-plain-button"
						onclick="$('#message-new-window').jqxWindow('close');"
						id="promotion-apply">Cancel</div>
				</div>
			</div>

		</div>
	</div>
</div>
