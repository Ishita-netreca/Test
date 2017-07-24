<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		int userSid = MyRequestUtil.getInt(request, "userSid", 0);
		String userId = MyRequestUtil.getString(request, "userId", null);
		String password = MyRequestUtil.getString(request, "password", null);
		String firstName = MyRequestUtil.getString(request, "firstName", null);
		String middleName = MyRequestUtil.getString(request, "middleName", null);
		String lastName = MyRequestUtil.getString(request, "lastName", null);
		int userType = MyRequestUtil.getInt(request, "userType", -1);
		String address1 = MyRequestUtil.getString(request, "address1", null);
		String address2 = MyRequestUtil.getString(request, "address2", null);
		String city = MyRequestUtil.getString(request, "city", null);
		String state = MyRequestUtil.getString(request, "state", null);
		String zipcode = MyRequestUtil.getString(request, "zipcode", null);
		String tel = MyRequestUtil.getString(request, "tel", null);
		String email = MyRequestUtil.getString(request, "email", null);
		int disable = MyRequestUtil.getInt(request, "disable", 0);
		int userRole = MyRequestUtil.getInt(request, "userRole", 0);
		String insertAssignedStoreList = MyRequestUtil.getString(request, "insertAssignedStoreList", null);
		String deleteAssignedStoreList = MyRequestUtil.getString(request, "deleteAssignedStoreList", null);
		String hire_date = MyRequestUtil.getString(request, "hire_date", null);
		
		String store_id = MyRequestUtil.getString(request, "store_id", null);
		
		int result = -1;

		String [] arr = null;

		try {
		    if (db_name == null) {
		    	result = -1;
		        throw new Exception();
		    }
		    
		    if (userSid > 0) {
		    	query.append(String.format("UPDATE `wrp`.`tb_user` SET"));
		    } else {
		    	query.append(String.format("INSERT INTO `wrp`.`tb_user` SET"));
			    query.append(String.format(" `owner_sid`='%s',`master_sid`='%s',", owner_sid, master_sid));
		    }
		    
		    query.append(String.format(" `user_id`='%s'", userId));
		    query.append(String.format(",`password`='%s'", password));
		    if (firstName != null) query.append(String.format(",`first_name`='%s'", firstName));
		    if (lastName != null) query.append(String.format(",`last_name`='%s'", lastName));
		    if (address1 != null) query.append(String.format(",`address1`='%s'", address1));
		    if (address2 != null) query.append(String.format(",`address2`='%s'", address2));
		    if (city != null) query.append(String.format(",`city`='%s'", city));
		    if (state != null) query.append(String.format(",`state`='%s'", state));
		    if (zipcode != null) query.append(String.format(",`zipcode`='%s'", zipcode));
		    if (tel != null) query.append(String.format(",`tel`='%s'", tel));
		    if (email != null) query.append(String.format(",`email`='%s'", email));
		    if (hire_date != null) query.append(String.format(",`hire_date`=STR_TO_DATE('%s','%%m/%%d/%%Y')", hire_date));
		    query.append(String.format(",`disable`=%d", disable));
		    query.append(String.format(",`user_role`=%d", userRole));
		    
		    if (userSid > 0) {
		    	query.append(String.format(" WHERE `sid`=%d;", userSid));
		    }
            
            result = MyDBUtil.getInstance().execute(query.toString());
            
            if (query.length() > 0) query.delete(0, query.length());
            
            if (result == 1062) {
            	out.print(result);
            	return;
            }
		    
		    if (store_id != null) {
		    	result = -2;
		    	query.append(String.format("DELETE FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s' AND `user_sid`=(SELECT `sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s');", db_name, store_id, userId));
		    	query.append(String.format("INSERT INTO `%s`.`tb_user_store_access` SET `store_id`='%s', `user_sid`=(SELECT `sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s');", db_name, store_id, userId));
		    	MyDBUtil.getInstance().execute(query.toString());
		    }
		    
		    /*
		    
		    if (userType == -1) {
		    	if (userSid > 0) {
		    		sb.append(String.format("SELECT `user_type` FROM `wrp`.`tb_user` WHERE `sid`='%d';", userSid));
		    		userType = MyDBUtil.getInt(sb.toString(), "user_type");
		    		sb.delete(0, sb.length());
		    	}
		    }

            if (userSid > 0) {
                sb.append(String.format("UPDATE `wrp`.`tb_user` SET `user_id`='%s',%s`user_type`='%d',`first_name`='%s',`middle_name`='%s',`last_name`='%s',`address1`='%s',`address2`='%s',`city`='%s',`state`='%s',`zipcode`='%s',`tel`='%s',`email`='%s',`disable`='%d',`user_role`='%d', `hire_date`='%s',`group_sid`='%d' WHERE `sid`='%d';",
                    userId, (password != null && password.length() > 0)? String.format("`password`='%s',",password): "", userType, firstName, middleName, lastName, address1, address2, city, state, zipcode, tel, email, disable, userRole, date, permissionGroup,userSid
                ));
            } else {
            	
            	rs = stmt.executeQuery("SELECT * FROM wrp.`tb_user` WHERE `user_id`='"+ userId +"';");
            	if(rs.next()){ out.print("1062");	return;}
            	
                sb.append(String.format("INSERT INTO `wrp`.`tb_user`(`user_id`,`password`,`user_type`,`first_name`,`middle_name`,`last_name`,`address1`,`address2`,`city`,`state`,`zipcode`,`tel`,`email`,`disable`,`owner_sid`,`user_role`,`hire_date`,`group_sid`) VALUES('%s','%s','%d','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%d','%s','%d', '%s','%d');",
                    userId, password, userType, firstName, middleName, lastName, address1, address2, city, state, zipcode, tel, email, disable, ownerSid, userRole, date,permissionGroup
                ));
            }
            
            result = MyDBUtil.execute(sb.toString());
            
            if (sb.length() > 0) sb.delete(0, sb.length());
            
            if (result == 1062) {
            	out.print(result);
            	return;
            }
            /*
            if (insertAssignedStoreList != null && insertAssignedStoreList.length() > 0) {
                arr = insertAssignedStoreList.split(",");
                if (arr.length > 0) {
                    sb.append(String.format("DELETE FROM `%s`.`tb_user_store_access` WHERE `user_id`='%s';", db_name, userId));    
                    sb.append(String.format("INSERT INTO `%s`.`tb_user_store_access`(`store_id`,`user_id`) VALUES", db_name));
                    for (int i = 0 ; i < arr.length; i++) {
                        if (arr[i].length() == 0) continue;
                        sb.append(String.format("('%s','%s')",arr[i],userId));
                        if (i < arr.length - 1) sb.append(",");
                    }
                    if (userType < 4) {
                        sb.append(String.format("DELETE FROM `%s`.`tb_manager_store_assigned` WHERE `user_id`='%s';", db_name, userId));      
                        sb.append(String.format("INSERT INTO `%s`.`tb_manager_store_assigned`(`store_id`,`user_id`) VALUES", db_name));
                        for (int i = 0 ; i < arr.length; i++) {
                            if (arr[i].length() == 0) continue;
                            sb.append(String.format("('%s','%s')",arr[i],userId));
                            if (i < arr.length - 1) sb.append(",");
                        }                	
                    }
                }
            }
            */
            
            result = 0;

		} catch (Exception e) {

            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

            
		}
		
		out.print(result);
		
		query = null;
%>