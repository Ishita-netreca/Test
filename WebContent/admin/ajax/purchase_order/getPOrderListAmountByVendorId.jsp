<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp"%>
<%
/*170122 jh : getPOrderListAmountByVendorId.jsp 에 amount 추가 버전*/

		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int vendorId = MyRequestUtil.getInt(request, "vendorId", 0);
		
		String searchPeriodStart = MyRequestUtil.getString(request, "searchPeriodStart", null);
		String searchPeriodEnd = MyRequestUtil.getString(request, "searchPeriodEnd", null);
		
		try {
		    if (storeId == null || vendorId < 1) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT DISTINCT `ab`.sid, `ab`.status, `ab`.po_id, `ab`.`orderer_id` as ordererId, `ab`.order_date as orderDate, `ab`.vendor_id as vendorId, `c`.amount, `c`.`total_order_qty` FROM ("));
			query.append(String.format("SELECT `a`.`sid`, `a`.`status`, `a`.`po_id`, `a`.`orderer_id`, DATE_FORMAT(DATE_ADD(`a`.`order_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y %%H:%%i:%%s') AS `order_date`, `b`.`vendor_id` FROM (SELECT * FROM `%s`.`tb_po_%s` WHERE `vendor_id`='%d') AS `a` LEFT JOIN `%s`.`tb_vendor` AS `b` ON `a`.`vendor_id`=`b`.`sid`", timezone_offset.toString(), db_name,storeId, vendorId, db_name));

			query.append(String.format(") AS `ab` LEFT JOIN (SELECT (k.`item_cost` * j.`order_qty`) AS amount, `po_sid`, (`order_qty`) AS `total_order_qty` FROM `%s`.`tb_po_items_%s` AS j, `%s`.`tb_item_dict_%s` AS k WHERE j.`item_sid` = k.`sid`) AS `c` ON `ab`.`sid`=`c`.`po_sid`", db_name, storeId, db_name, storeId));
			if (searchPeriodStart != null && searchPeriodEnd != null) {
			    query.append(String.format(" WHERE `order_date` BETWEEN '%s' AND '%s' ", searchPeriodStart, searchPeriodEnd));
			}
			query.append(String.format("ORDER BY `status`, `order_date` DESC "));
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(),true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query=null;
%>