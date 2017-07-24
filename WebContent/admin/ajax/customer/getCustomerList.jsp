<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		
		int currPageNo = MyRequestUtil.getInt(request, "curr_page_no", 1);
		int countPerPage = MyRequestUtil.getInt(request, "count_per_page", 10);
		PreparedStatementParams mPreparedStatementParams = null;
		
		if (keyword != null) {
		    keyword = keyword.replaceAll("'","''");
		}
		
		try {
		    if (storeId == null || db_name == null) {
		       throw new Exception();
		    }		
			if (keyword != null && keyword.length() > 0) {
				keyword = String.format("%%%s%%",keyword);
			}
			mPreparedStatementParams = new PreparedStatementParams();
		    
		    query.append(String.format("SELECT `list`.*,`total`.`max_page_no` FROM ("));
		    query.append(String.format(" SELECT (@rownum:=@rownum+1) AS `rnum`,`sid`,`customer_id`, TRIM(CONCAT_WS(' ',`first_name`,`last_name`)) AS `name`, TRIM(CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`)) AS `address`,"));
		    query.append(String.format(" `tel`,`company`,DATE_FORMAT(DATE_ADD(`join_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `join_date` ",timezone_offset));
		    query.append(String.format(" FROM `%s`.`tb_customer_%s`,(SELECT @rownum:=0) AS r WHERE 1=1", db_name, storeId));
		    if (keyword != null && keyword.length() > 0) {
			    query.append(String.format(" AND (`customer_id` LIKE ? OR `first_name` LIKE ? OR `last_name` LIKE ?)"));
				mPreparedStatementParams.set(keyword);
				mPreparedStatementParams.set(keyword);
				mPreparedStatementParams.set(keyword);
		    }
		    query.append(String.format(" )AS `list` LEFT JOIN ("));
		    query.append(String.format(" SELECT 1 AS `first_row`, IF(CEIL(COUNT(`sid`) / %d) < (COUNT(`sid`) / %d), FLOOR(COUNT(`sid`) / %d) + 1, FLOOR(COUNT(`sid`) / %d) ) AS `max_page_no` FROM `%s`.`tb_customer_%s` WHERE 1=1", countPerPage, countPerPage, countPerPage, countPerPage, db_name, storeId));
		    if (keyword != null && keyword.length() > 0) {
			    query.append(String.format(" AND (`customer_id` LIKE ? OR `first_name` LIKE ? OR `last_name` LIKE ?)"));
				mPreparedStatementParams.set(keyword);
				mPreparedStatementParams.set(keyword);
				mPreparedStatementParams.set(keyword);
		    }
		    query.append(String.format(" ) AS `total` ON `list`.`rnum`=`total`.`first_row`"));
		    query.append(String.format(" LIMIT %d,%d", (currPageNo>0)?(currPageNo - 1)*countPerPage:0*countPerPage, countPerPage));
		    out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));
		    
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>