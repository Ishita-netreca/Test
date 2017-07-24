<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();
		
		//String sid = MyRequestUtil.getString(request, "sid", null);
		int userSid = MyRequestUtil.getInt(request, "userSid", 0);
		String userId = MyRequestUtil.getString(request, "userId", null);
		String password = MyRequestUtil.getString(request, "password", null);
		String firstName = MyRequestUtil.getString(request, "firstName", null);
		String middleName = MyRequestUtil.getString(request, "middleName", null);
		String lastName = MyRequestUtil.getString(request, "lastName", null);
		int userType = 98;
		String address1 = MyRequestUtil.getString(request, "address1", null);
		String address2 = MyRequestUtil.getString(request, "address2", null);
		String city = MyRequestUtil.getString(request, "city", null);
		String state = MyRequestUtil.getString(request, "state", null);
		String zipcode = MyRequestUtil.getString(request, "zipcode", null);
		String tel = MyRequestUtil.getString(request, "tel", null);
		String email = MyRequestUtil.getString(request, "email", null);
		String account_type = "1";
		String license = MyRequestUtil.getString(request, "license", "0");
		int disable = 1;

		try {
		    if (db_name == null || userId == null) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			if (userSid == 0) {
				
				MyDBUtil.getInstance().execute(String.format("INSERT INTO `wrp`.`tb_user`(`user_id`,`password`,`user_type`,`first_name`,`middle_name`,`last_name`,`address1`,`address2`,`city`,`state`,`zipcode`,`tel`,`email`,`disable`,`hire_date`,`master_sid`) VALUES(  '%s',       '%s',     '%d',         '%s',       '%s',          '%s',      '%s',      '%s',    '%s',  '%s',    '%s',   '%s',  '%s',   '%d',              now(),        '%s');",
                        userId, password, userType, firstName, middleName, lastName, address1, address2, city, state, zipcode, tel, email, disable, master_sid
));
				int sid = MyDBUtil.getInstance().getInt(String.format("SELECT sid FROM `wrp`.`tb_user` WHERE user_id = '%s';", userId), "sid");
				
				query.append(String.format("INSERT INTO `wrp`.`tb_owner_info`(`user_id`,`license`,`master_sid`,`account_type`,`user_sid`) VALUES('%s','%s','%s','%s','%d');",
	                    userId, license, master_sid, account_type, sid
	                ));
				query.append(String.format("UPDATE wrp.`tb_user` SET `owner_sid`='%d' WHERE `sid`='%d';", sid, sid));
				
				
				/*
				query.append(String.format("INSERT INTO `%s`.`tb_coupon_%s` SET", owner_id, store_id));
				query.append(String.format(" `name`='%s',", name));
				query.append(String.format(" `description`='%s',", description));
				query.append(String.format(" `discount_type`='%d',", discount_type));
				query.append(String.format(" `max_discount_price`='%f',", max_discount_price));
				query.append(String.format(" `start_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", start_date));
				query.append(String.format(" `end_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", end_date));
				query.append(String.format(" `apply_count`='%d',", apply_count));
				query.append(String.format(" `visible`='%d',", visible));
				query.append(String.format(" `coupon_code`='%s',", coupon_code));
				query.append(String.format(" `target_items`='%s',", target_items));
				query.append(String.format(" `multiple_apply`='%d',", multiple_apply));
				query.append(String.format(" `printable`='%d',", printable));
				query.append(String.format(" `print_flag`='%d',", print_flag));
				query.append(String.format(" `coupon_id`='%d',", coupon_id));
				query.append(String.format(" `update_date`=NOW(),`updater`='%s';", user_sid));
				*/
			} else {
				/*
				query.append(String.format("UPDATE `%s`.`tb_coupon_%s` SET", owner_id, store_id));
				query.append(String.format(" `name`='%s',", name));
				query.append(String.format(" `description`='%s',", description));
				query.append(String.format(" `discount_type`='%d',", discount_type));
				query.append(String.format(" `max_discount_price`='%f',", max_discount_price));
				query.append(String.format(" `start_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", start_date));
				query.append(String.format(" `end_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", end_date));
				query.append(String.format(" `apply_count`='%d',", apply_count));
				query.append(String.format(" `visible`='%d',", visible));
				query.append(String.format(" `coupon_code`='%s',", coupon_code));
				query.append(String.format(" `target_items`='%s',", target_items));
				query.append(String.format(" `multiple_apply`='%d',", multiple_apply));
				query.append(String.format(" `printable`='%d',", printable));
				query.append(String.format(" `print_flag`='%d',", print_flag));
				query.append(String.format(" `coupon_id`='%d',", coupon_id));
				query.append(String.format(" `update_date`=NOW(),`updater`='%s' WHERE `sid`='%d';", user_sid, coupon_sid));
				*/
			}

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().execute(query.toString())); 

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
            out.print("-1");
		}
		query = null;
%>