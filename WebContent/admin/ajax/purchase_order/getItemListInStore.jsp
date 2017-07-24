<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;

		try {
			if (storeId == null || owner_id == null) {
		        throw new Exception();
		    }
			out.print(MyDBUtil.getInstance().getJSONString(String.format("SELECT sid, item_code as itemCode, model, item_cost as itemCost, description FROM `%s`.`tb_item_dict_%s`", owner_id, storeId), true));
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
		sb = null;
%>