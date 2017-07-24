<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page", "employee");
%>
<div pagename="employee" class="theme-01">
    <div class="page-title-wrapper">
        <div class="page-title">
            Employee
        </div>
        <div class="page-sub-title">
            information Management
        </div>
        <div class="left-input-area">
            <div class="btn sky" onclick="WRPAdminApp.pagescript.initEmpEditContainer();">
                + ADD EMPLOYEE
            </div>
            <div class="select-store-container">
                SELECT STORE ID
                <select class="select-store" id="emp-select-store" onchange="WRPAdminApp.pagescript.getEmployeeList();">
                    <option>ALL</option>
                </select>
            </div>
        </div>
        <div class="right-input-area">
            <label for="emp-search-type-1"><input type="radio" name="empSearchType" id="emp-search-type-1" value="1"/>ID</label>
            <label for="emp-search-type-2"><input type="radio" name="empSearchType" id="emp-search-type-2" value="2"/>Name</label>
            <label for="emp-search-type-0"><input type="radio" name="empSearchType" id="emp-search-type-0" value="0" checked/>ALL</label>
            <div class="search-container">
                <input type="text" placeholder="Keyword" id="emp-search-keyword" onkeydown="if(event.keyCode === 13) { WRPAdminApp.pagescript.getEmployeeList(); }"/>
                <div class="right-btn" onclick="WRPAdminApp.pagescript.getEmployeeList();">
                </div>
            </div>
        </div>
    </div>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="table">
                <div class="thead">
                    <div class="tr">
                        <div class="td">
                            ID
                        </div>
                        <div class="td">
                            Name
                        </div>
                        <div class="td">
                            Email
                        </div>
                        <div class="td">
                            Phone
                        </div>
                        <div class="td">
                            Address
                        </div>
                        <div class="td">
                            Job Position
                        </div>
                    </div>
                </div>
                <div class="tbody" id="employee-list">
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                        <div class="td">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="popup-area">
        <div class="popup-container" popupname="empEditContainer">

            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                EMPLOYEES MANAGEMENT
            </div>
            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            <div class="left-area">Employee Information</div>
                            <div class="right-area text_right"><div class="btn sky" onclick="WRPAdminApp.pagescript.setEmployeeData();">SAVE INFORMATION</div></div>
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-3">
                                    ID
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-id"/>
                                </div>
                                <div class="grid-3">
                                    Password
                                </div>
                                <div class="grid-3">
                                    <input type="password" id="emp-edit-user-password"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    First Name
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-first-name"/>
                                </div>
                                <div class="grid-3">
                                    Middle Name
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-middle-name"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Last Name
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-last-name"/>
                                </div>
                                <div class="grid-3">
                                    User Type
                                </div>
                                <div class="grid-3">
                                    <select id="emp-edit-user-type">
                                        <option value="3">Employee</option>
                                        <option value="2">Area Manager</option>
                                        <option value="1">District Manager</option>
                                        <option value="0">General Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Address1
                                </div>
                                <div class="grid-9">
                                    <input type="text" id="emp-edit-user-addr1"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Address2
                                </div>
                                <div class="grid-9">
                                    <input type="text" id="emp-edit-user-addr2"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    City
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-city"/>
                                </div>
                                <div class="grid-3">
                                    State
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-state"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Zipcode
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-zipcode"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Tel
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-tel"/>
                                </div>
                                <div class="grid-3">
                                    E-mail
                                </div>
                                <div class="grid-3">
                                    <input type="text" id="emp-edit-user-email"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Disable
                                </div>
                                <div class="grid-3">
                                    <input type="checkbox" id="emp-edit-user-disable"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>