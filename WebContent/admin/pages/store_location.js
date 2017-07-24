/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedCategorySid: 0,
    _selectedSubCategorySid: 0,
    _selectedRoleSid: 0,
    _selectedPermissionGroupSid: 0,
    _selectedMarketCode: undefined,
    _selectedMarketSid: 0,
    _selectedDistrictCode: undefined,
    _selectedDistrictSid: 0,
    init: function() {
    	try {
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="store_location"]').addShadowedImage('img/icon/map_01.png');
		} catch (e) {
			
		}
		
		var components;
    	
    	components = $('#jqx-sys-market-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "marketCode", type: "string" },
    					{ name: "name", type: "string" },
    					{ name: "tel", type: "string" },
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    			columns: [
 				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "Market Code", datafield: "marketCode", width: "30%", align:'center', cellsalign:'center' },
				   { text: "Name", datafield: "name", width: "40%", align:'center', cellsalign:'center' },
				   { text: "Tel", datafield: "tel", width: "30%", align:'center', cellsalign:'center' },
				]
    		});
    		$("#jqx-sys-market-list").on('rowselect', WRPAdminApp.pagescript.getDistrictList);
    		$("#jqx-sys-market-list").on('rowdoubleclick', WRPAdminApp.pagescript.getMarketInfo);
    		$("#excel_sys_market_list").click(function(){
    			$('#jqx-sys-market-list').jqxGrid('exportdata', 'xls', 'jqx-sys-market-list');
 			});
    		
    	}
    	
    	components = $('#jqx-sys-district-list');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "100%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "districtCode", type: "string" },
    					{ name: "name", type: "string" },
    					{ name: "tel", type: "string" },
    					{ name: "parentMarketCode", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    			columns: [
 				   { text: "sid", datafield: "sid", hidden:true },
				   { text: "District Code", datafield: "districtCode", width: "25%", align:'center', cellsalign:'center' },
				   { text: "Name", datafield: "name", width: "25%", align:'center', cellsalign:'center' },
				   { text: "Tel", datafield: "tel", width: "25%", align:'center', cellsalign:'center' },
				   { text: "Dist.", datafield: "parentMarketCode", width: "25%", align:'center', cellsalign:'center' }
				]
    		});
    		$("#jqx-sys-district-list").on('rowdoubleclick', WRPAdminApp.pagescript.getDistrictInfo);
    		$("#excel_sys_district_list").click(function(){
    			$('#jqx-sys-district-list').jqxGrid('exportdata', 'xls', 'jqx-sys-district-list');
 			});
    		
    	}

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
            	var data, elem, i, len, obj, districtInfoMarketCodes;
    			var innerHTML=[];
    			data = result.data;
    			
    			if (!data) return;
    			
    			districtInfoMarketCodes = document.getElementById("district-info-market-code");
                if (!districtInfoMarketCodes) {
                    return;
                }
                
    			elem = $("#jqx-sys-market-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				for (i = 0, len = data.length; i < len; i++) {
    					obj = data[i];
    					elem.jqxGrid("addRow", null, obj, "last");	
    					
    					innerHTML.push('<option value="');
                        innerHTML.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML.push((i == 0) ? '" selected>' : '">');
                        innerHTML.push((obj.marketCode !== undefined && obj.marketCode) ? obj.marketCode : "");
                        innerHTML.push('</option>');
    	            	}
    				}
    			
    			
    				districtInfoMarketCodes.innerHTML = innerHTML.join("");
    			}
            
        });
    },
    selectMarket: function(event) {
        var marketList, i, len, elem, rowdata;

        rowdata = event.args.row;
        WRPAdminApp.pagescript._selectedMarketCode = rowdata.marketCode;

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
    getDistrictList: function (event) {
        var rowdata;
        
        if(event){
            rowdata = event.args.row;
            WRPAdminApp.pagescript._selectedMarketCode = rowdata.marketCode;
        }
        /*if (arguments.length > 0) {
            WRPAdminApp.pagescript._selectedMarketCode = arguments[0];
        }*/

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
            	var data, elem, i, len, obj;
    			data = result.data;
    			
    			if (!data) return;
    			
    			districtInfoMarketCodes = document.getElementById("district-info-market-code");
                if (!districtInfoMarketCodes) {
                    return;
                }
                
    			elem = $("#jqx-sys-district-list");
    			if (elem) {
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");	
    	        }
            }
        });
    },
    getMarketInfo: function (event) {
        var rowdata;
        rowdata = event.args.row.bounddata;
        $.ajax({
            url: "ajax/market/getMarketInfoBySid.jsp",
            data: {
                marketSid: rowdata.sid
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
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input market code"
            	});
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
                	WRPCommon.MsgBoxModule.alert({
                		message: "This market code already exists"
                	});
                } else if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Completed",
                		okBtnClick: function(){
                            WRPAdminApp.closePopup('MarketViewContainer');
                            WRPAdminApp.pagescript.init();
                		}
                	});
                } else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error " + result
                	});
                }
            }
        });
    },
    getDistrictInfo: function (event) {
        var rowdata;
        rowdata = event.args.row.bounddata;

        $.ajax({
            url: "ajax/district/getDistrictInfo.jsp",
            data: {
                districtSid: rowdata.sid
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
            document.getElementById("district-info-market-code").value = WRPAdminApp.pagescript._selectedMarketCode;
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
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input district code"
            	});
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
                	WRPCommon.MsgBoxModule.alert({
                		message: "This district code already exists"
                	});
                } else if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Completed",
                		okBtnClick: function(){
                            WRPAdminApp.closePopup('DistrictViewContainer');
                            WRPAdminApp.pagescript.getDistrictList();
                		}
                	});
                } else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error " + result
                	});
                }
            }
        });
    },
    setPage1: function() { // 0: pagename
        var article, i, len, elem, isFound, pagename, panel, script, sub_;
        if (arguments.length < 1) {
            console.warn("no input element or pagename");
            return;
        }

        article = document.getElementById("sub_");
        if (!article) {
            console.warn("not found article");
            return;
        }

        pagename = arguments[0];
        
        isFound = 0;
        if (typeof(pagename) === "string") {

        } else {
            pagename = arguments[0].getAttribute("pagename");
            if (pagename === undefined || pagename.length === 0) {
                console.warn("not found pagename");
                return;
            }
        }

        WRPAdminApp.pagename = pagename;

        for (i = 0, len = article.children.length ; i < len; i++) {
            try {
                elem = article.children[i];
                if (elem.getAttribute("pagename") === pagename) {
                    elem.style.display = "block";
                    isFound = 1;
                } else {
                    elem.style.display = "none";
                }
            } catch (e) {
                console.warn(e);
            }
        }

        if (isFound === 0) {
			
        	elem = $(".jqx-custom-window");
			if (elem && elem.length > 0) {
				for (i = 0, len = elem.length; i < len; i++) { 
					try {							
						$(elem[i]).jqxWindow("destroy");
					} catch (e) {
						
					}
				}
			}
			
            $.ajax({
                url: "pages/"+pagename+".jsp",
                dataType: "text",
                success: function(result) {
					var i, len, elem, elems, jqelem, eventhandler;
                    article.innerHTML = result;
                    script = document.createElement("script");
                    script.src = "pages/"+pagename+".js?timestamp="+WRPAdminApp.convertDateToString(new Date(), "yyyyMMddHHmmss");
                    console.log(script.src);
                    document.body.appendChild(script);
                    script.onload = function(event) {
                        if (_pagescript) {
                            WRPAdminApp.pagescript = undefined;
                            WRPAdminApp.pagescript = _pagescript;
                            _pagescript = undefined;
                            document.body.removeChild(script);
                            script = undefined;
                            
                            if (document.querySelector("div#sub_ > div[pagename='"+WRPAdminApp.pagename+"']")) {
                                if (WRPAdminApp.pagescript.init) {
                                    setTimeout(
                                        WRPAdminApp.pagescript.init
                                    , 50);
                                }
                            }
                        }
                    };

                    elems = document.querySelectorAll("table.header-fixed-table");

                    for (i = 0, len = elems.length; i < len; i++) {
                        try {
                            WRP.UI.initHeaderFixedTable(elems[i]);
                        } catch (e) {
                            console.warn(e);
                        }
                    }

                    popupArea = document.getElementById("popup-area");
                    _popupArea = document.querySelector("#sub_ .popup-area");

                    if (popupArea && _popupArea) {
                        popupArea.innerHTML = _popupArea.innerHTML;
                        //popupArea.innerHTML = popupArea.innerHTML + _popupArea.innerHTML;
                        _popupArea.parentNode.removeChild(_popupArea);
                    }

                    $(".jquery-datepicker:not(.hasDatepicker)").datepicker({
                        dateFormat: "mm/dd/yy",
                        changeYear: true,
                        changeMonth: true
                    });
					try {
						elems = $(".jqx-text-input");
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = elems[i];
                        		$(elem).jqxInput({
                        			width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "120",
    	                        	height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "24",
                        			placeHolder: (elem.getAttribute && elem.getAttribute("placeholder"))? elem.getAttribute("placeholder") : "",
                        			theme: "arctic"
                        		});
                        	}
                        }
					} catch (e) {
						console.warn(e);
					}
					try {
                        elem = $(".jqx-datetime-input");
                        
                        if (elem && elem.length > 0) {                            
                        	elem.jqxDateTimeInput({
                            	width: "100%",
                            	formatString: "MM/dd/yyyy",
                    			theme: "arctic"
                            });
                        }
					} catch (e) {
						
					}
					
					// ComboBox dataset : {label:"string",value:"string"}
					try {
						elems = $(".jqx-plain-combobox:not(.jqx-combobox)");

                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = $(elems[i]);
                        		elem.jqxComboBox({
									source: new $.jqx.dataAdapter({
										datatype: "json",
										datafields: [
											{ name: "label" },
											{ name: "value" }
										]
									}),
									width: "100%",
									height: 20,
									displayMember: "label",
									valueMember: "value"
								});
                        	}
                        }    
					} catch (e) {
						
					}
					
					try {
                        elems = $(".jqx-datetime-range-input");
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = elems[i];
                        		$(elem).jqxDateTimeInput({
                        			width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "200",
    	    	                    height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "24",
	                            	formatString: "MM/dd/yyyy",
	                            	selectionMode: 'range',
    	                        	theme: "arctic"
                        		});
                        	}
                        }  
                        /// change ?�벤?�는 �??�이지?�서 구현
                        /*
	                        $("#jqxWidget").on('change', function (event) {
			                    var selection = $("#jqxWidget").jqxDateTimeInput('getRange');
			                    if (selection.from != null) {
			                        $("#selection").html("<div>From: " + selection.from.toLocaleDateString() + " <br/>To: " + selection.to.toLocaleDateString() + "</div>");
			                    }
			                });
                         */
					} catch (e) {
						
					}
					try {
                        elems = $(".jqx-vertical-split-panel:not(.jqx-splitter)");

                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = $(elems[i]);
                        		elem.jqxSplitter({
	                            	width: "99.8%",
	                            	height: "99.6%",
	                            	orientation: 'vertical',
	                            	panels: [
	                            		{ size: "45%", min: 100, collapsible: false }, 
	                            		{ min: 100, collapsible: false}
	                            	],
                        			theme: "arctic"
	                            });
                        	}
                        }     
					} catch (e) {
						console.warn(e);
					}
					try {
                        elems = $(".jqx-horizontal-split-panel:not(.jqx-splitter)");
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = $(elems[i]);
                        		elem.jqxSplitter({
	                            	width: "99.8%",
	                            	height: "99.6%",
	                            	orientation: 'horizontal',
	                            	panels: [
	                            		{ size: "40%", min: 100, collapsible: false }, 
	                            		{ min: 100, collapsible: false}
	                            	],
                        			theme: "arctic"
	                            });
                        	}
                        }     
                        
					} catch (e) {
						console.warn(e);
					}
					try {
                        elem = $(".jqx-custom-window");	                        
                        if (elem && elem.length > 0) {                            
                        	elem.jqxWindow({
                            	resizable: true,
                            	isModal: true,
                            	autoOpen: false,
                    			theme: "arctic",
                    			maxWidth: window.innerWidth,
                    			maxHeight: window.innerHeight
                            });
                        }
/*
                        elem = $(".jqx-custom-window input[type='text']");	                        
                        if (elem && elem.length > 0) {                            
                        	elem.jqxInput({
                            	
                            });
                        }
*/	                        
                        elems = $(".jqx-tab-panel:not(.jqx-tabs)");	 
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = elems[i];
                        		$(elem).jqxTabs({
	                            	width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "100%",
	                            	height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "100%",
                        			theme: "arctic" 
	                            });	    	                        
    	                        $(elem).on("selected", onJQXTabChanged);
                        	}
                        }     

                        elems = $(".jqx-plain-button:not(.jqx-button)");	
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = elems[i];
                        		$(elem).jqxButton({
                        			width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "120",
    	                        	height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "19",
    	                        	theme: "arctic",
    	                        	textPosition: (elem.getAttribute && elem.getAttribute("textposition"))? elem.getAttribute("textposition") : ""
                        		});
                        	}
                        }   

						// 170318 S
						try{
	                        
	                        elems = $(".jqx-center-imgbeforetext-left-btn:not(.jqx-button)");	// jqx-[img align]-[text image relation]-[text align]-btn
	                        
	                        if (elems && elems.length > 0) {                    
	                        	for (i = 0, len = elems.length; i < len; i++) {
	                        		elem = elems[i];
	                        		if (elem.onclick !== undefined) {
	                        			eventhandler = elem.onclick;
	                        		}
	                        		$(elem).jqxButton({
	                        			width: 120,
	    	                        	height: 27,
		                            	imgPosition: "center",
		                            	textPosition: "left",
		                            	textImageRelation: "imageBeforeText",
		                            	theme: "arctic"
	                        		});
	                        		
	                        		if (eventhandler !== undefined) {
		                        		$(elem).on("click", eventhandler);
	                        		}
	                        		eventhandler = undefined;
	                        	}
	                        }  
						} catch (e){
							console.warn(e);
						}
						// 170318 S		
                        
                        elems = $(".jqx-radio-button:not(.jqx-radiobutton)");
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = elems[i];
                        		$(elem).jqxRadioButton({
                        			width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "120",
    	                        	height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "24",
    	                        	groupName: (elem.getAttribute && elem.getAttribute("groupName"))? elem.getAttribute("groupName"): "",
    	                        	theme: "arctic"
                        		});
                        	}
                        }
                        
                        elems = $(".jqx-empty-category");	
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = elems[i];
                        		$(elem).jqxComboBox({
                        			selectedIndex: -1,
                        			width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "120",
    	                        	height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "24",
    	    	                    placeHolder: (elem.getAttribute && elem.getAttribute("placeholder"))? elem.getAttribute("placeholder") : "",
    	                        	theme: "arctic"
                        		});
                        	}
                        }   
					} catch (e) {
						console.warn(e);
					}

					try {
						elems = $(".jqx-horizontal-progress-bar");
                        
                        if (elems && elems.length > 0) {                    
                        	for (i = 0, len = elems.length; i < len; i++) {
                        		elem = elems[i];
                        		$(elem).jqxProgressBar({
                        			width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "250",
    	                        	height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "30",
    	                        	showText: true,
                        			theme: "arctic"
                        		});
                        	}
                        }
					} catch (e) {
						console.warn(e);
					}
					
					try{
						elems = $(".jqx-check-box:not(.jqx-checkbox)");
						if (elems && elems.length > 0) {                    
							for (i = 0, len = elems.length; i < len; i++) {
								elem = elems[i];
								$(elem).jqxCheckBox({
									width: (elem.style && elem.style.width)? elem.style.width.replace("px","") : "120",
									height: (elem.style && elem.style.height)? elem.style.height.replace("px","") : "24",
									theme: "arctic"
								});
							}
						}
					} catch (e){
						
					}

                    elems = document.querySelectorAll(".split-panel:not(.handled)");
                    for (i = 0, len = elems.length; i < len; i++) {
                        WRP.UI.initSplitPanel(elems[i]);
                    }

                    // article z-index
                    try {
                        elems = document.getElementById("sub_");
                        if (elems.children[0].className === "theme-02") {
                            elems.style.zIndex = 12;
                        } else {
                            elems.style.zIndex = 2;
                        }
                    } catch (e) {

                    }
                }
            });
        } else {
            script = document.createElement("script");
            script.src = "pages/"+pagename+".js?timestamp="+WRPAdminApp.convertDateToString(new Date(), "yyyyMMddHHmmss");
            document.body.appendChild(script);
            script.onload = function(event) {
                if (_pagescript) {
                    WRPAdminApp.pagescript = undefined;
                    WRPAdminApp.pagescript = _pagescript;
                    _pagescript = undefined;
                    document.body.removeChild(script);
                    script = undefined;
                    WRPAdminApp.pagescript.init();
                }
            };
        }
    },
};