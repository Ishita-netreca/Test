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
		
		int promotion_sid = MyRequestUtil.getInt(request, "promotion_sid", 0);

		try {
		    if (store_id == null || user_sid == null || db_name == null || promotion_sid < 1) {
		        throw new Exception();
		    }
		    
			// 쿼리 입력
			query.append(String.format("SELECT `sid`,`description`,DATE_FORMAT(`start_date`,'%%m/%%d/%%Y') AS `start_date`,DATE_FORMAT(`end_date`,'%%m/%%d/%%Y') AS `end_date` FROM `%s`.`tb_promotion_%s` WHERE `sid`='%d'", db_name, store_id, promotion_sid));

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), false));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>