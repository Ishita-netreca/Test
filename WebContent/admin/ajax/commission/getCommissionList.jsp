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

		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format(" (SELECT '0' AS `sid`,'-1' AS `parent_sid`,'Products' AS `name`)"));
			query.append(String.format(" UNION"));
			query.append(String.format(" (SELECT '1' AS `sid`,'-1' AS `parent_sid`,'Primary Plans' AS `name`) "));
			query.append(String.format(" UNION"));
			query.append(String.format(" (SELECT '2' AS `sid`,'-1' AS `parent_sid`,'Features Data Plans' AS `name`)"));
			query.append(String.format(" UNION"));
			query.append(String.format(" (SELECT CONCAT('0_',`sid`) AS `sid`,IF (`parent_sid` > 0, CONCAT('0_',`parent_sid`), '0') AS `parent_sid`,`category_name` AS `name` FROM `%s`.`tb_categories_dict_%s`)", db_name, storeId));
			query.append(String.format(" UNION"));
			query.append(String.format(" (SELECT CONCAT('1_',`carrier`) AS `sid`,'1' AS `parent_sid`,`carrier` AS `name` FROM `%s`.`tb_rateplan_%s` WHERE `plan_type`='0')", db_name, storeId));
			query.append(String.format(" UNION"));
			query.append(String.format(" (SELECT CONCAT('1_',`carrier`,'_',`sid`) AS `sid`,CONCAT('1_',`carrier`) AS `parent_sid`,`description` AS `name` FROM `%s`.`tb_rateplan_%s` WHERE `plan_type`='0')", db_name, storeId));
			query.append(String.format(" UNION"));
			query.append(String.format(" (SELECT CONCAT('2_',`carrier`) AS `sid`,'2' AS `parent_sid`,`carrier` AS `name` FROM `%s`.`tb_rateplan_%s` WHERE `plan_type`='1')", db_name, storeId));
			query.append(String.format(" UNION"));
			query.append(String.format(" (SELECT CONCAT('2_',`carrier`,'_',`sid`) AS `sid`,CONCAT('2_',`carrier`) AS `parent_sid`,`description` AS `name` FROM `%s`.`tb_rateplan_%s` WHERE `plan_type`='1');", db_name, storeId));

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
				sb.append("{");
				sb.append(String.format("\"sid\":\"%s\",",rs.getString("sid")));
				sb.append(String.format("\"value\":\"%s\",",rs.getString("sid")));
				sb.append(String.format("\"parent_sid\":\"%s\",",rs.getString("parent_sid")));
				sb.append(String.format("\"name\":\"%s\",",rs.getString("name")));
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