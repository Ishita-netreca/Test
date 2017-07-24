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
		int clockIOAdjSid = MyRequestUtil.getInt(request, "clockIOAdjSid", 0);
		
		try {
		    if (storeId == null || user_sid == null || clockIOAdjSid < 1) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `abc`.*,`d`.`store_id`,`d`.`store_work_time` FROM ("));
			query.append(String.format("SELECT `ab`.*,`c`.`user_id`,`c`.`tel` FROM ("));
			query.append(String.format("SELECT `a`.*,`b`.`emp_sid`,`b`.`date`,`b`.`datestr`,`b`.`time_amount`,IF(`b`.`status`=0,'Work',IF(`b`.`status`=1,'Break','Lunch')) AS `status` FROM ("));
			query.append(String.format("SELECT `sid`,`clock_io_sid`,`time_start`,`time_end`,`adj_time_start`,`adj_time_end`,`adj_status` FROM `%s`.`tb_clock_io_adj_%s` WHERE `sid`='%s' AND `manager_sid`='%s'", db_name, storeId, clockIOAdjSid, user_sid));
			query.append(String.format(") AS `a` LEFT JOIN ("));
			query.append(String.format("SELECT `sid`,`emp_sid`,DATE_FORMAT(`date`,'%%W %%b %%d, %%Y') AS `datestr`,`date`,DATE_FORMAT(`amount`,'%%H:%%i') AS `time_amount`,`status` FROM `%s`.`tb_clock_io_%s`", db_name, storeId));
			query.append(String.format(") AS `b` ON `a`.`clock_io_sid`=`b`.`sid`"));
			query.append(String.format(") AS `ab` LEFT JOIN ("));
			query.append(String.format("SELECT `sid`,`user_id`,IF(`middle_name` IS NOT NULL && `middle_name` != '',CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`),CONCAT(`first_name`,' ',`last_name`)) AS `user_name`,`tel` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, storeId.toUpperCase()));
			query.append(String.format(") AS `c` ON `ab`.`emp_sid`=`c`.`sid`"));
			query.append(String.format(") AS `abc` LEFT JOIN ("));
			query.append(String.format("SELECT '%d' AS `sid`,`store_id`,`daily_work_hour` AS `store_work_time` FROM `wrp`.`tb_stores` WHERE `store_id`='%s'", clockIOAdjSid, storeId.toUpperCase()));
			query.append(String.format(") AS `d` ON `abc`.`sid`=`d`.`sid`"));
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), false));
			

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}


		query = null;
%>