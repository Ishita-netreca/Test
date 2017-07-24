<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%

		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);

		int transSid = MyRequestUtil.getInt(request, "transSid", 0);
		String item_code = MyRequestUtil.getString(request, "item_code", null);

		int currentStatus = MyRequestUtil.getInt(request, "currentStatus", -1);


		try {
		    if (storeId == null || item_code == null || user_sid == null || db_name == null || transSid < 1 || currentStatus < 0) {
		        throw new Exception();
		    }

			
			query.append(String.format("SELECT `a`.*, `bc`.* FROM ("));
            query.append(String.format("SELECT `sid`,`item_code`,`req_qty` AS `reqQty`,`appr_qty` AS `apprQty`,`ship_qty` AS `shipQty`,`recv_qty` AS `recvQty` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `trans_sid`='%d' AND `item_code`='%s' LIMIT 0, 1", db_name, db_name, transSid, item_code));
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `b`.*, `c`.`in_stock` AS `inStock` FROM ("));
            query.append(String.format("SELECT `sid` AS `item_sid`,`item_code`,`model`,`description`,`sku`,`item_type` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`='%s'", db_name, storeId, item_code));
            query.append(String.format(") AS `b` LEFT JOIN ("));
            query.append(String.format("SELECT `item_sid`, SUM(`qty`) AS `in_stock` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`='%s') GROUP BY `item_sid`", db_name, storeId, db_name, storeId, item_code));
            query.append(String.format(") AS `c` ON `b`.`item_sid`=`c`.`item_sid`"));
            query.append(String.format(") AS `bc` ON `a`.`item_code`=`bc`.`item_code`"));

            out.print(MyDBUtil.getInstance().getJSONString(query.toString(), false));

		} catch (Exception e) {
            
		}


		query = null;
		sb = null;
%>