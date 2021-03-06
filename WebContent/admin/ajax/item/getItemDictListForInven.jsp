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

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String itemType = MyRequestUtil.getString(request, "itemType", null);
		String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));
		String searchImei = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "searchImei", null));
		int category = MyRequestUtil.getInt(request, "category", 0);
		int subCategory = MyRequestUtil.getInt(request, "subCategory", 0);
		int searchPhone = MyRequestUtil.getInt(request, "searchPhone", -1);
		int searchAcc = MyRequestUtil.getInt(request, "searchAcc", -1);
		int searchSim = MyRequestUtil.getInt(request, "searchSim", -1);
		int searchInstock = MyRequestUtil.getInt(request, "searchInstock", -1);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || db_name == null) {
		    	out.print("{\"data\":[]}");
		    } else {     
				mPreparedStatementParams = new PreparedStatementParams();
				
                query.append(String.format("SELECT `a`.*,`b`.`category`,`c`.`sub_category`,`d`.`qty`,`e`.`user_name`,`f`.`carrier_id` FROM ("));
                query.append(String.format(" SELECT `sid`,`item_code`,`model`,`description`,`distributor`,`category` AS `_category`,`sub_category` AS `_sub_category`,`manufacturer`,"));
                query.append(String.format(" `color`,`condition`,`sku`,`item_cost`,`retail_price`,`wholesale_price`,`item_type`,`image`,DATE_FORMAT(`update_date`,'%%m/%%d/%%Y') AS `update_date`,"));
                query.append(String.format(" `updater`,`disable`,`serialized`,`carrier_sid`"));
                query.append(String.format(" FROM `%s`.`tb_item_dict_%s` WHERE 1=1", db_name, storeId));
                if (keyword != null && keyword.length() > 0 ){
                    query.append(String.format(" AND (`item_code` LIKE ? OR `sku`=? OR `distributor` LIKE ? OR `manufacturer` LIKE ? OR `description` LIKE ?)"));       
    				mPreparedStatementParams.set(String.format("%%%s%%",keyword));     
    				mPreparedStatementParams.set(keyword);     
    				mPreparedStatementParams.set(String.format("%%%s%%",keyword));     
    				mPreparedStatementParams.set(String.format("%%%s%%",keyword));     
    				mPreparedStatementParams.set(String.format("%%%s%%",keyword));                  
                }
              	if (itemType != null && (searchPhone < 0 && searchSim < 0) && searchAcc < 0){
                    query.append(String.format(" AND (`item_type` IN (%s))",itemType));       
                }       
                if (category > 0 ){
                	if (query.indexOf("WHERE") == -1) {
                		query.append(" WHERE ");
                	} else {
                		query.append(" AND ");
                	}
                	query.append(String.format(" (`category`='%d')", category));   
                	if (subCategory > 0) {
                		query.append(String.format(" AND (`sub_category`='%d')", subCategory));
                	}
                }
                if (searchPhone > 0) {
                	query.append(String.format(" AND (`item_type`='0') "));
                } 
                if (searchAcc > 0) {
                	query.append(String.format(" AND (`item_type`='2' OR `item_type`='3') "));
                }   
                if (searchSim > 0) {
                	query.append(String.format(" AND (`item_type`='1') "));
                } 
                query.append(String.format(" ) AS `a`"));
                query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid` = 0) AS `b` ON `a`.`_category`=`b`.`sid`", db_name, storeId));
                query.append(String.format(" LEFT JOIN (SELECT `sid`,`category_name` AS `sub_category` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid` > 0) AS `c` ON `a`.`_sub_category`=`c`.`sid`", db_name, storeId));
                if (searchImei != null && searchImei.length() > 0) {
                	query.append(String.format("RIGHT JOIN (SELECT `item_sid`,SUM(`qty`) AS `qty` FROM `%s`.`tb_inventory_%s` WHERE `serial_no`=? GROUP BY `item_sid`) AS `d` ON `a`.`sid`=`d`.`item_sid` ", db_name, storeId));        
    				mPreparedStatementParams.set(searchImei);                             
                }else{
                	query.append(String.format("LEFT JOIN (SELECT `item_sid`,SUM(`qty`) AS `qty` FROM `%s`.`tb_inventory_%s` GROUP BY `item_sid`) AS `d` ON `a`.`sid`=`d`.`item_sid` ", db_name, storeId));
                }
    			
                query.append(String.format(" LEFT JOIN (SELECT `sid`,CONCAT_WS(' ',`first_name`,`middle_name`,`last_name`) AS `user_name` FROM `wrp`.`tb_user` WHERE `user_id`"));
                query.append(String.format(" IN (SELECT `user_id` FROM `%s`.`tb_user_store_access` WHERE `store_id`='%s')", db_name, storeId));
                query.append(String.format(" ) AS `e` ON `a`.`updater`=`e`.`sid`"));
                query.append(String.format(" LEFT JOIN (SELECT `sid`,`carrier_id` FROM `tb_carrier`) AS `f` ON `a`.`carrier_sid`=`f`.`sid`"));
                if (searchInstock > 0) {
                    query.append(String.format(" WHERE `d`.`qty` > 0"));                   
                }
                query.append(String.format(" ORDER BY `a`.`item_code`"));
                
                out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));
		    }

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>