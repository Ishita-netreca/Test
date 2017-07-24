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

	PreparedStatementParams mPreparedStatementParams = null;
	
	String store_id = MyRequestUtil.getString(request, "store_id", null);
	String start_date = MyRequestUtil.getString(request, "start_date", null);
	String end_date = MyRequestUtil.getString(request, "end_date", null);
	String keyword = MyRequestUtil.getString(request, "keyword", null);
	
	int onOrder = MyRequestUtil.getInt(request, "onOrder", 0);
	int transFlag = MyRequestUtil.getInt(request, "transFlag", 0);
	
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
		query.append(String.format("SELECT `a`.*, `b`.`user_id`,`c`.`user_id` AS `appr_user` FROM ("));
		query.append(String.format("SELECT `sid`,`trans_id`,`request_id`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `req_date`,DATE_FORMAT(DATE_ADD(`appr_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `appr_date`,`req_user_sid`,`appr_user_sid`,`from_store_id`,`to_store_id`,`status` FROM ", timezone_offset, timezone_offset));
		query.append(String.format("`%s`.`tb_inventory_trans_%s` WHERE 1=1", db_name,db_name,store_id));
		if(transFlag > 0){
			query.append(String.format(" AND `to_store_id`='%s' AND `trans_flag`=1",store_id));
		}else{
			query.append(String.format(" AND `from_store_id`='%s' AND (`trans_flag`=0 OR `trans_flag` IS NULL)",store_id));
		}
		if(onOrder > 0){
			query.append(String.format(" AND `status` > 1"));
		}
		query.append(String.format(" ) AS `a` LEFT JOIN (SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `b` ON `a`.`req_user_sid`=`b`.`sid`"));
		query.append(String.format("LEFT JOIN (SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `c` ON `a`.`appr_user_sid`=`c`.`sid` WHERE 1=1"));
		if (keyword != null && keyword.length() > 0) {
			query.append(String.format(" AND (`request_id` LIKE ? OR `trans_id` LIKE ? )"));
			mPreparedStatementParams.set(keyword);
			mPreparedStatementParams.set(keyword);
		}
		
		if (start_date != null && end_date != null) {
			if(onOrder > 0){
				query.append(String.format(" AND (`appr_date` BETWEEN '%s' AND '%s')", start_date, end_date));
			}else{
				query.append(String.format(" AND (`req_date` BETWEEN '%s' AND '%s')", start_date, end_date));
			}
		}
		query.append(String.format(" ORDER BY `sid` DESC"));
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(),mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>