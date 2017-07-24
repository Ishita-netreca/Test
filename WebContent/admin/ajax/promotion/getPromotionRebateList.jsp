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
			query.append(String.format("SELECT `a`.*, IF (`b`.`rebate_item_sid` IS NOT NULL, `b`.`rebate_item_sid`,'0') AS `rebate_item_sid`,"));
			query.append(String.format(" `b`.`new_act_rebate`,`b`.`upg_rebate`,`b`.`port_in_rebate`,`b`.`sor_rebate`,`b`.`aal_rebate`,`b`.`aal_bogo_rebate`,`b`.`aal_pogo_rebate`,"));
			query.append(String.format(" `c`.`description`,`c`.`retail_price` FROM ("));
			query.append(String.format(" SELECT `sid` AS `promotion_item_sid`,`promotion_sid`,`sku`,`new_act_price`,`upg_price`,`port_in_price`,`sor_price`,`aal_price`,`aal_bogo_price`,`aal_pogo_price`"));
			query.append(String.format(" FROM `%s`.`tb_promotion_items_%s` WHERE `promotion_sid` IN ('%d')",db_name,  store_id, promotion_sid));
			query.append(String.format(" ) AS `a`"));
			query.append(String.format(" LEFT JOIN (SELECT `sid` AS `rebate_item_sid`,`promotion_item_sid`,`new_act_rebate`,`upg_rebate`,`port_in_rebate`,`sor_rebate`,`aal_rebate`,`aal_bogo_rebate`,`aal_pogo_rebate`"));
			query.append(String.format(" FROM `%s`.`tb_rebate_items_%s` WHERE `promotion_item_sid` IN (SELECT `sid` FROM `%s`.`tb_promotion_items_%s` WHERE `promotion_sid` IN ('%d'))", db_name, store_id, db_name, store_id, promotion_sid));
			query.append(String.format(" ) AS `b` ON `a`.`promotion_item_sid`=`b`.`promotion_item_sid`"));
			query.append(String.format(" LEFT JOIN (SELECT `sku`,`description`,`retail_price` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN ('0')) AS `c` ON `a`.`sku`=`c`.`sku`", db_name, store_id));
			query.append(String.format(" ORDER BY `promotion_item_sid`"));
			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>