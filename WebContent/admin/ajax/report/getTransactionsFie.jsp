<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "storeId", null);
	
	String start_date = MyRequestUtil.getString(request, "start_date", null);
	String end_date = MyRequestUtil.getString(request, "end_date", null);
	
	try {
	    if (store_id == null || db_name == null ) {
	        throw new Exception();
	    }
		// 쿼리 입력
		query.append(String.format("SELECT SUM(a.item_cost) as qty, a.item_type AS TYPE, b.item_type FROM (SELECT * FROM `%s`.`tb_invoice_items_%s`) a LEFT JOIN (SELECT * FROM `%s`.tb_item_dict_%s) AS b ON a.item_sid=b.sid WHERE a.item_type=0 AND b.item_type =0 AND a.transaction_date BETWEEN '%s' AND '%s' GROUP BY a.item_type ", db_name, store_id, db_name, store_id, start_date, end_date));
		query.append(String.format("UNION SELECT SUM(a.item_cost) as qty, a.item_type AS TYPE, b.item_type FROM (SELECT * FROM `%s`.`tb_invoice_items_%s`) a LEFT JOIN (SELECT * FROM `%s`.tb_item_dict_%s) AS b ON a.item_sid=b.sid WHERE a.item_type=0 AND b.item_type IN (2,3) AND a.transaction_date BETWEEN '%s' AND '%s' GROUP BY a.item_type  ", db_name, store_id, db_name, store_id, start_date, end_date));
		query.append(String.format("UNION SELECT SUM(a.cost) as qty,a.item_type AS TYPE, b.item_type FROM (SELECT c.*, d.amount AS cost FROM `%s`.`tb_invoice_items_%s` as c, `%s`.`tb_invoice_%s` as d WHERE c.invoice_no = d.invoice_no) a LEFT JOIN (SELECT * FROM %s.tb_item_dict_%s) AS b ON a.item_sid=b.sid WHERE a.item_type=3 AND a.transaction_date BETWEEN '%s' AND '%s' GROUP BY a.item_type  ", db_name, store_id, db_name, store_id, db_name, store_id, start_date, end_date));
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
           out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

	} catch (Exception e) {
		
		
           if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
           }
	}
	query = null;
%>