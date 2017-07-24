<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
	StringBuffer query = new StringBuffer();

	String store_id_list_str = MyRequestUtil.getString(request, "store_id_list_str", null);
	String start_date = MyRequestUtil.getString(request, "start_date", null); // yyyy-MM-dd
	String end_date = MyRequestUtil.getString(request, "end_date", null); // yyyy-MM-dd
	
	String master_db_name = MyRequestUtil.getString(request, "master_db_name", null);

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	StringBuffer search_date_str = null;
	
	String []store_id_list = null;
	
	boolean first_store_passed = false;
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());

	try {
	    if ((master_db_name == null || master_db_name.length() < 1) || (store_id_list_str == null || store_id_list_str.length() < 1) || (start_date == null || start_date.length() < 1) || (end_date == null || end_date.length() < 1)) {
	        throw new Exception();
	    }
	    
	    store_id_list = store_id_list_str.split(",");
		if (store_id_list.length < 1) {
			throw new Exception();
		}
		// 쿼리 입력
		mPreparedStatementParams = new PreparedStatementParams();
		query.append(String.format("INSERT INTO `%s`.`tb_reconciliation_dispute_log_%s`(`store_id`,`invoice_no`,`transaction_date`,`timezone_offset`,`transaction_type`,`account`,`mobile_no`,`serial_no`,`sim`,`item_sid`,`user_sid`,`handset_description`,`rateplan_code`,`user_name`,`door_code`)", master_db_name, master_db_name));
		
		for (int i = 0; i < store_id_list.length ; i++) {
			if (store_id_list[i].length() < 1) {
				continue;
			}
			if (first_store_passed) {
				query.append(" UNION ");
			}
			query.append(String.format("("));
			query.append(String.format("SELECT `handsets`.*,`item_dict`.`handset_description`,NULL AS `rateplan_code`,`users`.`user_name`,`stores`.`door_code` FROM ("));
			query.append(String.format(" SELECT ? AS `store_id`,`invoice_no`,`transaction_date`, `timezone_offset`,`transaction_type`,NULL AS `account`"));
			query.append(String.format(" ,`mobile_no`,`serial_no`,`sim`,`item_sid`,`user_sid`"));
			query.append(String.format(" FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN (0,1,2,3,4,5,6,7,8,9,10,11,12,13,14) ", master_db_name, store_id_list[i]));
			query.append(String.format(" AND (`mobile_no` IS NOT NULL AND LENGTH(`mobile_no`) > 0) AND (`serial_no` IS NOT NULL AND LENGTH(`serial_no`) > 0) "));
			query.append(String.format(" AND `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0)) GROUP BY `serial_no`", master_db_name, store_id_list[i]));
			query.append(String.format(" ) AS `handsets` LEFT JOIN ("));
			query.append(String.format(" SELECT `sid`,`description` AS `handset_description` FROM `%s`.`tb_item_dict_%s`", master_db_name, store_id_list[i]));
			query.append(String.format(" ) AS `item_dict` ON `handsets`.`item_sid`=`item_dict`.`sid` LEFT JOIN ("));
			query.append(String.format(" SELECT `rateplan_code`,`serial_no` FROM `%s`.`tb_invoice_items_%s`", master_db_name, store_id_list[i]));
			query.append(String.format(" WHERE `rateplan_type` IN (0)"));
			query.append(String.format(" ) AS `rateplans` ON `handsets`.`serial_no`=`rateplans`.`serial_no` LEFT JOIN ("));
			query.append(String.format(" SELECT `sid`,TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) AS `user_name` FROM `wrp`.`tb_user`"));
			query.append(String.format(" ) AS `users` ON `handsets`.`user_sid`=`users`.`sid` LEFT JOIN ("));
			query.append(String.format(" SELECT `store_id`,`door_code` FROM `%s`.`tb_stores`", master_db_name));
			query.append(String.format(" ) AS `stores` ON `handsets`.`store_id`=`stores`.`store_id`"));
			query.append(String.format(" WHERE DATE_ADD(`transaction_date`, INTERVAL `timezone_offset` HOUR) BETWEEN ? AND ?"));
			query.append(String.format(" AND `invoice_no` NOT IN (SELECT `invoice_no` FROM `%s`.`tb_reconciliation_dispute_log_%s` WHERE `store_id`=?)",master_db_name, master_db_name));
			query.append(String.format(")"));

			mPreparedStatementParams.set(store_id_list[i].toUpperCase());
			mPreparedStatementParams.set(String.format("%s 00:00:00",start_date));
			mPreparedStatementParams.set(String.format("%s 23:59:59",end_date));
			mPreparedStatementParams.set(store_id_list[i].toUpperCase());
			
			first_store_passed = true;
		}
		
		if (MyDBUtil.getInstance().execute(master_db_name, null, null, query.toString(), mPreparedStatementParams) != 0) {
			throw new Exception();
		}
		
		if (query.length() > 0 ) {
			query.delete(0, query.length());
		}
		query.append(String.format("SELECT 'Manager' AS `manager`,`store_id`,`invoice_no`,DATE_FORMAT(DATE_ADD(`transaction_date`,INTERVAL `timezone_offset` HOUR),'%%m/%%d/%%Y') AS `date`,"));
		query.append(String.format(" `transaction_type`,`account`,`mobile_no` AS `mdn`,`serial_no` AS `esn`,`sim`,`handset_description`,`rateplan_code`,`user_name`,`door_code`"));
		query.append(String.format(" FROM `%s`.`tb_reconciliation_dispute_log_%s`",master_db_name, master_db_name));
		query.append(String.format(" WHERE (DATE_ADD(`transaction_date`, INTERVAL `timezone_offset` HOUR) BETWEEN ? AND ?) AND `store_id` IN ('%s')", store_id_list_str.replaceAll(",","','")));
		query.append(String.format(" ORDER BY `date`,`invoice_no`"));

		mPreparedStatementParams.set(String.format("%s 00:00:00",start_date));
		mPreparedStatementParams.set(String.format("%s 23:59:59",end_date));
		// 파라미터 입력

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(master_db_name, null, null, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>