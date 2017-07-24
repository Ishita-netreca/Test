<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer sb = new StringBuffer();

		String storeId = (session.getAttribute("posone_login_store_id") != null)? session.getAttribute("posone_login_store_id").toString() : null;
		int vendorSid = MyRequestUtil.getInt(request, "vendorSid", 0);
		String vendorId = MyRequestUtil.getString(request, "vendorId", null);
		String vendorName = MyRequestUtil.getString(request, "vendorName", null);
		String address1 = MyRequestUtil.getString(request, "address1", null);
		String address2 = MyRequestUtil.getString(request, "address2", null);
		String city = MyRequestUtil.getString(request, "city", null);
		String state = MyRequestUtil.getString(request, "state", null);
		String zipcode = MyRequestUtil.getString(request, "zipcode", null);
		String tel = MyRequestUtil.getString(request, "tel", null);
		String contactName = MyRequestUtil.getString(request, "contactName", null);

		try {
		    if (storeId == null) {
		    //    throw new Exception();
		    }

            if (vendorSid > 0) {
                sb.append(String.format("UPDATE `%s`.`tb_vendor` SET `vendor_id`='%s',`vendor_name`='%s',`address1`='%s',`address2`='%s',`city`='%s',`state`='%s',`zipcode`='%s',`contact_name`='%s',`tel`='%s' WHERE `sid`='%d'",
                		db_name, vendorId, vendorName, address1, address2, city, state, zipcode, contactName, tel, vendorSid
                ));
            } else {
                sb.append(String.format("INSERT INTO `%s`.`tb_vendor`(`vendor_id`,`vendor_name`,`address1`,`address2`,`city`,`state`,`zipcode`,`contact_name`,`tel`) VALUES('%s','%s','%s','%s','%s','%s','%s','%s','%s')",
                		db_name, vendorId, vendorName, address1, address2, city, state, zipcode, contactName, tel
                ));
            }

            out.print(MyDBUtil.getInstance().execute(sb.toString()));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

            out.print("-1");
		}
		sb = null;
%>