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
	String audit_id = MyRequestUtil.getString(request, "audit_id", "");
	String start_time = MyRequestUtil.getString(request, "start_time", "");
	String end_time = MyRequestUtil.getString(request, "end_time", "");
	String memo = MyRequestUtil.getString(request, "memo", "");
	String item_type = MyRequestUtil.getString(request, "item_type", null);
	
	int audit_sid = 0;

	String serialno_list_str = MyRequestUtil.getString(request, "serialno_list_str", null);
	String nonserialno_list_str = MyRequestUtil.getString(request, "nonserialno_list_str", null);

	JSONArray serialno_list = null;
	JSONArray nonserialno_list = null;
	JSONObject mJSONObject = null;
	
	PreparedStatementParams mPreparedStatementParams = null;
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
       		out.print(-1);
       		throw new Exception();
	    }
		
		// 쿼리 입력
		mPreparedStatementParams = new PreparedStatementParams();
		
		query.append(String.format("INSERT INTO `%s`.`tb_inventory_audit_%s` (`audit_type`,`audit_date`,`audit_user_sid`,`update_date`,`update_user_sid`,`memo`,`audit_id`,`audit_start_date`,`audit_end_date`,`audit_item_type`) VALUES ",db_name,store_id));
		query.append(String.format("(0,now(),'%s',now(),'%s','%s','%s',STR_TO_DATE('%s','%%m-%%d-%%Y %%H:%%i:%%s'),STR_TO_DATE('%s','%%m-%%d-%%Y %%H:%%i:%%s') ,'%s'); SELECT LAST_INSERT_ID() AS `id`;",user_sid,user_sid,MyDBUtil.addSlashes(memo),audit_id,start_time,end_time,item_type));
		
		audit_sid = MyDBUtil.getInstance().getInt(db_name, owner_id, store_id, query.toString(), "id");

       	query.delete(0, query.length());
       	
       	if (audit_sid < 1) {
       		out.print(-2);
       		throw new Exception();
       	}
		
       	if(serialno_list_str.length() > 2){
       		serialno_list = (JSONArray) new JSONParser().parse(serialno_list_str);
       		for (int i = 0; i < serialno_list.size(); i++) {
    	    	mJSONObject = (JSONObject)serialno_list.get(i);
    	    	
    	    	if (mJSONObject.get("serial_no") == null) {
    	    		continue;
    	    	}

	    	    query.append(String.format("INSERT INTO `%s`.`tb_inventory_audit_items_%s` (`audit_sid`,`item_sid`,`inventory_sid`,`serial_no`,`system_qty`,`scanned_qty`,`item_type`) VALUES",db_name,store_id));
	    	    query.append(String.format(" (%d, %d, %d,'%s',%d,1,%d);",audit_sid,Integer.parseInt(mJSONObject.get("item_sid").toString()),Integer.parseInt(mJSONObject.get("inventory_sid").toString()),mJSONObject.get("serial_no").toString(),Integer.parseInt(mJSONObject.get("system_qty").toString()),Integer.parseInt(mJSONObject.get("item_type").toString())));
    	    	
    	    }
       	}
       	
       	if(nonserialno_list_str.length() > 2){
       		nonserialno_list = (JSONArray) new JSONParser().parse(nonserialno_list_str);
       		
       		for (int i = 0; i < nonserialno_list.size(); i++) {
    	    	mJSONObject = (JSONObject)nonserialno_list.get(i);
    	    	
    	    	if (mJSONObject.get("item_sid") == null) {
    	    		continue;
    	    	}
    	    	
    	    	query.append(String.format("INSERT INTO `%s`.`tb_inventory_audit_items_%s` (`audit_sid`,`item_sid`,`inventory_sid`,`system_qty`,`scanned_qty`,`item_type`)",db_name,store_id));
    	    	query.append(String.format(" SELECT '%d' AS `audit_sid`,`item_sid`,`sid` AS `inventory_sid`, SUM(`qty`) AS `system_qty`,'%d' AS `scanned_qty`,'3' AS `item_type`",audit_sid,Integer.parseInt(mJSONObject.get("scanned_qty").toString())));
    	    	query.append(String.format(" FROM `%s`.`tb_inventory_%s` WHERE `item_sid`=%d GROUP BY `item_sid`;",db_name,store_id,Integer.parseInt(mJSONObject.get("item_sid").toString())));
    	    	
    	    }
       		
       	}
       	
       	if (MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams) != 0) {
       		out.print(-3);
       		throw new Exception();
       	}
       	
       	if (query.length() > 0) query.delete(0, query.length());
       	
       	query.append(String.format("INSERT INTO `%s`.`tb_inventory_audit_items_%s` (`audit_sid`,`inventory_sid`,`item_sid`,`serial_no`,`system_qty`,`scanned_qty`,`missing_bin_sid`,`item_type`)", db_name, store_id));
       	query.append(String.format(" SELECT `inven`.*,`item_dict`.`item_type` FROM ("));
        query.append(String.format(" SELECT %d AS `audit_sid`,`sid` AS `inventory_sid`,`item_sid`,`serial_no`,`qty` AS `system_qty`, 0 AS `scanned_qty`, 0 AS `missing_bin_sid`", audit_sid));
        query.append(String.format(" FROM `%s`.`tb_inventory_%s` WHERE `qty` > 0 AND `sid` NOT IN (SELECT `inventory_sid` FROM `%s`.`tb_inventory_audit_items_%s` WHERE `audit_sid`=%d)", db_name, store_id, db_name, store_id, audit_sid));
        if (item_type != null && item_type.length() > 0) {
            query.append(String.format(" ) AS `inven` LEFT JOIN (SELECT `sid`,`item_type` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (%s)) AS `item_dict` ON `inven`.`item_sid`=`item_dict`.`sid`", db_name, store_id, item_type));
        } else {
            query.append(String.format(" ) AS `inven` LEFT JOIN (SELECT `sid`,`item_type` FROM `%s`.`tb_item_dict_%s`) AS `item_dict` ON `inven`.`item_sid`=`item_dict`.`sid`", db_name, store_id));
        }

       	
       	if (MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams) != 0) {
       		out.print(-4);
       		throw new Exception();
       	}
       	

       	out.print(0);

	} catch (Exception e) {
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
       	out.print(-1);
	}
	query = null;
%>