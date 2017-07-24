<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();
		
		String store_list_str = null;
		String [] store_list = null;
		
		try {
		    if (db_name == null ) {
		        throw new Exception();
		    }
		    
		    query.append(String.format("SELECT GROUP_CONCAT(`store_id`) AS `store_id_list_str` FROM `%s`.`tb_user_store_access` WHERE `user_sid` IN (%s)", db_name, user_sid));
		    
		    store_list_str = MyDBUtil.getInstance().getString(query.toString(),"store_id_list_str");
		    query.delete(0, query.length());
		    if(store_list_str == null || store_list_str.length() == 0) {
		    	throw new Exception();
		    }
		    
		    store_list = store_list_str.split(",");
		    
		    for (int i = 0; i < store_list.length; i++) {
		    	if (i > 0) {
		    		query.append(" UNION ");
		    		
		    	}
		    	query.append(String.format("(SELECT `a`.*,`b`.* FROM ("));
		    	query.append(String.format(" SELECT '%s' AS `store_id`,`sid`,`item_code`,`description`,`sku`,`item_cost`,`item_type` FROM `%s`.`tb_item_dict_%s`", store_list[i], db_name, store_list[i]));
    			query.append(String.format(" WHERE `sid` IN ("));
    			query.append(String.format(" SELECT `item_sid` FROM `%s`.`tb_inventory_%s` WHERE `qty` > 0", db_name, store_list[i]));
//    			query.append(String.format(" AND `bin` IN (1,2)"));
    			query.append(String.format(" )) AS `a` LEFT JOIN ("));
    			query.append(String.format(" SELECT `item_sid`,SUM(`qty`) AS `in_stock` FROM `%s`.`tb_inventory_%s` WHERE `qty` > 0", db_name, store_list[i]));
//    			query.append(String.format(" AND `bin` IN (1,2) "));
    			query.append(String.format(" GROUP BY `item_sid`) AS `b` ON `a`.`sid`=`b`.`item_sid`)"));			 
		    }
		    
		    out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}
		store_list_str = null;
		store_list = null;
		user_sid = null;
		query = null;
%>