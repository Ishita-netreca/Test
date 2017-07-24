<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
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
		StringBuffer query = new StringBuffer();
		
		String storeId = MyRequestUtil.getString(request, "storeId", null);
        int categorySid = MyRequestUtil.getInt(request, "categorySid", -1);
        String categoryName = MyRequestUtil.getString(request, "categoryName", null);
        int parentSid = MyRequestUtil.getInt(request, "parentSid", 0);
        String[] store_sid_arr= null;
        
        PreparedStatementParams mPreparedStatementParams = null;
        
		int result = 0;

		try {
		    if (storeId == null || db_name == null || categorySid < 0 || categoryName == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			mPreparedStatementParams = new PreparedStatementParams();
			
			rs = stmt.executeQuery(String.format("SELECT `sid` FROM `%s`.`tb_categories_dict_%s` WHERE `category_name`='%s' AND `parent_sid`='%d'", db_name, owner_id, categoryName, parentSid));

			if(rs.next()) {
                if (rs.getInt("sid") != categorySid) result = 1; // area code exists
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

            if (result == 0) {
                stmt = conn.createStatement();
                if (categorySid > 0) {
                    stmt.execute(String.format("UPDATE `%s`.`tb_categories_dict_%s` SET `category_name`='%s',`parent_sid`='%d' WHERE `sid`='%d';", db_name, owner_id, categoryName, parentSid, categorySid));
                } else {
                    stmt.execute(String.format("INSERT INTO `%s`.`tb_categories_dict_%s`(`category_name`,`parent_sid`) VALUES('%s','%d');", db_name, owner_id, categoryName, parentSid));
                }
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
            
            query.append(String.format("SELECT GROUP_CONCAT(`store_id` SEPARATOR ',') AS `store_list_str` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s'" ,owner_sid));
            store_sid_arr = MyDBUtil.getInstance().getString(db_name, owner_id, storeId, query.toString(), "store_list_str").split(",");
            
            query.delete(0, query.length());
            
            for(int i=0; i < store_sid_arr.length; i++){
            	query.append(String.format("TRUNCATE `%s`.`tb_categories_dict_%s`;", db_name,store_sid_arr[i]));
            	query.append(String.format("INSERT INTO `%s`.`tb_categories_dict_%s` (`sid`,`category_name`,`parent_sid`) ", db_name,store_sid_arr[i]));
            	query.append(String.format("SELECT `sid`,`category_name`,`parent_sid` FROM `%s`.`tb_categories_dict_%s`;", db_name, owner_id));
    		}
            
            out.print(MyDBUtil.getInstance().execute(query.toString(), mPreparedStatementParams));
        
            
            try {
                if (conn != null && !conn.isClosed()) {
                    conn.close();
                }
            } catch (Exception e2) {

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

			out.print("-1");
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
%>