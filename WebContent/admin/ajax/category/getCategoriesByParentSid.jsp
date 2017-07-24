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
		
		int parentSid = MyRequestUtil.getInt(request, "parentSid", 0);
		String store_id = MyRequestUtil.getString(request, "storeId", null);

		PreparedStatementParams mPreparedStatementParams = null;
		try {
		    if (store_id == null || owner_id == null) {
		        throw new Exception();
		    }

            if (parentSid > 0) {
                query.append(String.format("SELECT `a`.*, `b`.`category_name` AS `categoryName` FROM ("));
                query.append(String.format("SELECT `sid`,`category_name` AS `subCategoryName`, `parent_sid` AS `parentSid` FROM `%s`.`tb_categories_dict_%s` WHERE `parent_sid`='%d'", db_name, owner_id, parentSid));
                query.append(String.format(") AS `a` LEFT JOIN ("));
                query.append(String.format("SELECT `sid`,`category_name` FROM `%s`.`tb_categories_dict_%s` WHERE `sid`='%d'", db_name, owner_id, parentSid));
                query.append(String.format(") AS `b` ON `a`.`parentSid`=`b`.`sid`"));
            } else {
			    query.append(String.format("SELECT `sid`,`category_name` AS `categoryName`,`parent_sid` AS `parentSid` FROM `%s`.`tb_categories_dict_%s` WHERE parent_sid='%d'", db_name, owner_id, parentSid));
            }

            out.print(MyDBUtil.getInstance().getJSONString(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams, true));

		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }

		}

		query = null;
%>