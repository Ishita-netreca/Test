<%//170207 jh%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		StringBuffer query = new StringBuffer();
		String store_id = MyRequestUtil.getString(request, "storeId", null);
		String user_sid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
		
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		
		String itemSid = MyRequestUtil.getString(request, "itemSid", null);
		try {
		    if (store_id == null || user_sid == null || owner_id == null) {
		        throw new Exception();
		    }
			// 쿼리 입력
			query.append(String.format("SELECT * FROM (SELECT `b`.`sid`, `b`.`invoice_no`, `b`.`qty`, `b`.`serial_no` FROM `%s`.`tb_invoice_items_%s` AS `b`", owner_id, store_id));
			query.append(String.format(" LEFT JOIN `%s`.`tb_inventory_%s` AS `a` ON `a`.`sid` = `b`.`inventory_sid` WHERE `a`.`item_sid` = '%s') AS `d`", owner_id, store_id, itemSid));
			query.append(String.format(" LEFT JOIN (SELECT `c`.`invoice_no`, `c`.`date`, `d`.`user_id` FROM `%s`.`tb_invoice_%s` AS `c`, `wrp`.`tb_user` AS `d` WHERE `c`.`emp_id` = `d`.`sid`) AS `e` ON `e`.`invoice_no` = `d`.`invoice_no`;", owner_id, store_id));  
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
			out.print(MyDBUtil.getJSONString(query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>