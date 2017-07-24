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


		int transSid = MyRequestUtil.getInt(request, "transSid", 0);

		int currentStatus = MyRequestUtil.getInt(request, "currentStatus", -1);

		String item_code = MyRequestUtil.getString(request, "item_code", null);

		String serialIDsStr = MyRequestUtil.getString(request, "serialIDs", null);

		JSONArray serialIDs = null;
		JSONObject jsonObj = null;

		try {
		    if (user_sid == null || db_name == null || transSid < 1 || item_code == null || serialIDsStr == null || currentStatus < 0) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

            switch (currentStatus) {
            case 0:

                serialIDs = (JSONArray)(new JSONParser().parse(serialIDsStr));

                // serialNo가 한번 작성 되고 수정 불가로 변경되면, 테이블 내의 serial_no column의 데이터 NULL 여부검사를 추가하면 됨
                for (int i = 0; i < serialIDs.size(); i++) {
                    jsonObj = (JSONObject)serialIDs.get(i);
                    if (jsonObj.get("sid") == null) continue;
                    if (jsonObj.get("serialNo") != null) {
                        query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='1',`serial_no`='%s' WHERE `sid`='%s' AND `trans_sid`='%d' AND `item_code`='%s'; ",
                        		db_name, db_name, jsonObj.get("serialNo").toString(), jsonObj.get("sid").toString(), transSid, item_code
                        ));
                    } else {
                        query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='0',`serial_no`=NULL WHERE `sid`='%s' AND `trans_sid`='%d' AND `item_code`='%s'; ",
                        		db_name, db_name, jsonObj.get("sid").toString(), transSid, item_code
                        ));
                    }
                }
                break;
            case 2:

                serialIDs = (JSONArray)(new JSONParser().parse(serialIDsStr));

                // serialNo가 한번 작성 되고 수정 불가로 변경되면, 테이블 내의 serial_no column의 데이터 NULL 여부검사를 추가하면 됨
                for (int i = 0; i < serialIDs.size(); i++) {
                    jsonObj = (JSONObject)serialIDs.get(i);
                    if (jsonObj.get("sid") == null) continue;
                    if (jsonObj.get("serialNo") != null) {
                        query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `ship_qty`='1',`serial_no`='%s' WHERE `sid`='%s' AND `trans_sid`='%d' AND `item_code`='%s'; ",
                        		db_name, db_name, jsonObj.get("serialNo").toString(), jsonObj.get("sid").toString(), transSid, item_code
                        ));
                    } else {
                        query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `ship_qty`='0',`serial_no`=NULL WHERE `sid`='%s' AND `trans_sid`='%d' AND `item_code`='%s'; ",
                        		db_name, db_name, jsonObj.get("sid").toString(), transSid, item_code
                        ));
                    }
                }
                break;
            case 3:

                serialIDs = (JSONArray)(new JSONParser().parse(serialIDsStr));

                // serialNo가 한번 작성 되고 수정 불가로 변경되면, 테이블 내의 serial_no column의 데이터 NULL 여부검사를 추가하면 됨
                for (int i = 0; i < serialIDs.size(); i++) {
                    jsonObj = (JSONObject)serialIDs.get(i);
                    if (jsonObj.get("sid") == null) continue;
                    if (jsonObj.get("serialNo") != null) {
                        query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `recv_qty`='1',`serial_no`='%s' WHERE `sid`='%s' AND `trans_sid`='%d' AND `item_code`='%s'; ",
                        		db_name, db_name, jsonObj.get("serialNo").toString(), jsonObj.get("sid").toString(), transSid, item_code
                        ));
                    } else {
                        query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `recv_qty`='0',`serial_no`=NULL WHERE `sid`='%s' AND `trans_sid`='%d' AND `item_code`='%s'; ",
                        		db_name, db_name, jsonObj.get("sid").toString(), transSid, item_code
                        ));
                    }
                }
                break;
            }

            if (query.length() > 0) {
                stmt = conn.createStatement();

                stmt.execute(query.toString());

                out.print(0);
            } else {
                out.print(1);
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