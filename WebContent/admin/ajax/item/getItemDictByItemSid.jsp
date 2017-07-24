<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int itemSid = MyRequestUtil.getInt(request, "itemSid", 0);
		
		try {
		    if (storeId == null || itemSid < 1 || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `sid`,`item_code` AS `itemCode`,`model`,`description`,`distributor`,`category`,`sub_category` AS `subCategory`,`manufacturer`,`color`,`condition`,`a`.`sku`,`item_cost` AS `itemCost`,`retail_price` AS `retailPrice`,`wholesale_price` AS `wholesalePrice`,`item_type` AS `itemType`,`update_date` AS `updateDate`,`updater`,`disable`,`serialized`,`carrier_sid` AS `carrierSid`,`vendor_sid`,`qty`,`bin`,"));
			query.append(String.format("IF(`a`.`image` IS NOT NULL AND `a`.`image` != '', `a`.`image`, `wrp`.`image`) AS `image` FROM"));
			query.append(String.format(" (SELECT * FROM `%s`.`tb_item_dict_%s` WHERE `sid`='%d') AS `a` LEFT JOIN (SELECT `item_sid`,SUM(`qty`) AS `qty`, `bin` FROM `%s`.`tb_inventory_%s` WHERE `item_sid`='%d' GROUP BY `item_sid`) AS `b` ON `a`.`sid`=`b`.`item_sid`", db_name, storeId, itemSid, db_name, storeId, itemSid));
			query.append(String.format(" LEFT JOIN (SELECT `sku`,`image` FROM `wrp`.`tb_item_dict_[storeid]` WHERE `sku` IN (SELECT `sku` FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (%d)) ",db_name, storeId, itemSid));
			query.append(String.format(") AS `wrp` ON `a`.`sku`=`wrp`.`sku` "));
			
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), false));

		} catch (Exception e) {

            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>