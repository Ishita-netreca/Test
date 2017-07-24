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

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int clockIOAdjSid = MyRequestUtil.getInt(request, "clockIOAdjSid", 0);
		int clockIOSid = 0;
		int adjustState = MyRequestUtil.getInt(request, "adjustState", 3);
		String adjStart = MyRequestUtil.getString(request, "adjStart", null);
		String adjEnd = MyRequestUtil.getString(request, "adjEnd", null);
		
		String dailyWorkHour = null;

		PreparedStatementParams mPreparedStatementParams = null;

		try {
		    if (storeId == null || db_name == null || clockIOAdjSid < 1 ) {
		        throw new Exception();
		    }
			mPreparedStatementParams = new PreparedStatementParams();

            switch (adjustState) {
            case 1:
            	query.append(String.format("UPDATE `%s`.`tb_clock_io_adj_%s` AS `a`, `%s`.`tb_clock_io_%s` AS `b` SET `a`.`adj_status`=1,`b`.`start`=?,`b`.`end`=?,`b`.`amount`=TIMEDIFF(STR_TO_DATE(?,'%%H:%%i'),STR_TO_DATE(?,'%%H:%%i')) ", db_name, storeId,db_name, storeId));
				mPreparedStatementParams.set(adjStart);
				mPreparedStatementParams.set(adjEnd);
				mPreparedStatementParams.set(adjStart);
				mPreparedStatementParams.set(adjEnd);
            	query.append(String.format("WHERE `a`.`sid`='%d' AND `b`.`sid`=`a`.`clock_io_sid`;", clockIOAdjSid));
                break;
            case 2:
                query.append(String.format("UPDATE `%s`.`tb_clock_io_adj_%s` SET `adj_status`=2 WHERE `sid`='%d';", db_name, storeId, clockIOAdjSid));
                break;
            }
            out.print(MyDBUtil.getInstance().execute(db_name, owner_id, storeId, query.toString(), mPreparedStatementParams));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>