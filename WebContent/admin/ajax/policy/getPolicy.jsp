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

		//String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		//String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);
		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (db_name == null) {
		        throw new Exception();
		    }

			if (keyword != null && keyword.length() > 0) {
				keyword = String.format("%%%s%%",keyword);
			}
			mPreparedStatementParams = new PreparedStatementParams();
			
			// 쿼리 입력
			query.append(String.format("SELECT * FROM `%s`.`tb_policies_print_%s` WHERE 1=1", db_name, storeId));
			if (keyword != null && keyword.length() > 0 ){
                query.append(String.format(" AND (`name` LIKE ?)"));      
				mPreparedStatementParams.set(keyword);              
            }
			/*
			if (search_start_date != null && search_end_date != null) {
				query.append(String.format(" AND STR_TO_DATE(`reg_date`,'%%Y-%%m-%%d') BETWEEN STR_TO_DATE('%s','%%Y-%%m-%%d') AND STR_TO_DATE('%s','%%Y-%%m-%%d')", search_start_date, search_end_date));
			}*/
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(),mPreparedStatementParams, true));
			

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>