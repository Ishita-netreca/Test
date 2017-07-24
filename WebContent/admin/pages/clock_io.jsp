<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "clock_io");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
    JSONObject permissionData = null;
    if (!isOwner && owner_id != null && storeId != null) {
     //   permissionData = (JSONObject) ((JSONObject) UtilMethodClass.getSingleton().getPermissionData(owner_id, storeId, userId)).get("Clock In / Out");
    }
    String user_sid = (session.getAttribute("wrp_admin_login_user_sid") != null)? session.getAttribute("wrp_admin_login_user_sid").toString() : null;
    
    JSONObject obj = null;
%>
<div pagename="clock_io" class="theme-02">
    <div class="page-submenu-container">
        <div class="submenu" panelname="schedule" onclick="WRP.UI.changePanelBySubmenu('schedule');">
            Schedule
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="history" onclick="WRP.UI.changePanelBySubmenu('history');">
            History
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="time_adjust" onclick="WRP.UI.changePanelBySubmenu('time_adjust');">
            Time Adjust
        </div>
        <div class="border"></div>
        <div class="submenu" panelname="time_off" onclick="WRP.UI.changePanelBySubmenu('time_off');">
            Time Off
        </div>
<%
	//if (user_sid.equals("8")) {
%>
        <div class="border"></div>
        <div class="submenu" panelname="simple_adjustment" onclick="WRP.UI.changePanelBySubmenu('simple_adjustment');">
            Simple Adjustment
        </div>
<%
	//}
%>
    </div>
    <div class="panels">
        <div class="split-panel" panelname="schedule" style="display: block;">
            <div class="plain-01-panel" style="height: 55%;">
                <div class="title-wrapper">
                    <div class="title">
                        Work Schedule
                    </div>
                    <div class="sub-title">
                        Schedule Management
                    </div>
                    <div class="left-input-area">
							<div class="jqx-plain-button" style="width:80px;" id="work-schedule-show-all">Show All</div>
					</div>
                    <div class="right-input-area" style="width:58%;">
                    	<div class="line" style="float:right;overflow: hidden;">
                    		<div class="grid-2_5" style="margin-left:3px;">
								<div id="last-week"  class="jqx-plain-button"  style="width:100px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getLastWeekScheduleData);">Copy Schedule</div>
							</div>
							<div class="grid-3" style="margin-left:3px;width:80px;">
								<div class="jqx-plain-button" id="schedule-save" style="width:60px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.saveWeekWorkScheduleData);">Save</div>
							</div>
							<div class="grid-2-5" style="margin-left:0px;width:100px;">
								<div class="jqx-date-input" id="clockio-schedule-start-date"></div>
							</div>
							<div class="grid-2-5" style="margin-left:7px;width:100px;margin-right:5px;">
								<div class="jqx-date-input" id="clockio-schedule-end-date"></div>
							</div>
							<input type="text" class="jqx-text-input" id="clock-io-schedule-search-keyword" placeholder="keyword" style="width:100px;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.searchWeeklySchedule(); }"/>
                    		<div class="jqx-plain-button" style="width:60px; display:inline-block;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.searchWeeklySchedule);" >Apply</div>
                    	</div>
                    </div>
                </div>
                <div class="content-wrapper" style="margin-left: 32px; margin-right: 50px;">
                    <div class="content" style="padding: 0px 0px;">
                    	<span id="clock-io-schedule-btn-visible">
                        </span>
                        <!-- <div class="btn green" style="z-index: 1;position: absolute; right: 195px; top: 50px;" onclick="WRPAdminApp.pagescript.getLastWeekScheduleData();">GET LAST WEEK SCHEDULE</div>
                        <div class="btn sky" style="z-index: 1;position: absolute; right: 80px; top: 50px;" onclick="WRPAdminApp.pagescript.saveWeekWorkScheduleData();">SCHEDULE SAVE</div> -->
                        <div class="line" id="clock-io-scheduler-week-ctrl">
                        </div>
                        <div class="line" style="height: calc(100% - 40px);">
	                        <table class="header-fixed-table fill-height-parent" height="175">
	                            <thead>
	                                <tr id="clock-io-work-schedule-list-header">
	                                    <th>ID</th>
	                                    <th width="11.5%">Mon</th>
	                                    <th width="11.5%">Tue</th>
	                                    <th width="11.5%">Wed</th>
	                                    <th width="11.5%">Thu</th>
	                                    <th width="11.5%">Fri</th>
	                                    <th width="11.5%">Sat</th>
	                                    <th width="11.5%">Sun</th>
	                                    <th width="4.2%">Total</th>
	                                    <th width="4.2%">OT</th>
	                                </tr>
	                            </thead>
	                            <tbody id="clock-io-work-schedule-list">
	
	                            </tbody>
	                        </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="plain-01-panel" style="height: 45%;">
                <div class="title-wrapper" style="margin: 0px 82px 0px 42px; padding-top: 20px;">
                    <div class="title" style="margin-left: -15px; font-size: 13px;">
                        Weekly Schedule
                    </div>
                </div>
                <div class="content-wrapper">
                    <div class="content" style="padding: 0px 0px;">
                        <table class="header-fixed-table fill-height-parent" height="175">
                            <thead>
                                <tr id="clock-io-weekly-schedule-graph-list-header">
                                    <th>ID</th>
                                    <th width="11.5%">Mon, <span></span></th>
                                    <th width="11.5%">Tue, <span></span></th>
                                    <th width="11.5%">Wed, <span></span></th>
                                    <th width="11.5%">Thu, <span></span></th>
                                    <th width="11.5%">Fri, <span></span></th>
                                    <th width="11.5%">Sat, <span></span></th>
                                    <th width="11.5%">Sun, <span></span></th>
                                    <th width="4.2%">Total</th>
                                    <th width="4.2%">OT</th>
                                </tr>
                            </thead>
                            <tbody id="clock-io-weekly-schedule-graph-list">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="plain-01-panel" panelname="history" style="display: none;">
            <div class="title-wrapper">
                <div class="title">
                    Clock In / Out History
                </div>
                <div class="sub-title">
                    History Management
                </div>
                <div class="left-input-area">
                <!-- 
                	<div class="btn red" onclick="$('#jqx-clock-io-history-list').jqxGrid('clearfilters');">
                		Show All
                	</div> -->
                	<div class="grid-1">
						<div class="jqx-plain-button" id="clockio-history-show-all" style="width:65px;">Clear</div>
					</div>
                </div>
                 <div class="right-input-area" style="width:580px;">
					<div class="line" style="overflow: hidden;">
						<div class="grid-1" style="width:50px;">
							<div class="jqx-radio-button" id="history-radio-1" groupName="ClockIOHistory">Today</div>
						</div>
						<div class="grid-1" style="width:60px;">
							<div class="jqx-radio-button" id="history-radio-2" groupName="ClockIOHistory">1 Week</div>
						</div>
						<div class="grid-1-5" style="width:80px;">
							<div class="jqx-radio-button" id="history-radio-3" groupName="ClockIOHistory">1 Month</div>
						</div>
						<div class="grid-2-5" style="margin-left:0px;width:100px;">
							<div class="jqx-date-input" id="clockio-history-start-date"></div>
						</div>
						<div class="grid-2-5" style="margin-left:7px;width:100px;">
							<div class="jqx-date-input" id="clockio-history-end-date"></div>
						</div>
						<div class="grid-1" style="margin-left:7px;width:70px;">
							<div class="jqx-plain-button" id="clockio-history-apply" style="width:65px;">Apply</div>
						</div>
						<div class="grid-1" style="margin-left:5px;width:70px;">
							<div class="jqx-plain-button" id="excel-clockio-history" style="width:65px;">Excel</div>
						</div>
						
					</div>
				</div>
                 <!--  -->
            </div>
            <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
        		<div id="jqx-clock-io-history-list"></div>
			</div>
        </div>
        <div class="jqx-horizontal-split-panel" panelname="time_adjust" style="display: none;">
            <div class="plain-01-panel" style="height: 45%;">
                <div class="title-wrapper">
                    <div class="title">
                        Clock In / Out Time Adjustment
                    </div>
                    <div class="sub-title">
                        Request Management
                    </div>
                    <div class="right-input-area" style="width:580px;">
						<div class="line" style="overflow: hidden;">
							<div class="grid-1" style="width:50px;">
								<div class="jqx-radio-button" id="time-adj-radio-1" groupName="TimeAdjust">Today</div>
							</div>
							<div class="grid-1" style="width:60px;">
								<div class="jqx-radio-button" id="time-adj-radio-2" groupName="TimeAdjust">1 Week</div>
							</div>
							<div class="grid-1-5" style="width:80px;">
								<div class="jqx-radio-button" id="time-adj-radio-3" groupName="TimeAdjust">1 Month</div>
							</div>
							<div class="grid-2-5" style="margin-left:0px;width:100px;">
								<div class="jqx-date-input" id="clockio-time-adjust-start-date"></div>
							</div>
							<div class="grid-2-5" style="margin-left:7px;width:100px;">
								<div class="jqx-date-input" id="clockio-time-adjust-end-date"></div>
							</div>
							<div class="grid-1" style="margin-left:7px;width:70px;">
								<div class="jqx-plain-button" id="time-adjust-search-btn" style="width:65px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getClockIOAdjListInStore);">Apply</div>
							</div>
							<div class="grid-1" style="margin-left:5px;width:70px;">
								<div class="jqx-plain-button" id="excel_clock_io_adjust" style="width:65px;">Excel</div>
							</div>
						</div>
					</div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
        			<div id="jqx-clock-io-adjust-req-list"></div>
				</div>
            </div>
            <div class="plain-01-panel" style="height: 55%;">
				<div class="title-wrapper">
					<div class="title">
						Time Adjust Request Information
					</div>
				</div>
				<div class="line" id="clock-io-adj-container" style="margin: 7px 0px 0px 40px;">
                    <div class="user-photo">

                    </div>
                    <div class="line">
                        <div class="grid-25">
                            Employee ID
                        </div>
                        <div class="grid-2-5">
                            <input type="text" id="clock-io-adj-user-id" readonly/>
                        </div>
                        <div class="grid-1">
                            Mobile
                        </div>
                        <div class="grid-2-5">
                            <input type="text" id="clock-io-adj-mobile-no" readonly/>
                        </div>
                    </div>
                    <div class="line border-bottom">
                        Clock In/Out - <span id="clock-io-adj-date"></span>
                    </div>
                    <div class="line">
                        <div class="grid-2">
                            Status
                        </div>
                        <div class="grid-2">
                            Start
                        </div>
                        <div class="grid-2">
                            End
                        </div>
                        <div class="grid-2">
                            Total Hour
                        </div>
                    </div>
                    <div class="line">
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-adj-status" readonly>
                        </div>
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-adj-start" readonly>
                        </div>
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-adj-end" readonly>
                        </div>
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-adj-total-hour" readonly>
                        </div>
                    </div>
                    <div class="line border-bottom">
                        Adjustment Request
                        <div class="btn sky adj-for-accept-only" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setClockIOAdjInfo);">UPDATE</div>
                        <div class="btn red adj-for-reject-only" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.rejectClockIOAdj);">DECLINE</div>
                    </div>
                    <div class="line adj-for-accept-only">
                         <div class="grid-2">
                            Status
                        </div>
                        <div class="grid-2">
                            Start
                        </div>
                        <div class="grid-2">
                            End
                        </div>
                        <div class="grid-2">
                            Total Hour
                        </div>
                    </div>
                    <div class="line adj-for-accept-only">
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-adj-adj-status" readonly/>
                        </div>
                        <div class="grid-2 time">
                        	<div class="jqx-datetime-input" id="clock-io-adj-adj-start"></div>
                            <!-- <input type="text" id="clock-io-adj-adj-start" class="wrp-timepicker" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcAdjWorkHour(); }" onchange="WRPAdminApp.pagescript.calcAdjWorkHour();" /> -->
                        </div>
                        <div class="grid-2 time">
                        	<div class="jqx-datetime-input" id="clock-io-adj-adj-end"></div>
                            <!-- <input type="text" id="clock-io-adj-adj-end" class="wrp-timepicker" onkeydown="if (event.keyCode == 13) { WRPAdminApp.pagescript.calcAdjWorkHour(); }" onchange="WRPAdminApp.pagescript.calcAdjWorkHour();" /> -->
                        </div>
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-adj-adj-total-hour" readonly/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="jqx-horizontal-split-panel" panelname="time_off" style="display: none;">
            <div class="plain-01-panel" style="height: 45%;">
                <div class="title-wrapper">
                    <div class="title">
                        Time Off
                    </div>
                    <div class="sub-title">
                        Request Management
                    </div>
                    <div class="right-input-area" style="width:580px;">
						<div class="line" style="overflow: hidden;">
							<div class="grid-1" style="width:50px;">
								<div class="jqx-radio-button" id="time-off-radio-1" groupName="TimeOff">Today</div>
							</div>
							<div class="grid-1" style="width:60px;">
								<div class="jqx-radio-button" id="time-off-radio-2" groupName="TimeOff">1 Week</div>
							</div>
							<div class="grid-1-5" style="width:80px;">
								<div class="jqx-radio-button" id="time-off-radio-3" groupName="TimeOff">1 Month</div>
							</div>
							<div class="grid-2-5" style="margin-left:0px;width:100px;">
								<div class="jqx-date-input" id="clockio-time-off-start-date"></div>
							</div>
							<div class="grid-2-5" style="margin-left:7px;width:100px;">
								<div class="jqx-date-input" id="clockio-time-off-end-date"></div>
							</div>
							<div class="grid-1" style="margin-left:7px;width:70px;">
								<div class="jqx-plain-button" id="time-off-search-btn" style="width:65px;" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.getTimeOffList);">Apply</div>
							</div>
							<div class="grid-1" style="margin-left:5px;width:70px;">
								<div class="jqx-plain-button" id="excel_clock_io_timeoff" style="width:65px;">Excel</div>
							</div>
						</div>
					</div>
                </div>
                <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
        			<div id="jqx-clock-io-timeoff-list"></div>
				</div>
            </div>
            <div class="plain-01-panel" style="height: 55%;">
            	<div class="title-wrapper">
            		<div class="title">
                        Time Off Request Information
                    </div>
            	</div>
                <div class="line" id="clock-io-timeoff-req-container" style="margin: 7px 0px 0px 40px;">
                    <div class="user-photo">

                    </div>
                    <div class="line">
                        <div class="grid-25">
                            Employee ID
                        </div>
                        <div class="grid-2-5">
                            <input type="text" id="clock-io-timeoff-user-id" readonly/>
                        </div>
                        <div class="grid-1">
                            Mobile
                        </div>
                        <div class="grid-2-5">
                            <input type="text" id="clock-io-timeoff-mobile-no" readonly/>
                        </div>
                    </div>
                    <div class="line border-bottom">
                        Request Day - <span id="clock-io-timeoff-date-count"></span>
                    </div>
                    <div class="line">
                        <div class="grid-2">
                            Start Date
                        </div>
                        <div class="grid-2">
                            End Date
                        </div>
                        <div class="grid-2">
                            Paid / Unpaid
                        </div>
                    </div>
                    <div class="line">
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-timeoff-start-date" readonly />
                        </div>
                        <div class="grid-2 time">
                            <input type="text" id="clock-io-timeoff-end-date" readonly />
                        </div>
                        <div class="grid-2 time" id="clock-io-timeoff-paid-flag">
                            
                        </div>
                    </div>
                    <div class="line border-bottom">
                        Adjustment Date
                    </div>
                    <div class="line off-for-accept-only">
                        <div class="grid-2">
                            Start Date
                        </div>
                        <div class="grid-2">
                            End Date
                        </div>
                        <div class="grid-2">
                            Set Paid
                        </div>
                    </div>
                    <div class="line off-for-accept-only">
                        <div class="grid-2 time">
                            <input type="text" class="jquery-datepicker" id="clock-io-timeoff-adj-start-date" readonly style="background-color: rgba(255,255,255,1);"/>
                        </div>
                        <div class="grid-2 time">
                            <input type="text" class="jquery-datepicker" id="clock-io-timeoff-adj-end-date" readonly style="background-color: rgba(255,255,255,1);"/>
                        </div>
                        <div class="grid-2 time">
                            <select id="clock-io-timeoff-adj-paid-flag">
                            	<option value="1">Paid</option>
                            	<option value="0">Unpaid</option>
                            </select>
                        </div>
                    </div>
                    <div class="line" style="min-height: 5px;">
                    </div>
                    <div class="line">
                        <div class="btn sky off-for-accept-only" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.setTimeoff);">UPDATE</div>
                        <div class="btn red off-for-reject-only" onclick="WRPAdminApp.EventsModule.onclick(WRPAdminApp.pagescript.rejectTimeOff);">DECLINE</div>
                    </div>
                </div>
            </div>
        </div>
           <div class="plain-01-panel" panelname="simple_adjustment" style="display: none;">
               <div class="title-wrapper">
                   <div class="title">
                       Simple Time Adjustment
                   </div>
                   <div class="sub-title">
                   </div>
                   <div class="right-input-area" style="width:710px;">
					<div class="line">
						<div class="grid-4">&nbsp;</div>
						<div class="grid-1_5" style="width:80px;">
							<div class="jqx-radio-button" id="simple-time-adj-today" style="width:80px; display:inline-block;">Today</div>
						</div>
						<div class="grid-2_5" style="width:105px;margin-left:1%;">
							<div class="jqx-date-input" id="simple-time-adj-date"></div>
						</div>
						<div class="grid-2-5">
							<input type="text" id="simple-time-adj-emp-search" placeholder="Search employee" style="width:100%;" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getEmpClockIOHistory(); }"/>
						</div>
						<div class="grid-1_5" style="margin-left:2px;">
							<div class="jqx-plain-button" style="width:80px;" onclick="WRPAdminApp.pagescript.getEmpClockIOHistory();">Search</div>
						</div>
					</div>
				</div>
               </div>
               <div style="margin: 3px 50px 0px 32px; height:calc(100% - 53px);">
       			<div id="jqx-clock-io-emp-list"></div>
			</div>
           </div>
           <div class="plain-01-panel" style="height: 55%;">
           	<div class="title-wrapper">
           		<div class="title">
                   </div>
           	</div>
               <div class="line" id="" style="margin: 7px 0px 0px 40px;">
                   
               </div>
           </div>
    </div>
    
    <div class="jqx-custom-window" id="clock-io-history-detail-window">
	 	<div role="title">
	 		Clock in/out Detail
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
			<div id="clock-io-history-detail-list"></div>
			<div class="line" style="text-align: right;margin-top:5px;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#clock-io-history-detail-window').jqxWindow('close');">Close</div>
			</div>
	 	</div>
    </div>
    <div class="jqx-custom-window" id="clock-io-simple-adjust-window">
	 	<div role="title">
	 		Clock in/out Adjustment
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-2">
	 				Employee
	 			</div>
	 			<div class="grid-4" id="simple-adjust-clock-io-employee"></div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-2">
	 				Clock in/out Date
	 			</div>
	 			<div class="grid-4" id="simple-adjust-clock-io-date"></div>
	 		</div>
	 		<div class="line" style="margin-top:15px;margin-bottom: 3px;overflow-y:hidden;">
	 			<div class="grid-5-5" style="font-weight:bold;height:20px;line-height: 27px;">Original</div>
	 			<div class="grid-6" style="font-weight:bold;">
	 				Adjust
	 				<div class="jqx-plain-button" style="display:inline-block;width:50px;height:13px;font-weight:normal;" onclick="WRPAdminApp.pagescript.openAddClockIO();">Add</div>
	 			</div>
	 		</div>
	 		<div class="line" style="height:320px; margin-bottom: 3px;">
	 			<div class="grid-5-5">
	 				<div id="jqx-adjust-clock-io-original"></div>
	 			</div>
	 			<div class="grid-6-5">
	 				<div id="jqx-adjust-clock-io-edit"></div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-5-5">
					<span style="margin-left:10px;">Work : </span> <span id="original-work-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Lunch : </span> <span id="original-lunch-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Break : </span> <span id="original-break-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Total : </span> <span id="original-total-total" style="margin-left:5px;">0.00</span>	 			
	 			</div>
	 			<div class="grid-6-5">
					<span style="margin-left:10px;">Work : </span> <span id="adjust-work-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Lunch : </span> <span id="adjust-lunch-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Break : </span> <span id="adjust-break-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Total : </span> <span id="adjust-total-total" style="margin-left:5px;">0.00</span>	 			
	 			</div>
	 		</div>
			<div class="line">Memo</div>
			<textarea rows="6" style="width:100%" id="simple-adjust-clock-io-memo"></textarea>
			<div class="line" style="text-align: center;margin-top: 15px;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="WRPAdminApp.pagescript.openConfirmClockIO();">Submit</div>
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#clock-io-simple-adjust-window').jqxWindow('close');">Cancel</div>
			</div>
	 	</div>
    </div>
    <div class="jqx-custom-window" id="clock-io-simple-adjust-edit-window">
	 	<div role="title">
	 		Clock in/out Adjustment
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line" style="height:40px;">&nbsp;</div>
			<div class="line">
				<div class="grid-1">&nbsp;</div>
				<div class="grid-1">Type : </div>
				<div class="grid-3">
					<select id="simple-adjust-edit-type" style="width:100%;">
						<option value="0" selected>Work</option>
						<option value="2">Lunch</option>
						<option value="1">Break</option>
					</select>
				</div>
			</div>
			<div class="line" style="line-height: 25px;">
				<div class="grid-1">&nbsp;</div>
				<div class="grid-1">Start : </div>
				<div class="grid-3">
					<div class="jqx-datetime-input" id="simple-adjust-edit-start"></div>
				</div>
				<div class="grid-1">&nbsp;</div>
				<div class="grid-1">End : </div>
				<div class="grid-3">
					<div class="jqx-datetime-input" id="simple-adjust-edit-end"></div>
				</div>
			</div>
			<div class="line" style="height:40px;">&nbsp;</div>
			<div class="line" style="text-align: center;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="WRPAdminApp.pagescript.addAdjustClockIO();">Submit</div>
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#clock-io-simple-adjust-edit-window').jqxWindow('close');">Cancel</div>
			</div>
	 	</div>
    </div>
    <div class="jqx-custom-window" id="clock-io-simple-adjust-confirm-window">
	 	<div role="title">
	 		Clock in/out Adjustment
	 	</div>
	 	<div role="content" class="jqx-full-sized-dock-panel">
	 		<div class="line">
	 			<div class="grid-1-5">
	 				Store
	 			</div>
	 			<div class="grid-4" id="simple-adjust-clock-io-confirm-store"><%=storeId %></div>
	 			<div class="grid-2">
	 				Manager
	 			</div>
	 			<div class="grid-4" id="simple-adjust-clock-io-confirm-manager"><%=userId %></div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-1-5">
	 				Employee
	 			</div>
	 			<div class="grid-4" id="simple-adjust-clock-io-confirm-emp"></div>
	 			<div class="grid-2">
	 				Clock in/out Date
	 			</div>
	 			<div class="grid-4" id="simple-adjust-clock-io-confirm-date"></div>
	 		</div>
	 		<div class="line" style="margin-top:15px;margin-bottom: 3px;overflow-y:hidden;">
	 			<div class="grid-5-5" style="font-weight:bold;height:20px;line-height: 27px;">Original</div>
	 			<div class="grid-6" style="font-weight:bold;height:20px;line-height: 27px;">Adjust</div>
	 		</div>
	 		<div class="line" style="height:320px;margin-bottom:3px;">
	 			<div class="grid-5-5">
	 				<div id="jqx-adjust-clock-io-confirm-original"></div>
	 			</div>
	 			<div class="grid-6-5">
	 				<div id="jqx-adjust-clock-io-confirm-edit"></div>
	 			</div>
	 		</div>
	 		<div class="line">
	 			<div class="grid-5-5">
					<span style="margin-left:10px;">Work : </span> <span id="confirm-original-work-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Lunch : </span> <span id="confirm-original-lunch-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Break : </span> <span id="confirm-original-break-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Total : </span> <span id="confirm-original-total-total" style="margin-left:5px;">0.00</span>	 			
	 			</div>
	 			<div class="grid-6-5">
					<span style="margin-left:20px;">Work : </span> <span id="confirm-adjust-work-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Lunch : </span> <span id="confirm-adjust-lunch-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Break : </span> <span id="confirm-adjust-break-total" style="margin-left:5px;">0.00</span>	 			
					<span style="margin-left:20px;">Total : </span> <span id="confirm-adjust-total-total" style="margin-left:5px;">0.00</span>	 			
	 			</div>
	 		</div>
			<div class="line">Memo</div>
			<textarea rows="6" style="width:100%" id="simple-adjust-clock-io-confirm-memo" readonly></textarea>
			<div class="line" style="text-align: center;margin-top: 15px;">
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="WRPAdminApp.pagescript.confirmSimpleAdjust();">Confirm</div>
				<div class="jqx-plain-button" style="height:22px;line-height:22px;display: inline-block;" onclick="$('#clock-io-simple-adjust-confirm-window').jqxWindow('close');">Close</div>
			</div>
	 	</div>
    </div>
</div>