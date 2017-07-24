<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		int type = MyRequestUtil.getInt(request, "type", 0);
		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);
		String dbName = "";
		
		if(type == 0){
			dbName = "consolidation";
		}else if(type == 1){
			dbName = "consolidation";
		}else if(type == 2){
			dbName = "reconsolidation_disqualified";
		}else if(type == 3){
			dbName = "reconsolidation_rebate";
		}else if(type == 4){
			dbName = "reconsolidation_spiff";
		}else if(type == 5){
			dbName = "reconsolidation_bill";
		}else if(type == 6){
			dbName = "reconsolidation_qpay";
		}
		
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			query.append(String.format("SELECT * FROM `%s`.`tb_%s` WHERE `update_sid` = %d", db_name, dbName, sid));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>