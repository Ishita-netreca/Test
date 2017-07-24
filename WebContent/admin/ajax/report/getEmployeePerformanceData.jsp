<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	int box = MyRequestUtil.getInt(request, "box", 0);
	int accessory = MyRequestUtil.getInt(request, "accessory", 0);
	int payment = MyRequestUtil.getInt(request, "payment", 0);
	
	Calendar c = null;
	
	int beforeMonth = MyRequestUtil.getInt(request, "start_date_month", 0);
    int beforeYear = MyRequestUtil.getInt(request, "start_date_year", 0);
    int nowMonth = MyRequestUtil.getInt(request, "end_date_month", 0);
    int nowYear = MyRequestUtil.getInt(request, "end_date_year", 0);
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

	    
	    if (nowYear < 1 || nowMonth < 1) {
	    	c = Calendar.getInstance();
	    	nowMonth = c.get(Calendar.MONTH) + 1;
	    	nowYear = c.get(Calendar.YEAR);		    	
	    }

		
		// 쿼리 입력
		query.append(String.format("SELECT `a`.`year_month`,`d`.`user_id`,`d`.`disable`"));
		if(box > 0) query.append(String.format(" ,SUM(IF(`a`.`item_type`=0 AND `c`.`item_type`=0,1,0)) AS `box`"));
		if(accessory > 0) query.append(String.format(" ,SUM(IF(`c`.`item_type`>1,`a`.`qty`,0)) AS `accessory`"));
		if(payment > 0) query.append(String.format(" ,SUM(IF(`a`.`item_type`=3,1,0)) AS `payment`"));
		query.append(String.format("  FROM ("));
		query.append(String.format(" SELECT `sid`,`invoice_no`,`item_type`,`item_sid`,DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL %s HOUR),'%%Y-%%m') AS `year_month`,`qty`,`subtotal` FROM `%s`.`tb_invoice_items_%s`", timezone_offset, db_name, store_id));
		query.append(String.format(" WHERE ( DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL %s HOUR),'%%Y-%%m') BETWEEN '%04d-%02d' AND '%04d-%02d' )", timezone_offset, beforeYear, beforeMonth, nowYear, nowMonth));
		query.append(String.format(" ) AS `a` LEFT JOIN ("));
		query.append(String.format(" SELECT `invoice_no`,`emp_id` FROM `%s`.`tb_invoice_%s`", db_name, store_id));
		query.append(String.format(" WHERE ( DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR),'%%Y-%%m') BETWEEN '%04d-%02d' AND '%04d-%02d' )", timezone_offset, beforeYear, beforeMonth, nowYear, nowMonth));
		query.append(String.format(" ) AS `b` ON `a`.`invoice_no`=`b`.`invoice_no` LEFT JOIN ("));
		query.append(String.format(" SELECT `sid`,`item_type` FROM `%s`.`tb_item_dict_%s` ", db_name, store_id));
		query.append(String.format(" ) AS `c` ON `a`.`item_sid`=`c`.`sid` LEFT JOIN ("));
		query.append(String.format(" SELECT `sid`,`user_id`,`disable` FROM `wrp`.`tb_user` "));
		query.append(String.format(" ) AS `d` ON `b`.`emp_id`=`d`.`sid`"));
		query.append(String.format(" GROUP BY `emp_id`,`year_month`"));
		query.append(String.format(" ORDER BY `year_month`"));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>