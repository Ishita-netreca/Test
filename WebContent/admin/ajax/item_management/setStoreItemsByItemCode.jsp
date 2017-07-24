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

	// user_sid Current User SID
	// db_name Current Master's DB Name
	// timezone_offset Current Store Location Timezone offset
	
	PreparedStatementParams mPreparedStatementParams = null;
	
	String item_code = MyRequestUtil.getString(request, "item_code", null);
	
	String store_list_str = MyRequestUtil.getString(request, "store_list_str", null);
	
	JSONArray store_list = null;
	JSONObject mJSONObject = null;
	
	// timezone_offset Sample
	// String.format("SELECT DATE_FORMAT(DATE_ADD(NOW() INTERVAL %s HOUR), '%%m/%%d/%%Y') AS `now`", timezone_offset.toString());
	try {
	    if (user_sid == null || db_name == null || store_list_str == null || item_code == null) {
	        throw new Exception();
	    }

		mPreparedStatementParams = new PreparedStatementParams();
	    store_list = (JSONArray) new JSONParser().parse(store_list_str);
	    
	    for (int i = 0; i < store_list.size(); i++) {
	    	mJSONObject = (JSONObject)store_list.get(i);
	    	
	    	if (mJSONObject.get("store_id") == null || (mJSONObject.get("price") == null && mJSONObject.get("disable") == null)) {
	    		continue;
	    	}
	    	
	    	query.append(String.format("UPDATE `%s`.`tb_item_dict_%s` SET", db_name, mJSONObject.get("store_id").toString()));
	    	if (mJSONObject.get("price")  != null) {
		    	query.append(String.format(" `retail_price`=?,"));
		    	mPreparedStatementParams.set(mJSONObject.get("price").toString());
	    	}
	    	if (mJSONObject.get("disable")  != null) {
		    	query.append(String.format(" `disable`=?,"));
		    	mPreparedStatementParams.set(mJSONObject.get("disable").toString());
	    	}
	    	
	    	if (query.length() > 0 && query.lastIndexOf(",") == query.length()-1) {
	    		query.deleteCharAt(query.length()-1);
	    	}
	    	query.append(String.format(" WHERE `item_code`=?;"));
	    	mPreparedStatementParams.set(item_code);
	    }
		
		// 쿼리 입력
		
		// 파라미터 입력

		// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
        out.print(MyDBUtil.getInstance().execute(query.toString(), mPreparedStatementParams));

	} catch (Exception e) {	
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
		
		out.print(-1);
	}
	query = null;
%>