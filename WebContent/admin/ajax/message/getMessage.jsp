<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);
		
		try {
		    if (db_name == null) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			query.append(String.format("SELECT DATE_FORMAT(DATE_ADD(`a`.reg_date, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') as reg_date, a.*, b.`user_id` FROM `%s`.`tb_master_message_log_%s` AS a, `wrp`.`tb_user` AS b WHERE 1=1 AND a.`emp_sid`=b.sid ", timezone_offset,db_name, db_name));
			if (search_start_date != null && search_end_date != null) {
				query.append(String.format(" AND STR_TO_DATE(`reg_date`,'%%Y-%%m-%%d') BETWEEN STR_TO_DATE('%s','%%Y-%%m-%%d') AND STR_TO_DATE('%s','%%Y-%%m-%%d')", search_start_date, search_end_date));
			}
			if (!master_user_flag){
				query.append(String.format(" AND `a`.`target_store_id` IN (SELECT `store_id` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s')", owner_sid));
			}
			
			query.append(String.format(" ORDER BY `reg_date`"));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>