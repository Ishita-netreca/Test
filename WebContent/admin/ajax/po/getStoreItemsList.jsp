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
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", session.getAttribute("wrp_admin_selected_store_timezone_offset").toString());
	
	int vendor_sid = MyRequestUtil.getInt(request,"vendor_sid",0);
	String search_keyword = MyRequestUtil.getString(request, "search_keyword", null);

	PreparedStatementParams mPreparedStatementParams = null;
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		if (search_keyword != null && search_keyword.length() > 0) {
			search_keyword = String.format("%%%s%%",search_keyword);
		}

		mPreparedStatementParams = new PreparedStatementParams();
		// 쿼리 입력
		query.append(String.format("SELECT `a`.*,IF (`b`.`in_stock` IS NOT NULL,`b`.`in_stock`,0) AS `in_stock` FROM ("));
		query.append(String.format(" SELECT `sid`,`item_code`,`model`,`description`,`sku`,`item_type`,`item_cost` FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, store_id));
		if (vendor_sid > 0) {
			query.append(String.format(" AND `vendor_sid` IN (%d)", vendor_sid));
		}
		if (search_keyword != null && search_keyword.length() > 0) {
			query.append(String.format(" AND (`item_code` LIKE ? OR `model` LIKE ? OR `description` LIKE ? OR `sku` LIKE ?)"));
			mPreparedStatementParams.set(search_keyword);
			mPreparedStatementParams.set(search_keyword);
			mPreparedStatementParams.set(search_keyword);
			mPreparedStatementParams.set(search_keyword);
		}
		query.append(String.format(" ) AS `a` LEFT JOIN ("));
		query.append(String.format(" SELECT `item_sid`,SUM(`qty`) AS `in_stock` FROM `%s`.`tb_inventory_%s`", db_name, store_id));
		query.append(String.format(" GROUP BY `item_sid`) AS `b` ON `a`.`sid`=`b`.`item_sid`"));

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>