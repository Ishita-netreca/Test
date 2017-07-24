<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="org.json.simple.parser.JSONParser"%>
<%@ page import="java.util.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.sql.Timestamp"%>
<%@ page import="java.text.DateFormat"%>
<%@ include file="../common.jsp" %>
<%
/*
SELECT c.`date`, c.`amount`, c.`emp_id`, c.`out_type`, c.`note`, u.`first_name` FROM `tb_cashout_pca017` AS c, tb_user AS u WHERE c.emp_id = u.`sid` AND u.`sid` = 8;
SELECT c.`date`, c.`amount`, c.`emp_id`, c.`out_type`, c.`note`, u.`first_name` FROM `tb_cashout_?` AS c, tb_user AS u WHERE c.emp_id = u.`sid` AND u.`sid` = ?;
*/
	Context context = null;
	DataSource dataSource = null;
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	StringBuffer sb = new StringBuffer(), query = new StringBuffer();
	
	//SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	String storeId = request.getParameter("storeId");
	String note = request.getParameter("note");
	String empId = request.getParameter("empId");
	String amount = request.getParameter("amount");
	String outTo = request.getParameter("outTo");

	String date = request.getParameter("date");
	String index = request.getParameter("index");
	
	try {
	    if (storeId == null || db_name == null) {
	        throw new Exception();
	    }
	
		context = new InitialContext();
		dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
		conn = dataSource.getConnection();
	
		stmt = conn.createStatement();
	
	    query.append(String.format("UPDATE `%s`.tb_cashout_%s SET DATE = STR_TO_DATE('%s', '%%m/%%d/%%Y %%H:%%i:%%s'), amount = '%s', out_type = '%s', note = '%s' WHERE sid='%s';", db_name, storeId, date, amount, outTo, note, index));
		stmt.executeUpdate(query.toString());

	
	    try {
	    } catch (Exception e2) {
	
	    }
	    try {
	        if (stmt != null && !stmt.isClosed()) {
	            stmt.close();
	        }
	    } catch (Exception e2) {
	
	    }
	    try {
	        if (conn != null && !conn.isClosed()) {
	            conn.close();
	        }
	    } catch (Exception e2) {
	
	    }
	
	    out.print(sb.toString());
	
	} catch (Exception e) {
	    if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
	    }
	
		try {
			
		} catch (Exception e2) {
	
		}
		try {
			if (stmt != null && !stmt.isClosed()) {
				stmt.close();
			}
		} catch (Exception e2) {
	
		}
		try {
			if (conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (Exception e2) {
	
		}
	}
	
	context = null;
	dataSource = null;
	conn = null;
	stmt = null;
	rs = null;
	sb = null;
%>