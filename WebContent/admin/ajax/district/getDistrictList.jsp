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

		String marketCode = MyRequestUtil.getString(request, "marketCode", null);
		String searchKeyword = MyRequestUtil.getString(request, "searchKeyword", null);
		if (searchKeyword != null) {
		    searchKeyword = searchKeyword.replaceAll("'","''");
		}

		try {
		    if (db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT * FROM `%s`.`tb_districts`", db_name));

			if (marketCode != null && marketCode.length() > 0 && searchKeyword != null && searchKeyword.length() > 0) {
			    query.append(String.format(" WHERE `parent_market_code`='%s' AND `district_code` LIKE '%%%s%%'", marketCode, searchKeyword));
			} else if (marketCode != null && marketCode.length() > 0) {
			    query.append(String.format(" WHERE `parent_market_code`='%s'", marketCode));
			} else if (searchKeyword != null && searchKeyword.length() > 0) {
			    query.append(String.format(" WHERE `district_code` LIKE '%%%s%%'", searchKeyword));
			}

			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("district_code") != null) sb.append(String.format("\"districtCode\":\"%s\",", rs.getString("district_code")));
                if (rs.getString("name") != null) sb.append(String.format("\"name\":\"%s\",", rs.getString("name")));
                if (rs.getString("parent_market_code") != null) sb.append(String.format("\"parentMarketCode\":\"%s\",", rs.getString("parent_market_code")));
                if (rs.getString("tel") != null) sb.append(String.format("\"tel\":\"%s\",", rs.getString("tel")));
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