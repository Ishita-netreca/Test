
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
		try {
			WRPComponents('div[pagename="manage_report_accounting"] > .page-submenu-container > .submenu[panelname="sales_tax_report"]').addShadowedImage('img/icon/sales_tax_report.png');
		} catch (e) {

		}
		WRPAdminApp.pagescript.salesTaxReportLoad();
    },
    salesTaxReportLoad: function(){
    	var iframe, user_id;
    	
    	iframe = document.getElementById("sales-tax-report-iframe");
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
        		try {
        			document.getElementById("loading-container").style.display = "block";
        		} catch (e) {
        			
        		}
    			iframe.src = "https://reports.posmasterus.com/Report/SalesTaxReport?user=" + user_id;
    		}
    	} catch (e) {
    		console.warn(e);
    	}
    	
    }
};