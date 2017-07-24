
var _pagescript = {
    init: function() {
    	var components;
    	
    	components = $("#jqx-store-credit-list");
    	if(components){
			components.jqxGrid({
				width : '100%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'sid', type: 'date'},
							{ name: 'storeId', type: 'string'},
							{ name: 'name', type: 'string'},
							{ name: 'ownerId', type: 'string'},
							{ name: 'manager', type: 'string'},
							{ name: 'marketName', type: 'string'},
							{ name: 'districtName', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : 
					[ 
						{ text : 'sid',datafield : 'sid',hidden:true }, 
						{ text : 'Store Id',datafield : 'storeId', width : '20%'},
						{ text : 'Description', datafield : 'name',width : '20%'}, 
						{ text : 'Owner Id', datafield : 'ownerId',width : '15%'}, 
						{ text : 'Manager', datafield : 'manager',width : '15%'}, 
						{ text : 'Market', datafield : 'marketName',width : '15%'}, 
						{ text : 'District', datafield : 'districtName',width : '15%'}, 
					]
			});
			components.on('rowselect', WRPAdminApp.pagescript.getStoreCreditList);
		}
    	
    	components = $("#jqx-store-credit-detail-list");
    	if(components){
			components.jqxGrid({
				width : '100%',
				height : '100%',
				source : new $.jqx.dataAdapter({
					datafields:
						[
							{ name: 'customer_name', type: 'string'},
							{ name: 'total', type: 'number'},
							{ name: 'date', type: 'string'},
						],
	            	datatype: "json"
	            }),
				showfilterrow : false,
				filterable : true,
				sortable : true,
				columnsresize : true,
				theme : 'arctic',
				columns : 
					[ 
						{ text : 'Customer Name',datafield : 'customer_name', width : '30%'},
						{ text : 'Credit Value', datafield : 'total',width : '30%'}, 
						{ text : 'Update Date', datafield : 'date',width : '40%'}, 
					]
			});
			components.on('rowselect', WRPAdminApp.pagescript.getStoreCreditList);
		}
    	
    	WRPAdminApp.pagescript.getStoreList();
    },
    getStoreList: function() {
        $.ajax({
            url: "ajax/store/getStoreList.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {  
            	var data, elem, i, len, obj;
    			
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-store-credit-list");
    			if (elem) {
    				elem.jqxGrid("clear");
   					elem.jqxGrid("addRow", null, data, "last");
    			}
            	
            }
        });
    },
    getStoreCreditList: function(event) {
    	var rowdata;
    	rowdata = event.args.row;
        $.ajax({
            url: "ajax/store_credit/getStoreCreditTotalList.jsp",
            data:{
            	store_id: rowdata.storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {  
            	var data, elem, i, len, obj, total;
    			total = 0;
    			data = result.data;
    			if (!data) return;
    			
    			elem = $("#jqx-store-credit-detail-list");
    			if (elem) {
    				elem.jqxGrid("clear");
   					elem.jqxGrid("addRow", null, data, "last");
    			}
            	
    			for(i=0; i<data.length; i++){
    				obj = data[i];
    				total = total + obj.total;
    			}
    			
    			document.getElementById("store-credit-total-value").value = total;
            }
        });
    }
};