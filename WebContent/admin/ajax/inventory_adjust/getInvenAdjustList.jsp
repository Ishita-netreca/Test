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
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }		


		mPreparedStatementParams = new PreparedStatementParams();
		// 쿼리 입력

       	
		query.append(String.format("SELECT `a`.*,`items`.*, `b`.`item_code`,`b`.`description`,`b`.`sku`,`b`.`upc`,`c`.`user_id` FROM("));
		query.append(String.format(" SELECT `sid`,`adjust_id`,`updater`,DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`,`reason`,`memo`,'%s' AS `store_id`,`adjust_type` ", timezone_offset, store_id));
		query.append(String.format("FROM `%s`.`tb_inventory_simple_adjust_%s`", db_name, store_id));
	    if (start_date != null && end_date != null && start_date.length() > 0 && end_date.length() > 0) {	    	
	    	query.append(String.format(" WHERE ( DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", timezone_offset, start_date, end_date));
	    }
		query.append(String.format(" ) AS `a` LEFT JOIN (SELECT `adjust_sid`,`item_sid`,SUM(`adjust_qty`) AS `adjust_qty`,`item_type` FROM "));
		query.append(String.format(" `%s`.`tb_inventory_simple_adjust_items_%s` GROUP BY `adjust_sid`) AS `items` ON `a`.`sid`=`items`.`adjust_sid`",db_name,store_id));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_code`,`description`,`sku`,`upc` FROM "));
		query.append(String.format("`%s`.`tb_item_dict_%s`) AS `b` ON `items`.`item_sid`=`b`.`sid`", db_name, store_id));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `c` ON `a`.`updater`=`c`.`sid` ORDER BY `sid` DESC "));
       	
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>