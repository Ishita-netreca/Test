
/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
		var iframe, user_id;
		
		iframe = document.getElementById("eod-external-iframe");
		if (iframe) {
			try {
				user_id = iframe.getAttribute("user_id") || "";
				iframe.src = "http://reports.posmasterus.com/Report/EOD?user="+user_id;
			} catch (e) {
				
			}
		}
		
    }
};