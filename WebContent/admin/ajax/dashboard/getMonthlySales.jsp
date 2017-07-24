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
		
		String storeId = MyRequestUtil.getString(request, "storeId", null);
		
		Calendar c = null;
		
		int nowMonth = MyRequestUtil.getInt(request, "nowMonth", 0);
        int nowYear = MyRequestUtil.getInt(request, "nowYear", 0);
        int beforeMonth;
        int beforeYear = nowYear-1;
        if(nowMonth == 12) beforeMonth = 1;
        else beforeMonth = nowMonth + 1;
		
		try {
		    if (storeId == null || db_name == null ) {
		        throw new Exception();
		    }
		    
		    if (nowYear < 1 || nowMonth < 1) {
		    	c = Calendar.getInstance();
		    	nowMonth = c.get(Calendar.MONTH) + 1;
		    	nowYear = c.get(Calendar.YEAR);		    	
		    }
		    
		    if (nowMonth == 12) {
		    	beforeMonth = 1;
		    } else {
		    	beforeMonth = nowMonth + 1;
		    }
		    
		    beforeYear = nowYear - 1;
		    
		    query.append(String.format("SELECT `dateset`.*, `data`.* FROM ("));
		    for (int i = beforeMonth; i < 13; i++) {
		    	query.append(String.format("(SELECT '%04d-%02d' AS `year_month`)", beforeYear, i));
		    	if (i >= beforeMonth) {
		    		query.append(" UNION ");
		    	}
		    }
		    for (int j = 1; j <= nowMonth; j++) {
		    	query.append(String.format("(SELECT '%04d-%02d' AS `year_month`)", nowYear, j));
		    	if (j < nowMonth) {
		    		query.append(" UNION ");
		    	}
		    }
		    query.append(String.format(") AS `dateset` LEFT JOIN ("));
		    query.append(String.format("SELECT `a`.`transaction_date`,"));
		    query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type = 0 AND d.`item_type`=0, a.qty, 0)) AS newact_count,"));
		    query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type = 1 AND d.`item_type`=0, a.qty, 0)) AS react_count,"));
		    query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type = 2 AND d.`item_type`=0, a.qty, 0)) AS upgrade_count,"));
		    query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type = 3 AND d.`item_type`=0, a.qty, 0)) AS port_in_count,"));
		    query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type IN (0, 1, 2, 3, 14) AND d.`item_type`=0, a.qty, 0)) AS today_total,"));
		    query.append(String.format(" SUM(IF (a.item_type = 0 AND d.item_type IN (2,3), a.qty, 0)) AS accessory_count,"));
		    query.append(String.format(" SUM(IF (a.item_type = 3, a.qty, 0)) AS payment_count"));
		    query.append(String.format(" FROM ( SELECT `sid`,`item_type`,`transaction_type`,`qty`,DATE_FORMAT(DATE_ADD(`transaction_date`,INTERVAL %s HOUR),'%%Y-%%m') AS `transaction_date`,`item_sid` FROM `%s`.`tb_invoice_items_%s`", timezone_offset, db_name, storeId));
		    query.append(String.format(" WHERE (DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL %s HOUR), '%%Y-%%m') BETWEEN '%04d-%02d' AND '%04d-%02d')", timezone_offset, beforeYear, beforeMonth,nowYear, nowMonth ));
		    query.append(String.format(" ) a LEFT JOIN (SELECT `sid`,`item_type` FROM `%s`.`tb_item_dict_%s`) d ON `a`.`item_sid` = `d`.`sid`", db_name, storeId));
			query.append(String.format(" GROUP BY `a`.`transaction_date` ) AS `data` ON `dateset`.`year_month`=`data`.`transaction_date`; "));
		    
		    out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}
%>