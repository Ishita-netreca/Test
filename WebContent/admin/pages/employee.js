/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedUserSid: 0,
    _searchType: 0,
    _searchKeyword: undefined,
    _selectedStoreId: undefined,
    init: function() {
        WRPAdminApp.pagescript.getEmployeeList();
    },
    getEmployeeList: function() {
        var data = {}, i, len, elem;

        WRPAdminApp.pagescript._searchType = 0;
        WRPAdminApp.pagescript._searchKeyword = undefined;

        WRPAdminApp.pagescript._selectedUserSid = 0;
        WRPAdminApp.closePopup('empEditContainer');

        try {
            elem = document.getElementsByName("empSearchType");
            for (i = 0, len = elem.length; i < len; i++) {
                if (elem.checked === true) {
                    WRPAdminApp.pagescript._searchType = parseInt(elem.value);
                    if (!isNaN(WRPAdminApp.pagescript._searchType)) {
                        break;
                    } else {
                        WRPAdminApp.pagescript._searchType = 0;
                    }
                }
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            WRPAdminApp.pagescript._searchKeyword = document.getElementById("emp-search-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            WRPAdminApp.pagescript._selectedStoreId = document.getElementById("emp-select-store").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        data.searchType = WRPAdminApp.pagescript._searchType;

        if (WRPAdminApp.pagescript._searchKeyword !== undefined && WRPAdminApp.pagescript._searchKeyword.length > 0) {
            data.searchKeyword = WRPAdminApp.pagescript._searchKeyword;
        }

        if (WRPAdminApp.pagescript._selectedStoreId !== undefined && WRPAdminApp.pagescript._selectedStoreId.length > 0) {
            data.selectedStoreId = WRPAdminApp.pagescript._selectedStoreId;
        }

        $.ajax({
            url: "ajax/employee/getEmployeeList.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, empList, i, len, obj, innerHTML, strBuffer;
                data = result.data;
                if (!data) return;

                empList = document.getElementById("employee-list");
                if (!empList) return;

                innerHTML = [];

                for (i = 0, len = data.length;i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<div class="tr" onclick="WRPAdminApp.pagescript.informSelectedEmployeeData(');
                        innerHTML.push(obj.sid);
                        innerHTML.push(');">');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.userId !== undefined && obj.userId)? obj.userId : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        strBuffer = [];
                        if (obj.firstName) {
                            strBuffer.push(obj.firstName);
                        }
                        if (obj.middleName) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.middleName);
                        }
                        if (obj.lastName) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.lastName);
                        }
                        innerHTML.push(strBuffer.join("").trim());
                        strBuffer = undefined;
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.email !== undefined && obj.email)? obj.email : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.tel !== undefined && obj.tel)? obj.tel : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        strBuffer = [];
                        if (obj.address2) {
                            strBuffer.push(obj.address2);
                        }
                        if (obj.address1) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.address1);
                        }
                        if (obj.city) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.city);
                        }
                        if (obj.state) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.state);
                        }
                        if (obj.zipcode) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.zipcode);
                        }
                        innerHTML.push(strBuffer.join("").trim());
                        strBuffer = undefined;
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.jobPosition !== undefined && obj.jobPosition)? obj.jobPosition : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('</div>');
                    } catch (e) {

                    }
                }

                if (len < 17) {
                    for (; len < 17; len++) {
                        innerHTML.push('<div class="tr blank"><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div></div>');
                    }
                }

                empList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        })
    },
    getEmployeeList: function() {
        var data = {}, i, len, elem;

        WRPAdminApp.pagescript._searchType = 0;
        WRPAdminApp.pagescript._searchKeyword = undefined;

        WRPAdminApp.pagescript._selectedUserSid = 0;
        WRPAdminApp.closePopup(document.querySelector("div[pagename='employee'] > div.popup-area > div.popup-container[popupname='empEditContainer']"));

        try {
            elem = document.getElementsByName("empSearchType");
            for (i = 0, len = elem.length; i < len; i++) {
                if (elem.checked === true) {
                    WRPAdminApp.pagescript._searchType = parseInt(elem.value);
                    if (!isNaN(WRPAdminApp.pagescript._searchType)) {
                        break;
                    } else {
                        WRPAdminApp.pagescript._searchType = 0;
                    }
                }
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            WRPAdminApp.pagescript._searchKeyword = document.getElementById("emp-search-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            WRPAdminApp.pagescript._selectedStoreId = document.getElementById("emp-select-store").value;
            if (WRPAdminApp.pagescript._selectedStoreId === "ALL") {
                WRPAdminApp.pagescript._selectedStoreId = undefined;
            }
        } catch (e) {
            console.warn(e);
            return;
        }
        data.searchType = WRPAdminApp.pagescript._searchType;

        if (WRPAdminApp.pagescript._searchKeyword !== undefined && WRPAdminApp.pagescript._searchKeyword.length > 0) {
            data.searchKeyword = WRPAdminApp.pagescript._searchKeyword;
        }

        if (WRPAdminApp.pagescript._selectedStoreId !== undefined && WRPAdminApp.pagescript._selectedStoreId.length > 0) {
            data.selectedStoreId = WRPAdminApp.pagescript._selectedStoreId;
        }



        $.ajax({
            url: "ajax/employee/getEmployeeList.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, empList, i, len, obj, innerHTML, strBuffer;
                data = result.data;
                if (!data) return;

                empList = document.getElementById("employee-list");
                if (!empList) return;

                innerHTML = [];

                for (i = 0, len = data.length;i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<div class="tr" onclick="WRPAdminApp.pagescript.informSelectedEmployeeData(');
                        innerHTML.push(obj.sid);
                        innerHTML.push(');">');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.userId !== undefined && obj.userId)? obj.userId : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        strBuffer = [];
                        if (obj.firstName) {
                            strBuffer.push(obj.firstName);
                        }
                        if (obj.middleName) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.middleName);
                        }
                        if (obj.lastName) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.lastName);
                        }
                        innerHTML.push(strBuffer.join("").trim());
                        strBuffer = undefined;
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.email !== undefined && obj.email)? obj.email : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.tel !== undefined && obj.tel)? obj.tel : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        strBuffer = [];
                        if (obj.address2) {
                            strBuffer.push(obj.address2);
                        }
                        if (obj.address1) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.address1);
                        }
                        if (obj.city) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.city);
                        }
                        if (obj.state) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.state);
                        }
                        if (obj.zipcode) {
                            strBuffer.push(' ');
                            strBuffer.push(obj.zipcode);
                        }
                        innerHTML.push(strBuffer.join("").trim());
                        strBuffer = undefined;
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.jobPosition !== undefined && obj.jobPosition)? obj.jobPosition : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('</div>');
                    } catch (e) {

                    }
                }

                if (len < 17) {
                    for (; len < 17; len++) {
                        innerHTML.push('<div class="tr blank"><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div></div>');
                    }
                }

                empList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        })
    },
    informSelectedEmployeeData: function() {
        if (arguments.length < 1) {
            console.warn("no input user sid");
            return;
        }

        WRPAdminApp.pagescript._selectedUserSid = parseInt(arguments[0]);
        if (isNaN(WRPAdminApp.pagescript._selectedUserSid)) {
            console.warn("error user sid");
            WRPAdminApp.pagescript._selectedUserSid = 0;
            return;
        }

        $.ajax({
            url: "ajax/employee/getEmployeeInfo.jsp",
            data: {
                userSid: WRPAdminApp.pagescript._selectedUserSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                try {
                    document.getElementById("emp-edit-user-id").value = (data.userId !== undefined && data.userId)? data.userId : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-password").value = "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-type").value = (data.userType !== undefined && data.userType)? data.userType : 3;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-first-name").value = (data.firstName !== undefined && data.firstName)? data.firstName : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-middle-name").value = (data.middleName !== undefined && data.middleName)? data.middleName : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-last-name").value = (data.lastName !== undefined && data.lastName)? data.lastName : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-addr1").value = (data.address1 !== undefined && data.address1)? data.address1 : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-addr2").value = (data.address2 !== undefined && data.address2)? data.address2 : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-city").value = (data.city !== undefined && data.city)? data.city : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-state").value = (data.state !== undefined && data.state)? data.state : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-zipcode").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-tel").value = (data.tel !== undefined && data.tel)? data.tel : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("emp-edit-user-email").value = (data.email !== undefined && data.email)? data.email : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    if (data.disabled > 0) {
                        document.getElementById("emp-edit-user-disable").checked = true;
                    } else {
                        document.getElementById("emp-edit-user-disable").checked = false;
                    }
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.openPopupInPage('empEditContainer');
            }
        });
    },
    initEmpEditContainer: function() {
        WRPAdminApp.pagescript._selectedUserSid = 0;

        try {
            document.getElementById("emp-edit-user-id").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-password").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-type").value = 3;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-first-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-middle-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-last-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-addr1").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-addr2").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-city").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-state").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-zipcode").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-tel").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("emp-edit-user-email").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
             document.getElementById("emp-edit-user-disable").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.openPopupInPage('empEditContainer');
    },
    setEmployeeData: function() {
        var data;
        if (!confirm("Are you sure?")) return;

        data = {};

        data.userSid = WRPAdminApp.pagescript._selectedUserSid;

        try {
            data.userId = document.getElementById("emp-edit-user-id").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (data.userId.length == 0) {
            alert("Input User ID");
            return;
        }

        try {
            data.password = document.getElementById("emp-edit-user-password").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        if(data.userSid == 0 && data.password.length == 0) {
            alert("Input Password");
            return;
        }

        try {
            data.userType = document.getElementById("emp-edit-user-type").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.firstName = document.getElementById("emp-edit-user-first-name").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.middleName = document.getElementById("emp-edit-user-middle-name").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.lastName = document.getElementById("emp-edit-user-last-name").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.address1 = document.getElementById("emp-edit-user-addr1").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.address2 = document.getElementById("emp-edit-user-addr2").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.city = document.getElementById("emp-edit-user-city").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.state = document.getElementById("emp-edit-user-state").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.zipcode = document.getElementById("emp-edit-user-zipcode").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.tel = document.getElementById("emp-edit-user-tel").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.email = document.getElementById("emp-edit-user-email").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            if (document.getElementById("emp-edit-user-disable").checked === true) {
                data.disable = 1;
            } else {
                data.disable = 0;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/employee/setEmployeeData.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup('empEditContainer');
                    WRPAdminApp.pagescript.getEmployeeList();
                } else {
                    alert("Error : " + result);
                }
            }
        });
    }
};