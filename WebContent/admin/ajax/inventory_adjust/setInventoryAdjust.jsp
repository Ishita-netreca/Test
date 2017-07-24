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

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	
	int item_sid = MyRequestUtil.getInt(request, "item_sid", 0);
	int item_type = MyRequestUtil.getInt(request, "item_type", -1);
	int adjust_qty = MyRequestUtil.getInt(request, "adjust_qty", 0);
    String reason = MyRequestUtil.getString(request, "reason", "");
    String memo = MyRequestUtil.getString(request, "memo", "");
	int adjust_type = MyRequestUtil.getInt(request, "adjust_type", 0);
	int adjust_sid = 0;
	PreparedStatementParams mPreparedStatementParams = null;
	
	String serialno_list_str = MyRequestUtil.getString(request, "serialno_list_str", null);
	
	JSONArray serialno_list = null;
	JSONObject mJSONObject = null;
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		mPreparedStatementParams = new PreparedStatementParams();

		query.append(String.format("INSERT INTO `%s`.`tb_inventory_simple_adjust_%s` (`adjust_id`,`updater`,`date`,`reason`,`memo`,`adjust_type`) VALUES ",db_name,store_id));
		query.append(String.format("((SELECT * FROM(SELECT IF(MAX(`adjust_id`) IS NULL,1,MAX(`adjust_id`)+1) AS `adjust_id` FROM `%s`.`tb_inventory_simple_adjust_%s`) `adjust_id`), '%s', now(),'%s','%s',%d ); SELECT LAST_INSERT_ID() AS `id`;",db_name,store_id,user_sid,reason,MyDBUtil.addSlashes(memo),adjust_type));
		
		adjust_sid = MyDBUtil.getInstance().getInt(db_name, owner_id, store_id, query.toString(), "id");

       	query.delete(0, query.length());

       	if(item_type < 3){	//serialized items
    		serialno_list = (JSONArray) new JSONParser().parse(serialno_list_str);
       		for (int i = 0; i < serialno_list.size(); i++) {
    	    	mJSONObject = (JSONObject)serialno_list.get(i);
    	    	
    	    	if (mJSONObject.get("serial_no") == null) {
    	    		continue;
    	    	}
    	    	
    	    	switch(adjust_type){
    	    	case 1: //add
    	    		query.append(String.format("INSERT INTO `%s`.`tb_inventory_simple_adjust_items_%s` (`adjust_sid`,`item_sid`,`item_type`,`adjust_qty`,`serial_no`) VALUES (%d, %d, %d, '1','%s');",db_name,store_id,adjust_sid,item_sid,item_type,mJSONObject.get("serial_no").toString()));
            		query.append(String.format("INSERT INTO `%s`.`tb_missing_bin_%s` (`item_sid`,`qty`,`update_date`,`updater`,`serial_no`,`adjust_sid`) VALUES (%d, '-1', now(), '%s','%s',%d);",db_name,store_id,item_sid,user_sid,mJSONObject.get("serial_no").toString(),adjust_sid));
            		
            		query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s` (`item_sid`,`qty`,`item_cost`,`update_date`,`updater`,`serial_no`,`bin`)",db_name,store_id)); 
            		query.append(String.format("SELECT `sid` AS `item_sid`,'1' AS `qty`,`item_cost`,now() AS `update_date`,'%s' AS `updater`,'%s' AS `serial_no`,'1' AS `bin` FROM ",user_sid,mJSONObject.get("serial_no").toString())); 
            		query.append(String.format("`%s`.`tb_item_dict_%s` WHERE `sid`='%d'; ",db_name,store_id,item_sid)); 
            		break;
    	    	case 2: //subtract
    	    		query.append(String.format("INSERT INTO `%s`.`tb_inventory_simple_adjust_items_%s` (`adjust_sid`,`item_sid`,`item_type`,`adjust_qty`,`serial_no`) VALUES (%d, %d, %d, '-1','%s');",db_name,store_id,adjust_sid,item_sid,item_type,mJSONObject.get("serial_no").toString()));
            		query.append(String.format("INSERT INTO `%s`.`tb_missing_bin_%s` (`item_sid`,`qty`,`update_date`,`updater`,`serial_no`,`adjust_sid`) VALUES (%d, '1', now(), '%s','%s',%d);",db_name,store_id,item_sid,user_sid,mJSONObject.get("serial_no").toString(),adjust_sid));
            		query.append(String.format("DELETE FROM `%s`.`tb_inventory_%s` WHERE `serial_no`='%s';",db_name,store_id,mJSONObject.get("serial_no").toString())); 
            		//query.append(String.format("UPDATE `%s`.`tb_inventory_%s` AS `inven` SET `inven`.`qty`=(`inven`.`qty`-1), `updater`='%s' WHERE `serial_no`='%s';",db_name,store_id,user_sid,mJSONObject.get("serial_no").toString())); 
            		break;
    	    	}
    	    }
       	}else{	//non-serialized items
    		query.append(String.format("INSERT INTO `%s`.`tb_inventory_simple_adjust_items_%s` (`adjust_sid`,`item_sid`,`item_type`,`adjust_qty`) VALUES (%d, %d, %d, %d);",db_name,store_id,adjust_sid,item_sid,item_type,adjust_qty));
    		query.append(String.format("INSERT INTO `%s`.`tb_missing_bin_%s` (`item_sid`,`qty`,`update_date`,`updater`,`adjust_sid`) VALUES (%d, -%d, now(), '%s',%d);",db_name,store_id,item_sid,adjust_qty,user_sid,adjust_sid));
    		query.append(String.format("UPDATE `%s`.`tb_inventory_%s` AS `inven` SET `inven`.`qty`=(`inven`.`qty`+ %d), `updater`='%s' WHERE `item_sid`='%d' LIMIT 1;",db_name,store_id,adjust_qty,user_sid,item_sid)); 
    		
    		query.append(String.format("INSERT INTO `%s`.`tb_inventory_%s` (`item_sid`,`qty`,`item_cost`,`update_date`,`updater`,`bin`)",db_name,store_id)); 
    		query.append(String.format("SELECT `sid` AS `item_sid`,%d AS `qty`,`item_cost`,now() AS `update_date`,'%s' AS `updater`,'1' AS `bin` FROM ",adjust_qty,user_sid)); 
    		query.append(String.format("`%s`.`tb_item_dict_%s` WHERE `sid` NOT IN (SELECT `item_sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid`='%d') AND `sid`='%d'; ",db_name,store_id,db_name,store_id,item_sid,item_sid)); 
       	}

       	
		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams)); 

	} catch (Exception e) {
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>