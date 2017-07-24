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
	
	int transSid = MyRequestUtil.getInt(request, "transSid", 0);
	int transferStatus = MyRequestUtil.getInt(request, "status", -1);
	
	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		mPreparedStatementParams = new PreparedStatementParams();

		switch (transferStatus) {
		case 2:
			query.append(String.format("UPDATE `%s`.`tb_inventory_trans_%s` SET `status`='0', `appr_date`=NULL,`appr_user_sid`=NULL,`appr_memo`=NULL WHERE `sid`='%d';",db_name,db_name,transSid));
			query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='0' WHERE `trans_sid`='%d';",db_name,db_name,transSid));
			break;
		case 3:
			query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=`qty`+1 WHERE `serial_no` IN (SELECT `serial_no` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `serial_no` IS NOT NULL AND `trans_sid`='%d' AND `fulfill_qty` > 0);",db_name,store_id,db_name,db_name,transSid));
			query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=`qty`+1 WHERE `item_sid` IN (SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type`='3' AND `item_code` IN (SELECT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d')) LIMIT 1;",db_name,store_id,db_name,store_id,db_name,db_name,transSid));
			query.append(String.format("DELETE FROM `%s`.`tb_fulfilled_bin_%s` WHERE `trans_sid`='%d';",db_name,store_id,transSid));
			query.append(String.format("UPDATE `%s`.`tb_inventory_trans_%s` SET `status`='2', `fulfill_date`=NULL WHERE `sid`='%d';",db_name,db_name,transSid));
			query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `fulfill_qty`='0' WHERE `trans_sid`='%d';",db_name,db_name,transSid));
			break;
		}
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams)); 

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>