<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		int po_sid = MyRequestUtil.getInt(request, "po_sid", 0);

		try {
		    if (store_id == null || po_sid == 0 || db_name == null) {
		        throw new Exception();
		    }
			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, String.format("SELECT `a`.`sid`,`a`.`po_id`, `a`.`status`, `b`.`vendor_id` FROM (SELECT `sid`,`po_id`,`status`,`vendor_id` FROM `%s`.`tb_po_%s` WHERE `sid`='%d') AS `a` LEFT JOIN `%s`.`tb_vendor` AS `b` ON `a`.`vendor_id`=`b`.`sid`", db_name, store_id, po_sid, db_name), false));
		} catch (Exception e) {

            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}
%>