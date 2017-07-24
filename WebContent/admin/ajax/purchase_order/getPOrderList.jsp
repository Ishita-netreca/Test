<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		int status = MyRequestUtil.getInt(request, "status", -1);
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);

		try {
			if (store_id == null || db_name == null) {
		        throw new Exception();
		    }
			
			query.append(String.format("SELECT `a`.*,`b`.`vendor_id`,`c`.`item_count`,`d`.`item_description`, IF(`d`.`item_description` IS NOT NULL && `d`.`item_description` != '', IF (`c`.`item_count` > 1, CONCAT(`d`.`item_description`,' and ',`c`.`item_count`-1,' items' ), `d`.`item_description` ), '' ) AS `item_info`,`e`.`total_order_qty` FROM ("));
			query.append(String.format(" SELECT `sid`,`po_id`,`vendor_id` AS `_vendor_id`,`status`,`order_date` AS `_order_date`,DATE_FORMAT(`order_date`,'%%m/%%d/%%Y %%H:%%i:%%s') AS `order_date`"));
			query.append(String.format(" FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND ("));
				query.append(String.format(" `po_id` LIKE '%%%s%%' OR `sid` IN (SELECT `po_sid` FROM `%s`.`tb_po_items_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` LIKE '%%%s%%' OR `description` LIKE '%%%s%%'))", 
											MyDBUtil.addSlashes(keyword),							db_name,		store_id,									db_name,			store_id,					MyDBUtil.addSlashes(keyword), MyDBUtil.addSlashes(keyword)
				));
				query.append(String.format(" OR `vendor_id` IN (SELECT `sid` FROM `%s`.`tb_vendor` WHERE `vendor_id` LIKE '%%%s%%')", db_name, MyDBUtil.addSlashes(keyword)));
				query.append(String.format(")"));
			}
			if (status > -1) {
				query.append(String.format(" AND `status` IN (%d)", status));
			}
			if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {
				query.append(String.format(" AND (`order_date` BETWEEN DATE_SUB(STR_TO_DATE('%s 00:00:00','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) AND DATE_SUB(STR_TO_DATE('%s 23:59:59','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) )", start_date, end_date));
			}	
			query.append(String.format(" ) as `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`vendor_id` FROM `%s`.`tb_vendor` WHERE 1=1", db_name));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND `vendor_id` LIKE '%%%s%%'", keyword));
			}
			query.append(String.format(" ) AS `b` ON `a`.`_vendor_id`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `po_sid`,`item_sid`,count(`item_sid`) AS `item_count` FROM `%s`.`tb_po_items_%s` WHERE `po_sid` IN (", db_name, store_id));
			query.append(String.format(" SELECT `sid` FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND ("));
				query.append(String.format(" `po_id` LIKE '%%%s%%' OR `sid` IN (SELECT `po_sid` FROM `%s`.`tb_po_items_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` LIKE '%%%s%%' OR `description` LIKE '%%%s%%'))", 
											MyDBUtil.addSlashes(keyword),							db_name,		store_id,									db_name,			store_id,					MyDBUtil.addSlashes(keyword), MyDBUtil.addSlashes(keyword)
				));
				query.append(String.format(" OR `vendor_id` IN (SELECT `sid` FROM `%s`.`tb_vendor` WHERE `vendor_id` LIKE '%%%s%%')", db_name, MyDBUtil.addSlashes(keyword)));
				query.append(String.format(")"));
			}
			if (status > -1) {
				query.append(String.format(" AND `status` IN (%d)", status));
			}
			if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {
				query.append(String.format(" AND (`order_date` BETWEEN DATE_SUB(STR_TO_DATE('%s 00:00:00','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) AND DATE_SUB(STR_TO_DATE('%s 23:59:59','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) )", start_date, end_date));
			}	
			query.append(String.format(" ) group by `po_sid`) AS `c` on `a`.`sid`=`c`.`po_sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`description` AS `item_description` FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (", db_name, store_id));
			query.append(String.format(" SELECT `item_sid` FROM `%s`.`tb_po_items_%s` WHERE `po_sid` IN (", db_name, store_id));
			query.append(String.format(" SELECT `sid` FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND ("));
				query.append(String.format(" `po_id` LIKE '%%%s%%' OR `sid` IN (SELECT `po_sid` FROM `%s`.`tb_po_items_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` LIKE '%%%s%%' OR `description` LIKE '%%%s%%'))", 
											MyDBUtil.addSlashes(keyword),							db_name,		store_id,									db_name,			store_id,					MyDBUtil.addSlashes(keyword), MyDBUtil.addSlashes(keyword)
				));
				query.append(String.format(" OR `vendor_id` IN (SELECT `sid` FROM `%s`.`tb_vendor` WHERE `vendor_id` LIKE '%%%s%%')", db_name, MyDBUtil.addSlashes(keyword)));
				query.append(String.format(")"));
			}
			if (status > -1) {
				query.append(String.format(" AND `status` IN (%d)", status));
			}
			if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {
				query.append(String.format(" AND (`order_date` BETWEEN DATE_SUB(STR_TO_DATE('%s 00:00:00','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) AND DATE_SUB(STR_TO_DATE('%s 23:59:59','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) )", start_date, end_date));
			}
			query.append(String.format(" )) ) AS `d` on `c`.`item_sid`=`d`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `po_sid`,SUM(`order_qty`) AS `total_order_qty` FROM `%s`.`tb_po_items_%s` WHERE `po_sid` IN (", db_name, store_id));
			query.append(String.format(" SELECT `sid` FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND ("));
				query.append(String.format(" `po_id` LIKE '%%%s%%' OR `sid` IN (SELECT `po_sid` FROM `%s`.`tb_po_items_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` LIKE '%%%s%%' OR `description` LIKE '%%%s%%'))", 
											MyDBUtil.addSlashes(keyword),							db_name,		store_id,									db_name,			store_id,					MyDBUtil.addSlashes(keyword), MyDBUtil.addSlashes(keyword)
				));
				query.append(String.format(" OR `vendor_id` IN (SELECT `sid` FROM `%s`.`tb_vendor` WHERE `vendor_id` LIKE '%%%s%%')", db_name, MyDBUtil.addSlashes(keyword)));
				query.append(String.format(")"));
			}
			if (status > -1) {
				query.append(String.format(" AND `status` IN (%d)", status));
			}
			if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {
				query.append(String.format(" AND (`order_date` BETWEEN DATE_SUB(STR_TO_DATE('%s 00:00:00','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) AND DATE_SUB(STR_TO_DATE('%s 23:59:59','%%m/%%d/%%Y %%H:%%i:%%s'), INTERVAL 0 HOUR) )", start_date, end_date));
			}	
			query.append(String.format(" ) GROUP BY `po_sid` ) AS `e` ON `a`.`sid`=`e`.`po_sid`"));
			query.append(String.format(" ORDER BY `status`, `_order_date` DESC;"));
						
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>