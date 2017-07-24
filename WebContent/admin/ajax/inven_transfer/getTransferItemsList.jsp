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

		String storeId = MyRequestUtil.getString(request, "storeId", null);

		int transSid = MyRequestUtil.getInt(request, "transSid", 0);
		String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));

		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || user_sid == null || db_name == null || transSid < 1) {
		        throw new Exception();
		    }
		    mPreparedStatementParams = new PreparedStatementParams();
		    
			query.append(String.format("SELECT `a`.*,`b`.`model`,`b`.`description`,`b`.`item_type`,`c`.`from_store_id`,`c`.`from_store_id`,`c`.`to_store_id`,`c`.`req_memo`,`c`.`appr_memo`,`c`.`fulfill_memo` FROM ("));
            query.append(String.format("SELECT `sid`,`trans_sid` AS `transSid`,`item_code`,SUM(`req_qty`) AS `reqQty`,SUM(`appr_qty`) AS `apprQty`,SUM(`fulfill_qty`) AS `fulfillQty`,SUM(`recv_qty`) AS `recvQty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE trans_sid='%d'", db_name, db_name, transSid));
            query.append(String.format(" GROUP BY `item_code`) AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `item_code`,`model`,`description`,`item_type` FROM `%s`.`tb_item_dict_%s` WHERE `item_code` IN (SELECT DISTINCT `item_code` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d') GROUP BY `item_code`", db_name, storeId, db_name, db_name, transSid));
            query.append(String.format(") AS `b` ON `a`.`item_code`=`b`.`item_code`"));
            query.append(String.format(" LEFT JOIN (SELECT `sid`,`from_store_id`,`to_store_id`,`trans_id`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `req_date`,`req_memo`,`appr_memo`,`fulfill_memo` FROM `%s`.`tb_inventory_trans_%s`) AS `c` ON `a`.`transSid`=`c`.`sid`", timezone_offset,db_name, db_name));
            if (keyword != null && keyword.length() > 0 ){
                query.append(String.format(" WHERE (`b`.`description` LIKE '%%%s%%' OR `a`.`item_code`='%s' OR `b`.`model` LIKE '%%%s%%')",keyword,keyword,keyword));                    
            }
            
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>