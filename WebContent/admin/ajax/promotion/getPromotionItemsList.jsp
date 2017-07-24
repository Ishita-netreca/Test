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
		int promotion_sid = MyRequestUtil.getInt(request, "promotion_sid", 0);

		try {
		    if (store_id == null || user_sid == null || db_name == null || promotion_sid < 1) {
		        throw new Exception();
		    }
			
			// 쿼리 입력
			query.append(String.format("SELECT `a`.*,`b`.`item_code`,`b`.`description`,`b`.`item_cost`,`c`.`carrier_id` FROM ("));
			query.append(String.format(" SELECT * FROM `%s`.`tb_promotion_items_%s` WHERE `promotion_sid`='%d'", db_name, store_id, promotion_sid));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid` AS `item_sid`,`item_code`,`description`,`sku`,`item_cost` FROM `%s`.`tb_item_dict_%s` WHERE", db_name, store_id));
			query.append(String.format(" `sku` IN (SELECT `sku` FROM `%s`.`tb_promotion_items_%s` WHERE `promotion_sid`='%d') ", db_name, store_id, promotion_sid));
			query.append(String.format(" ) AS `b` ON `a`.`sku`=`b`.`sku`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid`,`carrier_id` FROM `%s`.`tb_carrier` WHERE", db_name));
			query.append(String.format(" `sid` IN (SELECT `carrier_sid` FROM `%s`.`tb_promotion_items_%s` WHERE `promotion_sid`='%d') ", db_name, store_id, promotion_sid));
			query.append(String.format(" ) AS `c` ON `a`.`carrier_sid`=`c`.`sid`"));

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>