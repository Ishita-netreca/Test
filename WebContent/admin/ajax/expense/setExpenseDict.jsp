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

		String store_id = MyRequestUtil.getString(request, "store_id", null);
		
		int expenseSid = MyRequestUtil.getInt(request, "expenseSid", 0);
		String name = MyRequestUtil.getString(request, "name", null);
		String description = MyRequestUtil.getString(request, "description", null);
		String quickbook_code = MyRequestUtil.getString(request, "quickbook_code", null);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (store_id == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }

			mPreparedStatementParams = new PreparedStatementParams();
			
		    if (expenseSid > 0) {
		    	query.append(String.format("UPDATE `%s`.`tb_expense_dict_%s` SET `name`=?,`description`=?,`quickbook_code`=?,`update_date`=now(),`updater`='%s' WHERE `sid`='%d'",
                		db_name, store_id, user_sid,expenseSid
                ));
				mPreparedStatementParams.set(name);
				mPreparedStatementParams.set(description);
				mPreparedStatementParams.set(quickbook_code);
            } else {
            	query.append(String.format("INSERT INTO `%s`.`tb_expense_dict_%s`(`name`,`description`,`quickbook_code`,`update_date`,`updater`) VALUES(?,?,?,now(),'%s')",
            			db_name, store_id, user_sid
                ));
				mPreparedStatementParams.set(name);
				mPreparedStatementParams.set(description);
				mPreparedStatementParams.set(quickbook_code);
            }
			
		    out.print(MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>