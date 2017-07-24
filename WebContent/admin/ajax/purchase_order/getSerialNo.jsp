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
	int poSid = MyRequestUtil.getInt(request, "poSid", 0);
	int itemSid = MyRequestUtil.getInt(request, "itemSid", 0);
	String serialIDsStr = MyRequestUtil.getString(request, "serialIDs", null);
	String serial = MyRequestUtil.getString(request, "serialNo", null);
	JSONArray serialIDs = null;
	JSONObject jsonObj = null;	

	if (storeId == null || db_name == null || serial == null) {
        return;
    }
	mPreparedStatementParams = new PreparedStatementParams();
	
	query.append(String.format("SELECT SUM(`a`.`a`) AS `count` FROM ("));
	query.append(String.format(" SELECT COUNT(`sid`) AS `a` FROM `%s`.`tb_inventory_%s` WHERE `serial_no`=? ) AS `a`", db_name, storeId));
	mPreparedStatementParams.set(serial.trim());
	//query.append(String.format(" UNION"));
	//query.append(String.format(" SELECT COUNT(`sid`) AS `a` FROM `%s`.`tb_invoice_items_%s` WHERE `serial_no` IN ('%s') ) AS `a`", db_name, storeId, serial));
	
	int exist = MyDBUtil.getInstance().getInt(query.toString(), mPreparedStatementParams, "count");
	if(exist > 0){	out.print("-5");	}
	else	out.print("0");
%>