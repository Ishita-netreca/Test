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
	int log_flag = MyRequestUtil.getInt(request, "log_flag", 0);

	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		if (keyword != null && keyword.length() > 0) {
			keyword = String.format("%%%s%%",keyword);
		}
		mPreparedStatementParams = new PreparedStatementParams();
		
		// 쿼리 입력
		query.append(String.format("SELECT `a`.*, `b`.*,`c`.`category_name`,`d`.`subcategory_name` FROM "));
		if(item_type == 3){
			query.append(String.format("(SELECT `item_sid`,SUM(`qty`) AS `qty`,`serial_no`,DATE_FORMAT(DATE_ADD(`update_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `update_date` FROM `%s`.`tb_missing_bin_%s` GROUP BY `item_sid`) AS `a`", timezone_offset,db_name, store_id));
		}else{
			query.append(String.format("(SELECT `item_sid`,SUM(`qty`) AS `qty`,`serial_no`,DATE_FORMAT(DATE_ADD(`update_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `update_date` FROM `%s`.`tb_missing_bin_%s` GROUP BY `serial_no`) AS `a`", timezone_offset,db_name, store_id));
		}
		query.append(String.format(" LEFT JOIN (SELECT * FROM `%s`.`tb_item_dict_%s`) AS `b` ON `a`.`item_sid`=`b`.`sid`", db_name, store_id));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid` = 0) AS `c` ON `b`.`category`=`c`.`sid`", db_name, store_id));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `subcategory_name` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid` > 0) AS `d` ON `b`.`sub_category`=`d`.`sid`", db_name, store_id));
		if(item_type > -1){
			query.append(String.format(" WHERE `b`.`item_type` = '%d'", item_type));
		}
		if(log_flag < 1){
			query.append(String.format(" AND `a`.`qty` > 0"));
		}

        if (keyword != null && keyword.length() > 0 ){
            query.append(String.format(" AND (`item_code` LIKE ? OR `description` LIKE ? OR `serial_no` LIKE ? OR `sku` LIKE ? OR `upc` LIKE ?)"));    
			mPreparedStatementParams.set(keyword);          
			mPreparedStatementParams.set(keyword);           
			mPreparedStatementParams.set(keyword);           
			mPreparedStatementParams.set(keyword);           
			mPreparedStatementParams.set(keyword);           
        }
        
		query.append(String.format(" ORDER BY `a`.`update_date` DESC"));

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>