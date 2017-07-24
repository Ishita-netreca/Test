var _pagescript = {
	_selectedCouponSid: 0,
    init: function() {
    	var elem;
    	
    	try {
			WRPComponents('div[pagename="coupon"] > .page-submenu-container > .submenu[panelname="coupon"]').addShadowedImage('img/icon/invoice.png');
		} catch (e) {
			
		}
		
		elem = $("#jqx-coupon-coupon-list");
		if (elem) {
			elem.jqxGrid({
				width: "99.8%",
				height: "99%",
    			theme: "arctic",
				filterable: false,
				source: new $.jqx.dataAdapter({
					datatype: "json",
					datafields: [
						// hidden
						{ name: "sid", type: "number" },
						{ name: "discount_type", type: "number" },
						{ name: "visible", type: "number" },
						{ name: "target_items", type: "string" },
						{ name: "printable", type: "number" },
						{ name: "print_flag", type: "number" },
						{ name: "coupon_id", type: "number" },
						// hidden end
						{ name: "start_date", type: "date" },
						{ name: "end_date", type: "date" },
						{ name: "coupon_code", type: "string" },
						{ name: "name", type: "string" },
						{ name: "description", type: "string" },
						{ name: "discount_type_str", type: "string" },
						{ name: "max_discount_price", type: "number" },
						{ name: "apply_count", type: "number" }
					]
				}),
				columns: [		
					{ datafield: "sid", hidden: true },
					{ datafield: "discount_type", hidden: true },
					{ datafield: "visible", hidden: true },
					{ datafield: "target_items", hidden: true },
					{ datafield: "printable", hidden: true },
					{ datafield: "print_flag", hidden: true },
					{ datafield: "coupon_id", hidden: true },
					// hidden end
					{ text: "Start Date", datafield: "start_date" },
					{ text: "End Date", datafield: "end_date" },
					{ text: "Coupon Code", datafield: "coupon_code" },
					{ text: "Name", datafield: "name" },
					{ text: "Description", datafield: "description" },
					{ text: "Discount Type", datafield: "discount_type_str" },
					{ text: "Max Discount Price", datafield: "max_discount_price", cellsformat: "c2" },
					{ text: "Apply Count", datafield: "apply_count" }
				]
			});
			elem.on("rowclick", WRPAdminApp.pagescript.onCouponListRowClick);
			elem.on("rowdoubleclick", WRPAdminApp.pagescript.openEditCouponContainer);			
		}
    	elem = $('#coupon-edit-window');
    	if (elem) {
    		elem.jqxWindow("width", 1050);
    		elem.jqxWindow("height", 400);
    	}
		WRPAdminApp.pagescript.getCategoriesStruct();
		WRPAdminApp.pagescript.getCouponList();
    },
    getCategoriesStruct: function() {
    	var store_id;
    	
        try {
            store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        $.ajax({
        	url: "ajax/category/getCategoriesList.jsp",
        	data: {
        		store_id: store_id
        	},
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		var data, adapter, elem, i, len;
        		
        		data = result.data;
        		
        		if (!data) return;    
        		
        		for (i = 0, len = data.length; i < len; i++) {
        			elem = data[i];
        			elem.value = elem.sid;
        		}
        		
        		adapter = new $.jqx.dataAdapter({
        			datatype: "json",
        			datafields: [
        				{name: "sid"},
        				{name: "category_name"},
        				{name: "parent_sid"},
        				{name: "value"}
        			],
        			id: "sid",
        			localdata: data
        		});
        		adapter.dataBind();
        		
        		records = adapter.getRecordsHierarchy("sid", "parent_sid", "items", [{ name: 'category_name', map: 'label', value: "value"}]);
        		        		
        		elem = $('#jqx-tree-category-struct');
        		
        		elem.jqxTree({ 
        			source: records, 
        			width: '99%', 
        			height: "98%",
        			theme: "arctic", 
        			hasThreeStates: true, 
        			checkboxes: true,
        		    theme: "arctic"    			
        		});  
        	}
        });
    },
    getCouponList: function() {
    	var store_id;
    	
        try {
            store_id = document.getElementById("select-store").value;
            if (store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
    	$.ajax({
    		url: "ajax/coupon/getCouponList.jsp",
    		data: {
    			store_id: store_id
    		},
    		method: "POST",
    		dataType: "json",
    		success: function(result) {
    			var data, obj, i, len;
    			
    			data = result.data;
    			
    			if (!data) return;
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				if (obj.discount_type !== undefined) {
    					switch (obj.discount_type) {
    					case 0:
    						obj.discount_type_str = "Flat";
    						break;
    					case 1:
    						obj.discount_type_str = "%";
    						break;
    					}
    				}
    			}
    			        		
        		obj = $("#jqx-coupon-coupon-list");        
        		
        		if (obj) {
        			obj.jqxGrid("clear");
        			obj.jqxGrid("addrow", null, data);
        		}
    		}
    	});
    },
    onCouponListRowClick: function(event) {
    	var rowdata;
    	
    	rowdata = event.args.row.bounddata;
    	
    	try {
        	document.getElementById("info-coupon-name").innerHTML = (rowdata.name !== undefined)? rowdata.name : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
        	document.getElementById("info-coupon-code").innerHTML = (rowdata.coupon_code !== undefined)? rowdata.coupon_code : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
        	document.getElementById("info-coupon-description").innerHTML = (rowdata.description !== undefined)? rowdata.description : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
        	document.getElementById("info-coupon-start-date").innerHTML = (rowdata.start_date !== undefined)? rowdata.start_date : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
        	document.getElementById("info-coupon-end-date").innerHTML = (rowdata.end_date !== undefined)? rowdata.end_date : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.discount_type !== undefined) {
    			switch (rowdata.discount_type) {
    			case 0:
    				document.getElementById("info-coupon-discount-type").innerHTML = "Flat";
    				break;
    			case 1:
    				document.getElementById("info-coupon-discount-type").innerHTML = "%";
    				break;
    			default:
    				document.getElementById("info-coupon-discount-type").innerHTML = "&nbsp;";
    			}
    		} else {
    			document.getElementById("info-coupon-discount-type").innerHTML = "&nbsp;";
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
        	document.getElementById("info-coupon-max-discount-price").innerHTML = (rowdata.max_discount_price !== undefined)? "$"+rowdata.max_discount_price.toFixed(2) : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
        	document.getElementById("info-coupon-apply-count").innerHTML = (rowdata.apply_count !== undefined)? rowdata.apply_count : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
        	document.getElementById("info-coupon-multiple-apply-count").innerHTML = (rowdata.multiple_apply !== undefined)? rowdata.multiple_apply : "&nbsp;";    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.coupon_id !== undefined) {
    			switch (rowdata.coupon_id) {
    			case 0:
    				document.getElementById("info-coupon-has-each-id").innerHTML = "False";
    				break;
    			case 1:
    				document.getElementById("info-coupon-has-each-id").innerHTML = "True";
    				break;
    			default:
    				document.getElementById("info-coupon-has-each-id").innerHTML = "&nbsp;";
    			}
    		} else {
    			document.getElementById("info-coupon-has-each-id").innerHTML = "&nbsp;";
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.print_flag !== undefined) {
    			switch (rowdata.print_flag) {
    			case 0:
    				document.getElementById("info-coupon-transaction-type").innerHTML = "All Transactions";
    				break;
    			case 1:
    				document.getElementById("info-coupon-transaction-type").innerHTML = "Activation Transaction Only";
    				break;
    			default:
    				document.getElementById("info-coupon-transaction-type").innerHTML = "&nbsp;";
    			}
    		} else {
    			document.getElementById("info-coupon-transaction-type").innerHTML = "&nbsp;";
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.printable !== undefined) {
    			switch (rowdata.printable) {
    			case 0:
    				document.getElementById("info-coupon-printable").innerHTML = "False";
    				break;
    			case 1:
    				document.getElementById("info-coupon-printable").innerHTML = "True";
    				break;
    			default:
    				document.getElementById("info-coupon-printable").innerHTML = "&nbsp;";
    			}
    		} else {
    			document.getElementById("info-coupon-printable").innerHTML = "&nbsp;";
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.visible !== undefined) {
    			switch (rowdata.visible) {
    			case 0:
    				document.getElementById("info-coupon-visible").innerHTML = "False";
    				break;
    			case 1:
    				document.getElementById("info-coupon-visible").innerHTML = "True";
    				break;
    			default:
    				document.getElementById("info-coupon-visible").innerHTML = "&nbsp;";
    			}
    		} else {
    			document.getElementById("info-coupon-visible").innerHTML = "&nbsp;";
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    },
    openEditCouponContainer: function(event) {  	
    	var rowdata, elem, categories, list, i, len, obj, i2, len2, obj2;
    	
    	rowdata = event.args.row.bounddata;
    	
    	obj = document.querySelector("#coupon-edit-window div[role='title']");
    	if (obj) {
    		try {
        		obj.children[0].innerHTML = "EDIT COUPON";
    		} catch (e) {
    			
    		}
    	}    	
    	
    	try {
    		obj = document.getElementById("edit-coupon-name");
    		if (obj) {
    			obj.value = (rowdata.name !== undefined)? rowdata.name : "&nbsp;";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-code");
    		if (obj) {
    			obj.value = (rowdata.coupon_code !== undefined)? rowdata.coupon_code : "&nbsp;";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-description");
    		if (obj) {
    			obj.value = (rowdata.description !== undefined)? rowdata.description : "&nbsp;";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = $("#edit-coupon-start-date");
    		if (obj) {
    			if (rowdata.start_date !== undefined) {
    				obj.jqxDateTimeInput("setDate", rowdata.start_date);
    			}		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = $("#edit-coupon-end-date");
    		if (obj) {
    			if (rowdata.end_date !== undefined) {
    				obj.jqxDateTimeInput("setDate", rowdata.end_date);
    			}		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.discount_type !== undefined) {
    			switch (rowdata.discount_type) {
    			case 0:
    				document.getElementById("edit-coupon-discount-type-flat").checked = true;
    				break;
    			case 1:
    				document.getElementById("edit-coupon-discount-type-percentage").checked = true;
    				break;
    			default:
    				document.getElementById("edit-coupon-discount-type-flat").checked = true;
    			}
    		} else {
				document.getElementById("edit-coupon-discount-type-flat").checked = true;
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-max-discount-price");
    		if (obj) {
    			obj.value = (rowdata.max_discount_price !== undefined)? rowdata.max_discount_price.toFixed(2) : "$0.00";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-apply-count");
    		if (obj) {
    			obj.value = (rowdata.apply_count !== undefined)? rowdata.apply_count : "&nbsp;";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-multiple-apply-count");
    		if (obj) {
    			obj.value = (rowdata.multiple_apply !== undefined)? rowdata.multiple_apply : "&nbsp;";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.coupon_id !== undefined) {
    			switch (rowdata.coupon_id) {
    			case 0:
    				document.getElementById("edit-coupon-has-each-id").checked = false;
    				break;
    			case 1:
    				document.getElementById("edit-coupon-has-each-id").checked = true;
    				break;
    			default:
    				document.getElementById("edit-coupon-has-each-id").checked = false;
    			}
    		} else {
				document.getElementById("edit-coupon-has-each-id").checked = false;
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.print_flag !== undefined) {
    			switch (rowdata.print_flag) {
    			case 0:
    				document.getElementById("edit-coupon-transaction-type").value = 0;
    				break;
    			case 1:
    				document.getElementById("edit-coupon-transaction-type").value = 1;
    				break;
    			default:
    				document.getElementById("edit-coupon-transaction-type").value = 0;
    			}
    		} else {
				document.getElementById("edit-coupon-transaction-type").value = 0;
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.printable !== undefined) {
    			switch (rowdata.printable) {
    			case 0:
    				document.getElementById("edit-coupon-printable").checked = false;
    				break;
    			case 1:
    				document.getElementById("edit-coupon-printable").checked = true;
    				break;
    			default:
    				document.getElementById("edit-coupon-printable").checked = false;
    			}
    		} else {
				document.getElementById("edit-coupon-printable").checked = false;
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		if (rowdata.visible !== undefined) {
    			switch (rowdata.visible) {
    			case 0:
    				document.getElementById("edit-coupon-visible").checked = false;
    				break;
    			case 1:
    				document.getElementById("edit-coupon-visible").checked = true;
    				break;
    			default:
    				document.getElementById("edit-coupon-visible").checked = false;
    			}
    		} else {
				document.getElementById("edit-coupon-visible").checked = false;
    		}  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	elem = $("#jqx-tree-category-struct");
    	
    	
    	if (elem) {
    		elem.jqxTree("uncheckAll");
    		categories = rowdata.target_items;
    		if (categories.indexOf(",") == 0) {
    			categories = categories.substring(1);
    		}
    		if (categories.lastIndexOf(",") == categories.length -1) {
    			categories = categories.substring(0, categories.length -1);
    		}
    		
    		categories = categories.split(",");
    		
    		list = elem.jqxTree("getItems");

    		
    		for (i = 0, len = list.length; i < len; i++) {
    			obj = list[i];
    			for (i2 = 0, len2 = categories.length; i2 < len2; i2++) {
    				obj2 = categories[i2];
    				if (parseInt(obj2) === obj.value) {
    					elem.jqxTree('checkItem', obj, true);
    					break;
    				}
    			}
    		}
    		
    		elem.jqxTree("render");
    		
    		console.log(list);
    	}
    	
    	
    	obj = $("#coupon-edit-window");
    	
    	if (obj) {
    		obj.jqxWindow("open");
    	}
    	
    	WRPAdminApp.pagescript._selectedCouponSid = rowdata.sid;
    },
    openEditCouponContainerForNewCoupon: function() {
    	var obj;
    	
    	obj = document.querySelector("#coupon-edit-window div[role='title']");
    	if (obj) {
    		try {
        		obj.children[0].innerHTML = "ADD COUPON";
    		} catch (e) {
    			
    		}
    	}    	
    	
    	obj = $("#coupon-edit-window");
    	
    	if (obj) {
    		obj.jqxWindow("open");
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-name");
    		if (obj) {
    			obj.value = "";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-code");
    		if (obj) {
    			obj.value = "";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-description");
    		if (obj) {
    			obj.value = "";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = $("#edit-coupon-start-date");
    		if (obj) {
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = $("#edit-coupon-end-date");
    		if (obj) {
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {    		
			document.getElementById("edit-coupon-discount-type-flat").checked = true;    		  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-max-discount-price");
    		if (obj) {
    			obj.value = "";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-apply-count");
    		if (obj) {
    			obj.value = "";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		obj = document.getElementById("edit-coupon-multiple-apply-count");
    		if (obj) {
    			obj.value = "";    		
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {    		
			document.getElementById("edit-coupon-has-each-id").checked = false;    		  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {    		
			document.getElementById("edit-coupon-transaction-type").value = 0;    		  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("edit-coupon-printable").checked = false;    		  		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
			document.getElementById("edit-coupon-visible").checked = false;    		  	
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	obj = $("#jqx-tree-category-struct");
    	
    	if (obj) {
    		obj.jqxTree("uncheckAll");
    	}
    	
    	
    	obj = $("#coupon-edit-window");
    	
    	if (obj) {
    		obj.jqxWindow("open");
    	}
    	
    	WRPAdminApp.pagescript._selectedCouponSid = 0;
    },
    setCouponInfo: function() {
    	var elem, param, i, len, obj;
    	
    	param = {};
    	
        try {
        	param.store_id = document.getElementById("select-store").value;
            if (param.store_id.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        param.coupon_sid = WRPAdminApp.pagescript._selectedCouponSid;
        
        try {
        	param.name = document.getElementById("edit-coupon-name").value;
        	if (param.name.length == 0) {
        		alert("Input coupon name");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.coupon_code = document.getElementById("edit-coupon-code").value;
        	if (param.coupon_code.length == 0) {
        		alert("Input coupon code");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.description = document.getElementById("edit-coupon-description").value;
        	if (param.description.length == 0) {
        		alert("Input coupon description");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.start_date = $("#edit-coupon-start-date").jqxDateTimeInput('getText');        	
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.end_date = $("#edit-coupon-end-date").jqxDateTimeInput('getText');        	
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	if (document.getElementById("edit-coupon-discount-type-flat").checked === true) {
        		param.discount_type = 0;
        	} else {
        		param.discount_type = 1;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.max_discount_price = parseFloat(document.getElementById("edit-coupon-max-discount-price").value.replace("$",""));
        	if (isNaN(param.max_discount_price)) {
        		alert("Max discount price contains non-numeric characters");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.apply_count = parseInt(document.getElementById("edit-coupon-apply-count").value);
        	if (isNaN(param.apply_count)) {
        		alert("Apply count contains non-numeric characters");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.multiple_apply = parseInt(document.getElementById("edit-coupon-multiple-apply-count").value);
        	if (isNaN(param.multiple_apply)) {
        		alert("Multiple apply count contains non-numeric characters");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	if (document.getElementById("edit-coupon-has-each-id").checked === true) {
        		param.coupon_id = 1;
        	} else {
        		param.coupon_id = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	param.print_flag = parseInt(document.getElementById("edit-coupon-transaction-type").value);
        	if (isNaN(param.print_flag)) {
        		alert("Transaction type contains non-numeric characters");
        		return;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	if (document.getElementById("edit-coupon-printable").checked === true) {
        		param.printable = 1;
        	} else {
        		param.printable = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	if (document.getElementById("edit-coupon-visible").checked === true) {
        		param.visible = 1;
        	} else {
        		param.visible = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        elem = $("#jqx-tree-category-struct");
        if (!elem) {
        	console.warn("not found category tree");
        	return;
        }
        
        elem = elem.jqxTree("getCheckedItems");
        param.target_items = [];
        for (i = 0, len = elem.length; i < len; i++) {
        	obj = elem[i];
        	if (obj.value) {
        		param.target_items.push(obj.value);
        	}
        }
        
        param.target_items = ","+param.target_items.join(",")+",";
        
        $.ajax({
        	url: "ajax/coupon/setCouponInfo.jsp",
        	data: param,
        	method: "POST",
        	dataType: "json",
        	success: function(result) {
        		if (result === 0) {
        			alert("Completed");
        	    	
        			try {
        	    		$("#coupon-edit-window").jqxWindow("close");
        	    	} catch (e) {
        	    		console.warn(e);
        	    	}
        			WRPAdminApp.pagescript.getCouponList();
        		} else {
        			alert("Error : " + result);
        		}
        	}
        });
    }    
};