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
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null, stmt2 = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = null;

		String storeId = MyRequestUtil.getString(request, "storeId", null);

		String door_code, total_primary_rate_plan_amount, transaction_date, esn, transaction_type, qualification_status, rate_plan_amount, bolt_on_amount, transaction_amount, total_features_data_plan_amount, rebate, total, posted_date;
		

		int isSerializableItem = -1; // 1: true, 0: false, -1: item is not an existing

		String rData = MyRequestUtil.getString(request, "rData", null);

		JSONObject po = null, jsonObj = null;
		JSONParser parser = null;

		JSONArray items = null;

		try {
		    if (storeId == null || rData == null || db_name == null) {
		        throw new Exception("no input parameters");
		    }
			
		    int sid = MyDBUtil.getInstance().getInt(String.format("SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` ORDER BY `sid` DESC;", db_name, db_name ), "sid");
		    parser = new JSONParser();
		    po = (JSONObject) parser.parse(rData);

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			stmt = conn.createStatement();
			query = new StringBuffer();

            items = (JSONArray)po.get("items");

            query.append(String.format("INSERT INTO `%s`.`tb_reconciliation_%s`(`door_code`,`esn`,`transaction_date`,`transaction_type`,`qualification_status`,`rate_plan_amount`,`bolt_on_amount`,`transaction_amount`,`total_primary_rate_plan_amount`,`total_features_data_plan_amount`,`rebate`,`posted_date`,`difference`,`update_sid`) VALUES", db_name, db_name));

            for (int i = 0; i < items.size(); i++) {
                jsonObj = (JSONObject)items.get(i);
                
                if (jsonObj != null) {
                	door_code = jsonObj.get("door_code").toString();
                	esn = jsonObj.get("esn").toString();
                	transaction_date = jsonObj.get("transaction_date").toString();
                	transaction_type = jsonObj.get("transaction_type").toString();
                	qualification_status = jsonObj.get("qualification_status").toString();
                	rate_plan_amount = (jsonObj.get("rate_plan_amount").toString() != null)? jsonObj.get("rate_plan_amount").toString() : "0";
                	
                	bolt_on_amount = (jsonObj.get("bolt_on_amount").toString() != null)? jsonObj.get("bolt_on_amount").toString() : "0";
                    transaction_amount = (jsonObj.get("transaction_amount").toString() != null)? jsonObj.get("transaction_amount").toString() : "0";
                    total_primary_rate_plan_amount = (jsonObj.get("total_primary_rate_plan_amount").toString() != null)? jsonObj.get("total_primary_rate_plan_amount").toString() : "0";
                    total_features_data_plan_amount = (jsonObj.get("total_features_data_plan_amount").toString() != null)? jsonObj.get("total_features_data_plan_amount").toString() : "0";
                    rebate = (jsonObj.get("rebate").toString() != null)? jsonObj.get("rebate").toString() : "0";
                    total = jsonObj.get("total").toString();
                    posted_date = jsonObj.get("posted_date").toString();
                    
                    query.append(String.format("('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%d')", door_code, esn, transaction_date, transaction_type, qualification_status, rate_plan_amount, bolt_on_amount, transaction_amount, total_primary_rate_plan_amount, total_features_data_plan_amount, rebate, posted_date, total, sid));
                    
                    if(i < items.size()-1){
                    	query.append(",");
                    }
                }
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

            sb.append("0");

            out.print(sb.toString());

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

			out.print("-1");
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>