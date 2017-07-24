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
	
	int transSid = MyRequestUtil.getInt(request, "transSid", 0);

	String transItemsStr = MyRequestUtil.getString(request, "transItems", null);
	String[] trans_sid_arr = null;

	JSONArray transItems = null;
	JSONObject jsonObj = null;
	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
	        throw new Exception();
	    }

		mPreparedStatementParams = new PreparedStatementParams();

	    transItems = (JSONArray)(new JSONParser().parse(transItemsStr));
	    for (int i = 0; i < transItems.size(); i++) {
            jsonObj = (JSONObject)transItems.get(i);
            if (jsonObj.get("sid") == null) continue;

            if(Integer.parseInt(jsonObj.get("item_type").toString()) > 2){
                query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='%d' WHERE `sid`='%s' AND `trans_sid`='%d' AND `item_code`='%s';",
                		db_name,db_name, Integer.parseInt(jsonObj.get("apprQty").toString()), jsonObj.get("sid").toString(), transSid, jsonObj.get("itemCode").toString()));
            }else {
            	int j=0;
            	query.append(String.format("SELECT GROUP_CONCAT(`sid` SEPARATOR ',') AS `sid_list_str` FROM `%s`.`tb_inventory_trans_items_%s` WHERE `item_code` IN ('%s') AND `trans_sid` IN (%d);",db_name,db_name,jsonObj.get("itemCode").toString(),transSid));
            	trans_sid_arr = MyDBUtil.getInstance().getString(db_name, owner_id, store_id, query.toString(), "sid_list_str").split(",");

            	query.delete(0, query.length());
            	
            	if(Integer.parseInt(jsonObj.get("apprQty").toString()) == 0 ){
            		query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='0' WHERE `trans_sid`='%d' AND `item_code`='%s' AND `sid` IN (%d); ",
                    		db_name, db_name, transSid, jsonObj.get("itemCode").toString(), Integer.parseInt(trans_sid_arr[j])
                    ));
            	}else if(trans_sid_arr.length >= Integer.parseInt(jsonObj.get("apprQty").toString())){
            		for(j = 0; j < Integer.parseInt(jsonObj.get("apprQty").toString()); j++){
                		query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='1' WHERE `trans_sid`='%d' AND `item_code`='%s' AND `sid` IN (%d); ",
                        		db_name, db_name, transSid, jsonObj.get("itemCode").toString(), Integer.parseInt(trans_sid_arr[j])
                        ));
            		}
            	}else{
            		int variance = Integer.parseInt(jsonObj.get("apprQty").toString()) - trans_sid_arr.length;

            		for(j=0; j < trans_sid_arr.length; j++){
                		query.append(String.format("UPDATE `%s`.`tb_inventory_trans_items_%s` SET `appr_qty`='1' WHERE `trans_sid`='%d' AND `item_code`='%s' AND `sid` IN (%d); ",
                        		db_name, db_name, transSid, jsonObj.get("itemCode").toString(), Integer.parseInt(trans_sid_arr[j])
                        ));
            		}
            		
            		for(int k=0; k < variance; k++){
            			query.append(String.format("INSERT INTO `%s`.`tb_inventory_trans_items_%s` (`trans_sid`,`item_code`,`appr_qty`) VALUES (%d, '%s', 1);", db_name,db_name,transSid,jsonObj.get("itemCode").toString()));
            		}
            		
            	}

            }
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