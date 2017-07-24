<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.lang.invoke.MutableCallSite"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();
		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request,"storeId", null);
        int sid = MyRequestUtil.getInt(request, "sid", 0);
        String itemCode = MyRequestUtil.getString(request, "itemCode", null);
        String model = MyRequestUtil.getString(request, "model", null);
        String description = MyRequestUtil.getString(request, "description", null);
        String distributor = MyRequestUtil.getString(request, "distributor", null);
        int category = MyRequestUtil.getInt(request, "category", 0);
        int subCategory = MyRequestUtil.getInt(request, "subCategory", 0);
        String manufacturer = MyRequestUtil.getString(request, "manufacturer", null);
        String color = MyRequestUtil.getString(request, "color", null);
        String condition = MyRequestUtil.getString(request, "condition", null);
        String sku = MyRequestUtil.getString(request, "sku", null);
        String image = MyRequestUtil.getString(request, "image", null);
        float itemCost = MyRequestUtil.getFloat(request, "itemCost", 0);
        float retailPrice = MyRequestUtil.getFloat(request, "retailPrice", 0);
        float wholesalePrice = MyRequestUtil.getFloat(request, "wholesalePrice", 0);
        int itemType = MyRequestUtil.getInt(request, "itemType", 0);
        int serialized = MyRequestUtil.getInt(request, "serialized", 0);
        int disable = MyRequestUtil.getInt(request, "disable", 0);
        int qty = MyRequestUtil.getInt(request, "qty", 0);
        int binsid = MyRequestUtil.getInt(request, "binsid", 0);
        int vendor_sid = MyRequestUtil.getInt(request, "vendor_sid", 0);
        
        int inventory_sid = 0;
        int result = -1;
		
		PreparedStatementParams mPreparedStatementParams = null;

		try {
		    if (storeId == null || user_sid == null || db_name == null || itemCode == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			mPreparedStatementParams = new PreparedStatementParams();
			
            switch (itemType) {
                case 0:
                case 1:
                case 2:
                    serialized = 1;
                    break;
                case 3:
                    serialized =0;
                    break;
            }
            

            if (sid == 0) {
            /*
                boolean hasMoreResultSets = stmt.execute(
                        String.format(
                                "INSERT INTO `tb_item_dict_%s`(`item_code`,`model`,`description`,`distributor`,`category`,`sub_category`,`manufacturer`,`color`,`condition`,`sku`,`image`,`item_cost`,`retail_price`,`wholesale_price`,`item_type`,`serialized`,`update_date`,`updater`,`disable`) VALUES('%s','%s','%s','%s','%d','%d','%s','%s','%s','%s','%s','%f','%f','%f','%d','%d',NOW(),'%s','%d'); SELECT LAST_INSERT_ID() AS `id`;",
                                storeId, itemCode, model, description, distributor, category, subCategory, manufacturer, color, condition, sku, image, itemCost, retailPrice, wholesalePrice, itemType, serialized, userSid, disable
                        ));
*/

				query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` SET `update_date`=NOW(),`updater`='%s',", db_name, storeId, user_sid));
				query.append(String.format(" `sid`=(SELECT MAX(`a`.`sid`) FROM (SELECT IF(MAX(`sid`) < 300000, 300001, MAX(`sid`) + 1) AS `sid` FROM `%s`.`tb_item_dict_%s`) AS `a`), ",db_name, storeId));
				query.append(String.format(" `item_code`=?,"));
				mPreparedStatementParams.set(itemCode);
				if (model != null) {
					query.append(String.format(" `model`=?,"));
					mPreparedStatementParams.set(model);
				}
				if (description != null) {
					query.append(String.format(" `description`=?,"));
					mPreparedStatementParams.set(description);
				}
				if (distributor != null) {
					query.append(String.format(" `distributor`=?,"));
					mPreparedStatementParams.set(distributor);
				}
				query.append(String.format(" `category`=%d,", category));
				query.append(String.format(" `sub_category`=%d,", subCategory));
				if (manufacturer != null) {
					query.append(String.format(" `manufacturer`=?,"));
					mPreparedStatementParams.set(manufacturer);
				}
				if (color != null) {
					query.append(String.format(" `color`=?,"));
					mPreparedStatementParams.set(color);
				}
				if (condition != null) {
					query.append(String.format(" `condition`=?,"));
					mPreparedStatementParams.set(condition);
				}
				if (sku != null) {
					query.append(String.format(" `sku`=?,"));
					mPreparedStatementParams.set(sku);
				}
				query.append(String.format(" `item_cost`=%.2f,", itemCost));
				query.append(String.format(" `retail_price`=%.2f,", retailPrice));
				query.append(String.format(" `item_type`=%d,", itemType));
				query.append(String.format(" `serialized`=%d,", serialized));
				query.append(String.format(" `disable`=%d,", disable));
				query.append(String.format(" `vendor_sid`=%d;", vendor_sid));
				
				result = MyDBUtil.getInstance().execute(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams);
				if (query.length() > 0) query.delete(0, query.length());
				if (result != 0) {
					throw new Exception();
				}
				
				if (serialized == 0) {
					query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s` SET", db_name, storeId));
					query.append(String.format("`item_sid`=(SELECT MAX(`sid`) FROM `%s`.`tb_item_dict_%s` WHERE `item_code`=?),", db_name, storeId));
					mPreparedStatementParams.set(itemCode);
					query.append(String.format("`qty`=%d,`update_date`=NOW(),`updater`='%s'", qty, user_sid));
					result = MyDBUtil.getInstance().execute(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams);
					if (result != 0) {
						throw new Exception();
					}
				}
            } else {

				query.append(String.format("UPDATE `%s`.`tb_item_dict_%s` SET `update_date`=NOW(),`updater`='%s',", db_name, storeId, user_sid));
				query.append(String.format(" `item_code`=?,"));
				mPreparedStatementParams.set(itemCode);
				if (model != null) {
					query.append(String.format(" `model`=?,"));
					mPreparedStatementParams.set(model);
				}
				if (description != null) {
					query.append(String.format(" `description`=?,"));
					mPreparedStatementParams.set(description);
				}
				if (distributor != null) {
					query.append(String.format(" `distributor`=?,"));
					mPreparedStatementParams.set(distributor);
				}
				query.append(String.format(" `category`=%d,", category));
				query.append(String.format(" `sub_category`=%d,", subCategory));
				if (manufacturer != null) {
					query.append(String.format(" `manufacturer`=?,"));
					mPreparedStatementParams.set(manufacturer);
				}
				if (color != null) {
					query.append(String.format(" `color`=?,"));
					mPreparedStatementParams.set(color);
				}
				if (condition != null) {
					query.append(String.format(" `condition`=?,"));
					mPreparedStatementParams.set(condition);
				}
				if (sku != null) {
					query.append(String.format(" `sku`=?,"));
					mPreparedStatementParams.set(sku);
				}
				query.append(String.format(" `item_cost`=%.2f,", itemCost));
				query.append(String.format(" `retail_price`=%.2f,", retailPrice));
				query.append(String.format(" `item_type`=%d,", itemType));
				query.append(String.format(" `serialized`=%d,", serialized));
				query.append(String.format(" `disable`=%d,", disable));
				query.append(String.format(" `vendor_sid`=%d", vendor_sid));
				query.append(String.format(" WHERE `sid`=%d;", sid));
				
				result = MyDBUtil.getInstance().execute(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams);
				if (query.length() > 0) query.delete(0, query.length());
				if (result != 0) {
					throw new Exception();
				}
				
				if (serialized == 0) {
					query.append(String.format("SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `a`.`sid` FROM (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`=?) AS `a`);", db_name, storeId, db_name, storeId));
					mPreparedStatementParams.set(itemCode);
					
					inventory_sid = MyDBUtil.getInstance().getInt(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, "sid");

					if (query.length() > 0) query.delete(0, query.length());
					
					if (inventory_sid > 0) {
						query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=0 WHERE `item_sid` IN (SELECT `a`.`sid` FROM (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`=?) AS `a`);", db_name, storeId, db_name, storeId));
						mPreparedStatementParams.set(itemCode);
						query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET ", db_name, storeId));
						query.append(String.format("`qty`=%d WHERE `sid` IN (SELECT `a`.`sid` FROM (SELECT MAX(`sid`) AS `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_code`=?) ) AS `a` );", qty, db_name, storeId, db_name, storeId));
						mPreparedStatementParams.set(itemCode);
					} else {
						query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s` SET", db_name, storeId));
						query.append(String.format("`item_sid`=(SELECT MAX(`sid`) FROM `%s`.`tb_item_dict_%s` WHERE `item_code`=?),", db_name, storeId));
						mPreparedStatementParams.set(itemCode);
						query.append(String.format("`qty`=%d,`update_date`=NOW(),`updater`='%s'", qty, user_sid));
					}					
				
					result = MyDBUtil.getInstance().execute(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams);
					if (query.length() > 0) query.delete(0, query.length());
					if (result != 0) {
						throw new Exception();
					}
				}
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

			out.print(result);
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>