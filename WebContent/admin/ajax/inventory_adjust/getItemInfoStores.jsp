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
	String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));
	int item_type = MyRequestUtil.getInt(request, "item_type", -1);
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }		
		if (keyword != null && keyword.length() > 0) {
			keyword = String.format("%%%s%%",keyword);
		}

		mPreparedStatementParams = new PreparedStatementParams();
		// 쿼리 입력

		query.append(String.format("SELECT `a`.*, `b`.`serial_no`,`b`.`inven_sid`,SUM(`b`.`qty`) AS `qty`, '%s' AS `store_id` FROM (SELECT `sid`,`item_code`,`description`,`model`,`sku`,`upc`,`item_type` FROM `%s`.`tb_item_dict_%s`", store_id, db_name,store_id));
		query.append(String.format(" WHERE `item_type`=%d ", item_type));
		query.append(String.format(") AS `a` LEFT JOIN (SELECT `sid` AS `inven_sid`,`item_sid`,`serial_no`,`qty` FROM `%s`.`tb_inventory_%s`) AS `b` ON `a`.`sid`=`b`.`item_sid`", db_name,store_id));
		query.append(String.format(" WHERE `item_code` LIKE ? OR `description` LIKE ? OR `sku` LIKE ? OR `serial_no` LIKE ?"));
		mPreparedStatementParams.set(keyword);          
		mPreparedStatementParams.set(keyword);          
		mPreparedStatementParams.set(keyword);      
		mPreparedStatementParams.set(keyword);
		query.append(String.format(" GROUP BY `sid`"));

       	
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>