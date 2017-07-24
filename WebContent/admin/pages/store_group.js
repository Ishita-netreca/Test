/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedMarketCode: undefined,
    _selectedMarketSid: 0,
    _selectedDistrictCode: undefined,
    _selectedDistrictSid: 0,
    init: function () {
        WRPAdminApp.pagescript.getMarketList();
    },
    getMarketList: function () {
        var search;
        search = document.getElementById("store-group-search-market-keyword");
        if (!search) return;

        WRPAdminApp.pagescript._selectedMarketSid = undefined;
        WRPAdminApp.pagescript._selectedMarketCode = undefined;

        $.ajax({
            url: "ajax/market/getMarketList.jsp",
            data: {
                searchKeyword: search.value
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
                var data, marketList, districtInfoMarketCodes, i, len, obj, innerHTML, innerHTML2;
                data = result.data;
                if (!data) return;

                marketList = document.getElementById("store-group-market-list");
                if (!marketList) return;

                districtInfoMarketCodes = document.getElementById("district-info-market-code");
                if (!districtInfoMarketCodes) {
                    return;
                }

                innerHTML = [];
                innerHTML2 = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr onclick="WRPAdminApp.pagescript.selectMarket(\'');
                        innerHTML.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML.push('\');" ondblclick="WRPAdminApp.pagescript.getMarketInfo(\'');
                        innerHTML.push((obj.sid !== undefined && obj.sid) ? obj.sid : "");
                        innerHTML.push('\');">');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.name !== undefined && obj.name) ? obj.name : "");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.tel !== undefined && obj.tel) ? obj.tel : "");
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');

                        innerHTML2.push('<option value="');
                        innerHTML2.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML2.push('">');
                        innerHTML2.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML2.push('</option>');
                    } catch (e) {

                    }
                }

                marketList.innerHTML = innerHTML.join("");
                districtInfoMarketCodes.innerHTML = innerHTML2.join("");
                innerHTML = undefined;
                innerHTML2 = undefined;
            }
        });
    },
    selectMarket: function() {
        var marketList, i, len, elem;
        if (arguments.length < 0) {
            console.warn("no input market code");
            return;
        }

        WRPAdminApp.pagescript._selectedMarketCode = arguments[0];

        marketList = document.getElementById("store-group-market-list");
        if (!marketList) return;

        for (i = 0, len = marketList.children.length; i < len; i++) {
            try {
                elem = marketList.children[i];
                if (elem.children.length != 3) continue;
                if (WRPAdminApp.pagescript._selectedMarketCode === elem.children[0].innerText) {
                    elem.className = "tr selected";
                } else {
                    elem.className = "tr";
                }
            } catch (e) {

            }
        }

        WRPAdminApp.pagescript.getDistrictList();
    },
    getDistrictList: function () {
        var search;
        if (arguments.length > 0) {
            WRPAdminApp.pagescript._selectedMarketCode = arguments[0];
        }

        search = document.getElementById("store-group-search-district-keyword");
        if (!search) return;

        WRPAdminApp.pagescript._selectedDistrictSid = undefined;
        WRPAdminApp.pagescript._selectedDistrictCode = undefined;

        $.ajax({
            url: "ajax/district/getDistrictList.jsp",
            data: {
                marketCode: WRPAdminApp.pagescript._selectedMarketCode,
                searchKeyword: search.value
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
                var data, districtList, i, len, obj, innerHTML;
                data = result.data;
                if (!data) return;

                districtList = document.getElementById("store-group-district-list");
                if (!districtList) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];

                        innerHTML.push('<tr ondblclick="WRPAdminApp.pagescript.getDistrictInfo(');
                        innerHTML.push((obj.sid !== undefined && obj.sid) ? obj.sid : "");
                        innerHTML.push(');">');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.districtCode !== undefined && obj.districtCode) ? obj.districtCode : "");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.name !== undefined && obj.name) ? obj.name : "");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.tel !== undefined && obj.tel) ? obj.tel : "");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.parentMarketCode !== undefined && obj.parentMarketCode) ? obj.parentMarketCode : "");
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {

                    }
                }

                districtList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    /*
     param
     0: Parent Object
     1: Children Element
     */
    getPermissionObject: function() {
        var parent, children, i, len, elem, name, newObj;

        if (arguments.length < 2) {
            console.warn("Input parameters [Parent Object, Children Element]");
            return;
        }

        parent = arguments[0];
        children = arguments[1];

        for (i = 0, len = children.length; i < len; i++) {
            try {
                elem = children[i];
                newObj = {};
                if (elem.children.length > 2) {
                    parent[elem.children[0].innerText] = newObj;
                    newObj.desc = elem.children[1].innerText;
                    newObj.allow = elem.children[2].children[0].checked;
                    if (elem.children.length > 3) {// contains children
                        newObj.children = {};
                        WRPAdminApp.pagescript.getPermissionObject(newObj.children, elem.children[3].children); // [class=containers].children, [class=components].children
                    }
                }
            } catch (e) {
                console.warn(e);
            }
        }

        return parent;
    },
    saveSalesPermissionInfo: function() {
        var savingObj, permissionSetList, i, len, elem, key, j, len2, key2, elem2, storeId;

        if (WRPAdminApp.pagescript._selectedUserId === undefined || WRPAdminApp.pagescript._selectedUserId.length == 0) {
            alert("Select User");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) {
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        permissionSetList = document.getElementById("users-sales-permission-set-list");
        if (!permissionSetList) return;

        savingObj = WRPAdminApp.pagescript.getPermissionObject({}, permissionSetList.children);

        $.ajax({
            url: "ajax/permission/setStoreUserSalesPermissionInfo.jsp",
            data: {
                storeId: storeId,
                userId: WRPAdminApp.pagescript._selectedUserId,
                permissionInfoString: JSON.stringify(savingObj)
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete!");
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    saveBackendPermissionInfo: function() {
        var savingObj, permissionSetList, i, len, elem, key, j, len2, key2, elem2, storeId;

        if (WRPAdminApp.pagescript._selectedUserId === undefined || WRPAdminApp.pagescript._selectedUserId.length == 0) {
            alert("Select User");
            return;
        }

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) {
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        permissionSetList = document.getElementById("users-backend-permission-set-list");
        if (!permissionSetList) return;

        savingObj = WRPAdminApp.pagescript.getPermissionObject({}, permissionSetList.children);

        $.ajax({
            url: "ajax/permission/setStoreUserBackendPermissionInfo.jsp",
            data: {
                storeId: storeId,
                userId: WRPAdminApp.pagescript._selectedUserId,
                permissionInfoString: JSON.stringify(savingObj)
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    alert("Complete!");
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    getMarketInfo: function () {
        if (arguments.length < 0) {
            console.warn("no input market sid");
            return;
        }

        $.ajax({
            url: "ajax/market/getMarketInfoBySid.jsp",
            data: {
                marketSid: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
                var data;
                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedMarketSid = data.sid;
                WRPAdminApp.pagescript._selectedMarketCode = (data.marketCode !== undefined && data.marketCode) ? data.marketCode : undefined;

                if (WRPAdminApp.pagescript._selectedMarketCode === undefined) return;

                try {
                    document.getElementById("market-info-market-code").value = (data.marketCode !== undefined && data.marketCode) ? data.marketCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("market-info-description").value = (data.name !== undefined && data.name) ? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("market-info-tel").value = (data.tel !== undefined && data.tel) ? data.tel : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.openPopupInPage('MarketViewContainer');
            }
        });
    },
    initMarketInfo: function () {
        WRPAdminApp.pagescript._selectedMarketSid = 0;
        WRPAdminApp.pagescript._selectedMarketCode = undefined;

        try {
            document.getElementById("market-info-market-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("market-info-description").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("market-info-tel").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.openPopupInPage('MarketViewContainer');
    },
    updateMarketInfo: function () {
        var param = {};
        param.marketSid = parseInt(WRPAdminApp.pagescript._selectedMarketSid);
        if (isNaN(param.marketSid)) {
            console.warn("market sid error");
            return;
        }
        if (WRPAdminApp.pagescript._selectedMarketCode !== undefined) {
            param.prevMarketCode = WRPAdminApp.pagescript._selectedMarketCode;
        }

        try {
            param.marketCode = document.getElementById("market-info-market-code").value;
            if (param.marketCode.length === 0) {
                alert("Input market code");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.name = document.getElementById("market-info-description").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.tel = document.getElementById("market-info-tel").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/market/updateMarketInfo.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function (result) {
                if (result === 1) {
                    alert("This market code already exists");
                } else if (result === 0) {
                    alert("Complete");
                    WRPAdminApp.closePopup('MarketViewContainer');
                    WRPAdminApp.pagescript.init();
                } else {
                    alert("Error " + result);
                }
            }
        });
    },
    getDistrictInfo: function () {
        if (arguments.length < 0) {
            console.warn("no input district sid");
            return;
        }

        $.ajax({
            url: "ajax/district/getDistrictInfo.jsp",
            data: {
                districtSid: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function (result) {
                var data;
                data = result.data;

                if (!data) return;

                WRPAdminApp.pagescript._selectedDistrictSid = data.sid;
                WRPAdminApp.pagescript._selectedDistrictCode = (data.districtCode !== undefined && data.districtCode) ? data.districtCode : undefined;

                if (WRPAdminApp.pagescript._selectedDistrictCode === undefined) return;

                try {
                    document.getElementById("district-info-district-code").value = (data.districtCode !== undefined && data.districtCode) ? data.districtCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("district-info-description").value = (data.name !== undefined && data.name) ? data.name : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("district-info-tel").value = (data.tel !== undefined && data.tel) ? data.tel : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("district-info-market-code").value = (data.parentMarketCode !== undefined && data.parentMarketCode) ? data.parentMarketCode : "";
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.openPopupInPage('DistrictViewContainer');
            }
        });
    },
    initDistrictInfo: function () {

        WRPAdminApp.pagescript._selectedDistrictSid = 0;
        WRPAdminApp.pagescript._selectedDistrictCode = undefined;

        try {
            document.getElementById("district-info-district-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("district-info-description").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("district-info-tel").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("district-info-market-code").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.openPopupInPage('DistrictViewContainer');
    },
    updateDistrictInfo: function () {
        var param = {};
        param.districtSid = parseInt(WRPAdminApp.pagescript._selectedDistrictSid);
        if (isNaN(param.districtSid)) {
            console.warn("district sid error");
            return;
        }
        try {
            param.districtCode = document.getElementById("district-info-district-code").value;
            if (param.districtCode.length === 0) {
                alert("Input district code");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.name = document.getElementById("district-info-description").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.tel = document.getElementById("district-info-tel").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            param.parentMarketCode = document.getElementById("district-info-market-code").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/district/updateDistrictInfo.jsp",
            data: param,
            method: "POST",
            dataType: "json",
            success: function (result) {
                if (result === 1) {
                    alert("This district code already exists");
                } else if (result === 0) {
                    alert("Complete");
                    WRPAdminApp.closePopup('DistrictViewContainer');
                    WRPAdminApp.pagescript.getDistrictList();
                } else {
                    alert("Error " + result);
                }
            }
        });
    }
};