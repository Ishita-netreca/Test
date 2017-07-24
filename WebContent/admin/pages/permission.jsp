<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    //session.setAttribute("wrp_admin_last_loaded_page", "permission");
%>
<div pagename="permission" class="theme-02" style="height:100%;">
    <div class="jqx-tab-panel" id="permission-main-tab" style="width:99.5%; height: 99.5%;">
    	<ul>
    	 	<li>USER</li>
    		<li>GROUP</li>
    	</ul>
    	
		<div class="plain-01-panel">
			<div class="title-wrapper">										
				<div class="left-input-area" style="width: calc(99% - 120px);">	
					<div class="grid-3">
						<input type="text" style="width:100%;height: 27px;" id="permission-user-search-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.searchUserListOwnedByOwner(); }"/>
					</div>
					<div class="grid-3">
						<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.searchUserListOwnedByOwner();">SEARCH</div>
					</div>
				</div>
				<div class="right-input-area" style="width:120px; text-align:right;">
					
				</div>
			</div>
			<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height:calc(100% - 53px);">								
				<div id="permission-user-user-list"></div>
			</div>
		</div>
		<div class="jqx-horizontal-split-panel">	
			<div class="plain-01-panel">			
				<div class="title-wrapper">										
					<div class="left-input-area" style="width: calc(99% - 120px);"> 	
						<div class="grid-3">
							<input type="text" style="width:100%;height: 27px;" id="permission-group-search-keyword" onkeydown=""/>
						</div>
						<div class="grid-3">
							<div class="jqx-plain-button" style="display:inline-block; width: 80px" onclick="WRPAdminApp.pagescript.getPermissionGroupList();">SEARCH</div>
						</div>
					</div>
					<div class="right-input-area" style="width:120px; text-align:right;">
						<div class="jqx-plain-button" style="width:80px; display: inline-block;" onclick="WRPAdminApp.pagescript.initSetPermissionGroupWindow();">ADD</div>
					</div>
				</div>
				<div class="content-wrapper" style="margin: 0px 50px 0px 32px; height:calc(100% - 53px);">								
					<div id="permission-group-group-list"></div>
				</div>
			</div>
			<div class="plain-01-panel" style="height: 40%">
				<div class="jqx-tab-panel">
			    	<ul>
			    	<!-- <li>PROFILE</li> -->	
			    		<li>USERS</li>
			    		<li>PERMISSION</li>
			    	</ul>
			    	<!--
			    	<div style="padding: 10px 15px;">
			    		<div class="line" style="font-weight: bold;">
			    			NAME <span style="font-weight: normal" id="permission-group-detail-name"></span>
			    		</div>
			    		<div class="line" style="font-weight: bold;">
			    			DESCRIPTION <span style="font-weight: normal" id="permission-group-detail-description"></span>
			    		</div>
			    	</div>
			    	-->
			    	<div style="padding: 10px 15px;">    	
   						<div id="permission-group-detail-permission-users-list">
   						</div>
			    	</div>
			    	<div style="padding: 10px 15px;">
				    	<div class="line">
		    				<div class="grid-6">
		    					<div class="line">
		    						Sales Permission
		    					</div>
		    					<div class="line" style="height: 250px">
		    						<div id="permission-group-detail-permission-struct-sales">
		    						</div>
		    					</div>
		    				</div>
		    				<div class="grid-6">
		    					<div class="line">
		    						Backend Permission
		    					</div>
		    					<div class="line" style="height: 250px">    						
		    						<div id="permission-group-detail-permission-struct-backend">
		    						</div>
		    					</div>
		    				</div>
		    			</div>
			    	</div>
			    </div>
			</div>
		</div>
    </div>
    <div class="jqx-custom-window" id="permission-set-permission-user-window">
    	<div role="title">
    		PERMISSION USER
    	</div>
    	<div role="content" style="padding: 10px 15px;">
    		<div class="line" style="margin-top: 5px;">
    			<div class="grid-6" style="font-weight: bold;">
    				ID <span style="font-weight: normal" id="set-permission-user-id"></span>
    			</div>
    			<div class="grid-6" style="font-weight: bold;">
    				NAME <span style="font-weight: normal" id="set-permission-user-name"></span>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-6">
    				Sales Permission
    			</div>
    			<div class="grid-6">
    				Backend Permission
    			</div>
    		</div>
    		<div class="line" style="height: 240px;">
    			<div class="grid-6">
    				<div id="set-permission-user-permission-struct-sales">
    					
    				</div>
    			</div>
    			<div class="grid-6">
    				<div id="set-permission-user-permission-struct-backend">
    				</div>
    			</div>
    		</div>
    		<div class="line">
    			<div class="grid-6">
    				<div class="grid-6" style="text-align: right;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-user-permission-struct-sales', true);">SELECT ALL</div>
    				</div>
    				<div class="grid-6" style="text-align: left;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-user-permission-struct-sales', false);">DESELECT ALL</div>
    				</div>
    			</div>
    			<div class="grid-6">
    				<div class="grid-6" style="text-align: right;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-user-permission-struct-backend', true);">SELECT ALL</div>
    				</div>
    				<div class="grid-6" style="text-align: left;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-user-permission-struct-backend', false);">DESELECT ALL</div>
    				</div>
    			</div>
    		</div>
    		<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:80px; display: inline-block;" onclick="WRPAdminApp.pagescript.confirmSetPermissionUserInfo();">SUBMIT</div>
				<div class="jqx-plain-button" style="width:80px; display: inline-block;" onclick="$('#permission-set-permission-user-window').jqxWindow('close');">CLOSE</div>
    		</div>
    	</div>
    </div>
    
    <div class="jqx-custom-window" id="permission-set-permission-group-window">
    	<div role="title">
    		PERMISSION GROUP
    	</div>
    	<div role="content" style="padding: 10px 15px; ">
   			<div class="line">
				Enter Permission Group Information
			</div>
			<div class="line">
				Name
			</div>
			<div class="line">
				<input type="text" style="width: 100%;" id="set-permission-group-name"/>
			</div>
			<div class="line">
				Description
			</div>
			<div class="line">
				<input type="text" style="width: 100%;" id="set-permission-group-description"/>
			</div>
   			<div class="line">
   				<div class="grid-6">
   					<div class="line">
   						Sales Permission
   					</div>
   					<div class="line" style="height: 320px">
   						<div id="set-permission-group-permission-struct-sales">
   						</div>
   					</div>
   				</div>
   				<div class="grid-6">
   					<div class="line">
   						Backend Permission
   					</div>
   					<div class="line" style="height: 320px">    						
   						<div id="set-permission-group-permission-struct-backend">
   						</div>
   					</div>
   				</div>
   			</div>
    		<div class="line" style="text-align: center;">
    			<div class="grid-6">
    				<div class="grid-6" style="text-align: right;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-group-permission-struct-sales', true);">SELECT ALL</div>
    				</div>
    				<div class="grid-6" style="text-align: left;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-group-permission-struct-sales', false);">DESELECT ALL</div>
    				</div>
    			</div>
    			<div class="grid-6">
    				<div class="grid-6" style="text-align: right;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-group-permission-struct-backend', true);">SELECT ALL</div>
    				</div>
    				<div class="grid-6" style="text-align: left;">
    					<div class="jqx-plain-button" style="max-width: 90%; min-width: 120px; display: inline-block;" onclick="WRPAdminApp.pagescript.toggleSetAllChecked('set-permission-group-permission-struct-backend', false);">DESELECT ALL</div>
    				</div>
    			</div>
    		</div>
   			<div class="line" style="text-align: center;">    				
				<div class="jqx-plain-button" style="width:80px; display: inline-block;" onclick="WRPAdminApp.pagescript.confirmSetPermissionGroupInfo();">SUBMIT</div>
				<div class="jqx-plain-button" style="width:80px; display: inline-block;" onclick="$('#permission-set-permission-group-window').jqxWindow('close');">CLOSE</div>
   			</div>
    	</div>
    </div>
    
    <div class="jqx-custom-window" id="permission-set-permission-group-users-window">
    	<div role="title">
    		PERMISSION USERS
    	</div>
    	<div role="content" style="padding: 10px 15px;">
    		<div class="line" style="margin-top: 5px;">  			
	    		<div class="line" style="font-weight: bold;">
	    			NAME <span style="font-weight: normal" id="set-permission-group-users-name"></span>
	    		</div>
	    		<div class="line" style="font-weight: bold;">
	    			DESCRIPTION <span style="font-weight: normal" id="set-permission-group-users-description"></span>
	    		</div>
    		</div>
    		<div class="line">
    			Select users
    		</div>
    		<div class="line" style="height: 220px;">
				<div id="set-permission-group-users-user-list">
				</div>
    		</div>
    		<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="width:80px; display: inline-block;" onclick="WRPAdminApp.pagescript.confirmSetPermissionGroupUsersInfo();">SUBMIT</div>
				<div class="jqx-plain-button" style="width:80px; display: inline-block;" onclick="$('#permission-set-permission-group-users-window').jqxWindow('close');">CLOSE</div>
    		</div>
    	</div>
    </div>
    
</div>