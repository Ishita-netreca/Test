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
			//dbName = "reconciliation";
			dbName = "reconciliation";
		}else if(type == 1){
			//dbName = "reconciliation";
			dbName = "reconciliation";
		}else if(type == 2){
			//dbName = "reconciliation_disqualified";
			dbName = "reconciliation_disqualified";
		}else if(type == 3){
			//dbName = "reconciliation_rebate";
			dbName = "reconciliation_rebate";
		}else if(type == 4){
			//dbName = "reconciliation_spiff";
			dbName = "reconciliation_spiff";
		}else if(type == 5){
			//dbName = "reconciliation_bill";
			dbName = "reconciliation_bill";
		}else if(type == 6){
			//dbName = "reconciliation_qpay";
			dbName = "reconciliation_qpay";
		}
		
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			query.append(String.format("SELECT * FROM `%s`.`tb_%s` WHERE 1=1", db_name, dbName));
			query.append(String.format(" AND `door_code` IN (SELECT `door_code` FROM `%s`.`tb_stores` WHERE `store_id` IN ('%s'))", db_name, store_id));
			
			if (search_start_date != null && search_end_date != null) {
				query.append(String.format(" AND STR_TO_DATE(`transaction_date`,'%%m/%%d/%%Y') BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y')", search_start_date, search_end_date));
			}
			query.append(String.format(" ORDER BY `transaction_date`"));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>