<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int itemType = MyRequestUtil.getInt(request, "itemType", -1);
		String keyword = MyRequestUtil.getString(request, "keyword", null);
		int category = MyRequestUtil.getInt(request, "category", 0);
		int subCategory = MyRequestUtil.getInt(request, "subCategory", 0);

		try {
		    if (db_name == null) {
		    	out.print("{\"data\":[]}");
		    } else {                
		    	query.append(String.format("SELECT * FROM (SELECT d.`license`,d.`user_sid` FROM wrp.tb_owner_info AS d WHERE d.`user_sid`='%s') AS a LEFT JOIN (SELECT SUM(IF(`active`=1,1,0)) AS c_store, store_id, owner_sid FROM wrp.tb_stores WHERE owner_sid = '%s') AS b ON a.user_sid = b.owner_sid;", owner_sid, owner_sid));
    			
		    	// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
                out.print(MyDBUtil.getInstance().getJSONString(query.toString(), false));
		    } 

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>