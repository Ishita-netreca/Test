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
		int itemSid = MyRequestUtil.getInt(request, "itemSid", 0);

		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || itemSid < 1 || db_name == null) {
		        throw new Exception();
		    }

            query.append(String.format("SELECT `inven`.`sid`,`inven`.`po_sid` AS `poSid`,`inven`.`serial_no` AS `serialNo`,`inven`.`update_date` AS `updateDate`,`inven`.`updater`,"));
            query.append(String.format("`po`.`po_id` AS `poId`,`vendor`.`vendor`,`user`.`first_name` AS `firstName`,`user`.`middle_name` AS `middleName`,`user`.`last_name` AS `lastName`,`user`.`user_id`,`item`.`description` FROM "));
            query.append(String.format("(SELECT * FROM `%s`.`tb_inventory_%s` WHERE `item_sid` = '%d' AND `qty` > 0) AS `inven` ", db_name, storeId, itemSid));
            query.append(String.format("LEFT JOIN (SELECT `sid`,`po_id`,`vendor_id` FROM `%s`.`tb_po_%s`) AS `po` ON `inven`.`po_sid`=`po`.`sid` ", db_name, storeId));
            query.append(String.format("LEFT JOIN (SELECT `sid`,`vendor_name` AS `vendor` FROM `%s`.`tb_vendor`) AS `vendor` ON `po`.`vendor_id`=`vendor`.`sid` ", db_name));
            query.append(String.format("LEFT JOIN (SELECT `sid` AS `user_sid`,`user_id`,`first_name`,`middle_name`,`last_name` FROM `wrp`.`tb_user`) AS `user` ON `inven`.`updater`=`user`.`user_sid` "));
            query.append(String.format("LEFT JOIN (SELECT `sid`,`description` FROM `%s`.`tb_item_dict_%s`) AS `item` ON `inven`.`item_sid`=`item`.`sid`", db_name, storeId));

            mPreparedStatementParams = new PreparedStatementParams();

            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));
            
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;

%>