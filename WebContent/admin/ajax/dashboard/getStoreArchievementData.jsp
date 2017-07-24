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

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		int year = MyRequestUtil.getInt(request, "year", 0);
		int month = MyRequestUtil.getInt(request, "month", 0);
		
		try {
		    if (db_name == null || store_id == null || year < 1 || month < 1) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("(SELECT 'boxSales' AS `title`, COUNT(`sid`) AS `count` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
			query.append(String.format(" WHERE `item_type` IN (0) AND `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0))", db_name, store_id));
			query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL %s HOUR), '%%m/%%Y')='%02d/%d'", timezone_offset, month, year));
			query.append(String.format(" ) UNION ("));
			query.append(String.format(" SELECT 'accSales' AS `title`, COUNT(`sid`) AS `count` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
			query.append(String.format(" WHERE `item_type` IN (0) AND `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (2, 3))", db_name, store_id));
			query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL %s HOUR), '%%m/%%Y')='%02d/%d'", timezone_offset, month, year));
			query.append(String.format(" ) UNION ("));
			query.append(String.format(" SELECT 'moreThan50MRCNew' AS `title`, COUNT(`sid`) AS `count` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
			query.append(String.format(" WHERE `transaction_type` IN (0,4) AND `item_type` IN (2) AND `subtotal` >= '50' "));
			query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`transaction_date`, INTERVAL %s HOUR), '%%m/%%Y')='%02d/%d'", timezone_offset, month, year));
			query.append(String.format(" )"));


			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":{");

			while(rs.next()) {
                if (rs.getString("title") != null) {
                    sb.append(String.format("\"%s\":%d,", rs.getString("title"), rs.getInt("count")));
                }
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

            query.delete(0, query.length());

            stmt = conn.createStatement();

            query.append(String.format("SELECT * FROM `%s`.`tb_store_archievement_%s` WHERE `year`='%d' AND `month`='%d'",
            		db_name, store_id,               year,               month
            ));

			rs = stmt.executeQuery(query.toString());

			if(rs.next()) {
			    sb.append(String.format("\"boxSalesGoal\":%d,", rs.getInt("box_sales_goal")));
			    sb.append(String.format("\"accSalesGoal\":%d,", rs.getInt("accessory_goal")));
			    sb.append(String.format("\"moreThan50MRCNewGoal\":%d,", rs.getInt("more_than_50_mrc_new_goal")));
			}

			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);

			sb.append("}}");

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
		sb = null;
%>