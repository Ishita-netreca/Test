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
		
		String sid_list_str = MyRequestUtil.getString(request, "sid_list_str", null);
		PreparedStatementParams mPreparedStatementParams = null;

		try {
		    if (store_id == null || user_sid == null || db_name == null || sid_list_str == null) {
		        throw new Exception();
		    }
		    sid_list_str = sid_list_str.replace("\\", "");

			mPreparedStatementParams = new PreparedStatementParams();
			
			// 쿼리 입력
			query.append(String.format("DELETE FROM `%s`.`tb_store_favorite_providers_%s`;", db_name, store_id));
			query.append(String.format("INSERT INTO `%s`.`tb_store_favorite_providers_%s`(`brand_name`) (SELECT `brand_name` FROM `wrp`.`tb_providers` WHERE `sid` IN (%s) GROUP BY `brand_name`)", db_name, store_id,sid_list_str));

			/*
			master 단위로 바뀔시
			query.append(String.format("DELETE FROM `%s`.`tb_store_favorite_providers`;", owner_id));
			query.append(String.format("INSERT INTO `%s`.`tb_store_favorite_providers`(`brand_name`) SELECT `brand_name` FROM `tb_providers` WHERE `sid` IN (%s)", owner_id,sid_list_str));
			*/
			
			
            out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>