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
<%//170119 jh
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);

		
		try {
		    if (user_id == null || storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			/*170119 jh : 컬럼 추가*/
			rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT DISTINCT store_id, user_id FROM `%s`.`tb_user_store_access` WHERE `user_sid` IN (SELECT `sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s')) AS `a` LEFT JOIN (SELECT `d`.`store_id`,`d`.`name`,`d`.`address1`,`d`.`address2`,`d`.`city`,`d`.`state`,`d`.`zipcode`,`e`.`name` AS dname, `f`.`name` AS mname FROM `tb_stores` AS `d`, `tb_districts` AS `e`, `tb_markets` AS `f` WHERE `d`.`district_code`=`e`.`district_code` AND `d`.`market_code` = `f`.`market_code`) AS `b` ON `a`.`store_id`=`b`.`store_id`", db_name, user_id));
			/**/
			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                if (rs.getString("store_id") != null) sb.append(String.format("\"storeId\":\"%s\",", rs.getString("store_id")));
                if (rs.getString("user_id") != null) sb.append(String.format("\"userId\":\"%s\",", rs.getString("user_id")));
                if (rs.getString("name") != null) sb.append(String.format("\"name\":\"%s\",", rs.getString("name")));
                if (rs.getString("address1") != null) sb.append(String.format("\"address1\":\"%s\",", rs.getString("address1")));
                if (rs.getString("address2") != null) sb.append(String.format("\"address2\":\"%s\",", rs.getString("address2")));
                if (rs.getString("city") != null) sb.append(String.format("\"city\":\"%s\",", rs.getString("city")));
                if (rs.getString("state") != null) sb.append(String.format("\"state\":\"%s\",", rs.getString("state")));
                if (rs.getString("zipcode") != null) sb.append(String.format("\"zipcode\":\"%s\",", rs.getString("zipcode")));
                if (rs.getString("dname") != null) sb.append(String.format("\"district\":\"%s\",", rs.getString("dname")));
                if (rs.getString("mname") != null) sb.append(String.format("\"market\":\"%s\",", rs.getString("mname")));
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
		sb = null;
%>