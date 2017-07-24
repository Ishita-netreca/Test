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
	String start_date = MyRequestUtil.getString(request, "start_date", null);
	String end_date = MyRequestUtil.getString(request, "end_date", null);
	
	int audit_type = MyRequestUtil.getInt(request, "audit_type", -1);

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null || audit_type < 0) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		
		query.append(String.format("SELECT `audit_info`.*,`audit_items`.`total_system`,`audit_items`.`total_scanned`,`audit_items`.`total_matched`,`audit_items`.`total_missing`,`audit_items`.`total_orphan`,`audit_user`.`audit_user_name` FROM ("));
		query.append(String.format(" SELECT `sid`,`audit_type`,`audit_id`,'%s' AS `store_id`,`audit_user_sid`,DATE_FORMAT(DATE_ADD(`audit_start_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `audit_start_date`,", store_id.toUpperCase(), timezone_offset));
		query.append(String.format(" DATE_FORMAT(DATE_ADD(`audit_end_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `audit_end_date` FROM `%s`.`tb_inventory_audit_%s` ) AS `audit_info` LEFT JOIN (",timezone_offset,db_name, store_id));
		query.append(String.format(" SELECT `audit_sid`,SUM(`system_qty`) AS `total_system`,SUM(`scanned_qty`) AS `total_scanned`,SUM(IF(`system_qty`=`scanned_qty`, 1, 0)) AS `total_matched`,"));
		query.append(String.format(" SUM(IF(`system_qty`>`scanned_qty`, 1, 0)) AS `total_missing`,SUM(IF(`system_qty`<`scanned_qty`, 1, 0)) AS `total_orphan` FROM `%s`.`tb_inventory_audit_items_%s`",db_name, store_id));
		query.append(String.format(" GROUP BY `audit_sid` ) AS `audit_items` ON `audit_info`.`sid`=`audit_items`.`audit_sid` LEFT JOIN ("));
		query.append(String.format(" SELECT `sid`,TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) AS `audit_user_name` FROM `wrp`.`tb_user`"));
		query.append(String.format(" ) AS `audit_user` ON `audit_info`.`audit_user_sid`=`audit_user`.`sid`"));
		query.append(String.format(" WHERE `audit_info`.`audit_type`=%d", audit_type)); 
		 /*
		 검색 조건 추가할 위치
		 */
		 if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {	    	
		    	query.append(String.format(" AND `audit_start_date` BETWEEN '%s' AND '%s'", start_date, end_date));
		 }
		 
		 query.append(String.format(" ORDER BY `audit_info`.`audit_start_date` DESC"));
		
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams();

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>