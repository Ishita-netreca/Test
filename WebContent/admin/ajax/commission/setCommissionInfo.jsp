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
		
		String jsonParam = MyRequestUtil.getString(request, "jsonParam", null);
		
		int profile_sid = MyRequestUtil.getInt(request, "profile_sid", 0);
		int target_sid = MyRequestUtil.getInt(request, "target_sid", 0);
		int target_type = MyRequestUtil.getInt(request, "target_type", 0);
		
		JSONArray commissionDataSet = null;
		
		JSONObject jsonObj = null;
		
		int sid = 0, type = 0;

		try {
		    if (storeId == null || user_sid == null || db_name == null || jsonParam == null || profile_sid < 1 || target_type < 0 || target_sid < 0) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			commissionDataSet = (JSONArray)new JSONParser().parse(jsonParam);
			
			for (int i = 0; i < commissionDataSet.size(); i++) {
				jsonObj = (JSONObject)commissionDataSet.get(i);
				
				sid = (jsonObj.get("sid") != null)? Integer.parseInt(jsonObj.get("sid").toString()) : 0;
				type = (jsonObj.get("type") != null)? Integer.parseInt(jsonObj.get("type").toString()) : 0;
				
				if (sid > 0 || type > 0) {
					if (sid == 0) {
						query.append(String.format("INSERT INTO `%s`.`tb_commission_%s` SET", db_name, storeId));	
					} else {
						query.append(String.format("UPDATE `%s`.`tb_commission_%s` SET", db_name, storeId));							
					}					
					query.append(String.format(" `profile_sid`='%d',", profile_sid));
					query.append(String.format(" `target_type`='%d',", target_type));
					query.append(String.format(" `target_sid`='%d',", target_sid));
					query.append(String.format(" `type`='%d',", type));
					if (jsonObj.get("from") != null) query.append(String.format(" `from`='%s',", jsonObj.get("from").toString()));
					if (jsonObj.get("to") != null) query.append(String.format(" `to`='%s',", jsonObj.get("to").toString()));
					if (jsonObj.get("commission_value") != null) query.append(String.format(" `commission_value`='%s',", jsonObj.get("commission_value").toString()));
					query.append(String.format(" `update_date`=NOW(), `updater`='%s'", user_sid));
					if (sid > 0) {
						query.append(String.format(" WHERE `sid`='%d'", sid));
					}
				} else if (sid > 0 && type == 0) {
					query.append(String.format("DELETE FROM `%s`.`tb_commission_%s` WHERE `sid`='%d'", db_name, storeId, sid));
				}
				
				query.append(";");				
			}

			stmt = conn.createStatement();

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