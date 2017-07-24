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
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
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
			
			query.append(String.format("SELECT `a`.*,`b`.`item_count` FROM ("));
			query.append(String.format(" SELECT `sid`,`description`,DATE_FORMAT(`start_date`,'%%m/%%d/%%Y') AS `start_date`,DATE_FORMAT(`end_date`,'%%m/%%d/%%Y') AS `end_date`"));
			query.append(String.format(" FROM `%s`.`tb_promotion_%s` WHERE 1=1", db_name, store_id));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND `description` LIKE ?"));
				mPreparedStatementParams.set(keyword);
			}
			if (start_date != null) {
				query.append(String.format(" AND `end_date` >= '%s'", start_date));
			}
			
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN ("));
			query.append(String.format(" SELECT `promotion_sid`, COUNT(`sid`) AS `item_count` FROM `%s`.`tb_promotion_items_%s` GROUP BY `promotion_sid`", db_name, store_id));
			query.append(String.format(" ) AS `b` ON `a`.`sid`=`b`.`promotion_sid`"));
			
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>