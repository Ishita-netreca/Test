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
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		int num = -1;

		String whereStr = " WHERE", andStr = " AND";

		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		boolean dateLimited = (MyRequestUtil.getInt(request, "dateLimited", 0) > 0)? true: false;
		boolean isContainsDisabled = (MyRequestUtil.getInt(request, "isContainsDisabled", 0) > 0)? true: false;
		boolean isReactPlanFlag = (MyRequestUtil.getInt(request, "isReactPlanFlag", 0) > 0)? true: false;
		boolean isUpgradePlanFlag = (MyRequestUtil.getInt(request, "isUpgradePlanFlag", 0) > 0)? true: false;
		int planType = MyRequestUtil.getInt(request, "planType", -1);
		int groupType = MyRequestUtil.getInt(request, "groupType", -1);
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();



            query.append(String.format("SELECT `a`.*, `b`.`user_id` FROM ("));

            query.append(String.format("SELECT * FROM `%s`.`tb_rateplan_%s`", db_name, storeId));

            query.append(whereStr);

            if (dateLimited) {
                Calendar c = Calendar.getInstance();
                SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                query.append(String.format(" (`start_date` <= '%s' AND `end_date` >= '%s') AND", sdf.format(c.getTime())));
            }

            if (!isContainsDisabled) {
                query.append(" `disable`='0' AND");
            }
            
            if (keyword != null && keyword != "") {
                query.append(String.format(" `description` LIKE '%%%s%%' AND", keyword));
            }
            
/*
            if (isReactPlanFlag) {
                query.append(" `react_plan_flag`='1' AND");
            } else {
                query.append(" `react_plan_flag`='0' AND");
            }

            if (isUpgradePlanFlag) {
                query.append(" `upgrade_plan_flag`='1' AND");
            } else {
                query.append(" `upgrade_plan_flag`='0' AND");
            }
*/
            if (planType > -1) {
                query.append(String.format(" `plan_type`='%d' AND", planType));
            }

            if (groupType > -1) {
                query.append(String.format(" `group_type`='%d' AND", groupType));
            }

            num = query.lastIndexOf(whereStr);
            if (num == query.length() - whereStr.length()) {
                query.delete(num, num + whereStr.length());
            }

            num = query.lastIndexOf(andStr);
            if (num == query.length() - andStr.length()) {
                query.delete(num, num + andStr.length());
            }

            query.append(") AS `a` LEFT JOIN (SELECT `sid`, `user_id` FROM `wrp`.`tb_user`) as `b` ON `a`.`updater`=`b`.`sid`");
			
            rs = stmt.executeQuery(query.toString());

			sb.append("{\"data\":[");

			while(rs.next()) {
                sb.append("{");
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                if (rs.getString("rateplan_code") != null) sb.append(String.format("\"rateplanCode\":\"%s\",",rs.getString("rateplan_code")));
                if (rs.getString("carrier") != null) sb.append(String.format("\"carrier\":\"%s\",",rs.getString("carrier")));
                if (rs.getString("description") != null) sb.append(String.format("\"description\":\"%s\",",rs.getString("description")));
                sb.append(String.format("\"planType\":%d,", rs.getInt("plan_type")));
                sb.append(String.format("\"groupType\":%d,", rs.getInt("group_type")));
                switch (rs.getInt("plan_type")) {
                case 0:
                    sb.append("\"planTypeStr\":\"voice\",");
                    break;
                case 1:
                    sb.append("\"planTypeStr\":\"feature\",");
                    break;
                }
                sb.append(String.format("\"groupType\":%d,", rs.getInt("group_type")));
                switch (rs.getInt("group_type")) {
                case 0:
                    sb.append("\"groupTypeStr\":\"individual\",");
                    break;
                case 1:
                    sb.append("\"groupTypeStr\":\"family\",");
                    break;
                }
                sb.append(String.format("\"mrc\":%f,", rs.getFloat("mrc")));
                sb.append(String.format("\"reactPlanFlag\":%d,", rs.getInt("react_plan_flag")));
                sb.append(String.format("\"upgradePlanFlag\":%d,", rs.getInt("upgrade_plan_flag")));
                if (rs.getTimestamp("start_date") != null) sb.append(String.format("\"startDate\":\"%s\",",sdf.format(rs.getTimestamp("start_date"))));
                if (rs.getTimestamp("end_date") != null) sb.append(String.format("\"endDate\":\"%s\",",sdf.format(rs.getTimestamp("end_date"))));
                sb.append(String.format("\"updater\":%d,", rs.getInt("updater")));
                if (rs.getTimestamp("update_date") != null) sb.append(String.format("\"updateDate\":\"%s\",",sdf.format(rs.getTimestamp("update_date"))));
                sb.append(String.format("\"disable\":%d,", rs.getInt("disable")));
                if (rs.getString("user_id") != null) sb.append(String.format("\"userId\":\"%s\",",rs.getString("user_id")));
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