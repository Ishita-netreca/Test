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

		String start_date = MyRequestUtil.getString(request, "start_date", null); // mm/dd/yyyy
		String end_date = MyRequestUtil.getString(request, "end_date", null);   // mm/dd/yyyy

		int status = MyRequestUtil.getInt(request, "status", -1);

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            query.append(String.format("SELECT `ab`.*,`c`.`req_user_id`,`d`.`appr_user_id`,`e`.`ship_user_id`,`f`.`recv_user_id` FROM("));
			query.append(String.format("SELECT `a`.*, `b`.* FROM ("));
            query.append(String.format("SELECT `sid`,`trans_id`,DATE_FORMAT(DATE_ADD(`req_date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `req_date`,`req_user_sid`,DATE_FORMAT(DATE_ADD(`appr_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y') AS `appr_date`,`appr_user_sid`,DATE_FORMAT(DATE_ADD(`ship_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y') AS `ship_date`,`ship_user_sid`,DATE_FORMAT(DATE_ADD(`recv_date`, INTERVAL %s HOUR),'%%m/%%d/%%Y') AS `recv_date`,",timezone_offset,timezone_offset,timezone_offset,timezone_offset));
            query.append(String.format("`recv_user_sid`,`from_store_id`,`to_store_id`,`status` FROM `%s`.`tb_inventory_trans_%s`", db_name, db_name));
            switch (status) {
            case 0: // Request
                query.append(String.format(" WHERE (`to_store_id`='%s') AND `status`='0'", storeId));
                break;
            case 1: // Reject
                query.append(String.format(" WHERE (`from_store_id`='%s') AND `status`='1'", storeId));
                break;
            case 2: // Approval
                query.append(String.format(" WHERE (`to_store_id`='%s') AND `status`='2'", storeId));
                break;
            case 3: // Ship
                query.append(String.format(" WHERE (`from_store_id`='%s') AND `status`='3'", storeId));
                break;
            default:
                query.append(String.format(" WHERE (`from_store_id`='%s' OR `to_store_id`='%s')", storeId, storeId));
                break;
            }
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `trans_sid`, SUM(`req_qty`) AS `req_qty`,SUM(`appr_qty`) AS `appr_qty`,SUM(`ship_qty`) AS `ship_qty`,SUM(`recv_qty`) AS `recv_qty` FROM `%s`.`tb_inventory_trans_items_%s` GROUP BY `trans_sid`", db_name, db_name));
            query.append(String.format(") AS `b` ON `a`.`sid`=`b`.`trans_sid`"));
            query.append(String.format(") AS `ab`"));
            query.append(String.format("LEFT JOIN (SELECT `sid`, `user_id` AS `req_user_id` FROM `wrp`.`tb_user`) AS `c` ON `ab`.`req_user_sid`=`c`.`sid`"));
            query.append(String.format("LEFT JOIN (SELECT `sid`, `user_id` AS `appr_user_id` FROM `wrp`.`tb_user`) AS `d` ON `ab`.`appr_user_sid`=`d`.`sid`"));
            query.append(String.format("LEFT JOIN (SELECT `sid`, `user_id` AS `ship_user_id` FROM `wrp`.`tb_user`) AS `e` ON `ab`.`ship_user_sid`=`e`.`sid`"));
            query.append(String.format("LEFT JOIN (SELECT `sid`, `user_id` AS `recv_user_id` FROM `wrp`.`tb_user`) AS `f` ON `ab`.`recv_user_sid`=`f`.`sid`"));
            
            if (start_date != null && end_date != null) {
                switch (status) {
                case 0: // Request
                    query.append(String.format(" WHERE `req_date` BETWEEN '%s' AND '%s'", start_date, end_date));
                    break;
                 case 1: // Reject
                	 query.append(String.format(" WHERE `req_date` BETWEEN '%s' AND '%s'", start_date, end_date));
                    break; 
                case 2: // Approval
                	query.append(String.format(" WHERE `appr_date` BETWEEN '%s' AND '%s'",start_date, end_date));
                    break;
                case 3: // Ship
                	query.append(String.format(" WHERE `ship_date` BETWEEN '%s' AND '%s'", start_date, end_date));
                    break;
                default:
                    query.append(String.format(" WHERE `req_date` BETWEEN '%s' AND '%s'", start_date, end_date));
                    break; 
                } 
            }
			rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("trans_id") != null) sb.append(String.format("\"transId\":\"%s\",", rs.getString("trans_id")));
                if (rs.getString("req_date") != null) sb.append(String.format("\"reqDate\":\"%s\",", rs.getString("req_date")));
                if (rs.getString("from_store_id") != null) sb.append(String.format("\"fromStoreId\":\"%s\",", rs.getString("from_store_id")));
                if (rs.getString("to_store_id") != null) sb.append(String.format("\"toStoreId\":\"%s\",", rs.getString("to_store_id")));
                sb.append(String.format("\"reqUserSid\":%d,", rs.getInt("req_user_sid")));
                if (rs.getString("appr_date") != null) sb.append(String.format("\"apprDate\":\"%s\",", rs.getString("appr_date")));
                sb.append(String.format("\"apprUserSid\":%d,", rs.getInt("appr_user_sid")));
                if (rs.getString("ship_date") != null) sb.append(String.format("\"shipDate\":\"%s\",", rs.getString("ship_date")));
                sb.append(String.format("\"shipUserSid\":%d,", rs.getInt("ship_user_sid")));
                if (rs.getString("recv_date") != null) sb.append(String.format("\"recvDate\":\"%s\",", rs.getString("recv_date")));
                sb.append(String.format("\"recvUserSid\":%d,", rs.getInt("recv_user_sid")));
                sb.append(String.format("\"reqQty\":%d,", rs.getInt("req_qty")));
                sb.append(String.format("\"apprQty\":%d,", rs.getInt("appr_qty")));
                sb.append(String.format("\"shipQty\":%d,", rs.getInt("ship_qty")));
                sb.append(String.format("\"recvQty\":%d,", rs.getInt("recv_qty")));
                if (rs.getString("req_user_id") != null) sb.append(String.format("\"reqUserId\":\"%s\",", rs.getString("req_user_id")));
                if (rs.getString("appr_user_id") != null) sb.append(String.format("\"apprUserId\":\"%s\",", rs.getString("appr_user_id")));
                if (rs.getString("ship_user_id") != null) sb.append(String.format("\"shipUserId\":\"%s\",", rs.getString("ship_user_id")));
                if (rs.getString("recv_user_id") != null) sb.append(String.format("\"recvUserId\":\"%s\",", rs.getString("recv_user_id")));
                sb.append(String.format("\"status\":%d,", rs.getInt("status")));
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