<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.lang.invoke.MutableCallSite"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request,"storeId", null);
		
		String query;
		try {
			if (storeId == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query = String.format("DELETE FROM `%s`.`tb_promotion_%s` WHERE `sid` BETWEEN 1 AND 100000; INSERT INTO `%s`.`tb_promotion_%s` (SELECT * FROM `wrp`.`tb_promotion_[storeid]` WHERE `sid` BETWEEN 1 AND 100000);DELETE FROM `%s`.`tb_promotion_items_%s` WHERE `promotion_sid` BETWEEN 1 AND 100000;INSERT INTO `%s`.`tb_promotion_items_%s` (promotion_sid, carrier_sid, sku, new_act_price, upg_price, port_in_price, sor_price, aal_price, aal_max_qty, aal_bogo_price, aal_bogo_max_qty, aal_pogo_price, aal_pogo_max_qty) (SELECT promotion_sid, carrier_sid, sku, new_act_price, upg_price, port_in_price, sor_price, aal_price, aal_max_qty, aal_bogo_price, aal_bogo_max_qty, aal_pogo_price, aal_pogo_max_qty FROM `wrp`.`tb_promotion_items_[storeid]` WHERE `promotion_sid` BETWEEN 1 AND 100000);", db_name, storeId, db_name, storeId, db_name, storeId, db_name, storeId);
			stmt.execute(query);

			out.print("0");
		} catch (Exception e) {
			out.print("-1");
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>