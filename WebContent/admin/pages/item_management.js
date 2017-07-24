/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _priceChangePopupStoreListGridSettings: undefined,
    _statusChangePopupStoreListGridSettings: undefined,
    _addItemType: -1,
    _downloadItemType: -1,
    _selectedItemSid: 0,
    _selectedCategorySid: 0,
    _selectedSubCategorySid: 0,
	init: function() {
    	var components;

    	try {
			WRPComponents('div[pagename="item_management"] > .page-submenu-container > .submenu[panelname="item_management"]').addShadowedImage('img/icon/item_management.png');
			WRPComponents('div[pagename="item_management"] > .page-submenu-container > .submenu[panelname="price_change"]').addShadowedImage('img/icon/price_change.png');
			WRPComponents('div[pagename="item_management"] > .page-submenu-container > .submenu[panelname="status_change"]').addShadowedImage('img/icon/document_02.png');
			WRPComponents('div[pagename="item_management"] > .page-submenu-container > .submenu[panelname="item_download"]').addShadowedImage('img/icon/item_download.png');
			WRPComponents('div[pagename="item_management"] > .page-submenu-container > .submenu[panelname="item_category"]').addShadowedImage('img/icon/category_01.png');
		} catch (e) {
			
		}
		
		var cellclassname = function (row, column, value, data) {
            if (100000 < data.sid && data.sid < 200001 ) {
                return "grid-row-color-purple";
            }else if(200000 < data.sid){
                return "grid-row-color-orange";
            }
        };
        
    	components = $('#item-management-phone-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' },
		                { name: 'action', type: 'button' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true }, 
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } }, 
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'SKU', datafield: 'sku',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Category', datafield: 'category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Sub-Category', datafield: 'sub_category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Manufacturer', datafield: 'manufacturer', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Action', cellsalign: 'center', align: 'center', width: "7%", columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.onItemManagementPhoneEditBtnClick }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.onItemManagementPhoneListRowSelect);
    	}

    	components = $('#item-management-sim-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname,cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', width: "10%", datafield: 'item_code', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', datafield: 'sku',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Category', datafield: 'category',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Sub-Category', datafield: 'sub_category',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Manufacturer', datafield: 'manufacturer',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Action', cellsalign: 'center', align: 'center', width: "7%", columntype: "button",cellclassname: cellclassname,cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.onItemManagementSimEditBtnClick }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.onItemManagementSimListRowSelect);
    	}

    	components = $('#item-management-accessory-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'SKU', datafield: 'sku', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Category', datafield: 'category',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Sub-Category', datafield: 'sub_category',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Manufacturer', datafield: 'manufacturer',width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Action', cellsalign: 'center', align: 'center', width: "7%", columntype: "button",cellclassname: cellclassname,cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.onItemManagementAccessoryEditBtnClick }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.onItemManagementAccessoryListRowSelect);
    	}

    	components = $('#item-management-service-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "100%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: 35, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center'},
                      { text: 'Item Code', datafield: 'item_code', width: 200, cellsalign: 'center', align: 'center' },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center' },
                      { text: 'Category', datafield: 'category', width: 200, cellsalign: 'center', align: 'center' },
                      { text: 'Sub-Category', datafield: 'sub_category', width: 200, cellsalign: 'center', align: 'center' },
                      { text: 'Manufacturer', datafield: 'manufacturer', width: 200, cellsalign: 'center', align: 'center' },
                      { text: 'Action', cellsalign: 'center', align: 'center', width: "8%", columntype: "button", cellsrenderer: function() { return "Edit"; }, buttonclick: WRPAdminApp.pagescript.onItemManagementServiceEditBtnClick }
				]
    		});
    		
    		components.on("rowselect", WRPAdminApp.pagescript.onItemManagementServiceListRowSelect);
    	}
    	
    	components = $('#price-change-phone-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', datafield: 'sku', cellsalign: 'center', width: "10%", align: 'center',cellclassname: cellclassname },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Category', datafield: 'category', cellsalign: 'center', width: "10%", align: 'center',cellclassname: cellclassname },
                      { text: 'Sub-Category', datafield: 'sub_category', cellsalign: 'center', width: "10%", align: 'center',cellclassname: cellclassname },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Price Change"; }, buttonclick: WRPAdminApp.pagescript.onPriceChangePhoneListPriceChangeBtnClick }
				]
    		});
    	}

    	components = $('#price-change-sim-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', datafield: 'sku', cellsalign: 'center', width: "10%", align: 'center',cellclassname: cellclassname },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center' ,cellclassname: cellclassname},
                      { text: 'Category', datafield: 'category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Sub-Category', datafield: 'sub_category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Manufacturer', datafield: 'manufacturer', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Price Change"; }, buttonclick: WRPAdminApp.pagescript.onPriceChangeSimListPriceChangeBtnClick }
				]
    		});
    	}

    	components = $('#price-change-accessory-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', datafield: 'sku', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Category', datafield: 'category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Sub-Category', datafield: 'sub_category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Manufacturer', datafield: 'manufacturer', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Price Change"; }, buttonclick: WRPAdminApp.pagescript.onPriceChangeAccessoryListPriceChangeBtnClick }
				]
    		});
    	}

    	components = $('#price-change-service-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: 35, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center'},
                      { text: 'Item Code', datafield: 'item_code', cellsalign: 'center', align: 'center' },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center' },
                      { text: 'Category', datafield: 'category', cellsalign: 'center', align: 'center' },
                      { text: 'Sub-Category', datafield: 'sub_category', cellsalign: 'center', align: 'center' },
                      { text: 'Manufacturer', datafield: 'manufacturer', cellsalign: 'center', align: 'center' },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button", cellsrenderer: function() { return "Price Change"; }, buttonclick: WRPAdminApp.pagescript.onPriceChangeServiceListPriceChangeBtnClick }
				]
    		});
    	}

    	components = $('#status-change-phone-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', datafield: 'sku', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Category', datafield: 'category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Sub-Category', datafield: 'sub_category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Manufacturer', datafield: 'manufacturer', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Status Change"; }, buttonclick: WRPAdminApp.pagescript.onStatusChangePhoneListStatusChangeBtnClick }
				]
    		});
    	}

    	components = $('#status-change-sim-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', datafield: 'sku', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Category', datafield: 'category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Sub-Category', datafield: 'sub_category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Manufacturer', datafield: 'manufacturer', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Status Change"; }, buttonclick: WRPAdminApp.pagescript.onStatusChangeSimListStatusChangeBtnClick }
				]
    		});
    	}

    	components = $('#status-change-accessory-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
						{ name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: "3%", cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', datafield: 'item_code', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', datafield: 'sku', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Category', datafield: 'category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Sub-Category', datafield: 'sub_category', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Manufacturer', datafield: 'manufacturer', width: "10%", cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Status Change"; }, buttonclick: WRPAdminApp.pagescript.onStatusChangeAccessoryListStatusChangeBtnClick }
				]
    		});
    	}

    	components = $('#status-change-service-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: false,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: 35, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', datafield: 'type', cellsalign: 'center', align: 'center'},
                      { text: 'Item Code', datafield: 'item_code', cellsalign: 'center', align: 'center' },
                      { text: 'Description', datafield: 'description', cellsalign: 'center', align: 'center' },
                      { text: 'Category', datafield: 'category', cellsalign: 'center', align: 'center' },
                      { text: 'Sub-Category', datafield: 'sub_category', cellsalign: 'center', align: 'center' },
                      { text: 'Manufacturer', datafield: 'manufacturer', cellsalign: 'center', align: 'center' },
                      { text: 'Action', cellsalign: 'center', align: 'center', columntype: "button", cellsrenderer: function() { return "Status Change"; }, buttonclick: WRPAdminApp.pagescript.onStatusChangeServiceListStatusChangeBtnClick }
				]
    		});
    	}
    	
    	components = $("#item-management-add-item-window");
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 600,
    			position: {
    				x: window.innerWidth * 0.5 - 400,
    				y: window.innerHeight * 0.5 - 300
    			}
    		});
    	}
    	
    	components = $("#add-item-items-in-wrp-db-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
    					{ name: "selected", type: "bool"},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
    				  { text: "Select", width: 45, datafield: "selected", columntype: "checkbox" },
		          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', editable: false, datafield: 'type', cellsalign: 'center', align: 'center'},
                      { text: 'Item Code', editable: false, datafield: 'item_code', cellsalign: 'center', align: 'center' },
                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center' },
                      { text: 'Category', editable: false, datafield: 'category', cellsalign: 'center', align: 'center' },
                      { text: 'Sub-Category', editable: false, datafield: 'sub_category', cellsalign: 'center', align: 'center' },
                      { text: 'Manufacturer', editable: false, datafield: 'manufacturer', cellsalign: 'center', align: 'center' },
                      { text: 'Detail', editable: false, cellsalign: 'center', align: 'center', columntype: "button", cellsrenderer: function() { return "Detail"; }, buttonclick: WRPAdminApp.pagescript.onItemsInWRPDBListDetailButtonClick }
				]
    		});
    	}
    	
    	components = $("#item-management-item-detail-window");
    	if (components) {
    		components.jqxWindow({
    			width: 1000,
    			height: 420,
    			position: {
    				x: window.innerWidth * 0.5 - 500,
    				y: window.innerHeight * 0.5 - 210
    			}
    		});
    	}
    	
    	components = $("#item-management-confirmation-download-item-window");
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 360,
    			position: {
    				x: window.innerWidth * 0.5 - 400,
    				y: window.innerHeight * 0.5 - 180
    			}
    		});
    	}
    	
    	components = $("#confirmation-download-item-items-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', editable: false, datafield: 'type', cellsalign: 'center', align: 'center'},
                      { text: 'Item Code', editable: false, datafield: 'item_code', cellsalign: 'center', align: 'center' },
                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center' },
                      { text: 'Category', editable: false, datafield: 'category', cellsalign: 'center', align: 'center' },
                      { text: 'Sub-Category', editable: false, datafield: 'sub_category', cellsalign: 'center', align: 'center' },
                      { text: 'Manufacturer', editable: false, datafield: 'manufacturer', cellsalign: 'center', align: 'center' }
				]
    		});
    	}
    	
    	components = $("#item-management-price-change-window");
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 550,
    			position: {
    				x: window.innerWidth * 0.5 - 400,
    				y: window.innerHeight * 0.5 - 275
    			}
    		});
    	}
    	
    	components = $("#item-management-status-change-window");
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 550,
    			position: {
    				x: window.innerWidth * 0.5 - 400,
    				y: window.innerHeight * 0.5 - 275
    			}
    		});
    	}
    	
    	WRPAdminApp.pagescript._priceChangePopupStoreListGridSettings = {
			width: "99%",
			height: "99%",
			theme: "arctic",
			source: new $.jqx.dataAdapter({
				datatype: "json",
				datafields: [
					{ name: "selected", type: "bool" },
	             	{ name: 'store_id', type: 'string'},
					{ name: 'market_code', type: 'string'},
					{ name: 'district_code', type: 'string' },
	                { name: 'address', type: 'string' },
	                { name: 'srp', type: 'number' },
	                { name: 'status', type: 'string' }
				]
			}),
			filterable: true,
			editable: true,
			sortable: true,
	        groupable: false,
	        columnsresize:true,
			columns: [
				  { text: 'Select', datafield: "selected", columntype: "checkbox", cellsalign: 'center', align: 'center', width: 45},
	          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center', width: 35, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
	          	  { text: 'Store', editable: false, datafield: 'store_id', cellsalign: 'center', align: 'center'},
                  { text: 'Market', editable: false, datafield: 'market_code', cellsalign: 'center', align: 'center' },
                  { text: 'District', editable: false, datafield: 'district_code', cellsalign: 'center', align: 'center' },
                  { text: 'Address', editable: false, datafield: 'address', cellsalign: 'center', align: 'center' },
                  { text: 'SRP', editable: false, datafield: 'srp', cellsalign: 'center', align: 'center', cellsformat: "c2" },
                  { text: 'Status', editable: false, datafield: 'status', cellsalign: 'center', align: 'center' }
			]
		};
    	
    	WRPAdminApp.pagescript._statusChangePopupStoreListGridSettings = {
			width: "99%",
			height: "99%",
			theme: "arctic",
			source: new $.jqx.dataAdapter({
				datatype: "json",
				datafields: [
					{ name: "selected", type: "bool" },
	             	{ name: 'store_id', type: 'string'},
					{ name: 'market_code', type: 'string'},
					{ name: 'district_code', type: 'string' },
	                { name: 'address', type: 'string' },
	                { name: 'srp', type: 'number' },
	                { name: 'status', type: 'string' }
				]
			}),
			filterable: true,
			editable: true,
			sortable: true,
	        groupable: false,
	        columnsresize:true,
			columns: [
				  { text: 'Select', width: 45, datafield: "selected", columntype: "checkbox", cellsalign: 'center', align: 'center', editable: true},
	          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center', cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
	          	  { text: 'Store', editable: false, datafield: 'store_id', cellsalign: 'center', align: 'center'},
                  { text: 'Market', editable: false, datafield: 'market_code', cellsalign: 'center', align: 'center' },
                  { text: 'District', editable: false, datafield: 'district_code', cellsalign: 'center', align: 'center' },
                  { text: 'Address', editable: false, datafield: 'address', cellsalign: 'center', align: 'center' },
                  { text: 'SRP', editable: false, datafield: 'srp', cellsalign: 'center', align: 'center', cellsformat: "c2" },
                  { text: 'Status', editable: false, datafield: 'status', cellsalign: 'center', align: 'center' }
			]
		};
    	
    	
    	components = $("#item-management-download-item-window");
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 560,
    			position: {
    				x: window.innerWidth * 0.5 - 400,
    				y: window.innerHeight * 0.5 - 280
    			}
    		});
    	}

    	components = $('#download-item-compared-result-list:not(.jqx-grid)');
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "selected", type: "bool" },
    					{ name: 'sid', type: 'number'},
						{ name: 'item_code', type: 'string'},
		                { name: 'sku', type: 'string' },
		                { name: 'description', type: 'string' },
		                { name: 'manufacturer', type: 'string' },
		                { name: 'difference_status', type: 'number'}
    				]
    			}),
    			filterable: true,
    			editable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
    				  { text: 'Select', width: 45, datafield: "selected", columntype: "checkbox", cellsalign: 'center', align: 'center', editable: true,cellclassname: cellclassname},
		          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Item Code', width:100,editable: false, datafield: 'item_code', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'SKU', width:100, editable: false, datafield: 'sku', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Manufacturer', width:100,editable: false, datafield: 'manufacturer', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Status', editable: false, datafield: 'difference_status', cellsalign: 'center', align: 'center', hidden: true },
                      { text: 'Detail', width:90, editable: false, cellsalign: 'center', align: 'center', columntype: "button",cellclassname: cellclassname, cellsrenderer: function() { return "Detail"; }, buttonclick: WRPAdminApp.pagescript.onParentItemsInDownloadItemDetailButtonClick }
				]
    		});
    	}
    	
    	components = $("#item-management-confirmation-download-item-from-parent-window");
    	if (components) {
    		components.jqxWindow({
    			width: 800,
    			height: 360,
    			position: {
    				x: window.innerWidth * 0.5 - 400,
    				y: window.innerHeight * 0.5 - 180
    			}
    		});
    	}
    	
    	components = $("#confirmation-download-item-from-parent-items-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: 'sid', type: 'number'},
		             	{ name: 'type', type: 'string'},
						{ name: 'item_code', type: 'string'},
		                { name: 'description', type: 'string' },
		                { name: 'category', type: 'string' },
		                { name: 'sub_category', type: 'string' },
		                { name: 'manufacturer', type: 'string' }
    				]
    			}),
    			filterable: true,
    			editable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
		          	  { text: 'CT.', width: 35, editable: false, cellsalign: 'center', align: 'center',cellclassname: cellclassname, cellsrenderer: function() { try { return arguments[3].substring(0,arguments[3].indexOf(">")+1)+(arguments[0]+1)+arguments[3].substring(arguments[3].lastIndexOf("<")); } catch (e) { return arguments[3]; } } },
		          	  { text: 'Type', editable: false, datafield: 'type', cellsalign: 'center', align: 'center',cellclassname: cellclassname},
                      { text: 'Item Code', editable: false, datafield: 'item_code', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Description', editable: false, datafield: 'description', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Category', editable: false, datafield: 'category', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Sub-Category', editable: false, datafield: 'sub_category', cellsalign: 'center', align: 'center',cellclassname: cellclassname },
                      { text: 'Manufacturer', editable: false, datafield: 'manufacturer', cellsalign: 'center', align: 'center',cellclassname: cellclassname }
				]
    		});
    	}
    	
    	components = $("#item-management-edit-item-window");
    	if (components) {
    		components.jqxWindow({
    			width: 820,
    			height: 410,
    			position: {
    				x: window.innerWidth * 0.5 - 410,
    				y: window.innerHeight * 0.5 - 205
    			}
    		});
    	}
    	
    	WRPAdminApp.ItemManager.getCategoryListByParentSid({
    		parent_sid: 0,
    		callback: function(data) {
    			var i, len, obj, innerHTML;
    			if (data === undefined) {
    				return;
    			}
    			innerHTML = [];
    			
    			for (i = 0, len = data.length; i < len; i++) {
    				obj = data[i];
    				if (obj.sid === undefined || obj.category_name === undefined) {
    					continue;
    				}
    				
    				innerHTML.push('<option value="');
    				innerHTML.push(obj.sid);
    				innerHTML.push('">');
    				innerHTML.push(obj.category_name);
    				innerHTML.push('</option>');
    			}
    			
    			try {
    				document.getElementById("item-edit-window-item-category").innerHTML = innerHTML.join("");
    			} catch (e) {
    				console.warn(e);
    			}
    			
    			innerHTML = undefined;
    		}
    	});
		
    	components = $("#jqx-sys-sub-category-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    			    	{ name: "sid", type: "number" },
    					{ name: "categoryName", type: "string" },
    					{ name: "subCategoryName", type: "string" }
    				]
    			}),
    			filterable: true,
    			sortable: true,
    	        groupable: false,
    	        columnsresize:true,
    			columns: [
    				  { datafield: "sid", hidden: true },
    				  { text: 'Sub Category', datafield: 'subCategoryName', width: '50%', cellsalign:'center', align: 'center'},
    				  { text: 'Category', datafield: 'categoryName', width: '50%', cellsalign:'center', align: 'center'},
				]
    		});
    		components.on('rowdoubleclick', WRPAdminApp.pagescript.getSubCategoryInfo);
    	}
    	
    	
    	components = $("#jqx-sys-category-list");
    	if (components) {
    		components.jqxGrid({
    			width: "99.8%",
    			height: "99%",
    			theme: "arctic",
    			source: new $.jqx.dataAdapter({
    				datatype: "json",
    				datafields: [
    					{ name: "sid", type: "number" },
    					{ name: "categoryName", type: "string" },
    					]
    			}),
    			filterable: true,
    			groupable: false,
    			columnsresize:true,
    			columns: [
    				{ datafield: "sid", hidden: true },
    				{ text: 'Category', datafield: 'categoryName', width: '100%', cellsalign:'center', align: 'center'},
    				]
    		});
    		components.on('rowselect', WRPAdminApp.pagescript.getSubCategoryList);
    		components.on('rowdoubleclick', WRPAdminApp.pagescript.getCategoryInfo);
    	}
    	
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
  
    	WRPAdminApp.pagescript.changePanelBySubmenu('item_management');
    	WRPAdminApp.pagescript.getCategoryList();
    },
    changePanelBySubmenu: function(panelname) {
    	
    	if (panelname === undefined) {
    		return;
    	}
    	WRP.UI.changePanelBySubmenu(panelname);
    	
    	if (panelname === "item_management") {
    		//WRPAdminApp.pagescript.getItemManagerPhoneList();
    	} else if (panelname === "price_change") {
        	
    	} else if (panelname === "status_change") {

    	} else if (panelname === "item_download") {
    		
    	}
    },
    initItemDictDetail: function() {
    	
    },
    callbackInformItemDictInfo: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.item_type !== undefined) {
    		try {
        		switch (data.item_type) {
        		case 0:
        			document.getElementById("item-management-detail-content-item-type").innerHTML = "PHONE";
        			break;
        		case 1:
        			document.getElementById("item-management-detail-content-item-type").innerHTML = "SIM CARD";
        			break;
        		case 2:
        		case 3:
        			document.getElementById("item-management-detail-content-item-type").innerHTML = "ACCESSORY";
        			break;
        		case 4:
        			document.getElementById("item-management-detail-content-item-type").innerHTML = "SERVICE ITEM";
        			break;
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
		try {
			document.getElementById("item-management-detail-content-item-code").innerHTML = (data.item_code !== undefined)? data.item_code : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-sku").innerHTML = (data.sku !== undefined)? data.sku : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-model").innerHTML = (data.model !== undefined)? data.model : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-upc").innerHTML = (data.upc !== undefined)? data.upc : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-description").innerHTML = (data.description !== undefined)? data.description : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-category").innerHTML = (data.category !== undefined)? data.category : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-sub-category").innerHTML = (data.sub_category !== undefined)? data.sub_category : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-carrier").innerHTML = (data.carrier !== undefined)? data.carrier : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-color").innerHTML = (data.color !== undefined)? data.color : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-manufacturer").innerHTML = (data.manufacturer !== undefined)? data.manufacturer : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-condition").innerHTML = (data.condition !== undefined)? data.condition : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-management-detail-content-item-vendor").innerHTML = (data.vendor !== undefined)? data.vendor : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
		
    	try {
    		document.getElementById("item-management-detail-content-item-image").style.backgroundImage = (data.image !== undefined)? 'url("'+data.image+'")': "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    },
    openAddItemFromWRPDBWindow: function(item_type) {
    	if (item_type === undefined) {
    		return;
    	}
    	
    	if (item_type < 0 || item_type > 3) {
    		return;
    	}
    	
    	WRPAdminApp.pagescript._addItemType = item_type;
    	
    	switch (item_type) {
    	case 0:
    		document.getElementById("item-management-add-item-type").innerHTML = "PHONE";
    		break;
    	case 1:
    		document.getElementById("item-management-add-item-type").innerHTML = "SIM CARD";
    		break;
    	case 2:
    	case 3:
    		document.getElementById("item-management-add-item-type").innerHTML = "ACCESSORY";
    		break;
    	case 4:
    		document.getElementById("item-management-add-item-type").innerHTML = "SERVICE ITEM";
    		break;
    	}

    	$("#add-item-items-in-wrp-db-list").jqxGrid("clear");
    	$("#item-management-add-item-window").jqxWindow("open");
    },
    getItemDictListNotInStore: function() {
    	var searchKeyword, params;
    	
    	searchKeyword = document.getElementById("item-management-add-item-search-keyword");
    	
    	if (!searchKeyword) {
    		return;
    	}
    	
    	params = {};
    	
    	params.item_type = WRPAdminApp.pagescript._addItemType;
    	if (searchKeyword.value.length > 0) {
    		params.search_keyword = searchKeyword.value;
    	}
    	
    	params.callback = WRPAdminApp.pagescript.callbackGetItemDictListNotInStore;
    	
    	$("#add-item-items-in-wrp-db-list").jqxGrid("clear");
    	
    	WRPAdminApp.ItemManager.getItemDictListNotInStore(params);
    },
    callbackGetItemDictListNotInStore: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "There are no items to be downloaded.\nAdd new items or check your existing item information."
    		});
    	}
    	
    	$("#add-item-items-in-wrp-db-list").jqxGrid("addrow", null, data, "last");
    },
    onItemsInWRPDBListDetailButtonClick: function(index) {
    	var row;

    	row = $("#add-item-items-in-wrp-db-list").jqxGrid("getrowdata", index);
    	console.log(row);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		wrp_db_flag: 1,
    		callback: WRPAdminApp.pagescript.callbackGetWRPDBItemDetailInAddItem
    	});
    },
    changeAllItemsInAddItemWindowSelected: function(selected) {
    	var rows, i, len, row, elem;
    	
    	try {
    		elem = $("#add-item-items-in-wrp-db-list");
    		rows = elem.jqxGrid("getrows");
    	} catch (e) {
    		consoe.warn(e);
    		return;
    	}
    	
    	if (selected) {
    		selected = true;
    	} else {
    		selected = false;
    	}
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		elem.jqxGrid("setcellvalue", row.boundindex, "selected", selected);
    	}
    },
    callbackGetWRPDBItemDetailInAddItem: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.item_type !== undefined) {
    		try {
        		switch (data.item_type) {
        		case 0:
        			document.getElementById("item-detail-window-content-item-type").innerHTML = "PHONE";
        			break;
        		case 1:
        			document.getElementById("item-detail-window-content-item-type").innerHTML = "SIM CARD";
        			break;
        		case 2:
        		case 3:
        			document.getElementById("item-detail-window-content-item-type").innerHTML = "ACCESSORY";
        			break;
            	case 4:
            		document.getElementById("item-detail-window-content-item-type").innerHTML = "SERVICE ITEM";
            		break;
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
		try {
			document.getElementById("item-detail-window-content-item-code").innerHTML = (data.item_code !== undefined)? data.item_code : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-sku").innerHTML = (data.sku !== undefined)? data.sku : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-model").innerHTML = (data.model !== undefined)? data.model : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-upc").innerHTML = (data.upc !== undefined)? data.upc : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-title-bar").innerHTML = (data.description !== undefined)? data.description : "&nbsp;";
			document.getElementById("item-detail-window-content-item-description").innerHTML = (data.description !== undefined)? data.description : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-category").innerHTML = (data.category !== undefined)? data.category : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-sub-category").innerHTML = (data.sub_category !== undefined)? data.sub_category : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-carrier").innerHTML = (data.carrier !== undefined)? data.carrier : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-color").innerHTML = (data.color !== undefined)? data.color : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-manufacturer").innerHTML = (data.manufacturer !== undefined)? data.manufacturer : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-condition").innerHTML = (data.condition !== undefined)? data.condition : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-vendor").innerHTML = (data.vendor !== undefined)? data.vendor : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
		
    	try {
    		document.getElementById("item-detail-window-content-item-image").style.backgroundImage = (data.image !== undefined)? 'url("'+data.image+'")': "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	$("#item-management-item-detail-window").jqxWindow("open");
    },
    openConfirmationDownloadItemsPage: function() {
    	var rows, i, len, row, download_items;
    	
    	try {
    		rows = $("#add-item-items-in-wrp-db-list").jqxGrid("getrows");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	$("#confirmation-download-item-items-list").jqxGrid("clear");
    	
    	download_items = [];
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		if (row.selected === true) {
    			download_items.push(JSON.parse(JSON.stringify(row)));
    		}
    	}
    	
    	if(download_items.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select items"
    		});
    		return;
    	}
    	
    	$("#confirmation-download-item-items-list").jqxGrid("addrow", null, download_items, "last");
    	
    	$("#item-management-confirmation-download-item-window").jqxWindow("open");
    	
    },
    confirmDownloadItems: function() {
    	var rows, i, len, row, item_sid_list, params;
    	
    	rows = $("#confirmation-download-item-items-list").jqxGrid("getrows");
    	
    	item_sid_list = [];
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		
    		if (row.sid === undefined) {
    			continue;
    		}
    		
    		item_sid_list.push(row.sid);
    	}
    	
    	params = {};
    	params.item_sid_list_str = item_sid_list.join(",");
    	params.callback =  WRPAdminApp.pagescript.checkConfirmDownloadItems;
    	
    	WRPAdminApp.ItemManager.downloadItemsDuplicateCheck(params);
    	
    	
    },
    checkConfirmDownloadItems: function(data){
    	if(data.upcCount > 0){
    		WRPCommon.MsgBoxModule.alert({
    			message: "Duplicated UPC"
    		});
    		return;
    	}

    	if(data.codeCount > 0){
    		WRPCommon.MsgBoxModule.alert({
    			message: "Duplicated Item Code"
    		});
    		return;
    	}
    	
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		msgBoxType: "YesNo",
    		yesBtnClick: WRPAdminApp.pagescript.requestDownloadItemsIntoStore
    	});
    },
    requestDownloadItemsIntoStore: function() {
    	var rows, i, len, row, item_sid_list, params;
    	
    	rows = $("#confirmation-download-item-items-list").jqxGrid("getrows");
    	
    	item_sid_list = [];
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		
    		if (row.sid === undefined) {
    			continue;
    		}
    		
    		item_sid_list.push(row.sid);
    	}
    	
    	params = {};
    	params.item_sid_list_str = item_sid_list.join(",");
    	params.download_from_wrp_flag = 1;
    	params.callback =  WRPAdminApp.pagescript.callbackRequestDownloadItemsIntoStore;
    	
    	WRPAdminApp.ItemManager.downloadParentItemsToChild(params);
    },
    callbackRequestDownloadItemsIntoStore: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data === 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Completed",
    			okBtnClick: function() {
    				var tab;
    		    	$("#item-management-add-item-window").jqxWindow("close");
    		    	$("#item-management-confirmation-download-item-window").jqxWindow("close");
    		    	try {
    		    		tab = $("#item-management-tab-panel");
    		    		if (tab) {
    		    			switch (parseInt(tab.val())) {
    		    			case 0: // phone
    		    				WRPAdminApp.pagescript.getItemManagerPhoneList();
    		    				break;
    		    			case 1: // sim
    		    				WRPAdminApp.pagescript.getItemManagerSimList();
    		    				break;
    		    			case 2: // accessory
    		    				WRPAdminApp.pagescript.getItemManagerAccessoryList();
    		    				break;
    		    			}
    		    		}
    		    	} catch (e) {
    		    		console.warn(e);
    		    	}
    			}
    		});
    	} else {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Error : " + data
    		});
    	}
    },
    callbackGetItemDictInfoInPriceChange: function(data) { 
    	var elem;
    	
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.item_code === undefined) {
    		return;
    	} else {
    		try {
    			document.getElementById("item-management-price-change-item-code").innerHTML = data.item_code;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.description !== undefined) {
    		try {
    			document.getElementById("item-management-price-change-title-bar").innerHTML = data.description;
    			document.getElementById("item-management-price-change-item-description").innerHTML = data.description;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.sku !== undefined) {
    		try {
    			document.getElementById("item-management-price-change-item-sku").innerHTML = data.sku;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.item_type !== undefined) {
    		try {
        		switch (data.item_type) {
        		case 0:
        			document.getElementById("item-management-price-change-item-type").innerHTML = "PHONE";
        			break;
        		case 1:
        			document.getElementById("item-management-price-change-item-type").innerHTML = "SIM CARD";
        			break;
        		case 2:
        		case 3:
        			document.getElementById("item-management-price-change-item-type").innerHTML = "ACCESSORY";
        			break;
            	case 4:
            		document.getElementById("item-management-price-change-item-type").innerHTML = "SERVICE ITEM";
            		break;
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	$("#item-management-price-change-window").jqxWindow("open");
    	
    	elem = document.getElementById("price-change-store-list");
    	if (elem) {
    		try {
    			if (elem.className && elem.className.indexOf("jqx-grid") > -1) {
    				
    			} else {
    				elem = $("#price-change-store-list");
    				if (elem) {
    					elem.jqxGrid(WRPAdminApp.pagescript._priceChangePopupStoreListGridSettings);
    				}
    			}
    		} catch (e) {
    			
    		}
    	}
    	
    	elem = $("#price-change-store-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getStoreListThatHaveItem({
    		item_code: data.item_code,
    		callback: WRPAdminApp.pagescript.callbackGetStoreListThatHaveItemInPriceChange
    	});
    },
    callbackGetStoreListThatHaveItemInPriceChange: function(data) {
    	var elem;
    	elem = $("#price-change-store-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}    	
    },
    changeAllStoresInPriceChangeWindowSelected: function(selected) {
    	var rows, i, len, row, elem;
    	
    	try {
    		elem = $("#price-change-store-list");
    		rows = elem.jqxGrid("getrows");
    	} catch (e) {
    		consoe.warn(e);
    		return;
    	}
    	
    	if (selected) {
    		selected = true;
    	} else {
    		selected = false;
    	}
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		elem.jqxGrid("setcellvalue", row.boundindex, "selected", selected);
    	}
    },
    applyPriceInStore: function() {
    	var elem, value, rows, i, len, row;
    	
    	elem = document.getElementById("item-management-price-change-set-new-price");
    	
    	if (!elem) {
    		return;
    	}
    	
    	if (elem.value.length == 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Enter the price"
    		});
    		return;
    	}
    	
    	value = parseFloat(elem.value.replace("$",""));
    	
    	elem.value = "";
    	
    	if (isNaN(value)) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Price contains non-numeric characters"
    		});
    		return;
    	}
    	
    	try {
    		elem = $("#price-change-store-list");
    		rows = elem.jqxGrid("getrows");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}

    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		if (row.selected === true) {
    			elem.jqxGrid("setcellvalue", row.boundindex, "srp", value);
    			elem.jqxGrid("setcellvalue", row.boundindex, "selected", false);
    		}
    	}
    	
    	elem.jqxGrid("refresh");
    },
    confirmSubmitPriceChange: function() {
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		msgBoxType: "YesNo",
    		yesBtnClick: WRPAdminApp.pagescript.requestSubmitPriceChange
    	});
    },
    requestSubmitPriceChange: function() {
    	var rows, i, len, row, store_list, params;   	
    	
    	try {    	
        	params = {};	
    		params.item_code = document.getElementById("item-management-price-change-item-code").innerText.trim();
        	
    		elem = $("#price-change-store-list");
    		rows = elem.jqxGrid("getrows");
        		
    		store_list = [];
    		
    		for (i = 0, len = rows.length; i < len; i++) {
    			row = rows[i];
    			if (row.store_id === undefined || row.srp === undefined) {
    				continue;
    			}
    			
    			store_list.push({
    				store_id: row.store_id,
    				price: row.srp
    			});
    		}
    		
    		params.store_list_str = JSON.stringify(store_list);
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	params.callback = WRPAdminApp.pagescript.callbackSubmitChangeStoreItems;
    	
    	WRPAdminApp.ItemManager.setStoreItemsByItemCode(params);
    },
    callbackGetItemDictInfoInStatusChange: function(data) { 
    	var elem;
    	
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.item_code === undefined) {
    		return;
    	} else {
    		try {
    			document.getElementById("item-management-status-change-item-code").innerHTML = data.item_code;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.description !== undefined) {
    		try {
    			document.getElementById("item-management-status-change-title-bar").innerHTML = data.description;
    			document.getElementById("item-management-status-change-item-description").innerHTML = data.description;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.sku !== undefined) {
    		try {
    			document.getElementById("item-management-status-change-item-sku").innerHTML = data.sku;
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	if (data.item_type !== undefined) {
    		try {
        		switch (data.item_type) {
        		case 0:
        			document.getElementById("item-management-status-change-item-type").innerHTML = "PHONE";
        			break;
        		case 1:
        			document.getElementById("item-management-status-change-item-type").innerHTML = "SIM CARD";
        			break;
        		case 2:
        		case 3:
        			document.getElementById("item-management-status-change-item-type").innerHTML = "ACCESSORY";
        			break;
            	case 4:
            		document.getElementById("item-management-status-change-item-type").innerHTML = "SERVICE ITEM";
            		break;
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
    	$("#item-management-status-change-window").jqxWindow("open");
    	
    	elem = document.getElementById("status-change-store-list");
    	if (elem) {
    		try {
    			if (elem.className && elem.className.indexOf("jqx-grid") > -1) {
    				
    			} else {
    				elem = $("#status-change-store-list");
    				if (elem) {
    					elem.jqxGrid(WRPAdminApp.pagescript._statusChangePopupStoreListGridSettings);
    				}
    			}
    		} catch (e) {
    			
    		}
    	}
    	
    	elem = $("#status-change-store-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getStoreListThatHaveItem({
    		item_code: data.item_code,
    		callback: WRPAdminApp.pagescript.callbackGetStoreListThatHaveItemInStatusChange
    	});
    },
    callbackGetStoreListThatHaveItemInStatusChange: function(data) {
    	var elem;
    	console.log(data);
    	elem = $("#status-change-store-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}    	
    },
    changeAllStoresInStatusChangeWindowSelected: function(selected) {
    	var rows, i, len, row, elem;
    	
    	try {
    		elem = $("#status-change-store-list");
    		rows = elem.jqxGrid("getrows");
    	} catch (e) {
    		consoe.warn(e);
    		return;
    	}
    	
    	if (selected) {
    		selected = true;
    	} else {
    		selected = false;
    	}
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		elem.jqxGrid("setcellvalue", row.boundindex, "selected", selected);
    	}
    },
    applyStatusInStore: function() {
    	var elem, value, rows, i, len, row;
    	
    	elem = document.getElementById("item-management-status-change-set-new-status");
    	
    	if (!elem) {
    		return;
    	}
    	
    	value = parseFloat(elem.value);
    	
    	
    	try {
    		elem = $("#status-change-store-list");
    		rows = elem.jqxGrid("getrows");
    	} catch (e) {
    		console.warn(e);
    		return;
    	}

    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		if (row.selected === true) {
    			if (value > 0) {
        			elem.jqxGrid("setcellvalue", row.boundindex, "status", "Disabled");
    			} else {
        			elem.jqxGrid("setcellvalue", row.boundindex, "status", "Enabled");
    			}
    			elem.jqxGrid("setcellvalue", row.boundindex, "selected", false);
    		}
    	}
    	
    	elem.jqxGrid("refresh");
    },
    confirmSubmitStatusChange: function() {
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		msgBoxType: "YesNo",
    		yesBtnClick: WRPAdminApp.pagescript.requestSubmitStatusChange
    	});
    },
    requestSubmitStatusChange: function() {
    	var rows, i, len, row, store_list, params;   	
    	
    	try {    	
        	params = {};	
    		params.item_code = document.getElementById("item-management-status-change-item-code").innerText.trim();
        	
    		elem = $("#status-change-store-list");
    		rows = elem.jqxGrid("getrows");
        		
    		store_list = [];
    		
    		for (i = 0, len = rows.length; i < len; i++) {
    			row = rows[i];
    			if (row.store_id === undefined || row.status === undefined) {
    				continue;
    			}
    			
    			if (row.status === "Disabled") {
        			store_list.push({
        				store_id: row.store_id,
        				disable: 1
        			});
    			} else {
        			store_list.push({
        				store_id: row.store_id,
        				disable: 0
        			});
    			}
    		}
    		
    		params.store_list_str = JSON.stringify(store_list);
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	params.callback = WRPAdminApp.pagescript.callbackSubmitChangeStoreItems;
    	
    	WRPAdminApp.ItemManager.setStoreItemsByItemCode(params);
    },
    // 170531
    // 콜백?�수가 ?�번 ?�출??
    // 기능?�의 문제???�으???�결책이 ?�요??
    // ?��???비동기요�?�� ?�번�??�루?�짐
    callbackSubmitChangeStoreItems: function(data) { 
    	
    	if (data === 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Completed",
    			okBtnClick: function() {
    				var tab;
    		    	$("#item-management-price-change-window").jqxWindow("close");
    		    	$("#item-management-status-change-window").jqxWindow("close");
    		    	try {
    		    		tab = $("item-management-price-change-tab-panel");
    		    		if (tab) {
    		    			switch (parseInt(tab.val())) {
    		    			case 0: // phone
    		    				//WRPAdminApp.pagescript.getPriceChangePhoneList();
    		    				break;
    		    			case 1: // sim
    		    				//WRPAdminApp.pagescript.getPriceChangeSimList();
    		    				break;
    		    			case 2: // accessory
    		    				//WRPAdminApp.pagescript.getPriceChangeAccessoryList();
    		    				break;
    		    			}
    		    		}
    		    	} catch (e) {
    		    		console.warn(e);
    		    	}
    			}
    		});
    	} else if (data !== undefined) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Error : " + data
    		});
    	}
    },
    getItemManagerRefresh: function(){
    	var listType;
    	listType = arguments[0];
    	
    	if(listType == 0){
    		document.getElementById("item-management-phone-search-keyword").value = "";
    		WRPAdminApp.pagescript.getItemManagerPhoneList();
    	}else if(listType == 1){
    		document.getElementById("item-management-sim-search-keyword").value = "";
    		WRPAdminApp.pagescript.getItemManagerSimList();
    	}else if(listType == 2){
    		document.getElementById("item-management-accessory-search-keyword").value = "";
    		WRPAdminApp.pagescript.getItemManagerAccessoryList();
    	}else if(listType == 3){
    		document.getElementById("item-management-service-search-keyword").value = "";
    		WRPAdminApp.pagescript.getItemManagerServiceList();
    	}
    	
    },
    getItemManagerPhoneList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("item-management-phone-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#item-management-phone-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 0,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetItemManagerPhoneList
    	});
    },
    callbackGetItemManagerPhoneList: function(data) {
    	var elem;
    	elem = $("#item-management-phone-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onItemManagementPhoneListRowSelect: function() {
    	var row;

    	row = arguments[0].args.row;
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackInformItemDictInfo
    	});
    },
    getItemManagerSimList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("item-management-sim-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#item-management-sim-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 1,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetItemManagerSimList
    	});
    },
    callbackGetItemManagerSimList: function(data) {
    	var elem;
    	elem = $("#item-management-sim-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onItemManagementSimListRowSelect: function() {

    	var row;

    	row = arguments[0].args.row;
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackInformItemDictInfo
    	});
    },
    getItemManagerAccessoryList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("item-management-accessory-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#item-management-accessory-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 2,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetItemManagerAccessoryList
    	});
    },
    callbackGetItemManagerAccessoryList: function(data) {
    	var elem;
    	elem = $("#item-management-accessory-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onItemManagementAccessoryListRowSelect: function() {
    	var row;

    	row = arguments[0].args.row;
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackInformItemDictInfo
    	});
    },
    getItemManagerServiceList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("item-management-service-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#item-management-service-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 4,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetItemManagerServiceList
    	});
    },
    callbackGetItemManagerServiceList: function(data) {
    	var elem;
    	elem = $("#item-management-service-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onItemManagementServiceListRowSelect: function() {
    	var row;

    	row = arguments[0].args.row;
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackInformItemDictInfo
    	});
    },
    getPriceChangePhoneList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("price-change-phone-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#price-change-phone-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 0,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetPriceChangePhoneList
    	});
    },
    callbackGetPriceChangePhoneList: function(data) {
    	var elem;
    	elem = $("#price-change-phone-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onPriceChangePhoneListPriceChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#price-change-phone-list").jqxGrid("getrowdata", index);
    	console.log(row);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInPriceChange
    	});
    },
    getPriceChangeSimList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("price-change-sim-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#price-change-sim-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 1,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetPriceChangeSimList
    	});
    },
    callbackGetPriceChangeSimList: function(data) {
    	var elem;
    	elem = $("#price-change-sim-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onPriceChangeSimListPriceChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#price-change-sim-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInPriceChange
    	});
    },
    getPriceChangeAccessoryList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("price-change-accessory-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#price-change-accessory-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 2,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetPriceChangeAccessoryList
    	});
    },
    callbackGetPriceChangeAccessoryList: function(data) {
    	var elem;
    	elem = $("#price-change-accessory-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onPriceChangeAccessoryListPriceChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#price-change-accessory-list").jqxGrid("getrowdata", index);
    	console.log(row);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInPriceChange
    	});
    },
    getPriceChangeServiceList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("price-change-service-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#price-change-service-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 4,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetPriceChangeServiceList
    	});
    },
    callbackGetPriceChangeServiceList: function(data) {
    	var elem;
    	elem = $("#price-change-service-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onPriceChangeServiceListPriceChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#price-change-service-list").jqxGrid("getrowdata", index);
    	console.log(row);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInPriceChange
    	});
    },
    getStatusChangePhoneList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("status-change-phone-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#status-change-phone-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 0,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetStatusChangePhoneList
    	});
    },
    callbackGetStatusChangePhoneList: function(data) {
    	var elem;
    	elem = $("#status-change-phone-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onStatusChangePhoneListStatusChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#status-change-phone-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInStatusChange
    	});
    } ,
    getStatusChangeSimList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("status-change-sim-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#status-change-sim-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 1,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetStatusChangeSimList
    	});
    },
    callbackGetStatusChangeSimList: function(data) {
    	var elem;
    	elem = $("#status-change-sim-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onStatusChangeSimListStatusChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#status-change-sim-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInStatusChange
    	});
    },
    getStatusChangeAccessoryList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("status-change-accessory-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#status-change-accessory-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 2,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetStatusChangeAccessoryList
    	});
    },
    callbackGetStatusChangeAccessoryList: function(data) {
    	var elem;
    	elem = $("#status-change-accessory-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onStatusChangeAccessoryListStatusChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#status-change-accessory-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInStatusChange
    	});
    },
    getStatusChangeServiceList: function() {
    	var searchKeywordElem, elem;
    	
    	searchKeywordElem = document.getElementById("status-change-accessory-search-keyword");
    	if (!searchKeywordElem) {
    		return;
    	}
    	
    	elem = $("#status-change-service-list");
    	if (elem) {
    		elem.jqxGrid("clear");
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictList({
    		item_type: 4,
    		search_keyword: searchKeywordElem.value,
    		callback: WRPAdminApp.pagescript.callbackGetStatusChangeServiceList
    	});
    },
    callbackGetStatusChangeServiceList: function(data) {
    	var elem;
    	elem = $("#status-change-service-list");
    	if (elem) {
    		elem.jqxGrid("addrow", null, data, "last");
    	}
    },
    onStatusChangeServiceListStatusChangeBtnClick: function(index) {
    	var row, elem;

    	row = $("#status-change-service-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoInStatusChange
    	});
    },
    openDownloadItemFromWRPDBWindow: function(item_type) {
    	if (item_type === undefined) {
    		return;
    	}
    	
    	if (item_type < 0 || item_type > 3) {
    		return;
    	}
    	
    	WRPAdminApp.pagescript._downloadItemType = item_type;
    	
    	switch (item_type) {
    	case 0:
    		document.getElementById("item-management-download-item-type").innerHTML = "PHONE";
    		break;
    	case 1:
    		document.getElementById("item-management-download-item-type").innerHTML = "SIM CARD";
    		break;
    	case 2:
    	case 3:
    		document.getElementById("item-management-download-item-type").innerHTML = "ACCESSORY";
    		break;
    	case 4:
    		document.getElementById("item-management-download-item-type").innerHTML = "SERVICE ITEM";
    		break;
    	}
    	
    	$("#download-item-compared-result-list").jqxGrid("clear");
    	
    	$("#item-management-download-item-window").jqxWindow("open");
    },
    compareParentAndChildItems: function() {
    	var params, elem;
    	
    	params = {};
    	try {
        	if (document.getElementById("download-item-from-wrp").checked === true) {
        		params.select_from_wrp_db_table_flag = 1;
        		params.select_from_master_table_flag = 0;
        		params.select_from_owner_table_flag = 0;
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-master").checked === true) {
        		params.select_from_wrp_db_table_flag = 0;
        		params.select_from_master_table_flag = 1;
        		params.select_from_owner_table_flag = 0;
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-owner").checked === true) {
        		params.select_from_wrp_db_table_flag = 0;
        		params.select_from_master_table_flag = 0;
        		params.select_from_owner_table_flag = 1;
        	}
    	} catch (e) {
    		
    	}
    	
    	try {
        	if (document.getElementById("download-item-to-master").checked === true) {
        		params.select_to_master_table_flag = 1;
        		params.select_to_owner_table_flag = 0;
        		params.select_to_store_table_flag = 0;
        	}
    	} catch (e) {
    		
    	}
    	
    	try {
        	if (document.getElementById("download-item-to-owner").checked === true) {
        		params.select_to_master_table_flag = 0;
        		params.select_to_owner_table_flag = 1;
        		params.select_to_store_table_flag = 0;
        	}
    	} catch (e) {
    		
    	}
    	
    	try {
        	if (document.getElementById("download-item-to-store").checked === true) {
        		params.select_to_master_table_flag = 0;
        		params.select_to_owner_table_flag = 0;
        		params.select_to_store_table_flag = 1;
        	}
    	} catch (e) {
    		
    	}
    	
    	params.item_type = WRPAdminApp.pagescript._downloadItemType;	
    	
    	params.callback = WRPAdminApp.pagescript.callbackRequestCompareParentAndChildItems;
    	
    	$("#download-item-compared-result-list").jqxGrid("clear");
    	
    	WRPAdminApp.ItemManager.requestCompareParentAndChildItems(params);
    },
    callbackRequestCompareParentAndChildItems: function(data) {   
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "There are no items to be downloaded.\nAdd new items or check your existing item information."
    		});
    	}
    	
    	$("#download-item-compared-result-list").jqxGrid("addrow", null, data, "last");
    },
    onParentItemsInDownloadItemDetailButtonClick: function(index) {
    	var row, params;

    	row = $("#download-item-compared-result-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	params = {};
    	
    	params.item_sid = row.sid;
    	
    	try {
        	if (document.getElementById("download-item-from-wrp").checked === true) {
        		params.wrp_db_flag = 1;
        		params.master_flag = 0;
        		params.owner_flag = 0;
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-master").checked === true) {
        		params.wrp_db_flag = 0;
        		params.master_flag = 1;
        		params.owner_flag = 0;
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-owner").checked === true) {
        		params.wrp_db_flag = 0;
        		params.master_flag = 0;
        		params.owner_flag = 1;
        	}
    	} catch (e) {
    		
    	}
    	
    	params.callback = WRPAdminApp.pagescript.callbackGetParentItemInDownloadItem;
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid(params);
    },
    callbackGetParentItemInDownloadItem: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.item_type !== undefined) {
    		try {
        		switch (data.item_type) {
        		case 0:
        			document.getElementById("item-detail-window-content-item-type").innerHTML = "PHONE";
        			break;
        		case 1:
        			document.getElementById("item-detail-window-content-item-type").innerHTML = "SIM CARD";
        			break;
        		case 2:
        		case 3:
        			document.getElementById("item-detail-window-content-item-type").innerHTML = "ACCESSORY";
        			break;
            	case 4:
            		document.getElementById("item-detail-window-content-item-type").innerHTML = "SERVICE ITEM";
            		break;
        		}
    		} catch (e) {
    			console.warn(e);
    			return;
    		}
    	}
    	
		try {
			document.getElementById("item-detail-window-content-item-code").innerHTML = (data.item_code !== undefined)? data.item_code : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-sku").innerHTML = (data.sku !== undefined)? data.sku : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-model").innerHTML = (data.model !== undefined)? data.model : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-upc").innerHTML = (data.upc !== undefined)? data.upc : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-title-bar").innerHTML = (data.description !== undefined)? data.description : "&nbsp;";
			document.getElementById("item-detail-window-content-item-description").innerHTML = (data.description !== undefined)? data.description : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-category").innerHTML = (data.category !== undefined)? data.category : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-sub-category").innerHTML = (data.sub_category !== undefined)? data.sub_category : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-carrier").innerHTML = (data.carrier !== undefined)? data.carrier : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-color").innerHTML = (data.color !== undefined)? data.color : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-manufacturer").innerHTML = (data.manufacturer !== undefined)? data.manufacturer : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-condition").innerHTML = (data.condition !== undefined)? data.condition : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
    	
		try {
			document.getElementById("item-detail-window-content-item-vendor").innerHTML = (data.vendor !== undefined)? data.vendor : "&nbsp;";
		} catch (e) {
			console.warn(e);
			return;
		}
		
    	try {
    		document.getElementById("item-detail-window-content-item-image").style.backgroundImage = (data.image !== undefined)? 'url("'+data.image+'")': "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	$("#item-management-item-detail-window").jqxWindow("open");
    },
    changeAllItemsInDownloadItemFromParentWindowSelected: function(selected) {
    	var rows, i, len, row, elem;
    	
    	try {
    		elem = $("#download-item-compared-result-list");
    		rows = elem.jqxGrid("getrows");
    	} catch (e) {
    		consoe.warn(e);
    		return;
    	}
    	
    	if (selected) {
    		selected = true;
    	} else {
    		selected = false;
    	}
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		elem.jqxGrid("setcellvalue", row.boundindex, "selected", selected);
    	}
    },
    openConfirmDownloadItemFromParentWindow: function() {
    	var rows, i, len, row, download_items;
    	
    	try {
        	if (document.getElementById("download-item-from-master").checked === true) {
        		if (document.getElementById("download-item-to-master").checked === true) {
            		WRPCommon.MsgBoxModule.alert({
            			message: "You must not download from master to master"
            		});
            		return;
            	}
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-owner").checked === true) {
        		if (document.getElementById("download-item-to-owner").checked === true) {
        			WRPCommon.MsgBoxModule.alert({
            			message: "You must not download from subdealer to subdealer"
            		});
            		return;
            	}
        	}
    	} catch (e) {
    		
    	}
    	
    	try {
    		rows = $("#download-item-compared-result-list").jqxGrid("getrows");
    	} catch (e) {
    		consoe.warn(e);
    		return;
    	}
    	
    	$("#confirmation-download-item-from-parent-items-list").jqxGrid("clear");
    	
    	download_items = [];
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		if (row.selected === true) {
    			download_items.push(JSON.parse(JSON.stringify(row)));
    		}
    	}
    	
    	if(download_items.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Select items"
    		});
    		return;
    	}
    	
    	$("#confirmation-download-item-from-parent-items-list").jqxGrid("addrow", null, download_items, "last");
    	
    	$("#item-management-confirmation-download-item-from-parent-window").jqxWindow("open");
    },
    confirmDownloadParentItemsToChild: function() {
    	var rows, i, len, row, item_sid_list, params;
    	
    	rows = $("#confirmation-download-item-from-parent-items-list").jqxGrid("getrows");
    	
    	item_sid_list = [];
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		
    		if (row.sid === undefined) {
    			continue;
    		}
    		
    		item_sid_list.push(row.sid);
    	}
    	
    	params = {};
    	params.item_sid_list_str = item_sid_list.join(",");
    	params.callback =  WRPAdminApp.pagescript.confirmCheckDownloadParentItemsToChild;
    	
    	WRPAdminApp.ItemManager.downloadItemsDuplicateCheck(params);
    },
    confirmCheckDownloadParentItemsToChild: function(data){
    	if(data.upcCount > 0){
    		WRPCommon.MsgBoxModule.alert({
    			message: "Duplicated UPC"
    		});
    		return;
    	}

    	if(data.codeCount > 0){
    		WRPCommon.MsgBoxModule.alert({
    			message: "Duplicated Item Code"
    		});
    		return;
    	}
    	
    	WRPCommon.MsgBoxModule.confirm({
    		message: "Are you sure?",
    		msgBoxType: "YesNo",
    		yesBtnClick: WRPAdminApp.pagescript.requestDownloadParentItemsToChild
    	});
    },
    requestDownloadParentItemsToChild: function() {
    	var rows, i, len, row, item_sid_list, params;
    	
    	rows = $("#confirmation-download-item-from-parent-items-list").jqxGrid("getrows");
    	
    	item_sid_list = [];
    	
    	for (i = 0, len = rows.length; i < len; i++) {
    		row = rows[i];
    		
    		if (row.sid === undefined) {
    			continue;
    		}
    		
    		item_sid_list.push(row.sid);
    	}
    	
    	params = {};
    	params.item_sid_list_str = item_sid_list.join(",");
    	
    	try {
        	if (document.getElementById("download-item-from-wrp").checked === true) {
        		params.download_from_wrp_flag = 1;
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-master").checked === true) {
        		params.download_from_wrp_flag = 0;
        	}
    	} catch (e) {
    		
    	}
    	
    	params.callback =  WRPAdminApp.pagescript.callbackRequestDownloadParentItemsToChild;
    	
    	WRPAdminApp.ItemManager.downloadParentItemsToChild(params);
    },
    callbackRequestDownloadParentItemsToChild: function(data) {
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data === 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Completed",
    			okBtnClick: function() {
    		    	$("#item-management-download-item-window").jqxWindow("close");
    		    	$("#item-management-confirmation-download-item-from-parent-window").jqxWindow("close");
    			}
    		});
    	} else {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Error : " + data
    		});
    	}
    },
    onItemManagementPhoneEditBtnClick: function(index) {
    	var row, elem;

    	row = $("#item-management-phone-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoForEdit
    	});
    },
    onItemManagementSimEditBtnClick: function(index) {
    	var row, elem;

    	row = $("#item-management-sim-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoForEdit
    	});
    },
    onItemManagementAccessoryEditBtnClick: function(index) {
    	var row, elem;

    	row = $("#item-management-accessory-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoForEdit
    	});
    },
    onItemManagementServiceEditBtnClick: function(index) {
    	var row, elem;

    	row = $("#item-management-service-list").jqxGrid("getrowdata", index);
    	
    	if (row.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.ItemManager.getItemDictInfoBySid({
    		item_sid: row.sid,
    		callback: WRPAdminApp.pagescript.callbackGetItemDictInfoForEdit
    	});
    },
    callbackGetItemDictInfoForEdit: function(data) {
    	var userFlag;
    	if (data === undefined) {
    		return;
    	}
    	
    	if (data.sid === undefined) {
    		return;
    	}
    	
    	WRPAdminApp.pagescript._selectedItemSid = data.sid;
    	
    	try {
        	if (document.getElementById("download-item-from-wrp").checked === true) {
        		userFlag = 1;
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-master").checked === true) {
        		userFlag = 2;
        	}
    	} catch (e) {
    		
    	}
    	try {
        	if (document.getElementById("download-item-from-owner").checked === true) {
        		userFlag = 3;
        	}
    	} catch (e) {
    		
    	}

    	if(0 < WRPAdminApp.pagescript._selectedItemSid && WRPAdminApp.pagescript._selectedItemSid < 100001){
        		document.getElementById("item-edit-window-item-type").disabled = true;
        		document.getElementById("item-edit-window-item-code").disabled = true;
        		document.getElementById("item-edit-window-item-model").disabled = true;
        		document.getElementById("item-edit-window-item-description").disabled = true;
        		document.getElementById("item-edit-window-item-sku").disabled = true;
        		document.getElementById("item-edit-window-item-upc").disabled = true;
        		document.getElementById("item-edit-window-item-category").disabled = true;
        		document.getElementById("item-edit-window-item-distributor").disabled = true;
        		document.getElementById("item-edit-window-item-manufacturer").disabled = true;
        		document.getElementById("item-edit-window-item-color").disabled = true;
        		document.getElementById("item-edit-window-item-condition").disabled = true;
        		//document.getElementById("item-edit-window-item-cost").disabled = true;
        		//document.getElementById("item-edit-window-item-retail-price").disabled = true;
    	}else if(100000 < WRPAdminApp.pagescript._selectedItemSid && WRPAdminApp.pagescript._selectedItemSid < 200001){
    		if(userFlag < 2){
        		document.getElementById("item-edit-window-item-type").disabled = false;
        		document.getElementById("item-edit-window-item-code").disabled = false;
        		document.getElementById("item-edit-window-item-model").disabled = false;
        		document.getElementById("item-edit-window-item-description").disabled = false;
        		document.getElementById("item-edit-window-item-sku").disabled = false;
        		document.getElementById("item-edit-window-item-upc").disabled = false;
        		document.getElementById("item-edit-window-item-category").disabled = false;
        		document.getElementById("item-edit-window-item-distributor").disabled = false;
        		document.getElementById("item-edit-window-item-manufacturer").disabled = false;
        		document.getElementById("item-edit-window-item-color").disabled = false;
        		document.getElementById("item-edit-window-item-condition").disabled = false;
        		//document.getElementById("item-edit-window-item-cost").disabled = false;
        		//document.getElementById("item-edit-window-item-retail-price").disabled = false;
    		}else{
    			document.getElementById("item-edit-window-item-type").disabled = true;
        		document.getElementById("item-edit-window-item-code").disabled = true;
        		document.getElementById("item-edit-window-item-model").disabled = true;
        		document.getElementById("item-edit-window-item-description").disabled = true;
        		document.getElementById("item-edit-window-item-sku").disabled = true;
        		document.getElementById("item-edit-window-item-upc").disabled = true;
        		document.getElementById("item-edit-window-item-category").disabled = true;
        		document.getElementById("item-edit-window-item-distributor").disabled = true;
        		document.getElementById("item-edit-window-item-manufacturer").disabled = true;
        		document.getElementById("item-edit-window-item-color").disabled = true;
        		document.getElementById("item-edit-window-item-condition").disabled = true;
        		//document.getElementById("item-edit-window-item-cost").disabled = true;
        		//document.getElementById("item-edit-window-item-retail-price").disabled = true;
    		}
    	}else{
    		if(userFlag < 3){
    			document.getElementById("item-edit-window-item-type").disabled = false;
        		document.getElementById("item-edit-window-item-code").disabled = false;
        		document.getElementById("item-edit-window-item-model").disabled = false;
        		document.getElementById("item-edit-window-item-description").disabled = false;
        		document.getElementById("item-edit-window-item-sku").disabled = false;
        		document.getElementById("item-edit-window-item-upc").disabled = false;
        		document.getElementById("item-edit-window-item-category").disabled = false;
        		document.getElementById("item-edit-window-item-distributor").disabled = false;
        		document.getElementById("item-edit-window-item-manufacturer").disabled = false;
        		document.getElementById("item-edit-window-item-color").disabled = false;
        		document.getElementById("item-edit-window-item-condition").disabled = false;
        		///document.getElementById("item-edit-window-item-cost").disabled = false;
        		//document.getElementById("item-edit-window-item-retail-price").disabled = false;
    		}else{
    			document.getElementById("item-edit-window-item-type").disabled = true;
        		document.getElementById("item-edit-window-item-code").disabled = true;
        		document.getElementById("item-edit-window-item-model").disabled = true;
        		document.getElementById("item-edit-window-item-description").disabled = true;
        		document.getElementById("item-edit-window-item-sku").disabled = true;
        		document.getElementById("item-edit-window-item-upc").disabled = true;
        		document.getElementById("item-edit-window-item-category").disabled = true;
        		document.getElementById("item-edit-window-item-distributor").disabled = true;
        		document.getElementById("item-edit-window-item-manufacturer").disabled = true;
        		document.getElementById("item-edit-window-item-color").disabled = true;
        		document.getElementById("item-edit-window-item-condition").disabled = true;
        		//document.getElementById("item-edit-window-item-cost").disabled = true;
        		//document.getElementById("item-edit-window-item-retail-price").disabled = true;
    		}
    	}
    	
    	
    	try {
    		document.getElementById("item-edit-window-item-type").value = (data.item_type !== undefined)? data.item_type: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-code").value = (data.item_code !== undefined)? data.item_code: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-model").value = (data.model !== undefined)? data.model: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-description").value = (data.description !== undefined)? data.description: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-sku").value = (data.sku !== undefined)? data.sku: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-upc").value = (data.upc !== undefined)? data.upc: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-category").value = (data.category_sid !== undefined)? data.category_sid: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	if (data.category_sid !== undefined && data.sub_category_sid !== undefined && data.sub_category_sid > 0) {        	
        	WRPAdminApp.pagescript._selectedSubCategorySid = data.sub_category_sid;        
        	
        	WRPAdminApp.ItemManager.getCategoryListByParentSid({
        		parent_sid:data.category_sid,
        		callback: WRPAdminApp.pagescript.callbackGetSubCategoryListByCategorySid
        	});
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-distributor").value = (data.distributor !== undefined)? data.distributor: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-manufacturer").value = (data.manufacturer !== undefined)? data.manufacturer: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-color").value = (data.color !== undefined)? data.color: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-condition").value = (data.condition !== undefined)? data.condition: "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}

    	/*
    	try {
    		document.getElementById("item-edit-window-item-cost").value = (data.item_cost !== undefined)? "$"+data.item_cost.toFixed(2): "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		document.getElementById("item-edit-window-item-retail-price").value = (data.retail_price !== undefined)? "$"+data.retail_price.toFixed(2): "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	try {
    		document.getElementById("item-edit-window-item-wholesale-price").value = (data.wholesale_price !== undefined)? "$"+data.wholesale_price.toFixed(2): "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	*/
    	try {
    		document.getElementById("item-edit-window-content-item-image").style.backgroundImage = (data.image !== undefined)? 'url("'+data.image+'")': "";
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	$("#item-management-edit-item-window").jqxWindow("open");
    },
    initAddItemWindow: function() {
    	var elems, i, len;
    	
    	elems = document.querySelectorAll("#item-management-edit-item-window input");
    	
    	for (i = 0, len = elems.length; i < len; i++) {
    		elems[i].value = "";
    	}
    	
    	elems = document.querySelectorAll("#item-management-edit-item-window select");
    	
    	for (i = 0, len = elems.length; i < len; i++) {
    		elems[i].value = "";
    	}
    	
    	WRPAdminApp.pagescript._selectedItemSid = 0;
    	document.getElementById("item-edit-window-item-type").disabled = false;
		document.getElementById("item-edit-window-item-code").disabled = false;
		document.getElementById("item-edit-window-item-model").disabled = false;
		document.getElementById("item-edit-window-item-description").disabled = false;
		document.getElementById("item-edit-window-item-sku").disabled = false;
		document.getElementById("item-edit-window-item-upc").disabled = false;
		document.getElementById("item-edit-window-item-category").disabled = false;
		document.getElementById("item-edit-window-item-distributor").disabled = false;
		document.getElementById("item-edit-window-item-manufacturer").disabled = false;
		document.getElementById("item-edit-window-item-color").disabled = false;
		document.getElementById("item-edit-window-item-condition").disabled = false;
		//document.getElementById("item-edit-window-item-cost").disabled = false;
		//document.getElementById("item-edit-window-item-retail-price").disabled = false;
    	$("#item-management-edit-item-window").jqxWindow("open");
    },
    getSubCategoryListByCategorySid: function() {
    	var elem, params;
    	
    	elem = document.getElementById("item-edit-window-item-category");
    	if (!elem) {
    		return;
    	}
    	
    	params = {};
    	params.parent_sid = elem.value;
    	
    	params.callback = WRPAdminApp.pagescript.callbackGetSubCategoryListByCategorySid;
    	
    	WRPAdminApp.ItemManager.getCategoryListByParentSid(params);
    },
    callbackGetSubCategoryListByCategorySid: function(data) {
    	var i, len, obj, innerHTML;
		if (data === undefined) {
			return;
		}
		innerHTML = [];
		
		for (i = 0, len = data.length; i < len; i++) {
			obj = data[i];
			if (obj.sid === undefined || obj.category_name === undefined) {
				continue;
			}
			
			innerHTML.push('<option value="');
			innerHTML.push(obj.sid);
			if (WRPAdminApp.pagescript._selectedSubCategorySid && WRPAdminApp.pagescript._selectedSubCategorySid === obj.sid) {
				innerHTML.push(" selected");
			}
			innerHTML.push('">');
			innerHTML.push(obj.category_name);
			innerHTML.push('</option>');
		}
		
		try {
			document.getElementById("item-edit-window-item-sub-category").innerHTML = innerHTML.join("");
		} catch (e) {
			console.warn(e);
		}
		
		innerHTML = undefined;
    },
    getItemCodeExistFlag: function() {
    	var elem, params;
    	if (arguments.length > 0) {
        	elem = document.getElementById(arguments[0]);
    	} else {
        	elem = document.getElementById("item-edit-window-item-code");    		
    	}
    	if (!elem) {
    		return;
    	}
    	
    	if (elem.value.length < 1) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Enter item code"
    		});
    		return;
    	}
    	
    	params = {};
    	params.sid = WRPAdminApp.pagescript._selectedItemSid;
    	params.item_code = elem.value;
    	
    	params.callback = WRPAdminApp.pagescript.callbackGetItemCodeExistFlag;
    	
    	WRPAdminApp.ItemManager.getItemCodeExistFlag(params);
    },
    callbackGetItemCodeExistFlag: function(data) {
    	if (data.flag === undefined) {
    		return;
    	}
    	
    	if (data.flag > 0) {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Duplicated item code"
    		});
    	} else {
    		WRPCommon.MsgBoxModule.alert({
    			message: "Available item code"
    		});
    	}
    },
    onItemImageFileChange: function() {
    	var itemImage = document.getElementById("item-edit-item-image-file"), reader;
        if (!itemImage) return;

        if (itemImage.files && itemImage.files[0]) {
            reader = new FileReader();
            reader.onload = function(e) {
                try { document.getElementById("item-edit-window-content-item-image").style.backgroundImage= 'url("'+e.target.result+'")'; } catch (e) {}
            };

            reader.readAsDataURL(itemImage.files[0]);
        } else {
            try { document.getElementById("item-edit-window-content-item-image").style.backgroundImage= ''; } catch (e) {}
        }
    },
    confirmSaveItemDict: function() {
    	WRPCommon.MsgBoxModule.confirm({
	    	msgBoxType: "YesNo",
    		message:"Are you sure?",
    		yesBtnClick: WRPAdminApp.pagescript.saveItemDict
    	});
    },
    saveItemDict: function() {
    	var params, item_image_file_elem, form;
    	
    	params = {};
    	
    	item_image_file_elem = document.getElementById("item-edit-item-image-file");
    	
    	if (item_image_file_elem) {
    		if (item_image_file_elem.files.length > 0) {
    			form = document.getElementById("item-edit-window-set-item-image-form");
    		}
    	}
    	
    	params.sid = WRPAdminApp.pagescript._selectedItemSid;
    	
    	try {
    		params.item_type = document.getElementById("item-edit-window-item-type").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.item_code = document.getElementById("item-edit-window-item-code").value;
    		if (params.item_code.length < 1) {
    			WRPCommon.MsgBoxModule.alert({
        			message: "Enter item code"
        		});
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.model = document.getElementById("item-edit-window-item-model").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.description = document.getElementById("item-edit-window-item-description").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.sku = document.getElementById("item-edit-window-item-sku").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.upc = document.getElementById("item-edit-window-item-upc").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.category = document.getElementById("item-edit-window-item-category").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.sub_category = document.getElementById("item-edit-window-item-sub-category").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.distributor = document.getElementById("item-edit-window-item-distributor").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.manufacturer = document.getElementById("item-edit-window-item-manufacturer").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.color = document.getElementById("item-edit-window-item-color").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.condition = document.getElementById("item-edit-window-item-condition").value;    		
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	/*
    	try {
    		params.item_cost = parseFloat(document.getElementById("item-edit-window-item-cost").value.replace(/\$/gi, ""));
    		if (isNaN(params.item_cost)) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "Item cost contains non-numeric characters"
    			});
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	
    	try {
    		params.retail_price = parseFloat(document.getElementById("item-edit-window-item-retail-price").value.replace(/\$/gi, ""));
    		if (isNaN(params.retail_price)) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "Retail price contains non-numeric characters"
    			});
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	try {
    		params.wholesale_price = parseFloat(document.getElementById("item-edit-window-item-wholesale-price").value.replace(/\$/gi, ""));
    		if (isNaN(params.wholesale_price)) {
    			WRPCommon.MsgBoxModule.alert({
    				message: "Wholesale price contains non-numeric characters"
    			});
    			return;
    		}
    	} catch (e) {
    		console.warn(e);
    		return;
    	}
    	*/
    	if (form) {
    		document.getElementById("item-edit-hidden-item-dict-data").value = JSON.stringify(params);
    		params = {};
    		params.form = form;
        	params.callback = WRPAdminApp.pagescript.callbackSaveItemDict;
        	WRPAdminApp.ItemManager.setItemDictInfoWithItemImage(params);
    	} else {

        	params.callback = WRPAdminApp.pagescript.callbackSaveItemDict;
        	WRPAdminApp.ItemManager.setItemDictInfo(params);
    	}
    	
    	
    },
    callbackSaveItemDict: function(result) {
    	if (result === undefined) {
    		return;
    	}
    	
    	switch (parseInt(result)) {
    	case 0:
    		WRPCommon.MsgBoxModule.alert({
				message:"Completed",
				okBtnClick: function() {
					$("#item-management-edit-item-window").jqxWindow("close");
					$("#item-management-add-item-window").jqxWindow("close");
					WRPAdminApp.pagescript._selectedItemSid = 0;
				}
			});
    		break;
    	case 1:
    		WRPCommon.MsgBoxModule.alert({
    			message: "Duplicated item code"
    		});
    		break;
    	default: 
    		WRPCommon.MsgBoxModule.alert({
    			message: "Error : " + result
    		});
    	}
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
        
        $.ajax({
            url: "ajax/category/getCategoriesByParentSid.jsp",
            data: {
                storeId: storeId,
                parentSid: 0
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
            	var elem, data;
            	var innerHTML= [];
            	
            	data = result.data;
            	if(!data) return;
            	
            	for (var i = 0; i < data.length; i++){
            		var row = {};
            		
            		innerHTML.push('<option value="');
                    innerHTML.push(data[i].sid);
                    if (i == 0) {
                        innerHTML.push('" selected>');
                    } else {
                        innerHTML.push('">');
                    }
                    innerHTML.push(data[i].categoryName);
                    innerHTML.push('</option>');
            	}
            	
            	try {
                    document.getElementById("sys-conf-parent-category-name").innerHTML = innerHTML.join("");
                } catch (e) {
                    console.warn(e);
                }
                
                elem = $("#jqx-sys-category-list");
                if(elem){
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
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
            	var elem, data;
            	
            	data = result.data;
            	if(!data) return;
            	
            	elem = $("#jqx-sys-sub-category-list");
                if(elem){
    				elem.jqxGrid("clear");
    				elem.jqxGrid("addRow", null, data, "last");
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
                		message: "Completed",
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
                		message: "Completed",
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
};