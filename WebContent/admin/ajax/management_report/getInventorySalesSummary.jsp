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

	//0: BYOD, 1:PHONE, 2: PHONE_TOTAL , 3:ACCESSORY, 4:ACCESSORY_TOTAL, 5: SERVICE, 6:SERVICE_TOTAL, 7:QPAY, 8:QPAY_TOTAL, 9:SUMMARY
	int query_type = MyRequestUtil.getInt(request, "query_type", -1);

	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		switch(query_type){
		case 0:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_BYOD('%s','%s','%s');", store_id, from, to));
			break;
		case 1:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_PHONE('%s','%s','%s');", store_id, from, to));
			break;
		case 2:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_PHONE_TOTAL('%s','%s','%s');", store_id, from, to));
			break;
		case 3:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_ACCESSORY('%s','%s','%s');", store_id, from, to));
			break;
		case 4:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_ACCESSORY_TOTAL('%s','%s','%s');", store_id, from, to));
			break;
		case 5:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_SERVICE('%s','%s','%s');", store_id, from, to));
			break;
		case 6:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_SERVICE_TOTAL('%s','%s','%s');", store_id, from, to));
			break;
		case 7:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_QPAY('%s','%s','%s');", store_id, from, to));
			break;
		case 8:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_QPAY_TOTAL('%s','%s','%s');", store_id, from, to));
			break;
		case 9:
			query.append(String.format("call wrp_reports.SP_SEAN_TEST_IIG_SALES_SUMMARY_TOTAL('%s','%s','%s');", store_id, from, to));
			break;
		}
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