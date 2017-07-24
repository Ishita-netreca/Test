/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedRateplanSid: 0,
    _searchType: 0,
    _searchKeyword: undefined,
    init: function() {
        WRPAdminApp.pagescript.getRateplanList();
    },
    getRateplanList: function() {
        var data = {}, i, len, elem;

        WRPAdminApp.pagescript._selectedRateplanSid = 0;
        WRPAdminApp.pagescript._searchType = 0;
        WRPAdminApp.pagescript._searchKeyword = undefined;
        WRPAdminApp.closePopup('rateplanEditContainer');

        try {
            elem = document.getElementsByName("rateplanSearchType");
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
            WRPAdminApp.pagescript._searchKeyword = document.getElementById("rateplan-search-keyword").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        data.searchType = WRPAdminApp.pagescript._searchType;

        if (WRPAdminApp.pagescript._searchKeyword !== undefined && WRPAdminApp.pagescript._searchKeyword.length > 0) {
            data.searchKeyword = WRPAdminApp.pagescript._searchKeyword;
        }

        $.ajax({
            url: "ajax/rateplan/getRateplanList.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, rateplanList, i, len, obj, innerHTML, strBuffer;
                data = result.data;

                if (!data) return;

                rateplanList = document.getElementById("rateplan-list");

                if (!rateplanList) return;

                innerHTML = [];

                for (i = 0, len = data.length;i < len; i++) {
                    try {
                        obj = data[i];

                        if (i % 2 == 0) innerHTML.push('<tr class="odd" onclick="WRPAdminApp.pagescript.informSelectedRateplanData(');
                        else innerHTML.push('<tr class="even" onclick="WRPAdminApp.pagescript.informSelectedRateplanData(');
                        innerHTML.push(obj.sid);
                        innerHTML.push(');">');
                        innerHTML.push('<td style="text-align: left;">');
                        innerHTML.push((obj.rateplanCode !== undefined && obj.rateplanCode)? obj.rateplanCode : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.carrier !== undefined && obj.carrier)? obj.carrier : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td style="text-align: left;">');
                        innerHTML.push((obj.description !== undefined && obj.description)? obj.description : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.planTypeStr !== undefined && obj.planTypeStr)? obj.planTypeStr : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.groupTypeStr !== undefined && obj.groupTypeStr)? obj.groupTypeStr : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td style="text-align: right; padding-right: 15px;">');
                        innerHTML.push((obj.mrc !== undefined && obj.mrc)? "$"+obj.mrc.toFixed(2) : "$0.00");
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {
                        console.log(e);
                    }
                }

                if (len < 17) {
                    for (; len < 17; len++) {
                        innerHTML.push('<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
                        //innerHTML.push('<div class="tr blank"><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div></div>');
                    }
                }

                rateplanList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        })
    },
    informSelectedRateplanData: function() {
        if (arguments.length < 1) {
            console.warn("no input rateplan sid");
            return;
        }

        WRPAdminApp.pagescript._selectedRateplanSid = parseInt(arguments[0]);
        if (isNaN(WRPAdminApp.pagescript._selectedRateplanSid)) {
            console.warn("error rateplan sid");
            WRPAdminApp.pagescript._selectedRateplanSid = 0;
            return;
        }

        $.ajax({
            url: "ajax/rateplan/getRateplanInfo.jsp",
            data: {
                rateplanSid: WRPAdminApp.pagescript._selectedRateplanSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                try {
                    document.getElementById("rateplan-edit-rateplan-code").value = (data.rateplanCode !== undefined && data.rateplanCode)? data.rateplanCode : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-carrier").value = (data.carrier !== undefined && data.carrier)? data.carrier : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-description").value = (data.description !== undefined && data.description)? data.description : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-plan-type").value = (data.planType !== undefined && data.planType)? data.planType : '0';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-group-type").value = (data.groupType !== undefined && data.groupType)? data.groupType : '0';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-mrc").value = (data.mrc !== undefined && data.mrc)? "$"+data.mrc.toFixed(2) : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-react-plan-flag").checked = (data.reactPlanFlag !== undefined && data.reactPlanFlag > 0)? true : false;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-upgrade-plan-flag").checked = (data.upgradePlanFlag !== undefined && data.upgradePlanFlag > 0)? true : false;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-start-date").value = (data.startDate !== undefined && data.startDate)? data.startDate : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-end-date").value = (data.endDate !== undefined && data.endDate)? data.endDate : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-disable").checked = (data.disable !== undefined && data.disable > 0)? true : false;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                WRPAdminApp.openPopupInPage('rateplanEditContainer');
            }
        });
    },
    initRateplanEditContainer: function() {
    	/* 170117 jh : information message */
    	alert("Enter a new rateplan information at the bottom section.");
    	$("#rateplan-edit-rateplan-code").focus();
    	/**/
        WRPAdminApp.pagescript._selectedRateplanSid = 0;


        try {
            document.getElementById("rateplan-edit-rateplan-code").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-carrier").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-description").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-plan-type").value = 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-group-type").value = 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-mrc").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-react-plan-flag").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-upgrade-plan-flag").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-start-date").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-end-date").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-disable").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        WRPAdminApp.openPopupInPage('rateplanEditContainer');
    },
    setRateplanData: function() {
        var data;
        if (!confirm("Are you sure?")) return;

        data = {};

        data.rateplanSid = WRPAdminApp.pagescript._selectedRateplanSid;

        try {
            data.rateplanCode = document.getElementById("rateplan-edit-rateplan-code").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (data.rateplanCode.length == 0) {
            alert("Input Rateplan Code");
            return;
        }

        try {
            data.carrier = document.getElementById("rateplan-edit-carrier").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.description = document.getElementById("rateplan-edit-description").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.planType = document.getElementById("rateplan-edit-plan-type").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.groupType = document.getElementById("rateplan-edit-group-type").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.mrc = parseFloat(document.getElementById("rateplan-edit-mrc").value.replace("$",""));
            if (isNaN(data.mrc)) {
                alert("MRC contains non-numeric character");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.reactPlanFlag = (document.getElementById("rateplan-edit-react-plan-flag").checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.upgradePlanFlag = (document.getElementById("rateplan-edit-upgrade-plan-flag").checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.startDate = document.getElementById("rateplan-edit-start-date").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.endDate = document.getElementById("rateplan-edit-end-date").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.disable = (document.getElementById("rateplan-edit-disable").checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/rateplan/setRateplanData.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.pagescript.getRateplanList();
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    syncFeeList: function() {
    	$.ajax({
            url:  "ajax/fee/syncFeeList.jsp",
            data: {
                storeId: document.getElementById("select-store").value
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                alert("Complete");
                WRPAdminApp.pagescript.init();
            }
        });
    }
};