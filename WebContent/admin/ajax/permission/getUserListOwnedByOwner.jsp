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

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	String keyword = MyRequestUtil.getString(request, "keyword", null);
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (owner_sid == null) {
	        throw new Exception();
	    }

		
		mPreparedStatementParams = new PreparedStatementParams();
		query.append(String.format("SELECT `users`.*, GROUP_CONCAT(`permission_group_info`.`permission_group_name` SEPARATOR ', ') AS `permission_group_name` FROM ("));
		query.append(String.format(" SELECT `sid`,`user_id`,TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) AS `user_name` FROM `wrp`.`tb_user` WHERE `owner_sid` IN (%s) AND `owner_sid`!=`master_sid` AND `sid` NOT IN (%s)", owner_sid, owner_sid));
		query.append(String.format(" ) AS `users` LEFT JOIN ("));
		query.append(String.format(" SELECT `permission_group_sid`,`user_sid` FROM `%s`.`tb_permission_group_users_%s`", db_name, owner_id));
		query.append(String.format(" ) AS `permission_group_users` ON `users`.`sid`=`permission_group_users`.`user_sid` LEFT JOIN ("));
		query.append(String.format(" SELECT `sid`,`permission_group_name` FROM `%s`.`tb_permission_group_info_%s`", db_name, owner_id));
		query.append(String.format(" ) AS `permission_group_info` ON `permission_group_users`.`permission_group_sid`=`permission_group_info`.`sid`"));
		if (keyword != null && keyword.length() > 0) {
			query.append(String.format(" WHERE (`users`.`user_id` LIKE ? OR `users`.`user_name` LIKE ?)"));
			mPreparedStatementParams.set(String.format("%%%s%%",keyword));
			mPreparedStatementParams.set(String.format("%%%s%%",keyword));
		}
		
		query.append(String.format(" GROUP BY `users`.`sid` ORDER BY `users`.`sid`"));

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>