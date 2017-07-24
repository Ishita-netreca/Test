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
			WRPComponents('div[pagename="sys_conf"] > .page-submenu-container > .submenu[panelname="item_category"]').addShadowedImage('img/icon/category_01.png');
		} catch (e) {
			
		}
		
		var components;
		
		components = $('#category-info-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 220);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 180) });
    	}
    	
    	components = $('#sub-category-info-window');
    	if (components) {
    		components.jqxWindow("width", 500);
    		components.jqxWindow("height", 250);
    		components.jqxWindow("position", { x:((window.innerWidth * 0.5) - 300) , y: ((window.innerHeight * 0.5) - 180) });
    	}
    	
        WRPAdminApp.pagescript.getCategoryList();
    },
    getCategoryList: function() {
        var storeId;

        WRPAdminApp.pagescript._selectedCategorySid = 0;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        var elem;
    	var datarow = new Array();
    	
    	var source = 
		{
			localdata: datarow,
			datafields:
				[
					{ name: "sid", type: "number" },
					{ name: "Category", type: "string" },
					{ name: "SubCategory", type: "string" }
				],
				datatype: "json"
		};
		
    	var dataAdapter = new $.jqx.dataAdapter(source);
		elem = $("#jqx-sys-sub-category-list");
		if (elem) {
			elem[0].parentNode.innerHTML = '<div id="jqx-sys-sub-category-list"></div>';
		}

		elem = $("#jqx-sys-sub-category-list");

		if (elem) {
			elem.jqxGrid({
				width : '100%',
				height : '100%',
				source : dataAdapter,
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : [ 
					{ text: 'Sub Category', datafield: 'SubCategory', width: '50%', cellsalign:'center', align: 'center'},
					{ text: 'Category', datafield: 'Category', width: '50%', cellsalign:'center', align: 'center'},
				 ]
			});
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
            	var elem;
            	var datarow = new Array();
            	var innerHTML= [];
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		
            		row["sid"] = result.data[i].sid;
            		row["Category"] = result.data[i].categoryName;
            		
            		datarow[i] = row;
            		
            		innerHTML.push('<option value="');
                    innerHTML.push(result.data[i].sid);
                    if (i == 0) {
                        innerHTML.push('" selected>');
                    } else {
                        innerHTML.push('">');
                    }
                    innerHTML.push(result.data[i].categoryName);
                    innerHTML.push('</option>');
            	}
            	
            	try {
                    document.getElementById("sys-conf-parent-category-name").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "Category", type: "string" },
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-sys-category-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-sys-category-list"></div>';
            	}
    		
            	elem = $("#jqx-sys-category-list");
    		
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
	                		   { text: 'Category', datafield: 'Category', width: '100%', cellsalign:'center', align: 'center'},
		                     ]
            			});
            		
            		$("#jqx-sys-category-list").on('rowselect', WRPAdminApp.pagescript.getSubCategoryList);
            		$("#jqx-sys-category-list").on('rowdoubleclick', WRPAdminApp.pagescript.getCategoryInfo);
            	}
            }
        });
    },
    getSubCategoryList: function(event) {
        var storeId, rowdata;

        if(arguments.length > 0){
        	rowdata = event.args.row;
        	WRPAdminApp.pagescript._selectedSubCategorySid = 0;
        	WRPAdminApp.pagescript._selectedCategorySid = rowdata.sid;
        }else{
        	var getselectedrowindexes = $('#jqx-sys-category-list').jqxGrid('getselectedrowindexes');
            var rowdata = $('#jqx-sys-category-list').jqxGrid('getrowdata', getselectedrowindexes[0]);
            WRPAdminApp.pagescript._selectedSubCategorySid = 0;
            WRPAdminApp.pagescript._selectedCategorySid = rowdata.sid;
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
                parentSid: WRPAdminApp.pagescript._selectedCategorySid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem;
            	var datarow = new Array();
        	
            	for (var i = 0; i < result.data.length; i++){
            		var row = {};
            		
            		row["sid"] = result.data[i].sid;
            		row["Category"] = result.data[i].categoryName;
            		row["SubCategory"] = result.data[i].subCategoryName;
            		
            		datarow[i] = row;
            		
            	}
            	
            	
            	var dataAdapter = new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						{ name: "sid", type: "number" },
						{ name: "Category", type: "string" },
						{ name: "SubCategory", type: "string" }
					],
					localdata: datarow
				});
            	
            	elem = $("#jqx-sys-sub-category-list");
            	if (elem) {
            		elem[0].parentNode.innerHTML = '<div id="jqx-sys-sub-category-list"></div>';
            	}
    		
            	elem = $("#jqx-sys-sub-category-list");
    		
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
	                		   { text: 'Sub Category', datafield: 'SubCategory', width: '50%', cellsalign:'center', align: 'center'},
	                		   { text: 'Category', datafield: 'Category', width: '50%', cellsalign:'center', align: 'center'},
		                     ]
            			});
           
            		$("#jqx-sys-sub-category-list").on('rowdoubleclick', WRPAdminApp.pagescript.getSubCategoryInfo);
            	}
            }
        });
    },
    getCategoryInfo: function(event) {
        var storeId, rowdata;

        rowdata = event.args.row.bounddata;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/getCategoryInfoBySid.jsp",
            data: {
                categorySid: rowdata.sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data[0];
                if (!data) return;

                WRPAdminApp.pagescript._selectedCategorySid = data.sid;

                try {
                    document.getElementById("sys-conf-input-category-name").value = data.categoryName;
                } catch (e) {
                    console.warn(e);
                    return;
                }
                $('#category-info-window').jqxWindow('open');
            }
        });
    },
    initCategoryInfo: function() {
        WRPAdminApp.pagescript._selectedCategorySid = 0;

        try {
            document.getElementById("sys-conf-input-category-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }

        $('#category-info-window').jqxWindow('open');
    },
    setCategoryInfo: function() {
        var storeId, categoryName;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            categoryName = document.getElementById("sys-conf-input-category-name").value;
            if (categoryName.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Category Name"
            	});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/updateCategoryInfo.jsp",
            data: {
                storeId: storeId,
                categoryName: categoryName,
                categorySid: WRPAdminApp.pagescript._selectedCategorySid,
                parentSid: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Complete",
                		okBtnClick: function(){
                            WRPAdminApp.pagescript.getCategoryList();
                            $('#category-info-window').jqxWindow('close');
                		}
                	});
                } else if (result === 1) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "This category name has already exists"
                	});
                } else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error : " + result
                	});
                }
            }
        });
    },
    getSubCategoryInfo: function(event) {
        var storeId, rowdata;

        rowdata = event.args.row.bounddata;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/getCategoryInfoBySid.jsp",
            data: {
                categorySid: rowdata.sid,
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data[0];
                if (!data) return;

                WRPAdminApp.pagescript._selectedSubCategorySid = data.sid;

                try {
                    document.getElementById("sys-conf-input-sub-category-name").value = data.categoryName;
                } catch (e) {
                    console.warn(e);
                    return;
                }

                try {
                    document.getElementById("sys-conf-parent-category-name").value = data.parentSid;
                } catch (e) {
                    console.warn(e);
                    return;
                }
                $('#sub-category-info-window').jqxWindow('open');
            }
        });
    },
    initSubCategoryInfo: function() {
        WRPAdminApp.pagescript._selectedSubCategorySid = 0;
        
        try {
            document.getElementById("sys-conf-input-sub-category-name").value = "";
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
            document.getElementById("sys-conf-parent-category-name").value = WRPAdminApp.pagescript._selectedCategorySid;
        } catch (e) {
            console.warn(e);
            return;
        }
        $('#sub-category-info-window').jqxWindow('open');
    },
    setSubCategoryInfo: function() {
        var storeId, categoryName, parentSid;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            categoryName = document.getElementById("sys-conf-input-sub-category-name").value;
            if (categoryName.length == 0) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Input Category Name"
            	});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        try {
            parentSid = parseInt(document.getElementById("sys-conf-parent-category-name").value);
            if (isNaN(parentSid)) {
            	WRPCommon.MsgBoxModule.alert({
            		message: "Parent Sid Error"
            	});
                return;
            }
        } catch (e) {
            console.warn(e);
            return;
        }

        $.ajax({
            url: "ajax/category/updateCategoryInfo.jsp",
            data: {
                storeId: storeId,
                categoryName: categoryName,
                categorySid: WRPAdminApp.pagescript._selectedSubCategorySid,
                parentSid: parentSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Complete",
                		okBtnClick: function(){
                            WRPAdminApp.pagescript.getSubCategoryList();
                            $('#sub-category-info-window').jqxWindow('close');
                		}
                	});
                } else if (result === 1) {
                	WRPCommon.MsgBoxModule.alert({
                		message: "This category name has already exists"
                	});
                } else {
                	WRPCommon.MsgBoxModule.alert({
                		message: "Error : " + result
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