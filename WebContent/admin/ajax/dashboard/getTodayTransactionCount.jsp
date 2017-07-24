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
	int year = MyRequestUtil.getInt(request, "year", 0);
	int month = MyRequestUtil.getInt(request, "month", 0);
	int date = MyRequestUtil.getInt(request, "date", 0);
	
	Calendar mCalendar = null;

	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }
	    
	    if (year < 1900 || month < 1 || month > 12 || date < 1 || date > 31) {
	    	mCalendar = Calendar.getInstance();
	    	if (year < 1900) year = mCalendar.get(Calendar.YEAR);
	    	if (month < 1 || month > 12) month = mCalendar.get(Calendar.MONTH) + 1;
	    	if (date < 1 || date > 31) date = mCalendar.get(Calendar.DATE);
	    }
		
		// 쿼리 입력
		query.append(String.format("SELECT SUM(IF ((a.item_type = 0 AND a.transaction_type IN (0, 3, 12) AND d.`item_type`=0) OR (a.item_type = 0 AND `a`.`transaction_type` IN(4, 7, 13) AND `a`.`inventory_sid`=0), a.qty, 0)) AS newact_count,"));
		query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type IN (5) AND `a`.`inventory_sid`=0, a.qty, 0)) AS react_count,"));
		query.append(String.format(" SUM(IF ((a.item_type = 0 AND a.transaction_type IN (2) AND d.`item_type`=0) OR (a.item_type = 0 AND `a`.`transaction_type` IN(6) AND `a`.`inventory_sid`=0), a.qty, 0)) AS upgrade_count,"));
		query.append(String.format(" SUM(IF ((a.item_type = 0 AND a.transaction_type IN (3) AND d.`item_type`=0) OR (a.item_type = 0 AND `a`.`transaction_type` IN(7) AND `a`.`inventory_sid`=0), a.qty, 0)) AS port_in_count,"));
		query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type IN (14) AND d.`item_type`=0, a.qty, 0)) AS sor_count,"));
		query.append(String.format(" SUM(IF (a.item_type = 0 AND a.transaction_type IN (0, 1, 2, 3, 12, 14) AND d.`item_type`=0, a.qty, 0)) AS today_total,"));
		query.append(String.format(" SUM(IF (d.item_type IN (2,3), a.qty, 0)) AS accessory_count,"));
		query.append(String.format(" SUM(IF (a.item_type = 3, a.qty, 0)) AS payment_count "));
		query.append(String.format("FROM `%s`.`tb_invoice_items_%s` a ", db_name, store_id));
		query.append(String.format("LEFT JOIN (SELECT `sid`,`item_type` FROM `%s`.`tb_item_dict_%s`) d ON `a`.`item_sid` = `d`.`sid` ", db_name, store_id));
		query.append(String.format("WHERE DATE_FORMAT(DATE_ADD(`a`.`transaction_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y')='%02d/%02d/%04d';",timezone_offset,month,date,year ));
		
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
         out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), false));

	} catch (Exception e) {		
        if (e.getMessage() != null && e.getMessage().length() > 0) {
  			e.printStackTrace();
        }
	}
	
	mCalendar = null;
	query = null;
	store_id = null;
	user_sid = null;
	db_name = null;
	
	timezone_offset = null;
	year = 0;
	month = 0;
	date = 0;
%>