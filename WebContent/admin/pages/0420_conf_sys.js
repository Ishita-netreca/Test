/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    init: function() {
    	try {
			WRPComponents('div[pagename="conf_sys"] > .page-submenu-container > .submenu[panelname="item_category"]').addShadowedImage('img/icon/category_01.png');
			WRPComponents('div[pagename="conf_sys"] > .page-submenu-container > .submenu[panelname="chart_of_account"]').addShadowedImage('img/icon/chart_01.png');
			WRPComponents('div[pagename="conf_sys"] > .page-submenu-container > .submenu[panelname="dt_setup"]').addShadowedImage('img/icon/datetime_02.png');
			WRPComponents('div[pagename="conf_sys"] > .page-submenu-container > .submenu[panelname="emp_roles"]').addShadowedImage('img/icon/tree_01.png');
			WRPComponents('div[pagename="conf_sys"] > .page-submenu-container > .submenu[panelname="permission_group"]').addShadowedImage('img/icon/permission_01.png');
			WRPComponents('div[pagename="conf_sys"] > .page-submenu-container > .submenu[panelname="store_location"]').addShadowedImage('img/icon/map_01.png');
			WRPComponents('div[pagename="conf_sys"] > .page-submenu-container > .submenu[panelname="qpay"]').addShadowedImage('img/icon/qpay_favorite.png');
		} catch (e) {
			
		}
    	
    	WRPAdminApp.setSubMenuPage('item_category');
    }
};