<% //*170207 jh %>
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

		String store_id = MyRequestUtil.getString(request, "storeId", null);
		String sku = MyRequestUtil.getString(request, "sku", null);
		String keyword = MyRequestUtil.getString(request, "keyword", null);

		PreparedStatementParams mPreparedStatementParams = null;

		try {
		    if (store_id == null || user_sid == null || db_name == null || sku == null || sku.length() < 1) {
		        throw new Exception();
		    }

			mPreparedStatementParams = new PreparedStatementParams();
			
			query.append(String.format("SELECT * FROM `%s`.`tb_promotion_items_%s` AS a LEFT JOIN `%s`.`tb_promotion_%s` AS b ON a.`promotion_sid` = b.`sid` WHERE a.`sku`=?", db_name, store_id, db_name, store_id));
			mPreparedStatementParams.set(sku);
			
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>