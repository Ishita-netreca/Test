
var _pagescript = {
    _selectedStoreSid: 0,
    _selectedStoreId: null,
    _selectedNotificationRuleSid: 0,
    _selectedRegisterSid: 0,
    /*170210 jh : monthly goal selected store*/
    _selectedMonthlyStoreId: null,
    _selectedMonthlyGoal: null,
    _selectedExpenseSid: 0,
    _license: 0,
    _store: 0,
    /*monthly goal selected store end*/
    init: function() {
        var date = new Date(), elem;
        
    	try {
			WRPComponents('div[pagename="qpay_favorite_providers"] > .page-submenu-container > .submenu[panelname="qpay_favorite_providers"]').addShadowedImage('img/icon/qpay_favorite.png');
		} catch (e) {
			
		}
		
		try {
			elem = $(".jqx-date-input");

			if (elem && elem.length > 0) {                            
				elem.jqxDateTimeInput({
					width: "98%",
	            	formatString: "HH:mm:ss", 
	            	showTimeButton: true, 
	            	showCalendarButton: false
				});
			}
		} catch (e) {

		}
		
		
    	elem = $("#jqx-store-favorite-provider-list");        
        if (elem) {
        	elem.jqxGrid({
        		width: "99.8%",
				height: "99%",
				theme: "arctic",
				filterable: false,
				editable: true,
				selectionMode: "custom",
				sortable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						// hidden end
						{ name: "brand_name", type: "string" },
						{ name: "favorite_flag", type: "bool" }
					]
				}),
				columns: [
					{ datafield: "sid", hidden: true, editable: false }, 
					{ text: "Brand Name", datafield: "brand_name", editable: false, autoCellHeight: false },
					{ text: "Favorite", datafield: "favorite_flag", columntype: 'checkbox', width: 60, editable: true, autoCellHeight: false }
				]
        	});
        	
        	elem.on("rowdoubleclick", WRPAdminApp.pagescript.toggleQPayProviderFavorite);
        }
    	
        WRPAdminApp.pagescript.getQPayFavoriteProviderList();
    },
    
    /* q-pay favorite providers list updated at 170119 */
    getQPayFavoriteProviderList: function() {
    	var store_id;
        
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/providers/getProvidersList.jsp",
        	data: {
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, i, len, obj;
        		data = result.data;
        		
        		if (!data) return;
        		
        		for (i = 0, len = data.length; i < len; i++) {
        			obj = data[i];
        			if (parseInt(obj.favorite_flag) === 1) {
        				obj.favorite_flag = true;
        			} else {
        				obj.favorite_flag = false;
        			}
        		}
        		
        		obj = $("#jqx-store-favorite-provider-list");        
        		
        		if (obj) {
        			obj.jqxGrid("clear");
        			obj.jqxGrid("addrow", null, data);
        		}
        	}
        });
    },
    toggleQPayProviderFavorite: function(event) {
    	var list, flag;
    	list = $("#jqx-store-favorite-provider-list");        
    	if (list) {
    		flag = list.jqxGrid("getcellvalue", event.args.rowindex, "favorite_flag");
    		if (flag === true) {
        		list.jqxGrid("setcellvalue", event.args.rowindex, "favorite_flag", false);    			
    		} else {
        		list.jqxGrid("setcellvalue", event.args.rowindex, "favorite_flag", true);    			
    		}
    	}
    },
    saveQPayProviderFavorite: function() {
    	var list, rows, i, len, row, sid_list, store_id;
        
        try {
        	store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
    	list = $("#jqx-store-favorite-provider-list");
    	
    	if (list) {
    		rows = list.jqxGrid("getrows");
    		
    		sid_list = [];
    		
    		for (i = 0, len = rows.length; i < len; i++) {
    			row = rows[i];
    			if (row.favorite_flag === true) {
    				sid_list.push(""+row.sid);
    			}
    		}
    		
    		console.log(JSON.stringify(sid_list).replace("[","").replace("]","").replace(/\"/gi, "'"));
    		
    		$.ajax({
    			url: "ajax/providers/setProviders.jsp",
    			data: {
    				store_id: store_id,
    				sid_list_str: JSON.stringify(sid_list).replace("[","").replace("]","").replace(/\"/gi, "'")
    			},
    			method: "POST",
    			dataType: "json",
    			success: function(result) {
    				if (result === 0) {
    					WRPCommon.MsgBoxModule.alert({
    						message: "Completed"
    					});
    				} else {
    					WRPCommon.MsgBoxModule.alert({
    						message: "Error : " + result
    					});
    				}
    			}
    		});
    	}
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