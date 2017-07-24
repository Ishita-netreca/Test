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
	String to_store_id = MyRequestUtil.getString(request, "to_store_id", null);
	
	try {
	    if (to_store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		
		// 쿼리 입력
		query.append(String.format("SELECT `a`.*,`b`.`model`,`b`.`description`,`b`.`item_type`,`c`.`qty` FROM ("));
		query.append(String.format("SELECT `sid`,`trans_sid`,`item_code`,SUM(`req_qty`) AS `req_qty`, SUM(`appr_qty`) AS `appr_qty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE trans_sid='%d' GROUP BY `item_code`) AS `a` ", db_name, db_name, transSid));
		query.append(String.format("LEFT JOIN (SELECT `sid`,`item_code`,`model`,`description`,`item_type` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (", db_name,to_store_id));
		query.append(String.format("SELECT DISTINCT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d') GROUP BY `item_code`) AS `b` ON `a`.`item_code`=`b`.`item_code` ",db_name,db_name,transSid));
		query.append(String.format("LEFT JOIN (SELECT `item_sid`,SUM(`qty`) AS `qty` FROM `%s`.`tb_inventory_%s` GROUP BY `item_sid`) AS `c` ON `b`.`sid`=`c`.`item_sid`",db_name,to_store_id));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>