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
	
	int request_user_sid = MyRequestUtil.getInt(request, "user_sid", 0);

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (user_sid == null || db_name == null || owner_id == null || request_user_sid < 1) {
	        throw new Exception();
	    }
	    
	    if (!subdealer_user_flag) {
	    	throw new Exception();
	    }

		
		// 쿼리 입력
		
		// 파라미터 입력
		mPreparedStatementParams = new PreparedStatementParams();
		query.append(String.format("SELECT `user`.*,`sales`.`sales_struct_sid_list`,`backend`.`backend_struct_sid_list`,`sales_group`.`sales_struct_sid_list_group`,`backend_group`.`backend_struct_sid_list_group` FROM ("));
		query.append(String.format(" SELECT 'boas' AS `for_only_join`,`sid`,`user_id`,TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) AS `user_name` FROM `wrp`.`tb_user` WHERE `sid`=? AND `owner_sid`=? ) AS `user` "));
		query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `for_only_join`,GROUP_CONCAT(DISTINCT `permission_struct_sid`) AS `sales_struct_sid_list` FROM `%s`.`tb_permission_user_sales_%s` WHERE `user_sid`=? ) AS `sales` ON `user`.`for_only_join`=`sales`.`for_only_join`", db_name, owner_id));
		query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `for_only_join`,GROUP_CONCAT(DISTINCT `permission_struct_sid`) AS `backend_struct_sid_list` FROM `%s`.`tb_permission_user_backend_%s` WHERE `user_sid`=? ) AS `backend` ON `user`.`for_only_join`=`backend`.`for_only_join`", db_name, owner_id));
		query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `for_only_join`,GROUP_CONCAT(DISTINCT `permission_struct_sid`) AS `sales_struct_sid_list_group` FROM `%s`.`tb_permission_group_sales_%s` WHERE `permission_group_sid` IN (", db_name, owner_id));
		query.append(String.format(" SELECT `permission_group_sid` FROM `%s`.`tb_permission_group_users_%s` WHERE `user_sid` IN (?) ) ) AS `sales_group` ON `user`.`for_only_join`=`sales_group`.`for_only_join`", db_name, owner_id));
		query.append(String.format(" LEFT JOIN ( SELECT 'boas' AS `for_only_join`,GROUP_CONCAT(DISTINCT `permission_struct_sid`) AS `backend_struct_sid_list_group` FROM `%s`.`tb_permission_group_backend_%s` WHERE `permission_group_sid` IN (", db_name, owner_id));
		query.append(String.format(" SELECT `permission_group_sid` FROM `%s`.`tb_permission_group_users_%s` WHERE `user_sid` IN (?) ) ) AS `backend_group` ON `user`.`for_only_join`=`backend_group`.`for_only_join`", db_name, owner_id));
		
		mPreparedStatementParams.set(request_user_sid);
		mPreparedStatementParams.set(user_sid);
		mPreparedStatementParams.set(request_user_sid);
		mPreparedStatementParams.set(request_user_sid);
		mPreparedStatementParams.set(request_user_sid);
		mPreparedStatementParams.set(request_user_sid);

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, null, query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>