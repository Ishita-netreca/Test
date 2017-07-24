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
		String searchDate = MyRequestUtil.getString(request, "searchDate", null);
		String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));
		String user_str = null;
		
		PreparedStatementParams mPreparedStatementParams = null;
		try {
		    if (store_id == null || db_name == null) {
		        throw new Exception();
		    }	
			if (keyword != null && keyword.length() > 0) {
				keyword = String.format("%%%s%%",keyword);
			}
		    
		    mPreparedStatementParams = new PreparedStatementParams();
		    
		    if(keyword != null && keyword.length() > 0){
			    query.append(String.format("SELECT `sid` FROM `wrp`.`tb_user` WHERE (`user_id` LIKE ? OR `first_name` LIKE ? OR `last_name` LIKE ?)"));
			    mPreparedStatementParams.set(keyword);
			    mPreparedStatementParams.set(keyword);
			    mPreparedStatementParams.set(keyword);
			    if (master_user_flag) {
					query.append(String.format(" AND `master_sid`='%s'",master_sid));
			    } else if (subdealer_user_flag) {
			    	query.append(String.format(" AND `owner_sid`='%s'",owner_sid));
			    }
			    
			    user_str = MyDBUtil.getInstance().getString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, "sid");
			    
			    query.delete(0, query.length());
		    }
		    
			query.append(String.format("SELECT `a`.*, `b`.`work_start`,`c`.`lunch_start`,`d`.`lunch_end`,`e`.`work_end`, `f`.`amount`, IF(`f`.`over_time`>0,`f`.`over_time`,'00:00') AS `over_time`,`g`.`name`,`g`.`user_id` ", db_name, store_id));
			query.append(String.format(" FROM(SELECT `sid`, `emp_sid`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date` FROM `%s`.`tb_clock_io_%s`", db_name, store_id));
			if (searchDate != null) {
			    query.append(String.format(" WHERE DATE_FORMAT(`date`,'%%m/%%d/%%Y') IN ('%s') ", searchDate));
			}
			if(user_str != null && user_str.length() > 0){
				query.append(String.format(" AND `emp_sid` IN (%s)",user_str));
			}
			query.append(String.format(" GROUP BY `emp_sid`) AS `a` LEFT JOIN (SELECT DATE_FORMAT(MIN(`start`),'%%H:%%i') AS `work_start`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`,`emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=0", db_name, store_id));
			if (searchDate != null) {
			    query.append(String.format(" AND DATE_FORMAT(`date`,'%%m/%%d/%%Y') IN ('%s') ", searchDate));
			}
			if(user_str != null && user_str.length() > 0){
				query.append(String.format(" AND `emp_sid` IN (%s)",user_str));
			}
			query.append(String.format(" GROUP BY `emp_sid`) AS `b` ON `a`.`emp_sid`=`b`.`emp_sid` LEFT JOIN (SELECT DATE_FORMAT(MIN(`start`),'%%H:%%i') AS `lunch_start`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`,`emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=2", db_name, store_id));
			
			if (searchDate != null) {
			    query.append(String.format(" AND DATE_FORMAT(`date`,'%%m/%%d/%%Y') IN ('%s') ", searchDate));
			}
			if(user_str != null && user_str.length() > 0){
				query.append(String.format(" AND `emp_sid` IN (%s)",user_str));
			}
			
			query.append(String.format(" GROUP BY `emp_sid` ) AS `c` ON `a`.`emp_sid`=`c`.`emp_sid` LEFT JOIN (SELECT DATE_FORMAT(MIN(`end`),'%%H:%%i') AS `lunch_end`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`,`emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=2", db_name, store_id));
			
			if (searchDate != null) {
			    query.append(String.format(" AND DATE_FORMAT(`date`,'%%m/%%d/%%Y') IN ('%s') ", searchDate));
			}
			if(user_str != null && user_str.length() > 0){
				query.append(String.format(" AND `emp_sid` IN (%s)",user_str));
			}
			query.append(String.format(" GROUP BY `emp_sid` ) AS `d` ON `a`.`emp_sid`=`d`.`emp_sid` LEFT JOIN (SELECT DATE_FORMAT(MAX(`end`),'%%H:%%i') AS `work_end`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`,`emp_sid` FROM `%s`.`tb_clock_io_%s` WHERE `status`=0",db_name, store_id));
			
			if (searchDate != null) {
			    query.append(String.format(" AND DATE_FORMAT(`date`,'%%m/%%d/%%Y') IN ('%s') ", searchDate));
			}
			if(user_str != null && user_str.length() > 0){
				query.append(String.format(" AND `emp_sid` IN (%s)",user_str));
			}
			query.append(String.format(" GROUP BY `emp_sid` ) AS `e` ON `a`.`emp_sid`=`e`.`emp_sid` LEFT JOIN (SELECT SEC_TO_TIME(SUM( TIME_TO_SEC(`amount`))) AS `amount`, DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`,`emp_sid` ,(SELECT TIMEDIFF(TIME_FORMAT(SEC_TO_TIME(SUM( TIME_TO_SEC(`amount`))), '%%H:%%i'),`work_time`) FROM ( "));
			query.append(String.format("SELECT TIME_FORMAT(`daily_work_hour`, '%%H:%%i') AS `work_time` FROM `%s`.`tb_stores` WHERE `store_id`='%s' ) AS outertable) AS `over_time`", db_name, store_id));
			query.append(String.format("FROM `%s`.`tb_clock_io_%s` WHERE `status`=0", db_name, store_id));
			if (searchDate != null) {
			    query.append(String.format(" AND DATE_FORMAT(`date`,'%%m/%%d/%%Y') IN ('%s') ", searchDate));
			}
			if(user_str != null && user_str.length() > 0){
				query.append(String.format(" AND `emp_sid` IN (%s)",user_str));
			}
			query.append(String.format(" GROUP BY `emp_sid` ) AS `f` ON `a`.`emp_sid`=`f`.`emp_sid` LEFT JOIN (SELECT `sid`,IF (`middle_name` IS NOT NULL && `middle_name` != '', CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`), CONCAT(`first_name`,' ',`last_name`)) AS `name`,`user_id` FROM `wrp`.`tb_user`) AS `g` ON `a`.`emp_sid`=`g`.`sid`"));
			
			query.append(String.format("ORDER BY `date` DESC"));

			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>