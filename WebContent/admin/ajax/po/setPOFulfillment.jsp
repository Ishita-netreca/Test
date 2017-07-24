<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", null);
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", session.getAttribute("wrp_admin_selected_store_timezone_offset").toString());
	
	int po_sid = MyRequestUtil.getInt(request, "po_sid", 0), sid = 0, item_type = 0;
	
	String ordered_po_items_list = MyRequestUtil.getString(request, "ordered_po_items_list", null);
	
	JSONArray jsonArr = null;
	JSONObject jsonObj = null;
	
	try {
	    if (store_id == null || user_sid == null || db_name == null || ordered_po_items_list == null || po_sid < 1) {
	        throw new Exception();
	    }
		
		// 쿼리 입력
		jsonArr = (JSONArray)(new JSONParser()).parse(ordered_po_items_list);
		
		for (int i = 0; i < jsonArr.size(); i++) {
			jsonObj = (JSONObject)jsonArr.get(i);
			if (jsonObj.get("sid") == null || jsonObj.get("item_type") == null || jsonObj.get("item_sid") == null) {
				continue;
			}
			try {
				sid = Integer.parseInt(jsonObj.get("sid").toString());
				item_type = Integer.parseInt(jsonObj.get("item_type").toString());
			} catch (Exception e) {
				continue;
			}
			
			if (item_type < 0 || item_type > 3) {
				continue;
			}
			
			if (sid > 0) {
				query.append(String.format("UPDATE "));
			} else {
				query.append(String.format("INSERT INTO "));				
			}			
			
			query.append(String.format("`%s`.`tb_po_items_%s` SET", db_name, store_id));
			
			if (sid < 1) {
				query.append(String.format("`item_sid`=%s,", jsonObj.get("item_sid").toString()));
			}
			
			switch (item_type) {
			case 0:
			case 1:
			case 2:
				if (jsonObj.get("input_serial_no") != null) {
					query.append(String.format("`serial_no`='%s',`fulfill_qty`=1,", jsonObj.get("input_serial_no").toString()));
				} else {
					query.append(String.format("`fulfill_qty`=0,"));
				}
				break;
			case 3:
				query.append(String.format("`fulfill_qty`=%s,", jsonObj.get("fulfill_qty").toString()));
				break;
			}
			query.append(String.format("`status`=0,`po_sid`=%d,`fee_sid`=0", po_sid));		
			
			if (sid > 0) {
				query.append(String.format(" WHERE `sid`=%d", sid));
			}
			
			query.append(";");
		}
		
		query.append(String.format("UPDATE `%s`.`tb_po_%s` SET `status`=2,`fulfiller_id`=%s,`fulfill_date`=NOW() WHERE `sid`=%d;", db_name, store_id, user_sid, po_sid));

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString()));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	query = null;
%>