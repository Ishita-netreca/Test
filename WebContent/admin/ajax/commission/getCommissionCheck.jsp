<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int profileSid = MyRequestUtil.getInt(request, "profileSid", 0);
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			
			query.append(String.format("SELECT DISTINCT `a`.*, `b`.`carrier` FROM (SELECT `target_type`, `target_sid`, IF(`target_type`=1,0,IF(`target_type`=2,1,-1)) AS `plan_type` "));
			query.append(String.format("FROM `%s`.`tb_commission_%s` WHERE `profile_sid` = '%d' ) AS `a` ", db_name, storeId, profileSid));
			query.append(String.format("LEFT JOIN (SELECT `carrier`,`plan_type` FROM `%s`.`tb_rateplan_%s`) AS `b` ON `a`.`plan_type` = `b`.`plan_type` ", db_name, storeId));
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
			
		} catch (Exception e) {
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
            
		}

		query = null;
%>