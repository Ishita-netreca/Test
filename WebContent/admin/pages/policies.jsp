<!-- 170106 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "policies");
%>
<div pagename="policies" class="theme-02">
	<div class="panels" style="height: 100%;">
		<div class="jqx-horizontal-split-panel" panelname="policy_list"
			style="height: 100%;">
			<div class="plain-01-panel" style="width: 100%; height: 100%;">
				<div class="title-wrapper">
					<div class="title">Store Policies</div>
					<div class="sub-title">Policies management</div>
				</div>
				<div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-policy-store-list"></div>
				</div>
			</div>
			<div sty>
				<div class="jqx-tab-panel" id="jqx-policy-bottom-panel">
					<ul>
						<li>Policies</li>
					</ul>
					<div class="plain-01-panel" style="width: 100%; height: 100%;">
						<div class="title-wrapper">
							<div class="title">Policies Information</div>
							<div class="left-input-area">
								<div class="line" style="overflow: hidden;">
									<div class="grid-1" style="margin-left: 7px;">
										<div class="jqx-plain-button" id="policy-add"
											onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.addpolicyData);"
											style="float: left;">ADD policy</div>
									</div>
								</div>
							</div>
							<div class="right-input-area" style="margin-left: 5px;">
								<input type="text" class="jqx-text-input" id="policies-search-keyword" placeholder="keyword" style="width:140px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.loadpolicyData(); }"/>
								<div class="jqx-plain-button" style="display:inline-block;width:80px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.loadpolicyData);" id="policy-apply">Apply</div>
							</div>
						</div>
						<div style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
							<div id="policy-grid"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="policy-new-window">
		<div role="title">policy</div>
		<div role="content">
			<div class="line">
				<!-- <div class="grid-2" style="width: 70px;">Emp.ID</div>
				<div class="grid-4" style="width: 120px;">
					<input type="text" class="fill_width_parent"
						id="policy-profile-EmpId-pop" readonly />
				</div> -->
				<div class="grid-2" style="width: 70px;">
					Name</div>
				<div class="grid-4" style="width: 120px;">
					<select id="policy-profile-name-pop" class="select-name" onchange="">
						<option value = "payment">Payment</option>
                        <option value = "return">Return</option>
                        <option value = "xbm">XBM</option>
					</select>
				</div>
			</div>
			<div class="line" style="height: 75%">
				<div class="grid-2" style="width: 70px;">policy</div>
				<div class="grid-4" style="width: 85%; height: 100%;">
					<textarea id="policy-profile-policy-pop"
						style="width: 100%; height: 99%;"></textarea>
					<input type="text" id="policy-profile-Index-pop"
						style="display: none;" />
				</div>
			</div>
			<div class="line" style="text-align: center;">
				<div class="grid-2" style="margin-right: 1%; margin-left: 61%;">
					<div class="jqx-plain-button"
						onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setpolicyData);"
						id="policy-apply">Save</div>
				</div>
				<div class="grid-2">
					<div class="jqx-plain-button"
						onclick="$('#policy-new-window').jqxWindow('close');"
						id="policy-apply">Cancel</div>
				</div>
			</div>

		</div>
	</div>
</div>
