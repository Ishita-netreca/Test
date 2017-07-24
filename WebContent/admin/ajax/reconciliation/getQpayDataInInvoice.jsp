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
		
		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);
		String table = MyRequestUtil.getString(request, "table", null);
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			
			// 쿼리 입력
			/*
			query.append(String.format("SELECT d.transaction_type, c.total_features_data_plan_amount, rate_plan.total_primary_rate_plan_amount, invoice.serial_no AS esn, invoice.*, d.rate_plan_amount, d.bolt_on_amount, d.transaction_amount  "));
			query.append(String.format("FROM (SELECT * FROM master_iig.`tb_invoice_items_pca025` WHERE serial_no != ' '"));
			query.append(String.format("AND (DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL -8 HOUR), '%%m/%%d/%%Y') BETWEEN '02/01/2017' AND '02/28/2017') "));
			query.append(String.format("GROUP BY `serial_no`) AS invoice LEFT JOIN "));
			query.append(String.format("(SELECT `serial_no`, SUM(`subtotal`) AS `total_primary_rate_plan_amount` FROM `master_iig`.`tb_invoice_items_PCA025` "));
			query.append(String.format("WHERE `serial_no` IS NOT NULL AND `item_type` IN ('2') GROUP BY `serial_no`) AS rate_plan ON invoice.serial_no = rate_plan.serial_no"));
			query.append(String.format(" LEFT JOIN ( SELECT `serial_no`, SUM(`subtotal`) AS `total_features_data_plan_amount` "));
			query.append(String.format(" FROM `master_iig`.`tb_invoice_items_PCA025` WHERE `serial_no` IS NOT NULL AND `item_type` IN ('2') "));
			query.append(String.format(" AND `rateplan_type` IN ('1') GROUP BY `serial_no`) AS `c` ON `invoice`.`serial_no`=`c`.`serial_no` "));
			
			
			query.append(String.format(" LEFT JOIN (SELECT * FROM `master_iig`.`tb_reconciliation_qualified` WHERE 1=1 AND "));
			query.append(String.format("`door_code` IN (SELECT `door_code` FROM `master_iig`.`tb_stores` WHERE `store_id` IN ('pca025')) AND `transaction_date` BETWEEN STR_TO_DATE('2/1/2017','%%m/%%d/%%Y') AND STR_TO_DATE('2/28/2017','%%m/%%d/%%Y') ORDER BY `transaction_date`) AS d"));
			query.append(String.format(" ON `invoice`.`serial_no`=`d`.`esn` "));
			*/
			query.append(String.format("SELECT DATE_FORMAT(b.`date/time`, '%%m-%%d-%%Y') AS `date/time`, a.*, b.* FROM (SELECT * FROM %s.`tb_invoice_%s` ", db_name, store_id));
			query.append(String.format("WHERE DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%Y-%%m-%%d') BETWEEN '%s' AND '%s' ) a ", timezone_offset,search_start_date, search_end_date));
			query.append(String.format("LEFT JOIN (SELECT * FROM %s.`tb_reconciliation_qpay` WHERE DATE_FORMAT(DATE_ADD(`date/time`, INTERVAL %s HOUR), '%%Y-%%m-%%d') BETWEEN '%s' AND '%s') b ", db_name, timezone_offset,search_start_date, search_end_date));
			query.append(String.format("ON a.qpay_id = b.confirmation_id WHERE b.confirmation_id IS NOT NULL;"));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
			
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>