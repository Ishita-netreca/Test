<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	
	int audit_sid = MyRequestUtil.getInt(request, "audit_sid", 0);

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	JSONObject auditInfo = null, mJSONObject = null;
	
	try {
	    if (store_id == null || user_sid == null || db_name == null || audit_sid < 1) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		query.append(String.format("SELECT `audit_info`.*, `audit_items`.*, `audit_user`.`audit_user_name` FROM "));
		query.append(String.format(" (SELECT `audit_sid`"));
		query.append(String.format(" ,SUM(IF(`item_type`=0, `system_qty`,0)) AS `total_phone_system`"));
		query.append(String.format(" ,SUM(IF(`item_type`=0, `scanned_qty`,0)) AS `total_phone_scanned`"));
		query.append(String.format(" ,SUM(IF(`item_type`=0 AND (`system_qty`=`scanned_qty`), 1,0)) AS `total_phone_matched`"));
		query.append(String.format(" ,SUM(IF(`item_type`=0 AND (`system_qty`<`scanned_qty`), 1,0)) AS `total_phone_orphan`"));
		query.append(String.format(" ,SUM(IF(`item_type`=0 AND (`system_qty`>`scanned_qty`), 1,0)) AS `total_phone_missing` "));
		query.append(String.format(" ,SUM(IF(`item_type`=1, `system_qty`,0)) AS `total_sim_system`"));
		query.append(String.format(" ,SUM(IF(`item_type`=1, `scanned_qty`,0)) AS `total_sim_scanned`"));
		query.append(String.format(" ,SUM(IF(`item_type`=1 AND (`system_qty`=`scanned_qty`), 1,0)) AS `total_sim_matched`"));
		query.append(String.format(" ,SUM(IF(`item_type`=1 AND (`system_qty`<`scanned_qty`), 1,0)) AS `total_sim_orphan`"));
		query.append(String.format(" ,SUM(IF(`item_type`=1 AND (`system_qty`>`scanned_qty`), 1,0)) AS `total_sim_missing`"));
		query.append(String.format(" ,SUM(IF(`item_type`=2, `system_qty`,0)) AS `total_serialized_acc_system`"));
		query.append(String.format(" ,SUM(IF(`item_type`=2, `scanned_qty`,0)) AS `total_serialized_acc_scanned`"));
		query.append(String.format(" ,SUM(IF(`item_type`=2 AND (`system_qty`=`scanned_qty`), 1,0)) AS `total_serialized_acc_matched`"));
		query.append(String.format(" ,SUM(IF(`item_type`=2 AND (`system_qty`<`scanned_qty`), 1,0)) AS `total_serialized_acc_orphan`"));
		query.append(String.format(" ,SUM(IF(`item_type`=2 AND (`system_qty`>`scanned_qty`), 1,0)) AS `total_serialized_acc_missing` "));
		query.append(String.format(" ,SUM(IF(`item_type`=3, `system_qty`,0)) AS `total_nonserialized_acc_system`"));
		query.append(String.format(" ,SUM(IF(`item_type`=3, `scanned_qty`,0)) AS `total_nonserialized_acc_scanned`"));
		query.append(String.format(" ,SUM(IF(`item_type`=3 AND (`system_qty`=`scanned_qty`), `scanned_qty`,0)) AS `total_nonserialized_acc_matched`"));
		query.append(String.format(" ,SUM(IF(`item_type`=3 AND (`system_qty`<`scanned_qty`), ( `scanned_qty` - `system_qty` ),0)) AS `total_nonserialized_acc_orphan`"));
		query.append(String.format(" ,SUM(IF(`item_type`=3 AND (`system_qty`>`scanned_qty`), ( `system_qty` - `scanned_qty` ) ,0)) AS `total_nonserialized_acc_missing` "));
		query.append(String.format(" FROM `%s`.`tb_inventory_audit_items_%s` WHERE `audit_sid`=%d", db_name, store_id, audit_sid));
		query.append(String.format(" ) AS `audit_items` RIGHT JOIN ( SELECT `sid`,`audit_id`,`audit_user_sid`,'%s' AS `store_id`,`memo`,DATE_FORMAT(DATE_ADD(`audit_start_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%h:%%i:%%s') AS `audit_start_date`,", store_id, timezone_offset));
		query.append(String.format(" DATE_FORMAT(DATE_ADD(`audit_end_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%h:%%i:%%s') AS `audit_end_date`,`audit_item_type` FROM `%s`.`tb_inventory_audit_%s` WHERE `sid`=%d", timezone_offset, db_name, store_id, audit_sid));
		query.append(String.format(" ) AS `audit_info` ON `audit_info`.`sid`=`audit_items`.`audit_sid` LEFT JOIN ( "));
		query.append(String.format(" SELECT `sid`,TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) AS `audit_user_name` FROM `wrp`.`tb_user` WHERE `sid` IN (SELECT `audit_user_sid` FROM `%s`.`tb_inventory_audit_%s` WHERE `sid`=%d ) ", db_name, store_id, audit_sid));
		query.append(String.format(" ) AS `audit_user` ON `audit_info`.`audit_user_sid`=`audit_user`.`sid`")); 
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams(); 
		
		auditInfo = MyDBUtil.getInstance().getObject(db_name, owner_id, store_id, query.toString());
		
		if (query.length() > 0) query.delete(0, query.length());
		
		if (auditInfo != null) {
			query.append(String.format("SELECT `audit_items`.*,`item_dict`.`item_code`,`item_dict`.`description`,`item_dict`.`sku` FROM ( "));
			query.append(String.format(" SELECT `item_sid`,`inventory_sid`,`serial_no`,`system_qty`,`scanned_qty`,`item_type` FROM `%s`.`tb_inventory_audit_items_%s` WHERE `audit_sid`=%d ) AS `audit_items` ", db_name, store_id, audit_sid));
			query.append(String.format(" LEFT JOIN ( SELECT `sid`,`item_code`,`description`,`sku` FROM `%s`.`tb_item_dict_%s` ) AS `item_dict` ON `audit_items`.`item_sid`=`item_dict`.`sid`", db_name, store_id));
			
			auditInfo.put("items", MyDBUtil.getInstance().getList(db_name, owner_id, store_id, query.toString()));
		}
		
		mJSONObject = new JSONObject();
		mJSONObject.put("data", auditInfo);
		
		out.print(mJSONObject);
	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>