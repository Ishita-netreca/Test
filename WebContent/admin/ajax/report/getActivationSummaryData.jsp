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
		String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);
		int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
		int empSid = MyRequestUtil.getInt(request, "empSid", 0);

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }
		    
		    if (customerSid < 1) customerSid = 0;
		    if (empSid < 1) empSid = 0;

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `transaction_type`, COUNT(`invoice_no`) AS `count` "));
			query.append(String.format("FROM `%s`.`tb_invoice_items_%s` ", db_name, storeId));
			query.append(String.format("WHERE `invoice_no` IN ("));
			query.append(String.format(" SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` ", db_name, storeId));
			query.append(String.format(" WHERE `transaction_type` IN ('0','1','2','4','5','6','12','13','14') "));
			if (startDate != null && startDate.length() > 0 && endDate != null && endDate.length() > 0){
				query.append(String.format(" AND (`date` BETWEEN STR_TO_DATE('%s','%%m/%%d/%%Y') AND STR_TO_DATE('%s','%%m/%%d/%%Y')) ", startDate, endDate));
			}
			if (customerSid > 0) {
				query.append(String.format(" AND `customer`='%d'", customerSid));
			}
			if (empSid > 0) {
				query.append(String.format(" AND `emp_id`='%d'", empSid));
			}
			query.append(String.format(") "));
			query.append(String.format("AND `inventory_sid` IN ("));
			query.append(String.format(" SELECT `sid` AS `inventory_sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (", db_name, storeId));
			query.append(String.format(" SELECT `sid` AS `item_sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0') ", db_name, storeId));
			query.append(String.format(" ) "));
			query.append(String.format(") GROUP BY `transaction_type`"));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"transaction_type\":%d,", rs.getInt("transaction_type")));
				sb.append(String.format("\"count\":%d,", rs.getInt("count")));
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