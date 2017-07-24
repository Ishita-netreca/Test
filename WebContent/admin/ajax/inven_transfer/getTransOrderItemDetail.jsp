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
		query.append(String.format("SELECT DISTINCT `a`.*,`b`.`description`,`c`.* FROM (SELECT * FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`=%d AND `appr_qty` > 0) AS `a` ",db_name,db_name,transSid));
		query.append(String.format("LEFT JOIN (SELECT `description`,`item_code` FROM `%s`.`tb_item_dict_%s`)AS `b` ON `a`.`item_code`=`b`.`item_code`", db_name, store_id));
		query.append(String.format("LEFT JOIN (SELECT `sid` AS `transSid`,`fulfill_memo`, `pickup_memo`,`recv_memo` FROM `%s`.`tb_inventory_trans_%s`) AS `c` ON `a`.`trans_sid`=`c`.`transSid`", db_name,db_name));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>