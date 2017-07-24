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

	int permission_group_sid = MyRequestUtil.getInt(request, "permission_group_sid", 0);

	int output_users_name_flag = MyRequestUtil.getInt(request, "output_users_name_flag", 0);
	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (permission_group_sid < 1 || owner_id == null || db_name == null) {
	        throw new Exception();
	    }

		query.append(String.format("SELECT `info`.*, `users`.*,`backend`.`backend_struct_sid_list`,`sales`.`sales_struct_sid_list` FROM "));
		query.append(String.format(" ( SELECT *, 'boas' AS `unmentioned` FROM `%s`.`tb_permission_group_info_%s` WHERE `sid` IN (%d) ) AS `info`", db_name, owner_id, permission_group_sid));
		if (output_users_name_flag > 0) {
			query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `unmentioned`, GROUP_CONCAT( `user_id` SEPARATOR '!@#') AS `user_id_list`, GROUP_CONCAT( TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) SEPARATOR '!@#') AS `user_name_list` FROM `wrp`.`tb_user` "));
			query.append(String.format(" WHERE `sid` IN ( SELECT `user_sid` FROM `%s`.`tb_permission_group_users_%s` WHERE `permission_group_sid` IN (%d) ) ) AS `users` ON `info`.`unmentioned`=`users`.`unmentioned`", db_name, owner_id, permission_group_sid));
		} else {
			query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `unmentioned`,GROUP_CONCAT(`user_sid` SEPARATOR ',') AS `users_list` FROM `%s`.`tb_permission_group_users_%s` ", db_name, owner_id));
			query.append(String.format(" WHERE `permission_group_sid` IN (%d) ) AS `users` ON `info`.`unmentioned`=`users`.`unmentioned`", permission_group_sid));
		}
		query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `unmentioned`,GROUP_CONCAT(`permission_struct_sid` SEPARATOR ',') AS `backend_struct_sid_list` FROM `%s`.`tb_permission_group_backend_%s` ", db_name, owner_id));
		query.append(String.format(" WHERE `permission_group_sid` IN (%d) ) AS `backend` ON `info`.`unmentioned`=`backend`.`unmentioned`", permission_group_sid));
		query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `unmentioned`,GROUP_CONCAT(`permission_struct_sid` SEPARATOR ',') AS `sales_struct_sid_list` FROM `%s`.`tb_permission_group_sales_%s` ", db_name, owner_id));
		query.append(String.format(" WHERE `permission_group_sid` IN (%d) ) AS `sales` ON `info`.`unmentioned`=`sales`.`unmentioned`", permission_group_sid));
		

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, null, query.toString(), null, false));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>