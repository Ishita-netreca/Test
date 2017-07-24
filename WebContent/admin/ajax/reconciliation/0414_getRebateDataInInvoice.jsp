<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		String user_sid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		
		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);
		String table = MyRequestUtil.getString(request, "table", null);
		try {
		    if (store_id == null || user_sid == null || owner_id == null) {
		        throw new Exception();
		    }

			
			// 쿼리 입력
			query.append(String.format("SELECT * FROM ("));
			query.append(String.format("SELECT abc.sid, abc.date, abc.name, abc.transaction_type, bc.*, abc.serial_no as esn FROM (SELECT tii.*, ti.`date` FROM `%s`.`tb_invoice_items_%s` AS tii LEFT JOIN `%s`.`tb_invoice_%s` AS ti ON tii.`invoice_no`=ti.`invoice_no`) AS abc LEFT JOIN", owner_id, store_id, owner_id, store_id));
			
			query.append(String.format("(SELECT `a`.*, `b`.`total_primary_rate_plan_amount`, `c`.`total_features_data_plan_amount`,"));
			query.append(String.format(" `d`.`new_act_rebate`,`d`.`upg_rebate`,`d`.`port_in_rebate`,`d`.`sor_rebate`,`d`.`aal_rebate`,`d`.`aal_bogo_rebate`,`d`.`aal_pogo_rebate` FROM ("));
			query.append(String.format(" SELECT `sid` AS xid, `serial_no`,`promotion_item_sid`,`promotion_type` FROM `%s`.`tb_invoice_items_%s` WHERE `serial_no` IS NOT NULL AND `promotion_item_sid` IS NOT NULL", owner_id, store_id));
			query.append(String.format(" AND `invoice_no` IN ( SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", owner_id, store_id));
			if (search_start_date != null && search_start_date.length() > 0 && search_end_date != null && search_end_date.length() > 0) {
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') ) ", search_start_date, search_end_date));
			}
			query.append(String.format(") AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (", owner_id, store_id));
			query.append(String.format(" SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0')", owner_id, store_id));
			query.append(String.format(" ))) AS `a`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `serial_no`, SUM(`subtotal`) AS `total_primary_rate_plan_amount` FROM `%s`.`tb_invoice_items_%s` WHERE `serial_no` IS NOT NULL AND `item_type` IN ('2') AND `rateplan_type` IN ('0')", owner_id, store_id));
			query.append(String.format(" AND `invoice_no` IN ( SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", owner_id, store_id));
			if (search_start_date != null && search_start_date.length() > 0 && search_end_date != null && search_end_date.length() > 0) {
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') ) ", search_start_date, search_end_date));
			}			
			query.append(String.format(" ) GROUP BY `serial_no`) AS `b` ON `a`.`serial_no`=`b`.`serial_no`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `serial_no`, SUM(`subtotal`) AS `total_features_data_plan_amount` FROM `%s`.`tb_invoice_items_%s` WHERE `serial_no` IS NOT NULL AND `item_type` IN ('2') AND `rateplan_type` IN ('1')", owner_id, store_id));
			query.append(String.format(" AND `invoice_no` IN ( SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1 ", owner_id, store_id));
			if (search_start_date != null && search_start_date.length() > 0 && search_end_date != null && search_end_date.length() > 0) {
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') ) ", search_start_date, search_end_date));
			}	
			query.append(String.format(" ) GROUP BY `serial_no`) AS `c` ON `a`.`serial_no`=`c`.`serial_no`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `promotion_item_sid`,`new_act_rebate`,`upg_rebate`,`port_in_rebate`,`sor_rebate`,`aal_rebate`,`aal_bogo_rebate`,`aal_pogo_rebate` FROM `%s`.`tb_rebate_items_%s`", owner_id, store_id)); 
			query.append(String.format(" ) AS `d` ON `a`.`promotion_item_sid`=`d`.`promotion_item_sid`) AS bc"));
			query.append(String.format(" ON abc.sid = bc.xid WHERE `abc`.`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') AND (`abc`.`serial_no` != '' OR `abc`.`name` like '%%QPAY%%')", search_start_date, search_end_date));
			
			query.append(") AS xxx LEFT JOIN ");

			query.append(String.format("(SELECT * FROM `%s`.`tb_%s` WHERE 1=1", owner_id, table));
			query.append(String.format(" AND `door_code` IN (SELECT `door_code` FROM `%s`.`tb_stores` WHERE `store_id` IN ('%s'))", owner_id, store_id));
			
			if (search_start_date != null && search_end_date != null) {
				query.append(String.format(" AND `transaction_date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y')", search_start_date, search_end_date));
			}
			
			
			query.append(String.format(" ORDER BY `transaction_date`) AS yyy ON xxx.esn = yyy.esn"));
			System.out.println(query);
			/*
			query.append(String.format("SELECT abc.sid, abc.date, abc.name, abc.transaction_type, bc.*, abc.serial_no as esn FROM (SELECT tii.*, ti.`date` FROM `%s`.`tb_invoice_items_%s` AS tii LEFT JOIN `%s`.`tb_invoice_%s` AS ti ON tii.`invoice_no`=ti.`invoice_no`) AS abc LEFT JOIN", owner_id, store_id, owner_id, store_id));
			
			query.append(String.format("(SELECT `a`.*, `b`.`total_primary_rate_plan_amount`, `c`.`total_features_data_plan_amount`,"));
			query.append(String.format(" `d`.`new_act_rebate`,`d`.`upg_rebate`,`d`.`port_in_rebate`,`d`.`sor_rebate`,`d`.`aal_rebate`,`d`.`aal_bogo_rebate`,`d`.`aal_pogo_rebate` FROM ("));
			query.append(String.format(" SELECT `sid` AS xid, `serial_no`,`promotion_item_sid`,`promotion_type` FROM `%s`.`tb_invoice_items_%s` WHERE `serial_no` IS NOT NULL AND `promotion_item_sid` IS NOT NULL", owner_id, store_id));
			query.append(String.format(" AND `invoice_no` IN ( SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", owner_id, store_id));
			if (search_start_date != null && search_start_date.length() > 0 && search_end_date != null && search_end_date.length() > 0) {
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') ) ", search_start_date, search_end_date));
			}
			query.append(String.format(") AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (", owner_id, store_id));
			query.append(String.format(" SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0')", owner_id, store_id));
			query.append(String.format(" ))) AS `a`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `serial_no`, SUM(`subtotal`) AS `total_primary_rate_plan_amount` FROM `%s`.`tb_invoice_items_%s` WHERE `serial_no` IS NOT NULL AND `item_type` IN ('2') AND `rateplan_type` IN ('0')", owner_id, store_id));
			query.append(String.format(" AND `invoice_no` IN ( SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", owner_id, store_id));
			if (search_start_date != null && search_start_date.length() > 0 && search_end_date != null && search_end_date.length() > 0) {
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') ) ", search_start_date, search_end_date));
			}			
			query.append(String.format(" ) GROUP BY `serial_no`) AS `b` ON `a`.`serial_no`=`b`.`serial_no`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `serial_no`, SUM(`subtotal`) AS `total_features_data_plan_amount` FROM `%s`.`tb_invoice_items_%s` WHERE `serial_no` IS NOT NULL AND `item_type` IN ('2') AND `rateplan_type` IN ('1')", owner_id, store_id));
			query.append(String.format(" AND `invoice_no` IN ( SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1 ", owner_id, store_id));
			if (search_start_date != null && search_start_date.length() > 0 && search_end_date != null && search_end_date.length() > 0) {
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') ) ", search_start_date, search_end_date));
			}	
			query.append(String.format(" ) GROUP BY `serial_no`) AS `c` ON `a`.`serial_no`=`c`.`serial_no`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `promotion_item_sid`,`new_act_rebate`,`upg_rebate`,`port_in_rebate`,`sor_rebate`,`aal_rebate`,`aal_bogo_rebate`,`aal_pogo_rebate` FROM `%s`.`tb_rebate_items_%s`", owner_id, store_id)); 
			query.append(String.format(" ) AS `d` ON `a`.`promotion_item_sid`=`d`.`promotion_item_sid`) AS bc"));
			query.append(String.format(" ON abc.sid = bc.xid WHERE `abc`.`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y') AND (`abc`.`serial_no` != '' OR `abc`.`name` like '%%QPAY%%');", search_start_date, search_end_date));
			*/
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
			
			out.print(MyDBUtil.getJSONString(query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>