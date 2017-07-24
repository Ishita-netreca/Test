<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
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
			
			
			query.append(String.format("SELECT `a`.*,`c`.`user_id` AS `manager`,`c`.`user_id` AS `ownerId`, `d`.`name` AS `marketName`, `e`.`name` AS `districtName` FROM ( SELECT"));
			query.append(String.format(" `sid`,`active`,`store_id` AS `storeId`,`name`,`address1`,`address2`,`city`,`state`,IF(`status`>0,'Open','Close') AS `statusStr`,`zipcode`,DATE_FORMAT(`open_date`, '%%m/%%d/%%Y') AS `openDate`,"));
			query.append(String.format(" `owner`,`tax_rate` AS `taxRate`,`carrier_market_id` AS `carrierMarketId`,`market_code` AS `marketCode`,`district_code` AS `districtCode`,`tel`,`owner_sid` FROM `%s`.`tb_stores` ", db_name));
			
			if (master_user_flag) {
				query.append(String.format(" WHERE `store_id` IN (SELECT `store_id` FROM `wrp`.`tb_stores` WHERE `master_sid` ='%s')) AS `a`", master_sid));				
			} else {
				query.append(String.format(" WHERE `store_id` IN (SELECT `store_id` FROM `wrp`.`tb_stores` WHERE `owner_sid` ='%s')) AS `a`", owner_sid));				
			}
			
			query.append(String.format(" LEFT JOIN(SELECT `user_id`,`sid` FROM `wrp`.`tb_user`) AS `c` ON `a`.`owner_sid`=`c`.`sid`"));
			query.append(String.format(" LEFT JOIN(SELECT `name`,`market_code` FROM `%s`.`tb_markets`) AS `d` ON `a`.`marketCode`=`d`.`market_code`", db_name));
			query.append(String.format(" LEFT JOIN(SELECT `name`,`district_code` FROM `%s`.`tb_districts`) AS `e` ON `a`.`districtCode`=`e`.`district_code`", db_name));
			//System.out.println(query);
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		
		query = null;
%>