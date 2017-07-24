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
		StringBuffer sb = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int customerSid = MyRequestUtil.getInt(request, "customerSid", 0);
		String customerId = MyRequestUtil.getString(request, "customerId", null);
		String pin = MyRequestUtil.getString(request, "pin", null);
		String firstName = MyRequestUtil.getString(request, "firstName", null);
		String middleName = MyRequestUtil.getString(request, "middleName", null);
		String lastName = MyRequestUtil.getString(request, "lastName", null);
		String address1 = MyRequestUtil.getString(request, "address1", null);
		String address2 = MyRequestUtil.getString(request, "address2", null);
		String city = MyRequestUtil.getString(request, "city", null);
		String state = MyRequestUtil.getString(request, "state", null);
		String zipcode = MyRequestUtil.getString(request, "zipcode", null);
		String tel = MyRequestUtil.getString(request, "tel", null);
		String email = MyRequestUtil.getString(request, "email", null);
		String company = MyRequestUtil.getString(request, "company", null);
		String joinDate = MyRequestUtil.getString(request, "joinDate", null);
		
		PreparedStatementParams mPreparedStatementParams = null;
		
		try {
		    if (storeId == null || db_name == null) {
		        throw new Exception();
		    }
			mPreparedStatementParams = new PreparedStatementParams();
			
            if (customerSid > 0) {
                sb.append(String.format("UPDATE `%s`.`tb_customer_%s` SET `customer_id`=?,`first_name`=?,`middle_name`=?,`last_name`=?,`address1`=?,`address2`=?,`city`=?,`state`=?,`zipcode`=?,`tel`='%s',`email`='%s',`company`='%s',`join_date`=str_to_date('%s','%%m/%%d/%%Y'),`pin`=? WHERE `sid`='%d'",
                		db_name, storeId, tel, email, company, joinDate, customerSid
                ));
                mPreparedStatementParams.set(customerId);
				mPreparedStatementParams.set(firstName);
				mPreparedStatementParams.set(middleName);
				mPreparedStatementParams.set(lastName);
				mPreparedStatementParams.set(address1);
				mPreparedStatementParams.set(address2);
				mPreparedStatementParams.set(city);
				mPreparedStatementParams.set(state);
				mPreparedStatementParams.set(zipcode);
				mPreparedStatementParams.set(pin);
            } else {
                sb.append(String.format("INSERT INTO `%s`.`tb_customer_%s`(`customer_id`,`first_name`,`middle_name`,`last_name`,`address1`,`address2`,`city`,`state`,`zipcode`,`tel`,`email`,`company`,`join_date`,`pin`) VALUES(?,?,?,?,?,?,?,?,?,'%s','%s','%s',str_to_date('%s','%%m/%%d/%%Y'),?)",
                		db_name, storeId, tel, email, company, joinDate
                ));
                mPreparedStatementParams.set(customerId);
				mPreparedStatementParams.set(firstName);
				mPreparedStatementParams.set(middleName);
				mPreparedStatementParams.set(lastName);
				mPreparedStatementParams.set(address1);
				mPreparedStatementParams.set(address2);
				mPreparedStatementParams.set(city);
				mPreparedStatementParams.set(state);
				mPreparedStatementParams.set(zipcode);
				mPreparedStatementParams.set(pin);
            }

            out.print(MyDBUtil.getInstance().execute(db_name, owner_id, storeId, sb.toString(), mPreparedStatementParams)); 
		} catch (Exception e) {
            out.print("-1");
		}
		sb = null;
%>