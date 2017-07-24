<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null, stmt2 = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = null;

		String fromStoreId = MyRequestUtil.getString(request, "fromStoreId", null);
		String toStoreId = MyRequestUtil.getString(request, "toStoreId", null);
		String transferId = MyRequestUtil.getString(request, "transferId", null);

		int transferSid = 0, qty;
		String item_code;

		int isSerializableItem = -1; // 1: true, 0: false, -1: item is not an existing

		String transferData = MyRequestUtil.getString(request, "transferData", null);

		JSONObject transfer = null, jsonObj = null;
		JSONParser parser = null;

		JSONArray items = null;

		try {
		    if (user_sid == null || db_name == null || transferId == null || transferData == null) {
		        throw new Exception("no input parameters");
		    }

		    parser = new JSONParser();
		    transfer = (JSONObject) parser.parse(transferData);

		    if (transfer.get("items") == null) {
		        throw new Exception("items is not exists");
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query = new StringBuffer();
			query.append(String.format("INSERT INTO `%s`.`tb_inventory_trans_%s`(`trans_id`,`req_date`,`req_user_sid`,`from_store_id`,`to_store_id`,`status`) VALUES('%s',NOW(),'%s','%s','%s',0); SELECT LAST_INSERT_ID() AS `id`;",
					db_name, db_name, transferId, user_sid, fromStoreId, toStoreId
			));

			boolean hasMoreResultSets = stmt.execute(query.toString());

			while(hasMoreResultSets || stmt.getUpdateCount() != -1 ) {
			    if ( hasMoreResultSets ) {
                    rs = stmt.getResultSet();
                    if (rs.next()) {
                        transferSid = rs.getInt("id");
                    }
                    try {
                        if (rs != null && !rs.isClosed()) {
                            rs.close();
                        }
                    } catch (Exception e2) {

                    }
                } else {
                      if (stmt.getUpdateCount() == -1) break;
                }
                hasMoreResultSets = stmt.getMoreResults();
			}

            try {
                if (stmt != null && !stmt.isClosed()) {
                    stmt.close();
                }
            } catch (Exception e2) {

            }


            query.delete(0, query.length());

            items = (JSONArray)transfer.get("items");

            query.append(String.format("INSERT INTO `%s`.`tb_inventory_trans_items_%s`(`trans_sid`,`item_code`,`req_qty`) VALUES", db_name, db_name));

            for (int i = 0; i < items.size(); i++) {
                jsonObj = (JSONObject)items.get(i);
                if (jsonObj != null) {
                	item_code = (jsonObj.get("item_code") != null)?jsonObj.get("item_code").toString() : null;
                    qty = Integer.parseInt(jsonObj.get("qty").toString());

                    if (item_code == null) continue;

                    stmt2 = conn.createStatement();
                    rs = stmt2.executeQuery(String.format("SELECT `item_type` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`='%s'", db_name, toStoreId, item_code));
                    if (rs.next()) {
                        switch(rs.getInt("item_type")) {
                        case 0:
                        case 1:
                        case 2:
                            isSerializableItem = 1;
                            break;
                        case 3:
                            isSerializableItem = 0;
                            break;
                        default:
                            isSerializableItem = -1;
                        }
                    }
                    rs.close();
                    stmt2.close();

                    if (isSerializableItem == -1) {
                        continue;
                    } else if (isSerializableItem == 0) {
                        query.append(String.format("('%d','%s','%d')", transferSid, MyDBUtil.addSlashes(item_code), qty));
                    } else if (isSerializableItem == 1) {
                        for (int j = 0; j < qty; j++) {
                            query.append(String.format("('%d','%s','1')", transferSid, MyDBUtil.addSlashes(item_code)));
                            if (j < qty-1) {
                                query.append(",");
                            }
                        }
                    }
                }
                if (i < items.size()-1) {
                    query.append(",");
                }
            }

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

            sb.append("0");

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

			out.print("-1");
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>