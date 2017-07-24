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
		
		String keyword = MyRequestUtil.getString(request, "keyword", null);

		PreparedStatementParams mPreparedStatementParams = null;
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			if (keyword != null && keyword.length() > 0) {
				keyword = String.format("%%%s%%",keyword);
			}
			mPreparedStatementParams = new PreparedStatementParams();
			
			// 쿼리 입력
			query.append(String.format("SELECT `a`.*, IF (`b`.`brand_name` IS NOT NULL, '1','0') AS `favorite_flag` FROM ("));
			query.append(String.format(" SELECT * FROM `wrp`.`tb_providers` WHERE 1=1"));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND `brand_name` LIKE ?"));
				mPreparedStatementParams.set(keyword);
			}
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `brand_name` FROM `%s`.`tb_store_favorite_providers_%s`) AS `b` ON `a`.`brand_name`=`b`.`brand_name`", db_name, store_id));
			//query.append(String.format(" LEFT JOIN (SELECT `brand_name` FROM `%s`.`tb_store_favorite_providers`) AS `b` ON `a`.`brand_name`=`b`.`brand_name`", owner_id));
			query.append(String.format(" ORDER BY `a`.`brand_name`"));

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>