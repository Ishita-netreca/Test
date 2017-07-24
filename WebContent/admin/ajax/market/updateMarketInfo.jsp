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

		int marketSid = MyRequestUtil.getInt(request, "marketSid", -1);
		String prevMarketCode = MyRequestUtil.getString(request, "prevMarketCode", null);
		String marketCode = MyRequestUtil.getString(request, "marketCode", null);
		String name = MyRequestUtil.getString(request, "name", null);
		String tel = MyRequestUtil.getString(request, "tel", null);
		int result = 0;

		try {
		    if (marketSid < 0 || marketCode == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT `sid` FROM `%s`.`tb_markets` WHERE `market_code`='%s'", db_name, marketCode));


			if(rs.next()) {
                if (rs.getInt("sid") != marketSid) result = 1; // market code exists
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
                if (marketSid > 0) {
                    if (prevMarketCode == null) {
                        throw new Exception();
                    }
                    stmt.execute(String.format("UPDATE `%s`.`tb_districts` SET `parent_market_code`='%s' WHERE `parent_market_code`='%s'; UPDATE `%s`.`tb_markets` SET `market_code`='%s',`name`='%s',`tel`='%s' WHERE `sid`='%d';", db_name, marketCode, prevMarketCode, db_name, marketCode, name, tel, marketSid));
                } else {
                    stmt.execute(String.format("INSERT INTO `%s`.`tb_markets`(`market_code`,`name`,`tel`) VALUES('%s','%s','%s');", db_name, marketCode, name, tel));
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