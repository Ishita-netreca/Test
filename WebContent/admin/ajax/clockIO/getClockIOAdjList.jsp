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

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		
		String searchPeriodStart = MyRequestUtil.getString(request, "searchPeriodStart", null);
		String searchPeriodEnd = MyRequestUtil.getString(request, "searchPeriodEnd", null);

		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			mPreparedStatementParams = new PreparedStatementParams();

            query.append(String.format("SELECT `a`.*, `b`.*,IF(`c`.`status`=0,'Work',IF(`c`.`status`=1,'Break','Lunch')) AS `status`,IF(`a`.`adj_status`=0,'Request',IF(`a`.`adj_status`=1,'Accept','Reject')) AS `adjStatus` FROM(SELECT `sid`,`clock_io_sid`,`user_sid`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y') AS `req_date`,DATE_FORMAT(`time_start`,'%%H:%%i') AS `time_start`,DATE_FORMAT(`time_end`,'%%H:%%i') AS `time_end`,DATE_FORMAT(`adj_time_start`,'%%H:%%i') AS `adj_time_start`,DATE_FORMAT(`adj_time_end`,'%%H:%%i') AS `adj_time_end`,`adj_status` FROM `%s`.`tb_clock_io_adj_%s`) AS `a`", timezone_offset.toString(),db_name, storeId));
            query.append(String.format(" LEFT JOIN (SELECT `sid`,IF(`middle_name` IS NOT NULL && `middle_name` != '',CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`),CONCAT(`first_name`,' ',`last_name`)) AS `user_name`,`user_id` FROM `wrp`.`tb_user` WHERE `user_id` IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`=?)) AS `b` ON `a`.`user_sid`=`b`.`sid`", db_name));
			mPreparedStatementParams.set(storeId);
            query.append(String.format(" LEFT JOIN (SELECT `sid`,`status` FROM `%s`.`tb_clock_io_%s` ) AS `c` ON `a`.`clock_io_sid`=`c`.`sid`", db_name, storeId));
            if(searchPeriodStart != null && searchPeriodEnd != null) {
				query.append(String.format(" WHERE `a`.`req_date` BETWEEN ? AND ? "));
				mPreparedStatementParams.set(searchPeriodStart);
				mPreparedStatementParams.set(searchPeriodEnd);
			}
            query.append(String.format(" ORDER BY `a`.`adj_status` ASC "));
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		
		}

		query = null;
%>