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
		String data = MyRequestUtil.getString(request, "data", null);
        JSONArray received = null;
		JSONObject jsonObj = null;

		try {
		    if (storeId == null || db_name == null || data == null) {
		        throw new Exception();
		    }

		    received = (JSONArray)(new JSONParser()).parse(data);
		    // need fix (161119) : 일정이 중복 저장되는 문제
		    for (int i = 0; i < received.size(); i++) {
		        jsonObj = (JSONObject)received.get(i);
		        if (jsonObj.get("empSid") == null) continue;
		        if (jsonObj.get("sid") != null) {
		            if(jsonObj.get("sid").toString().equals("0")) {
		                query.append(String.format("INSERT INTO `%s`.`tb_clock_inout_schedule_%s`(`emp_sid`,`date`,`work_start`,`work_end`,`updater`) VALUES('%s','%s','%s','%s','%s');", 
		                		db_name, storeId, jsonObj.get("empSid"), jsonObj.get("date"), jsonObj.get("workStart"), jsonObj.get("workEnd"), user_sid
		                ));
		            } else {
		                if (jsonObj.get("workStart") == null || jsonObj.get("workStart") == null) {
                            query.append(String.format("DELETE FROM `%s`.`tb_clock_inout_schedule_%s` WHERE `sid`='%s';",
                            		db_name, storeId, jsonObj.get("sid")
                            ));
		                } else {
                            query.append(String.format("UPDATE `%s`.`tb_clock_inout_schedule_%s` SET `emp_sid`='%s',`date`='%s',`work_start`='%s',`work_end`='%s',`updater`='%s' WHERE `sid`='%s';",
                            		db_name, storeId, jsonObj.get("empSid"), jsonObj.get("date"), jsonObj.get("workStart"), jsonObj.get("workEnd"), user_sid, jsonObj.get("sid")
                            ));
		                }
		            }
		        }
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			stmt.execute(query.toString());

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

            out.print(0);

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