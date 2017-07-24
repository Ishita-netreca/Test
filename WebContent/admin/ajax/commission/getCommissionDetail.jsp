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
	int target_sid = MyRequestUtil.getInt(request, "target_sid", -1);
	int target_type = MyRequestUtil.getInt(request, "target_type", -1);
	int emp_sid = MyRequestUtil.getInt(request, "emp_sid", 0);
	int profile_sid = MyRequestUtil.getInt(request, "profile_sid", 0);

	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if (store_id == null || db_name == null) {
	        throw new Exception();
	    }

		mPreparedStatementParams = new PreparedStatementParams();

	    switch(target_type){
	    case 0:
	    	query.append(String.format("SELECT `name`,`subtotal`,`transaction_date`,`qty`,`invoice_no` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
	    	query.append(String.format("WHERE `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id` = '%d' ", db_name, store_id, emp_sid));
	    	if (start_date != null && end_date != null) {
				query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ? ", timezone_offset.toString()));
				mPreparedStatementParams.set(start_date);
				mPreparedStatementParams.set(end_date);
			}
	    	query.append(String.format(") AND (`category`='%d' OR `sub_category`='%d');", target_sid, target_sid));
	    	break;
	    case 1:
	    	query.append(String.format("SELECT `name`,`subtotal`,`transaction_date`,`qty`,`invoice_no` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
	    	query.append(String.format("WHERE `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id` = '%d' ", db_name, store_id, emp_sid));
	    	if (start_date != null && end_date != null) {
				query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ? ", timezone_offset.toString()));
				mPreparedStatementParams.set(start_date);
				mPreparedStatementParams.set(end_date);
			}
	    	query.append(String.format(") AND `item_type`=2 AND `rateplan_type`=0 AND `rateplan_sid` = '%d';", target_sid));
	    	break;
	    case 2:
	    	query.append(String.format("SELECT `name`,`subtotal`,`transaction_date`,`qty`,`invoice_no` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
	    	query.append(String.format("WHERE `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id` = '%d' ", db_name, store_id, emp_sid));
	    	if (start_date != null && end_date != null) {
				query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ? ", timezone_offset.toString()));
				mPreparedStatementParams.set(start_date);
				mPreparedStatementParams.set(end_date);
			}
	    	query.append(String.format(") AND `item_type`=2 AND `rateplan_type`=1 AND `rateplan_sid` = '%d';", target_sid));
	    	break;
	    }
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>