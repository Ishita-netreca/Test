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

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		String audit_data_str = MyRequestUtil.getString(request, "audit_data_str", null);
		String delete_audit_sid_str = MyRequestUtil.getString(request, "delete_audit_sid_str", null);
		
		JSONArray auditData = null;
		JSONObject jsonObj = null;
		
		int sid = 0;
		int audit_sid = 0;
		int item_sid = 0;
		int inventory_sid = 0;

		try {
		    if (store_id == null || audit_data_str == null|| db_name == null) {
		        throw new Exception();
		    }
		    
		    auditData = (JSONArray)new JSONParser().parse(audit_data_str);

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			for (int i = 0; i < auditData.size(); i++) {
				try {
					jsonObj = (JSONObject)auditData.get(i);
					if (jsonObj != null) {
						if (jsonObj.get("sid") == null) continue;
						sid = Integer.parseInt(jsonObj.get("sid").toString());
						audit_sid = Integer.parseInt(jsonObj.get("audit_sid").toString());
						if (audit_sid < 1) continue;
						item_sid = Integer.parseInt(jsonObj.get("item_sid").toString());
						if (item_sid < 1) continue;
						inventory_sid = Integer.parseInt(jsonObj.get("inventory_sid").toString());
						
						if (sid == 0) {
							if (jsonObj.get("serial_no") != null && jsonObj.get("scanned_serial_no") != null) {
								query.append(String.format("INSERT INTO `%s`.`tb_audit_items_%s` SET", db_name, store_id));							
								query.append(String.format(" `serial_no`='%s',", jsonObj.get("serial_no").toString()));
								query.append(String.format(" `scanned_serial_no`='%s',`system_qty`='1',`scanned_qty`='1',", jsonObj.get("scanned_serial_no").toString()));	
								query.append(String.format(" `audit_sid`='%d',`item_sid`='%d',`inventory_sid`='%d';", audit_sid, item_sid, inventory_sid));
							} else if (jsonObj.get("serial_no") == null && jsonObj.get("scanned_serial_no") != null) {
								query.append(String.format("INSERT INTO `%s`.`tb_audit_items_%s` SET", db_name, store_id));			
								query.append(String.format(" `scanned_serial_no`='%s',`system_qty`='0',`scanned_qty`='1',", jsonObj.get("scanned_serial_no").toString()));	
								query.append(String.format(" `audit_sid`='%d',`item_sid`='%d',`inventory_sid`='%d';", audit_sid, item_sid, inventory_sid));
							}
						} else {
							query.append(String.format("UPDATE `%s`.`tb_audit_items_%s` SET", db_name, store_id));
							if (jsonObj.get("scanned_serial_no") != null) query.append(String.format(" `scanned_serial_no`='%s',`scanned_qty`='1'", jsonObj.get("scanned_serial_no").toString()));	
							else query.append(String.format(" `scanned_serial_no`='',`scanned_qty`='0'"));	
							query.append(String.format(" WHERE `sid`='%d';", sid));
						}
					}
				} catch (Exception e) {
					
				}
			}
			
			if (delete_audit_sid_str != null && delete_audit_sid_str.length() > 0) {
				query.append(String.format("DELETE FROM `%s`.`tb_audit_items_%s` WHERE `sid` IN (%s);", db_name, store_id, delete_audit_sid_str));
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