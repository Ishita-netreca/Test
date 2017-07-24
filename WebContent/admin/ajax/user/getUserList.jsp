<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer sb = new StringBuffer();
		StringBuffer query = new StringBuffer();

		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
		
		String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
		int searchType = MyRequestUtil.getInt(request, "searchType", 0);
		String searchKeyword = MyRequestUtil.getString(request, "searchKeyword", null);
		String selectedStoreId = MyRequestUtil.getString(request, "selectedStoreId", null);
		String ownerSid = (session.getAttribute("wrp_admin_store_owner_sid") != null)? session.getAttribute("wrp_admin_store_owner_sid").toString() : null;
		String ownerId = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
        int userType = MyRequestUtil.getInt(request, "userType", -1);
        int userRoleSid = MyRequestUtil.getInt(request, "userRoleSid", -1);
        int disableFlag = MyRequestUtil.getInt(request, "disableFlag", 0);
		if (searchKeyword != null) {
		    searchKeyword = searchKeyword.replaceAll("'","''");
		}
		
		try {
		    if (user_sid == null || db_name == null) {
		       throw new Exception();
		    }
			query.append("SELECT `a`.*,`b`.`role_name` AS `roleName` FROM (");
			
			query.append(String.format("SELECT `sid`,`user_id` AS `userId`,`password`,`first_name` AS `firstName`,`last_name` AS `lastName`,"));
			query.append(String.format(" `address1`,`address2`,`city`,`state`,`zipcode`,`tel`,`email`,`payroll_id` AS `payrollId`,"));
			query.append(String.format(" `disable`,`user_role` AS `userRole`,DATE_FORMAT(`hire_date`,'%%m/%%d/%%Y') AS `hireDate`,`user_type`,`group_sid`,"));
			query.append(" IF(`middle_name` IS NOT NULL && `middle_name`!='',CONCAT(`first_name`,' ',`middle_name`,' ',`last_name`),CONCAT(`first_name`,' ',`last_name`)) AS `userName`, CONCAT_WS(' ',`address1`,`address2`,`city`,`state`,`zipcode`) AS `address` FROM `wrp`.`tb_user` WHERE 1=1");
			
			if (master_user_flag) {
				query.append(String.format(" AND `sid`!=`master_sid`")); // hidden master and owner
				query.append(String.format(" AND `master_sid` IN (SELECT `master_sid` FROM `wrp`.`tb_user` WHERE `sid`='%s')", user_sid));
			} else {
				query.append(String.format(" AND `sid`!=`master_sid` AND `sid`!=`owner_sid`")); // hidden master and owner
				query.append(String.format(" AND `owner_sid` IN (SELECT `owner_sid` FROM `wrp`.`tb_user` WHERE `sid`='%s')", user_sid));
			}
			
			if (selectedStoreId != null) {
				query.append(String.format(" AND `sid` IN (SELECT `user_sid` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, selectedStoreId));
			}

			if (searchType > -1 && (searchKeyword != null && searchKeyword.length() > 0)) {
                switch (searchType) {
                case 0:
                    query.append(String.format(" AND (`user_id` LIKE '%%%s%%' OR (`first_name` LIKE '%%%s%%' OR `last_name` LIKE '%%%s%%'))", searchKeyword, searchKeyword, searchKeyword));
                    break;
                case 1:
                    query.append(String.format(" AND `user_id` LIKE '%%%s%%'", searchKeyword));
                    break;
                case 2:
                    query.append(String.format(" AND (`first_name` LIKE '%%%s%%' OR `last_name` LIKE '%%%s%%')", searchKeyword, searchKeyword));
                    break;
                }
			}

			if (userRoleSid > -1) {
			    query.append(String.format(" AND `user_role`='%d'", userRoleSid));
			}

			if(disableFlag < 1){
				query.append(" AND `disable`=0");
			}
			query.append(" ) AS `a` LEFT JOIN (");
			query.append(String.format("SELECT `sid`,`name` AS `role_name` FROM `%s`.`tb_role_%s`", db_name, db_name));
			if (userRoleSid > -1) {
			    query.append(String.format(" WHERE `sid`='%d'", userRoleSid));
			}

			query.append(") AS `b` ON `a`.`userRole`=`b`.`sid` GROUP BY `a`.`sid`");
			out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		sb = null;
		query = null;
%>