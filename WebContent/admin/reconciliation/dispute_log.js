var WRPDisputeLogger = function() {
	return {
		getMasterList: function() {
			try {
				document.getElementById("select-master-list").innerHTML = "";
			} catch (e) {
				console.warn(e);
				return;
			}
			
			$.ajax({
				url: "../ajax/master/getMasterList.jsp",
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, innerHTML ;
					
					data = result.data;
					
					if (!data) {
						return;
					}
					
					innerHTML = [];
					
					for (i= 0, len = data.length; i < len; i++) {
						obj = data[i];
						
						if (obj.master_id === undefined || obj.db_name === undefined) {
							continue;
						}
						
						innerHTML.push('<option value="');
						innerHTML.push(obj.db_name);
						innerHTML.push('">');
						innerHTML.push(obj.master_id);
						innerHTML.push('</option>');
					}
					
					try {
						document.getElementById("select-master-list").innerHTML = innerHTML.join("");
					} catch (e) {
						console.warn(e);
						return;
					}
					
					innerHTML = undefined;
					
					try {
						document.getElementById("select-master-list").value = "";
					} catch (e) {
						console.warn(e);
						return;
					}
				}
			});
		},
		getMasterStoreList: function(db_name) {
			if (db_name === undefined || db_name.length< 1) {
				return;
			}
			try {
				document.getElementById("master-store-list").innerHTML = "";
			} catch (e) {
				
			}
			
			$.ajax({
				url: "../ajax/master/getMastersStoreList.jsp",
				data: {
					master_db_name: db_name
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, innerHTML;
					
					data = result.data;
					if (!data) {
						return;
					}
					
					innerHTML = [];
					
					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						if (obj.store_id === undefined || obj.store_id.length < 1) {
							continue;
						}
						innerHTML.push('<label>');
						innerHTML.push('<input type="checkbox" class="check-store-id" value="');
						innerHTML.push(obj.store_id);
						innerHTML.push('"/>');
						innerHTML.push(obj.store_id);
						innerHTML.push('</label>');
					}
					
					try {
						document.getElementById("master-store-list").innerHTML = innerHTML.join("");
					} catch (e) {
						
					}
					
					innerHTML = undefined;
				}
			});
		},
		getDisputeLogList: function() {
			var store_id_list, i, len, obj, checkboxes, start_date, end_date, db_name;
			
			db_name = document.getElementById("select-master-list").value;
			
			if (db_name.length < 1) {
				alert("Select master");
				return;
			}
			
			checkboxes = document.querySelectorAll(".check-store-id");
			
			store_id_list = [];
			
			for (i = 0, len = checkboxes.length; i < len; i++) {
				obj = checkboxes[i];
				if (obj.checked === true) {
					if (obj.value.length > 0) {
						store_id_list.push(obj.value);
					}
				}
			}
			
			if (store_id_list.length < 1) {
				alert("Select Stores");
				return;
			}
			
			start_date = document.getElementById("set-period-start-date").value;
			if (start_date.length == 0) {
				alert("Set start date");
				return;				
			}
			
			end_date = document.getElementById("set-period-end-date").value;
			if (end_date.length == 0) {
				alert("Set end date");
				return;				
			}
			
			start_date = start_date.replace(/\//gi, "");
			if (start_date.length != 8) {
				alert("start date format error");
				return;
			}
			if (isNaN(parseInt(start_date.substring(0,2))) || isNaN(parseInt(start_date.substring(2,4))) || isNaN(parseInt(start_date.substring(4,8)))) {
				alert("start date format error");
				return;
			}
			
			start_date = parseInt(start_date.substring(4,8)) + "-" + parseInt(start_date.substring(0,2)) + "-" + parseInt(start_date.substring(2,4));
			
			end_date = end_date.replace(/\//gi, "");
			if (end_date.length != 8) {
				alert("end date format error");
				return;
			}
			if (isNaN(parseInt(end_date.substring(0,2))) || isNaN(parseInt(end_date.substring(2,4))) || isNaN(parseInt(end_date.substring(4,8)))) {
				alert("end date format error");
				return;
			}
			
			end_date = parseInt(end_date.substring(4,8)) + "-" + parseInt(end_date.substring(0,2)) + "-" + parseInt(end_date.substring(2,4));
			
			
			try {
				document.getElementById("dispute-log-list").innerHTML = '';
			} catch (e) {
				console.warn(e);
				return;
			}
			
			$.ajax({
				url: "../ajax/reconciliation/getDisputeList.jsp",
				data: {
					master_db_name: db_name,
					start_date: start_date,
					end_date: end_date,
					store_id_list_str: store_id_list.join(",")
				},
				method: "POST",
				dataType: "json",
				success: function(result) {
					var data, i, len, obj, innerHTML;
					
					data = result.data;
					if (!data) {
						return;
					}
					
					innerHTML = [];
					
					innerHTML.push('<table>');
					innerHTML.push('<thead>');
					innerHTML.push('<tr><th>DM</th><th>STORE</th><th>Invoice</th><th>Sales Associate</th><th>Door Code</th><th>Account</th><th>MDN</th><th>ESN</th><th>SIM</th><th>Transaction Type</th><th>Transaction Date</th><th>Handset Model</th><th>Rate Plan</th></tr>');
					innerHTML.push('</thead>');
					innerHTML.push('<tbody>');
					for (i = 0, len = data.length; i < len; i++) {
						obj = data[i];
						innerHTML.push('<tr>');
						innerHTML.push('<td>');
						innerHTML.push((obj.manager !== undefined)? obj.manager : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.store_id !== undefined)? obj.store_id : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.invoice_no !== undefined)? obj.invoice_no : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.user_name !== undefined)? obj.user_name : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.door_code !== undefined)? obj.door_code : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.account !== undefined)? obj.account : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.mdn !== undefined)? obj.mdn : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.esn !== undefined)? obj.esn : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.sim !== undefined)? obj.sim : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');					    
					    switch (obj.transaction_type) {
					    case 0:    	
					    	innerHTML.push("New Activation - New Handset");
					    	break;
					    case 1:	    	
					    	innerHTML.push("Re Activation - New Handset");
					    	break;
					    case 2:	 
					    	innerHTML.push("Upgrade - New Handset");   	
					    	break;
					    case 3:
					    	innerHTML.push("Port-In - New Handset");	    	
					    	break;
					    case 4:	
					    	innerHTML.push("New Activation - BYOD Handset");	    	
					    	break;
					    case 5:	  
					    	innerHTML.push("Re Activation - BYOD Handset");	     	
					    	break;
					    case 6:	   
					    	innerHTML.push("Upgrade - BYOD Handset");	    	
					    	break;
					    case 7:
					    	innerHTML.push("Port-In - BYOD Handset");	   	    	
					    	break;
					    case 8:
					    	innerHTML.push("ESN Change");	   	    	
					    	break;
					    case 9:
					    	innerHTML.push("MDN Change");	 	    	
					    	break;
					    case 10:
					    	innerHTML.push("MPR / DOA");		    	
					    	break;
					    case 11:	   
					    	innerHTML.push("XBM");	 	
					    	break;
					    case 12: 					    	
					    	innerHTML.push("Add-A-Line - New Handset");	
					    	break;
					    case 13:	
					    	innerHTML.push("Add-A-Line - BYOD Handset");	   	    	
					    	break;
					    case 14:   
					    	innerHTML.push("SOR"); 	
					    	break;
					    }
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.date !== undefined)? obj.date : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.handset_description !== undefined)? obj.handset_description : '');
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.rateplan_code !== undefined)? obj.rateplan_code : '');
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					}
					innerHTML.push('</tbody>');
					innerHTML.push('</table>');
				
					try { 
						document.getElementById("dispute-log-list").innerHTML = innerHTML.join("");
					} catch (e) {
						console.warn(e);
						return;
					}
					
					innerHTML = undefined;
				}
			});
		}
	};
}();