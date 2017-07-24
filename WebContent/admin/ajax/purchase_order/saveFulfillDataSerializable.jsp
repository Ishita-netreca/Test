<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int poSid = MyRequestUtil.getInt(request, "poSid", 0);
		int itemSid = MyRequestUtil.getInt(request, "itemSid", 0);
		String serialIDsStr = MyRequestUtil.getString(request, "serialIDs", null);
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;

		JSONArray serialIDs = null;
		JSONObject jsonObj = null;

		try {
		    if (storeId == null || poSid < 1 || itemSid < 1 || serialIDsStr == null || owner_id == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

            serialIDs = (JSONArray)new JSONParser().parse(serialIDsStr);

            // serialNo가 한번 작성 되고 수정 불가로 변경되면, 테이블 내의 serial_no column의 데이터 NULL 여부검사를 추가하면 됨
            for (int i = 0; i < serialIDs.size(); i++) {
                jsonObj = (JSONObject)serialIDs.get(i);
                if (jsonObj.get("serialNo") != null) {
                    query.append(String.format("UPDATE `%s`.`tb_po_items_%s` SET `fulfill_qty`='1',`serial_no`='%s',`status`='0' WHERE `sid`='%s' AND `po_sid`='%d' AND `item_sid`='%d'; ",
                    		owner_id, storeId, jsonObj.get("serialNo").toString().trim(), jsonObj.get("sid").toString(),
                    poSid, itemSid
                    ));
                } else {
                    query.append(String.format("UPDATE `%s`.`tb_po_items_%s` SET `fulfill_qty`='0',`serial_no`=NULL,`status`='-1' WHERE `sid`='%s' AND `po_sid`='%d' AND `item_sid`='%d'; ",
                    		owner_id, storeId, jsonObj.get("sid").toString(),
                    poSid, itemSid
                    ));
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