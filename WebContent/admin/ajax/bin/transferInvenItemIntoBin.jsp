<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "storeId", null);
		int inventory_sid = MyRequestUtil.getInt(request, "inventory_sid", 0);
		int bin_sid = MyRequestUtil.getInt(request, "bin_sid", 0);
		int qty = MyRequestUtil.getInt(request ,"qty", 0);

		PreparedStatementParams mPreparedStatementParams = null;
		
		int other_inventory_sid = 0;
		int result = -1;
		JSONObject jsonObj = null;

		try {
		    if (store_id == null || inventory_sid < 1 || bin_sid < 1 || db_name == null) {
		        throw new Exception();
		    }
		    
			mPreparedStatementParams = new PreparedStatementParams();
			
			// 쿼리 입력
			query.append(String.format("SELECT `a`.`item_sid`,`a`.`bin`,`b`.`item_type`,`c`.`other_inventory_sid` FROM ("));
			query.append(String.format(" SELECT '1358' AS `unmentioned`, `item_sid`,`bin` FROM `%s`.`tb_inventory_%s` WHERE `sid`=?", db_name, store_id));
			mPreparedStatementParams.set(inventory_sid);
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`item_type` FROM `%s`.`tb_item_dict_%s` ", db_name, store_id));
			query.append(String.format(" WHERE `sid` IN (SELECT `item_sid` FROM `%s`.`tb_inventory_%s` WHERE `sid`=?)", db_name, store_id));
			mPreparedStatementParams.set(inventory_sid);
			query.append(String.format(" ) AS `b` ON `a`.`item_sid`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT '1358' AS `unmentioned`, `sid` AS `other_inventory_sid` FROM `%s`.`tb_inventory_%s`", db_name, store_id));
			query.append(String.format(" WHERE `item_sid` IN (SELECT `item_sid` FROM `%s`.`tb_inventory_%s` WHERE `sid`=?)", db_name, store_id));
			mPreparedStatementParams.set(inventory_sid);
			query.append(String.format(" AND `bin`=?"));
			mPreparedStatementParams.set(bin_sid);
			query.append(String.format(" ) AS `c` ON `a`.`unmentioned`=`c`.`unmentioned`"));
			
			jsonObj = MyDBUtil.getInstance().getObject(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams);
			
			query.delete(0, query.length());
			
			if (jsonObj == null) {
				result = -2;
				throw new Exception();
			}
			
			if(jsonObj.get("item_sid") == null || jsonObj.get("item_type") == null) {
				result = -4;
				throw new Exception();
			}
			
			if(jsonObj.get("other_inventory_sid") != null) {
				other_inventory_sid = Integer.parseInt(jsonObj.get("other_inventory_sid").toString());
			} else {
				other_inventory_sid = 0;
			}
			
			if (!jsonObj.get("item_type").toString().equals("3")) {
				query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `bin`=?, `update_date`=NOW(), `updater`=? WHERE `sid`=?;"
						, db_name, store_id));
				mPreparedStatementParams.set(bin_sid);
				mPreparedStatementParams.set(user_sid);
				mPreparedStatementParams.set(inventory_sid);
			} else {		
				query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `qty`=`qty`-?, `update_date`=NOW(), `updater`=? WHERE `sid`=?;"
						, db_name, store_id));	
				mPreparedStatementParams.set(qty);
				mPreparedStatementParams.set(user_sid);
				mPreparedStatementParams.set(inventory_sid);	
				if (other_inventory_sid == 0) {
					query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s` SET `bin`=?, `item_sid`=?, `qty`=?, `update_date`=NOW(), `updater`=?;"
							, db_name, store_id));
					mPreparedStatementParams.set(bin_sid);
					mPreparedStatementParams.set(jsonObj.get("item_sid").toString());
					mPreparedStatementParams.set(qty);
					mPreparedStatementParams.set(user_sid);
				} else {
					query.append(String.format("UPDATE `%s`.`tb_inventory_%s` SET `bin`=?, `item_sid`=?, `qty`=`qty`+?, `update_date`=NOW(), `updater`=? WHERE `sid`=?;"
							, db_name, store_id));
					mPreparedStatementParams.set(bin_sid);
					mPreparedStatementParams.set(jsonObj.get("item_sid").toString());
					mPreparedStatementParams.set(qty);
					mPreparedStatementParams.set(user_sid);
					mPreparedStatementParams.set(other_inventory_sid);
				}
			}
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            result = MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams);

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
        
        out.print(result);
        jsonObj = null;
		query = null;
%>