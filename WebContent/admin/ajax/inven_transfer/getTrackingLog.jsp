<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	int transSid = MyRequestUtil.getInt(request, "transSid", 0);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		query.append(String.format("(SELECT `a`.*,`b`.`user_id` AS `employee` FROM ("));
		query.append(String.format(" SELECT `from_store_id` AS `location`,'Requested' AS `event`,`req_user_sid`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`",timezone_offset));
		query.append(String.format(" FROM `%s`.`tb_inventory_trans_%s` WHERE `sid`=%d) AS `a` LEFT JOIN (", db_name,db_name,transSid));
		query.append(String.format(" SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `b` ON `a`.`req_user_sid`=`b`.`sid`"));
		query.append(String.format(" WHERE `date` IS NOT NULL ) UNION ALL "));
		query.append(String.format("(SELECT `a`.*,`b`.`user_id` AS `employee` FROM ("));
		query.append(String.format(" SELECT 'Backend' AS `location`,'Assigned' AS `event`,`appr_user_sid`,DATE_FORMAT(DATE_ADD(`appr_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`",timezone_offset));
		query.append(String.format(" FROM `%s`.`tb_inventory_trans_%s` WHERE `sid`=%d) AS `a` LEFT JOIN (", db_name,db_name,transSid));
		query.append(String.format(" SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `b` ON `a`.`appr_user_sid`=`b`.`sid`"));
		query.append(String.format(" WHERE `date` IS NOT NULL ) UNION ALL "));
		query.append(String.format("(SELECT `a`.*,`b`.`user_id` AS `employee` FROM ("));
		query.append(String.format(" SELECT `to_store_id` AS `location`,'Fulfilled' AS `event`,`fulfill_user_sid`,DATE_FORMAT(DATE_ADD(`fulfill_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`",timezone_offset));
		query.append(String.format(" FROM `%s`.`tb_inventory_trans_%s` WHERE `sid`=%d) AS `a` LEFT JOIN (", db_name,db_name,transSid));
		query.append(String.format(" SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `b` ON `a`.`fulfill_user_sid`=`b`.`sid`"));
		query.append(String.format(" WHERE `date` IS NOT NULL ) UNION ALL "));
		query.append(String.format("(SELECT `a`.*,`b`.`user_id` AS `employee` FROM ("));
		query.append(String.format(" SELECT `to_store_id` AS `location`,'Picked up' AS `event`,`pickup_user_sid`,DATE_FORMAT(DATE_ADD(`pickup_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `date`",timezone_offset));
		query.append(String.format(" FROM `%s`.`tb_inventory_trans_%s` WHERE `sid`=%d) AS `a` LEFT JOIN (", db_name,db_name,transSid));
		query.append(String.format(" SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `b` ON `a`.`pickup_user_sid`=`b`.`sid`"));
		query.append(String.format(" WHERE `date` IS NOT NULL ) UNION ALL "));
		query.append(String.format("(SELECT `a`.*,`b`.`user_id` AS `employee` FROM ("));
		query.append(String.format(" SELECT `from_store_id` AS `location`,'Received' AS `event`,`recv_user_sid`,DATE_FORMAT(DATE_ADD(`recv_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s')  AS `date`",timezone_offset));
		query.append(String.format(" FROM `%s`.`tb_inventory_trans_%s` WHERE `sid`=%d) AS `a` LEFT JOIN (", db_name,db_name,transSid));
		query.append(String.format(" SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `b` ON `a`.`recv_user_sid`=`b`.`sid`"));
		query.append(String.format(" WHERE `date` IS NOT NULL )"));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>