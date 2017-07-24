<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "rateplan");
%>
<div pagename="rateplan" class="theme-01">
    <div class="page-title-wrapper">
        <div class="page-title">
            Rate Plan
        </div>
        <div class="page-sub-title">
            information Management
        </div>
        <div class="left-input-area">
            <div class="btn sky" onclick="WRPAdminApp.pagescript.initRateplanEditContainer();">
                + ADD RATEPLAN
            </div>
			<div class="btn sky" onclick="WRPAdminApp.pagescript.syncFeeList();">Sync</div>
		</div>
        <div class="right-input-area">
            <label for="rateplan-search-type-1"><input type="radio" name="rateplanSearchType" id="rateplan-search-type-1" value="1"/>Rateplan Code</label>
            <label for="rateplan-search-type-2"><input type="radio" name="rateplanSearchType" id="rateplan-search-type-2" value="2"/>Description</label>
            <label for="rateplan-search-type-0"><input type="radio" name="rateplanSearchType" id="rateplan-search-type-0" value="0" checked/>ALL</label>
            <div class="search-container">
                <input type="text" placeholder="Keyword" id="rateplan-search-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getRateplanList(this.value); }"/>
                <div class="right-btn" onclick="WRPAdminApp.pagescript.getRateplanList();">
                </div>
            </div>
        </div>
    </div>
    <div class="page-content-wrapper">
        <div class="page-content">
            <table class="header-fixed-table fill-height-parent" height="520">
                <thead>
                    <tr>
                        <th width="13.3%">Rateplan Code</th>
                        <th width="16.7%">Carrier</th>
                        <th>Description</th>
                        <th width="11.1%">Plan Type</th>
                        <th width="11.1%">Group Type</th>
                        <th width="8.9%">MRC</th>
                    </tr>
                </thead>
                <tbody id="rateplan-list">

                </tbody>
            </table>
        </div>
    </div>
    <div class="popup-area">
        <div class="popup-container" popupname="rateplanEditContainer">
            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                RATEPLAN MANAGEMENT
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            <div class="left-area">Rateplan Information</div>
                            <div class="right-area text_right"><div class="btn sky" onclick="WRPAdminApp.pagescript.setRateplanData();">SAVE INFORMATION</div></div>
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-3">
                                    Rateplan Code
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="rateplan-edit-rateplan-code"/>
                                </div>
                                <div class="grid-3">
                                    Carrier
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="rateplan-edit-carrier"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Description
                                </div>
                                <div class="grid-9">
                                    <input type="text" id="rateplan-edit-description"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Plan Type
                                </div>
                                <div class="grid-3">
                                    <select id="rateplan-edit-plan-type">
                                        <option value="0">Voice</option>
                                        <option value="1">Feature</option>
                                    </select>
                                </div>
                                <div class="grid-3">
                                    Group Type
                                </div>
                                <div class="grid-3">
                                    <select id="rateplan-edit-group-type">
                                        <option value="0">Individual</option>
                                        <option value="1">Family</option>
                                    </select>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    MRC
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="rateplan-edit-mrc"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Reactivation Plan
                                </div>
                                <div class="grid-3">
                                    <input type="checkbox" id="rateplan-edit-react-plan-flag"/>
                                </div>
                                <div class="grid-3">
                                    Upgrade Plan
                                </div>
                                <div class="grid-3">
                                    <input type="checkbox" id="rateplan-edit-upgrade-plan-flag"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Start Date
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="rateplan-edit-start-date" class="jquery-datepicker"/>
                                </div>
                                <div class="grid-3">
                                    End Date
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="rateplan-edit-end-date" class="jquery-datepicker"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Disable
                                </div>
                                <div class="grid-3">
                                    <input type="checkbox" id="rateplan-edit-disable"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>