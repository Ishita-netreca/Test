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
		int invoice_no = MyRequestUtil.getInt(request, "invoice_no", 0);

		try {
		    if (store_id == null || db_name == null || invoice_no < 1) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			query.append(String.format("SELECT `invoice_items`.* FROM ("));
			// Handset & Other Items (row_type 1, 2)
			query.append(String.format(" ( SELECT `a`.`sid`,`a`.`item_type`,IF(`b`.`item_type` IN (0), 1, 2) AS `row_type`,`a`.`inventory_sid`,NULL AS `payment_index`,`a`.`item_sid`,`a`.`serial_no`,`a`.`qty`,`a`.`discount`,"));
			query.append(String.format(" `a`.`tax_rate`,NULL AS `fee_sid`,NULL AS `fee_type`,`a`.`transaction_type`,NULL AS `rateplan_code`,`a`.`name` AS `description`,`a`.`amount` AS `price`,`a`.`subtotal` AS `sub_total`,"));
			query.append(String.format(" `a`.`mobile_no`,`a`.`promotion_item_sid`,`a`.`promotion_description`,`a`.`promotion_price`,"));
			query.append(String.format(" `a`.`coupon_code`,`a`.`coupon_name`,`a`.`coupon_discount`,"));
			query.append(String.format(" `a`.`tax_amnt`,`a`.`loan_flag`,NULL AS `fee_amnt`,`b`.`item_code`,"));
			query.append(String.format(" NULL AS `qpay_id`,NULL AS `qpay_account`,NULL AS `qpay_due_date`,NULL AS `qpay_customer_name`,NULL AS `qpay_next_due_date`,NULL AS `product_code`,NULL AS `pin` FROM ("));
			query.append(String.format(" SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `invoice_no` IN (%d) AND `item_type` IN (0,4,6,7,10)", db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `a` LEFT JOIN ( SELECT `sid`,`item_type`,`item_code` FROM `%s`.`tb_item_dict_%s` ) AS `b` ON `a`.`item_sid`=`b`.`sid` )", db_name, store_id));
			// Payment (row_type 3)
			query.append(String.format(" UNION ( SELECT `a`.`sid`,`a`.`item_type`,3 AS `row_type`,NULL AS `inventory_sid`,NULL AS `payment_index`,NULL AS `item_sid`,`a`.`serial_no`,`a`.`qty`,`a`.`discount`,"));
			query.append(String.format(" `a`.`tax_rate`,NULL AS `fee_sid`,NULL AS `fee_type`,`a`.`transaction_type`,NULL AS `rateplan_code`,`a`.`name` AS `description`,`a`.`amount` AS `price`,`a`.`subtotal` AS `sub_total`,"));
			query.append(String.format(" `a`.`mobile_no`,NULL AS `promotion_item_sid`,NULL AS `promotion_description`,NULL AS `promotion_price`,"));
			query.append(String.format(" NULL AS `coupon_code`,NULL AS `coupon_name`,NULL AS `coupon_discount`,"));
			query.append(String.format(" `a`.`tax_amnt`,`a`.`loan_flag`,`a`.`fee_amnt`,IF(`a`.`item_type` IN (3), 'PAYMENT', 'RETURN PAYMENT') AS `item_code`,"));
			query.append(String.format(" `b`.`qpay_id`,`b`.`qpay_account`,`b`.`qpay_due_date`,`b`.`qpay_customer_name`,`b`.`qpay_next_due_date`,NULL AS `product_code`,NULL AS `pin` FROM ("));
			query.append(String.format(" SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `invoice_no` IN (%d) AND `item_type` IN (3,5)", db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `a` LEFT JOIN ("));
			query.append(String.format(" SELECT `invoice_no`,`qpay_id`,`qpay_account`,`qpay_due_date`,`qpay_customer_name`,`qpay_next_due_date` FROM `%s`.`tb_invoice_%s` WHERE `invoice_no` IN (%d)", db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `b` ON `a`.`invoice_no`=`b`.`invoice_no` )"));
			query.append(String.format(" UNION ( SELECT `a`.`sid`,`a`.`item_type`,4 AS `row_type`,NULL AS `inventory_sid`,NULL AS `payment_index`,NULL AS `item_sid`,NULL AS `serial_no`,`a`.`qty`,`a`.`discount`,"));
			query.append(String.format(" `a`.`tax_rate`,`a`.`fee_sid`,`a`.`fee_type`,`a`.`transaction_type`,NULL AS `rateplan_code`,`a`.`name` AS `description`,`a`.`amount` AS `price`,`a`.`subtotal` AS `sub_total`,"));
			query.append(String.format(" NULL AS `mobile_no`,NULL AS `promotion_item_sid`,NULL AS `promotion_description`,NULL AS `promotion_price`,"));
			query.append(String.format(" NULL AS `coupon_code`,NULL AS `coupon_name`,NULL AS `coupon_discount`,"));
			query.append(String.format(" `a`.`tax_amnt`,`a`.`loan_flag`,NULL AS `fee_amnt`,'FEE' AS `item_code`,"));
			// Fee (row_type 4)
			query.append(String.format(" NULL AS `qpay_id`,NULL AS `qpay_account`,NULL AS `qpay_due_date`,NULL AS `qpay_customer_name`,NULL AS `qpay_next_due_date`,NULL AS `product_code`,NULL AS `pin` FROM ("));
			query.append(String.format(" SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `invoice_no` IN (%d) AND `item_type` IN (1)", db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `a` )"));
			// QPay Items (row_type 5)
			query.append(String.format(" UNION ( SELECT `a`.`sid`,`a`.`item_type`,5 AS `row_type`,NULL AS `inventory_sid`,NULL AS `payment_index`,NULL AS `item_sid`,`a`.`serial_no`,`a`.`qty`,`a`.`discount`,"));
			query.append(String.format(" `a`.`tax_rate`,NULL AS `fee_sid`,NULL AS `fee_type`,`a`.`transaction_type`,NULL AS `rateplan_code`,`a`.`name` AS `description`,`a`.`amount` AS `price`,`a`.`subtotal` AS `sub_total`,"));
			query.append(String.format(" `a`.`mobile_no`,NULL AS `promotion_item_sid`,NULL AS `promotion_description`,NULL AS `promotion_price`,"));
			query.append(String.format(" NULL AS `coupon_code`,NULL AS `coupon_name`,NULL AS `coupon_discount`,"));
			query.append(String.format(" `a`.`tax_amnt`,`a`.`loan_flag`,`a`.`fee_amnt`,`a`.`rateplan_code` AS `item_code`,"));
			query.append(String.format(" NULL AS `qpay_id`,NULL AS `qpay_account`,NULL AS `qpay_due_date`,NULL AS `qpay_customer_name`,NULL AS `qpay_next_due_date`,`a`.`rateplan_type` AS `product_code`,`c`.`pin` FROM ("));
			query.append(String.format(" SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `invoice_no` IN (%d) AND `item_type` IN (8,9)", db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `a` LEFT JOIN ("));
			query.append(String.format(" SELECT `invoice_no`,`qpay_id`,`qpay_account`,`qpay_due_date`,`qpay_customer_name`,`qpay_next_due_date` FROM `%s`.`tb_invoice_%s` WHERE `invoice_no` IN (%d)", db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `b` ON `a`.`invoice_no`=`b`.`invoice_no` LEFT JOIN ("));
			query.append(String.format(" SELECT `confirmation_id`,`product_code` AS `pin` FROM `%s`.`tb_incomm_payment_results_%s`", db_name, store_id));
			query.append(String.format(" ) AS `c` ON `b`.`qpay_id`=`c`.`confirmation_id` )"));
			// Rateplans
			query.append(String.format(" UNION ( SELECT `a`.`sid`,`a`.`item_type`,NULL AS `row_type`,NULL AS `inventory_sid`,`a`.`inventory_sid` As `payment_index`,NULL AS `item_sid`,`a`.`serial_no`,`a`.`qty`,`a`.`discount`,"));
			query.append(String.format(" `a`.`tax_rate`,NULL AS `fee_sid`,NULL AS `fee_type`,`a`.`transaction_type`,`a`.`rateplan_code`,`a`.`name` AS `description`,`a`.`amount` AS `price`,`a`.`subtotal` AS `sub_total`,"));
			query.append(String.format(" `a`.`mobile_no`,NULL AS `promotion_item_sid`,NULL AS `promotion_description`,NULL AS `promotion_price`,"));
			query.append(String.format(" NULL AS `coupon_code`,NULL AS `coupon_name`,NULL AS `coupon_discount`,"));
			query.append(String.format(" `a`.`tax_amnt`,`a`.`loan_flag`,`a`.`fee_amnt`,`a`.`rateplan_code` AS `item_code`,"));
			query.append(String.format(" NULL AS `qpay_id`,NULL AS `qpay_account`,NULL AS `qpay_due_date`,NULL AS `qpay_customer_name`,NULL AS `qpay_next_due_date`,NULL AS `product_code`,NULL AS `pin` FROM ("));
			query.append(String.format(" SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `invoice_no` IN (%d) AND `item_type` IN (2)", db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `a` )"));
			query.append(String.format(" ) AS `invoice_items` ORDER BY `invoice_items`.`sid`;"));

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>