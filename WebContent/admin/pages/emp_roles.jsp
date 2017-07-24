<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    //session.setAttribute("wrp_admin_last_loaded_page", "emp_roles");
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
<div pagename="emp_roles" class="theme-02">
    <div class="page-submenu-container" style="display:none;">
        <!-- <div class="submenu" panelname="emp_roles" onclick="WRP.UI.changePanelBySubmenu('emp_roles');">
            Employee Roles
        </div>
        <div class="border"></div> -->
        <!-- <div class="submenu" panelname="item_category" onclick="WRPAdminApp.setPage('item_category');">
            Item Category
        </div>
        <div class="border"></div> -->
        <div class="submenu" panelname="chart_of_account" onclick="WRPAdminApp.setPage('cashRegister');">
            Station
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="dt_setup" onclick="WRPAdminApp.setPage('dt_setup');">
            Date & Time Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="emp_roles" onclick="WRPAdminApp.setPage('emp_roles');">
            Employee Roles
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="permission_group" onclick="WRPAdminApp.setPage('permission_group');">
            Permission Group
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRPAdminApp.setPage('store_location');">
            Region Setup
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="store_location" onclick="WRPAdminApp.setPage('qpay_favorite_providers');">
            Qpay Favorite
        </div>
    </div>
    <div class="panels" style="height:100%">
        <div class="jqx-horizontal-split-panel" panelname="emp_roles">
            <div class="plain-01-panel" style="height:45%">
                <div class="title-wrapper">
                    <div class="title">
                        Employee Roles
                    </div>
                    <div class="sub-title">
                        Role Management
                    </div>
                    <div class="left-input-area">
                        <div class="btn sky" onclick="WRPAdminApp.pagescript.initRoleInfo();">
                            + ADD ROLE
                        </div>
                    </div>
                    <div class="right-input-area">
						<div class="btn sky" id="excel_system_role" style="float:right;">
							Export to Excel
						</div>
                    </div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
					<div id="jqx-sys-conf-role"></div>
				</div>
            </div>
            <div>
            	<div class="jqx-tab-panel">
            		<ul>
        				<li>Profile</li>
        				<li>User List</li>
        			</ul>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                           <div class="title">
                               Role Profile
                           </div>
                        </div>

                        <div class="line" style="margin: 8px 50px 0px 40px;">
                        <div class="line">
                            <div class="grid-1">
                                Name
                            </div>
                            <div class="grid-2">
                                <input type="text" style="width: 100%;" id="sys-conf-role-name"  readonly/>
                            </div>
                        </div>
                        <div class="line">
                            <div class="grid-1">
                                Description
                            </div>
                            <div class="grid-5">
                                <input type="text" style="width: 100%;" id="sys-conf-role-description" readonly/>
                            </div>
                        </div>
                        </div>
        			</div>
        			<div class="plain-01-panel" style="width: 100%; height: 100%;">
        				<div class="title-wrapper">
                           <div class="title">
                               User List
                           </div>
                           <div class="right-input-area">
                      			<div class="btn sky" id="excel_sys_user_role_list" style="float:right;">
                         			 Export to Excel
                     			 </div>
                    	</div>
                        </div>
                        <div style="margin: 3px 50px 0px 32px; height:calc(100% - 57px);">
							<div id="jqx-sys-conf-user-role-list"></div>
						</div>
        			</div>
            	</div>
            </div>
        </div>
    </div>


    <div class="jqx-custom-window" id="role-new-window">
		<div role="title">Edit</div>
			<div class="line" style="margin: 10px 10px 0px 30px;">
                        <div class="line">
                            <div class="grid-3">
                                Name
                            </div>
                            <div class="grid-3">
                                <input type="text" style="width: 100%;" id="sys-conf-role-name-pop"/>
                            </div>
                        </div>
                        <div class="line">
                            <div class="grid-3">
                                Description
                            </div>
                            <div class="grid-5">
                                <input type="text" style="width: 100%;" id="sys-conf-role-description-pop"/>
                            </div>
                        </div>
				<div class="line"></div>
				<div class="line" style="text-align: center;">
					<div class="btn sky" onclick="WRPAdminApp.pagescript.setRoleInfo();">Save</div>
				</div>
			</div>
	</div>
</div>