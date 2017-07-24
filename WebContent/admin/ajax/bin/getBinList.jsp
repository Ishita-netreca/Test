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
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		int sid = MyRequestUtil.getInt(request, "sid", 0);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }		
			if (keyword != null && keyword.length() > 0) {
				keyword = String.format("%%%s%%",keyword);
			}
			mPreparedStatementParams = new PreparedStatementParams();
			
			query.append(String.format("SELECT a.*, b.* FROM(SELECT `sid`,`bin_type`,`description`,DATE_FORMAT(DATE_ADD(`update_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `update_date`,`updater` FROM `%s`.`tb_bin_dict_%s` WHERE 1=1", timezone_offset.toString(),db_name, storeId));
			if (keyword != null && keyword.length() > 0) {
				query.append(String.format(" AND `description` LIKE ?"));
				mPreparedStatementParams.set(keyword);
			}
			if (sid > 0) {
				query.append(String.format(" AND `sid` IN (?)"));
				mPreparedStatementParams.set(sid);
			}
			
			query.append(String.format(" ) AS `a`"));
			query.append(String.format("LEFT JOIN (SELECT sid,`user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.tb_user) AS b ON a.updater=b.sid;"));
			
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}


		query = null;
%>