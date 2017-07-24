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

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	int parent_sid = MyRequestUtil.getInt(request, "parent_sid", 0);
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	String tableDescription = null;
	try {
	    if (user_sid == null || db_name == null) {
	        throw new Exception();
	    }
	    
	    if (parent_sid < 0) {
	    	parent_sid = 0;
	    }
	    
	    if (master_user_flag) {
	    	tableDescription = String.format("`%s`.`tb_categories_dict_%s`",db_name, db_name);
	    } else if (subdealer_user_flag) {
	    	tableDescription = String.format("`%s`.`tb_categories_dict_%s`", db_name, owner_id);
	    } else if (store_id != null) {
	    	tableDescription = String.format("`%s`.`tb_categories_dict_%s`",db_name, store_id);
	    } else {
	    	throw new Exception();
	    }
	    

		mPreparedStatementParams = new PreparedStatementParams();
		query.append(String.format("SELECT `sid`,`category_name` FROM %s WHERE `parent_sid`=?", tableDescription));
		mPreparedStatementParams.set(parent_sid);

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>