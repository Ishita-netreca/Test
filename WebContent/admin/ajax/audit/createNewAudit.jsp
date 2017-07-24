<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
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

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		
		String audit_id = MyRequestUtil.getString(request, "audit_id", null);
		String bins_str = MyRequestUtil.getString(request, "bins_str", null);
		String categories_str = MyRequestUtil.getString(request, "categories_str", null);
		String note = MyRequestUtil.getString(request, "note", null);
		
		boolean exists = false;

		try {
		    if (store_id == null || user_sid == null || audit_id == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
			query.append(String.format("SELECT `sid` FROM `%s`.`tb_audit_%s` WHERE `audit_id`='%s'", db_name, store_id, audit_id));

			rs = stmt.executeQuery(query.toString());

			query.delete(0, query.length());

			if(rs.next()) {
				exists = true;
			}

            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }
            try {
                if (stmt != null && !stmt.isClosed()) {
                    stmt.close();
                }
            } catch (Exception e2) {

            }
            
            if (exists) {                
                try {
                    if (conn != null && !conn.isClosed()) {
                        conn.close();
                    }
                } catch (Exception e2) {

                }

                out.print(1);                
            } else {
            	
            	query.append(String.format("INSERT INTO `%s`.`tb_audit_%s` SET", db_name, store_id));
            	query.append(String.format(" `emp_id`='%s',", user_sid));
            	query.append(String.format(" `audit_id`='%s',", audit_id));
            	if (bins_str != null && bins_str.length() > 0) query.append(String.format(" `bins`='%s',", bins_str));
            	else query.append(String.format(" `bins`='0',"));
            	if (categories_str != null && categories_str.length() > 0) query.append(String.format(" `category`='%s',", categories_str));
            	else query.append(String.format(" `category`='0',"));
            	if (note != null && note.length() > 0) query.append(String.format(" `note`='%s',", note));
            	query.append(String.format(" `status`='0'"));

    			stmt = conn.createStatement();
            	stmt.execute(query.toString());
            	
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
            }

		} catch (Exception e) {
			
			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

			try {
				if (rs != null && !rs.isClosed()) {
					rs.close();
				}
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
            out.print(-1);
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		query = null;
		sb = null;
%>