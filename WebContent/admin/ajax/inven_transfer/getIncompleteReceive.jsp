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
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		query.append(String.format("SELECT `a`.*,DATE_FORMAT(DATE_ADD(`recv_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `recvDate`,`b`.`user_id` ",timezone_offset));
		query.append(String.format(" FROM (SELECT * FROM `%s`.`tb_inventory_trans_%s`", db_name,db_name));
		query.append(String.format(" WHERE `sid` IN (SELECT `trans_sid` FROM `%s`.`tb_missing_bin_%s` WHERE `qty` > 0)) AS `a`", db_name,store_id));
		query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` FROM `wrp`.`tb_user`) AS `b` ON `a`.`appr_user_sid`=`b`.`sid`"));

		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>