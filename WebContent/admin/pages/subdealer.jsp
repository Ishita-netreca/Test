<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%
	/*170122 jh : �ð� ���� �߰�*/
	session.setAttribute("wrp_admin_last_loaded_page", "subdealer");
%>
<div pagename="subdealer" class="theme-02">
	<div class="panels" style="height: 100%;">
		<div class="jqx-horizontal-split-panel" panelname="user_list" style="display: block; height: 100%;">
			<div class="plain-01-panel" style="height: 40%">
				<div class="title-wrapper">
					<div class="title">Sub Dealer</div>
					<div class="sub-title">information Management</div>
					<div class="left-input-area">
						<div class="grid-3">
							<div class="jqx-plain-button" id="add-emp-btn" onclick="$('#subdealer-add-window').jqxWindow('open');">+ADD Owner</div>
						</div>
					</div>
					<div class="right-input-area">
						<input type="text" class="jqx-text-input" id="subdealer-search-keyword" placeholder="keyword" style="width: 140px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getUserList(); }" />
						<div class="jqx-plain-button" style="display: inline-block; width: 70px;" id="employee-search-btn" onclick="WRPAdminApp.pagescript.getUserList();">Apply</div>
					</div>
				</div>
				<div
					style="margin-left: 32px; margin-right: 50px; margin-top: 3px; height: calc(100% - 53px);">
					<div id="jqx-subDealer-list"></div>
				</div>
			</div>

			<div>
				<div class="jqx-tab-panel" id="jqx-subDealer-bottom-panel">
					<ul>
						<li>Profile</li>
						<li>Store</li>
					</ul>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-subdealer-profile">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Profile</div>
									<div class="left-input-area"></div>
									<div class="right-input-area"></div>
								</div>
							</div>
							<div id="subDealer-profile-container"
								style="margin-left: 32px; margin-right: 50px; margin-top: 3px;">
								<form id="subDealer-profile-photo-form" method="post"
									enctype="multipart/form-data" style="display: none;">
									<input type="file" id="subDealer-profile-photo-file"
										onchange="WRPAdminApp.pagescript.setUserPhotoPreview();" />
								</form>
								<div class="subdealer-photo" id="subDealer-photo" style="display:none;"
									onclick="try{ document.getElementById('subDealer-profile-photo-file').click(); }catch(e){}">
								</div>

								<div class="line" style="overflow-x: hidden">
									<div class="grid-2">ID</div>
									<div class="grid-4">
										<input type="text" style="width: 98%;" class="jqx-text-input"
											id="subdealer-profile-id" readonly />
									</div>
									<div class="grid-2">Password</div>

									<div class="grid-4">
										<input type="password" id="subdealer-profile-password"
											class="jqx-password-input" readonly />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">First Name</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-first-name" readonly />
									</div>
									<div class="grid-2">Last Name</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-last-name" readonly />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Address1</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-address1" readonly />
									</div>
									<div class="grid-2">Address2</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-address2" readonly />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">City</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-city" readonly />
									</div>
									<div class="grid-2">State</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-state" readonly />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Zipcode</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-zipcode" readonly />
									</div>
									<div class="grid-2">e-Mail</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-email" readonly />
									</div>
								</div>
								<div class="line">
									<div class="grid-2">Mobile</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-mobile" readonly />
									</div>
									<div class="grid-2">User Type</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-type" readonly />
									</div>
								</div>
								<div class="line" style="display:none;">
									<div class="grid-2">Status</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-auth" readonly />
									</div>
									<div class="grid-2">User Role</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-subdealer-role" readonly />
										<!-- <select id="subdealer-profile-subdealer-role">
										</select> -->
									</div>
								</div>
								<div class="line" style="display:none;">
									<div class="grid-2">Hire Date</div>
									<div class="grid-4">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-hire-date" readonly />
									</div>
									<div class="grid-2" style="display: none;">User Group</div>
									<div class="grid-4" style="display: none;">
										<select id="subdealer-group">

										</select>
									</div>
									<div class="grid-2" style="display: none;">Middle Name</div>
									<div class="grid-4" style="display: none;">
										<input type="text" class="fill_width_parent"
											id="subdealer-profile-middle-name" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style="width: 100%; height: 100%;">
						<div id="jqx-subdealer-assigned" style="height: 100%;">
							<div class="plain-01-panel">
								<div class="title-wrapper">
									<div class="title">Assigned Store</div>
									<div class="left-input-area"></div>
									<div class="right-input-area"></div>
								</div>
							</div>
							<div
								style="margin: 3px 50px 0px 32px; height: calc(100% - 53px);">
								<div id="jqx-assigned-store"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="subdealer-add-window">
		<div role="title">Add User Window</div>
		<div id="subDealer-add-container">
			<form id="subDealer-add-photo-form" method="post"
				enctype="multipart/form-data" style="display: none;">
				<input type="file" id="subDealer-profile-photo-file"
					onchange="WRPAdminApp.pagescript.setUserPhotoPreview();" />
			</form>
			<div class="subdealer-photo" id="subDealer-photo" style="display:none;"
				onclick="try{ document.getElementById('subDealer-profile-photo-file').click(); }catch(e){}">
			</div>
			<div class="line">
				<div class="grid-2">ID</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-add-id" />
				</div>
				<div class="grid-2">Password</div>
				<div class="grid-4" style="width: 25%;">
					<input type="password" class="fill_width_parent"
						style="width: 215px;" id="subdealer-add-password" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">First Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="subdealer-add-first-name" />
				</div>
				<div class="grid-2">Address1</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-add-address1" />
				</div>
			</div>
			<div class="line">

				<div class="grid-2">Last Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="subdealer-add-last-name" />
				</div>
				<div class="grid-2">Address2</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-add-address2" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">City</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-add-city" />
				</div>
				<div class="grid-2">State</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-add-state" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Zipcode</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-add-zipcode" />
				</div>
				<div class="grid-2">e-Mail</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-add-email" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Mobile</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-add-mobile" />
				</div>
				<div class="grid-2">User Type</div>
				<div class="grid-4" style="width: 25%;">
					<select id="subdealer-add-type">
						<option value="4">Employee</option>
						<option value="3">Store Manager</option>
					</select>
				</div>
			</div>
			<div class="line" style="display:none;">
				<div class="grid-2">Status</div>
				<div class="grid-4" style="width: 25%;">
					<label for="subdealer-profile-auth-disable"> <input type="radio"
						id="subdealer-add-auth-disable" name="userProfileAuth" /> Disable
					</label> <label for="subdealer-add-auth-enable"> <input type="radio"
						id="subdealer-add-auth-enable" name="userProfileAuth" checked />
						Enable
					</label>
				</div>
				<div class="grid-2">User Role</div>
				<div class="grid-4" style="width: 25%;">
					<select id="subdealer-add-subdealer-role">
					</select>
				</div>
			</div>
			<div class="line" style="display:none;">
				<div class="grid-2">Hire Date</div>
				<div class="grid-4" style="width: 25%;">
					<div id="subdealer-add-hire-date"></div>
				</div>
				<div class="grid-2" style="display: none;">User Group</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<select id="subdealer-add-group">

					</select>
				</div>
				<div class="grid-2" style="display: none;">Middle Name</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-add-middle-name" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">License</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-add-license" />
				</div>
			</div>
			<div class="line" style="margin-left: 250px;">
				<div class="jqx-plain-button" style="display: inline-block;" onclick="WRPAdminApp.pagescript.setSubDealer();"
					id="add-save-btn">Save</div>
				<div class="jqx-plain-button"
					style="display: inline-block; margin-left: 20px;"
					id="add-cancel-btn"
					onclick="$('#subdealer-add-window').jqxWindow('close');">Cancel</div>
			</div>
		</div>
	</div>
	<div class="jqx-custom-window" id="subdealer-edit-window">
		<div role="title">Edit User Window</div>
		<div id="subDealer-edit-container">
			<form id="subDealer-edit-photo-form" method="post"
				enctype="multipart/form-data" style="display: none;">
				<input type="file" id="subDealer-edit-photo-file"
					onchange="WRPAdminApp.pagescript.setUserPhotoPreview();" />
			</form>
			<div class="subdealer-photo" id="subDealer-edit-photo" style="display:none;"
				onclick="try{ document.getElementById('subDealer-profile-photo-file').click(); }catch(e){}">
			</div>
			<div class="line">
				<div class="grid-2">ID</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-edit-id"
						readonly />
				</div>
				<div class="grid-2">Password</div>
				<div class="grid-4" style="width: 25%;">
					<input type="password" class="fill_width_parent"
						style="width: 215px;" id="subdealer-edit-password" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">First Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="subdealer-edit-first-name" />
				</div>
				<div class="grid-2">Address1</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-edit-address1" />
				</div>

			</div>
			<div class="line">
				<div class="grid-2">Last Name</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent"
						id="subdealer-edit-last-name" />
				</div>
				<div class="grid-2">Address2</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-edit-address2" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">City</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-edit-city" />
				</div>
				<div class="grid-2">State</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-edit-state" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Zipcode</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-edit-zipcode" />
				</div>
				<div class="grid-2">e-Mail</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-edit-email" />
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Mobile</div>
				<div class="grid-4" style="width: 25%;">
					<input type="text" class="fill_width_parent" id="subdealer-edit-mobile" />
				</div>
				<div class="grid-2">User Type</div>
				<div class="grid-4" style="width: 25%;">
					<select id="subdealer-edit-type">
						<option value="4">Employee</option>
						<option value="3">Store Manager</option>
					</select>
				</div>
			</div>
			<div class="line">
				<div class="grid-2">Auth.</div>
				<div class="grid-4" style="width: 25%;">
					<label for="subdealer-edit-auth-disable"> <input type="radio"
						id="subdealer-edit-auth-disable" name="userProfileAuth" /> Disable
					</label> <label for="subdealer-edit-auth-enable"> <input type="radio"
						id="subdealer-edit-auth-enable" name="userProfileAuth" checked />
						Enable
					</label>
				</div>
				<div class="grid-2">User Role</div>
				<div class="grid-4" style="width: 25%;">
					<select id="subdealer-edit-subdealer-role">
					</select>
				</div>
			</div>
			<div class="line" style="display:none;">
				<div class="grid-2">Hire Date</div>
				<div class="grid-4" style="width: 25%;">
					<div id="subdealer-edit-hire-date"></div>
				</div>
				<div class="grid-2" style="display: none;">User Group</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<select id="subdealer-edit-group">

					</select>
				</div>
				<div class="grid-2" style="display: none;">Middle Name</div>
				<div class="grid-4" style="width: 25%; display: none;">
					<input type="text" class="fill_width_parent" style="width: 215px;"
						id="subdealer-edit-middle-name" />
				</div>
			</div>
			<div class="line"></div>
			<div class="line" style="margin-left: 250px;">
				<div class="jqx-plain-button" style="display: inline-block;"
					id="edit-save-btn">Save</div>
				<div class="jqx-plain-button"
					style="display: inline-block; margin-left: 20px;"
					id="edit-cancel-btn"
					onclick="$('#subdealer-edit-window').jqxWindow('close');">Cancel</div>
			</div>
		</div>
	</div>
</div>