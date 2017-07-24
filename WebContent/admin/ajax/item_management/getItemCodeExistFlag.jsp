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

	int sid = MyRequestUtil.getInt(request, "sid", 0);
	String item_code = MyRequestUtil.getString(request, "item_code", null);

	
	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	
	String table_description = null;
	
	try {
	    if ((!master_user_flag && !subdealer_user_flag && store_id == null) || user_sid == null || sid < 0 || db_name == null || (item_code == null || item_code.length() < 1)) {
	    	out.print(-1);
	        throw new Exception();
	    }
		// 쿼리 입력
		
		if (master_user_flag) {
			table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
		} else if (subdealer_user_flag) {
			table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
		} else {
			table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, store_id);
		}
		
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams();
		
		if (sid > 0) {
			query.append(String.format("SELECT COUNT(`sid`) AS `flag` FROM %s WHERE (`sid`=? AND `item_code` != ?) AND `item_code`=?", table_description));
			mPreparedStatementParams.set(sid);
			mPreparedStatementParams.set(item_code);
			mPreparedStatementParams.set(item_code);
		} else {
			query.append(String.format("SELECT COUNT(`sid`) AS `flag` FROM %s WHERE `item_code`=?", table_description));
			mPreparedStatementParams.set(item_code);
		}
		
		out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>