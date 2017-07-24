<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String store1Id = MyRequestUtil.getString(request, "store1Id", null);
		String store2Id = MyRequestUtil.getString(request, "store2Id", null);

		String keyword = MyDBUtil.addSlashes(MyRequestUtil.getString(request, "keyword", null));
		
		int searchPhone = MyRequestUtil.getInt(request, "searchPhone", 0);
		int searchAcc = MyRequestUtil.getInt(request, "searchAcc", 0);
		int searchSim = MyRequestUtil.getInt(request, "searchSim", 0);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (store1Id == null || store2Id == null || db_name == null) {
		        throw new Exception();
		    }
			if (keyword != null && keyword.length() > 0) {
				keyword = String.format("%%%s%%",keyword);
			}
			mPreparedStatementParams = new PreparedStatementParams();

            query.append(String.format("SELECT `a`.`_item_code`,`bc`.`model`,`bc`.`description`,`bc`.`sku`,`bc`.`qty`,`bc`.`item_code` FROM ("));
            query.append(String.format("SELECT `sku` AS `_sku`,`item_code` AS `_item_code` FROM `%s`.`tb_item_dict_%s`", db_name, store1Id));
            query.append(String.format(") AS `a` RIGHT JOIN ("));
            query.append(String.format("SELECT `b`.`item_code`,`b`.`model`,`b`.`description`,`b`.`sku`,`c`.`qty` FROM ("));
            query.append(String.format("SELECT `sid`,`model`,`description`,`sku`,`item_code` FROM `%s`.`tb_item_dict_%s` WHERE 1=1 ", db_name, store2Id));
            if (searchPhone > 0) {
            	query.append(String.format("AND (`item_type`='0') "));
            }
            if (searchAcc > 0) {
            	if(query.indexOf("AND") == -1){
            		query.append(" AND ");
            	} else{
            		query.append(" OR ");
            	}
            	query.append(String.format(" (`item_type`='2' OR `item_type`='3') "));
            }   
            if (searchSim > 0) {
            	if(query.indexOf("AND") == -1){
            		query.append(" AND ");
            	} else{
            		query.append(" OR ");
            	}
            	query.append(String.format(" (`item_type`='1') "));
            } 
            query.append(String.format(") AS `b` LEFT JOIN ("));
            query.append(String.format("SELECT `item_sid`,SUM(`qty`) AS `qty` FROM `%s`.`tb_inventory_%s` GROUP BY `item_sid` ", db_name, store2Id));
            query.append(String.format(") AS `c` ON `b`.`sid`=`c`.`item_sid`"));
            query.append(String.format(") AS `bc` ON `a`.`_item_code`=`bc`.`item_code` WHERE `a`.`_item_code` IS NOT NULL AND `qty` > 0"));
            if (keyword != null && keyword.length() > 0 ){
                query.append(String.format(" AND (`description` LIKE ? OR `item_code`=? OR `model` LIKE ?)"));          
				mPreparedStatementParams.set(keyword);          
				mPreparedStatementParams.set(keyword);          
				mPreparedStatementParams.set(keyword);                    
            }
            query.append(String.format(" ORDER BY `item_code`;"));

        	out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store1Id, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
		sb = null;
%>