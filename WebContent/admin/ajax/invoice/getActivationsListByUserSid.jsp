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
		int userSid = MyRequestUtil.getInt(request, "userSid", 0);
		String transactionType = MyRequestUtil.getString(request, "transactionType", null); // Comma(,)로 구분
		String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);

		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || userSid < 1 || db_name == null) {
		        throw new Exception();
		    }
			mPreparedStatementParams = new PreparedStatementParams();

			query.append(String.format("SELECT DATE_FORMAT(DATE_ADD(`abc`.date, INTERVAL %s HOUR), '%%m/%%d/%%Y %%H:%%i:%%s') as date, `abc`.*, IF(`d`.`customer_name` IS NOT NULL, `d`.`customer_name`, 'GUEST') AS `customer_name` FROM (", timezone_offset.toString()));
            query.append(String.format("SELECT `a`.*, `bc`.`sku` FROM ("));
            query.append(String.format("SELECT `_a`.`invoice_no` AS `invoiceNo`,`_a`.`name`,`_a`.`inventory_sid`,`_a`.`serial_no` AS `serialNo`,`_a`.`transaction_type` AS `transactionType`,`_a`.`promotion_type`,`_a`.`mobile_no`,`a_`.`customer`,`a_`.`date` FROM ("));
            if (transactionType != null && transactionType.length() > 0) {
                query.append(String.format("SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IN (?) AND `item_type`='0' AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id`='%d')", db_name, storeId, db_name, storeId, userSid));
				mPreparedStatementParams.set(transactionType);
            } else {
                query.append(String.format("SELECT * FROM `%s`.`tb_invoice_items_%s` WHERE `transaction_type` IS NOT NULL AND `item_type`='0' AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id`='%d')", db_name, storeId, db_name, storeId, userSid));
            }
            query.append(String.format(") AS `_a` LEFT JOIN ("));
            query.append(String.format("SELECT `invoice_no`,`customer`,`date` FROM `%s`.`tb_invoice_%s` WHERE `emp_id`='%d'", db_name, storeId, userSid));
            query.append(String.format(") AS `a_` ON `_a`.`invoice_no`=`a_`.`invoice_no`"));
            query.append(String.format(") AS `a` RIGHT JOIN ("));
            query.append(String.format("SELECT `b`.`sku`,`c`.`sid` FROM ("));
            query.append(String.format("SELECT * FROM `%s`.`tb_item_dict_%s` WHERE `item_type`='0'", db_name, storeId));
            query.append(String.format(") AS `b` LEFT JOIN ("));
            query.append(String.format("SELECT * FROM `%s`.`tb_inventory_%s` WHERE `serial_no` IS NOT NULL", db_name, storeId));
            query.append(String.format(") AS `c` ON `b`.`sid`=`c`.`item_sid`"));
            query.append(String.format(") AS `bc` ON `a`.`inventory_sid`=`bc`.`sid`"));
            query.append(String.format(") AS `abc` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,IF(`middle_name` IS NOT NULL && `middle_name` != '', CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`), CONCAT(`first_name`,' ',`last_name`)) AS `customer_name` FROM `%s`.`tb_customer_%s`", db_name, storeId));
            query.append(String.format(") AS `d` ON `abc`.`customer`=`d`.`sid` WHERE `invoiceNo` IS NOT NULL"));
			
            if (startDate != null && endDate != null) {
            	query.append(String.format(" AND (DATE(DATE_ADD(`abc`.`date`, INTERVAL %s HOUR)) BETWEEN ? AND ?)", timezone_offset.toString()));
				mPreparedStatementParams.set(startDate);
				mPreparedStatementParams.set(endDate);
			}

            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>