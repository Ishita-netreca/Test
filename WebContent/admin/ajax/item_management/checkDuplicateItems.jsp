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

	String item_sid_list_str = MyRequestUtil.getString(request, "item_sid_list_str", null);
	
	try {
	    if ((!master_user_flag && !subdealer_user_flag) || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
		
		mPreparedStatementParams = new PreparedStatementParams();

		if (master_user_flag) {
			query.append(String.format("SELECT * FROM (SELECT COUNT(`sid`) AS `codeCount`,'1' AS `num` FROM `%s`.`tb_item_dict_%s`", db_name, db_name));
			query.append(String.format(" WHERE `item_code` IN (SELECT `item_code` FROM `wrp`.`tb_item_dict_[storeid]`"));
			query.append(String.format(" WHERE `sid` IN (%s))) AS `a` LEFT JOIN ", item_sid_list_str));
			query.append(String.format(" (SELECT COUNT(`sid`) AS `upcCount`,'1' AS `num` FROM `%s`.`tb_item_dict_%s` WHERE `upc` IN ", db_name, db_name));
			query.append(String.format(" (SELECT `upc` FROM `wrp`.`tb_item_dict_[storeid]` WHERE `sid` IN (%s))) AS `b` ON `a`.`num`=`b`.`num`", item_sid_list_str));
	    } else if (subdealer_user_flag) {
			query.append(String.format("SELECT * FROM (SELECT COUNT(`sid`) AS `codeCount`,'1' AS `num` FROM `%s`.`tb_item_dict_%s`", db_name, owner_id));
			query.append(String.format(" WHERE `item_code` IN (SELECT `item_code` FROM `%s`.`tb_item_dict_%s`", db_name, db_name));
			query.append(String.format(" WHERE `sid` IN (%s))) AS `a` LEFT JOIN ", item_sid_list_str));
			query.append(String.format(" (SELECT COUNT(`sid`) AS `upcCount`,'1' AS `num` FROM `%s`.`tb_item_dict_%s` WHERE `upc` IN ", db_name, owner_id));
			query.append(String.format(" (SELECT `upc` FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (%s))) AS `b` ON `a`.`num`=`b`.`num`", db_name,db_name,item_sid_list_str));
	    } else {
    		out.print(-3);
	        throw new Exception();
	    }
		
        out.print(MyDBUtil.getInstance().getJSONString(db_name, null, null, query.toString(), mPreparedStatementParams, false));

	} catch (Exception e) { 
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>