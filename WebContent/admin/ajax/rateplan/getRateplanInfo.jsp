<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
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
		StringBuffer sb = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");

		String storeId = MyRequestUtil.getString(request, "storeId", null);
        int rateplanSid = MyRequestUtil.getInt(request, "rateplanSid", 0);

		try {

		    if (rateplanSid < 1 || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

            sb.append(String.format("SELECT * FROM `%s`.`tb_rateplan_%s` WHERE `sid`='%d'", db_name,storeId,rateplanSid));

			stmt = conn.createStatement();

			rs = stmt.executeQuery(sb.toString());

            sb.delete(0, sb.length());

			sb.append("{\"data\":");

			if(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("rateplan_code") != null) sb.append(String.format("\"rateplanCode\":\"%s\",", rs.getString("rateplan_code")));
                if (rs.getString("carrier") != null) sb.append(String.format("\"carrier\":\"%s\",", rs.getString("carrier")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",", rs.getString("description")));
                sb.append(String.format("\"planType\":%d,", rs.getInt("plan_type")));
                sb.append(String.format("\"groupType\":%d,", rs.getInt("group_type")));
                sb.append(String.format("\"mrc\":%f,", rs.getFloat("mrc")));
                sb.append(String.format("\"reactPlanFlag\":%d,", rs.getInt("react_plan_flag")));
                sb.append(String.format("\"upgradePlanFlag\":%d,", rs.getInt("upgrade_plan_flag")));
                if (rs.getTimestamp("start_date") != null) sb.append(String.format("\"startDate\":\"%s\",", sdf.format(rs.getTimestamp("start_date"))));
                if (rs.getTimestamp("end_date") != null) sb.append(String.format("\"endDate\":\"%s\",", sdf.format(rs.getTimestamp("end_date"))));
                sb.append(String.format("\"updater\":%d,", rs.getInt("updater")));
                if (rs.getTimestamp("update_date") != null) sb.append(String.format("\"updateDate\":\"%s\",", sdf.format(rs.getTimestamp("update_date"))));
                sb.append(String.format("\"disable\":%d,", rs.getInt("disable")));
		    	if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
                sb.append("},");
			}

			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);

			sb.append("}");

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