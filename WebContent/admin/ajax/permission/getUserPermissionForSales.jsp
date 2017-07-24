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
	int userSid = MyRequestUtil.getInt(request, "user_sid", 0);

	try {
	    if (store_id == null || userSid < 1 || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format(" SELECT `struct`.*,IF (`user`.`value` IS NOT NULL,`user`.`value`, 0) AS `value` FROM ("));
		query.append(String.format("  SELECT `sid`,`id`,`parent_id`,`root_id`,`name`,`description` FROM `wrp`.`tb_permission_struct_for_sales`"));
		query.append(String.format("  ) AS `struct` LEFT JOIN ("));
		query.append(String.format("  SELECT `sid`,`user_sid`,`permission_struct_sid`,`value` FROM `%s`.`tb_user_permission_for_sales_%s` WHERE `user_sid` IN (%d)", db_name, store_id, userSid));
		query.append(String.format(" ) AS `user` ON `struct`.`sid`=`user`.`permission_struct_sid`"));

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>