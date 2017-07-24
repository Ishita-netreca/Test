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
	PreparedStatementParams mPreparedStatementParams = null;
	
	String store_id = MyRequestUtil.getString(request, "storeId", null);
	String serial = MyRequestUtil.getString(request, "serialNo", null);
	String item_code = MyRequestUtil.getString(request, "item_code", null);

	if (store_id == null || db_name == null || serial == null) {
        return;
    }
	mPreparedStatementParams = new PreparedStatementParams();
	
	query.append(String.format("SELECT `a`.*,`b`.`model`,`b`.`description`,`b`.`item_code` FROM ("));
    query.append(String.format("SELECT `sid`,`item_sid`,`serial_no`,`qty` FROM `%s`.`tb_inventory_%s` WHERE `serial_no`=?", db_name, store_id));
	mPreparedStatementParams.set(serial);
    query.append(String.format(") AS `a` LEFT JOIN ("));
    query.append(String.format("SELECT `sid`,`model`,`description`,`sku`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`=? ", db_name, store_id));
	mPreparedStatementParams.set(item_code);
    query.append(String.format("AND `sid` IN (SELECT `item_sid` AS `sid` FROM `%s`.`tb_inventory_%s` WHERE `serial_no`=? AND `qty` > 0)", db_name, store_id));
	mPreparedStatementParams.set(serial);
    query.append(String.format(") AS `b` ON `a`.`item_sid`=`b`.`sid`"));
    query.append(String.format(" WHERE `item_code` IS NOT NULL"));
	
    out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, false));
%>