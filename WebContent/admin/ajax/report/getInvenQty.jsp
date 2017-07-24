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
		
		int beforeMonth = MyRequestUtil.getInt(request, "start_date_month", 0);
        int beforeYear = MyRequestUtil.getInt(request, "start_date_year", 0);
        int nowMonth = MyRequestUtil.getInt(request, "end_date_month", 0);
        int nowYear = MyRequestUtil.getInt(request, "end_date_year", 0);

		try {
		    if (storeId == null || db_name == null ) {
		        throw new Exception();
		    }
		    
		    if (nowYear < 1 || nowMonth < 1) {
		    	c = Calendar.getInstance();
		    	nowYear = c.get(Calendar.YEAR);	
		    	beforeYear = c.get(Calendar.YEAR);	
		    }
		    
		    query.append(String.format("SELECT `dateset`.*, `data`.* FROM ("));
		    for(int i = beforeYear; i < nowYear+1; i++) {
			    for (int j = beforeMonth; j < 13; j++) {
			    	
			    	query.append(String.format("(SELECT '%04d-%02d' AS `year_month`)", i, j));
			    	/*
			    	if (j < nowMonth) {
			    		query.append(" UNION ");
			    	}
			    	*/
			    	if (i == nowYear) {
			    		if (j < nowMonth){	query.append(" UNION ");}
			    		else	break;
			    	}else if(i < nowYear) {
			    		query.append(" UNION ");
			    	};
			    	
			    		
			    }
			    beforeMonth = 1;
		    }
		    query.append(String.format(") AS `dateset` LEFT JOIN ("));
		    query.append(String.format("SELECT `a`.`transaction_date`,"));
		    query.append(String.format(" SUM(IF (a.item_type = 0 AND d.`item_type`=0, item_cost, 0)) AS box_cost,"));
		    query.append(String.format(" SUM(IF (d.item_type IN (2,3), a.item_cost, 0)) AS accessory_cost,"));
		    query.append(String.format(" SUM(IF (a.item_type = 3, item_cost, 0)) AS payment_cost"));
		    query.append(String.format(" FROM ( SELECT `sid`,`item_type`,`transaction_type`,`item_cost`,DATE_FORMAT(DATE_ADD(`transaction_date`,INTERVAL %s HOUR),'%%Y-%%m') AS `transaction_date`,`item_sid` FROM `%s`.`tb_invoice_items_%s`", timezone_offset, db_name, storeId));
		    query.append(String.format(" WHERE (DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL %s HOUR), '%%Y-%%m') BETWEEN '%04d-%02d' AND '%04d-%02d')", timezone_offset, beforeYear, beforeMonth,nowYear, nowMonth ));
		    query.append(String.format(" ) a LEFT JOIN (SELECT `sid`,`item_type` FROM `%s`.`tb_item_dict_%s`) d ON `a`.`item_sid` = `d`.`sid`", db_name, storeId));
			query.append(String.format(" GROUP BY `a`.`transaction_date` ) AS `data` ON `dateset`.`year_month`=`data`.`transaction_date`; "));
		    out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}
%>