<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		PreparedStatementParams mPreparedStatementParams = null;
		
		String storeId = MyRequestUtil.getString(request, "storeId", null);
		
		int audit_sid = MyRequestUtil.getInt(request, "audit_sid", 0);
		String sku = MyRequestUtil.getString(request, "sku", null);

		try {
		    if (storeId == null || sku == null || audit_sid < 1|| db_name == null) {
		        throw new Exception();
		    }
		    
		    mPreparedStatementParams = new PreparedStatementParams();
		    
			query.append(String.format("("));
			query.append(String.format(" SELECT `sid`,`audit_sid`,`item_sid`,`inventory_sid`,`system_qty`,`scanned_qty` FROM `%s`.`tb_audit_items_%s`", db_name, storeId));
			query.append(String.format(" WHERE `audit_sid` IN (?) AND"));
			mPreparedStatementParams.set(audit_sid);
			query.append(String.format(" `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku` IN (?) AND `item_type`='3')", db_name, storeId));
			mPreparedStatementParams.set(sku);
			query.append(String.format(" ) UNION ("));
			query.append(String.format(" SELECT '0' AS `sid`,? AS `audit_sid`,`item_sid`,`sid` AS `inventory_sid`,SUM(`qty`) AS `system_qty`, '0' AS `scanned_qty`"));
			mPreparedStatementParams.set(audit_sid);
			query.append(String.format(" FROM `%s`.`tb_inventory_%s`", db_name,storeId));
			query.append(String.format(" WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku` IN (?) AND `item_type`='3') ", db_name, storeId));
			mPreparedStatementParams.set(sku);
			query.append(String.format(" GROUP BY `item_sid`"));
			query.append(String.format(" ) UNION ("));
			query.append(String.format(" SELECT '0' AS `sid`,? AS `audit_sid`,`sid` AS `item_sid`,'0' AS `inventory_sid`,'0' AS `system_qty`, '0' AS `scanned_qty`"));
			mPreparedStatementParams.set(audit_sid);
			query.append(String.format(" FROM `%s`.`tb_item_dict_%s`",db_name,storeId));
			query.append(String.format(" WHERE `sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `sku` IN (?) AND `item_type`='3') ", db_name, storeId));
			mPreparedStatementParams.set(sku);
			query.append(String.format(" ) LIMIT 0, 1"));

			out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams, true));
			query.delete(0, query.length());

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		query = null;
		sb = null;
%>