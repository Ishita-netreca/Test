<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		
		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			
			query.append(String.format("SELECT `a`.*,DATE_FORMAT(DATE_ADD(`a`.`update_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') AS `updateDate`,`b`.`user_id` FROM (SELECT * FROM `%s`.`tb_commission_profile_%s`) AS `a`", timezone_offset.toString(),db_name, storeId));
			query.append(String.format(" LEFT JOIN(SELECT `sid`,`user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user`) AS `b` ON `a`.`updater`=`b`.`sid`"));
			query.append(String.format(" ORDER BY `update_date` DESC "));
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), true));
			
		} catch (Exception e) {
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
            
		}

		query = null;
%>