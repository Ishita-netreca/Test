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
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();
		
		JSONObject user_obj = null;
		
		int req_user_sid = MyRequestUtil.getInt(request, "req_user_sid", 0);

		String insertAssignedStoreList = MyRequestUtil.getString(request, "insertAssignedStoreList", null);
		String deleteAssignedStoreList = MyRequestUtil.getString(request, "deleteAssignedStoreList", null);
		String [] arr = null;

		try {
		    if (user_id == null || db_name == null || req_user_sid < 1) {
		        throw new Exception();
		    }
		    
		    query.append(String.format("SELECT * FROM `wrp`.`tb_user` WHERE `sid`='%s'", req_user_sid));
		    
		    user_obj = MyDBUtil.getInstance().getObject(query.toString());
		    
		    if (user_obj == null) {
		        throw new Exception();		    	
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();


            if (deleteAssignedStoreList != null && deleteAssignedStoreList.length() > 0) {
                sb.append(String.format("DELETE FROM `%s`.`tb_user_store_access` WHERE `user_sid`='%s';", db_name, req_user_sid));
            }

            if (insertAssignedStoreList != null && insertAssignedStoreList.length() > 0) {
                arr = insertAssignedStoreList.split(",");
                if (arr.length > 0) {                    
                    sb.append(String.format("INSERT INTO `%s`.`tb_user_store_access`(`store_id`,`user_sid`) VALUES", db_name));
                    for (int i = 0 ; i < arr.length; i++) {
                        if (arr[i].length() == 0) continue;
                        sb.append(String.format("('%s','%s')",arr[i],req_user_sid)); // storeid, user_id
                        if (i < arr.length - 1) sb.append(",");
                    }
                }
            }
            if (sb.lastIndexOf(",") == sb.length() -1) sb.deleteCharAt(sb.length() -1);
            sb.append(";");

			stmt.execute(sb.toString());

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

            out.print(0);

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
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

			out.print(-1);
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>