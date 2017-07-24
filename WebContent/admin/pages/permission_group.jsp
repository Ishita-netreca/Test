<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "permission_group");
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
<div pagename="permission_group" class="theme-02">
    <div class="page-submenu-container" style="display:none;">
        <div class="submenu" panelname="permission_group" onclick="WRP.UI.changePanelBySubmenu('permission_group');">
            Permission Group
        </div>
        <div class="border"></div>
    </div>
    <div class="panels" style="height:100%">
        <div class="jqx-horizontal-split-panel" panelname="permission_group">
            <div class="plain-01-panel" style="height:45%;">
                <div class="title-wrapper">
                    <div class="title">
                        Permission Group
                    </div>
                    <div class="sub-title">
                        Group Management
                    </div>
                    <div class="left-input-area">
                        <div class="btn sky" onclick="WRPAdminApp.pagescript.addPermissionPop();">
                            + ADD GROUP
                        </div>
                    </div>
                    <div class="right-input-area">
						<div class="btn sky" id="excel_system_permission_group" style="float:right;">
							Export to Excel
						</div>
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-sys-permission-group-list"></div>
				</div>
            </div>
           <div>
            	<div class="jqx-tab-panel">
            		<ul>
        				<li>Profile</li>
        				<!-- <li>Permission</li> -->
        				<li>Users</li>
        				<li>Permission Setting</li>
        			</ul>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                            <div class="title">
                                Permission Group
                            </div>
                        </div>
                        <div class="content-wrapper" style="margin: 7px 0px 0px 40px;">
                        <div class="line">
                            <div class="grid-1">
                                Name
                            </div>
                            <div class="grid-2">
                                <input type="text" style="width: 100%;" id="sys-conf-permission-group-name" readonly/>
                            </div>
                        </div>
                        </div>
        			</div>
        			<!-- 
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
                        <div class="line" style="margin-top:3px">
                        <div class="grid-6">
                            <div class="plain-02-panel">
                                <div class="title-wrapper">
                                    <div class="title">
                                        Sales Permission
                                    </div>
                                    <div class="left-input-area">
                                    </div>
                                    <div class="right-input-area">
                                        <div class="btn sky" style="top:-4px" onclick="WRPAdminApp.pagescript.saveSalesPermissionInfo();">Save</div>
                                    </div>
                                </div>
                                <div class="content-wrapper">
                                    <div class="content" style="margin-top: 10px;padding: 0px;">
                                        <div class="line" style="font-weight:bold;margin-bottom: 0px;border-bottom: rgba(217,217,217,1) 1px solid;overflow-x:hidden;">
                                            <div class="grid-1">
                                                &nbsp;
                                            </div>
                                            <div class="grid-4">
                                                Functions
                                            </div>
                                            <div class="grid-4" style="text-align: center;">
                                                Description
                                            </div>
                                            <div class="grid-3" style="text-align: center;">
                                                Permission
                                            </div>
                                        </div>
                                        <div class="line" style="height: 285px;">
                                            <div class="permission-set-list" id="sys-conf-sales-permission-set-list">

                                            </div>
                                        </div>
                                        <div class="line" style="margin-top:-10px;min-height: 0px;height: 0px;border-top: rgba(217,217,217,1) 1px solid;">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid-6">
                            <div class="plain-02-panel">
                                <div class="title-wrapper">
                                    <div class="title">
                                        Backend Permission
                                    </div>
                                    <div class="left-input-area">
                                    </div>
                                    <div class="right-input-area">
                                        <div class="btn sky" style="top:-4px" onclick="WRPAdminApp.pagescript.saveBackendPermissionInfo();">Save</div>
                                    </div>
                                </div>
                                <div class="content-wrapper">
                                    <div class="content" style="margin-top: 10px;padding: 0px;">
                                        <div class="line" style="font-weight:bold;margin-bottom: 0px;border-bottom: rgba(217,217,217,1) 1px solid;overflow-x:hidden;">
                                            <div class="grid-1">
                                                &nbsp;
                                            </div>
                                            <div class="grid-4">
                                                Functions
                                            </div>
                                            <div class="grid-4" style="text-align: center;">
                                                Description
                                            </div>
                                            <div class="grid-3" style="text-align: center;">
                                                Permission
                                            </div>
                                        </div>
                                        <div class="line" style="height: 285px;margin-bottom: 0px;">
                                            <div class="permission-set-list" id="sys-conf-backend-permission-set-list">

                                            </div>
                                        </div>
                                        <div class="line" style="margin-top:-10px;min-height: 0px;height: 0px;border-top: rgba(217,217,217,1) 1px solid;">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
        			</div>
        		 	-->
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                            <div class="title">
                                Users
                            </div>
                            <div class="right-input-area">
								<div class="btn sky" id="excel_permission_group_user" style="float:right;">
									Export to Excel
								</div>
                    		</div>
                        </div>
                        <div style="margin: 3px 50px 0px 32px; height:calc(100% - 60px);">
							<div id="sys-permission-group-user-list"></div>
						</div>
        			</div>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
                        <div class="line" style="margin-top:3px;height:100%;">
	                        <div class="grid-6">
	                            <div class="plain-01-panel" style="height: 100%;">
	                                <div class="title-wrapper">
	                                    <div class="title">
	                                        Sales Permission
	                                    </div>
	                                    <div class="left-input-area">
	                                    </div>
	                                    <div class="right-input-area">
	                                        <div class="btn sky" style="top:-4px" onclick="WRPAdminApp.pagescript.saveSalesPermissionInfo();">Save</div>
	                                    </div>
	                                </div>
			                       	<div style="margin: 3px 50px 0px 32px; height:calc(100% - 60px);">
										<div id="group-sales-permission-setting"></div>
									</div>
	                                <!-- <div class="content-wrapper">
	                                    <div class="content" style="margin-top: 10px;padding: 0px;">
	                                    	 <div id="group-sales-permission-setting"></div>
	                                    </div>
	                                </div> -->
	                            </div>
	                        </div>
	                        <div class="grid-6">
	                            <div class="plain-01-panel" style="height: 100%;">
	                                <div class="title-wrapper">
	                                    <div class="title">
	                                        Backend Permission
	                                    </div>
	                                    <div class="left-input-area">
	                                    </div>
	                                    <div class="right-input-area">
	                                        <div class="btn sky" style="top:-4px" onclick="WRPAdminApp.pagescript.setBackendPermissionGroupData();">Save</div>
	                                    </div>
	                                </div>
			                       	<div style="margin: 3px 50px 0px 32px; height:calc(100% - 60px);">
										<div id="group-backend-permission-setting"></div>
									</div>
	                                <!-- <div class="content-wrapper">
	                                    <div class="content" style="margin-top: 10px;padding: 0px;">
	                                        <div id="group-backend-permission-setting"></div>
	                                    </div>
	                                </div>  -->
	                            </div>
	                        </div>
	                     </div>
        			</div>
            	</div>
            </div>
        </div>
    </div>
	<div class="jqx-custom-window" id="permission-new-window">
		<div role="title">Edit</div>
			<div class="line" style="margin: 10px 10px 0px 30px;">
				<div class="line">
					<div class="grid-2">
						Name
					</div>
					<div class="grid-6">
						<input type="text" style="width: 100%;" id="sys-conf-permission-group-name-pop"/>
					</div>
				</div>
				<div class="line"></div>
				<div class="line" style="text-align: center;">
					<div class="btn sky" onclick="WRPAdminApp.pagescript.setPermissionGroupInfo();">Save</div>
				</div>
			</div>
	</div>
</div>