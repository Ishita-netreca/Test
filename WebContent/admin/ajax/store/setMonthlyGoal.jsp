<%//1702010 jh%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.sql.Timestamp"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.DateFormat"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer query = new StringBuffer();
		int storeSid = MyRequestUtil.getInt(request, "storeSid", 0);
		String storeId = MyRequestUtil.getString(request, "storeId", "");
		String box = MyRequestUtil.getString(request, "box", "");
		String accessory = MyRequestUtil.getString(request, "accessory", "");
		String mrc = MyRequestUtil.getString(request, "mrc", "");
		String date = MyRequestUtil.getString(request, "date", "");
		
		Date day = new Date(date);

		SimpleDateFormat fdm = new SimpleDateFormat("yyyy-MM-dd");  
		
		String time[] = fdm.format(day).split("-");
		
		try {
		    if (user_sid == null || storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			String que = String.format("INSERT INTO `%s`.`tb_store_archievement_%s` SET `box_sales_goal`='%s', `accessory_goal`='%s', `more_than_50_mrc_new_goal`='%s', `year`='%s', `month`='%s', `week`='0';", db_name, storeId, box, accessory, mrc, time[0], time[1]);
			out.print(MyDBUtil.getInstance().execute(que.toString()));

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