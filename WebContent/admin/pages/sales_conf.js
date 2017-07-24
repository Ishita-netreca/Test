/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedRateplanSid: 0,
    _searchType: 0,
    _searchKeyword: undefined,
    init: function() {
    	try {
			WRPComponents('div[pagename="sales_conf"] > .page-submenu-container > .submenu[panelname="promotion"]').addShadowedImage('img/icon/promotion_01.png', 10, 10, 12);
			WRPComponents('div[pagename="sales_conf"] > .page-submenu-container > .submenu[panelname="carrier_setup"]').addShadowedImage('img/icon/wifi_01.png');
			WRPComponents('div[pagename="sales_conf"] > .page-submenu-container > .submenu[panelname="loan"]').addShadowedImage('img/icon/loan_01.png');
			WRPComponents('div[pagename="sales_conf"] > .page-submenu-container > .submenu[panelname="rate_plan"]').addShadowedImage('img/icon/rateplan_01.png');
		} catch (e) {
			
		}
		
		var components = $('#sales-rateplan-new-window');
    	if (components) {
    		components.jqxWindow("width", 700);
    		components.jqxWindow("height", 300);
    	}
    	
        WRPAdminApp.pagescript.getRateplanList();
    },
    getRateplanList: function() {
        var storeId, i, len, elem;

        try {
            storeId = document.getElementById("select-store").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        WRPAdminApp.pagescript._selectedRateplanSid = 0;
        WRPAdminApp.pagescript._searchType = 0;
        WRPAdminApp.pagescript._searchKeyword = undefined;

        $.ajax({
            url: "ajax/rateplan/getRateplanList.jsp",
            data: {
            	storeId : storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
        	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		row["sid"] = result.data[i].sid;
            		row["rateplanCode"] = result.data[i].rateplanCode;
            		row["carrier"] = result.data[i].carrier;
            		row["description"] = result.data[i].description;
            		row["planTypeStr"] = result.data[i].planTypeStr;
            		row["groupTypeStr"] = result.data[i].groupTypeStr;
            		row["mrc"] = result.data[i].mrc;
            		
            		datarow[i] = row;
            	}
            	
            	var source = 
        			{
            			localdata: datarow,
            			datafields:
            				[
            					{ name: 'sid', type: 'number'},
            					{ name: 'rateplanCode', type: 'string'},
            					{ name: 'carrier', type: 'string'},
            					{ name: 'description', type: 'string'},
            					{ name: 'planTypeStr', type: 'string'},
            					{ name: 'groupTypeStr', type: 'string'},
            					{ name: 'mrc', type: 'number'}
        					],
        						datatype: "json"
        			};
        	
            	var dataAdapter = new $.jqx.dataAdapter(source);
            	elem = $("#jqx-sales-rateplan-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-sales-rateplan-list"></div>';
            	}
    		
            	elem = $("#jqx-sales-rateplan-list");
    		
            	if(elem){
            		elem.jqxGrid(
            			{
	                	   width: '100%',
	                	   height: '100%',
	                	   source: dataAdapter,
	                	   showfilterrow: false,
	                	   filterable: true,
	                	   sortable: true,
	                	   columnsresize:true,
	                	   theme: 'arctic',
	                	   columns: [
	                		   { text: 'Rateplan Code', datafield: 'rateplanCode', width: '15%' },
	                		   { text: 'Carrier', datafield: 'carrier', width: '15%' },
	                		   { text: 'Description', datafield: 'description', width: '30%' },
	                		   { text: 'Plan Type', datafield: 'planTypeStr', width: '15%'},
	                		   { text: 'Group Type', datafield: 'groupTypeStr', width: '15%'},
	                		   { text: 'MRC', datafield: 'mrc', width: '10%', cellsformat: 'c2', cellsalign: 'right'},
		                     ]
            			});
            		$("#jqx-sales-rateplan-list").on('rowselect', WRPAdminApp.pagescript.informSelectedRateplanData);
            		$("#jqx-sales-rateplan-list").on('rowdoubleclick',WRPAdminApp.pagescript.PopRateplanData);
            		
            		$("#excel-sales-rateplan").click(function () {
                        $("#jqx-sales-rateplan-list").jqxGrid('exportdata', 'xls', 'jqx-sales-rateplan-list');
                    });
    		}
            }
        })
    },
    PopRateplanData: function(event) {
    	var rowdata, storeId;
    	rowdata = event.args.row.bounddata;

        WRPAdminApp.pagescript._selectedRateplanSid = rowdata.sid;
        
        if (WRPAdminApp.pagescript._selectedRateplanSid < 100001) {
        	alert("Can not be edited !");
        	return;
        }
        
        if (isNaN(WRPAdminApp.pagescript._selectedRateplanSid)) {
            console.warn("error rateplan sid");
            WRPAdminApp.pagescript._selectedRateplanSid = 0;
            return;
        }
        
        try {
            storeId = document.getElementById("select-store").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/rateplan/getRateplanInfo.jsp",
            data: {
                rateplanSid: WRPAdminApp.pagescript._selectedRateplanSid,
                storeId : storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;
                data = result.data;
                if (!data) return;

                try {
                    document.getElementById("rateplan-edit-rateplan-code-pop").value = (data.rateplanCode !== undefined && data.rateplanCode)? data.rateplanCode : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-carrier-pop").value = (data.carrier !== undefined && data.carrier)? data.carrier : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-description-pop").value = (data.description !== undefined && data.description)? data.description : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-plan-type-pop").value = (data.planType !== undefined && data.planType)? data.planType : '0';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-group-type-pop").value = (data.groupType !== undefined && data.groupType)? data.groupType : '0';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-mrc-pop").value = (data.mrc !== undefined && data.mrc)? "$"+data.mrc.toFixed(2) : '';
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-react-plan-flag-pop").checked = (data.reactPlanFlag !== undefined && data.reactPlanFlag > 0)? true : false;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("rateplan-edit-upgrade-plan-flag-pop").checked = (data.upgradePlanFlag !== undefined && data.upgradePlanFlag > 0)? true : false;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
               	 $("#rateplan-edit-start-date-pop").jqxDateTimeInput('setDate', data.startDate);
                } catch (e) {
                    console.warn(e);
                    return;
                }
                
                try {
                  	 $("#rateplan-edit-end-date-pop").jqxDateTimeInput('setDate', data.endDate);
                   } catch (e) {
                       console.warn(e);
                       return;
                   }

                try {
                    document.getElementById("rateplan-edit-disable-pop").checked = (data.disable !== undefined && data.disable > 0)? true : false;
                } catch (e) {
                    console.warn(e);
                    return;
                }
                $('#sales-rateplan-new-window').jqxWindow('open');
            }
        });
    },
    informSelectedRateplanData: function(event) {
    	var rowdata, storeId;
    	rowdata = event.args.row;

        WRPAdminApp.pagescript._selectedRateplanSid = rowdata.sid;
        
        if (isNaN(WRPAdminApp.pagescript._selectedRateplanSid)) {
            console.warn("error rateplan sid");
            WRPAdminApp.pagescript._selectedRateplanSid = 0;
            return;
        }
        
        try {
            storeId = document.getElementById("select-store").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/rateplan/getRateplanInfo.jsp",
            data: {
                rateplanSid: WRPAdminApp.pagescript._selectedRateplanSid,
                storeId: storeId
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
        WRPAdminApp.pagescript._selectedRateplanSid = 0;


        try {
            document.getElementById("rateplan-edit-rateplan-code-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-carrier-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-description-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-plan-type-pop").value = 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-group-type-pop").value = 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-mrc-pop").value = '';
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-react-plan-flag-pop").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-upgrade-plan-flag-pop").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
        	$("#rateplan-edit-start-date-pop").val(new Date());
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	$("#rateplan-edit-end-date-pop").val(new Date());
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            document.getElementById("rateplan-edit-disable-pop").checked = false;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $('#sales-rateplan-new-window').jqxWindow('open');

    },
    setRateplanData: function() {
        var data;
        if (!confirm("Are you sure?")) return;

        data = {};
        data.rateplanSid = WRPAdminApp.pagescript._selectedRateplanSid;

        if (data.rateplanSid < 100001 && data.rateplanSid > 1) {
        	alert("Can not be edited !");
        	return;
        }
        
        try {
            data.store_id = document.getElementById("select-store").value;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            data.rateplanCode = document.getElementById("rateplan-edit-rateplan-code-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        if (data.rateplanCode.length == 0) {
            alert("Input Rateplan Code");
            return;
        }

        try {
            data.carrier = document.getElementById("rateplan-edit-carrier-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.description = document.getElementById("rateplan-edit-description-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.planType = document.getElementById("rateplan-edit-plan-type-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.groupType = document.getElementById("rateplan-edit-group-type-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.mrc = parseFloat(document.getElementById("rateplan-edit-mrc-pop").value.replace("$",""));
            if (isNaN(data.mrc)) {
                alert("MRC contains non-numeric character");
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.reactPlanFlag = (document.getElementById("rateplan-edit-react-plan-flag-pop").checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.upgradePlanFlag = (document.getElementById("rateplan-edit-upgrade-plan-flag-pop").checked === true)? 1 : 0;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.startDate = document.getElementById("rateplan-edit-start-date-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.endDate = document.getElementById("rateplan-edit-end-date-pop").value;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            data.disable = (document.getElementById("rateplan-edit-disable-pop").checked === true)? 1 : 0;
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
                	WRPCommon.MsgBoxModule.alert({
                		message:"Completed",
                		okBtnClick: function(){
                        	$('#sales-rateplan-new-window').jqxWindow('close');
                            WRPAdminApp.pagescript.getRateplanList();
                		}
                	});
                } else {
                    alert("Error : " + result);
                }
            }
        });
    },
    syncRatePlanList: function() {
    	$.ajax({
            url:  "ajax/rateplan/syncRatePlanList.jsp",
            data: {
                storeId: document.getElementById("select-store").value
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	WRPCommon.MsgBoxModule.alert({
            		message:"Completed",
            		okBtnClick: function(){
                        WRPAdminApp.pagescript.init();
            		}
            	});
            }
        });
    }
};