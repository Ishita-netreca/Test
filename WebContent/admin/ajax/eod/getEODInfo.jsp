<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%

		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String eodDate = MyRequestUtil.getString(request, "eodDate", null);
		int posNo = MyRequestUtil.getInt(request, "posNo", 0);

		try {
		    if (storeId == null || eodDate == null || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `a`.*,`b`.`new_activation_count`,`c`.`re_activation_count`,`d`.`upgrade_count` FROM ( "));
			query.append(String.format("SELECT DATE_FORMAT(DATE_ADD(`eod_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `eod_date`,",timezone_offset.toString()));
			query.append(String.format("`cash_count_100`,`cash_count_50`,`cash_count_20`,`cash_count_10`,`cash_count_5`,`cash_count_2`,`cash_count_1`,`cash_count_0.25`,`cash_count_0.10`,`cash_count_0.05`,`cash_count_0.01`,`coin_count_1`,`coin_count_0.5`,`roll_count_0.25`,`roll_count_0.10`,`roll_count_0.05`,`roll_count_0.01`,"));
			query.append(String.format("`cash_sales_amount`,`cash_refund_amount`,`cash_floating_amount`,`cash_actual_amount`,`check_sales_amount`,`check_refund_amount`,`check_floating_amount`,`check_actual_amount`,"));
			query.append(String.format("`cash_out_amount`,`cash_out_actual_amount`,`expense_amount`,`expense_actual_amount`,"));
			query.append(String.format("`credit_sales_amount`,`credit_refund_amount`,`credit_actual_amount`,`debit_sales_amount`,`debit_refund_amount`,`debit_actual_amount`,"));
			query.append(String.format("`finance_sales_amount`,`finance_refund_amount`,`finance_actual_amount`,`credit_memo_sales_amount`,`credit_memo_refund_amount`,`credit_memo_actual_amount`,`qpay_sales_amount`,`qpay_refund_amount`,`qpay_actual_amount`,"));
			query.append(String.format("`eod_note`,`updater`,`pos_no` FROM `%s`.`tb_eod_%s` WHERE DATE_FORMAT(DATE_ADD(`eod_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y')='%s' AND `pos_no`=%d", db_name, storeId,timezone_offset.toString(), eodDate, posNo));
			query.append(String.format(") AS `a`"));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(DATE_ADD(NOW(), INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `date`, COUNT(`sid`) AS `new_activation_count` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN ('0','4') AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE DATE_FORMAT(`date`,'%%m/%%d/%%Y')='%s') AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0') )) ) AS `b` ON `a`.`eod_date`=`b`.`date`", timezone_offset.toString(),db_name, storeId, db_name, storeId, eodDate, db_name, storeId, db_name, storeId));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(DATE_ADD(NOW(), INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `date`, COUNT(`sid`) AS `re_activation_count` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN ('1','5') AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE DATE_FORMAT(`date`,'%%m/%%d/%%Y')='%s') AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0') )) ) AS `c` ON `a`.`eod_date`=`c`.`date`", timezone_offset.toString(),db_name, storeId, db_name, storeId, eodDate, db_name, storeId, db_name, storeId));
			query.append(String.format("LEFT JOIN (SELECT DATE_FORMAT(DATE_ADD(NOW(), INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `date`, COUNT(`sid`) AS `upgrade_count` FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN ('2','6') AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE DATE_FORMAT(`date`,'%%m/%%d/%%Y')='%s') AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0') )) ) AS `d` ON `a`.`eod_date`=`d`.`date`", timezone_offset.toString(),db_name, storeId, db_name, storeId, eodDate, db_name, storeId, db_name, storeId));
			
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), false));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>