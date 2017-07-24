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
			query.append(String.format("SELECT `a`.*,IF (`a`.`customer`='-1', 'GUEST', `b`.`cust_id`) AS `cust_id`,`b`.`cust_name`,`b`.`cust_addr`,`c`.`emp_id`,`c`.`emp_name` FROM ("));
			query.append(String.format(" SELECT `invoice_no`,DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR),'%%m/%%d/%%Y %%H:%%i:%%s') AS `date`,`customer`,`emp_id` AS `emp_sid`,`pos_no` FROM `%s`.`tb_invoice_%s` WHERE `invoice_no` IN ('%d')", timezone_offset, db_name, store_id, invoice_no));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`customer_id` AS `cust_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `cust_name`,CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`) AS `cust_addr` FROM `%s`.`tb_customer_%s` WHERE `sid` IN (", db_name, store_id));
			query.append(String.format(" SELECT `customer` FROM `%s`.`tb_invoice_%s` WHERE `invoice_no` IN ('%d')", db_name, store_id, invoice_no));
			query.append(String.format(" )) AS `b` ON `a`.`customer`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`user_id` AS `emp_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `emp_name` FROM `wrp`.`tb_user` WHERE `sid` IN ("));
			query.append(String.format(" SELECT `emp_id` FROM `%s`.`tb_invoice_%s` WHERE `invoice_no` IN ('%d')", db_name, store_id, invoice_no));
			query.append(String.format(" )) AS `c` ON `a`.`emp_sid`=`c`.`sid`"));

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), false));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>