/**
 * Created by Researcher01 on 2016-10-07.
 */

var WRPAdminApp = function() {
    var currTabIndex = 0;

    var mouseEventData = {
        target: null,
        position: {
            x: 0,
            y: 0
        },
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        }
    };

    var _startUTCDateTime = null;
    var _endUTCDateTime = null;

    var _firstDateOfMonthUTCDateTime = null;
    var _lastDateOfMonthUTCDateTime = null;
    

    function onBodyMouseDown(event) {
        try {
            if (event.target.className === "title-bar") {
                return;
                mouseEventData.target = event.target;
                while (mouseEventData.target) {
                    if (mouseEventData.target.className === "popup-container") break;
                    mouseEventData.target = mouseEventData.target.parentNode;
                }
                if (mouseEventData.target) {
                    if (mouseEventData.target.parentNode.className !== "popup-area") {
                        mouseEventData.target = null;
                        return;
                    }
                    mouseEventData.start.x = mouseEventData.end.x = event.clientX;
                    mouseEventData.start.y = mouseEventData.end.y = event.clientY;
                    mouseEventData.position.x = mouseEventData.target.offsetLeft;
                    mouseEventData.position.y = mouseEventData.target.offsetTop;
                }
            }
        } catch (e) {
            console.warn(e);
        }
    }

    function onBodyMouseMove(event) {
        try {
            if (mouseEventData.target) {
                mouseEventData.end.x = event.clientX;
                mouseEventData.end.y = event.clientY;
                mouseEventData.target.style.left = (mouseEventData.position.x + (mouseEventData.end.x - mouseEventData.start.x))+ "px";
                mouseEventData.target.style.top = (mouseEventData.position.y + (mouseEventData.end.y - mouseEventData.start.y)) + "px";
            }
        } catch (e) {
            console.warn(e);
        }
    }

    function onBodyMouseUp(event) {
        try {
            if (event.target.className === "close-btn") {
                if (mouseEventData.target) {
                    return;
                }
                mouseEventData.target = event.target;
                while (mouseEventData.target) {
                    if (mouseEventData.target.className === "popup-container") break;
                    mouseEventData.target = mouseEventData.target.parentNode;
                }
                if (mouseEventData.target) {
                    WRPAdminApp.closePopup(mouseEventData.target);
                }
            }
        } catch (e) {
            console.warn(e);
        }
        mouseEventData.target = null;
    }

    function onBodyMouseOut(event) {
        try {
            if (event.clientX < 3 || event.clientX > window.innerWidth - 3) {
                mouseEventData.target = null;
            }
            if (event.clientY < 3 || event.clientY > window.innerHeight - 3) {
                mouseEventData.target = null;
            }

        } catch (e) {
            console.warn(e);
        }
    }

    function toDecimalFormat(value, format) { // number, string
        var i, len;
        if (typeof(format) !== "string") return value;
        value = ""+value;
        for (i = value.length, len = format.length; i < len; i++) {
            value = "0"+value;
        }
        return value;
    }

    function onContainerMouseWheel(event) {
        var target = event.target;
        while(target) {
            try {
                if (target.className === "body") break;
            } catch (e) {
            }

            target = target.parentNode;
        }
        if (!target) return;
        target.scrollTop += event.deltaY * 0.4;
    }
    
    function onJQXTabChanged(event) {
    	var tabContent, table, elems, elem, data, i, len;
    	
    	if (event.target.className.indexOf("jqx-tab-panel") < 0) {
    		return;
    	}
    	
    	elems = $(".jqx-tab-panel .jqx-grid");
    	if (elems && elems.length > 0) {
    		for (i = 0, len = elems.length; i < len; i++) {
    			elem = $(elems[i]);
    			data = elem.jqxGrid("getrows");
    			if (data !== undefined) {
    				elem.jqxGrid("render");
    				continue;
    			}
    			data = elem.jqxTreeGrid("getRows");
    			
    			if (data !== undefined) {
    				elem.jqxTreeGrid("render");
    				if (data.length > 0) {
    					elem.jqxTreeGrid("addRow", null, data, "last");    					
    				}
    				continue;
    			}
    			data = elem.jqxDataTable("getRows");
    			if (data !== undefined) {
    				elem.jqxDataTable("render");
    				continue;
    			}
    		}
    	}
    	
    }
    
    function onJQXWindowOpened(event) {
    	var elems, elem, data, i, len;
    	
    	if (event.target.className.indexOf("jqx-custom-window") < 0) {
    		return;
    	}
    	
    	elems = $(".jqx-custom-window .jqx-grid");
    	if (elems && elems.length > 0) {
    		for (i = 0, len = elems.length; i < len; i++) {
    			elem = $(elems[i]);
    			data = elem.jqxGrid("getrows");
    			if (data !== undefined) {
    				elem.jqxGrid("render");
    				continue;
    			}
    			data = elem.jqxTreeGrid("getRows");
    			
    			if (data !== undefined) {
    				elem.jqxTreeGrid("render");
    				if (data.length > 0) {
    					elem.jqxTreeGrid("addRow", null, data, "last");    					
    				}
    				continue;
    			}
    			data = elem.jqxDataTable("getRows");
    			if (data !== undefined) {
    				elem.jqxDataTable("render");
    				continue;
    			}
    		}
    	}
    }

    return {
        pagename: null,
        pagescript: null,
        init: function(storeId, pageName){
            var elem;

            document.body.addEventListener("mousedown", onBodyMouseDown);
            document.body.addEventListener("mousemove", onBodyMouseMove);
            document.body.addEventListener("mouseup", onBodyMouseUp);
            document.body.addEventListener("mouseout", onBodyMouseOut);

            {
                elem = new Date();
                elem.setHours(0);
                elem.setMinutes(0);
                elem.setSeconds(0);
                _startUTCDateTime = (elem.getUTCFullYear()) + "-" + toDecimalFormat((elem.getUTCMonth() + 1), "00") + "-" + toDecimalFormat(elem.getUTCDate(), "00") + " " + toDecimalFormat(elem.getUTCHours(), "00") + ":" + toDecimalFormat(elem.getUTCMinutes(), "00") + ":" + toDecimalFormat(elem.getUTCSeconds(), "00");

                elem.setHours(23);
                elem.setMinutes(59);
                elem.setSeconds(59);
                _endUTCDateTime = (elem.getUTCFullYear()) + "-" + toDecimalFormat((elem.getUTCMonth() + 1), "00") + "-" + toDecimalFormat(elem.getUTCDate(), "00") + " " + toDecimalFormat(elem.getUTCHours(), "00") + ":" + toDecimalFormat(elem.getUTCMinutes(), "00") + ":" + toDecimalFormat(elem.getUTCSeconds(), "00");

                elem.setDate(1);
                elem.setHours(0);
                elem.setMinutes(0);
                elem.setSeconds(0);
                _firstDateOfMonthUTCDateTime = (elem.getUTCFullYear()) + "-" + toDecimalFormat((elem.getUTCMonth() + 1), "00") + "-" + toDecimalFormat(elem.getUTCDate(), "00") + " " + toDecimalFormat(elem.getUTCHours(), "00") + ":" + toDecimalFormat(elem.getUTCMinutes(), "00") + ":" + toDecimalFormat(elem.getUTCSeconds(), "00");

                elem = new Date(elem.getFullYear(), elem.getMonth() + 1, elem.getDate() - 1, 23, 59, 59);
                _lastDateOfMonthUTCDateTime = (elem.getUTCFullYear()) + "-" + toDecimalFormat((elem.getUTCMonth() + 1), "00") + "-" + toDecimalFormat(elem.getUTCDate(), "00") + " " + toDecimalFormat(elem.getUTCHours(), "00") + ":" + toDecimalFormat(elem.getUTCMinutes(), "00") + ":" + toDecimalFormat(elem.getUTCSeconds(), "00");
            }

            if (arguments.length > 0) {
                WRPAdminApp.setAssignedStoreList(storeId);
            } else {
                WRPAdminApp.setAssignedStoreList();
            }
            
            $.ajax({
				url: "ajax/store/getCurrentStoreTime.jsp",
				method: "GET",
				dataType: "text",
				success: function(result) {
					if (result && result.length > 0 && WRPCommon && WRPCommon.TimeModule  && WRPCommon.TimeModule.setTime) {
						WRPCommon.TimeModule.setTime(result);
						if (pageName !== undefined) {
							WRPAdminApp.setPage(pageName);							
						} else {
							WRPAdminApp.setPage("dashboard");
						}
					}
				}
			});
        },
        logoutSystem: function() {
            $.ajax({
                url: "ajax/session/logoutSystem.jsp",
                method: "POST",
                success: function() {
                    location.href="./";
                }
            });
        },
        allClose: function() {
        	$(".menu-wrapper").css("display", "none");
    		$(".sub-menu-container").css("display", "none");
        },
        submenu: function() { // element id
        	var elem = $("#"+arguments[0]);
        	var drop = $("#"+arguments[0]+"-drop");
        	if(elem.css("display") == "none") {	
        		$(".dropdown").css("background-image", "url(img/dropdown.png)");
        		drop.css("background-image", "url(img/dropup.png)");
        		$(".menu-wrapper").css("display", "none");
        		$(".sub-menu-container").css("display", "none");
        		elem.slideToggle({
        			duration: 150,
        			complete: function() { 				
        				elem.css("display", "block");	
        			}
        		});
        	}
        	else if(elem.css("display") == "block") {	
        		drop.css("background-image", "url(img/dropdown.png)");
        		elem.slideToggle({
        			duration: 150,
        			complete: function() {
        				elem.css("display", "none");
        			}
        		});
        	}	
        },
        subsubmenu: function() { // element id
        	var elem = $("#"+arguments[0]);
        	var drop = $("#"+arguments[0]+"-drop");
        	if(elem.css("display") == "none") {	
        		$(".dropdown").css("background-image", "url(img/dropdown.png)");
        		drop.css("background-image", "url(img/dropup.png)");
        		$(".sub-menu-container").css("display", "none");
        		elem.slideToggle({
        			duration: 150,
        			complete: function() { 				
        				elem.css("display", "block");	
        			}
        		});
        	}
        	else if(elem.css("display") == "block") {	
        		drop.css("background-image", "url(img/dropdown.png)");
        		elem.slideToggle({
        			duration: 150,
        			complete: function() {
        				elem.css("display", "none");
        			}
        		});
        	}
        },
        setPage: function() { // 0: pagename, 1: panelname
            var article, i, len, elem, isFound, pagename, panel, script;
            if (arguments.length < 1) {
                console.warn("no input element or pagename");
                return;
            }

            article = document.getElementById("article");
            if (!article) {
                console.warn("not found article");
                return;
            }

            pagename = arguments[0];
            panel = arguments[1];
            
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
                        if (panel != undefined)	WRP.UI.changePanelBySubmenu(panel);
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
                        document.body.appendChild(script);
                        script.onload = function(event) {
                            if (_pagescript) {
                                WRPAdminApp.pagescript = undefined;
                                WRPAdminApp.pagescript = _pagescript;
                                _pagescript = undefined;
                                document.body.removeChild(script);
                                script = undefined;

                                if (document.querySelector("div#article > div[pagename='"+WRPAdminApp.pagename+"']")) {
                                    if (WRPAdminApp.pagescript.init) {
                                        setTimeout(
                                            WRPAdminApp.pagescript.init
                                        , 50);
                                    }
                                }
                                
                                
                                
                                if (panel != undefined)	WRP.UI.changePanelBySubmenu(panel);
                                WRPAdminApp.getCategoryList();
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
                        _popupArea = document.querySelector("#article .popup-area");

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
                        	elems =  document.querySelector(".page-submenu-container");
                        	if(elems){
                        		elems.children[0].style.backgroundColor = 'rgba(200,200,200,0.5)';
                        	}
                        }catch(e){
                        	console.warn(e);
                        }
                        
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
							elems = $(".jqx-custom-window");	                        
	                        if (elems && elems.length > 0) {    
	                        	for (i = 0, len = elems.length; i < len; i++) {
	                        		elem = $(elems[i]);
		                        	elem.jqxWindow({
		                            	resizable: true,
		                            	isModal: true,
		                            	autoOpen: false,
	                        			theme: "arctic",
	                        			maxWidth: window.innerWidth,
	                        			maxHeight: window.innerHeight
		                            });

		                        	elem.on("open", onJQXWindowOpened);
	                        	}
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
                            elems = document.getElementById("article");
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

                        if (document.querySelector("div#article > div[pagename='"+WRPAdminApp.pagename+"']")) {
                            if (WRPAdminApp.pagescript.init) {
                                WRPAdminApp.pagescript.init();
                            }
                        }
                    }
                };
            }
        },
        setSubMenuPage: function() { // 0: pagename
        	var article, i, len, elem, isFound, pagename, panel, script, sub_, submenu, submenuContainer;
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
                submenu = document.querySelector(".submenu[panelname='"+ arguments[0] + "']");
                submenuContainer = submenu.parentNode;
        	} else {
        		pagename = arguments[0].getAttribute("pagename");
                submenu = arguments[0];
                submenuContainer = submenu.parentNode;
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

            try{
            	for(i = 0; i < submenuContainer.children.length; i++){
            		if(submenuContainer.children[i].className == "submenu"){
            			submenuContainer.children[i].style.backgroundColor = 'rgba(0,0,0,0)';
            		}
            	}

            	submenu.style.backgroundColor = 'rgba(200,200,200,0.5)';
            }catch(e){
            	console.warn(e);
            	return;
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

							elems = $(".jqx-custom-window");	                        
	                        if (elems && elems.length > 0) {    
	                        	for (i = 0, len = elems.length; i < len; i++) {
	                        		elem = $(elems[i]);
		                        	elem.jqxWindow({
		                            	resizable: true,
		                            	isModal: true,
		                            	autoOpen: false,
	                        			theme: "arctic",
	                        			maxWidth: window.innerWidth,
	                        			maxHeight: window.innerHeight
		                            });

		                        	elem.on("open", onJQXWindowOpened);
	                        	}
	                        }

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

        openPopupInPage: function() {
            var popupArea, i, len, elem, popupname, elemList, flag, viewPostFix;
            if (arguments.length < 1) {
                console.warn("no input popup name");
                return;
            }
            if (WRPAdminApp.pagename === undefined) return;
            popupArea = document.querySelector("#popup-area");
            if (!popupArea) return;

            popupname = arguments[0];

            viewPostFix = "-view";

            for (i = 0, len = popupArea.children.length; i < len; i++) {
                try {
                    elem = popupArea.children[i];
                    if (elem.getAttribute("popupname") === popupname) {
                        break;
                    }
                    elem = undefined;
                } catch (e) {
                    console.warn(e);
                }
            }

            if (elem !== undefined && elem) {
                popupArea.style.display = "block";
                elem.style.display = "block";

                elemList = elem.children;
                flag = true;
                for (i = 0, len = elemList.length; i < len; i++) { // 첫번�?view�?display�?block?�로 ?�정, ?�머지 view??none
                    try {
                        elem = elemList[i];
                        if (elem.className.lastIndexOf(viewPostFix) == ((elem.className.length) - viewPostFix.length)) {
                            if (flag === true) {
                                elem.style.display = "block";
                                flag = false;
                            } else {
                                elem.style.display = "none";
                            }
                        }
                    } catch (e) {

                    }
                }
            }
        },
        closePopup: function() {
            try {
                var i, len, isTrue, elem;
                if (arguments.length < 1) {
                    console.warn("no input element");
                    return;
                }

                if (typeof(arguments[0]) === "string") {
                    elem = document.querySelector("#popup-area .popup-container[popupname='"+ (arguments[0]) +"']");
                } else {
                    elem = arguments[0];
                }

                while(elem) {
                    if (elem.className === "popup-container") break;
                    elem = elem.parentNode;
                }

                if (!elem) return;

                try {
                    if (elem.parentNode.id === "popup-area") {
                        elem.style.display = "none";

                        elem = elem.parentNode;

                        isTrue = true;
                        for (i = 0, len = elem.children.length; i < len; i++) {
                            try {
                                if (elem.children[i].style.display == "block") {
                                    isTrue = false;
                                    break;
                                }
                            } catch (e) {

                            }
                        }
                        if (isTrue) {
                            elem.style.display = "none";
                        }
                    }
                } catch (e) {
                    console.warn(e);
                }
            } catch (e) {
                console.warn(e);
            }
        },
        setViewInPopup: function() {
            var elem, viewname, popupname, popupContainer, i, len, viewPostFix;
            if (arguments.length < 2) {
                console.warn("setViewInPopup : you must set parameters (popupname, viewname)");
                return;
            }

            viewPostFix = "-view";

            popupname = arguments[0];
            viewname = arguments[1];
            
            
            popupContainer = document.querySelector("div#popup-area .popup-container[popupname='"+ (popupname) +"']");
            if (!popupContainer) {
            	popupContainer = document.getElementById(popupname);
            	if (!popupContainer) {
                    console.warn("setViewInPopup : popupContainer is not existing");
                    return;
            	}
            }

            for (i = 0, len = popupContainer.children.length; i < len; i++) {
                try {
                    elem = popupContainer.children[i];
                    if (elem.className.lastIndexOf(viewPostFix) == ((elem.className.length) - viewPostFix.length)) {
                        if (elem.getAttribute("viewname") === viewname) {
                            elem.style.display = "block";
                        } else {
                            elem.style.display = "none";
                        }
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        },
        setAssignedStoreList: function() {

            var storeId;

            if (arguments.length > 0) {
                storeId = arguments[0];
            }

            $.ajax({
                url: "ajax/store/getManagerStoreAssignedList.jsp",
                method: "POST",
                async: false,
                dataType: "json",
                success: function(result) {
                    var selectStoreBoxList, data, i, len, select, innerHTML;

                    data = result.data;
                    if (!data) return;

                    innerHTML = [];
                    for (i = 0, len = data.length; i < len; i++) {
                        innerHTML.push('<option value="');
                        data[i].storeId = String(data[i].storeId);
                        innerHTML.push(data[i].storeId);
                        if (storeId !== undefined) {
                            if (storeId.toLowerCase() === data[i].storeId.toLowerCase()) {
                                innerHTML.push('" selected>');
                            } else {
                                innerHTML.push('">');
                            }
                        } else {
                            if (i == 0) {
                                innerHTML.push('" selected>');                                
                            } else {
                                innerHTML.push('">');
                            }
                        }
                        innerHTML.push(data[i].storeId.toUpperCase());
                        innerHTML.push('</option>');
                    }

                    selectStoreBoxList = document.querySelectorAll("select.select-store");

                    for (i = 0, len = selectStoreBoxList.length; i < len; i++) {
                        selectStoreBoxList[i].innerHTML = innerHTML.join("");
                    }

                    innerHTML = undefined;
                }
            })
 },
        editOnMasterOwner: function() {
        	var components = $('#master-owner-edit-window');
			if (components) {
				components.jqxWindow("width", 730);
				components.jqxWindow("height", 300);
				components.css("top", "calc(50% - 160px)");
	    		components.css("left", "calc(50% - 375px)");
			}
        	
			$.ajax({
                url: "ajax/subdealer/getOwnerMasterInfo.jsp",
                method: "POST",
                dataType: "json",
                success: function(result) {
                	var data;
                	data = result.data;
                	if(!data){
                		alert("No Master or Owner");
                		return;
                	}

                	document.getElementById("master-owner-edit-id").value = (data.user_id !== undefined && data.user_id)? data.user_id : '';
                	document.getElementById("master-owner-edit-password").value = (data.password !== undefined && data.password)? data.password : '';
                	document.getElementById("master-owner-edit-first-name").value = (data.first_name !== undefined && data.first_name)? data.first_name : '';
                	document.getElementById("master-owner-edit-address1").value = (data.address1 !== undefined && data.address1)? data.address1 : '';
                	document.getElementById("master-owner-edit-last-name").value = (data.last_name !== undefined && data.last_name)? data.last_name : '';
                	document.getElementById("master-owner-edit-address2").value = (data.address2 !== undefined && data.address2)? data.address2 : '';
                	document.getElementById("master-owner-edit-city").value = (data.city !== undefined && data.city)? data.city : '';
                	document.getElementById("master-owner-edit-state").value = (data.state !== undefined && data.state)? data.state : '';
                	document.getElementById("master-owner-edit-zipcode").value = (data.zipcode !== undefined && data.zipcode)? data.zipcode : '';
                	document.getElementById("master-owner-edit-email").value = (data.email !== undefined && data.email)? data.email : '';
                	document.getElementById("master-owner-edit-mobile").value = (data.tel !== undefined && data.tel)? data.tel : '';
                	
                	$('#master-owner-edit-window').jqxWindow('open');
                }
            });
        },
        editMasterOwnerInfo: function() {
        	var param = {};
        	
        	if($("#master-owner-edit-password").val() == "" || !$("#master-owner-edit-password")) {
        		alert("Input Pawssword."); return;
        	}
        	
        	try {
        		param.password = $("#master-owner-edit-password").val();
        	}catch(e) { console.warn(e); }
        	try {
        		//alert($("#master-owner-edit-first-name").val());
        	param.firstName = $("#master-owner-edit-first-name").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.address1 = $("#master-owner-edit-address1").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.lastName = $("#master-owner-edit-last-name").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.address2 = $("#master-owner-edit-address2").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.city = $("#master-owner-edit-city").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.state = $("#master-owner-edit-state").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.zipcode = $("#master-owner-edit-zipcode").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.email = $("#master-owner-edit-email").val();
        	}catch(e) { console.warn(e); }
        	try {
        	param.mobile= $("#master-owner-edit-mobile").val();
        	}catch(e) { console.warn(e); }
        	
			$.ajax({
                url: "ajax/subdealer/editOwnerMasterInfo.jsp",
                data: param,
                method: "POST",
                dataType: "json",
                success: function(result) {
                	if(result == 0) {
                		alert("Complete");
                		$('#master-owner-edit-window').jqxWindow('close');
                	}else alert("Error");
                }
            });
        },
        onStoreChanged: function() {
        	/* 170117 jh : select store confirm */
        	if(!confirm("Are you sure?")){
        		
        		$.ajax({
                    url: "ajax/session/preSelect.jsp",
                    data: {
                        select: "store"
                    },
                    method: "POST",
                    success: function(result) {
                        $("#select-store").val(result.trim()).prop("selected", true);
                    }
                });
        		return;
        	} 
        	/**/
            if (arguments.length < 1) {
                return;
            }
            $.ajax({
                url: "ajax/session/setStore.jsp",
                data: {
                    storeId: arguments[0]
                },
                method: "POST",
                success: function() {
                    location.reload();
                }
            });
        },
        getCategoryList: function() {
            var storeId;

            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) return;
            } catch (e) {
                console.warn(e);
                return;
            }

            $.ajax({
                url: "ajax/category/getCategoriesByParentSid.jsp",
                data: {
                    storeId: storeId,
                    parentSid: 0
                },
                method: "POST",
                dataType: "json",
                success: function(result) {
                    var data, i, len, obj, innerHTML, selectBox, source, adapter;
                    data = result.data;

                    if (!data) return;

                    innerHTML = [];

                    innerHTML.push('<option value="0" selected>ALL</option>');
                    for (i = 0, len = data.length; i < len ; i++) {
                        obj = data[i];
                        if (obj.sid === undefined || obj.sid === null) continue;
                        innerHTML.push('<option value="');
                        innerHTML.push(obj.sid);
                        innerHTML.push('">');
                        innerHTML.push(obj.categoryName);
                        innerHTML.push('</option>');
                    }

                    selectBox = document.querySelectorAll("select.select-category:not(.handled)");

                    for (i = 0, len = selectBox.length; i < len; i++) {
                        obj = selectBox[i];
                        obj.innerHTML = innerHTML.join("");
                        obj.addEventListener("change", WRPAdminApp.getSubCategoryList);
                        obj.className = obj.className + " handled";
                    }
                    
                    innerHTML = undefined;
                    
                    try {
                        selectBox = $(".jqx-select-item-category");
                        if (selectBox && selectBox.length > 0) {
                        	source = {
                        		datatype: "json",
                        		datafields: [
                        			{ name: "sid" },
                        			{ name: "categoryName" }
                        		],
                        		localdata: data
                        	};
                        	
                        	adapter = new $.jqx.dataAdapter(source);
                        	
                        	for (i = 0, len = selectBox.length; i < len; i++) {
                        		obj = selectBox[i];
                        		$(obj).off("change");
                        		$(obj).jqxComboBox({
                        			selectedIndex: -1,
                        			placeHolder: "Select Category",
                        			source: adapter,
                        			displayMember: "categoryName",
                        			valueMember: "sid",
                        			width: (obj.style && obj.style.width)? obj.style.width.replace("px", "") : "120",
                                	height: (obj.style && obj.style.height)? obj.style.height.replace("px", "") : "24"
                        		});
                        		$(obj).on("change", WRPAdminApp.jqxGetSubCategoryList);
                        	}
                        }
                    } catch (e) {
                    	console.warn(e);
                    }

                }
            });
        },
        jqxGetSubCategoryList: function(event) {
        	var sid, targetId, storeId;
        	        	
        	try {
            	targetId = event.target.id;
            	if (!targetId) return;

            	sid = event.args.item.originalItem.sid;
        	} catch (e) {
        		console.warn(e);
        		return;
        	}
        	
            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) return;
            } catch (e) {
                console.warn(e);
                return;
            }
        	
        	$.ajax({
                url: "ajax/category/getCategoriesByParentSid.jsp",
                data: {
                    storeId: storeId,
                    parentSid: sid
                },
                method: "POST",
                dataType: "json",
                success: function(result) {
                    var data, source, adapter, elem;
                    
                    data = result.data;

                    if (!data) return;
                    
                    elem = $("#"+targetId+"-sub");
                    if (elem && elem.length > 0) {
                        
                        source = {
                    		datatype: "json",
                    		datafields: [
                    			{ name: "sid" },
                    			{ name: "subCategoryName" }
                    		],
                    		localdata: data
                    	};
                        
                    	adapter = new $.jqx.dataAdapter(source);                    	
                    	
                    	elem.jqxComboBox({
                			selectedIndex: -1,
                			placeHolder: "Select Sub-Category",
                			source: adapter,
                			displayMember: "subCategoryName",
                			valueMember: "sid",
                			width: (elem[0].style && elem[0].style.width)? elem[0].style.width.replace("px", "") : "120",
                        	height: (elem[0].style && elem[0].style.height)? elem[0].style.height.replace("px", "") : "24"
                		});
                    }                    	
                }
            });
        },
        getSubCategoryList: function(event) {
            var target, targetId, category, storeId;

            target = event.target;
            targetId = target.id;

            if (!targetId) return;

            if (!document.getElementById(targetId + "-sub")) return;

            category = parseInt(target.value);

            if (isNaN(category)) return;

            if (category == 0) {
                document.getElementById(targetId + "-sub").innerHTML = '<option value="0" selected>ALL</option>';
                return;
            }

            try {
                storeId = document.getElementById("select-store").value;
                if (storeId.length == 0) return;
            } catch (e) {
                console.warn(e);
                return;
            }

            $.ajax({
                url: "ajax/category/getCategoriesByParentSid.jsp",
                data: {
                    storeId: storeId,
                    parentSid: category
                },
                method: "POST",
                dataType: "json",
                success: function(result) {
                    var data;

                    var data, i, len, obj, innerHTML, selectBox;
                    data = result.data;

                    if (!data) return;

                    innerHTML = [];

                    innerHTML.push('<option value="0" selected>ALL</option>');
                    for (i = 0, len = data.length; i < len ; i++) {
                        obj = data[i];
                        if (obj.sid === undefined || obj.sid === null) continue;
                        innerHTML.push('<option value="');
                        innerHTML.push(obj.sid);
                        innerHTML.push('">');
                        innerHTML.push(obj.subCategoryName);
                        innerHTML.push('</option>');
                    }

                    try {
                        document.getElementById(targetId + "-sub").innerHTML = innerHTML.join("");
                    } catch (e) {
                        console.warn(e);
                    }

                    innerHTML = undefined;
                }
            });
        },
        toDecimalFormat: function(value, format) {
            return toDecimalFormat(value,format);
        },
        getStartUTCDateTime: function() {
            return _startUTCDateTime;
        },
        getEndUTCDateTime: function() {
            return _endUTCDateTime;
        },
        getFirstDateOfMonthUTCDateTime: function() {
            return _firstDateOfMonthUTCDateTime;
        },
        getLastDateOfMonthUTCDateTime: function() {
            return _lastDateOfMonthUTCDateTime;
        },
        /* 170109 jh : timezone control */
		/*
		 * timeZone(date)
		 * date ?�식 : 01/01/2017 00:00:00
		 * 반환??�??�식?�?date?�?같음.
		 */
		timeZone: function(date) {
			
			var h, m;
			var date = date;
			var localDate = new Date();
			var timeLag = -(localDate.getTimezoneOffset() / 60);
			
			h = parseInt(timeLag/1);
			m = (timeLag - h) * 60;

			var index = date.indexOf(" ");
			var mdy = new Date(date.substring(0, index));
			var hms = date.substring(index+1);
			
			var dataHMS = hms.split(":"); // [0]:hour [1]:min [2]: sec
			
			dataHMS[0] = parseInt(dataHMS[0])+parseInt(h);
			dataHMS[1] = parseInt(dataHMS[1])+parseInt(m);

			// min
			if(dataHMS[1] > 59)		{ dataHMS[0] += 1; dataHMS[1] -= 60; } 
			else if(dataHMS[1] < 0)	{ dataHMS[0] -= 1; dataHMS[1] += 60; }
			// hour
			if(dataHMS[0] > 23)		{ dataHMS[0] -= 24; mdy.setDate(mdy.getDate()+1); }
			else if(dataHMS[0] < 0)	{ dataHMS[0] += 24; mdy.setDate(mdy.getDate()-1); }

			var date1 = toDecimalFormat((mdy.getMonth()+1),"00")+"/"+ toDecimalFormat(mdy.getDate(),"00")+"/"+mdy.getFullYear()+" "+toDecimalFormat(dataHMS[0],"00")+":"+toDecimalFormat(dataHMS[1],"00")+":"+toDecimalFormat(dataHMS[2],"00");
			return date1;
		},
		/* 170109 jh */
		getRowIndexByKeywordInJQXGrid: function( jqxgrid, keyword, start_index) { // keyword : string or string array
			var rows, i, len, key, row, i2, len2, found;			
			
			if (jqxgrid === undefined || keyword === undefined || !jqxgrid || !keyword) {
				return;
			}
			
			if (jqxgrid.length < 1) {
				return;
			}
			
			try {
				rows = jqxgrid.jqxGrid('getrows');
				for (i = ((start_index !== undefined)? start_index : 0), len = rows.length; i < len; i++) {
					row = rows[i];
					for (key in row) {
						if (typeof(keyword) === "object") {
							found = true;
							for (i2 = 0, len2 = keyword.length; i2 < len2; i2++) {
								if (String(row[key]).indexOf(String(keyword[i2])) == -1) {
									found = false;
									break;
								}
							}
							if (found === true) {
								return i;
							}
						} else if (typeof(keyword) === "string") {
							if (String(row[key]).indexOf(String(keyword)) > -1) {
								return i;
							}
						}
					}
				}
			} catch (e) {
				console.warn(e);
				return;
			}
			
			return -1;
		},
		convertDateToString: function(date, format) {
			var result, tmp;
			if (typeof(date) !== "object" || !(date instanceof Date) || typeof(format) !== "string") {
				return;
			}
			
			result = format;
			
			tmp = date.getFullYear();
			
			result = result.replace(/yyyy/gi, tmp);
			
			tmp = date.getMonth() + 1;
			
			if (tmp < 10) {				
				result = result.replace(/MM/gi, ("0"+tmp));
			} else {
				result = result.replace(/MM/gi, tmp);
			}
			
			tmp = date.getDate();
			
			if (tmp < 10) {				
				result = result.replace(/dd/gi, ("0"+tmp));
			} else {
				result = result.replace(/dd/gi, tmp);
			}
			
			tmp = date.getHours();
			
			if (tmp < 10) {				
				result = result.replace(/HH/gi, ("0"+tmp));
			} else {
				result = result.replace(/HH/gi, tmp);
			}
			
			tmp = date.getMinutes();
			
			if (tmp < 10) {				
				result = result.replace(/mm/gi, ("0"+tmp));
			} else {
				result = result.replace(/mm/gi, tmp);
			}
			
			tmp = date.getSeconds();
			
			if (tmp < 10) {				
				result = result.replace(/ss/gi, ("0"+tmp));
			} else {
				result = result.replace(/ss/gi, tmp);
			}
			
			return result;
		}
    };
}();