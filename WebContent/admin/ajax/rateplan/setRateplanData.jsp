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
		StringBuffer sb = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		int rateplanSid = MyRequestUtil.getInt(request, "rateplanSid", 0);
		String rateplanCode = MyRequestUtil.getString(request, "rateplanCode", null);
		String carrier = MyRequestUtil.getString(request, "carrier", null);
		String description = MyRequestUtil.getString(request, "description", null);
		int planType = MyRequestUtil.getInt(request, "planType", 0);
		int groupType = MyRequestUtil.getInt(request, "groupType", 0);
		float mrc = MyRequestUtil.getFloat(request, "mrc", 0);
		int reactPlanFlag = MyRequestUtil.getInt(request, "reactPlanFlag", 0);
		int upgradePlanFlag = MyRequestUtil.getInt(request, "upgradePlanFlag", 0);
		String startDate = MyRequestUtil.getString(request, "startDate", null);
		String endDate = MyRequestUtil.getString(request, "endDate", null);
		int disable = MyRequestUtil.getInt(request, "disable", 0);
		
		try {
		    if (user_sid == null || rateplanCode == null || db_name == null) {
		       throw new Exception();
		    }

		    if (startDate == null || startDate.length() < 1) {
		        startDate = "01/01/1900";
		    }

		    if (endDate == null || endDate.length() < 1) {
		        endDate = "12/31/2999";
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

            if (rateplanSid > 0) {
                sb.append(String.format("UPDATE `%s`.`tb_rateplan_%s` SET `rateplan_code`='%s',`carrier`='%s',`description`='%s',`plan_type`='%d',`group_type`='%d',`mrc`='%f',`react_plan_flag`='%d',`upgrade_plan_flag`='%d',`start_date`=str_to_date('%s','%%m/%%d/%%Y'),`end_date`=str_to_date('%s','%%m/%%d/%%Y'),`updater`='%s',`update_date`=NOW(),`disable`='%d' WHERE `sid`='%d'",
                		db_name, store_id, rateplanCode, carrier, description, planType, groupType, mrc, reactPlanFlag, upgradePlanFlag, startDate, endDate, user_sid, disable, rateplanSid
                ));
            } else {
                sb.append(String.format("INSERT INTO `%s`.`tb_rateplan_%s`(`rateplan_code`,`carrier`,`description`,`plan_type`,`group_type`,`mrc`,`react_plan_flag`,`upgrade_plan_flag`,`start_date`,`end_date`,`updater`,`update_date`,`disable`) VALUES('%s','%s','%s','%d','%d','%f','%d','%d',str_to_date('%s','%%m/%%d/%%Y'),str_to_date('%s','%%m/%%d/%%Y'),'%s',NOW(),'%d')",
                		db_name, store_id, rateplanCode, carrier, description, planType, groupType, mrc, reactPlanFlag, upgradePlanFlag, startDate, endDate, user_sid, disable
                ));
            }

            stmt.execute(sb.toString());

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

            out.print("0");

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
		sb = null;
%>