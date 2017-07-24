<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
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

		String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));
		String store_id = MyRequestUtil.getString(request, "store_id", null);
		
		try {
		    if (user_sid == null || owner_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            query.append(String.format("SELECT `sid`,`store_id`,`market_code`,`district_code`,CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`) as `address`, `tel` FROM `wrp`.`tb_stores` WHERE 1=1", owner_sid));
            if (master_user_flag) {
    			query.append(String.format(" AND `master_sid`='%s' ",master_sid));
    	    } else if (subdealer_user_flag) {
    	    	query.append(String.format(" AND `owner_sid`='%s' ",owner_sid));
    	    } else {
    	    	query.append(String.format(" AND `owner_sid`='%s' ",owner_sid));
    	    }
            
            if (keyword != null && keyword.length() > 0 ){
                query.append(String.format(" AND (`store_id` LIKE '%%%s%%')", keyword, keyword));                    
            }
            if (store_id != null && store_id.length() > 0 ){
            	query.append(String.format(" AND `store_id` NOT IN ('%s')", store_id));   
            }
            
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
			    sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("store_id") != null) sb.append(String.format("\"storeId\":\"%s\",", rs.getString("store_id")));
                if (rs.getString("address") != null) sb.append(String.format("\"address\":\"%s\",", rs.getString("address")));
                if (rs.getString("tel") != null) sb.append(String.format("\"tel\":\"%s\",", rs.getString("tel")));
                if (rs.getString("market_code") != null) sb.append(String.format("\"market_code\":\"%s\",", rs.getString("market_code")));
                if (rs.getString("district_code") != null) sb.append(String.format("\"district_code\":\"%s\",", rs.getString("district_code")));
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