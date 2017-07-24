<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="org.json.simple.parser.JSONParser"%>
<%@ page import="java.util.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.sql.Timestamp"%>
<%@ page import="java.text.DateFormat"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%

	StringBuffer sb = new StringBuffer(), query = new StringBuffer();
	
	//SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	String storeId = MyRequestUtil.getString(request, "storeId", null);
	String note = request.getParameter("note");

	int sid = MyRequestUtil.getInt(request, "sid", 0);
	
	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if (storeId == null || db_name == null) {
	        throw new Exception();
	    }
		mPreparedStatementParams = new PreparedStatementParams();

		if(sid == 0){
            query.append(String.format("INSERT INTO `%s`.`tb_master_message_log_%s`(`content`,`reg_date`,`target_store_id`,`emp_sid`) VALUES(?,NOW(),'%s','%s');",db_name, db_name, storeId, user_sid));
			mPreparedStatementParams.set(note);
		}else{
			query.append(String.format("UPDATE `%s`.`tb_master_message_log_%s` SET `content`=?, `target_store_id`='%s'", db_name, db_name, storeId));
			mPreparedStatementParams.set(note);
			query.append(String.format(" WHERE `sid`='%d'", sid));
		}
		out.print(MyDBUtil.getInstance().execute(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams)); 
        out.print("0");

	} catch (Exception e) {
        if (e.getMessage() != null && e.getMessage().length() > 0) {
	    	e.printStackTrace();
        }

        out.print("-1");
	}
	sb = null;
%>