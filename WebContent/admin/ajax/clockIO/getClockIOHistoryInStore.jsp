<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		
		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int adjustState = MyRequestUtil.getInt(request, "adjustState", -1);
		String searchPeriodStart = MyRequestUtil.getString(request, "searchPeriodStart", null);
		String searchPeriodEnd = MyRequestUtil.getString(request, "searchPeriodEnd", null);
		String keyword = MyRequestUtil.getString(request, "searchKeyword", null);

		PreparedStatementParams mPreparedStatementParams = null;
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			mPreparedStatementParams = new PreparedStatementParams();

			query.append(String.format("SELECT `a`.*, `b`.`work_start`,`c`.`lunch_start`,`d`.`lunch_end`,`e`.`work_end`,`f`.`work_hour`,IF(`f`.`over_time`>0,`f`.`over_time`,'00:00') AS `over_time`,`g`.`name`,`g`.`user_id`,`h`.`schedule_work_start`,`h`.`schedule_work_end`,"));
			query.append(String.format("TIME_FORMAT(TIMEDIFF( STR_TO_DATE(`b`.`work_start`,'%%H:%%i'), STR_TO_DATE(`h`.`schedule_work_start`,'%%H:%%i') ) , '%%H:%%i' ) AS `diff_start`,"));
			query.append(String.format("TIME_FORMAT(TIMEDIFF( STR_TO_DATE(`e`.`work_end`,'%%H:%%i'),STR_TO_DATE(`h`.`schedule_work_end`,'%%H:%%i') ),'%%H:%%i') AS `diff_end`"));
			query.append(String.format(" FROM(SELECT `sid`, `emp_sid`, DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date` FROM `%s`.`tb_clock_io_%s` GROUP BY `date`,`emp_sid`) AS `a` ", db_name,storeId));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(MIN(`start`),'%%H:%%i') AS `work_start`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`, `emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=0 GROUP BY `date`,`emp_sid`) AS `b` ON `a`.`date`=`b`.`date` AND `a`.`emp_sid`=`b`.`emp_sid` ", db_name,storeId));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(MIN(`start`),'%%H:%%i') AS `lunch_start`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`, `emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=2 GROUP BY `date`,`emp_sid`) AS `c` ON `a`.`date`=`c`.`date` AND `a`.`emp_sid`=`c`.`emp_sid`", db_name,storeId));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(MIN(`end`),'%%H:%%i') AS `lunch_end`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`, `emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=2 GROUP BY `date`,`emp_sid`) AS `d` ON `a`.`date`=`d`.`date` AND `a`.`emp_sid`=`d`.`emp_sid`", db_name,storeId));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(MAX(`end`),'%%H:%%i') AS `work_end`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`, `emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=0 GROUP BY `date`,`emp_sid` ) AS `e` ON `a`.`date`=`e`.`date` AND `a`.`emp_sid`=`e`.`emp_sid` ", db_name,storeId));
			query.append(String.format("LEFT JOIN (SELECT SEC_TO_TIME(SUM( TIME_TO_SEC(`amount`))) AS `work_hour`, DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date` ,(SELECT TIMEDIFF(TIME_FORMAT(SEC_TO_TIME(SUM( TIME_TO_SEC(`amount`))), '%%H:%%i'),`work_time`) FROM (SELECT TIME_FORMAT(`daily_work_hour`, '%%H:%%i') AS `work_time` FROM `%s`.`tb_stores` WHERE `store_id`='%s') AS outertable) AS `over_time`, `emp_sid`", db_name,storeId));
			query.append(String.format(" FROM `%s`.`tb_clock_io_%s` WHERE `status`=0 GROUP BY `date`,`emp_sid` ) AS `f` ON `a`.`date`=`f`.`date` AND `a`.`emp_sid`=`f`.`emp_sid`", db_name,storeId));
			query.append(String.format("LEFT JOIN (SELECT `sid`,IF (`middle_name` IS NOT NULL && `middle_name` != '', CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`), CONCAT(`first_name`,' ',`last_name`)) AS `name`,`user_id` FROM `wrp`.`tb_user`) AS `g` ON `a`.`emp_sid`=`g`.`sid` "));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`,DATE_FORMAT(`work_start`,'%%H:%%i') AS `schedule_work_start`,DATE_FORMAT(`work_end`,'%%H:%%i') AS `schedule_work_end`,`emp_sid` FROM `%s`.`tb_clock_inout_schedule_%s`) AS `h` ON `a`.`date`=`h`.`date` AND `a`.`emp_sid`=`h`.`emp_sid`", db_name,storeId));
			if(searchPeriodStart != null && searchPeriodEnd != null) {
				query.append(String.format(" WHERE `a`.`date` BETWEEN ? AND ? "));
				mPreparedStatementParams.set(searchPeriodStart);
				mPreparedStatementParams.set(searchPeriodEnd);
			}
			query.append(String.format("ORDER BY `date` DESC"));
			
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));

            
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>