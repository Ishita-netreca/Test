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
		String clockIODate = MyRequestUtil.getString(request, "clockIODate", null);
		int emp_sid = MyRequestUtil.getInt(request, "emp_sid", 0);
		
		try {
		    if (store_id == null || clockIODate == null || db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `sid`,`emp_sid`,DATE_FORMAT(`date`,'%%m/%%d/%%Y') AS `date`,IF(`status`=0,'Work',IF(`status`=1,'Break',IF(`status`=2,'Lunch',-1))) AS `status`,DATE_FORMAT(`start`,'%%H:%%i') AS `start`,DATE_FORMAT(`end`,'%%H:%%i') AS `end`,`amount`,`pos_no`,`timezone_offset`,`memo` FROM `%s`.`tb_clock_io_%s` WHERE `date`=STR_TO_DATE('%s','%%m/%%d/%%Y') AND `emp_sid`=%d",db_name,store_id,clockIODate,emp_sid));

			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));
			
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		
		}

		query = null;
%>