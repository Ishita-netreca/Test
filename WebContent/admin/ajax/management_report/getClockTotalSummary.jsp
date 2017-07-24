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
	String from = MyRequestUtil.getString(request, "from", null);
	String to = MyRequestUtil.getString(request, "to", null);
	String emp_id = MyRequestUtil.getString(request, "emp_id", null);
    String store_list= null;
    
    int step = MyRequestUtil.getInt(request, "step", 0);

	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		query.append(String.format("SELECT GROUP_CONCAT(`store_id` SEPARATOR ',') AS `store_list_str` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s'" ,owner_sid));
		store_list = MyDBUtil.getInstance().getString(db_name, owner_id, store_id, query.toString(), "store_list_str");
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams();

        query.delete(0, query.length());

        switch(step){
        case 1:
        	query.append(String.format("CALL wrp_reports.SP_SEAN_TEST_IIG_GET_CLOCK_TOTAL_SUMMARY_REPORT('%s','%s','%s','%s');" ,db_name, store_list, from, to));
        	break;
        case 2:
        	query.append(String.format("CALL wrp_reports.SP_SEAN_TEST_IIG_GET_CLOCK_DAILY_SUMMARY_REPORT_BY_EMPLOYEE('%s','%s','%s','%s');" ,store_list,emp_id, from, to));
        	break;
        case 3:
        	query.append(String.format("CALL wrp_reports.SP_SEAN_TEST_IIG_GET_CLOCK_INOUT_LOG_REPORT_BY_EMPLOYEE('%s','%s','%s','%s');" ,store_list,emp_id, from, to));
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