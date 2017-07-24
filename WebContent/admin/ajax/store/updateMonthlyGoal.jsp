<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.sql.Timestamp"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.DateFormat"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "storeId", null);
	int sid = MyRequestUtil.getInt(request, "sid", 0);
	String box = MyRequestUtil.getString(request, "box", "");
	String accessory = MyRequestUtil.getString(request, "accessory", "");
	String mrc = MyRequestUtil.getString(request, "mrc", "");
	String date = MyRequestUtil.getString(request, "date", "");
	
	Date day = new Date(date);

	SimpleDateFormat fdm = new SimpleDateFormat("yyyy-MM-dd");  
	
	String time[] = fdm.format(day).split("-");
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		query.append(String.format("UPDATE `%s`.`tb_store_archievement_%s` SET `box_sales_goal`='%s', `accessory_goal`='%s', `more_than_50_mrc_new_goal`='%s', `year`='%s', `month`='%s' WHERE `sid`=%d ;",db_name, store_id, box, accessory, mrc, time[0], time[1], sid));
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