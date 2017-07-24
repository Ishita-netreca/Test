<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		try {
		    if (db_name == null) {
		        throw new Exception();
		    }

			query.append(String.format("SELECT `a`.*,`b`.`user_name` AS 'userName',`b`.`user_id` FROM("));
			query.append(String.format("SELECT `sid`,`name`,DATE_FORMAT(`update_date`,'%%m/%%d/%%Y %%H:%%i:%%s') as `updateDate`,`updater` FROM `%s`.`tb_permission_group_%s`", db_name, db_name));
			if(!master_user_flag){
				query.append(String.format(" WHERE `updater`='%s'",user_sid));
			}
            query.append(String.format(") AS `a` LEFT JOIN ("));
            query.append(String.format("SELECT `sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name`,`user_id` FROM `wrp`.`tb_user`"));
            query.append(String.format(") AS `b` ON `a`.`updater`=`b`.`sid`"));

            out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
            
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		query = null;
%>