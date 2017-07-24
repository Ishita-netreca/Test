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

		String storeId = (session.getAttribute("posone_admin_login_store_id") != null)? session.getAttribute("posone_admin_login_store_id").toString() : null;
		int districtSid = MyRequestUtil.getInt(request, "districtSid", -1);
		String districtCode = MyRequestUtil.getString(request, "districtCode", null);
		String name = MyRequestUtil.getString(request, "name", null);
		String tel = MyRequestUtil.getString(request, "tel", null);
		String parentMarketCode = MyRequestUtil.getString(request, "parentMarketCode", "void");
		int result = 0;

		try {
		    if (districtSid < 0 || districtCode == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT `sid` FROM `%s`.`tb_districts` WHERE `district_code`='%s'", db_name, districtCode));


			if(rs.next()) {
                if (rs.getInt("sid") != districtSid) result = 1; // area code exists
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

            if (result == 0) {
                stmt = conn.createStatement();
                if (districtSid > 0) {
                    stmt.execute(String.format("UPDATE `%s`.`tb_districts` SET `district_code`='%s',`name`='%s',`tel`='%s',`parent_market_code`='%s' WHERE `sid`='%d';",db_name, districtCode, name, tel, parentMarketCode, districtSid));
                } else {
                    stmt.execute(String.format("INSERT INTO `%s`.`tb_districts`(`district_code`,`name`,`tel`,`parent_market_code`) VALUES('%s','%s','%s','%s');", db_name, districtCode, name, tel, parentMarketCode));
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
            try {
                if (conn != null && !conn.isClosed()) {
                    conn.close();
                }
            } catch (Exception e2) {

            }

            out.print(result);

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

			out.print("-1");
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
%>