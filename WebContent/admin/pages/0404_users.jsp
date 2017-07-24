<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
	/*170122 jh : �ð� ���� �߰�*/
	session.setAttribute("wrp_last_loaded_page", "users");/*
															String storeId = MyRequestUtil.getString(request, "storeId", null);
															if (storeId == null) {
															storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
															}
															String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
															boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
															JSONObject permissionData = null;
															if (!isOwner && storeId != null) {
															permissionData = (JSONObject) ((JSONObject) UtilMethodClass.getSingleton().getPermissionData(storeId, userId)).get("User");
															}
															
															JSONObject obj = null;*/
%>
<%
	//if (isOwner || (permissionData != null && permissionData.get("allow") != null && (Boolean)permissionData.get("allow") == true)) {
%>
<div pagename="users" class="theme-02">
	<div class="page-submenu-container" style="display:none;">
		<div class="submenu" panelname="user_list"
			onclick="WRP.UI.changePanelBySubmenu('user_list');">Employee
			List</div>
	</div>
	<div class="panels" style="height:100%;">
		<div class="jqx-horizontal-split-panel" panelname="user_list"
			style="display: block; height: 100%;">
			<div class="plain-01-panel" style="height: 40%">
				<div class="title-wrapper">
					<div class="title">Employee</div>
					<div class="sub-title">information Management</div>
					<div class="left-input-area">
						<%
							//obj = (JSONObject)UtilMethodClass.getSingleton().getPermissionDataByName(permissionData, "Add");
							//if (isOwner || (obj != null && obj.get("allow") != null && (Boolean)obj.get("allow") == true)) {
						%>
						<div class="grid-3">
							<div class="jqx-plain-button" id="add-emp-btn">+ADD
								Emp</div>
						</div>
						<!-- 
						<div class="btn sky"
							onclick="WRPAdminApp.pagescript.initUserEditContainer();$('#user-add-window').jqxWindow('open');">
							+ ADD EMP</div> -->
						<%
							//}
						%>
					</div>
					<div class="right-input-area">
						<div class="grid-6">
							<div class="jqx-plain-button"
								id="store-assigned-users-btn"
								>Assigned
								Emp</div>
						</div>
						<div class="grid-6">
							<div class="jqx-plain-button"
								id="all-employees-btn"
								>All
								Emp</div>
						</div>
					</div>
				</div>
				<!-- 170117 jh : jqxgrid area -->
				<div
					style="margin-left: 32px; margin-right: 50px; margin-top: 3px; height: calc(100% - 53px);">
					<div id="jqx-users-list"></div>
				</div>
				<!--  -->
			</div>

			<div>
				<div class="jqx-tab-panel" id="jqx-users-bottom-panel">
					<ul>
						<li>Profile</li>
						<li>Assigned Store</li>
						<li>Sales History</li>
						<li>Activations</li>
						<!-- <li>Commission</li> -->
						<li>Permission</li>
					</ul>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-user-profile">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Profile</div>
									<div class="left-input-area"></div>
									<div class="right-input-area"></div>
								</div>
							</div>
							<div id="users-profile-container"
								style="margin-left: 32px; margin-right: 50px; margin-top: 3px;">
								<form id="users-profile-photo-form" method="post"
									enctype="multipart/form-data" style="display: none;">
									<input type="file" id="users-profile-photo-file"
										onchange="WRPAdminApp.pagescript.setUserPhotoPreview();" />
								</form>
								<div class="user-photo" id="users-photo"
									onclick="try{ document.getElementById('users-profile-photo-file').click(); }catch(e){}">
								</div>

								<div class="line">
									<div class="grid-2">ID</div>
									<div class="grid-4">
										<input type="text" style="width:95%;" class="jqx-text-input"
											id="user-profile-id" readonly/>
									</div>
									<div class="grid-2">Password</div>
									
									<div class="grid-4">
										<input type="password" 
											id="user-profile-password" style="width:95%;" class="jqx-password-input" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">First Name</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-first-name" readonly/>
									</div>
									<div class="grid-2">Last Name</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-last-name" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Address1</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-address1" readonly/>
									</div>
									<div class="grid-2">Address2</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-address2" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">City</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-city" readonly/>
									</div>
									<div class="grid-2">State</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-state" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Zipcode</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-zipcode" readonly/>
									</div>
									<div class="grid-2">e-Mail</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-email" readonly/>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Mobile</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-mobile" readonly/>
									</div>
									<div class="grid-2">User Type</div>
									<div class="grid-4">
										<select id="user-profile-type" >
											<option value="4">Employee</option>
											<option value="3">Store Manager</option>
										</select>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Status</div>
									<div class="grid-4">
										<label for="user-profile-auth-disable"> <input
											type="radio" id="user-profile-auth-disable"
											name="userProfileAuth" /> Disable
										</label> <label for="user-profile-auth-enable"> <input
											type="radio" id="user-profile-auth-enable"
											name="userProfileAuth" checked /> Enable
										</label>
									</div>
									<div class="grid-2">User Role</div>
									<div class="grid-4">
										<select id="user-profile-user-role">
										</select>
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Hire Date</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="user-profile-hire-date" readonly/>
									</div>
									<div class="grid-2" style="display: none;">User Group</div>
									<div class="grid-4" style="display: none;">
										<select id="user-group">

										</select>
									</div>
									<div class="grid-2" style="display: none;">Middle Name</div>
									<div class="grid-4" style="display: none;">
										<input type="text" class="fill_width_parent"
											id="user-profile-middle-name" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-user-assigned" style="height: 100%;">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Assigned Store</div>
									<div class="left-input-area"></div>
									<div class="right-input-area">
										<!-- 
										<div class="btn sky"
											onclick="WRPAdminApp.pagescript.setUserStoreAccess();">Save</div> -->
										<div class="grid-6">
											<div class="jqx-plain-button"
												id="assigned-store-save-btn">Save</div>
										</div>
									</div>
								</div>
							</div>
							<div
								style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
								<div id="jqx-assigned-store"></div>
							</div>
						</div>
					</div>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-user-sales" style="height: 100%;">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Sales History</div>
									<div class="left-input-area"></div>
									<div class="right-input-area" style="width: 650px;">
										<div class="grid-1" style="width: 70px;" >
											<div class="jqx-radio-button" id="sales-history-radio-1"
												style="width: 80px;" groupName="sales-history-group">Today</div>
										</div>
										<div class="grid-1" style="width: 70px;" >
											<div class="jqx-radio-button" id="sales-history-radio-2"
												style="width: 80px;" groupName="sales-history-group">1 Week</div>
										</div>
										<div class="grid-1" style="width: 70px;" >
											<div class="jqx-radio-button" id="sales-history-radio-3"
												style="width: 80px;" groupName="sales-history-group">1 Month</div>
										</div>
										<div class="grid-2" style="width:110px;">
										<div class="jqx-datetime-input"
											id="sales-history-search-start-date"></div>
										</div>
										<div class="grid-1" style="width:110px;">
										<div class="jqx-datetime-input"
											id="sales-history-search-end-date"></div>
										</div>
										<div class="grid-1-5" style="margin-left: 10px;">
											<div class="jqx-plain-button"
												id="sales-history-apply-btn" style="width: 100%">Apply</div>
										</div>
										<div class="grid-1-5" style="margin-left: 10px;">
											<div class="jqx-plain-button" id="excel-sales-history-user" style="width: 100%">Excel</div>
										</div>
									</div>
								</div>
							</div>
							<div
								style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
								<div id="jqx-sales-history"></div>
							</div>
						</div>
					</div>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-user-activations" style="height: 100%;">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Activations</div>
									<div class="left-input-area"></div>
									<div class="right-input-area" style="width: 650px;">
										<div class="grid-1" style="width: 70px;" >
											<div class="jqx-radio-button" id="user-activations-radio-1" groupName="activations-group">Today</div>
										</div>
										<div class="grid-1" style="width: 70px;" >
											<div class="jqx-radio-button" id="user-activations-radio-2" groupName="activations-group">1 Week</div>
										</div>
										<div class="grid-1" style="width: 70px;" >
											<div class="jqx-radio-button" id="user-activations-radio-3" groupName="activations-group">1 Month</div>
										</div>
										<div class="grid-2" style="width:110px;">
										<div class="jqx-datetime-input" id="user-activations-search-start-date"></div>
										</div>
										<div class="grid-1" style="width:110px;">
										<div class="jqx-datetime-input" id="user-activations-search-end-date"></div>
										</div>
										<div class="grid-1-5" style="margin-left: 10px;">
											<div class="jqx-plain-button"
												id="user-activations-apply-btn" style="width: 100%">Apply</div>
										</div>
										<div class="grid-1-5" style="margin-left: 10px;">
											<div class="jqx-plain-button"
												id="excel-activations-history-user" style="width: 100%">Excel</div>
										</div>
									</div>
								</div>
							</div>
							<div
								style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
								<div id="jqx-activations"></div>
							</div>
						</div>
					</div>
					<!-- 
					<div style="width: 100%; height: 100%;">
						<div id="jqx-user-commission" style="height: 100%;"></div>
					</div> -->
					<div style="width: 100%; height: 100%;">
						<div id="jqx-user-permission">
							<div class="line" style="margin-left: 32px; margin-right: 50px;">
								<div class="grid-6">
									<div class="plain-02-panel">
										<div class="title-wrapper">
											<div class="title" style="padding-top: 10px; font-size: 21px;">Sales
												Permission</div>
											<div class="left-input-area"></div>
											<div class="right-input-area">
												<!-- 
												<div class="btn sky" style="top: 7px"
													onclick="WRPAdminApp.pagescript.saveSalesPermissionInfo();">Save</div> -->
												<div class="grid-6">
													<div class="jqx-plain-button"
														id="sales-permission-save-btn">Save</div>
												</div>
											</div>
										</div>
										<div class="content-wrapper">
											<div class="content" style="margin-top: 10px; padding: 0px;">
												<div class="line"
													style="font-weight: bold; margin-bottom: 0px; border-bottom: rgba(217, 217, 217, 1) 1px solid; overflow-x: hidden;">
													<div class="grid-1">&nbsp;</div>
													<div class="grid-4">Functions</div>
													<div class="grid-4" style="text-align: center;">
														Description</div>
													<div class="grid-3" style="text-align: center;">
														Permission</div>
												</div>
												<div class="line" style="height: 285px;">
													<div class="permission-set-list"
														id="users-sales-permission-set-list"></div>
												</div>
												<div class="line"
													style="margin-top: -10px; min-height: 0px; height: 0px; border-top: rgba(217, 217, 217, 1) 1px solid;">

												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="grid-6">
									<div class="plain-02-panel">
										<div class="title-wrapper">
											<div class="title" style="padding-top: 10px; font-size: 21px;">Backend
												Permission</div>
											<div class="left-input-area"></div>
											<div class="right-input-area">
												<!-- 
												<div class="btn sky" style="top: 7px"
													onclick="WRPAdminApp.pagescript.saveBackendPermissionInfo();">Save</div> -->
												<div class="grid-6">
													<div class="jqx-plain-button"
														id="backend-permission-save-btn">Save</div>
												</div>
											</div>
										</div>
										<div class="content-wrapper">
											<div class="content" style="margin-top: 10px; padding: 0px;">
												<div class="line"
													style="font-weight: bold; margin-bottom: 0px; border-bottom: rgba(217, 217, 217, 1) 1px solid; overflow-x: hidden;">
													<div class="grid-1">&nbsp;</div>
													<div class="grid-4">Functions</div>
													<div class="grid-4" style="text-align: center;">
														Description</div>
													<div class="grid-3" style="text-align: center;">
														Permission</div>
												</div>
												<div class="line" style="height: 285px; margin-bottom: 0px;">
													<div class="permission-set-list"
														id="users-backend-permission-set-list"></div>
												</div>
												<div class="line"
													style="margin-top: -10px; min-height: 0px; height: 0px; border-top: rgba(217, 217, 217, 1) 1px solid;">

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="popup-area">
		<div class="popup-container" popupname="ClockIOAdjContainer">
			<div class="title-bar">PURCHASE ORDER</div>
			<div class="plain-view">
				<div class="plain-content"></div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="user-add-window">
		<div role="title">Add User Window</div>
		<div id="users-add-container">
			<form id="users-add-photo-form" method="post"
				enctype="multipart/form-data" style="display: none;">
				<input type="file" id="users-profile-photo-file"
					onchange="WRPAdminApp.pagescript.setUserPhotoPreview();" />
			</form>
			<div class="user-photo" id="users-photo"
				onclick="try{ document.getElementById('users-profile-photo-file').click(); }catch(e){}">
			</div>
			<div class="line">
				<div class="grid-2">ID</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-add-id" />
				</div>
				<div class="grid-2">Password</div>
				<div class="grid-4" style="width: 25%;">
					<input type="password" class="fill_width_parent"
						style="width: 215px;" id="user-add-password" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">First Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="user-add-first-name" />
				</div>
				<div class="grid-2">Address1</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-add-address1" />
				</div>
			</div>
			<div class="line">

				<div class="grid-2">Last Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="user-add-last-name" />
				</div>
				<div class="grid-2">Address2</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-add-address2" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">City</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-add-city" />
				</div>
				<div class="grid-2">State</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-add-state" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Zipcode</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-add-zipcode" />
				</div>
				<div class="grid-2">e-Mail</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-add-email" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Mobile</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-add-mobile" />
				</div>
				<div class="grid-2">User Type</div>
				<div class="grid-4" style="width: 25%;">
					<select id="user-add-type">
						<option value="4">Employee</option>
						<option value="3">Store Manager</option>
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Status</div>
				<div class="grid-4" style="width: 25%;">
					<label for="user-profile-auth-disable"> <input type="radio"
						id="user-add-auth-disable" name="userProfileAuth" /> Disable
					</label> <label for="user-add-auth-enable"> <input type="radio"
						id="user-add-auth-enable" name="userProfileAuth" checked />
						Enable
					</label>
				</div>
				<div class="grid-2">User Role</div>
				<div class="grid-4" style="width: 25%;">
					<select id="user-add-user-role">
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Hire Date</div>
				<div class="grid-4" style="width: 25%;">
					<div id="user-add-hire-date"></div>
				</div>
				<div class="grid-2" style="display: none;">User Group</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<select id="user-add-group">

					</select>
				</div>
				<div class="grid-2" style="display: none;">Middle Name</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-add-middle-name" />
				</div>
			</div>
			<div class="line">
				<div class="grid-6">
					<div class="jqx-plain-button"
						id="add-save-btn">Save</div>
				</div>
				<div class="grid-6">
					<div class="jqx-plain-button"
						id="add-cancel-btn" onclick="$('#user-add-window').jqxWindow('close');">Cancel</div>
				</div>
				<!-- 
				<div class="grid-6">&nbsp;</div>
				<div class="grid-6"
					style="text-align: right; padding-right: 15px; margin-top: 5px;">
					<div class="btn sky"
						onclick="WRPAdminApp.pagescript.setUserData();">Save</div>
					<div class="btn blue"
						onclick="$('#user-add-window').jqxWindow('close');">Cancel</div>
				</div>
				 -->
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="user-edit-window">
		<div role="title">Edit User Window</div>
		<div id="users-edit-container">
			<form id="users-edit-photo-form" method="post"
				enctype="multipart/form-data" style="display: none;">
				<input type="file" id="users-edit-photo-file"
					onchange="WRPAdminApp.pagescript.setUserPhotoPreview();" />
			</form>
			<div class="user-photo" id="users-edit-photo"
				onclick="try{ document.getElementById('users-profile-photo-file').click(); }catch(e){}">
			</div>
			<div class="line">
				<div class="grid-2">ID</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-edit-id"
						readonly />
				</div>
				<div class="grid-2">Password</div>
				<div class="grid-4" style="width: 25%;">
					<input type="password" class="fill_width_parent"
						style="width: 215px;" id="user-edit-password" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">First Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="user-edit-first-name" />
				</div>
				<div class="grid-2">Address1</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-edit-address1" />
				</div>

			</div>
			<div class="line">
				<div class="grid-2">Last Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="user-edit-last-name" />
				</div>
				<div class="grid-2">Address2</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-edit-address2" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">City</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-edit-city" />
				</div>
				<div class="grid-2">State</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-edit-state" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Zipcode</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-edit-zipcode" />
				</div>
				<div class="grid-2">e-Mail</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-edit-email" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Mobile</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="user-edit-mobile" />
				</div>
				<div class="grid-2">User Type</div>
				<div class="grid-4" style="width: 25%;">
					<select id="user-edit-type">
						<option value="4">Employee</option>
						<option value="3">Store Manager</option>
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Auth.</div>
				<div class="grid-4" style="width: 25%;">
					<label for="user-edit-auth-disable"> <input type="radio"
						id="user-edit-auth-disable" name="userProfileAuth" /> Disable
					</label> <label for="user-edit-auth-enable"> <input type="radio"
						id="user-edit-auth-enable" name="userProfileAuth" checked />
						Enable
					</label>
				</div>
				<div class="grid-2">User Role</div>
				<div class="grid-4" style="width: 25%;">
					<select id="user-edit-user-role">
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Hire Date</div>
				<div class="grid-4" style="width: 25%;">
					<div id="user-edit-hire-date"></div>
				</div>
				<div class="grid-2" style="display: none;">User Group</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<select id="user-edit-group">

					</select>
				</div>
				<div class="grid-2" style="display: none;">Middle Name</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="user-edit-middle-name" />
				</div>
			</div>
			<div class="line">
				<div class="grid-6">
					<div class="jqx-plain-button"
						id="edit-save-btn">Save</div>
				</div>
				<div class="grid-6">
					<div class="jqx-plain-button" onclick="$('#user-edit-window').jqxWindow('close');"
						id="edit-cancel-btn">Cancel</div>
				</div>
				<!--  
				<div class="grid-6">&nbsp;</div>
				<div class="grid-6"
					style="text-align: right; padding-right: 15px; margin-top: 5px;">
					<div class="btn sky"
						onclick="WRPAdminApp.pagescript.editUserData();">Save</div>
					<div class="btn blue"
						onclick="$('#user-edit-window').jqxWindow('close');">Cancel</div>
				</div>
				-->
			</div>
		</div>
	</div>
	<div id="user-saleshistory-invoice-window" class="jqx-custom-window">
		<div role="title">INVOICE</div>
		<div class="plain-view">
			<div class="plain-content">
				<!-- <div class="line customer-info">
						<span>Customer Information</span><span>Account ID. <span class="font_bold" id="invoice-selected-customer-id"></span></span><span>Name. <span class="font_bold" id="invoice-selected-customer-name"></span></span><span>Address. <span class="font_bold" id="invoice-selected-customer-address"></span></span>
					</div> -->
				<div class="line" style="height: 270px;">
					<div id="inner-manage-jqx-invoice-item-list"></div>
				</div>
				<div class="line">
					<div class="grid-4">
						<div class="line" style="margin-bottom: 0px;">Note</div>
						<div class="line">
							<textarea class="fill_width_parent fill_height_parent"
								id="inner-manage-invoice-note" readonly></textarea>
						</div>
					</div>
					<div class="grid-8">
						<div class="grid-4" style="font-size: 13px; text-align: right;">
							<div>
								<span>Qty : <span id="inner-manage-jqx-invoice-qty">0</span></span>
							</div>
							<div>
								<span>Discount : <span
									id="inner-manage-jqx-invoice-total-discount">$0.00</span></span>
							</div>
							<div>
								<span>Taxes : <span
									id="inner-manage-jqx-invoice-total-taxes">$0.00</span></span>
							</div>
						</div>
						<div class="grid-8" style="font-size: 40px; text-align: right;">
							Total : <span id="inner-manage-jqx-invoice-total-price">$0.00</span>
						</div>
					</div>
				</div>
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</div>
<%
	//   }
%>