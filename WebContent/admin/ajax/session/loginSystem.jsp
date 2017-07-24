<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		int result = -1;
		int isOwner = 0;
		
		int store_manager_flag = 0;
		
		String owner_id = null;

		//String storeId = (session.getAttribute("posone_login_store_id") != null)? session.getAttribute("posone_login_store_id").toString() : null;
		String user_id = MyRequestUtil.getString(request, "userId", null);
		String password = MyRequestUtil.getString(request, "password", null);
		
		String timezone_id = null;
		
		String db_name = null;
		
		TimeZone mTimeZone = null;
		
		JSONObject user_info = null;
		JSONObject store_info = null, permission_info = null;
		JSONObject mJSONObject = null;
		JSONArray mJSONArray = null;

		try {
		    if (user_id == null || password == null) {
		        throw new Exception();
		    }
		    
		    query.append(String.format("SELECT `user`.*,`owner`.`owner_info_user_sid`,`owner`.`owner_info_user_id`,`master`.`master_info_user_sid`,`master`.`master_db_name` "));
		    query.append(String.format("FROM ( SELECT `sid`,`user_id`,`owner_sid`,`master_sid`,`group_sid` FROM `wrp`.`tb_user` WHERE `user_id`='%s' AND `password`='%s' ) AS `user` ", user_id, password));
		    query.append(String.format("LEFT JOIN ( SELECT `sid` AS `owner_info_user_sid`,`user_id` AS `owner_info_user_id` FROM `wrp`.`tb_user` ) AS `owner` ON `user`.`owner_sid`=`owner`.`owner_info_user_sid`"));
		    query.append(String.format(" LEFT JOIN ( SELECT `user_sid` AS `master_info_user_sid`,`db_name` AS `master_db_name` FROM `wrp`.`tb_master_info` ) AS `master` ON `user`.`master_sid`=`master`.`master_info_user_sid`"));
		    query.append(String.format(" LIMIT 0, 1"));
		    
		    user_info = MyDBUtil.getInstance().getObject(query.toString());		    

		    if (query.length() > 0) query.delete(0, query.length());
		    
		    if (user_info == null || user_info.get("sid") == null) { // user_id or password incorrect
		    	result = -1;
		    	throw new Exception();
		    }
		   
		    if (user_info.get("owner_info_user_sid") == null || user_info.get("owner_info_user_sid").toString().equals("0") || user_info.get("master_info_user_sid") == null || user_info.get("master_info_user_sid").toString().equals("0")) { // this user isn't allocated in owner or master
		    	result = -4;
		    	throw new Exception();
		    }
		    		    
		    if (user_info.get("master_db_name") == null) { // master_db_name isn't defined
		    	result = -5;
		    	throw new Exception();
		    }
					    
			if (user_info.get("owner_info_user_id") == null) { // owner_id isn't defined
				result = -5;
				throw new Exception();
			}
		    
		    db_name = user_info.get("master_db_name").toString();

		    if (user_info.get("sid").toString().equals(user_info.get("owner_info_user_sid").toString())) {
		    	
		    } else {
		    	
		    	query.append(String.format("SELECT `permission_struct`.`sid`, `permission_struct`.`permission_id`, IF(`permission_group`.`sid` IS NOT NULL OR `permission_user`.`sid` IS NOT NULL, 1, 0) AS `flag` FROM ("));
		    	query.append(String.format(" SELECT `sid`,`permission_id`,`description` FROM `wrp`.`tb_permission_struct_backend`) AS `permission_struct` LEFT JOIN ("));
    			query.append(String.format(" SELECT `sid`,`permission_struct_sid` FROM `%s`.`tb_permission_group_backend_%s` WHERE `permission_group_sid` IN (", db_name, user_info.get("owner_info_user_id").toString()));
    			query.append(String.format(" SELECT `permission_group_sid` FROM `%s`.`tb_permission_group_users_%s` WHERE `user_sid` IN (%s)", db_name, user_info.get("owner_info_user_id").toString(), user_info.get("sid").toString()));
    			query.append(String.format(" )) AS `permission_group` ON `permission_struct`.`sid`=`permission_group`.`permission_struct_sid` LEFT JOIN ("));
    			query.append(String.format(" SELECT `sid`,`permission_struct_sid` FROM `%s`.`tb_permission_user_backend_%s` WHERE `user_sid` IN (%s)", db_name, user_info.get("owner_info_user_id").toString(), user_info.get("sid").toString()));
    			query.append(String.format(" ) AS `permission_user` ON `permission_struct`.`sid`=`permission_user`.`permission_struct_sid`"));
			   	
		    	mJSONArray = MyDBUtil.getInstance().getList(query.toString());
		    	
		    	query.delete(0, query.length());
		    	if (mJSONArray == null || mJSONArray.size() < 1) {
		    		result = -3;
		    		throw new Exception();
		    	} else {
		    		permission_info = new JSONObject();	
		    		
		    		for (int i = 0; i < mJSONArray.size(); i++) {
		    			mJSONObject = (JSONObject)mJSONArray.get(i);
		    			if (mJSONObject.get("permission_id") == null) {
		    				continue;
		    			}
		    			
		    			if (mJSONObject.get("flag") != null && mJSONObject.get("flag").toString().equals("1")) {
		    				permission_info.put(mJSONObject.get("permission_id").toString(), 1);
		    			}
		    		}
		    		
		    		session.setAttribute("wrp_admin_login_user_permission_obj", permission_info);
		    	}
		    }
		    
		    query.append(String.format("SELECT COUNT(`access`.`store_id`) AS `store_count`, `access`.`store_id` AS `first_store_id`, `store`.`timezone_id` FROM ("));
		  	query.append(String.format(" SELECT `store_id` FROM `%s`.`tb_user_store_access` WHERE `user_sid`=%s", db_name, user_info.get("sid").toString()));
    		query.append(String.format(" ) AS `access` LEFT JOIN ("));
    		query.append(String.format(" SELECT `store_id`,`timezone_id` FROM `%s`.`tb_stores` ", db_name));
    		query.append(String.format(" ) AS `store` ON `access`.`store_id`=`store`.`store_id` WHERE `store`.`store_id` IS NOT NULL"));
    		query.append(String.format(" ORDER BY `access`.`store_id`"));
		    		    
	   		store_info = MyDBUtil.getInstance().getObject(query.toString());	 
    		query.delete(0, query.length());
    		
    		/* if (store_info == null) { // you aren't allowed to access any store
    			result = -2;
    			throw new Exception();
    		}*/
    		
    		/* 
		    if (store_info.get("store_count") == null || store_info.get("store_count").toString().equals("0")) { // you aren't allowed to access any store
		    	result = -2;
		    	throw new Exception();
		    } */
		    
		    session.setAttribute("posone_admin_login_user_sid", user_info.get("sid").toString());
		    session.setAttribute("posone_admin_login_user_id", user_info.get("user_id").toString().toUpperCase());
		    session.setAttribute("wrp_admin_login_user_sid", user_info.get("sid").toString());
		    session.setAttribute("wrp_admin_login_user_id", user_info.get("user_id").toString().toUpperCase());
		    session.setAttribute("wrp_admin_login_master_sid", user_info.get("master_info_user_sid").toString());
		    session.setAttribute("wrp_admin_store_owner_sid", user_info.get("owner_info_user_sid").toString());
		    
		    if (user_info.get("sid").toString().equals(user_info.get("owner_info_user_sid").toString())) {
		    	if (user_info.get("sid").toString().equals(user_info.get("master_info_user_sid").toString())) {
		    		session.setAttribute("wrp_admin_login_user_subdealer_flag", 1);
		    		session.setAttribute("wrp_admin_login_user_master_flag", 1);
			    } else {
		    		session.setAttribute("wrp_admin_login_user_subdealer_flag", 1);
		    		session.setAttribute("wrp_admin_login_user_master_flag", 0);
			    }
		    } else {
	    		session.setAttribute("wrp_admin_login_user_subdealer_flag", 0);
	    		session.setAttribute("wrp_admin_login_user_master_flag", 0);	
		    }

		    session.setAttribute("wrp_admin_login_owner_id", user_info.get("owner_info_user_id").toString()); // 추후 변경되어야 함
		    session.setAttribute("wrp_admin_store_owner_id", db_name);
		    session.setAttribute("wrp_admin_login_master_db_name", db_name);
		    
		    if (store_info.get("timezone_id") != null) {
		    	session.setAttribute("wrp_admin_selected_store_timezone_id", store_info.get("timezone_id").toString());
				mTimeZone = TimeZone.getTimeZone(store_info.get("timezone_id").toString());
				if(mTimeZone.inDaylightTime(new Date())) {
	           		session.setAttribute("wrp_admin_selected_store_timezone_offset", (mTimeZone.getOffset(0) / 3600000) + 1); 
				} else {
	           		session.setAttribute("wrp_admin_selected_store_timezone_offset", mTimeZone.getOffset(0) / 3600000); 
				}
		    } else {
		    	session.setAttribute("wrp_admin_selected_store_timezone_offset", 0);
		    }
		    
		    result = 0;

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		out.print(result);
		sb = null;
		query = null;
%>