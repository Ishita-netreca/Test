<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String transferId = MyRequestUtil.getString(request, "transferId", null);

		try {
		    if (transferId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `sid`,`trans_id`,DATE_FORMAT(`req_date`,'%%m/%%d/%%Y %%H:%%m:%%s') AS `req_date`,`req_user_sid`,DATE_FORMAT(`appr_date`,'%%m/%%d/%%Y %%H:%%m:%%s') AS `appr_date`,`appr_user_sid`,DATE_FORMAT(`ship_date`,'%%m/%%d/%%Y %%H:%%m:%%s') AS `ship_date`,`ship_user_sid`,DATE_FORMAT(`recv_date`,'%%m/%%d/%%Y %%H:%%m:%%s') AS `recv_date`,`recv_user_sid`,`from_store_id`,`to_store_id`,`status`,`ship_no`,`note`,`reject_reason` FROM `%s`.`tb_inventory_trans_%s` WHERE trans_id='%s'", db_name, db_name, transferId));

			rs = stmt.executeQuery(query.toString());


			if(rs.next()) {
			    sb.append("{\"data\":{");
			    sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
			    if (rs.getString("trans_id") != null) sb.append(String.format("\"transId\":\"%s\",", rs.getString("trans_id")));
			    if (rs.getString("req_date") != null) sb.append(String.format("\"reqDate\":\"%s\",", rs.getString("req_date")));
			    sb.append(String.format("\"reqUserSid\":%d,", rs.getInt("req_user_sid")));
			    if (rs.getString("appr_date") != null) sb.append(String.format("\"apprDate\":\"%s\",", rs.getString("appr_date")));
			    sb.append(String.format("\"apprUserSid\":%d,", rs.getInt("appr_user_sid")));
			    if (rs.getString("ship_date") != null) sb.append(String.format("\"shipDate\":\"%s\",", rs.getString("ship_date")));
			    sb.append(String.format("\"shipUserSid\":%d,", rs.getInt("ship_user_sid")));
			    if (rs.getString("recv_date") != null) sb.append(String.format("\"recvDate\":\"%s\",", rs.getString("recv_date")));
			    sb.append(String.format("\"recvUserSid\":%d,", rs.getInt("recv_user_sid")));
			    if (rs.getString("from_store_id") != null) sb.append(String.format("\"fromStoreId\":\"%s\",", rs.getString("from_store_id")));
			    if (rs.getString("to_store_id") != null) sb.append(String.format("\"toStoreId\":\"%s\",", rs.getString("to_store_id")));
			    sb.append(String.format("\"status\":%d,", rs.getInt("status")));
			    if (rs.getString("ship_no") != null) sb.append(String.format("\"shipNo\":\"%s\",", rs.getString("ship_no")));
			    if (rs.getString("note") != null) sb.append(String.format("\"note\":\"%s\",", rs.getString("note")));
			    if (rs.getString("reject_reason") != null) sb.append(String.format("\"rejectReason\":\"%s\",", rs.getString("reject_reason")));
			    if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
                sb.append("}}");
			} else {
			    sb.append("{\"data\":null}");
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