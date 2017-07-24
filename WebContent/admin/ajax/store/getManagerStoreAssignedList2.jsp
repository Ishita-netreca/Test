<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		
		StringBuffer query = new StringBuffer();

		
		try {
		    if (user_sid == null || db_name == null) {
		        throw new Exception();
		    }
			
		    if (master_user_flag) {
				query.append(String.format("SELECT `a`.* FROM (SELECT `store_id`,`timezone_id` FROM `wrp`.`tb_stores` WHERE `master_sid`='%s') AS `a`", user_sid));
		    } else if (subdealer_user_flag) {
				query.append(String.format("SELECT `a`.* FROM (SELECT `store_id`,`timezone_id` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s') AS `a`", user_sid));
				
		    } else {
				query.append(String.format("SELECT `a`.`user_id`,`b`.*,`c`.`dname`,`d`.`mname` FROM (SELECT * FROM `%s`.`tb_user_store_access` WHERE `user_sid`='%s' GROUP BY `store_id`) AS `a`", db_name, user_sid));
				query.append(String.format(" LEFT JOIN(SELECT `store_id`,`name`,`address1`,`address2`,`city`,`state`,`zipcode`,`district_code`,`market_code`,CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`) AS `Address` FROM `%s`.`tb_stores`) AS `b` ON `a`.`store_id`=`b`.`store_id`", db_name));
				query.append(String.format(" LEFT JOIN(SELECT `name` AS `dname`,`district_code` FROM `%s`.`tb_districts`) AS `c` ON `b`.`district_code`=`c`.`district_code`", db_name));
				query.append(String.format(" LEFT JOIN(SELECT `name` AS `mname`,`market_code` FROM `%s`.`tb_markets`) AS `d` ON `b`.`market_code`=`d`.`market_code`", db_name));				
		    }

			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>