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
		String emp_id = MyRequestUtil.getString(request, "emp_id", null);
		int profile_sid = MyRequestUtil.getInt(request, "profile_sid", 0);
		String start_date = MyRequestUtil.getString(request, "start_date", null);
		String end_date = MyRequestUtil.getString(request, "end_date", null);

		PreparedStatementParams mPreparedStatementParams = null;
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			mPreparedStatementParams = new PreparedStatementParams();
			// 쿼리 입력
		   
			query.append(String.format("SELECT `a`.*,`b`.`name`,IF(`a`.`target_sid`=0,'Phone',`c`.`category_name` )AS `description` FROM (SELECT `commission`.`profile_sid`,`commission`.`target_sid`, `commission`.`type`, `commission`.`from`, `commission`.`to`, `commission`.`commission_value`,`commission`.`target_type`,SUM(`invoice`.`qty`) AS `qty`, SUM(`invoice`.`subtotal`) AS `total` "));
			query.append(String.format("FROM (SELECT * FROM `%s`.`tb_commission_%s` WHERE `target_type`=0 AND `profile_sid`='%d') AS `commission`", db_name, store_id, profile_sid));
			query.append(String.format("LEFT JOIN(SELECT `invoice_no`,`qty`,`item_type`,`rateplan_sid`,`rateplan_type`,`subtotal`,`category`,`sub_category`,`name` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
			query.append(String.format("WHERE `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id` = ?", db_name, store_id));
			mPreparedStatementParams.set(emp_id);
			if (start_date != null && end_date != null) {
				query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ? ", timezone_offset.toString()));
				mPreparedStatementParams.set(start_date);
				mPreparedStatementParams.set(end_date);
			}
			query.append(String.format(" )) AS `invoice` ON (`commission`.`target_sid`=`invoice`.`category` OR `commission`.`target_sid`=`invoice`.`sub_category`) GROUP BY `target_sid` ) AS `a` "));
			query.append(String.format("LEFT JOIN (SELECT `name`,`sid` FROM `%s`.`tb_commission_profile_%s`) AS `b` ON `a`.`profile_sid`=`b`.`sid` ", db_name, store_id));
			query.append(String.format("LEFT JOIN (SELECT `category_name`,`sid` FROM `%s`.`tb_categories_dict_%s`) AS `c` ON `a`.`target_sid`=`c`.`sid` ", db_name, store_id));
			query.append(String.format("WHERE `a`.`qty` BETWEEN `a`.`from` AND `a`.`to` "));
			query.append(String.format("UNION "));
			query.append(String.format("SELECT `a`.*,`b`.`name`,IF(`a`.`target_sid`=0,'Primary Plans',`c`.`description`) AS `description` FROM (SELECT `commission`.`profile_sid`,`commission`.`target_sid`, `commission`.`type`, `commission`.`from`, `commission`.`to`, `commission`.`commission_value`,`commission`.`target_type`,SUM(`invoice`.`qty`) AS `qty`, SUM(`invoice`.`subtotal`) AS `total` "));
			query.append(String.format("FROM (SELECT * FROM `%s`.`tb_commission_%s` WHERE `target_type`=1 AND `profile_sid`='%d') AS `commission` ", db_name, store_id,profile_sid));
			query.append(String.format(""));
			query.append(String.format("LEFT JOIN(SELECT `invoice_no`,`qty`,`item_type`,`rateplan_sid`,`rateplan_type`,`subtotal`,`category`,`sub_category`,`name` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
			query.append(String.format("WHERE `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id` = ?", db_name, store_id));
			mPreparedStatementParams.set(emp_id);
			if (start_date != null && end_date != null) {
				query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ? ", timezone_offset.toString()));
				mPreparedStatementParams.set(start_date);
				mPreparedStatementParams.set(end_date);
			}
			query.append(String.format(") AND `item_type`=2 AND `rateplan_type`=0 ) AS `invoice` ON (`commission`.`target_sid`=`invoice`.`rateplan_sid`) GROUP BY `target_sid` ) AS `a` "));
			query.append(String.format("LEFT JOIN (SELECT `name`,`sid` FROM `%s`.`tb_commission_profile_%s`) AS `b` ON `a`.`profile_sid`=`b`.`sid` ", db_name, store_id));
			query.append(String.format("LEFT JOIN (SELECT `description`,`sid` FROM `%s`.`tb_rateplan_%s`) AS `c` ON `a`.`target_sid`=`c`.`sid` ", db_name, store_id));
			query.append(String.format("WHERE `a`.`qty` BETWEEN `a`.`from` AND `a`.`to` "));
			query.append(String.format("UNION "));
			query.append(String.format("SELECT `a`.*,`b`.`name`,IF(`a`.`target_sid`=0,'Features Data Plans',`c`.`description`) AS `description` FROM (SELECT `commission`.`profile_sid`,`commission`.`target_sid`, `commission`.`type`, `commission`.`from`, `commission`.`to`, `commission`.`commission_value`,`commission`.`target_type`,SUM(`invoice`.`qty`) AS `qty`, SUM(`invoice`.`subtotal`) AS `total` "));
			query.append(String.format("FROM (SELECT * FROM `%s`.`tb_commission_%s` WHERE `target_type`=2 AND `profile_sid`='%d') AS `commission` ", db_name, store_id, profile_sid));
			query.append(String.format("LEFT JOIN(SELECT `invoice_no`,`qty`,`item_type`,`rateplan_sid`,`rateplan_type`,`subtotal`,`category`,`sub_category`,`name` FROM `%s`.`tb_invoice_items_%s` ", db_name, store_id));
			query.append(String.format("WHERE `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `emp_id` = ?", db_name, store_id));
			mPreparedStatementParams.set(emp_id);
			if (start_date != null && end_date != null) {
				query.append(String.format(" AND DATE_FORMAT(DATE_ADD(`date`, INTERVAL %s HOUR), '%%m/%%d/%%Y') BETWEEN ? AND ? ", timezone_offset.toString()));
				mPreparedStatementParams.set(start_date);
				mPreparedStatementParams.set(end_date);
			}
			query.append(String.format(") AND `item_type`=2 AND `rateplan_type`=1 ) AS `invoice` ON (`commission`.`target_sid`=`invoice`.`rateplan_sid`) GROUP BY `target_sid` ) AS `a` "));
			query.append(String.format("LEFT JOIN (SELECT `name`,`sid` FROM `%s`.`tb_commission_profile_%s`) AS `b` ON `a`.`profile_sid`=`b`.`sid` ", db_name, store_id));
			query.append(String.format("LEFT JOIN (SELECT `description`,`sid` FROM `%s`.`tb_rateplan_%s`) AS `c` ON `a`.`target_sid`=`c`.`sid` ", db_name, store_id));
			query.append(String.format("WHERE `a`.`qty` BETWEEN `a`.`from` AND `a`.`to` "));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>