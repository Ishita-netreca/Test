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
	String transItemsStr = MyRequestUtil.getString(request, "transItems", null);

	JSONArray transItems = null;
	JSONObject jsonObj = null;
	
	PreparedStatementParams mPreparedStatementParams = null;
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

	    transItems = (JSONArray)(new JSONParser().parse(transItemsStr));
	    
		mPreparedStatementParams = new PreparedStatementParams();

		query.append(String.format("SELECT `a`.*,`b`.`qty` FROM (SELECT `sid`,`item_code`,`description` FROM `%s`.`tb_item_dict_%s` WHERE ", db_name, store_id));
		for (int i = 0; i < transItems.size(); i++) {
            jsonObj = (JSONObject)transItems.get(i);
    		query.append(String.format("`item_code`='%s' ", jsonObj.get("itemCode").toString()));
    		query.append(String.format("OR "));
    		
        }
		query.delete(query.length()-3, query.length());
		query.append(String.format(") AS `a` LEFT JOIN(SELECT `item_sid`, SUM(`qty`) AS `qty` FROM `%s`.`tb_inventory_%s` GROUP BY `item_sid`) AS `b` ON `a`.`sid`=`b`.`item_sid`;", db_name, store_id));

		out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>