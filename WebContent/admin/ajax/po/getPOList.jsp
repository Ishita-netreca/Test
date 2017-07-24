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
	
	int po_status = MyRequestUtil.getInt(request, "po_status", -1);
	String search_keyword = MyRequestUtil.getString(request, "search_keyword", null);
	String search_start_date = MyRequestUtil.getString(request, "search_start_date", null); // MM/dd/yyyy
	String search_end_date = MyRequestUtil.getString(request, "search_end_date", null); // MM/dd/yyyy
	
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
		query.append(String.format("SELECT `a`.`sid`,`a`.`po_id`,`a`.`status`,`a`.`order_date`,`a`.`fulfill_date`,`a`.`receive_date`,`b`.`vendor_id`,`c`.`total_ordered_qty`,`d`.`item_count`,`e`.`item_info`,`f`.`orderer_id`,`g`.`fulfiller_id`,`h`.`receiver_id` FROM ("));
		query.append(String.format(" SELECT `sid`,`po_id`,`vendor_id`,`status`,`orderer_id`,`fulfiller_id`,`receiver_id`,`order_date` AS `sort_date`,DATE_FORMAT(DATE_ADD(`order_date`,INTERVAL %s HOUR),'%%m/%%d/%%Y %%H:%%i:%%s') AS `order_date`,DATE_FORMAT(DATE_ADD(`fulfill_date`,INTERVAL %s HOUR),'%%m/%%d/%%Y %%H:%%i:%%s') AS `fulfill_date`,DATE_FORMAT(DATE_ADD(`receive_date`,INTERVAL %s HOUR),'%%m/%%d/%%Y %%H:%%i:%%s') AS `receive_date`", timezone_offset, timezone_offset, timezone_offset));
		query.append(String.format(" FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
		if (po_status > -1) {
			query.append(String.format(" AND ( `status` IN (%d) )", po_status));
		}
		if (search_start_date != null && search_end_date != null && search_start_date.length() > 0 && search_end_date.length() > 0) {
			query.append(String.format(" AND ( DATE_FORMAT(DATE_ADD(`order_date`,INTERVAL %s HOUR),'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", timezone_offset, search_start_date, search_end_date));
		}
		if (search_keyword != null && search_keyword.length() > 0) {
			query.append(String.format(" AND ( `sid` IN ( SELECT `po_sid` FROM `%s`.`tb_po_items_%s` WHERE `item_sid` IN ( SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `description` LIKE ? ) ) )", db_name, store_id, db_name, store_id));
			mPreparedStatementParams.set(search_keyword);
		}
		query.append(String.format(" ) AS `a` LEFT JOIN ("));
		query.append(String.format(" SELECT `sid`,`vendor_id` FROM `%s`.`tb_vendor` WHERE 1=1", db_name));
		if (search_keyword != null && search_keyword.length() > 0) {
			query.append(String.format(" AND `vendor_id` LIKE ?"));
			mPreparedStatementParams.set(search_keyword);
		}
		query.append(String.format(" ) AS `b` ON `a`.`vendor_id`=`b`.`sid` LEFT JOIN ("));
		query.append(String.format(" SELECT `po_sid`,SUM(`order_qty`) AS `total_ordered_qty` FROM `%s`.`tb_po_items_%s` WHERE 1=1", db_name, store_id));
		if (search_keyword != null && search_keyword.length() > 0) {
			query.append(String.format(" AND `item_sid` IN ( SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `description` like ? )", db_name, store_id));
			mPreparedStatementParams.set(search_keyword);
		}
		query.append(String.format(" AND `po_sid` IN ("));
		query.append(String.format(" SELECT `sid` FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
		if (search_start_date != null && search_end_date != null && search_start_date.length() > 0 && search_end_date.length() > 0) {
			query.append(String.format(" AND ( DATE_FORMAT(DATE_ADD(`order_date`,INTERVAL %s HOUR),'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", timezone_offset, search_start_date, search_end_date));
		}
		if (po_status > -1) {
			query.append(String.format(" AND ( `status` IN (%d) )", po_status));
		}
		query.append(String.format(" ) GROUP BY `po_sid`) AS `c` ON `a`.`sid`=`c`.`po_sid` LEFT JOIN ("));
		query.append(String.format(" SELECT `po_sid`,`item_sid`,COUNT(`item_sid`) AS `item_count` FROM `%s`.`tb_po_items_%s` WHERE 1=1", db_name, store_id));
		if (search_keyword != null && search_keyword.length() > 0) {
			query.append(String.format(" AND `item_sid` IN ( SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `description` LIKE ? )", db_name, store_id));
			mPreparedStatementParams.set(search_keyword);
		}
		query.append(String.format(" AND `po_sid` IN ("));
		query.append(String.format(" SELECT `sid` FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
		if (search_start_date != null && search_end_date != null && search_start_date.length() > 0 && search_end_date.length() > 0) {
			query.append(String.format(" AND ( DATE_FORMAT(DATE_ADD(`order_date`,INTERVAL %s HOUR),'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", timezone_offset, search_start_date, search_end_date));
		}
		query.append(String.format(" ) GROUP BY `po_sid`) AS `d` ON `a`.`sid`=`d`.`po_sid` LEFT JOIN ("));
		query.append(String.format(" SELECT `sid`,`description` AS `item_info` FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, store_id));
		if (search_keyword != null && search_keyword.length() > 0) {
			query.append(String.format(" AND `description` LIKE ? "));
			mPreparedStatementParams.set(search_keyword);
		}
		query.append(String.format(" AND `sid` IN ("));
		query.append(String.format(" SELECT DISTINCT `item_sid` FROM `%s`.`tb_po_items_%s` WHERE `po_sid` IN (", db_name, store_id));
		query.append(String.format(" SELECT `sid` FROM `%s`.`tb_po_%s` WHERE 1=1", db_name, store_id));
		if (search_start_date != null && search_end_date != null && search_start_date.length() > 0 && search_end_date.length() > 0) {
			query.append(String.format(" AND ( DATE_FORMAT(DATE_ADD(`order_date`,INTERVAL %s HOUR),'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", timezone_offset, search_start_date, search_end_date));
		}
		if (po_status > -1) {
			query.append(String.format(" AND ( `status` IN (%d) )", po_status));
		}
		query.append(String.format(" ))) AS `e` ON `d`.`item_sid`=`e`.`sid`"));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `orderer_id` FROM `wrp`.`tb_user` WHERE 1=1 ) AS `f` ON `a`.`orderer_id`=`f`.`sid`"));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `fulfiller_id` FROM `wrp`.`tb_user` WHERE 1=1 ) AS `g` ON `a`.`fulfiller_id`=`g`.`sid`"));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `receiver_id` FROM `wrp`.`tb_user` WHERE 1=1 ) AS `h` ON `a`.`receiver_id`=`h`.`sid`"));
		query.append(String.format(" ORDER BY `a`.`status`,`a`.`sort_date` DESC"));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
           out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {
		
		
           if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
           }
	}
	query = null;
%>