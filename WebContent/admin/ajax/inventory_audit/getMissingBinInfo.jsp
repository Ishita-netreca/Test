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
	String serial_no = MyRequestUtil.getString(request, "serial_no", null);
	int item_sid = MyRequestUtil.getInt(request, "item_sid", -1);

	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		
		query.append(String.format("SELECT `a`.*,`b`.`adjust_id`,`c`.`trans_id`,`d`.`user_id`,`e`.`item_code`,IF(`b`.`adjust_id` IS NOT NULL,'Adjust',IF(`c`.`trans_id` IS NOT NULL, 'Transfer','')) AS `type` FROM "));
		query.append(String.format("(SELECT `updater`,DATE_FORMAT(DATE_ADD(`update_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') as `date`,`adjust_sid`,`trans_sid`,`qty`,`item_sid` FROM `%s`.`tb_missing_bin_%s`", timezone_offset,db_name, store_id));
		if(item_sid > -1){
			query.append(String.format(" WHERE `item_sid`=%d ", item_sid));
		}else{
			query.append(String.format(" WHERE `serial_no`='%s' ", serial_no));
		}
		query.append(String.format(") AS `a` LEFT JOIN "));
		query.append(String.format("(SELECT `sid`,`adjust_id` FROM `%s`.`tb_inventory_simple_adjust_%s`) AS `b` ON `a`.`adjust_sid`=`b`.`sid` LEFT JOIN ", db_name, store_id));
		query.append(String.format("(SELECT `sid`,`trans_id` FROM `%s`.`tb_inventory_trans_%s`) AS `c` ON `a`.`trans_sid`=`c`.`sid`", db_name, db_name));
		query.append(String.format(" LEFT JOIN(SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `d` ON `a`.`updater`=`d`.`sid`"));
		query.append(String.format(" LEFT JOIN(SELECT `sid`,`item_code` FROM `%s`.`tb_item_dict_%s`) AS `e` ON `a`.`item_sid`=`e`.`sid`", db_name, store_id));

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