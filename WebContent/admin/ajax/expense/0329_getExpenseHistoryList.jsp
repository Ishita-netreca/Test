<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		String search_start_date = MyRequestUtil.getString(request, "search_start_date", null);
		String search_end_date = MyRequestUtil.getString(request, "search_end_date", null);
		String user_sid = (session.getAttribute("posone_admin_login_user_sid") != null)? session.getAttribute("posone_admin_login_user_sid").toString() : null;
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		try {
		    if (store_id == null || user_sid == null || owner_id == null) {
		        throw new Exception();
		    }

			// 쿼리 입력
			query.append(String.format("SELECT `a`.*, `b`.`user_id`,`c`.`exp_name` FROM (SELECT * FROM `%s`.`tb_expense_history_%s`) AS `a`",owner_id,store_id));
			query.append(String.format(" LEFT JOIN(SELECT `sid`, `user_id`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `emp_name` FROM `wrp`.`tb_user`) AS `b` ON `a`.`emp_id`=`b`.`sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`, `name` AS `exp_name` FROM `%s`.`tb_expense_dict_%s`) AS `c` ON `a`.`exp_sid`=`c`.`sid` WHERE 1=1 ", owner_id, store_id));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            
			if (search_start_date != null && search_end_date != null) {
				query.append(String.format("AND (`date` BETWEEN '%s' AND '%s')", search_start_date, search_end_date));
			}
			
			if (keyword != null && keyword != "") {
				query.append(String.format("AND (`c`.`exp_name` LIKE '%%%s%%' OR `a`.`note` LIKE '%%%s%%')", keyword, keyword));
			}
			
			query.append(String.format(" ORDER BY `date` DESC"));
			out.print(MyDBUtil.getJSONString(query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>