
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
    	var iframe, user_id;
    	
    	iframe = document.getElementById("company-report-inventory-main-iframe");
    	if (!iframe) {
    		return;
    	}
    	
    	iframe.onload = function() {
    		try {
    			document.getElementById("loading-container").style.display = "none";
    		} catch (e) {
    			
    		}
    	}
    	
    	try {
    		user_id = iframe.getAttribute("user_id");
    		if (user_id && user_id.length > 0) {
    			iframe.src = "http://www.upcs.us:8002/Report/InventoryReport?user=" + user_id;
        		try {
        			document.getElementById("loading-container").style.display = "block";
        		} catch (e) {
        			
        		}
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    	
    }
};