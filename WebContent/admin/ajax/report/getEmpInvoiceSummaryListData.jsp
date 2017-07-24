<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int empSid = MyRequestUtil.getInt(request,"empSid",0);
		int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
		String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
		    
		    if (empSid < 0) empSid = 0;
		    if (customerSid < 0) customerSid = 0;

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `a`.*,`b`.`cash_pay_amount`,`c`.`credit_pay_amount`,`d`.`debit_pay_amount`,`e`.`check_pay_amount`,`f`.`emp_name`,IF(`a`.`customer` = -1, 'GUEST', `g`.`cust_name`) AS `cust_name` FROM ("));
			query.append(String.format(" SELECT `invoice_no`,DATE_FORMAT(`date`, '%%m/%%d/%%Y') AS `date`,`customer`,`emp_id` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name, storeId, empSid));
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d')", empSid));
			}
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND (DATE_FORMAT(`date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			if (customerSid > 0) {
				query.append(String.format(" AND `customer` IN ('%d')", customerSid));
			}
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN ( "));
			query.append(String.format(" SELECT `invoice_no`,`type`,SUM(`amount`) AS `cash_pay_amount` FROM `%s`.`tb_checkout_items_%s` WHERE `type` IN ('0') ", db_name, storeId));
			query.append(String.format(" AND `invoice_no` IN ( "));
			query.append(String.format(" SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name, storeId));
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d') ", empSid));
			}
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND (DATE_FORMAT(`date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			query.append(String.format(" ) GROUP BY `invoice_no` ) AS `b` ON `a`.`invoice_no`=`b`.`invoice_no`"));
			query.append(String.format(" LEFT JOIN ( "));
			query.append(String.format(" SELECT `invoice_no`,`type`,SUM(`amount`) AS `credit_pay_amount` FROM `%s`.`tb_checkout_items_%s` WHERE `type` IN ('1') ", db_name, storeId));
			query.append(String.format(" AND `invoice_no` IN ( "));
			query.append(String.format(" SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name, storeId));
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d') ", empSid));
			}
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND (DATE_FORMAT(`date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			query.append(String.format(" ) GROUP BY `invoice_no` ) AS `c` ON `a`.`invoice_no`=`c`.`invoice_no`"));
			query.append(String.format(" LEFT JOIN ( "));
			query.append(String.format(" SELECT `invoice_no`,`type`,SUM(`amount`) AS `debit_pay_amount` FROM `%s`.`tb_checkout_items_%s` WHERE `type` IN ('2') ", db_name, storeId));
			query.append(String.format(" AND `invoice_no` IN ( "));
			query.append(String.format(" SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name, storeId));
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d') ", empSid));
			}
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND (DATE_FORMAT(`date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			query.append(String.format(" ) GROUP BY `invoice_no` ) AS `d` ON `a`.`invoice_no`=`d`.`invoice_no`"));
			query.append(String.format(" LEFT JOIN ( "));
			query.append(String.format(" SELECT `invoice_no`,`type`,SUM(`amount`) AS `check_pay_amount` FROM `%s`.`tb_checkout_items_%s` WHERE `type` IN ('4') ", db_name, storeId));
			query.append(String.format(" AND `invoice_no` IN ( "));
			query.append(String.format(" SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE 1=1", db_name, storeId));
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id` IN ('%d') ", empSid));
			}
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0) {
				query.append(String.format(" AND (DATE_FORMAT(`date`,'%%m/%%d/%%Y') BETWEEN '%s' AND '%s' )", startDate, endDate));
			}
			query.append(String.format(" ) GROUP BY `invoice_no` ) AS `e` ON `a`.`invoice_no`=`e`.`invoice_no`"));
			query.append(String.format(" LEFT JOIN ( SELECT `sid` AS `user_sid`, CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `emp_name` FROM `wrp`.`tb_user`"));
			if (empSid > 0) {
				query.append(String.format(" WHERE `sid` IN ('%d')", empSid)); 
			}
			query.append(String.format(" ) AS `f` ON `a`.`emp_id`=`f`.`user_sid`"));
			query.append(String.format(" LEFT JOIN ( SELECT `sid` AS `cust_sid`, CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `cust_name` FROM `%s`.`tb_customer_%s`", db_name, storeId));
			if (customerSid > 0) {
				query.append(String.format(" WHERE `sid` IN ('%d')", customerSid));
			}
			query.append(String.format(" ) AS `g` ON `a`.`customer`=`g`.`cust_sid`"));
			query.append(String.format(" ORDER BY `date`,`invoice_no`"));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"invoice_no\":%d,", rs.getInt("invoice_no")));
				if (rs.getString("emp_name") != null) sb.append(String.format("\"emp_name\":\"%s\",", rs.getString("emp_name")));
				if (rs.getString("cust_name") != null) sb.append(String.format("\"cust_name\":\"%s\",", rs.getString("cust_name")));
				if (rs.getString("date") != null) sb.append(String.format("\"date\":\"%s\",", rs.getString("date")));
				sb.append(String.format("\"cash_pay_amount\":%f,", rs.getFloat("cash_pay_amount")));
				sb.append(String.format("\"credit_pay_amount\":%f,", rs.getFloat("credit_pay_amount")));
				sb.append(String.format("\"debit_pay_amount\":%f,", rs.getFloat("debit_pay_amount")));
				sb.append(String.format("\"check_pay_amount\":%f,", rs.getFloat("check_pay_amount")));
				if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
				sb.append("},");
			}

			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);

			sb.append("]}");

            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }
            try {
                if (stmt != null && !stmt.isClosed()) {
                    stmt.close();
                }
            } catch (Exception e2) {

            }
            try {
                if (conn != null && !conn.isClosed()) {
                    conn.close();
                }
            } catch (Exception e2) {

            }

            out.print(sb.toString());

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

			try {
				if (rs != null && !rs.isClosed()) {
					rs.close();
				}
			} catch (Exception e2) {

			}
			try {
				if (stmt != null && !stmt.isClosed()) {
					stmt.close();
				}
			} catch (Exception e2) {

			}
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (Exception e2) {

			}
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		query = null;
		sb = null;
%>