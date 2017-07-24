<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		
		int coupon_sid = MyRequestUtil.getInt(request, "coupon_sid", -1);
		
		String name = MyRequestUtil.getString(request, "name", null);
		String description = MyRequestUtil.getString(request, "description", null);
		int discount_type = MyRequestUtil.getInt(request, "discount_type", -1);
		float max_discount_price = MyRequestUtil.getFloat(request, "max_discount_price", -1);
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);
		int apply_count = MyRequestUtil.getInt(request, "apply_count", -1);
		int visible = MyRequestUtil.getInt(request, "visible", -1);
		String coupon_code = MyRequestUtil.getString(request, "coupon_code", null);
		String target_items = MyRequestUtil.getString(request, "target_items", null);
		int multiple_apply = MyRequestUtil.getInt(request, "multiple_apply", -1);
		int printable = MyRequestUtil.getInt(request, "printable", -1);
		int print_flag = MyRequestUtil.getInt(request, "print_flag", -1);
		int coupon_id = MyRequestUtil.getInt(request, "coupon_id", -1);
		
		PreparedStatementParams mPreparedStatementParams = null;

		// target_items 데이터 형식이 /,1,2,3,/ 인 이유
		// 쿠폰의 target category를 조회할 때, 어떤 쿠폰의 target_items column에 2,11,111 일 경우
		// LIKE %1,%을 조건으로 조회하면 11, 또는 111,이 조건이 부합되지만,
		// ,2,11,111, 일 때 LIKE %,1,%을 조건으로 조회하면 조건에 걸리지 않기 때문에 필터링이 잘못 되는 것을 방지할 수 있다.

		try {
		    if (store_id == null || user_sid == null || db_name == null || coupon_sid < 0) {
		        throw new Exception();
		    }
		    
		    if (name == null || description == null || discount_type < 0 || max_discount_price < 0
		     || start_date == null || end_date == null || apply_count < 0 || visible < 0
		     || target_items == null || multiple_apply < 0 || printable < 0 || print_flag < 0 || coupon_id < 0) {
		    	throw new Exception();
		    }
			mPreparedStatementParams = new PreparedStatementParams();
			
			// 쿼리 입력
			if (coupon_sid == 0) {
				query.append(String.format("INSERT INTO `%s`.`tb_coupon_%s` SET", db_name, store_id));
				query.append(String.format(" `name`=?,"));
				mPreparedStatementParams.set(name);
				query.append(String.format(" `description`=?,"));
				mPreparedStatementParams.set(description);
				query.append(String.format(" `discount_type`='%d',", discount_type));
				query.append(String.format(" `max_discount_price`='%f',", max_discount_price));
				query.append(String.format(" `start_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", start_date));
				query.append(String.format(" `end_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", end_date));
				query.append(String.format(" `apply_count`='%d',", apply_count));
				query.append(String.format(" `visible`='%d',", visible));
				query.append(String.format(" `coupon_code`=?,"));
				mPreparedStatementParams.set(coupon_code);
				query.append(String.format(" `target_items`='%s',", target_items));
				query.append(String.format(" `multiple_apply`='%d',", multiple_apply));
				query.append(String.format(" `printable`='%d',", printable));
				query.append(String.format(" `print_flag`='%d',", print_flag));
				query.append(String.format(" `coupon_id`='%d',", coupon_id));
				query.append(String.format(" `update_date`=NOW(),`updater`='%s';", user_sid));
			} else {
				query.append(String.format("UPDATE `%s`.`tb_coupon_%s` SET", db_name, store_id));
				query.append(String.format(" `name`=?,"));
				mPreparedStatementParams.set(name);
				query.append(String.format(" `description`=?,"));
				mPreparedStatementParams.set(description);
				query.append(String.format(" `discount_type`='%d',", discount_type));
				query.append(String.format(" `max_discount_price`='%f',", max_discount_price));
				query.append(String.format(" `start_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", start_date));
				query.append(String.format(" `end_date`=STR_TO_DATE('%s','%%m/%%d/%%Y'),", end_date));
				query.append(String.format(" `apply_count`='%d',", apply_count));
				query.append(String.format(" `visible`='%d',", visible));
				query.append(String.format(" `coupon_code`=?,"));
				mPreparedStatementParams.set(coupon_code);
				query.append(String.format(" `target_items`='%s',", target_items));
				query.append(String.format(" `multiple_apply`='%d',", multiple_apply));
				query.append(String.format(" `printable`='%d',", printable));
				query.append(String.format(" `print_flag`='%d',", print_flag));
				query.append(String.format(" `coupon_id`='%d',", coupon_id));
				query.append(String.format(" `update_date`=NOW(),`updater`='%s' WHERE `sid`='%d';", user_sid, coupon_sid));
			}

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams)); 

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
            out.print("-1");
		}
		query = null;
%>