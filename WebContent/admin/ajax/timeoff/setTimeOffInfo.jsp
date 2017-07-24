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
		int timeOffSid = MyRequestUtil.getInt(request, "timeOffSid", 0);
		String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);
		int state = MyRequestUtil.getInt(request, "state", 2);
		
		int paidFlag = MyRequestUtil.getInt(request, "paidFlag", 1);
		
		try {
		    if (storeId == null || user_sid == null || timeOffSid < 1 || ( state < 2 && (startDate == null || endDate == null || db_name == null))) {
		        throw new Exception();
		    }
		    
		    if (paidFlag != 1 && paidFlag != 0) paidFlag = 1;

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            if (state == 1) {
                query.append(String.format("UPDATE `%s`.`tb_time_off_%s` SET `req_state`='1', `start_date`=STR_TO_DATE('%s', '%%m/%%d/%%Y'), `end_date`=STR_TO_DATE('%s', '%%m/%%d/%%Y'), `paid_flag`='%d' WHERE `sid`='%d'", db_name, storeId, startDate, endDate, paidFlag, timeOffSid));
            } else {
                query.append(String.format("UPDATE `%s`.`tb_time_off_%s` SET `req_state`='2' WHERE `sid`='%d'", db_name, storeId, timeOffSid));
            }

            stmt.execute(query.toString());
           
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

            out.print(0);

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
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

            out.print(-1);
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		query = null;
		sb = null;
%>