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
		Statement stmt = null, stmt2 = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = null;

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String userSid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		String poId = MyRequestUtil.getString(request, "poId", null);
		String express = MyRequestUtil.getString(request, "express", null);
		int poSid = 0, qty, itemSid;
		float cost;
		String description;

		int isSerializableItem = -1; // 1: true, 0: false, -1: item is not an existing

		String pOrderData = MyRequestUtil.getString(request, "pOrderData", null);

		JSONObject po = null, jsonObj = null;
		JSONParser parser = null;

		JSONArray items = null;

		try {
		    if (userSid == null || storeId == null || poId == null || pOrderData == null || owner_id == null) {
		        throw new Exception("no input parameters");
		    }

		    parser = new JSONParser();
		    po = (JSONObject) parser.parse(pOrderData);

		    if (po.get("vendorSid") == null || po.get("items") == null) {
		        throw new Exception("Either vendor sid or items is not exists");
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query = new StringBuffer();
			if(express.equals("true"))	query.append(String.format("INSERT INTO `%s`.`tb_po_%s`(`vendor_id`,`po_id`,`status`,`orderer_id`,`fulfiller_id`,`order_date`) VALUES('%s','%s','2','%s','%s',NOW()); SELECT LAST_INSERT_ID() AS `id`;", owner_id, storeId, po.get("vendorSid").toString(), poId, userSid, userSid));
			else{	query.append(String.format("INSERT INTO `%s`.`tb_po_%s`(`vendor_id`,`po_id`,`status`,`orderer_id`,`order_date`) VALUES('%s','%s','0','%s', NOW()); SELECT LAST_INSERT_ID() AS `id`;", owner_id, storeId, po.get("vendorSid").toString(), poId, userSid));	}
			boolean hasMoreResultSets = stmt.execute(query.toString());

			while(hasMoreResultSets || stmt.getUpdateCount() != -1 ) {
			    if ( hasMoreResultSets ) {
                    rs = stmt.getResultSet();
                    if (rs.next()) {
                        poSid = rs.getInt("id");
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

            items = (JSONArray)po.get("items");
/*170213 jh : fee sid �߰�*/
            query.append(String.format("INSERT INTO `%s`.`tb_po_items_%s`(`po_sid`,`item_sid`,`order_qty`,`fee_sid`,`fulfill_qty`,`receive_qty`,`item_cost`,`description`) VALUES", owner_id, storeId));

            for (int i = 0; i < items.size(); i++) {
                jsonObj = (JSONObject)items.get(i);
                
                if (jsonObj != null) {
                	qty = Integer.parseInt(jsonObj.get("qty").toString());
                    itemSid = Integer.parseInt(jsonObj.get("sid").toString());
                    cost = Float.parseFloat(jsonObj.get("cost").toString());
                    description = jsonObj.get("description").toString();
                    
					if(itemSid > 0){
	                    stmt2 = conn.createStatement();
	                    rs = stmt2.executeQuery(String.format("SELECT `serialized` FROM `%s`.`tb_item_dict_%s` WHERE `sid`='%d'", owner_id, storeId, itemSid));
	                    if (rs.next()) {
	                        switch(rs.getInt("serialized")) {
	                        case 0:
	                            isSerializableItem = 0;
	                            break;
	                        case 1:
	                            isSerializableItem = 1;
	                            break;
	                        }
	                    }
	                    rs.close();
	                    stmt2.close();
	
	                    if (isSerializableItem == -1) {
	                        continue;
	                    } else if (isSerializableItem == 0) {
	                    	if(express.equals("true"))	query.append(String.format("('%d','%d','%d','0','%d','0','%f','%s')", poSid, itemSid, qty, qty, cost, description));
	                    	else 						query.append(String.format("('%d','%d','%d','0','0','0','%f','%s')", poSid, itemSid, qty, cost, description));
	                    } else if (isSerializableItem == 1) {
	                        for (int j = 0; j < qty; j++) {
	                        	if(express.equals("true"))	query.append(String.format("('%d','%d','1','0','1','0','%f','%s')", poSid, itemSid, cost, description));
	                        	else						query.append(String.format("('%d','%d','1','0','0','0','%f','%s')", poSid, itemSid, cost, description));
	                            if (j < qty-1) {
	                                query.append(",");
	                            }
	                        }
	                    }
					}
					
					else{
						if(itemSid == -1)	itemSid = 10;
						else				itemSid = 11;
						query.append(String.format("('%d','0','%d','%d','1','1','%f','%s')", poSid, qty, itemSid, cost, description));
					}
                }
                if (i < items.size()-1) {
                    query.append(",");
                }
            }
/*fee sid end*/
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